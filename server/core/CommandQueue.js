// server/core/CommandQueue.js

export class CommandQueue {
  constructor(options = {}) {
    this.maxCachedCmdIds = options.maxCachedCmdIds || 500;
    this._queues = new Map(); // accountId -> Promise chain
    this._idempotencyCache = new Map(); // accountId -> Map(cmdId -> result)
  }

  /**
   * Enqueue a command to be executed strictly in order for the account
   * @param {string} accountId
   * @param {object} envelope
   * @param {Function} handler - Async function (envelope) => result
   * @returns {Promise<any>}
   */
  async enqueue(accountId, envelope, handler) {
    if (!accountId) {
      throw new Error("accountId is required for CommandQueue.");
    }

    const { cmdId } = envelope;

    // Check idempotency cache
    let accountCache = this._idempotencyCache.get(accountId);
    if (!accountCache) {
      accountCache = new Map();
      this._idempotencyCache.set(accountId, accountCache);
    }

    if (cmdId && accountCache.has(cmdId)) {
      // Return cached idempotent result
      return accountCache.get(cmdId);
    }

    // Chain onto the account's existing queue
    const currentQueue = this._queues.get(accountId) || Promise.resolve();

    const nextQueue = currentQueue
      .catch(() => {}) // Do not let previous failures break the queue chain
      .then(async () => {
        // Double check cache after waiting in queue
        if (cmdId && accountCache.has(cmdId)) {
          return accountCache.get(cmdId);
        }

        const result = await handler(envelope);

        // Cache successful or settled result
        if (cmdId) {
          accountCache.set(cmdId, result);
          if (accountCache.size > this.maxCachedCmdIds) {
            // Evict oldest entry
            const firstKey = accountCache.keys().next().value;
            accountCache.delete(firstKey);
          }
        }

        return result;
      });

    this._queues.set(accountId, nextQueue);

    // Clean up queue map once chain settles
    nextQueue.finally(() => {
      if (this._queues.get(accountId) === nextQueue) {
        this._queues.delete(accountId);
      }
    });

    return nextQueue;
  }

  /**
   * Clear queue and cache for an account (e.g. on account delete)
   */
  clearAccount(accountId) {
    this._queues.delete(accountId);
    this._idempotencyCache.delete(accountId);
  }

  destroy() {
    this._queues.clear();
    this._idempotencyCache.clear();
  }
}

export default CommandQueue;

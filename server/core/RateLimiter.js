// server/core/RateLimiter.js
import { SERVER_CONFIG } from "../config.js";

export class RateLimiter {
  constructor(options = {}) {
    this.windowMs = options.windowMs || SERVER_CONFIG.rateLimit.windowMs;
    this.maxRequests = options.maxRequestsPerWindow || SERVER_CONFIG.rateLimit.maxRequestsPerWindow;
    this.burstLimit = options.burstLimit || SERVER_CONFIG.rateLimit.burstLimit;
    this._clients = new Map(); // key -> { count, windowStart }

    // Periodic sweep of expired windows to prevent memory leakage
    this._cleanupTimer = setInterval(() => this._cleanup(), this.windowMs * 2);
    if (this._cleanupTimer.unref) {
      this._cleanupTimer.unref();
    }
  }

  /**
   * Check if a request from key is allowed
   * @param {string} key - IP or accountId
   * @returns {{ allowed: boolean, retryAfterMs?: number, currentCount: number }}
   */
  check(key) {
    if (!key) return { allowed: true, currentCount: 0 };
    const now = Date.now();
    let record = this._clients.get(key);

    if (!record || now - record.windowStart >= this.windowMs) {
      record = { count: 1, windowStart: now };
      this._clients.set(key, record);
      return { allowed: true, currentCount: 1 };
    }

    record.count += 1;
    if (record.count > this.burstLimit) {
      const retryAfterMs = Math.max(0, this.windowMs - (now - record.windowStart));
      return {
        allowed: false,
        retryAfterMs,
        currentCount: record.count
      };
    }

    return {
      allowed: true,
      currentCount: record.count
    };
  }

  reset(key) {
    if (key) {
      this._clients.delete(key);
    } else {
      this._clients.clear();
    }
  }

  _cleanup() {
    const now = Date.now();
    for (const [key, record] of this._clients.entries()) {
      if (now - record.windowStart >= this.windowMs * 2) {
        this._clients.delete(key);
      }
    }
  }

  destroy() {
    if (this._cleanupTimer) {
      clearInterval(this._cleanupTimer);
    }
    this._clients.clear();
  }
}

export default RateLimiter;

// src/js/kernel/LocalGameClient.js
// Local in-process GameClient implementation running headless kernel and local storage.

import { GameClient } from "./GameClient.js";
import { ConnectionStates, Events, createCommandEnvelope } from "./protocol.js";
import { createKernel } from "./kernelFactory.js";

export class LocalGameClient extends GameClient {
  constructor(options = {}) {
    super();
    this._connectionState = ConnectionStates.OFFLINE;
    this.options = options;
    this.kernel = null;
    this._busForwarders = [];
  }

  /**
   * Initialize local kernel and forward events to subscribers
   * @returns {Promise<LocalGameClient>|LocalGameClient}
   */
  async init() {
    if (!this.kernel) {
      this.kernel = createKernel(this.options);
    }
    this._connectionState = ConnectionStates.OFFLINE;

    // Forward read-model events from kernel bus to client listeners
    const eventNames = Object.values(Events);
    for (const evt of eventNames) {
      const forwarder = (data) => {
        this._emit(evt, data);
      };
      this.kernel.bus.on(evt, forwarder);
      this._busForwarders.push({ evt, forwarder });
    }

    this._emit(Events.CONNECTION_STATE, { state: ConnectionStates.OFFLINE });
    return this;
  }

  /**
   * Send intent command to kernel
   * @param {string} command - Command name
   * @param {object} [payload={}] - Command payload
   * @returns {Promise<object>} Command ACK outcome
   */
  async send(command, payload = {}) {
    if (!this.kernel) {
      await this.init();
    }
    const envelope = createCommandEnvelope(command, payload);
    const outcome = this.kernel.executeCommand(envelope);
    this._emit(Events.COMMAND_ACK, outcome);
    return outcome;
  }

  /**
   * Get read-only snapshot
   * @returns {object}
   */
  getState() {
    return this.kernel ? this.kernel.getState() : {};
  }

  /**
   * Local sandbox always has developer entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return true;
  }

  // Accessors for UI/subsystem backward compatibility
  get store() {
    return this.kernel?.store;
  }

  get battle() {
    return this.kernel?.battle;
  }

  get postBattle() {
    return this.kernel?.postBattle;
  }

  get bus() {
    return this.kernel?.bus;
  }

  /**
   * Clean up listeners and kernel resources
   */
  destroy() {
    super.destroy();
    if (this.kernel && this._busForwarders.length > 0) {
      for (const { evt, forwarder } of this._busForwarders) {
        this.kernel.bus.off(evt, forwarder);
      }
      this._busForwarders = [];
    }
    this.kernel?.destroy();
    this.kernel = null;
  }
}

export default LocalGameClient;

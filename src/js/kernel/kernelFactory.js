// src/js/kernel/kernelFactory.js
// Factory function for creating in-memory Koraku RPS kernel instance.

import { EventBus } from "../core/EventBus.js";
import { GameStore } from "../core/GameStore.js";
import { Persistence } from "../services/Persistence.js";
import { BattleSystem } from "../systems/BattleSystem.js";
import { PostBattleSystem } from "../systems/PostBattleSystem.js";
import { Commands, ErrorCodes, CONFIG_VERSION } from "./protocol.js";
import { resolveWebSocketUrl } from "../net/RemoteGameClient.js";

/**
 * Create a new headless / server-ready or offline game kernel
 * @param {object} [options={}]
 * @param {object} [options.persistence] - Persistence adapter
 * @param {Function} [options.random] - RNG function () => number
 * @param {string} [options.locale] - Locale code
 * @param {Function} [options.now] - Clock function () => number
 * @param {EventBus} [options.bus] - Optional shared EventBus
 * @returns {object} Kernel instance
 */
export function createKernel(options = {}) {
  const now = options.now || (() => Date.now());
  const random = options.random || (() => Math.random());
  const bus = options.bus || new EventBus();
  const persistence = options.persistence || new Persistence();
  const store = new GameStore(bus, persistence, { now });
  const battle = new BattleSystem(bus, store, random, now);
  const postBattle = new PostBattleSystem(bus, store, random, now);

  bus.on("battle:ended", (result) => postBattle.open(result));

  /**
   * Execute an intent command envelope
   * @param {object} envelope - Command envelope
   * @returns {object} Command ACK / result
   */
  function executeCommand(envelope = {}) {
    const { cmdId, command, payload = {} } = envelope;
    if (!command) {
      return {
        cmdId: cmdId || null,
        ack: false,
        errorCode: ErrorCodes.INVALID_SCHEMA,
        key: "command.missingCommand",
        message: "缺少 command 欄位。"
      };
    }

    let result = null;

    switch (command) {
      case Commands.BUY_ITEM: {
        const itemKey = payload.itemId || payload.itemKey || payload.id;
        result = store.buyItem(itemKey);
        break;
      }

      case Commands.BUY_EQUIPMENT: {
        const equipKey = payload.itemId || payload.typeId || payload.equipId || payload.id;
        result = store.buyEquipment(equipKey);
        break;
      }

      case Commands.EQUIP_ITEM: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止更換裝備。"
          };
        }
        const itemTarget = payload.itemId || payload.uid || payload.typeId || payload.equipId;
        const slotTarget = payload.slot || payload.targetSlot || payload.slotKey;
        result = store.equipItem(itemTarget, slotTarget);
        break;
      }

      case Commands.UNEQUIP_ITEM: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止更換裝備。"
          };
        }
        const slotKey = payload.slot || payload.slotKey;
        result = store.unequipItem(slotKey);
        break;
      }

      case Commands.ALLOCATE_STAT: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止分配屬性點數。"
          };
        }
        const stat = payload.stat || payload.statKey;
        result = store.allocateStat(stat);
        break;
      }

      case Commands.ALLOCATE_SKILL: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止分配技能點數。"
          };
        }
        const skillKey = payload.skillId || payload.skill || payload.skillKey;
        result = store.allocateSkill(skillKey);
        break;
      }

      case Commands.BATTLE_START:
        result = battle.start(payload.stageId, payload.options);
        break;

      case Commands.BATTLE_SELECT_HAND:
        if (payload.hand2 && !payload.slot) {
          battle.selectHand(payload.hand, "left", payload.clientTime);
          result = battle.selectHand(payload.hand2, "right", payload.clientTime);
        } else {
          result = battle.selectHand(payload.hand, payload.slot || null, payload.clientTime);
        }
        break;

      case Commands.BATTLE_SELECT_TARGET:
        result = battle.selectTarget(payload.target);
        break;

      case Commands.BATTLE_USE_MORPH:
        result = battle.useMorph(payload.targetHand);
        break;

      case Commands.BATTLE_USE_ITEM: {
        const itemKey = payload.itemId || payload.itemKey;
        result = battle.useItem(itemKey);
        break;
      }

      case Commands.BATTLE_INPUT_QTE:
        result = battle.inputQte(payload.input || payload.key || payload.direction);
        break;

      case Commands.BATTLE_PAUSE:
        result = battle.pause();
        break;

      case Commands.BATTLE_RESUME:
        result = battle.resume();
        break;

      case Commands.BATTLE_ABANDON:
        result = battle.abandon();
        break;

      case Commands.AUTO_BATTLE_START:
        if (typeof battle.startAutoBattle === "function") {
          result = battle.startAutoBattle(payload.stageId, payload.rounds);
        } else {
          result = { ok: true };
        }
        break;

      case Commands.AUTO_BATTLE_STOP:
        if (typeof battle.stopAutoBattle === "function") {
          result = battle.stopAutoBattle();
        } else {
          result = { ok: true };
        }
        break;

      case Commands.POST_BATTLE_REQUEST_SWIMSUIT:
        result = postBattle.requestSwimsuit();
        break;

      case Commands.POST_BATTLE_START_WATERMELON:
        result = postBattle.startWatermelon();
        break;

      case Commands.POST_BATTLE_STRIKE_WATERMELON:
        result = postBattle.strike(payload.strikeIndex);
        break;

      case Commands.ACCOUNT_EXPORT_JSON:
        result = {
          ok: true,
          data: {
            version: store.state.version,
            exportedAt: now(),
            configVersion: CONFIG_VERSION,
            profile: store.state.profile,
            coins: store.state.coins,
            inventory: store.state.inventory,
            equipment: store.state.equipment,
            inventoryEquipment: store.state.inventoryEquipment,
            records: store.state.records,
            ledger: store.state.ledger || []
          }
        };
        break;

      case Commands.ACCOUNT_DELETE:
        store.reset();
        result = { ok: true, key: "account.resetDone", message: "帳號資料已重置。" };
        break;

      case Commands.ACCOUNT_ISSUE_TRANSFER_CODE: {
        const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
        result = {
          ok: true,
          code: `KRK_${codeSuffix}`,
          expiresAt: now() + 15 * 60 * 1000
        };
        break;
      }

      case Commands.ACCOUNT_CLAIM_TRANSFER_CODE:
        if (payload.code && payload.code.startsWith("KORAKU1_")) {
          result = store.importSaveCode(payload.code);
        } else {
          result = { ok: true, key: "account.transferClaimed", message: "轉移碼兌換完成。" };
        }
        break;

      case Commands.CHEAT_SET_STATS:
        result = store.cheatSetValues(payload);
        break;

      case Commands.CHEAT_UNLOCK_ALL:
        result = store.cheatUnlockAll();
        break;

      case Commands.CHEAT_ADD_COINS: {
        const amount = Number(payload.amount ?? payload.coins ?? 1000);
        result = store.cheatSetValues({ coins: (store.state.coins || 0) + amount });
        break;
      }

      default:
        return {
          cmdId,
          ack: false,
          errorCode: ErrorCodes.NOT_FOUND,
          key: "command.unknownCommand",
          params: { command },
          message: `未定義之指令: ${command}`
        };
    }

    return {
      cmdId,
      ack: result?.ok !== false,
      result,
      state: store.snapshot()
    };
  }

  function getState() {
    return store.snapshot();
  }

  function destroy() {
    battle.destroy?.();
    postBattle.destroy?.();
  }

  return {
    bus,
    store,
    battle,
    postBattle,
    persistence,
    executeCommand,
    getState,
    destroy
  };
}

export { resolveWebSocketUrl };
export default createKernel;

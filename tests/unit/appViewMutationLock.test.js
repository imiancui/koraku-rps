import test from "node:test";
import assert from "node:assert/strict";
import { AppView } from "../../src/js/ui/AppView.js";
import { ErrorCodes } from "../../src/js/kernel/protocol.js";

test("AppView.isMutationLocked: Online mode always policy locks during active battle", () => {
  const view = Object.create(AppView.prototype);
  view.client = {
    getServerConfig: () => ({ battleLockPolicy: "always" }),
    battle: {
      snapshot: () => ({ active: true, phase: "countdown" })
    }
  };

  assert.equal(view.isMutationLocked(), true, "Active battle with always policy should be locked in countdown phase");

  view.client.battle.snapshot = () => ({ active: true, phase: "reaction" });
  assert.equal(view.isMutationLocked(), true, "Active battle with always policy should be locked in reaction phase");

  view.client.battle.snapshot = () => ({ active: false, phase: "ended" });
  assert.equal(view.isMutationLocked(), false, "Inactive battle should not be locked");
});

test("AppView.isMutationLocked: Online mode countdown policy allows mutations in countdown but locks in reaction/qte", () => {
  const view = Object.create(AppView.prototype);
  view.client = {
    getServerConfig: () => ({ battleLockPolicy: "countdown" }),
    battle: {
      snapshot: () => ({ active: true, phase: "countdown" })
    }
  };

  assert.equal(view.isMutationLocked(), false, "Countdown phase should allow mutations under countdown policy");

  view.client.battle.snapshot = () => ({ active: true, phase: "reaction" });
  assert.equal(view.isMutationLocked(), true, "Reaction phase should be locked under countdown policy");

  view.client.battle.snapshot = () => ({ active: true, phase: "qte" });
  assert.equal(view.isMutationLocked(), true, "QTE phase should be locked under countdown policy");

  view.client.battle.snapshot = () => ({ active: false, phase: "victory" });
  assert.equal(view.isMutationLocked(), false, "Inactive battle should not be locked");
});

test("AppView.isMutationLocked: Online mode never policy never locks mutations", () => {
  const view = Object.create(AppView.prototype);
  view.client = {
    getServerConfig: () => ({ battleLockPolicy: "never" }),
    battle: {
      snapshot: () => ({ active: true, phase: "reaction" })
    }
  };

  assert.equal(view.isMutationLocked(), false, "Never policy should not lock mutations even during reaction");
});

test("AppView.isMutationLocked: Offline sandbox defaults to always policy behavior", () => {
  const view = Object.create(AppView.prototype);
  // Offline client does not have getServerConfig
  view.client = {
    battle: {
      snapshot: () => ({ active: true, phase: "countdown" })
    }
  };

  assert.equal(view.isMutationLocked(), true, "Offline mode should default to always policy and lock mutations during active battle");

  view.client.battle.snapshot = () => ({ active: false });
  assert.equal(view.isMutationLocked(), false, "Offline mode should not lock when battle is inactive");
});

test("AppView.sendCommand: Toasts battle.lockedDuringBattle on BATTLE_IN_PROGRESS_LOCKED error", async () => {
  const toasts = [];
  const view = Object.create(AppView.prototype);
  view.showToast = (msg, type) => toasts.push({ msg, type });
  view.client = {
    send: async () => {
      const err = new Error("Equipment and stat allocation are locked during active battle.");
      err.code = ErrorCodes.BATTLE_IN_PROGRESS_LOCKED;
      err.key = "battle.lockedDuringBattle";
      throw err;
    }
  };

  const outcome = await view.sendCommand("equipItem", { slot: "head", itemId: "crown" });
  assert.equal(outcome.ok, false);
  assert.equal(outcome.errorCode, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].type, "danger");
  assert.ok(toasts[0].msg.length > 0);
});

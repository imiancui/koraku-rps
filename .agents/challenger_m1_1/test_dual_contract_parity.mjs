// .agents/challenger_m1_1/test_dual_contract_parity.mjs
// Adversarial Stress Suite 3: Dual Contract Parity under Extreme Random Permutations

import assert from "node:assert/strict";
import {
  Commands,
  Events,
  ConnectionStates,
  ErrorCodes,
  CONFIG_VERSION
} from "../../src/js/kernel/protocol.js";
import {
  MemoryPersistence,
  AuthoritativeKernelServer,
  TestLocalGameClient,
  TestRemoteGameClient,
  createSeededRandom
} from "../../tests/helpers/testHarness.js";
import { STAGES, ITEMS, EQUIPMENT_ITEMS } from "../../src/js/config/gameConfig.js";

console.log("=== STARTING STRESS SUITE 3: DUAL CONTRACT PARITY ===");

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

async function recordAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`✔ [PASS] ${name}`);
  } catch (err) {
    failedTests.push({ name, error: err.message, stack: err.stack });
    console.error(`✖ [FAIL] ${name}: ${err.message}`);
  }
}

function isSuccess(res) {
  if (!res) return false;
  if (typeof res.ack === "boolean") return res.ack;
  if (typeof res.ok === "boolean") return res.ok;
  return false;
}

// 1. 1,000 Paired Randomized Progression Commands (Local vs Remote)
await recordAsyncTest("1,000 Paired Randomized Progression Commands (Local vs Remote State Parity)", async () => {
  const localPersistence = new MemoryPersistence();
  const localClient = new TestLocalGameClient({ persistence: localPersistence });
  await localClient.init();

  const serverPersistence = new MemoryPersistence();
  const server = new AuthoritativeKernelServer({ persistence: serverPersistence, devTokens: ["dev_token_stress"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_token_stress" });
  await remoteClient.init();

  const rng = createSeededRandom(55555);

  const availableItems = Object.keys(ITEMS);
  const availableEquip = Object.keys(EQUIPMENT_ITEMS);
  const statsList = ["damage", "hp", "mp"];
  const equipSlots = ["head", "shoulders", "chest", "belt", "boots", "mainHand", "offHand", "ring1", "ring2", "earring1", "earring2", "badge"];

  // Pre-seed coins & skill points on both
  await localClient.send(Commands.CHEAT_ADD_COINS, { amount: 1000000 });
  await remoteClient.send(Commands.CHEAT_ADD_COINS, { amount: 1000000 });

  localClient.server.store.state.profile.level = 20;
  localClient.server.store.state.profile.skillPoints = 500;
  remoteClient.server.store.state.profile.level = 20;
  remoteClient.server.store.state.profile.skillPoints = 500;

  for (let step = 0; step < 1000; step++) {
    const actionRoll = rng();

    if (actionRoll < 0.25) {
      // Buy Item
      const itemKey = availableItems[Math.floor(rng() * availableItems.length)];
      const locRes = await localClient.send(Commands.BUY_ITEM, { itemKey });
      const remRes = await remoteClient.send(Commands.BUY_ITEM, { itemKey });
      assert.equal(isSuccess(locRes), isSuccess(remRes), `BUY_ITEM ack mismatch at step ${step}`);
    } else if (actionRoll < 0.50) {
      // Buy Equipment
      const equipId = availableEquip[Math.floor(rng() * availableEquip.length)];
      const locRes = await localClient.send(Commands.BUY_EQUIPMENT, { equipId });
      const remRes = await remoteClient.send(Commands.BUY_EQUIPMENT, { equipId });
      assert.equal(isSuccess(locRes), isSuccess(remRes), `BUY_EQUIPMENT ack mismatch at step ${step}`);
    } else if (actionRoll < 0.70) {
      // Equip Item
      const equipId = availableEquip[Math.floor(rng() * availableEquip.length)];
      const item = EQUIPMENT_ITEMS[equipId];
      const slot = item?.slot || "mainHand";
      const locRes = await localClient.send(Commands.EQUIP_ITEM, { itemId: equipId, slot });
      const remRes = await remoteClient.send(Commands.EQUIP_ITEM, { itemId: equipId, slot });
      assert.equal(isSuccess(locRes), isSuccess(remRes), `EQUIP_ITEM ack mismatch at step ${step}`);
    } else if (actionRoll < 0.85) {
      // Allocate Stat
      const stat = statsList[Math.floor(rng() * statsList.length)];
      const locRes = await localClient.send(Commands.ALLOCATE_STAT, { stat });
      const remRes = await remoteClient.send(Commands.ALLOCATE_STAT, { stat });
      assert.equal(isSuccess(locRes), isSuccess(remRes), `ALLOCATE_STAT ack mismatch at step ${step}`);
    } else {
      // Unequip slot
      const slot = equipSlots[Math.floor(rng() * equipSlots.length)];
      const locRes = await localClient.send(Commands.UNEQUIP_ITEM, { slot });
      const remRes = await remoteClient.send(Commands.UNEQUIP_ITEM, { slot });
      assert.equal(isSuccess(locRes), isSuccess(remRes), `UNEQUIP_ITEM ack mismatch at step ${step}`);
    }

    // Compare snapshots every 100 steps
    if (step % 100 === 0) {
      const locState = localClient.getState();
      const remState = remoteClient.getState();

      assert.equal(locState.coins, remState.coins, `Coins mismatch at step ${step}: local=${locState.coins}, remote=${remState.coins}`);
      assert.deepEqual(locState.inventory, remState.inventory, `Inventory mismatch at step ${step}`);
      assert.deepEqual(locState.equipment, remState.equipment, `Equipment mismatch at step ${step}`);
      assert.deepEqual(locState.profile.allocations, remState.profile.allocations, `Allocations mismatch at step ${step}`);
    }
  }

  // Final exact match verification
  const finalLoc = localClient.getState();
  const finalRem = remoteClient.getState();
  assert.equal(finalLoc.coins, finalRem.coins);
  assert.deepEqual(finalLoc.inventory, finalRem.inventory);
  assert.deepEqual(finalLoc.equipment, finalRem.equipment);
  assert.deepEqual(finalLoc.profile.allocations, finalRem.profile.allocations);

  localClient.destroy();
  remoteClient.destroy();
});

// 2. Battle Locking Parity (ASSUMPTION: equip & allocate locked during battle)
await recordAsyncTest("Battle Locking Parity (Local vs Remote rejection during active battle)", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer({ devTokens: ["dev_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_1" });
  await remoteClient.init();

  // Start battle on both
  await localClient.send(Commands.BATTLE_START, { stageId: 1 });
  await remoteClient.send(Commands.BATTLE_START, { stageId: 1 });

  // Try equipping during battle
  const locEquip = await localClient.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  const remEquip = await remoteClient.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });

  assert.equal(isSuccess(locEquip), false, "Local must reject equip during battle");
  assert.equal(isSuccess(remEquip), false, "Remote must reject equip during battle");

  // Try allocating stat during battle
  const locAlloc = await localClient.send(Commands.ALLOCATE_STAT, { stat: "damage" });
  const remAlloc = await remoteClient.send(Commands.ALLOCATE_STAT, { stat: "damage" });

  assert.equal(isSuccess(locAlloc), false, "Local must reject allocate during battle");
  assert.equal(isSuccess(remAlloc), false, "Remote must reject allocate during battle");

  // Abandon battle on both
  await localClient.send(Commands.BATTLE_ABANDON);
  await remoteClient.send(Commands.BATTLE_ABANDON);

  // Now equip should succeed
  const locEquipPost = await localClient.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  const remEquipPost = await remoteClient.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });

  assert.equal(isSuccess(locEquipPost), isSuccess(remEquipPost));

  localClient.destroy();
  remoteClient.destroy();
});

// 3. Pause Policy Parity (Countdown-only, max 3 times)
await recordAsyncTest("Pause Policy Parity (Countdown-only, max 3 times on both Local and Remote)", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer({ devTokens: ["dev_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_1" });
  await remoteClient.init();

  await localClient.send(Commands.BATTLE_START, { stageId: 1 });
  await remoteClient.send(Commands.BATTLE_START, { stageId: 1 });

  // Pause 1
  const locP1 = await localClient.send(Commands.BATTLE_PAUSE);
  const remP1 = await remoteClient.send(Commands.BATTLE_PAUSE);
  assert.equal(isSuccess(locP1), true);
  assert.equal(isSuccess(remP1), true);

  await localClient.send(Commands.BATTLE_RESUME);
  await remoteClient.send(Commands.BATTLE_RESUME);

  // Pause 2
  await localClient.send(Commands.BATTLE_PAUSE);
  await remoteClient.send(Commands.BATTLE_PAUSE);
  await localClient.send(Commands.BATTLE_RESUME);
  await remoteClient.send(Commands.BATTLE_RESUME);

  // Pause 3
  await localClient.send(Commands.BATTLE_PAUSE);
  await remoteClient.send(Commands.BATTLE_PAUSE);
  await localClient.send(Commands.BATTLE_RESUME);
  await remoteClient.send(Commands.BATTLE_RESUME);

  // Pause 4 (Should fail on both)
  const locP4 = await localClient.send(Commands.BATTLE_PAUSE);
  const remP4 = await remoteClient.send(Commands.BATTLE_PAUSE);
  assert.equal(isSuccess(locP4), false, "Local pause 4 must fail");
  assert.equal(isSuccess(remP4), false, "Remote pause 4 must fail");

  localClient.destroy();
  remoteClient.destroy();
});

console.log("\n==================================================");
console.log(`SUITE 3 RESULTS: ${passedTests}/${totalTests} PASSED, ${failedTests.length} FAILED`);
if (failedTests.length > 0) {
  console.log("FAILURES:");
  for (const f of failedTests) {
    console.log(`- ${f.name}: ${f.error}`);
  }
}
console.log("==================================================");

process.exit(failedTests.length > 0 ? 1 : 0);

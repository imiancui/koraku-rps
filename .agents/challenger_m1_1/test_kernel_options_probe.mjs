import { createKernel } from "../../src/js/kernel/kernelFactory.js";
import { Commands } from "../../src/js/kernel/protocol.js";

const customNow = () => 1234567890;
const customRandom = () => 0.5;

try {
  const kernel = createKernel({ now: customNow, random: customRandom });
  console.log("Kernel created");
  console.log("battle.random type:", typeof kernel.battle.random);
  console.log("battle.now():", kernel.battle.now());
  console.log("postBattle.random type:", typeof kernel.postBattle.random);
  console.log("postBattle.now():", kernel.postBattle.now());
  
  // Try start battle
  kernel.executeCommand({
    cmdId: "cmd_1",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  console.log("Battle started successfully");
} catch (err) {
  console.error("Caught error:", err);
}

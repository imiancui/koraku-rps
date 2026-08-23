import { HAND_ORDER, HANDS } from "../config/gameConfig.js";

export function compareHands(playerHand, opponentHand) {
  if (!HANDS[playerHand] || !HANDS[opponentHand]) {
    throw new Error("Unknown hand");
  }
  if (playerHand === opponentHand) return "draw";
  return HANDS[playerHand].beats === opponentHand ? "win" : "loss";
}

export function getCounterHand(opponentHand) {
  const counter = HAND_ORDER.find((hand) => HANDS[hand].beats === opponentHand);
  if (!counter) throw new Error("Unknown opponent hand");
  return counter;
}

export function getRandomHand(random = Math.random) {
  return HAND_ORDER[Math.floor(random() * HAND_ORDER.length)];
}

export function getHandLabel(hand) {
  return HANDS[hand]?.label || "";
}

export function getQteCounterNarration(originalPlayerHand) {
  const narratives = {
    paper: {
      changedHand: "paper",
      text: "用手包裹住小樂的剪刀手——反制成功！"
    },
    scissors: {
      changedHand: "paper",
      text: "用布握住了小樂的小拳頭——反制成功！"
    },
    rock: {
      changedHand: "paper",
      text: "用五指交扣了小樂的軟綿綿小手手，離奇獲勝！"
    }
  };
  return narratives[originalPlayerHand];
}

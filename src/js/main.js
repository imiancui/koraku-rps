import { Persistence } from "./services/Persistence.js";
import { SoundSystem } from "./systems/SoundSystem.js";
import { AppView } from "./ui/AppView.js";
import { DialogueController } from "./ui/DialogueController.js";
import { LocalGameClient } from "./kernel/LocalGameClient.js";
import { RemoteGameClient } from "./net/RemoteGameClient.js";
import { Commands } from "./kernel/protocol.js";

/**
 * Resolve whether the client should boot in offline sandbox or online authoritative mode
 * @returns {"offline"|"online"}
 */
function resolveClientMode() {
  if (typeof window === "undefined") return "offline";

  const urlParams = new URLSearchParams(window.location.search);
  const modeParam = urlParams.get("mode");
  if (modeParam === "offline" || modeParam === "online") {
    return modeParam;
  }

  const savedMode = window.localStorage?.getItem("koraku_mode");
  if (savedMode === "offline" || savedMode === "online") {
    return savedMode;
  }

  if (window.location.protocol === "file:") {
    return "offline";
  }

  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return "offline";
  }

  // Production domain (koraku.app) and other web origins default to online
  return "online";
}

const mode = resolveClientMode();
const persistence = new Persistence();
const client = mode === "online"
  ? new RemoteGameClient({ persistence })
  : new LocalGameClient({ persistence });

client.init();

const bus = client.bus;
const store = client.store;
const battle = client.battle;
const postBattle = client.postBattle;
const sound = new SoundSystem(store);

bus.on("battle:ended", (result) => postBattle.open(result));
bus.on("sound", ({ name }) => sound.play(name));
bus.on("bgm:scene", ({ scene }) => sound.setBgmScene(scene));

new DialogueController(bus);
const view = new AppView({ bus, store, battle, postBattle, sound, client });
view.init();

if (
  typeof window !== "undefined" &&
  (new URLSearchParams(window.location.search).has("debug") ||
    window.location.hash.includes("debug") ||
    window.localStorage?.getItem("koraku_debug") === "true")
) {
  window.__KORAKU_DEBUG__ = { bus, store, battle, postBattle, view, client };
  const panel = document.createElement("details");
  panel.className = "debug-panel";
  panel.innerHTML =
    "<summary>DEV</summary>" +
    '<button type="button" data-debug="victory">強制勝利</button>' +
    '<button type="button" data-debug="defeat">強制敗北</button>' +
    '<button type="button" data-debug="progress">Lv.10／500 星砂</button>';
  panel.addEventListener("click", async (event) => {
    const action = event.target.dataset.debug;
    if (action === "victory" && battle.snapshot()?.active) battle.end?.(true);
    if (action === "defeat" && battle.snapshot()?.active) battle.end?.(false);
    if (action === "progress") {
      const state = client.getState();
      const currentLevel = state.profile?.level || 1;
      const currentSp = state.profile?.skillPoints || 0;
      const currentCoins = state.coins || 0;
      await client.send(Commands.CHEAT_SET_STATS, {
        level: Math.max(10, currentLevel),
        skillPoints: Math.max(45, currentSp),
        coins: Math.max(500, currentCoins)
      });
    }
  });
  document.body.append(panel);
}

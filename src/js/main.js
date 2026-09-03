import { Persistence } from "./services/Persistence.js";
import { SoundSystem } from "./systems/SoundSystem.js";
import { AppView } from "./ui/AppView.js";
import { DialogueController } from "./ui/DialogueController.js";
import { LocalGameClient } from "./kernel/LocalGameClient.js";
import { RemoteGameClient } from "./net/RemoteGameClient.js";
import { Commands } from "./kernel/protocol.js";

export function getInjectedServerUrl() {
  if (typeof window === "undefined") return null;
  if (window.KORAKU_SERVER_URL) return window.KORAKU_SERVER_URL;
  if (window.__KORAKU_CONFIG__?.serverUrl) return window.__KORAKU_CONFIG__.serverUrl;
  return null;
}

/**
 * Resolve client execution mode with detailed status
 * @param {object} [env={}]
 * @returns {{ mode: "offline"|"online", warningKey: string|null }}
 */
export function resolveClientModeDetails(env = {}) {
  let search = "";
  let storageValue = null;
  let protocol = "";
  let serverUrl = null;

  if (typeof window !== "undefined") {
    search = window.location?.search || "";
    storageValue = window.localStorage?.getItem("koraku_mode");
    protocol = window.location?.protocol || "";
    serverUrl = getInjectedServerUrl();
  }

  if (env.search !== undefined) search = env.search;
  if (env.storageValue !== undefined) storageValue = env.storageValue;
  if (env.protocol !== undefined) protocol = env.protocol;
  if (env.serverUrl !== undefined) serverUrl = env.serverUrl;

  if (protocol === "file:") {
    return { mode: "offline", warningKey: null };
  }

  const params = new URLSearchParams(search.startsWith("?") ? search : (search ? `?${search}` : ""));
  const modeParam = params.get("mode")?.trim().toLowerCase();

  let requestedMode = null;
  if (modeParam === "offline" || modeParam === "online") {
    requestedMode = modeParam;
  } else if (storageValue === "offline" || storageValue === "online") {
    requestedMode = storageValue;
  }

  if (requestedMode === "offline") {
    return { mode: "offline", warningKey: null };
  }

  if (requestedMode === "online") {
    if (serverUrl) {
      return { mode: "online", warningKey: null };
    }
    // Online requested without injected server URL: cannot derive from origin, downgrade to offline
    return { mode: "offline", warningKey: "connection.noServerConfigured" };
  }

  // Default: if injected server URL exists -> online, otherwise offline
  if (serverUrl) {
    return { mode: "online", warningKey: null };
  }

  return { mode: "offline", warningKey: null };
}

/**
 * Resolve whether the client should boot in offline sandbox or online authoritative mode
 * @param {object} [env={}]
 * @returns {"offline"|"online"}
 */
export function resolveClientMode(env = {}) {
  return resolveClientModeDetails(env).mode;
}

if (typeof window !== "undefined") {
  const { mode, warningKey } = resolveClientModeDetails();
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

  if (warningKey) {
    bus.emit("toast", { key: warningKey, tone: "warning" });
  }

  if (
    new URLSearchParams(window.location.search).has("debug") ||
    window.location.hash.includes("debug") ||
    window.localStorage?.getItem("koraku_debug") === "true"
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
}

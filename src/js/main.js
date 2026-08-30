import { EventBus } from "./core/EventBus.js";
import { GameStore } from "./core/GameStore.js";
import { Persistence } from "./services/Persistence.js";
import { BattleSystem } from "./systems/BattleSystem.js";
import { PostBattleSystem } from "./systems/PostBattleSystem.js";
import { SoundSystem } from "./systems/SoundSystem.js";
import { AppView } from "./ui/AppView.js";
import { DialogueController } from "./ui/DialogueController.js";

const bus = new EventBus();
const persistence = new Persistence();
const store = new GameStore(bus, persistence);
const battle = new BattleSystem(bus, store);
const postBattle = new PostBattleSystem(bus, store);
const sound = new SoundSystem(store);

bus.on("battle:ended", (result) => postBattle.open(result));
bus.on("sound", ({ name }) => sound.play(name));
bus.on("bgm:scene", ({ scene }) => sound.setBgmScene(scene));

new DialogueController(bus);
const view = new AppView({ bus, store, battle, postBattle, sound });
view.init();

if (new URLSearchParams(window.location.search).has("debug")) {
  window.__KORAKU_DEBUG__ = { bus, store, battle, postBattle, view };
  const panel = document.createElement("details");
  panel.className = "debug-panel";
  panel.innerHTML =
    "<summary>DEV</summary>" +
    '<button type="button" data-debug="victory">強制勝利</button>' +
    '<button type="button" data-debug="defeat">強制敗北</button>' +
    '<button type="button" data-debug="progress">Lv.10／500 星砂</button>';
  panel.addEventListener("click", (event) => {
    const action = event.target.dataset.debug;
    if (action === "victory" && battle.snapshot()?.active) battle.end(true);
    if (action === "defeat" && battle.snapshot()?.active) battle.end(false);
    if (action === "progress") {
      store.state.profile.level = Math.max(10, store.state.profile.level);
      store.state.profile.skillPoints = Math.max(45, store.state.profile.skillPoints);
      store.state.coins = Math.max(500, store.state.coins);
      store.commit("debug-progress");
    }
  });
  document.body.append(panel);
}

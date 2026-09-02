import { I18n } from "../services/I18n.js";

export class DialogueController {
  constructor(bus) {
    this.speakerElement = document.querySelector("#dialogue-speaker");
    this.textElement = document.querySelector("#dialogue-text");
    this.characterElements = [...document.querySelectorAll("[data-character-speaker]")];
    this.timer = null;
    this.stopTimer = null;
    this.fullText = "";
    this.bus = bus;
    this.bus.on("dialogue", (line) => this.show(line));
    document.querySelector("#battle-dialogue")?.addEventListener("click", () => this.reveal());
  }

  show(payload) {
    if (!payload) return;
    window.clearInterval(this.timer);
    window.clearTimeout(this.stopTimer);

    let speaker = "";
    let text = "";

    if (typeof payload === "string") {
      text = payload;
    } else if (payload.key) {
      text = I18n.t(payload.key, payload.params || {});
      if (payload.speakerKey) {
        speaker = I18n.t(payload.speakerKey);
      } else if (payload.speaker) {
        speaker = payload.speaker;
      }
    } else {
      speaker = payload.speaker || "";
      text = payload.text || "";
    }

    this.fullText = text;
    if (this.speakerElement) {
      this.speakerElement.textContent = speaker;
    }
    if (this.textElement) {
      this.textElement.textContent = "";
    }
    const characters = Array.from(text);
    let index = 0;
    const isSpeaking = Boolean(speaker && !["旁白", "Narrator", "ナレーション"].includes(speaker));
    this.setSpeaking(isSpeaking);

    this.timer = window.setInterval(() => {
      index += 1;
      if (this.textElement) {
        this.textElement.textContent = characters.slice(0, index).join("");
      }
      if (index >= characters.length) {
        window.clearInterval(this.timer);
        this.timer = null;
        this.stopTimer = window.setTimeout(() => this.setSpeaking(false), 260);
      }
    }, 28);
  }

  reveal() {
    if (!this.timer) return;
    window.clearInterval(this.timer);
    this.timer = null;
    if (this.textElement) {
      this.textElement.textContent = this.fullText;
    }
    this.setSpeaking(false);
  }

  setSpeaking(active) {
    this.characterElements.forEach((element) => element.classList.toggle("is-speaking", active));
  }
}


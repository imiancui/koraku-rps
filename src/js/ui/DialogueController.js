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

  show({ speaker, text }) {
    window.clearInterval(this.timer);
    window.clearTimeout(this.stopTimer);
    this.fullText = text;
    this.speakerElement.textContent = speaker;
    this.textElement.textContent = "";
    const characters = Array.from(text);
    let index = 0;
    this.setSpeaking(speaker === "小樂");

    this.timer = window.setInterval(() => {
      index += 1;
      this.textElement.textContent = characters.slice(0, index).join("");
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
    this.textElement.textContent = this.fullText;
    this.setSpeaking(false);
  }

  setSpeaking(active) {
    this.characterElements.forEach((element) => element.classList.toggle("is-speaking", active));
  }
}

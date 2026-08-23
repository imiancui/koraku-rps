const NOTES = {
  select: [[620, 0.04]],
  reveal: [[220, 0.05], [440, 0.08]],
  skill: [[520, 0.06], [780, 0.08], [1040, 0.1]],
  danger: [[180, 0.08], [150, 0.1]],
  hit: [[120, 0.05], [90, 0.08]],
  hurt: [[95, 0.09], [70, 0.13]],
  heal: [[440, 0.05], [660, 0.08], [880, 0.12]],
  victory: [[523, 0.08], [659, 0.08], [784, 0.16]],
  defeat: [[220, 0.12], [196, 0.14], [147, 0.22]]
};

export class SoundSystem {
  constructor(store) {
    this.store = store;
    this.context = null;
  }

  play(name) {
    if (this.store.snapshot().settings.muted || !NOTES[name]) return;
    try {
      this.context ||= new AudioContext();
      let cursor = this.context.currentTime;
      NOTES[name].forEach(([frequency, duration]) => {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = name === "danger" || name === "hurt" ? "sawtooth" : "sine";
        oscillator.frequency.setValueAtTime(frequency, cursor);
        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(0.065, cursor + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
        oscillator.connect(gain).connect(this.context.destination);
        oscillator.start(cursor);
        oscillator.stop(cursor + duration + 0.02);
        cursor += duration;
      });
    } catch {
      // Audio is optional and should never interrupt gameplay.
    }
  }
}

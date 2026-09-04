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
    this.masterMusicGain = null;
    this.masterSfxGain = null;
    this.currentScene = "lobby"; // "lobby" | "battle"
    this.isMusicRunning = false;
    this.musicTimer = null;
    this.nextNoteTime = 0;
    this.currentStep = 0;
    this.totalStepsLobby = 64; // 16 beats * 4 sixteenths at 60 BPM
    this.totalStepsBattle = 64; // 16 beats * 4 sixteenths at 136 BPM
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;

    this.bindUnlockGesture();
  }

  bindUnlockGesture() {
    if (typeof window === "undefined") return;

    if (typeof navigator !== "undefined" && navigator.audioSession) {
      try {
        navigator.audioSession.type = "ambient";
      } catch (_) {}
    }

    const unlock = () => {
      this.ensureContext();
      if (this.context) {
        if (this.context.state === "suspended" || this.context.state === "interrupted") {
          this.context.resume().then(() => {
            this.updateAudioState();
          }).catch(() => {});
        }
        try {
          const buffer = this.context.createBuffer(1, 1, 22050);
          const source = this.context.createBufferSource();
          source.buffer = buffer;
          source.connect(this.context.destination);
          source.start(0);
        } catch (_) {}
      }
      this.updateAudioState();
    };

    const events = ["pointerdown", "touchstart", "touchend", "click", "keydown"];
    events.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this.ensureContext();
          if (this.context) {
            if (this.context.state === "suspended" || this.context.state === "interrupted") {
              this.context.resume().then(() => this.updateAudioState()).catch(() => {});
            } else {
              this.updateAudioState();
            }
          }
        }
      });
    }

    window.addEventListener("pageshow", () => {
      this.ensureContext();
      if (this.context) {
        this.context.resume().then(() => this.updateAudioState()).catch(() => {});
      }
    });

    window.addEventListener("focus", () => {
      this.ensureContext();
      if (this.context) {
        if (this.context.state === "suspended" || this.context.state === "interrupted") {
          this.context.resume().then(() => this.updateAudioState()).catch(() => {});
        }
      }
    });
  }

  ensureContext() {
    if (typeof navigator !== "undefined" && navigator.audioSession) {
      try {
        navigator.audioSession.type = "ambient";
      } catch (_) {}
    }

    if (this.context && this.context.state !== "closed") return this.context;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.context = new AudioCtx();

      this.context.onstatechange = () => {
        if (this.context?.state === "interrupted" || this.context?.state === "suspended") {
          this.context.resume().catch(() => {});
        }
        this.updateAudioState();
      };

      this.masterMusicGain = this.context.createGain();
      this.masterSfxGain = this.context.createGain();

      const { isMusicMuted, isSfxMuted } = this.getEffectiveMuteState();

      const now = Math.max(this.context.currentTime, 0);
      this.masterMusicGain.gain.setValueAtTime(isMusicMuted ? 0.0001 : 0.22, now);
      this.masterSfxGain.gain.setValueAtTime(isSfxMuted ? 0.0001 : 0.35, now);

      this.masterMusicGain.connect(this.context.destination);
      this.masterSfxGain.connect(this.context.destination);

      return this.context;
    } catch {
      return null;
    }
  }

  getEffectiveMuteState() {
    const snap = this.store?.snapshot ? this.store.snapshot() : {};
    let isMusicMuted = Boolean(snap.settings?.musicMuted);
    let isSfxMuted = Boolean(snap.settings?.sfxMuted ?? snap.settings?.muted);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const sm = window.localStorage.getItem("koraku_music_muted");
        if (sm !== null) isMusicMuted = sm === "true";
        const ss = window.localStorage.getItem("koraku_sfx_muted");
        if (ss !== null) isSfxMuted = ss === "true";
      }
    } catch (_) {}
    return { isMusicMuted, isSfxMuted };
  }

  setBgmScene(scene) {
    const targetScene = scene === "battle" ? "battle" : "lobby";
    if (this.currentScene === targetScene && this.isMusicRunning) return;
    this.currentScene = targetScene;
    this.currentStep = 0;
    if (this.context) {
      this.nextNoteTime = this.context.currentTime + 0.05;
    }
    this.updateMusicState();
  }

  updateMusicState() {
    this.ensureContext();
    if (!this.context) return;

    const { isMusicMuted } = this.getEffectiveMuteState();
    const now = Math.max(this.context.currentTime, 0);

    if (this.masterMusicGain) {
      this.masterMusicGain.gain.cancelScheduledValues(now);
      this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
      this.masterMusicGain.gain.linearRampToValueAtTime(isMusicMuted ? 0.0001 : 0.22, now + 0.15);
    }

    if (!isMusicMuted) {
      if (this.context.state === "running") {
        this.startMusicScheduler();
      } else if (this.context.state === "suspended" || this.context.state === "interrupted") {
        this.context.resume().then(() => {
          if (this.context?.state === "running") {
            this.startMusicScheduler();
          }
        }).catch(() => {});
      }
    } else {
      this.stopMusicScheduler();
    }
  }

  updateSfxState() {
    this.ensureContext();
    if (!this.context) return;

    const { isSfxMuted } = this.getEffectiveMuteState();
    const now = Math.max(this.context.currentTime, 0);

    if (this.masterSfxGain) {
      this.masterSfxGain.gain.cancelScheduledValues(now);
      this.masterSfxGain.gain.setValueAtTime(this.masterSfxGain.gain.value, now);
      this.masterSfxGain.gain.linearRampToValueAtTime(isSfxMuted ? 0.0001 : 0.35, now + 0.08);
    }
  }

  updateAudioState() {
    this.updateMusicState();
    this.updateSfxState();
  }

  startMusicScheduler() {
    if (this.isMusicRunning) return;
    this.isMusicRunning = true;
    if (this.context) {
      this.nextNoteTime = this.context.currentTime + 0.1;
    }
    this.musicTimer = setInterval(() => {
      this.scheduler();
    }, 45);
  }

  stopMusicScheduler() {
    this.isMusicRunning = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.stopDrone();
  }

  scheduler() {
    if (!this.context || this.context.state !== "running") return;
    const now = this.context.currentTime;
    // Prevent scheduler backlog when browser/tab is backgrounded or throttled on iOS
    if (this.nextNoteTime < now) {
      this.nextNoteTime = now + 0.04;
    }
    const scheduleAheadTime = 0.22;
    while (this.nextNoteTime < now + scheduleAheadTime) {
      if (this.currentScene === "battle") {
        this.scheduleBattleStep(this.currentStep, this.nextNoteTime);
        const sixteenthTime = 60.0 / (136.0 * 4.0); // 136 BPM
        this.nextNoteTime += sixteenthTime;
        this.currentStep = (this.currentStep + 1) % this.totalStepsBattle;
      } else {
        this.scheduleLobbyStep(this.currentStep, this.nextNoteTime);
        const sixteenthTime = 60.0 / (62.0 * 4.0); // 62 BPM
        this.nextNoteTime += sixteenthTime;
        this.currentStep = (this.currentStep + 1) % this.totalStepsLobby;
      }
    }
  }

  // --- LOBBY PROCEDURAL JAPANESE AMBIENT (和風・遊雅之琴) ---
  scheduleLobbyStep(step, time) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;

    // Ambient Shinto drone background
    if (step === 0 && !this.droneGain) {
      this.startLobbyDrone(time);
    }

    // Traditional Pentatonic Scale (D Minor Hirajoshi / In-Sen)
    // D4: 293.66, F4: 349.23, G4: 392.00, A4: 440.00, C5: 523.25, D5: 587.33, F5: 698.46, A5: 880.00
    const kotoPattern = [
      { step: 0, freq: 293.66, vel: 0.24, dur: 0.8 }, // D4
      { step: 4, freq: 440.00, vel: 0.20, dur: 0.7 }, // A4
      { step: 8, freq: 523.25, vel: 0.22, dur: 0.9 }, // C5
      { step: 12, freq: 587.33, vel: 0.18, dur: 0.6 }, // D5
      { step: 16, freq: 698.46, vel: 0.22, dur: 1.0 }, // F5
      { step: 20, freq: 587.33, vel: 0.17, dur: 0.5 }, // D5
      { step: 24, freq: 440.00, vel: 0.21, dur: 0.8 }, // A4
      { step: 28, freq: 392.00, vel: 0.19, dur: 0.6 }, // G4
      { step: 32, freq: 349.23, vel: 0.23, dur: 0.9 }, // F4
      { step: 36, freq: 392.00, vel: 0.18, dur: 0.5 }, // G4
      { step: 40, freq: 440.00, vel: 0.22, dur: 0.8 }, // A4
      { step: 44, freq: 523.25, vel: 0.17, dur: 0.6 }, // C5
      { step: 48, freq: 587.33, vel: 0.24, dur: 1.2 }, // D5
      { step: 54, freq: 440.00, vel: 0.16, dur: 0.6 }, // A4
      { step: 58, freq: 349.23, vel: 0.18, dur: 0.8 }, // F4
      { step: 62, freq: 293.66, vel: 0.22, dur: 1.1 }  // D4
    ];

    const note = kotoPattern.find((p) => p.step === step);
    if (note) {
      this.playKotoPluck(note.freq, time, note.vel, note.dur);
    }

    // Suzu shrine wind bell on bar 4 and bar 12
    if (step === 16 || step === 48) {
      this.playSuzuBell(step === 16 ? 1760 : 2349.32, time + 0.15, 0.08);
    }

    // Shakuhachi soft flute breath note
    if (step === 32) {
      this.playShakuhachi(440.00, time, 0.12, 2.2);
    }
  }

  startLobbyDrone(time) {
    try {
      const ctx = this.context;
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, time);
      this.droneGain.gain.linearRampToValueAtTime(0.038, time + 2.0);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, time);

      this.droneOsc1 = ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(146.83, time); // D3

      this.droneOsc2 = ctx.createOscillator();
      this.droneOsc2.type = "sine";
      this.droneOsc2.frequency.setValueAtTime(220.00, time); // A3

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain).connect(this.masterMusicGain);

      this.droneOsc1.start(time);
      this.droneOsc2.start(time);
    } catch {}
  }

  stopDrone() {
    try {
      if (this.droneGain && this.context) {
        const now = this.context.currentTime;
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
        setTimeout(() => {
          try {
            this.droneOsc1?.stop();
            this.droneOsc2?.stop();
            this.droneOsc1 = null;
            this.droneOsc2 = null;
            this.droneGain = null;
          } catch {}
        }, 450);
      }
    } catch {}
  }

  playKotoPluck(frequency, time, velocity = 0.2, duration = 0.8) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, safeTime);
      // Slight pitch bend drop at initial pluck attack
      osc.frequency.linearRampToValueAtTime(frequency * 0.992, safeTime + 0.04);

      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(frequency * 2, safeTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 3.5, safeTime);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, safeTime + duration);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + duration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain).connect(this.masterMusicGain);

      osc.start(safeTime);
      oscHarmonic.start(safeTime);
      osc.stop(safeTime + duration + 0.05);
      oscHarmonic.stop(safeTime + duration + 0.05);
    } catch {}
  }

  playShakuhachi(frequency, time, velocity = 0.12, duration = 2.0) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, safeTime);
      // Natural gentle vibrato
      osc.frequency.linearRampToValueAtTime(frequency + 4, safeTime + 0.8);
      osc.frequency.linearRampToValueAtTime(frequency - 4, safeTime + 1.4);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(frequency * 1.4, safeTime);
      filter.Q.setValueAtTime(2.0, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.4);
      gain.gain.linearRampToValueAtTime(safeVel * 0.7, safeTime + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + duration);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + duration + 0.05);
    } catch {}
  }

  playSuzuBell(frequency, time, velocity = 0.08) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 1.4);

      osc.connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 1.45);
    } catch {}
  }

  // --- BATTLE PROCEDURAL JAPANESE COMBAT (狐火・決戰激闘) ---
  scheduleBattleStep(step, time) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;

    if (this.droneGain) {
      this.stopDrone();
    }

    // Taiko Drum Beats (136 BPM, 16-beat loop = 64 sixteenth steps)
    // O-Daiko Deep Taiko Kick on 1, 3 (every other beat) + syncopations
    if ([0, 6, 8, 14, 16, 22, 24, 30, 32, 38, 40, 46, 48, 54, 56, 62].includes(step)) {
      this.playTaikoKick(time, step % 8 === 0 ? 0.32 : 0.22);
    }

    // Tsuke-Daiko Sharp Rim / Ka on beats 2, 4
    if ([4, 12, 20, 28, 36, 44, 52, 60].includes(step)) {
      this.playTaikoRim(time, 0.18);
    }

    // Driving Shamisen / Battle Pluck Arpeggio (Kumoi / In-sen scale)
    // D4: 293.66, Eb4: 311.13, G4: 392.00, A4: 440.00, Bb4: 466.16, D5: 587.33
    const battleRiff = [
      { step: 0, freq: 293.66 }, // D4
      { step: 2, freq: 311.13 }, // Eb4
      { step: 4, freq: 392.00 }, // G4
      { step: 6, freq: 440.00 }, // A4
      { step: 8, freq: 466.16 }, // Bb4
      { step: 10, freq: 440.00 }, // A4
      { step: 12, freq: 392.00 }, // G4
      { step: 14, freq: 311.13 }, // Eb4
      { step: 16, freq: 293.66 }, // D4
      { step: 18, freq: 392.00 }, // G4
      { step: 20, freq: 440.00 }, // A4
      { step: 22, freq: 587.33 }, // D5
      { step: 24, freq: 466.16 }, // Bb4
      { step: 26, freq: 440.00 }, // A4
      { step: 28, freq: 392.00 }, // G4
      { step: 30, freq: 311.13 }, // Eb4
      { step: 32, freq: 392.00 }, // G4
      { step: 34, freq: 440.00 }, // A4
      { step: 36, freq: 466.16 }, // Bb4
      { step: 38, freq: 587.33 }, // D5
      { step: 40, freq: 622.25 }, // Eb5
      { step: 42, freq: 587.33 }, // D5
      { step: 44, freq: 466.16 }, // Bb4
      { step: 46, freq: 440.00 }, // A4
      { step: 48, freq: 587.33 }, // D5
      { step: 50, freq: 466.16 }, // Bb4
      { step: 52, freq: 440.00 }, // A4
      { step: 54, freq: 392.00 }, // G4
      { step: 56, freq: 311.13 }, // Eb4
      { step: 58, freq: 293.66 }, // D4
      { step: 60, freq: 220.00 }, // A3
      { step: 62, freq: 293.66 }  // D4
    ];

    const shamisenNote = battleRiff.find((n) => n.step === step);
    if (shamisenNote) {
      this.playBattleShamisen(shamisenNote.freq, time, 0.16);
    }

    // Tension Bassline on 8th notes (steps 0, 2, 4, 8...)
    if (step % 2 === 0) {
      const bassFreq = step < 32 ? 146.83 : (step < 48 ? 196.00 : 220.00); // D3, G3, A3
      this.playTensionBass(bassFreq, time, 0.15);
    }

    // Hyoshigi (Japanese wooden clappers) accent on measure 4 & 8
    if (step === 30 || step === 62) {
      this.playHyoshigi(time, 0.20);
    }
  }

  playTaikoKick(time, velocity = 0.28) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(148, safeTime);
      osc.frequency.exponentialRampToValueAtTime(36, safeTime + 0.18);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, safeTime);
      filter.frequency.exponentialRampToValueAtTime(70, safeTime + 0.16);

      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.22);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.24);
    } catch {}
  }

  playTaikoRim(time, velocity = 0.16) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1350, safeTime);
      filter.Q.setValueAtTime(3.2, safeTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.045);

      noise.connect(filter).connect(gain).connect(this.masterMusicGain);
      noise.start(safeTime);
      noise.stop(safeTime + 0.05);
    } catch {}
  }

  playBattleShamisen(frequency, time, velocity = 0.15) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(frequency, safeTime);
      osc.frequency.linearRampToValueAtTime(frequency * 0.99, safeTime + 0.02);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 4.2, safeTime);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.5, safeTime + 0.12);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.14);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.16);
    } catch {}
  }

  playTensionBass(frequency, time, velocity = 0.14) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(frequency, safeTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(340, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.12);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.13);
    } catch {}
  }

  playHyoshigi(time, velocity = 0.18) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(2350, safeTime);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2350, safeTime);
      filter.Q.setValueAtTime(4.5, safeTime);

      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.05);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.06);
    } catch {}
  }

  // --- SOUND EFFECTS (SFX) ---
  play(name) {
    const { isSfxMuted } = this.getEffectiveMuteState();
    if (isSfxMuted) return;
    this.ensureContext();
    if (!this.context) return;

    try {
      if (this.context.state === "suspended" || this.context.state === "interrupted") {
        this.context.resume().catch(() => {});
      }

      if (name === "punch" || name === "fistPunch") {
        this.playFistPunch();
        return;
      }
      if (name === "counterRub" || name === "rub" || name === "counter") {
        this.playCounterRub();
        return;
      }
      if (name === "qteSuccess" || name === "qteStep") {
        this.playQteSuccess();
        return;
      }
      if (name === "qteWrong") {
        this.playQteWrong();
        return;
      }
      if (name === "qteFail" || name === "qteDefeat") {
        this.playQteFail();
        return;
      }

      if (!NOTES[name]) return;
      let cursor = Math.max(this.context.currentTime, 0) + 0.002;
      NOTES[name].forEach(([frequency, duration]) => {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = name === "danger" || name === "hurt" ? "sawtooth" : "sine";
        oscillator.frequency.setValueAtTime(frequency, cursor);
        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(0.08, cursor + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
        oscillator.connect(gain).connect(this.masterSfxGain || this.context.destination);
        oscillator.start(cursor);
        oscillator.stop(cursor + duration + 0.02);
        cursor += duration;
      });
    } catch {}
  }

  playQteSuccess() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    // High pitched crisp bell
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1174.66, now); // D6
    osc1.frequency.exponentialRampToValueAtTime(1760.00, now + 0.08); // A6
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.006);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc1.connect(gain1).connect(sfxDest);
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Harmonic sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2349.32, now); // D7
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.10, now + 0.004);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc2.connect(gain2).connect(sfxDest);
    osc2.start(now);
    osc2.stop(now + 0.14);
  }

  playQteWrong() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(180, now + 0.04);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.10);
  }

  playQteFail() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    // Deep low monotone boom
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(92, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.35);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.32, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  playFistPunch() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 0.15);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.2);

    const bufferSize = Math.floor(ctx.sampleRate * 0.07);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1100, now);
    noiseFilter.Q.setValueAtTime(1.6, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    noise.connect(noiseFilter).connect(noiseGain).connect(sfxDest);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  playCounterRub() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;
    const duration = 0.44;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.65;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.4, now);
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.linearRampToValueAtTime(1950, now + 0.12);
    filter.frequency.linearRampToValueAtTime(1150, now + 0.22);
    filter.frequency.linearRampToValueAtTime(2150, now + 0.32);
    filter.frequency.linearRampToValueAtTime(950, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.18);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter).connect(gain).connect(sfxDest);
    noise.start(now);
    noise.stop(now + duration + 0.02);

    const tone = ctx.createOscillator();
    const toneGain = ctx.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(420, now);
    tone.frequency.linearRampToValueAtTime(560, now + 0.18);
    tone.frequency.linearRampToValueAtTime(460, now + duration);

    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.045, now + 0.12);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    tone.connect(toneGain).connect(sfxDest);
    tone.start(now);
    tone.stop(now + duration + 0.02);
  }
}

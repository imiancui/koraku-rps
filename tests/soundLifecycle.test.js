// tests/soundLifecycle.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { SoundSystem } from "../src/js/systems/SoundSystem.js";

test("音訊生命週期：visibilityState 為 hidden 時自動停止排程並暫停 AudioContext，切回 visible 時恢復", async () => {
  const origWindow = globalThis.window;
  const origDoc = globalThis.document;

  const docListeners = new Map();
  const winListeners = new Map();

  let contextState = "running";
  let suspendCount = 0;
  let resumeCount = 0;
  let closeCount = 0;

  class MockAudioContext {
    constructor() {
      this.state = contextState;
      this.currentTime = 0;
      this.destination = {};
      this.onstatechange = null;
    }
    createGain() {
      return {
        gain: {
          value: 1,
          setValueAtTime: () => {},
          linearRampToValueAtTime: () => {},
          cancelScheduledValues: () => {}
        },
        connect: () => ({ connect: () => {} })
      };
    }
    createOscillator() {
      return {
        type: "sine",
        frequency: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        connect: () => ({ connect: () => {} }),
        start: () => {},
        stop: () => {}
      };
    }
    createBiquadFilter() {
      return {
        type: "lowpass",
        frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        Q: { setValueAtTime: () => {} },
        connect: () => ({ connect: () => {} })
      };
    }
    createBuffer() {
      return { getChannelData: () => new Float32Array(100) };
    }
    createBufferSource() {
      return { buffer: null, connect: () => ({ connect: () => {} }), start: () => {}, stop: () => {} };
    }
    async suspend() {
      suspendCount++;
      contextState = "suspended";
      this.state = "suspended";
      if (this.onstatechange) this.onstatechange();
    }
    async resume() {
      resumeCount++;
      contextState = "running";
      this.state = "running";
      if (this.onstatechange) this.onstatechange();
    }
    async close() {
      closeCount++;
      contextState = "closed";
      this.state = "closed";
      if (this.onstatechange) this.onstatechange();
    }
  }

  const mockDoc = {
    visibilityState: "visible",
    addEventListener: (ev, fn) => {
      if (!docListeners.has(ev)) docListeners.set(ev, []);
      docListeners.get(ev).push(fn);
    }
  };

  const mockWin = {
    AudioContext: MockAudioContext,
    webkitAudioContext: MockAudioContext,
    addEventListener: (ev, fn) => {
      if (!winListeners.has(ev)) winListeners.set(ev, []);
      winListeners.get(ev).push(fn);
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    }
  };

  globalThis.document = mockDoc;
  globalThis.window = mockWin;

  try {
    const mockStore = { snapshot: () => ({ settings: { musicMuted: false, sfxMuted: false } }) };
    const sound = new SoundSystem(mockStore);

    // 1. 模擬使用者互動解鎖
    const unlockFn = winListeners.get("click")?.[0];
    assert.ok(unlockFn, "應註冊解鎖事件");
    unlockFn();

    assert.equal(sound.isUnlocked, true, "使用者交互後應標記為已解鎖");
    assert.equal(sound.isMusicRunning, true, "解鎖且 visible 下應啟動音樂排程");
    assert.ok(sound.musicTimer !== null, "音樂計時器應處於活躍狀態");

    // 2. 模擬分頁切換到背景 (hidden)
    mockDoc.visibilityState = "hidden";
    const visFns = docListeners.get("visibilitychange") || [];
    visFns.forEach((fn) => fn());

    assert.equal(sound.isPausedByVisibility, true, "hidden 狀態應標記 isPausedByVisibility = true");
    assert.equal(sound.isMusicRunning, false, "hidden 狀態應停止音樂排程");
    assert.equal(sound.musicTimer, null, "hidden 狀態計時器應為 null");
    assert.equal(suspendCount >= 1, true, "hidden 狀態應呼叫 context.suspend()");

    // 3. 在 hidden 狀態下觸發 onstatechange，禁止強行 resume
    const prevResume = resumeCount;
    if (sound.context.onstatechange) {
      sound.context.onstatechange();
    }
    assert.equal(resumeCount, prevResume, "hidden 狀態下觸發 onstatechange 不得強行 resume");

    // 4. 在 hidden 狀態下呼叫 startMusicScheduler() 或 play() 應直接 return
    sound.startMusicScheduler();
    assert.equal(sound.isMusicRunning, false, "hidden 狀態下直接呼叫 startMusicScheduler 不得啟動");

    // 5. 模擬切回分頁 (visible)
    mockDoc.visibilityState = "visible";
    visFns.forEach((fn) => fn());

    assert.equal(sound.isPausedByVisibility, false, "切回 visible 後 isPausedByVisibility 應重設為 false");
    assert.equal(resumeCount > prevResume, true, "切回 visible 且未靜音時應呼叫 context.resume()");
    assert.equal(sound.isMusicRunning, true, "切回 visible 後音樂排程應自動重啟");
    assert.ok(sound.musicTimer !== null, "音樂計時器應重新產生");

    // 6. 模擬頁面卸載 (pagehide)
    const pagehideFns = winListeners.get("pagehide") || [];
    assert.ok(pagehideFns.length > 0, "應監聽 pagehide 事件");
    pagehideFns.forEach((fn) => fn());

    assert.equal(sound.isMusicRunning, false, "pagehide 觸發時應停止音樂排程");
    assert.equal(sound.musicTimer, null, "pagehide 觸發時音樂計時器應清除");

    // 7. dispose 銷毀測試
    sound.dispose();
    assert.equal(closeCount >= 1, true, "dispose 應關閉 AudioContext");
    assert.equal(sound.context, null, "dispose 後 context 應清空");
  } finally {
    globalThis.window = origWindow;
    globalThis.document = origDoc;
  }
});

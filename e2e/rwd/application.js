import { expect } from "@playwright/test";

export async function openApp(page, appUrl, { debug = true, freeze = true } = {}) {
  if (freeze) await page.clock.install({ time: new Date("2026-09-01T00:00:00Z") });
  await page.addInitScript(() => {
    let seed = 147852;
    Math.random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  });
  const response = await page.goto(appUrl + (debug ? "/?debug=1" : "/"), { waitUntil: "load" });
  expect(response.status()).toBe(200);
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
  await page.locator("#lang-select").selectOption("zh-Hant");
  await readyAssets(page);
  if (freeze) await page.clock.pauseAt(new Date("2026-09-01T00:05:00Z"));
  return page.evaluate(({ debug, freeze }) => ({
    debug, freeze, randomSeed: 147852, locale: document.querySelector("#lang-select").value,
    lang: document.documentElement.lang, fonts: document.fonts.status,
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    input: { maxTouchPoints: navigator.maxTouchPoints, coarse: matchMedia("(pointer: coarse)").matches, anyCoarse: matchMedia("(any-pointer: coarse)").matches, hoverNone: matchMedia("(hover: none)").matches },
    browserAgent: navigator.userAgent,
    imageSources: [...document.images].filter(img => img.getAttribute("src")).map(img => ({ src: img.getAttribute("src"), naturalWidth: img.naturalWidth, complete: img.complete }))
  }), { debug, freeze });
}

export async function readyAssets(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(img => img.getAttribute("src")).map(img => img.decode()));
  });
}

export async function settleFiniteLayout(page, selector) {
  if (page.context().browser()?.browserType().name() !== "chromium") {
    await page.waitForFunction(selector => {
      const target = document.querySelector(selector);
      if (!target) return false;
      const finite = animation => animation.playState === "running" && animation.effect.getTiming().iterations !== Infinity;
      const running = target.getAnimations({ subtree: true }).filter(finite);
      for (let element = target.parentElement; element; element = element.parentElement) running.push(...element.getAnimations().filter(finite));
      for (const animation of running) animation.finish();
      return running.length === 0;
    }, selector);
    return;
  }
  await page.waitForFunction(selector => {
    const target = document.querySelector(selector);
    if (!target) return false;
    if (target.getAnimations({ subtree: true }).some(animation =>
      animation.playState === "running" && animation.effect.getTiming().iterations !== Infinity
    )) return false;
    for (let element = target; element; element = element.parentElement) {
      if (element.getAnimations().some(animation =>
        animation.playState === "running" && animation.effect.getTiming().iterations !== Infinity
      )) return false;
    }
    return true;
  }, selector);
}

export async function readAppState(page) {
  return page.evaluate(() => {
    const requireElement = selector => {
      const element = document.querySelector(selector);
      if (!element) throw new Error("Required state element missing: " + selector);
      return element;
    };
    const shown = selector => {
      const element = requireElement(selector);
      const css = getComputedStyle(element);
      return Boolean(element.getClientRects().length && css.visibility === "visible" && css.display !== "none");
    };
    const debug = window.__KORAKU_DEBUG__;
    const battle = debug?.battle.snapshot();
    const dojo = debug?.view;
    return {
      screen: requireElement("#app").dataset.screen,
      debug: Boolean(debug),
      battle: battle ? {
        active: battle.active, stageId: battle.stage.id, phase: battle.phase, enemies: battle.enemies.length,
        hasDualHandSkill: battle.hasDualHandSkill, paused: battle.isPaused,
        selectedHand: battle.selectedHand, selectedHands: battle.selectedHands,
        morphActive: battle.morphActive, morphUsed: battle.morphUsed,
        qteActive: debug.battle.qte.active, dualQteActive: debug.battle.dualQte.active,
        qteLength: debug.battle.qte.sequence.length,
        qteSequence: [...debug.battle.qte.sequence], qteIndex: debug.battle.qte.index,
        leftLength: debug.battle.dualQte.left?.sequence.length || 0,
        rightLength: debug.battle.dualQte.right?.sequence.length || 0,
        leftSequence: [...(debug.battle.dualQte.left?.sequence || [])],
        rightSequence: [...(debug.battle.dualQte.right?.sequence || [])],
        leftIndex: debug.battle.dualQte.left?.index || 0,
        rightIndex: debug.battle.dualQte.right?.index || 0
      } : null,
      dojo: {
        active: Boolean(dojo?.dojoQteActive), style: dojo?.dojoQteStyle || null,
        singleActive: Boolean(dojo?.dojoQteSystem?.active), dualActive: Boolean(dojo?.dojoDualQteSystem?.active),
        singleLength: dojo?.dojoQteSystem?.sequence.length || 0,
        singleSequence: [...(dojo?.dojoQteSystem?.sequence || [])],
        singleIndex: dojo?.dojoQteSystem?.index || 0,
        leftLength: dojo?.dojoDualQteSystem?.left?.sequence.length || 0,
        rightLength: dojo?.dojoDualQteSystem?.right?.sequence.length || 0,
        leftSequence: [...(dojo?.dojoDualQteSystem?.left?.sequence || [])],
        rightSequence: [...(dojo?.dojoDualQteSystem?.right?.sequence || [])],
        leftIndex: dojo?.dojoDualQteSystem?.left?.index || 0,
        rightIndex: dojo?.dojoDualQteSystem?.right?.index || 0
      },
      dom: {
        handsSingle: shown("#hand-selector-single"), handsDual: shown("#hand-selector-dual"),
        qteActive: requireElement("#qte-overlay").classList.contains("is-active"),
        qteSingle: shown("#qte-panel-single"), qteDual: shown("#qte-panel-dual"),
        singleArrows: requireElement("#qte-sequence").children.length,
        leftArrows: requireElement("#dual-qte-sequence-left").children.length,
        rightArrows: requireElement("#dual-qte-sequence-right").children.length,
        dojoSingle: shown("#dojo-qte-single-container"), dojoDual: shown("#dojo-qte-dual-container"),
        dojoSingleArrows: requireElement("#dojo-qte-sequence").children.length,
        dojoLeftArrows: requireElement("#dojo-dual-sequence-left").children.length,
        dojoRightArrows: requireElement("#dojo-dual-sequence-right").children.length,
        saveOpen: !requireElement("#save-record-modal").hidden && requireElement("#save-record-modal").getAttribute("aria-hidden") === "false",
        pauseOpen: !requireElement("#battle-pause-modal").hidden
      }
    };
  });
}

export async function assertAppState(page, expected) {
  if (!expected || !Object.keys(expected).length) throw new Error("Empty application state contract");
  const actual = await readAppState(page);
  expect(actual, "Actual application state does not match the requested state").toMatchObject(expected);
  return actual;
}

export const stateContracts = {
  home: { screen: "home" },
  "battle-single": { screen: "battle", battle: { active: true, phase: "countdown", stageId: 1, enemies: 1, hasDualHandSkill: false }, dom: { handsSingle: true, handsDual: false, qteActive: false } },
  "battle-single-dual-hand": { screen: "battle", battle: { active: true, phase: "countdown", stageId: 1, enemies: 1, hasDualHandSkill: true }, dom: { handsSingle: false, handsDual: true, qteActive: false } },
  "battle-dual": { screen: "battle", battle: { active: true, phase: "countdown", stageId: 4, enemies: 2, hasDualHandSkill: true }, dom: { handsSingle: false, handsDual: true, qteActive: false } },
  "battle-single-morph": { screen: "battle", battle: { active: true, phase: "reaction", stageId: 1, enemies: 1, hasDualHandSkill: false, morphActive: true }, dom: { handsSingle: true, handsDual: false, qteActive: false } },
  "battle-dual-morph": { screen: "battle", battle: { active: true, phase: "reaction", stageId: 4, enemies: 2, hasDualHandSkill: true, morphActive: true }, dom: { handsSingle: false, handsDual: true, qteActive: false } },
  "dojo-sandbox-single": { screen: "battle", battle: { active: true, phase: "countdown", stageId: 991, enemies: 1, hasDualHandSkill: false } },
  "dojo-sandbox-dual": { screen: "battle", battle: { active: true, phase: "countdown", stageId: 992, enemies: 2, hasDualHandSkill: true } },
  "battle-qte-single": { screen: "battle", battle: { active: true, phase: "qte", stageId: 3, qteActive: true, qteLength: 7 }, dom: { qteActive: true, qteSingle: true, qteDual: false, singleArrows: 7 } },
  "battle-qte-dual": { screen: "battle", battle: { active: true, phase: "qte", stageId: 4, dualQteActive: true, leftLength: 7, rightLength: 7 }, dom: { qteActive: true, qteSingle: false, qteDual: true, leftArrows: 7, rightArrows: 7 } },
  "dojo-qte-single": { screen: "dojo-qte", dojo: { active: true, style: "single", singleActive: true, singleLength: 5 }, dom: { dojoSingle: true, dojoDual: false, dojoSingleArrows: 5 } },
  "dojo-qte-dual": { screen: "dojo-qte", dojo: { active: true, style: "dual", dualActive: true, leftLength: 5, rightLength: 5 }, dom: { dojoSingle: false, dojoDual: true, dojoLeftArrows: 5, dojoRightArrows: 5 } },
  "save-overlay": { screen: "home", dom: { saveOpen: true } },
  "pause-overlay": { screen: "battle", battle: { active: true, paused: true }, dom: { pauseOpen: true } }
};

export async function prepareState(page, appUrl, state) {
  if (!Object.hasOwn(stateContracts, state)) throw new Error("Unknown application state: " + state);
  const environment = await openApp(page, appUrl);
  const dual = ["battle-single-dual-hand", "battle-dual", "battle-dual-morph", "battle-qte-dual", "dojo-sandbox-dual"].includes(state);
  if (state !== "home" && state !== "save-overlay") {
    await page.evaluate(dual => {
      const debug = window.__KORAKU_DEBUG__;
      if (!debug) throw new Error("Existing debug entry unavailable");
      debug.store.state.profile.level = 10;
      debug.store.state.profile.skills.dualHand = dual ? 1 : 0;
      debug.store.commit("rwd-isolated-progress");
    }, dual);
  }
  if (state === "save-overlay") {
    await page.locator("#open-save-record-modal").click();
    await expect(page.locator("#save-record-modal")).toBeVisible();
  } else if (state.startsWith("dojo-")) {
    await page.locator("#btn-menu-dojo").click();
    await expect(page.locator("#dojo-modal")).toBeVisible();
    const mode = state.startsWith("dojo-sandbox") ? "2" : "1";
    const style = state.endsWith("dual") ? "dual" : "single";
    await page.locator('.dojo-tab-btn[data-dojo-mode="' + mode + '"]').click();
    await page.locator('label:has(input[name="dojo-mode' + mode + '-style"][value="' + style + '"])').click();
    await expect(page.locator('input[name="dojo-mode' + mode + '-style"][value="' + style + '"]')).toBeChecked();
    await page.locator("#btn-start-dojo-practice").click();
  } else if (state !== "home") {
    const stage = ["battle-dual", "battle-dual-morph", "battle-qte-dual"].includes(state) ? 4 : state === "battle-qte-single" ? 3 : 1;
    await page.locator('#screen-home button[data-nav="stages"]').click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "stages");
    await page.locator('[data-stage="' + stage + '"]').click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "battle");
    if (state === "battle-qte-single" || state === "battle-qte-dual") {
      // Existing safe debug methods create a real QTE system/DOM, not test-only UI.
      await page.evaluate(dual => {
        const battle = window.__KORAKU_DEBUG__.battle;
        if (dual) battle.startDualQte(); else battle.startQte();
      }, state === "battle-qte-dual");
    }
    if (state === "battle-single-morph" || state === "battle-dual-morph") {
      await page.evaluate(() => {
        const battle = window.__KORAKU_DEBUG__.battle;
        battle.revealHands();
        battle.useMorph();
      });
    }
    if (state === "pause-overlay") await page.keyboard.press("Escape");
  }
  await readyAssets(page);
  return { environment, state: await assertAppState(page, stateContracts[state]) };
}

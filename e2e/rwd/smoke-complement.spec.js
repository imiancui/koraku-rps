import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout, auditScrollEnd } from "./layout-audit.js";
import { advanceQte, advanceQteKeyboard, criticalAudit, reachEnd, scrollSnapshot, touchDrag } from "./stage-b-helpers.js";

async function openSurface(page, appUrl, surface) {
  const environment = await openApp(page, appUrl);
  await page.locator(`#screen-home button[data-nav="${surface}"]`).click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", surface);
  await settleFiniteLayout(page, `#screen-${surface}`);
  return { environment, state: await readAppState(page) };
}

async function homeFooter(page, appUrl, item) {
  const environment = await openApp(page, appUrl);
  await settleFiniteLayout(page, "#screen-home");
  const reach = await reachEnd(page, { ...item, state: "home-end", surface: "home", input: item.input === "mouse-keyboard" ? "keyboard" : "touch" }, { forceInput: true });
  await page.locator('.home-footer button, .home-footer [role="button"], #footer-app-version-btn').first().focus();
  return { environment, reach, state: await readAppState(page) };
}

async function contentEnd(page, appUrl, item) {
  const prepared = await openSurface(page, appUrl, item.state);
  const reach = await reachEnd(page, { ...item, surface: item.state, input: item.input === "touch" ? "touch" : "mouse" }, { forceInput: true });
  await page.locator(`#screen-${item.state} button[data-nav="home"]`).click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
  return { prepared, reach, result: await readAppState(page) };
}

async function battleCase(page, appUrl, item) {
  const prepared = await prepareState(page, appUrl, item.state);
  await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
  const touch = item.input !== "mouse-keyboard";
  const audit = await criticalAudit(page, item.state, { includeTouchControls: touch });
  expect(audit.violations).toEqual([]);
  if (item.state === "battle-single") {
    if (item.input === "mouse-keyboard") await page.keyboard.press("2");
    else await page.locator('#hand-selector-single button[data-hand="paper"]').tap();
    expect((await readAppState(page)).battle.selectedHand).toBe("paper");
    return { prepared, audit, result: await readAppState(page) };
  }
  if (item.state === "battle-dual") {
    const selector = '#hand-selector-dual button[data-hand-slot="left"][data-hand="paper"]';
    if (item.input === "mouse-keyboard") await page.locator(selector).click();
    else await page.locator(selector).tap();
    expect((await readAppState(page)).battle.selectedHands.left).toBe("paper");
    return { prepared, audit, result: await readAppState(page) };
  }
  const interaction = touch ? await advanceQte(page, item.state) : await advanceQteKeyboard(page, item.state);
  expect(interaction.violations).toEqual([]);
  return { prepared, audit, interaction };
}

function postState(appearance) {
  return {
    won: true,
    appearance,
    stage: { id: 1 },
    reward: { coins: 999999, xp: 999999, levelsGained: 9, dps: 999999, damageDealt: 999999999, damageTaken: 999999, durationSec: 9999 },
    scene: "victory",
    target: 0.5,
    tolerance: 0.13,
    watermelon: { attempts: 0, maxAttempts: 3, successes: 0, lastCutSuccess: false }
  };
}

async function postCase(page, appUrl, item) {
  const prepared = await prepareState(page, appUrl, "battle-single");
  await settleFiniteLayout(page, "#screen-battle");
  const appearance = await page.locator("#battle-character").getAttribute("src");
  if (item.state === "settlement") {
    await page.evaluate(state => window.__KORAKU_DEBUG__.bus.emit("postbattle:state", state), postState(appearance));
    await expect(page.locator("#result-overlay")).toHaveClass(/is-active/);
    await settleFiniteLayout(page, "#result-overlay");
    const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
      { selector: "#result-overlay" }, { selector: ".result-card" },
      { selector: '#postbattle-actions button[data-post-action="home"]', hitTest: true, text: true }
    ] });
    expect(audit.violations).toEqual([]);
    await page.locator('#postbattle-actions button[data-post-action="home"]').click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
    return { prepared, audit, result: await readAppState(page) };
  }
  await page.evaluate(({ appearance }) => {
    const debug = window.__KORAKU_DEBUG__;
    debug.battle.autoBattle.active = true;
    debug.battle.autoBattle.isPaused = false;
    debug.bus.emit("postbattle:auto-watermelon", {
      stock: 2, scene: "watermelonAim", appearance, target: 0.5, tolerance: 0.13,
      watermelon: { attempts: 0, maxAttempts: 3, successes: 0, lastCutSuccess: false }
    });
  }, { appearance });
  await expect(page.locator("#floating-autobattle-watermelon")).toBeVisible();
  await settleFiniteLayout(page, "#floating-autobattle-watermelon");
  const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
    { selector: "#floating-autobattle-watermelon" },
    { selector: "#btn-auto-watermelon-strike", hitTest: true, text: true },
    { selector: "#btn-close-floating-watermelon", hitTest: true }
  ] });
  expect(audit.violations).toEqual([]);
  await page.locator("#btn-close-floating-watermelon").click();
  await expect(page.locator("#floating-autobattle-watermelon")).toBeHidden();
  return { prepared, audit, result: await readAppState(page) };
}

async function scrollInnerEnd(page, selector, input) {
  const before = await scrollSnapshot(page, selector);
  if (before.scrollHeight <= before.clientHeight) return { before, after: before };
  const inputEvidence = [];
  if (input === "mouse-keyboard") {
    const audit = await auditScrollEnd(page, selector, `${selector} > :last-child`);
    expect(audit.violations).toEqual([]);
    return { before, after: audit.after, inputEvidence: [{ method: "mouse-wheel", trusted: true, nativeTouchPan: false }] };
  }
  for (let index = 0; index < 30; index++) {
    const current = await scrollSnapshot(page, selector);
    if (current.scrollTop >= current.scrollHeight - current.clientHeight - 1) break;
    inputEvidence.push(await touchDrag(page, selector, 0, -300, "content-pan"));
  }
  const after = await scrollSnapshot(page, selector);
  expect(after.scrollTop).toBeGreaterThanOrEqual(after.scrollHeight - after.clientHeight - 1);
  return { before, after, inputEvidence };
}

async function overlayCase(page, appUrl, item) {
  let environment;
  let modal;
  let close;
  let inner = null;
  if (item.state === "pause") {
    const prepared = await prepareState(page, appUrl, "pause-overlay");
    environment = prepared.environment;
    modal = "#battle-pause-modal";
    close = "#btn-resume-battle";
  } else {
    environment = await openApp(page, appUrl);
    if (item.state === "auto") {
      await page.evaluate(() => {
        const debug = window.__KORAKU_DEBUG__;
        const records = debug.store.state.records;
        records.clearedStages = [...new Set([...(records.clearedStages || []), 1])];
        records.wins = Math.max(1, records.wins || 0);
        records.manualWins = Math.max(1, records.manualWins || 0);
        records.stageStats ||= {};
        records.stageStats[1] = { ...(records.stageStats[1] || {}), totalAttempts: 1, manualWins: 1, manualLosses: 0, autoWins: 0, autoLosses: 0 };
        debug.store.commit("rwd-auto-overlay-cleared");
        debug.view.openAutoBattleModal(1);
      });
      modal = "#auto-battle-modal"; close = "#btn-cancel-autobattle";
    } else if (item.state === "dojo") {
      await page.locator("#btn-menu-dojo").click(); modal = "#dojo-modal"; close = "#close-dojo-modal";
    } else if (item.state === "save") {
      await page.locator("#open-save-record-modal").click(); modal = "#save-record-modal"; close = "#close-save-record-modal"; inner = ".save-record-content";
    } else if (item.state === "cheat-auth") {
      await page.locator("#open-cheat-modal").click(); modal = "#cheat-auth-modal"; close = "#close-cheat-auth-modal";
    } else if (item.state === "cheat-menu") {
      await page.locator("#open-cheat-modal").click();
      await page.locator("#cheat-auth-password").fill("8989");
      await page.locator("#cheat-auth-form").press("Enter");
      modal = "#cheat-modal"; close = "#close-cheat-modal";
    } else {
      await page.locator("#footer-app-version-btn, #footer-app-version").first().click(); modal = "#changelog-modal"; close = "#btn-close-changelog"; inner = "#changelog-modal-list";
    }
  }
  await expect(page.locator(modal)).toBeVisible();
  await settleFiniteLayout(page, modal);
  const scroll = inner ? await scrollInnerEnd(page, inner, item.input) : null;
  const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
    { selector: modal }, { selector: `${modal} .modal-card` }, { selector: close, hitTest: true, text: true }
  ] });
  expect(audit.violations).toEqual([]);
  await page.locator(close).click();
  await expect(page.locator(modal)).toBeHidden();
  return { environment, modal, close, scroll, audit, result: await readAppState(page) };
}

async function galleryOpenCase(page, appUrl, item) {
  const environment = await openApp(page, appUrl);
  await page.evaluate(() => {
    const debug = window.__KORAKU_DEBUG__;
    debug.store.state.records.unlockedGalleryAll = true;
    debug.store.commit("rwd-gallery-open");
  });
  await page.locator('#screen-home button[data-nav="gallery"]').click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "gallery");
  await settleFiniteLayout(page, "#screen-gallery");
  if (item.input !== "mouse-keyboard") {
    const popupPromise = page.waitForEvent("popup");
    await page.locator("#btn-gallery-zoom").click();
    const popup = await popupPromise;
    await popup.waitForLoadState("load");
    const popupUrl = popup.url();
    expect(popupUrl).toMatch(/\/koraku\//);
    await popup.close();
    return { environment, branch: "touch-new-tab", popupUrl };
  }
  await page.locator("#btn-gallery-zoom").click();
  await expect(page.locator("#gallery-lightbox-modal")).toBeVisible();
  await settleFiniteLayout(page, "#gallery-lightbox-modal");
  const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
    { selector: "#gallery-lightbox-modal" }, { selector: "#gallery-lightbox-image" }, { selector: "#btn-close-lightbox", hitTest: true }
  ] });
  expect(audit.violations).toEqual([]);
  await page.locator("#btn-close-lightbox").click();
  await expect(page.locator("#gallery-lightbox-modal")).toBeHidden();
  return { environment, branch: "desktop-lightbox", audit };
}

for (const item of requiredCases("smoke-complement")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input !== "mouse-keyboard" });
    test(`[${item.id}] @smoke-complement`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.kind === "home-footer" ? await homeFooter(page, appUrl, item)
        : item.kind === "content-end" ? await contentEnd(page, appUrl, item)
        : item.kind === "battle" ? await battleCase(page, appUrl, item)
        : item.kind === "post" ? await postCase(page, appUrl, item)
        : item.kind === "gallery-open" ? await galleryOpenCase(page, appUrl, item)
        : await overlayCase(page, appUrl, item);
      await attachJson(testInfo, "smoke-complement-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
    });
  });
}

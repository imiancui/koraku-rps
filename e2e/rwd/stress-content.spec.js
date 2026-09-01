import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout } from "./layout-audit.js";
import { criticalAudit, scrollSnapshot, touchDrag } from "./stage-b-helpers.js";

async function audit(page, elements) {
  return page.evaluate(auditLayout, { documentOverflow: true, elements });
}

async function setLocale(page, locale) {
  const htmlLang = { "zh-Hant": "zh-TW", "zh-Hans": "zh-CN", en: "en-US", ja: "ja-JP" }[locale];
  await page.locator("#lang-select").selectOption(locale);
  await expect(page.locator("#lang-select")).toHaveValue(locale);
  await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe(htmlLang);
}

async function localeCase(page, appUrl, item) {
  let prepared;
  if (item.state === "battle-single") {
    prepared = await prepareState(page, appUrl, "battle-single");
    await setLocale(page, item.locale);
    await settleFiniteLayout(page, "#screen-battle");
    const result = await criticalAudit(page, "battle-single", { includeTouchControls: false });
    expect(result.violations).toEqual([]);
    return { prepared, audit: result, locale: item.locale, actual: await readAppState(page) };
  }
  const environment = await openApp(page, appUrl);
  await setLocale(page, item.locale);
  if (item.state === "equipment") {
    await page.locator('#screen-home button[data-nav="equipment"]').click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "equipment");
    await settleFiniteLayout(page, "#screen-equipment");
    const result = await audit(page, [
      { selector: "#screen-equipment" },
      { selector: "#screen-equipment .page-heading", text: true },
      { selector: '#screen-equipment button[data-nav="home"]', hitTest: true, text: true }
    ]);
    expect(result.violations).toEqual([]);
    return { environment, audit: result, locale: item.locale, actual: await readAppState(page) };
  }
  await settleFiniteLayout(page, "#screen-home");
  const result = await audit(page, [
    { selector: ".global-header" },
    { selector: "#home-title", text: true },
    { selector: ".main-menu" },
    { selector: '.menu-command.primary', hitTest: true, text: true }
  ]);
  expect(result.violations).toEqual([]);
  return { environment, audit: result, locale: item.locale, actual: await readAppState(page) };
}

async function unbrokenCase(page, appUrl) {
  const environment = await openApp(page, appUrl);
  const target = '.menu-command.primary b';
  const injected = "RWDUNBROKEN".repeat(12);
  await page.locator(target).evaluate((element, value) => { element.textContent = value; }, injected);
  const result = await audit(page, [{ selector: '.menu-command.primary', hitTest: true, text: true }]);
  expect(result.violations).toEqual([]);
  return { environment, injectedLength: injected.length, audit: result };
}

async function largeValuesCase(page, appUrl) {
  const environment = await openApp(page, appUrl);
  await page.evaluate(() => {
    const debug = window.__KORAKU_DEBUG__;
    debug.store.state.profile.level = 999999999;
    debug.store.state.coins = Number.MAX_SAFE_INTEGER;
    debug.store.commit("rwd-large-values");
  });
  await expect(page.locator("#header-level")).toHaveText("999999999");
  await expect(page.locator("#header-coins")).toContainText("9,007");
  const result = await audit(page, [
    { selector: ".global-header" },
    { selector: "#header-level", text: true },
    { selector: "#header-coins", text: true },
    { selector: ".lang-select-wrap" }
  ]);
  expect(result.violations).toEqual([]);
  return { environment, audit: result, values: { level: 999999999, coins: Number.MAX_SAFE_INTEGER } };
}

async function maxListCase(page, appUrl, item) {
  const environment = await openApp(page, appUrl);
  await page.locator('#screen-home button[data-nav="records"]').click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "records");
  await settleFiniteLayout(page, "#screen-records");
  await page.locator("#records-recent-battles-list").evaluate(list => {
    list.replaceChildren(...Array.from({ length: 100 }, (_, index) => {
      const row = document.createElement("div");
      row.className = "recent-battle-card rwd-stress-row";
      row.textContent = `第 ${index + 1} 筆・白金小樂・999,999,999 DAMAGE・UNBROKEN${index}`;
      return row;
    }));
  });
  const surface = "#screen-records";
  const before = await scrollSnapshot(page, surface);
  if (item.input === "touch") {
    for (let index = 0; index < 60; index++) {
      const current = await scrollSnapshot(page, surface);
      if (current.scrollTop >= current.scrollHeight - current.clientHeight - 1) break;
      await touchDrag(page, surface, 0, -Math.max(180, item.viewport[1] * 0.65));
    }
  } else {
    await page.locator(surface).hover({ position: { x: 2, y: 120 } });
    for (let index = 0; index < 5; index++) {
      const current = await scrollSnapshot(page, surface);
      if (current.scrollTop >= current.scrollHeight - current.clientHeight - 1) break;
      await page.mouse.wheel(0, current.scrollHeight + current.clientHeight);
      await page.clock.runFor(1000);
    }
  }
  const after = await scrollSnapshot(page, surface);
  expect(after.scrollTop).toBeGreaterThan(0);
  expect(after.scrollTop).toBeGreaterThanOrEqual(after.scrollHeight - after.clientHeight - 1);
  const result = await audit(page, [{ selector: ".rwd-stress-row:last-child", text: true }]);
  expect(result.violations).toEqual([]);
  return { environment, before, after, audit: result, injectedRows: 100 };
}

async function fontScaleCase(page, appUrl, item) {
  const environment = await openApp(page, appUrl);
  const target = '.menu-command.primary b';
  const before = await page.locator(target).evaluate(element => Number.parseFloat(getComputedStyle(element).fontSize));
  const requested = before * item.scale;
  await page.addStyleTag({ content: `${target} { font-size: ${requested}px; line-height: 1.25; overflow-wrap: anywhere; }` });
  const after = await page.locator(target).evaluate(element => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(after / before).toBeCloseTo(item.scale, 2);
  const result = await audit(page, [{ selector: '.menu-command.primary', hitTest: true, text: true }]);
  expect(result.violations).toEqual([]);
  return {
    environment, beforePx: before, afterPx: after, measuredScale: after / before, audit: result,
    method: "targeted test-only CSS font-size injection",
    notRun: ["browser zoom", "OS font scaling", "software keyboard safe area"]
  };
}

for (const item of requiredCases("stress-content")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" });
    test(`[${item.id}] @stress-content`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.kind === "locale" ? await localeCase(page, appUrl, item)
        : item.kind === "unbroken" ? await unbrokenCase(page, appUrl)
        : item.kind === "large-values" ? await largeValuesCase(page, appUrl)
        : item.kind === "max-list" ? await maxListCase(page, appUrl, item)
        : await fontScaleCase(page, appUrl, item);
      await attachJson(testInfo, "stress-content-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
    });
  });
}

import { expect } from "@playwright/test";
import { attachJson } from "./fixtures.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout } from "./layout-audit.js";

const contentSurfaces = new Set(["stages", "growth", "equipment", "shop", "records", "gallery", "guide"]);

export function stageBState(name) {
  return ({
    "home-default": "home", "home-footer": "home", "home-footer-end": "home", "save-long": "save-overlay",
    "battle-single-countdown": "battle-single", "battle-dual-countdown": "battle-dual",
    "battle-dual-qte": "battle-qte-dual", "dojo-single-qte": "dojo-qte-single",
    "dojo-dual-qte": "dojo-qte-dual"
  })[name] || name;
}

export async function prepareStageB(page, appUrl, item) {
  const state = stageBState(item.state);
  if (state.endsWith("-end")) {
    const surface = state.slice(0, -4);
    const environment = await openApp(page, appUrl);
    await page.locator(`#screen-home button[data-nav="${surface}"]`).click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", surface);
    await settleFiniteLayout(page, `#screen-${surface}`);
    return { environment, state: await readAppState(page) };
  }
  const result = await prepareState(page, appUrl, state);
  await settleFiniteLayout(page, `#screen-${result.state.screen}`);
  return result;
}

export async function touchDrag(page, selector, dx, dy) {
  const locator = page.locator(selector);
  const box = await locator.boundingBox();
  if (!box) throw new Error("Touch target has no rendered box: " + selector);
  const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const engine = page.context().browser()?.browserType().name() || "unknown";
  if (engine === "chromium") {
    const session = await page.context().newCDPSession(page);
    try {
      await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ ...start, id: 1 }] });
      for (let step = 1; step <= 5; step++) {
        await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: start.x + dx * step / 5, y: start.y + dy * step / 5, id: 1 }] });
      }
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } finally {
      await session.detach();
    }
    return { engine, method: "cdp-touch", trusted: true };
  }

  const pointerEvents = await page.evaluate(() => Boolean(window.PointerEvent));
  const coordinates = (step = 0) => ({
    clientX: start.x + dx * step / 5,
    clientY: start.y + dy * step / 5
  });
  if (pointerEvents) {
    await locator.dispatchEvent("pointerdown", { ...coordinates(), pointerId: 1, pointerType: "touch", isPrimary: true, buttons: 1 });
    for (let step = 1; step <= 5; step++) {
      await locator.dispatchEvent("pointermove", { ...coordinates(step), pointerId: 1, pointerType: "touch", isPrimary: true, buttons: 1 });
    }
    await locator.dispatchEvent("pointerup", { ...coordinates(5), pointerId: 1, pointerType: "touch", isPrimary: true, buttons: 0 });
    return { engine, method: "manual-pointer-event", trusted: false };
  }

  const point = (step = 0) => [{
    identifier: 1,
    ...coordinates(step)
  }];
  await locator.dispatchEvent("touchstart", { touches: point(), changedTouches: point(), targetTouches: point() });
  for (let step = 1; step <= 5; step++) {
    const touches = point(step);
    await locator.dispatchEvent("touchmove", { touches, changedTouches: touches, targetTouches: touches });
  }
  await locator.dispatchEvent("touchend", { touches: [], changedTouches: [], targetTouches: [] });
  return { engine, method: "manual-touch-event", trusted: false };
}

export async function scrollSnapshot(page, selector) {
  return page.locator(selector).evaluate((element, selector) => ({
    selector, scrollTop: element.scrollTop, scrollLeft: element.scrollLeft,
    scrollHeight: element.scrollHeight, scrollWidth: element.scrollWidth,
    clientHeight: element.clientHeight, clientWidth: element.clientWidth,
    overflowX: getComputedStyle(element).overflowX, overflowY: getComputedStyle(element).overflowY
  }), selector);
}

export async function markEndTarget(page, surface) {
  if (surface === "home") return ".home-footer";
  if (!contentSurfaces.has(surface)) throw new Error("Unknown content surface: " + surface);
  return page.locator(`#screen-${surface}`).evaluate((root, surface) => {
    const candidates = [...root.querySelectorAll("button,a,input,select,textarea,h1,h2,h3,p,li,small,strong,b,span")]
      .filter(element => {
        const css = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return !element.closest(".page-backdrop") && element.textContent.trim() && element.getClientRects().length && css.display !== "none" && css.visibility === "visible" && css.position !== "fixed" && box.height > 0 && box.height <= root.clientHeight;
      });
    const target = candidates.sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0];
    if (!target) throw new Error("No rendered end target for " + surface);
    target.dataset.rwdEndTarget = surface;
    return `[data-rwd-end-target="${surface}"]`;
  }, surface);
}

export async function reachEnd(page, item, { assertReach = true, forceInput = false } = {}) {
  const surface = item.surface || item.state.replace(/-end$/, "");
  const container = surface === "home" ? "#screen-home" : `#screen-${surface}`;
  const target = await markEndTarget(page, surface);
  const before = await scrollSnapshot(page, container);
  const targetBefore = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true }] });
  const inputEvidence = [];
  if (item.input === "keyboard") {
    const focusable = page.locator(`${container} button:not([disabled]), ${container} a[href], ${container} input:not([disabled]), ${container} select:not([disabled]), ${container} textarea:not([disabled])`).first();
    await focusable.focus();
    await page.keyboard.press("End");
    await page.clock.runFor(1000);
  } else if (item.input === "touch") {
    for (let i = 0; i < 30; i++) {
      const current = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true }] });
      if (!current.violations.length && (!forceInput || i > 0)) break;
      inputEvidence.push(await touchDrag(page, container, 0, -Math.max(120, item.viewport[1] * 0.65)));
    }
  } else {
    await page.locator(container).hover({ position: { x: 10, y: 10 } });
    await page.mouse.wheel(0, before.scrollHeight + item.viewport[1]);
  }
  const after = await scrollSnapshot(page, container);
  const audit = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true, text: true }] });
  const result = { surface, container, target, before, after, targetBefore, audit, input: item.input, inputEvidence };
  if (assertReach) expect(audit.violations, "End target must be reachable after real input").toEqual([]);
  return result;
}

export async function positionCandidateEnd(page, item) {
  const surface = item.state === "home-footer-end" ? "home" : item.state.replace(/-end$/, "");
  const target = await markEndTarget(page, surface);
  const before = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true }] });
  await page.locator(target).evaluate(element => element.scrollIntoView({ block: "end", inline: "nearest" }));
  const after = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true, text: true }] });
  return { surface, target, before, after, positioning: "test-only scrollIntoView for candidate framing; not interaction PASS" };
}

function criticalElements(state) {
  if (state === "battle-qte-single") return ["#qte-panel-single", "#qte-sequence", "#qte-pad"];
  if (state === "battle-qte-dual") return ["#qte-panel-dual", "#dual-qte-slot-left", "#dual-qte-slot-right", "#dual-qte-pad-wrap"];
  if (state === "dojo-qte-single") return ["#screen-dojo-qte", "#dojo-qte-single-container", "#dojo-qte-sequence", "#dojo-qte-pad"];
  if (state === "dojo-qte-dual") return ["#screen-dojo-qte", "#dojo-qte-dual-container", "#dojo-dual-slot-left", "#dojo-dual-slot-right", "#dojo-dual-qte-pad-wrap"];
  const hands = state.includes("dual") || state.includes("dual-hand") ? "#hand-selector-dual" : "#hand-selector-single";
  return ["#abandon-battle", "#enemy-hud", ".round-oracle", ".battle-left-cluster", ".player-hud", ".quick-slots", hands, "#battle-dialogue"];
}

export async function criticalAudit(page, state, { includeTouchControls = true } = {}) {
  const selectors = criticalElements(state).filter(selector => includeTouchControls || !/qte-pad/.test(selector));
  const audit = await page.evaluate(auditLayout, {
    documentOverflow: true,
    elements: selectors.map(selector => ({ selector, hitTest: /button|hand-selector|qte-pad|slot/.test(selector) }))
  });
  const dualPartition = await page.evaluate(() => {
    const dual = document.querySelector("#enemy-hud-dual");
    const css = dual && getComputedStyle(dual);
    const qteActive = document.querySelector("#qte-overlay")?.classList.contains("is-active");
    if (!dual || dual.hidden || css.display === "none" || css.visibility !== "visible" || qteActive) return { applicable: false, violations: [], measurements: [] };
    const box = element => {
      const value = element.getBoundingClientRect();
      return { left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height };
    };
    const hudBox = box(document.querySelector("#enemy-hud"));
    const oracleBox = box(document.querySelector(".round-oracle"));
    const violations = [];
    const measurements = [];
    for (const card of dual.querySelectorAll(".dual-enemy-card")) {
      const side = card.dataset.targetEnemy;
      const cardBox = box(card);
      const atkBox = box(card.querySelector(".hud-atk-badge"));
      const meterBox = box(card.querySelector(".enemy-meter"));
      const atkToMeter = meterBox.top - atkBox.bottom;
      measurements.push({ side, card: cardBox, atk: atkBox, meter: meterBox, atkToMeter });
      if (atkToMeter < 16) violations.push({ detector: "dual-hud-atk-meter-clearance", selector: `[data-target-enemy="${side}"]`, expected: { minGap: 16 }, actual: { gap: atkToMeter, atk: atkBox, meter: meterBox } });
      if (cardBox.left < hudBox.left - 0.5 || cardBox.right > hudBox.right + 0.5) violations.push({ detector: "dual-hud-card-containment", selector: `[data-target-enemy="${side}"]`, expected: hudBox, actual: cardBox });
    }
    const hudToOracle = oracleBox.top - hudBox.bottom;
    measurements.push({ hud: hudBox, oracle: oracleBox, hudToOracle });
    if (hudToOracle < 10) violations.push({ detector: "dual-hud-oracle-clearance", selector: ".round-oracle", expected: { minGap: 10 }, actual: { gap: hudToOracle, hud: hudBox, oracle: oracleBox } });
    return { applicable: true, violations, measurements };
  });
  audit.violations.push(...dualPartition.violations);
  audit.measurements.push(...dualPartition.measurements);
  const resourceFills = await page.evaluate(() => {
    const hud = document.querySelector(".player-hud");
    const css = hud && getComputedStyle(hud);
    if (!hud || !hud.getClientRects().length || hud.closest("[hidden]") || css.display === "none" || css.visibility !== "visible") return { applicable: false, violations: [], measurements: [] };
    const violations = [];
    const measurements = [];
    const inspect = (resource, textSelector, fillSelector) => {
      const text = document.querySelector(textSelector)?.textContent || "";
      const [current, maximum] = text.split("/").map(value => Number(value.replace(/[^0-9.-]/g, "")));
      const fill = document.querySelector(fillSelector);
      const meter = fill?.parentElement;
      if (!fill || !meter || !Number.isFinite(current) || !Number.isFinite(maximum) || maximum <= 0) {
        violations.push({ detector: "player-meter-contract-missing", selector: fillSelector, expected: "numeric current/max and rendered fill", actual: { text, fill: Boolean(fill), meter: Boolean(meter) } });
        return;
      }
      const meterCss = getComputedStyle(meter);
      const fillBox = fill.getBoundingClientRect();
      const meterBox = meter.getBoundingClientRect();
      const paddingX = Number.parseFloat(meterCss.paddingLeft) + Number.parseFloat(meterCss.paddingRight);
      const paddingY = Number.parseFloat(meterCss.paddingTop) + Number.parseFloat(meterCss.paddingBottom);
      const innerWidth = Math.max(0, meter.clientWidth - paddingX);
      const innerHeight = Math.max(0, meter.clientHeight - paddingY);
      const ratio = Math.max(0, Math.min(1, current / maximum));
      const expectedWidth = innerWidth * ratio;
      const measurement = { resource, current, maximum, ratio, meter: { left: meterBox.left, top: meterBox.top, width: meterBox.width, height: meterBox.height, innerWidth, innerHeight, paddingX, paddingY }, fill: { left: fillBox.left, top: fillBox.top, width: fillBox.width, height: fillBox.height }, expectedWidth };
      measurements.push(measurement);
      if (current > 0 && (innerHeight <= 0 || fillBox.height <= 0)) violations.push({ detector: "player-meter-zero-fill-height", selector: fillSelector, expected: { minHeight: 1, current, maximum }, actual: measurement });
      if (Math.abs(fillBox.width - expectedWidth) > 1) violations.push({ detector: "player-meter-fill-ratio", selector: fillSelector, expected: { width: expectedWidth, ratio }, actual: measurement });
      if (ratio === 1 && Math.abs(fillBox.height - innerHeight) > 0.5) violations.push({ detector: "player-meter-full-fill-height", selector: fillSelector, expected: { height: innerHeight }, actual: measurement });
    };
    inspect("hp", "#player-hp-text", "#player-hp-fill");
    inspect("mp", "#player-mp-text", "#player-mp-fill");
    return { applicable: true, violations, measurements };
  });
  audit.violations.push(...resourceFills.violations);
  audit.measurements.push(...resourceFills.measurements);
  const chapterPartition = await page.evaluate(() => {
    const chapter = document.querySelector(".chapter-tag");
    const screen = document.querySelector("#screen-battle");
    if (!chapter || !screen || !chapter.getClientRects().length || chapter.closest("[hidden]") || !screen.classList.contains("is-active")) return { applicable: false, violations: [], measurements: [] };
    const box = element => {
      const value = element.getBoundingClientRect();
      return { left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height };
    };
    const intersection = (left, right) => {
      const width = Math.max(0, Math.min(left.right, right.right) - Math.max(left.left, right.left));
      const height = Math.max(0, Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top));
      return { width, height, area: width * height };
    };
    const chapterBox = box(chapter);
    const screenBox = box(screen);
    const violations = [];
    const measurements = [{ chapter: chapterBox, screen: screenBox, topInset: chapterBox.top - screenBox.top }];
    if (chapterBox.top < screenBox.top + 8) violations.push({ detector: "chapter-header-clearance", selector: ".chapter-tag", expected: { minTopInset: 8, screen: screenBox }, actual: { topInset: chapterBox.top - screenBox.top, chapter: chapterBox } });
    for (const selector of ["#enemy-hud", "#abandon-battle", ".round-oracle", "#battle-damage-log"]) {
      const target = document.querySelector(selector);
      if (!target || !target.getClientRects().length || target.closest("[hidden]") || getComputedStyle(target).visibility !== "visible") continue;
      const targetBox = box(target);
      const overlap = intersection(chapterBox, targetBox);
      measurements.push({ chapter: chapterBox, target: selector, targetBox, overlap });
      if (overlap.area > 0.5) violations.push({ detector: "chapter-ui-overlap", selector: ".chapter-tag", expected: { overlapArea: 0, target: selector }, actual: { overlap, chapter: chapterBox, target: targetBox } });
    }
    return { applicable: true, violations, measurements };
  });
  audit.violations.push(...chapterPartition.violations);
  audit.measurements.push(...chapterPartition.measurements);
  const dojoWorkspace = await page.evaluate(() => {
    const screen = document.querySelector("#screen-dojo-qte");
    if (!screen || !screen.classList.contains("is-active") || !screen.getClientRects().length || screen.closest("[hidden]")) return { applicable: false, violations: [], measurements: [] };
    const box = element => {
      const value = element.getBoundingClientRect();
      return { left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height, centerX: (value.left + value.right) / 2 };
    };
    const near = (actual, expected, tolerance = 1) => Math.abs(actual - expected) <= tolerance;
    const header = document.querySelector(".dojo-qte-header");
    const metrics = document.querySelector(".dojo-metrics-bar");
    const single = document.querySelector("#dojo-qte-single-container");
    const dual = document.querySelector("#dojo-qte-dual-container");
    const activeWorkspace = single && !single.hidden ? single : dual;
    const isDual = activeWorkspace === dual;
    const headerBox = box(header);
    const metricsBox = box(metrics);
    const workspaceBox = box(activeWorkspace);
    const violations = [];
    const measurements = [{ viewportWidth: innerWidth, header: headerBox, metrics: metricsBox, workspace: workspaceBox, isDual }];
    if (innerWidth >= 1280) {
      for (const [name, actual] of [["header-left", headerBox.left], ["header-width", headerBox.width]]) {
        const expected = name === "header-left" ? 16 : 820;
        if (!near(actual, expected)) violations.push({ detector: "desktop-dojo-header-anchor", selector: ".dojo-qte-header", expected: { [name]: expected }, actual: { [name]: actual, box: headerBox } });
      }
      for (const [selector, value] of [[".dojo-metrics-bar", metricsBox], [isDual ? "#dojo-qte-dual-container" : "#dojo-qte-single-container", workspaceBox]]) {
        if (!near(value.width, 1040)) violations.push({ detector: "desktop-dojo-bounded-width", selector, expected: { width: 1040 }, actual: value });
        if (!near(value.centerX, innerWidth / 2)) violations.push({ detector: "desktop-dojo-centered", selector, expected: { centerX: innerWidth / 2 }, actual: value });
      }
      const arrows = [...activeWorkspace.querySelectorAll(".qte-arrow")].map(box);
      const expectedArrow = isDual ? 52 : 80;
      measurements.push({ arrows, expectedArrow });
      for (const arrow of arrows) if (!near(arrow.width, expectedArrow) || !near(arrow.height, expectedArrow)) violations.push({ detector: "desktop-dojo-arrow-size", selector: isDual ? "#dojo-qte-dual-container .qte-arrow" : "#dojo-qte-single-container .qte-arrow", expected: { width: expectedArrow, height: expectedArrow }, actual: arrow });
      if (isDual) {
        const left = box(document.querySelector("#dojo-dual-slot-left"));
        const right = box(document.querySelector("#dojo-dual-slot-right"));
        measurements.push({ leftSlot: left, rightSlot: right, widthDifference: Math.abs(left.width - right.width) });
        if (!near(left.width, right.width)) violations.push({ detector: "desktop-dojo-dual-equal-slots", selector: "#dojo-qte-dual-container", expected: { widthDifference: 0 }, actual: { left, right, widthDifference: Math.abs(left.width - right.width) } });
      }
      const pad = isDual ? document.querySelector("#dojo-dual-qte-pad-wrap") : document.querySelector("#dojo-qte-pad");
      if (pad && !pad.hidden && pad.getClientRects().length && getComputedStyle(pad).display !== "none") {
        const padBox = box(pad);
        const buttons = [...pad.querySelectorAll("button")].map(box);
        measurements.push({ pad: padBox, padButtons: buttons });
        if (!near(padBox.centerX, innerWidth / 2)) violations.push({ detector: "desktop-dojo-pad-centered", selector: isDual ? "#dojo-dual-qte-pad-wrap" : "#dojo-qte-pad", expected: { centerX: innerWidth / 2 }, actual: padBox });
        for (const button of buttons) if (!near(button.height, 52)) violations.push({ detector: "desktop-dojo-pad-button-size", selector: isDual ? "#dojo-dual-qte-pad-wrap button" : "#dojo-qte-pad button", expected: { height: 52 }, actual: button });
      }
    } else if (innerWidth === 1279) {
      for (const [selector, value] of [[".dojo-metrics-bar", metricsBox], [isDual ? "#dojo-qte-dual-container" : "#dojo-qte-single-container", workspaceBox]]) {
        if (!near(value.width, 820) || !near(value.left, 16)) violations.push({ detector: "desktop-dojo-threshold-isolation", selector, expected: { left: 16, width: 820 }, actual: value });
      }
    }
    return { applicable: true, violations, measurements };
  });
  audit.violations.push(...dojoWorkspace.violations);
  audit.measurements.push(...dojoWorkspace.measurements);
  return audit;
}

function vector(direction) {
  return ({
    up: [0, -45], down: [0, 45], left: [-45, 0], right: [45, 0],
    upLeft: [-45, -45], upRight: [45, -45], downLeft: [-45, 45], downRight: [45, 45]
  })[direction];
}

export async function advanceQte(page, state) {
  const before = await readAppState(page);
  const dojo = state.startsWith("dojo-");
  const dual = state.endsWith("dual");
  const direction = dojo
    ? (dual ? before.dojo.leftSequence[before.dojo.leftIndex] : before.dojo.singleSequence[before.dojo.singleIndex])
    : (dual ? before.battle.leftSequence[before.battle.leftIndex] : before.battle.qteSequence[before.battle.qteIndex]);
  const selector = dojo
    ? (dual ? "#dojo-dual-slot-left" : "#dojo-qte-single-container")
    : (dual ? "#dual-qte-slot-left" : "#qte-panel-single");
  const [dx, dy] = vector(direction);
  const scrollBefore = await page.evaluate(() => ({ html: document.documentElement.scrollTop, body: document.body.scrollTop, screen: document.querySelector(".screen:not([hidden])")?.scrollTop || 0 }));
  const inputEvidence = await touchDrag(page, selector, dx, dy);
  const after = await readAppState(page);
  const scrollAfter = await page.evaluate(() => ({ html: document.documentElement.scrollTop, body: document.body.scrollTop, screen: document.querySelector(".screen:not([hidden])")?.scrollTop || 0 }));
  const beforeIndex = dojo ? (dual ? before.dojo.leftIndex : before.dojo.singleIndex) : (dual ? before.battle.leftIndex : before.battle.qteIndex);
  const afterIndex = dojo ? (dual ? after.dojo.leftIndex : after.dojo.singleIndex) : (dual ? after.battle.leftIndex : after.battle.qteIndex);
  const violations = [];
  if (afterIndex !== beforeIndex + 1) violations.push({ detector: "qte-track-progress", expected: beforeIndex + 1, actual: afterIndex });
  if (dual) {
    const otherBefore = dojo ? before.dojo.rightIndex : before.battle.rightIndex;
    const otherAfter = dojo ? after.dojo.rightIndex : after.battle.rightIndex;
    if (otherAfter !== otherBefore) violations.push({ detector: "qte-track-isolation", expected: otherBefore, actual: otherAfter });
  }
  if (JSON.stringify(scrollAfter) !== JSON.stringify(scrollBefore)) violations.push({ detector: "qte-scroll-ownership", expected: scrollBefore, actual: scrollAfter });
  return { direction, selector, before, after, beforeIndex, afterIndex, scrollBefore, scrollAfter, inputEvidence, violations };
}

export async function advanceQteKeyboard(page, state) {
  const before = await readAppState(page);
  const dojo = state.startsWith("dojo-");
  const dual = state.endsWith("dual");
  const direction = dojo
    ? (dual ? before.dojo.leftSequence[before.dojo.leftIndex] : before.dojo.singleSequence[before.dojo.singleIndex])
    : (dual ? before.battle.leftSequence[before.battle.leftIndex] : before.battle.qteSequence[before.battle.qteIndex]);
  const keys = ({
    up: ["w"], down: ["s"], left: ["a"], right: ["d"],
    upLeft: ["w", "a"], upRight: ["w", "d"], downLeft: ["s", "a"], downRight: ["s", "d"]
  })[direction];
  for (const key of keys) await page.keyboard.down(key);
  for (const key of [...keys].reverse()) await page.keyboard.up(key);
  const after = await readAppState(page);
  const beforeIndex = dojo ? (dual ? before.dojo.leftIndex : before.dojo.singleIndex) : (dual ? before.battle.leftIndex : before.battle.qteIndex);
  const afterIndex = dojo ? (dual ? after.dojo.leftIndex : after.dojo.singleIndex) : (dual ? after.battle.leftIndex : after.battle.qteIndex);
  return { direction, keys, before, after, beforeIndex, afterIndex, violations: afterIndex === beforeIndex + 1 ? [] : [{ detector: "keyboard-qte-progress", expected: beforeIndex + 1, actual: afterIndex }] };
}

export async function attachCaseEvidence(testInfo, page, item, evidence) {
  await attachJson(testInfo, "case-contract-and-evidence", {
    expected: item, actualState: await readAppState(page), evidence,
    verdictVocabulary: ["PASS", "FAIL", "NOT_RUN", "NEEDS HUMAN DECISION"], evidenceLevel: "browser-emulated"
  });
  await testInfo.attach("case-image", { body: await page.screenshot(), contentType: "image/png" });
}

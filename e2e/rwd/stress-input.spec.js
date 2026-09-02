import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { advanceQte, advanceQteKeyboard, scrollSnapshot, touchDrag } from "./stage-b-helpers.js";

async function pageScroll(page) {
  return page.evaluate(() => ({
    html: document.documentElement.scrollTop,
    body: document.body.scrollTop,
    screen: document.querySelector(".screen.is-active")?.scrollTop || 0
  }));
}

async function capabilities(page) {
  return page.evaluate(() => ({
    maxTouchPoints: navigator.maxTouchPoints,
    coarse: matchMedia("(pointer: coarse)").matches,
    anyCoarse: matchMedia("(any-pointer: coarse)").matches,
    hoverNone: matchMedia("(hover: none)").matches
  }));
}

async function contentPan(page, appUrl, item) {
  const environment = await openApp(page, appUrl);
  await page.locator('#screen-home button[data-nav="guide"]').click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "guide");
  await settleFiniteLayout(page, "#screen-guide");
  const before = await scrollSnapshot(page, "#screen-guide");
  const outerBefore = await pageScroll(page);
  const inputEvidence = await touchDrag(page, "#screen-guide", 0, -Math.max(220, item.viewport[1] * 0.6), "content-pan");
  const after = await scrollSnapshot(page, "#screen-guide");
  const outerAfter = await pageScroll(page);
  expect(after.scrollTop).toBeGreaterThan(before.scrollTop);
  expect({ html: outerAfter.html, body: outerAfter.body }).toEqual({ html: outerBefore.html, body: outerBefore.body });
  return { environment, capabilities: await capabilities(page), before, after, outerBefore, outerAfter, inputEvidence };
}

function track(snapshot, state, slot = "left") {
  const dojo = state.startsWith("dojo-");
  const dual = state.endsWith("dual");
  const source = dojo ? snapshot.dojo : snapshot.battle;
  if (!dual) return { index: dojo ? source.singleIndex : source.qteIndex, sequence: dojo ? source.singleSequence : source.qteSequence };
  return slot === "left"
    ? { index: source.leftIndex, sequence: source.leftSequence }
    : { index: source.rightIndex, sequence: source.rightSequence };
}

function tapSelector(state, slot, direction) {
  const dojo = state.startsWith("dojo-");
  const dual = state.endsWith("dual");
  if (!dual) return `${dojo ? "#dojo-qte-pad" : "#qte-pad"} button[data-direction="${direction}"]`;
  return `${dojo ? "#dojo-touch-pad" : "#touch-pad"}-${slot} button[data-direction="${direction}"]`;
}

async function tapTrack(page, state, slot = "left") {
  const before = await readAppState(page);
  const selected = track(before, state, slot);
  const otherSlot = slot === "left" ? "right" : "left";
  const otherBefore = state.endsWith("dual") ? track(before, state, otherSlot).index : null;
  const direction = selected.sequence[selected.index];
  const scrollBefore = await pageScroll(page);
  await page.locator(tapSelector(state, slot, direction)).tap();
  const after = await readAppState(page);
  const scrollAfter = await pageScroll(page);
  expect(track(after, state, slot).index).toBe(selected.index + 1);
  if (state.endsWith("dual")) expect(track(after, state, otherSlot).index).toBe(otherBefore);
  expect(scrollAfter).toEqual(scrollBefore);
  return { slot, direction, before, after, scrollBefore, scrollAfter };
}

async function qteInput(page, appUrl, item) {
  const prepared = await prepareState(page, appUrl, item.state);
  await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
  const observedCapabilities = await capabilities(page);
  if (item.mode === "touch-swipe") {
    const interaction = await advanceQte(page, item.state);
    expect(interaction.violations).toEqual([]);
    return { prepared, capabilities: observedCapabilities, interactions: [interaction] };
  }
  if (item.mode === "keyboard") {
    const scrollBefore = await pageScroll(page);
    const interaction = await advanceQteKeyboard(page, item.state);
    const scrollAfter = await pageScroll(page);
    expect(interaction.violations).toEqual([]);
    expect(scrollAfter).toEqual(scrollBefore);
    return { prepared, capabilities: observedCapabilities, scrollBefore, scrollAfter, interactions: [interaction] };
  }
  const interactions = [await tapTrack(page, item.state, "left")];
  if (item.state.endsWith("dual")) interactions.push(await tapTrack(page, item.state, "right"));
  return { prepared, capabilities: observedCapabilities, interactions };
}

for (const item of requiredCases("stress-input")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input !== "mouse-keyboard" });
    test(`[${item.id}] @stress-input`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.state === "guide" ? await contentPan(page, appUrl, item) : await qteInput(page, appUrl, item);
      await attachJson(testInfo, "stress-input-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
    });
  });
}

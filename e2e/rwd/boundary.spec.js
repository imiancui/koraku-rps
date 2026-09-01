import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout } from "./layout-audit.js";
import { advanceQte, advanceQteKeyboard, criticalAudit, scrollSnapshot, touchDrag } from "./stage-b-helpers.js";

const surfaceStates = new Set(["stages", "equipment", "gallery"]);

async function layout(page, selectors) {
  return page.evaluate(auditLayout, {
    documentOverflow: true,
    elements: selectors.map(selector => ({
      selector,
      hitTest: /button|data-nav/.test(selector),
      text: /button|#home-title|\.page-heading|\.global-header/.test(selector)
    }))
  });
}

async function prepareSurface(page, appUrl, surface) {
  const environment = await openApp(page, appUrl);
  await page.locator(`#screen-home button[data-nav="${surface}"]`).click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", surface);
  await settleFiniteLayout(page, `#screen-${surface}`);
  return { environment, state: await readAppState(page) };
}

async function exerciseStatic(page, appUrl, item) {
  if (item.state === "home-header") {
    const environment = await openApp(page, appUrl);
    await settleFiniteLayout(page, "#screen-home");
    const audit = await layout(page, [".global-header", "#home-title", '#screen-home button[data-nav="stages"]']);
    expect(audit.violations).toEqual([]);
    await page.locator('#screen-home button[data-nav="stages"]').click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "stages");
    return { environment, audit, result: await readAppState(page) };
  }
  if (item.state === "save-overlay") {
    const prepared = await prepareState(page, appUrl, "save-overlay");
    await settleFiniteLayout(page, "#save-record-modal");
    const audit = await layout(page, ["#save-record-modal", ".save-record-card", ".save-record-content", "#close-save-record-modal"]);
    expect(audit.violations).toEqual([]);
    const owners = await page.evaluate(() => {
      const card = document.querySelector(".save-record-card");
      const content = document.querySelector(".save-record-content");
      return {
        card: { overflowY: getComputedStyle(card).overflowY, scrollHeight: card.scrollHeight, clientHeight: card.clientHeight },
        content: { overflowY: getComputedStyle(content).overflowY, scrollHeight: content.scrollHeight, clientHeight: content.clientHeight }
      };
    });
    expect(owners.card.overflowY).toBe("hidden");
    expect(["auto", "scroll"]).toContain(owners.content.overflowY);
    await page.locator("#close-save-record-modal").click();
    await expect(page.locator("#save-record-modal")).toBeHidden();
    return { prepared, audit, owners };
  }
  if (surfaceStates.has(item.state)) {
    const prepared = await prepareSurface(page, appUrl, item.state);
    const audit = await layout(page, [`#screen-${item.state}`, `#screen-${item.state} .page-heading`, `#screen-${item.state} button[data-nav="home"]`]);
    expect(audit.violations).toEqual([]);
    await page.locator(`#screen-${item.state} button[data-nav="home"]`).click();
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
    return { prepared, audit, result: await readAppState(page) };
  }

  const state = ({
    "battle-single-controls": "battle-single",
    "battle-dual-controls": "battle-dual",
    "battle-dual-qte": "battle-qte-dual",
    "dojo-dual-qte": "dojo-qte-dual"
  })[item.state];
  const prepared = await prepareState(page, appUrl, state);
  await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
  const touch = item.input !== "mouse-keyboard";
  const audit = await criticalAudit(page, state, { includeTouchControls: touch });
  expect(audit.violations).toEqual([]);
  if (state === "battle-single") {
    await page.locator('#hand-selector-single button[data-hand="paper"]').click();
    expect((await readAppState(page)).battle.selectedHand).toBe("paper");
    return { prepared, audit, result: await readAppState(page) };
  }
  if (state === "battle-dual") {
    await page.locator('#hand-selector-dual button[data-hand-slot="left"][data-hand="paper"]').click();
    expect((await readAppState(page)).battle.selectedHands.left).toBe("paper");
    return { prepared, audit, result: await readAppState(page) };
  }
  const interactions = [];
  if (touch) interactions.push(await advanceQte(page, state));
  if (item.input !== "touch") interactions.push(await advanceQteKeyboard(page, state));
  for (const interaction of interactions) expect(interaction.violations).toEqual([]);
  return { prepared, audit, interactions };
}

async function resizeAndAudit(page, sizes, audit) {
  const snapshots = [];
  for (const [width, height] of sizes.slice(1)) {
    await page.setViewportSize({ width, height });
    snapshots.push({ viewport: { width, height }, state: await readAppState(page), audit: await audit() });
    expect(snapshots.at(-1).audit.violations).toEqual([]);
  }
  return snapshots;
}

async function exerciseResize(page, appUrl, item) {
  if (item.state === "guide-scroll-focus") {
    const prepared = await prepareSurface(page, appUrl, "guide");
    await touchDrag(page, "#screen-guide", 0, -320);
    const before = await scrollSnapshot(page, "#screen-guide");
    expect(before.scrollTop).toBeGreaterThan(0);
    const focus = page.locator('#screen-guide button[data-nav="home"]');
    await focus.focus();
    let expectedScroll = before.scrollTop;
    const snapshots = await resizeAndAudit(page, item.sizes, async () => {
      const state = await readAppState(page);
      expect(state.screen).toBe("guide");
      expect(await focus.evaluate(element => element === document.activeElement)).toBe(true);
      const scroll = await scrollSnapshot(page, "#screen-guide");
      expectedScroll = Math.min(expectedScroll, Math.max(0, scroll.scrollHeight - scroll.clientHeight));
      expect(scroll.scrollTop).toBeCloseTo(expectedScroll, 0);
      expectedScroll = scroll.scrollTop;
      return layout(page, ["#screen-guide", '#screen-guide button[data-nav="home"]']);
    });
    return { prepared, before, snapshots, finalScroll: await scrollSnapshot(page, "#screen-guide") };
  }
  if (item.state === "battle-dual-qte") {
    const prepared = await prepareState(page, appUrl, "battle-qte-dual");
    await settleFiniteLayout(page, "#screen-battle");
    const interaction = await advanceQte(page, "battle-qte-dual");
    expect(interaction.violations).toEqual([]);
    const progress = interaction.afterIndex;
    const snapshots = await resizeAndAudit(page, item.sizes, async () => {
      const state = await readAppState(page);
      expect(state.battle.leftIndex).toBe(progress);
      return criticalAudit(page, "battle-qte-dual", { includeTouchControls: true });
    });
    const afterResizeInteraction = await advanceQte(page, "battle-qte-dual");
    expect(afterResizeInteraction.violations).toEqual([]);
    return { prepared, interaction, snapshots, afterResizeInteraction };
  }
  const prepared = await prepareState(page, appUrl, "battle-single");
  await settleFiniteLayout(page, "#screen-battle");
  const paper = page.locator('#hand-selector-single button[data-hand="paper"]');
  await paper.click();
  await paper.focus();
  const snapshots = await resizeAndAudit(page, item.sizes, async () => {
    const state = await readAppState(page);
    expect(state.battle.selectedHand).toBe("paper");
    expect(await paper.evaluate(element => element === document.activeElement)).toBe(true);
    return criticalAudit(page, "battle-single", { includeTouchControls: true });
  });
  await page.locator('#hand-selector-single button[data-hand="scissors"]').click();
  expect((await readAppState(page)).battle.selectedHand).toBe("scissors");
  return { prepared, snapshots, result: await readAppState(page) };
}

for (const item of requiredCases("boundary")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input !== "mouse-keyboard" });
    test(`[${item.id}] @boundary`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.kind === "runtime-resize"
        ? await exerciseResize(page, appUrl, item)
        : await exerciseStatic(page, appUrl, item);
      await attachJson(testInfo, "boundary-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
      await testInfo.attach("boundary-image", { body: await page.screenshot(), contentType: "image/png" });
    });
  });
}

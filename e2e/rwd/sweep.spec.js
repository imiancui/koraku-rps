import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout } from "./layout-audit.js";
import { advanceQte, criticalAudit } from "./stage-b-helpers.js";

async function homeSweep(page, appUrl) {
  const environment = await openApp(page, appUrl);
  await settleFiniteLayout(page, "#screen-home");
  const audit = await page.evaluate(auditLayout, {
    documentOverflow: true,
    elements: [
      { selector: ".global-header" },
      { selector: "#home-title", text: true },
      { selector: '#screen-home button[data-nav="stages"]', hitTest: true, text: true }
    ]
  });
  expect(audit.violations).toEqual([]);
  await page.locator('#screen-home button[data-nav="stages"]').click();
  await expect(page.locator("#app")).toHaveAttribute("data-screen", "stages");
  return { environment, audit, result: await readAppState(page), operation: "navigate-home-to-stages" };
}

async function battleSweep(page, appUrl) {
  const prepared = await prepareState(page, appUrl, "battle-single");
  await settleFiniteLayout(page, "#screen-battle");
  const audit = await criticalAudit(page, "battle-single", { includeTouchControls: false });
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("2");
  const result = await readAppState(page);
  expect(result.battle.selectedHand).toBe("paper");
  return { prepared, audit, result, operation: "keyboard-select-paper" };
}

async function qteSweep(page, appUrl, state) {
  const prepared = await prepareState(page, appUrl, state);
  await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
  const audit = await criticalAudit(page, state, { includeTouchControls: true });
  expect(audit.violations).toEqual([]);
  const interaction = await advanceQte(page, state);
  expect(interaction.violations).toEqual([]);
  return { prepared, audit, interaction, operation: "touch-swipe-left-track" };
}

for (const item of requiredCases("sweep")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" });
    test(`[${item.id}] @sweep`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.state === "home" ? await homeSweep(page, appUrl)
        : item.state === "battle-single-countdown" ? await battleSweep(page, appUrl)
        : item.state === "battle-dual-qte" ? await qteSweep(page, appUrl, "battle-qte-dual")
        : await qteSweep(page, appUrl, "dojo-qte-dual");
      await attachJson(testInfo, "sweep-evidence", {
        contract: item,
        actualViewport: page.viewportSize(),
        evidence,
        evidenceLevel: "browser-emulated",
        sampledWidthClaimOnly: true,
        fullRwdAcceptance: false
      });
    });
  });
}

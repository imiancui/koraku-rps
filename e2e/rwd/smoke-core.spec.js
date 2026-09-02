import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { openApp, prepareState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout, auditScrollEnd } from "./layout-audit.js";
import { advanceQte, advanceQteKeyboard, criticalAudit, scrollSnapshot, touchDrag } from "./stage-b-helpers.js";

async function reachSaveEnd(page, item) {
  const container = ".save-record-content";
  const target = "#btn-modal-reset-save";
  const before = await scrollSnapshot(page, container);
  if (item.input !== "touch") {
    const audit = await auditScrollEnd(page, container, target);
    return { before, after: audit.after, audit, inputEvidence: { method: "mouse-wheel", trusted: true } };
  }
  const inputEvidence = [];
  for (let i = 0; i < 20; i++) {
    const audit = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true, text: true }] });
    if (!audit.violations.length) break;
    inputEvidence.push(await touchDrag(page, container, 0, -Math.max(120, item.viewport[1] * 0.55), "content-pan"));
  }
  return { before, after: await scrollSnapshot(page, container), audit: await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true, text: true }] }), inputEvidence };
}

for (const item of requiredCases("smoke-core")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" });
    test(`[${item.id}] @smoke-core`, async ({ page, appUrl }, testInfo) => {
      let evidence;
      if (item.state === "home-navigation") {
        const environment = await openApp(page, appUrl, { debug: false });
        const target = '#screen-home button[data-nav="stages"]';
        const audit = await page.evaluate(auditLayout, { elements: [{ selector: target, hitTest: true, text: true }] });
        expect(audit.violations).toEqual([]);
        if (item.input === "touch") await page.locator(target).tap(); else await page.locator(target).click();
        await expect(page.locator("#app")).toHaveAttribute("data-screen", "stages");
        await page.locator('#screen-stages button[data-nav="home"]').click();
        await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
        evidence = { environment, audit, result: await readAppState(page) };
      } else if (item.state === "save-overlay-end") {
        const prepared = await prepareState(page, appUrl, "save-overlay");
        await settleFiniteLayout(page, "#save-record-modal");
        const reach = await reachSaveEnd(page, item);
        expect(reach.audit.violations).toEqual([]);
        evidence = { prepared, reach };
      } else {
        const state = ({
          "battle-single-controls": "battle-single", "battle-dual-qte": "battle-qte-dual",
          "dojo-single-qte": "dojo-qte-single", "dojo-dual-qte": "dojo-qte-dual"
        })[item.state];
        const prepared = await prepareState(page, appUrl, state);
        await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
        const audit = await criticalAudit(page, state, { includeTouchControls: item.input === "touch" });
        expect(audit.violations).toEqual([]);
        if (state === "battle-single") {
          await page.locator('#hand-selector-single button[data-hand="paper"]').click();
          expect((await readAppState(page)).battle.selectedHand).toBe("paper");
          evidence = { prepared, audit, result: await readAppState(page) };
        } else {
          const interaction = item.input === "touch" ? await advanceQte(page, state) : await advanceQteKeyboard(page, state);
          expect(interaction.violations).toEqual([]);
          evidence = { prepared, audit, interaction };
        }
      }
      await attachJson(testInfo, "smoke-core-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
      await testInfo.attach("smoke-core-image", { body: await page.screenshot(), contentType: "image/png" });
    });
  });
}

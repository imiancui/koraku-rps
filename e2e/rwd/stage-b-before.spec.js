import { test, expect } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { assertAppState, readAppState, settleFiniteLayout } from "./application.js";
import { attachCaseEvidence, advanceQte, criticalAudit, prepareStageB, reachEnd, touchDrag } from "./stage-b-helpers.js";

const cases = requiredCases("stage-b-before").filter(item => item.kind !== "candidate");

for (const item of cases) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" || item.input === "hybrid" });
    test(`[${item.id}] @stage-b-before @stage-b-protection`, async ({ page, appUrl }, testInfo) => {
      page.setDefaultTimeout(3000);
      let prepared;
      let evidence;
      let assertion;
      try {
        prepared = await prepareStageB(page, appUrl, item);
        const touchCapable = prepared.environment.input.maxTouchPoints > 0 || prepared.environment.input.coarse || prepared.environment.input.anyCoarse;
        expect(touchCapable).toBe(item.input === "touch" || item.input === "hybrid");
        if (item.kind === "scroll") {
          evidence = await reachEnd(page, item, { assertReach: false });
          assertion = () => expect(evidence.audit.violations, "End content/footer must be genuinely reachable after real input").toEqual([]);
        } else if (item.kind === "rotation") {
          const portraitBefore = item.state === "home" ? null : await criticalAudit(page, item.state);
          await page.setViewportSize({ width: 844, height: 390 });
          await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
          const landscapeState = await readAppState(page);
          const landscape = item.state === "home" ? null : await criticalAudit(page, item.state);
          await page.setViewportSize({ width: 390, height: 844 });
          await settleFiniteLayout(page, `#screen-${prepared.state.screen}`);
          const portraitAfterState = await readAppState(page);
          const portraitAfter = item.state === "home" ? null : await criticalAudit(page, item.state);
          evidence = { portraitBefore, landscapeState, landscape, portraitAfterState, portraitAfter };
          assertion = () => {
            expect(landscapeState.screen).toBe(prepared.state.screen);
            expect(portraitAfterState.screen).toBe(prepared.state.screen);
            if (landscape) expect(landscape.violations, "Critical UI must survive same-page landscape rotation").toEqual([]);
            if (portraitAfter) expect(portraitAfter.violations, "Critical UI must recover after rotating back").toEqual([]);
          };
        } else if (item.kind === "gesture") {
          if (item.state === "home-footer") {
            const qteBefore = await readAppState(page);
            evidence = await reachEnd(page, { ...item, surface: "home", input: "touch" }, { assertReach: false, forceInput: true });
            const qteAfter = await readAppState(page);
            evidence = { ...evidence, qteBefore, qteAfter };
            assertion = () => {
              expect(evidence.after.scrollTop, "Content pan must change the content scroll position").toBeGreaterThan(evidence.before.scrollTop);
              expect(qteAfter.battle).toEqual(qteBefore.battle);
              expect(qteAfter.dojo).toEqual(qteBefore.dojo);
            };
          } else {
            evidence = await advanceQte(page, item.state);
            assertion = () => expect(evidence.violations, "QTE swipe must advance only its track and never scroll content").toEqual([]);
          }
        } else {
          const audit = await criticalAudit(page, item.state);
          const interactionBefore = await readAppState(page);
          evidence = { audit, interactionBefore };
          if (item.state.includes("qte")) {
            evidence.interaction = await advanceQte(page, item.state);
          } else if (item.state.startsWith("battle-") || item.state.startsWith("dojo-sandbox")) {
            const selector = item.state.includes("dual") || item.state.includes("dual-hand") ? '#hand-selector-dual button[data-hand="rock"]' : '#hand-selector-single button[data-hand="rock"]';
            if (item.state.includes("morph")) {
              const morphSelector = item.state.includes("dual") ? '#hand-selector-dual button[data-hand="paper"]' : '#hand-selector-single button[data-hand="paper"]';
              await page.locator(morphSelector).first().click();
            } else {
              await page.locator(selector).first().click();
            }
            evidence.interactionAfter = await readAppState(page);
          }
          assertion = () => {
            expect(audit.violations, "Critical controls must be fully contained, reachable, and non-occluded").toEqual([]);
            if (evidence.interaction) expect(evidence.interaction.violations, "QTE input ownership and track progress must hold").toEqual([]);
          };
        }
      } catch (error) {
        evidence = { priorEvidence: evidence, setupOrInteractionError: { name: error.name, message: error.message, stack: error.stack }, partialState: await readAppState(page).catch(() => null) };
        assertion = () => { throw error; };
      }
      await attachCaseEvidence(testInfo, page, item, evidence);
      assertion();
      await assertAppState(page, { screen: (await readAppState(page)).screen });
    });
  });
}

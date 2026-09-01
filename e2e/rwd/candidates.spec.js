import { test, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { positionCandidateEnd, prepareStageB } from "./stage-b-helpers.js";

for (const item of requiredCases("candidate")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" || item.input === "hybrid" });
    test(`[${item.id}] @stage-b-before @candidate`, async ({ page, appUrl }, testInfo) => {
      const prepared = await prepareStageB(page, appUrl, item);
      let reach = null;
      if (item.state.endsWith("-end")) reach = await positionCandidateEnd(page, item);
      await attachJson(testInfo, "candidate-metadata", {
        id: item.id, viewport: item.viewport, input: item.input, locale: item.locale, state: item.state,
        preparedState: prepared.state, reach, review: "pending-human-review", approvedBaseline: false,
        pixelDiff: null, pixelDiffDisplay: "N/A (no approved previous image)", layoutAcceptance: false
      });
      await testInfo.attach("candidate-image", { body: await page.screenshot(), contentType: "image/png" });
    });
  });
}

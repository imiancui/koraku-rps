import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { positionCandidateEnd, prepareStageB } from "./stage-b-helpers.js";

const cases = requiredCases("visual");
const approved = JSON.parse(readFileSync(new URL("./baselines/approved.json", import.meta.url), "utf8"));
const approvedById = new Map(approved.cases.map(item => [item.id, item]));

if (approved.caseCount !== cases.length || approvedById.size !== cases.length || cases.some(item => !approvedById.has(item.id))) {
  throw new Error("Approved visual manifest does not exactly match the required visual cases");
}

for (const item of cases) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" || item.input === "hybrid" });
    test(`[${item.id}] @visual`, async ({ page, appUrl }, testInfo) => {
      await prepareStageB(page, appUrl, item);
      if (item.state.endsWith("-end")) await positionCandidateEnd(page, item);
      const screenshot = await page.screenshot();
      const baseline = approvedById.get(item.id);
      const pixelTolerance = baseline.pixelTolerance || approved.pixelTolerance;
      await attachJson(testInfo, "visual-comparison-metadata", {
        id: item.id, baseline: baseline.file, approvedSha256: baseline.sha256,
        actualSha256: createHash("sha256").update(screenshot).digest("hex"),
        approval: approved.approval, approvedAt: approved.approvedAt,
        pixelTolerance, evidenceLevel: "browser-emulated"
      });
      expect(screenshot).toMatchSnapshot(item.id + ".png", pixelTolerance);
    });
  });
}

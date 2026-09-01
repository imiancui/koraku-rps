import { test, expect, attachJson } from "./fixtures.js";
import { prepareState, stateContracts, readAppState, assertAppState } from "./application.js";
import { requiredCases } from "./coverage.js";

for (const state of requiredCases("states").map(item => item.state)) {
  test("[RWD-G006.state." + state + "] @states", async ({ page, appUrl }, testInfo) => {
    const result = await prepareState(page, appUrl, state);
    const expected = requiredCases("states").find(item => item.state === state);
    await assertAppState(page, expected?.expectedState);
    await attachJson(testInfo, "state-ready", result);
    if (state === "battle-single") {
      await page.locator('#hand-selector-single button[data-hand="paper"]').click();
      expect((await readAppState(page)).battle.selectedHand).toBe("paper");
    }
    if (state === "save-overlay") {
      await page.locator("#close-save-record-modal").click();
      expect((await readAppState(page)).dom.saveOpen).toBe(false);
    }
    if (state === "dojo-qte-single" || state === "dojo-qte-dual") {
      await page.locator("#btn-exit-dojo-qte").click();
      expect((await readAppState(page)).screen).toBe("home");
    }
  });
}

import { test, expect, attachJson } from "./fixtures.js";
import { openApp, assertAppState } from "./application.js";
import { auditLayout } from "./layout-audit.js";

const samples = [
  ["VP-PHONE-S", 360, 800, true], ["VP-PHONE-M", 390, 844, true],
  ["VP-TABLET-S", 768, 1024, true], ["VP-DESKTOP-M", 1440, 900, false],
  ["VP-DESKTOP-L", 1920, 1080, false]
];
for (const [id, width, height, touch] of samples) {
  test.describe(id, () => {
    test.use({ viewport: { width, height }, hasTouch: touch });
    test("[RWD-G003.smoke." + id + ".home-navigation] @smoke", async ({ page, appUrl }, testInfo) => {
      const environment = await openApp(page, appUrl, { debug: false });
      expect(environment.input.maxTouchPoints > 0).toBe(touch);
      if (touch) expect(environment.input.coarse).toBe(true);
      const selector = '#screen-home .main-menu button[data-nav="stages"]';
      const audit = await page.evaluate(auditLayout, { elements: [{ selector, hitTest: true, text: true }] });
      await attachJson(testInfo, "selected-smoke", { environment, audit, scope: "Primary home navigation only; not full five-state Smoke or visual acceptance" });
      expect(audit.violations).toEqual([]);
      await testInfo.attach("home-diagnostic", { body: await page.screenshot(), contentType: "image/png" });
      if (touch) await page.locator(selector).tap(); else await page.locator(selector).click();
      await assertAppState(page, { screen: "stages" });
      await page.locator('#screen-stages button[data-nav="home"]').click();
      await assertAppState(page, { screen: "home" });
    });
  });
}

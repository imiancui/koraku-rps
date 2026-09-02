import { test, expect, attachJson } from "./fixtures.js";
import { requiredCases } from "./coverage.js";
import { prepareState, settleFiniteLayout } from "./application.js";
import { criticalAudit } from "./stage-b-helpers.js";

async function sample(page, selector, subtree = false) {
  return page.locator(selector).evaluate((element, subtree) => {
    const box = element.getBoundingClientRect();
    const css = getComputedStyle(element);
    return {
      box: { x: box.x, y: box.y, width: box.width, height: box.height, left: box.left, top: box.top, right: box.right, bottom: box.bottom },
      center: { x: box.left + box.width / 2, y: box.top + box.height / 2 },
      classes: element.className,
      style: { transform: css.transform, opacity: css.opacity, animationName: css.animationName, animationDuration: css.animationDuration, transitionDuration: css.transitionDuration },
      animations: element.getAnimations({ subtree }).map(animation => ({
        playState: animation.playState,
        currentTime: animation.currentTime,
        duration: animation.effect.getComputedTiming().duration,
        progress: animation.effect.getComputedTiming().progress
      }))
    };
  }, subtree);
}

function expectCenterStable(actual, expected, tolerance = 1.5) {
  expect(Math.abs(actual.x - expected.x)).toBeLessThanOrEqual(tolerance);
  expect(Math.abs(actual.y - expected.y)).toBeLessThanOrEqual(tolerance);
}

async function oracleCase(page, appUrl) {
  const prepared = await prepareState(page, appUrl, "battle-single");
  await settleFiniteLayout(page, "#screen-battle");
  const before = await sample(page, ".round-oracle", true);
  await page.evaluate(() => window.__KORAKU_DEBUG__.battle.revealHands());
  await expect(page.locator(".round-oracle")).toHaveClass(/is-revealing/);
  const started = await sample(page, ".round-oracle", true);
  expect(started.style.animationName).toContain("reveal-card");
  await page.clock.runFor(160);
  const middle = await sample(page, ".round-oracle", true);
  expectCenterStable(middle.center, before.center);
  await page.clock.runFor(240);
  await expect(page.locator(".round-oracle")).not.toHaveClass(/is-revealing/);
  const after = await sample(page, ".round-oracle", true);
  expectCenterStable(after.center, before.center);
  const audit = await criticalAudit(page, "battle-single", { includeTouchControls: false });
  expect(audit.violations).toEqual([]);
  return { prepared, before, started, middle, after, audit };
}

async function enemyHitCase(page, appUrl) {
  const prepared = await prepareState(page, appUrl, "battle-single");
  await settleFiniteLayout(page, "#screen-battle");
  const slot = "#battle-character-single";
  const image = `${slot} img`;
  const before = await sample(page, slot, true);
  await page.evaluate(() => window.__KORAKU_DEBUG__.bus.emit("battle:effect", { type: "enemy-hit", amount: 12 }));
  await expect(page.locator(slot)).toHaveClass(/is-enemy-hit/);
  await page.clock.runFor(100);
  const firstMiddle = await sample(page, image);
  expect(firstMiddle.style.animationName).toContain("enemy-hit-inplace");
  await page.evaluate(() => window.__KORAKU_DEBUG__.bus.emit("battle:effect", { type: "enemy-hit", amount: 13 }));
  await page.clock.runFor(100);
  const retriggerMiddle = await sample(page, image);
  expect(retriggerMiddle.style.animationName).toContain("enemy-hit-inplace");
  await page.clock.runFor(650);
  await expect(page.locator(slot)).not.toHaveClass(/is-enemy-hit/);
  const after = await sample(page, slot, true);
  expectCenterStable(after.center, before.center);
  const audit = await criticalAudit(page, "battle-single", { includeTouchControls: false });
  expect(audit.violations).toEqual([]);
  return { prepared, before, firstMiddle, retriggerMiddle, after, audit };
}

async function overlayCase(page, appUrl, item) {
  const prepared = await prepareState(page, appUrl, "battle-qte-single");
  await settleFiniteLayout(page, "#screen-battle");
  await page.clock.runFor(200);
  const before = await sample(page, "#qte-overlay", true);
  await page.evaluate(() => window.__KORAKU_DEBUG__.battle.qte.stop());
  await expect(page.locator("#qte-overlay")).toHaveAttribute("aria-hidden", "true");
  const closed = await sample(page, "#qte-overlay", true);
  await page.clock.runFor(40);
  await page.evaluate(() => window.__KORAKU_DEBUG__.battle.startQte());
  await expect(page.locator("#qte-overlay")).toHaveAttribute("aria-hidden", "false");
  const restarted = await sample(page, "#qte-overlay", true);
  await page.clock.runFor(80);
  const middle = await sample(page, "#qte-overlay", true);
  await page.clock.runFor(120);
  await expect(page.locator("#qte-overlay")).toHaveCSS("opacity", "1");
  const after = await sample(page, "#qte-overlay", true);
  expect(after.style.opacity).toBe("1");
  const audit = await criticalAudit(page, "battle-qte-single", { includeTouchControls: item.input === "touch" });
  expect(audit.violations).toEqual([]);
  return { prepared, before, closed, restarted, middle, after, audit };
}

async function reducedCase(page, appUrl) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const prepared = await prepareState(page, appUrl, "battle-single");
  const policy = await page.evaluate(() => ({
    media: matchMedia("(prefers-reduced-motion: reduce)").matches,
    petals: getComputedStyle(document.querySelector(".petals i")).animationName,
    screen: getComputedStyle(document.querySelector("#screen-battle")).animationName,
    qteTransition: getComputedStyle(document.querySelector("#qte-overlay")).transitionDuration
  }));
  expect(policy).toEqual({ media: true, petals: "none", screen: "none", qteTransition: "0s" });
  await page.evaluate(() => window.__KORAKU_DEBUG__.battle.revealHands());
  const reveal = await sample(page, ".round-oracle");
  expect(reveal.style.animationName).toContain("reveal-card");
  await page.evaluate(() => window.__KORAKU_DEBUG__.battle.stopClocks());
  await page.clock.runFor(400);
  await expect(page.locator(".round-oracle")).not.toHaveClass(/is-revealing/);
  await page.evaluate(() => window.__KORAKU_DEBUG__.bus.emit("battle:effect", { type: "enemy-hit", amount: 21 }));
  const hit = await sample(page, "#battle-character-single img");
  expect(hit.style.animationName).toContain("enemy-hit-inplace");
  await page.clock.runFor(730);
  await expect(page.locator("#battle-character-single")).not.toHaveClass(/is-enemy-hit/);
  const audit = await criticalAudit(page, "battle-single", { includeTouchControls: false });
  expect(audit.violations).toEqual([]);
  return { prepared, policy, reveal, hit, audit, policyNote: "decorative motion disabled; gameplay-critical reveal/hit feedback and timing retained" };
}

for (const item of requiredCases("stress-animation")) {
  test.describe(item.id, () => {
    test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === "touch" });
    test(`[${item.id}] @stress-animation`, async ({ page, appUrl }, testInfo) => {
      const evidence = item.kind === "oracle" ? await oracleCase(page, appUrl)
        : item.kind === "enemy-hit-rapid" ? await enemyHitCase(page, appUrl)
        : item.kind === "qte-overlay-rapid" ? await overlayCase(page, appUrl, item)
        : await reducedCase(page, appUrl);
      await attachJson(testInfo, "stress-animation-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
    });
  });
}

import { test, expect, attachJson } from "./fixtures.js";
import { openApp, prepareState, assertAppState, readAppState, settleFiniteLayout } from "./application.js";
import { auditLayout } from "./layout-audit.js";

const menu = '#screen-home .main-menu button[data-nav="stages"]';
const label = '#screen-home [data-i18n="ui.menuStages"]';
const probes = [
  { family: "overflow", invariant: "RWD-G001", selector: "html", contract: { documentOverflow: true }, detector: "document-overflow" },
  { family: "clipping", invariant: "RWD-G001", selector: menu, contract: { elements: [{ selector: menu }] }, detector: "clipping" },
  { family: "hit", invariant: "RWD-G003", selector: menu, contract: { elements: [{ selector: menu, hitTest: true }] }, detector: "occlusion" },
  { family: "text", invariant: "RWD-G004", selector: label, contract: { elements: [{ selector: label, text: true }] }, detector: "text-clipping" },
  { family: "target", invariant: "RWD-G003", selector: menu, contract: { elements: [{ selector: menu, minTarget: { width: 40, height: 40 } }] }, detector: "target-size" },
  { family: "overlay", invariant: "RWD-G007", selector: "#save-record-modal .modal-card", contract: { elements: [{ selector: "#save-record-modal .modal-card", kind: "overlay" }] }, detector: "overlay-bounds" },
  { family: "missing", invariant: "RWD-G003", selector: menu, contract: { elements: [{ selector: menu }] }, detector: "missing-required" },
  { family: "exclusive", invariant: "RWD-G006", selector: "#hand-selector-dual", contract: { exclusive: [{ name: "battle-hands", selectors: ["#hand-selector-single", "#hand-selector-dual"], visibleCount: 1 }] }, detector: "exclusive-groups", resultSelector: "battle-hands" }
];

async function inject(page, probe) {
  return page.evaluateHandle(({ selector, family }) => {
    const target = document.querySelector(selector);
    if (!target) throw new Error("Mutation target missing: " + selector);
    const oldStyle = target.getAttribute("style");
    let undo = () => oldStyle === null ? target.removeAttribute("style") : target.setAttribute("style", oldStyle);
    try {
      if (family === "overflow") {
        target.style.minWidth = (innerWidth + 64) + "px";
      } else if (family === "clipping") {
        const parent = target.closest(".main-menu");
        const parentStyle = parent.getAttribute("style");
        undo = () => parentStyle === null ? parent.removeAttribute("style") : parent.setAttribute("style", parentStyle);
        Object.assign(parent.style, { height: (target.getBoundingClientRect().height / 2) + "px", overflow: "hidden" });
      } else if (family === "hit") {
        const box = target.getBoundingClientRect();
        const blocker = document.createElement("div");
        blocker.id = "rwd-calibration-blocker";
        blocker.textContent = "Temporary calibration obstruction";
        Object.assign(blocker.style, { position: "fixed", left: box.left + "px", top: box.top + "px", width: box.width + "px", height: box.height + "px", zIndex: "2147483647", background: "#651c25", color: "white" });
        document.body.append(blocker);
        undo = () => blocker.remove();
      } else if (family === "text") {
        Object.assign(target.style, { display: "block", width: "1px", maxWidth: "1px", minWidth: "0", overflow: "hidden", whiteSpace: "nowrap" });
      } else if (family === "target") {
        Object.assign(target.style, { width: "20px", minWidth: "0", height: "20px", minHeight: "0", maxHeight: "20px", padding: "0" });
      } else if (family === "overlay") {
        target.style.transform = "translateX(200vw)";
      } else if (family === "missing") {
        const marker = document.createComment("RWD temporary removed control");
        target.replaceWith(marker);
        undo = () => marker.replaceWith(target);
      } else if (family === "exclusive") {
        const hidden = target.hidden;
        target.hidden = false;
        undo = () => { target.hidden = hidden; };
      } else {
        throw new Error("Unknown mutation family");
      }
      return undo;
    } catch (error) {
      undo();
      throw error;
    }
  }, { selector: probe.selector, family: probe.family });
}

for (const probe of probes) {
  test("[" + probe.invariant + ".probe." + probe.family + "] @calibrate @calibration-probes", async ({ page, appUrl }, testInfo) => {
    const environment = probe.family === "exclusive"
      ? (await prepareState(page, appUrl, "battle-single")).environment
      : await openApp(page, appUrl, { debug: false });
    if (probe.family === "overlay") {
      await page.locator("#open-save-record-modal").click();
      await assertAppState(page, { screen: "home", dom: { saveOpen: true } });
    }
    await settleFiniteLayout(page, probe.selector);
    const before = await page.evaluate(auditLayout, probe.contract);
    await attachJson(testInfo, "probe-before", { environment, state: await readAppState(page), audit: before });
    expect(before.violations, "Probe requires a clean relevant precondition").toEqual([]);
    await testInfo.attach("probe-before-image", { body: await page.screenshot(), contentType: "image/png" });
    const storageBefore = await page.evaluate(() => Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)]));
    const undo = await inject(page, probe);
    const errors = [];
    try {
      if (probe.family !== "missing") await settleFiniteLayout(page, probe.selector);
      const injected = await page.evaluate(auditLayout, probe.contract);
      await attachJson(testInfo, "probe-injected", injected);
      await testInfo.attach("probe-injected-image", { body: await page.screenshot(), contentType: "image/png" });
      expect(injected.violations.map(item => [item.detector, item.selector])).toEqual([[probe.detector, probe.resultSelector || probe.selector]]);
      const fault = injected.violations[0];
      if (probe.family === "overflow") expect(fault.actual.excess).toBe(64);
      if (["clipping", "overlay"].includes(probe.family)) expect(fault.actual.loss.width + fault.actual.loss.height).toBeGreaterThan(1);
      if (probe.family === "target") expect(fault.actual.box.height).toBe(20);
      if (probe.family === "hit") expect(fault.actual.blocked[0].hit.id).toBe("rwd-calibration-blocker");
      if (probe.family === "missing") expect(fault.actual).toBe(0);
      if (probe.family === "exclusive") expect(fault.actual.count).toBe(2);
      if (probe.family === "text") expect(fault.actual.cropped.length).toBeGreaterThan(0);
    } catch (error) {
      errors.push(error);
    }
    try {
      await undo.evaluate(restore => restore());
      await settleFiniteLayout(page, probe.selector);
      const after = await page.evaluate(auditLayout, probe.contract);
      await attachJson(testInfo, "probe-restored", after);
      await testInfo.attach("probe-restored-image", { body: await page.screenshot(), contentType: "image/png" });
      expect(after.violations).toEqual([]);
      expect(await page.evaluate(() => Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)]))).toEqual(storageBefore);
    } catch (error) {
      errors.push(error);
    }
    try { await undo.dispose(); } catch (error) { errors.push(error); }
    if (errors.length) throw new AggregateError(errors, "Mutation or restoration failed: " + probe.family);
  });
}

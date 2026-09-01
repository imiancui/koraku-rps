import { test, expect, attachJson } from "./fixtures.js";
import { auditLayout, auditScrollEnd } from "./layout-audit.js";

const groups = {
  clipping: ["normal", "left", "right", "top", "bottom", "ancestor", "tolerance-in", "tolerance-out", "fixed-escape", "transformed-fixed"],
  overflow: ["normal", "fault", "tolerance-in", "tolerance-out", "local-scroll"],
  presence: ["normal", "missing", "hidden", "ancestor-hidden", "hidden-expected", "disabled-legal", "duplicate"],
  hit: ["child", "header", "footer", "decoration", "edge"],
  text: ["normal", "horizontal", "vertical", "ellipsis", "visible-overflow", "disclosure"],
  target: ["normal", "small", "exact", "tolerance-in", "tolerance-out"],
  overlay: ["normal", "outside", "scroll", "unreachable"],
  exclusive: ["normal", "two", "zero"]
};
const invariant = { clipping: "RWD-G001", overflow: "RWD-G001", presence: "RWD-G003", hit: "RWD-G003", text: "RWD-G004", target: "RWD-G003", overlay: "RWD-G007", exclusive: "RWD-G006" };

async function fixture(page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.setContent(
    '<!doctype html><style>*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;font:16px Arial}button{border:0;padding:0;line-height:20px}' +
    '#clip{position:absolute;left:100px;top:100px;width:160px;height:100px}' +
    '#target{display:block;width:100px;height:40px;background:#ddd}#other{position:absolute;left:250px;top:100px;width:100px;height:40px}' +
    '#label{position:absolute;left:350px;top:20px;width:220px;height:40px;font:20px/24px monospace;white-space:nowrap}' +
    '#more{position:absolute;left:600px;top:20px;width:100px;height:40px}#full{position:absolute;left:50px;top:540px;width:400px;height:30px}' +
    '#panel{position:absolute;left:350px;top:160px;width:200px;height:120px;overflow:auto}#filler{height:400px}#last{width:100%;height:40px}' +
    '#overlay{position:fixed;left:50px;top:200px;width:260px;height:160px;background:#eee}' +
    '.cover{position:fixed;left:100px;top:100px;width:100px;height:40px;z-index:10;background:#ccc}' +
    '#spill{position:absolute;left:0;top:0;height:1px;width:1px;pointer-events:none}</style>' +
    '<div id="clip"><button id="target" onclick="document.body.dataset.clicked=\'target\'"><span>Target</span></button></div>' +
    '<button id="other" hidden>Other</button><div id="label">Readable label</div>' +
    '<button id="more" onclick="document.querySelector(\'#full\').hidden=false">Full text</button><div id="full" hidden>Readable label</div>' +
    '<section id="panel"><div id="filler">Scrollable content</div><button id="last" onclick="document.body.dataset.clicked=\'last\'">Last action</button></section>' +
    '<div id="overlay" hidden>Overlay</div><header id="header" class="cover" hidden>Header</header><footer id="footer" class="cover" hidden>Footer</footer><i id="spill"></i>'
  );
  expect(await page.evaluate(() => document.compatMode)).toBe("CSS1Compat");
}

for (const [family, variants] of Object.entries(groups)) {
  for (const variant of variants) {
    test("[" + invariant[family] + ".fixture." + family + "." + variant + "] @calibrate @calibration-fixtures", async ({ page, browserName }, testInfo) => {
      await fixture(page);
      let contract = { elements: [{ selector: "#target" }] };
      let expected = [];
      let scrollResult;
      if (family === "clipping") {
        await page.evaluate(variant => {
          const clip = document.querySelector("#clip");
          const target = document.querySelector("#target");
          clip.style.overflow = "hidden";
          target.style.position = "relative";
          if (variant === "left") target.style.left = "-20px";
          if (variant === "right") target.style.left = "80px";
          if (variant === "top") target.style.top = "-10px";
          if (variant === "bottom") target.style.top = "80px";
          if (variant === "ancestor") clip.style.width = "50px";
          if (variant === "tolerance-in") clip.style.width = "99.75px";
          if (variant === "tolerance-out") clip.style.width = "99px";
          if (variant === "fixed-escape" || variant === "transformed-fixed") {
            Object.assign(clip.style, { width: "50px", height: "30px" });
            Object.assign(target.style, { position: "fixed", left: "10px", top: "10px" });
            if (variant === "transformed-fixed") clip.style.transform = "translateZ(0)";
          }
        }, variant);
        if (!["normal", "tolerance-in", "fixed-escape"].includes(variant)) expected = [["clipping", "#target"]];
      } else if (family === "overflow") {
        contract = { documentOverflow: true, documentTolerance: 1 };
        if (["fault", "tolerance-in", "tolerance-out"].includes(variant)) {
          await page.locator("#spill").evaluate((element, extra) => { element.style.width = (800 + extra) + "px"; }, variant === "fault" ? 80 : variant === "tolerance-in" ? 1 : 2);
        }
        if (["fault", "tolerance-out"].includes(variant)) expected = [["document-overflow", "html"]];
        if (variant === "local-scroll") {
          await page.locator("#filler").evaluate(element => { element.style.width = "400px"; });
        }
      } else if (family === "presence") {
        if (variant === "missing") { await page.locator("#target").evaluate(element => element.remove()); expected = [["missing-required", "#target"]]; }
        if (variant === "duplicate") { await page.locator("#target").evaluate(element => element.after(element.cloneNode(true))); expected = [["ambiguous-required", "#target"]]; }
        if (["hidden", "hidden-expected"].includes(variant)) await page.locator("#target").evaluate(element => { element.hidden = true; });
        if (variant === "hidden") expected = [["not-visible", "#target"]];
        if (variant === "hidden-expected") contract.elements[0].state = "hidden";
        if (variant === "ancestor-hidden") {
          await page.locator("#clip").evaluate(element => { element.style.opacity = "0"; });
          expected = [["not-visible", "#target"]];
        }
        if (variant === "disabled-legal") {
          await page.locator("#target").evaluate(element => { element.disabled = true; });
          contract.elements[0].enabled = false;
          contract.elements[0].hitTest = true;
        }
      } else if (family === "hit") {
        contract.elements[0].hitTest = true;
        if (variant !== "child") {
          await page.locator(variant === "footer" ? "#footer" : "#header").evaluate((element, variant) => {
            element.hidden = false;
            if (variant === "decoration") element.style.pointerEvents = "none";
            if (variant === "edge") Object.assign(element.style, { width: "10px", overflow: "hidden" });
          }, variant);
        }
        if (["header", "footer", "edge"].includes(variant)) expected = [["occlusion", "#target"]];
        if (variant === "child" || variant === "decoration") {
          await page.locator("#target span").click();
          await expect(page.locator("body")).toHaveAttribute("data-clicked", "target");
        }
      } else if (family === "text") {
        contract = { elements: [{ selector: "#label", text: true }] };
        if (variant !== "normal") {
          await page.locator("#label").evaluate((element, variant) => {
            Object.assign(element.style, { overflow: "hidden", width: "40px" });
            if (variant === "vertical") Object.assign(element.style, { width: "220px", height: "5px" });
            if (variant === "ellipsis" || variant === "disclosure") element.style.textOverflow = "ellipsis";
            if (variant === "visible-overflow") element.style.overflow = "visible";
          }, variant);
        }
        if (["horizontal", "vertical", "ellipsis"].includes(variant)) expected = [["text-clipping", "#label"]];
        if (variant === "disclosure") {
          await page.locator("#more").click();
          contract.elements[0].text = { approvedReason: "Synthetic calibration: explicit full-text disclosure", disclosureSelector: "#full" };
          contract.elements.push({ selector: "#full", text: true });
        }
      } else if (family === "target") {
        const height = { normal: 44, small: 20, exact: 40, "tolerance-in": 39.875, "tolerance-out": 39.5 }[variant];
        await page.locator("#target").evaluate((element, height) => { element.style.height = height + "px"; }, height);
        contract.elements[0].minTarget = { width: 40, height: 40, tolerance: 0.25 };
        if (variant === "small" || variant === "tolerance-out") expected = [["target-size", "#target"]];
      } else if (family === "overlay") {
        if (variant === "scroll" || variant === "unreachable") {
          if (variant === "unreachable") await page.locator("#panel").evaluate(element => { element.style.overflow = "hidden"; });
          scrollResult = await auditScrollEnd(page, "#panel", "#last");
          if (variant === "unreachable") expected = [["scroll-not-allowed", "#panel"]];
          if (variant === "scroll") {
            await page.locator("#last").click();
            await expect(page.locator("body")).toHaveAttribute("data-clicked", "last");
            expect(scrollResult.after.scrollTop).toBeGreaterThan(0);
          }
        } else {
          await page.locator("#overlay").evaluate((element, outside) => {
            element.hidden = false;
            if (outside) element.style.left = "780px";
          }, variant === "outside");
          contract = { elements: [{ selector: "#overlay", kind: "overlay" }] };
          if (variant === "outside") expected = [["overlay-bounds", "#overlay"]];
        }
      } else if (family === "exclusive") {
        contract = { exclusive: [{ name: "hand-groups", selectors: ["#target", "#other"], visibleCount: 1 }] };
        if (variant === "two") await page.locator("#other").evaluate(element => { element.hidden = false; });
        if (variant === "zero") await page.locator("#target").evaluate(element => { element.hidden = true; });
        if (variant !== "normal") expected = [["exclusive-groups", "hand-groups"]];
      }
      const result = scrollResult || await page.evaluate(auditLayout, contract);
      await attachJson(testInfo, "detector-calibration", { family, variant, expected, result });
      expect(result.violations.map(item => [item.detector, item.selector])).toEqual(expected);
      for (const violation of result.violations) {
        expect(violation.actual).toBeDefined();
        if (violation.detector === "clipping" || violation.detector === "overlay-bounds") {
          expect(Math.max(violation.actual.loss.width, violation.actual.loss.height)).toBeGreaterThan(0.5);
          expect(violation.actual.ancestors.length).toBeGreaterThan(0);
          const loss = family === "overlay" ? [240, 0] : {
            left: [20, 0], right: [20, 0], top: [0, 10], bottom: [0, 20],
            ancestor: [50, 0], "tolerance-out": [1, 0], "transformed-fixed": [60, 20]
          }[variant];
          expect(violation.actual.loss.width).toBeCloseTo(loss[0]);
          expect(violation.actual.loss.height).toBeCloseTo(loss[1]);
        }
        if (violation.detector === "document-overflow") expect(violation.actual.excess).toBe(variant === "fault" ? 80 : 2);
        if (violation.detector === "target-size") expect(violation.actual.box.height).toBe(variant === "small" ? 20 : 39.5);
        if (violation.detector === "occlusion") {
          expect(violation.actual.blocked[0].hit.id).toBe(variant === "footer" ? "footer" : "header");
          expect(violation.actual.blocked.length).toBe(variant === "edge" ? 1 : 5);
        }
        if (violation.detector === "exclusive-groups") expect(violation.actual.count).toBe(variant === "two" ? 2 : 0);
        if (violation.detector === "text-clipping") expect(violation.actual.cropped[0].textRect.width).toBeGreaterThan(40);
      }
      if (family === "clipping" && variant === "tolerance-in") {
        const loss = result.measurements[0].box.width - result.measurements[0].intersection.width;
        expect(loss).toBeGreaterThanOrEqual(0);
        expect(loss).toBeLessThanOrEqual(0.5);
        if (browserName !== "webkit") expect(loss).toBeCloseTo(0.25);
      }
    });
  }
}

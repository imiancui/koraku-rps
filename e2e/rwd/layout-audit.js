// Browser-serializable: the exact same detector runs on fixtures and the real app.
export async function auditLayout(contract) {
  const tolerance = contract.tolerance ?? 0.5;
  if (!Number.isFinite(tolerance) || tolerance < 0) throw new Error("Invalid layout tolerance");
  if (!contract.documentOverflow && !contract.elements?.length && !contract.exclusive?.length) throw new Error("Empty layout contract");
  const violations = [];
  const measurements = [];
  const rect = value => ({ x: value.x, y: value.y, left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height });
  const style = element => {
    const css = getComputedStyle(element);
    return Object.fromEntries(["display", "visibility", "opacity", "overflowX", "overflowY", "position", "width", "minWidth", "maxWidth", "height", "maxHeight", "transform", "zIndex", "pointerEvents", "whiteSpace", "textOverflow", "fontSize", "lineHeight"].map(key => [key, css[key]]));
  };
  const ancestors = element => {
    const chain = [];
    for (let node = element.parentElement; node; node = node.parentElement) {
      chain.push({ tag: node.tagName, id: node.id, classes: node.className, box: rect(node.getBoundingClientRect()), style: style(node), scrollLeft: node.scrollLeft, scrollTop: node.scrollTop });
    }
    return chain;
  };
  const visible = element => {
    if (!element.getClientRects().length || getComputedStyle(element).visibility !== "visible") return false;
    for (let node = element; node; node = node.parentElement) {
      if (Number(getComputedStyle(node).opacity) === 0 || getComputedStyle(node).contentVisibility === "hidden") return false;
    }
    return true;
  };
  const fail = (detector, selector, expected, actual) => violations.push({ detector, selector, expected, actual });
  const matches = selector => [...document.querySelectorAll(selector)];
  const specs = contract.elements || [];
  const nodes = new Map();
  for (const spec of specs) {
    const found = matches(spec.selector);
    if (spec.state === "absent") {
      if (found.length) fail("unexpected-present", spec.selector, 0, found.length);
    } else if (found.length !== 1) {
      fail(found.length ? "ambiguous-required" : "missing-required", spec.selector, 1, found.length);
    } else {
      nodes.set(spec.selector, found[0]);
    }
  }
  // IntersectionObserver delegates clipping/containing-block handling to the browser.
  // It is rectangular geometry, not a painted-character or pixel-occlusion test.
  const intersection = await new Promise(resolve => {
    const targets = [...new Set(nodes.values())];
    const entries = new Map();
    if (!targets.length) { resolve(entries); return; }
    const observer = new IntersectionObserver(changes => {
      for (const entry of changes) entries.set(entry.target, entry);
      if (entries.size === targets.length) { observer.disconnect(); resolve(entries); }
    }, { root: null, threshold: [0, 1] });
    targets.forEach(target => observer.observe(target));
  });
  const viewport = { width: window.innerWidth, height: window.innerHeight, dpr: window.devicePixelRatio };
  if (contract.documentOverflow) {
    const excess = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    if (excess > (contract.documentTolerance ?? 1)) {
      fail("document-overflow", "html", { maxExcess: contract.documentTolerance ?? 1 }, {
        excess, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth
      });
    }
  }
  for (const spec of specs) {
    const element = nodes.get(spec.selector);
    // A missing/ambiguous node has already produced an explicit violation above.
    if (!element) continue;
    const shown = visible(element);
    const entry = intersection.get(element);
    const box = rect(entry.boundingClientRect);
    const intersectionBox = rect(entry.intersectionRect);
    const sample = {
      selector: spec.selector, box, intersection: intersectionBox, shown,
      disabled: element.matches(":disabled") || element.getAttribute("aria-disabled") === "true",
      style: style(element), ancestors: ancestors(element),
      viewportLoss: {
        left: Math.min(box.width, Math.max(0, -box.left)),
        right: Math.min(box.width, Math.max(0, box.right - viewport.width)),
        top: Math.min(box.height, Math.max(0, -box.top)),
        bottom: Math.min(box.height, Math.max(0, box.bottom - viewport.height))
      }
    };
    measurements.push(sample);
    if (spec.state === "hidden") {
      if (shown) fail("unexpected-visible", spec.selector, "hidden", sample);
      continue;
    }
    if (!shown || box.width <= 0 || box.height <= 0) {
      fail("not-visible", spec.selector, "visible, nonzero area", sample);
      continue;
    }
    if (spec.enabled !== undefined && spec.enabled === sample.disabled) {
      fail("enabled-state", spec.selector, { enabled: spec.enabled }, sample);
    }
    if (spec.contained !== false) {
      const loss = { width: Math.max(0, box.width - intersectionBox.width), height: Math.max(0, box.height - intersectionBox.height) };
      if (loss.width > tolerance || loss.height > tolerance) {
        fail(spec.kind === "overlay" ? "overlay-bounds" : "clipping", spec.selector, { tolerance }, { ...sample, loss });
      }
    }
    if (spec.minTarget) {
      const targetTolerance = spec.minTarget.tolerance ?? 0;
      if (box.width + targetTolerance < spec.minTarget.width || box.height + targetTolerance < spec.minTarget.height) {
        fail("target-size", spec.selector, spec.minTarget, { width: box.width, height: box.height, ...sample });
      }
    }
    if (spec.hitTest && !sample.disabled) {
      const insetX = Math.min(4, box.width / 4);
      const insetY = Math.min(4, box.height / 4);
      const cx = (box.left + box.right) / 2;
      const cy = (box.top + box.bottom) / 2;
      const points = [[cx, cy], [box.left + insetX, cy], [box.right - insetX, cy], [cx, box.top + insetY], [cx, box.bottom - insetY]];
      const blocked = points.flatMap(([x, y]) => {
        const hit = document.elementFromPoint(x, y);
        if (hit === element || element.contains(hit)) return [];
        return [{ x, y, hit: hit ? { tag: hit.tagName, id: hit.id, classes: hit.className, box: rect(hit.getBoundingClientRect()), style: style(hit) } : null }];
      });
      if (blocked.length) fail("occlusion", spec.selector, "target or normal descendant at sample points", { ...sample, blocked });
    }
    if (spec.text) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const textRects = [];
      let text;
      while ((text = walker.nextNode())) {
        if (!text.textContent.trim() || !visible(text.parentElement)) continue;
        const range = document.createRange();
        range.selectNodeContents(text);
        for (const part of range.getClientRects()) {
          if (part.width && part.height) textRects.push(rect(part));
        }
      }
      if (!textRects.length) {
        fail("missing-text", spec.selector, "nonempty readable text", sample);
      } else {
        // Text checks target normal-flow labels. Do not infer cropping from scrollWidth alone.
        const clips = [{ left: 0, top: 0, right: viewport.width, bottom: viewport.height, x: true, y: true, selector: "viewport" }];
        for (let parent = element; parent; parent = parent.parentElement) {
          const css = getComputedStyle(parent);
          const x = /^(hidden|clip|auto|scroll)$/.test(css.overflowX);
          const y = /^(hidden|clip|auto|scroll)$/.test(css.overflowY);
          if (x || y) {
            const parentBox = parent.getBoundingClientRect();
            const sx = parent.offsetWidth ? parentBox.width / parent.offsetWidth : 1;
            const sy = parent.offsetHeight ? parentBox.height / parent.offsetHeight : 1;
            clips.push({
              left: parentBox.left + parent.clientLeft * sx, top: parentBox.top + parent.clientTop * sy,
              right: parentBox.left + (parent.clientLeft + parent.clientWidth) * sx,
              bottom: parentBox.top + (parent.clientTop + parent.clientHeight) * sy,
              x, y, selector: parent.id ? "#" + parent.id : parent.tagName
            });
          }
        }
        const cropped = textRects.flatMap(part => clips.flatMap(clip => {
          const loss = {
            left: clip.x ? Math.max(0, clip.left - part.left) : 0,
            right: clip.x ? Math.max(0, part.right - clip.right) : 0,
            top: clip.y ? Math.max(0, clip.top - part.top) : 0,
            bottom: clip.y ? Math.max(0, part.bottom - clip.bottom) : 0
          };
          return Object.values(loss).some(value => value > tolerance) ? [{ textRect: part, clip, loss }] : [];
        }));
        if (cropped.length) {
          const disclosure = spec.text.disclosureSelector && matches(spec.text.disclosureSelector);
          const disclosureIsAudited = specs.some(other => other.selector === spec.text.disclosureSelector && other.text && other.state !== "hidden");
          const expanded = spec.text.approvedReason && disclosureIsAudited && disclosure?.length === 1 && visible(disclosure[0]) && disclosure[0].textContent.trim() === element.textContent.trim();
          if (!expanded) fail("text-clipping", spec.selector, "readable text or explicitly approved, open full-text disclosure", { ...sample, cropped });
        }
      }
    }
  }
  for (const group of contract.exclusive || []) {
    const counts = group.selectors.map(selector => {
      const found = matches(selector);
      if (found.length !== 1) fail("missing-exclusive-member", selector, 1, found.length);
      return { selector, visible: found.length === 1 && visible(found[0]), box: found.length === 1 ? rect(found[0].getBoundingClientRect()) : null };
    });
    const count = counts.filter(item => item.visible).length;
    if (count !== group.visibleCount) fail("exclusive-groups", group.name, group.visibleCount, { count, members: counts });
  }
  return { viewport, documentMode: document.compatMode, documentWidth: document.documentElement.scrollWidth, violations, measurements };
}

export async function auditScrollEnd(page, containerSelector, targetSelector) {
  const before = await page.locator(containerSelector).evaluate(element => ({
    overflow: getComputedStyle(element).overflowY, scrollTop: element.scrollTop,
    scrollHeight: element.scrollHeight, clientHeight: element.clientHeight
  }));
  if (!["auto", "scroll"].includes(before.overflow)) {
    return { before, violations: [{ detector: "scroll-not-allowed", selector: containerSelector, expected: "auto or scroll", actual: before }] };
  }
  await page.locator(containerSelector).hover({ position: { x: 8, y: 8 } });
  const maxSteps = Math.min(50, Math.max(1, Math.ceil(before.scrollHeight / Math.max(1, before.clientHeight)) + 2));
  for (let step = 0; step < maxSteps; step++) {
    await page.mouse.wheel(0, before.clientHeight);
    try { await page.clock.runFor(100); } catch {}
    await page.waitForTimeout(50);
    const reached = await page.locator(containerSelector).evaluate(element => element.scrollTop >= element.scrollHeight - element.clientHeight - 1);
    if (reached) break;
  }
  const after = await page.locator(containerSelector).evaluate(element => ({ scrollTop: element.scrollTop, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight }));
  if (after.scrollTop < after.scrollHeight - after.clientHeight - 1) {
    return { before, after, violations: [{ detector: "scroll-end-unreachable", selector: containerSelector, expected: after.scrollHeight - after.clientHeight, actual: after.scrollTop }] };
  }
  const audit = await page.evaluate(auditLayout, { elements: [{ selector: targetSelector, hitTest: true }] });
  return { before, after, ...audit };
}

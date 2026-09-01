import { readFileSync } from "node:fs";

export const manifest = JSON.parse(readFileSync(new URL("./manifest.json", import.meta.url), "utf8"));

function boundaryCases() {
  const contract = manifest.stageC.boundary;
  const deltaName = delta => delta < 0 ? "minus1" : delta > 0 ? "plus1" : "exact";
  const common = { lane: "boundary", kind: "boundary", engine: "chromium", locale: "zh-Hant", required: true, baseline: "functional-and-geometry" };
  const width = contract.widthTriples.flatMap(group => [-1, 0, 1].map(delta => ({
    ...common, id: `RWD-G012.boundary.width-${group.base}.${deltaName(delta)}`,
    viewport: [group.base + delta, group.height], input: group.input, state: group.state,
    boundary: { axis: "width", base: group.base, delta }
  })));
  const height = contract.heightTriples.flatMap(group => [-1, 0, 1].map(delta => ({
    ...common, id: `RWD-G012.boundary.${group.name}.${deltaName(delta)}`,
    viewport: [group.width, group.base + delta], input: group.input, state: group.state,
    boundary: { axis: "height", base: group.base, delta }
  })));
  const resize = contract.resizeFlows.map(flow => ({
    ...common, kind: "runtime-resize", id: `RWD-G012.boundary.resize.${flow.name}`,
    viewport: flow.sizes[0], input: flow.input, state: flow.state, sizes: flow.sizes
  }));
  const cases = [...width, ...height, ...resize];
  if (cases.length !== contract.expectedCount) throw new Error(`Boundary manifest expected ${contract.expectedCount} cases, expanded ${cases.length}`);
  return cases;
}

function sweepCases() {
  const contract = manifest.stageC.sweep;
  const cases = contract.widths.flatMap(width => contract.heights.flatMap(height => contract.states.map(state => ({
    id: `RWD-G013.sweep.w${width}.h${height}.${state.name}`,
    lane: "sweep", kind: "sweep", engine: "chromium", locale: "zh-Hant", required: true,
    baseline: "functional-and-geometry", viewport: [width, height], input: state.input, state: state.name
  }))));
  if (new Set(contract.widths).size !== 50 || cases.length !== contract.expectedCount) {
    throw new Error(`Sweep manifest expected 50 unique widths and ${contract.expectedCount} cases, expanded ${cases.length}`);
  }
  return cases;
}

function stressContentCases() {
  const contract = manifest.stageC.stressContent;
  const common = { lane: "stress-content", engine: "chromium", locale: "zh-Hant", required: true, baseline: "functional-and-geometry" };
  const locales = contract.locales.flatMap(locale => contract.localeSurfaces.map(surface => ({
    ...common, kind: "locale", id: `RWD-G014.stress-content.locale-${locale}.${surface.name}`,
    locale, viewport: surface.viewport, input: surface.input, state: surface.name
  })));
  const viewportName = viewport => `w${viewport[0]}h${viewport[1]}`;
  const unbroken = contract.contentViewports.map(viewport => ({ ...common, kind: "unbroken", id: `RWD-G014.stress-content.unbroken.${viewportName(viewport)}`, viewport, input: viewport[0] < 1000 ? "touch" : "mouse-keyboard", state: "home" }));
  const numbers = contract.contentViewports.map(viewport => ({ ...common, kind: "large-values", id: `RWD-G014.stress-content.large-values.${viewportName(viewport)}`, viewport, input: viewport[0] < 1000 ? "touch" : "mouse-keyboard", state: "home" }));
  const lists = contract.contentViewports.map(viewport => ({ ...common, kind: "max-list", id: `RWD-G014.stress-content.max-list.${viewportName(viewport)}`, viewport, input: viewport[0] < 1000 ? "touch" : "mouse-keyboard", state: "records" }));
  const fonts = [contract.contentViewports[0], contract.contentViewports[2]].flatMap(viewport => contract.fontScales.map(scale => ({
    ...common, kind: "font-scale", id: `RWD-G014.stress-content.font-${Math.round(scale * 100)}.${viewportName(viewport)}`,
    viewport, input: viewport[0] < 1000 ? "touch" : "mouse-keyboard", state: "home", scale
  })));
  const cases = [...locales, ...unbroken, ...numbers, ...lists, ...fonts];
  if (cases.length !== contract.expectedCount) throw new Error(`Content stress manifest expected ${contract.expectedCount} cases, expanded ${cases.length}`);
  return cases;
}

function stressInputCases() {
  const contract = manifest.stageC.stressInput;
  const cases = contract.cases.map(item => ({
    id: `RWD-G015.stress-input.${item.name}`, lane: "stress-input", kind: "stress-input",
    engine: "chromium", locale: "zh-Hant", required: true, baseline: "functional-and-scroll-ownership",
    viewport: item.viewport, input: item.mode.startsWith("keyboard") ? "mouse-keyboard" : item.mode.startsWith("hybrid") ? "hybrid" : "touch",
    state: item.state, mode: item.mode
  }));
  if (cases.length !== contract.expectedCount) throw new Error(`Input stress manifest expected ${contract.expectedCount} cases, expanded ${cases.length}`);
  return cases;
}

function stressAnimationCases() {
  const contract = manifest.stageC.stressAnimation;
  const cases = contract.viewports.flatMap(viewport => contract.kinds.map(kind => ({
    id: `RWD-G016.stress-animation.${kind}.w${viewport[0]}h${viewport[1]}`,
    lane: "stress-animation", kind, engine: "chromium", locale: "zh-Hant", required: true,
    baseline: "functional-animation-and-geometry", viewport, input: viewport[0] < 1000 ? "touch" : "mouse-keyboard",
    state: kind === "qte-overlay-rapid" ? "battle-qte-single" : "battle-single"
  })));
  if (cases.length !== contract.expectedCount) throw new Error(`Animation stress manifest expected ${contract.expectedCount} cases, expanded ${cases.length}`);
  return cases;
}

function smokeComplementCases() {
  const contract = manifest.stageC.smokeComplement;
  const common = { lane: "smoke-complement", engine: "chromium", locale: "zh-Hant", required: true, baseline: "functional-and-geometry" };
  const vp = value => `w${value[0]}h${value[1]}`;
  const input = value => value[0] <= 844 ? "touch" : value[0] < 1300 ? "hybrid" : "mouse-keyboard";
  const home = contract.homeFooterViewports.map(viewport => ({ ...common, kind: "home-footer", id: `RWD-G017.smoke-complement.home-footer.${vp(viewport)}`, viewport, input: input(viewport), state: "home-footer-end" }));
  const content = contract.contentGroups.flatMap(group => group.surfaces.flatMap(state => group.viewports.map(viewport => ({ ...common, kind: "content-end", id: `RWD-G017.smoke-complement.${state}-end.${vp(viewport)}`, viewport, input: input(viewport), state }))));
  const battle = contract.battleViewports.flatMap(viewport => contract.battleStates.map(state => ({ ...common, kind: "battle", id: `RWD-G017.smoke-complement.${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const post = contract.postViewports.flatMap(viewport => contract.postStates.map(state => ({ ...common, kind: "post", id: `RWD-G017.smoke-complement.${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const overlays = contract.overlayViewports.flatMap(viewport => contract.overlays.map(state => ({ ...common, kind: "overlay", id: `RWD-G017.smoke-complement.overlay-${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const galleryOpen = contract.galleryOpenViewports.map(viewport => ({ ...common, kind: "gallery-open", id: `RWD-G017.smoke-complement.gallery-open.${vp(viewport)}`, viewport, input: input(viewport), state: "gallery" }));
  const reviewRepair = contract.reviewRepairViewports.map(viewport => ({ ...common, kind: "battle", id: `RWD-G017.smoke-complement.review-repair-battle-dual.${vp(viewport)}`, viewport, input: input(viewport), state: "battle-dual" }));
  const reviewResource = contract.reviewResourceViewports.flatMap(viewport => contract.reviewResourceStates.map(state => ({ ...common, kind: "battle", id: `RWD-G017.smoke-complement.review-resource-${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const reviewChapter = contract.reviewChapterViewports.flatMap(viewport => contract.reviewChapterStates.map(state => ({ ...common, kind: "battle", id: `RWD-G017.smoke-complement.review-chapter-${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const reviewDesktopDojo = contract.reviewDesktopDojoViewports.flatMap(viewport => contract.reviewDesktopDojoStates.map(state => ({ ...common, kind: "battle", id: `RWD-G017.smoke-complement.review-desktop-${state}.${vp(viewport)}`, viewport, input: input(viewport), state })));
  const cases = [...home, ...content, ...battle, ...post, ...overlays, ...galleryOpen, ...reviewRepair, ...reviewResource, ...reviewChapter, ...reviewDesktopDojo];
  if (cases.length !== contract.expectedCount) throw new Error(`Smoke complement expected ${contract.expectedCount} cases, expanded ${cases.length}`);
  return cases;
}

export function requiredCases(scope = "stage-a") {
  if (scope === "calibration-fixtures") return requiredCases("calibrate").filter(item => item.kind === "fixture");
  if (scope === "calibration-probes") return requiredCases("calibrate").filter(item => item.kind === "probe");
  if (scope === "stage-b-protection") return requiredCases("stage-b-before").filter(item => item.kind !== "candidate");
  if (scope === "boundary") return boundaryCases();
  if (scope === "sweep") return sweepCases();
  if (scope === "stress-content") return stressContentCases();
  if (scope === "stress-input") return stressInputCases();
  if (scope === "stress-animation") return stressAnimationCases();
  if (scope === "smoke-complement") return smokeComplementCases();
  const stage = manifest.stageA.scopes.includes(scope) ? manifest.stageA
    : manifest.stageB?.scopes?.includes(scope) ? manifest.stageB
    : manifest.stageC?.scopes?.includes(scope) ? manifest.stageC : null;
  if (!stage) throw new Error("Unknown/unimplemented RWD scope: " + scope);
  const cases = stage.required.filter(item => scope === "stage-a" || scope === "stage-b-before" || item.lane === scope || item.scopes?.includes(scope));
  if (!cases.length) throw new Error("Empty required RWD scope: " + scope);
  return cases;
}

export function fullRuns() {
  const contract = manifest.stageC.full;
  if (!contract || contract.schemaVersion !== 1) throw new Error("Missing supported Stage C Full manifest");
  const allowedEngines = new Set(["chromium", "firefox", "webkit"]);
  const runs = contract.runs.flatMap(group => {
    const cases = requiredCases(group.scope);
    if (cases.length !== group.requiredCount) {
      throw new Error(`Full manifest ${group.scope} expected ${group.requiredCount} cases, expanded ${cases.length}`);
    }
    return group.engines.map(engine => {
      if (!allowedEngines.has(engine) || !contract.engines.includes(engine)) throw new Error(`Unsupported Full engine: ${engine}`);
      return { engine, scope: group.scope, requiredCount: group.requiredCount, cases };
    });
  });
  const expectedCount = runs.reduce((sum, run) => sum + run.cases.length, 0);
  if (expectedCount !== contract.expectedCount) throw new Error(`Full manifest expected ${contract.expectedCount} composite cases, expanded ${expectedCount}`);
  return runs;
}

export function fullRequiredCases() {
  const cases = fullRuns().flatMap(run => run.cases.map(item => ({
    id: `${run.engine}:${run.scope}:${item.id}`,
    engine: run.engine,
    scope: run.scope,
    caseId: item.id
  })));
  if (new Set(cases.map(item => item.id)).size !== cases.length) throw new Error("Duplicate composite Full case ID");
  return cases;
}

export function checkCoverage(required, actual, discovery = false) {
  const requiredIds = required.map(item => typeof item === "string" ? item : item.id);
  const seen = new Map();
  const issues = [];
  if (!requiredIds.length) issues.push({ code: "empty-required-set" });
  if (new Set(requiredIds).size !== requiredIds.length) issues.push({ code: "duplicate-required-id" });
  if (!actual.length) issues.push({ code: "empty-selection" });
  for (const item of actual) {
    if (!item.id) issues.push({ code: "missing-case-id", title: item.title });
    if (seen.has(item.id)) issues.push({ code: "duplicate-case-id", id: item.id });
    seen.set(item.id, item);
    if (!requiredIds.includes(item.id)) issues.push({ code: "unexpected-case", id: item.id });
    if (!discovery && (item.status !== "passed" || item.retry > 0)) {
      issues.push({ code: item.status === "skipped" ? "not-run" : "case-failed", id: item.id, status: item.status, retry: item.retry });
    }
  }
  for (const id of requiredIds) {
    if (!seen.has(id)) issues.push({ code: "missing-required-case", id });
  }
  return issues;
}

export function caseId(title) {
  return title.match(/^\[([A-Za-z0-9.-]+)\]/)?.[1] || null;
}

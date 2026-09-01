import { createHash } from "node:crypto";
import { copyFileSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = Object.fromEntries(process.argv.slice(2).map(value => {
  const match = value.match(/^--([^=]+)=(.+)$/);
  if (!match) throw new Error(`Expected --name=value, received: ${value}`);
  return [match[1], match[2]];
}));

if (args.approval !== "explicit-user-approval") throw new Error("Baseline acceptance requires --approval=explicit-user-approval");
if (!args.source) throw new Error("Baseline acceptance requires --source=<candidate run directory>");

const projectRoot = realpathSync(fileURLToPath(new URL("../", import.meta.url)));
const tempRoot = realpathSync(os.tmpdir());
const sourceRoot = realpathSync(args.source);
if (path.dirname(sourceRoot) !== tempRoot || !/^koraku-rwd-[A-Za-z0-9]+$/.test(path.basename(sourceRoot))) {
  throw new Error("Candidate source must be a direct task-owned koraku-rwd-* directory under the system Temp directory");
}
const owner = JSON.parse(readFileSync(path.join(sourceRoot, "owner.json"), "utf8"));
if (realpathSync(owner.ownerRoot) !== projectRoot) throw new Error("Candidate source belongs to another project");

const coverage = JSON.parse(readFileSync(path.join(sourceRoot, "coverage.json"), "utf8"));
if (coverage.scope !== "candidate" || coverage.status !== "passed" || coverage.requiredCount !== 61 || coverage.executedCount !== 61 || coverage.issues.length) {
  throw new Error("Candidate coverage is not an exact successful 61-case candidate run");
}

const approvedPath = path.join(projectRoot, "e2e/rwd/baselines/approved.json");
const previous = JSON.parse(readFileSync(approvedPath, "utf8"));
if (previous.caseCount !== 61 || previous.cases.length !== 61) throw new Error("Existing approved manifest is not the expected 61-case set");
const baselineDir = realpathSync(path.join(projectRoot, "e2e/rwd/baselines/chromium"));
const pngFiles = readdirSync(baselineDir).filter(name => name.endsWith(".png"));
if (pngFiles.length !== 61) throw new Error(`Expected 61 existing Chromium baselines, found ${pngFiles.length}`);

const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const treeHash = cases => {
  const hash = createHash("sha256");
  for (const item of [...cases].sort((a, b) => a.file.localeCompare(b.file))) {
    const target = path.resolve(projectRoot, item.file);
    hash.update(path.basename(target));
    hash.update(readFileSync(target));
  }
  return hash.digest("hex");
};
const previousTreeSha256 = treeHash(previous.cases);
const previousManifestSha256 = sha256(readFileSync(approvedPath));

const manifestPath = path.join(projectRoot, "e2e/rwd/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const approvedIds = new Set(previous.cases.map(item => item.id));
const requiredCandidates = manifest.stageB?.required?.filter(item => approvedIds.has(item.id)) || [];
const visualCandidates = manifest.stageB?.visualCandidates || [];
if (requiredCandidates.length !== 61 || visualCandidates.length !== 61 || visualCandidates.some(item => !approvedIds.has(item.id))) {
  throw new Error("Manifest does not contain the exact 61-case approved visual set in both Stage B collections");
}
for (const item of [...requiredCandidates, ...visualCandidates]) {
  if (!item.baseline?.startsWith("approved-")) throw new Error(`Manifest case is not linked to an approved baseline: ${item.id}`);
}

let sourceEnvironment = null;
const imports = previous.cases.map(item => {
  const caseDir = path.join(sourceRoot, "attachments", `case-${item.id}`);
  const metadataPath = path.join(caseDir, "0-candidate-metadata.json");
  const imagePath = path.join(caseDir, "1-candidate-image.png");
  const environmentPath = path.join(caseDir, "2-environment.json");
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const environment = JSON.parse(readFileSync(environmentPath, "utf8"));
  const image = readFileSync(imagePath);
  if (metadata.id !== item.id || metadata.review !== "pending-human-review" || metadata.approvedBaseline !== false || metadata.layoutAcceptance !== false) {
    throw new Error(`Candidate metadata is not pending and unapproved: ${item.id}`);
  }
  if (JSON.stringify(metadata.viewport) !== JSON.stringify(item.viewport) || metadata.input !== item.input || metadata.locale !== item.locale || metadata.state !== item.state) {
    throw new Error(`Candidate metadata does not match the approved case contract: ${item.id}`);
  }
  if (image.length < 24 || image.toString("ascii", 1, 4) !== "PNG") throw new Error(`Candidate is not a PNG: ${item.id}`);
  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  if (width !== item.viewport[0] || height !== item.viewport[1]) throw new Error(`Candidate dimensions do not match ${item.id}: ${width}x${height}`);
  const target = path.resolve(projectRoot, item.file);
  if (path.dirname(target) !== baselineDir) throw new Error(`Refusing baseline target outside the Chromium baseline directory: ${target}`);
  if (!sourceEnvironment) sourceEnvironment = environment;
  else if (JSON.stringify(environment.source) !== JSON.stringify(sourceEnvironment.source) || environment.gitHead !== sourceEnvironment.gitHead || environment.browser !== sourceEnvironment.browser) {
    throw new Error(`Candidate environment/source mismatch: ${item.id}`);
  }
  return { item, imagePath, target, sha256: sha256(image) };
});

for (const entry of imports) copyFileSync(entry.imagePath, entry.target);

const cases = imports.map(({ item, sha256: imageSha256 }) => ({ ...item, sha256: imageSha256 }));
const next = {
  schemaVersion: 1,
  approval: "explicit-user-approval",
  approvedAt: args.date || new Date().toISOString().slice(0, 10),
  sourceEvidenceRoot: sourceRoot.replaceAll("\\", "/"),
  gitHead: sourceEnvironment.gitHead,
  browser: sourceEnvironment.browser,
  os: sourceEnvironment.os,
  osRelease: sourceEnvironment.release,
  dpr: sourceEnvironment.viewport?.dpr || 1,
  source: sourceEnvironment.source,
  caseCount: cases.length,
  pixelTolerance: previous.pixelTolerance,
  previousApproval: {
    approvedAt: previous.approvedAt,
    sourceEvidenceRoot: previous.sourceEvidenceRoot,
    baselineTreeSha256: previousTreeSha256,
    manifestSha256: previousManifestSha256
  },
  notes: [
    "Seventh-round 61-case candidate set explicitly approved by the user after the bounded wide-desktop dojo layout review.",
    "VP-DESKTOP-M home-default and home-footer-end intentionally share identical pixels because the footer is already fully visible at initial load.",
    "The existing same-environment maxDiffPixels tolerance is retained; normal visual runs remain updateSnapshots:none."
  ],
  cases
};
writeFileSync(approvedPath, JSON.stringify(next, null, 2) + "\n");

for (const item of [...requiredCandidates, ...visualCandidates]) {
  item.baseline = "approved-seventh-post-repair-2026-09-01";
  item.review = "approved-human-review";
  item.pixelDiff = null;
  item.approvedBaseline = true;
}
manifest.review.stageB = "seventh-post-repair-61-approved-by-user-2026-09-01";
manifest.review.stageBScope = "Tasks 3.1-4.8 plus explicit seventh-round baseline acceptance; no task 4.7, release, commit, push or deployment.";
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(JSON.stringify({
  sourceRoot,
  imported: cases.length,
  previousTreeSha256,
  previousManifestSha256,
  newTreeSha256: treeHash(cases),
  newManifestSha256: sha256(readFileSync(approvedPath))
}, null, 2));

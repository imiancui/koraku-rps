import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { caseId, checkCoverage, requiredCases } from "./coverage.js";

export default class RwdCoverageReporter {
  constructor(options = {}) {
    this.options = options;
    this.output = options.outputDir;
    this.scope = options.scope;
    this.required = options.requiredIds;
    this.results = [];
    this.errors = [];
  }

  onBegin(config, suite) {
    this.output = this.options.outputDir || config.metadata.rwdRunDir;
    this.scope = this.options.scope || config.metadata.rwdScope;
    this.required = this.options.requiredIds || requiredCases(this.scope);
    this.discovered = suite.allTests().map(item => ({ id: caseId(item.title), title: item.title }));
    this.discoveryIssues = checkCoverage(this.required, this.discovered, true);
    writeFileSync(path.join(this.output, "discovery.json"), JSON.stringify({
      scope: this.scope, required: this.required, discovered: this.discovered, issues: this.discoveryIssues
    }, null, 2));
  }

  onTestEnd(test, result) {
    const id = caseId(test.title);
    const folder = path.join(this.output, "attachments", "case-" + (id || test.id).replace(/[^A-Za-z0-9.-]/g, "_"));
    mkdirSync(folder, { recursive: true });
    const attachments = result.attachments.map((attachment, index) => {
      let file = attachment.path;
      if (attachment.body) {
        const extension = { "image/png": ".png", "application/json": ".json", "application/zip": ".zip" }[attachment.contentType] || ".bin";
        file = path.join(folder, index + "-" + attachment.name.replace(/[^A-Za-z0-9-]/g, "_") + extension);
        writeFileSync(file, attachment.body);
      }
      return { name: attachment.name, path: file, contentType: attachment.contentType };
    });
    this.results.push({
      id, title: test.title, status: result.status, retry: result.retry,
      durationMs: result.duration, errors: result.errors.map(error => error.message),
      attachments
    });
  }

  onError(error) {
    this.errors.push(error.message);
  }

  async onEnd(result) {
    // Loading errors may occur before onBegin; preserve native failure in that case.
    if (!this.output) return { status: "failed" };
    const listOnly = process.argv.includes("--list");
    const issues = [...new Map([
      ...(this.discoveryIssues || [{ code: "missing-discovery" }]),
      ...(listOnly ? [] : checkCoverage(this.required, this.results)),
      ...this.errors.map(message => ({ code: "runner-error", message }))
    ].map(issue => [JSON.stringify(issue), issue])).values()];
    const status = result.status === "passed" && !issues.length ? "passed" : "failed";
    writeFileSync(path.join(this.output, "coverage.json"), JSON.stringify({
      scope: this.scope, status: listOnly ? "not-run" : status, discoveryStatus: listOnly ? status : undefined, listOnly, fullRwdAcceptance: false,
      requiredCount: this.required.length, executedCount: this.results.length,
      issues, results: this.results
    }, null, 2));
    console.log("RWD scope: " + this.scope + " | " + (listOnly ? "DISCOVERY " + status.toUpperCase() + " / tests NOT_RUN" : status.toUpperCase()) + " | evidence: " + this.output);
    if (issues.length) console.error(JSON.stringify(issues, null, 2));
    return { status };
  }
}

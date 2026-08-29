import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBundle } from "../scripts/build.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("打包腳本能夠生成可直接於本機與瀏覽器執行的 standalone bundle", async () => {
  await buildBundle();
  const bundle = await readFile(path.join(root, "src/js/bundle.js"), "utf-8");
  assert.ok(bundle.includes("AppView"), "Bundle 應包含 AppView");
  assert.ok(bundle.includes("BattleSystem"), "Bundle 應包含 BattleSystem");
  assert.ok(bundle.includes("GameStore"), "Bundle 應包含 GameStore");
  assert.ok(bundle.includes("new AppView"), "Bundle 應初始化 AppView");
  assert.ok(!bundle.includes("import "), "Bundle 不應含有頂層 ES module import");
});

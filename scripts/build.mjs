import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const modulesInOrder = [
  "src/js/config/gameConfig.js",
  "src/js/services/I18n.js",
  "src/js/core/EventBus.js",
  "src/js/core/TimerRegistry.js",
  "src/js/services/Persistence.js",
  "src/js/systems/progressionRules.js",
  "src/js/systems/rpsRules.js",
  "src/js/systems/QTEInputSystem.js",
  "src/js/systems/QTESystem.js",
  "src/js/core/GameStore.js",
  "src/js/systems/BattleSystem.js",
  "src/js/systems/PostBattleSystem.js",
  "src/js/systems/SoundSystem.js",
  "src/js/kernel/protocol.js",
  "src/js/kernel/kernelFactory.js",
  "src/js/kernel/GameClient.js",
  "src/js/kernel/LocalGameClient.js",
  "src/js/net/RemoteGameClient.js",
  "src/js/ui/HUDDragController.js",
  "src/js/ui/DialogueController.js",
  "src/js/ui/Pillow3DViewer.js",
  "src/js/ui/AppView.js",
  "src/js/main.js"
];

function transformModule(code) {
  // Remove import statements (single-line or multiline)
  let transformed = code.replace(/import\s+(?:(?:(?:\*\s+as\s+\w+)|(?:\{\s*[\w\s,]+\s*\}|\w+))\s+from\s+)?['"][^'"]+['"];?\r?\n?/g, "");
  
  // Replace export declarations
  transformed = transformed.replace(/^export\s+default\s+/gm, "");
  transformed = transformed.replace(/^export\s+(const|let|var|function|class)\s+/gm, "$1 ");
  transformed = transformed.replace(/^export\s*\{[^}]*\}(?:\s*from\s*['"][^'"]+['"])?;?\r?\n?/gm, "");
  
  return transformed.trim();
}

export async function buildBundle() {
  const parts = [];
  for (const relPath of modulesInOrder) {
    const fullPath = path.join(root, relPath);
    const content = await readFile(fullPath, "utf-8");
    parts.push(`// --- ${relPath} ---\n` + transformModule(content));
  }

  const bundleContent = `// Auto-generated standalone bundle for Koraku RPS
// Supports both file:// protocol and http:// server without module CORS restrictions.
(() => {
  "use strict";

${parts.join("\n\n")}
})();
`;

  const outputPath = path.join(root, "src/js/bundle.js");
  await writeFile(outputPath, bundleContent, "utf-8");
  console.log(`Bundle built successfully at: ${outputPath}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildBundle().catch((err) => {
    console.error("Bundle build failed:", err);
    process.exit(1);
  });
}

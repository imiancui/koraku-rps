// server/index.js
import { fileURLToPath } from "node:url";
import { KorakuServer, createKorakuServer } from "./server.js";
import { SERVER_CONFIG } from "./config.js";

export { KorakuServer, createKorakuServer, SERVER_CONFIG };
export default KorakuServer;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = createKorakuServer();
  server.start(SERVER_CONFIG.port, SERVER_CONFIG.host).then(() => {
    console.log(`[Koraku RPS] Server initialized on port ${SERVER_CONFIG.port}.`);
  }).catch((err) => {
    console.error("[Koraku RPS] Failed to start server:", err);
    process.exit(1);
  });

  const shutdown = async () => {
    console.log("[Koraku RPS] Shutting down server gracefully...");
    await server.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

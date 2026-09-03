# Koraku RPS v0.0.24 Online & Offline Architecture Closeout & Release Report
**Date**: 2026-09-03  
**Project**: Koraku RPS (`New-game-project-4`)  
**Specification**: OpenSpec `koraku-offline-default-and-fallback` (Archived: `2026-09-03-koraku-offline-default-and-fallback`)  
**Integrator Status**: All Phase 1, Phase 2, and release preparation tasks complete. Ready for commit & push.

---

## 1. 執行總結 (Executive Summary)

本階段工作針對 **Koraku RPS v0.0.24** 進行完整架構收尾、工具修復、自動備份與還原驗證、RWD 證據採集、文件規格同步、快取失效與代碼衛生審計：

1. **Tailscale 預備環境修復**：使用純字串重寫 `scripts/serve-tailscale.mjs`，根除 PowerShell 雙引號 here-string 展開污染與 `InternalHost` 語法錯誤；動態注入匹配真實 `<script src="./src/js/bundle.js">` 標籤。
2. **端點真機測試與留證**：實測 `npm run start:tailscale:full`，透過 `curl.exe` 驗證本機 4173 靜態注入、8080 `/health`、Tailscale HTTPS 8443 `/health` 及 Tailscale 443 根頁面四項 curl 驗證，證據存入 `docs/ops/evidence/tailscale-20260903/`。
3. **每日自動備份排程與災難還原演練**：更新 `server/scripts/backup.js` 採用專案根目錄絕對路徑解析；重建 Windows 排程 `KorakuBackup`（`cmd /c cd /d D:\game-dev\New-game-project-4 && node server\scripts\backup.js`）；執行完整還原演練並輸出日誌。
4. **伺服器拒絕日誌審計**：在 `server/server.js` 補全 WebSocket Origin 拒絕、HTTP CORS 拒絕與版本不相容之 `console.warn` 審計輸出；擴充 `server.test.js` C3 測試覆蓋率（20/20 通過）。
5. **客戶端降級體驗平滑化**：在 `src/js/main.js` 補全在無伺服器配置退回離線時清除 `localStorage.koraku_mode`，確保警告提示僅跳出一次；`tests/modeSwitching.test.js` 擴充至 6/6 通過。
6. **RWD 離線降級按鈕專項驗證**：依 `rwd-ui-guardian` 規範針對 `#connection-banner-switch-offline` 與 `#btn-switch-to-online` 完成 4 大視口（375px~1920px）、中英雙語系、斷線/重連/存檔開啟狀態、375->768->1280 動態 resize 等 27 項測試，產出 27 張截圖與完整 JSON 報告至 `docs/ui/evidence/offline-fallback-20260903/`。
7. **文件與百科同步**：同步 `HANDOFF.md` 與 `AI_HANDOVER.md` 測試矩陣（維持 100% 相同）；`wiki.md` 與 `wiki.html` 補充版本發布紀錄與段落錨點；`docs/ui/rwd-regression-log.md` 重編號為 `RWD-REG-016` 與 `RWD-REG-017`，落實全檔唯一單調遞增鐵律。
8. **OpenSpec 規範歸檔**：`tasks.md` 18 項全數核實勾選，成功執行 `openspec archive`，同步更新主規格 `openspec/specs/koraku-rps/online-authority/spec.md`（+7 Requirements）。

---

## 2. 測試與驗證結果 (Verification Matrix)

| 測試指令 / 檢驗項目 | 涵蓋範疇 | 案例數 | 結果 | 備註 |
| :--- | :--- | :--- | :--- | :--- |
| `npm test` | 客戶端、Kernel、合約、PRNG、重放、i18n、模式切換 | 227 | **227 / 227 PASS (100%)** | 含 bundle.js 自動重建 |
| `npm run test:server` | 伺服器權威、Session、佇列、備份還原、日誌審計 | 20 | **20 / 20 PASS (100%)** | 覆蓋 4 分支拒絕記錄 |
| `npm run test:rwd:smoke` | 核心跨視口煙霧測試 (Mobile/Tablet/Desktop) | 30 | **30 / 30 PASS (100%)** | Headless Chromium |
| `scripts/verify-offline-fallback-rwd.mjs` | 離線降級按鈕專項 RWD (4 視口、雙語系、動態 resize) | 27 | **27 / 27 PASS (100%)** | 0 新增主控台錯誤 |
| `scripts/restore-drill.mjs` | 備份目錄還原冷啟動驗收演練 | 1 | **PASS** | 還原後伺服器 `/health` 200 OK |
| `node --check` | 語法解析 (`serve-tailscale.mjs`, `backup.js`) | 2 檔案 | **EXIT 0 (PASS)** | 無語法錯誤 |
| Forbidden Pattern Grep | `System.Management.Automation`, `InternalHost`, `wss://:` | 全專案 | **0 HITS** | 徹底潔淨 |

---

## 3. 證據路徑登記 (Evidence Registry)

### 3.1 運維與 Tailscale 預備環境 (`docs/ops/evidence/tailscale-20260903/`)
- `curl_local_4173.txt`：本機 4173 端口回傳內容，包含動態注入之 `window.__KORAKU_CONFIG__ = { serverUrl: "wss://20250606-120834.tailfe8b74.ts.net:8443/ws" };`。
- `curl_local_8080_health.txt`：本機 8080 端口 `/health`，回傳 HTTP 200 `{"status":"ok","protocol":"2.0.0","configVersion":"2026.09.03"}`。
- `curl_tailscale_8443_health.txt`：透過 Tailscale HTTPS 網域 `https://20250606-120834.tailfe8b74.ts.net:8443/health` 存取成功，HTTP 200。
- `curl_tailscale_443_root.txt`：透過 Tailscale HTTPS 443 存取完整靜態 HTML 成功，帶有 injected config。
- `restore_drill_log.txt`：冷啟動災難還原演練完整輸出日誌（測試備份 -> 數據目錄重命名 -> `--restore` 還原 -> 啟動伺服器探針 -> 清理）。

### 3.2 響應式 UI 降級按鈕專項 (`docs/ui/evidence/offline-fallback-20260903/`)
- `rwd_verification_report.json`：全量 27 個測試案例詳細幾何座標、按鈕寬高量測與布林判定結果。
- `banner-reconnecting-*.png`（8 張）：Mobile (375x812)、Tablet (768x1024)、Desktop Compact (1280x800)、Desktop FullHD (1920x1080) 於 `zh-Hant` 與 `en` 語系下之重連橫幅截圖。
- `banner-disconnected-*.png`（8 張）：4 大視口、雙語系下之斷線橫幅截圖（「改用離線模式」按鈕高度均 ≥ 40px）。
- `save-modal-mode-switch-*.png`（8 張）：4 大視口、雙語系下之存檔紀錄視窗模式切換按鈕截圖（「切換回線上模式」按鈕高度均為 48px）。
- `dynamic-resize-*.png`（3 張）：375px -> 768px -> 1280px 即時視窗縮放過程之佈局重繪截圖。

---

## 4. 關鍵架構標記 (Markers & Governance)

### 4.1 ASSUMPTION
1. **[ASSUMPTION] 伺服器資料目錄隔離**：`server/data/` 為運行期動態寫入目錄，已於 `.gitignore` 排除，演練用之臨時樣本已於收尾清理完畢。
2. **[ASSUMPTION] 遠端推送安全邊界**：遵照授權界限，所有變更僅存於本地工作區與指定分支，嚴格遵守 AGENTS.md 之發布隔離規則。

### 4.2 VERSION DECISION & SETTLEMENT
1. **版本決策由本次修正輪定案為升版 0.0.24**：因應 `src/js/main.js` 模式降級行為修復（無設定退回離線時主動清理殘留 `koraku_mode`，提示僅出現一次）與靜態資產快取失效（更新 CSS 與 bundle 之 `?v=` 時間戳），依據 `AGENTS.md` 版本規範正式定案跳升 PATCH 至 `v0.0.24`。
2. **回歸日誌重編號與遞增規則**：全面校正 `docs/ui/rwd-regression-log.md` 衝突，確立全檔唯一、單調遞增原則；正式編號戰鬥中配點換裝鎖定為 `RWD-REG-016`、離線降級雙按鈕為 `RWD-REG-017`。
3. **交接文檔全面同步**：已將本次全部工作（Tailscale 修復、備份還原演練、伺服器拒絕日誌、單次提示保護、RWD-REG-016/017 專項、OpenSpec 歸檔）完整補充寫入 `HANDOFF.md` 與 `AI_HANDOVER.md`（維持 100% 一致）。
4. **本地驗證工具腳本保留**：`scripts/verify-offline-fallback-rwd.mjs` 與 `scripts/restore-drill.mjs` 納入倉庫管理，做為日後維運與自動化回歸之長期守護工具。

---

## 5. 建議 Commit 切分策略 (Proposed Commit Breakdown)

為保持代碼歷史清晰並遵循 Concurrent Agent Rules，建議將變更分為 4 個獨立 Commit：

### Commit 1: `fix(tools): repair tailscale staging runner and backup scheduler with restore drill`
- **範疇**：維運腳本、排程修復與 Staging 驗證留證。
- **異動檔案**：
  - `scripts/serve-tailscale.mjs`
  - `scripts/restore-drill.mjs`
  - `server/scripts/backup.js`
  - `.gitignore`
  - `docs/ops/tailscale-staging.md`
  - `docs/ops/go-live-checklist.md`
  - `docs/ops/evidence/tailscale-20260903/*`

### Commit 2: `fix(server,client): harden rejection logs and clear residual online mode on fallback`
- **範疇**：伺服器拒絕日誌補全、客戶端單次提示保護與相應單元測試。
- **異動檔案**：
  - `server/server.js`
  - `server/test/server.test.js`
  - `src/js/main.js`
  - `tests/modeSwitching.test.js`
  - `src/js/bundle.js`

### Commit 3: `docs(rwd,wiki): record offline fallback rwd evidence, regression log, and v0.0.23 handoff`
- **範疇**：RWD 驗證截圖與報告、回歸紀錄表、百科與移交文檔。
- **異動檔案**：
  - `docs/ui/evidence/offline-fallback-20260903/*`
  - `scripts/verify-offline-fallback-rwd.mjs`
  - `docs/ui/rwd-regression-log.md`
  - `HANDOFF.md`
  - `AI_HANDOVER.md`
  - `wiki.md`
  - `wiki.html`
  - `docs/engineering/online-closeout-20260903.md`

### Commit 4: `chore(openspec): archive koraku-offline-default-and-fallback change and sync specs`
- **範疇**：OpenSpec 變更歸檔與核心規格同步。
- **異動檔案**：
  - `openspec/changes/archive/2026-09-03-koraku-offline-default-and-fallback/*`
  - `openspec/specs/koraku-rps/online-authority/spec.md`

---
*報告產生於 2026-09-03，等待使用者檢閱與指令。*

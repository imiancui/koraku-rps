# Koraku RPS 上線檢查清單 (Go-Live Checklist)

本文件整理正式上線前**無法在本地 Docker / 本機環境模擬、必須於真實 VPS / 公網環境驗證**的檢查項目。每一項均明確標示「僅真機驗證」，供維運與發布負責人逐項簽核。

---

## 1. 域名、DNS 與 SSL 憑證 (僅真機驗證)

- [ ] **DNS 解析設定**
  - 客戶端靜態站：`koraku.app` / `www.koraku.app` CNAME 指向 GitHub Pages (`imiancui.github.io`)。
  - 線上權威伺服器：`api.koraku.app` (或指定的後端域名) A / AAAA 記錄精準指向 VPS 公網固定 IP。
  - DNS TTL 於上線前 48 小時調降至 300 秒，便於緊急切換或回滾。
- [ ] **Let''s Encrypt 公網 SSL 憑證 (僅真機驗證)**
  - Caddy / Nginx 透過 ACME HTTP-01 或 TLS-ALPN-01 取得由 Let''s Encrypt 簽發之有效公開憑證。
  - 驗證瀏覽器造訪 `https://api.koraku.app/health` 不跳出「不安全連線」警告。
  - 驗證 ACME 續簽流程（`caddy certificates` 或 `certbot renew --dry-run`）。
  - 驗證 HTTP 自動 301 轉向 HTTPS，以及 HSTS 標頭啟用狀態。

---

## 2. 真實網路延遲與斷線寬限審計 (僅真機驗證)

- [ ] **跨地域與公網延遲**
  - 從台灣、日本、北美與行動 4G/5G 網路連線至 `wss://api.koraku.app/ws`。
  - 驗證平滑 RTT 估算小於 180ms，高延遲警告旗標（`isHighLatency`）不頻繁誤觸。
- [ ] **斷線 10 秒寬限期真實判定 (僅真機驗證)**
  - 玩家在戰鬥進行中切換飛航模式或拔除網線。
  - 伺服器端維持 Session 10 秒，10 秒內恢復連線可無縫恢復戰鬥。
  - 超過 10 秒未恢復連線時，伺服器依當前局勢執行自動結算，獎勵/懲罰正常寫入經濟帳本。

---

## 3. 雲端主機、網路與防火牆安全 (僅真機驗證)

- [ ] **雲端安全群組 (Security Groups / VPC ACLs)**
  - Inbound 僅放行：
    - Port 22 (SSH)：強烈建議僅限管理員固定 IP 或 Tailscale 內部網路。
    - Port 80 (HTTP)：用於 ACME 驗證與自動跳轉 443。
    - Port 443 (HTTPS / WSS)：對外公開服務。
  - 阻擋所有其他未授權入站 Port（特別是內部 Node 伺服器 8080）。
- [ ] **主機本機防火牆 (UFW / iptables)**
  - `ufw default deny incoming`
  - `ufw allow 22/tcp` (或 Tailscale 虛擬網卡)
  - `ufw allow 80/tcp`
  - `ufw allow 443/tcp`
  - `ufw enable`

---

## 4. 主機長期維運、備份排程與自啟 (僅真機驗證)

- [ ] **實體重開機自動啟動 (Reboot Autostart)**
  - 若採 Docker Compose：驗證服務容器宣告 `restart: always`，並執行 `sudo reboot` 實測重開機後容器 30 秒內自動恢復運作。
  - 若採 Systemd：驗證 `systemctl enable koraku-server.service`。
- [ ] **每日自動備份排程 (AGENTS.md Policy 16)**
  - 設定 cron job 或 systemd timer 於每日凌晨 03:00 執行 `node server/scripts/backup.js`。
  - 備份檔案經 SHA-256 Manifest 雜湊校驗，並定期異地同步（如 S3 / rsync）。
  - 設定備份輪替保留策略（例如保留最近 14 天）。
- [ ] **磁碟配額與日誌輪轉 (Logrotate & Disk Quota)**
  - 限制 Docker / Caddy 日誌大小，避免日誌塞爆根目錄（建議單一 log 50MB，保留 3 個）。
  - 設定伺服器磁碟用量監控（超過 85% 發送警報）。
- [ ] **系統安全性自動更新 (Unattended Upgrades)**
  - 啟用 Debian/Ubuntu `unattended-upgrades` 自動安裝重大安全性修補。

---

## 5. 上線決策門檻 (Go/No-Go Decision Gate)

| 檢驗項目 | 驗證環境 | 判定標準 | 狀態 |
| :--- | :--- | :--- | :--- |
| 單元與合約測試 | 本機 Node | `npm test` 227/227 全綠 | PASS |
| 伺服器權威與防作弊 | 本機 Node | `npm run test:server` 20/20 全綠 | PASS |
| 跨裝置 RWD 煙霧 | 本機 Chromium | `npm run test:rwd:smoke` 30/30 全綠 | PASS |
| 雙模式存檔隔離 (A1/A2) | 本機 Node / 前端 | `tests/modeSwitching.test.js` 全綠 | PASS (已驗證：`tests/modeSwitching.test.js`) |
| 排隊指令逾時拒絕 (A1) | 本機 Node / 前端 | 未連線發送指令逾時 reject NOT_CONNECTED | PASS (已驗證：`tests/modeSwitching.test.js`) |
| 種子與指令紀錄防外洩 (C1) | 伺服器出口 | 快照與轉發事件徹底剝除 seed/commandLog | PASS (已驗證：`server/test/server.test.js`) |
| 斷線 10 秒寬限自動結算 (C2) | 伺服器 / 內網真機 | 斷線 10 秒計時器啟動，超時自動結算；10s 內重連恢復 | 待驗證 (真機連線未留存 trace；單元測試通過 `server/test/server.test.js`) |
| 拒絕指令伺服器日誌審計 (C3) | 伺服器端日誌 | 被拒絕指令記錄至 console.warn 稽核 (RATE_LIMITED, NOT_FOUND, FORBIDDEN_ORIGIN, VERSION_MISMATCH) | PASS (已驗證：`server/test/server.test.js:865`) |
| Windows 備份排程與還原 (B3) | Windows / CLI | 每日 03:00 KorakuBackup 排程；--restore 驗證完整還原 | PASS (已驗證：排程產出 `server/backups/backup-2026-09-03T07-14-24-959Z`，還原紀錄：`docs/ops/evidence/tailscale-20260903/restore_drill_log.txt`；Linux 仍待驗證) |
| Docker 缺變數 Fail-fast | Docker Staging | 缺 JWT_SECRET / ANON_SALT 立即退出 1 | PASS |
| Docker 來源 Origin 阻擋 | Docker Staging | 非法 Origin 升級攔截拒絕 (1006) | PASS |
| Docker 閒置心跳不中斷 | Docker Staging | 10s 閒置連續 5 次 ping/pong 保持 ONLINE | PASS |
| Docker 完整戰鬥全迴路 | Docker Staging | 戰鬥 -> 放棄 -> 結算 -> 帳本寫入磁碟 | PASS |
| Docker 備份與還原演練 | Docker Staging | 備份 -> 刪資料卷 -> 還原 100% 完整 | PASS |
| Docker 崩潰自動重啟 | Docker Staging | PID 1 SIGKILL 後 restart:always 自動拉起 | PASS |
| Docker 併發負載煙霧 | Docker Staging | 20 併發帳號 100% 成功、平均 99ms、記憶體無增長 | PASS |
| 公開域名 SSL 憑證 | 真實 VPS | Let's Encrypt 真憑證且無瀏覽器告警 | 仍待公網真機 |
| 公網延遲與多地域跨國 | 真實 VPS | 真實 4G/5G/跨國海外網路延遲與結算 | 仍待公網真機 |
| 防火牆與安全群組 | 真實 VPS | 僅 80/443/SSH 放行，8080 不對外暴露 | 仍待公網真機 |

---

## 6. 上線日標準作業程序與驗證流程 (Go-Live Day Runbook)

當 VPS 採購完成並準備上線時，依以下時序逐項執行驗證與發布：

### 階段一：T-24h 基礎設施建置
1. **安全配置**：雲端安全群組與主機防火牆 (UFW) 嚴格設定僅放行 Port 22 (SSH)、Port 80 (HTTP)、Port 443 (HTTPS)。
2. **DNS 指向**：設定 `api.koraku.app` A/AAAA 記錄指向 VPS 固定 IP，調降 TTL 至 300 秒。
3. **備份環境**：建立 `/data` 存檔目錄與每日備份掛載點，設定目錄權限。

### 階段二：T-2h 伺服器部署
1. **環境變數注入**：建立 `.env`（生產環境 `JWT_SECRET`、`ANON_SALT`、`NODE_ENV=production`、`BATTLE_LOCK_POLICY=always`、`ALLOWED_ORIGINS=https://koraku.app`）。
2. **啟動容器**：執行 `docker compose up -d`，Caddy 自動向 Let's Encrypt 申請 SSL 憑證。
3. **排程設定**：設定 Host cron 於每日 03:00 執行備份腳本並設定 14 天保留輪轉。

### 階段三：T-0h 真機驗證簽核（依序執行）
1. **SSL 憑證簽核**：造訪 `https://api.koraku.app/health`，確認回傳 HTTP 200 OK，瀏覽器無安全憑證告警。
2. **來源隔離簽核**：使用非允許 Origin 測試 WebSocket 握手，確認回傳 1006 阻擋。
3. **公網延遲簽核**：從行動裝置 (4G/5G) 連線，確認 Ping 延遲穩定且小於 180ms。
4. **10s 斷線寬限簽核**：戰鬥中切換飛航模式 10 秒內恢復重連正常；超過 10 秒確認自動結算並寫入帳本。
5. **重開機自啟簽核**：執行 `sudo reboot`，確認開機後 30 秒內容器自動恢復服務。

### 階段四：T+0h 客戶端啟用
1. 客戶端靜態站（`koraku.app`）正式指向 `wss://api.koraku.app/ws`，完成線上模式啟用。
2. 若上線後評估需調整戰鬥中換裝/配點策略，僅需修改伺服器環境變數 `BATTLE_LOCK_POLICY=countdown` 或 `never` 並重啟伺服器，客戶端無須重新發版。


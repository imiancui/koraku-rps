# Tailscale 內網預備環境維運手冊 (Tailscale Staging Runbook)

## 1. 網路與架構拓撲 (Topology)

Tailscale Staging 環境利用 Tailscale WireGuard 虛擬內網作為預備環境（Staging VPS），不需開放在公網（完全停用 Tailscale Funnel），使用 Tailscale 提供的合法 HTTPS 憑證進行真機端對端測試。

`
[測試者手機 / iPad / 筆電] (4G / 5G / 外部 Wi-Fi)
       │ (Tailscale WireGuard 加密通道)
       ▼
[本機 Tailscale Daemon (tailscaled)]
       ├─ https://<NodeName>.ts.net:443 ──> http://127.0.0.1:4173 (靜態前端, 注入 WSS 設定)
       └─ https://<NodeName>.ts.net:8443 ─> http://127.0.0.1:8080 (Node.js 權威伺服器)
`

- **目前節點 DNS 名稱**：20250606-120834.tailfe8b74.ts.net
- **前端入口**：https://20250606-120834.tailfe8b74.ts.net/
- **後端 WebSocket / API**：wss://20250606-120834.tailfe8b74.ts.net:8443/ws
- **健康檢查端點**：https://20250606-120834.tailfe8b74.ts.net:8443/health

---

## 2. 啟動與管理指令

### 啟動完整 Staging 站（前端 + 後端 + 注入）
`ash
npm run start:tailscale:full
`
此腳本會自動完成：
1. 讀取 server/.env（安全隔離，不納入 Git）。
2. 動態檢查本機 Tailscale 節點名稱。
3. 啟動後端權威伺服器（Port 8080）。
4. 啟動靜態客戶端伺服器（Port 4173），並在回傳 index.html 時自動注入 window.__KORAKU_CONFIG__ = { serverUrl: "wss://<DNSName>:8443/ws" }。
5. 調用 	ailscale serve 掛載 443 與 8443 代理。

### 檢查與關閉 Tailscale Serve
`ash
# 查看當前 Serve 狀態
tailscale serve status

# 關閉 443 前端代理
tailscale serve --https=443 off

# 關閉 8443 後端代理
tailscale serve --https=8443 off
`

---

## 3. 備份排程與 CLI 還原

依據 AGENTS.md 政策 16，資料持久化需具備定期備份與驗證程序。

### Windows 排程任務
已透過 Windows 工作排程器建立每日凌晨 03:00 自動備份：
`powershell
schtasks /create /sc daily /st 03:00 /tn KorakuBackup /tr "node D:\game-dev\New-game-project-4\server\scripts\backup.js" /f
`

### CLI 手動備份與還原
`ash
# 手動建立一次快照備份並校驗 SHA-256 完整性
npm run backup:server

# 災難復原：指定備份目錄進行還原
node server/scripts/backup.js --restore "server/backups/backup-YYYY-MM-DDTHH-mm-ss-sssZ"
`

---

## 4. 真機驗證項目（手機執行）

測試者使用已加入相同 Tailnet 之行動裝置進行以下六項驗證：

| 驗證項目 | 測試操作步驟 | 預期結果 |
| :--- | :--- | :--- |
| 1. 線上模式與延遲 | 手機 4G 開啟 https://20250606-120834.tailfe8b74.ts.net/ | 頂部徽章顯示「線上連線」，正常顯示綠色 RTT ping 值。 |
| 2. 完整戰鬥與帳本 | 出拳、連線 QTE 反制、使用藥水、結算 | server/data/ledgers 資料夾新增帶有 timestamp 與 source 的帳本紀錄。 |
| 3. 單一寫入者踢除 | 第二台裝置以同帳號連線 | 第一台裝置收到「帳號已在其他裝置登入」Toast 並安全中斷。 |
| 4. 斷線 10 秒結算 | 戰鬥中開啟飛航模式 5 秒恢復<br>戰鬥中開啟飛航模式超過 10 秒 | 5 秒內恢復：戰鬥無縫續接。<br>超過 10 秒：伺服器依當前局勢自動結算並寫入帳本。 |
| 5. 非法來源防護 | 未授權的 Origin 發起 WebSocket 握手 | 伺服器拒絕握手（HTTP 403 / WS 1008）。 |
| 6. 離線切換與隔離 | 點擊 Banner「改用離線模式」玩遊戲，再點存檔紀錄「切換回線上模式」 | 離線操作完全不污染線上帳號存檔；線上存檔無損恢復。 |

---

## 5. 明確的「不能在 Tailscale 模擬」清單

雖然 Tailscale Staging 提供近似真機的 TLS/WSS 與真機網路體驗，但**以下項目依然無法在 Tailscale 內網模擬，正式上線時仍須在公網 VPS 驗證**：

1. **自訂公開域名與公共 DNS 解析**：
   koraku.app 與 pi.koraku.app 的 CNAME / A 記錄全球解析與 TTL 傳播。
2. **公網 Let's Encrypt 自動 ACME 簽發**：
   Tailscale 使用自家 CA 憑證；正式公網需由 Let's Encrypt 進行 HTTP-01 / TLS-ALPN-01 挑戰。
3. **雲端廠商外部安全群組 (Security Groups)**：
   AWS EC2 Security Group、GCP VPC 防火牆、Cloudflare Proxy 規則等。
4. **Linux 主機防護 (UFW / iptables / Fail2ban)**：
   本機為 Windows 10/11，正式伺服器為 Linux (Debian/Ubuntu)，其內核防火牆與端口限制須在 Linux 真機驗證。
5. **Systemd 常駐守護與崩潰重啟**：
   Windows 排程器僅能模擬 cron 定時，真正的 systemd daemon、cgroups 與 OOM 守護需在 VPS 驗證。
6. **全天候 24/7 公網穩定性與 CDN 邊緣快取**：
   GitHub Pages 與 Cloudflare 邊緣節點的快取穿透與失效行為。

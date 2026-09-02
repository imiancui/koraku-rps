# Koraku RPS 線上伺服器部署指南 (Deployment Guide)

本指南規範 **Koraku RPS (New-game-project-4)** 線上權威伺服器的部署架構、環境變數要求、反向代理、備份策略與災難還原程序。本文件所列各項均標註 **「Docker 已驗證」** 或 **「僅文件化 / 僅真機驗證」**。

---

## 1. 架構拓撲與設計原則

```
[ 玩家瀏覽器 (Web / Mobile) ]
       |
       +---> [ 靜態資源 Origin: https://koraku.app (GitHub Pages) ]
       |
       +---> [ 權威指令 WebSocket: wss://api.koraku.app/ws (VPS Caddy) ]
                     |
                     v
             [ 反向代理 Caddy: 443 -> 8080 (內部網路) ]
                     |
                     v
             [ KorakuServer (Node.js LTS, 零外部運行依賴) ]
                     |
                     +---> [ 帳號存檔 (Named Volume: /data/accounts) ]
                     +---> [ 經濟帳本 (Named Volume: /data/ledgers) ]
                     +---> [ 戰鬥 Replay (Named Volume: /data/replays) ]
                     +---> [ 每日備份 (Named Volume: /backups) ]
```

- **客戶端靜態託管**：`koraku.app` 託管於 GitHub Pages，純靜態無伺服器計算，更新不影響後端狀態。
- **後端權威裁決**：小 VPS 執行 Node.js，無 Node 專屬私有 API 綁定，日後可無縫遷往 Cloudflare Durable Objects。
- **零外部執行時依賴**：伺服器內建 RFC 6455 WebSocket 協定實作，無須 `npm install` 即可在 `node:22-alpine` 純淨映像執行。

---

## 2. 必設環境變數說明 (Docker 已驗證)

伺服器在 `NODE_ENV=production` 時實施嚴格的 **Fail-Fast 安全防線**，缺少關鍵密鑰將於啟動時立即拋出例外退出（Exit Code 1）。
演練證據統一保存在：`%LOCALAPPDATA%\Temp\koraku-staging-evidence\20260903-0535\`。

| 環境變數 | 型別 | 預設值 | 說明 | 驗證狀態與證據檔案 |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | String | `development` | 設為 `production` 時啟用嚴格安全模式（密鑰檢查、Origin 攔截）。 | **Docker 已驗證** (`01_fail_fast_missing_jwt.log`, `02_fail_fast_missing_salt.log`) |
| `JWT_SECRET` | String | *無* | **[必填]** 簽署匿名裝置 Token 的 HMAC-SHA256 密鑰（生產環境缺值即中斷啟動）。 | **Docker 已驗證** (`01_fail_fast_missing_jwt.log`) |
| `ANON_SALT` | String | *無* | **[必填]** 產生無狀態匿名 Account ID 的隨機種子鹽（生產環境缺值即中斷啟動）。 | **Docker 已驗證** (`02_fail_fast_missing_salt.log`) |
| `PORT` | Number | `8080` | 伺服器監聽之 HTTP / WebSocket 連接埠。 | **Docker 已驗證** (`03_compose_up.log`, `04_compose_ps.log`) |
| `HOST` | String | `0.0.0.0` | 監聽之網路介面位址。 | **Docker 已驗證** (`03_compose_up.log`, `04_compose_ps.log`) |
| `STORAGE_DIR` | String | `./data` | 帳號資料、經濟帳本與 Replay 的落盤目錄（建議容器內掛載 `/data`）。 | **Docker 已驗證** (`08_backup_restore_cycle.log`) |
| `BACKUP_DIR` | String | `./backups` | 備份目錄（建議容器內掛載 `/backups`）。 | **Docker 已驗證** (`08_backup_restore_cycle.log`) |
| `TRUST_PROXY` | Boolean | `false` | 若置於 Caddy / Nginx 後方，必須設為 `true` 以獲取真實客戶端 IP。 | **Docker 已驗證** (`14_load_smoke.log`) |
| `ALLOWED_ORIGINS` | String | *預設白名單* | 允許升級 WebSocket 的來源網址，逗號分隔，例如 `https://koraku.app,https://localhost:8444`。 | **Docker 已驗證** (`05_origin_check.log`) |
| `BATTLE_LOCK_POLICY` | String | `always` | 戰鬥中突變鎖定策略：`always`（整場鎖定）、`countdown`（僅判定階段鎖定）、`never`（不鎖定）。 | **Docker 已驗證** (`07_staging_battle_complete.log`) |
| `RATE_LIMIT_MAX_REQUESTS` | Number | `30` | 每秒單一 IP 允許之最大指令數。 | **Docker 已驗證** (`14_load_smoke.log`, `14_load_smoke_report.json`) |
| `RATE_LIMIT_BURST_LIMIT` | Number | `10` | 200ms 短視窗內允許之突發指令數。 | **Docker 已驗證** (`14_load_smoke.log`, `14_load_smoke_report.json`) |
| `DEV_ADMIN_KEY` | String | `null` | 開發者維護金鑰，具有此金鑰方可線上使用除錯指令。 | **Docker 已驗證** (測試套件 antiCheat / server.test.js) |
| `DEV_DEVICE_WHITELIST` | String | `""` | 享有 Dev 權限的裝置識別碼白名單（逗號分隔）。 | **Docker 已驗證** (測試套件 antiCheat / server.test.js) |

---

## 3. 客戶端 WSS 位址注入方式 (Docker 已驗證)

根據架構約束，**程式碼中嚴格禁止寫死任何正式伺服器主機名稱**。客戶端由 `src/js/net/RemoteGameClient.js` 之 `resolveWebSocketUrl(customUrl)` 自動解析：

```javascript
// 優先順序：
// 1. 顯式傳入 options.url
// 2. window.KORAKU_SERVER_URL
// 3. window.__KORAKU_CONFIG__?.serverUrl
// 4. 當前瀏覽器 window.location.host (/ws)
// 5. 本地開發預設 ws://localhost:8080/ws
```

### 正式發布注入方式（推薦）
在 GitHub Pages 部署的 `index.html` 的 `<head>` 中注入或引用環境設定檔：

```html
<!-- index.html -->
<script>
  window.__KORAKU_CONFIG__ = {
    serverUrl: "wss://api.koraku.app/ws"
  };
</script>
<script type="module" src="src/js/bundle.js?v=202609030500"></script>
```

此注入方式在不更動任一行核心 JavaScript 程式碼的前提下，讓純靜態的前端自動導向 VPS 正式權威端點。

---

## 4. 反向代理設定範例

### Caddyfile (正式版範本，Docker 已驗證核心轉發)

Caddy 自動申請並續簽 Let''s Encrypt SSL 憑證，並提供優異的 WebSocket 長連線反向代理支援：

```caddy
# /etc/caddy/Caddyfile
api.koraku.app {
    # 自動 HTTPS (Let's Encrypt / ZeroSSL)
    encode gzip zstd

    # 健康檢查端點
    handle /health* {
        reverse_proxy server:8080
    }

    # 匿名認證端點
    handle /auth/* {
        reverse_proxy server:8080
    }

    # 權威 WebSocket 代理 (傳遞真實 IP 與安全 Proto 標頭)
    handle /ws* {
        reverse_proxy server:8080 {
            header_up Host {host}
            header_up X-Real-IP {remote_host}
            header_up X-Forwarded-Proto https
        }
    }

    # 其餘請求導向伺服器
    handle {
        reverse_proxy server:8080
    }
}
```

### Nginx 設定範例 (選做，僅文件化)

若運維規範指定使用 Nginx：

```nginx
# /etc/nginx/sites-available/koraku.conf
server {
    listen 80;
    server_name api.koraku.app;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.koraku.app;

    ssl_certificate /etc/letsencrypt/live/api.koraku.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.koraku.app/privkey.pem;

    location /ws {
        proxy_pass http://127.0.0.1:8080/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

---

## 5. 伺服器部署方案

### 方案 A：Docker Compose (推薦，Docker 已驗證)

正式環境可直接沿用 `docs/ops/docker-compose.staging.yml` 之架構，將網域名稱替換為正式網域即可：

```bash
# 1. 建立伺服器工作目錄並放置 docker-compose.yml 與 Caddyfile
mkdir -p /opt/koraku-rps
cd /opt/koraku-rps

# 2. 建立環境變數檔 .env (密鑰由維運管理員獨立生成，切勿存入 git)
cat << 'EOF' > .env
NODE_ENV=production
PORT=8080
HOST=0.0.0.0
STORAGE_DIR=/data
BACKUP_DIR=/backups
JWT_SECRET=production_strong_random_secret_here
ANON_SALT=production_strong_random_salt_here
TRUST_PROXY=true
ALLOWED_ORIGINS=https://koraku.app,https://www.koraku.app
BATTLE_LOCK_POLICY=always
DEV_ADMIN_KEY=production_admin_maintenance_key_here
EOF

# 3. 啟動服務容器
docker compose up -d

# 4. 檢查運作狀態
docker compose ps
docker compose logs server
```

### 方案 B：Systemd Service (選做，僅文件化)

若不採用容器，直接於 Linux 主機執行 Node.js：

```ini
# /etc/systemd/system/koraku.service
[Unit]
Description=Koraku RPS Authoritative Server
After=network.target

[Service]
Type=simple
User=koraku
WorkingDirectory=/var/www/koraku-rps
EnvironmentFile=/var/www/koraku-rps/.env
ExecStart=/usr/bin/node server/index.js
Restart=always
RestartSec=5s
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable koraku.service
sudo systemctl start koraku.service
```

---

## 6. 防火牆與安全設定 (僅真機驗證)

```bash
# Ubuntu UFW 基本安全防護
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH (建議限制作業 IP 或 Tailscale)
sudo ufw allow 80/tcp    # HTTP (ACME 驗證)
sudo ufw allow 443/tcp   # HTTPS / WSS
sudo ufw enable
```

---

## 7. 每日自動備份排程與災難還原 SOP (AGENTS.md Policy 16)

依據專案規範 Policy 16：「在正式公開上線前，必須具備每日自動備份與經測試驗證之還原程序」。

### 7.1 定時備份排程 (Linux Crontab)

在主機端排程每日凌晨 03:00 自動執行備份：

```cron
# 每日 03:00 執行資料備份 (Docker 環境)
0 3 * * * docker compose -f /opt/koraku-rps/docker-compose.yml exec -T server node server/scripts/backup.js >> /var/log/koraku-backup.log 2>&1

# 每日 03:30 異地同步至 S3 / 遠端儲存庫 (選做)
30 3 * * * aws s3 sync /opt/koraku-rps/backups/ s3://koraku-backups/$(date +\%Y\%m\%d)/ --delete
```

### 7.2 備份內容與 SHA-256 完整性保護

每次備份會在 `BACKUP_DIR` 生成帶時間戳的目錄（例如 `backup-2026-09-03T03-00-00-000Z`），內含：
- `accounts/*.json`：所有匿名玩家帳號資料。
- `ledgers/*.jsonl`：金幣、經驗與裝備變更之不可篡改帳本。
- `replays/*.json`：確定性戰鬥重放軌跡。
- `manifest.json`：記錄備份時間、檔案清單與每一筆檔案的 SHA-256 雜湊碼。

### 7.3 災難還原演練程序 (Docker 已驗證)

若遭遇磁碟損毀或資料異常，可依下列步驟在數秒內還原資料：

```bash
# 1. 暫停或隔離對外連線，避免還原期間產生衝突突變
docker compose stop server

# 2. 執行還原腳本（自動校驗 SHA-256 雜湊，雜湊不符者嚴格拒絕還原）
docker compose run --rm \
  -v staging_server_data:/data \
  -v staging_server_backups:/backups \
  server node -e "
import fs from 'node:fs/promises';
import path from 'node:path';
import { restoreBackup } from './server/scripts/backup.js';

const backups = await fs.readdir('/backups');
const latest = path.join('/backups', backups.sort().pop());
console.log('[SOP] Restoring from latest backup:', latest);

const res = await restoreBackup(latest, '/data');
console.log('[SOP] Restore completed successfully:', res);
"

# 3. 重新啟動伺服器服務
docker compose start server

# 4. 驗證服務狀態
curl -s http://localhost:8080/health
```

---

## 8. 監控與健康檢查 (Docker 已驗證)

- **HTTP `/health` 端點**：
  回傳 `status: "ok"`、目前協定版本、配置版本、在線連線數與伺服器時間戳。
- **外部 Uptime 監控**：建議配置 Uptime Kuma 或 BetterUptime，每 60 秒探測一次 `https://api.koraku.app/health`，若連線失敗即刻發送通知。

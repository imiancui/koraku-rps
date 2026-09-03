# AI Handover & Architecture Guide — 狐樂・絆之勝負 (Koraku RPS)

> **文件用途**：AI 代理人與開發者快速上手、架構交接、開發合約指引與校對基準  
> **專案根目錄**：`D:\game-dev\New-game-project-4`  
> **當前版本**：`v0.0.24`（顯示於首頁頁腳最左側 `0.0.24`，自最後一位遞增，每 100 個版本進一位：`0.0.100` -> `0.1.0`）  
> **最新更新日期**：2026-09-03  
> **基準規範**：`OPENSPEC.md` 與 `AGENTS.md`  
> **測試狀態**：`npm test` 227/227、`npm run test:server` 20/20、`npm run test:rwd:smoke` 30/30 全部通過 (100% Pass)；雙端合約、反作弊專項、確定性重放、高延遲寬限審查、多開踢出保證、Phase 4 Docker Staging 演練 (Server/Caddy/Client)、20 併發帳號負載煙霧、戰鬥中鎖定策略 (battleLockPolicy)、AppView 換裝配點鎖定灰化 UI (RWD-REG-016 跨 4 視口與雙語系驗證)、預設離線與注入設定 (Policy 17)、雙模式存檔隔離、排隊指令逾時、種子防外洩、10s 斷線寬限修復、Tailscale Staging 內網環境、Changelog 頂部最新版保證與當前版本標籤全數綠燈就位。

---

## 1. 核心專案概覽 (System Overview)

本專案為日式 ACGN 猜拳 RPG 對決遊戲，採用純原生（Vanilla ES Modules / HTML5 / CSS3 / Web Audio API）無前端框架架構。
經過 Online-ready 權威架構重構後，系統已支援 **雙端合約模式（Dual-Client Architecture）**：
- **線上模式 (`online`)**：連線至權威 WebSocket 伺服器，伺服器執行唯一戰鬥裁決、時序寬限審計、單一寫入者保證與經濟帳本追加。
- **離線模式 (`offline`)**：本機沙盒環境（`?mode=offline`、`localhost` 或未注入伺服器端點時之預設狀態），由瀏覽器進程內零 DOM 核心直接驅動，絕不污染線上伺服器存檔。

### 1.1 核心指令
- **執行全域測試**：`npm test`（Node.js 原生測試執行器，227 項測試全綠，包含合約、反作弊、重放、高延遲、模式隔離、Changelog 當前版本防護與語系檢驗）
- **執行伺服器測試**：`npm run test:server`（20 項伺服器權威測試，包含種子防外洩、10s 斷線寬限鏈與拒絕日誌）
- **執行 RWD 煙霧測試**：`npm run test:rwd:smoke`（30 項 Playwright 跨設備視口煙霧測試）
- **伺服器資料備份**：`npm run backup:server`（生成 SHA-256 驗證之 JSONL/JSON 備份封裝）
- **伺服器資料還原**：`node server/scripts/backup.js --restore <backup-dir>`
- **Tailscale 內網站**：`npm run start:tailscale:full`（一鍵啟動後端、前端注入與 Tailscale 443/8443 代理）
- **打包發布**：`npm run build` 或 `node scripts/build.mjs`（生成 `src/js/bundle.js`，嚴禁手動編輯 bundle）
- **產生 Excel 規格**：`npm run specs:excel`
- **線上發布網址**：`https://koraku.app/`
- **本地伺服器**：`npm run dev` 或 `npm start`（預設監聽 `http://127.0.0.1:4173/`）

### 1.2 預設離線與伺服器設定注入政策 (Policy 17 & Disjoint Storage)
- **模式解析順序**：`?mode=offline|online` → `localStorage.koraku_mode` → 若存在 `window.__KORAKU_CONFIG__.serverUrl` 或 `window.KORAKU_SERVER_URL` 則 `online` → 否則一律預設 `offline`。刪除依 hostname 判斷 online 的分支；`file://` 永遠離線。
- **無注入配置退回保護與殘留清除**：若指定 `online` 但無注入配置，嚴格禁止回退同源 `/ws`，一律直接以 `offline` 沙盒啟動並提示 Toast `connection.noServerConfigured`；同時主動清除殘留之 `localStorage.koraku_mode`，確保提示只在首次降級時出現一次。
- **雙模式存檔隔離 (Disjoint Storage Keys)**：離線沙盒存檔使用 `koraku-rps-save-v1`；線上客戶端 Token 使用 `koraku-rps-online-token`，線上狀態快取使用 `koraku-rps-online-state`。兩者鍵空間完全獨立，切換模式互不影響。
- **斷線 Banner 與存檔面板雙向切換**：斷線 Banner 在 `reconnecting` 與 `disconnected` 狀態顯示「改用離線模式」按鈕；存檔紀錄面板在偵測到注入伺服器時顯示「切換回線上模式」按鈕（通過 RWD-REG-017 跨 4 大視口與中英雙語系驗證，按鈕高 ≥ 40px）。
- **排隊指令 8 秒超時**：未連線（非 ONLINE）狀態下進入 `_commandQueue` 的指令套用 8 秒超時，逾時自佇列移除並以 `NOT_CONNECTED` reject，Toast 提示 `connection.commandFailedOffline`。
- **伺服器安全性增強與審計日誌**：
  1. 快照與事件廣播徹底剝除 `seed` 與 `commandLog`，伺服器日誌保留 Replay 檔案（C1）。
  2. 修復 ConnectionManager -> GameSession -> BattleSystem 10 秒斷線寬限鏈與自動結算（C2）。
  3. 伺服器端對所有被拒絕指令（限流 RATE_LIMITED、Schema、無權作弊、執行失敗 NOT_FOUND、Origin 違規 FORBIDDEN_ORIGIN、版本不相容 VERSION_MISMATCH）記錄包含 IP 與連線識別之 `console.warn` 審計日誌（C3）。
- **Tailscale 內網測試站與營運工具**：
  - `npm run start:tailscale:full`：啟動後端權威伺服器、靜態端並於 `<script src="./src/js/bundle.js">` 前伺服端動態注入 WSS 設定，掛載 Tailscale HTTPS 443 與 8443 代理；實測端點留證於 `docs/ops/evidence/tailscale-20260903/`。
  - Windows 工作排程器每日 03:00 自動執行備份（`KorakuBackup`），路徑解析採專案根目錄絕對路徑；支援 `node server/scripts/backup.js --restore <dir>` CLI 快速還原，演練日誌留證於 `docs/ops/evidence/tailscale-20260903/restore_drill_log.txt`。

---

## 2. 模組分層與系統地圖 (Architecture Map)

```
New-game-project-4/
├── server/                             # 權威伺服器端（Zero DOM, 獨立於前端 Bundle）
│   ├── config.js                       # 伺服器設定、通訊協議常數、錯誤碼、心跳週期
│   ├── index.js / server.js            # 伺服器入口（WebSocket + HTTP /health）
│   ├── auth/
│   │   └── AuthManager.js              # 匿名裝置 Token 簽發與 HMAC-SHA256 驗證
│   ├── core/
│   │   ├── ConnectionManager.js        # 單一連線管理（Single Writer: 新連線踢出舊連線 4001）
│   │   ├── CommandQueue.js             # 每帳號序列化 FIFO 佇列與 cmdId 冪等性防重複
│   │   ├── EntitlementManager.js       # 作弊指令需 Dev Entitlement 權限檢驗
│   │   ├── GameSession.js              # 伺服器端核心會話（生命週期、10s 斷線寬限、裝備鎖定）
│   │   └── TransferManager.js          # 15 分鐘一次性轉移碼簽發與跨裝置兌換
│   ├── security/
│   │   ├── RateLimiter.js              # 滑動窗口流量限制與突發請求保護
│   │   └── Validator.js                # 來源 (Origin) 檢查、信封 Schema 與 4KB 上限
│   ├── storage/
│   │   ├── StorageAdapter.js           # 儲存抽象介面
│   │   └── JsonStorage.js              # 原子寫入 JSON 與 Append-only JSONL 經濟帳本
│   └── scripts/
│       └── backup.js                   # SHA-256 雜湊 Manifest 備份與還原腳本
│
├── src/js/
│   ├── config/
│   │   └── gameConfig.js               # 全域數值設定（關卡、12格裝備、技能、道具、資產路徑）
│   ├── core/
│   │   ├── EventBus.js                 # 發布/訂閱事件中樞
│   │   ├── GameStore.js                # Schema v2 實例裝備、星砂、帳本追加、歷程紀錄、DPS
│   │   └── TimerRegistry.js            # 定時器生命週期管理（避免記憶體洩漏）
│   ├── kernel/                         # 零 DOM / 零 Node API 純 JS 核心
│   │   ├── GameClient.js               # 客戶端抽象基底介面 (send, getState, on, getRTT)
│   │   ├── LocalGameClient.js          # 離線沙盒客戶端（封裝同進程 kernel 與 localStorage）
│   │   ├── kernelFactory.js            # 純 JS 核心工廠（createKernel 注入 random, now, locale）
│   │   └── protocol.js                 # 協議信封、指令 (Commands)、事件 (Events)、錯誤碼
│   ├── net/
│   │   ├── RemoteGameClient.js         # 線上客戶端（WebSocket、Ping/Pong RTT、指數退避重連、時間同步）
│   │   └── protocol.js                 # 協議定義連結
│   ├── services/
│   │   ├── I18n.js                     # 4國語系在地化引擎（zh-Hant, zh-Hans, en, ja）
│   │   └── Persistence.js              # 本地 localStorage 讀寫容錯
│   ├── systems/
│   │   ├── BattleSystem.js             # 回合狀態機、150ms 寬限時序審計、秘密承諾、暫停限制、重放日誌
│   │   ├── QTESystem.js                # 單軌 QTESystem 與雙軌 DualQTESystem（批次回報與時戳審計）
│   │   ├── QTEInputSystem.js           # WASD/方向鍵/數字鍵盤對應與斜向合成
│   │   ├── rpsRules.js                 # 猜拳勝負判定、雙手勝負判定、剋制反制手勢與敘事
│   │   ├── progressionRules.js         # 等級經驗公式、屬性推導 (Base + Allocation + Gear)
│   │   ├── PostBattleSystem.js         # 戰後事件、泳裝切換、三刀切西瓜物理三角波時鐘、浮層切西瓜
│   │   └── SoundSystem.js              # Web Audio API 音效合成（拳擊、撫摸、勝利、失敗）
│   ├── ui/                             # 展示層（Ponytail OFF 嚴格維持神社美學）
│   │   ├── AppView.js                  # 意圖指令發送、唯讀事件訂閱、連線狀態指示、轉移碼 UI
│   │   ├── HUDDragController.js         # 局內四大 HUD 自由拖曳、邊界約束、持久化與雙擊重設
│   │   └── DialogueController.js       # AVG 逐字打字機台詞與角色說話跳動動態
│   ├── main.js                         # 進入點（resolveClientMode 模式路由與 GameClient 裝配）
│   └── bundle.js                       # 生成之 Bundle 產物（嚴禁手動編輯）
│
└── styles/                             # 展示層樣式（Ponytail OFF 嚴格維持神社美學）
    ├── tokens.css                      # 色彩主題、字型、圓角、陰影、--ink-950、--gold-bright
    ├── base.css                        # 重置樣式、排版基底、touch-action 防雙擊縮放
    ├── components.css                  # 按鈕、卡片、模態框、連線狀態徽章、暗黑墨金斷線倒數橫幅
    ├── screens.css                     # 各大主畫面（首頁/關卡/商店/裝備/圖鑑/戰鬥/歷程/浮動切西瓜）
    ├── animations.css                  # 受擊震動、說話跳動、QTE 特效、雷擊/燃燒動畫
    └── responsive.css                  # 780px/390px 行動版適配
```

---

## 3. 權威架構與三類裁決模型 (Online Adjudication Model)

### 3.1 核心權威原則 (Authority Policies)
1. **意圖表達 (Intent Only)**：客戶端僅向伺服器發送玩家意圖指令（`client.send(command, payload)`），絕不發送計算後的傷害、勝負、金幣或隨機數結果。
2. **三類裁決模型 (Three-Class Adjudication)**：
   - **Class 1：時機類操作 (Timing Claims)**
     - 涵蓋：QTE 按鍵輸入、時機變拳觸發、切西瓜擊打。
     - 裁決邏輯：客戶端立即播放樂觀反饋動畫；伺服器審查宣告時戳與按鍵間隔（$\text{IKI} \ge 40\text{ ms}$），並給予 **150 ms 網路時序寬限**（$\text{boundedDeclaredAt} = \min(\text{declared}, \text{arrival} + 150)$）。超時者判定失敗並回調校正。
   - **Class 2：秘密類承諾 (Secret Commitments)**
     - 涵蓋：常規出拳手勢選擇。
     - 裁決邏輯：玩家手勢必須在揭曉截止時間戳（`revealDeadline`）前送達伺服器；逾時送達直接回傳 `SECRET_COMMITMENT_EXPIRED` 並予以忽略。
   - **Class 3：狀態類突變 (State Mutations)**
     - 涵蓋：購買道具、使用藥水、穿卸裝備、配點升級。
     - 裁決邏輯：每帳號單一 FIFO 佇列序列化執行，以 `cmdId` 為鍵保證冪等性；**戰鬥進行中鎖定換裝與屬性配點**（回傳 `BATTLE_IN_PROGRESS_LOCKED`）。
3. **單一寫入者保證 (Single Writer Guarantee)**：
   - 每帳號同一時間僅允許一個活躍連線。新連線（如手機端）建立時，伺服器立即向舊連線（如電腦端）發送 `connection:state`（`reason: "NEW_CONNECTION_ESTABLISHED"`）並平滑斷開（Code 4001）；舊客戶端標記 `_isExplicitlyClosed = true` 避免重連風暴，並向玩家展示友好提示。
4. **離線沙盒隔離 (Offline Sandbox Isolation)**：
   - 離線模式（`LocalGameClient`）之進度留存於瀏覽器 localStorage，絕不自動覆蓋或同步至線上伺服器。跨裝置同步必須透過 **15 分鐘一次性轉移碼**。
5. **戰鬥暫停限制與斷線結算**：
   - 僅允許在出拳倒數（`countdown`）階段暫停，每場戰鬥上限 3 次；反應（`reaction`）與 `qte` 階段禁止暫停。
   - 戰鬥中斷線享有 10 秒寬限期（支援斷線即時重連恢復）；超過 10 秒伺服器自動依當前血量狀態強制結算。
6. **文字與在地化隔離**：
   - 伺服器與 Kernel 不輸出任何面向玩家的硬編碼文字，所有日誌與台詞均為 `{ key, params }` 結構體；客戶端依據當前語系（`I18n.js`）完成即時渲染。
7. **確定性戰鬥重放 (Deterministic Replay)**：
   - 每場戰鬥持久化 RNG 種子與有序指令日誌，透過 Mulberry32 PRNG 達成 100% 確定性軌跡重放。
8. **GDPR 刪帳與經濟帳本匿名化保留策略**：
   - 當玩家請求刪除帳號（`account.delete`）時，伺服器依 GDPR 抹除權銷毀該使用者的個人存檔（`accounts/<id>.json`）與所有未兌換轉移碼；
   - 為保障經濟帳本不可篡改與資金守恆性，經濟帳本（.jsonl）**不作物理刪除**，而是透過不可逆之伺服器端鹽值雜湊（HMAC-SHA256(accountId, serverSalt)）將所有紀錄匿名化遷移至 `anon_<hash>.jsonl`，阻斷任何個人身份關聯。

---

## 4. 通訊協議與指令表 (Protocol & Commands)

### 4.1 指令信封格式 (Command Envelope)
```json
{
  "cmdId": "cmd_1725330000000_a1b2c3",
  "command": "battle.selectHand",
  "payload": {
    "hand": "rock",
    "slot": null
  },
  "token": "usr_dev_token_xxx",
  "clientTime": 1725330000100,
  "configVersion": "2026.09.03"
}
```

### 4.2 核心指令清單 (Commands)
| 指令名稱 | 參數 Payload | 說明 |
| :--- | :--- | :--- |
| `battle.start` | `{ stageId, options }` | 啟動指定章節戰鬥（可附帶沙盒參數） |
| `battle.selectHand` | `{ hand: "rock"|"scissors"|"paper", slot }` | 提交出拳手勢（需在 reveal 前抵達） |
| `battle.selectTarget` | `{ target: "left"|"right" }` | 第 4 關雙生 Boss 切換鎖定目標 |
| `battle.useMorph` | `{}` | 消耗 25 MP 於反應窗口發動變拳 |
| `battle.useItem` | `{ itemId: "hpPotion"|"mpPotion" }` | 戰鬥中使用靈露藥水 |
| `battle.inputQte` | `{ direction, slot }` | 提交 QTE 方向按鍵（附帶 clientTime） |
| `battle.pause` | `{}` | 倒數階段暫停戰鬥（上限 3 次） |
| `battle.resume` | `{}` | 恢復戰鬥計時 |
| `battle.abandon` | `{}` | 放棄當前戰鬥返回大廳 |
| `autoBattle.start` | `{ stageId, rounds }` | 啟動連續自動刷關 |
| `autoBattle.stop` | `{}` | 終止自動刷關 |
| `postBattle.requestSwimsuit` | `{}` | 請小樂換穿泳裝 |
| `postBattle.startWatermelon` | `{}` | 開始切西瓜挑戰 |
| `postBattle.strikeWatermelon` | `{}` | 擊打西瓜（伺服器審核物理軌跡） |
| `shop.buyItem` | `{ itemId }` | 購買消耗型藥水 |
| `shop.buyEquipment` | `{ typeId }` | 購買裝備（生成實例 uid） |
| `equipment.equip` | `{ uid, slot }` | 穿戴裝備（非戰鬥狀態） |
| `equipment.unequip` | `{ slot }` | 卸下裝備（非戰鬥狀態） |
| `growth.allocateStat` | `{ stat: "hp"|"mp"|"damage" }` | 投入 1 SP 屬性點 |
| `growth.allocateSkill` | `{ skill: "momo"|"dualHand" }` | 升級奧義技能 |
| `account.issueTransferCode`| `{}` | 申請 15 分鐘一次性轉移碼 |
| `account.claimTransferCode`| `{ code }` | 兌換轉移碼繼承存檔 |
| `account.exportJson` | `{}` | GDPR 帳號資料 JSON 導出 |
| `account.delete` | `{}` | GDPR 徹底刪除帳號與存檔重置 |
| `cheat.setStats` | `{ level, coins, ... }` | 開發者權限作弊數值設定 |
| `cheat.unlockAll` | `{ stages, gallery }` | 開發者權限一鍵全解鎖 |

---

## 5. 展示層規範與視覺防線 (UI & Aesthetic Policy)

> [!IMPORTANT]
> **展示層 Ponytail OFF 鐵律**：
> `src/js/ui/**`、`index.html`、`src/styles/**` 嚴格禁止任何簡化、刪除包裝層或 native 控制項替換！
> 必須 100% 保留日式 ACGN 暗黑神社美學（深墨底 `--ink-950`、金箔邊框 `var(--gold)`、緋紅按鈕、40px 控制高度、無 OS 原生 Emoji）。

### 5.1 連線狀態指示徽章 (Connection Badge)
- **綠色 (`.is-online`)**：線上正常連線。
- **黃色 (`.is-reconnecting` / `.is-high-ping`)**：重連中或 RTT 延遲 $\ge 180\text{ ms}$（動態顯示數值如 `240ms`）。
- **灰色 (`.is-offline`)**：本機離線沙盒模式。
- **紅色 (`.is-disconnected`)**：已中斷連線。

### 5.2 斷線 10 秒倒數橫幅 (Dark-Gold Banner)
- **背景**：暗黑神社深墨底 `linear-gradient(135deg, rgba(16, 19, 31, 0.98), rgba(8, 10, 16, 0.98))`。
- **邊框與倒數**：金箔邊框 `1px solid var(--gold)`，倒數文字使用亮金色 `var(--gold-bright)`。
- **時機**：戰鬥中斷線即刻彈出並倒數 10 秒，10 秒內重連自動復原，超時自動結算。

---

## 6. 測試與驗證矩陣 (Verification Matrix)

| 測試分類 | 測試檔案 | 測試數量 | 驗證重點 |
| :--- | :--- | :--- | :--- |
| **雙端合約** | `tests/contract.test.js` | 8 | Local 與 Remote 客戶端行為 100% 等價 |
| **反作弊防禦** | `tests/antiCheat.test.js` | 8 | 偽造封包、重放攻擊、時序逾期、戰鬥中裝備鎖定、未授權作弊攔截 |
| **重放與 PRNG** | `tests/rngAndReplay.test.js` | 7 | 卡方均勻度檢定、相同種子 + 日誌 100% 確定性重放 |
| **高延遲壓力** | `tests/highLatencyStress.test.js` | 4 | 200ms+ 高延遲下 150ms 寬限判定與切西瓜物理時鐘 |
| **多開踢出** | `tests/singleWriterKickout.test.js` | 1 | 單一寫入者保證，舊連線平滑踢出與防重連風暴 |
| **模式切換** | `tests/modeSwitching.test.js` | 6 | `?mode=online`/`offline` 路由、沙盒存檔隔離、轉移碼、殘留模式清除 |
| **四語系完整性** | `tests/i18n.test.js` | 6 | 繁中、簡中、英文、日文所有鍵值 100% 完整翻譯 |
| **伺服器單元** | `server/test/server.test.js` | 20 | Token 簽發、Schema 驗證、轉移碼、備份還原、每帳號佇列、10s 寬限、日誌審計 (RATE_LIMITED, EXECUTION_FAILURE, FORBIDDEN_ORIGIN, VERSION_MISMATCH) |
| **RWD 跨設備** | `scripts/run-rwd.mjs` (smoke-core) | 30 | Mobile (375px/390px)、Tablet (768px/820px)、Desktop (1280px) 視口驗證 |
| **RWD 離線降級按鈕** | `scripts/verify-offline-fallback-rwd.mjs` | 27 | 375×812 ~ 1920×1080、雙語系、斷線與存檔切換按鈕、動態 resize (`docs/ui/evidence/offline-fallback-20260903/`) |
| **Tailscale 預備環境** | `scripts/serve-tailscale.mjs` | 4 端點 + 還原演練 | 4173 靜態注入、8080 權威、8443 WSS/HTTPS、每日備份排程 (`docs/ops/evidence/tailscale-20260903/`) |

---

## 7. 演進里程碑與後續規劃 (Roadmap & Milestones)

- **Phase 1 ~ Phase 3.5（已 100% 達成）**：
  - 核心零 DOM 解耦、雙端 GameClient 抽象。
  - 權威伺服器、三類裁決、150ms 寬限、單一連線踢出 (4001)、15 分鐘轉移碼原子互斥保證。
  - Schema v2 裝備實例與 Append-only 經濟帳本。
  - 確定性重放全迴路驗證（打完戰鬥 -> 存檔 Replay -> 讀回重放 100% 一致）。
- **Phase 4：上線整備與規格化（已 100% 達成）**：
  - **OpenSpec 規格化**：建立 `koraku-online-authority-formalization` 提案，正式化線上權威裁決、作弊面板權限與鎖定策略規格。
  - **戰鬥中鎖定策略 (`battleLockPolicy`)**：伺服器支援 `always` / `countdown` / `never` 配置，集中式 `isMutationLocked()` 判斷，握手下發 `serverConfig`，專用四語系 `battle.lockedDuringBattle` 提示。
  - **真實 WebSocket 線上整合**：`onlineBattleE2E.test.js` 涵蓋真實連線打完一場戰鬥、雙手出拳 left/right slot 映射、版本不相容 (VERSION_MISMATCH) 客戶端中斷與 Toast 提示。
  - **Docker Staging 演練**：建立 `docs/ops/docker-compose.staging.yml`（Node 伺服器 + Caddy 反向代理 + 獨立 Origin 靜態客戶端），完成缺變數 fail-fast、Origin 拒絕/放行、WebSocket 閒置心跳、完整戰鬥、資料備份與還原、容器崩潰 restart:always、20 併發帳號負載煙霧（100% 成功，平均延遲 99ms）。實測全項留證於目錄 `%LOCALAPPDATA%\Temp\koraku-staging-evidence\20260903-0535\`。
  - **上線整備文件**：產出 `docs/ops/go-live-checklist.md`（標明「僅真機驗證」）與 `docs/ops/deployment.md`（標明「Docker 已驗證 / 僅文件化」），落實 AGENTS.md 政策 16 之每日備份排程與還原 SOP。
  - **動態 WSS 注入**：支援 `window.__KORAKU_CONFIG__.serverUrl` 與 `window.KORAKU_SERVER_URL`，保證正式主機名不寫死於程式碼。
- **Phase 4.5：v0.0.23 收尾與完整整備（已 100% 達成）**：
  - **Tailscale 腳本重構與 Staging 驗收**：修復 `scripts/serve-tailscale.mjs` 字串展開與語法錯誤，精確於 bundle 標籤前注入；以 `curl` 實測 4173 靜態注入、8080 `/health`、8443 HTTPS `/health` 與 443 靜態首頁，產出留證於 `docs/ops/evidence/tailscale-20260903/`。
  - **自動備份排程與災難還原演練**：`backup.js` 路徑解析獨立於 cwd；重建 Windows `KorakuBackup` 排程並執行冷啟動還原演練（備份 -> 覆蓋 -> restore -> /health 200 -> 復原），日誌留存 `restore_drill_log.txt`。
  - **伺服器拒絕日誌四分支審計**：補全 Origin 拒絕（WS verifyClient / HTTP CORS）與版本不符之 `console.warn` 記錄，C3 測試覆蓋率達 20/20 全綠。
  - **客戶端單次提示保護**：`main.js` 於無配置降級離線時自動清除殘留 `localStorage.koraku_mode`，根除每次重新整理均彈出警告之問題。
  - **RWD 離線降級按鈕專項驗收 (RWD-REG-017)**：在 Playwright 中覆蓋 4 視口（375px/768px/1280px/1920px）、雙語系、斷線/重連/存檔開啟狀態與動態 resize 27 項全量測試，留證 27 張截圖與 JSON 報告於 `docs/ui/evidence/offline-fallback-20260903/`，主控台 0 新增錯誤。
  - **OpenSpec 規格歸檔與收尾報告**：`koraku-offline-default-and-fallback` 18 項任務全數核實完成並歸檔為 `2026-09-03-koraku-offline-default-and-fallback`，主規格同步新增 7 項需求；產出整合收尾報告 `docs/engineering/online-closeout-20260903.md`。
- **Phase 4.6：v0.0.24 升版與發布整備（已 100% 達成）**：
  - **客戶端快取失效機制與版本跳升**：因應 `main.js` 模式降級行為修復，依 AGENTS.md 升版至 `v0.0.24`；更新首頁頁腳版本標籤、更換所有 CSS 與 bundle 之快取查詢字串 `?v=202609031548`，確保線上玩家立即載入最新邏輯。
  - **回歸日誌重編號與遞增規則鐵律**：全面修正 `docs/ui/rwd-regression-log.md` 編號衝突，確立全檔唯一、單調遞增原則；正式將戰鬥中配點換裝鎖定納入 `RWD-REG-016`、離線降級雙按鈕納入 `RWD-REG-017`。
  - **四語系更新日誌與維運證據入庫**：於 `I18n.js` 與百科同步新增 v0.0.24 更新條目；完成 `koraku-gh` 遠端發布隔離與線上驗證。
- **Phase 5（後續演進待辦）**：
  - 第三方帳號登入整合（Discord / Google OAuth2 與匿名裝置 Token 綁定遷移）。
  - 全球伺服器多節點部署與 Redis 分散式 Session 支援。
  - 玩家間即時 PVP 猜拳匹配擂台賽系統。

### 已知待辦 (Known Technical Debt & Follow-ups)
- i18n 第三批次級靜態殘留待辦（戰鬥日誌 header 旁小字、出拳區 panel-kicker 上方小標、快捷欄子標籤、背包靈露說明、戰績挑戰統計總計行）：量小且非核心流程，留待後續 UI 優化統一清理。

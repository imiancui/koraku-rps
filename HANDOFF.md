# AI Handover & Architecture Guide — 狐樂・絆之勝負

> 文件用途：AI 代理人與開發者快速上手、架構交接與開發合約指引  
> 專案根目錄：`D:\game-dev\New-game-project-4`  
> 當前版本：`v0.0.14`（顯示於首頁頁腳最左側 `0.0.14`，自最後一位遞增，每 100 個版本進一位：`0.0.100` -> `0.1.0`）  
> 最新更新日期：2026-09-02  
> 基準規範：`OPENSPEC.md` 與 `AGENTS.md`  
> 測試狀態：`npm test` 107/107 全部通過 (100% Pass)；RWD Repeat 2,286 跨引擎驗證全數通過

---

## 1. 核心專案概覽 (System Overview)

本專案為純原生（Vanilla ES Modules / HTML5 / CSS3 / Web Audio API）架構的日式 ACGN 猜拳 RPG 對決遊戲。無前端框架、無外部執行期套件相依，可直接於本機或透過 GitHub Pages / 自訂網域（`https://koraku.app/`）部署運行。

### 1.1 核心命令
- **執行測試**：`npm test`（Node.js 原生測試執行器，101 項測試）
- **打包發布**：`npm run build` 或 `node scripts/build.mjs`（生成 `src/js/bundle.js`）
- **產生 Excel 規格**：`npm run specs:excel`
- **線上網址**：`https://koraku.app/`
- **本地伺服器**：`npm run dev` 或 `npm start`（預設監聽 `http://127.0.0.1:4173/`）
- **Tailscale 共享**：`npm run start:tailscale`

---

## 2. 模組分層與系統地圖 (Architecture Map)

```
src/
├── js/
│   ├── config/
│   │   └── gameConfig.js       # 全域數值設定（關卡、12格裝備、技能、道具、資產路徑、八方向、修練場參數）
│   ├── core/
│   │   ├── EventBus.js         # 發布/訂閱事件中樞
│   │   ├── GameStore.js        # 存檔、星砂、裝備背包、屬性推導、歷程紀錄、DPS 與作弊
│   │   └── TimerRegistry.js    # 單場定時器生命週期管理（避免記憶體洩漏與殘留）
│   ├── services/
│   │   ├── I18n.js             # 4國語系在地化引擎（zh-Hant, zh-Hans, en, ja）
│   │   └── Persistence.js      # localStorage 讀寫容錯與持久化
│   ├── systems/
│   │   ├── BattleSystem.js     # 回合狀態機、倒數節奏、看清變拳、傷害/特效、自動刷關、修練場沙盒
│   │   ├── QTESystem.js        # 單軌 QTESystem 與雙軌 DualQTESystem
│   │   ├── QTEInputSystem.js   # WASD/方向鍵/數字鍵盤對應與雙正方向斜向合成
│   │   ├── rpsRules.js         # 猜拳勝負判定、雙手勝負判定、剋制反制手勢與敘事
│   │   ├── progressionRules.js # 等級經驗公式、屬性推導 (Base + Allocation + Gear)
│   │   ├── PostBattleSystem.js # 戰後事件、泳裝切換、三刀切西瓜、自動刷關浮層切西瓜
│   │   └── SoundSystem.js      # Web Audio API 音效合成（拳擊、撫摸、勝利、失敗）
│   ├── ui/
│   │   ├── AppView.js          # DOM 渲染、畫面導航、紙娃娃、修練場、傷害日誌、浮動切西瓜
│   │   └── DialogueController.js # AVG 逐字打字機台詞與角色說話跳動動態
│   ├── main.js                 # 系統組裝與進入點
│   └── bundle.js               # 打包產物
└── styles/
    ├── tokens.css              # 色彩主題、字型、圓角、陰影
    ├── base.css                # 重置樣式與排版基底
    ├── components.css          # 按鈕、卡片、模態框、HUD、修練場、傷害日誌
    ├── screens.css             # 各大主畫面（首頁/關卡/商店/裝備/圖鑑/戰鬥/歷程/浮動切西瓜）
    ├── animations.css          # 受擊震動、說話跳動、QTE 特效、雷擊/燃燒動畫
    └── responsive.css          # 780px/390px 行動版適配
```

---

## 3. 核心狀態機與事件契約 (Event Contracts)

### 3.1 戰鬥狀態機 (BattleSystem.state.phase)
1. `idle`：尚未進入戰鬥。
2. `countdown`：回合倒數中（第 1 關 5s，第 2~4 關 3s）。
3. `reaction`：揭曉雙方手勢，看清反應窗口（0.25s~1.0s），可施放變拳（快捷鍵 F 進入 2.0 秒手動選擇反制手勢窗口，選贏造成傷害、選錯輸拳進 QTE、選平手計算摸摸發動率）。
4. `qte`：玩家猜輸進入 QTE 反制階段（單軌或雙軌）。
5. `result`：回合結算（跳傷害字、燃燒/反彈/MP 回復結算）。
6. `ended`：戰鬥結束（玩家或敵方 HP 歸零），觸發結算獎勵。
7. `abandoned`：玩家撤退。

### 3.2 重要 EventBus 事件表
| 事件名稱 | 發出模組 | 接收模組 | Payload 說明 |
| :--- | :--- | :--- | :--- |
| `store:changed` | `GameStore` | `AppView` | `{ reason, snapshot }` |
| `battle:state` | `BattleSystem` | `AppView` | 單場戰鬥完整狀態快照 |
| `battle:effect` | `BattleSystem` | `AppView` | `{ type: "enemy-hit"|"player-rps-loss"|"burn"|"freeze"|"morph"|... }` |
| `battle:countdown-beat` | `BattleSystem` | `AppView` | `{ count: 3|2|1, word: "剪刀"|"石頭"|"布！" }` |
| `qte:update` | `QTESystem` / `DualQTESystem` | `AppView` | 序列、當前索引、剩餘毫秒數、進度比例 |
| `qte:slot-success` | `DualQTESystem` | `BattleSystem` | `{ slot: "left"|"right", enemyId }` |
| `qte:finished` | `QTESystem` / `DualQTESystem` | `BattleSystem` | `{ success: boolean, ... }` |
| `postbattle:state` | `PostBattleSystem` | `AppView` | 手動勝敗/泳裝/切西瓜全螢幕結算狀態 |
| `postbattle:auto-watermelon` | `PostBattleSystem` | `AppView` | 自動刷關浮動切西瓜狀態與累計次數 `{ scene, watermelon, stock, ... }` |
| `auto-battle:update` | `BattleSystem` | `AppView` | 自動刷關進度更新 `{ wins, losses, remainingRounds, won }` |
| `auto-battle:paused` / `resumed` | `BattleSystem` | `AppView` | 自動刷關暫停/繼續狀態與浮層連動 |
| `dialogue` | 各系統 | `DialogueController` | `{ speaker, text }` |
| `sound` | 各系統 | `SoundSystem` | `{ name: "punch"|"counterRub"|"skill"|... }` |
| `toast` | 各系統 | `AppView` | `{ message, tone: "success"|"danger"|"info" }` |

---

## 4. 存檔結構 (GameStore Save Schema)

LocalStorage 鍵名：`koraku-rps-save-v1`

```json
{
  "version": 1,
  "profile": {
    "level": 1,
    "xp": 0,
    "skillPoints": 0,
    "allocations": { "hp": 0, "mp": 0, "damage": 0 },
    "skills": { "momo": 0, "dualHand": 0 }
  },
  "coins": 0,
  "inventory": { "hpPotion": 1, "mpPotion": 0 },
  "equipment": {
    "head": null, "shoulders": null, "chest": null, "belt": null, "boots": null,
    "mainHand": null, "offHand": null, "ring1": null, "ring2": null,
    "earring1": null, "earring2": null, "badge": null
  },
  "inventoryEquipment": [],
  "records": {
    "wins": 0, "losses": 0, "bestStage": 0, "unlockedSwimsuit": false,
    "clearedStages": [], "totalCoinsEarned": 0, "totalXpEarned": 0,
    "totalBattles": 0, "manualWins": 0, "manualLosses": 0,
    "autoWins": 0, "autoLosses": 0, "watermelonStock": 0, "watermelonSlices": 0,
    "consumablesUsed": { "hpPotion": 0, "mpPotion": 0 },
    "morphUses": 0,
    "watermelonStageStats": { "1": {"attempts":0,"successes":0}, "2": {"attempts":0,"successes":0}, "3": {"attempts":0,"successes":0} },
    "damageDealt": { "total": 0, "byStage": { "1": 0, "2": 0, "3": 0, "4": 0 } },
    "damageTaken": { "total": 0, "byStage": { "1": 0, "2": 0, "3": 0, "4": 0 } },
    "qteStats": { "totalAttempts": 0, "totalSuccesses": 0, "byStage": { "1": {"attempts":0,"successes":0}, "2": {"attempts":0,"successes":0}, "3": {"attempts":0,"successes":0}, "4": {"attempts":0,"successes":0} } }
  },
  "recentBattles": [],
  "settings": { "muted": false, "musicMuted": false, "sfxMuted": false }
}
```

---

## 5. 常見開發與擴充指南

### 5.1 修改數值平衡
- 所有數值定義集中在 `src/js/config/gameConfig.js`（關卡 HP、裝備屬性與價格、技能消耗、升等公式、基礎攻防）。
- **嚴禁** 在 `AppView.js` 或 UI DOM 中寫死平衡數值。

### 5.2 音樂與音效架構 (Procedural Web Audio BGM & Vector Toggles)
- `SoundSystem.js` 採用純 Web Audio API 實現程序化和風音樂合成（0 外掛音檔，秒速載入）：
  - **Lobby 和風舒緩 BGM**：D 小調平調子五聲音階、古箏撥弦、尺八呼吸笛音、神道風鈴與五度 Ambient Drone（62 BPM，16 小節舒緩循環）。
  - **Battle 和風激闘 BGM**：136 BPM 雲井音階、大太鼓重擊、附太鼓緣擊、三味線疾走琶音、張力 Bass 與拍子木（8 小節戰鬥循環）。
  - **獨立開關**：頂部配置 `#music-toggle` 與 `#sound-toggle`，採用純向量 SVG 和風暗黑圖示（摒棄彩色 Emoji），狀態分別持久化於 `settings.musicMuted` 與 `settings.sfxMuted`。

### 5.3 圖鑑與立繪放大 (Gallery Normalization & Lightbox Viewer)
- **零跳動人物比例對齊**：`泳裝小樂_西瓜`（5425px）與 `泳裝小樂`（4993px）採等比高解析度縮放對齊（$86\% \times 5425/4993 = 93.44\%$），切換時人物本體位置與頭部座標完全無縫不跳動。
- **全螢幕 4K 燈箱鑑賞**：支援點擊立繪或「放大鑑賞」按鈕開啟 `#gallery-lightbox-modal`，支援 ESC 鍵與點擊遮罩關閉。

### 5.4 行動端佈局與圖層 (Mobile RWD & Layout Optimization)
- **彈性 Header (360px~430px Zero Overflow)**：左側 Brand 縮減副標，右側保留語言選單、等級、星砂與向量音樂/音效鍵（30×30px），全螢幕無裁切。
- **首頁流暢滾動與安全區**：`.home-screen` 支援流暢滑動，小樂立繪置於背景層（`z-index: 1; opacity: 0.38`），底部墊高防止 Safari 網址列遮擋。
- **結算畫面可滑動流式容器**：結算時立繪轉為背景層（`z-index: 1; opacity: 0.22`），隱藏對話框，`.result-overlay` 為標準全螢幕滾動容器，操作按鈕全寬縱向排版不遮擋。
- **商店橫向滾動分類選單**：12 個分類標籤改為純 CSS 橫向平滑滾動膠囊列。
- **玩家血條移至道具下方**：行動端 `.battle-left-cluster` 排序依序為：出拳選擇器 -> 道具快捷欄 -> 玩家 HP/MP 條（放置於最下方），不遮擋 Boss 與神諭。
- **精簡對話視窗**：行動端對話框高度縮至 46~50px，為立繪與戰鬥釋放最大視野。
- **出拳控制介面**：單手模式高度 30~32px，雙手模式 2 列整齊網格，隱藏實體鍵盤提示。
- **神諭結果面板**：`.round-oracle` 縮小尺寸與留白（寬度 84~86vw，max-width 280~310px）。
### 5.5 存檔紀錄與種子碼跨裝置轉移 (Save Records & Seed Code Management)
- **種子碼編解碼合約**：採用 UTF-8 安全 Base64 格式，帶有 `KORAKU1_` 版本前綴。
- **匯出**：呼叫 `store.exportSaveCode()`，將完整 Save Data（等級、裝備、星砂、配點、戰績）序列化輸出。
- **匯入**：呼叫 `store.importSaveCode(code)`，經過格式驗證與 `sanitizeSave` 後覆蓋當前存檔，自動存入 localStorage 並觸發 `store:changed`。
- **集中管理**：首頁原「重置存檔」按鈕移入「💾 存檔紀錄」彈窗（`#save-record-modal`）內部危險區域，整合存檔狀態概覽、種子碼匯出複製、種子碼貼上載入與刪檔重置。

### 5.6 戰鬥血條 ATK、5次傷害紀錄與修練場系統 (HUD ATK, 5-Damage Log & Training Dojo)
- **血條 ATK 數值標籤**：玩家血條顯示即時總傷害（基礎 + 配點 + 裝備），Boss 血條顯示敵方單次攻擊傷害（第 1~3 關 100、第 4 關 200、修練場 0 或自訂）。
- **局內 5 次傷害紀錄面板**：`#battle-damage-log` 採 FIFO 容量 5 筆滾動顯示，記錄目標、數值與傷害來源（克制、變拳、摸摸、灼燒、反彈、受擊等），樣式具備 `pointer-events: none` 點擊穿透與行動端防推擠防護。
- **修練場系統 (Training Dojo)**：
  - 首頁配置向量 SVG 入口按鈕，開啟 `#dojo-modal`。
  - **模式一（純 QTE 反應練習）**：第一式為單軌 8 方向連續輸入，第二式為雙軌（WASD + 方向鍵）鍵盤情境，無戰鬥環節，即時統計 Combo、最高 Combo、平均反應時間 (ms) 與成功率。
  - **模式二（全黑剪影戰鬥沙盒）**：標準戰鬥循環，對手為全黑預設小樂剪影（`filter: brightness(0)`），小樂預設 10,000 HP（可自訂）且對玩家 0 傷害（可自訂），支援第一式（單體木樁）與第二式（雙生木樁，模擬第 4 關雙手雙血條）。

### 5.7 測試與打包
每次變更後必須執行：
```bash
npm test
node scripts/build.mjs
npm run specs:excel
```
確保 101 項測試全數通過且 bundle 打包無誤。

### 5.8 版本更新日誌彈窗與手機戰鬥介面排版修復 (v0.0.6 Updates)
- **歷史更新日誌彈窗 (`#changelog-modal`)**：
  - 點擊首頁頁腳版本號按鈕（`#footer-app-version-btn`）即開啟全螢幕半透明暗黑神社風格彈窗。
  - 完整支援 4 國語言（繁中、簡中、英文、日文），列出 `v0.0.0` 至 `v0.0.6` 之歷史版本迭代內容與技術重點。
- **手機端戰鬥佈局重構**：
  - `.hud-name` 採彈性水平對齊（Flexbox），徹底修復玩家與 Boss 血量數值（如 `100100 / 100100`）垂直推擠重疊的 CSS Grid 邊界 bug。
  - 第四章雙生 Boss 狀態卡片改為雙行自適應排版，防止右側敵人卡片與 ATK 數值於手機螢幕邊緣被裁切。
  - 重新計算小樂立繪在手機端之垂直置中位置（`top: 125px`，`height: clamp(260px, 44vh, 380px)`），徹底排除小樂頭像與 Boss 血條、回合儀表及傷害日誌之重疊干擾。
- **iOS 音訊防搶佔 (Ambient AudioSession)**：
  - 將 `navigator.audioSession.type` 設定為 `"ambient"`，使遊戲音效與玩家背景播放之 YouTube、Spotify 或 Podcast 等外部音訊共存混音，不再強制暫停玩家之背景播放。

### 5.9 雙 QTE 桌面版按鍵溢出修復與 QTE 按錯按鍵判定失敗 (v0.0.9 Updates)
- **桌面版雙 QTE 邊框自適應修復**：
  - 修正第 4 關雙生破綻（與修練場雙軌模式）在電腦寬螢幕左右分屏下，7 鍵序列因方塊過大（68px）且間距過寬（10px）而超出卡片槽位右邊界的問題。
  - 為 `.dual-qte-slot`、`.qte-sequence` 與 `.qte-arrow` 定義精確桌面響應式尺寸（`clamp(34px, 3.6vw, 46px)`，間距 `clamp(4px, 0.6vw, 8px)`），並增加卡片與序列的 `box-sizing: border-box` 與防溢出保護。
- **QTE 斜向按錯判定失敗修復**：
  - 修正 `QTEKeyboardInput.prototype.keyDown`，當目標為斜向方向（如 `↗`）時，若玩家輸入不屬於該斜向構成鍵之正方向（如 `↓` 或 `←`），系統立即清除暫存並將該按鍵送交 QTE 系統判定為輸入錯誤。
  - 確保第 1~4 關與修練場依照設定之 `maxErrors` 容錯上限（第 1 關無懲罰、第 2 關 2 次失敗、第 3 關 1 次失敗、第 4 關 1 次失敗）在按錯達標時立即判定該側或全域 QTE 失敗並結算受擊傷害。

### 5.10 平板觸控方向盤修復、QTE 手勢滑動與外接實體鍵盤相容 (v0.0.10 Updates)
- **iPad Pro 與平板觸控方向盤修復**：
  - 修復 CSS 中 `@media` 置於選擇器清單內部導致 WebKit/Safari 語法解析錯誤並丟棄整個規則塊之問題。
  - 將 `html.has-touch`、`body.has-touch` 與 `@media (pointer: coarse), (any-pointer: coarse)` 分離為標準合法 CSS 規則。
  - 在 `index.html` 的 `<head>` 加入早期觸控探測腳本，確保 iPad Pro 11 吋/12.9 吋 (iPadOS 18+ Safari) 及各類平板載入時 100% 顯示觸控方向盤。
- **8 方向手指滑動手勢輸入 (Swipe Gesture)**：
  - 新增 `directionFromSwipe(dx, dy, minDistance)` 輔助方法與多點觸控追蹤系統。
  - 全 iOS / Android 移動裝置（手機與平板）在 QTE 反制時，可直接在畫面中用手指朝 8 方向滑動完成輸入，支援連續流暢滑動與雙軌左右手分區獨立多指滑動，且完整保留虛擬按鍵點擊玩法。
- **外接實體鍵盤完全相容支援**：
  - 移動/平板裝置連接 Magic Keyboard 或藍牙鍵盤時，接收所有實體按鍵事件並動態掛載 `has-physical-keyboard` 狀態，支援純鍵盤、純手勢或混合操作。

### 5.11 平板橫放寬螢幕佈局重構與重疊修復 (v0.0.11 Updates)
- **首頁標題單行大氣呈現與選單高度自適應**：
  - 為 `.home-copy h1 span` 與 `em` 設定 `white-space: nowrap;` 並實裝流體字級縮放 `clamp(34px, 4.4vw, 76px)`，徹底根除 iPad Pro 等橫向螢幕下「負」字被折行至第二行的排版問題。
  - 自適應優化 8 大選單按鈕間距與高度，在 700px~850px 視窗高度下完整呈現全部 8 個功能按鈕，無擠壓遮擋。
- **戰鬥場景元素重疊徹底修復**：
  - 徹底移除舊版 `@media (max-height: 780px)` 殘留的破壞性絕對定位（`top: 75px` / `top: 220px` / `bottom: 119px`）。
  - 將頂部 Boss 血條（`.enemy-hud`）、回合儀表板（`.round-oracle`）、小樂面部立繪、左側玩家控制欄（`.battle-left-cluster`）與底部對白框重新校準為獨立層次，視野如同電腦桌機版般開闊寬敞。

### 5.12 全頁面重新整理狀態保留與戰鬥/自動掛機連續性 (v0.0.12 Updates)
- **全頁面、子頁籤與篩選器持久化**：
  - 玩家停留之頁面（`koraku_active_screen`）、能力成長頁籤（`koraku_growth_tab`: `stats`/`skills`）、商店篩選類別（`koraku_shop_filter`: `all`/`potions`/`weapon`/`chest`/`accessory`）、圖鑑立繪差分與道場模式於操作時即時寫入 `localStorage`，重載時 100% 恢復，消除畫面突兀跳轉。
- **戰鬥與自動掛機無縫接續核心 (`BattleSystem.prototype.restore`)**：
  - 手動戰鬥或自動刷關時，即時將包含玩家 HP/MP、Boss HP、雙小樂存活狀態、當前回合、自動刷關輪次與勝負場次的快照寫入持久化快照。
  - 重新整理時由 `BattleSystem.prototype.restore` 精準還原數據並接續當前進度，切西瓜庫存累計亮燈與浮動小遊戲無縫同步。

### 5.13 戰鬥畫面 RWD 精確校準 (v0.0.13 Updates)
- **平板直向立繪基準線調高 (Standee Elevation)**：
  - 針對 iPad 直向（834x1194 / 810x1080 / 768x1024）等高直向螢幕，新增 `@media (min-width: 601px) and (max-width: 1024px) and (orientation: portrait)`，將立繪基準線調高至 `bottom: clamp(160px, 22vh, 320px)`，消除中央留白發空，小樂大氣居中傲立。
- **橫向對話框置中幾何修復 (Dialogue Box Centering)**：
  - 徹底修復短螢幕/橫向查詢中 `.avg-dialogue` 同時設定 `left: 14px; right: 14px;` 與 `transform: translateX(-50%)` 疊加導致對話框向左偏離螢幕 50% 造成左半邊裁切的 Bug，恢復左右對稱置中。
- **橫向猜拳儀表板與立繪安全避讓 (Round Oracle Facial Clearance)**：
  - 緊湊優化橫向模式下回合儀表板尺寸與頂距（`top: clamp(62px, 8.5vh, 74px); width: min(40vw, 390px); padding: 6px 14px 8px;`），並將橫向立繪定位至 `left: 54%`，確保小樂面部、五官與狐耳 100% 完整顯露，絕無圖層遮擋。

### 5.14 響應式佈局強化、寬螢幕道場擴展與跨引擎回歸門檻 (v0.0.14 Updates)
- **平板與緊湊直向戰鬥控制定位修復 (768px Containing Block Repair)**：
  - 修復 768×1024 平板等直向版型下玩家 HUD、手勢選擇器與快捷欄因包含塊變形導致向左偏移裁切的問題，確保控制按鈕等寬對齊、同屏且無多重外溢。
- **寬螢幕修練道場工作區置中與 1040px 擴展 (Dojo Workspace Centering & Expansion)**：
  - 於 ≥1280px 大螢幕下將修練道場題目與方向盤工作區由 820px 置中擴展至 1040px，按鈕尺寸同步放大提升可讀性與操作舒適度。
- **全自動三引擎 2,286 案例 RWD 回歸驗證系統 (Playwright Cross-Engine Gate)**：
  - 建立全自動 Chromium / Firefox 153.0 / WebKit 26.5 三引擎 2,286 案例回歸驗收門檻與分離證據契約（Chromium trusted native touch-pan；Firefox/WebKit touch-capable layout + real wheel 內容可達性驗證；手勢 handler 隔離驗證）。嚴格防範佈局裁切、元素遮擋與動畫非決定性抖動。







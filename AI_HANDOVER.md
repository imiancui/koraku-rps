# AI Handover & Architecture Guide — 狐樂・絆之勝負

> 文件用途：AI 代理人與開發者快速上手、架構交接與開發合約指引  
> 專案根目錄：`D:\game-dev\New-game-project-4`  
> 當前版本：`v0.0.14`  
> 最新更新日期：2026-09-02  
> 基準規範：`OPENSPEC.md` 與 `AGENTS.md`  
> 測試狀態：`npm test` 107/107 全部通過 (100% Pass)；RWD 跨引擎 2,286 案例驗收全數通過

---

## 1. 核心專案概覽 (System Overview)

本專案為純原生（Vanilla ES Modules / HTML5 / CSS3 / Web Audio API）架構的日式 ACGN 猜拳 RPG 對決遊戲。無前端框架、無外部執行期套件相依，可直接於本機或透過 GitHub Pages / 自訂網域（`https://koraku.app/`）部署運行。

### 1.1 核心命令
- **執行核心測試**：`npm test`（Node.js 原生測試執行器與 i18n 完整性校驗）
- **RWD 回歸驗證**：`npm run test:rwd:repeat`（Smoke3 + Full2 跨引擎零 retry 驗證門檻）
- **打包發布**：`npm run build` 或 `node scripts/build.mjs`（生成 `src/js/bundle.js`）
- **產生 Excel 規格表**：`npm run specs:excel`
- **線上網址**：`https://koraku.app/`
- **本地伺服器**：`npm run dev` 或 `npm start`（預設監聽 `http://127.0.0.1:4173/`）
- **Tailscale 共享**：`npm run start:tailscale`

---

## 2. 模組分層與系統地圖 (Architecture Map)

```
src/
├── js/
│   ├── config/
│   │   └── gameConfig.js       # 全域數值設定（關卡、12格裝備、技能、道具、資產路徑、八方向、圖鑑）
│   ├── core/
│   │   ├── EventBus.js         # 發布/訂閱事件中樞
│   │   ├── GameStore.js        # 存檔、星砂、裝備背包、屬性推導、歷程紀錄、DPS 與作弊
│   │   └── TimerRegistry.js    # 單場定時器生命週期管理（避免記憶體洩漏與殘留）
│   ├── services/
│   │   ├── I18n.js             # 4國語系在地化引擎（zh-Hant, zh-Hans, en, ja）
│   │   └── Persistence.js      # localStorage 讀寫容錯與持久化
│   ├── systems/
│   │   ├── BattleSystem.js     # 回合狀態機、倒數節奏、看清變拳、傷害/特效、自動刷關
│   │   ├── QTESystem.js        # 單軌 QTESystem 與雙軌 DualQTESystem
│   │   ├── QTEInputSystem.js   # WASD/方向鍵/數字鍵盤對應與雙正方向斜向合成
│   │   ├── rpsRules.js         # 猜拳勝負判定、雙手勝負判定、剋制反制手勢與敘事
│   │   ├── progressionRules.js # 等級經驗公式、屬性推導 (Base + Allocation + Gear)
│   │   ├── PostBattleSystem.js # 戰後事件、泳裝切換、三刀切西瓜、自動刷關浮層切西瓜
│   │   └── SoundSystem.js      # Web Audio API 音效合成（拳擊、撫摸、勝利、失敗）
│   ├── ui/
│   │   ├── AppView.js          # DOM 渲染、畫面導航、紙娃娃介面、浮動切西瓜、作弊面板、手勢防縮放
│   │   └── DialogueController.js # AVG 逐字打字機台詞與角色說話跳動動態
│   ├── main.js                 # 系統組裝與進入點
│   └── bundle.js               # 打包產物
└── styles/
    ├── tokens.css              # 色彩主題、字型、圓角、陰影
    ├── base.css                # 重置樣式、排版基底、touch-action 防雙擊縮放
    ├── components.css          # 按鈕、卡片、模態框、HUD
    ├── screens.css             # 各大主畫面（首頁/關卡/商店/裝備/圖鑑/戰鬥/歷程/浮動切西瓜）
    ├── animations.css          # 受擊震動、說話跳動、QTE 特效、雷擊/燃燒動畫
    └── responsive.css          # 780px/430px 行動版適配（首頁立繪置前、結算立繪頂層、流式頁腳）
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
    "wins": 0, "losses": 0, "bestStage": 0, "unlockedSwimsuit": false, "unlockedGalleryAll": false,
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
- **戰績每局獎勵統計**：最近 100 場戰鬥日誌每筆均清楚標記獲得星砂與經驗獎勵。

### 5.5 存檔紀錄與種子碼跨裝置轉移 (Save Records & Seed Code Management)
- **種子碼編解碼合約**：採用 UTF-8 安全 Base64 格式，帶有 `KORAKU1_` 版本前綴。
- **匯出**：呼叫 `store.exportSaveCode()`，將完整 Save Data（等級、裝備、星砂、配點、戰績）序列化輸出。
- **匯入**：呼叫 `store.importSaveCode(code)`，經過格式驗證與 `sanitizeSave` 後覆蓋當前存檔，自動存入 localStorage 並觸發 `store:changed`。
- **集中管理**：首頁原「重置存檔」按鈕移入「💾 存檔紀錄」彈窗（`#save-record-modal`）內部危險區域，整合存檔狀態概覽、種子碼匯出複製、種子碼貼上載入與刪檔重置。

### 5.6 測試與打包
每次變更後必須執行：
```bash
npm test
node scripts/build.mjs
npm run specs:excel
```
確保 94 項測試全數通過且 bundle 打包無誤。

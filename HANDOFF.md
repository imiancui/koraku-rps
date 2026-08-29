# Handoff — 狐樂・絆之勝負

> 給下一位開發者的可執行交接手冊  
> 專案：D:\game-dev\New-game-project-4  
> 交接日期：2026-08-29  
> 詳細產品與技術規格：OPENSPEC.md

## 1. 先看這裡

這是一個已可玩的原生瀏覽器遊戲，不需要安裝套件。核心功能、14 項單元測試、桌面與手機版 UI 都已完成。請優先閱讀以下順序：

1. OPENSPEC.md：完整功能、數值、架構與風險。
2. README.md：快速啟動與操作。
3. src/js/config/gameConfig.js：所有核心平衡與資產設定。
4. src/js/systems/BattleSystem.js：戰鬥流程。
5. src/js/ui/AppView.js：介面事件與 DOM 渲染。

## 2. 啟動與驗證

### 2.1 需求

- Node.js 18 或更高版本。
- 建議使用 Chromium、Edge、Chrome 或新版 Safari。
- 專案無 npm 第三方依賴；不需要 npm install。

### 2.2 本機啟動

在專案根目錄執行：

    npm run dev

預設網址：

    http://127.0.0.1:4173/

可覆寫連接埠：

    PORT=5000 npm run dev

PowerShell 可改用：

    $env:PORT = 5000
    npm run dev

### 2.3 分享到 Tailscale

前提：主機已登入 Tailscale，且 tailnet 已允許使用 Serve。

    npm run start:tailscale

此命令會：

1. 啟動本機 HTTP server。
2. 讀取本機 Tailscale DNS 與 IPv4。
3. 視權限嘗試新增 Windows 入站防火牆規則。
4. 嘗試設定 Tailscale HTTPS Serve。
5. 在終端輸出 MagicDNS HTTPS 與備用 HTTP 網址。

注意：這是一個會修改系統網路／防火牆狀態的開發工具；交接後使用前先確認團隊規範。

### 2.4 測試

    npm test

目前預期：14 tests pass、0 fail。

## 3. 專案地圖

| 位置 | 用途 | 修改時機 |
|---|---|---|
| index.html | 固定 DOM 骨架與畫面容器 | 新畫面、常駐 UI、ARIA |
| src/js/main.js | 建立系統並連線事件 | 新全域系統／初始化順序 |
| src/js/config/gameConfig.js | 所有平衡與資產映射 | 改數值、加關卡、加道具、換圖 |
| src/js/core/GameStore.js | 儲存進度與經濟 | 新持久化資料、獎勵、SP |
| src/js/systems/BattleSystem.js | 戰鬥狀態機 | 改回合、傷害、技能、勝敗 |
| src/js/systems/QTESystem.js | QTE 序列與時限 | 改長度、時限、成功規則 |
| src/js/systems/QTEInputSystem.js | 鍵盤方向與斜向合成 | 加手把、重綁、輸入輔助 |
| src/js/systems/PostBattleSystem.js | 勝敗後事件與西瓜 | 改獎勵／切西瓜輪數／新事件 |
| src/js/ui/AppView.js | 所有 UI 行為與畫面渲染 | 改 DOM、導航、效果、按鈕 |
| src/js/ui/DialogueController.js | AVG 對話逐字與說話跳動 | 改對話速度／跳過行為 |
| src/styles/tokens.css | 色彩、字體、尺寸變數 | 視覺主題調整 |
| src/styles/screens.css | 首頁、關卡、戰鬥、結果畫面 | 大型畫面排版 |
| src/styles/animations.css | 受擊、說話、QTE、特效 keyframes | 動畫強度／節奏 |
| src/styles/responsive.css | 780px 以下手機適配 | 行動版調整 |
| tests | Node 原生測試 | 新規則或修 bug 時先補測試 |
| scripts/serve.mjs | 靜態伺服器與 Tailscale 模式 | 部署或網路分享 |

## 4. 當前功能快照

### 戰鬥

- 5 秒倒數後亮拳。
- 亮拳後 1 秒內可消耗 25 MP 變拳。
- 玩家贏：按玩家傷害值扣小樂 HP。
- 玩家輸：五鍵、五秒 QTE；成功反制，失敗受固定 100 傷害。
- 小樂受傷圖片會晃動；玩家受傷全畫面震動與紅色閃光。
- 撤退沒有獎勵。

### 成長與經濟

- 初始：100 HP、50 MP、100 傷害、1 瓶 HP 藥、0 星砂。
- 勝利：100 星砂與各關卡勝利 EXP。
- 敗北：50 星砂與各關卡敗北 EXP。
- 每升級：5 SP。
- 每 1 SP：攻擊 +5、HP +10 或 MP +10。

### 戰後

- 勝利可要求小樂換泳裝。
- 切西瓜固定三刀。
- 每切中一刀，第三刀總結算時 +100 EXP。
- 第三刀後不可再開始切西瓜；需重戰勝才能重新進入事件。

### Debug

網址增加 ?debug=1，例如：

    http://127.0.0.1:4173/?debug=1

會出現 DEV 面板：

- 強制勝利：立即走勝利結算。
- 強制敗北：立即走敗北結算。
- Lv.10／500 星砂：將目前存檔至少提升至等級 10、45 SP、500 星砂。

一般網址不會顯示。DEV 直接改 localStorage 中的進度；測完需從首頁使用「重置存檔」，或在瀏覽器刪除 localStorage key：koraku-rps-save-v1。

## 5. 手動回歸清單

每次改動後，至少跑和改動範圍相關的項目。

### 基本流程

1. 開啟首頁，確認角色圖、四個選單、等級與星砂可見。
2. 進入選關，確認未達等級的章節不能點。
3. 開始第一關，確認上方 Boss HP、下方玩家 HP／MP 與左下快捷欄。
4. 按 1／2／3 切換手勢，確認 UI 同步。
5. 亮拳後按 F 或點「変」，確認 MP 扣 25 並變為剋制手勢。
6. 猜輸後，確認 QTE 顯示五個方向與五秒倒數。
7. 針對右上測試 ↑＋→ 或 W＋D，確認 QTE 前進；其餘三個斜向同理。
8. QTE 成功，確認小樂圖片晃動、HP 減少與反制台詞。
9. QTE 逾時，確認玩家 HP 減少、全畫面震動與紅色閃光。
10. 使用 HP／MP 藥，確認不超過上限且庫存扣除。

### 成長與商店

1. 以 ?debug=1 取得 500 星砂。
2. 在商店各買一次 HP／MP 藥，確認星砂各扣 100、數量各加 1。
3. 在成長頁分配攻擊、生命、魔力各 1 SP。
4. 開始新戰鬥，確認傷害、最大 HP、最大 MP 已更新。

### 戰後與切西瓜

1. 以 DEV 強制勝利進入結果畫面。
2. 點「請小樂穿泳裝」，確認使用泳裝圖。
3. 點「玩蒙眼切西瓜」，確認綠色區、白色指針、第 1 刀／3、切中數與按鈕可見。
4. 完成第一與第二刀，確認有「進行第 2 刀／第 3 刀」按鈕。
5. 完成第三刀，確認進入「西瓜大結算」、沒有下一刀按鈕。
6. 若至少成功一刀，確認西瓜獎勵為成功次數 × 100 EXP。

### RWD

1. 使用 390px 寬度檢查首頁、關卡頁、戰鬥 HUD、QTE 與切西瓜。
2. 確認手機 QTE 方向盤可點。
3. 確認桌面版結果畫面與時機條不被角色遮擋。

## 6. 如何安全地修改常見功能

### 6.1 改平衡

只改 src/js/config/gameConfig.js：

- STAGES：HP、等級門檻、EXP。
- ITEMS：藥水價格與恢復量。
- BASE_PLAYER：初始數值。
- STAT_GAINS：SP 成長。
- BATTLE_RULES：回合、QTE、傷害、金錢。

修改後補進 tests 的預期值，並手測第一關節奏。不要在 AppView 寫入遊戲平衡數字。

### 6.2 新增一個關卡

1. 在 STAGES 增加物件，指定唯一 id、enemyHp、requiredLevel、xpWin、xpLoss。
2. 若需要新外觀，在 ASSETS 新增路徑，並在 BattleSystem.start 決定 appearance。
3. AppView 的 renderStages 會自動讀 STAGES，但目前 kanji 陣列只有 4 個字；第 5 關起要一起補。
4. 補關卡開鎖與戰鬥獎勵測試。

### 6.3 新增道具或技能

1. 道具定義加到 ITEMS。
2. GameStore 增加初始庫存與購買／消耗邏輯。
3. BattleSystem 定義使用效果與合法時機。
4. index.html 加快捷欄 DOM；AppView 綁定、渲染庫存與禁用狀態。
5. 補單元測試與行動版位置。

技能請維持規則層做合法性判斷，UI 只顯示結果與 Toast。

### 6.4 新增戰後事件

1. 在 PostBattleSystem 增加新的 scene。
2. 使用 emit 發送完整 postbattle state。
3. 在 AppView.renderPostBattle 加入 scene 的標題、圖片、按鈕與 DOM。
4. 若給資源，透過 GameStore 方法更新，不要直接改 profile。
5. 建立 PostBattleSystem 測試涵蓋成功、失敗與重複觸發防呆。

### 6.5 擴充存檔

目前 version 固定為 1，未知版本會重置。要加欄位時：

1. 在 DEFAULT_SAVE 新增安全預設值。
2. 擴寫 sanitizeSave。
3. 若 schema 需要轉換，建立 migrateSave 函式，依舊版本逐步轉換。
4. 版本最後才升級。
5. 寫入舊存檔與壞資料測試。

## 7. 重要設計決策

| 決策 | 原因 | 後果／注意事項 |
|---|---|---|
| 不使用框架 | 專案小、零依賴、便於快速交接 | DOM 操作集中在 AppView，避免再散落 |
| EventBus 解耦 | 規則可不依賴 UI | 新事件需在文件與測試列明 payload |
| 隨機函式注入系統 | 可測試猜拳／QTE／西瓜 | 新隨機功能也應接受 random 參數 |
| 本機 localStorage | 不需後端即可保存 | 不支援跨裝置與多人 |
| CSS 做大多數動畫 | 瀏覽器效率好、資產少 | 受擊與說話 class 要記得清除 |
| 3 刀後結算西瓜 | 明確回合目標與固定獎勵 | 途中離開不給西瓜獎勵 |

## 8. 已知問題與建議優先序

### 優先處理

1. 分頁不會暫停：QTE 或倒數在背景頁仍可能結束。
2. 數值體驗校正：1,000 HP 對 100 基礎傷害約需 10 回合命中，可視 playtest 體驗進一步微調。
3. 沒有 E2E：目前僅規則單元測試，UI 回歸依賴手動測。
4. 正式發布前移除或封鎖 ?debug=1。

### 可排後

- 存檔 migration。
- 音量滑桿與鍵位設定。
- 多人模式與後端。
- 角色 AI 差異化。
- PWA／離線快取。

## 9. 協作方式建議

- 修改單一系統時，避免同時重寫 AppView；先確認事件 payload 不變。
- 先在設定與系統層完成規則，再由 UI 監聽事件。
- 每個 bug 修正最少新增一項可重現的單元測試。
- PR 或交接訊息要列出：改動檔案、數值是否改變、手測流程、npm test 結果。
- 大型 UI 改動請至少附桌面與 390px 手機截圖。

## 10. 交接完成定義

下一位開發者能完成下列項目，即代表交接成功：

- [ ] 在乾淨環境以 npm run dev 開啟遊戲。
- [ ] 讀懂 gameConfig.js 並能修改第一關 HP。
- [ ] 用 ?debug=1 跑一次勝利、泳裝、三刀西瓜結算。
- [ ] 跑 npm test 並取得全綠結果。
- [ ] 能找到 BattleSystem、PostBattleSystem 與 AppView 中各自負責的部分。
- [ ] 知道資料只保存在 localStorage，且如何重置。

## 11. 交接時的環境備註

- 開發時曾使用 Node.js 24.19.0；README 要求最低 Node.js 18。
- 目前工作區未確認有 Git CLI；交接前請由接手者確認版本控制與分支策略。
- 不要把 koraku 目錄中的角色素材刪除或改名，路徑直接被 gameConfig.js 引用。

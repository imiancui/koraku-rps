# OpenSpec — 狐樂・絆之勝負

> 文件狀態：現況規格基準  
> 版本：1.0.0  
> 最後整理：2026-08-29  
> 專案根目錄：D:\game-dev\New-game-project-4

## 1. 產品定義

### 1.1 一句話 Pitch

日式 AVG 氛圍的瀏覽器猜拳戰鬥遊戲：玩家在五秒節奏中與狐娘小樂猜拳，於敗勢透過八方向 QTE 反制，並以戰鬥獎勵成長、挑戰四階 Boss 與解鎖泳裝切西瓜事件。

### 1.2 目標平台與使用者

| 項目 | 規格 |
|---|---|
| 平台 | 現代桌面與行動瀏覽器 |
| 主要輸入 | 滑鼠、觸控、鍵盤 |
| 介面語言 | 繁體中文 |
| 技術 | 原生 HTML、CSS、ES Modules、Web Audio API、localStorage |
| 執行期依賴 | 無 |
| 本機伺服器 | Node.js 內建 HTTP 模組 |
| 存檔範圍 | 同一瀏覽器／同一 origin 的 localStorage |

### 1.3 已實作範圍

- 首頁、關卡選擇、能力成長、商店、指南與戰鬥畫面。
- 四個小樂關卡與最終 2P 色 Boss。
- 猜拳、變拳、QTE、血量／MP、道具、經驗、技能點、商店、存檔。
- 受擊動畫、全畫面震動、AVG 對話打字與說話跳動、合成音效。
- 戰勝後泳裝事件，以及固定三刀的蒙眼切西瓜小遊戲。
- 本機開發伺服器與可選的 Tailscale 內網分享模式。

### 1.4 明確不在目前範圍

- 真正的多人房間、網路同步、伺服器權威判定或排行榜。
- 帳號、雲端存檔、付款、分析追蹤。
- PWA、Service Worker、離線快取。
- 真實語音、外部音樂資產、動畫骨架或 Live2D。
- 關卡 AI 行為差異、難度選項、敵方技能與戰鬥暫停功能。

## 2. 玩家體驗與核心循環

### 2.1 30 秒循環

    選擇手勢
      → 五秒倒數
      → 雙方亮拳
      → 一秒變拳判斷
      → 勝利造成傷害，或猜輸進入 QTE
      → 反制／受擊
      → 下一回合

戰鬥結束後：

    勝敗結算
      → 金幣與經驗
      → 升級／分配 SP
      → 購買補給或進入下一章

### 2.2 戰鬥狀態機

    idle
      → countdown
      → reaction
      ├→ result
      └→ qte
           → result
      → countdown
      → ended

| 狀態 | 進入條件 | 玩家可做操作 | 離開條件 |
|---|---|---|---|
| idle | 尚未開始 | 選關 | 呼叫 start |
| countdown | 回合建立 | 選擇石／布／剪刀 | 5 秒結束 |
| reaction | 雙方亮拳 | 1 秒內使用變拳 | 計時結束或變拳後 320ms |
| qte | 玩家猜輸 | 輸入五個方向 | 成功或 5 秒逾時 |
| result | 回合已結算 | 無 | 1.55 秒後下一回合；HP 歸零則結束 |
| ended | 任一方 HP 歸零 | 戰後事件／重戰／回選關 | 新戰鬥或離開 |
| abandoned | 玩家撤退 | 導航 | 無獎勵 |

### 2.3 猜拳與傷害

| 玩家手勢 | 擊敗 | 輸給 |
|---|---|---|
| 石頭 | 剪刀 | 布 |
| 布 | 石頭 | 剪刀 |
| 剪刀 | 布 | 石頭 |

- 玩家正常勝利：對小樂造成玩家傷害值。
- 玩家正常失敗：不立即受傷，先進入 QTE。
- QTE 成功：對小樂造成玩家傷害值，並依原手勢顯示專屬反制敘事。
- QTE 失敗或逾時：玩家受到固定 100 點傷害。
- 平手：不造成傷害。
- 小樂受傷：角色圖片左右上下晃動並顯示傷害數字。
- 玩家受傷：整個應用程式視窗震動並有紅色受擊閃光。

### 2.4 變拳技能

| 項目 | 規格 |
|---|---|
| 可用時機 | 雙方亮拳後的一秒反應窗口 |
| 消耗 | 25 MP |
| 結果 | 自動切換為能擊敗小樂當前手勢的手 |
| 觸發方式 | 點擊快捷欄「変」或按 F |
| 防呆 | 不在反應窗口或 MP 不足時顯示 Toast |

### 2.5 QTE 規格

| 項目 | 規格 |
|---|---|
| 觸發 | 玩家猜輸 |
| 序列 | 從八方向隨機選出 5 個方向 |
| 時限 | 5 秒 |
| 成功 | 依序正確輸入全部 5 個方向 |
| 錯誤 | 不推進序列，顯示錯誤震動；玩家可在時限內重試 |
| 逾時 | 反制失敗，玩家受 100 傷害 |

支援輸入：

| 方向 | 單鍵快捷鍵 | 合成按法 |
|---|---|---|
| 上 | W、↑、數字鍵盤 8 | — |
| 下 | S、↓、數字鍵盤 2 | — |
| 左 | A、←、數字鍵盤 4 | — |
| 右 | D、→、數字鍵盤 6 | — |
| 左上 | Q、數字鍵盤 7 | W＋A 或 ↑＋← |
| 右上 | E、數字鍵盤 9 | W＋D 或 ↑＋→ |
| 左下 | Z、數字鍵盤 1 | S＋A 或 ↓＋← |
| 右下 | C、數字鍵盤 3 | S＋D 或 ↓＋→ |

QTE 視覺會顯示下一個方向；遇到斜向時額外顯示兩鍵合成提示。

### 2.6 專屬 QTE 反制敘事

| 玩家原手勢 | 失敗對象 | QTE 成功結果 |
|---|---|---|
| 布 | 小樂剪刀 | 用手包裹住小樂的剪刀手——反制成功！ |
| 剪刀 | 小樂石頭 | 改成布；用布握住了小樂的小拳頭——反制成功！ |
| 石頭 | 小樂布 | 改成布；用五指交扣了小樂的軟綿綿小手手，離奇獲勝！ |

## 3. 關卡、數值與經濟

### 3.1 關卡表

| ID | 章節 | 名稱 | 小樂 HP | 開放等級 | 勝利 EXP | 敗北 EXP | 視覺 |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | 壹ノ章 | 初逢・朱鳥居 | 1,000 | 1 | 150 | 50 | 預設小樂 |
| 2 | 貳ノ章 | 夕映・狐火 | 2,000 | 3 | 320 | 110 | 預設小樂 |
| 3 | 參ノ章 | 月下・九尾試 | 5,000 | 6 | 760 | 240 | 預設小樂 |
| 4 | 終ノ章 | 鏡界・白金小樂 | 10,000 | 10 | 1,800 | 520 | 2P 色小樂 |

### 3.2 基礎戰鬥數值

| 項目 | 初始值 | 備註 |
|---|---:|---|
| 最大 HP | 100 | 每點生命 +10 |
| 最大 MP | 50 | 每點魔力 +10 |
| 玩家傷害 | 100 | 每點攻擊 +5 |
| 小樂傷害 | 100 | 固定值 |
| 回合倒數 | 5 秒 | 每次亮拳前 |
| 變拳窗口 | 1 秒 | 亮拳後 |
| 變拳 MP | 25 | 無冷卻 |
| QTE | 5 秒／5 鍵 | 八方向 |

### 3.3 經驗與成長

- 升等需求公式：100 + max(0, 等級 - 1) × 75。
- 每次升等：+5 技能點。
- 技能點永久保存，下一場戰鬥開始時套用。
- 攻擊、HP、MP 都由 profile.allocations 推導，不直接寫入存檔。

| 配點 | 每 1 SP 效果 |
|---|---|
| 攻擊 | 玩家傷害 +5 |
| 生命 | 最大 HP +10 |
| 魔力 | 最大 MP +10 |

### 3.4 商店與獎勵

| 類型 | 項目 | 效果／數量 | 成本／獎勵 |
|---|---|---|---:|
| 初始道具 | 緋露藥 | 1 瓶，恢復 25 HP | 免費 |
| 商店 | 緋露藥 | 恢復 25 HP | 100 星砂 |
| 商店 | 蒼月露 | 恢復 25 MP | 100 星砂 |
| 戰勝 | 星砂 | 每場 | +100 |
| 戰敗 | 星砂 | 每場 | +50 |

### 3.5 泳裝與切西瓜事件

1. 戰勝任一關的小樂。
2. 在勝利畫面點擊「請小樂穿泳裝」。
3. 點擊「玩蒙眼切西瓜」進入第一刀。
4. 每一刀讓白色指針落在綠色判定區，按「就是現在！」或空白鍵。
5. 固定共 3 刀，無論成功或失敗都必須完成三刀才結算。
6. 每成功一刀，在第三刀結算時給予 +100 EXP。
7. 第三刀後顯示成功次數、額外 EXP 與本次額外升級數。

## 4. 畫面與互動規格

### 4.1 畫面清單

| 畫面 ID | 目的 | 關鍵元件 |
|---|---|---|
| home | 主選單與玩家摘要 | 小樂預設圖、四個導航按鈕、戰績、存檔重置 |
| stages | 關卡選擇 | 四張關卡卡、鎖定狀態、HP、等級門檻 |
| shop | 購買補給 | 星砂餘額、HP／MP 藥水商品 |
| growth | 分配 SP | 攻擊、生命、魔力卡與經驗條 |
| guide | 操作教學 | 猜拳、變拳、QTE、經濟說明 |
| battle | 主戰鬥 | Boss HP、玩家 HP／MP、手勢、快捷欄、對話框 |
| qte-overlay | 反制覆蓋層 | 五方向序列、時間條、合成提示、手機方向盤 |
| result-overlay | 戰後事件 | 勝敗獎勵、泳裝、切西瓜與再戰導航 |

### 4.2 視覺方向

- 經典日式 AVG：深色墨藍／緋紅／金色、紙張顆粒、對話框、名牌。
- 類魂系快捷欄：左下菱形格配置 HP 藥、變拳、MP 藥。
- 小樂說話時角色圖輕微上下跳動。
- 結果層採左側文字／右側角色圖構圖。
- 行動版在 780px 以下收斂為單欄，保留戰鬥核心與 QTE 觸控方向盤。

### 4.3 角色素材對照

| 檔案 | 使用位置 |
|---|---|
| koraku/小樂-預設.png | 首頁、一般關卡、一般勝利 |
| koraku/小樂-2P色.png | 最終 Boss |
| koraku/泳裝小樂.png | 戰後泳裝與切西瓜待機 |
| koraku/泳裝小樂_西瓜.png | 切西瓜成功 |
| koraku/凝視小樂.png | 敗北畫面 |

## 5. 技術架構

### 5.1 架構原則

- 原生 ES Modules，沒有框架與第三方執行期依賴。
- EventBus 解耦規則系統與 DOM UI。
- 遊戲狀態由 GameStore 持久化；單場戰鬥狀態只存在 BattleSystem。
- 純規則與輸入邏輯盡可能與畫面分離，利於單元測試與日後多人同步。

### 5.2 模組分層

    main.js
      ├─ EventBus
      ├─ GameStore ← Persistence ← localStorage
      ├─ BattleSystem ← QTESystem
      ├─ PostBattleSystem
      ├─ SoundSystem
      ├─ DialogueController
      └─ AppView

| 區域 | 主要檔案 | 職責 |
|---|---|---|
| 設定 | src/js/config/gameConfig.js | 素材路徑、手勢、方向、關卡、道具、基礎數值與 storage key |
| 核心 | src/js/core/EventBus.js | 發布／訂閱事件 |
| 核心 | src/js/core/GameStore.js | 存檔、金錢、道具、SP、戰果與 bonus EXP |
| 核心 | src/js/core/TimerRegistry.js | 管理並清除單場 timeout／interval |
| 服務 | src/js/services/Persistence.js | localStorage 讀寫與容錯 |
| 戰鬥 | src/js/systems/BattleSystem.js | 回合狀態機、傷害、變拳、戰鬥結算 |
| QTE | src/js/systems/QTESystem.js | 隨機序列、時間、成功與失敗 |
| QTE 輸入 | src/js/systems/QTEInputSystem.js | 單鍵與兩鍵斜向合成 |
| 規則 | src/js/systems/rpsRules.js | 猜拳判定、反制手勢與專屬敘事 |
| 成長 | src/js/systems/progressionRules.js | EXP、升級、面板數值推導 |
| 戰後 | src/js/systems/PostBattleSystem.js | 勝敗事件、泳裝、三刀切西瓜、額外 EXP |
| 音效 | src/js/systems/SoundSystem.js | Web Audio 合成音效與靜音 |
| UI | src/js/ui/AppView.js | 所有 DOM 渲染、輸入派送、特效 class、畫面導航 |
| UI | src/js/ui/DialogueController.js | AVG 逐字對話與角色說話動態 |
| 樣式 | src/styles | Token、基底、元件、畫面、動畫、RWD 分檔 |

### 5.3 主要事件契約

| 事件 | 發出者 | 接收者 | Payload 概要 |
|---|---|---|---|
| store:changed | GameStore | AppView | reason、完整存檔 snapshot |
| battle:state | BattleSystem | AppView | 單場戰鬥 snapshot |
| battle:effect | BattleSystem | AppView | enemy-hit、player-hit、morph、item |
| qte:update | QTESystem | AppView | 序列、索引、剩餘時間、進度 |
| qte:wrong | QTESystem | AppView | expected、received |
| qte:finished | QTESystem | BattleSystem | success、sequence、index |
| battle:ended | BattleSystem | main.js | won、stage、reward、battle |
| postbattle:state | PostBattleSystem | AppView | 勝敗／泳裝／切西瓜狀態 |
| dialogue | 各系統 | DialogueController | speaker、text |
| sound | 各系統 | SoundSystem | 音效名稱 |
| toast | BattleSystem／UI | AppView | message、tone |

### 5.4 存檔資料結構

localStorage key：koraku-rps-save-v1

    {
      "version": 1,
      "profile": {
        "level": 1,
        "xp": 0,
        "skillPoints": 0,
        "allocations": { "hp": 0, "mp": 0, "damage": 0 }
      },
      "coins": 0,
      "inventory": { "hpPotion": 1, "mpPotion": 0 },
      "records": { "wins": 0, "losses": 0, "bestStage": 0 },
      "settings": { "muted": false }
    }

存檔版本不是 1 時，GameStore 會回到新存檔。現階段沒有 migration 機制；未來改 schema 時必須新增 migration，避免直接清檔。

## 6. 介面與控制契約

| 操作 | UI | 鍵盤 | 實作入口 |
|---|---|---|---|
| 選手勢 | 石頭／布／剪刀按鈕 | 1／2／3 | AppView → BattleSystem.selectHand |
| 變拳 | 快捷欄「変」 | F | AppView → BattleSystem.useMorph |
| HP 藥 | 快捷欄 | 點擊 | AppView → BattleSystem.useItem |
| MP 藥 | 快捷欄 | 點擊 | AppView → BattleSystem.useItem |
| QTE | 覆蓋層方向盤 | 方向鍵、WASD、QEZC、數字鍵盤 | AppView → QTEKeyboardInput → BattleSystem.inputQte |
| 切西瓜 | 「就是現在！」 | Space | AppView → PostBattleSystem.strike |
| 對話快速顯示 | 對話框 | 點擊 | DialogueController.reveal |

## 7. 驗收標準

### 7.1 功能驗收

- [ ] 可從首頁進入關卡、商店、成長與指南。
- [ ] 關卡依玩家等級鎖定或開放。
- [ ] 每回合在五秒後亮拳，三種手勢皆可選。
- [ ] 亮拳後一秒內變拳會扣除 25 MP 並轉為剋制手勢。
- [ ] 猜輸時出現五鍵、五秒的八方向 QTE。
- [ ] QTE 支援單鍵斜向快捷與雙正方向合成。
- [ ] QTE 成功／失敗分別造成小樂／玩家傷害。
- [ ] 小樂受擊角色圖晃動；玩家受擊全畫面晃動。
- [ ] HP／MP 藥水會扣庫存、回復最多 25 點且不可超過上限。
- [ ] 戰勝給 100 星砂，戰敗給 50 星砂，並給對應 EXP。
- [ ] 升級得到 5 SP；三種能力會正確影響下一戰屬性。
- [ ] 勝利可進入泳裝並進行三刀切西瓜。
- [ ] 切西瓜顯示綠色判定區、同步白色指針、刀數與切中數。
- [ ] 三刀後停止切西瓜；每次切中額外 +100 EXP 並顯示結算。
- [ ] 戰敗使用凝視小樂圖片與指定台詞。
- [ ] 最終關卡使用 2P 色小樂。

### 7.2 非功能驗收

- [ ] 在 390px 寬度行動版可完成選關、戰鬥、QTE 與切西瓜。
- [ ] 在一般桌面視窗不發生重要 HUD 遮擋。
- [ ] 無 JavaScript console error。
- [ ] npm test 全數通過。
- [ ] 普通網址不顯示 DEV 面板；只有 ?debug=1 顯示。

## 8. 品質、效能與安全基準

### 8.1 現況

- 單頁、小型 DOM，沒有大型遊戲引擎或網路依賴。
- 角色圖為高解析 PNG，首次載入可能是主要體積成本。
- 音效使用 Web Audio API，需先有玩家互動才能由瀏覽器允許播放。
- 靜態伺服器以路徑正規化阻擋 root 外存取。
- localStorage、AudioContext 讀寫皆有 try/catch，失敗不應阻斷遊戲。

### 8.2 維護準則

- 新增頻繁特效時優先使用 CSS transform／opacity，不要以 layout 屬性做每幀動畫。
- 新增計時行為必須納入 TimerRegistry，避免撤退／重戰後殘留 timer。
- 設計資料放 gameConfig.js；不要把平衡數字散落在 UI。
- 新輸入應先在系統層抽象為動作，UI 只負責派送。
- 新存檔欄位需維護 version 與 migration。

## 9. 已知限制與設計風險

| 優先度 | 項目 | 影響 | 建議 |
|---|---|---|---|
| 中 | 初章 1,000 HP 相對基礎 100 傷害約需 10 回合命中 | 需注意玩家戰鬥流暢度 | Playtest 後持續評估各章 HP 與連勝倍率 |
| 高 | 無頁面隱藏暫停 | 切換分頁後倒數與 QTE 仍可能流逝 | 監聽 visibilitychange 並實作 pause/resume |
| 中 | 無 schema migration | 改存檔版本會重置資料 | 新增 migration pipeline |
| 中 | 無自動化 E2E／視覺回歸 | UI 改動可能破壞流程 | 加入 Playwright 流程測試與手機截圖測試 |
| 中 | 切西瓜只在三刀結算 EXP | 中途離開不獲得已成功刀數獎勵 | 如需改善，可改為每刀立即給予或持久化事件狀態 |
| 低 | DEV 面板可由網址開啟 | 正常玩家可自行作弊 | 正式發布移除或以 build flag 控制 |
| 低 | Tailscale 啟動會嘗試寫 Windows 防火牆規則與 Serve | 開發環境有外部系統副作用 | 部署前先確認 tailnet 與權限 |

## 10. 後續發展建議

### P0：先做

1. 實作分頁自動暫停與恢復。
2. 將切西瓜、戰鬥與成長加入端到端測試。
3. 以真實遊玩資料校正 1,000／2,000／5,000／10,000 HP 的節奏。
4. 對 localStorage 加入 migration。

### P1：提升留存與內容

1. 小樂各章專屬 AI 權重、台詞與攻擊動畫。
2. 額外技能、道具稀有度、連勝／連擊獎勵。
3. 關卡通關紀錄、成就、圖鑑與結局收藏。
4. 音量控制、鍵位重綁、減少動態效果選項。

### P2：多人協作與網路化

1. 將 BattleSystem 的玩家選擇抽為 command：選手勢、使用變拳、使用道具、輸入 QTE。
2. 由伺服器產生隨機種子、回合 deadline 與權威結果。
3. Client 只送 command，依事件重播 UI。
4. 加入房間、斷線重連、同步快照與反作弊時限驗證。

## 11. 變更紀錄

| 日期 | 變更 |
|---|---|
| 2026-08-23 | 建立原生模組化網頁遊戲、四關卡、商店、成長、QTE、泳裝事件與測試。 |
| 2026-08-23 | QTE 加入 WASD／方向鍵雙正方向合成斜向輸入。 |
| 2026-08-24 | 強化受擊動畫；切西瓜改為同步時機條、固定三刀，成功每刀第三刀結算 +100 EXP。 |
| 2026-08-29 | 產出 OpenSpec 與交接文件。 |

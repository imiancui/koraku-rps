# OpenSpec — 狐樂・絆之勝負 (Master Specification)

> 文件狀態：現況規格基準 (Live Specification Baseline)  
> 版本：2.0.0  
> 最後整理：2026-09-02  
> 專案根目錄：`D:\game-dev\New-game-project-4`

---

## 1. 產品定義與概述

### 1.1 一句話 Pitch
融合日式 AVG 視覺小說氛圍與深度 RPG 成長機制的瀏覽器猜拳對決遊戲：玩家在快節奏出拳倒數中與狐娘小樂博弈，於敗勢透過八方向 QTE 絕地反制，解鎖摸摸平手偷襲與雙手解放雙拳對決，藉由 12 格位武具紙娃娃裝備、星砂經濟、自動刷關與蒙眼切西瓜小遊戲不斷成長，挑戰四階 Boss 與雙生白金小樂！

### 1.2 目標平台與技術架構
- **平台**：現代桌面與行動瀏覽器（支援滑鼠、觸控、鍵盤與鍵位合成）。
- **支援語言**：繁體中文 (`zh-Hant`)、簡體中文 (`zh-Hans`)、英文 (`en`)、日文 (`ja`)。
- **技術棧**：原生 ES Modules、HTML5、CSS3、Web Audio API 合成音效、localStorage。
- **執行期相依**：零外部相依套件，純原生模組化架構。
- **線上發布**：GitHub Pages / Custom Domain (`https://koraku.app/`)。

---

## 2. 核心戰鬥循環與狀態機

### 2.1 戰鬥狀態機 (Battle State Machine)
```
  [idle] ──(start / startAutoBattle)──► [countdown]
                                           │ (倒數歸零)
                                           ▼
                                       [reaction] ◄──(施放變拳/延長2秒)
                                       │        │
                     (猜拳勝利 / 平手) │        │ (猜拳失敗)
                                       ▼        ▼
                                   [result] ◄──[qte] (完成/失敗)
                                       │
                      ┌────────────────┴────────────────┐
               (任一方 HP 歸零)                  (雙方皆存活)
                      │                                 │
                      ▼                                 ▼
                   [ended]                         [countdown]
                      │ (自動刷關重開)                  (下一回合)
                      └─────────────────────────────────┘
```

| 狀態 | 進入條件 | 玩家可進行之操作 | 離開條件 |
| :--- | :--- | :--- | :--- |
| **`idle`** | 遊戲初始或重置。 | 選擇章節關卡、分配 SP、學習技能、購買或穿脫裝備。 | 呼叫 `start(stageId)` 進入 `countdown`。 |
| **`countdown`** | 回合開始。 | 選擇單手（或雙手）手勢；使用 HP/MP 藥水；切換暫停。 | 倒數計時結束（第 1 關 5s，第 2~4 關 3s），揭曉手勢進入 `reaction`。 |
| **`reaction`** | 雙方亮拳。 | 1 秒看清窗口內使用「變拳」（快捷鍵 `F`）；使用藥水。 | 計時逾時（0.25s~1.0s 或變拳後 2.0s）結算勝負：勝/平進 `result`，負進 `qte`。 |
| **`qte`** | 玩家猜拳失敗。 | 在時限內依序輸入八方向按鍵（單鍵或雙鍵合成斜向）。 | 全部完成（反制成功）或超時/錯誤超標（受擊），進入 `result`。 |
| **`result`** | 回合結算完成。 | 觀看傷害跳字、受擊晃動動畫與台詞。 | 1.55 秒後進入下一回合；若任一方 HP <= 0 則 1.3 秒後進入 `ended`。 |
| **`ended`** | 任一方 HP 歸零。 | 領取獎勵、進入泳裝切西瓜事件、查看戰鬥 DPS 與歷程。 | 若啟動自動刷關且有剩餘場次，800ms 後重開；否則回選單。 |
| **`abandoned`** | 玩家點擊撤退。 | 停止戰鬥時鐘與 QTE，返回選單。 | 無結算獎勵。 |

---

## 3. 關卡與 Boss 梯度機制

| 關卡 ID | 章節 | 關卡名稱 | Boss HP | 解鎖等級 | 倒數秒數 | 變拳窗口 | QTE 方向 | QTE 長度 | 容錯次數 | 摸摸閃避率 | 敵傷倍率 | 勝利獎勵 |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | 壹ノ章 | 初逢・朱鳥居 | 1,000 | Lv. 1 | 5 秒 | 1.00 秒 | 4 正方向 | 5 鍵 | **無懲罰** | **0%** | 1x (100) | 150 EXP / 100 🪙 |
| **2** | 貳ノ章 | 夕映・狐火 | 2,000 | Lv. 3 | 3 秒 | 0.75 秒 | 8 方向 | 5 鍵 | **2 次** | **11%** | 1x (100) | 188 EXP / 125 🪙 |
| **3** | 參ノ章 | 月下・九尾試 | 5,000 | Lv. 6 | 3 秒 | 0.50 秒 | 8 方向 | 7 鍵 | **1 次** | **33%** | 1x (100) | 300 EXP / 200 🪙 |
| **4** | 終ノ章 | 鏡界・白金小樂 | 10,000 (雙生雙血條) | Lv. 10 | 3 秒 | 0.25 秒 | 隨機混向 | 7 鍵 | **1 次** | **66%** | **2x (200)** | 1,200 EXP / 800 🪙 |

---

## 4. 猜拳、變拳、技能與 QTE 規則

### 4.1 猜拳判定與 3-2-1 節奏倒數
- **手勢剋制**：石頭 ✊ 剋 剪刀 ✌；剪刀 ✌ 剋 布 ✋；布 ✋ 剋 石頭 ✊。
- **3-2-1 節奏音畫同步**：
  - 倒數 3 秒：台詞「剪刀」、發送 `battle:countdown-beat` (count: 3)。
  - 倒數 2 秒：台詞「石頭」、發送 `battle:countdown-beat` (count: 2)。
  - 倒數 1 秒：台詞「布！」、發送 `battle:countdown-beat` (count: 1)。

### 4.2 時機變拳與手動反制機制 (Manual Morph Counter Selection)
- **規格目的 (Purpose)**：賦予玩家在看清小樂手勢後的反應窗口內，透過消耗 MP 與即時手動決策反制小樂的戰術深度。
- **規格需求 (Requirements)**：
  1. 玩家在反應窗口內按下 <kbd>F</kbd> 或點擊技能消耗 MP（基礎 25 MP，受裝備折抵，最低 5 MP）進入 `morphActive` 狀態。
  2. 系統重設反應倒數為 2.0 秒，解除手勢按鈕 disabled 狀態並亮起青色脈衝光效，啟用 <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> 及雙手鍵盤快捷鍵。
  3. **手動選贏**：克制小樂手勢時立即獲勝造成傷害，並記錄變拳成功次數。
  4. **按錯輸拳**：被小樂克制時立即判定輸拳並進入 QTE 反制。
  5. **按出平手**：與小樂同手勢時立即判定為平手並計算摸摸技能發動率（每級 10%）。
  6. **2 秒超時未選**：超時自動以原持有手勢結算。
- **驗收情境 (Scenarios)**：
  - **Scenario: 變拳後手動克制獲勝**
    - **GIVEN** 玩家出「石頭」，小樂出「布」，畫面處於 `reaction` 階段且 MP >= 25
    - **WHEN** 玩家按 F 變拳並在 2 秒內手動按下「剪刀」
    - **THEN** 扣除 MP，手勢轉為剪刀，立即判定勝利並對小樂造成傷害，累計變拳成功次數
  - **Scenario: 變拳後手動按錯輸拳**
    - **GIVEN** 玩家發動變拳進入 2 秒窗口，小樂出「布」
    - **WHEN** 玩家誤按「石頭」
    - **THEN** 立即判定輸拳，畫面觸發震動與拳擊音效，進入 QTE 反制階段
  - **Scenario: 變拳後手動按出平手觸發摸摸**
    - **GIVEN** 玩家擁有摸摸技能 Lv.10（100% 機率），小樂出「布」
    - **WHEN** 玩家發動變拳後在 2 秒內按下「布」
    - **THEN** 判定平手，觸發摸摸技能對小樂造成 25 點偷襲傷害
  - **Scenario: 變拳後 2 秒超時自動以原手勢結算**
    - **GIVEN** 玩家出「石頭」，小樂出「布」，發動變拳進入 2 秒窗口
    - **WHEN** 2 秒倒數歸零且玩家未輸入任何手勢
    - **THEN** 自動以原「石頭」手勢結算輸拳並進入 QTE 階段

### 4.3 摸摸偷襲技能 (Momo Assist)
- **解鎖門檻**：Lv.2 解鎖，最高 10 級，每級消耗 1 SP。
- **觸發時機**：僅在猜拳「平手」時觸發。
- **發動率**：`等級 × 10%`（Lv.10 為 100%）。
- **傷害**：基礎 25 點（裝備 `dagger_shadow` 影月短匕每把 +15 點）。
- **小樂閃避**：隨關卡遞增（第 1 關 0%、第 2 關 11%、第 3 關 33%、第 4 關 66%）。

### 4.4 雙手解放技能 (Dual Hand RPS)
- **解鎖門檻**：Lv.4 解鎖，消耗 100 SP。
- **對抗單體 Boss**：
  - 雙勝：造成雙倍玩家攻擊傷害（`playerDamage * 2`）。
  - 單勝：造成單倍常規傷害。
  - 一負一平：安全脫離，視為平手，不進入 QTE。
  - 雙負：觸發單軌 QTE。
- **對抗第 4 關雙生 Boss**：左手對抗左小樂、右手對抗右小樂，雙敗觸發雙軌 QTE。

### 4.5 單軌與雙軌 QTE 反制
- **鍵位對應**：
  - 上：`W`、`↑`、數字鍵 `8`
  - 下：`S`、`↓`、數字鍵 `2`
  - 左：`A`、`←`、數字鍵 `4`
  - 右：`D`、`→`、數字鍵 `6`
  - 左上：`Q`、數字鍵 `7`、`W+A` / `↑+←` 合成
  - 右上：`E`、數字鍵 `9`、`W+D` / `↑+→` 合成
  - 左下：`Z`、數字鍵 `1`、`S+A` / `↓+←` 合成
  - 右下：`C`、數字鍵 `3`、`S+D` / `↓+→` 合成
- **反制成功專屬敘事**：
  - 原出布：用手包裹住小樂的剪刀手——反制成功！
  - 原出剪刀：用布握住了小樂的小拳頭——反制成功！
  - 原出石頭：用五指交扣了小樂的軟綿綿小手手，離奇獲勝！
- **雙軌 QTE（Dual QTE）**：左軌專用 WASD 輸入，右軌專用 方向鍵 輸入，獨立結算各側傷害。

---

## 5. 成長體系與 12 格位武具系統

### 5.1 等級與經驗值公式
```
xpNeededForLevel(level) = 100 + Math.max(0, level - 1) * 75
```
- 每升一級獲得 +5 SP（技能點），溢出 EXP 自動繼承。
- 屬性加成：HP 配點每點 +10 Max HP；MP 配點每點 +10 Max MP；Damage 配點每點 +5 攻擊力。

### 5.2 12 格位裝備武具一覽表

| 道具 ID | 名稱 | 部位 | 雙手 | 稀有度 | 價格 | HP | MP | ATK | 戰鬥專屬特效 |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `chest_samurai` | 玄武・金剛胸甲 | `chest` | 否 | Epic | 320 | +150 | 0 | 0 | 受擊傷害減免 25 點（可與盾牌疊加） |
| `chest_ninja` | 靈狐・幻影羽織 | `chest` | 否 | Epic | 350 | +80 | +40 | +15 | 受擊時 25% 機率殘影閃避，完全免疫傷害 |
| `chest_miko` | 淨世・白狐千早 | `chest` | 否 | Rare | 260 | +100 | +60 | +10 | 回合結算回復 15 點 MP |
| `chest_mirror` | 八咫・鏡光護胸 | `chest` | 否 | Leg. | 550 | +120 | +50 | +20 | 受擊時鏡光反彈 40 點傷害給小樂 |
| `sword_flame` | 業火・炎之太刀 | `weapon` | 否 | Epic | 350 | +50 | 0 | +25 | 回合結束造成 30 點燃燒傷害（雙持疊加至 60） |
| `sword_frost` | 霜月・冰結靈刃 | `weapon` | 否 | Rare | 300 | 0 | +30 | +20 | 命中時 30% 機率凍結小樂手勢，下回合隨機封印一手 |
| `sword_thunder`| 雷霆・神鳴迅劍 | `weapon` | 否 | Rare | 250 | 0 | 0 | +30 | QTE 反制成功追加 50 點雷擊傷害 |
| `sword_great_nine`| 破滅・九尾雙手巨劍| `weapon` | **是** | Leg. | 800 | +100 | -20 | +70 | 佔用雙手格位；常規出拳獲勝傷害提高為 1.5 倍 |
| `shield_suzaku`| 結界・朱雀盾 | `offHand`| 否 | Epic | 320 | +150 | +50 | 0 | 受擊傷害減免 30 點（雙盾疊加至 60 點） |
| `dagger_shadow`| 影月・短匕 | `weapon` | 否 | Rare | 220 | 0 | 0 | +25 | 平手摸摸傷害額外 +15 點（雙持疊加至 +30） |
| `helm_fox` | 妖狐面具 | `head` | 否 | Rare | 200 | +80 | +30 | +10 | 全面均衡防具 |
| `shoulders_crimson`| 緋紅之肩鎧 | `shoulders`| 否 | Rare | 200 | +100 | 0 | +15 | 強化生命與攻擊 |
| `belt_shimenawa`| 注連繩神靈腰帶 | `belt` | 否 | Epic | 280 | +60 | +40 | 0 | 藥水回復效果額外提升 10 點（由 25 升至 35） |
| `boots_gale` | 疾風之草履 | `boots` | 否 | Epic | 300 | +50 | 0 | 0 | QTE 反制時間延長 1.0 秒 |
| `earring_magatama`| 八尺瓊・勾玉耳環 | `earring`| 否 | Rare | 180 | 0 | +25 | +8 | 變拳 MP 消耗降低 5 點（雙持疊加降低 10 點） |
| `ring_ruby` | 狐火紅玉戒指 | `ring` | 否 | Rare | 160 | +50 | 0 | +12 | 提升生命與攻擊 |
| `ring_sapphire`| 月華藍玉戒指 | `ring` | 否 | Rare | 160 | 0 | +50 | +12 | 提升魔力與攻擊 |
| `badge_bond` | 絆之守護胸章 | `badge` | 否 | Leg. | 500 | +100 | +50 | +20 | 戰勝時獲得星砂額外提升 +20% |

---

## 6. 切西瓜小遊戲、圖鑑、DPS 分析與除錯作弊

### 6.1 蒙眼切西瓜小遊戲與自動刷關浮動分離
1. **手動結算**：戰勝任一關卡後點擊「請小樂穿泳裝」進入全螢幕切西瓜。
2. **自動刷關浮層（非遮罩分離）**：
   - 自動刷關每贏一場，自動累計切西瓜次數 +1（上限 999 次）。
   - 前景以獨立浮動面板呈現泳裝小樂立繪與切西瓜控制項，不套用黑灰全屏遮罩，不干擾背景正在進行的自動猜拳與背景小樂立繪。
   - 頂部 `#auto-battle-hud-banner` 始終置頂可點擊（暫停/繼續）。
   - 玩家點擊「暫停刷關」時關閉浮層回歸手動猜拳；點擊「繼續刷關」重啟浮層並恢復累計次數。
3. **三階段切西瓜規則**：
   - 固定進行 3 刀，白色指針在時機條中以三角波往復擺動。
   - 難度逐刀提升：綠色安全範圍每刀縮小 50%（0.13 -> 0.065 -> 0.0325），擺動速度每刀增加 25%（1800ms -> 1440ms -> 1152ms）。
   - 結算獎勵：每成功切中一刀獲得 +100 EXP，三刀結算後若累計次數 > 0，可直接點擊「進行下一輪切西瓜」連續挑戰（每輪消耗 1 次累計）。

### 6.2 圖鑑與 CG 立繪 (Gallery & Outfit System)
- **條目 1：巫女社・狐娘小樂 (`koraku_default`)**
  - 圖資：`ASSETS.default` (`koraku/小樂-預設.png`, 4000 × 4000 px)
  - 解鎖條件：**預設直接解鎖**，無需任何前置關卡。
- **條目 2：鏡界・白金小樂 (`koraku_2p`)**
  - 圖資：`ASSETS.final` (`koraku/小樂-2P色.png`, 4000 × 4000 px)
  - 解鎖條件：**戰勝終ノ章（第 4 關）1 次**（或使用圖鑑全解鎖作弊）。
- **條目 3：夏日祭・清涼泳裝 (`swimsuit_default`)**
  - 圖資：`ASSETS.swimsuit` (`koraku/泳裝小樂.png`, 3970 × 4993 px, minY: 24)
  - 解鎖條件：通關第 1 關以上或戰勝後觸發泳裝換穿事件。
- **條目 4：海風・切西瓜 (`swimsuit_watermelon`)**
  - 圖資：`ASSETS.watermelon` (`koraku/泳裝小樂_西瓜.png`, 4007 × 5425 px, minY: 24)
  - 解鎖條件：切中西瓜 1 次以上或戰勝後觸發換裝。
- **立繪尺寸與對齊無縫規格 (Zero Jump & Normalized Scale)**：
  - `泳裝小樂` 與 `泳裝小樂_西瓜` 頭頂像素基準點完全一致（`minY: 24`），切西瓜立繪因底部西瓜畫布延伸至 5425px。
  - 圖鑑展示框架採用頂部對齊，並針對切西瓜立繪套用精確縮放比率（$86\% \times 5425 / 4993 = 93.44\%$），使切換泳裝與切西瓜立繪時**小樂人物本體尺寸與位置 100% 相同、毫無跳動與縮放感**。
- **全螢幕高解析度鑑賞 (High-Res Lightbox Viewer)**：
  - 點擊圖鑑立繪或「🔍 放大鑑賞」標籤可呼出全螢幕高畫質燈箱 (`#gallery-lightbox-modal`)，以 4K 原生超高解析度欣賞立繪細節，支援 ESC 鍵與點擊遮罩關閉。

### 6.3 DPS 與冒險歷程記錄
- **理論 DPS (Theoretical DPS)**：
  $$\text{Theoretical DPS} = \frac{(\text{Base DMG} \times \text{Greatsword Mult} \times \text{Dual Hand Mult}) + \text{Passive DOT} + \text{Momo Expected}}{3.5\text{s}}$$
- **實戰 DPS (Combat DPS)**：$\text{單場造成總傷害} / \max(1, \text{戰鬥秒數})$。
- **每局獎勵統計 (Per-Battle Rewards in Recent Battles)**：
  - 保存最近 100 場戰鬥詳情（超過 100 筆自動滾動移除最舊紀錄）。
  - 每筆戰鬥卡片清楚標示該局獲得之獎勵（例如 `+100 星砂 / +100 EXP` 或敗北 `+50 星砂`），結合實戰 DPS、造成傷害、承受傷害與戰鬥耗時。

### 6.4 作弊除錯系統與密碼驗證 (Password-Protected Cheat Access)
- **管理按鈕與密碼驗證**：首頁管理區域提供「⚙️ 測試調試 / 作弊選單」按鈕，點擊後彈出密碼驗證視窗，輸入密碼 `8989` 驗證通過方可解鎖開啟作弊選單。
- **秘密快速鍵**：在 1000ms 時間窗口內連續按下數字鍵 8 四次可直接呼出。
- **功能**：自訂等級/經驗/SP/星砂/藥水/配點/技能；一鍵解鎖全 4 關卡；一鍵解鎖全 4 張圖鑑立繪。

### 6.5 存檔紀錄、種子碼跨裝置轉移與刪檔管理 (Save Records, Seed Code & Save Management)
- **規格目的 (Purpose)**：提供安全便捷的跨裝置存檔遷移與備份機制（種子碼功能），讓玩家在更換裝置、更換瀏覽器或無痕模式切換時，能隨時匯出存檔種子碼，並在另一台裝置輸入種子碼完整繼承等級、經驗、星砂、裝備、技能、戰績與圖鑑紀錄。同時將重置存檔與種子碼整合於統一的「存檔紀錄」管理介面，避免首頁誤觸重置存檔。
- **規格需求 (Requirements)**：
  1. 首頁原「重置存檔」按鈕位置改為「💾 存檔紀錄」按鈕（`#open-save-record-modal`）。
  2. 點擊後彈出「存檔紀錄與種子碼管理」視窗（`#save-record-modal`）。
  3. **當前存檔摘要**：顯示當前等級、經驗、星砂、通關最深關卡、戰鬥總場次等概要。
  4. **種子碼導出與複製**：自動生成包含當前完整存檔資料之 UTF-8 安全 Base64 種子碼（帶 `KORAKU1_` 前綴），提供「📋 複製種子碼」按鈕，點擊後寫入系統剪貼簿並彈出提示。
  5. **種子碼匯入與跨裝置載入**：提供輸入框供玩家貼上其他裝置的種子碼，點擊「📥 載入並套用種子碼」按鈕後進行格式驗證與二次確認。確認後覆蓋當前存檔，持久化存入 localStorage，發布 `store:changed` 事件並即時刷新介面。
  6. **重置存檔整合**：將重置存檔功能移入此管理介面的危險操作區域，點擊「🗑️ 重置存檔」需二次確認，確認後清除所有遊戲紀錄並重置為初始狀態。
  7. **四國在地化支援**：繁體中文、簡體中文、英文、日文全面支援。
- **驗收情境 (Scenarios)**：
  - **Scenario: 查看與複製當前存檔種子碼**
    - **GIVEN** 玩家在首頁點擊「💾 存檔紀錄」按鈕
    - **WHEN** 存檔紀錄管理彈窗開啟
    - **THEN** 畫面顯示當前存檔摘要與完整的種子碼字串，點擊「複製種子碼」成功將字串寫入剪貼簿並彈出 Toast 提示「種子碼已複製到剪貼簿！」
  - **Scenario: 匯入有效種子碼覆蓋並載入跨裝置存檔**
    - **GIVEN** 玩家持有其他裝置產生的有效種子碼
    - **WHEN** 玩家在輸入框貼上種子碼並點擊「載入並套用種子碼」，且於確認對話框點擊確定
    - **THEN** 系統成功解析並還原等級、裝備、星砂與戰績，保存至 localStorage，提示「存檔已成功載入！」並關閉彈窗刷新首頁
  - **Scenario: 匯入無效或損毀種子碼時防護**
    - **GIVEN** 玩家在輸入框輸入空白或隨機亂碼
    - **WHEN** 玩家點擊「載入並套用種子碼」
    - **THEN** 系統攔截錯誤，不覆蓋現有存檔，並彈出紅色警告 Toast「無效或損毀的種子碼，請檢查是否複製完整。」
  - **Scenario: 在存檔管理介面內重置存檔**
    - **GIVEN** 玩家開啟存檔紀錄彈窗
    - **WHEN** 玩家點擊「重置存檔」按鈕並確認
    - **THEN** 清除所有進度，重設為 Lv.1 與初始資源，更新種子碼為初始值並彈出重置成功提示

### 6.6 行動端體驗與層級規範 (Mobile UX & Layering Specification)
- **防雙擊縮放與手勢保護**：Viewport 設定 `user-scalable=no`，全域與按鍵區域設定 `touch-action: manipulation`，QTE 方向鍵設定 `touch-action: none`，JS 攔截 `gesturestart` 與 300ms 內連續快速雙擊，徹底杜絕 QTE 連按時的畫面放大與跑位。
- **彈性頂部 Header (Elastic Header, 360px~430px+ Zero Overflow)**：
  - 左側 Brand 按鈕支援最小彈性縮減，窄螢幕截斷副標，<=365px 僅保留優雅紅底「狐」字徽章。
  - 右側保留語言下拉選單（緊湊 30px 高度）、等級（`Lv.X`）、星砂（`✦ X`）與音樂/音效向量切換按鈕（30×30px），總寬 <=290px，在 360px Galaxy 至 430px iPhone Pro Max 上 100% 不溢出、不裁切任何按鈕。
- **首頁流暢捲動與安全區墊高 (Fluid Scroll & Safe Area)**：
  - `.home-screen` 支援標準原生平滑滾動（`-webkit-overflow-scrolling: touch; overscroll-behavior-y: contain;`）。
  - 小樂立繪置於背景層（`z-index: 1; opacity: 0.38;`），選單按鈕精緻化（44px 高度），文字對比清晰且毫無遮蔽。
  - 底部提供充分的安全區墊高（`padding-bottom: calc(max(44px, env(safe-area-inset-bottom)) + 36px)`），確保 Safari / Chrome 浮動網址列完全不阻礙存檔紀錄與頁腳按鈕操作。
- **結算畫面垂直流式容器 (Scrollable Settlement Overlay)**：
  - 結算與切西瓜時小樂立繪轉為背景氛圍層（`z-index: 1; opacity: 0.22; filter: blur(1px);`），隱藏對話框 `.avg-dialogue`，徹底解決角色立繪遮擋文字、數值、切西瓜時間軸與操作按鈕之問題。
  - `.result-overlay` 改為標準全螢幕滾動容器（`overflow-y: auto;`），操作按鈕（`min-height: 44px`）採全寬縱向排版，在任何視口高度的手機上均能舒適滾動與點擊。
- **商店橫向滾動分類選單 (Horizontal Scrollable Filter Bar)**：
  - 商店 12 個裝備與道具分類標籤改為純 CSS 橫向平滑滾動膠囊列，消除手機端分類按鈕多行折行佔據半版之問題。
- **戰鬥畫面行動端佈局重構**：
  - **玩家血條移至道具下方**：在行動裝置佈局中，`.battle-left-cluster` 依序為：出拳選擇器 (`.hand-selector`, order 1) -> 道具快捷欄 (`.quick-slots`, order 2) -> 玩家 HP/MP 血條 (`.player-hud`, order 3)，徹底解決血條遮擋敵方 Boss 與神諭框之問題。
  - **精簡化對話視窗**：行動端對話框 `.avg-dialogue` 縮減高度（min-height 46~50px, max-height 56~62px, 緊湊 padding），大幅釋放縱向戰場空間供角色立繪與戰鬥特效展示。
  - **出拳介面輕量清爽**：手勢按鈕精簡化排版，單手模式按鈕高度 30~32px 具備清晰圖示與字體，雙手模式採用乾淨俐落的 2 列網格排版，隱藏行動端多餘實體鍵盤提示。
  - **神諭結果面板微型化**：`.round-oracle` 縮小尺寸與留白（寬度 84~86vw，max-width 280~310px，緊湊倒數圈與對決手勢字體），不再遮擋 Boss 血條與小樂面容。

### 6.7 和風程序化 BGM 合成引擎與向量設計語彙開關 (Web Audio Japanese BGM & Vector Audio Toggles)
- **非戰鬥和風舒緩 BGM (`lobby` loop)**：
  - 採用日本平調子 (Hirajōshi) / 陰旋律 (In-Sen) D 小調五聲音階（D4, F4, G4, A4, C5, D5, F5, A5）。
  - 合成器架構：古箏撥弦音色（Koto Pluck）、尺八竹笛（Shakuhachi Flute）、神道神社風鈴鈴音（Suzu Bells）與底層和風五度低音 Ambient Drone。
  - 16 小節循環舒緩流暢，涵蓋首頁、選關、養成、商店、圖鑑、戰績與指南介面。
- **局內戰鬥和風激闘 BGM (`battle` loop)**：
  - 採用 136 BPM 高節奏日本雲井 (Kumoi) / 陰旋律戰鬥音階。
  - 合成器架構：大太鼓重擊（O-Daiko Kick）、附太鼓清脆緣擊（Tsuke-Daiko Rimshot）、三味線疾走琶音（Shamisen Riff）、律動張力低音（Tension Bass）與拍子木（Hyoshigi）。
  - 8 小節高昂緊湊戰鬥循環，倒數與出拳時激發對決張力。
- **統一暗黑和風設計語彙按鈕 (No Colored Emojis)**：
  - 頂部導航列按鈕（`#music-toggle`、`#sound-toggle`）捨棄彩色系統 Emoji，改採自適應暗金與墨黑的和風純向量 SVG 圖示（音樂音符與音響喇叭）。
  - 靜音時採用優雅斜劃線微暗遮罩 (`is-muted`)，滑鼠懸停觸發金光微暈，與全站神社視覺語彙完美統一。
  - 存檔設定資料結構獨立保存 `settings.musicMuted` 與 `settings.sfxMuted`，支援繁中、簡中、英文、日文在地化通知提示。

### 6.8 血條 ATK 資訊、最近 5 次傷害紀錄與修練場系統 (HUD ATK, 5-Damage Log & Training Dojo)
- **規格目的 (Purpose)**：
  - 讓玩家於戰鬥中清晰洞悉角色與敵方之即時攻擊力，並透過輕量 FIFO 傷害紀錄面板即時驗收裝備與技能收益；同時提供專屬的無壓修練場，涵蓋純 QTE 連續反應訓練與可自訂血量/傷害之全黑小樂剪影戰鬥沙盒。
- **規格需求 (Requirements)**：
  1. **玩家血條 ATK 顯示**：於玩家血條 HUD 顯示即時總攻擊傷害（基礎攻擊 + SP 配點 + 裝備 ATK 總和）。
  2. **小樂 (Boss) 血條 ATK 顯示**：於單體或雙生 Boss 血條 HUD 顯示敵方單次攻擊傷害數值（第 1~3 關 100，第 4 關 200，修練場預設 0 或自訂）。
  3. **最近 5 次傷害紀錄面板**：
     - 局內提供 FIFO 容量為 5 筆的滾動傷害日誌（`#battle-damage-log`）。
     - 顯示目標、數值、傷害類型（克制、摸摸、QTE、灼燒、反彈、雷擊等）。
     - 尺寸精簡（單行 18~22px，字體 11px），`pointer-events: none` 點擊穿透，和風墨夜金邊半透明質感，桌面與手機端（360px~430px）絕不推擠遮擋出拳按鈕與血條。
  4. **首頁修練場入口**：首頁選單新增修練場按鈕（向量 SVG + 純文字標籤，無彩色 Emoji），點擊開啟 `#dojo-modal`。
  5. **模式一：純 QTE 無限反應練習 (Continuous QTE Practice)**：
     - 略過猜拳與回合環節，純粹連續生成 QTE 指令，即時統計連擊數（Combo）、最高連擊與反應時間（ms）。
     - **第一式（單軌 QTE）**：標準 8 方向單軌連續輸入。
     - **第二式（雙軌 QTE）**：模擬第 4 關雙軌鍵盤情境（左手 WASD，右手 方向鍵）。
  6. **模式二：戰鬥模擬與 DPS 測試沙盒 (Combat Simulation & DPS Sandbox)**：
     - 保持 3-2-1 猜拳、變拳窗口、摸摸、QTE 等標準戰鬥節奏。
     - 對手為全黑預設小樂剪影（CSS 濾鏡 `filter: brightness(0)` 呈現）。
     - **小樂血量**：預設 10,000 HP，支援玩家自訂輸入（1 ~ 999,999）。
     - **小樂傷害**：預設 0 傷害（對玩家 0 傷害，無敗北壓力），支援玩家自訂輸入傷害值以測試防具減傷與護盾反彈。
     - **第一式（單體假人對決）**：單個全黑剪影，測試單體 DPS 與變拳/反擊。
     - **第二式（雙生假人對決）**：雙個全黑剪影，模擬第 4 關雙手出拳與雙軌 QTE。
- **驗收情境 (Scenarios)**：
  - **Scenario: 玩家與敵方血條即時顯示 ATK 數值**
    - **GIVEN** 玩家進入戰鬥且總攻擊力為 75，挑戰第 1 關小樂（ATK 100）
    - **WHEN** 戰鬥介面載入完畢
    - **THEN** 玩家血條區域顯示 `ATK 75`，小樂血條區域顯示 `ATK 100`
  - **Scenario: 戰鬥介面即時滾動記錄最近 5 筆傷害且不干擾點擊**
    - **GIVEN** 戰鬥中連續觸發猜拳傷害、摸摸傷害與灼燒傷害
    - **WHEN** 傷害紀錄產生並顯示於 `#battle-damage-log`
    - **THEN** 畫面顯示最近 5 筆事件，玩家點擊紀錄下方的出拳按鈕時正常響應，無事件阻擋
  - **Scenario: 進入修練場模式一進行連續 QTE 練習**
    - **GIVEN** 玩家在修練場選擇「模式一：純 QTE 練習（第一式）」
    - **WHEN** 玩家完成一組 QTE 輸入
    - **THEN** 即刻累計連擊數與反應時間，並於 300ms 內無縫生成下一組 QTE 指令
  - **Scenario: 進入修練場模式二以 0 傷害假人測試 DPS**
    - **GIVEN** 玩家選擇「模式二：單體假人對決」，預設 10,000 HP / 0 傷害
    - **WHEN** 猜拳失敗且 QTE 失敗
    - **THEN** 玩家受到 0 傷害不扣血，戰鬥繼續進行，實戰 DPS 即時更新

---

## 10. 響應式佈局規格與跨引擎回歸驗證合約 (RWD Specification & Verification Gate)

### 10.1 平板與緊湊直向戰鬥控制定位 (768px Containing Block Invariant)
- **包含塊幾何解耦**：消除直向與緊湊平板模式下祖先變形（`translateX(-50%)`）對固定定位手勢選擇器的負面影響，使玩家 HUD、快捷欄與出拳按鈕在直向視口完整顯示且左右對稱。
- **等寬出拳與快捷欄對齊**：單手三拳按鈕維持等寬排列，雙手四鍵/六鍵按鈕同行等高對齊，無水平捲軸外溢與元素重疊。

### 10.2 寬螢幕修練道場工作區置中與 1040px 擴展 (Dojo Workspace Centering)
- **大螢幕擴展規則**：在視口寬度 `≥1280px` 條件下，修練道場 QTE 題目與八方向操作盤由 820px 居中擴展至 1040px，按鈕尺寸同步優化放大（單軌 80px、雙軌 52px）。
- **頂部資訊錨定不變**：道場標題、模式切換與退出按鈕維持錨定，不隨工作區拉伸變形。

### 10.3 跨引擎 2,286 案例回歸驗收門檻 (Playwright Cross-Engine Regression Gate)
- **測試矩陣**：涵蓋 Chromium、Firefox、WebKit 跨引擎共 29 個子批次、2,286 個 unique composite required case IDs。
- **分離證據契約 (Split Evidence Contract)**：
  - Chromium：保留 trusted native touch-pan。
  - Firefox / WebKit：touch-capable layout + real wheel 驗證內容可達與末端操作（標記 `nativeTouchPan: false`）。
  - 手動分發 pointer/touch 事件僅驗證遊戲手勢處理（標記 `trusted: false`）。
- **嚴格驗收防線**：任何四向裁切（Clipping）、元素遮擋（Occlusion）、必要控制可達性缺失或動畫抖動皆視為非零阻擋缺陷。

---

## 11. Online 權威架構與通訊協定規範 (Online Authority Architecture & Network Protocol Specification)

### 11.1 十六大 Online 權威方針 (16 Online Authority Policies)
1. **意圖傳遞原則 (Intent Only)**：前端客戶端僅向伺服器發送操作意圖指令（如選拳、出鍵、購裝、配點），嚴禁發送傷害數值、勝負結果、獎勵掉落或 RNG 隨機結果。所有戰鬥勝負與數值變更一律由運行於伺服器的 Kernel 核心權威計算。
2. **三類判定模型 (Three-Class Adjudication)**：
   - **時機類操作 (Timing Claims)**：QTE 輸入、變拳反應、切西瓜揮刀由客戶端先行樂觀反饋，伺服器依據封包抵達時間戳與 150ms 網路延遲寬限期進行事後嚴格審查。
   - **秘密承諾 (Secret Commitments)**：猜拳手勢必須在倒數結束（Reveal 揭曉前）抵達伺服器封存；逾時抵達者自動作廢並判定棄權。
   - **庫存與數值異動 (Inventory Mutations)**：藥水使用、裝備購買、穿脫、屬性配點為帶有 `cmdId` 的冪等指令，由伺服器驗證前置條件後套用。
3. **宣告順序排序 (Declared Order)**：指令依玩家客戶端宣告之時間戳與流水序號進行排序緩衝處理，並受抵達時間上界約束，絕非單純依原始封包到達順序粗暴套用。
4. **離線模式嚴格隔離 (Offline Sandbox Isolation)**：`?mode=offline` 離線模式使用同進程 `LocalGameClient`，為獨立單機沙盒，資料永不上傳伺服器，亦絕不回灌或污染線上帳號存檔。
5. **戰鬥中狀態鎖定 (In-Battle Mutation Lock)**：戰鬥 Session 進行中時，嚴格鎖定裝備穿脫與屬性/技能配點指令（`BATTLE_IN_PROGRESS_LOCKED`），防止利用狀態切換漏洞獲取非法戰力 (`ASSUMPTION`)。
6. **單一帳號單一寫入者 (One Writer Per Account)**：以最新連線為準（Newest Connection Wins），新連線登入時自動踢出舊連線 Session 並發送 `serverSessionReplaced` 事件；每帳號指令全數進入單一序列化佇列依序執行。
7. **戰鬥暫停與斷線結算限制 (Pause Policy & Disconnect Grace)**：暫停操作僅允許在 `countdown` 出拳倒數階段發起，且單場戰鬥上限 3 次；`reaction` 與 `qte` 階段暫停無效且計時器照常運轉。戰鬥中斷線享有 10 秒寬限期保留狀態，逾時未連回時伺服器自動依當前狀態結算戰鬥。
8. **伺服器純文字去化與多語系解耦 (Text-Free Server Emission)**：伺服器核心絕不直接下發包含硬編碼語言文字的字串。所有對話、系統廣播（Toast）與戰鬥日誌一律發送 `{ key, params }` 結構化資料，完全由前端客戶端 `I18n.js` 動態翻譯渲染；持久化紀錄僅儲存 ID 與數值。
9. **伺服器權威 RNG 與確定性重放 (Authoritative RNG & Deterministic Replay)**：所有影響遊戲結果之隨機運算（Boss 出拳、爆擊、掉落、摸摸閃避）皆由伺服器注入之 Crypto-backed RNG 產生，種子永不下發客戶端。每場戰鬥於伺服器持久化初始種子與完整指令日誌，具備 100% 確定性重放審計能力。
10. **經濟審計不可篡改帳本 (Economic Audit Ledger)**：每一筆星砂、經驗值、道具與裝備實例異動，皆在伺服器端寫入 Append-only 經濟流水帳本，記錄異動源、伺服器絕對時間戳與 `configVersion`。
11. **伺服器絕對時間權威 (Authoritative Server Time)**：伺服器時間為全域唯一權威時鐘基準，存檔與對戰紀錄嚴禁信任並儲存客戶端 `Date.now()`。
12. **嚴格架構驗證與來源防護 (Schema & Origin Validation)**：所有傳入伺服器之指令皆經過嚴格的 JSON Schema 驗證（白名單欄位、長度/大小限制、WSS 傳輸加密與 Origin 來源檢驗），非法或格式錯誤指令一律拒絕並記錄審計日誌。
13. **作弊權限線上授權檢驗 (Cheat Dev Entitlements)**：除錯與作弊指令在線上模式下必須具備伺服器簽發之 Dev Entitlement（管理員憑證），一般玩家請求一律拒絕；離線模式除錯面板維持不變。
14. **核心與適配器環境解耦 (Kernel & Adapter Separation)**：Kernel 核心邏輯（`src/js/kernel/`）為純 ES Modules，不使用任何 Node.js 專屬 API（如 `fs`, `sqlite`, `path`），確保未來可無縫遷移至 Cloudflare Workers / Durable Objects；WebSocket、儲存與時鐘適配器完全隔離於 `server/`，且 `server/` 目錄絕不進入前端打包 Bundle。
15. **連線握手版本檢驗 (Config Version Handshake)**：客戶端與伺服器於 WebSocket 連線握手時互換 `configVersion`（當前為 `2026.09.03`），版本不相符時伺服器發送 `VERSION_MISMATCH` 並提示客戶端重新整理載入最新版本。
16. **每日備份與復原演練契約 (Daily Backup & Restore Contract)**：線上系統於公開上線前必須建立自動化每日資料備份機制，並具備可驗證且經過實測的災難復原流程。

### 11.2 雙模式客戶端抽象 (GameClient Layer)
- **`GameClient` 抽象介面**：提供統一的 `send(command, payload)`、`on(event, handler)`、`getState()` 方法。
- **`LocalGameClient` (離線沙盒模式)**：同進程實例化 Kernel 與本地持久化，供 `?mode=offline` 或單機沙盒環境運行，完全不連線伺服器且不回灌伺服器存檔。
- **`RemoteGameClient` (線上權威模式)**：透過 WebSocket 與伺服器連線，負責序列化指令發送、`cmdId` 冪等確認、自動重連、時鐘同步（Clock Sync）與狀態事件接收。

### 11.3 通訊協定規格 (`protocol.js` v2.0.0)
- **Protocol Version**：`2.0.0`
- **Config Version**：`2026.09.03`
- **指令封包格式 (Command Envelope)**：`{ cmdId, command, payload, clientTime, configVersion, token }`
- **指令集 (Commands)**：
  - 經濟裝備：`buyItem`, `buyEquipment`, `equipItem`, `unequipItem`, `allocateStat`, `allocateSkill`
  - 戰鬥操作：`battle.start`, `battle.selectHand`, `battle.selectTarget`, `battle.useMorph`, `battle.useItem`, `battle.inputQte`, `battle.pause`, `battle.resume`, `battle.abandon`
  - 自動戰鬥與戰後：`autoBattle.start`, `autoBattle.stop`, `postBattle.requestSwimsuit`, `postBattle.startWatermelon`, `postBattle.strikeWatermelon`
  - 帳號治理：`account.issueTransferCode`, `account.claimTransferCode`, `account.exportJson`, `account.delete`
  - 作弊調試：`cheat.setStats`, `cheat.unlockAll`, `cheat.addCoins`
- **事件集 (Events)**：
  - 狀態模型：`store:changed`, `battle:state`, `battle:effect`, `battle:damage-logged`, `battle:ended`
  - 計時與 QTE：`qte:update`
  - 戰後與小遊戲：`postbattle:state`, `postbattle:auto-watermelon`, `auto-battle:round-completed`, `auto-battle:summary`
  - 去純文字化推播：`dialogue` (`{ key, params }`), `toast` (`{ key, params, tone }`)
  - 傳輸連線層：`connection:state`, `command:ack`, `command:rejected`

### 11.4 連線狀態機 (Connection State Machine)
```
[offline] ◄──► [connecting] ──► [online] ──► [reconnecting] ──► [disconnected]
```
- 連線狀態定義於 `ConnectionStates`（`offline`, `connecting`, `online`, `reconnecting`, `disconnected`）。
- 橫幅提示（Banner）與狀態標籤全面透過 `I18n.js` 四國語系（`zh-Hant`, `zh-Hans`, `en`, `ja`）在地化字典渲染。





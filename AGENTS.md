# 狐樂・絆之勝負 — Agent 開發與維護準則

Product spec: `OPENSPEC.md`. Follow the workspace OpenSpec workflow in `D:\game-dev\AGENTS.md`.

---

## 1. 開發前置規範 (OpenSpec Workflow & Prompt Comprehension)

在進行任何功能開發、規則修改或行為變更時，必須嚴格遵守以下流程：

1. **先理解提示詞**：深入分析玩家與使用者的真實意圖、影響範圍、潛在邊界條件與相關聯系統。
2. **更新或編寫 OpenSpec 規格**：在動手編寫或修改任何專案程式碼前，**必須先在 `openspec/specs/` 或 `OPENSPEC.md` 中更新或寫入規格**：
   - **規格目的 (Purpose)**：清楚定義此功能之目的與價值。
   - **規格需求 (Requirements)**：條列清晰的系統規範與行為約束。
   - **驗收情境 (Scenarios)**：使用標準的 **GIVEN / WHEN / THEN** 格式撰寫可量化之驗收條目。
3. **執行 OpenSpec 標準流程**：`openspec context --json` -> `/opsx:propose` -> `/opsx:apply`（或相應指令）。

---

## 2. AI 交接與全域規格表維護規範 (AI Handover & Full Specs Artifacts)

為確保跨 AI 代理人與開發者能無縫交接、秒級理解全系統契約，必須同步維護以下 4 份核心交接與百科文件：

1. **AI 交接指南 (`HANDOFF.md` / `AI_HANDOVER.md`)**：
   - 記錄系統架構分層、EventBus 契約、狀態機轉換、存檔資料結構（GameStore）、重要測試指令與建置流程。
2. **遊戲全規格 Markdown 百科 (`wiki.md`)**：
   - 詳盡記錄全遊戲玩法、角色立繪、四大章節 Boss 梯度、猜拳與時機變拳、八方向單/雙軌 QTE、摸摸與雙手技能、12 格位裝備目錄、切西瓜小遊戲、DPS 計算公式、圖鑑解鎖、作弊選單與在地化字典。
3. **獨立互動式 HTML 遊戲百科 (`wiki.html`)**：
   - 具備日式動漫暗黑神社視覺風格、即時搜尋、分類過濾（角色/關卡/裝備/技能/公式/作弊）、以及互動式等級/配點/DPS/QTE 計算器之單頁離線 HTML 百科。
4. **全規格 Excel 試算表 (`game_specs.xlsx`)**：
   - 多工作表 Excel 總表，涵蓋「關卡與Boss」、「裝備武具一覽」、「道具與藥水」、「技能與摸摸」、「戰鬥與QTE規則」、「成長與數值公式」、「切西瓜與圖鑑」、「作弊與除錯」及「在地化字典」。

**維護要求**：任何新增/調整遊戲內容（新裝備、數值調整、新關卡等）後，必須同步更新上述 4 份文件。

---

## 3. 本地化翻譯規範 (Localization Requirements)

專案全面支援 4 種語系：
- 繁體中文 (`zh-Hant`)
- 簡體中文 (`zh-Hans`)
- 英文 (`en`)
- 日文 (`ja`)

**開發規範**：
1. **全語系同步維護**：任何新增或修改之功能、道具、裝備、技能、章節關卡、AVG 對白台詞、UI 按鈕/標籤、作弊選單與說明文字，必須同步維護並更新 `src/js/services/I18n.js` 中的 4 語系字典與在地化輔助方法。
2. **語氣與用語**：台詞與技能說明必須符合當地 ACGN 遊戲網民之自然用語與日常習慣（例如日文的 じゃんけん 口令、スキあり；英文的 Rock-Paper-Scissors、Counter Chance 等）。
3. **語系切換按鈕**：保持純文字標籤按鈕切換（不使用國旗圖示），支援自動探測玩家系統/瀏覽器語系與未匹配時預設英文回退。
4. **測試與打包**：更新後必須執行 `npm test` 通過所有測試（包含 `tests/i18n.test.js` 字典完整性檢驗），並執行 `node scripts/build.mjs` 重新建置 `src/js/bundle.js`。

---

## 4. 部署與發布規範 (Deployment to GitHub Pages & Custom Domain)

本專案線上部署網址為：**https://koraku.app/**
對應 GitHub 倉庫：`imiancui/koraku-rps` (`main` 分支，自訂網域 CNAME: `koraku.app`)

**發布規範**：
每當完成新功能或修復並通過測試與建置後，必須將 `New-game-project-4` 最新提交同步推送至 GitHub 遠端倉庫 `imiancui/koraku-rps` 的 `main` 分支，確保 GitHub Pages 與 `https://koraku.app/` 即時更新為最新版本。

---

## 5. 視覺設計與全域 UI 風格統一規範 (Visual Design & UI Consistency)

為維持遊戲整體高品質的 ACGN 沉浸感與視覺一致性，所有頁面、彈窗、按鈕與元件必須嚴格遵循以下設計標準：

1. **暗黑神社動漫調性 (Japanese Dark Anime Shrine Aesthetic)**：
   - 核心色系嚴格採用神社朱紅 (`var(--crimson)`)、神聖金黃 (`var(--gold)`, `var(--gold-bright)`)、深邃墨夜 (`var(--night-pure)`) 與宣紙柔白 (`var(--paper)`）。
   - 邊框與陰影需具備古典和風半透明金箔質感，避免使用高飽和度的非和風雜色。
2. **嚴格禁止彩色 OS Emoji (No Colorful OS Emoji Icons)**：
   - 全遊戲的所有 UI 按鈕、系統選單、彈窗標題、功能標籤與對白提示中，**一律嚴格禁止使用作業系統原生彩色 Emoji 圖示（如 💾, ⚙️, 📋, 📥, 🗑️, ⚡, ⏸️, 🏳️ 等）**。
   - 所有圖示必須採用內嵌向量 SVG 或主題色樣式（套用 `fill="currentColor"` 或主題色變數），使其色彩與按鈕字體、懸停金光完美統一。
3. **文字與圖示分離 (Separation of Icon & Localized Label)**：
   - 包含圖示的按鈕與標題，必須將向量 `<svg>` 與文字標籤 `<span data-i18n="...">` 分開包裹，確保在地化字典（`I18n.js`）只包含純文字字串，避免語系切換時覆蓋向量圖示。
4. **跨裝置響應式排版與點擊安全 (Responsive & Click Safety)**：
   - 所有管理彈窗與行動端按鈕必須具備獨立的 `z-index`、適當的觸控熱區（最小 40px 高度）與 `pointer-events: auto;`。
   - 角色立繪等裝飾層必須設置 `pointer-events: none;`，嚴格防止點擊穿透或事件攔截。

---

## 6. 版本號維護規範 (Versioning Requirements)

1. **頁腳版本號位置與格式**：
   - 遊戲版本號必須固定顯示於首頁頁腳（`footer.home-footer`）最左側第一個位置。
   - 版本號格式嚴格遵循三段式版號：`MAJOR.MINOR.PATCH`（從 `0.0.0` 起算）。
2. **版本號累加與進位規則（每 100 個版本進一位）**：
   - 每次功能更新、修復或發布上線時，由最後一位數（PATCH）遞增 `+1`（例如：`0.0.0` -> `0.0.1` -> `0.0.2` ... -> `0.0.99` -> `0.0.100`）。
   - **每 100 個版本進一位規則**：當最後一位數達到 100（如 `0.0.100`）時，下一版進位為 `0.1.0`；同理 `0.1.100` 下一版進位為 `0.2.0`、`0.99.100` 下一版進位為 `1.0.0`。
3. **每次改版同步更新四處**：
   - `src/js/config/gameConfig.js` 中的 `APP_VERSION` 常數。
   - `index.html` 頁腳元素 `<span class="footer-version" id="footer-app-version">0.0.0</span>`。
   - `index.html` 中的 CSS 與 `bundle.js` 快取版本號參數（`?v=YYYYMMDDHHmm`）。
   - `HANDOFF.md` 與 `wiki.md` 交接與百科文件中的版本記錄。


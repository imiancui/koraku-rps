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

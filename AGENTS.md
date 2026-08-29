# 狐樂・絆之勝負

Product spec: `OPENSPEC.md`. Follow the workspace OpenSpec workflow in `D:\game-dev\AGENTS.md`.

Before changing player-visible behavior: `openspec context --json`, then `/opsx:propose` (Codex: `$openspec-propose`), then `/opsx:apply`.

## 本地化翻譯規範 (Localization Requirements)

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

## 部署與發布規範 (Deployment to GitHub Pages)

本專案線上部署網址為：**https://imiancui.github.io/koraku-rps**
對應 GitHub 倉庫：`imiancui/koraku-rps` (`main` 分支)

**發布規範**：
每當完成新功能或修復並通過測試與建置後，必須將 `New-game-project-4` 最新提交同步推送至 GitHub 遠端倉庫 `imiancui/koraku-rps` 的 `main` 分支，確保 GitHub Pages 即時更新為最新版本。

# Koraku RWD Contract Regression Gate — 暫停交接

更新時間：2026-09-02 09:01:08 +08:00  
專案：`D:\game-dev\New-game-project-4`  
Git root：`D:\game-dev`  
OpenSpec root：`D:\game-dev\openspec`  
OpenSpec change：`koraku-rwd-contract-regression-gate`

## 1. 目前結論

工作已依使用者要求人工暫停。沒有 RWD Full／Repeat 程序仍在執行；最後一個 `npm run test:rwd:repeat` 以 Ctrl+C 中止並回傳 exit code 1。這是人工暫停，不是產品 FAIL，也不是 Full PASS。

目前不能宣稱 tasks 5.8 或 6.3 完成：修正後的新 Repeat 已完成 Smoke 3/3，但只跑到 Full 第 1 輪第 19/29 子批次的 WebKit sweep，中止前沒有產生完整 Full summary。若要滿足契約，接手者必須從頭執行新的 `npm run test:rwd:repeat`；不能把這次 partial、先前 Full1 或其他版本的綠燈拼接成 Full2。

已確認：

- OpenSpec change strict validation 通過。
- Full required manifest 為 2,286 個唯一 composite case IDs、29 個子批次。
- Playwright retries 固定為 0，snapshots 不允許自動更新。
- Chromium、Firefox 153.0（Playwright revision 1538）、WebKit 26.5（revision 2336）均已安裝並可執行。
- 61 張 Chromium golden baseline 已由使用者明確 APPROVE；不可自動更新。
- 產品 bundle、responsive CSS、版本與 golden 未因本次跨引擎測試修正而變更。
- WebKit 是桌面 Playwright 瀏覽器模擬，不是實機 Safari／iPad 證據。
- Firefox／WebKit 的內容可達證據是 touch-capable layout 上的真實 wheel，不代表 native touch-pan；manual pointer／touch 只驗遊戲 swipe handler。

## 2. 權限邊界

### 已獲授權

- 下載並使用 Playwright Firefox 1538、WebKit 2336。
- 執行三引擎 Full、Smoke3／Full2、零 retry。
- 使用已核准的分離證據契約：
  - Chromium：trusted CDP touch drag 驗 native touch-pan。
  - Firefox／WebKit：touch-capable layout + 真實 wheel 驗內容 owner／末端可達。
  - Firefox／WebKit：manual pointer／touch（`trusted:false`）只驗遊戲 swipe handler。
- 更新 OpenSpec／manifest／測試證據以反映上述契約。
- 對測試工具的跨引擎真實缺陷做窄幅修正並重新驗證。

### 尚未授權，接手者不得執行

- Task 4.7。
- 同步正式 OPENSPEC 主契約、`HANDOFF.md`、`AI_HANDOVER.md`、`wiki.md`／`wiki.html` 的本案發布內容。
- APP_VERSION 升版或 cache query 更新。
- commit、push、GitHub Pages／`koraku.app` 部署。
- 修改 `AGENTS.md`（task 2.10 治理入口）。
- 把 task 3.3 的歷史順序條件事後勾成完成。
- 自動更新 golden、提高 pixel tolerance、刪除 required cases、skip、retry 或降格 Full 選集。
- 下載其他瀏覽器、使用 Tailscale、改防火牆、修改玩家存檔、兄弟專案、祖先／共享 skill。

完成 Full2 後必須先停下，向使用者取得 task 4.7 的明確授權。完成 4.7 與本地最終驗證後，commit／push／部署還要再次分開取得授權。

## 3. 重要來源狀態

### Git

目前 HEAD：

`956b0cb7edb48fbd6f10406327b3d316e2c578a7`

這是外部 workspace backup 程序建立的 commit：`backup: 2026-09-02 03:00:37 (35981 paths)`，parent 為 `7eaf758d...`。原執行代理沒有呼叫 commit，也沒有 reset 或改寫它。不要把此 commit 視為本案已授權提交或發布。

Git root 是 `D:\game-dev`，但所有實作必須限制在 `New-game-project-4` 與本 change 的 OpenSpec 路徑。工作樹原本就髒；必須保留現有及並行修改。

### 產品與 baseline 雜湊

| 項目 | SHA-256 |
| --- | --- |
| `src/js/bundle.js` | `69919fb879995a299934f1a91b2a8a752de2abba722b2c169365100b5b2bd3cd` |
| `src/styles/responsive.css` | `32591787e64260221c46a39794a49c10eda9d9c9c68bb7b31c0d675c48cc7787` |
| `e2e/rwd/baselines/approved.json` | `7ad06cd228c82558047e1fce67c832ff864445208094dfe1346eab0bc4fc9854` |
| 61-file golden tree | `9fa0cbeb9c71a70425babafd6df5564467e0c8f66188202c453a298aaf30ba0f` |
| `e2e/rwd/stress-animation.spec.js`（修正後） | `e5c639bd79f0ae9257601002624ffad3a4693f723996cf8a7032f7e4f7ae7aa2` |

玩家顯示版本仍為 `0.0.13`：

- `src/js/config/gameConfig.js`: `APP_VERSION = "0.0.13"`
- `index.html`: footer `0.0.13`
- cache query：`202608312245`

`package.json` 的 npm package version 是 `1.0.0`，不可拿它當玩家 APP_VERSION。

## 4. 工作樹未提交檔案

### 專案內 13 個檔案

- `docs/ui/rwd-testing.md`
  - 補充 Firefox／WebKit 安裝與能力邊界、外部 backup commit 說明。
  - 文末狀態文字仍帶有早期「Full 暫停於決策」敘述；在最終 Full2 完成後要更新成實際結果。
- `e2e/rwd/application.js`
  - Firefox／WebKit 靜態 layout case 會 finish 有限 Web Animations；無限裝飾動畫不處理。
- `e2e/rwd/boundary.spec.js`
  - content-pan 會保存實際 input evidence。
- `e2e/rwd/fixtures.js`
  - 測試 server 改用 task-owned 20,000–49,999 隨機安全埠，EADDRINUSE bounded retry；避免 Chromium unsafe port 5060／5061。
- `e2e/rwd/layout-audit.js`
  - 新增 bounded 重複 real-wheel `auditScrollEnd`。
  - 使用安全 hover 點，避免 nested textarea 吃掉 wheel。
  - 新增祖先 overflow 的 manual intersection；只抑制 `IntersectionObserver` <=1px 且 manual／viewport loss <=0.5px 的跨引擎量化假陽性，沒有全域提高 tolerance。
- `e2e/rwd/manifest.json`
  - 記錄 split evidence contract 與 claim boundary。
- `e2e/rwd/smoke-complement.spec.js`
  - 內容末端使用 real wheel／split evidence；overlay、settlement、lightbox 先完成有限動畫。
- `e2e/rwd/smoke-core.spec.js`
  - save overlay touch-layout 的 Firefox／WebKit 內容可達改用真實 wheel evidence。
- `e2e/rwd/stage-b-before.spec.js`
  - Stage B content pan 保存 input evidence。
- `e2e/rwd/stage-b-helpers.js`
  - Chromium 使用 trusted CDP touch。
  - Firefox／WebKit app swipe 使用 manual pointer／touch，明記 `trusted:false`。
  - Firefox／WebKit content-pan 使用 real wheel，明記 `nativeTouchPan:false`。
  - touch capability 以 `maxTouchPoints || coarse || anyCoarse` 判定，避免 Firefox `maxTouchPoints:0` 但 coarse layout 被誤判。
- `e2e/rwd/stress-animation.spec.js`
  - 新增一行 `toHaveCSS("opacity", "1")` 自動等待，修正 `page.clock.runFor()` 不能可靠代表 Firefox CSS transition timeline 的非決定性假設。
- `e2e/rwd/stress-content.spec.js`
  - desktop max-list 使用 bounded real wheel；touch-layout 保存 split evidence。
- `e2e/rwd/stress-input.spec.js`
  - content-pan 保存實際 input evidence。

目前專案內 diff：約 131 insertions／48 deletions。presentation product CSS／JS 沒有被這段跨引擎工作修改。

### OpenSpec 未提交檔案

- `design.md`
- `proposal.md`
- `tasks.md`
- `specs/koraku-rps/responsive-regression-verification/spec.md`
- `evidence/full-repeat-preflight-20260902.md`
- `evidence/scope-status-20260902.md`
- 新檔 `evidence/cross-engine-touch-pan-decision-20260902.md`

這些檔案已記錄 split evidence 契約、Firefox／WebKit 安裝、外部 backup commit 與 pending disposition。`openspec validate koraku-rwd-contract-regression-gate --strict` 目前通過。

注意：部分 status 文字仍停在 Full 執行前或首次決策點；最終 Full2 綠燈後需要依實際證據更新，不能只改 checkbox。

## 5. Runner 與 required contract

正式命令：

```powershell
npm run test:rwd:full
npm run test:rwd:repeat
```

實作檔：

- `scripts/run-rwd-full.mjs`
- `scripts/run-rwd-repeat.mjs`
- `playwright.rwd.config.js`
- `e2e/rwd/manifest.json`
- `e2e/rwd/coverage.js`

Full：

- 29 個子批次。
- 2,286 個唯一 composite IDs。
- Chromium 808、Firefox 739、WebKit 739。
- 缺瀏覽器、空選集、缺 required ID、NOT_RUN、任何子批次非零都使 Full 非零。
- 每個子批次使用自己的 evidence root；Full 另有總 summary。

Repeat：

- Chromium `smoke-core` 連續 3 次。
- Full 連續 2 次。
- retries 0。
- 每次 evidence root 必須獨立。
- 任一輪失敗使 Repeat 非零。
- 不允許把失敗前後不同 source fingerprint 的結果拼接。

## 6. 跨引擎問題與修正紀錄

### 已修正的工具問題

1. Firefox／WebKit wheel 一次不足以到內容末端：改為 bounded repeated real wheel + scroll audit。
2. hover 命中 textarea 導致 wheel 只捲 inner control：改用容器安全點。
3. WebKit 0.25px 幾何量化：in-tolerance control 接受 0–0.5px，但 1px out-of-tolerance probe 仍必須失敗。
4. Firefox／WebKit 有限進場動畫讓靜態 geometry 不穩：只 finish finite animations；stress-animation 仍測真實動畫。
5. Firefox `maxTouchPoints:0` 但 coarse layout：capability 判斷加入 coarse／anyCoarse。
6. IntersectionObserver 回報 <=1px 量化 loss：以 manual ancestor overflow intersection 確認；只抑制量化假陽性，沒有升高全域 tolerance。
7. Chromium 拒絕 unsafe ports 5060／5061：改用 20,000–49,999 task-owned 隨機埠，最多 50 次 EADDRINUSE retry。
8. Playwright 無 Firefox／WebKit trusted swipe：使用者核准 split evidence contract；不可誤稱 native touch。

### Firefox QTE overlay 動畫非決定性失敗

失敗案例：

`RWD-G016.stress-animation.qte-overlay-rapid.w1440h900`

失敗證據：

`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-qQ78sQ`

錯誤：QTE 快速關閉／重開後，測試在 `page.clock.runFor(200)` 後硬要求 opacity `1`，Firefox 實際採樣為 `0.585779`。失敗截圖顯示 QTE 已正確重開且可操作，只有 160ms CSS transition 尚未走完。

根因：`page.clock.runFor()` 推進頁面 JavaScript clock，不保證 Firefox compositor 的 CSS transition timeline 同步前進。首輪可通過、次輪失敗，證明原測試假設非決定性。

修正：在最終採樣前加入 Playwright locator auto-wait：

```js
await expect(page.locator("#qte-overlay")).toHaveCSS("opacity", "1");
```

產品 CSS／JS 沒有改動，160ms transition 保留。

修正後三引擎完整 stress-animation 12/12：

- Chromium：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-R2Hhdw`
- Firefox：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-r9BRxh`
- WebKit：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-qKDNfx`

## 7. 執行歷史與證據

### 第一次完整 Full（修正跨引擎 helper 前）

`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-full-XmGhqL`

結果：FAILED。Firefox complement、WebKit complement、WebKit boundary、Firefox stress-content 共 4 個子批次失敗。失敗證據保留；之後依上述 helper 根因修正，四個 targeted scope 均分別全綠：

- Firefox complement 93/93：`koraku-rwd-hTaUlN`
- WebKit complement 93/93：`koraku-rwd-QHp3RD`
- WebKit boundary 39/39：`koraku-rwd-XjvX7v`
- Firefox stress-content 27/27：`koraku-rwd-M0L4za`

### 第一個正式 Repeat（發現動畫 clock 問題）

Repeat：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-repeat-rva7en`

- Smoke 3 輪均 30/30：`koraku-rwd-iP2ujK`、`koraku-rwd-DXhm21`、`koraku-rwd-qreQDc`
- Full 第 1 輪 2,286/2,286 PASS：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-full-Vgc6Jd`
- Full 第 2 輪：`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-full-Otq3oy`
- Full2 唯一失敗為 Firefox stress-animation 上述 opacity 案；retry 0。
- WebKit 同一動畫批次 12/12，最後 Chromium visual 61/61 通過。
- Repeat 正確回傳 FAILED，沒有掩蓋失敗。

這組證據不能在一行測試修正後直接當作最終 Full2。

### 修正後的新 Repeat（依使用者要求人工暫停）

Repeat owner root：

`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-repeat-kUHAGs`

此目錄只有 `owner.json`，因 Ctrl+C 中止而沒有 `repeat-summary.json`。

前置 discovery／manifest evidence：

`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-full-IlFZov`

Smoke 3/3 全綠：

- `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-4itW2q`
- `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-segp1p`
- `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-1TVglJ`

Partial Full root：

`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-full-q8ot0w`

此 root 的 `full-required.json` 確認 required count 2,286。01–18 log 已完成並通過：

- 三引擎 calibration fixtures 45/45。
- Chromium calibration probes 8/8。
- 三引擎 smoke-core 30/30。
- 三引擎 stage-b-protection 79/79。
- 三引擎 smoke-complement 93/93。
- 三引擎 boundary 39/39。
- Chromium sweep 400/400。
- Firefox sweep 400/400。

中止點：Full 第 1 輪 subrun 19/29，WebKit sweep 正在執行。因人工中止，沒有 19-webkit-sweep 完成 log、沒有 `full-summary.json`，也沒有 Full 第 2 輪。不得把 partial root 標成 PASS。

## 8. 接手後建議順序

1. 從 `D:\game-dev\New-game-project-4` 讀取最近的 `AGENTS.md`、本文件及 OpenSpec change。
2. 使用 `openspec-apply-change`；RWD 工作使用本專案 `rwd-ui-guardian`。Ponytail 只適用非視覺測試工具，presentation 仍為 OFF。
3. 先記錄而不清理目前工作樹：

   ```powershell
   git -C D:\game-dev status --short -- New-game-project-4 openspec/changes/koraku-rwd-contract-regression-gate
   openspec context --json
   openspec status --change koraku-rwd-contract-regression-gate --json
   openspec validate koraku-rwd-contract-regression-gate --strict
   ```

4. 驗證上節的 bundle／responsive／approved manifest／golden hashes未改；不要因 source fingerprint 變動而更新 golden。
5. 確認沒有殘留 runner：

   ```powershell
   Get-CimInstance Win32_Process |
     Where-Object { $_.CommandLine -match 'run-rwd-repeat\.mjs|run-rwd-full\.mjs|playwright\.rwd\.config\.js' }
   ```

6. 直接從頭啟動：

   ```powershell
   npm run test:rwd:repeat
   ```

   不需要先刪除任何 temp evidence。不要使用 retry、filter、skip 或更新 snapshots。

7. 若失敗：保留完整 evidence root，讓 Repeat 非零；先分類產品缺陷／測試工具缺陷／環境缺口。只做根因修正，三引擎 targeted 驗證後仍必須再從頭跑新的 Smoke3／Full2。
8. 若 PASS：檢查 `repeat-summary.json`：
   - status `passed`
   - Smoke 3 次 code 0，三個不同 evidence roots
   - Full 2 次 code 0，兩個不同 evidence roots
   - retries 0
   - issues 空陣列
9. 檢查兩個 `full-summary.json`：
   - required 2,286、executed 2,286
   - 29/29 子批次成功
   - issues 空陣列
   - `fullRwdAcceptance:true`
   - Chromium／Firefox／WebKit版本、OS、DPR與 capability 限制有記錄
10. 重新驗證 product／golden hashes；確保沒有自動 baseline 更新。
11. 更新 OpenSpec tasks 5.8、6.3 與 final evidence；完成繁中 task 6.5 交付報告。同步更新 `docs/ui/rwd-testing.md`、`docs/ui/rwd-regression-log.md` 和 scope-status。清楚保留：
    - Firefox／WebKit native touch-pan 未驗證。
    - WebKit 不是實機 Safari／iPad。
    - browser zoom、OS font scaling、software keyboard、real safe area／real devices 未驗證。
12. 停止並請使用者決定 2.10、3.3 與 task 4.7。未授權前不要升版、commit、push 或部署。

## 9. OpenSpec 尚未完成項目

目前 tasks 進度仍為 35/41：

- `2.10` — `EXCLUDED_BY_CURRENT_AUTHORITY`
  - 是否在本遊戲 `AGENTS.md` 加最小英文治理入口，尚未授權。
- `3.3` — `HISTORICAL_SEQUENCE_UNSATISFIED`
  - 候選、人審、golden 已完成，但「第一個產品修改前重新執行並凍結」不能事後補做；需人類決定 waived／superseded／另案。
- `4.7` — `EXPLICITLY_EXCLUDED`
  - 正式契約／handover／wiki 同步、升版與 cache 更新尚未授權。
- `5.8` — `SPLIT_EVIDENCE_APPROVED_FULL_PENDING`
  - 需修正後完整三引擎 Full 成功證據。
- `6.3` — `REPEAT_READY_WAITING_FOR_FULL`
  - 需同一 final source 的 Smoke3／Full2 全綠、零 retry。
- `6.5` — `PARTIAL_HANDOFF_ONLY`
  - 需最終繁中結果、限制、證據、範圍清理與未授權發布分流報告。

不要將 OpenSpec CLI 的 planning artifacts `isComplete:true` 誤解為 implementation tasks 已全部完成；它只表示 proposal／spec／design／tasks 文件齊備。

## 10. 最終完成前的三道人工授權門

1. Full2 全綠後：請使用者授權 task 4.7、正式文件同步與 APP_VERSION／cache 升版。
2. 4.7 與本地最終測試完成後：請使用者授權 project-only commit。
3. commit 範圍確認後：請使用者另行授權 push 與 GitHub Pages／`koraku.app` 部署。

任何一關未獲明確授權都必須停止；「準備發布」不等於已獲 commit、push 或 deploy 權限。


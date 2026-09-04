# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\rwd\smoke-complement.spec.js >> RWD-G017.smoke-complement.overlay-cheat-auth.w390h844 >> [RWD-G017.smoke-complement.overlay-cheat-auth.w390h844] @smoke-complement
- Location: e2e\rwd\smoke-complement.spec.js:213:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#cheat-auth-modal')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#cheat-auth-modal')
    14 × locator resolved to <div hidden="" aria-hidden="true" id="cheat-auth-modal" class="modal-overlay">…</div>
       - unexpected value "hidden"

```

```yaml
- banner:
  - button "首頁":
    - text: 狐
    - strong: 狐樂・絆之勝負
  - combobox "切換語系":
    - option "繁體中文" [selected]
    - option "简体中文"
    - option "English"
    - option "日本語"
  - text: 離線模式 Lv.01 ✦0
  - button "靜音背景音樂":
    - img
  - button "靜音遊戲音效":
    - img
- main:
  - region "狐樂・絆之勝負 Endless Koraku":
    - paragraph: じゃんけん・狐火異聞
    - heading "狐樂・絆之勝負 Endless Koraku" [level=1]:
      - text: 狐樂・絆之勝負
      - emphasis: Endless Koraku
    - paragraph: 五秒定一手。看穿她的指尖，在敗勢裡抓住唯一的反擊。
    - navigation "主選單":
      - button "01 開始對局 STORY BATTLE ›"
      - button "02 能力成長 PLAYER GROWTH ›"
      - button "03 玩家裝備 EQUIPMENT & BAG ›"
      - button "04 緣側商店 ITEM SHOP ›"
      - button "05 戰績統計 RECORDS & STATS ›"
      - button "06 狐娘圖鑑 ILLUSTRATION GALLERY ›"
      - button "07 遊戲指南 HOW TO PLAY ›"
      - button "08 修練道場 QTE & SANDBOX ›"
    - text: 勝 0 敗 0 最深章節 —
    - button "測試調試 / 作弊選單"
    - button "存檔紀錄"
    - button "查看更新日誌": 0.0.33
    - text: /
    - link "Endless Alice":
      - /url: https://store.steampowered.com/app/1425000
    - text: /
    - link "Discord":
      - /url: https://discord.gg/fJFXdPPT5y
    - img "狐娘小樂的預設造型"
    - text: 小樂
    - paragraph: 準備好了嗎？這次可別把視線移開喔。
- banner:
  - heading "測試調試 / 作弊選單" [level=3]
  - button "×"
- button "解鎖所有關卡"
- button "解鎖所有圖鑑"
- button "滿級 + 99999 星砂 + 100 SP"
- text: 等級
- spinbutton "等級": "1"
- text: 經驗
- spinbutton "經驗": "0"
- text: 未分配點數 (SP)
- spinbutton "未分配點數 (SP)": "0"
- text: 星砂
- spinbutton "星砂": "0"
- text: 生命
- spinbutton "生命": "0"
- text: 魔力
- spinbutton "魔力": "0"
- text: 攻擊
- spinbutton "攻擊": "0"
- text: 摸摸
- spinbutton "摸摸": "0"
- text: 雙手解放
- spinbutton "雙手解放": "0"
- text: 緋露藥
- spinbutton "緋露藥": "1"
- text: 蒼月露
- spinbutton "蒼月露": "0"
- button "套用數值變更"
- status
- group: DEV
```

# Test source

```ts
  66  | }
  67  | 
  68  | async function postCase(page, appUrl, item) {
  69  |   const prepared = await prepareState(page, appUrl, "battle-single");
  70  |   await settleFiniteLayout(page, "#screen-battle");
  71  |   const appearance = await page.locator("#battle-character").getAttribute("src");
  72  |   if (item.state === "settlement") {
  73  |     await page.evaluate(state => window.__KORAKU_DEBUG__.bus.emit("postbattle:state", state), postState(appearance));
  74  |     await expect(page.locator("#result-overlay")).toHaveClass(/is-active/);
  75  |     await settleFiniteLayout(page, "#result-overlay");
  76  |     const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
  77  |       { selector: "#result-overlay" }, { selector: ".result-card" },
  78  |       { selector: '#postbattle-actions button[data-post-action="home"]', hitTest: true, text: true }
  79  |     ] });
  80  |     expect(audit.violations).toEqual([]);
  81  |     await page.locator('#postbattle-actions button[data-post-action="home"]').click();
  82  |     await expect(page.locator("#app")).toHaveAttribute("data-screen", "home");
  83  |     return { prepared, audit, result: await readAppState(page) };
  84  |   }
  85  |   await page.evaluate(({ appearance }) => {
  86  |     const debug = window.__KORAKU_DEBUG__;
  87  |     debug.battle.autoBattle.active = true;
  88  |     debug.battle.autoBattle.isPaused = false;
  89  |     debug.bus.emit("postbattle:auto-watermelon", {
  90  |       stock: 2, scene: "watermelonAim", appearance, target: 0.5, tolerance: 0.13,
  91  |       watermelon: { attempts: 0, maxAttempts: 3, successes: 0, lastCutSuccess: false }
  92  |     });
  93  |   }, { appearance });
  94  |   await expect(page.locator("#floating-autobattle-watermelon")).toBeVisible();
  95  |   await settleFiniteLayout(page, "#floating-autobattle-watermelon");
  96  |   const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
  97  |     { selector: "#floating-autobattle-watermelon" },
  98  |     { selector: "#btn-auto-watermelon-strike", hitTest: true, text: true },
  99  |     { selector: "#btn-close-floating-watermelon", hitTest: true }
  100 |   ] });
  101 |   expect(audit.violations).toEqual([]);
  102 |   await page.locator("#btn-close-floating-watermelon").click();
  103 |   await expect(page.locator("#floating-autobattle-watermelon")).toBeHidden();
  104 |   return { prepared, audit, result: await readAppState(page) };
  105 | }
  106 | 
  107 | async function scrollInnerEnd(page, selector, input) {
  108 |   const before = await scrollSnapshot(page, selector);
  109 |   if (before.scrollHeight <= before.clientHeight) return { before, after: before };
  110 |   const inputEvidence = [];
  111 |   if (input === "mouse-keyboard") {
  112 |     const audit = await auditScrollEnd(page, selector, `${selector} > :last-child`);
  113 |     expect(audit.violations).toEqual([]);
  114 |     return { before, after: audit.after, inputEvidence: [{ method: "mouse-wheel", trusted: true, nativeTouchPan: false }] };
  115 |   }
  116 |   for (let index = 0; index < 30; index++) {
  117 |     const current = await scrollSnapshot(page, selector);
  118 |     if (current.scrollTop >= current.scrollHeight - current.clientHeight - 1) break;
  119 |     inputEvidence.push(await touchDrag(page, selector, 0, -300, "content-pan"));
  120 |   }
  121 |   const after = await scrollSnapshot(page, selector);
  122 |   expect(after.scrollTop).toBeGreaterThanOrEqual(after.scrollHeight - after.clientHeight - 1);
  123 |   return { before, after, inputEvidence };
  124 | }
  125 | 
  126 | async function overlayCase(page, appUrl, item) {
  127 |   let environment;
  128 |   let modal;
  129 |   let close;
  130 |   let inner = null;
  131 |   if (item.state === "pause") {
  132 |     const prepared = await prepareState(page, appUrl, "pause-overlay");
  133 |     environment = prepared.environment;
  134 |     modal = "#battle-pause-modal";
  135 |     close = "#btn-resume-battle";
  136 |   } else {
  137 |     environment = await openApp(page, appUrl);
  138 |     if (item.state === "auto") {
  139 |       await page.evaluate(() => {
  140 |         const debug = window.__KORAKU_DEBUG__;
  141 |         const records = debug.store.state.records;
  142 |         records.clearedStages = [...new Set([...(records.clearedStages || []), 1])];
  143 |         records.wins = Math.max(1, records.wins || 0);
  144 |         records.manualWins = Math.max(1, records.manualWins || 0);
  145 |         records.stageStats ||= {};
  146 |         records.stageStats[1] = { ...(records.stageStats[1] || {}), totalAttempts: 1, manualWins: 1, manualLosses: 0, autoWins: 0, autoLosses: 0 };
  147 |         debug.store.commit("rwd-auto-overlay-cleared");
  148 |         debug.view.openAutoBattleModal(1);
  149 |       });
  150 |       modal = "#auto-battle-modal"; close = "#btn-cancel-autobattle";
  151 |     } else if (item.state === "dojo") {
  152 |       await page.locator("#btn-menu-dojo").click(); modal = "#dojo-modal"; close = "#close-dojo-modal";
  153 |     } else if (item.state === "save") {
  154 |       await page.locator("#open-save-record-modal").click(); modal = "#save-record-modal"; close = "#close-save-record-modal"; inner = ".save-record-content";
  155 |     } else if (item.state === "cheat-auth") {
  156 |       await page.locator("#open-cheat-modal").click(); modal = "#cheat-auth-modal"; close = "#close-cheat-auth-modal";
  157 |     } else if (item.state === "cheat-menu") {
  158 |       await page.locator("#open-cheat-modal").click();
  159 |       await page.locator("#cheat-auth-password").fill("8989");
  160 |       await page.locator("#cheat-auth-form").press("Enter");
  161 |       modal = "#cheat-modal"; close = "#close-cheat-modal";
  162 |     } else {
  163 |       await page.locator("#footer-app-version-btn, #footer-app-version").first().click(); modal = "#changelog-modal"; close = "#btn-close-changelog"; inner = "#changelog-modal-list";
  164 |     }
  165 |   }
> 166 |   await expect(page.locator(modal)).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
  167 |   await settleFiniteLayout(page, modal);
  168 |   const scroll = inner ? await scrollInnerEnd(page, inner, item.input) : null;
  169 |   const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
  170 |     { selector: modal }, { selector: `${modal} .modal-card` }, { selector: close, hitTest: true, text: true }
  171 |   ] });
  172 |   expect(audit.violations).toEqual([]);
  173 |   await page.locator(close).click();
  174 |   await expect(page.locator(modal)).toBeHidden();
  175 |   return { environment, modal, close, scroll, audit, result: await readAppState(page) };
  176 | }
  177 | 
  178 | async function galleryOpenCase(page, appUrl, item) {
  179 |   const environment = await openApp(page, appUrl);
  180 |   await page.evaluate(() => {
  181 |     const debug = window.__KORAKU_DEBUG__;
  182 |     debug.store.state.records.unlockedGalleryAll = true;
  183 |     debug.store.commit("rwd-gallery-open");
  184 |   });
  185 |   await page.locator('#screen-home button[data-nav="gallery"]').click();
  186 |   await expect(page.locator("#app")).toHaveAttribute("data-screen", "gallery");
  187 |   await settleFiniteLayout(page, "#screen-gallery");
  188 |   if (item.input !== "mouse-keyboard") {
  189 |     const popupPromise = page.waitForEvent("popup");
  190 |     await page.locator("#btn-gallery-zoom").click();
  191 |     const popup = await popupPromise;
  192 |     await popup.waitForLoadState("load");
  193 |     const popupUrl = popup.url();
  194 |     expect(popupUrl).toMatch(/\/koraku\//);
  195 |     await popup.close();
  196 |     return { environment, branch: "touch-new-tab", popupUrl };
  197 |   }
  198 |   await page.locator("#btn-gallery-zoom").click();
  199 |   await expect(page.locator("#gallery-lightbox-modal")).toBeVisible();
  200 |   await settleFiniteLayout(page, "#gallery-lightbox-modal");
  201 |   const audit = await page.evaluate(auditLayout, { documentOverflow: true, elements: [
  202 |     { selector: "#gallery-lightbox-modal" }, { selector: "#gallery-lightbox-image" }, { selector: "#btn-close-lightbox", hitTest: true }
  203 |   ] });
  204 |   expect(audit.violations).toEqual([]);
  205 |   await page.locator("#btn-close-lightbox").click();
  206 |   await expect(page.locator("#gallery-lightbox-modal")).toBeHidden();
  207 |   return { environment, branch: "desktop-lightbox", audit };
  208 | }
  209 | 
  210 | for (const item of requiredCases("smoke-complement")) {
  211 |   test.describe(item.id, () => {
  212 |     test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input !== "mouse-keyboard" });
  213 |     test(`[${item.id}] @smoke-complement`, async ({ page, appUrl }, testInfo) => {
  214 |       const evidence = item.kind === "home-footer" ? await homeFooter(page, appUrl, item)
  215 |         : item.kind === "content-end" ? await contentEnd(page, appUrl, item)
  216 |         : item.kind === "battle" ? await battleCase(page, appUrl, item)
  217 |         : item.kind === "post" ? await postCase(page, appUrl, item)
  218 |         : item.kind === "gallery-open" ? await galleryOpenCase(page, appUrl, item)
  219 |         : await overlayCase(page, appUrl, item);
  220 |       await attachJson(testInfo, "smoke-complement-evidence", { contract: item, evidence, evidenceLevel: "browser-emulated", fullRwdAcceptance: false });
  221 |     });
  222 |   });
  223 | }
  224 | 
```
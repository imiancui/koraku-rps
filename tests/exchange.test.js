import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { I18n, I18nService, LOCALES, LOCALE_ORDER } from "../src/js/services/I18n.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

test("實體獎勵兌換：圖資資產完整性驗證 (WebP & PNG)", () => {
  const pngPath = path.join(ROOT_DIR, "koraku", "小樂抱枕產品圖.png");
  const webpPath = path.join(ROOT_DIR, "koraku", "小樂抱枕產品圖.webp");

  assert.ok(fs.existsSync(pngPath), "小樂抱枕產品圖.png 應存在於 koraku/ 目錄下");
  assert.ok(fs.existsSync(webpPath), "小樂抱枕產品圖.webp 應存在於 koraku/ 目錄下");

  const pngStats = fs.statSync(pngPath);
  const webpStats = fs.statSync(webpPath);
  assert.ok(pngStats.size > 1000000, "PNG 原圖應保留高畫質大檔");
  assert.ok(webpStats.size > 50000 && webpStats.size < 500000, "WebP 圖檔應具備優異壓縮比 (約 100~300KB)");
});

test("實體獎勵兌換：index.html 導航按鈕與頁面結構驗證", () => {
  const htmlPath = path.join(ROOT_DIR, "index.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  // 主選單 09 特典商店
  assert.ok(html.includes('data-nav="exchange"'), "主選單應包含 data-nav='exchange'");
  assert.ok(html.includes('<span class="command-index">09</span>'), "主選單應包含 09 編號");
  assert.ok(html.includes('data-i18n="ui.menuExchange"'), "主選單應綁定 ui.menuExchange");
  assert.ok(html.includes('id="btn-menu-exchange"'), "主選單按鈕應包含 id='btn-menu-exchange'");
  assert.ok(html.includes('menu-command-special'), "主選單 09 按鈕應包含專屬深紅底色 class 'menu-command-special'");

  // 緣側商店不應放置實體特典兌換按鈕
  assert.equal(html.includes('class="shop-exchange-link-btn"'), false, "緣側商店不應包含實體特典兌換按鈕");

  // screen-exchange 結構
  assert.ok(html.includes('id="screen-exchange"'), "應包含 id='screen-exchange' 區塊");
  assert.ok(html.includes('id="exchange-title"'), "應包含 id='exchange-title'");
  assert.ok(html.includes('id="exchange-coins"'), "應包含 id='exchange-coins' 星砂顯示");
  assert.ok(html.includes('id="exchange-player-coins"'), "應包含 id='exchange-player-coins' 玩家餘額");
  assert.ok(html.includes('id="exchange-product-img"'), "應包含小樂抱枕產品圖元素");
  assert.ok(html.includes('小樂抱枕產品圖.webp'), "應載入小樂抱枕產品圖.webp");
  assert.ok(html.includes('小樂抱枕產品圖.png'), "應載入小樂抱枕產品圖.png");

  // 1000000 星砂定價
  assert.ok(html.includes("1,000,000"), "兌換定價應清楚標示 1,000,000 星砂");

  // 兌換按鈕呈灰色禁用狀態
  assert.ok(html.includes('id="btn-exchange-redeem"'), "應包含兌換按鈕 id='btn-exchange-redeem'");
  assert.ok(html.includes('button-exchange disabled') || html.includes('button-exchange is-disabled') || html.includes('class="button-exchange disabled"'), "按鈕應具有 disabled 樣式 class");
  assert.ok(html.includes('disabled aria-disabled="true"'), "按鈕應具有 disabled 與 aria-disabled='true' 屬性");

  // 旁邊寫上註釋：「尚未開放兌換，敬請期待！」
  assert.ok(html.includes("尚未開放兌換，敬請期待！"), "應包含「尚未開放兌換，敬請期待！」註釋文字");
  assert.ok(html.includes('data-i18n="ui.exchangeNotOpenNotice"'), "註釋應綁定 ui.exchangeNotOpenNotice");
});

test("實體獎勵兌換：09 按鈕深紅底色與金色文字樣式驗證", () => {
  const cssPath = path.join(ROOT_DIR, "src", "styles", "screens.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // 驗證 09 特典商店深紅色底色
  assert.ok(css.includes(".menu-command.menu-command-special"), "應包含 .menu-command.menu-command-special 樣式規則");
  assert.ok(css.includes("#btn-menu-exchange"), "應包含 #btn-menu-exchange 樣式規則");
  assert.ok(css.includes("rgba(128, 18, 34"), "09 按鈕底色應包含神社深紅色調 (crimson)");

  // 驗證金色文字風格
  assert.ok(css.includes("#ffd88a") || css.includes("#ffe6a3"), "09 按鈕文字應包含金色系高光與陰影");
});

test("實體獎勵兌換：四國語系在地化詞條完整性與正確性驗證", () => {
  const i18n = new I18nService();
  const requiredKeys = [
    "ui.menuExchange",
    "ui.menuExchangeSub",
    "ui.navExchange",
    "ui.exchangeTitle",
    "ui.exchangeSubtitle",
    "ui.exchangePrizeTitle",
    "ui.exchangePrizeBadge",
    "ui.exchangePrizeDesc",
    "ui.exchangePrizeSpecs",
    "ui.exchangePrizeDelivery",
    "ui.exchangeCost",
    "ui.exchangePlayerBalance",
    "ui.exchangeBtn",
    "ui.exchangeNotOpenNotice",
    "ui.pillow3DView",
    "ui.pillowFrontSide",
    "ui.pillowBackSide",
    "ui.pillowDesignGallery",
    "ui.pillowProductPreview",
    "ui.pillowResetBtn",
    "ui.pillowZoomIn"
  ];

  for (const locale of LOCALE_ORDER) {
    i18n.setLocale(locale);
    for (const key of requiredKeys) {
      const val = i18n.t(key);
      assert.ok(val && val.length > 0, `語系 ${locale} 缺少詞條 ${key}`);
      assert.notEqual(val, key, `語系 ${locale} 詞條 ${key} 不得為回退 key`);
    }
  }

  // 繁體中文與簡體中文精確比對
  i18n.setLocale("zh-Hant");
  assert.equal(i18n.t("ui.menuExchange"), "特典商店");
  assert.equal(i18n.t("ui.exchangeTitle"), "特典商店");
  assert.equal(i18n.t("ui.exchangeNotOpenNotice"), "尚未開放兌換，敬請期待！");
  assert.equal(i18n.t("ui.exchangePrizeTitle"), "小樂等身抱枕（雙面）");
  assert.equal(i18n.t("ui.pillow3DView"), "抱枕鑑賞");

  i18n.setLocale("zh-Hans");
  assert.equal(i18n.t("ui.menuExchange"), "特典商店");
  assert.equal(i18n.t("ui.exchangeTitle"), "特典商店");
  assert.equal(i18n.t("ui.exchangeNotOpenNotice"), "尚未开放兑换，敬请期待！");
  assert.equal(i18n.t("ui.exchangePrizeTitle"), "小乐等身抱枕（双面）");
  assert.equal(i18n.t("ui.pillow3DView"), "抱枕鉴赏");

  i18n.setLocale("en");
  assert.equal(i18n.t("ui.menuExchange"), "Special Shop");
  assert.equal(i18n.t("ui.exchangeTitle"), "Special Shop");

  i18n.setLocale("ja");
  assert.equal(i18n.t("ui.menuExchange"), "特典商店");
  assert.equal(i18n.t("ui.exchangeTitle"), "特典商店");
  assert.equal(i18n.t("ui.pillow3DView"), "抱き枕鑑賞");
});

test("實體獎勵兌換：3D WebGL 模組、貼圖與打包編譯驗證", () => {
  const viewerPath = path.join(ROOT_DIR, "src", "js", "ui", "Pillow3DViewer.js");
  const texturePath = path.join(ROOT_DIR, "koraku", "pillow-texture.jpg");
  const bundlePath = path.join(ROOT_DIR, "src", "js", "bundle.js");

  assert.ok(fs.existsSync(viewerPath), "Pillow3DViewer.js 模組應存在");
  assert.ok(fs.existsSync(texturePath), "pillow-texture.jpg 應存在於 koraku/ 下");

  const webpTexturePath = path.join(ROOT_DIR, "koraku", "pillow-texture.webp");
  assert.ok(fs.existsSync(webpTexturePath), "pillow-texture.webp 應存在於 koraku/ 下");

  const textureStats = fs.statSync(texturePath);
  assert.ok(textureStats.size > 100000, "3D 貼圖應具備足夠解析度 (>= 100KB)");
  const webpStats = fs.statSync(webpTexturePath);
  assert.ok(webpStats.size > 100000, "WebP 3D 貼圖應具備足夠解析度 (>= 100KB)");

  const bundle = fs.readFileSync(bundlePath, "utf-8");
  assert.ok(bundle.includes("Pillow3DViewer"), "bundle.js 應打包 Pillow3DViewer");
  assert.ok(bundle.includes("buildPillowMesh"), "bundle.js 應包含抱枕曲面幾何體建構演算法");
});

test("實體獎勵兌換：3D 舞台結構、正反面切換與彈窗鑑賞 DOM 驗證", () => {
  const htmlPath = path.join(ROOT_DIR, "index.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  // 3D 畫布與舞台控制元素
  assert.ok(html.includes('id="exchange-canvas"'), "應包含 3D WebGL 畫布 id='exchange-canvas'");
  assert.ok(html.includes('id="exchange-3d-state"'), "應包含即時狀態標籤 id='exchange-3d-state'");
  assert.ok(html.includes('id="exchange-loading"'), "應包含載入中提示 id='exchange-loading'");
  assert.ok(html.includes('id="btn-exchange-reset"'), "應包含恢復原位按鈕 id='btn-exchange-reset'");

  // 01~04 主選單按鈕
  assert.ok(html.includes('id="btn-pillow-front"'), "應包含正面切換按鈕 id='btn-pillow-front'");
  assert.ok(html.includes('id="btn-pillow-back"'), "應包含背面切換按鈕 id='btn-pillow-back'");
  assert.ok(html.includes('id="btn-pillow-design"'), "應包含 2D 設計圖按鈕 id='btn-pillow-design'");
  assert.ok(html.includes('id="btn-pillow-product"'), "應包含產品示意圖按鈕 id='btn-pillow-product'");

  // 彈窗預覽對話框
  assert.ok(html.includes('id="exchange-preview-dialog"'), "應包含預覽彈窗 id='exchange-preview-dialog'");
  assert.ok(html.includes('id="btn-exchange-dialog-close"'), "應包含關閉按鈕 id='btn-exchange-dialog-close'");
  assert.ok(html.includes('id="btn-exchange-zoom"'), "應包含放大鑑賞切換按鈕 id='btn-exchange-zoom'");
});

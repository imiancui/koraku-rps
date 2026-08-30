import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import {
  STAGES,
  EQUIPMENT_ITEMS,
  ITEMS,
  SKILLS,
  DIRECTIONS,
  GALLERY_ITEMS,
  STAT_GAINS,
  BASE_PLAYER,
  BATTLE_RULES
} from "../src/js/config/gameConfig.js";
import { I18n } from "../src/js/services/I18n.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "game_specs.xlsx");

// Helper to escape XML special characters
function escapeXml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Convert column index (0-based) to Excel column letter (A, B, ..., Z, AA, etc.)
function colToLetter(colIndex) {
  let temp = colIndex;
  let letter = "";
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

// Simple ZIP file generator using Node.js built-in zlib
class SimpleZip {
  constructor() {
    this.files = [];
  }

  addFile(fileName, content) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const compressed = zlib.deflateRawSync(data);
    this.files.push({
      fileName,
      data,
      compressed,
      crc: crc32(data),
      offset: 0
    });
  }

  generate() {
    const localHeaders = [];
    let currentOffset = 0;

    for (const file of this.files) {
      file.offset = currentOffset;
      const fileNameBuffer = Buffer.from(file.fileName, "utf8");

      const header = Buffer.alloc(30);
      header.writeUInt32LE(0x04034b50, 0); // Local file header signature
      header.writeUInt16LE(20, 4);         // Version needed to extract
      header.writeUInt16LE(0, 6);          // General purpose bit flag
      header.writeUInt16LE(8, 8);          // Compression method (8 = deflate)
      header.writeUInt16LE(0, 10);         // Last mod file time
      header.writeUInt16LE(0, 12);         // Last mod file date
      header.writeUInt32LE(file.crc, 14);  // CRC-32
      header.writeUInt32LE(file.compressed.length, 18); // Compressed size
      header.writeUInt32LE(file.data.length, 22);       // Uncompressed size
      header.writeUInt16LE(fileNameBuffer.length, 26);  // File name length
      header.writeUInt16LE(0, 28);                      // Extra field length

      const entry = Buffer.concat([header, fileNameBuffer, file.compressed]);
      localHeaders.push(entry);
      currentOffset += entry.length;
    }

    const centralDirHeaders = [];
    let centralDirSize = 0;
    const centralDirStart = currentOffset;

    for (const file of this.files) {
      const fileNameBuffer = Buffer.from(file.fileName, "utf8");
      const cdHeader = Buffer.alloc(46);

      cdHeader.writeUInt32LE(0x02014b50, 0); // Central directory signature
      cdHeader.writeUInt16LE(20, 4);         // Version made by
      cdHeader.writeUInt16LE(20, 6);         // Version needed to extract
      cdHeader.writeUInt16LE(0, 8);          // General purpose bit flag
      cdHeader.writeUInt16LE(8, 10);         // Compression method
      cdHeader.writeUInt16LE(0, 12);         // Last mod time
      cdHeader.writeUInt16LE(0, 14);         // Last mod date
      cdHeader.writeUInt32LE(file.crc, 16);  // CRC-32
      cdHeader.writeUInt32LE(file.compressed.length, 20); // Compressed size
      cdHeader.writeUInt32LE(file.data.length, 24);       // Uncompressed size
      cdHeader.writeUInt16LE(fileNameBuffer.length, 28);  // File name length
      cdHeader.writeUInt16LE(0, 30);                      // Extra field length
      cdHeader.writeUInt16LE(0, 32);                      // File comment length
      cdHeader.writeUInt16LE(0, 34);                      // Disk number start
      cdHeader.writeUInt16LE(0, 36);                      // Internal file attributes
      cdHeader.writeUInt32LE(0, 38);                      // External file attributes
      cdHeader.writeUInt32LE(file.offset, 42);            // Relative offset of local header

      const cdEntry = Buffer.concat([cdHeader, fileNameBuffer]);
      centralDirHeaders.push(cdEntry);
      centralDirSize += cdEntry.length;
    }

    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); // End of central dir signature
    eocd.writeUInt16LE(0, 4);          // Number of this disk
    eocd.writeUInt16LE(0, 6);          // Disk where central dir starts
    eocd.writeUInt16LE(this.files.length, 8);  // Number of central dir records on this disk
    eocd.writeUInt16LE(this.files.length, 10); // Total number of central dir records
    eocd.writeUInt32LE(centralDirSize, 12);     // Size of central dir
    eocd.writeUInt32LE(centralDirStart, 16);    // Offset of start of central dir
    eocd.writeUInt16LE(0, 20);                 // Comment length

    return Buffer.concat([...localHeaders, ...centralDirHeaders, eocd]);
  }
}

// CRC32 implementation
function crc32(buffer) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buffer.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buffer[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const CRC_TABLE = new Int32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  CRC_TABLE[i] = c;
}

// Generate Sheet XML from 2D array
function buildSheetXml(data) {
  let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
  xml += `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">\n`;
  xml += `  <sheetData>\n`;

  for (let r = 0; r < data.length; r++) {
    const row = data[r];
    const rowNum = r + 1;
    xml += `    <row r="${rowNum}">\n`;
    for (let c = 0; c < row.length; c++) {
      const val = row[c];
      const cellRef = `${colToLetter(c)}${rowNum}`;
      if (typeof val === "number") {
        xml += `      <c r="${cellRef}" t="n"><v>${val}</v></c>\n`;
      } else {
        xml += `      <c r="${cellRef}" t="inlineStr"><is><t>${escapeXml(val)}</t></is></c>\n`;
      }
    }
    xml += `    </row>\n`;
  }

  xml += `  </sheetData>\n`;
  xml += `</worksheet>`;
  return xml;
}

// Compile sheets
const sheets = [];

// Sheet 1: 關卡與Boss (Stages & Bosses)
const stageRows = [
  ["關卡ID", "章節", "關卡名稱", "副標題", "Boss HP", "解鎖等級", "倒數秒數", "變拳窗口(ms)", "QTE方向", "QTE長度", "容錯次數", "摸摸閃避率", "敵傷倍率", "勝場EXP", "敗場EXP", "勝場星砂", "敗場星砂", "雙Boss機制", "規則摘要"]
];
for (const s of STAGES) {
  stageRows.push([
    s.id,
    s.chapter,
    s.name,
    s.subtitle,
    s.enemyHp,
    s.requiredLevel,
    s.roundSeconds,
    s.reactionWindowMs,
    s.qteDirections,
    s.qteLength,
    s.maxErrors === Infinity ? "無限制" : s.maxErrors,
    `${Math.round((s.momoDodgeRate || 0) * 100)}%`,
    s.enemyDamageMultiplier,
    s.xpWin,
    s.xpLoss,
    s.winCoins,
    s.lossCoins,
    s.dualEnemy ? "是" : "否",
    s.bossRuleDetail
  ]);
}
sheets.push({ name: "關卡與Boss", data: stageRows });

// Sheet 2: 裝備武具一覽 (Equipment)
const equipRows = [
  ["道具ID", "武具名稱", "部位", "是否雙手", "稀有度", "價格(星砂)", "加成生命(HP)", "加成魔力(MP)", "加成攻擊(ATK)", "特效類型", "特效參數", "道具說明"]
];
for (const [id, item] of Object.entries(EQUIPMENT_ITEMS)) {
  const effectDesc = item.effect ? JSON.stringify(item.effect) : "無";
  equipRows.push([
    id,
    item.name,
    item.slotType,
    item.twoHanded ? "是" : "否",
    item.rarity,
    item.price,
    item.stats?.hp || 0,
    item.stats?.mp || 0,
    item.stats?.damage || 0,
    item.effect?.type || "none",
    effectDesc,
    item.description
  ]);
}
sheets.push({ name: "裝備武具一覽", data: equipRows });

// Sheet 3: 消耗道具一覽 (Consumables)
const itemRows = [
  ["道具ID", "名稱", "簡稱", "圖示", "價格(星砂)", "回復資源", "基礎回復量", "神靈腰帶加成後回復"]
];
for (const [id, item] of Object.entries(ITEMS)) {
  itemRows.push([
    id,
    item.name,
    item.shortName,
    item.glyph,
    item.price,
    item.resource.toUpperCase(),
    item.restore,
    item.restore + 10
  ]);
}
sheets.push({ name: "道具與藥水", data: itemRows });

// Sheet 4: 技能與助手 (Skills & Momo)
const skillRows = [
  ["技能代碼", "技能名稱", "符號", "解鎖等級", "最大等級", "每級SP消耗", "基礎傷害", "每級機率/效果", "詳細機制說明"]
];
for (const [code, sk] of Object.entries(SKILLS)) {
  skillRows.push([
    sk.code,
    sk.name,
    sk.glyph,
    sk.unlockLevel,
    sk.maxLevel,
    sk.costPerLevel,
    sk.damage || "—",
    sk.chancePerLevel ? `+${Math.round(sk.chancePerLevel * 100)}% / 級` : "雙手獨立出拳",
    sk.description
  ]);
}
sheets.push({ name: "技能與助手", data: skillRows });

// Sheet 5: 戰鬥與QTE規則 (Combat & QTE Rules)
const qteRows = [
  ["方向名稱", "方向代碼", "符號", "單鍵快速鍵", "方向鍵", "數字鍵盤", "雙鍵組合鍵合成 (Chords)"]
];
for (const d of DIRECTIONS) {
  let chord = "—";
  if (d.id === "upLeft") chord = "W+A / ↑+←";
  if (d.id === "upRight") chord = "W+D / ↑+→";
  if (d.id === "downLeft") chord = "S+A / ↓+←";
  if (d.id === "downRight") chord = "S+D / ↓+→";
  qteRows.push([
    d.label,
    d.id,
    d.glyph,
    d.keys[0].toUpperCase(),
    d.keys.find(k => k.startsWith("arrow")) || "—",
    d.keys.find(k => /^[0-9]$/.test(k)) || "—",
    chord
  ]);
}
sheets.push({ name: "戰鬥與QTE規則", data: qteRows });

// Sheet 6: 成長與數值公式 (Progression & Formulas)
const progRows = [
  ["等級", "升級所需EXP", "累計所需EXP", "累計獲得SP", "基礎生命(HP)", "基礎魔力(MP)", "基礎攻擊力(ATK)", "配點每點增益"]
];
let cumulativeExp = 0;
for (let lvl = 1; lvl <= 15; lvl++) {
  const reqExp = 100 + Math.max(0, lvl - 1) * 75;
  cumulativeExp += reqExp;
  progRows.push([
    lvl,
    reqExp,
    cumulativeExp,
    (lvl - 1) * 5,
    BASE_PLAYER.maxHp,
    BASE_PLAYER.maxMp,
    BASE_PLAYER.damage,
    "HP +10, MP +10, ATK +5"
  ]);
}
sheets.push({ name: "成長與數值公式", data: progRows });

// Sheet 7: 切西瓜與圖鑑 (Minigame & Gallery)
const extraRows = [
  ["項目分類", "項目ID", "名稱", "規格/寬度/週期", "獎勵/條件", "描述說明"],
  ["切西瓜", "strike_1", "第 1 刀", "安全區 26.0% (容錯 0.13), 週期 1800ms", "命中結算 +100 EXP", "初始刀速與最大綠色判定區"],
  ["切西瓜", "strike_2", "第 2 刀", "安全區 13.0% (容錯 0.065), 週期 1440ms", "命中結算 +100 EXP", "難度提升，判定區縮小 50%，速度提升 25%"],
  ["切西瓜", "strike_3", "第 3 刀", "安全區 6.5% (容錯 0.0325), 週期 1152ms", "命中結算 +100 EXP", "極限挑戰，判定區再縮小 50%，速度再提升 25%"],
  ["切西瓜", "stock_accumulate", "自動刷關切西瓜累計", "勝場自動累積 +1 (上限 999 次)", "多輪連續挑戰", "自動刷關開啟獨立浮動面板，無全屏遮罩，隨時暫停/繼續，三階段重複挑戰"],
  ["圖鑑CG", "swimsuit_default", "夏日祭・清涼泳裝", "預設泳裝立繪", "通關第 1 關或觸發泳裝事件", "小樂難得換上的清涼泳裝"],
  ["圖鑑CG", "swimsuit_watermelon", "海風・切西瓜", "切西瓜差分立繪", "完成蒙眼切西瓜大挑戰", "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣"]
];
sheets.push({ name: "切西瓜與圖鑑", data: extraRows });

// Sheet 8: 存檔管理、作弊與除錯 (Saves, Cheats & Debug)
const cheatRows = [
  ["功能名稱", "觸發/操作方式", "格式/時間窗口", "支援參數/動作", "功能詳細說明"],
  ["存檔種子碼導出", "點擊首頁【💾 存檔紀錄】彈窗", "KORAKU1_<Base64UTF8JSON>", "一鍵複製種子碼", "將玩家當前等級、經驗、SP、星砂、12格裝備、背包、技能與戰績完整導出為字串"],
  ["存檔種子碼匯入", "貼上種子碼並點擊【載入並套用】", "驗證格式與合法性", "覆蓋當前存檔進度", "跨設備/瀏覽器轉移遊戲紀錄，自動寫入 localStorage 並刷新全域畫面"],
  ["重置存檔", "存檔紀錄彈窗底部【危險區域】", "彈出確認對話框", "清除全部資料回歸初始狀態", "清空等級、星砂、裝備、技能與戰績紀錄，回歸 Lv.1 初始角色"],
  ["秘密作弊面板", "連續按下 4 次數字鍵 8", "1000ms 滾動窗口", "主鍵區 8 或小鍵盤 8", "彈出作弊設定面板，可自訂全部存檔資料"],
  ["作弊密碼驗證", "首頁點擊【⚙️ 測試調試 / 作弊選單】", "輸入密碼 8989", "解鎖作弊選單", "防止誤觸，驗證成功後開啟作弊面板"],
  ["自訂屬性數值", "作弊面板輸入數值", "即時套用", "Level, XP, SP, Coins, Potions, Allocations, Skills", "任意修改玩家等級、金幣、藥水、點數分配與技能"],
  ["一鍵解鎖全關卡", "作弊面板點擊按鈕", "即時套用", "clearedStages: [1, 2, 3, 4]", "直接解鎖全 4 大章節關卡與 Boss 規則說明卡"],
  ["一鍵解鎖全圖鑑", "作弊面板點擊按鈕", "即時套用", "unlockedSwimsuit: true, unlockedGalleryAll: true", "立即解鎖全部泳裝與切西瓜立繪圖鑑"]
];
sheets.push({ name: "存檔與作弊管理", data: cheatRows });

// Sheet 9: 在地化字典摘要 (I18n Localization)
const i18nRows = [
  ["鍵路徑", "繁體中文 (zh-Hant)", "簡體中文 (zh-Hans)", "English (en)", "日本語 (ja)"]
];
const sampleKeys = [
  "nav.home", "nav.stages", "nav.shop", "nav.paperdoll", "nav.growth", "nav.gallery", "nav.records", "nav.guide",
  "hands.rock", "hands.paper", "hands.scissors",
  "dialogue.chant3", "dialogue.chant2", "dialogue.chant1", "dialogue.morphReaction",
  "ui.autoBattle", "ui.autoWatermelonStock", "ui.btnNextWatermelonRound", "ui.floatingWatermelonTitle",
  "ui.clearAll", "ui.equip", "ui.unequip", "ui.victory", "ui.defeat",
  "ui.saveRecord", "ui.saveRecordModalTitle", "ui.btnCopySaveSeed", "ui.btnImportSaveSeed", "ui.btnModalResetSave"
];
for (const key of sampleKeys) {
  i18nRows.push([
    key,
    I18n.t(key, { count: 5 }, "zh-Hant"),
    I18n.t(key, { count: 5 }, "zh-Hans"),
    I18n.t(key, { count: 5 }, "en"),
    I18n.t(key, { count: 5 }, "ja")
  ]);
}
sheets.push({ name: "在地化字典", data: i18nRows });

// Package into Excel OpenXML XLSX format
const zip = new SimpleZip();

// 1. [Content_Types].xml
let contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
contentTypesXml += `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n`;
contentTypesXml += `  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n`;
contentTypesXml += `  <Default Extension="xml" ContentType="application/xml"/>\n`;
contentTypesXml += `  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>\n`;
for (let i = 0; i < sheets.length; i++) {
  contentTypesXml += `  <Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>\n`;
}
contentTypesXml += `</Types>`;
zip.addFile("[Content_Types].xml", contentTypesXml);

// 2. _rels/.rels
let relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
relsXml += `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n`;
relsXml += `  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>\n`;
relsXml += `</Relationships>`;
zip.addFile("_rels/.rels", relsXml);

// 3. xl/workbook.xml & xl/_rels/workbook.xml.rels
let workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
workbookXml += `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n`;
workbookXml += `  <sheets>\n`;

let workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
workbookRelsXml += `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n`;

for (let i = 0; i < sheets.length; i++) {
  const sheetNum = i + 1;
  workbookXml += `    <sheet name="${escapeXml(sheets[i].name)}" sheetId="${sheetNum}" r:id="rId${sheetNum}"/>\n`;
  workbookRelsXml += `  <Relationship Id="rId${sheetNum}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${sheetNum}.xml"/>\n`;
  zip.addFile(`xl/worksheets/sheet${sheetNum}.xml`, buildSheetXml(sheets[i].data));
}

workbookXml += `  </sheets>\n</workbook>`;
workbookRelsXml += `</Relationships>`;

zip.addFile("xl/workbook.xml", workbookXml);
zip.addFile("xl/_rels/workbook.xml.rels", workbookRelsXml);

// Generate final zip buffer and write file
const xlsxBuffer = zip.generate();
fs.writeFileSync(outputPath, xlsxBuffer);
console.log(`Excel specifications generated successfully at: ${outputPath} (${xlsxBuffer.length} bytes, ${sheets.length} sheets)`);

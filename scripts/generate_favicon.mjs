import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// 1. Generate SVG Favicon matching .brand-mon exact aesthetics
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="crimsonBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b52537"/>
      <stop offset="100%" stop-color="#550e18"/>
    </linearGradient>
    <filter id="goldShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <!-- Outer Rounded Border & Dark Crimson Shrine Texture -->
  <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#crimsonBg)" stroke="#ffe2a0" stroke-width="2.5" stroke-opacity="0.85"/>
  
  <!-- Inner Border for Japanese Crest Depth -->
  <rect x="5.5" y="5.5" width="53" height="53" rx="8.5" fill="none" stroke="#0a0a10" stroke-width="1.5" stroke-opacity="0.55"/>
  
  <!-- Centered "狐" Calligraphic Character -->
  <text x="32" y="47" text-anchor="middle" font-family="'Noto Serif TC', 'Source Han Serif TC', 'Songti SC', 'Yu Mincho', 'Hiragino Mincho ProN', 'PMingLiU', 'MingLiU', serif" font-weight="700" font-size="40" fill="#fff6e7" filter="url(#goldShadow)">狐</text>
</svg>
`;

function createIcoFromFrames(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const dirEntries = [];
  const imageBlocks = [];

  for (const { width, height, buffer } of frames) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width === 256 ? 0 : width, 0);
    entry.writeUInt8(height === 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);

    dirEntries.push(entry);
    imageBlocks.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBlocks]);
}

function createBmpIcoFrame(size) {
  const width = size;
  const height = size;
  const imageSize = width * height * 4;
  const maskSize = Math.ceil(width / 32) * 4 * height;
  const biSizeImage = imageSize + maskSize;
  const headerSize = 40;

  const header = Buffer.alloc(headerSize);
  header.writeUInt32LE(headerSize, 0);
  header.writeInt32LE(width, 4);
  header.writeInt32LE(height * 2, 8);
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(0, 16);
  header.writeUInt32LE(biSizeImage, 20);
  header.writeInt32LE(0, 24);
  header.writeInt32LE(0, 28);
  header.writeUInt32LE(0, 32);
  header.writeUInt32LE(0, 36);

  const pixelData = Buffer.alloc(imageSize);
  const maskData = Buffer.alloc(maskSize, 0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const bmpY = height - 1 - y;
      const idx = (bmpY * width + x) * 4;

      const isBorder = (x <= 1 || x >= width - 2 || y <= 1 || y >= height - 2);
      const isInnerBorder = (x === 3 || x === width - 4 || y === 3 || y === height - 4);

      if (isBorder) {
        pixelData[idx + 0] = 0xa0;
        pixelData[idx + 1] = 0xe2;
        pixelData[idx + 2] = 0xff;
        pixelData[idx + 3] = 0xff;
      } else if (isInnerBorder) {
        pixelData[idx + 0] = 0x18;
        pixelData[idx + 1] = 0x0e;
        pixelData[idx + 2] = 0x55;
        pixelData[idx + 3] = 0xff;
      } else {
        const ratio = (x + y) / (width * 2);
        const r = Math.round(0xb5 * (1 - ratio) + 0x55 * ratio);
        const g = Math.round(0x25 * (1 - ratio) + 0x0e * ratio);
        const b = Math.round(0x37 * (1 - ratio) + 0x18 * ratio);

        const cx = Math.floor(width / 2);
        const cy = Math.floor(height / 2);
        const isKanji = (
          (Math.abs(x - cx) <= 1 && y >= cy - 4 && y <= cy + 4) ||
          (Math.abs(y - cy) <= 1 && x >= cx - 4 && x <= cx + 4) ||
          (x >= cx - 3 && x <= cx - 1 && y >= cy - 3 && y <= cy + 3)
        );

        if (isKanji) {
          pixelData[idx + 0] = 0xe7;
          pixelData[idx + 1] = 0xf6;
          pixelData[idx + 2] = 0xff;
          pixelData[idx + 3] = 0xff;
        } else {
          pixelData[idx + 0] = b;
          pixelData[idx + 1] = g;
          pixelData[idx + 2] = r;
          pixelData[idx + 3] = 0xff;
        }
      }
    }
  }

  return Buffer.concat([header, pixelData, maskData]);
}

function generateIco() {
  const sizes = [16, 32, 48];
  const frames = sizes.map((size) => ({
    width: size,
    height: size,
    buffer: createBmpIcoFrame(size)
  }));
  return createIcoFromFrames(frames);
}

async function main() {
  const svgPath = path.join(root, "favicon.svg");
  const icoPath = path.join(root, "favicon.ico");

  await writeFile(svgPath, svgFavicon, "utf-8");
  const icoBuffer = generateIco();
  await writeFile(icoPath, icoBuffer);

  console.log(`Generated favicon.svg at: ${svgPath}`);
  console.log(`Generated favicon.ico at: ${icoPath}`);
}

main().catch(console.error);

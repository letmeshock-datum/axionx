// Generates placeholder favicons / OG images and the optimized dashboard source.
// Run: npm run assets
// Replace the files in public/ with the real brand assets when available — the
// markup in src/layouts/Base.astro references them by path only.
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');
await mkdir(path.join(pub, 'icons'), { recursive: true });
await mkdir(path.join(pub, 'og'), { recursive: true });

const WORDMARK =
  'M48.9854 0C52.8156 0 55.6901 1.10141 56.9309 3.51817V0.38942H60.8362C63.0919 0.38942 64.2366 1.84105 65.2466 2.69075L68.9499 5.84174V0.38942H74V13.0643H71.9799C69.96 13.0643 69.152 12.3208 67.8726 11.2587L64.6743 8.55793V13.0643H59.6242V5.48772H57.5323C57.5798 5.83582 57.6042 6.20157 57.6042 6.58532C57.6042 11.4711 54.0691 13.3829 49.0191 13.383C43.9691 13.383 40.6024 11.6128 40.6024 6.58532C40.6024 2.37216 43.3294 0 48.9854 0ZM9.46038 0.389462L16.3971 11.7441L20.8797 6.86667L19.6278 5.34616H15.3185V0.38942H19.9645C21.8835 0.38942 23.2302 1.5578 23.8699 2.58454L24.3024 3.14243L26.8326 0.38942H33.0947L27.2152 6.89963L28.1792 8.14304H32.3202V13.0643H27.9772C26.3275 13.0643 25.2838 12.2146 24.4085 11.1524L23.9154 10.5535L21.6479 13.0643H10.8071L8.97174 10.1611H5.75698V13.0643H0V9.3822C0 7.22255 1.21203 5.55854 3.46766 5.5585H6.06213L2.79434 0.38942L9.46038 0.389462ZM39.5587 0.389462V13.0643H34.0036V0.38942L39.5587 0.389462ZM49.0527 4.2486C47.1 4.2486 46.1237 5.0983 46.1237 6.69149C46.1237 7.96604 46.9654 9.13443 49.0864 9.13443C51.0054 9.13443 52.0491 8.00148 52.0491 6.76231C52.0491 5.16912 51.0054 4.2486 49.0527 4.2486Z';

const GRADIENT = `
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#080808"/>
    <stop offset="0.19" stop-color="#030303"/>
    <stop offset="0.35" stop-color="#191f2e"/>
    <stop offset="0.57" stop-color="#424f73"/>
    <stop offset="0.67" stop-color="#7a8180"/>
    <stop offset="0.77" stop-color="#989793"/>
    <stop offset="0.92" stop-color="#a8a6a5"/>
    <stop offset="1" stop-color="#9f9f9d"/>
  </linearGradient>`;

/** Square icon: wordmark centred on a dark rounded square. */
function iconSvg(size, { radius = 0, pad = 0.18 } = {}) {
  const r = radius * size;
  const w = size * (1 - pad * 2);
  const s = w / 74;
  const h = 13.383 * s;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#080808"/>
  <g transform="translate(${x} ${y}) scale(${s})"><path d="${WORDMARK}" fill="#ffffff"/></g>
</svg>`;
}

/** 1200×630 OG card. Text is rendered with system fonts – it is a placeholder. */
function ogSvg({ title, subtitle, rtl }) {
  const W = 1200, H = 630, M = 96;
  const anchor = 'start'; // with direction="rtl" SVG 'start' anchors at the right edge
  const tx = rtl ? W - M : M;
  const dir = rtl ? 'rtl' : 'ltr';
  const font = rtl
    ? "'Geeza Pro','Al Bayan',sans-serif"
    : "Geist,'Helvetica Neue',Helvetica,Arial,sans-serif";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${GRADIENT}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g transform="translate(${rtl ? W - M - 148 : M} ${M}) scale(2)"><path d="${WORDMARK}" fill="#ffffff"/></g>
  <text x="${tx}" y="330" direction="${dir}" text-anchor="${anchor}" font-family="${font}" font-size="72" fill="#ffffff" letter-spacing="-1.5">${title}</text>
  <text x="${tx}" y="392" direction="${dir}" text-anchor="${anchor}" font-family="${font}" font-size="28" fill="#ffffff" fill-opacity="0.85">${subtitle}</text>
  <rect x="${rtl ? W - M - 320 : M}" y="${H - M - 2}" width="320" height="3" fill="#c6e800"/>
</svg>`;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// --- Favicons -------------------------------------------------------------
await writeFile(path.join(pub, 'favicon.svg'), iconSvg(64, { radius: 0.22 }));
await sharp(Buffer.from(iconSvg(180, { radius: 0 }))).png().toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(iconSvg(192, { radius: 0.22 }))).png().toFile(path.join(pub, 'icons', 'icon-192.png'));
await sharp(Buffer.from(iconSvg(512, { radius: 0.22 }))).png().toFile(path.join(pub, 'icons', 'icon-512.png'));
await sharp(Buffer.from(iconSvg(512, { radius: 0, pad: 0.26 }))).png().toFile(path.join(pub, 'icons', 'icon-maskable-512.png'));
// favicon.ico (legacy): a 32px PNG inside an ICO container.
const png32 = await sharp(Buffer.from(iconSvg(32, { radius: 0.22 }))).png().toBuffer();
await writeFile(path.join(pub, 'favicon.ico'), pngToIco(png32, 32));

// --- OpenGraph -----------------------------------------------------------
const og = [
  { file: 'og-en.jpg', title: 'Axion Gen', subtitle: 'Generative BI, geospatial and agents intelligence in a single interface.', rtl: false },
  { file: 'og-ar.jpg', title: 'أكسيون جين', subtitle: 'ذكاء الأعمال التوليدي والجغرافي المكاني ووكلاء الذكاء الاصطناعي في واجهة واحدة.', rtl: true },
];
for (const o of og) {
  await sharp(Buffer.from(ogSvg({ ...o, title: esc(o.title), subtitle: esc(o.subtitle) })))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(pub, 'og', o.file));
}

// --- Dashboard screenshot source ------------------------------------------
// Source of truth is the Figma export (3456×1926). We keep a 2000px-wide
// near-lossless WebP in src/assets so the repo stays light; astro:assets
// derives the responsive AVIF/WebP variants at build time.
const raw = path.join(root, 'src/assets/figma-raw/dashboard@2x.png');
if (existsSync(raw)) {
  await sharp(raw)
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ nearLossless: true, quality: 70 })
    .toFile(path.join(root, 'src/assets/dashboard.webp'));
}

function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4); entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8); entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}
console.log('assets generated');

#!/usr/bin/env node
/**
 * Cuts the straight-on centre phone screen out of each three-phone mockup so
 * it can be mapped onto a 3D phone.
 *
 *   node scripts/crop-phone-screens.js
 *
 * No image libraries: decodes the PNG (inflate, un-filter), crops, box-averages
 * down to the output width, composites any alpha onto black, and re-encodes.
 */

const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

/* Centre phone screen, measured on the 1920x1440 mockups. */
const JOBS = [
  { src: "assets/img/k-app-s.png", out: "assets/img/screen-korvanta.png", crop: [656, 50, 1264, 1390] },
  { src: "assets/img/k-app-s2.png", out: "assets/img/screen-korvanta-business.png", crop: [656, 50, 1264, 1390] },
];
const OUT_W = 460;

function decode(buf) {
  if (buf.slice(1, 4).toString() !== "PNG") throw new Error("not a PNG");
  const W = buf.readUInt32BE(16);
  const H = buf.readUInt32BE(20);
  const depth = buf[24];
  const type = buf[25];
  if (depth !== 8 || buf[28] !== 0) throw new Error("need 8-bit non-interlaced");
  const BPP = type === 6 ? 4 : type === 2 ? 3 : 0;
  if (!BPP) throw new Error("unsupported colour type " + type);

  const parts = [];
  for (let off = 8; off < buf.length; ) {
    const len = buf.readUInt32BE(off);
    const t = buf.slice(off + 4, off + 8).toString();
    if (t === "IDAT") parts.push(buf.slice(off + 8, off + 8 + len));
    if (t === "IEND") break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(parts));
  const stride = W * BPP;
  const px = Buffer.alloc(H * stride);
  let p = 0;
  for (let y = 0; y < H; y++) {
    const f = raw[p++];
    const cur = px.subarray(y * stride, (y + 1) * stride);
    const prev = y ? px.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= BPP ? cur[i - BPP] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= BPP ? prev[i - BPP] : 0;
      let v = raw[p + i];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const q = a + b - c;
        const pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = v & 255;
    }
    p += stride;
  }
  return { W, H, BPP, px };
}

const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = (b) => {
  let c = -1;
  for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

for (const job of JOBS) {
  const img = decode(fs.readFileSync(path.join(ROOT, job.src)));
  const [x0, y0, x1, y1] = job.crop;
  const cw = x1 - x0;
  const ch = y1 - y0;
  const OW = OUT_W;
  const OH = Math.round((ch * OW) / cw);
  const sx = cw / OW;
  const sy = ch / OH;

  const rows = Buffer.alloc(OH * (OW * 3 + 1));
  for (let y = 0; y < OH; y++) {
    const row = y * (OW * 3 + 1);
    rows[row] = 0;
    const ya = y0 + Math.floor(y * sy);
    const yb = Math.max(ya + 1, y0 + Math.floor((y + 1) * sy));
    for (let x = 0; x < OW; x++) {
      const xa = x0 + Math.floor(x * sx);
      const xb = Math.max(xa + 1, x0 + Math.floor((x + 1) * sx));
      let r = 0, g = 0, b = 0, n = 0;
      for (let yy = ya; yy < yb; yy++) {
        for (let xx = xa; xx < xb; xx++) {
          const i = (yy * img.W + xx) * img.BPP;
          const alpha = img.BPP === 4 ? img.px[i + 3] / 255 : 1;
          r += img.px[i] * alpha;
          g += img.px[i + 1] * alpha;
          b += img.px[i + 2] * alpha;
          n++;
        }
      }
      const o = row + 1 + x * 3;
      rows[o] = r / n;
      rows[o + 1] = g / n;
      rows[o + 2] = b / n;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(OW, 0);
  ihdr.writeUInt32BE(OH, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  fs.writeFileSync(path.join(ROOT, job.out), png);
  console.log(job.out + "  " + OW + "x" + OH + "  " + Math.round(png.length / 1024) + " KB");
}

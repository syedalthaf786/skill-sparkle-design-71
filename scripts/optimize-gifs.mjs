import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, extname } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const pipe = promisify(pipeline);

const ASSETS_DIR = resolve(".", "src", "assets");
const gifs = ["ai.gif", "ai1.gif"];

for (const file of gifs) {
  const inputPath = resolve(ASSETS_DIR, file);
  const baseName = file.replace(/\.gif$/, "");
  const outputPathWebp = resolve(ASSETS_DIR, `${baseName}.webp`);

  // Read raw GIF bytes so sharp can auto-detect animation metadata
  const rawBuf = readFileSync(inputPath);
  const input = sharp(rawBuf);

  // Probe metadata to confirm animated
  const meta = await input.metadata();

  if (meta.pages && meta.pages! > 1) {
    console.log(`→ ${file}: ${meta.pages} frames — encoding as animated WebP`);
    const webpInstance = input.webp({ quality: 80, effort: 6, animated: true });
    const out = await webpInstance.toBuffer();
    const saved = ((meta.size ?? 0) - out.length) / 1024;
    console.log(
      `  WebP: ${out.length} bytes (${(out.length / 1024).toFixed(1)} KB) ` +
        `— saved ~${saved.toFixed(1)} KB (animated WebP)`
    );
    writeFileSync(outputPathWebp, out);
  } else {
    console.log(`→ ${file}: single frame — encoding as static WebP`);
    const out = await input.webp({ quality: 80, effort: 6 }).toBuffer();
    const saved = ((meta.size ?? 0) - out.length) / 1024;
    console.log(
      `  WebP: ${out.length} bytes (${(out.length / 1024).toFixed(1)} KB) ` +
        `— saved ~${saved.toFixed(1)} KB`
    );
    writeFileSync(outputPathWebp, out);
  }
}

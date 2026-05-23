const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.resolve(".", "src", "assets");
const gifs = ["ai.gif", "ai1.gif"];

async function optimize() {
  for (const file of gifs) {
    const inputPath = path.join(ASSETS_DIR, file);
    const baseName = file.replace(/\.gif$/, "");
    const outputPathWebp = path.join(ASSETS_DIR, `${baseName}.webp`);

    console.log(`\n→ ${file}`);

    const rawBuf = fs.readFileSync(inputPath);
    const input = sharp(rawBuf);

    const meta = await input.metadata();
    const pages = meta.pages || 0;
    const originalSize = meta.size || rawBuf.length;

    let out;
    if (pages > 1) {
      console.log(`  frames: ${pages} → animated WebP`);
      out = await input
        .webp({ quality: 80, effort: 6, animated: true })
        .toBuffer();
    } else {
      console.log(`  frames: 1 → static WebP`);
      out = await input.webp({ quality: 80, effort: 6 }).toBuffer();
    }

    const outSize = out.length;
    const saved = ((originalSize - outSize) / 1024).toFixed(1);
    console.log(
      `  ${(outSize / 1024).toFixed(1)} KB (was ${(originalSize / 1024).toFixed(1)} KB) → saved ${saved} KB`
    );
    fs.writeFileSync(outputPathWebp, out);
  }

  console.log("\n✓ All assets optimized.");
}

optimize().catch(console.error);

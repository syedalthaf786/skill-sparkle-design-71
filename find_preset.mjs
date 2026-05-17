import { writeFileSync, readFileSync } from "fs";
const content = readFileSync("node_modules/nitro/dist/vite.mjs", "utf8");
const matches: Array<{pos:number,context:string}> = [];
for (let i = 0; i < content.length; i++) {
  if (content.slice(i, i+6) === "preset") {
    matches.push({
      pos: i,
      ctx: content.slice(Math.max(0, i-60), i+120).replace(/\n/g, " ").trim()
    });
  }
}
writeFileSync("preset_matches.txt", matches.slice(0, 15).map(m=>JSON.stringify(m)).join("\n"));

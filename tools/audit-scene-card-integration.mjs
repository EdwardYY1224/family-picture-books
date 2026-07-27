import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const assetDir = path.join(repo, "assets", "scene-cards");
const manifest = JSON.parse(fs.readFileSync(path.join(assetDir, "scene-card-manifest.json"), "utf8"));
const assets = manifest.batches.flatMap((batch) => batch.assets.map((asset) => ({ ...asset, batch: batch.id })));

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(?:html|js|css)$/i.test(entry.name) ? [full] : [];
  });
}

const sources = [path.join(repo, "school"), path.join(repo, "games")]
  .flatMap(sourceFiles)
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const missingRuntime = assets.filter((asset) => !fs.existsSync(path.join(assetDir, asset.file)));
const unreferenced = assets.filter((asset) => !sources.includes(asset.file.replace(/\.webp$/i, "")));
const duplicateFiles = assets.filter((asset, index) => assets.findIndex((item) => item.file === asset.file) !== index);

console.log(`Scene-card integration audit v${manifest.version}`);
console.log(`Manifest assets: ${assets.length}`);
console.log(`Runtime files present: ${assets.length - missingRuntime.length}/${assets.length}`);
console.log(`Referenced by curriculum: ${assets.length - unreferenced.length}/${assets.length}`);
console.log(`Duplicate filenames: ${duplicateFiles.length}`);

for (const batch of manifest.batches) {
  const batchAssets = assets.filter((asset) => asset.batch === batch.id);
  const referenced = batchAssets.filter((asset) => sources.includes(asset.file.replace(/\.webp$/i, ""))).length;
  console.log(`- ${batch.id}: ${referenced}/${batchAssets.length} referenced`);
}

for (const asset of missingRuntime) console.error(`Missing runtime file: ${asset.file}`);
for (const asset of unreferenced) console.error(`Not connected to curriculum: ${asset.batch}/${asset.file}`);
for (const asset of duplicateFiles) console.error(`Duplicate manifest filename: ${asset.file}`);

if (missingRuntime.length || unreferenced.length || duplicateFiles.length) process.exitCode = 1;

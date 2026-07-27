import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const manifestPath = path.join(repo, "assets", "scene-cards", "scene-card-manifest.json");
const runtimeDir = path.join(repo, "assets", "scene-cards");
const incomingDir = path.join(runtimeDir, "incoming");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const all = manifest.batches.flatMap((batch) => batch.assets.map((asset) => ({ ...asset, batch: batch.id })));
const duplicateFiles = all.map((asset) => asset.file).filter((file, index, files) => files.indexOf(file) !== index);
if (duplicateFiles.length) {
  console.error(`Duplicate filenames: ${[...new Set(duplicateFiles)].join(", ")}`);
  process.exitCode = 1;
}

const ready = [];
const incoming = [];
const missing = [];
for (const asset of all) {
  const runtimePath = path.join(runtimeDir, asset.file);
  const originalName = asset.file.replace(/\.webp$/i, ".png");
  const incomingPath = path.join(incomingDir, originalName);
  if (fs.existsSync(runtimePath)) ready.push(asset);
  else if (fs.existsSync(incomingPath)) incoming.push(asset);
  else missing.push(asset);
}

console.log(`Scene-card manifest v${manifest.version}`);
console.log(`Total: ${all.length}`);
console.log(`Runtime ready: ${ready.length}`);
console.log(`Incoming PNG awaiting conversion: ${incoming.length}`);
console.log(`Still needed: ${missing.length}`);

for (const batch of manifest.batches) {
  const assets = all.filter((asset) => asset.batch === batch.id);
  const done = assets.filter((asset) => fs.existsSync(path.join(runtimeDir, asset.file))).length;
  const staged = assets.filter((asset) => fs.existsSync(path.join(incomingDir, asset.file.replace(/\.webp$/i, ".png")))).length;
  console.log(`- ${batch.id}: ${done}/${assets.length} ready${staged ? `, ${staged} incoming` : ""}`);
}

if (missing.length) {
  console.log("\nNext missing files:");
  for (const asset of missing.slice(0, 20)) console.log(`  ${asset.batch}/${asset.file}`);
  if (missing.length > 20) console.log(`  ...and ${missing.length - 20} more`);
}

// Five Seconds to Explain the Glass
// One sentence: the excuse a house cat gives in the five seconds after
// knocking a glass off the table. Cat logic, no apology, no confession.
// Line length: 97 characters (gate allows 1-200).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "It was hogging my sunbeam, blocking my view of the bird, and frankly it looked at me first.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: the file must contain exactly the validated line.
import { readFileSync } from "node:fs";
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}

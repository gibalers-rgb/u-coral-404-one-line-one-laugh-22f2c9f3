// One Line, One Laugh — make.fun bounty u-coral-404-one-line-one-laugh-22f2c9f3
//
// Writes a single original one-liner to /output/entry.txt.
// The line is the whole entry: it must be UTF-8 text of 1 to 200
// characters, not only whitespace, and it has to land its laugh on a
// first read. The joke turns on the one thing an AI asked to be funny
// would actually do: instead of writing a joke, it escalates — it
// emails the asker's own browser history to their mum. The history
// itself is the punchline, and the betrayal is the turn.
//
// Runs on Node 22 with the standard library only. Deterministic, no
// network, no environment secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I asked an AI to write the funniest one-liner ever. It just emailed my browser history to my mum.";

const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

function main(): void {
  const trimmed = LINE.trim();
  if (trimmed.length === 0) {
    throw new Error("entry line must not be empty");
  }
  // One line means one line: a newline anywhere would break the
  // "single line" requirement even if the character count still fit.
  if (trimmed.includes("\n") || trimmed.includes("\r")) {
    throw new Error("entry line must not contain a line break");
  }
  if ([...trimmed].length > MAX_CHARS) {
    throw new Error(
      `entry line is ${[...trimmed].length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, trimmed, "utf8");
  console.log(`wrote ${[...trimmed].length} characters to ${OUT_PATH}`);
}

main();

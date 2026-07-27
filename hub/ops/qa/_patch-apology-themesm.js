/**
 * ThemeSm52a — add apology labels + THEME_ORDER to all 8 games.
 * One-shot patcher. Run: node hub/ops/qa/_patch-apology-themesm.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../../app/games");

const files = [
  { rel: "cloze-race/cloze.js", mode: "mid" },
  { rel: "bingo-board/bingo.js", mode: "bingo" },
  { rel: "listen-match/match.js", mode: "mid" },
  { rel: "particle-snap/particle.js", mode: "mid" },
  { rel: "dictation/dictation.js", mode: "mid" },
  { rel: "telephone/telephone.js", mode: "mid" },
  { rel: "word-scramble/scramble.js", mode: "mid" },
  { rel: "speed-quiz/speed.js", mode: "mid" },
];

function patch(s, mode) {
  if (s.includes('theme_apology:')) return s; // already done
  if (mode === "mid") {
    s = s.replace(
      /theme_personality: "Personality",\n(\s*)theme_intermediate:/,
      'theme_personality: "Personality",\n$1theme_apology: "Apology",\n$1theme_intermediate:'
    );
    s = s.replace(
      /theme_personality: "성격",\n(\s*)theme_intermediate:/,
      'theme_personality: "성격",\n$1theme_apology: "미안",\n$1theme_intermediate:'
    );
    s = s.replace(
      /theme_personality: "性格",\n(\s*)theme_intermediate:/,
      'theme_personality: "性格",\n$1theme_apology: "抱歉",\n$1theme_intermediate:'
    );
    s = s.replace(
      /"personality", "intermediate"/,
      '"personality", "apology", "intermediate"'
    );
    s = s.replace(
      /"personality",\n(\s*)"intermediate"/,
      '"personality",\n$1"apology",\n$1"intermediate"'
    );
  } else {
    s = s.replace(
      /theme_personality: "Personality",\n(\s*)theme_lang:/,
      'theme_personality: "Personality",\n$1theme_apology: "Apology",\n$1theme_lang:'
    );
    s = s.replace(
      /theme_personality: "성격",\n(\s*)theme_lang:/,
      'theme_personality: "성격",\n$1theme_apology: "미안",\n$1theme_lang:'
    );
    s = s.replace(
      /theme_personality: "性格",\n(\s*)theme_lang:/,
      'theme_personality: "性格",\n$1theme_apology: "抱歉",\n$1theme_lang:'
    );
    s = s.replace(
      /"personality",\n(\s*)"lang"/,
      '"personality",\n$1"apology",\n$1"lang"'
    );
  }
  return s;
}

let fail = 0;
for (const { rel, mode } of files) {
  const p = path.join(root, rel);
  const before = fs.readFileSync(p, "utf8");
  const after = patch(before, mode);
  if (!after.includes('theme_apology: "미안"') || !/"apology"/.test(after)) {
    console.error("FAIL", rel);
    fail++;
    continue;
  }
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log("patched", rel);
  } else {
    console.log("already", rel);
  }
}
if (fail) process.exit(1);
console.log("ThemeSm52a label/ORDER patch OK");

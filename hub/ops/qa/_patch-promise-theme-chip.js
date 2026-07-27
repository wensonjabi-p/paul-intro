/**
 * ThemeSm56a — enable promise theme chip (i18n + THEME_ORDER) across 8 games.
 * Canon: KO 약속 / ZH 约定 / EN Promise.
 * Distinct from think / rules / time / personality / favor / encourage.
 * Chip SHOW only when promiseTagged>0 + themes.promise (speed now).
 * Run: node hub/ops/qa/_patch-promise-theme-chip.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app/games");
const files = [
  "speed-quiz/speed.js",
  "cloze-race/cloze.js",
  "bingo-board/bingo.js",
  "listen-match/match.js",
  "particle-snap/particle.js",
  "dictation/dictation.js",
  "telephone/telephone.js",
  "word-scramble/scramble.js",
];

function patch(rel) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, "utf8");
  let n = 0;

  if (!s.includes('theme_promise: "Promise"')) {
    if (!s.includes('theme_encourage: "Encourage",'))
      throw new Error(`${rel}: missing EN theme_encourage`);
    s = s.replace(
      'theme_encourage: "Encourage",',
      'theme_encourage: "Encourage",\n      theme_promise: "Promise",'
    );
    n++;
  }
  if (!s.includes('theme_promise: "약속"')) {
    if (!s.includes('theme_encourage: "격려",'))
      throw new Error(`${rel}: missing KO theme_encourage`);
    s = s.replace(
      'theme_encourage: "격려",',
      'theme_encourage: "격려",\n      theme_promise: "약속",'
    );
    n++;
  }
  if (!s.includes('theme_promise: "约定"')) {
    if (!s.includes('theme_encourage: "鼓励",'))
      throw new Error(`${rel}: missing ZH theme_encourage`);
    s = s.replace(
      'theme_encourage: "鼓励",',
      'theme_encourage: "鼓励",\n      theme_promise: "约定",'
    );
    n++;
  }

  const orderBlock = s.match(/THEME_ORDER[\s\S]*?\];/)?.[0] || "";
  if (!/"promise"/.test(orderBlock)) {
    const repls = [
      [
        '"encourage", "intermediate"',
        '"encourage", "promise", "intermediate"',
      ],
      [
        '"encourage", "intermediate",',
        '"encourage", "promise", "intermediate",',
      ],
      [
        '"encourage",\n    "intermediate"',
        '"encourage",\n    "promise",\n    "intermediate"',
      ],
      [
        '"encourage",\r\n    "intermediate"',
        '"encourage",\r\n    "promise",\r\n    "intermediate"',
      ],
      ['"encourage",\n    "lang",', '"encourage",\n    "promise",\n    "lang",'],
      [
        '"encourage",\r\n    "lang",',
        '"encourage",\r\n    "promise",\r\n    "lang",',
      ],
    ];
    let done = false;
    for (const [a, b] of repls) {
      if (s.includes(a)) {
        s = s.replace(a, b);
        n++;
        done = true;
        break;
      }
    }
    if (!done) {
      throw new Error(
        `${rel}: THEME_ORDER insert failed\n${orderBlock.slice(-160)}`
      );
    }
  }

  fs.writeFileSync(p, s);
  const ok = /THEME_ORDER[\s\S]*?"promise"/.test(s);
  console.log(`${rel}: +${n} · ORDER promise=${ok}`);
}

for (const f of files) patch(f);
console.log("ThemeSm56a promise chip patch OK");

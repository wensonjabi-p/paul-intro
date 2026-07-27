/**
 * ThemeSm57 — enable refuse theme chip (i18n + THEME_ORDER) across 8 games.
 * Canon: KO 거절 / ZH 拒绝 / EN Refuse.
 * Distinct from opinion / compare / rules / promise / favor / advice / apology / speech.
 * Chip SHOW only when refuseTagged>0 + themes.refuse (all 8 tagged).
 * Run: node hub/ops/qa/_patch-refuse-theme-chip.js
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

  if (!s.includes('theme_refuse: "Refuse"')) {
    if (!s.includes('theme_promise: "Promise",'))
      throw new Error(`${rel}: missing EN theme_promise`);
    s = s.replace(
      'theme_promise: "Promise",',
      'theme_promise: "Promise",\n      theme_refuse: "Refuse",'
    );
    n++;
  }
  if (!s.includes('theme_refuse: "거절"')) {
    if (!s.includes('theme_promise: "약속",'))
      throw new Error(`${rel}: missing KO theme_promise`);
    s = s.replace(
      'theme_promise: "약속",',
      'theme_promise: "약속",\n      theme_refuse: "거절",'
    );
    n++;
  }
  if (!s.includes('theme_refuse: "拒绝"')) {
    if (!s.includes('theme_promise: "约定",'))
      throw new Error(`${rel}: missing ZH theme_promise`);
    s = s.replace(
      'theme_promise: "约定",',
      'theme_promise: "约定",\n      theme_refuse: "拒绝",'
    );
    n++;
  }

  const orderBlock = s.match(/THEME_ORDER[\s\S]*?\];/)?.[0] || "";
  if (!/"refuse"/.test(orderBlock)) {
    const repls = [
      [
        '"promise", "intermediate"',
        '"promise", "refuse", "intermediate"',
      ],
      [
        '"promise", "intermediate",',
        '"promise", "refuse", "intermediate",',
      ],
      [
        '"promise",\n    "intermediate"',
        '"promise",\n    "refuse",\n    "intermediate"',
      ],
      [
        '"promise",\r\n    "intermediate"',
        '"promise",\r\n    "refuse",\r\n    "intermediate"',
      ],
      ['"promise",\n    "lang",', '"promise",\n    "refuse",\n    "lang",'],
      [
        '"promise",\r\n    "lang",',
        '"promise",\r\n    "refuse",\r\n    "lang",',
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
  const ok = /THEME_ORDER[\s\S]*?"refuse"/.test(s);
  console.log(`${rel}: +${n} · ORDER refuse=${ok}`);
}

for (const f of files) patch(f);
console.log("ThemeSm57 refuse chip patch OK");

/**
 * ThemeSm44a+ — compare focus smoke (tagged>0 only)
 * Pack comparison-degree → tag `compare`. Canon KO 비교 / ZH 比较 / EN Compare.
 * Distinct from size / change / motion.
 * SHOW when compareTagged>0 + themes.compare; else HIDE.
 * Run: node hub/ops/qa/_smoke-compare-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const GAMES = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    n: 10,
    needMin: 9,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_compare: "비교"') &&
    js.includes('theme_compare: "比较"') &&
    js.includes('theme_compare: "Compare"') &&
    /THEME_ORDER[\s\S]*?"compare"/.test(js)
  );
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("compare")).length;
}

function themesHas(data) {
  return (data.themes || []).includes("compare");
}

function chipShows(data, needMin) {
  const n = taggedCount(data);
  if (!themesHas(data) || n <= 0) return false;
  if (needMin && n < needMin) return false;
  return true;
}

let fail = 0;
const rows = [];

for (const [name, cfg] of Object.entries(GAMES)) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = taggedCount(data);
  const show = chipShows(data, cfg.needMin);
  const labels = labelOk(js);
  const expectShow = tagged > 0 && themesHas(data);
  let ok = labels && show === expectShow;
  // If tagged bank claims a min count, enforce when SHOW
  if (expectShow && cfg.n != null) ok = ok && tagged >= cfg.n;
  rows.push({ name, tagged, show, expectShow, labels, ok });
  console.log(
    `${name}: compareTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("compare")) continue;
    if (tags.includes("size") || tags.includes("change") || tags.includes("motion")) both++;
  }
}
console.log(`\nbothTags vs size/change/motion = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm compare smoke PASS: ${showN} SHOW · chip KO 비교 / ZH 比较`
);

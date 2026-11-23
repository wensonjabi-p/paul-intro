/**
 * ThemeSm50d — friends focus smoke (tagged>0 only)
 * Pack friends-social → tag `friends`. Canon KO 친구 / ZH 朋友 / EN Friends.
 * Distinct from celebration / family / jobs / routine.
 * SHOW when friendsTagged>0 + themes.friends; else HIDE.
 * ThemeSm50a–50c: speed+cloze+bingo/listen · ThemeSm50d: +particle/dictation/tel/scramble
 *   (friendsTagged=10×6 + 8×2) → 전 8 SHOW · Suggest ThemeSm close.
 * Run: node hub/ops/qa/_smoke-friends-focus.js
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
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_friends: "친구"') &&
    js.includes('theme_friends: "朋友"') &&
    js.includes('theme_friends: "Friends"') &&
    /THEME_ORDER[\s\S]*?"friends"/.test(js) &&
    js.includes('theme_celebration: "축하"') &&
    js.includes('theme_family: "가족"') &&
    js.includes('theme_celebration: "庆祝"') &&
    js.includes('theme_family: "家人"')
  );
}

function distinctOk(js) {
  // friends must not reuse celebration/family canon labels
  if (js.match(/theme_friends:\s*"축하"/) || js.match(/theme_friends:\s*"庆祝"/))
    return false;
  if (js.match(/theme_friends:\s*"가족"/) || js.match(/theme_friends:\s*"家人"/))
    return false;
  if (
    js.match(/theme_friends:\s*"Celebration"/) ||
    js.match(/theme_friends:\s*"Family"/)
  )
    return false;
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("friends"))
    .length;
}

function themesHas(data) {
  return (data.themes || []).includes("friends");
}

function chipShows(data) {
  const n = taggedCount(data);
  if (!themesHas(data) || n <= 0) return false;
  return true;
}

let fail = 0;
const rows = [];

for (const [name, cfg] of Object.entries(GAMES)) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = taggedCount(data);
  const show = chipShows(data);
  const labels = labelOk(js) && distinctOk(js);
  const expectShow = tagged > 0 && themesHas(data);
  let ok = labels && show === expectShow;
  if (expectShow && cfg.n != null) ok = ok && tagged >= cfg.n;
  rows.push({ name, tagged, show, expectShow, labels, ok });
  console.log(
    `${name}: friendsTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("friends")) continue;
    if (tags.includes("celebration") || tags.includes("family")) both++;
  }
}
console.log(`\nbothTags vs celebration/family = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm50d friends smoke PASS: ${showN} SHOW · chip KO 친구 / ZH 朋友 · celebration/family distinct`
);

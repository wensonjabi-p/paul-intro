/**
 * ThemeSm48d / ThemeSm close — habit focus smoke (전 8 SHOW · habits-lifestyle sweep close)
 * Pack habits-lifestyle → tag `habit`. Canon KO 습관 / ZH 习惯 / EN Habit.
 * Distinct from routine / clinic(health) / change.
 * SHOW when habitTagged>0 + themes.habit; else HIDE.
 * ThemeSm48a–48d: 전 8 SHOW · habitTagged 10×6 + 8×2.
 * Run: node hub/ops/qa/_smoke-habit-focus.js
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
    js.includes('theme_habit: "습관"') &&
    js.includes('theme_habit: "习惯"') &&
    js.includes('theme_habit: "Habit"') &&
    /THEME_ORDER[\s\S]*?"habit"/.test(js) &&
    js.includes('theme_routine: "일상"') &&
    js.includes('theme_change: "변화"') &&
    js.includes('theme_clinic: "병원"') &&
    js.includes('theme_routine: "日常"') &&
    js.includes('theme_change: "变化"') &&
    js.includes('theme_clinic: "医院"')
  );
}

function distinctOk(js) {
  // habit must not reuse routine / change / clinic(health) canon labels
  if (js.match(/theme_habit:\s*"일상"/) || js.match(/theme_habit:\s*"日常"/))
    return false;
  if (js.match(/theme_habit:\s*"변화"/) || js.match(/theme_habit:\s*"变化"/))
    return false;
  if (js.match(/theme_habit:\s*"병원"/) || js.match(/theme_habit:\s*"医院"/))
    return false;
  if (js.match(/theme_habit:\s*"Routine"/) || js.match(/theme_habit:\s*"Change"/))
    return false;
  if (js.match(/theme_habit:\s*"Clinic"/)) return false;
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("habit"))
    .length;
}

function themesHas(data) {
  return (data.themes || []).includes("habit");
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
    `${name}: habitTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("habit")) continue;
    if (
      tags.includes("routine") ||
      tags.includes("change") ||
      tags.includes("clinic")
    )
      both++;
  }
}
console.log(`\nbothTags vs routine/change/clinic = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
if (showN !== 8) {
  console.error(`ThemeSm close expect SHOW 8/8, got ${showN}`);
  process.exit(1);
}
console.log(
  `ThemeSm close habit smoke PASS: ${showN} SHOW · chip KO 습관 / ZH 习惯 · routine/clinic/change distinct · habits-lifestyle 스윕 닫힘`
);

/**
 * ThemeSm45d — reason focus smoke close (tagged>0 only)
 * Pack cause-reason → tag `reason`. Canon KO 이유 / ZH 原因 / EN Reason.
 * Distinct from think / speech / favor.
 * SHOW when reasonTagged>0 + themes.reason; else HIDE.
 * ThemeSm45a/45b: speed+cloze(+bingo/listen) · ThemeSm45d: +particle/dictation/tel/scramble → 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-reason-focus.js
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
    js.includes('theme_reason: "이유"') &&
    js.includes('theme_reason: "原因"') &&
    js.includes('theme_reason: "Reason"') &&
    /THEME_ORDER[\s\S]*?"reason"/.test(js)
  );
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("reason")).length;
}

function themesHas(data) {
  return (data.themes || []).includes("reason");
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
  if (expectShow && cfg.n != null) ok = ok && tagged >= cfg.n;
  rows.push({ name, tagged, show, expectShow, labels, ok });
  console.log(
    `${name}: reasonTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("reason")) continue;
    if (tags.includes("think") || tags.includes("speech") || tags.includes("favor")) both++;
  }
}
console.log(`\nbothTags vs think/speech/favor = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm45d reason smoke PASS: ${showN} SHOW · chip KO 이유 / ZH 原因 · cause-reason sweep closed`
);

/**
 * ThemeSm46d — problem focus smoke close (tagged>0 only)
 * Pack problem-solution → tag `problem`. Canon KO 문제 / ZH 问题 / EN Problem.
 * Distinct from favor / reason / think.
 * SHOW when problemTagged>0 + themes.problem; else HIDE.
 * ThemeSm46a–46c + particle/dictation/tel/scramble → 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-problem-focus.js
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
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
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
    js.includes('theme_problem: "문제"') &&
    js.includes('theme_problem: "问题"') &&
    js.includes('theme_problem: "Problem"') &&
    /THEME_ORDER[\s\S]*?"problem"/.test(js) &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_reason: "이유"') &&
    js.includes('theme_think: "생각"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_reason: "原因"') &&
    js.includes('theme_think: "想法"')
  );
}

function distinctOk(js) {
  // problem must not reuse favor/reason/think canon labels
  if (js.match(/theme_problem:\s*"부탁"/) || js.match(/theme_problem:\s*"拜托"/))
    return false;
  if (js.match(/theme_problem:\s*"이유"/) || js.match(/theme_problem:\s*"原因"/))
    return false;
  if (js.match(/theme_problem:\s*"생각"/) || js.match(/theme_problem:\s*"想法"/))
    return false;
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("problem"))
    .length;
}

function themesHas(data) {
  return (data.themes || []).includes("problem");
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
    `${name}: problemTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("problem")) continue;
    if (
      tags.includes("favor") ||
      tags.includes("reason") ||
      tags.includes("think")
    )
      both++;
  }
}
console.log(`\nbothTags vs favor/reason/think = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm46d problem smoke PASS: ${showN} SHOW · chip KO 문제 / ZH 问题 · favor/reason/think distinct · problem-solution 스윕 닫힘`
);

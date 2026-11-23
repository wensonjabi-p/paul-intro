/**
 * ThemeSm47d — opinion focus smoke close (tagged>0 only)
 * Pack opinion-judgment → tag `opinion`. Canon KO 의견 / ZH 意见 / EN Opinion.
 * Distinct from think / speech / favor / problem.
 * SHOW when opinionTagged>0 + themes.opinion; else HIDE.
 * ThemeSm47a–47c + particle/dictation/tel/scramble → 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-opinion-focus.js
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
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_opinion: "意见"') &&
    js.includes('theme_opinion: "Opinion"') &&
    /THEME_ORDER[\s\S]*?"opinion"/.test(js) &&
    js.includes('theme_think: "생각"') &&
    js.includes('theme_speech: "대화"') &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_problem: "문제"') &&
    js.includes('theme_think: "想法"') &&
    js.includes('theme_speech: "对话"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_problem: "问题"')
  );
}

function distinctOk(js) {
  // opinion must not reuse think/speech/favor/problem canon labels
  if (js.match(/theme_opinion:\s*"생각"/) || js.match(/theme_opinion:\s*"想法"/))
    return false;
  if (js.match(/theme_opinion:\s*"대화"/) || js.match(/theme_opinion:\s*"对话"/))
    return false;
  if (js.match(/theme_opinion:\s*"부탁"/) || js.match(/theme_opinion:\s*"拜托"/))
    return false;
  if (js.match(/theme_opinion:\s*"문제"/) || js.match(/theme_opinion:\s*"问题"/))
    return false;
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("opinion"))
    .length;
}

function themesHas(data) {
  return (data.themes || []).includes("opinion");
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
    `${name}: opinionTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("opinion")) continue;
    if (
      tags.includes("think") ||
      tags.includes("speech") ||
      tags.includes("favor") ||
      tags.includes("problem")
    )
      both++;
  }
}
console.log(`\nbothTags vs think/speech/favor/problem = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm47d opinion smoke PASS: ${showN} SHOW · chip KO 의견 / ZH 意见 · think/speech/favor/problem distinct · opinion-judgment 스윕 닫힘`
);

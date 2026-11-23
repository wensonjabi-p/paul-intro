/**
 * ThemeSm58 — complain focus smoke (tagged>0 only)
 * Pack complain-dissatisfaction → tag `complain`. Canon KO 불만 / ZH 不满 / EN Complain.
 * Distinct from emotion / housing / problem / opinion / compare / refuse / apology.
 * SHOW when complainTagged>0 + themes.complain; else HIDE.
 * ThemeSm58 close: 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-complain-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const GAMES = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    n: 10,
    needChip: true,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    n: 10,
    needChip: true,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    n: 10,
    needChip: true,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    n: 10,
    needChip: true,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    n: 10,
    needChip: true,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    n: 10,
    needChip: true,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    n: 8,
    needChip: true,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    n: 8,
    needChip: true,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_complain: "불만"') &&
    js.includes('theme_complain: "不满"') &&
    js.includes('theme_complain: "Complain"') &&
    /THEME_ORDER[\s\S]*?"complain"/.test(js) &&
    js.includes('theme_refuse: "거절"') &&
    js.includes('theme_problem: "문제"') &&
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_apology: "미안"') &&
    js.includes('theme_refuse: "拒绝"') &&
    js.includes('theme_problem: "问题"') &&
    js.includes('theme_opinion: "意见"') &&
    js.includes('theme_apology: "抱歉"')
  );
}

function distinctOk(js) {
  const bad = [
    [/theme_complain:\s*"걱정"/, /theme_complain:\s*"情绪"/],
    [/theme_complain:\s*"문제"/, /theme_complain:\s*"问题"/],
    [/theme_complain:\s*"의견"/, /theme_complain:\s*"意见"/],
    [/theme_complain:\s*"거절"/, /theme_complain:\s*"拒绝"/],
    [/theme_complain:\s*"미안"/, /theme_complain:\s*"抱歉"/],
    [/theme_complain:\s*"반대"/, /theme_complain:\s*"比较"/],
    [/theme_complain:\s*"Emotion"/],
    [/theme_complain:\s*"Problem"/],
    [/theme_complain:\s*"Opinion"/],
    [/theme_complain:\s*"Refuse"/],
    [/theme_complain:\s*"Apology"/],
    [/theme_complain:\s*"Compare"/],
  ];
  for (const group of bad) {
    for (const re of group) {
      if (re.test(js)) return false;
    }
  }
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) =>
    (it.tags || []).includes("complain")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("complain");
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
  const labels = cfg.needChip ? labelOk(js) && distinctOk(js) : true;
  const expectShow = tagged > 0 && themesHas(data);
  let ok = labels && show === expectShow;
  if (expectShow && cfg.n != null) ok = ok && tagged >= cfg.n;
  rows.push({ name, tagged, show, expectShow, labels, ok });
  console.log(
    `${name}: complainTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("complain")) continue;
    if (
      tags.includes("emotion") ||
      tags.includes("housing") ||
      tags.includes("problem") ||
      tags.includes("opinion") ||
      tags.includes("compare") ||
      tags.includes("refuse") ||
      tags.includes("apology")
    )
      both++;
  }
}
console.log(
  `\nbothTags vs emotion/housing/problem/opinion/compare/refuse/apology = ${both}`
);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm58 complain smoke PASS: ${showN}/8 SHOW · chip KO 불만 / ZH 不满 · emotion/housing/problem/opinion/compare/refuse/apology distinct · invent Next 금지 · ThemeSm58 close`
);

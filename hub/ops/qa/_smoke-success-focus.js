/**
 * ThemeSm53a — success focus smoke (tagged>0 only)
 * Pack success-challenge → tag `success`. Canon KO 성공 / ZH 成功 / EN Success.
 * Distinct from problem / reason / opinion / habit / apology.
 * SHOW when successTagged>0 + themes.success; else HIDE.
 * ThemeSm53a: speed(+cloze) · ThemeSm53b: +bingo/listen
 * ThemeSm53c: +particle/dictation(+tel/scramble) → 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-success-focus.js
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
    js.includes('theme_success: "성공"') &&
    js.includes('theme_success: "成功"') &&
    js.includes('theme_success: "Success"') &&
    /THEME_ORDER[\s\S]*?"success"/.test(js) &&
    js.includes('theme_problem: "문제"') &&
    js.includes('theme_reason: "이유"') &&
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_habit: "습관"') &&
    js.includes('theme_apology: "미안"') &&
    js.includes('theme_problem: "问题"') &&
    js.includes('theme_reason: "原因"') &&
    js.includes('theme_opinion: "意见"') &&
    js.includes('theme_habit: "习惯"') &&
    js.includes('theme_apology: "抱歉"')
  );
}

function distinctOk(js) {
  const bad = [
    [/theme_success:\s*"문제"/, /theme_success:\s*"问题"/],
    [/theme_success:\s*"이유"/, /theme_success:\s*"原因"/],
    [/theme_success:\s*"의견"/, /theme_success:\s*"意见"/],
    [/theme_success:\s*"습관"/, /theme_success:\s*"习惯"/],
    [/theme_success:\s*"미안"/, /theme_success:\s*"抱歉"/],
    [/theme_success:\s*"Problem"/],
    [/theme_success:\s*"Reason"/],
    [/theme_success:\s*"Opinion"/],
    [/theme_success:\s*"Habit"/],
    [/theme_success:\s*"Apology"/],
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
    (it.tags || []).includes("success")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("success");
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
    `${name}: successTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("success")) continue;
    if (
      tags.includes("problem") ||
      tags.includes("reason") ||
      tags.includes("opinion") ||
      tags.includes("habit") ||
      tags.includes("apology")
    )
      both++;
  }
}
console.log(`\nbothTags vs problem/reason/opinion/habit/apology = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm53c success smoke PASS: ${showN} SHOW · chip KO 성공 / ZH 成功 · problem/reason/opinion/habit/apology distinct · Suggest ThemeSm53c close`
);

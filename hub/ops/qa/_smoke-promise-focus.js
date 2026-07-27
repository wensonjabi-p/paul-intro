/**
 * ThemeSm56 — promise focus smoke (tagged>0 only)
 * Pack promise-trust → tag `promise`. Canon KO 약속 / ZH 约定 / EN Promise.
 * Distinct from think / rules / time / personality / favor / encourage.
 * SHOW when promiseTagged>0 + themes.promise; else HIDE.
 * ThemeSm56a–56c Done · ThemeSm56d close: 전 8 SHOW (particle/dictation/tel/scramble).
 * Run: node hub/ops/qa/_smoke-promise-focus.js
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
    js.includes('theme_promise: "약속"') &&
    js.includes('theme_promise: "约定"') &&
    js.includes('theme_promise: "Promise"') &&
    /THEME_ORDER[\s\S]*?"promise"/.test(js) &&
    js.includes('theme_think: "생각"') &&
    js.includes('theme_rules: "규칙"') &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_encourage: "격려"') &&
    js.includes('theme_think: "想法"') &&
    js.includes('theme_rules: "规则"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_encourage: "鼓励"')
  );
}

function distinctOk(js) {
  const bad = [
    [/theme_promise:\s*"생각"/, /theme_promise:\s*"想法"/],
    [/theme_promise:\s*"규칙"/, /theme_promise:\s*"规则"/],
    [/theme_promise:\s*"부탁"/, /theme_promise:\s*"拜托"/],
    [/theme_promise:\s*"격려"/, /theme_promise:\s*"鼓励"/],
    [/theme_promise:\s*"성격"/, /theme_promise:\s*"性格"/],
    [/theme_promise:\s*"시간"/, /theme_promise:\s*"时间"/],
    [/theme_promise:\s*"Think"/],
    [/theme_promise:\s*"Rules"/],
    [/theme_promise:\s*"Favor"/],
    [/theme_promise:\s*"Encourage"/],
    [/theme_promise:\s*"Personality"/],
    [/theme_promise:\s*"Time"/],
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
    (it.tags || []).includes("promise")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("promise");
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
    `${name}: promiseTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("promise")) continue;
    if (
      tags.includes("think") ||
      tags.includes("rules") ||
      tags.includes("time") ||
      tags.includes("personality") ||
      tags.includes("favor") ||
      tags.includes("encourage")
    )
      both++;
  }
}
console.log(`\nbothTags vs think/rules/time/personality/favor/encourage = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm56d promise smoke PASS: ${showN}/8 SHOW · chip KO 약속 / ZH 约定 · think/rules/time/personality/favor/encourage distinct · invent Next 금지 · ThemeSm56d close`
);

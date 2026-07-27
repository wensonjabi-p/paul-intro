/**
 * ThemeSm49a — rules focus smoke (tagged>0 only)
 * Pack rules-permission → tag `rules`. Canon KO 규칙 / ZH 规则 / EN Rules.
 * Distinct from favor / problem / jobs / opinion.
 * SHOW when rulesTagged>0 + themes.rules; else HIDE.
 * ThemeSm49b: speed+cloze+bingo+listen SHOW (rulesTagged=10×4).
 * ThemeSm49d close: particle/dictation(+tel/scramble) tagged → 전 8 SHOW
 *   (rulesTagged 10×6 + 8×2). Run: node hub/ops/qa/_smoke-rules-focus.js
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
    js.includes('theme_rules: "규칙"') &&
    js.includes('theme_rules: "规则"') &&
    js.includes('theme_rules: "Rules"') &&
    /THEME_ORDER[\s\S]*?"rules"/.test(js) &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_problem: "문제"') &&
    js.includes('theme_jobs: "직업"') &&
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_problem: "问题"') &&
    js.includes('theme_jobs: "职业"') &&
    js.includes('theme_opinion: "意见"')
  );
}

function distinctOk(js) {
  // rules must not reuse favor/problem/jobs/opinion canon labels
  if (js.match(/theme_rules:\s*"부탁"/) || js.match(/theme_rules:\s*"拜托"/))
    return false;
  if (js.match(/theme_rules:\s*"문제"/) || js.match(/theme_rules:\s*"问题"/))
    return false;
  if (js.match(/theme_rules:\s*"직업"/) || js.match(/theme_rules:\s*"职业"/))
    return false;
  if (js.match(/theme_rules:\s*"의견"/) || js.match(/theme_rules:\s*"意见"/))
    return false;
  if (
    js.match(/theme_rules:\s*"Favor"/) ||
    js.match(/theme_rules:\s*"Problem"/) ||
    js.match(/theme_rules:\s*"Jobs"/) ||
    js.match(/theme_rules:\s*"Opinion"/)
  )
    return false;
  return true;
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("rules"))
    .length;
}

function themesHas(data) {
  return (data.themes || []).includes("rules");
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
    `${name}: rulesTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("rules")) continue;
    if (
      tags.includes("favor") ||
      tags.includes("problem") ||
      tags.includes("jobs") ||
      tags.includes("opinion")
    )
      both++;
  }
}
console.log(`\nbothTags vs favor/problem/jobs/opinion = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm49d rules smoke PASS: ${showN} SHOW · chip KO 규칙 / ZH 规则 · favor/problem/jobs/opinion distinct · rules-permission 스윕 닫힘`
);

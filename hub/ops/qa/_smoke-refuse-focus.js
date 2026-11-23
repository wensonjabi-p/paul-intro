/**
 * ThemeSm57 — refuse focus smoke (tagged>0 only)
 * Pack refuse-accept → tag `refuse`. Canon KO 거절 / ZH 拒绝 / EN Refuse.
 * Distinct from opinion / compare / rules / promise / favor / advice / apology / speech.
 * SHOW when refuseTagged>0 + themes.refuse; else HIDE.
 * ThemeSm57a–57 close: 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-refuse-focus.js
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
    js.includes('theme_refuse: "거절"') &&
    js.includes('theme_refuse: "拒绝"') &&
    js.includes('theme_refuse: "Refuse"') &&
    /THEME_ORDER[\s\S]*?"refuse"/.test(js) &&
    js.includes('theme_promise: "약속"') &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_advice: "조언"') &&
    js.includes('theme_apology: "미안"') &&
    js.includes('theme_promise: "约定"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_advice: "建议"') &&
    js.includes('theme_apology: "抱歉"')
  );
}

function distinctOk(js) {
  const bad = [
    [/theme_refuse:\s*"약속"/, /theme_refuse:\s*"约定"/],
    [/theme_refuse:\s*"부탁"/, /theme_refuse:\s*"拜托"/],
    [/theme_refuse:\s*"조언"/, /theme_refuse:\s*"建议"/],
    [/theme_refuse:\s*"미안"/, /theme_refuse:\s*"抱歉"/],
    [/theme_refuse:\s*"동의"/, /theme_refuse:\s*"同意"/],
    [/theme_refuse:\s*"규칙"/, /theme_refuse:\s*"规则"/],
    [/theme_refuse:\s*"Promise"/],
    [/theme_refuse:\s*"Favor"/],
    [/theme_refuse:\s*"Advice"/],
    [/theme_refuse:\s*"Apology"/],
    [/theme_refuse:\s*"Opinion"/],
    [/theme_refuse:\s*"Rules"/],
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
    (it.tags || []).includes("refuse")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("refuse");
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
    `${name}: refuseTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("refuse")) continue;
    if (
      tags.includes("opinion") ||
      tags.includes("compare") ||
      tags.includes("rules") ||
      tags.includes("promise") ||
      tags.includes("favor") ||
      tags.includes("advice") ||
      tags.includes("apology") ||
      tags.includes("speech")
    )
      both++;
  }
}
console.log(
  `\nbothTags vs opinion/compare/rules/promise/favor/advice/apology/speech = ${both}`
);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm57 refuse smoke PASS: ${showN}/8 SHOW · chip KO 거절 / ZH 拒绝 · opinion/compare/rules/promise/favor/advice/apology/speech distinct · invent Next 금지 · ThemeSm57 close`
);

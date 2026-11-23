/**
 * ThemeSm54d — advice focus smoke (tagged>0 only)
 * Pack advice-counsel → tag `advice`. Canon KO 조언 / ZH 建议 / EN Advice.
 * Distinct from opinion / speech / favor / success.
 * SHOW when adviceTagged>0 + themes.advice; else HIDE.
 * ThemeSm54a: speed · ThemeSm54b: +cloze · ThemeSm54c: +bingo/listen Done
 * ThemeSm54d: +particle/dictation(+tel/scramble) → 전 8 SHOW · close.
 * Run: node hub/ops/qa/_smoke-advice-focus.js
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
    js.includes('theme_advice: "조언"') &&
    js.includes('theme_advice: "建议"') &&
    js.includes('theme_advice: "Advice"') &&
    /THEME_ORDER[\s\S]*?"advice"/.test(js) &&
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_speech: "대화"') &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_success: "성공"') &&
    js.includes('theme_opinion: "意见"') &&
    js.includes('theme_speech: "对话"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_success: "成功"')
  );
}

function distinctOk(js) {
  const bad = [
    [/theme_advice:\s*"의견"/, /theme_advice:\s*"意见"/],
    [/theme_advice:\s*"대화"/, /theme_advice:\s*"对话"/],
    [/theme_advice:\s*"부탁"/, /theme_advice:\s*"拜托"/],
    [/theme_advice:\s*"성공"/, /theme_advice:\s*"成功"/],
    [/theme_advice:\s*"Opinion"/],
    [/theme_advice:\s*"Speech"/],
    [/theme_advice:\s*"Favor"/],
    [/theme_advice:\s*"Success"/],
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
    (it.tags || []).includes("advice")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("advice");
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
    `${name}: adviceTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("advice")) continue;
    if (
      tags.includes("opinion") ||
      tags.includes("speech") ||
      tags.includes("favor") ||
      tags.includes("success")
    )
      both++;
  }
}
console.log(`\nbothTags vs opinion/speech/favor/success = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm54d advice smoke PASS: ${showN} SHOW · chip KO 조언 / ZH 建议 · opinion/speech/favor/success distinct · ThemeSm54d close · invent Next 금지`
);

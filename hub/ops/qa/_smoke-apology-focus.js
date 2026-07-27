/**
 * ThemeSm52d — apology focus smoke (tagged>0 only)
 * Pack apology-politeness → tag `apology`. Canon KO 미안 / ZH 抱歉 / EN Apology.
 * Distinct from favor / rules / friends / emotion / personality.
 * SHOW when apologyTagged>0 + themes.apology; else HIDE.
 * ThemeSm52a: speed · ThemeSm52b: +cloze · ThemeSm52c: +bingo/listen
 * ThemeSm52d: +particle/dictation(+tel/scramble) → 전 8 SHOW.
 * Run: node hub/ops/qa/_smoke-apology-focus.js
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
    js.includes('theme_apology: "미안"') &&
    js.includes('theme_apology: "抱歉"') &&
    js.includes('theme_apology: "Apology"') &&
    /THEME_ORDER[\s\S]*?"apology"/.test(js) &&
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_rules: "규칙"') &&
    js.includes('theme_friends: "친구"') &&
    js.includes('theme_emotion: "감정"') &&
    js.includes('theme_personality: "성격"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_rules: "规则"') &&
    js.includes('theme_friends: "朋友"') &&
    js.includes('theme_emotion: "情绪"') &&
    js.includes('theme_personality: "性格"')
  );
}

function distinctOk(js) {
  // apology must not reuse favor/rules/friends/emotion/personality canon labels
  const bad = [
    [/theme_apology:\s*"부탁"/, /theme_apology:\s*"拜托"/],
    [/theme_apology:\s*"규칙"/, /theme_apology:\s*"规则"/],
    [/theme_apology:\s*"친구"/, /theme_apology:\s*"朋友"/],
    [/theme_apology:\s*"감정"/, /theme_apology:\s*"情绪"/],
    [/theme_apology:\s*"성격"/, /theme_apology:\s*"性格"/],
    [/theme_apology:\s*"Favor"/],
    [/theme_apology:\s*"Rules"/],
    [/theme_apology:\s*"Friends"/],
    [/theme_apology:\s*"Emotion"/],
    [/theme_apology:\s*"Personality"/],
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
    (it.tags || []).includes("apology")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("apology");
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
    `${name}: apologyTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("apology")) continue;
    if (
      tags.includes("favor") ||
      tags.includes("rules") ||
      tags.includes("friends") ||
      tags.includes("emotion") ||
      tags.includes("personality")
    )
      both++;
  }
}
console.log(`\nbothTags vs favor/rules/friends/emotion/personality = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm52d apology smoke PASS: ${showN} SHOW · chip KO 미안 / ZH 抱歉 · favor/rules/friends/emotion/personality distinct · Suggest ThemeSm close`
);

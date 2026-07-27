/**
 * ThemeSm51c — personality focus smoke (tagged>0 only) · sweep closed
 * Pack personality-character → tag `personality`. Canon KO 성격 / ZH 性格 / EN Personality.
 * Distinct from opinion / emotion / habit / friends.
 * SHOW when personalityTagged>0 + themes.personality; else HIDE.
 * ThemeSm51a: speed(+cloze) · ThemeSm51b: +bingo/listen · ThemeSm51c: +particle/dictation(+tel/scramble)
 *   → personalityTagged=10×6 + 8×2 · 전 8 SHOW · personality-character 스윕 닫힘.
 * Run: node hub/ops/qa/_smoke-personality-focus.js
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
    js.includes('theme_personality: "성격"') &&
    js.includes('theme_personality: "性格"') &&
    js.includes('theme_personality: "Personality"') &&
    /THEME_ORDER[\s\S]*?"personality"/.test(js) &&
    js.includes('theme_opinion: "의견"') &&
    js.includes('theme_emotion: "감정"') &&
    js.includes('theme_habit: "습관"') &&
    js.includes('theme_friends: "친구"') &&
    js.includes('theme_opinion: "意见"') &&
    js.includes('theme_emotion: "情绪"') &&
    js.includes('theme_habit: "习惯"') &&
    js.includes('theme_friends: "朋友"')
  );
}

function distinctOk(js) {
  // personality must not reuse opinion/emotion/habit/friends canon labels
  const bad = [
    [/theme_personality:\s*"의견"/, /theme_personality:\s*"意见"/],
    [/theme_personality:\s*"감정"/, /theme_personality:\s*"情绪"/],
    [/theme_personality:\s*"습관"/, /theme_personality:\s*"习惯"/],
    [/theme_personality:\s*"친구"/, /theme_personality:\s*"朋友"/],
    [/theme_personality:\s*"Opinion"/],
    [/theme_personality:\s*"Emotion"/],
    [/theme_personality:\s*"Habit"/],
    [/theme_personality:\s*"Friends"/],
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
    (it.tags || []).includes("personality")
  ).length;
}

function themesHas(data) {
  return (data.themes || []).includes("personality");
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
    `${name}: personalityTagged=${tagged} chip=${show ? "SHOW" : "HIDE"} (expect ${expectShow ? "SHOW" : "HIDE"}) labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const banks = Object.keys(GAMES).map((n) => load(GAMES[n].file));
let both = 0;
for (const data of banks) {
  for (const it of data.items || []) {
    const tags = it.tags || [];
    if (!tags.includes("personality")) continue;
    if (
      tags.includes("opinion") ||
      tags.includes("emotion") ||
      tags.includes("habit") ||
      tags.includes("friends")
    )
      both++;
  }
}
console.log(`\nbothTags vs opinion/emotion/habit/friends = ${both}`);
if (both !== 0) fail++;

const showN = rows.filter((r) => r.show).length;
console.log(`SHOW ${showN}/8 · tagged>0 only`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log(
  `ThemeSm51c personality smoke PASS: ${showN} SHOW · chip KO 성격 / ZH 性格 · opinion/emotion/habit/friends distinct`
);

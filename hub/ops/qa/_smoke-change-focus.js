/**
 * ThemeSm43d / ThemeSm43b + ThemeSm close — change focus smoke
 * Pack change-progress → tag `change`. Canon KO 변화 / ZH 变化 / EN Change.
 * Distinct from motion / size / routine / time / favor / speech / think.
 * SHOW when changeTagged>0 + themes.change.
 * particle/dictation/speed/cloze/bingo/listen =10; tel/scramble thin =8.
 * ThemeSm close: 전 8 SHOW. ThemeSm43d = particle/dictation/tel/scramble chip verify.
 * Run: node hub/ops/qa/_smoke-change-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
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
    needMin: 9,
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
    js.includes('theme_change: "변화"') &&
    js.includes('theme_change: "变化"') &&
    js.includes('theme_change: "Change"') &&
    /THEME_ORDER[\s\S]*?"change"/.test(js)
  );
}

function taggedCount(data) {
  return (data.items || []).filter((it) => (it.tags || []).includes("change")).length;
}

function themesHas(data) {
  return (data.themes || []).includes("change");
}

function chipShows(data, needMin) {
  const n = taggedCount(data);
  if (!themesHas(data) || n <= 0) return false;
  if (needMin && n < needMin) return false;
  return true;
}

let fail = 0;
const rows = [];

for (const [name, cfg] of Object.entries(SHOW)) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = taggedCount(data);
  const show = chipShows(data, cfg.needMin);
  const labels = labelOk(js);
  const nOk = tagged >= cfg.n;
  const ok = show && labels && nOk;
  rows.push({ name, tagged, show, labels, ok });
  console.log(
    `${name}: changeTagged=${tagged} (≥${cfg.n}) chip=${show ? "SHOW" : "HIDE"} labels=${labels ? "OK" : "FAIL"} ${ok ? "PASS" : "FAIL"}`
  );
  if (!ok) fail++;
}

const showN = rows.filter((r) => r.show).length;
console.log(`\nSHOW ${showN}/8 · ThemeSm43b bingo/listen: ${rows.find((r) => r.name === "bingo")?.ok && rows.find((r) => r.name === "listen")?.ok ? "PASS" : "FAIL"}`);

if (fail) {
  console.error(`SMOKE FAIL (${fail})`);
  process.exit(1);
}
console.log("ThemeSm change smoke PASS: 전 8 SHOW · chip KO 변화 / ZH 变化");

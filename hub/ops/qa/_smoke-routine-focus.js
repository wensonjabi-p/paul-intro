/**
 * ThemeSm32a / ThemeSm32d — routine focus smoke (all 8 games · daily-routine sweep closed)
 * Pack daily-routine → tag `routine`. Distinct from time.
 * Run: node hub/ops/qa/_smoke-routine-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const EXPECT = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-371",
    last: "sq-380",
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-363",
    last: "c-372",
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-418",
    last: "bg-427",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-385",
    last: "lm-394",
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-367",
    last: "ps-376",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-373",
    last: "d-382",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-364",
    last: "tel-373",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-366",
    last: "ws-375",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_routine: "일상"') &&
    js.includes('theme_routine: "日常"') &&
    js.includes('theme_routine: "Routine"')
  );
}

function orderOk(js) {
  return /\broutine\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function timeDistinct(js) {
  return (
    js.includes('theme_time: "시간"') &&
    js.includes('theme_routine: "일상"') &&
    !js.match(/theme_routine:\s*"시간"/) &&
    js.includes('theme_time: "时间"') &&
    js.includes('theme_routine: "日常"') &&
    !js.match(/theme_routine:\s*"时间"/)
  );
}

function smokeGame(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("routine"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("routine");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const ok =
    tagged.length === 10 &&
    hasMeta &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    timeDistinct(js);
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "routineTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH/EN=" + labelOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsTime=" + timeDistinct(js)
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm32d routine focus smoke (all 8) ===");
Object.keys(EXPECT).forEach((label) => smokeGame(label, EXPECT[label]));

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm32d routine focus ×8 · daily-routine sweep closed · time distinct");
}

/**
 * ThemeSm34a–b — senses focus smoke (all 8 · temperature-senses)
 * Pack temperature-senses → tag `senses`. Distinct from weather/emotion.
 * ThemeSm34b: bingo+listen SHOW (sensesTagged=10 + themes).
 * Sibling data: particle/dictation/tel/scramble also tagged → chips SHOW via ThemeSm34a canon.
 * Run: node hub/ops/qa/_smoke-senses-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-391",
    last: "sq-400",
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-383",
    last: "c-392",
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-438",
    last: "bg-447",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-405",
    last: "lm-414",
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-387",
    last: "ps-396",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-393",
    last: "d-402",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-384",
    last: "tel-393",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-386",
    last: "ws-395",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_senses: "감각"') &&
    js.includes('theme_senses: "感觉"') &&
    js.includes('theme_senses: "Senses"')
  );
}

function orderOk(js) {
  return /\bsenses\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function weatherEmotionDistinct(js) {
  return (
    js.includes('theme_weather: "날씨"') &&
    js.includes('theme_senses: "감각"') &&
    !js.match(/theme_senses:\s*"날씨"/) &&
    js.includes('theme_emotion: "감정"') &&
    !js.match(/theme_senses:\s*"감정"/) &&
    js.includes('theme_weather: "天气"') &&
    js.includes('theme_senses: "感觉"') &&
    !js.match(/theme_senses:\s*"天气"/) &&
    js.includes('theme_emotion: "情绪"') &&
    !js.match(/theme_senses:\s*"情绪"/)
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("senses"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("senses");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const ok =
    tagged.length === 10 &&
    hasMeta &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    weatherEmotionDistinct(js);
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "sensesTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH/EN=" + labelOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsWeatherEmotion=" + weatherEmotionDistinct(js)
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm34b senses focus smoke (all 8 SHOW · temperature-senses) ===");
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm34b senses focus ×8 · bingo/listen(+sibling 4) SHOW · weather/emotion distinct"
  );
}

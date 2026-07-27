/**
 * ThemeSm30 / ThemeSm30d — jobs focus smoke (all 8 games · jobs-occupations sweep closed)
 * Run: node hub/ops/qa/_smoke-jobs-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const EXPECT = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-351",
    last: "sq-360",
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-343",
    last: "c-352",
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-398",
    last: "bg-407",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-365",
    last: "lm-374",
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-347",
    last: "ps-356",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-353",
    last: "d-362",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-344",
    last: "tel-353",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-346",
    last: "ws-355",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_jobs: "직업"') &&
    js.includes('theme_jobs: "职业"') &&
    js.includes('theme_jobs: "Jobs"')
  );
}

function orderOk(js) {
  return /\bjobs\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function smokeGame(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("jobs"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("jobs");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const ok = tagged.length === 10 && hasMeta && labelOk(js) && orderOk(js) && idOk;
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "jobsTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH/EN=" + labelOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?")
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm30d jobs focus smoke (all 8) ===");
Object.keys(EXPECT).forEach((label) => smokeGame(label, EXPECT[label]));

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm30d jobs focus ×8 · jobs-occupations sweep closed");
}

/**
 * ThemeSm31 / ThemeSm31d — country focus smoke (all 8 games · countries-nationality sweep closed)
 * Run: node hub/ops/qa/_smoke-country-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const EXPECT = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-361",
    last: "sq-370",
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-353",
    last: "c-362",
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-408",
    last: "bg-417",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-375",
    last: "lm-384",
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-357",
    last: "ps-366",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-363",
    last: "d-372",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-354",
    last: "tel-363",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-356",
    last: "ws-365",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_country: "국가"') &&
    js.includes('theme_country: "国家"') &&
    js.includes('theme_country: "Country"')
  );
}

function orderOk(js) {
  return /\bcountry\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function smokeGame(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("country"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("country");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const travelDistinct =
    js.includes('theme_travel: "여행"') &&
    js.includes('theme_country: "국가"') &&
    !js.match(/theme_country:\s*"여행"/);
  const ok =
    tagged.length === 10 && hasMeta && labelOk(js) && orderOk(js) && idOk && travelDistinct;
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "countryTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH/EN=" + labelOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsTravel=" + travelDistinct
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm31d country focus smoke (all 8) ===");
Object.keys(EXPECT).forEach((label) => smokeGame(label, EXPECT[label]));

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm31d country focus ×8 · countries-nationality sweep closed");
}

/**
 * ThemeSm33a–d — size focus smoke (all 8 games · size-quantity sweep closed)
 * Pack size-quantity → tag `size`. Distinct from clothes.
 * Run: node hub/ops/qa/_smoke-size-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const EXPECT = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-381",
    last: "sq-390",
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-373",
    last: "c-382",
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-428",
    last: "bg-437",
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-395",
    last: "lm-404",
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-377",
    last: "ps-386",
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-383",
    last: "d-392",
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-374",
    last: "tel-383",
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-376",
    last: "ws-385",
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_size: "크기"') &&
    js.includes('theme_size: "大小"') &&
    js.includes('theme_size: "Size"')
  );
}

function orderOk(js) {
  return /\bsize\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function clothesDistinct(js) {
  return (
    js.includes('theme_clothes: "옷"') &&
    js.includes('theme_size: "크기"') &&
    !js.match(/theme_size:\s*"옷"/) &&
    js.includes('theme_clothes: "服装"') &&
    js.includes('theme_size: "大小"') &&
    !js.match(/theme_size:\s*"服装"/)
  );
}

function smokeGame(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("size"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("size");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const ok =
    tagged.length === 10 &&
    hasMeta &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    clothesDistinct(js);
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "sizeTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH/EN=" + labelOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsClothes=" + clothesDistinct(js)
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm33d size focus smoke (all 8) ===");
Object.keys(EXPECT).forEach((label) => smokeGame(label, EXPECT[label]));

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm33d size focus ×8 · size-quantity sweep closed · clothes distinct");
}

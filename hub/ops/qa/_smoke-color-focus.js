/**
 * ThemeSm35a–d — color focus smoke (all 8 · colors-shapes)
 * Pack colors-shapes → tag `color`. Canon KO 색깔 / ZH 颜色 / EN Color.
 * Distinct from clothes. SHOW when colorTagged>0 + themes.color.
 * ThemeSm35d: particle/dictation/tel/scramble also tagged → chips SHOW (sweep close).
 * Run: node hub/ops/qa/_smoke-color-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-401",
    last: "sq-410",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-393",
    last: "c-402",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-448",
    last: "bg-457",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-415",
    last: "lm-424",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-397",
    last: "ps-406",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-403",
    last: "d-412",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-394",
    last: "tel-401",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-396",
    last: "ws-403",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_color: "색깔"') &&
    js.includes('theme_color: "颜色"') &&
    js.includes('theme_color: "Color"')
  );
}

function orderOk(js) {
  return /\bcolor\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function clothesDistinct(js) {
  return (
    js.includes('theme_clothes: "옷"') &&
    js.includes('theme_color: "색깔"') &&
    !js.match(/theme_color:\s*"옷"/) &&
    js.includes('theme_clothes: "服装"') &&
    js.includes('theme_color: "颜色"') &&
    !js.match(/theme_color:\s*"服装"/)
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("color") ||
    bankItems.some((it) => (it.tags || []).includes("color"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("color"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("color");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const show = chipWouldShow(data);
  const ok =
    tagged.length === cfg.n &&
    hasMeta &&
    show &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    clothesDistinct(js);
  console.log(
    ok ? "OK" : "FAIL",
    "SHOW",
    label,
    "colorTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsClothes=" + clothesDistinct(js)
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm35d color focus smoke (all 8 SHOW · colors-shapes sweep close) ===");
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm35d color focus ×8 · particle/dictation/tel/scramble(+speed/cloze/bingo/listen) SHOW · clothes distinct · colors-shapes 스윕 닫힘"
  );
}

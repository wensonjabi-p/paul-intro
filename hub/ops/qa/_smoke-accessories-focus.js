/**
 * ThemeSm36d — accessories focus smoke (전 8 SHOW · accessories-belongings sweep closed)
 * Pack accessories-belongings → tag `accessories`. Canon KO 소지품 / ZH 随身 / EN Accessories.
 * Distinct from clothes. SHOW when accessoriesTagged>0 + themes.accessories.
 * tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-accessories-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-411",
    last: "sq-420",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-403",
    last: "c-412",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-458",
    last: "bg-467",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-425",
    last: "lm-434",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-407",
    last: "ps-416",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-413",
    last: "d-422",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-402",
    last: "tel-409",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-404",
    last: "ws-411",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_accessories: "소지품"') &&
    js.includes('theme_accessories: "随身"') &&
    js.includes('theme_accessories: "Accessories"')
  );
}

function orderOk(js) {
  return /\baccessories\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function clothesDistinct(js) {
  return (
    js.includes('theme_clothes: "옷"') &&
    js.includes('theme_accessories: "소지품"') &&
    !js.match(/theme_accessories:\s*"옷"/) &&
    js.includes('theme_clothes: "服装"') &&
    js.includes('theme_accessories: "随身"') &&
    !js.match(/theme_accessories:\s*"服装"/)
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("accessories") ||
    bankItems.some((it) => (it.tags || []).includes("accessories"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("accessories"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("accessories");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const bothClothes = tagged.filter((it) => (it.tags || []).includes("clothes")).length;
  const show = chipWouldShow(data);
  const ok =
    tagged.length === cfg.n &&
    hasMeta &&
    show &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    clothesDistinct(js) &&
    bothClothes === 0;
  console.log(
    ok ? "OK" : "FAIL",
    "SHOW",
    label,
    "accessoriesTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsClothes=" + clothesDistinct(js),
    "bothTags=" + bothClothes
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log("=== ThemeSm36d accessories focus smoke (전 8 SHOW · sweep closed) ===");
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm36d accessories · 전 8 SHOW · clothes distinct · 칩 소지품/随身 · accessories-belongings 스윕 닫힘"
  );
}

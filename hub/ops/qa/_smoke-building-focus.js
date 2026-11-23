/**
 * ThemeSm38d — building focus smoke (전 8 SHOW · building-facilities sweep close)
 * Pack building-facilities → tag `building`. Canon KO 건물 / ZH 建筑 / EN Building.
 * Distinct from electric / furniture / housing / places / driving.
 * SHOW when buildingTagged>0 + themes.building.
 * tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-building-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-431",
    last: "sq-440",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-423",
    last: "c-432",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-478",
    last: "bg-487",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-445",
    last: "lm-454",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-427",
    last: "ps-436",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-433",
    last: "d-442",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-418",
    last: "tel-425",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-420",
    last: "ws-427",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_building: "건물"') &&
    js.includes('theme_building: "建筑"') &&
    js.includes('theme_building: "Building"')
  );
}

function orderOk(js) {
  return /\bbuilding\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  const buildingKO = js.includes('theme_building: "건물"');
  const buildingZH = js.includes('theme_building: "建筑"');
  if (!buildingKO || !buildingZH) return false;
  if (js.match(/theme_building:\s*"전기"/) || js.match(/theme_building:\s*"电器"/)) return false;
  if (js.match(/theme_building:\s*"가구"/) || js.match(/theme_building:\s*"家具"/)) return false;
  if (js.match(/theme_building:\s*"주거"/) || js.match(/theme_building:\s*"居住"/)) return false;
  if (js.match(/theme_building:\s*"장소"/) || js.match(/theme_building:\s*"场所"/)) return false;
  return (
    js.includes('theme_electric: "전기"') &&
    js.includes('theme_furniture: "가구"') &&
    js.includes('theme_places: "장소"') &&
    js.includes('theme_electric: "电器"') &&
    js.includes('theme_furniture: "家具"') &&
    js.includes('theme_places: "场所"')
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("building") ||
    bankItems.some((it) => (it.tags || []).includes("building"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("building"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("building");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return (
      t.includes("electric") ||
      t.includes("furniture") ||
      t.includes("housing") ||
      t.includes("places") ||
      t.includes("driving")
    );
  }).length;
  const show = chipWouldShow(data);
  const ok =
    tagged.length === cfg.n &&
    hasMeta &&
    show &&
    labelOk(js) &&
    orderOk(js) &&
    idOk &&
    distinctOk(js) &&
    overlap === 0;
  console.log(
    ok ? "OK" : "FAIL",
    "SHOW",
    label,
    "buildingTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsElectricFurnitureHousingPlaces=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm38d building focus smoke (전 8 SHOW · building-facilities sweep close) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm38d building · 전 8 SHOW · electric/furniture/housing/places distinct · 칩 건물/建筑 · building-facilities 스윕 닫힘"
  );
}

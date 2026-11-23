/**
 * ThemeSm37d(+37b) — electric focus smoke (전 8 SHOW · electricity-appliances sweep close)
 * Pack electricity-appliances → tag `electric`. Canon KO 전기 / ZH 电器 / EN Electricity.
 * Distinct from chores / media / digital. SHOW when electricTagged>0 + themes.electric.
 * tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-electric-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-421",
    last: "sq-430",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-413",
    last: "c-422",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-468",
    last: "bg-477",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-435",
    last: "lm-444",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-417",
    last: "ps-426",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-423",
    last: "d-432",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-410",
    last: "tel-417",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-412",
    last: "ws-419",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_electric: "전기"') &&
    js.includes('theme_electric: "电器"') &&
    js.includes('theme_electric: "Electricity"')
  );
}

function orderOk(js) {
  return /\belectric\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  return (
    js.includes('theme_chores: "집안일"') &&
    js.includes('theme_electric: "전기"') &&
    !js.match(/theme_electric:\s*"집안일"/) &&
    js.includes('theme_media: "미디어"') &&
    !js.match(/theme_electric:\s*"미디어"/) &&
    js.includes('theme_digital: "디지털"') &&
    !js.match(/theme_electric:\s*"디지털"/) &&
    js.includes('theme_chores: "家务"') &&
    js.includes('theme_electric: "电器"') &&
    !js.match(/theme_electric:\s*"家务"/) &&
    js.includes('theme_media: "媒体"') &&
    !js.match(/theme_electric:\s*"媒体"/) &&
    js.includes('theme_digital: "数码"') &&
    !js.match(/theme_electric:\s*"数码"/)
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("electric") ||
    bankItems.some((it) => (it.tags || []).includes("electric"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("electric"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("electric");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return t.includes("chores") || t.includes("media") || t.includes("digital");
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
    "electricTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsChoresMediaDigital=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm37d(+37b) electric focus smoke (전 8 SHOW · electricity-appliances sweep close) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm37d electric · 전 8 SHOW · chores/media/digital distinct · 칩 전기/电器 · electricity-appliances 스윕 닫힘"
  );
}

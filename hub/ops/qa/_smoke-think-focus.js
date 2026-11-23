/**
 * ThemeSm close (ThemeSm41d) — think focus smoke (전 8 SHOW · thoughts-plans sweep close)
 * Pack thoughts-plans → tag `think`. Canon KO 생각 / ZH 想法 / EN Think.
 * Distinct from favor / emotion / routine.
 * SHOW when thinkTagged>0 + themes.think.
 * particle/dictation =10; tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-think-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-461",
    last: "sq-470",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-453",
    last: "c-462",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-508",
    last: "bg-517",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-475",
    last: "lm-484",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-457",
    last: "ps-466",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-463",
    last: "d-472",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-442",
    last: "tel-449",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-444",
    last: "ws-451",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_think: "생각"') &&
    js.includes('theme_think: "想法"') &&
    js.includes('theme_think: "Think"')
  );
}

function orderOk(js) {
  return /\bthink\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  const thinkKO = js.includes('theme_think: "생각"');
  const thinkZH = js.includes('theme_think: "想法"');
  if (!thinkKO || !thinkZH) return false;
  if (js.match(/theme_think:\s*"부탁"/) || js.match(/theme_think:\s*"拜托"/)) return false;
  if (js.match(/theme_think:\s*"감정"/) || js.match(/theme_think:\s*"情绪"/)) return false;
  if (js.match(/theme_think:\s*"일상"/) || js.match(/theme_think:\s*"日常"/)) return false;
  return (
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_emotion: "감정"') &&
    js.includes('theme_routine: "일상"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_emotion: "情绪"') &&
    js.includes('theme_routine: "日常"')
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("think") ||
    bankItems.some((it) => (it.tags || []).includes("think"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("think"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("think");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return t.includes("favor") || t.includes("emotion") || t.includes("routine");
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
    "thinkTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsFavorEmotionRoutine=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm close think focus smoke (전 8 SHOW · thoughts-plans sweep close) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm close think · 전 8 SHOW · favor/emotion/routine distinct · 칩 생각/想法 · thoughts-plans 스윕 닫힘"
  );
}

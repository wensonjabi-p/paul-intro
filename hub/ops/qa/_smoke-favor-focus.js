/**
 * ThemeSm40d — favor focus smoke (전 8 SHOW · requests-favors sweep close)
 * Pack requests-favors → tag `favor`. Canon KO 부탁 / ZH 拜托 / EN Favor.
 * Distinct from celebration / jobs / routine.
 * SHOW when favorTagged>0 + themes.favor.
 * particle/dictation =10; tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-favor-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-451",
    last: "sq-460",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-443",
    last: "c-452",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-498",
    last: "bg-507",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-465",
    last: "lm-474",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-447",
    last: "ps-456",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-453",
    last: "d-462",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-434",
    last: "tel-441",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-436",
    last: "ws-443",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_favor: "Favor"')
  );
}

function orderOk(js) {
  return /\bfavor\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  const favorKO = js.includes('theme_favor: "부탁"');
  const favorZH = js.includes('theme_favor: "拜托"');
  if (!favorKO || !favorZH) return false;
  if (js.match(/theme_favor:\s*"축하"/) || js.match(/theme_favor:\s*"庆祝"/)) return false;
  if (js.match(/theme_favor:\s*"직업"/) || js.match(/theme_favor:\s*"职业"/)) return false;
  if (js.match(/theme_favor:\s*"일상"/) || js.match(/theme_favor:\s*"日常"/)) return false;
  return (
    js.includes('theme_celebration: "축하"') &&
    js.includes('theme_jobs: "직업"') &&
    js.includes('theme_routine: "일상"') &&
    js.includes('theme_celebration: "庆祝"') &&
    js.includes('theme_jobs: "职业"') &&
    js.includes('theme_routine: "日常"')
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("favor") ||
    bankItems.some((it) => (it.tags || []).includes("favor"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("favor"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("favor");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return t.includes("celebration") || t.includes("jobs") || t.includes("routine");
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
    "favorTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsCelebrationJobsRoutine=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm40d favor focus smoke (전 8 SHOW · requests-favors sweep close) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm40d favor · 전 8 SHOW · celebration/jobs/routine distinct · 칩 부탁/拜托 · requests-favors 스윕 닫힘"
  );
}

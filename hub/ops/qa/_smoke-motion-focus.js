/**
 * ThemeSm39a — motion focus smoke (전 8 SHOW · movement-actions chip enable)
 * Pack movement-actions → tag `motion`. Canon KO 동작 / ZH 动作 / EN Motion.
 * Distinct from direction / routine / driving / body / sports / transit.
 * SHOW when motionTagged>0 + themes.motion.
 * tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-motion-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-441",
    last: "sq-450",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-433",
    last: "c-442",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-488",
    last: "bg-497",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-455",
    last: "lm-464",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-437",
    last: "ps-446",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-443",
    last: "d-452",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-426",
    last: "tel-433",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-428",
    last: "ws-435",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_motion: "동작"') &&
    js.includes('theme_motion: "动作"') &&
    js.includes('theme_motion: "Motion"')
  );
}

function orderOk(js) {
  return /\bmotion\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  const motionKO = js.includes('theme_motion: "동작"');
  const motionZH = js.includes('theme_motion: "动作"');
  if (!motionKO || !motionZH) return false;
  if (js.match(/theme_motion:\s*"방향"/) || js.match(/theme_motion:\s*"方向"/)) return false;
  if (js.match(/theme_motion:\s*"일상"/) || js.match(/theme_motion:\s*"日常"/)) return false;
  if (js.match(/theme_motion:\s*"운전"/) || js.match(/theme_motion:\s*"驾驶"/)) return false;
  return (
    js.includes('theme_direction: "방향"') &&
    js.includes('theme_routine: "일상"') &&
    js.includes('theme_driving: "운전"') &&
    js.includes('theme_direction: "方向"') &&
    js.includes('theme_routine: "日常"') &&
    js.includes('theme_driving: "驾驶"')
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("motion") ||
    bankItems.some((it) => (it.tags || []).includes("motion"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("motion"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("motion");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return (
      t.includes("direction") ||
      t.includes("routine") ||
      t.includes("driving") ||
      t.includes("body") ||
      t.includes("sports") ||
      t.includes("transit")
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
    "motionTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsDirectionRoutineDriving=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm39a motion focus smoke (전 8 SHOW · movement-actions chip enable) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm39a motion · 전 8 SHOW · direction/routine/driving distinct · 칩 동작/动作 · movement-actions 스윕 칩 enable"
  );
}

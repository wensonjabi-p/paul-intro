/**
 * ThemeSm close (ThemeSm42d) — speech focus smoke (전 8 SHOW · speech-talk sweep close)
 * Pack speech-talk → tag `speech`. Canon KO 대화 / ZH 对话 / EN Speech.
 * Distinct from favor / think / media / jobs.
 * SHOW when speechTagged>0 + themes.speech.
 * particle/dictation =10; tel/scramble thin =8; others =10.
 * Run: node hub/ops/qa/_smoke-speech-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const SHOW = {
  speed: {
    file: "data/games/speed-quiz-beginner.json",
    js: "games/speed-quiz/speed.js",
    first: "sq-471",
    last: "sq-480",
    n: 10,
  },
  cloze: {
    file: "data/games/cloze-beginner.json",
    js: "games/cloze-race/cloze.js",
    first: "c-463",
    last: "c-472",
    n: 10,
  },
  bingo: {
    file: "data/games/bingo-beginner.json",
    js: "games/bingo-board/bingo.js",
    first: "bg-518",
    last: "bg-527",
    n: 10,
  },
  listen: {
    file: "data/games/listen-match-beginner.json",
    js: "games/listen-match/match.js",
    first: "lm-485",
    last: "lm-494",
    n: 10,
  },
  particle: {
    file: "data/games/particle-beginner.json",
    js: "games/particle-snap/particle.js",
    first: "ps-467",
    last: "ps-476",
    n: 10,
  },
  dictation: {
    file: "data/games/dictation-beginner.json",
    js: "games/dictation/dictation.js",
    first: "d-473",
    last: "d-482",
    n: 10,
  },
  tel: {
    file: "data/games/telephone-beginner.json",
    js: "games/telephone/telephone.js",
    first: "tel-450",
    last: "tel-457",
    n: 8,
  },
  scramble: {
    file: "data/games/word-scramble-beginner.json",
    js: "games/word-scramble/scramble.js",
    first: "ws-452",
    last: "ws-459",
    n: 8,
  },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function labelOk(js) {
  return (
    js.includes('theme_speech: "대화"') &&
    js.includes('theme_speech: "对话"') &&
    js.includes('theme_speech: "Speech"')
  );
}

function orderOk(js) {
  return /\bspeech\b/.test(js.match(/THEME_ORDER\s*=\s*\[[\s\S]*?\];/)?.[0] || "");
}

function distinctOk(js) {
  const speechKO = js.includes('theme_speech: "대화"');
  const speechZH = js.includes('theme_speech: "对话"');
  if (!speechKO || !speechZH) return false;
  if (js.match(/theme_speech:\s*"부탁"/) || js.match(/theme_speech:\s*"拜托"/)) return false;
  if (js.match(/theme_speech:\s*"생각"/) || js.match(/theme_speech:\s*"想法"/)) return false;
  if (js.match(/theme_speech:\s*"미디어"/) || js.match(/theme_speech:\s*"媒体"/)) return false;
  if (js.match(/theme_speech:\s*"직업"/) || js.match(/theme_speech:\s*"职业"/)) return false;
  return (
    js.includes('theme_favor: "부탁"') &&
    js.includes('theme_think: "생각"') &&
    js.includes('theme_media: "미디어"') &&
    js.includes('theme_jobs: "직업"') &&
    js.includes('theme_favor: "拜托"') &&
    js.includes('theme_think: "想法"') &&
    js.includes('theme_media: "媒体"') &&
    js.includes('theme_jobs: "职业"')
  );
}

function chipWouldShow(data) {
  const fromMeta = Array.isArray(data.themes) ? data.themes : [];
  const bankItems = data.items || [];
  return (
    fromMeta.includes("speech") ||
    bankItems.some((it) => (it.tags || []).includes("speech"))
  );
}

function smokeShow(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("speech"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("speech");
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === cfg.n;
  const overlap = tagged.filter((it) => {
    const t = it.tags || [];
    return (
      t.includes("favor") ||
      t.includes("think") ||
      t.includes("media") ||
      t.includes("jobs")
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
    "speechTagged=" + tagged.length + "/" + cfg.n,
    "themes=" + hasMeta,
    "chip=" + show,
    "labelKO/ZH/EN=" + labelOk(js),
    "order=" + orderOk(js),
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "vsFavorThinkMediaJobs=" + distinctOk(js),
    "bothTags=" + overlap
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
}

console.log(
  "=== ThemeSm close speech focus smoke (전 8 SHOW · speech-talk sweep close) ==="
);
Object.keys(SHOW).forEach((label) => smokeShow(label, SHOW[label]));

if (!process.exitCode) {
  console.log(
    "SMOKE PASS ThemeSm close speech · 전 8 SHOW · favor/think/media/jobs distinct · 칩 대화/对话 · speech-talk 스윕 닫힘"
  );
}

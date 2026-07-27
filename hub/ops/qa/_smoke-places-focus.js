/**
 * ThemeSm27d — places focus smoke (all 8 games · city-places sweep closed)
 * Run: node hub/ops/qa/_smoke-places-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function collectThemes(data, needMin) {
  const bank = data.items || [];
  const fromMeta = Array.isArray(data.themes) ? data.themes.slice() : [];
  const THEME_ORDER = [
    "shopping", "snack", "transit", "housing", "banking", "workplace", "clinic",
    "school", "travel", "weather", "digital", "family", "hobby", "emotion",
    "sports", "nature", "restaurant", "clothes", "music", "media", "celebration",
    "time", "chores", "body", "direction", "furniture", "fruit", "kitchen",
    "stationery", "mail", "pets", "driving", "places", "intermediate",
  ];
  const seen = new Set();
  const out = [];
  THEME_ORDER.forEach((t) => {
    if (fromMeta.includes(t) || bank.some((it) => (it.tags || []).includes(t))) {
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    }
  });
  fromMeta.forEach((t) => {
    if (!seen.has(t) && bank.some((it) => (it.tags || []).includes(t))) {
      seen.add(t);
      out.push(t);
    }
  });
  return out.filter((t) => {
    const n = bank.filter((it) => (it.tags || []).includes(t)).length;
    return n >= needMin;
  });
}

function smokeGame(label, dataRel, jsRel, needMin) {
  const data = load(dataRel);
  const js = fs.readFileSync(path.join(ROOT, jsRel), "utf8");
  const places = (data.items || []).filter((it) => (it.tags || []).includes("places"));
  const chips = collectThemes(data, needMin);
  const hasLabel =
    js.includes('theme_places: "장소"') && js.includes('theme_places: "场所"');
  const ok =
    places.length >= 10 &&
    chips.includes("places") &&
    hasLabel &&
    (data.themes || []).includes("places");
  const sample = places.slice(0, 3).map((it) => it.word || it.text || it.id);
  console.log(
    (ok ? "OK" : "FAIL"),
    label,
    "placesTagged=" + places.length,
    "chip=places",
    "labelKO/ZH=" + hasLabel,
    "focusSample=" + JSON.stringify(sample)
  );
  if (!ok) process.exitCode = 1;
  return ok;
}

console.log("=== ThemeSm27d places focus smoke (all 8) ===");
smokeGame(
  "speed",
  "data/games/speed-quiz-beginner.json",
  "games/speed-quiz/speed.js",
  1
);
smokeGame(
  "cloze",
  "data/games/cloze-beginner.json",
  "games/cloze-race/cloze.js",
  1
);
smokeGame(
  "bingo",
  "data/games/bingo-beginner.json",
  "games/bingo-board/bingo.js",
  9
);
smokeGame(
  "listen",
  "data/games/listen-match-beginner.json",
  "games/listen-match/match.js",
  1
);
smokeGame(
  "particle",
  "data/games/particle-beginner.json",
  "games/particle-snap/particle.js",
  1
);
smokeGame(
  "dictation",
  "data/games/dictation-beginner.json",
  "games/dictation/dictation.js",
  1
);
smokeGame(
  "tel",
  "data/games/telephone-beginner.json",
  "games/telephone/telephone.js",
  1
);
smokeGame(
  "scramble",
  "data/games/word-scramble-beginner.json",
  "games/word-scramble/scramble.js",
  1
);

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm27d places focus ×8 · city-places sweep closed");
}

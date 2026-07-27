/**
 * ThemeSm29d — bathroom focus smoke (all 8 games · bathroom-hygiene sweep closed)
 * Run: node hub/ops/qa/_smoke-bathroom-focus.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app");

const EXPECT = {
  speed: { file: "data/games/speed-quiz-beginner.json", js: "games/speed-quiz/speed.js", first: "sq-341", last: "sq-350" },
  cloze: { file: "data/games/cloze-beginner.json", js: "games/cloze-race/cloze.js", first: "c-333", last: "c-342" },
  bingo: { file: "data/games/bingo-beginner.json", js: "games/bingo-board/bingo.js", first: "bg-388", last: "bg-397" },
  listen: { file: "data/games/listen-match-beginner.json", js: "games/listen-match/match.js", first: "lm-355", last: "lm-364" },
  particle: { file: "data/games/particle-beginner.json", js: "games/particle-snap/particle.js", first: "ps-337", last: "ps-346" },
  dictation: { file: "data/games/dictation-beginner.json", js: "games/dictation/dictation.js", first: "d-343", last: "d-352" },
  tel: { file: "data/games/telephone-beginner.json", js: "games/telephone/telephone.js", first: "tel-334", last: "tel-343" },
  scramble: { file: "data/games/word-scramble-beginner.json", js: "games/word-scramble/scramble.js", first: "ws-336", last: "ws-345" },
};

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function smokeGame(label, cfg) {
  const data = load(cfg.file);
  const js = fs.readFileSync(path.join(ROOT, cfg.js), "utf8");
  const tagged = (data.items || []).filter((it) => (it.tags || []).includes("bathroom"));
  const ids = tagged.map((it) => it.id);
  const hasMeta = (data.themes || []).includes("bathroom");
  const hasLabel =
    js.includes('theme_bathroom: "욕실"') && js.includes('theme_bathroom: "浴室"');
  const hasOrder = /\bbathroom\b/.test(js);
  const idOk = ids.includes(cfg.first) && ids.includes(cfg.last) && ids.length === 10;
  const ok = tagged.length === 10 && hasMeta && hasLabel && hasOrder && idOk;
  const sample = tagged.slice(0, 3).map((it) => it.word || it.prompt || it.text || it.id);
  console.log(
    ok ? "OK" : "FAIL",
    label,
    "bathroomTagged=" + tagged.length,
    "themes=" + hasMeta,
    "labelKO/ZH=" + hasLabel,
    "ids=" + (ids[0] || "?") + ".." + (ids[ids.length - 1] || "?"),
    "focusSample=" + JSON.stringify(sample)
  );
  if (!ok) {
    process.exitCode = 1;
    console.log("  ids=", ids.join(","));
  }
  return ok;
}

console.log("=== ThemeSm29d bathroom focus smoke (all 8) ===");
Object.keys(EXPECT).forEach((label) => smokeGame(label, EXPECT[label]));

if (!process.exitCode) {
  console.log("SMOKE PASS ThemeSm29d bathroom focus ×8 · bathroom-hygiene sweep closed");
}

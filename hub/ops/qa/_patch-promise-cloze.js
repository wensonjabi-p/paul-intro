/**
 * ThemeSm56a — promise-trust → cloze +10 + speed/cloze chip
 * Prefer 진실·거짓말 · Suggest bingo/listen next
 * Run: node hub/ops/qa/_patch-promise-cloze.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const clozePath = path.join(ROOT, "app/data/games/cloze-beginner.json");
const speedPath = path.join(ROOT, "app/data/games/speed-quiz-beginner.json");
const manifestPath = path.join(ROOT, "app/data/games/manifest.json");
const packPath = path.join(ROOT, "app/data/vocab/jabi-theme-packs-intermediate.json");
const canonPath = path.join(ROOT, "app/data/vocab/theme-key-canon.json");
const clozeJs = path.join(ROOT, "app/games/cloze-race/cloze.js");
const speedJs = path.join(ROOT, "app/games/speed-quiz/speed.js");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
if (cloze.items.some((it) => it.id === "c-603")) {
  console.error("c-603 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("promise") === false) {
  const idx = cloze.themes.indexOf("encourage");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "promise");
  else cloze.themes.push("promise");
}

const newItems = [
  {
    id: "c-603",
    template: "진실{0} 듣고 싶어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "진실을 듣고 싶어요",
    gloss: {
      en: "I want to hear the truth",
      ko: "진실·거짓말 · 목적격 · 진실",
      zh: "想听真相",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-604",
    template: "거짓말{0} 들었어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "거짓말을 들었어요",
    gloss: {
      en: "I heard a lie",
      ko: "진실·거짓말 · 목적격 · 거짓말",
      zh: "听到了谎话",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-605",
    template: "진실{0} 밝혀져요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "진실이 밝혀져요",
    gloss: {
      en: "The truth comes out",
      ko: "진실·거짓말 · 주격 · 진실",
      zh: "真相被揭开",
    },
    tags: ["particle", "subject", "promise", "intermediate"],
  },
  {
    id: "c-606",
    template: "거짓말{0} 들통나요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "거짓말이 들통나요",
    gloss: {
      en: "The lie gets found out",
      ko: "진실·거짓말 · 주격 · 거짓말",
      zh: "谎话露馅了",
    },
    tags: ["particle", "subject", "promise", "intermediate"],
  },
  {
    id: "c-607",
    template: "그 사람{0} 신뢰해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "그 사람을 신뢰해요",
    gloss: {
      en: "I trust that person",
      ko: "진실·거짓말 · 목적격 · 신뢰하다",
      zh: "信任那个人",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-608",
    template: "결과{0} 확신해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "결과를 확신해요",
    gloss: {
      en: "I'm sure of the result",
      ko: "진실·거짓말 · 목적격 · 확신하다",
      zh: "确信结果",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-609",
    template: "그 말{0} 의심해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "그 말을 의심해요",
    gloss: {
      en: "I doubt those words",
      ko: "진실·거짓말 · 목적격 · 의심하다",
      zh: "怀疑那句话",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-610",
    template: "남{0} 속이면 안 돼요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "남을 속이면 안 돼요",
    gloss: {
      en: "You shouldn't deceive others",
      ko: "진실·거짓말 · 목적격 · 속이다",
      zh: "不可以欺骗别人",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-611",
    template: "안전{0} 보장해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "안전을 보장해요",
    gloss: {
      en: "We guarantee safety",
      ko: "진실·거짓말 · 목적격 · 보장하다",
      zh: "保障安全",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
  {
    id: "c-612",
    template: "실력{0} 증명해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "실력을 증명해요",
    gloss: {
      en: "I prove my ability",
      ko: "진실·거짓말 · 목적격 · 증명하다",
      zh: "证明实力",
    },
    tags: ["particle", "object", "promise", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 62;
cloze.copyright = cloze.copyright.replace(
  "apology-politeness/success-challenge/advice-counsel/encourage-support crossfill",
  "apology-politeness/success-challenge/advice-counsel/encourage-support/promise-trust crossfill"
);
cloze.note =
  "+10 promise-trust cloze (c-603–612, 2026-07-27): Prefer 진실·거짓말 · 신뢰하다·확신하다·의심하다·속이다·보장하다·증명하다·진실·거짓말. Suggest bingo/listen next. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. ThemeSm56a chip KO 약속 / ZH 约定. Prior encourage c-593–602 · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Chip labels + THEME_ORDER for speed + cloze
function wireChip(jsPath) {
  let js = fs.readFileSync(jsPath, "utf8");
  if (js.includes('theme_promise: "약속"') || js.includes('theme_promise: "Promise"')) {
    console.log("chip already in", path.basename(jsPath));
    return;
  }
  js = js.replace(
    'theme_encourage: "Encourage",\n      theme_intermediate:',
    'theme_encourage: "Encourage",\n      theme_promise: "Promise",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_encourage: "격려",\n      theme_intermediate:',
    'theme_encourage: "격려",\n      theme_promise: "약속",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_encourage: "鼓励",\n      theme_intermediate:',
    'theme_encourage: "鼓励",\n      theme_promise: "约定",\n      theme_intermediate:'
  );
  if (js.includes('"encourage", "intermediate"')) {
    js = js.replace(
      '"encourage", "intermediate"',
      '"encourage", "promise", "intermediate"'
    );
  } else if (js.includes('"encourage",\n    "intermediate"')) {
    js = js.replace(
      '"encourage",\n    "intermediate"',
      '"encourage",\n    "promise",\n    "intermediate"'
    );
  } else {
    js = js.replace(
      '"advice", "encourage", "intermediate"',
      '"advice", "encourage", "promise", "intermediate"'
    );
  }
  fs.writeFileSync(jsPath, js);
  console.log("wired chip", path.basename(jsPath));
}

wireChip(clozeJs);
wireChip(speedJs);

// Pack note
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const pr = pack.packs.find((p) => p.id === "promise-trust");
if (pr) {
  pr.note =
    "Everyday promise / trust / be sure / doubt / deceive / honest / guarantee / prove / trust-noun / doubt-noun / truth / lie survival — distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (진실·거짓말) · Suggest bingo/listen · themes promise · chip 약속/约定 · ThemeSm56a.";
}
pack.note =
  "+promise-trust 12 (약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말) 2026-07-27. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 진실·거짓말 · Suggest bingo/listen · themes promise · chip 약속/约定 · ThemeSm56a. Existing packs kept (incl. encourage-support sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Canon
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
const promiseCanon = canon.themes.find((t) => t.themeKey === "promise");
if (promiseCanon) {
  promiseCanon.notes =
    "ThemeSm56a speed(+cloze) chip enable (2026-07-27). Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
  console.log("canon promise ThemeSm56a");
}

// Speed note
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 promise-trust MCQ (sq-611–620, 2026-07-27). Pack lemmas 약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심. Prefer 진실·거짓말 → cloze Done (c-603–612). Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. NIKL/Sejong·Tammy. No brand names. Prior encourage sq-601–610 kept. Suggest bingo/listen · ThemeSm56a · chip KO 약속 / ZH 约定.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 242;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 657 · listen-match 624 · speed 620 · telephone 561 · scramble 563 · dictation 612 · cloze 612 · particle 606. +promise-trust cloze +10 (c-603–612) · themes promise · promiseTagged 10×2(speed+cloze) · Prefer 진실·거짓말 Done · Suggest bingo/listen · chip KO 약속 / ZH 约定 · ThemeSm56a. Prior pack+speed sq-611–620. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 62;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const promiseTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("promise")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      promiseTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 약속하다·신뢰·정직하다 · ThemeSm56b",
    },
    null,
    2
  )
);

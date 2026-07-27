/**
 * ThemeSm55a — encourage-support → cloze +10 + speed/cloze chip
 * Prefer 격려·위로 · Skip 응원·지지 → bingo/listen
 * Run: node hub/ops/qa/_patch-encourage-cloze.js
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
if (cloze.items.some((it) => it.id === "c-593")) {
  console.error("c-593 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("encourage") === false) {
  const idx = cloze.themes.indexOf("advice");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "encourage");
  else cloze.themes.push("encourage");
}

const newItems = [
  {
    id: "c-593",
    template: "짧은 격려{0} 들어요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "짧은 격려를 들어요",
    gloss: {
      en: "I hear a short word of encouragement",
      ko: "격려·위로 · 목적격 · 격려",
      zh: "听到简短的鼓励",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
  {
    id: "c-594",
    template: "따뜻한 위로{0} 건네요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "따뜻한 위로를 건네요",
    gloss: {
      en: "I offer warm words of comfort",
      ko: "격려·위로 · 목적격 · 위로",
      zh: "送上温暖的安慰",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
  {
    id: "c-595",
    template: "짧은 격려{0} 힘이 돼요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "짧은 격려가 힘이 돼요",
    gloss: {
      en: "A short encouragement gives me strength",
      ko: "격려·위로 · 주격 · 격려",
      zh: "简短的鼓励给我力量",
    },
    tags: ["particle", "subject", "encourage", "intermediate"],
  },
  {
    id: "c-596",
    template: "동료{0} 격려해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "동료를 격려해요",
    gloss: {
      en: "I encourage a coworker",
      ko: "격려·위로 · 목적격 · 격려하다",
      zh: "鼓励同事",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
  {
    id: "c-597",
    template: "슬픈 마음{0} 위로해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "슬픈 마음을 위로해요",
    gloss: {
      en: "I comfort a sad heart",
      ko: "격려·위로 · 목적격 · 위로하다",
      zh: "安慰悲伤的心",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
  {
    id: "c-598",
    template: "작은 배려{0} 느껴요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "작은 배려를 느껴요",
    gloss: {
      en: "I feel a little consideration",
      ko: "격려·위로 · 목적격 · 배려하다",
      zh: "感受到小小的体贴",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
  {
    id: "c-599",
    template: "든든한 마음{0} 생겨요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "든든한 마음이 생겨요",
    gloss: {
      en: "A secure feeling arises",
      ko: "격려·위로 · 주격 · 든든하다",
      zh: "心里踏实起来",
    },
    tags: ["particle", "subject", "encourage", "intermediate"],
  },
  {
    id: "c-600",
    template: "안심{0} 돼요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "안심이 돼요",
    gloss: {
      en: "I feel at ease",
      ko: "격려·위로 · 주격 · 안심하다",
      zh: "放心了",
    },
    tags: ["particle", "subject", "encourage", "intermediate"],
  },
  {
    id: "c-601",
    template: "큰 의지{0} 생겨요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "큰 의지가 생겨요",
    gloss: {
      en: "A strong will to rely arises",
      ko: "격려·위로 · 주격 · 의지하다",
      zh: "生出很大的依靠之心",
    },
    tags: ["particle", "subject", "encourage", "intermediate"],
  },
  {
    id: "c-602",
    template: "위로의 말{0} 적어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "위로의 말을 적어요",
    gloss: {
      en: "I write words of comfort",
      ko: "격려·위로 · 목적격 · 위로",
      zh: "写下安慰的话",
    },
    tags: ["particle", "object", "encourage", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 61;
cloze.copyright = cloze.copyright.replace(
  "apology-politeness/success-challenge/advice-counsel crossfill",
  "apology-politeness/success-challenge/advice-counsel/encourage-support crossfill"
);
cloze.note =
  "+10 encourage-support cloze (c-593–602, 2026-07-27): Prefer 격려·위로 · 격려하다·위로하다·배려하다·든든하다·안심하다·의지하다·격려·위로. Skip 응원·지지 → bingo/listen Prefer. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. ThemeSm55a chip KO 격려 / ZH 鼓励. Suggest bingo/listen next. Prior advice c-583–592 · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Chip labels + THEME_ORDER for speed + cloze
function wireChip(jsPath) {
  let js = fs.readFileSync(jsPath, "utf8");
  if (js.includes('theme_encourage: "격려"')) {
    console.log("chip already in", path.basename(jsPath));
    return;
  }
  js = js.replace(
    'theme_advice: "Advice",\n      theme_intermediate:',
    'theme_advice: "Advice",\n      theme_encourage: "Encourage",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_advice: "조언",\n      theme_intermediate:',
    'theme_advice: "조언",\n      theme_encourage: "격려",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_advice: "建议",\n      theme_intermediate:',
    'theme_advice: "建议",\n      theme_encourage: "鼓励",\n      theme_intermediate:'
  );
  if (js.includes('"advice", "intermediate"')) {
    js = js.replace(
      '"advice", "intermediate"',
      '"advice", "encourage", "intermediate"'
    );
  } else if (js.includes('"advice",\n    "intermediate"')) {
    js = js.replace(
      '"advice",\n    "intermediate"',
      '"advice",\n    "encourage",\n    "intermediate"'
    );
  } else {
    js = js.replace(
      '"success", "advice", "intermediate"',
      '"success", "advice", "encourage", "intermediate"'
    );
  }
  fs.writeFileSync(jsPath, js);
  console.log("wired chip", path.basename(jsPath));
}

wireChip(clozeJs);
wireChip(speedJs);

// Pack note
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const eg = pack.packs.find((p) => p.id === "encourage-support");
if (eg) {
  eg.note =
    "Everyday encourage / cheer / support / comfort / rely / care / feel secure / feel relief / cheer-noun / support-noun / encourage-noun / comfort-noun survival — distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (격려·위로) · Skip 응원·지지 → bingo/listen · themes encourage · chip 격려/鼓励 · ThemeSm55a.";
}
pack.note =
  "+encourage-support 12 (격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로) 2026-07-27. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 격려·위로 · Skip 응원·지지 → bingo/listen · themes encourage · chip 격려/鼓励 · ThemeSm55a. Existing packs kept (incl. advice-counsel sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Canon
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
const encourageCanon = canon.themes.find((t) => t.themeKey === "encourage");
if (encourageCanon) {
  encourageCanon.notes =
    "ThemeSm55a speed(+cloze) chip enable (2026-07-27). Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
  console.log("canon encourage ThemeSm55a");
}

// Speed note
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 encourage-support MCQ (sq-601–610, 2026-07-27). Pack lemmas 격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지. Prefer 격려·위로 → cloze Done (c-593–602). Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. NIKL/Sejong·Tammy. No brand names. Prior advice sq-591–600 kept. Suggest bingo/listen · Skip 응원·지지 · ThemeSm55a · chip KO 격려 / ZH 鼓励.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 238;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 647 · listen-match 614 · speed 610 · telephone 553 · scramble 555 · dictation 602 · cloze 602 · particle 596. +encourage-support cloze +10 (c-593–602) · themes encourage · encourageTagged 10×2(speed+cloze) · Prefer 격려·위로 Done · Skip 응원·지지 → bingo/listen · chip KO 격려 / ZH 鼓励 · ThemeSm55a. Prior pack+speed sq-601–610. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 61;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const encourageTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("encourage")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      encourageTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 응원·지지 · ThemeSm55b",
    },
    null,
    2
  )
);

/**
 * ThemeSm54a — advice-counsel → cloze +10 + speed/cloze chip
 * Prefer 조언·상담 · Skip 답변·안내하다 → bingo/listen
 * Run: node hub/ops/qa/_patch-advice-cloze.js
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
if (cloze.items.some((it) => it.id === "c-583")) {
  console.error("c-583 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("advice") === false) {
  const idx = cloze.themes.indexOf("success");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "advice");
  else cloze.themes.push("advice");
}

const newItems = [
  {
    id: "c-583",
    template: "선배 조언{0} 메모해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "선배 조언을 메모해요",
    gloss: {
      en: "I jot down a senior's advice",
      ko: "조언·상담 · 목적격 · 조언",
      zh: "记下前辈的建议",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-584",
    template: "오늘 상담{0} 길어요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "오늘 상담이 길어요",
    gloss: {
      en: "Today's consultation is long",
      ko: "조언·상담 · 주격 · 상담",
      zh: "今天的咨询很长",
    },
    tags: ["particle", "subject", "advice", "intermediate"],
  },
  {
    id: "c-585",
    template: "좋은 조언{0} 나눠요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "좋은 조언을 나눠요",
    gloss: {
      en: "We share good advice",
      ko: "조언·상담 · 목적격 · 조언하다",
      zh: "分享好建议",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-586",
    template: "새 제안{0} 적어 봐요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "새 제안을 적어 봐요",
    gloss: {
      en: "I try writing a new proposal",
      ko: "조언·상담 · 목적격 · 제안하다",
      zh: "试着写下新提议",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-587",
    template: "긴 상담{0} 마쳐요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "긴 상담을 마쳐요",
    gloss: {
      en: "I finish a long consultation",
      ko: "조언·상담 · 목적격 · 상담하다",
      zh: "结束漫长的咨询",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-588",
    template: "시간 문의{0} 남겨요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "시간 문의를 남겨요",
    gloss: {
      en: "I leave an inquiry about the time",
      ko: "조언·상담 · 목적격 · 문의하다",
      zh: "留下时间询问",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-589",
    template: "가벼운 산책{0} 권해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "가벼운 산책을 권해요",
    gloss: {
      en: "I urge a light walk",
      ko: "조언·상담 · 목적격 · 권하다",
      zh: "劝他们散散步",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-590",
    template: "따뜻한 충고{0} 새겨요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "따뜻한 충고를 새겨요",
    gloss: {
      en: "I take warm counsel to heart",
      ko: "조언·상담 · 목적격 · 충고하다",
      zh: "铭记温暖的忠告",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-591",
    template: "유용한 정보{0} 모아요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "유용한 정보를 모아요",
    gloss: {
      en: "I gather useful information",
      ko: "조언·상담 · 목적격 · 정보",
      zh: "收集有用信息",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
  {
    id: "c-592",
    template: "연락처{0} 알려 줘요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "연락처를 알려 줘요",
    gloss: {
      en: "Please let me know the contact",
      ko: "조언·상담 · 목적격 · 알려주다",
      zh: "请告诉我联系方式",
    },
    tags: ["particle", "object", "advice", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 60;
cloze.copyright = cloze.copyright.replace(
  "apology-politeness/success-challenge crossfill",
  "apology-politeness/success-challenge/advice-counsel crossfill"
);
cloze.note =
  "+10 advice-counsel cloze (c-583–592, 2026-07-27): Prefer 조언·상담 · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다. Skip 답변·안내하다 → bingo/listen Prefer. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다 · success · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. ThemeSm54a chip KO 조언 / ZH 建议. Suggest bingo/listen next. Prior success c-573–582 · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Chip labels + THEME_ORDER for speed + cloze
function wireChip(jsPath) {
  let js = fs.readFileSync(jsPath, "utf8");
  if (js.includes('theme_advice: "조언"')) {
    console.log("chip already in", path.basename(jsPath));
    return;
  }
  js = js.replace(
    'theme_success: "Success",\n      theme_intermediate:',
    'theme_success: "Success",\n      theme_advice: "Advice",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_success: "성공",\n      theme_intermediate:',
    'theme_success: "성공",\n      theme_advice: "조언",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_success: "成功",\n      theme_intermediate:',
    'theme_success: "成功",\n      theme_advice: "建议",\n      theme_intermediate:'
  );
  if (js.includes('"success", "intermediate"')) {
    js = js.replace(
      '"success", "intermediate"',
      '"success", "advice", "intermediate"'
    );
  } else if (js.includes('"success",\n    "intermediate"')) {
    js = js.replace(
      '"success",\n    "intermediate"',
      '"success",\n    "advice",\n    "intermediate"'
    );
  } else {
    js = js.replace(
      '"apology", "success", "intermediate"',
      '"apology", "success", "advice", "intermediate"'
    );
  }
  fs.writeFileSync(jsPath, js);
  console.log("wired chip", path.basename(jsPath));
}

wireChip(clozeJs);
wireChip(speedJs);

// Pack note
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const ad = pack.packs.find((p) => p.id === "advice-counsel");
if (ad) {
  ad.note =
    "Everyday advise / suggest / consult / inquire / urge / admonish / info / inform / reply / guide / advice / counseling survival — distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success · housing 문의(n). Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (조언·상담) · Skip 답변·안내하다 → bingo/listen · themes advice · chip 조언/建议 · ThemeSm54a.";
}
pack.version = 60;
pack.note =
  "+advice-counsel 12 (조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다·조언·상담) 2026-07-27. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 조언·상담 · Skip 답변·안내하다 → bingo/listen · themes advice · chip 조언/建议 · ThemeSm54a. Existing packs kept (incl. success-challenge sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Canon
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
const adviceCanon = canon.themes.find((t) => t.themeKey === "advice");
if (adviceCanon) {
  adviceCanon.notes =
    "ThemeSm54a speed(+cloze) chip enable (2026-07-27). Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success · housing 문의(n).";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
  console.log("canon advice ThemeSm54a");
}

// Speed note
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 advice-counsel MCQ (sq-591–600, 2026-07-27). Pack lemmas 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다. Prefer 조언·상담 → cloze Done (c-583–592). Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다 · think · problem · success · housing 문의(n). NIKL/Sejong·Tammy. No brand names. Prior success sq-581–590 kept. Suggest bingo/listen · Skip 답변·안내하다 · ThemeSm54a · chip KO 조언 / ZH 建议.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 234;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 637 · listen-match 604 · speed 600 · telephone 545 · scramble 547 · dictation 592 · cloze 592 · particle 586. +advice-counsel cloze +10 (c-583–592) · themes advice · adviceTagged 10×2(speed+cloze) · Prefer 조언·상담 Done · Skip 답변·안내하다 → bingo/listen · chip KO 조언 / ZH 建议 · ThemeSm54a. Prior speed sq-591–600. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 60;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const adviceTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("advice")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      adviceTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 답변·안내하다 · ThemeSm54b",
    },
    null,
    2
  )
);

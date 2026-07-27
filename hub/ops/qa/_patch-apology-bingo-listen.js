/**
 * ThemeSm52b — apology-politeness → bingo +10 · listen-match +10
 * Prefer 인사하다·불편하다 · remaining apology lemmas
 * Skip 번거롭다·공손하다 → particle residual
 * Run: node hub/ops/qa/_patch-apology-bingo-listen.js
 */
const fs = require("fs");

const bingoPath = "hub/app/data/games/bingo-beginner.json";
const listenPath = "hub/app/data/games/listen-match-beginner.json";
const manifestPath = "hub/app/data/games/manifest.json";
const packPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const clozePath = "hub/app/data/games/cloze-beginner.json";
const speedPath = "hub/app/data/games/speed-quiz-beginner.json";

const bingo = JSON.parse(fs.readFileSync(bingoPath, "utf8"));
const listen = JSON.parse(fs.readFileSync(listenPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const packFile = JSON.parse(fs.readFileSync(packPath, "utf8"));
const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));

if (bingo.items.some((it) => it.id === "bg-618")) {
  console.error("bingo apology items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-585")) {
  console.error("listen apology items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-618",
    word: "인사하다",
    gloss: {
      en: "to greet; say hello",
      ko: "인사하다",
      zh: "打招呼；问候",
    },
    tags: ["apology"],
  },
  {
    id: "bg-619",
    word: "불편하다",
    gloss: {
      en: "to be inconvenient; uncomfortable",
      ko: "불편하다",
      zh: "不方便；不舒服",
    },
    tags: ["apology"],
  },
  {
    id: "bg-620",
    word: "미안하다",
    gloss: {
      en: "to be sorry; feel bad",
      ko: "미안하다",
      zh: "抱歉；对不起",
    },
    tags: ["apology"],
  },
  {
    id: "bg-621",
    word: "죄송하다",
    gloss: {
      en: "to be sorry (formal)",
      ko: "죄송하다",
      zh: "抱歉（正式）",
    },
    tags: ["apology"],
  },
  {
    id: "bg-622",
    word: "사과하다",
    gloss: {
      en: "to apologize",
      ko: "사과하다",
      zh: "道歉",
    },
    tags: ["apology"],
  },
  {
    id: "bg-623",
    word: "용서하다",
    gloss: {
      en: "to forgive",
      ko: "용서하다",
      zh: "原谅",
    },
    tags: ["apology"],
  },
  {
    id: "bg-624",
    word: "실례하다",
    gloss: {
      en: "to excuse oneself; be rude",
      ko: "실례하다",
      zh: "失礼；借过",
    },
    tags: ["apology"],
  },
  {
    id: "bg-625",
    word: "감사하다",
    gloss: {
      en: "to thank; be grateful",
      ko: "감사하다",
      zh: "感谢",
    },
    tags: ["apology"],
  },
  {
    id: "bg-626",
    word: "덕분",
    gloss: {
      en: "thanks to; owing to",
      ko: "덕분",
      zh: "多亏；托福",
    },
    tags: ["apology"],
  },
  {
    id: "bg-627",
    word: "수고하다",
    gloss: {
      en: "to work hard; put in effort (polite)",
      ko: "수고하다",
      zh: "辛苦；劳烦",
    },
    tags: ["apology"],
  },
];

const listenNew = [
  {
    id: "lm-585",
    text: "들어오며 인사해요",
    gloss: {
      en: "I greet as I come in",
      ko: "인사하다",
      zh: "进来时打招呼",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-586",
    text: "자리가 불편해요",
    gloss: {
      en: "The seat is uncomfortable",
      ko: "불편하다",
      zh: "座位不舒服",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-587",
    text: "답을 틀려서 미안해요",
    gloss: {
      en: "Sorry for getting the answer wrong",
      ko: "미안하다",
      zh: "答错了，抱歉",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-588",
    text: "문을 닫아 죄송해요",
    gloss: {
      en: "Sorry for closing the door",
      ko: "죄송하다",
      zh: "关门了，抱歉",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-589",
    text: "늦게 와서 사과해요",
    gloss: {
      en: "I apologize for arriving late",
      ko: "사과하다",
      zh: "来晚了，我道歉",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-590",
    text: "이번만 용서해요",
    gloss: {
      en: "I forgive just this once",
      ko: "용서하다",
      zh: "只原谅这一次",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-591",
    text: "자리를 비워 실례해요",
    gloss: {
      en: "Excuse me for leaving my seat",
      ko: "실례하다",
      zh: "离开座位，失陪",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-592",
    text: "시간을 내 주셔서 감사해요",
    gloss: {
      en: "Thank you for giving your time",
      ko: "감사하다",
      zh: "感谢您抽出时间",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-593",
    text: "도움 덕분에 끝났어요",
    gloss: {
      en: "Thanks to the help, it is finished",
      ko: "덕분",
      zh: "多亏帮助才完成",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "lm-594",
    text: "아침에 수고했어요",
    gloss: {
      en: "You worked hard this morning",
      ko: "수고하다",
      zh: "早上辛苦了",
    },
    tags: ["apology", "intermediate"],
  },
];

// Dedup checks
const bingoWords = new Set(bingo.items.map((it) => it.word));
for (const it of bingoNew) {
  if (bingoWords.has(it.word)) {
    console.error("bingo duplicate word", it.word);
    process.exit(1);
  }
}
const listenTexts = new Set(listen.items.map((it) => it.text));
for (const it of listenNew) {
  if (listenTexts.has(it.text)) {
    console.error("listen duplicate text", it.text);
    process.exit(1);
  }
}
const packExamples = new Set();
const pack = packFile.packs.find((p) => p.id === "apology-politeness");
if (pack) {
  for (const it of pack.items) {
    if (it.example && it.example.ko) packExamples.add(it.example.ko.replace(/\.$/, ""));
  }
}
for (const it of listenNew) {
  if (packExamples.has(it.text)) {
    console.error("listen overlaps pack example", it.text);
    process.exit(1);
  }
}
const clozeFulls = new Set(
  (cloze.items || []).filter((it) => (it.tags || []).includes("apology")).map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

if (!bingo.themes.includes("apology")) bingo.themes.push("apology");
if (!listen.themes.includes("apology")) listen.themes.push("apology");

bingo.version = 64;
listen.version = 64;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and personality-character crossfill",
  "personality-character, and apology-politeness crossfill"
);
listen.copyright = listen.copyright.replace(
  "and personality-character crossfill",
  "personality-character, and apology-politeness crossfill"
);

bingo.note =
  "+10 apology-politeness (bg-618–627, 2026-07-27): Prefer 인사하다·불편하다 · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다. Skip 번거롭다·공손하다 → particle residual. Distinct from favor 고맙다 · rules 예의 · friends 방문 · personality · fruit 사과 · housing 불편(n). NIKL/Sejong · no brand names. Suggest particle/dictation(+tel/scramble). Prior personality bg-608–617 · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 apology-politeness (lm-585–594, 2026-07-27): Prefer 인사하다·불편하다 (들어오며 인사해요 · 자리가 불편해요). 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다. Skip 번거롭다·공손하다 → particle residual · Skip lm-03/04 감사합니다·죄송합니다 · lm housing 공사가 불편해요 · friends 인사에 웃으며. Distinct from favor 고마워요 · rules · friends · personality · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation(+tel/scramble). Prior personality lm-575–584 · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 227;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 627 · listen-match 594 · speed 580 · telephone 529 · scramble 531 · dictation 572 · cloze 572 · particle 566. +apology-politeness bingo/listen +10 (bg-618–627 · lm-585–594) · themes apology · apologyTagged 10×4(speed+cloze+bingo+listen) · Prefer 인사하다·불편하다 Done · Skip 번거롭다·공손하다 → particle · chip KO 미안 / ZH 抱歉 · ThemeSm52b. Prior cloze c-563–572 · speed sq-571–580. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 64;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 64;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday sorry / apologize / forgive / excuse / thank / owing-to / trouble / greet / inconvenient / polite survival — distinct from favor 고맙다 · rules 예의 · friends 인사 장면 분리(방문) · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 인사하다·불편하다 bingo/listen · Skip 번거롭다·공손하다 → particle · themes apology · chip 미안/抱歉 · ThemeSm52b.";
  packFile.note = packFile.note.replace(
    /Speed \+10 · cloze \+10 Done Prefer 번거롭다·공손하다 · Skip 인사하다·불편하다 → bingo\/listen/,
    "Speed+cloze+bingo/listen Done · Prefer 인사하다·불편하다 bingo/listen · Skip 번거롭다·공손하다 → particle"
  );
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen \+8–10 · Prefer 인사하다·불편하다\./,
  "Bingo/listen +10 Done · Prefer 인사하다·불편하다 · Suggest particle/dictation(+tel/scramble) · Skip 번거롭다·공손하다 residual."
);
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next\./,
  "Bingo/listen +10 Done · Prefer 인사하다·불편하다 · Suggest particle/dictation(+tel/scramble) · Skip 번거롭다·공손하다 residual."
);
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const apologyBingo = bingo.items.filter((it) => (it.tags || []).includes("apology")).length;
const apologyListen = listen.items.filter((it) => (it.tags || []).includes("apology")).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      apologyTaggedBingo: apologyBingo,
      apologyTaggedListen: apologyListen,
      version: { bingo: bingo.version, listen: listen.version, manifest: manifest.version },
    },
    null,
    2
  )
);
console.log("apology bingo/listen patch OK");

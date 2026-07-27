/**
 * ThemeSm54c — advice-counsel → bingo +10 · listen-match +10
 * Prefer 답변·안내하다 · remaining advice lemmas
 * Skip 조언·상담 → particle residual
 * Run: node hub/ops/qa/_patch-advice-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-638")) {
  console.error("bingo advice items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-605")) {
  console.error("listen advice items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-638",
    word: "답변",
    gloss: {
      en: "reply; answer (noun)",
      ko: "답변",
      zh: "答复；回答",
    },
    tags: ["advice"],
  },
  {
    id: "bg-639",
    word: "안내하다",
    gloss: {
      en: "to guide; show the way; brief",
      ko: "안내하다",
      zh: "引导；介绍；指引",
    },
    tags: ["advice"],
  },
  {
    id: "bg-640",
    word: "조언하다",
    gloss: {
      en: "to advise",
      ko: "조언하다",
      zh: "建议；劝告",
    },
    tags: ["advice"],
  },
  {
    id: "bg-641",
    word: "제안하다",
    gloss: {
      en: "to propose; suggest",
      ko: "제안하다",
      zh: "提议；建议",
    },
    tags: ["advice"],
  },
  {
    id: "bg-642",
    word: "상담하다",
    gloss: {
      en: "to consult; get counseling",
      ko: "상담하다",
      zh: "咨询；商谈",
    },
    tags: ["advice"],
  },
  {
    id: "bg-643",
    word: "문의하다",
    gloss: {
      en: "to inquire; ask about",
      ko: "문의하다",
      zh: "询问；咨询",
    },
    tags: ["advice"],
  },
  {
    id: "bg-644",
    word: "권하다",
    gloss: {
      en: "to urge; recommend (doing)",
      ko: "권하다",
      zh: "劝；劝说",
    },
    tags: ["advice"],
  },
  {
    id: "bg-645",
    word: "충고하다",
    gloss: {
      en: "to admonish; give counsel",
      ko: "충고하다",
      zh: "忠告；劝诫",
    },
    tags: ["advice"],
  },
  {
    id: "bg-646",
    word: "정보",
    gloss: {
      en: "information",
      ko: "정보",
      zh: "信息；情报",
    },
    tags: ["advice"],
  },
  {
    id: "bg-647",
    word: "알려주다",
    gloss: {
      en: "to let know; inform (someone)",
      ko: "알려주다",
      zh: "告诉；告知",
    },
    tags: ["advice"],
  },
];

const listenNew = [
  {
    id: "lm-605",
    text: "짧은 답변을 보내요",
    gloss: {
      en: "I send a short reply",
      ko: "답변",
      zh: "发简短答复",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-606",
    text: "교실 위치를 안내해요",
    gloss: {
      en: "I show the way to the classroom",
      ko: "안내하다",
      zh: "指引教室位置",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-607",
    text: "후배에게 공부법을 조언해요",
    gloss: {
      en: "I advise a junior on study methods",
      ko: "조언하다",
      zh: "给后辈建议学习法",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-608",
    text: "주말 산책을 제안해요",
    gloss: {
      en: "I suggest a weekend walk",
      ko: "제안하다",
      zh: "提议周末散步",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-609",
    text: "진로를 상담해요",
    gloss: {
      en: "I consult about career paths",
      ko: "상담하다",
      zh: "咨询出路",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-610",
    text: "할인에 대해 문의해요",
    gloss: {
      en: "I inquire about the discount",
      ko: "문의하다",
      zh: "询问折扣",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-611",
    text: "따뜻한 차를 권해요",
    gloss: {
      en: "I urge them to have warm tea",
      ko: "권하다",
      zh: "劝喝热茶",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-612",
    text: "친구에게 일찍 자라고 충고해요",
    gloss: {
      en: "I advise a friend to sleep early",
      ko: "충고하다",
      zh: "忠告朋友早睡",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-613",
    text: "날씨 정보를 확인해요",
    gloss: {
      en: "I check the weather information",
      ko: "정보",
      zh: "确认天气信息",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "lm-614",
    text: "회의 일정을 알려 줘요",
    gloss: {
      en: "I let them know the meeting schedule",
      ko: "알려주다",
      zh: "告知会议日程",
    },
    tags: ["advice", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "advice-counsel");
if (pack) {
  for (const it of pack.items) {
    if (it.example && it.example.ko)
      packExamples.add(it.example.ko.replace(/\.$/, ""));
  }
}
for (const it of listenNew) {
  if (packExamples.has(it.text)) {
    console.error("listen overlaps pack example", it.text);
    process.exit(1);
  }
}
const clozeFulls = new Set(
  (cloze.items || [])
    .filter((it) => (it.tags || []).includes("advice"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from opinion/speech/favor/success hosts
const BAD_TAGS = ["opinion", "speech", "favor", "success"];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("advice")) bingo.themes.push("advice");
if (!listen.themes.includes("advice")) listen.themes.push("advice");

bingo.version = 66;
listen.version = 66;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and success-challenge crossfill",
  "success-challenge, and advice-counsel crossfill"
);
listen.copyright = listen.copyright.replace(
  /and success-challenge crossfill/,
  "success-challenge, and advice-counsel crossfill"
);
if (!listen.copyright.includes("advice-counsel")) {
  listen.copyright = listen.copyright.replace(
    "apology-politeness, and success-challenge crossfill",
    "apology-politeness, success-challenge, and advice-counsel crossfill"
  );
}
if (!bingo.copyright.includes("advice-counsel")) {
  bingo.copyright = bingo.copyright.replace(
    "apology-politeness, and success-challenge crossfill",
    "apology-politeness, success-challenge, and advice-counsel crossfill"
  );
}

bingo.note =
  "+10 advice-counsel (bg-638–647, 2026-07-27): Prefer 답변·안내하다 · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다. Skip 조언·상담 → particle residual. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다 · success · housing 문의(n). NIKL/Sejong · no brand names. Suggest particle/dictation(+tel/scramble). Prior success bg-628–637 · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 advice-counsel (lm-605–614, 2026-07-27): Prefer 답변·안내하다 (짧은 답변을 보내요 · 교실 위치를 안내해요). 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다. Skip 조언·상담 → particle residual. Distinct from opinion/speech/favor/success · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation(+tel/scramble). Prior success lm-595–604 · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 235;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 647 · listen-match 614 · speed 600 · telephone 545 · scramble 547 · dictation 592 · cloze 592 · particle 586. +advice-counsel bingo/listen +10 (bg-638–647 · lm-605–614) · themes advice · adviceTagged 10×4(speed+cloze+bingo+listen) · Prefer 답변·안내하다 Done · Skip 조언·상담 → particle · chip KO 조언 / ZH 建议 · ThemeSm54c. Prior cloze c-583–592 · speed sq-591–600. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 66;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 66;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday advise / suggest / consult / inquire / urge / admonish / info / inform / reply / guide / advice / counseling survival — distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success · housing 문의(n). Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 답변·안내하다 bingo/listen · Skip 조언·상담 → particle · themes advice · chip 조언/建议 · ThemeSm54c.";
  packFile.note = packFile.note.replace(
    /Speed \+10 · cloze \+10 Done Prefer 조언·상담 · Skip 답변·안내하다 → bingo\/listen · themes advice · chip 조언\/建议 · ThemeSm54a\./,
    "Speed+cloze+bingo/listen Done · Prefer 답변·안내하다 bingo/listen · Skip 조언·상담 → particle · themes advice · chip 조언/建议 · ThemeSm54c."
  );
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · Skip 답변·안내하다 · ThemeSm54a · chip KO 조언 \/ ZH 建议\./,
  "Bingo/listen +10 Done · Prefer 답변·안내하다 · Suggest particle/dictation(+tel/scramble) · Skip 조언·상담 residual · chip KO 조언 / ZH 建议."
);
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next\./,
  "Bingo/listen +10 Done · Prefer 답변·안내하다 · Suggest particle/dictation(+tel/scramble) · Skip 조언·상담 residual."
);
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const adviceBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("advice")
).length;
const adviceListen = listen.items.filter((it) =>
  (it.tags || []).includes("advice")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      adviceTaggedBingo: adviceBingo,
      adviceTaggedListen: adviceListen,
      version: {
        bingo: bingo.version,
        listen: listen.version,
        manifest: manifest.version,
      },
    },
    null,
    2
  )
);
console.log("advice bingo/listen patch OK");

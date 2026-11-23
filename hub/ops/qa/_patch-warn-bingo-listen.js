/**
 * warn-caution → bingo +10 · listen-match +10
 * Prefer 경고하다·주의하다·위험하다·피하다
 * Skip ThemeSm chips · no particle/dictation this step
 * Suggest particle/dictation only next
 * Run: node hub/ops/qa/_patch-warn-bingo-listen.js
 */
const fs = require("fs");

const bingoPath = "hub/app/data/games/bingo-beginner.json";
const listenPath = "hub/app/data/games/listen-match-beginner.json";
const manifestPath = "hub/app/data/games/manifest.json";
const packPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const clozePath = "hub/app/data/games/cloze-beginner.json";
const speedPath = "hub/app/data/games/speed-quiz-beginner.json";
const canonPath = "hub/app/data/vocab/theme-key-canon.json";

const bingo = JSON.parse(fs.readFileSync(bingoPath, "utf8"));
const listen = JSON.parse(fs.readFileSync(listenPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const packFile = JSON.parse(fs.readFileSync(packPath, "utf8"));
const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));

if (bingo.items.some((it) => it.id === "bg-688")) {
  console.error("bingo warn items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-655")) {
  console.error("listen warn items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-688",
    word: "경고하다",
    gloss: {
      en: "to warn",
      ko: "경고하다",
      zh: "警告",
    },
    tags: ["warn"],
  },
  {
    id: "bg-689",
    word: "주의하다",
    gloss: {
      en: "to pay attention; heed caution",
      ko: "주의하다",
      zh: "注意；当心",
    },
    tags: ["warn"],
  },
  {
    id: "bg-690",
    word: "위험하다",
    gloss: {
      en: "to be dangerous",
      ko: "위험하다",
      zh: "危险",
    },
    tags: ["warn"],
  },
  {
    id: "bg-691",
    word: "피하다",
    gloss: {
      en: "to avoid",
      ko: "피하다",
      zh: "避开；避免",
    },
    tags: ["warn"],
  },
  {
    id: "bg-692",
    word: "예방하다",
    gloss: {
      en: "to prevent",
      ko: "예방하다",
      zh: "预防",
    },
    tags: ["warn"],
  },
  {
    id: "bg-693",
    word: "대처하다",
    gloss: {
      en: "to cope; deal with",
      ko: "대처하다",
      zh: "应对；处理",
    },
    tags: ["warn"],
  },
  {
    id: "bg-694",
    word: "경고",
    gloss: {
      en: "warning (noun)",
      ko: "경고",
      zh: "警告",
    },
    tags: ["warn"],
  },
  {
    id: "bg-695",
    word: "주의",
    gloss: {
      en: "caution; attention (noun)",
      ko: "주의",
      zh: "注意",
    },
    tags: ["warn"],
  },
  {
    id: "bg-696",
    word: "안전",
    gloss: {
      en: "safety (noun)",
      ko: "안전",
      zh: "安全",
    },
    tags: ["warn"],
  },
  {
    id: "bg-697",
    word: "주의사항",
    gloss: {
      en: "precautions; notices",
      ko: "주의사항",
      zh: "注意事项",
    },
    tags: ["warn"],
  },
];

const listenNew = [
  {
    id: "lm-655",
    text: "미리 경고해 드려요",
    gloss: {
      en: "I warn you in advance",
      ko: "경고하다",
      zh: "我提前警告您",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-656",
    text: "표지판을 잘 주의해요",
    gloss: {
      en: "I pay close attention to the signs",
      ko: "주의하다",
      zh: "我仔细注意标牌",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-657",
    text: "공사 구간은 위험해요",
    gloss: {
      en: "The construction zone is dangerous",
      ko: "위험하다",
      zh: "施工路段很危险",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-658",
    text: "젖은 바닥을 피해요",
    gloss: {
      en: "I avoid the wet floor",
      ko: "피하다",
      zh: "我避开湿滑的地面",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-659",
    text: "사고를 예방하려고 해요",
    gloss: {
      en: "I try to prevent accidents",
      ko: "예방하다",
      zh: "我想预防事故",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-660",
    text: "정전에 차분히 대처해요",
    gloss: {
      en: "I calmly cope with the blackout",
      ko: "대처하다",
      zh: "我冷静应对停电",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-661",
    text: "경고 문구를 붙여요",
    gloss: {
      en: "I put up a warning notice",
      ko: "경고",
      zh: "我贴上警告文字",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-662",
    text: "주의 표시를 봐요",
    gloss: {
      en: "I look at the caution signs",
      ko: "주의",
      zh: "我看注意标志",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-663",
    text: "안전을 먼저 생각해요",
    gloss: {
      en: "I think of safety first",
      ko: "안전",
      zh: "我先考虑安全",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "lm-664",
    text: "주의사항을 외워요",
    gloss: {
      en: "I memorize the precautions",
      ko: "주의사항",
      zh: "我背注意事项",
    },
    tags: ["warn", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "warn-caution");
if (pack) {
  for (const it of pack.items) {
    if (it.example && it.example.ko)
      packExamples.add(it.example.ko.replace(/[.。!?？]$/, ""));
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
    .filter((it) => (it.tags || []).includes("warn"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from problem/complain/refuse/rules/health (+ nearby)
const BAD_TAGS = [
  "problem",
  "complain",
  "refuse",
  "rules",
  "health",
  "clinic",
  "driving",
  "emotion",
  "opinion",
  "apology",
  "advice",
];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("warn")) bingo.themes.push("warn");
if (!listen.themes.includes("warn")) listen.themes.push("warn");

bingo.version = 71;
listen.version = 71;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and complain-dissatisfaction crossfill",
  "complain-dissatisfaction, and warn-caution crossfill"
);
listen.copyright = listen.copyright.replace(
  "and complain-dissatisfaction crossfill",
  "complain-dissatisfaction, and warn-caution crossfill"
);
if (!bingo.copyright.includes("warn-caution")) {
  console.error("bingo copyright missing warn-caution");
  process.exit(1);
}
if (!listen.copyright.includes("warn-caution")) {
  console.error("listen copyright missing warn-caution");
  process.exit(1);
}

bingo.note =
  "+10 warn-caution (bg-688–697, 2026-07-27): Prefer 경고하다·주의하다·위험하다·피하다 · 예방하다·대처하다·경고·주의·안전·주의사항. Skip 긴급·비상 → cloze Done. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · complain · refuse · health. NIKL/Sejong · no brand names. Suggest particle/dictation. Prior complain bg-678–687 · refuse · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 warn-caution (lm-655–664, 2026-07-27): Prefer 경고하다·주의하다·위험하다·피하다 (미리 경고해 드려요 · 표지판을 잘 주의해요 · 공사 구간은 위험해요 · 젖은 바닥을 피해요). 예방하다·대처하다·경고·주의·안전·주의사항. Skip 긴급·비상 → cloze Done. Distinct from problem/complain/refuse/rules/health · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation. Prior complain lm-645–654 · refuse · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 255;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 697 · listen-match 664 · speed 650 · telephone 585 · scramble 587 · dictation 642 · cloze 642 · particle 636. +warn-caution bingo/listen +10 (bg-688–697 · lm-655–664) · themes warn · warnTagged 10×4(speed+cloze+bingo+listen) · Prefer 경고하다·주의하다·위험하다·피하다 Done · Suggest particle/dictation · chip 제안 KO 경고 / ZH 警告 · ThemeSm/칩 미터치. Prior cloze c-633–642 · speed sq-641–650. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 71;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 71;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday warn / heed caution / be dangerous / avoid / prevent / cope / warning-noun / caution-noun / safety-noun / precautions / urgent / emergency survival — distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 경고하다·주의하다·위험하다·피하다 bingo/listen · Suggest particle/dictation · themes warn · chip 제안 경고/警告 · ThemeSm 미터치.";
  if (packFile.note && packFile.note.includes("warn-caution")) {
    packFile.note = packFile.note.replace(
      /\+warn-caution[^.]*\./,
      "+warn-caution 12 Done speed+cloze+bingo/listen (2026-07-27). Prefer 경고하다·주의하다·위험하다·피하다 bingo/listen · Suggest particle/dictation · themes warn · chip 제안 경고/警告 · ThemeSm 미터치."
    );
  }
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · chip 제안 KO 경고 \/ ZH 警告 · ThemeSm\/칩 미터치\./,
  "Bingo/listen +10 Done · Prefer 경고하다·주의하다·위험하다·피하다 · Suggest particle/dictation · ThemeSm/칩 미터치."
);
if (
  speed.note.includes("Suggest bingo/listen") &&
  !speed.note.includes("Bingo/listen +10 Done")
) {
  speed.note = speed.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 경고하다·주의하다·위험하다·피하다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next \(Prefer 경고하다·주의하다·위험하다·피하다\)\./,
  "Bingo/listen +10 Done · Prefer 경고하다·주의하다·위험하다·피하다 · Suggest particle/dictation."
);
if (
  cloze.note.includes("Suggest bingo/listen") &&
  !cloze.note.includes("Bingo/listen +10 Done")
) {
  cloze.note = cloze.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 경고하다·주의하다·위험하다·피하다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const canonList = canon.themes || [];
const warnCanonEntry = canonList.find((t) => t.themeKey === "warn");
if (warnCanonEntry) {
  warnCanonEntry.notes =
    "Pack+speed+cloze+bingo/listen Done (2026-07-27). ThemeSm chip not enabled yet. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · refuse · health. Prefer 경고하다·주의하다·위험하다·피하다 bingo/listen Done · Suggest particle/dictation.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

const warnBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("warn")
).length;
const warnListen = listen.items.filter((it) =>
  (it.tags || []).includes("warn")
).length;
const warnSpeed = (speed.items || []).filter((it) =>
  (it.tags || []).includes("warn")
).length;
const warnCloze = (cloze.items || []).filter((it) =>
  (it.tags || []).includes("warn")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      warnTagged: {
        bingo: warnBingo,
        listen: warnListen,
        speed: warnSpeed,
        cloze: warnCloze,
        total: warnBingo + warnListen + warnSpeed + warnCloze,
      },
      version: {
        bingo: bingo.version,
        listen: listen.version,
        manifest: manifest.version,
      },
      next: "particle/dictation only",
    },
    null,
    2
  )
);
console.log("warn bingo/listen patch OK");

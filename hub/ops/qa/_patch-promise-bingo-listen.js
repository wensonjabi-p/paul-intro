/**
 * ThemeSm56 · promise-trust → bingo +10 · listen-match +10
 * Prefer 약속하다·신뢰·정직하다 · remaining promise lemmas
 * Skip 진실·거짓말 → cloze Done
 * Suggest particle/dictation(+tel/scramble) next · ThemeSm56c chip SHOW
 * Run: node hub/ops/qa/_patch-promise-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-658")) {
  console.error("bingo promise items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-625")) {
  console.error("listen promise items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-658",
    word: "약속하다",
    gloss: {
      en: "to promise",
      ko: "약속하다",
      zh: "约定；承诺",
    },
    tags: ["promise"],
  },
  {
    id: "bg-659",
    word: "신뢰",
    gloss: {
      en: "trust; confidence (noun)",
      ko: "신뢰",
      zh: "信任",
    },
    tags: ["promise"],
  },
  {
    id: "bg-660",
    word: "정직하다",
    gloss: {
      en: "to be honest",
      ko: "정직하다",
      zh: "诚实",
    },
    tags: ["promise"],
  },
  {
    id: "bg-661",
    word: "신뢰하다",
    gloss: {
      en: "to trust; have confidence in",
      ko: "신뢰하다",
      zh: "信任",
    },
    tags: ["promise"],
  },
  {
    id: "bg-662",
    word: "확신하다",
    gloss: {
      en: "to be sure; be convinced",
      ko: "확신하다",
      zh: "确信",
    },
    tags: ["promise"],
  },
  {
    id: "bg-663",
    word: "의심하다",
    gloss: {
      en: "to doubt; suspect",
      ko: "의심하다",
      zh: "怀疑",
    },
    tags: ["promise"],
  },
  {
    id: "bg-664",
    word: "속이다",
    gloss: {
      en: "to deceive; trick",
      ko: "속이다",
      zh: "欺骗",
    },
    tags: ["promise"],
  },
  {
    id: "bg-665",
    word: "보장하다",
    gloss: {
      en: "to guarantee; assure",
      ko: "보장하다",
      zh: "保障；保证",
    },
    tags: ["promise"],
  },
  {
    id: "bg-666",
    word: "증명하다",
    gloss: {
      en: "to prove; demonstrate",
      ko: "증명하다",
      zh: "证明",
    },
    tags: ["promise"],
  },
  {
    id: "bg-667",
    word: "의심",
    gloss: {
      en: "doubt; suspicion (noun)",
      ko: "의심",
      zh: "怀疑",
    },
    tags: ["promise"],
  },
];

const listenNew = [
  {
    id: "lm-625",
    text: "주말에 만나자고 약속해요",
    gloss: {
      en: "I promise to meet on the weekend",
      ko: "약속하다",
      zh: "约定周末见面",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-626",
    text: "팀 안의 신뢰가 커요",
    gloss: {
      en: "Trust inside the team grows",
      ko: "신뢰",
      zh: "团队里的信任变大",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-627",
    text: "답변은 늘 정직해요",
    gloss: {
      en: "The answer is always honest",
      ko: "정직하다",
      zh: "回答总是诚实",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-628",
    text: "선생님을 깊이 신뢰해요",
    gloss: {
      en: "I deeply trust the teacher",
      ko: "신뢰하다",
      zh: "深深信任老师",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-629",
    text: "합격할 거라고 확신해요",
    gloss: {
      en: "I'm sure I will pass",
      ko: "확신하다",
      zh: "确信会合格",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-630",
    text: "그 이유를 의심해요",
    gloss: {
      en: "I doubt that reason",
      ko: "의심하다",
      zh: "怀疑那个理由",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-631",
    text: "값을 속이지 않아요",
    gloss: {
      en: "I don't deceive about the price",
      ko: "속이다",
      zh: "不在价格上欺骗",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-632",
    text: "시간을 꼭 보장해요",
    gloss: {
      en: "We definitely guarantee the time",
      ko: "보장하다",
      zh: "一定保障时间",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-633",
    text: "말로 사실을 증명해요",
    gloss: {
      en: "I prove the facts with words",
      ko: "증명하다",
      zh: "用话证明事实",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "lm-634",
    text: "잠깐 의심이 생겨요",
    gloss: {
      en: "A little doubt arises",
      ko: "의심",
      zh: "忽然起了疑心",
    },
    tags: ["promise", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "promise-trust");
if (pack) {
  for (const it of pack.items) {
    if (it.example && it.example.ko)
      packExamples.add(it.example.ko.replace(/[.。]$/, ""));
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
    .filter((it) => (it.tags || []).includes("promise"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from think/rules/time/personality/favor/encourage
const BAD_TAGS = [
  "think",
  "rules",
  "time",
  "personality",
  "favor",
  "encourage",
  "advice",
  "apology",
  "success",
];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("promise")) bingo.themes.push("promise");
if (!listen.themes.includes("promise")) listen.themes.push("promise");

bingo.version = 68;
listen.version = 68;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and encourage-support crossfill",
  "encourage-support, and promise-trust crossfill"
);
listen.copyright = listen.copyright.replace(
  "and encourage-support crossfill",
  "encourage-support, and promise-trust crossfill"
);
if (!bingo.copyright.includes("promise-trust")) {
  console.error("bingo copyright missing promise-trust");
  process.exit(1);
}
if (!listen.copyright.includes("promise-trust")) {
  console.error("listen copyright missing promise-trust");
  process.exit(1);
}

bingo.note =
  "+10 promise-trust (bg-658–667, 2026-07-27): Prefer 약속하다·신뢰·정직하다 · 신뢰하다·확신하다·의심하다·속이다·보장하다·증명하다·의심. Skip 진실·거짓말 → cloze Done. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. NIKL/Sejong · no brand names. Suggest particle/dictation(+tel/scramble) · ThemeSm56c chip SHOW. Prior encourage bg-648–657 · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 promise-trust (lm-625–634, 2026-07-27): Prefer 약속하다·신뢰·정직하다 (주말에 만나자고 약속해요 · 팀 안의 신뢰가 커요 · 답변은 늘 정직해요). 신뢰하다·확신하다·의심하다·속이다·보장하다·증명하다·의심. Skip 진실·거짓말 → cloze Done. Distinct from think/rules/time/personality/favor/encourage · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation(+tel/scramble) · ThemeSm56c chip SHOW. Prior encourage lm-615–624 · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 243;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 667 · listen-match 634 · speed 620 · telephone 561 · scramble 563 · dictation 612 · cloze 612 · particle 606. +promise-trust bingo/listen +10 (bg-658–667 · lm-625–634) · themes promise · promiseTagged 10×4(speed+cloze+bingo+listen) · Prefer 약속하다·신뢰·정직하다 Done · Suggest particle/dictation(+tel/scramble) · chip KO 약속 / ZH 约定 · ThemeSm56 · Prior cloze c-603–612 · speed sq-611–620. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 68;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 68;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday promise / trust / be sure / doubt / deceive / honest / guarantee / prove / trust-noun / doubt-noun / truth / lie survival — distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 약속하다·신뢰·정직하다 bingo/listen · Suggest particle/dictation(+tel/scramble) · themes promise · chip 약속/约定 · ThemeSm56.";
  packFile.note = packFile.note.replace(
    /\+promise-trust 12 \(약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말\) 2026-07-27\. Distinct from think 믿다 · rules 지키다·어기다 · time 약속\(n\) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success\. Lemmas align NIKL\/Sejong·Tammy; original examples\. No brand names\. Speed \+10 · cloze \+10 Done Prefer 진실·거짓말 · Suggest bingo\/listen · themes promise · chip 약속\/约定 · ThemeSm56a\./,
    "+promise-trust 12 (약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말) 2026-07-27. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 약속하다·신뢰·정직하다 bingo/listen · Suggest particle/dictation(+tel/scramble) · themes promise · chip 약속/约定 · ThemeSm56."
  );
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · ThemeSm56a · chip KO 약속 \/ ZH 约定\./,
  "Bingo/listen +10 Done · Prefer 약속하다·신뢰·정직하다 · Suggest particle/dictation(+tel/scramble) · chip KO 약속 / ZH 约定."
);
if (!speed.note.includes("Bingo/listen +10 Done")) {
  speed.note = speed.note.replace(
    /Suggest bingo\/listen · ThemeSm56a · chip KO 약속 \/ ZH 约定\./,
    "Bingo/listen +10 Done · Prefer 약속하다·신뢰·정직하다 · Suggest particle/dictation(+tel/scramble) · chip KO 약속 / ZH 约定."
  );
}
// fallback if phrasing differs
if (speed.note.includes("Suggest bingo/listen") && !speed.note.includes("Bingo/listen +10 Done")) {
  speed.note = speed.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 약속하다·신뢰·정직하다 · Suggest particle/dictation(+tel/scramble)."
  );
}
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next\./,
  "Bingo/listen +10 Done · Prefer 약속하다·신뢰·정직하다 · Suggest particle/dictation(+tel/scramble)."
);
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const canonList = canon.themes || [];
const promiseCanonEntry = canonList.find((t) => t.themeKey === "promise");
if (promiseCanonEntry) {
  promiseCanonEntry.notes =
    "ThemeSm56a speed(+cloze) · ThemeSm56 bingo/listen Done (2026-07-27). Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Suggest particle/dictation(+tel/scramble) · ThemeSm56c chip SHOW.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

const promiseBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("promise")
).length;
const promiseListen = listen.items.filter((it) =>
  (it.tags || []).includes("promise")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      promiseTaggedBingo: promiseBingo,
      promiseTaggedListen: promiseListen,
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
console.log("promise bingo/listen patch OK");

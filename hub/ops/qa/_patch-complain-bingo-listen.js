/**
 * complain-dissatisfaction → bingo +10 · listen-match +10
 * Prefer 항의·신고하다·불만·따지다
 * Skip 이의·하소연 → cloze Done
 * Suggest particle/dictation only (no ThemeSm chip)
 * Run: node hub/ops/qa/_patch-complain-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-678")) {
  console.error("bingo complain items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-645")) {
  console.error("listen complain items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-678",
    word: "항의",
    gloss: {
      en: "protest; objection (noun)",
      ko: "항의",
      zh: "抗议",
    },
    tags: ["complain"],
  },
  {
    id: "bg-679",
    word: "신고하다",
    gloss: {
      en: "to report (a problem)",
      ko: "신고하다",
      zh: "举报；申报",
    },
    tags: ["complain"],
  },
  {
    id: "bg-680",
    word: "불만",
    gloss: {
      en: "dissatisfaction; complaint",
      ko: "불만",
      zh: "不满",
    },
    tags: ["complain"],
  },
  {
    id: "bg-681",
    word: "따지다",
    gloss: {
      en: "to argue over; quibble",
      ko: "따지다",
      zh: "计较；追究",
    },
    tags: ["complain"],
  },
  {
    id: "bg-682",
    word: "불평하다",
    gloss: {
      en: "to complain",
      ko: "불평하다",
      zh: "抱怨",
    },
    tags: ["complain"],
  },
  {
    id: "bg-683",
    word: "항의하다",
    gloss: {
      en: "to protest; object",
      ko: "항의하다",
      zh: "抗议",
    },
    tags: ["complain"],
  },
  {
    id: "bg-684",
    word: "제기하다",
    gloss: {
      en: "to raise (an issue)",
      ko: "제기하다",
      zh: "提出",
    },
    tags: ["complain"],
  },
  {
    id: "bg-685",
    word: "하소연하다",
    gloss: {
      en: "to vent; complain to someone",
      ko: "하소연하다",
      zh: "诉苦；诉说",
    },
    tags: ["complain"],
  },
  {
    id: "bg-686",
    word: "불만스럽다",
    gloss: {
      en: "to be unsatisfactory; displeased",
      ko: "불만스럽다",
      zh: "不满",
    },
    tags: ["complain"],
  },
  {
    id: "bg-687",
    word: "불평",
    gloss: {
      en: "complaint; grumbling (noun)",
      ko: "불평",
      zh: "抱怨",
    },
    tags: ["complain"],
  },
];

const listenNew = [
  {
    id: "lm-645",
    text: "손님 항의가 쌓여요",
    gloss: {
      en: "Customer protests pile up",
      ko: "항의",
      zh: "顾客抗议在堆积",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-646",
    text: "고장을 바로 신고해요",
    gloss: {
      en: "I report the breakdown right away",
      ko: "신고하다",
      zh: "马上申报故障",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-647",
    text: "불만을 짧게 적어요",
    gloss: {
      en: "I write the complaint briefly",
      ko: "불만",
      zh: "简短写下不满",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-648",
    text: "계산서를 하나씩 따져요",
    gloss: {
      en: "I go over the bill item by item",
      ko: "따지다",
      zh: "一项项核对账单",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-649",
    text: "지각만 자꾸 불평해요",
    gloss: {
      en: "I keep complaining only about lateness",
      ko: "불평하다",
      zh: "老是抱怨迟到",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-650",
    text: "지연에 바로 항의해요",
    gloss: {
      en: "I protest the delay right away",
      ko: "항의하다",
      zh: "马上抗议延误",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-651",
    text: "의견을 먼저 제기해요",
    gloss: {
      en: "I raise the opinion first",
      ko: "제기하다",
      zh: "先提出意见",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-652",
    text: "동료에게 피곤을 하소연해요",
    gloss: {
      en: "I vent my tiredness to a coworker",
      ko: "하소연하다",
      zh: "向同事诉说疲劳",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-653",
    text: "결과가 불만스러워요",
    gloss: {
      en: "The result is unsatisfactory",
      ko: "불만스럽다",
      zh: "结果让人不满意",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "lm-654",
    text: "불평을 줄이려고 해요",
    gloss: {
      en: "I try to reduce complaining",
      ko: "불평",
      zh: "想减少抱怨",
    },
    tags: ["complain", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "complain-dissatisfaction");
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
    .filter((it) => (it.tags || []).includes("complain"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from problem/opinion/apology/refuse/emotion (+ nearby)
const BAD_TAGS = [
  "problem",
  "opinion",
  "apology",
  "refuse",
  "emotion",
  "compare",
  "favor",
  "advice",
  "speech",
  "promise",
];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("complain")) bingo.themes.push("complain");
if (!listen.themes.includes("complain")) listen.themes.push("complain");

bingo.version = 70;
listen.version = 70;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and refuse-accept crossfill",
  "refuse-accept, and complain-dissatisfaction crossfill"
);
listen.copyright = listen.copyright.replace(
  "and refuse-accept crossfill",
  "refuse-accept, and complain-dissatisfaction crossfill"
);
if (!bingo.copyright.includes("complain-dissatisfaction")) {
  console.error("bingo copyright missing complain-dissatisfaction");
  process.exit(1);
}
if (!listen.copyright.includes("complain-dissatisfaction")) {
  console.error("listen copyright missing complain-dissatisfaction");
  process.exit(1);
}

bingo.note =
  "+10 complain-dissatisfaction (bg-678–687, 2026-07-27): Prefer 항의·신고하다·불만·따지다 · 불평하다·항의하다·제기하다·하소연하다·불만스럽다·불평. Skip 이의·하소연 → cloze Done. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology. NIKL/Sejong · no brand names. Suggest particle/dictation. Prior refuse bg-668–677 · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 complain-dissatisfaction (lm-645–654, 2026-07-27): Prefer 항의·신고하다·불만·따지다 (손님 항의가 쌓여요 · 고장을 바로 신고해요 · 불만을 짧게 적어요 · 계산서를 하나씩 따져요). 불평하다·항의하다·제기하다·하소연하다·불만스럽다·불평. Skip 이의·하소연 → cloze Done. Distinct from problem/opinion/apology/refuse/emotion · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation. Prior refuse lm-635–644 · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 251;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 687 · listen-match 654 · speed 640 · telephone 577 · scramble 579 · dictation 632 · cloze 632 · particle 626. +complain-dissatisfaction bingo/listen +10 (bg-678–687 · lm-645–654) · themes complain · complainTagged 10×4(speed+cloze+bingo+listen) · Prefer 항의·신고하다·불만·따지다 Done · Suggest particle/dictation · chip 제안 KO 불만 / ZH 不满 · ThemeSm/칩 미터치. Prior cloze c-623–632 · speed sq-631–640. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 70;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 70;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday complain / protest / quibble / raise an issue / vent / be unsatisfactory / dissatisfaction / complaint / protest-noun / report / objection / venting-noun survival — distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology 불편하다 · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 항의·신고하다·불만·따지다 bingo/listen · Suggest particle/dictation · themes complain · chip 제안 불만/不满 · ThemeSm 미터치.";
  if (packFile.note && packFile.note.includes("complain-dissatisfaction")) {
    packFile.note = packFile.note.replace(
      /\+complain-dissatisfaction[^.]*\./,
      "+complain-dissatisfaction 12 Done speed+cloze+bingo/listen (2026-07-27). Prefer 항의·신고하다·불만·따지다 bingo/listen · Suggest particle/dictation · themes complain · chip 제안 불만/不满 · ThemeSm 미터치."
    );
  }
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · chip 제안 KO 불만 \/ ZH 不满 · ThemeSm\/칩 미터치\./,
  "Bingo/listen +10 Done · Prefer 항의·신고하다·불만·따지다 · Suggest particle/dictation · ThemeSm/칩 미터치."
);
if (
  speed.note.includes("Suggest bingo/listen") &&
  !speed.note.includes("Bingo/listen +10 Done")
) {
  speed.note = speed.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 항의·신고하다·불만·따지다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next \(Prefer 항의·신고하다·불만·따지다\)\./,
  "Bingo/listen +10 Done · Prefer 항의·신고하다·불만·따지다 · Suggest particle/dictation."
);
if (
  cloze.note.includes("Suggest bingo/listen") &&
  !cloze.note.includes("Bingo/listen +10 Done")
) {
  cloze.note = cloze.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 항의·신고하다·불만·따지다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const canonList = canon.themes || [];
const complainCanonEntry = canonList.find((t) => t.themeKey === "complain");
if (complainCanonEntry) {
  complainCanonEntry.notes =
    "Pack+speed+cloze+bingo/listen Done (2026-07-27). ThemeSm chip not enabled yet. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology. Prefer 항의·신고하다·불만·따지다 bingo/listen Done · Suggest particle/dictation.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

const complainBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("complain")
).length;
const complainListen = listen.items.filter((it) =>
  (it.tags || []).includes("complain")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      complainTaggedBingo: complainBingo,
      complainTaggedListen: complainListen,
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
console.log("complain bingo/listen patch OK");

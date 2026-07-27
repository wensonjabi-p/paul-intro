/**
 * ThemeSm53b — success-challenge → bingo +10 · listen-match +10
 * Prefer 자랑하다·성과 · include 성취·바라다 · remaining success lemmas
 * Skip 희망·기대하다 → particle residual
 * Run: node hub/ops/qa/_patch-success-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-628")) {
  console.error("bingo success items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-595")) {
  console.error("listen success items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-628",
    word: "자랑하다",
    gloss: {
      en: "to be proud of; boast",
      ko: "자랑하다",
      zh: "自豪；炫耀",
    },
    tags: ["success"],
  },
  {
    id: "bg-629",
    word: "성과",
    gloss: {
      en: "result; achievement (outcome)",
      ko: "성과",
      zh: "成果；业绩",
    },
    tags: ["success"],
  },
  {
    id: "bg-630",
    word: "성취",
    gloss: {
      en: "achievement; accomplishment",
      ko: "성취",
      zh: "成就",
    },
    tags: ["success"],
  },
  {
    id: "bg-631",
    word: "바라다",
    gloss: {
      en: "to wish; hope for",
      ko: "바라다",
      zh: "希望；盼望",
    },
    tags: ["success"],
  },
  {
    id: "bg-632",
    word: "성공하다",
    gloss: {
      en: "to succeed",
      ko: "성공하다",
      zh: "成功",
    },
    tags: ["success"],
  },
  {
    id: "bg-633",
    word: "실패하다",
    gloss: {
      en: "to fail",
      ko: "실패하다",
      zh: "失败",
    },
    tags: ["success"],
  },
  {
    id: "bg-634",
    word: "기회",
    gloss: {
      en: "opportunity; chance",
      ko: "기회",
      zh: "机会",
    },
    tags: ["success"],
  },
  {
    id: "bg-635",
    word: "도전하다",
    gloss: {
      en: "to challenge; take on",
      ko: "도전하다",
      zh: "挑战；尝试",
    },
    tags: ["success"],
  },
  {
    id: "bg-636",
    word: "합격하다",
    gloss: {
      en: "to pass (a test)",
      ko: "합격하다",
      zh: "合格；通过",
    },
    tags: ["success"],
  },
  {
    id: "bg-637",
    word: "불합격",
    gloss: {
      en: "failure to pass; rejection",
      ko: "불합격",
      zh: "不合格",
    },
    tags: ["success"],
  },
];

const listenNew = [
  {
    id: "lm-595",
    text: "친구에게 상을 자랑해요",
    gloss: {
      en: "I proudly show the award to a friend",
      ko: "자랑하다",
      zh: "向朋友炫耀奖项",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-596",
    text: "팀 성과를 발표해요",
    gloss: {
      en: "I present the team's results",
      ko: "성과",
      zh: "发表团队成果",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-597",
    text: "올해 성취를 나눠요",
    gloss: {
      en: "I share this year's achievements",
      ko: "성취",
      zh: "分享今年的成就",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-598",
    text: "좋은 결과를 바라요",
    gloss: {
      en: "I wish for a good result",
      ko: "바라다",
      zh: "盼望好结果",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-599",
    text: "발표에 성공해요",
    gloss: {
      en: "I succeed in the presentation",
      ko: "성공하다",
      zh: "发表成功了",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-600",
    text: "첫 시도에 실패해요",
    gloss: {
      en: "I fail on the first try",
      ko: "실패하다",
      zh: "第一次尝试失败了",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-601",
    text: "새 기회를 기다려요",
    gloss: {
      en: "I wait for a new opportunity",
      ko: "기회",
      zh: "等待新机会",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-602",
    text: "어려운 과제에 도전해요",
    gloss: {
      en: "I take on a difficult assignment",
      ko: "도전하다",
      zh: "挑战难课题",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-603",
    text: "면접에 합격해요",
    gloss: {
      en: "I pass the interview",
      ko: "합격하다",
      zh: "面试合格了",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "lm-604",
    text: "불합격이 아쉬워요",
    gloss: {
      en: "Not passing is disappointing",
      ko: "불합격",
      zh: "不合格很可惜",
    },
    tags: ["success", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "success-challenge");
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
    .filter((it) => (it.tags || []).includes("success"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from problem/reason/opinion/habit/apology hosts
const BAD_TAGS = ["problem", "reason", "opinion", "habit", "apology"];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("success")) bingo.themes.push("success");
if (!listen.themes.includes("success")) listen.themes.push("success");

bingo.version = 65;
listen.version = 65;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and apology-politeness crossfill",
  "apology-politeness, and success-challenge crossfill"
);
listen.copyright = listen.copyright.replace(
  /and apology-politeness crossfill/,
  "apology-politeness, and success-challenge crossfill"
);
if (!listen.copyright.includes("success-challenge")) {
  listen.copyright = listen.copyright.replace(
    "personality-character, and apology-politeness crossfill",
    "personality-character, apology-politeness, and success-challenge crossfill"
  );
}

bingo.note =
  "+10 success-challenge (bg-628–637, 2026-07-27): Prefer 자랑하다·성과 · 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격. Skip 희망·기대하다 → particle residual. Distinct from problem/reason/opinion/habit/apology · school 시험·성적 · personality 자신감 · habit 노력하다. NIKL/Sejong · no brand names. Suggest particle/dictation(+tel/scramble). Prior apology bg-618–627 · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 success-challenge (lm-595–604, 2026-07-27): Prefer 자랑하다·성과 (친구에게 상을 자랑해요 · 팀 성과를 발표해요). 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격. Skip 희망·기대하다 → particle residual. Distinct from problem/reason/opinion/habit/apology · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation(+tel/scramble). Prior apology lm-585–594 · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 231;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 637 · listen-match 604 · speed 590 · telephone 537 · scramble 539 · dictation 582 · cloze 582 · particle 576. +success-challenge bingo/listen +10 (bg-628–637 · lm-595–604) · themes success · successTagged 10×4(speed+cloze+bingo+listen) · Prefer 자랑하다·성과 Done · Skip 희망·기대하다 → particle · chip KO 성공 / ZH 成功 · ThemeSm53b. Prior cloze c-573–582 · speed sq-581–590. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 65;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 65;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday succeed / fail / chance / challenge / pass / fail-exam / hope / expect / outcome / pride / achievement / wish survival — distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험·선택하다 · personality 자신감 · school 시험·성적 · think 결정하다·계획하다 · emotion · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 자랑하다·성과 bingo/listen · Skip 희망·기대하다 → particle · themes success · chip 성공/成功 · ThemeSm53b.";
  packFile.note = packFile.note.replace(
    /Speed \+10 · Prefer 성취·바라다 → cloze · themes success · chip 성공\/成功\./,
    "Speed+cloze+bingo/listen Done · Prefer 자랑하다·성과 bingo/listen · Skip 희망·기대하다 → particle · themes success · chip 성공/成功 · ThemeSm53b."
  );
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest cloze \+8–10 · Prefer 성취·바라다 · themes success · chip KO 성공 \/ ZH 成功\./,
  "Bingo/listen +10 Done · Prefer 자랑하다·성과 · Suggest particle/dictation(+tel/scramble) · Skip 희망·기대하다 residual · chip KO 성공 / ZH 成功."
);
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen \+8–10 · Prefer 자랑하다·성과\./,
  "Bingo/listen +10 Done · Prefer 자랑하다·성과 · Suggest particle/dictation(+tel/scramble) · Skip 희망·기대하다 residual."
);
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const successBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("success")
).length;
const successListen = listen.items.filter((it) =>
  (it.tags || []).includes("success")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      successTaggedBingo: successBingo,
      successTaggedListen: successListen,
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
console.log("success bingo/listen patch OK");

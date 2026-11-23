/**
 * ThemeSm55b — encourage-support → bingo +10 · listen-match +10
 * Prefer 응원·지지 · remaining encourage lemmas
 * Suggest particle/dictation(+tel/scramble) next
 * Run: node hub/ops/qa/_patch-encourage-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-648")) {
  console.error("bingo encourage items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-615")) {
  console.error("listen encourage items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-648",
    word: "응원",
    gloss: {
      en: "cheering; backing (noun)",
      ko: "응원",
      zh: "加油；声援",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-649",
    word: "지지",
    gloss: {
      en: "support (noun)",
      ko: "지지",
      zh: "支持",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-650",
    word: "응원하다",
    gloss: {
      en: "to cheer; root for; back",
      ko: "응원하다",
      zh: "加油；声援",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-651",
    word: "지지하다",
    gloss: {
      en: "to support; stand by",
      ko: "지지하다",
      zh: "支持",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-652",
    word: "격려하다",
    gloss: {
      en: "to encourage",
      ko: "격려하다",
      zh: "鼓励",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-653",
    word: "위로하다",
    gloss: {
      en: "to comfort; console",
      ko: "위로하다",
      zh: "安慰",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-654",
    word: "의지하다",
    gloss: {
      en: "to rely on; depend on",
      ko: "의지하다",
      zh: "依靠；依赖",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-655",
    word: "배려하다",
    gloss: {
      en: "to be considerate; show care",
      ko: "배려하다",
      zh: "体贴；关照",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-656",
    word: "든든하다",
    gloss: {
      en: "to feel secure; reliable; reassuring",
      ko: "든든하다",
      zh: "踏实；可靠",
    },
    tags: ["encourage"],
  },
  {
    id: "bg-657",
    word: "안심하다",
    gloss: {
      en: "to feel relieved; be at ease",
      ko: "안심하다",
      zh: "放心",
    },
    tags: ["encourage"],
  },
];

const listenNew = [
  {
    id: "lm-615",
    text: "짧은 응원을 보내요",
    gloss: {
      en: "I send a short cheer",
      ko: "응원",
      zh: "送上简短加油",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-616",
    text: "따뜻한 지지를 받아요",
    gloss: {
      en: "I receive warm support",
      ko: "지지",
      zh: "得到温暖的支持",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-617",
    text: "친구의 발표를 응원해요",
    gloss: {
      en: "I cheer for a friend's presentation",
      ko: "응원하다",
      zh: "为朋友的发表加油",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-618",
    text: "내 선택을 지지해요",
    gloss: {
      en: "I stand by my choice",
      ko: "지지하다",
      zh: "支持我的选择",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-619",
    text: "시험 전에 동생을 격려해요",
    gloss: {
      en: "I encourage my sibling before the exam",
      ko: "격려하다",
      zh: "考试前鼓励弟弟/妹妹",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-620",
    text: "속상한 동생을 위로해요",
    gloss: {
      en: "I comfort an upset sibling",
      ko: "위로하다",
      zh: "安慰难过的弟弟/妹妹",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-621",
    text: "힘들 때 가족에게 의지해요",
    gloss: {
      en: "When things are hard, I rely on family",
      ko: "의지하다",
      zh: "困难时依靠家人",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-622",
    text: "옆 자리를 배려해요",
    gloss: {
      en: "I am considerate of the seat beside me",
      ko: "배려하다",
      zh: "体贴旁边座位",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-623",
    text: "믿음직한 동료가 든든해요",
    gloss: {
      en: "A trustworthy coworker feels reassuring",
      ko: "든든하다",
      zh: "可靠的同事让人踏实",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "lm-624",
    text: "메시지를 보고 안심해요",
    gloss: {
      en: "I feel at ease after seeing the message",
      ko: "안심하다",
      zh: "看完消息后放心",
    },
    tags: ["encourage", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "encourage-support");
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
    .filter((it) => (it.tags || []).includes("encourage"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from advice/favor/success/opinion/emotion/friends
const BAD_TAGS = ["advice", "favor", "success", "opinion", "emotion", "friends"];
for (const it of [...bingoNew, ...listenNew]) {
  for (const t of BAD_TAGS) {
    if ((it.tags || []).includes(t)) {
      console.error("bad bothTags", it.id, t);
      process.exit(1);
    }
  }
}

if (!bingo.themes.includes("encourage")) bingo.themes.push("encourage");
if (!listen.themes.includes("encourage")) listen.themes.push("encourage");

bingo.version = 67;
listen.version = 67;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and advice-counsel crossfill",
  "advice-counsel, and encourage-support crossfill"
);
listen.copyright = listen.copyright.replace(
  /and advice-counsel crossfill/,
  "advice-counsel, and encourage-support crossfill"
);
if (!listen.copyright.includes("encourage-support")) {
  listen.copyright = listen.copyright.replace(
    "success-challenge, and advice-counsel crossfill",
    "success-challenge, advice-counsel, and encourage-support crossfill"
  );
}
if (!bingo.copyright.includes("encourage-support")) {
  bingo.copyright = bingo.copyright.replace(
    "success-challenge, and advice-counsel crossfill",
    "success-challenge, advice-counsel, and encourage-support crossfill"
  );
}

bingo.note =
  "+10 encourage-support (bg-648–657, 2026-07-27): Prefer 응원·지지 · 응원하다·지지하다·격려하다·위로하다·의지하다·배려하다·든든하다·안심하다. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. NIKL/Sejong · no brand names. Suggest particle/dictation(+tel/scramble). Prior advice bg-638–647 · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 encourage-support (lm-615–624, 2026-07-27): Prefer 응원·지지 (짧은 응원을 보내요 · 따뜻한 지지를 받아요). 응원하다·지지하다·격려하다·위로하다·의지하다·배려하다·든든하다·안심하다. Distinct from advice/favor/success/opinion/emotion/friends · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation(+tel/scramble). Prior advice lm-605–614 · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 239;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 657 · listen-match 624 · speed 610 · telephone 553 · scramble 555 · dictation 602 · cloze 602 · particle 596. +encourage-support bingo/listen +10 (bg-648–657 · lm-615–624) · themes encourage · encourageTagged 10×4(speed+cloze+bingo+listen) · Prefer 응원·지지 Done · Suggest particle/dictation(+tel/scramble) · chip KO 격려 / ZH 鼓励 · ThemeSm55b. Prior cloze c-593–602 · speed sq-601–610. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 67;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 67;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday encourage / cheer / support / comfort / rely / care / feel secure / feel relief / cheer-noun / support-noun / encourage-noun / comfort-noun survival — distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 응원·지지 bingo/listen · Suggest particle/dictation(+tel/scramble) · themes encourage · chip 격려/鼓励 · ThemeSm55b.";
  packFile.note = packFile.note.replace(
    /\+encourage-support 12 \(격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로\) 2026-07-27\. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports\. Lemmas align NIKL\/Sejong·Tammy; original examples\. No brand names\. Speed \+10 · cloze \+10 Done Prefer 격려·위로 · Skip 응원·지지 → bingo\/listen · themes encourage · chip 격려\/鼓励 · ThemeSm55a\./,
    "+encourage-support 12 (격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로) 2026-07-27. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 응원·지지 bingo/listen · Suggest particle/dictation(+tel/scramble) · themes encourage · chip 격려/鼓励 · ThemeSm55b."
  );
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · Skip 응원·지지 · ThemeSm55a · chip KO 격려 \/ ZH 鼓励\./,
  "Bingo/listen +10 Done · Prefer 응원·지지 · Suggest particle/dictation(+tel/scramble) · chip KO 격려 / ZH 鼓励."
);
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next\./,
  "Bingo/listen +10 Done · Prefer 응원·지지 · Suggest particle/dictation(+tel/scramble)."
);
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const encourageBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("encourage")
).length;
const encourageListen = listen.items.filter((it) =>
  (it.tags || []).includes("encourage")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      encourageTaggedBingo: encourageBingo,
      encourageTaggedListen: encourageListen,
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
console.log("encourage bingo/listen patch OK");

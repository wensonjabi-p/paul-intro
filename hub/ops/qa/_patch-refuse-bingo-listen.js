/**
 * refuse-accept → bingo +10 · listen-match +10
 * Prefer 거절하다·수락하다·응하다·승인하다
 * Skip 승낙·거부 → cloze Done
 * Suggest particle/dictation only (no ThemeSm chip)
 * Run: node hub/ops/qa/_patch-refuse-bingo-listen.js
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

if (bingo.items.some((it) => it.id === "bg-668")) {
  console.error("bingo refuse items already present");
  process.exit(1);
}
if (listen.items.some((it) => it.id === "lm-635")) {
  console.error("listen refuse items already present");
  process.exit(1);
}

const bingoNew = [
  {
    id: "bg-668",
    word: "거절하다",
    gloss: {
      en: "to refuse; decline",
      ko: "거절하다",
      zh: "拒绝",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-669",
    word: "수락하다",
    gloss: {
      en: "to accept (an offer)",
      ko: "수락하다",
      zh: "接受；应允",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-670",
    word: "응하다",
    gloss: {
      en: "to respond; comply",
      ko: "응하다",
      zh: "答应；响应",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-671",
    word: "승인하다",
    gloss: {
      en: "to approve; authorize",
      ko: "승인하다",
      zh: "批准；核准",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-672",
    word: "받아들이다",
    gloss: {
      en: "to accept; take in",
      ko: "받아들이다",
      zh: "接受；接纳",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-673",
    word: "사양하다",
    gloss: {
      en: "to decline politely",
      ko: "사양하다",
      zh: "婉拒；推辞",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-674",
    word: "승낙하다",
    gloss: {
      en: "to consent; grant",
      ko: "승낙하다",
      zh: "允诺；答应",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-675",
    word: "거부하다",
    gloss: {
      en: "to reject; refuse firmly",
      ko: "거부하다",
      zh: "拒斥；拒绝",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-676",
    word: "거절",
    gloss: {
      en: "refusal (noun)",
      ko: "거절",
      zh: "拒绝",
    },
    tags: ["refuse"],
  },
  {
    id: "bg-677",
    word: "수락",
    gloss: {
      en: "acceptance (noun)",
      ko: "수락",
      zh: "接受；应允",
    },
    tags: ["refuse"],
  },
];

const listenNew = [
  {
    id: "lm-635",
    text: "추가 요청은 거절해요",
    gloss: {
      en: "I refuse the extra request",
      ko: "거절하다",
      zh: "拒绝追加请求",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-636",
    text: "일정을 바로 수락해요",
    gloss: {
      en: "I accept the schedule right away",
      ko: "수락하다",
      zh: "马上接受日程",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-637",
    text: "부탁에 바로 응해요",
    gloss: {
      en: "I respond to the favor right away",
      ko: "응하다",
      zh: "马上答应拜托",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-638",
    text: "신청을 빨리 승인해요",
    gloss: {
      en: "They approve the application quickly",
      ko: "승인하다",
      zh: "很快批准申请",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-639",
    text: "현실을 받아들여요",
    gloss: {
      en: "I accept reality",
      ko: "받아들이다",
      zh: "接受现实",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-640",
    text: "도움은 사양해요",
    gloss: {
      en: "I politely decline the help",
      ko: "사양하다",
      zh: "婉拒帮助",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-641",
    text: "출장을 승낙해요",
    gloss: {
      en: "I consent to the business trip",
      ko: "승낙하다",
      zh: "答应出差",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-642",
    text: "강요를 거부해요",
    gloss: {
      en: "I reject coercion",
      ko: "거부하다",
      zh: "拒斥强迫",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-643",
    text: "거절이 분명해요",
    gloss: {
      en: "The refusal is clear",
      ko: "거절",
      zh: "拒绝很明确",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "lm-644",
    text: "수락이 늦어요",
    gloss: {
      en: "Acceptance is late",
      ko: "수락",
      zh: "接受晚了",
    },
    tags: ["refuse", "intermediate"],
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
const pack = packFile.packs.find((p) => p.id === "refuse-accept");
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
    .filter((it) => (it.tags || []).includes("refuse"))
    .map((it) => it.full)
);
for (const it of listenNew) {
  if (clozeFulls.has(it.text)) {
    console.error("listen overlaps cloze full", it.text);
    process.exit(1);
  }
}

// Distinct from favor/rules/apology/promise/advice (+ nearby)
const BAD_TAGS = [
  "favor",
  "rules",
  "apology",
  "promise",
  "advice",
  "opinion",
  "compare",
  "speech",
  "encourage",
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

if (!bingo.themes.includes("refuse")) bingo.themes.push("refuse");
if (!listen.themes.includes("refuse")) listen.themes.push("refuse");

bingo.version = 69;
listen.version = 69;
bingo.items.push(...bingoNew);
listen.items.push(...listenNew);

bingo.copyright = bingo.copyright.replace(
  "and promise-trust crossfill",
  "promise-trust, and refuse-accept crossfill"
);
listen.copyright = listen.copyright.replace(
  "and promise-trust crossfill",
  "promise-trust, and refuse-accept crossfill"
);
if (!bingo.copyright.includes("refuse-accept")) {
  console.error("bingo copyright missing refuse-accept");
  process.exit(1);
}
if (!listen.copyright.includes("refuse-accept")) {
  console.error("listen copyright missing refuse-accept");
  process.exit(1);
}

bingo.note =
  "+10 refuse-accept (bg-668–677, 2026-07-27): Prefer 거절하다·수락하다·응하다·승인하다 · 받아들이다·사양하다·승낙하다·거부하다·거절·수락. Skip 승낙·거부 → cloze Done. Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. NIKL/Sejong · no brand names. Suggest particle/dictation. Prior promise bg-658–667 · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

listen.note =
  "+10 refuse-accept (lm-635–644, 2026-07-27): Prefer 거절하다·수락하다·응하다·승인하다 (추가 요청은 거절해요 · 일정을 바로 수락해요 · 부탁에 바로 응해요 · 신청을 빨리 승인해요). 받아들이다·사양하다·승낙하다·거부하다·거절·수락. Skip 승낙·거부 → cloze Done. Distinct from favor/rules/apology/promise/advice · cloze/pack verbatim. NIKL/Sejong · 해요체 · no brand names. Suggest particle/dictation. Prior promise lm-625–634 · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · banking/housing/beginner kept.";

fs.writeFileSync(bingoPath, JSON.stringify(bingo, null, 2) + "\n");
fs.writeFileSync(listenPath, JSON.stringify(listen, null, 2) + "\n");

manifest.version = 247;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 677 · listen-match 644 · speed 630 · telephone 569 · scramble 571 · dictation 622 · cloze 622 · particle 616. +refuse-accept bingo/listen +10 (bg-668–677 · lm-635–644) · themes refuse · refuseTagged 10×4(speed+cloze+bingo+listen) · Prefer 거절하다·수락하다·응하다·승인하다 Done · Suggest particle/dictation · chip KO 거절 / ZH 拒绝 · Prior cloze c-613–622 · speed sq-621–630. hangul.js untouched.";

const bingoEntry = manifest.games.find((g) => g.id === "bingo-board");
const listenEntry = manifest.games.find((g) => g.id === "listen-match");
if (bingoEntry) {
  bingoEntry.version = 69;
  bingoEntry.itemCount = bingo.items.length;
  bingoEntry.count = bingo.items.length;
}
if (listenEntry) {
  listenEntry.version = 69;
  listenEntry.itemCount = listen.items.length;
  listenEntry.count = listen.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (pack) {
  pack.note =
    "Everyday refuse / accept / take in / decline politely / consent / reject / comply / approve / refuse-noun / accept-noun / consent-noun / rejection-noun survival — distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen Done · Prefer 거절하다·수락하다·응하다·승인하다 bingo/listen · Suggest particle/dictation · themes refuse · chip 거절/拒绝.";
  if (packFile.note && packFile.note.includes("refuse-accept")) {
    packFile.note = packFile.note.replace(
      /\+refuse-accept[^.]*\./,
      "+refuse-accept 12 Done speed+cloze+bingo/listen (2026-07-27). Prefer 거절하다·수락하다·응하다·승인하다 bingo/listen · Suggest particle/dictation · themes refuse · chip 거절/拒绝."
    );
  }
  fs.writeFileSync(packPath, JSON.stringify(packFile, null, 2) + "\n");
}

speed.note = speed.note.replace(
  /Suggest bingo\/listen · chip KO 거절 \/ ZH 拒绝\./,
  "Bingo/listen +10 Done · Prefer 거절하다·수락하다·응하다·승인하다 · Suggest particle/dictation."
);
if (speed.note.includes("Suggest bingo/listen") && !speed.note.includes("Bingo/listen +10 Done")) {
  speed.note = speed.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 거절하다·수락하다·응하다·승인하다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

cloze.note = cloze.note.replace(
  /Suggest bingo\/listen next \(Prefer 거절하다·수락하다·응하다·승인하다\)\./,
  "Bingo/listen +10 Done · Prefer 거절하다·수락하다·응하다·승인하다 · Suggest particle/dictation."
);
if (cloze.note.includes("Suggest bingo/listen") && !cloze.note.includes("Bingo/listen +10 Done")) {
  cloze.note = cloze.note.replace(
    /Suggest bingo\/listen[^.]*\./,
    "Bingo/listen +10 Done · Prefer 거절하다·수락하다·응하다·승인하다 · Suggest particle/dictation."
  );
}
fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const canonList = canon.themes || [];
const refuseCanonEntry = canonList.find((t) => t.themeKey === "refuse");
if (refuseCanonEntry) {
  refuseCanonEntry.notes =
    "ThemeSm57a speed(+cloze) · bingo/listen Done (2026-07-27). Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Prefer 거절하다·수락하다·응하다·승인하다 bingo/listen Done · Suggest particle/dictation.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

const refuseBingo = bingo.items.filter((it) =>
  (it.tags || []).includes("refuse")
).length;
const refuseListen = listen.items.filter((it) =>
  (it.tags || []).includes("refuse")
).length;
console.log(
  JSON.stringify(
    {
      bingoCount: bingo.items.length,
      listenCount: listen.items.length,
      refuseTaggedBingo: refuseBingo,
      refuseTaggedListen: refuseListen,
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
console.log("refuse bingo/listen patch OK");

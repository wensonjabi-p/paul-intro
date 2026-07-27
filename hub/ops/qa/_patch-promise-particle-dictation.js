/**
 * ThemeSm56d — promise-trust → particle/dictation +10 · tel/scramble +8
 * Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 on tel/scramble
 * Run: node hub/ops/qa/_patch-promise-particle-dictation.js
 */
const fs = require("fs");

function load(rel) {
  return JSON.parse(fs.readFileSync(rel, "utf8"));
}
function save(rel, data) {
  fs.writeFileSync(rel, JSON.stringify(data, null, 2) + "\n", "utf8");
}
function ensureTheme(data, theme) {
  if (!Array.isArray(data.themes)) data.themes = [];
  if (!data.themes.includes(theme)) data.themes.push(theme);
}

const particlePath = "hub/app/data/games/particle-beginner.json";
const particle = load(particlePath);
if (particle.items.some((i) => i.id === "ps-607")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-607",
    pair: "object",
    template: "진실{0} 말해요",
    answer: "을",
    full: "진실을 말해요",
    gloss: {
      en: "I tell the truth",
      ko: "목적격 · 받침 뒤 을 · 진실",
      zh: "说出真相",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-608",
    pair: "object",
    template: "거짓말{0} 하지 않아요",
    answer: "을",
    full: "거짓말을 하지 않아요",
    gloss: {
      en: "I do not tell lies",
      ko: "목적격 · 받침 뒤 을 · 거짓말",
      zh: "不说谎",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-609",
    pair: "subject",
    template: "진실{0} 중요해요",
    answer: "이",
    full: "진실이 중요해요",
    gloss: {
      en: "Truth is important",
      ko: "주격 · 받침 뒤 이 · 진실",
      zh: "真相很重要",
    },
    tags: ["subject", "promise", "intermediate"],
  },
  {
    id: "ps-610",
    pair: "subject",
    template: "거짓말{0} 싫어요",
    answer: "이",
    full: "거짓말이 싫어요",
    gloss: {
      en: "I dislike lies",
      ko: "주격 · 받침 뒤 이 · 거짓말",
      zh: "讨厌谎话",
    },
    tags: ["subject", "promise", "intermediate"],
  },
  {
    id: "ps-611",
    pair: "object",
    template: "모임{0} 약속해요",
    answer: "을",
    full: "모임을 약속해요",
    gloss: {
      en: "I promise a meeting",
      ko: "목적격 · 받침 뒤 을 · 약속하다",
      zh: "约定见面",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-612",
    pair: "object",
    template: "동료{0} 신뢰해요",
    answer: "를",
    full: "동료를 신뢰해요",
    gloss: {
      en: "I trust a colleague",
      ko: "목적격 · 모음 뒤 를 · 신뢰하다",
      zh: "信任同事",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-613",
    pair: "object",
    template: "선택{0} 확신해요",
    answer: "을",
    full: "선택을 확신해요",
    gloss: {
      en: "I am sure of the choice",
      ko: "목적격 · 받침 뒤 을 · 확신하다",
      zh: "确信选择",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-614",
    pair: "object",
    template: "소식{0} 의심해요",
    answer: "을",
    full: "소식을 의심해요",
    gloss: {
      en: "I doubt the news",
      ko: "목적격 · 받침 뒤 을 · 의심하다",
      zh: "怀疑消息",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-615",
    pair: "object",
    template: "정직한 사람{0} 만나요",
    answer: "을",
    full: "정직한 사람을 만나요",
    gloss: {
      en: "I meet an honest person",
      ko: "목적격 · 받침 뒤 을 · 정직하다",
      zh: "见到诚实的人",
    },
    tags: ["object", "promise", "intermediate"],
  },
  {
    id: "ps-616",
    pair: "object",
    template: "능력{0} 증명해요",
    answer: "을",
    full: "능력을 증명해요",
    gloss: {
      en: "I prove my ability",
      ko: "목적격 · 받침 뒤 을 · 증명하다",
      zh: "证明能力",
    },
    tags: ["object", "promise", "intermediate"],
  }
);
particle.version = 62;
ensureTheme(particle, "promise");
particle.updated = "2026-07-27";
particle.note =
  "+10 promise-trust particle (ps-607–616, 2026-07-27): Prefer 진실·거짓말 residual · 약속하다·신뢰하다·확신하다·의심하다·정직하다·증명하다. Skip 속이다·보장하다·신뢰(n)·의심(n) → tel Prefer-adjacent. Distinct from cloze hosts (진실을 듣고 싶어요·거짓말을 들었어요…) · listen hosts (주말에 만나자고 약속해요…). Distinct think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm56d close (전 8 promise chip). Prior encourage ps-597–606 kept.";
if (particle.copyright && !particle.copyright.includes("promise-trust")) {
  particle.copyright = particle.copyright.replace(
    "encourage-support crossfill",
    "encourage-support/promise-trust crossfill"
  );
  if (!particle.copyright.includes("promise-trust")) {
    particle.copyright = particle.copyright.replace(
      "advice-counsel/encourage-support crossfill",
      "advice-counsel/encourage-support/promise-trust crossfill"
    );
  }
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-613")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-613",
    text: "진실을 말해요",
    roman: "jinsireul malhaeyo",
    gloss: { en: "I tell the truth", ko: "진실", zh: "说出真相" },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-614",
    text: "거짓말을 하지 않아요",
    roman: "geojinmareul haji anayo",
    gloss: {
      en: "I do not tell lies",
      ko: "거짓말",
      zh: "不说谎",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-615",
    text: "진실이 중요해요",
    roman: "jinsiri jungyohaeyo",
    gloss: {
      en: "Truth is important",
      ko: "진실",
      zh: "真相很重要",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-616",
    text: "거짓말이 싫어요",
    roman: "geojinmari silheoyo",
    gloss: {
      en: "I dislike lies",
      ko: "거짓말",
      zh: "讨厌谎话",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-617",
    text: "모임을 약속해요",
    roman: "moimeul yaksokhaeyo",
    gloss: {
      en: "I promise a meeting",
      ko: "약속하다",
      zh: "约定见面",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-618",
    text: "동료를 신뢰해요",
    roman: "dongnyoreul sinroehaeyo",
    gloss: {
      en: "I trust a colleague",
      ko: "신뢰하다",
      zh: "信任同事",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-619",
    text: "선택을 확신해요",
    roman: "seontaekeul hwaksinahaeyo",
    gloss: {
      en: "I am sure of the choice",
      ko: "확신하다",
      zh: "确信选择",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-620",
    text: "소식을 의심해요",
    roman: "sosigeul uisimhaeyo",
    gloss: {
      en: "I doubt the news",
      ko: "의심하다",
      zh: "怀疑消息",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-621",
    text: "정직한 사람을 만나요",
    roman: "jeongjikan sarameul mannayo",
    gloss: {
      en: "I meet an honest person",
      ko: "정직하다",
      zh: "见到诚实的人",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "d-622",
    text: "능력을 증명해요",
    roman: "neungnyeogeul jeungmyeonghaeyo",
    gloss: {
      en: "I prove my ability",
      ko: "증명하다",
      zh: "证明能力",
    },
    tags: ["promise", "intermediate"],
  }
);
dictation.version = 64;
ensureTheme(dictation, "promise");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 promise-trust dictation (d-613–622, 2026-07-27): Prefer 진실·거짓말 residual · 약속하다·신뢰하다·확신하다·의심하다·정직하다·증명하다. Skip 속이다·보장하다·신뢰(n)·의심(n) → tel Prefer-adjacent. Distinct from cloze/listen hosts · think/rules/time/personality/favor/encourage. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm56d close (전 8 promise chip). Prior encourage d-603–612 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-562")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-562",
    text: "진실을 말해요",
    gloss: { en: "I tell the truth", ko: "진실", zh: "说出真相" },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-563",
    text: "거짓말을 하지 않아요",
    gloss: {
      en: "I do not tell lies",
      ko: "거짓말",
      zh: "不说谎",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-564",
    text: "모임을 약속해요",
    gloss: {
      en: "I promise a meeting",
      ko: "약속하다",
      zh: "约定见面",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-565",
    text: "신뢰를 쌓아요",
    gloss: {
      en: "I build trust",
      ko: "신뢰",
      zh: "建立信任",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-566",
    text: "태도가 정직해요",
    gloss: {
      en: "The attitude is honest",
      ko: "정직하다",
      zh: "态度诚实",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-567",
    text: "상대를 속이지 않아요",
    gloss: {
      en: "I do not deceive the other person",
      ko: "속이다",
      zh: "不欺骗对方",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-568",
    text: "품질을 보장해요",
    gloss: {
      en: "I guarantee the quality",
      ko: "보장하다",
      zh: "保障品质",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "tel-569",
    text: "의심이 풀려요",
    gloss: {
      en: "My doubt clears",
      ko: "의심",
      zh: "疑虑解开",
    },
    tags: ["promise", "intermediate"],
  }
);
tel.version = 61;
ensureTheme(tel, "promise");
tel.updated = "2026-07-27";
tel.note =
  "+8 promise-trust telephone (tel-562–569, 2026-07-27): Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 · 속이다·보장하다·의심. Skip 확신하다·증명하다·동료를 신뢰해요 (particle/dictation). Distinct from cloze/listen hosts (진실을 듣고 싶어요·팀 안의 신뢰가 커요·답변은 늘 정직해요…). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm56d close. Prior encourage tel-554–561 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-564")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-564",
    tokens: ["진실을", "말해요"],
    full: "진실을 말해요",
    gloss: { en: "I tell the truth", ko: "진실", zh: "说出真相" },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-565",
    tokens: ["거짓말을", "하지", "않아요"],
    full: "거짓말을 하지 않아요",
    gloss: {
      en: "I do not tell lies",
      ko: "거짓말",
      zh: "不说谎",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-566",
    tokens: ["모임을", "약속해요"],
    full: "모임을 약속해요",
    gloss: {
      en: "I promise a meeting",
      ko: "약속하다",
      zh: "约定见面",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-567",
    tokens: ["신뢰를", "쌓아요"],
    full: "신뢰를 쌓아요",
    gloss: {
      en: "I build trust",
      ko: "신뢰",
      zh: "建立信任",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-568",
    tokens: ["태도가", "정직해요"],
    full: "태도가 정직해요",
    gloss: {
      en: "The attitude is honest",
      ko: "정직하다",
      zh: "态度诚实",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-569",
    tokens: ["상대를", "속이지", "않아요"],
    full: "상대를 속이지 않아요",
    gloss: {
      en: "I do not deceive the other person",
      ko: "속이다",
      zh: "不欺骗对方",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-570",
    tokens: ["품질을", "보장해요"],
    full: "품질을 보장해요",
    gloss: {
      en: "I guarantee the quality",
      ko: "보장하다",
      zh: "保障品质",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "ws-571",
    tokens: ["의심이", "풀려요"],
    full: "의심이 풀려요",
    gloss: {
      en: "My doubt clears",
      ko: "의심",
      zh: "疑虑解开",
    },
    tags: ["promise", "intermediate"],
  }
);
ws.version = 61;
ensureTheme(ws, "promise");
ws.updated = "2026-07-27";
ws.note =
  "+8 promise-trust scramble (ws-564–571, 2026-07-27): Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 · 속이다·보장하다·의심. Skip 확신하다·증명하다·동료를 신뢰해요 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm56d close. Prior encourage ws-556–563 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 244;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 667 · listen-match 634 · speed 620 · telephone 569 · scramble 571 · dictation 622 · cloze 612 · particle 616. +promise-trust particle/dictation +10 · tel/scramble +8 (ps-607–616 · d-613–622 · tel-562–569 · ws-564–571) · themes promise · promiseTagged 10×6 + 8×2 · Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 on tel/scramble · chip KO 약속 / ZH 约定 · ThemeSm56d close. Prior bingo/listen bg-658–667 · lm-625–634 kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 62, 616);
bumpGame("dictation", 64, 622);
bumpGame("telephone", 61, 569);
bumpGame("word-scramble", 61, 571);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+promise-trust 12 (약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말) 2026-07-27. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 on tel/scramble · Suggest ThemeSm56d close · themes promise · chip 약속/约定. Existing packs kept (incl. encourage-support sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "promise-trust");
if (pack) {
  pack.note =
    "Everyday promise / trust / be sure / doubt / deceive / honest / guarantee / prove / trust-noun / doubt-noun / truth / lie survival — distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 진실·거짓말 residual · Prefer-adjacent 약속하다·신뢰·정직하다 on tel/scramble · Suggest ThemeSm56d close · themes promise · chip 약속/约定 · ThemeSm56.";
}
save(vocabPath, vocab);

for (const [rel, needle, repl] of [
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest particle/dictation(+tel/scramble).",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm56d close.",
  ],
  [
    "hub/app/data/games/speed-quiz-beginner.json",
    "Suggest particle/dictation(+tel/scramble)",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm56d close",
  ],
  [
    "hub/app/data/games/bingo-beginner.json",
    "Suggest particle/dictation(+tel/scramble)",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm56d close",
  ],
  [
    "hub/app/data/games/listen-match-beginner.json",
    "Suggest particle/dictation(+tel/scramble).",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm56d close.",
  ],
]) {
  const d = load(rel);
  if (d.note && d.note.includes(needle)) {
    d.note = d.note.replace(needle, repl);
    save(rel, d);
  }
}

for (const [label, file] of [
  ["particle", particlePath],
  ["dictation", dictationPath],
  ["tel", telPath],
  ["scramble", wsPath],
]) {
  const d = load(file);
  const n = (d.items || []).filter((i) =>
    (i.tags || []).includes("promise")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "promiseTagged=" + n,
    "themes.promise=" + d.themes.includes("promise")
  );
}
console.log("manifest", man.version);

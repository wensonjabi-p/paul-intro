/**
 * complain-dissatisfaction → particle/dictation +10 · tel/scramble +8
 * Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 on tel/scramble
 * No ThemeSm chips · Suggest ThemeSm close only
 * Run: node hub/ops/qa/_patch-complain-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-627")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-627",
    pair: "subject",
    template: "이의{0} 커요",
    answer: "가",
    full: "이의가 커요",
    gloss: {
      en: "The objection is big",
      ko: "주격 · 모음 뒤 가 · 이의",
      zh: "异议很大",
    },
    tags: ["subject", "complain", "intermediate"],
  },
  {
    id: "ps-628",
    pair: "subject",
    template: "하소연{0} 길어요",
    answer: "이",
    full: "하소연이 길어요",
    gloss: {
      en: "The venting is long",
      ko: "주격 · 받침 뒤 이 · 하소연",
      zh: "诉苦很长",
    },
    tags: ["subject", "complain", "intermediate"],
  },
  {
    id: "ps-629",
    pair: "object",
    template: "가격{0} 불평해요",
    answer: "을",
    full: "가격을 불평해요",
    gloss: {
      en: "I complain about the price",
      ko: "목적격 · 받침 뒤 을 · 불평하다",
      zh: "抱怨价格",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-630",
    pair: "object",
    template: "항의{0} 전해요",
    answer: "를",
    full: "항의를 전해요",
    gloss: {
      en: "I convey the protest",
      ko: "목적격 · 모음 뒤 를 · 항의",
      zh: "转达抗议",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-631",
    pair: "object",
    template: "사고{0} 신고해요",
    answer: "를",
    full: "사고를 신고해요",
    gloss: {
      en: "I report the accident",
      ko: "목적격 · 모음 뒤 를 · 신고하다",
      zh: "申报事故",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-632",
    pair: "object",
    template: "시간{0} 따져요",
    answer: "을",
    full: "시간을 따져요",
    gloss: {
      en: "I quibble over the time",
      ko: "목적격 · 받침 뒤 을 · 따지다",
      zh: "计较时间",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-633",
    pair: "object",
    template: "안건{0} 제기해요",
    answer: "을",
    full: "안건을 제기해요",
    gloss: {
      en: "I raise the agenda item",
      ko: "목적격 · 받침 뒤 을 · 제기하다",
      zh: "提出议题",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-634",
    pair: "object",
    template: "고민{0} 하소연해요",
    answer: "을",
    full: "고민을 하소연해요",
    gloss: {
      en: "I vent my worries",
      ko: "목적격 · 받침 뒤 을 · 하소연하다",
      zh: "诉说烦恼",
    },
    tags: ["object", "complain", "intermediate"],
  },
  {
    id: "ps-635",
    pair: "subject",
    template: "품질{0} 불만스러워요",
    answer: "이",
    full: "품질이 불만스러워요",
    gloss: {
      en: "The quality is unsatisfactory",
      ko: "주격 · 받침 뒤 이 · 불만스럽다",
      zh: "质量让人不满意",
    },
    tags: ["subject", "complain", "intermediate"],
  },
  {
    id: "ps-636",
    pair: "subject",
    template: "불만{0} 커요",
    answer: "이",
    full: "불만이 커요",
    gloss: {
      en: "The dissatisfaction is big",
      ko: "주격 · 받침 뒤 이 · 불만",
      zh: "不满很大",
    },
    tags: ["subject", "complain", "intermediate"],
  }
);
particle.version = 64;
ensureTheme(particle, "complain");
particle.updated = "2026-07-27";
particle.note =
  "+10 complain-dissatisfaction particle (ps-627–636, 2026-07-27): Prefer 이의·하소연 residual · 불평하다·항의·신고하다·따지다·제기하다·하소연하다·불만스럽다·불만. Skip 불평(n)·항의하다 → tel Prefer-adjacent. Distinct from cloze hosts (결정에 이의가 있어요·긴 하소연을 들어요·음식에 불평하지 마세요…) · listen hosts (손님 항의가 쌓여요·고장을 바로 신고해요·불만을 짧게 적어요…). Distinct problem 문제 · opinion 비판하다 · apology · refuse 거절하다 · emotion 걱정. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 complain chip). Prior refuse ps-617–626 kept.";
if (particle.copyright && !particle.copyright.includes("complain-dissatisfaction")) {
  particle.copyright = particle.copyright.replace(
    "refuse-accept crossfill",
    "refuse-accept/complain-dissatisfaction crossfill"
  );
  if (!particle.copyright.includes("complain-dissatisfaction")) {
    particle.copyright = particle.copyright.replace(
      "promise-trust/refuse-accept crossfill",
      "promise-trust/refuse-accept/complain-dissatisfaction crossfill"
    );
  }
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-633")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-633",
    text: "이의가 커요",
    roman: "iuiga keoyo",
    gloss: { en: "The objection is big", ko: "이의", zh: "异议很大" },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-634",
    text: "하소연이 길어요",
    roman: "hasoyeoni gireoyo",
    gloss: {
      en: "The venting is long",
      ko: "하소연",
      zh: "诉苦很长",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-635",
    text: "가격을 불평해요",
    roman: "gagyeogeul bulpyeonghaeyo",
    gloss: {
      en: "I complain about the price",
      ko: "불평하다",
      zh: "抱怨价格",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-636",
    text: "항의를 전해요",
    roman: "hanguireul jeonhaeyo",
    gloss: {
      en: "I convey the protest",
      ko: "항의",
      zh: "转达抗议",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-637",
    text: "사고를 신고해요",
    roman: "sagoreul singohaeyo",
    gloss: {
      en: "I report the accident",
      ko: "신고하다",
      zh: "申报事故",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-638",
    text: "시간을 따져요",
    roman: "siganeul ttajyeoyo",
    gloss: {
      en: "I quibble over the time",
      ko: "따지다",
      zh: "计较时间",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-639",
    text: "안건을 제기해요",
    roman: "angeoneul jegihaeyo",
    gloss: {
      en: "I raise the agenda item",
      ko: "제기하다",
      zh: "提出议题",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-640",
    text: "고민을 하소연해요",
    roman: "gomineul hasoyeonhaeyo",
    gloss: {
      en: "I vent my worries",
      ko: "하소연하다",
      zh: "诉说烦恼",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-641",
    text: "품질이 불만스러워요",
    roman: "pumjiri bulmanseureowoyo",
    gloss: {
      en: "The quality is unsatisfactory",
      ko: "불만스럽다",
      zh: "质量让人不满意",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "d-642",
    text: "불만이 커요",
    roman: "bulmani keoyo",
    gloss: {
      en: "The dissatisfaction is big",
      ko: "불만",
      zh: "不满很大",
    },
    tags: ["complain", "intermediate"],
  }
);
dictation.version = 66;
ensureTheme(dictation, "complain");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 complain-dissatisfaction dictation (d-633–642, 2026-07-27): Prefer 이의·하소연 residual · 불평하다·항의·신고하다·따지다·제기하다·하소연하다·불만스럽다·불만. Skip 불평(n)·항의하다 → tel Prefer-adjacent. Distinct from cloze/listen hosts · problem/opinion/apology/refuse/emotion. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 complain chip). Prior refuse d-623–632 kept.";
if (dictation.copyright && !dictation.copyright.includes("complain-dissatisfaction")) {
  dictation.copyright = dictation.copyright.replace(
    "refuse-accept crossfill",
    "refuse-accept/complain-dissatisfaction crossfill"
  );
  if (!dictation.copyright.includes("complain-dissatisfaction")) {
    // dictation copyright may not list refuse yet — append lightly via rules-permission note path
    if (dictation.copyright.includes("rules-permission crossfill")) {
      dictation.copyright = dictation.copyright.replace(
        "rules-permission crossfill",
        "rules-permission/complain-dissatisfaction crossfill"
      );
    }
  }
}
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-578")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-578",
    text: "이의가 커요",
    gloss: { en: "The objection is big", ko: "이의", zh: "异议很大" },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-579",
    text: "하소연이 길어요",
    gloss: {
      en: "The venting is long",
      ko: "하소연",
      zh: "诉苦很长",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-580",
    text: "항의를 전해요",
    gloss: {
      en: "I convey the protest",
      ko: "항의",
      zh: "转达抗议",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-581",
    text: "사고를 신고해요",
    gloss: {
      en: "I report the accident",
      ko: "신고하다",
      zh: "申报事故",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-582",
    text: "불만이 커요",
    gloss: {
      en: "The dissatisfaction is big",
      ko: "불만",
      zh: "不满很大",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-583",
    text: "시간을 따져요",
    gloss: {
      en: "I quibble over the time",
      ko: "따지다",
      zh: "计较时间",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-584",
    text: "불평이 줄어요",
    gloss: {
      en: "Complaints decrease",
      ko: "불평",
      zh: "抱怨减少",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "tel-585",
    text: "결정에 항의해요",
    gloss: {
      en: "I protest the decision",
      ko: "항의하다",
      zh: "抗议决定",
    },
    tags: ["complain", "intermediate"],
  }
);
tel.version = 63;
ensureTheme(tel, "complain");
tel.updated = "2026-07-27";
tel.note =
  "+8 complain-dissatisfaction telephone (tel-578–585, 2026-07-27): Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 · 불평·항의하다. Skip 불평하다·제기하다·하소연하다·불만스럽다 (particle/dictation). Distinct from cloze/listen hosts (결정에 이의가 있어요·손님 항의가 쌓여요·고장을 바로 신고해요·불평을 줄이려고 해요·지연에 바로 항의해요…). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior refuse tel-570–577 kept.";
if (tel.copyright && !tel.copyright.includes("complain-dissatisfaction")) {
  tel.copyright = tel.copyright.replace(
    "refuse-accept crossfill",
    "refuse-accept/complain-dissatisfaction crossfill"
  );
  if (!tel.copyright.includes("complain-dissatisfaction") && tel.copyright.includes("promise-trust crossfill")) {
    tel.copyright = tel.copyright.replace(
      "promise-trust crossfill",
      "promise-trust/complain-dissatisfaction crossfill"
    );
  }
}
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-580")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-580",
    tokens: ["이의가", "커요"],
    full: "이의가 커요",
    gloss: { en: "The objection is big", ko: "이의", zh: "异议很大" },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-581",
    tokens: ["하소연이", "길어요"],
    full: "하소연이 길어요",
    gloss: {
      en: "The venting is long",
      ko: "하소연",
      zh: "诉苦很长",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-582",
    tokens: ["항의를", "전해요"],
    full: "항의를 전해요",
    gloss: {
      en: "I convey the protest",
      ko: "항의",
      zh: "转达抗议",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-583",
    tokens: ["사고를", "신고해요"],
    full: "사고를 신고해요",
    gloss: {
      en: "I report the accident",
      ko: "신고하다",
      zh: "申报事故",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-584",
    tokens: ["불만이", "커요"],
    full: "불만이 커요",
    gloss: {
      en: "The dissatisfaction is big",
      ko: "불만",
      zh: "不满很大",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-585",
    tokens: ["시간을", "따져요"],
    full: "시간을 따져요",
    gloss: {
      en: "I quibble over the time",
      ko: "따지다",
      zh: "计较时间",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-586",
    tokens: ["불평이", "줄어요"],
    full: "불평이 줄어요",
    gloss: {
      en: "Complaints decrease",
      ko: "불평",
      zh: "抱怨减少",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "ws-587",
    tokens: ["결정에", "항의해요"],
    full: "결정에 항의해요",
    gloss: {
      en: "I protest the decision",
      ko: "항의하다",
      zh: "抗议决定",
    },
    tags: ["complain", "intermediate"],
  }
);
ws.version = 63;
ensureTheme(ws, "complain");
ws.updated = "2026-07-27";
ws.note =
  "+8 complain-dissatisfaction scramble (ws-580–587, 2026-07-27): Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 · 불평·항의하다. Skip 불평하다·제기하다·하소연하다·불만스럽다 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior refuse ws-572–579 kept.";
if (ws.copyright && !ws.copyright.includes("complain-dissatisfaction")) {
  ws.copyright = ws.copyright.replace(
    "refuse-accept crossfill",
    "refuse-accept/complain-dissatisfaction crossfill"
  );
  if (!ws.copyright.includes("complain-dissatisfaction") && ws.copyright.includes("promise-trust crossfill")) {
    ws.copyright = ws.copyright.replace(
      "promise-trust crossfill",
      "promise-trust/complain-dissatisfaction crossfill"
    );
  }
}
save(wsPath, ws);

// Dedup vs cloze/listen/pack
const cloze = load("hub/app/data/games/cloze-beginner.json");
const listen = load("hub/app/data/games/listen-match-beginner.json");
const packFile = load("hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const used = new Set();
for (const it of cloze.items || []) {
  if ((it.tags || []).includes("complain") && it.full) used.add(it.full);
}
for (const it of listen.items || []) {
  if ((it.tags || []).includes("complain") && it.text) used.add(it.text);
}
const pack = (packFile.packs || []).find((p) => p.id === "complain-dissatisfaction");
if (pack) {
  for (const it of pack.items || []) {
    if (it.example && it.example.ko)
      used.add(it.example.ko.replace(/[.。]$/, ""));
  }
}
for (const it of [...particle.items.slice(-10), ...dictation.items.slice(-10)]) {
  const t = it.full || it.text;
  if (used.has(t)) {
    console.error("overlap with cloze/listen/pack:", t);
    process.exit(1);
  }
}
for (const it of [...tel.items.slice(-8), ...ws.items.slice(-8)]) {
  const t = it.text || it.full;
  if (used.has(t)) {
    console.error("tel/ws overlap with cloze/listen/pack:", t);
    process.exit(1);
  }
}

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 252;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 687 · listen-match 654 · speed 640 · telephone 585 · scramble 587 · dictation 642 · cloze 632 · particle 636. +complain-dissatisfaction particle/dictation +10 · tel/scramble +8 (ps-627–636 · d-633–642 · tel-578–585 · ws-580–587) · themes complain · complainTagged 10×6 + 8×2 · Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 on tel/scramble · chip 제안 KO 불만 / ZH 不满 · Suggest ThemeSm close only · ThemeSm/칩 미터치. Prior bingo/listen bg-678–687 · lm-645–654 kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 64, 636);
bumpGame("dictation", 66, 642);
bumpGame("telephone", 63, 585);
bumpGame("word-scramble", 63, 587);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+complain-dissatisfaction 12 Done speed+cloze+bingo/listen+particle/dictation(+tel/scramble) (2026-07-27). Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 on tel/scramble · Suggest ThemeSm close only · themes complain · chip 제안 불만/不满 · ThemeSm 미터치. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Existing packs kept (incl. refuse-accept ThemeSm57 closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
if (pack) {
  pack.note =
    "Everyday complain / protest / quibble / raise an issue / vent / be unsatisfactory / dissatisfaction / complaint / protest-noun / report / objection / venting-noun survival — distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology 불편하다 · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 이의·하소연 residual · Prefer-adjacent 항의·신고하다·불만·따지다 on tel/scramble · Suggest ThemeSm close only · themes complain · chip 제안 불만/不满 · ThemeSm 미터치.";
}
save(vocabPath, vocab);

for (const [rel, needle, repl] of [
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest bingo/listen",
    "Bingo/listen Done · Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
  ],
  [
    "hub/app/data/games/speed-quiz-beginner.json",
    "Suggest particle/dictation · ThemeSm/칩 미터치",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only · ThemeSm/칩 미터치",
  ],
  [
    "hub/app/data/games/bingo-beginner.json",
    "Suggest particle/dictation",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
  ],
  [
    "hub/app/data/games/listen-match-beginner.json",
    "Suggest particle/dictation.",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only.",
  ],
]) {
  const d = load(rel);
  if (d.note && d.note.includes(needle) && !d.note.includes("ThemeSm close only")) {
    d.note = d.note.replace(needle, repl);
    save(rel, d);
  } else if (d.note && !d.note.includes("ThemeSm close only")) {
    const alt = [
      [
        "Suggest particle/dictation.",
        "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only.",
      ],
      [
        "Suggest particle/dictation",
        "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
      ],
    ];
    for (const [n, r] of alt) {
      if (d.note.includes(n)) {
        d.note = d.note.replace(n, r);
        save(rel, d);
        break;
      }
    }
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
    (i.tags || []).includes("complain")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "complainTagged=" + n,
    "themes.complain=" + d.themes.includes("complain")
  );
}
console.log("manifest", man.version);

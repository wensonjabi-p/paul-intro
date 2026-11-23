/**
 * refuse-accept → particle/dictation +10 · tel/scramble +8
 * Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 on tel/scramble
 * No ThemeSm chips · Suggest ThemeSm close only
 * Run: node hub/ops/qa/_patch-refuse-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-617")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-617",
    pair: "subject",
    template: "승낙{0} 필요해요",
    answer: "이",
    full: "승낙이 필요해요",
    gloss: {
      en: "Consent is needed",
      ko: "주격 · 받침 뒤 이 · 승낙",
      zh: "需要允诺",
    },
    tags: ["subject", "refuse", "intermediate"],
  },
  {
    id: "ps-618",
    pair: "subject",
    template: "거부{0} 분명해요",
    answer: "가",
    full: "거부가 분명해요",
    gloss: {
      en: "The rejection is clear",
      ko: "주격 · 모음 뒤 가 · 거부",
      zh: "拒斥很明确",
    },
    tags: ["subject", "refuse", "intermediate"],
  },
  {
    id: "ps-619",
    pair: "object",
    template: "회의{0} 거절해요",
    answer: "를",
    full: "회의를 거절해요",
    gloss: {
      en: "I decline the meeting",
      ko: "목적격 · 모음 뒤 를 · 거절하다",
      zh: "拒绝会议",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-620",
    pair: "object",
    template: "제의{0} 수락해요",
    answer: "를",
    full: "제의를 수락해요",
    gloss: {
      en: "I accept the offer",
      ko: "목적격 · 모음 뒤 를 · 수락하다",
      zh: "接受提议",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-621",
    pair: "object",
    template: "결과{0} 받아들여요",
    answer: "를",
    full: "결과를 받아들여요",
    gloss: {
      en: "I accept the result",
      ko: "목적격 · 모음 뒤 를 · 받아들이다",
      zh: "接受结果",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-622",
    pair: "object",
    template: "칭찬{0} 사양해요",
    answer: "을",
    full: "칭찬을 사양해요",
    gloss: {
      en: "I politely decline the praise",
      ko: "목적격 · 받침 뒤 을 · 사양하다",
      zh: "婉拒称赞",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-623",
    pair: "object",
    template: "역할{0} 승낙해요",
    answer: "을",
    full: "역할을 승낙해요",
    gloss: {
      en: "I consent to the role",
      ko: "목적격 · 받침 뒤 을 · 승낙하다",
      zh: "答应角色",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-624",
    pair: "object",
    template: "요구{0} 거부해요",
    answer: "를",
    full: "요구를 거부해요",
    gloss: {
      en: "I reject the demand",
      ko: "목적격 · 모음 뒤 를 · 거부하다",
      zh: "拒斥要求",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-625",
    pair: "object",
    template: "승낙{0} 확인해요",
    answer: "을",
    full: "승낙을 확인해요",
    gloss: {
      en: "I confirm the consent",
      ko: "목적격 · 받침 뒤 을 · 승낙",
      zh: "确认允诺",
    },
    tags: ["object", "refuse", "intermediate"],
  },
  {
    id: "ps-626",
    pair: "object",
    template: "계획{0} 승인해요",
    answer: "을",
    full: "계획을 승인해요",
    gloss: {
      en: "I approve the plan",
      ko: "목적격 · 받침 뒤 을 · 승인하다",
      zh: "批准计划",
    },
    tags: ["object", "refuse", "intermediate"],
  }
);
particle.version = 63;
ensureTheme(particle, "refuse");
particle.updated = "2026-07-27";
particle.note =
  "+10 refuse-accept particle (ps-617–626, 2026-07-27): Prefer 승낙·거부 residual · 거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·승인하다. Skip 응하다·거절(n)·수락(n) → tel Prefer-adjacent. Distinct from cloze hosts (승낙을 구해요·거부가 이어져요·요청을 승낙해요…) · listen hosts (출장을 승낙해요·강요를 거부해요·추가 요청은 거절해요…). Distinct favor 부탁하다 · rules 허락하다 · apology · promise · advice 제안하다 · opinion 동의하다 · speech 대답하다. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 refuse chip). Prior promise ps-607–616 kept.";
if (particle.copyright && !particle.copyright.includes("refuse-accept")) {
  particle.copyright = particle.copyright.replace(
    "promise-trust crossfill",
    "promise-trust/refuse-accept crossfill"
  );
  if (!particle.copyright.includes("refuse-accept")) {
    particle.copyright = particle.copyright.replace(
      "encourage-support/promise-trust crossfill",
      "encourage-support/promise-trust/refuse-accept crossfill"
    );
  }
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-623")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-623",
    text: "승낙이 필요해요",
    roman: "seungnagi piryohaeyo",
    gloss: { en: "Consent is needed", ko: "승낙", zh: "需要允诺" },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-624",
    text: "거부가 분명해요",
    roman: "geobuga bunmyeonghaeyo",
    gloss: {
      en: "The rejection is clear",
      ko: "거부",
      zh: "拒斥很明确",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-625",
    text: "회의를 거절해요",
    roman: "hoeireul geojeolhaeyo",
    gloss: {
      en: "I decline the meeting",
      ko: "거절하다",
      zh: "拒绝会议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-626",
    text: "제의를 수락해요",
    roman: "jeeireul surakhaeyo",
    gloss: {
      en: "I accept the offer",
      ko: "수락하다",
      zh: "接受提议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-627",
    text: "결과를 받아들여요",
    roman: "gyeolgwareul badadeuryeoyo",
    gloss: {
      en: "I accept the result",
      ko: "받아들이다",
      zh: "接受结果",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-628",
    text: "칭찬을 사양해요",
    roman: "chingchaneul sayanghaeyo",
    gloss: {
      en: "I politely decline the praise",
      ko: "사양하다",
      zh: "婉拒称赞",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-629",
    text: "역할을 승낙해요",
    roman: "yeokhareul seungnakhaeyo",
    gloss: {
      en: "I consent to the role",
      ko: "승낙하다",
      zh: "答应角色",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-630",
    text: "요구를 거부해요",
    roman: "yogureul geobuhaeyo",
    gloss: {
      en: "I reject the demand",
      ko: "거부하다",
      zh: "拒斥要求",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-631",
    text: "승낙을 확인해요",
    roman: "seungnageul hwaginhaeyo",
    gloss: {
      en: "I confirm the consent",
      ko: "승낙",
      zh: "确认允诺",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "d-632",
    text: "계획을 승인해요",
    roman: "gyehoegeul seunginahaeyo",
    gloss: {
      en: "I approve the plan",
      ko: "승인하다",
      zh: "批准计划",
    },
    tags: ["refuse", "intermediate"],
  }
);
dictation.version = 65;
ensureTheme(dictation, "refuse");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 refuse-accept dictation (d-623–632, 2026-07-27): Prefer 승낙·거부 residual · 거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·승인하다. Skip 응하다·거절(n)·수락(n) → tel Prefer-adjacent. Distinct from cloze/listen hosts · favor/rules/apology/promise/advice. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 refuse chip). Prior promise d-613–622 kept.";
if (dictation.copyright && !dictation.copyright.includes("refuse-accept")) {
  dictation.copyright = dictation.copyright.replace(
    "promise-trust crossfill",
    "promise-trust/refuse-accept crossfill"
  );
}
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-570")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-570",
    text: "승낙이 필요해요",
    gloss: { en: "Consent is needed", ko: "승낙", zh: "需要允诺" },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-571",
    text: "거부가 분명해요",
    gloss: {
      en: "The rejection is clear",
      ko: "거부",
      zh: "拒斥很明确",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-572",
    text: "회의를 거절해요",
    gloss: {
      en: "I decline the meeting",
      ko: "거절하다",
      zh: "拒绝会议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-573",
    text: "제의를 수락해요",
    gloss: {
      en: "I accept the offer",
      ko: "수락하다",
      zh: "接受提议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-574",
    text: "요청에 응해요",
    gloss: {
      en: "I respond to the request",
      ko: "응하다",
      zh: "响应请求",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-575",
    text: "계획을 승인해요",
    gloss: {
      en: "I approve the plan",
      ko: "승인하다",
      zh: "批准计划",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-576",
    text: "거절을 확인해요",
    gloss: {
      en: "I confirm the refusal",
      ko: "거절",
      zh: "确认拒绝",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "tel-577",
    text: "수락이 빨라요",
    gloss: {
      en: "Acceptance is quick",
      ko: "수락",
      zh: "接受很快",
    },
    tags: ["refuse", "intermediate"],
  }
);
tel.version = 62;
ensureTheme(tel, "refuse");
tel.updated = "2026-07-27";
tel.note =
  "+8 refuse-accept telephone (tel-570–577, 2026-07-27): Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 · 거절·수락. Skip 받아들이다·사양하다·승낙하다·거부하다·승낙을 확인해요 (particle/dictation). Distinct from cloze/listen hosts (승낙을 구해요·추가 요청은 거절해요·부탁에 바로 응해요·수락이 늦어요…). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior promise tel-562–569 kept.";
if (tel.copyright && !tel.copyright.includes("refuse-accept")) {
  tel.copyright = tel.copyright.replace(
    "promise-trust crossfill",
    "promise-trust/refuse-accept crossfill"
  );
}
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-572")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-572",
    tokens: ["승낙이", "필요해요"],
    full: "승낙이 필요해요",
    gloss: { en: "Consent is needed", ko: "승낙", zh: "需要允诺" },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-573",
    tokens: ["거부가", "분명해요"],
    full: "거부가 분명해요",
    gloss: {
      en: "The rejection is clear",
      ko: "거부",
      zh: "拒斥很明确",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-574",
    tokens: ["회의를", "거절해요"],
    full: "회의를 거절해요",
    gloss: {
      en: "I decline the meeting",
      ko: "거절하다",
      zh: "拒绝会议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-575",
    tokens: ["제의를", "수락해요"],
    full: "제의를 수락해요",
    gloss: {
      en: "I accept the offer",
      ko: "수락하다",
      zh: "接受提议",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-576",
    tokens: ["요청에", "응해요"],
    full: "요청에 응해요",
    gloss: {
      en: "I respond to the request",
      ko: "응하다",
      zh: "响应请求",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-577",
    tokens: ["계획을", "승인해요"],
    full: "계획을 승인해요",
    gloss: {
      en: "I approve the plan",
      ko: "승인하다",
      zh: "批准计划",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-578",
    tokens: ["거절을", "확인해요"],
    full: "거절을 확인해요",
    gloss: {
      en: "I confirm the refusal",
      ko: "거절",
      zh: "确认拒绝",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "ws-579",
    tokens: ["수락이", "빨라요"],
    full: "수락이 빨라요",
    gloss: {
      en: "Acceptance is quick",
      ko: "수락",
      zh: "接受很快",
    },
    tags: ["refuse", "intermediate"],
  }
);
ws.version = 62;
ensureTheme(ws, "refuse");
ws.updated = "2026-07-27";
ws.note =
  "+8 refuse-accept scramble (ws-572–579, 2026-07-27): Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 · 거절·수락. Skip 받아들이다·사양하다·승낙하다·거부하다·승낙을 확인해요 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior promise ws-564–571 kept.";
if (ws.copyright && !ws.copyright.includes("refuse-accept")) {
  ws.copyright = ws.copyright.replace(
    "promise-trust crossfill",
    "promise-trust/refuse-accept crossfill"
  );
}
save(wsPath, ws);

// Dedup vs cloze/listen/pack
const cloze = load("hub/app/data/games/cloze-beginner.json");
const listen = load("hub/app/data/games/listen-match-beginner.json");
const packFile = load("hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const used = new Set();
for (const it of cloze.items || []) {
  if ((it.tags || []).includes("refuse") && it.full) used.add(it.full);
}
for (const it of listen.items || []) {
  if ((it.tags || []).includes("refuse") && it.text) used.add(it.text);
}
const pack = (packFile.packs || []).find((p) => p.id === "refuse-accept");
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
man.version = 248;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 677 · listen-match 644 · speed 630 · telephone 577 · scramble 579 · dictation 632 · cloze 622 · particle 626. +refuse-accept particle/dictation +10 · tel/scramble +8 (ps-617–626 · d-623–632 · tel-570–577 · ws-572–579) · themes refuse · refuseTagged 10×6 + 8×2 · Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 on tel/scramble · chip KO 거절 / ZH 拒绝 · Suggest ThemeSm close only. Prior bingo/listen bg-668–677 · lm-635–644 kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 63, 626);
bumpGame("dictation", 65, 632);
bumpGame("telephone", 62, 577);
bumpGame("word-scramble", 62, 579);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+refuse-accept 12 Done speed+cloze+bingo/listen+particle/dictation(+tel/scramble) (2026-07-27). Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 on tel/scramble · Suggest ThemeSm close only · themes refuse · chip 거절/拒绝. Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Existing packs kept (incl. promise-trust sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
if (pack) {
  pack.note =
    "Everyday refuse / accept / take in / decline politely / consent / reject / comply / approve / refuse-noun / accept-noun / consent-noun / rejection-noun survival — distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 승낙·거부 residual · Prefer-adjacent 거절하다·수락하다·응하다·승인하다 on tel/scramble · Suggest ThemeSm close only · themes refuse · chip 거절/拒绝 · ThemeSm57a.";
}
save(vocabPath, vocab);

for (const [rel, needle, repl] of [
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest bingo/listen next (Prefer 거절하다·수락하다·응하다·승인하다).",
    "Bingo/listen Done · Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only.",
  ],
  [
    "hub/app/data/games/speed-quiz-beginner.json",
    "Suggest particle/dictation",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
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
  if (d.note && d.note.includes(needle)) {
    d.note = d.note.replace(needle, repl);
    save(rel, d);
  } else if (d.note) {
    // bingo/speed may already say Suggest particle/dictation without period variants
    const alt = [
      ["Suggest particle/dictation.", "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only."],
      ["Suggest particle/dictation", "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only"],
    ];
    for (const [n, r] of alt) {
      if (d.note.includes(n) && !d.note.includes("ThemeSm close")) {
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
    (i.tags || []).includes("refuse")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "refuseTagged=" + n,
    "themes.refuse=" + d.themes.includes("refuse")
  );
}
console.log("manifest", man.version);

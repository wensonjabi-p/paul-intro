/**
 * warn-caution → particle/dictation +10 · tel/scramble +8
 * Prefer 긴급·비상 residual · remaining 경고·주의·안전·예방하다·대처하다·주의사항
 * Prefer-adjacent 경고하다·주의하다·위험하다·피하다 on tel/scramble (bingo Prefer Done)
 * No ThemeSm chips · Suggest ThemeSm close only
 * Run: node hub/ops/qa/_patch-warn-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-637")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-637",
    pair: "subject",
    template: "긴급{0} 커요",
    answer: "이",
    full: "긴급이 커요",
    gloss: {
      en: "The urgency is high",
      ko: "주격 · 받침 뒤 이 · 긴급",
      zh: "紧急程度很高",
    },
    tags: ["subject", "warn", "intermediate"],
  },
  {
    id: "ps-638",
    pair: "subject",
    template: "비상{0} 생겨요",
    answer: "이",
    full: "비상이 생겨요",
    gloss: {
      en: "An emergency arises",
      ko: "주격 · 받침 뒤 이 · 비상",
      zh: "出现紧急情况",
    },
    tags: ["subject", "warn", "intermediate"],
  },
  {
    id: "ps-639",
    pair: "object",
    template: "긴급번호{0} 저장해요",
    answer: "를",
    full: "긴급번호를 저장해요",
    gloss: {
      en: "I save the emergency number",
      ko: "목적격 · 모음 뒤 를 · 긴급",
      zh: "我保存紧急号码",
    },
    tags: ["object", "warn", "intermediate"],
  },
  {
    id: "ps-640",
    pair: "object",
    template: "비상등{0} 확인해요",
    answer: "을",
    full: "비상등을 확인해요",
    gloss: {
      en: "I check the emergency lights",
      ko: "목적격 · 받침 뒤 을 · 비상",
      zh: "我检查应急灯",
    },
    tags: ["object", "warn", "intermediate"],
  },
  {
    id: "ps-641",
    pair: "subject",
    template: "경고{0} 짧아요",
    answer: "가",
    full: "경고가 짧아요",
    gloss: {
      en: "The warning is short",
      ko: "주격 · 모음 뒤 가 · 경고",
      zh: "警告很短",
    },
    tags: ["subject", "warn", "intermediate"],
  },
  {
    id: "ps-642",
    pair: "subject",
    template: "주의{0} 부족해요",
    answer: "가",
    full: "주의가 부족해요",
    gloss: {
      en: "Caution is lacking",
      ko: "주격 · 모음 뒤 가 · 주의",
      zh: "注意不够",
    },
    tags: ["subject", "warn", "intermediate"],
  },
  {
    id: "ps-643",
    pair: "object",
    template: "안전{0} 지켜요",
    answer: "을",
    full: "안전을 지켜요",
    gloss: {
      en: "I keep safety",
      ko: "목적격 · 받침 뒤 을 · 안전",
      zh: "我守住安全",
    },
    tags: ["object", "warn", "intermediate"],
  },
  {
    id: "ps-644",
    pair: "object",
    template: "화재{0} 예방해요",
    answer: "를",
    full: "화재를 예방해요",
    gloss: {
      en: "I prevent fires",
      ko: "목적격 · 모음 뒤 를 · 예방하다",
      zh: "我预防火灾",
    },
    tags: ["object", "warn", "intermediate"],
  },
  {
    id: "ps-645",
    pair: "subject",
    template: "대처{0} 빨라요",
    answer: "가",
    full: "대처가 빨라요",
    gloss: {
      en: "The response is quick",
      ko: "주격 · 모음 뒤 가 · 대처하다",
      zh: "应对很快",
    },
    tags: ["subject", "warn", "intermediate"],
  },
  {
    id: "ps-646",
    pair: "subject",
    template: "주의사항{0} 많아요",
    answer: "이",
    full: "주의사항이 많아요",
    gloss: {
      en: "There are many precautions",
      ko: "주격 · 받침 뒤 이 · 주의사항",
      zh: "注意事项很多",
    },
    tags: ["subject", "warn", "intermediate"],
  }
);
particle.version = 65;
ensureTheme(particle, "warn");
particle.updated = "2026-07-27";
particle.note =
  "+10 warn-caution particle (ps-637–646, 2026-07-27): Prefer 긴급·비상 residual · 경고·주의·안전·예방하다·대처하다·주의사항. Skip 경고하다·주의하다·위험하다·피하다 → tel Prefer-adjacent (bingo Prefer Done). Distinct from cloze hosts (긴급 상황에 침착하게 대처해요·비상구를 미리 확인해요·긴급 연락을 바로 받아요…) · listen hosts (미리 경고해 드려요·표지판을 잘 주의해요·공사 구간은 위험해요…). Distinct problem/complain/refuse/rules/health · driving 위험·조심하다. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 warn chip). Prior complain ps-627–636 kept.";
if (particle.copyright && !particle.copyright.includes("warn-caution")) {
  particle.copyright = particle.copyright.replace(
    "complain-dissatisfaction crossfill",
    "complain-dissatisfaction/warn-caution crossfill"
  );
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-643")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-643",
    text: "긴급이 커요",
    roman: "gingeupi keoyo",
    gloss: { en: "The urgency is high", ko: "긴급", zh: "紧急程度很高" },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-644",
    text: "비상이 생겨요",
    roman: "bisangi saenggyeoyo",
    gloss: {
      en: "An emergency arises",
      ko: "비상",
      zh: "出现紧急情况",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-645",
    text: "긴급번호를 저장해요",
    roman: "gingeupbeonhoreul jeojanghaeyo",
    gloss: {
      en: "I save the emergency number",
      ko: "긴급",
      zh: "我保存紧急号码",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-646",
    text: "비상등을 확인해요",
    roman: "bisangdeungeul hwaginhaeyo",
    gloss: {
      en: "I check the emergency lights",
      ko: "비상",
      zh: "我检查应急灯",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-647",
    text: "경고가 짧아요",
    roman: "gyeonggoga jjalbayo",
    gloss: {
      en: "The warning is short",
      ko: "경고",
      zh: "警告很短",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-648",
    text: "주의가 부족해요",
    roman: "juuiga bujokhaeyo",
    gloss: {
      en: "Caution is lacking",
      ko: "주의",
      zh: "注意不够",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-649",
    text: "안전을 지켜요",
    roman: "anjeoneul jikyeoyo",
    gloss: {
      en: "I keep safety",
      ko: "안전",
      zh: "我守住安全",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-650",
    text: "화재를 예방해요",
    roman: "hwajaereul yebanghaeyo",
    gloss: {
      en: "I prevent fires",
      ko: "예방하다",
      zh: "我预防火灾",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-651",
    text: "대처가 빨라요",
    roman: "daecheoga ppalayo",
    gloss: {
      en: "The response is quick",
      ko: "대처하다",
      zh: "应对很快",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "d-652",
    text: "주의사항이 많아요",
    roman: "juuisahangi manayo",
    gloss: {
      en: "There are many precautions",
      ko: "주의사항",
      zh: "注意事项很多",
    },
    tags: ["warn", "intermediate"],
  }
);
dictation.version = 67;
ensureTheme(dictation, "warn");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 warn-caution dictation (d-643–652, 2026-07-27): Prefer 긴급·비상 residual · 경고·주의·안전·예방하다·대처하다·주의사항. Skip 경고하다·주의하다·위험하다·피하다 → tel Prefer-adjacent. Distinct from cloze/listen hosts · problem/complain/refuse/rules/health. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only (전 8 warn chip). Prior complain d-633–642 kept.";
if (dictation.copyright && !dictation.copyright.includes("warn-caution")) {
  dictation.copyright = dictation.copyright.replace(
    "complain-dissatisfaction crossfill",
    "complain-dissatisfaction/warn-caution crossfill"
  );
  if (!dictation.copyright.includes("warn-caution") && dictation.copyright.includes("rules-permission")) {
    dictation.copyright = dictation.copyright.replace(
      "rules-permission/complain-dissatisfaction crossfill",
      "rules-permission/complain-dissatisfaction/warn-caution crossfill"
    );
  }
}
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-586")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-586",
    text: "긴급이 커요",
    gloss: { en: "The urgency is high", ko: "긴급", zh: "紧急程度很高" },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-587",
    text: "비상이 생겨요",
    gloss: {
      en: "An emergency arises",
      ko: "비상",
      zh: "出现紧急情况",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-588",
    text: "긴급번호를 저장해요",
    gloss: {
      en: "I save the emergency number",
      ko: "긴급",
      zh: "我保存紧急号码",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-589",
    text: "비상등을 확인해요",
    gloss: {
      en: "I check the emergency lights",
      ko: "비상",
      zh: "我检查应急灯",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-590",
    text: "학생을 경고해요",
    gloss: {
      en: "I warn the student",
      ko: "경고하다",
      zh: "我警告学生",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-591",
    text: "길을 주의해요",
    gloss: {
      en: "I watch the road carefully",
      ko: "주의하다",
      zh: "我注意道路",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-592",
    text: "밤길이 위험해요",
    gloss: {
      en: "The night road is dangerous",
      ko: "위험하다",
      zh: "夜路很危险",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "tel-593",
    text: "혼잡을 피해요",
    gloss: {
      en: "I avoid the crowd",
      ko: "피하다",
      zh: "我避开拥堵",
    },
    tags: ["warn", "intermediate"],
  }
);
tel.version = 64;
ensureTheme(tel, "warn");
tel.updated = "2026-07-27";
tel.note =
  "+8 warn-caution telephone (tel-586–593, 2026-07-27): Prefer 긴급·비상 residual · Prefer-adjacent 경고하다·주의하다·위험하다·피하다. Skip 경고·주의·안전·예방하다·대처하다·주의사항 (particle/dictation). Distinct from cloze/listen hosts (긴급 연락을 바로 받아요·미리 경고해 드려요·표지판을 잘 주의해요·공사 구간은 위험해요·젖은 바닥을 피해요…). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior complain tel-578–585 kept.";
if (tel.copyright && !tel.copyright.includes("warn-caution")) {
  if (tel.copyright.includes("complain-dissatisfaction crossfill")) {
    tel.copyright = tel.copyright.replace(
      "complain-dissatisfaction crossfill",
      "complain-dissatisfaction/warn-caution crossfill"
    );
  } else if (tel.copyright.includes("rules-permission crossfill")) {
    tel.copyright = tel.copyright.replace(
      "rules-permission crossfill",
      "rules-permission/warn-caution crossfill"
    );
  }
}
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-588")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-588",
    tokens: ["긴급이", "커요"],
    full: "긴급이 커요",
    gloss: { en: "The urgency is high", ko: "긴급", zh: "紧急程度很高" },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-589",
    tokens: ["비상이", "생겨요"],
    full: "비상이 생겨요",
    gloss: {
      en: "An emergency arises",
      ko: "비상",
      zh: "出现紧急情况",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-590",
    tokens: ["긴급번호를", "저장해요"],
    full: "긴급번호를 저장해요",
    gloss: {
      en: "I save the emergency number",
      ko: "긴급",
      zh: "我保存紧急号码",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-591",
    tokens: ["비상등을", "확인해요"],
    full: "비상등을 확인해요",
    gloss: {
      en: "I check the emergency lights",
      ko: "비상",
      zh: "我检查应急灯",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-592",
    tokens: ["학생을", "경고해요"],
    full: "학생을 경고해요",
    gloss: {
      en: "I warn the student",
      ko: "경고하다",
      zh: "我警告学生",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-593",
    tokens: ["길을", "주의해요"],
    full: "길을 주의해요",
    gloss: {
      en: "I watch the road carefully",
      ko: "주의하다",
      zh: "我注意道路",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-594",
    tokens: ["밤길이", "위험해요"],
    full: "밤길이 위험해요",
    gloss: {
      en: "The night road is dangerous",
      ko: "위험하다",
      zh: "夜路很危险",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "ws-595",
    tokens: ["혼잡을", "피해요"],
    full: "혼잡을 피해요",
    gloss: {
      en: "I avoid the crowd",
      ko: "피하다",
      zh: "我避开拥堵",
    },
    tags: ["warn", "intermediate"],
  }
);
ws.version = 64;
ensureTheme(ws, "warn");
ws.updated = "2026-07-27";
ws.note =
  "+8 warn-caution scramble (ws-588–595, 2026-07-27): Prefer 긴급·비상 residual · Prefer-adjacent 경고하다·주의하다·위험하다·피하다. Skip 경고·주의·안전·예방하다·대처하다·주의사항 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close only. Prior complain ws-580–587 kept.";
if (ws.copyright && !ws.copyright.includes("warn-caution")) {
  if (ws.copyright.includes("complain-dissatisfaction crossfill")) {
    ws.copyright = ws.copyright.replace(
      "complain-dissatisfaction crossfill",
      "complain-dissatisfaction/warn-caution crossfill"
    );
  } else if (ws.copyright.includes("rules-permission crossfill")) {
    ws.copyright = ws.copyright.replace(
      "rules-permission crossfill",
      "rules-permission/warn-caution crossfill"
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
  if ((it.tags || []).includes("warn") && it.full) used.add(it.full);
}
for (const it of listen.items || []) {
  if ((it.tags || []).includes("warn") && it.text) used.add(it.text);
}
const pack = (packFile.packs || []).find((p) => p.id === "warn-caution");
if (pack) {
  for (const it of pack.items || []) {
    if (it.example && it.example.ko)
      used.add(it.example.ko.replace(/[.。?？]$/, ""));
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
man.version = 256;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 697 · listen-match 664 · speed 650 · telephone 593 · scramble 595 · dictation 652 · cloze 642 · particle 646. +warn-caution particle/dictation +10 · tel/scramble +8 (ps-637–646 · d-643–652 · tel-586–593 · ws-588–595) · themes warn · warnTagged 10×6 + 8×2 · Prefer 긴급·비상 residual · Prefer-adjacent 경고하다·주의하다·위험하다·피하다 on tel/scramble · chip 제안 KO 경고 / ZH 警告 · Suggest ThemeSm close only · ThemeSm/칩 미터치. Prior bingo/listen bg-688–697 · lm-655–664 kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 65, 646);
bumpGame("dictation", 67, 652);
bumpGame("telephone", 64, 593);
bumpGame("word-scramble", 64, 595);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+warn-caution 12 Done speed+cloze+bingo/listen+particle/dictation(+tel/scramble) (2026-07-27). Prefer 긴급·비상 residual · Prefer-adjacent 경고하다·주의하다·위험하다·피하다 on tel/scramble · Suggest ThemeSm close only · themes warn · chip 제안 경고/警告 · ThemeSm 미터치. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · refuse · health. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Existing packs kept (incl. complain-dissatisfaction ThemeSm58 closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
if (pack) {
  pack.note =
    "Everyday warn / heed caution / be dangerous / avoid / prevent / cope / warning-noun / caution-noun / safety-noun / precautions / urgent / emergency survival — distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 긴급·비상 residual · Prefer-adjacent 경고하다·주의하다·위험하다·피하다 on tel/scramble · Suggest ThemeSm close only · themes warn · chip 제안 경고/警告 · ThemeSm 미터치.";
}
save(vocabPath, vocab);

const canonPath = "hub/app/data/vocab/theme-key-canon.json";
const canon = load(canonPath);
const warnCanon = (canon.themes || canon.keys || []).find
  ? null
  : null;
// theme-key-canon structure: find warn entry
function findWarnEntry(obj) {
  if (Array.isArray(obj)) {
    return obj.find((x) => x.themeKey === "warn" || x.key === "warn");
  }
  if (obj && typeof obj === "object") {
    if (obj.warn) return obj.warn;
    for (const v of Object.values(obj)) {
      const f = findWarnEntry(v);
      if (f) return f;
    }
  }
  return null;
}
const warnEntry = findWarnEntry(canon);
if (warnEntry && warnEntry.notes) {
  warnEntry.notes =
    "Pack+speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done (2026-07-27). ThemeSm chip not enabled yet. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · refuse · health. Prefer 긴급·비상 residual Done · Prefer-adjacent 경고하다·주의하다·위험하다·피하다 on tel/scramble · Suggest ThemeSm close only.";
  save(canonPath, canon);
}

for (const [rel, needle, repl] of [
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest particle/dictation.",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only.",
  ],
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest particle/dictation",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
  ],
  [
    "hub/app/data/games/speed-quiz-beginner.json",
    "Suggest bingo/listen",
    "Bingo/listen Done · Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
  ],
  [
    "hub/app/data/games/bingo-beginner.json",
    "Suggest particle/dictation.",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only.",
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
  [
    "hub/app/data/games/listen-match-beginner.json",
    "Suggest particle/dictation",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm close only",
  ],
]) {
  const d = load(rel);
  if (d.note && d.note.includes(needle) && !d.note.includes("ThemeSm close only")) {
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
  const n = (d.items || []).filter((i) => (i.tags || []).includes("warn")).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "warnTagged=" + n,
    "themes.warn=" + d.themes.includes("warn")
  );
}
console.log("manifest", man.version);

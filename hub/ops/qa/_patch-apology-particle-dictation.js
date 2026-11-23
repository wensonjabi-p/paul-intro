/**
 * ThemeSm52d prep — apology-politeness → particle/dictation +10 · tel/scramble +8
 * Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 on tel/scramble
 * Run: node hub/ops/qa/_patch-apology-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-567")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-567",
    pair: "object",
    template: "번거로움{0} 줄여요",
    answer: "을",
    full: "번거로움을 줄여요",
    gloss: {
      en: "I reduce the trouble",
      ko: "목적격 · 받침 뒤 을 · 번거롭다",
      zh: "减少麻烦",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-568",
    pair: "subject",
    template: "공손함{0} 보여요",
    answer: "이",
    full: "공손함이 보여요",
    gloss: {
      en: "Politeness shows",
      ko: "주격 · 받침 뒤 이 · 공손하다",
      zh: "看得出恭敬",
    },
    tags: ["subject", "apology", "intermediate"],
  },
  {
    id: "ps-569",
    pair: "subject",
    template: "미안함{0} 남아요",
    answer: "이",
    full: "미안함이 남아요",
    gloss: {
      en: "A feeling of sorry remains",
      ko: "주격 · 받침 뒤 이 · 미안하다",
      zh: "抱歉感还在",
    },
    tags: ["subject", "apology", "intermediate"],
  },
  {
    id: "ps-570",
    pair: "subject",
    template: "죄송함{0} 커요",
    answer: "이",
    full: "죄송함이 커요",
    gloss: {
      en: "The apology feeling is strong",
      ko: "주격 · 받침 뒤 이 · 죄송하다",
      zh: "抱歉感很强",
    },
    tags: ["subject", "apology", "intermediate"],
  },
  {
    id: "ps-571",
    pair: "object",
    template: "사과{0} 전해요",
    answer: "를",
    full: "사과를 전해요",
    gloss: {
      en: "I convey an apology",
      ko: "목적격 · 모음 뒤 를 · 사과하다",
      zh: "转达道歉",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-572",
    pair: "object",
    template: "용서{0} 구해요",
    answer: "를",
    full: "용서를 구해요",
    gloss: {
      en: "I ask for forgiveness",
      ko: "목적격 · 모음 뒤 를 · 용서하다",
      zh: "请求原谅",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-573",
    pair: "object",
    template: "실례{0} 줄여요",
    answer: "를",
    full: "실례를 줄여요",
    gloss: {
      en: "I reduce rudeness",
      ko: "목적격 · 모음 뒤 를 · 실례하다",
      zh: "减少失礼",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-574",
    pair: "object",
    template: "감사{0} 전해요",
    answer: "를",
    full: "감사를 전해요",
    gloss: {
      en: "I convey thanks",
      ko: "목적격 · 모음 뒤 를 · 감사하다",
      zh: "转达感谢",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-575",
    pair: "object",
    template: "덕분{0} 기억해요",
    answer: "을",
    full: "덕분을 기억해요",
    gloss: {
      en: "I remember the favor (owing to)",
      ko: "목적격 · 받침 뒤 을 · 덕분",
      zh: "记得这份多亏",
    },
    tags: ["object", "apology", "intermediate"],
  },
  {
    id: "ps-576",
    pair: "object",
    template: "수고{0} 알아요",
    answer: "를",
    full: "수고를 알아요",
    gloss: {
      en: "I recognize the hard work",
      ko: "목적격 · 모음 뒤 를 · 수고하다",
      zh: "知道您辛苦了",
    },
    tags: ["object", "apology", "intermediate"],
  }
);
particle.version = 58;
ensureTheme(particle, "apology");
particle.updated = "2026-07-27";
particle.note =
  "+10 apology-politeness particle (ps-567–576, 2026-07-27): Prefer 번거롭다·공손하다 residual · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다. Skip 인사하다·불편하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (번거로운 확인·공손한 태도·늦은 도착…) · listen hosts. Distinct favor 고맙다 · rules 예의 · friends 방문 · personality · fruit 사과. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm52d close (전 8 apology chip). Prior personality ps-557–566 kept.";
if (particle.copyright && !particle.copyright.includes("apology-politeness")) {
  particle.copyright = particle.copyright.replace(
    "personality-character crossfill",
    "personality-character/apology-politeness crossfill"
  );
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-573")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-573",
    text: "번거로움을 줄여요",
    roman: "beongeoroum-eul juryeoyo",
    gloss: { en: "I reduce the trouble", ko: "번거롭다", zh: "减少麻烦" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-574",
    text: "공손함이 보여요",
    roman: "gongsonhami boyeoyo",
    gloss: { en: "Politeness shows", ko: "공손하다", zh: "看得出恭敬" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-575",
    text: "미안함이 남아요",
    roman: "mianhami namayo",
    gloss: {
      en: "A feeling of sorry remains",
      ko: "미안하다",
      zh: "抱歉感还在",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-576",
    text: "죄송함이 커요",
    roman: "joesonghami keoyo",
    gloss: {
      en: "The apology feeling is strong",
      ko: "죄송하다",
      zh: "抱歉感很强",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-577",
    text: "사과를 전해요",
    roman: "sagwareul jeonhaeyo",
    gloss: { en: "I convey an apology", ko: "사과하다", zh: "转达道歉" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-578",
    text: "용서를 구해요",
    roman: "yongseoreul guhaeyo",
    gloss: { en: "I ask for forgiveness", ko: "용서하다", zh: "请求原谅" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-579",
    text: "실례를 줄여요",
    roman: "sillyereul juryeoyo",
    gloss: { en: "I reduce rudeness", ko: "실례하다", zh: "减少失礼" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-580",
    text: "감사를 전해요",
    roman: "gamsareul jeonhaeyo",
    gloss: { en: "I convey thanks", ko: "감사하다", zh: "转达感谢" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-581",
    text: "덕분을 기억해요",
    roman: "deokbuneul gieokhaeyo",
    gloss: {
      en: "I remember the favor (owing to)",
      ko: "덕분",
      zh: "记得这份多亏",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "d-582",
    text: "수고를 알아요",
    roman: "sugoreul arayo",
    gloss: {
      en: "I recognize the hard work",
      ko: "수고하다",
      zh: "知道您辛苦了",
    },
    tags: ["apology", "intermediate"],
  }
);
dictation.version = 60;
ensureTheme(dictation, "apology");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 apology-politeness dictation (d-573–582, 2026-07-27): Prefer 번거롭다·공손하다 residual · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다. Skip 인사하다·불편하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · favor/rules/friends/personality · fruit 사과. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm52d close (전 8 apology chip). Prior personality d-563–572 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-530")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-530",
    text: "번거로움을 줄여요",
    gloss: { en: "I reduce the trouble", ko: "번거롭다", zh: "减少麻烦" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-531",
    text: "공손함이 보여요",
    gloss: { en: "Politeness shows", ko: "공손하다", zh: "看得出恭敬" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-532",
    text: "먼저 인사해요",
    gloss: { en: "I greet first", ko: "인사하다", zh: "先打招呼" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-533",
    text: "기다리기 불편해요",
    gloss: {
      en: "Waiting is inconvenient",
      ko: "불편하다",
      zh: "等着不方便",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-534",
    text: "미안함이 남아요",
    gloss: {
      en: "A feeling of sorry remains",
      ko: "미안하다",
      zh: "抱歉感还在",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-535",
    text: "죄송함이 커요",
    gloss: {
      en: "The apology feeling is strong",
      ko: "죄송하다",
      zh: "抱歉感很强",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-536",
    text: "사과를 전해요",
    gloss: { en: "I convey an apology", ko: "사과하다", zh: "转达道歉" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "tel-537",
    text: "용서를 구해요",
    gloss: { en: "I ask for forgiveness", ko: "용서하다", zh: "请求原谅" },
    tags: ["apology", "intermediate"],
  }
);
tel.version = 57;
ensureTheme(tel, "apology");
tel.updated = "2026-07-27";
tel.note =
  "+8 apology-politeness telephone (tel-530–537, 2026-07-27): Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 · 미안하다·죄송하다·사과하다·용서하다. Skip 실례하다·감사하다·덕분·수고하다 (particle/dictation). Distinct from cloze/listen hosts (들어오며 인사해요·자리가 불편해요). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm52d close. Prior personality tel-522–529 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-532")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-532",
    tokens: ["번거로움을", "줄여요"],
    full: "번거로움을 줄여요",
    gloss: { en: "I reduce the trouble", ko: "번거롭다", zh: "减少麻烦" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-533",
    tokens: ["공손함이", "보여요"],
    full: "공손함이 보여요",
    gloss: { en: "Politeness shows", ko: "공손하다", zh: "看得出恭敬" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-534",
    tokens: ["먼저", "인사해요"],
    full: "먼저 인사해요",
    gloss: { en: "I greet first", ko: "인사하다", zh: "先打招呼" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-535",
    tokens: ["기다리기", "불편해요"],
    full: "기다리기 불편해요",
    gloss: {
      en: "Waiting is inconvenient",
      ko: "불편하다",
      zh: "等着不方便",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-536",
    tokens: ["미안함이", "남아요"],
    full: "미안함이 남아요",
    gloss: {
      en: "A feeling of sorry remains",
      ko: "미안하다",
      zh: "抱歉感还在",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-537",
    tokens: ["죄송함이", "커요"],
    full: "죄송함이 커요",
    gloss: {
      en: "The apology feeling is strong",
      ko: "죄송하다",
      zh: "抱歉感很强",
    },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-538",
    tokens: ["사과를", "전해요"],
    full: "사과를 전해요",
    gloss: { en: "I convey an apology", ko: "사과하다", zh: "转达道歉" },
    tags: ["apology", "intermediate"],
  },
  {
    id: "ws-539",
    tokens: ["용서를", "구해요"],
    full: "용서를 구해요",
    gloss: { en: "I ask for forgiveness", ko: "용서하다", zh: "请求原谅" },
    tags: ["apology", "intermediate"],
  }
);
ws.version = 57;
ensureTheme(ws, "apology");
ws.updated = "2026-07-27";
ws.note =
  "+8 apology-politeness scramble (ws-532–539, 2026-07-27): Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 · 미안하다·죄송하다·사과하다·용서하다. Skip 실례하다·감사하다·덕분·수고하다 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm52d close. Prior personality ws-524–531 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 228;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 627 · listen-match 594 · speed 580 · telephone 537 · scramble 539 · dictation 582 · cloze 572 · particle 576. +apology-politeness particle/dictation +10 · tel/scramble +8 (ps-567–576 · d-573–582 · tel-530–537 · ws-532–539) · themes apology · apologyTagged 10×6 + 8×2 · Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 on tel/scramble · chip KO 미안 / ZH 抱歉 · ThemeSm52d close. Prior bingo/listen bg-618–627 · lm-585–594 · ThemeSm52c kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 58, 576);
bumpGame("dictation", 60, 582);
bumpGame("telephone", 57, 537);
bumpGame("word-scramble", 57, 539);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+apology-politeness 12 (미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다·번거롭다·인사하다·불편하다·공손하다) 2026-07-27. Distinct from favor 고맙다 · rules 예의 · friends 방문 · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 on tel/scramble · Suggest ThemeSm52d close · themes apology · chip 미안/抱歉. Existing packs kept (incl. personality-character sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "apology-politeness");
if (pack) {
  pack.note =
    "Everyday sorry / apologize / forgive / excuse / thank / owing-to / trouble / greet / inconvenient / polite survival — distinct from favor 고맙다 · rules 예의 · friends 인사 장면 분리(방문) · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 번거롭다·공손하다 residual · Prefer-adjacent 인사하다·불편하다 on tel/scramble · Suggest ThemeSm52d close · themes apology · chip 미안/抱歉.";
}
save(vocabPath, vocab);

for (const [label, file] of [
  ["particle", particlePath],
  ["dictation", dictationPath],
  ["tel", telPath],
  ["scramble", wsPath],
]) {
  const d = load(file);
  const n = (d.items || []).filter((i) =>
    (i.tags || []).includes("apology")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "apologyTagged=" + n,
    "themes.apology=" + d.themes.includes("apology")
  );
}
console.log("manifest", man.version);

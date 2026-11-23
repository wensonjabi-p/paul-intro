/**
 * ThemeSm51c prep — personality-character → particle/dictation +10 · tel/scramble +8
 * Prefer 겸손하다·엄격하다 residual · Prefer-adjacent 소심하다·용감하다 on tel/scramble
 * Run: node hub/ops/qa/_patch-personality-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-557")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-557",
    pair: "object",
    template: "겸손{0} 배워요",
    answer: "을",
    full: "겸손을 배워요",
    gloss: {
      en: "I learn humility",
      ko: "목적격 · 받침 뒤 을 · 겸손하다",
      zh: "学习谦虚",
    },
    tags: ["object", "personality", "intermediate"],
  },
  {
    id: "ps-558",
    pair: "subject",
    template: "엄격함{0} 필요해요",
    answer: "이",
    full: "엄격함이 필요해요",
    gloss: {
      en: "Strictness is needed",
      ko: "주격 · 받침 뒤 이 · 엄격하다",
      zh: "需要严格",
    },
    tags: ["subject", "personality", "intermediate"],
  },
  {
    id: "ps-559",
    pair: "subject",
    template: "성격{0} 급해요",
    answer: "이",
    full: "성격이 급해요",
    gloss: {
      en: "The personality is impatient",
      ko: "주격 · 받침 뒤 이 · 성격",
      zh: "性格很急",
    },
    tags: ["subject", "personality", "intermediate"],
  },
  {
    id: "ps-560",
    pair: "object",
    template: "친절{0} 기억해요",
    answer: "을",
    full: "친절을 기억해요",
    gloss: {
      en: "I remember the kindness",
      ko: "목적격 · 받침 뒤 을 · 친절하다",
      zh: "记得那份亲切",
    },
    tags: ["object", "personality", "intermediate"],
  },
  {
    id: "ps-561",
    pair: "subject",
    template: "성실함{0} 보여요",
    answer: "이",
    full: "성실함이 보여요",
    gloss: {
      en: "Sincerity shows",
      ko: "주격 · 받침 뒤 이 · 성실하다",
      zh: "看得出认真",
    },
    tags: ["subject", "personality", "intermediate"],
  },
  {
    id: "ps-562",
    pair: "topic",
    template: "활발함{0} 장점이에요",
    answer: "은",
    full: "활발함은 장점이에요",
    gloss: {
      en: "As for liveliness, it is a strength",
      ko: "주제 · 받침 뒤 은 · 활발하다",
      zh: "活泼是优点",
    },
    tags: ["topic", "personality", "intermediate"],
  },
  {
    id: "ps-563",
    pair: "object",
    template: "솔직함{0} 좋아해요",
    answer: "을",
    full: "솔직함을 좋아해요",
    gloss: {
      en: "I like frankness",
      ko: "목적격 · 받침 뒤 을 · 솔직하다",
      zh: "喜欢坦率",
    },
    tags: ["object", "personality", "intermediate"],
  },
  {
    id: "ps-564",
    pair: "subject",
    template: "자신감{0} 필요해요",
    answer: "이",
    full: "자신감이 필요해요",
    gloss: {
      en: "Confidence is needed",
      ko: "주격 · 받침 뒤 이 · 자신감",
      zh: "需要自信",
    },
    tags: ["subject", "personality", "intermediate"],
  },
  {
    id: "ps-565",
    pair: "object",
    template: "다정함{0} 느껴요",
    answer: "을",
    full: "다정함을 느껴요",
    gloss: {
      en: "I feel the warmth",
      ko: "목적격 · 받침 뒤 을 · 다정하다",
      zh: "感受到温柔",
    },
    tags: ["object", "personality", "intermediate"],
  },
  {
    id: "ps-566",
    pair: "subject",
    template: "꼼꼼함{0} 돋보여요",
    answer: "이",
    full: "꼼꼼함이 돋보여요",
    gloss: {
      en: "Thoroughness stands out",
      ko: "주격 · 받침 뒤 이 · 꼼꼼하다",
      zh: "细致很突出",
    },
    tags: ["subject", "personality", "intermediate"],
  }
);
particle.version = 57;
ensureTheme(particle, "personality");
particle.updated = "2026-07-27";
particle.note =
  "+10 personality-character particle (ps-557–566, 2026-07-27): Prefer 겸손하다·엄격하다 residual · 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다. Skip 소심하다·용감하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (겸손함 보여·선생님 엄격·성격 중요·안내원 친절…) · listen hosts. Distinct opinion/emotion/habit/friends. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 personality chip). Prior friends ps-547–556 kept.";
if (particle.copyright && !particle.copyright.includes("personality-character")) {
  particle.copyright = particle.copyright.replace(
    "rules-permission crossfill",
    "rules-permission/friends-social/personality-character crossfill"
  );
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-563")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-563",
    text: "겸손을 배워요",
    roman: "gyeomsoneul baewoyo",
    gloss: { en: "I learn humility", ko: "겸손하다", zh: "学习谦虚" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-564",
    text: "엄격함이 필요해요",
    roman: "eomgyeokami piryohaeyo",
    gloss: { en: "Strictness is needed", ko: "엄격하다", zh: "需要严格" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-565",
    text: "성격이 급해요",
    roman: "seonggyeogi geuphaeyo",
    gloss: { en: "The personality is impatient", ko: "성격", zh: "性格很急" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-566",
    text: "친절을 기억해요",
    roman: "chinjeoreul gieokhaeyo",
    gloss: { en: "I remember the kindness", ko: "친절하다", zh: "记得那份亲切" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-567",
    text: "성실함이 보여요",
    roman: "seongsilhami boyeoyo",
    gloss: { en: "Sincerity shows", ko: "성실하다", zh: "看得出认真" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-568",
    text: "활발함은 장점이에요",
    roman: "hwalbalhameun jangjeomieyo",
    gloss: {
      en: "As for liveliness, it is a strength",
      ko: "활발하다",
      zh: "活泼是优点",
    },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-569",
    text: "솔직함을 좋아해요",
    roman: "soljikameul joahaeyo",
    gloss: { en: "I like frankness", ko: "솔직하다", zh: "喜欢坦率" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-570",
    text: "자신감이 필요해요",
    roman: "jasingami piryohaeyo",
    gloss: { en: "Confidence is needed", ko: "자신감", zh: "需要自信" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-571",
    text: "다정함을 느껴요",
    roman: "dajeonghameul neukkyeoyo",
    gloss: { en: "I feel the warmth", ko: "다정하다", zh: "感受到温柔" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "d-572",
    text: "꼼꼼함이 돋보여요",
    roman: "kkomkkomhami dotboyeoyo",
    gloss: { en: "Thoroughness stands out", ko: "꼼꼼하다", zh: "细致很突出" },
    tags: ["personality", "intermediate"],
  }
);
dictation.version = 59;
ensureTheme(dictation, "personality");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 personality-character dictation (d-563–572, 2026-07-27): Prefer 겸손하다·엄격하다 residual · 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다. Skip 소심하다·용감하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · opinion/emotion/habit/friends. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 personality chip). Prior friends d-553–562 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-522")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-522",
    text: "겸손을 배워요",
    gloss: { en: "I learn humility", ko: "겸손하다", zh: "学习谦虚" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-523",
    text: "엄격함이 필요해요",
    gloss: { en: "Strictness is needed", ko: "엄격하다", zh: "需要严格" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-524",
    text: "너무 소심해요",
    gloss: { en: "I am too timid", ko: "소심하다", zh: "太拘谨了" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-525",
    text: "용감하게 말해요",
    gloss: { en: "I speak bravely", ko: "용감하다", zh: "勇敢地说" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-526",
    text: "성격이 급해요",
    gloss: { en: "The personality is impatient", ko: "성격", zh: "性格很急" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-527",
    text: "친절을 기억해요",
    gloss: { en: "I remember the kindness", ko: "친절하다", zh: "记得那份亲切" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-528",
    text: "성실함이 보여요",
    gloss: { en: "Sincerity shows", ko: "성실하다", zh: "看得出认真" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "tel-529",
    text: "꼼꼼함이 돋보여요",
    gloss: { en: "Thoroughness stands out", ko: "꼼꼼하다", zh: "细致很突出" },
    tags: ["personality", "intermediate"],
  }
);
tel.version = 56;
ensureTheme(tel, "personality");
tel.updated = "2026-07-27";
tel.note =
  "+8 personality-character telephone (tel-522–529, 2026-07-27): Prefer 겸손하다·엄격하다 residual · Prefer-adjacent 소심하다·용감하다 · 성격·친절하다·성실하다·꼼꼼하다. Skip 활발하다·솔직하다·자신감·다정하다 (particle/dictation). Distinct from cloze/listen hosts (소심해서 망설여·용감하게 나서요). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close. Prior friends tel-514–521 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-524")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-524",
    tokens: ["겸손을", "배워요"],
    full: "겸손을 배워요",
    gloss: { en: "I learn humility", ko: "겸손하다", zh: "学习谦虚" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-525",
    tokens: ["엄격함이", "필요해요"],
    full: "엄격함이 필요해요",
    gloss: { en: "Strictness is needed", ko: "엄격하다", zh: "需要严格" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-526",
    tokens: ["너무", "소심해요"],
    full: "너무 소심해요",
    gloss: { en: "I am too timid", ko: "소심하다", zh: "太拘谨了" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-527",
    tokens: ["용감하게", "말해요"],
    full: "용감하게 말해요",
    gloss: { en: "I speak bravely", ko: "용감하다", zh: "勇敢地说" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-528",
    tokens: ["성격이", "급해요"],
    full: "성격이 급해요",
    gloss: { en: "The personality is impatient", ko: "성격", zh: "性格很急" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-529",
    tokens: ["친절을", "기억해요"],
    full: "친절을 기억해요",
    gloss: { en: "I remember the kindness", ko: "친절하다", zh: "记得那份亲切" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-530",
    tokens: ["성실함이", "보여요"],
    full: "성실함이 보여요",
    gloss: { en: "Sincerity shows", ko: "성실하다", zh: "看得出认真" },
    tags: ["personality", "intermediate"],
  },
  {
    id: "ws-531",
    tokens: ["꼼꼼함이", "돋보여요"],
    full: "꼼꼼함이 돋보여요",
    gloss: { en: "Thoroughness stands out", ko: "꼼꼼하다", zh: "细致很突出" },
    tags: ["personality", "intermediate"],
  }
);
ws.version = 56;
ensureTheme(ws, "personality");
ws.updated = "2026-07-27";
ws.note =
  "+8 personality-character scramble (ws-524–531, 2026-07-27): Prefer 겸손하다·엄격하다 residual · Prefer-adjacent 소심하다·용감하다 · 성격·친절하다·성실하다·꼼꼼하다. Skip 활발하다·솔직하다·자신감·다정하다 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close. Prior friends ws-516–523 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 224;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 617 · listen-match 584 · speed 570 · telephone 529 · scramble 531 · dictation 572 · cloze 562 · particle 566. +personality-character particle/dictation +10 · tel/scramble +8 (ps-557–566 · d-563–572 · tel-522–529 · ws-524–531) · themes personality · personalityTagged 10/10/8/8 · Prefer 겸손하다·엄격하다 residual · Prefer-adjacent 소심하다·용감하다 on tel/scramble · Skip 소심하다·용감하다 bingo Done · chip KO 성격 / ZH 性格. Prior bingo/listen bg-608–617 · lm-575–584 · ThemeSm51b kept. Suggest ThemeSm51c close. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 57, 566);
bumpGame("dictation", 59, 572);
bumpGame("telephone", 56, 529);
bumpGame("word-scramble", 56, 531);
save(manPath, man);

// vocab pack note bump
const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+personality-character 12 (성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다·소심하다·용감하다·겸손하다·엄격하다) 2026-07-27. Distinct from emotion mood · habit 부지런하다·게으르다 · friends 친하다 · rules 예의 · senses 조용하다·밝다 · favor 고맙다 · celebration 축하 · opinion 칭찬하다·비판하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 겸손하다·엄격하다 residual · Prefer-adjacent 소심하다·용감하다 on tel/scramble · Suggest ThemeSm51c close · themes personality · chip 성격/性格. Existing packs kept (incl. friends-social sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "personality-character");
if (pack) {
  pack.note =
    "Everyday personality / kind / sincere / lively / frank / confidence / warm / meticulous / shy / brave / humble / strict survival — distinct from emotion mood · habit 부지런하다·게으르다 · friends 친하다 · rules 예의 · senses 조용하다·밝다 · favor 고맙다 · celebration 축하 · opinion 칭찬하다·비판하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Suggest ThemeSm51c close · themes personality · chip 성격/性格.";
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
    (i.tags || []).includes("personality")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "personalityTagged=" + n,
    "themes.personality=" + d.themes.includes("personality")
  );
}
console.log("manifest", man.version);

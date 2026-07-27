/**
 * ThemeSm55d — encourage-support → particle/dictation +10 · tel/scramble +8
 * Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 on tel/scramble
 * Run: node hub/ops/qa/_patch-encourage-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-597")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-597",
    pair: "object",
    template: "격려{0} 받아요",
    answer: "를",
    full: "격려를 받아요",
    gloss: {
      en: "I receive encouragement",
      ko: "목적격 · 모음 뒤 를 · 격려",
      zh: "得到鼓励",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-598",
    pair: "subject",
    template: "위로{0} 필요해요",
    answer: "가",
    full: "위로가 필요해요",
    gloss: {
      en: "I need comfort",
      ko: "주격 · 모음 뒤 가 · 위로",
      zh: "需要安慰",
    },
    tags: ["subject", "encourage", "intermediate"],
  },
  {
    id: "ps-599",
    pair: "object",
    template: "격려{0} 전해요",
    answer: "를",
    full: "격려를 전해요",
    gloss: {
      en: "I pass on encouragement",
      ko: "목적격 · 모음 뒤 를 · 격려하다",
      zh: "传达鼓励",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-600",
    pair: "object",
    template: "위로{0} 들어요",
    answer: "를",
    full: "위로를 들어요",
    gloss: {
      en: "I hear words of comfort",
      ko: "목적격 · 모음 뒤 를 · 위로",
      zh: "听到安慰",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-601",
    pair: "object",
    template: "후배{0} 격려해요",
    answer: "를",
    full: "후배를 격려해요",
    gloss: {
      en: "I encourage a junior",
      ko: "목적격 · 모음 뒤 를 · 격려하다",
      zh: "鼓励后辈",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-602",
    pair: "object",
    template: "실망한 친구{0} 위로해요",
    answer: "를",
    full: "실망한 친구를 위로해요",
    gloss: {
      en: "I comfort a disappointed friend",
      ko: "목적격 · 모음 뒤 를 · 위로하다",
      zh: "安慰失望的朋友",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-603",
    pair: "object",
    template: "이웃{0} 배려해요",
    answer: "을",
    full: "이웃을 배려해요",
    gloss: {
      en: "I am considerate of neighbors",
      ko: "목적격 · 받침 뒤 을 · 배려하다",
      zh: "体贴邻居",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-604",
    pair: "subject",
    template: "든든한 버팀{0} 있어요",
    answer: "이",
    full: "든든한 버팀이 있어요",
    gloss: {
      en: "There is a reliable support",
      ko: "주격 · 받침 뒤 이 · 든든하다",
      zh: "有可靠的依靠",
    },
    tags: ["subject", "encourage", "intermediate"],
  },
  {
    id: "ps-605",
    pair: "object",
    template: "소식{0} 듣고 안심해요",
    answer: "을",
    full: "소식을 듣고 안심해요",
    gloss: {
      en: "I feel at ease after hearing the news",
      ko: "목적격 · 받침 뒤 을 · 안심하다",
      zh: "听到消息后放心",
    },
    tags: ["object", "encourage", "intermediate"],
  },
  {
    id: "ps-606",
    pair: "object",
    template: "친구{0} 의지해요",
    answer: "를",
    full: "친구를 의지해요",
    gloss: {
      en: "I rely on a friend",
      ko: "목적격 · 모음 뒤 를 · 의지하다",
      zh: "依靠朋友",
    },
    tags: ["object", "encourage", "intermediate"],
  }
);
particle.version = 61;
ensureTheme(particle, "encourage");
particle.updated = "2026-07-27";
particle.note =
  "+10 encourage-support particle (ps-597–606, 2026-07-27): Prefer 격려·위로 residual · 격려하다·위로하다·배려하다·든든하다·안심하다·의지하다. Skip 응원·지지 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (따뜻한 위로를 건네요·짧은 격려가 힘이 돼요…) · listen hosts · personality 배려가 고마워요. Distinct advice/favor/success/opinion/emotion/friends. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm55d close (전 8 encourage chip). Prior advice ps-587–596 kept.";
if (particle.copyright && !particle.copyright.includes("encourage-support")) {
  particle.copyright = particle.copyright.replace(
    "advice-counsel crossfill",
    "advice-counsel/encourage-support crossfill"
  );
  if (!particle.copyright.includes("encourage-support")) {
    particle.copyright = particle.copyright.replace(
      "success-challenge/advice-counsel crossfill",
      "success-challenge/advice-counsel/encourage-support crossfill"
    );
  }
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-603")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-603",
    text: "격려를 받아요",
    roman: "gyeongnyeoreul badayo",
    gloss: { en: "I receive encouragement", ko: "격려", zh: "得到鼓励" },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-604",
    text: "위로가 필요해요",
    roman: "wiroga piryohaeyo",
    gloss: {
      en: "I need comfort",
      ko: "위로",
      zh: "需要安慰",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-605",
    text: "격려를 전해요",
    roman: "gyeongnyeoreul jeonhaeyo",
    gloss: {
      en: "I pass on encouragement",
      ko: "격려하다",
      zh: "传达鼓励",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-606",
    text: "위로를 들어요",
    roman: "wiroreul deureoyo",
    gloss: {
      en: "I hear words of comfort",
      ko: "위로",
      zh: "听到安慰",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-607",
    text: "후배를 격려해요",
    roman: "hubaereul gyeongnyeohaeyo",
    gloss: {
      en: "I encourage a junior",
      ko: "격려하다",
      zh: "鼓励后辈",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-608",
    text: "실망한 친구를 위로해요",
    roman: "silmanghan chingureul wirohaeyo",
    gloss: {
      en: "I comfort a disappointed friend",
      ko: "위로하다",
      zh: "安慰失望的朋友",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-609",
    text: "이웃을 배려해요",
    roman: "iuseul baeryeohaeyo",
    gloss: {
      en: "I am considerate of neighbors",
      ko: "배려하다",
      zh: "体贴邻居",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-610",
    text: "든든한 버팀이 있어요",
    roman: "deundeunhan beotimi isseoyo",
    gloss: {
      en: "There is a reliable support",
      ko: "든든하다",
      zh: "有可靠的依靠",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-611",
    text: "소식을 듣고 안심해요",
    roman: "sosigeul deutgo ansimhaeyo",
    gloss: {
      en: "I feel at ease after hearing the news",
      ko: "안심하다",
      zh: "听到消息后放心",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "d-612",
    text: "친구를 의지해요",
    roman: "chingureul uijihaeyo",
    gloss: {
      en: "I rely on a friend",
      ko: "의지하다",
      zh: "依靠朋友",
    },
    tags: ["encourage", "intermediate"],
  }
);
dictation.version = 63;
ensureTheme(dictation, "encourage");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 encourage-support dictation (d-603–612, 2026-07-27): Prefer 격려·위로 residual · 격려하다·위로하다·배려하다·든든하다·안심하다·의지하다. Skip 응원·지지 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · personality 배려가 고마워요. Distinct advice/favor/success/opinion/emotion/friends. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm55d close (전 8 encourage chip). Prior advice d-593–602 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-554")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-554",
    text: "격려를 받아요",
    gloss: { en: "I receive encouragement", ko: "격려", zh: "得到鼓励" },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-555",
    text: "위로가 필요해요",
    gloss: {
      en: "I need comfort",
      ko: "위로",
      zh: "需要安慰",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-556",
    text: "응원이 필요해요",
    gloss: {
      en: "I need cheering",
      ko: "응원",
      zh: "需要加油",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-557",
    text: "지지를 구해요",
    gloss: {
      en: "I look for support",
      ko: "지지",
      zh: "寻求支持",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-558",
    text: "후배를 격려해요",
    gloss: {
      en: "I encourage a junior",
      ko: "격려하다",
      zh: "鼓励后辈",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-559",
    text: "이웃을 배려해요",
    gloss: {
      en: "I am considerate of neighbors",
      ko: "배려하다",
      zh: "体贴邻居",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-560",
    text: "든든한 버팀이 있어요",
    gloss: {
      en: "There is a reliable support",
      ko: "든든하다",
      zh: "有可靠的依靠",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "tel-561",
    text: "친구를 의지해요",
    gloss: {
      en: "I rely on a friend",
      ko: "의지하다",
      zh: "依靠朋友",
    },
    tags: ["encourage", "intermediate"],
  }
);
tel.version = 60;
ensureTheme(tel, "encourage");
tel.updated = "2026-07-27";
tel.note =
  "+8 encourage-support telephone (tel-554–561, 2026-07-27): Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 · 격려하다·배려하다·든든하다·의지하다. Skip 위로하다·안심하다·격려를 전해요 (particle/dictation). Distinct from cloze/listen hosts (짧은 응원을 보내요·따뜻한 지지를 받아요) · sports 선수를 응원해요. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm55d close. Prior advice tel-546–553 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-556")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-556",
    tokens: ["격려를", "받아요"],
    full: "격려를 받아요",
    gloss: { en: "I receive encouragement", ko: "격려", zh: "得到鼓励" },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-557",
    tokens: ["위로가", "필요해요"],
    full: "위로가 필요해요",
    gloss: {
      en: "I need comfort",
      ko: "위로",
      zh: "需要安慰",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-558",
    tokens: ["응원이", "필요해요"],
    full: "응원이 필요해요",
    gloss: {
      en: "I need cheering",
      ko: "응원",
      zh: "需要加油",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-559",
    tokens: ["지지를", "구해요"],
    full: "지지를 구해요",
    gloss: {
      en: "I look for support",
      ko: "지지",
      zh: "寻求支持",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-560",
    tokens: ["후배를", "격려해요"],
    full: "후배를 격려해요",
    gloss: {
      en: "I encourage a junior",
      ko: "격려하다",
      zh: "鼓励后辈",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-561",
    tokens: ["이웃을", "배려해요"],
    full: "이웃을 배려해요",
    gloss: {
      en: "I am considerate of neighbors",
      ko: "배려하다",
      zh: "体贴邻居",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-562",
    tokens: ["든든한", "버팀이", "있어요"],
    full: "든든한 버팀이 있어요",
    gloss: {
      en: "There is a reliable support",
      ko: "든든하다",
      zh: "有可靠的依靠",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "ws-563",
    tokens: ["친구를", "의지해요"],
    full: "친구를 의지해요",
    gloss: {
      en: "I rely on a friend",
      ko: "의지하다",
      zh: "依靠朋友",
    },
    tags: ["encourage", "intermediate"],
  }
);
ws.version = 60;
ensureTheme(ws, "encourage");
ws.updated = "2026-07-27";
ws.note =
  "+8 encourage-support scramble (ws-556–563, 2026-07-27): Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 · 격려하다·배려하다·든든하다·의지하다. Skip 위로하다·안심하다·격려를 전해요 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm55d close. Prior advice ws-548–555 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 240;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 657 · listen-match 624 · speed 610 · telephone 561 · scramble 563 · dictation 612 · cloze 602 · particle 606. +encourage-support particle/dictation +10 · tel/scramble +8 (ps-597–606 · d-603–612 · tel-554–561 · ws-556–563) · themes encourage · encourageTagged 10×6 + 8×2 · Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 on tel/scramble · chip KO 격려 / ZH 鼓励 · ThemeSm55d close. Prior bingo/listen bg-648–657 · lm-615–624 · ThemeSm55b kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 61, 606);
bumpGame("dictation", 63, 612);
bumpGame("telephone", 60, 561);
bumpGame("word-scramble", 60, 563);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+encourage-support 12 (격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로) 2026-07-27. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 on tel/scramble · Suggest ThemeSm55d close · themes encourage · chip 격려/鼓励. Existing packs kept (incl. advice-counsel sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "encourage-support");
if (pack) {
  pack.note =
    "Everyday encourage / cheer / support / comfort / rely / care / feel secure / feel relief / cheer-noun / support-noun / encourage-noun / comfort-noun survival — distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 격려·위로 residual · Prefer-adjacent 응원·지지 on tel/scramble · Suggest ThemeSm55d close · themes encourage · chip 격려/鼓励 · ThemeSm55c.";
}
save(vocabPath, vocab);

// Update prior bank notes that still Suggest particle
for (const [rel, needle, repl] of [
  [
    "hub/app/data/games/cloze-beginner.json",
    "Suggest particle/dictation(+tel/scramble).",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm55d close.",
  ],
  [
    "hub/app/data/games/speed-quiz-beginner.json",
    "Suggest particle/dictation(+tel/scramble)",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm55d close",
  ],
  [
    "hub/app/data/games/bingo-beginner.json",
    "Suggest particle/dictation(+tel/scramble)",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm55d close",
  ],
  [
    "hub/app/data/games/listen-match-beginner.json",
    "Suggest particle/dictation(+tel/scramble).",
    "Particle/dictation(+tel/scramble) Done · Suggest ThemeSm55d close.",
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
    (i.tags || []).includes("encourage")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "encourageTagged=" + n,
    "themes.encourage=" + d.themes.includes("encourage")
  );
}
console.log("manifest", man.version);

/**
 * ThemeSm54d — advice-counsel → particle/dictation +10 · tel/scramble +8
 * Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 on tel/scramble
 * Run: node hub/ops/qa/_patch-advice-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-587")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-587",
    pair: "object",
    template: "조언{0} 적어요",
    answer: "을",
    full: "조언을 적어요",
    gloss: {
      en: "I write down the advice",
      ko: "목적격 · 받침 뒤 을 · 조언",
      zh: "记下建议",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-588",
    pair: "subject",
    template: "상담{0} 있어요",
    answer: "이",
    full: "상담이 있어요",
    gloss: {
      en: "There is a consultation",
      ko: "주격 · 받침 뒤 이 · 상담",
      zh: "有咨询",
    },
    tags: ["subject", "advice", "intermediate"],
  },
  {
    id: "ps-589",
    pair: "object",
    template: "짧은 조언{0} 구해요",
    answer: "을",
    full: "짧은 조언을 구해요",
    gloss: {
      en: "I look for brief advice",
      ko: "목적격 · 받침 뒤 을 · 조언하다",
      zh: "寻求简短建议",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-590",
    pair: "object",
    template: "회의 제안{0} 받아요",
    answer: "을",
    full: "회의 제안을 받아요",
    gloss: {
      en: "I receive a meeting proposal",
      ko: "목적격 · 받침 뒤 을 · 제안하다",
      zh: "收到会议提议",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-591",
    pair: "object",
    template: "상담{0} 예약해요",
    answer: "을",
    full: "상담을 예약해요",
    gloss: {
      en: "I book a consultation",
      ko: "목적격 · 받침 뒤 을 · 상담하다",
      zh: "预约咨询",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-592",
    pair: "object",
    template: "가격 문의{0} 해요",
    answer: "를",
    full: "가격 문의를 해요",
    gloss: {
      en: "I make a price inquiry",
      ko: "목적격 · 모음 뒤 를 · 문의하다",
      zh: "询问价格",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-593",
    pair: "object",
    template: "짧은 휴식{0} 권해요",
    answer: "을",
    full: "짧은 휴식을 권해요",
    gloss: {
      en: "I urge a short rest",
      ko: "목적격 · 받침 뒤 을 · 권하다",
      zh: "劝短暂休息",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-594",
    pair: "object",
    template: "충고{0} 기억해요",
    answer: "를",
    full: "충고를 기억해요",
    gloss: {
      en: "I remember the counsel",
      ko: "목적격 · 모음 뒤 를 · 충고하다",
      zh: "记住忠告",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-595",
    pair: "object",
    template: "새 정보{0} 찾아요",
    answer: "를",
    full: "새 정보를 찾아요",
    gloss: {
      en: "I look for new information",
      ko: "목적격 · 모음 뒤 를 · 정보",
      zh: "寻找新信息",
    },
    tags: ["object", "advice", "intermediate"],
  },
  {
    id: "ps-596",
    pair: "object",
    template: "출발 시간{0} 알려 줘요",
    answer: "을",
    full: "출발 시간을 알려 줘요",
    gloss: {
      en: "Please let me know the departure time",
      ko: "목적격 · 받침 뒤 을 · 알려주다",
      zh: "请告知出发时间",
    },
    tags: ["object", "advice", "intermediate"],
  }
);
particle.version = 60;
ensureTheme(particle, "advice");
particle.updated = "2026-07-27";
particle.note =
  "+10 advice-counsel particle (ps-587–596, 2026-07-27): Prefer 조언·상담 residual · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다. Skip 답변·안내하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (선배 조언 메모·오늘 상담이 길어요…) · listen hosts · speech 조언을 잘 들어요. Distinct opinion/speech/favor/success. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm54d close (전 8 advice chip). Prior success ps-577–586 kept.";
if (particle.copyright && !particle.copyright.includes("advice-counsel")) {
  particle.copyright = particle.copyright.replace(
    "success-challenge crossfill",
    "success-challenge/advice-counsel crossfill"
  );
  if (!particle.copyright.includes("advice-counsel")) {
    particle.copyright = particle.copyright.replace(
      "apology-politeness/success-challenge crossfill",
      "apology-politeness/success-challenge/advice-counsel crossfill"
    );
  }
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-593")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-593",
    text: "조언을 적어요",
    roman: "joeooneul jeogeoyo",
    gloss: { en: "I write down the advice", ko: "조언", zh: "记下建议" },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-594",
    text: "상담이 있어요",
    roman: "sangdami isseoyo",
    gloss: {
      en: "There is a consultation",
      ko: "상담",
      zh: "有咨询",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-595",
    text: "짧은 조언을 구해요",
    roman: "jjalbeun joeoneul guhaeyo",
    gloss: {
      en: "I look for brief advice",
      ko: "조언하다",
      zh: "寻求简短建议",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-596",
    text: "회의 제안을 받아요",
    roman: "hoeui jeaneul badayo",
    gloss: {
      en: "I receive a meeting proposal",
      ko: "제안하다",
      zh: "收到会议提议",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-597",
    text: "상담을 예약해요",
    roman: "sangdameul yeyakhaeyo",
    gloss: {
      en: "I book a consultation",
      ko: "상담하다",
      zh: "预约咨询",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-598",
    text: "가격 문의를 해요",
    roman: "gagyeok munireul haeyo",
    gloss: {
      en: "I make a price inquiry",
      ko: "문의하다",
      zh: "询问价格",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-599",
    text: "짧은 휴식을 권해요",
    roman: "jjalbeun hyusigeul gwonhaeyo",
    gloss: {
      en: "I urge a short rest",
      ko: "권하다",
      zh: "劝短暂休息",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-600",
    text: "충고를 기억해요",
    roman: "chunggoreul gieokhaeyo",
    gloss: {
      en: "I remember the counsel",
      ko: "충고하다",
      zh: "记住忠告",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-601",
    text: "새 정보를 찾아요",
    roman: "sae jeongboreul chajayo",
    gloss: {
      en: "I look for new information",
      ko: "정보",
      zh: "寻找新信息",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "d-602",
    text: "출발 시간을 알려 줘요",
    roman: "chulbal siganeul allyeo jwoyo",
    gloss: {
      en: "Please let me know the departure time",
      ko: "알려주다",
      zh: "请告知出发时间",
    },
    tags: ["advice", "intermediate"],
  }
);
dictation.version = 62;
ensureTheme(dictation, "advice");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 advice-counsel dictation (d-593–602, 2026-07-27): Prefer 조언·상담 residual · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다. Skip 답변·안내하다 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · speech 조언을 잘 들어요. Distinct opinion/speech/favor/success. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm54d close (전 8 advice chip). Prior success d-583–592 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-546")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-546",
    text: "조언을 적어요",
    gloss: { en: "I write down the advice", ko: "조언", zh: "记下建议" },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-547",
    text: "상담이 있어요",
    gloss: {
      en: "There is a consultation",
      ko: "상담",
      zh: "有咨询",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-548",
    text: "답변을 기다려요",
    gloss: {
      en: "I wait for a reply",
      ko: "답변",
      zh: "等待答复",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-549",
    text: "자리를 안내해요",
    gloss: {
      en: "I show them to their seats",
      ko: "안내하다",
      zh: "引导入座",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-550",
    text: "회의 제안을 받아요",
    gloss: {
      en: "I receive a meeting proposal",
      ko: "제안하다",
      zh: "收到会议提议",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-551",
    text: "가격 문의를 해요",
    gloss: {
      en: "I make a price inquiry",
      ko: "문의하다",
      zh: "询问价格",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-552",
    text: "충고를 기억해요",
    gloss: {
      en: "I remember the counsel",
      ko: "충고하다",
      zh: "记住忠告",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "tel-553",
    text: "새 정보를 찾아요",
    gloss: {
      en: "I look for new information",
      ko: "정보",
      zh: "寻找新信息",
    },
    tags: ["advice", "intermediate"],
  }
);
tel.version = 59;
ensureTheme(tel, "advice");
tel.updated = "2026-07-27";
tel.note =
  "+8 advice-counsel telephone (tel-546–553, 2026-07-27): Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 · 제안하다·문의하다·충고하다·정보. Skip 조언하다·상담하다·권하다·알려주다 (particle/dictation). Distinct from cloze/listen hosts (짧은 답변을 보내요·교실 위치를 안내해요). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm54d close. Prior success tel-538–545 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-548")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-548",
    tokens: ["조언을", "적어요"],
    full: "조언을 적어요",
    gloss: { en: "I write down the advice", ko: "조언", zh: "记下建议" },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-549",
    tokens: ["상담이", "있어요"],
    full: "상담이 있어요",
    gloss: {
      en: "There is a consultation",
      ko: "상담",
      zh: "有咨询",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-550",
    tokens: ["답변을", "기다려요"],
    full: "답변을 기다려요",
    gloss: {
      en: "I wait for a reply",
      ko: "답변",
      zh: "等待答复",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-551",
    tokens: ["자리를", "안내해요"],
    full: "자리를 안내해요",
    gloss: {
      en: "I show them to their seats",
      ko: "안내하다",
      zh: "引导入座",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-552",
    tokens: ["회의", "제안을", "받아요"],
    full: "회의 제안을 받아요",
    gloss: {
      en: "I receive a meeting proposal",
      ko: "제안하다",
      zh: "收到会议提议",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-553",
    tokens: ["가격", "문의를", "해요"],
    full: "가격 문의를 해요",
    gloss: {
      en: "I make a price inquiry",
      ko: "문의하다",
      zh: "询问价格",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-554",
    tokens: ["충고를", "기억해요"],
    full: "충고를 기억해요",
    gloss: {
      en: "I remember the counsel",
      ko: "충고하다",
      zh: "记住忠告",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "ws-555",
    tokens: ["새", "정보를", "찾아요"],
    full: "새 정보를 찾아요",
    gloss: {
      en: "I look for new information",
      ko: "정보",
      zh: "寻找新信息",
    },
    tags: ["advice", "intermediate"],
  }
);
ws.version = 59;
ensureTheme(ws, "advice");
ws.updated = "2026-07-27";
ws.note =
  "+8 advice-counsel scramble (ws-548–555, 2026-07-27): Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 · 제안하다·문의하다·충고하다·정보. Skip 조언하다·상담하다·권하다·알려주다 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm54d close. Prior success ws-540–547 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 236;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 647 · listen-match 614 · speed 600 · telephone 553 · scramble 555 · dictation 602 · cloze 592 · particle 596. +advice-counsel particle/dictation +10 · tel/scramble +8 (ps-587–596 · d-593–602 · tel-546–553 · ws-548–555) · themes advice · adviceTagged 10×6 + 8×2 · Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 on tel/scramble · chip KO 조언 / ZH 建议 · ThemeSm54d close. Prior bingo/listen bg-638–647 · lm-605–614 · ThemeSm54c kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 60, 596);
bumpGame("dictation", 62, 602);
bumpGame("telephone", 59, 553);
bumpGame("word-scramble", 59, 555);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+advice-counsel 12 (조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다·조언·상담) 2026-07-27. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 on tel/scramble · Suggest ThemeSm54d close · themes advice · chip 조언/建议. Existing packs kept (incl. success-challenge sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "advice-counsel");
if (pack) {
  pack.note =
    "Everyday advise / suggest / consult / inquire / urge / admonish / info / inform / reply / guide / advice / counseling survival — distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success · housing 문의(n). Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 조언·상담 residual · Prefer-adjacent 답변·안내하다 on tel/scramble · Suggest ThemeSm54d close · themes advice · chip 조언/建议.";
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
    (i.tags || []).includes("advice")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "adviceTagged=" + n,
    "themes.advice=" + d.themes.includes("advice")
  );
}
console.log("manifest", man.version);

/**
 * ThemeSm50d prep — friends-social → particle/dictation +10 · tel/scramble +8
 * Prefer 사귀다 residual · Prefer-adjacent 반갑다·가깝다 on tel/scramble
 * Run: node hub/ops/qa/_patch-friends-particle-dictation.js
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
if (particle.items.some((i) => i.id === "ps-547")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-547",
    pair: "object",
    template: "친구{0} 사귀어요",
    answer: "를",
    full: "친구를 사귀어요",
    gloss: {
      en: "I make friends",
      ko: "목적격 · 받침 없음 를 · 사귀다",
      zh: "交朋友",
    },
    tags: ["object", "friends", "intermediate"],
  },
  {
    id: "ps-548",
    pair: "subject",
    template: "친구{0} 많아요",
    answer: "가",
    full: "친구가 많아요",
    gloss: {
      en: "There are many friends",
      ko: "주격 · 받침 없음 가 · 친구",
      zh: "朋友很多",
    },
    tags: ["subject", "friends", "intermediate"],
  },
  {
    id: "ps-549",
    pair: "topic",
    template: "사이{0} 친해요",
    answer: "는",
    full: "사이는 친해요",
    gloss: {
      en: "As for the relationship, it is close",
      ko: "주제 · 받침 없음 는 · 친하다",
      zh: "关系很熟",
    },
    tags: ["topic", "friends", "intermediate"],
  },
  {
    id: "ps-550",
    pair: "object",
    template: "하루{0} 함께 보내요",
    answer: "를",
    full: "하루를 함께 보내요",
    gloss: {
      en: "We spend the day together",
      ko: "목적격 · 받침 없음 를 · 함께",
      zh: "一起度过一天",
    },
    tags: ["object", "friends", "intermediate"],
  },
  {
    id: "ps-551",
    pair: "object",
    template: "점심{0} 혼자 먹어요",
    answer: "을",
    full: "점심을 혼자 먹어요",
    gloss: {
      en: "I eat lunch alone",
      ko: "목적격 · 받침 뒤 을 · 혼자",
      zh: "一个人吃午饭",
    },
    tags: ["object", "friends", "intermediate"],
  },
  {
    id: "ps-552",
    pair: "subject",
    template: "사람들{0} 모여요",
    answer: "이",
    full: "사람들이 모여요",
    gloss: {
      en: "People gather",
      ko: "주격 · 받침 뒤 이 · 모이다",
      zh: "人们聚集",
    },
    tags: ["subject", "friends", "intermediate"],
  },
  {
    id: "ps-553",
    pair: "subject",
    template: "동아리{0} 있어요",
    answer: "가",
    full: "동아리가 있어요",
    gloss: {
      en: "There is a club",
      ko: "주격 · 받침 없음 가 · 동아리",
      zh: "有社团",
    },
    tags: ["subject", "friends", "intermediate"],
  },
  {
    id: "ps-554",
    pair: "object",
    template: "소식{0} 나눠요",
    answer: "을",
    full: "소식을 나눠요",
    gloss: {
      en: "We share news",
      ko: "목적격 · 받침 뒤 을 · 나누다",
      zh: "分享消息",
    },
    tags: ["object", "friends", "intermediate"],
  },
  {
    id: "ps-555",
    pair: "object",
    template: "카드{0} 같이 놀아요",
    answer: "를",
    full: "카드를 같이 놀아요",
    gloss: {
      en: "We play cards together",
      ko: "목적격 · 받침 없음 를 · 놀다",
      zh: "一起玩牌",
    },
    tags: ["object", "friends", "intermediate"],
  },
  {
    id: "ps-556",
    pair: "subject",
    template: "방문{0} 즐거워요",
    answer: "이",
    full: "방문이 즐거워요",
    gloss: {
      en: "The visit is pleasant",
      ko: "주격 · 받침 뒤 이 · 방문",
      zh: "拜访很愉快",
    },
    tags: ["subject", "friends", "intermediate"],
  }
);
particle.version = 56;
ensureTheme(particle, "friends");
particle.updated = "2026-07-27";
particle.note =
  (particle.note || "") +
  " · friends-social +10 (ps-547–556) Prefer 사귀다 residual · themes friends · friendsTagged 10";
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-553")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-553",
    text: "친구를 사귀어요",
    roman: "chingureul sagwieoyo",
    gloss: { en: "I make friends", ko: "사귀다", zh: "交朋友" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-554",
    text: "친구가 많아요",
    roman: "chinguga manayo",
    gloss: { en: "There are many friends", ko: "친구", zh: "朋友很多" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-555",
    text: "사이는 친해요",
    roman: "saineun chinhaeyo",
    gloss: {
      en: "As for the relationship, it is close",
      ko: "친하다",
      zh: "关系很熟",
    },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-556",
    text: "하루를 함께 보내요",
    roman: "harureul hamkke bonaeyo",
    gloss: { en: "We spend the day together", ko: "함께", zh: "一起度过一天" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-557",
    text: "점심을 혼자 먹어요",
    roman: "jeomsimeul honja meogeoyo",
    gloss: { en: "I eat lunch alone", ko: "혼자", zh: "一个人吃午饭" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-558",
    text: "사람들이 모여요",
    roman: "saramdeuri moyeoyo",
    gloss: { en: "People gather", ko: "모이다", zh: "人们聚集" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-559",
    text: "동아리가 있어요",
    roman: "dongariga isseoyo",
    gloss: { en: "There is a club", ko: "동아리", zh: "有社团" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-560",
    text: "소식을 나눠요",
    roman: "sosigeul nanwoyo",
    gloss: { en: "We share news", ko: "나누다", zh: "分享消息" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-561",
    text: "카드를 같이 놀아요",
    roman: "kadeureul gachi norayo",
    gloss: { en: "We play cards together", ko: "놀다", zh: "一起玩牌" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "d-562",
    text: "방문이 즐거워요",
    roman: "bangmuni jeulgeowoyo",
    gloss: { en: "The visit is pleasant", ko: "방문", zh: "拜访很愉快" },
    tags: ["friends", "intermediate"],
  }
);
dictation.version = 58;
ensureTheme(dictation, "friends");
dictation.updated = "2026-07-27";
dictation.note =
  (dictation.note || "") +
  " · friends-social +10 (d-553–562) Prefer 사귀다 residual · themes friends · friendsTagged 10";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-514")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-514",
    text: "친구를 사귀어요",
    gloss: { en: "I make friends", ko: "사귀다", zh: "交朋友" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-515",
    text: "정말 반가워요",
    gloss: {
      en: "I am really glad to see you",
      ko: "반갑다",
      zh: "真的很高兴见你",
    },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-516",
    text: "정이 가까워요",
    gloss: { en: "Our feelings are close", ko: "가깝다", zh: "感情很近" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-517",
    text: "함께 공부해요",
    gloss: { en: "We study together", ko: "함께", zh: "一起学习" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-518",
    text: "혼자 먹어요",
    gloss: { en: "I eat alone", ko: "혼자", zh: "一个人吃" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-519",
    text: "동아리에 가요",
    gloss: { en: "I go to the club", ko: "동아리", zh: "去社团" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-520",
    text: "이야기를 나눠요",
    gloss: { en: "We share a conversation", ko: "나누다", zh: "分享谈话" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "tel-521",
    text: "주말에 놀아요",
    gloss: { en: "We hang out on the weekend", ko: "놀다", zh: "周末玩" },
    tags: ["friends", "intermediate"],
  }
);
tel.version = 55;
ensureTheme(tel, "friends");
tel.updated = "2026-07-27";
tel.note =
  (tel.note || "") +
  " · friends-social +8 (tel-514–521) Prefer 사귀다 + 반갑다·가깝다 adjacent · themes friends · friendsTagged 8";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-516")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-516",
    tokens: ["친구를", "사귀어요"],
    full: "친구를 사귀어요",
    gloss: { en: "I make friends", ko: "사귀다", zh: "交朋友" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-517",
    tokens: ["정말", "반가워요"],
    full: "정말 반가워요",
    gloss: {
      en: "I am really glad to see you",
      ko: "반갑다",
      zh: "真的很高兴见你",
    },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-518",
    tokens: ["정이", "가까워요"],
    full: "정이 가까워요",
    gloss: { en: "Our feelings are close", ko: "가깝다", zh: "感情很近" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-519",
    tokens: ["함께", "공부해요"],
    full: "함께 공부해요",
    gloss: { en: "We study together", ko: "함께", zh: "一起学习" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-520",
    tokens: ["혼자", "먹어요"],
    full: "혼자 먹어요",
    gloss: { en: "I eat alone", ko: "혼자", zh: "一个人吃" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-521",
    tokens: ["동아리에", "가요"],
    full: "동아리에 가요",
    gloss: { en: "I go to the club", ko: "동아리", zh: "去社团" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-522",
    tokens: ["이야기를", "나눠요"],
    full: "이야기를 나눠요",
    gloss: { en: "We share a conversation", ko: "나누다", zh: "分享谈话" },
    tags: ["friends", "intermediate"],
  },
  {
    id: "ws-523",
    tokens: ["주말에", "놀아요"],
    full: "주말에 놀아요",
    gloss: { en: "We hang out on the weekend", ko: "놀다", zh: "周末玩" },
    tags: ["friends", "intermediate"],
  }
);
ws.version = 55;
ensureTheme(ws, "friends");
ws.updated = "2026-07-27";
ws.note =
  (ws.note || "") +
  " · friends-social +8 (ws-516–523) Prefer 사귀다 + 반갑다·가깝다 adjacent · themes friends · friendsTagged 8";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 220;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 607 · listen-match 574 · speed 560 · telephone 521 · scramble 523 · dictation 562 · cloze 552 · particle 556. +friends-social particle/dictation +10 · tel/scramble +8 (ps-547–556 · d-553–562 · tel-514–521 · ws-516–523) · themes friends · friendsTagged 10/10/8/8 · Prefer 사귀다 residual · Prefer-adjacent 반갑다·가깝다 on tel/scramble · Skip 반갑다·가깝다 bingo Done · chip KO 친구 / ZH 朋友. Prior bingo/listen bg-598–607 · lm-565–574 · ThemeSm50c kept. Suggest ThemeSm50d close. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 56, 556);
bumpGame("dictation", 58, 562);
bumpGame("telephone", 55, 521);
bumpGame("word-scramble", 55, 523);
save(manPath, man);

for (const [label, file] of [
  ["particle", particlePath],
  ["dictation", dictationPath],
  ["tel", telPath],
  ["scramble", wsPath],
]) {
  const d = load(file);
  const n = (d.items || []).filter((i) => (i.tags || []).includes("friends"))
    .length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "friendsTagged=" + n,
    "themes.friends=" + d.themes.includes("friends")
  );
}
console.log("manifest", man.version);

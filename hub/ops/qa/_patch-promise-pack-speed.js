/**
 * Offline loop: promise-trust pack + speed-quiz +10
 * Run: node hub/ops/qa/_patch-promise-pack-speed.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");

function writeJson(rel, obj) {
  fs.writeFileSync(
    path.join(ROOT, rel),
    JSON.stringify(obj, null, 2) + "\n",
    "utf8"
  );
}

const packPath = "app/data/vocab/jabi-theme-packs-intermediate.json";
const p = JSON.parse(fs.readFileSync(path.join(ROOT, packPath), "utf8"));

if (p.packs.some((x) => x.id === "promise-trust")) {
  console.error("promise-trust already present — abort");
  process.exit(1);
}

p.version = 62;
p.inspiredBy = p.inspiredBy.replace(
  "encourage-support scenes",
  "encourage-support/promise-trust scenes"
);
p.copyright = p.copyright.replace(
  "Encourage-support pack = generic encourage/cheer/support/comfort terms only (no brand names).",
  "Encourage-support pack = generic encourage/cheer/support/comfort terms only (no brand names). Promise-trust pack = generic promise/trust/doubt/truth terms only (no brand names)."
);
p.note =
  "+promise-trust 12 (약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말) 2026-07-27. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 진실·거짓말 → cloze · Suggest ThemeSm56a · themes promise · chip 약속/约定. Existing packs kept (incl. encourage-support sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";

const newPack = {
  id: "promise-trust",
  title: {
    en: "Promise & trust",
    ko: "약속·신뢰",
    zh: "约定与信任",
  },
  grammarHooks: ["기로 하다", "(으)ㄹ게요", "아/어 주다"],
  note: "Everyday promise / trust / be sure / doubt / deceive / honest / guarantee / prove / trust-noun / doubt-noun / truth / lie survival — distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 진실·거짓말 → cloze · Suggest ThemeSm56a · themes promise · chip 약속/约定.",
  items: [
    {
      id: "int-pr-01",
      lemma: "약속하다",
      pos: "v",
      senseId: "sns:약속하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to promise", ko: "약속하다", zh: "约定；承诺" },
      derived: ["약속"],
      example: {
        ko: "내일 일찍 오겠다고 약속해요.",
        en: "I promise to come early tomorrow.",
        zh: "我约定明天早到。",
      },
    },
    {
      id: "int-pr-02",
      lemma: "신뢰하다",
      pos: "v",
      senseId: "sns:신뢰하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to trust; have confidence in", ko: "신뢰하다", zh: "信任" },
      derived: ["신뢰"],
      example: {
        ko: "저는 그 팀을 신뢰해요.",
        en: "I trust that team.",
        zh: "我信任那个团队。",
      },
    },
    {
      id: "int-pr-03",
      lemma: "확신하다",
      pos: "v",
      senseId: "sns:확신하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to be sure; be convinced", ko: "확신하다", zh: "确信" },
      derived: ["확신"],
      example: {
        ko: "이 방법이 맞다고 확신해요.",
        en: "I'm sure this method is right.",
        zh: "我确信这个方法是对的。",
      },
    },
    {
      id: "int-pr-04",
      lemma: "의심하다",
      pos: "v",
      senseId: "sns:의심하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to doubt; suspect", ko: "의심하다", zh: "怀疑" },
      derived: ["의심"],
      example: {
        ko: "그 말을 조금 의심해요.",
        en: "I doubt those words a little.",
        zh: "我对那句话有点怀疑。",
      },
    },
    {
      id: "int-pr-05",
      lemma: "속이다",
      pos: "v",
      senseId: "sns:속이다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to deceive; trick", ko: "속이다", zh: "欺骗" },
      example: {
        ko: "친구를 속이면 안 돼요.",
        en: "You shouldn't deceive a friend.",
        zh: "不可以欺骗朋友。",
      },
    },
    {
      id: "int-pr-06",
      lemma: "정직하다",
      pos: "adj",
      senseId: "sns:정직하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to be honest", ko: "정직하다", zh: "诚实" },
      derived: ["정직"],
      example: {
        ko: "정직한 사람을 좋아해요.",
        en: "I like honest people.",
        zh: "我喜欢诚实的人。",
      },
    },
    {
      id: "int-pr-07",
      lemma: "보장하다",
      pos: "v",
      senseId: "sns:보장하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to guarantee; assure", ko: "보장하다", zh: "保障；保证" },
      derived: ["보장"],
      example: {
        ko: "품질을 보장해요.",
        en: "We guarantee the quality.",
        zh: "我们保障品质。",
      },
    },
    {
      id: "int-pr-08",
      lemma: "증명하다",
      pos: "v",
      senseId: "sns:증명하다.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "to prove; demonstrate", ko: "증명하다", zh: "证明" },
      derived: ["증명"],
      example: {
        ko: "사실을 증명해야 해요.",
        en: "You have to prove the facts.",
        zh: "必须证明事实。",
      },
    },
    {
      id: "int-pr-09",
      lemma: "신뢰",
      pos: "n",
      senseId: "sns:신뢰.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "trust; confidence (noun)", ko: "신뢰", zh: "信任" },
      example: {
        ko: "서로의 신뢰가 중요해요.",
        en: "Mutual trust is important.",
        zh: "彼此的信任很重要。",
      },
    },
    {
      id: "int-pr-10",
      lemma: "의심",
      pos: "n",
      senseId: "sns:의심.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "doubt; suspicion (noun)", ko: "의심", zh: "怀疑" },
      example: {
        ko: "아직 의심이 남아요.",
        en: "I still have some doubt left.",
        zh: "还有怀疑。",
      },
    },
    {
      id: "int-pr-11",
      lemma: "진실",
      pos: "n",
      senseId: "sns:진실.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "truth; the truth", ko: "진실", zh: "真相；真实" },
      example: {
        ko: "진실을 말해 주세요.",
        en: "Please tell the truth.",
        zh: "请说出真相。",
      },
    },
    {
      id: "int-pr-12",
      lemma: "거짓말",
      pos: "n",
      senseId: "sns:거짓말.1",
      themes: ["promise"],
      levelBand: "int-low",
      gloss: { en: "lie; falsehood", ko: "거짓말", zh: "谎话；谎言" },
      example: {
        ko: "거짓말은 하지 마세요.",
        en: "Please don't tell lies.",
        zh: "请不要说谎。",
      },
    },
  ],
};

p.packs.push(newPack);
writeJson(packPath, p);
console.log(
  "pack promise-trust +12 · v" + p.version + " · packs " + p.packs.length
);

const sqPath = "app/data/games/speed-quiz-beginner.json";
const s = JSON.parse(fs.readFileSync(path.join(ROOT, sqPath), "utf8"));
s.version = 62;
if (!s.themes.includes("promise")) s.themes.push("promise");
s.copyright = s.copyright.replace(
  "advice-counsel/encourage-support crossfill",
  "advice-counsel/encourage-support/promise-trust crossfill"
);

const speedItems = [
  {
    id: "sq-611",
    prompt: { en: "To promise?", ko: "약속하다?", zh: "约定？" },
    choices: ["약속하다", "의심하다", "속이다", "증명하다"],
    answer: 0,
    explain: {
      en: "약속하다 = to promise.",
      ko: "약속하다 = 어떤 일을 하겠다고 정하다.",
      zh: "약속하다 = 约定；承诺。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-612",
    prompt: {
      en: "To trust / have confidence in?",
      ko: "신뢰하다?",
      zh: "信任？",
    },
    choices: ["속이다", "신뢰하다", "의심하다", "거짓말"],
    answer: 1,
    explain: {
      en: "신뢰하다 = to trust / have confidence in.",
      ko: "신뢰하다 = 믿고 의지하다.",
      zh: "신뢰하다 = 信任。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-613",
    prompt: { en: "To be sure / convinced?", ko: "확신하다?", zh: "确信？" },
    choices: ["의심하다", "속이다", "확신하다", "정직하다"],
    answer: 2,
    explain: {
      en: "확신하다 = to be sure / be convinced.",
      ko: "확신하다 = 확실히 믿다.",
      zh: "확신하다 = 确信。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-614",
    prompt: { en: "To doubt / suspect?", ko: "의심하다?", zh: "怀疑？" },
    choices: ["신뢰하다", "의심하다", "보장하다", "약속하다"],
    answer: 1,
    explain: {
      en: "의심하다 = to doubt / suspect.",
      ko: "의심하다 = 믿지 못하고 이상하게 여기다.",
      zh: "의심하다 = 怀疑。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-615",
    prompt: { en: "To deceive / trick?", ko: "속이다?", zh: "欺骗？" },
    choices: ["속이다", "정직하다", "증명하다", "신뢰하다"],
    answer: 0,
    explain: {
      en: "속이다 = to deceive / trick.",
      ko: "속이다 = 사실을 숨기거나 거짓으로 대하다.",
      zh: "속이다 = 欺骗。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-616",
    prompt: { en: "To be honest?", ko: "정직하다?", zh: "诚实？" },
    choices: ["속이다", "의심하다", "정직하다", "보장하다"],
    answer: 2,
    explain: {
      en: "정직하다 = to be honest.",
      ko: "정직하다 = 거짓이 없고 바르다.",
      zh: "정직하다 = 诚实。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-617",
    prompt: { en: "To guarantee / assure?", ko: "보장하다?", zh: "保障？" },
    choices: ["의심하다", "보장하다", "속이다", "확신하다"],
    answer: 1,
    explain: {
      en: "보장하다 = to guarantee / assure.",
      ko: "보장하다 = 문제없이 되게 책임을 지다.",
      zh: "보장하다 = 保障；保证。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-618",
    prompt: { en: "To prove / demonstrate?", ko: "증명하다?", zh: "证明？" },
    choices: ["증명하다", "약속하다", "신뢰하다", "의심하다"],
    answer: 0,
    explain: {
      en: "증명하다 = to prove / demonstrate.",
      ko: "증명하다 = 사실임을 밝히다.",
      zh: "증명하다 = 证明。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-619",
    prompt: {
      en: "Trust / confidence (noun)?",
      ko: "신뢰?",
      zh: "信任？",
    },
    choices: ["의심", "속이다", "신뢰", "정직하다"],
    answer: 2,
    explain: {
      en: "신뢰 = trust / confidence (noun).",
      ko: "신뢰 = 믿고 의지하는 마음.",
      zh: "신뢰 = 信任。",
    },
    tags: ["promise", "intermediate"],
  },
  {
    id: "sq-620",
    prompt: {
      en: "Doubt / suspicion (noun)?",
      ko: "의심?",
      zh: "怀疑？",
    },
    choices: ["신뢰", "의심", "진실", "거짓말"],
    answer: 1,
    explain: {
      en: "의심 = doubt / suspicion (noun).",
      ko: "의심 = 믿지 못하는 마음.",
      zh: "의심 = 怀疑。",
    },
    tags: ["promise", "intermediate"],
  },
];

s.items.push(...speedItems);
s.note =
  "+10 promise-trust MCQ (sq-611–620, 2026-07-27). Pack lemmas 약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심. Prefer 진실·거짓말 → cloze. Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success. NIKL/Sejong·Tammy. No brand names. Prior encourage sq-601–610 kept. Suggest cloze + ThemeSm56a · chip KO 약속 / ZH 约定.";

writeJson(sqPath, s);
console.log(
  "speed +10 promise · v" + s.version + " · items " + s.items.length
);

const canonPath = "app/data/vocab/theme-key-canon.json";
const canon = JSON.parse(fs.readFileSync(path.join(ROOT, canonPath), "utf8"));
if (!canon.themes.some((k) => k.themeKey === "promise")) {
  const encourageIdx = canon.themes.findIndex(
    (k) => k.themeKey === "encourage"
  );
  const entry = {
    themeKey: "promise",
    status: "active",
    chip: { ko: "약속", zh: "约定", en: "Promise" },
    packIds: ["promise-trust"],
    notes:
      "ThemeSm56a speed(+cloze) chip pending (2026-07-27). Distinct from think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success.",
  };
  if (encourageIdx >= 0) canon.themes.splice(encourageIdx + 1, 0, entry);
  else canon.themes.push(entry);
  if (canon.source) {
    canon.source.intermediatePacks = 62;
    canon.source.gamesThemesUnion = (canon.source.gamesThemesUnion || 72) + 1;
  }
  writeJson(canonPath, canon);
  console.log("canon +promise");
}

const manPath = "app/data/games/manifest.json";
const m = JSON.parse(fs.readFileSync(path.join(ROOT, manPath), "utf8"));
m.version = 241;
m.updated = "2026-07-27";
m.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 657 · listen-match 624 · speed 620 · telephone 561 · scramble 563 · dictation 612 · cloze 602 · particle 606. +promise-trust pack 12 + speed +10 (sq-611–620) · themes promise · promiseTagged 10 · Prefer 진실·거짓말 → cloze · chip 제안 KO 약속 / ZH 约定 · Suggest ThemeSm56a. Prior encourage ThemeSm55d close kept. hangul.js untouched.";
const speedGame = m.games.find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 62;
  speedGame.itemCount = 620;
  speedGame.count = 620;
}
writeJson(manPath, m);
console.log("manifest v" + m.version + " · speed 620");

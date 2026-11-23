/**
 * ThemeSm52 prep — apology-politeness 1팩 + speed +10
 * Run: node hub/ops/qa/_patch-apology-politeness.js
 */
const fs = require("fs");

const packPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const speedPath = "hub/app/data/games/speed-quiz-beginner.json";
const manifestPath = "hub/app/data/games/manifest.json";
const beginnerPath = "hub/app/data/vocab/jabi-theme-packs-beginner.json";

const p = JSON.parse(fs.readFileSync(packPath, "utf8"));
const b = JSON.parse(fs.readFileSync(beginnerPath, "utf8"));
const existing = new Set();
for (const pack of [...p.packs, ...b.packs]) {
  for (const it of pack.items) existing.add(it.lemma);
}

const lemmas = [
  "미안하다",
  "죄송하다",
  "사과하다",
  "용서하다",
  "실례하다",
  "감사하다",
  "덕분",
  "수고하다",
  "번거롭다",
  "인사하다",
  "불편하다",
  "공손하다",
];
const overlap = lemmas.filter((l) => existing.has(l));
if (overlap.length) {
  console.error("OVERLAP", overlap);
  process.exit(1);
}
if (p.packs.some((x) => x.id === "apology-politeness")) {
  console.error("pack already exists");
  process.exit(1);
}

const newPack = {
  id: "apology-politeness",
  title: {
    en: "Apology & politeness",
    ko: "사과·예의 표현",
    zh: "道歉与礼貌表达",
  },
  grammarHooks: ["아서/어서 죄송하다", "아/어 주다", "덕분에"],
  note: "Everyday sorry / apologize / forgive / excuse / thank / owing-to / trouble / greet / inconvenient / polite survival — distinct from favor 고맙다 · rules 예의 · friends 인사 장면 분리(방문) · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 번거롭다·공손하다 → cloze · themes apology · chip 미안/抱歉.",
  items: [
    {
      id: "int-ay-01",
      lemma: "미안하다",
      pos: "a",
      gloss: {
        en: "to be sorry; feel bad",
        ko: "미안하다",
        zh: "抱歉；对不起",
      },
      derived: ["미안"],
      example: {
        ko: "늦어서 정말 미안해요.",
        en: "I'm really sorry for being late.",
        zh: "迟到了，真的很抱歉。",
      },
    },
    {
      id: "int-ay-02",
      lemma: "죄송하다",
      pos: "a",
      gloss: {
        en: "to be sorry (formal)",
        ko: "죄송하다",
        zh: "抱歉（正式）",
      },
      derived: ["죄송"],
      example: {
        ko: "기다리게 해서 죄송해요.",
        en: "I'm sorry for making you wait.",
        zh: "让您久等了，很抱歉。",
      },
    },
    {
      id: "int-ay-03",
      lemma: "사과하다",
      pos: "v",
      gloss: {
        en: "to apologize",
        ko: "사과하다",
        zh: "道歉",
      },
      derived: ["사과"],
      example: {
        ko: "실수에 대해 먼저 사과해요.",
        en: "I apologize first for the mistake.",
        zh: "我先为失误道歉。",
      },
    },
    {
      id: "int-ay-04",
      lemma: "용서하다",
      pos: "v",
      gloss: {
        en: "to forgive",
        ko: "용서하다",
        zh: "原谅",
      },
      derived: ["용서"],
      example: {
        ko: "한 번만 용서해 주세요.",
        en: "Please forgive me just once.",
        zh: "请再原谅我一次。",
      },
    },
    {
      id: "int-ay-05",
      lemma: "실례하다",
      pos: "v",
      gloss: {
        en: "to excuse oneself; be rude",
        ko: "실례하다",
        zh: "失礼；借过",
      },
      derived: ["실례"],
      example: {
        ko: "잠깐 실례할게요.",
        en: "Excuse me for a moment.",
        zh: "失陪一下。",
      },
    },
    {
      id: "int-ay-06",
      lemma: "감사하다",
      pos: "v",
      gloss: {
        en: "to thank; be grateful",
        ko: "감사하다",
        zh: "感谢",
      },
      derived: ["감사"],
      example: {
        ko: "도와 주셔서 감사해요.",
        en: "Thank you for helping.",
        zh: "谢谢您帮忙。",
      },
    },
    {
      id: "int-ay-07",
      lemma: "덕분",
      pos: "n",
      gloss: {
        en: "thanks to; owing to",
        ko: "덕분",
        zh: "多亏；托福",
      },
      example: {
        ko: "선생님 덕분에 실력이 늘었어요.",
        en: "Thanks to the teacher, my skills improved.",
        zh: "多亏老师，实力提高了。",
      },
    },
    {
      id: "int-ay-08",
      lemma: "수고하다",
      pos: "v",
      gloss: {
        en: "to work hard; put in effort (polite)",
        ko: "수고하다",
        zh: "辛苦；劳烦",
      },
      derived: ["수고"],
      example: {
        ko: "오늘도 수고하셨어요.",
        en: "Thank you for your hard work today.",
        zh: "今天也辛苦了。",
      },
    },
    {
      id: "int-ay-09",
      lemma: "번거롭다",
      pos: "a",
      gloss: {
        en: "to be troublesome; inconvenient",
        ko: "번거롭다",
        zh: "麻烦；费事",
      },
      example: {
        ko: "번거로우시겠지만 다시 확인해 주세요.",
        en: "Sorry to trouble you, but please check again.",
        zh: "麻烦您再确认一下。",
      },
    },
    {
      id: "int-ay-10",
      lemma: "인사하다",
      pos: "v",
      gloss: {
        en: "to greet; say hello",
        ko: "인사하다",
        zh: "打招呼；问候",
      },
      derived: ["인사"],
      example: {
        ko: "만나면 먼저 인사해요.",
        en: "When we meet, I greet first.",
        zh: "见面时我先打招呼。",
      },
    },
    {
      id: "int-ay-11",
      lemma: "불편하다",
      pos: "a",
      gloss: {
        en: "to be inconvenient; uncomfortable",
        ko: "불편하다",
        zh: "不方便；不舒服",
      },
      derived: ["불편"],
      example: {
        ko: "기다리게 해서 불편하셨죠?",
        en: "It must have been inconvenient to wait, right?",
        zh: "让您等着，不方便吧？",
      },
    },
    {
      id: "int-ay-12",
      lemma: "공손하다",
      pos: "a",
      gloss: {
        en: "to be polite; respectful",
        ko: "공손하다",
        zh: "恭敬；有礼貌",
      },
      derived: ["공손"],
      example: {
        ko: "말을 공손하게 하는 게 좋아요.",
        en: "It's good to speak politely.",
        zh: "说话最好恭敬一些。",
      },
    },
  ],
};

p.packs.push(newPack);
p.version = 57;
p.note =
  "+apology-politeness 12 (미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다·번거롭다·인사하다·불편하다·공손하다) 2026-07-27. Distinct from favor 고맙다 · rules 예의 · friends 방문 · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 번거롭다·공손하다 → cloze · themes apology · chip 미안/抱歉. Existing packs kept (incl. personality-character sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
if (!p.inspiredBy.includes("apology-politeness")) {
  p.inspiredBy = p.inspiredBy.replace(
    "personality-character scenes",
    "personality-character/apology-politeness scenes"
  );
}
if (!p.copyright.includes("Apology-politeness")) {
  p.copyright +=
    " Apology-politeness pack = generic apology/politeness terms only (no brand names).";
}
fs.writeFileSync(packPath, JSON.stringify(p, null, 2) + "\n");

const s = JSON.parse(fs.readFileSync(speedPath, "utf8"));
if (!s.themes.includes("apology")) s.themes.push("apology");
if (s.items.some((it) => it.id === "sq-571")) {
  console.error("speed items already exist");
  process.exit(1);
}

const speedItems = [
  {
    id: "sq-571",
    prompt: { en: "To be sorry?", ko: "미안하다?", zh: "抱歉？" },
    choices: ["감사하다", "미안하다", "인사하다", "덕분"],
    answer: 1,
    explain: {
      en: "미안하다 = to be sorry.",
      ko: "미안하다 = 마음이 편하지 않아 미안한 느낌.",
      zh: "미안하다 = 抱歉；对不起。",
    },
  },
  {
    id: "sq-572",
    prompt: { en: "To be sorry (formal)?", ko: "죄송하다?", zh: "抱歉（正式）？" },
    choices: ["죄송하다", "실례하다", "수고하다", "공손하다"],
    answer: 0,
    explain: {
      en: "죄송하다 = to be sorry (formal).",
      ko: "죄송하다 = 더 공손하게 미안함을 표현.",
      zh: "죄송하다 = 正式的抱歉。",
    },
  },
  {
    id: "sq-573",
    prompt: { en: "To apologize?", ko: "사과하다?", zh: "道歉？" },
    choices: ["용서하다", "인사하다", "사과하다", "덕분"],
    answer: 2,
    explain: {
      en: "사과하다 = to apologize.",
      ko: "사과하다 = 잘못을 인정하고 빌다.",
      zh: "사과하다 = 道歉。",
    },
  },
  {
    id: "sq-574",
    prompt: { en: "To forgive?", ko: "용서하다?", zh: "原谅？" },
    choices: ["번거롭다", "용서하다", "불편하다", "감사하다"],
    answer: 1,
    explain: {
      en: "용서하다 = to forgive.",
      ko: "용서하다 = 잘못을 너그럽게 넘어가다.",
      zh: "용서하다 = 原谅。",
    },
  },
  {
    id: "sq-575",
    prompt: { en: "To excuse oneself?", ko: "실례하다?", zh: "失礼？" },
    choices: ["실례하다", "미안하다", "수고하다", "공손하다"],
    answer: 0,
    explain: {
      en: "실례하다 = to excuse oneself / be rude.",
      ko: "실례하다 = 방해하거나 자리를 비울 때 쓰는 말.",
      zh: "실례하다 = 失礼；借过。",
    },
  },
  {
    id: "sq-576",
    prompt: { en: "To thank / be grateful?", ko: "감사하다?", zh: "感谢？" },
    choices: ["사과하다", "불편하다", "용서하다", "감사하다"],
    answer: 3,
    explain: {
      en: "감사하다 = to thank / be grateful.",
      ko: "감사하다 = 고마운 마음을 나타내다.",
      zh: "감사하다 = 感谢。",
    },
  },
  {
    id: "sq-577",
    prompt: { en: "Thanks to / owing to?", ko: "덕분?", zh: "多亏？" },
    choices: ["덕분", "인사하다", "번거롭다", "실례하다"],
    answer: 0,
    explain: {
      en: "덕분 = thanks to / owing to.",
      ko: "덕분 = 누군가의 도움으로.",
      zh: "덕분 = 多亏；托福。",
    },
  },
  {
    id: "sq-578",
    prompt: { en: "To work hard (polite)?", ko: "수고하다?", zh: "辛苦？" },
    choices: ["공손하다", "미안하다", "수고하다", "사과하다"],
    answer: 2,
    explain: {
      en: "수고하다 = to put in effort (polite acknowledgment).",
      ko: "수고하다 = 애쓴 일을 인정할 때.",
      zh: "수고하다 = 辛苦；劳烦。",
    },
  },
  {
    id: "sq-579",
    prompt: { en: "To greet?", ko: "인사하다?", zh: "打招呼？" },
    choices: ["용서하다", "인사하다", "죄송하다", "덕분"],
    answer: 1,
    explain: {
      en: "인사하다 = to greet.",
      ko: "인사하다 = 만나고 헤어질 때 예의를 표하다.",
      zh: "인사하다 = 打招呼；问候。",
    },
  },
  {
    id: "sq-580",
    prompt: {
      en: "To be inconvenient / uncomfortable?",
      ko: "불편하다?",
      zh: "不方便？",
    },
    choices: ["불편하다", "감사하다", "실례하다", "수고하다"],
    answer: 0,
    explain: {
      en: "불편하다 = to be inconvenient / uncomfortable.",
      ko: "불편하다 = 편하지 않거나 거추장스럽다.",
      zh: "불편하다 = 不方便；不舒服。",
    },
  },
].map((it) => ({ ...it, tags: ["apology", "intermediate"] }));

s.items.push(...speedItems);
s.version = 58;
if (s.copyright && !s.copyright.includes("apology-politeness")) {
  s.copyright = s.copyright.replace(
    "personality-character crossfill",
    "personality-character/apology-politeness crossfill"
  );
}
s.note =
  "+10 apology-politeness MCQ (sq-571–580, 2026-07-27). Pack lemmas 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다·인사하다·불편하다. 번거롭다·공손하다 → cloze Prefer. Distinct from favor 고맙다 · rules 예의 · friends · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · personality. NIKL/Sejong·Tammy. No brand names. Prior personality sq-561–570 kept. Suggest cloze +8–10 · Prefer 번거롭다·공손하다 · themes apology · chip KO 미안 / ZH 抱歉.";
fs.writeFileSync(speedPath, JSON.stringify(s, null, 2) + "\n");

const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
m.version = 225;
const speedGame = (m.games || []).find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 58;
  speedGame.itemCount = s.items.length;
  speedGame.count = s.items.length;
}
m.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 617 · listen-match 584 · speed 580 · telephone 529 · scramble 531 · dictation 572 · cloze 562 · particle 566. +apology-politeness pack + speed +10 (sq-571–580) · themes apology · apologyTagged 10 · Prefer 번거롭다·공손하다 → cloze · chip KO 미안 / ZH 抱歉. Suggest cloze next. Prior personality sweep closed. hangul.js untouched.";
fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + "\n");

const apologyTagged = s.items.filter((i) =>
  (i.tags || []).includes("apology")
).length;
console.log(
  "packs",
  p.packs.length,
  "items",
  p.packs.reduce((n, x) => n + x.items.length, 0),
  "v",
  p.version
);
console.log(
  "speed",
  s.version,
  s.items.length,
  "apologyTagged=" + apologyTagged
);
console.log("manifest", m.version);
console.log(
  "pack lemmas",
  newPack.items.map((x) => x.lemma).join("·")
);

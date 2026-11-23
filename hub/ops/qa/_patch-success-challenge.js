/**
 * ThemeSm53 prep — success-challenge 1팩 + speed +10
 * Run: node hub/ops/qa/_patch-success-challenge.js
 */
const fs = require("fs");

const packPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const speedPath = "hub/app/data/games/speed-quiz-beginner.json";
const manifestPath = "hub/app/data/games/manifest.json";
const beginnerPath = "hub/app/data/vocab/jabi-theme-packs-beginner.json";
const canonPath = "hub/app/data/vocab/theme-key-canon.json";

const p = JSON.parse(fs.readFileSync(packPath, "utf8"));
const b = JSON.parse(fs.readFileSync(beginnerPath, "utf8"));
const existing = new Set();
for (const pack of [...p.packs, ...b.packs]) {
  for (const it of pack.items) existing.add(it.lemma);
}

const lemmas = [
  "성공하다",
  "실패하다",
  "기회",
  "도전하다",
  "합격하다",
  "불합격",
  "희망",
  "기대하다",
  "성과",
  "자랑하다",
  "성취",
  "바라다",
];
const overlap = lemmas.filter((l) => existing.has(l));
if (overlap.length) {
  console.error("OVERLAP", overlap);
  process.exit(1);
}
if (p.packs.some((x) => x.id === "success-challenge")) {
  console.error("pack already exists");
  process.exit(1);
}

const newPack = {
  id: "success-challenge",
  title: {
    en: "Success & challenge",
    ko: "성공·도전",
    zh: "成功与挑战",
  },
  grammarHooks: ["아/어 보다", "기 바라다", "도록"],
  note: "Everyday succeed / fail / chance / challenge / pass / fail-exam / hope / expect / outcome / pride / achievement / wish survival — distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험·선택하다 · personality 자신감 · school 시험·성적 · think 결정하다·계획하다 · emotion · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 성취·바라다 → cloze · themes success · chip 성공/成功.",
  items: [
    {
      id: "int-su-01",
      lemma: "성공하다",
      pos: "v",
      senseId: "sns:성공하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to succeed",
        ko: "성공하다",
        zh: "成功",
      },
      derived: ["성공"],
      example: {
        ko: "이번 프로젝트에 성공했어요.",
        en: "I succeeded in this project.",
        zh: "这次项目成功了。",
      },
    },
    {
      id: "int-su-02",
      lemma: "실패하다",
      pos: "v",
      senseId: "sns:실패하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to fail",
        ko: "실패하다",
        zh: "失败",
      },
      derived: ["실패"],
      example: {
        ko: "한 번 실패해도 다시 해 봐요.",
        en: "Even if you fail once, try again.",
        zh: "失败一次也再试一试。",
      },
    },
    {
      id: "int-su-03",
      lemma: "기회",
      pos: "n",
      senseId: "sns:기회.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "opportunity; chance",
        ko: "기회",
        zh: "机会",
      },
      example: {
        ko: "좋은 기회를 놓치지 마세요.",
        en: "Don't miss a good opportunity.",
        zh: "别错过好机会。",
      },
    },
    {
      id: "int-su-04",
      lemma: "도전하다",
      pos: "v",
      senseId: "sns:도전하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to challenge; take on",
        ko: "도전하다",
        zh: "挑战；尝试",
      },
      derived: ["도전"],
      example: {
        ko: "새로운 일에 도전해요.",
        en: "I take on new work.",
        zh: "我挑战新的工作。",
      },
    },
    {
      id: "int-su-05",
      lemma: "합격하다",
      pos: "v",
      senseId: "sns:합격하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to pass (a test)",
        ko: "합격하다",
        zh: "合格；通过",
      },
      derived: ["합격"],
      example: {
        ko: "시험에 합격해서 기뻐요.",
        en: "I'm glad I passed the exam.",
        zh: "考试合格了，很高兴。",
      },
    },
    {
      id: "int-su-06",
      lemma: "불합격",
      pos: "n",
      senseId: "sns:불합격.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "failure to pass; rejection",
        ko: "불합격",
        zh: "不合格",
      },
      example: {
        ko: "불합격 소식을 들었어요.",
        en: "I heard the news of not passing.",
        zh: "听到了不合格的消息。",
      },
    },
    {
      id: "int-su-07",
      lemma: "희망",
      pos: "n",
      senseId: "sns:희망.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "hope",
        ko: "희망",
        zh: "希望",
      },
      example: {
        ko: "아직 희망을 버리지 마세요.",
        en: "Don't give up hope yet.",
        zh: "先别放弃希望。",
      },
    },
    {
      id: "int-su-08",
      lemma: "기대하다",
      pos: "v",
      senseId: "sns:기대하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to expect; look forward to",
        ko: "기대하다",
        zh: "期待",
      },
      derived: ["기대"],
      example: {
        ko: "다음 주 발표를 기대해요.",
        en: "I'm looking forward to next week's presentation.",
        zh: "我期待下周的发表。",
      },
    },
    {
      id: "int-su-09",
      lemma: "성과",
      pos: "n",
      senseId: "sns:성과.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "result; achievement (outcome)",
        ko: "성과",
        zh: "成果；业绩",
      },
      example: {
        ko: "이번 달 성과가 좋아요.",
        en: "This month's results are good.",
        zh: "这个月成果不错。",
      },
    },
    {
      id: "int-su-10",
      lemma: "자랑하다",
      pos: "v",
      senseId: "sns:자랑하다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to be proud of; boast",
        ko: "자랑하다",
        zh: "自豪；炫耀",
      },
      derived: ["자랑"],
      example: {
        ko: "아이들이 그림을 자랑해요.",
        en: "The kids proudly show their drawings.",
        zh: "孩子们炫耀自己的画。",
      },
    },
    {
      id: "int-su-11",
      lemma: "성취",
      pos: "n",
      senseId: "sns:성취.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "achievement; accomplishment",
        ko: "성취",
        zh: "成就",
      },
      derived: ["성취하다"],
      example: {
        ko: "작은 성취도 중요해요.",
        en: "Even a small achievement matters.",
        zh: "小小成就也很重要。",
      },
    },
    {
      id: "int-su-12",
      lemma: "바라다",
      pos: "v",
      senseId: "sns:바라다.1",
      themes: ["success"],
      levelBand: "int-low",
      gloss: {
        en: "to wish; hope for",
        ko: "바라다",
        zh: "希望；盼望",
      },
      example: {
        ko: "모두 건강하기를 바라요.",
        en: "I wish everyone good health.",
        zh: "希望大家健康。",
      },
    },
  ],
};

p.packs.push(newPack);
p.version = 58;
p.note =
  "+success-challenge 12 (성공하다·실패하다·기회·도전하다·합격하다·불합격·희망·기대하다·성과·자랑하다·성취·바라다) 2026-07-27. Distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 성취·바라다 → cloze · themes success · chip 성공/成功. Existing packs kept (incl. apology-politeness sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
if (!p.inspiredBy.includes("success-challenge")) {
  p.inspiredBy = p.inspiredBy.replace(
    "apology-politeness scenes",
    "apology-politeness/success-challenge scenes"
  );
}
if (!p.copyright.includes("Success-challenge")) {
  p.copyright +=
    " Success-challenge pack = generic success/challenge/hope terms only (no brand names).";
}
fs.writeFileSync(packPath, JSON.stringify(p, null, 2) + "\n");

const s = JSON.parse(fs.readFileSync(speedPath, "utf8"));
if (!s.themes.includes("success")) s.themes.push("success");
if (s.items.some((it) => it.id === "sq-581")) {
  console.error("speed items already exist");
  process.exit(1);
}

const speedItems = [
  {
    id: "sq-581",
    prompt: { en: "To succeed?", ko: "성공하다?", zh: "成功？" },
    choices: ["실패하다", "성공하다", "기회", "성과"],
    answer: 1,
    explain: {
      en: "성공하다 = to succeed.",
      ko: "성공하다 = 일을 잘 해내다.",
      zh: "성공하다 = 成功。",
    },
  },
  {
    id: "sq-582",
    prompt: { en: "To fail?", ko: "실패하다?", zh: "失败？" },
    choices: ["합격하다", "자랑하다", "실패하다", "희망"],
    answer: 2,
    explain: {
      en: "실패하다 = to fail.",
      ko: "실패하다 = 뜻대로 되지 않다.",
      zh: "실패하다 = 失败。",
    },
  },
  {
    id: "sq-583",
    prompt: { en: "Opportunity / chance?", ko: "기회?", zh: "机会？" },
    choices: ["기회", "불합격", "성과", "도전하다"],
    answer: 0,
    explain: {
      en: "기회 = opportunity / chance.",
      ko: "기회 = 좋은 때를 가리키는 말.",
      zh: "기회 = 机会。",
    },
  },
  {
    id: "sq-584",
    prompt: { en: "To challenge / take on?", ko: "도전하다?", zh: "挑战？" },
    choices: ["기대하다", "도전하다", "성공하다", "희망"],
    answer: 1,
    explain: {
      en: "도전하다 = to challenge / take on.",
      ko: "도전하다 = 어려운 일에 맞서 보다.",
      zh: "도전하다 = 挑战；尝试。",
    },
  },
  {
    id: "sq-585",
    prompt: { en: "To pass (a test)?", ko: "합격하다?", zh: "合格？" },
    choices: ["불합격", "실패하다", "자랑하다", "합격하다"],
    answer: 3,
    explain: {
      en: "합격하다 = to pass (a test).",
      ko: "합격하다 = 시험·심사에 통과하다.",
      zh: "합격하다 = 合格；通过。",
    },
  },
  {
    id: "sq-586",
    prompt: { en: "Failure to pass?", ko: "불합격?", zh: "不合格？" },
    choices: ["불합격", "기회", "성과", "희망"],
    answer: 0,
    explain: {
      en: "불합격 = failure to pass / rejection.",
      ko: "불합격 = 시험·심사에 통과하지 못함.",
      zh: "불합격 = 不合格。",
    },
  },
  {
    id: "sq-587",
    prompt: { en: "Hope?", ko: "희망?", zh: "希望？" },
    choices: ["성과", "희망", "실패하다", "자랑하다"],
    answer: 1,
    explain: {
      en: "희망 = hope.",
      ko: "희망 = 앞으로 잘되기를 바라는 마음.",
      zh: "희망 = 希望。",
    },
  },
  {
    id: "sq-588",
    prompt: { en: "To expect / look forward to?", ko: "기대하다?", zh: "期待？" },
    choices: ["도전하다", "합격하다", "기대하다", "기회"],
    answer: 2,
    explain: {
      en: "기대하다 = to expect / look forward to.",
      ko: "기대하다 = 좋은 일이 오기를 기다리다.",
      zh: "기대하다 = 期待。",
    },
  },
  {
    id: "sq-589",
    prompt: { en: "Result / outcome?", ko: "성과?", zh: "成果？" },
    choices: ["성과", "불합격", "성공하다", "희망"],
    answer: 0,
    explain: {
      en: "성과 = result / outcome.",
      ko: "성과 = 노력으로 얻은 결과.",
      zh: "성과 = 成果；业绩。",
    },
  },
  {
    id: "sq-590",
    prompt: { en: "To be proud of / boast?", ko: "자랑하다?", zh: "自豪？" },
    choices: ["실패하다", "기회", "합격하다", "자랑하다"],
    answer: 3,
    explain: {
      en: "자랑하다 = to be proud of / boast.",
      ko: "자랑하다 = 좋은 것을 드러내 보이다.",
      zh: "자랑하다 = 自豪；炫耀。",
    },
  },
].map((it) => ({ ...it, tags: ["success", "intermediate"] }));

s.items.push(...speedItems);
s.version = 59;
if (s.copyright && !s.copyright.includes("success-challenge")) {
  s.copyright = s.copyright.replace(
    "apology-politeness crossfill",
    "apology-politeness/success-challenge crossfill"
  );
}
s.note =
  "+10 success-challenge MCQ (sq-581–590, 2026-07-27). Pack lemmas 성공하다·실패하다·기회·도전하다·합격하다·불합격·희망·기대하다·성과·자랑하다. 성취·바라다 → cloze Prefer. Distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology. NIKL/Sejong·Tammy. No brand names. Prior apology sq-571–580 kept. Suggest cloze +8–10 · Prefer 성취·바라다 · themes success · chip KO 성공 / ZH 成功.";
fs.writeFileSync(speedPath, JSON.stringify(s, null, 2) + "\n");

const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
m.version = 229;
const speedGame = (m.games || []).find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 59;
  speedGame.itemCount = s.items.length;
  speedGame.count = s.items.length;
}
m.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 627 · listen-match 594 · speed 590 · telephone 537 · scramble 539 · dictation 582 · cloze 572 · particle 576. +success-challenge pack + speed +10 (sq-581–590) · themes success · successTagged 10 · Prefer 성취·바라다 → cloze · chip KO 성공 / ZH 成功. Suggest cloze + ThemeSm53a. Prior apology-politeness sweep closed (ThemeSm52d). hangul.js untouched.";
fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + "\n");

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
if (!canon.themes.some((t) => t.themeKey === "success")) {
  const apologyIdx = canon.themes.findIndex((t) => t.themeKey === "apology");
  const entry = {
    themeKey: "success",
    status: "frozen",
    chip: {
      ko: "성공",
      zh: "成功",
      en: "Success",
    },
    packIds: ["success-challenge"],
    notes:
      "ThemeSm53a speed(+cloze) chip enable pending (2026-07-27). Distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology.",
  };
  if (apologyIdx >= 0) canon.themes.splice(apologyIdx + 1, 0, entry);
  else canon.themes.push(entry);
  canon.source.intermediatePacks = 58;
  canon.source.themeOrderSpeed = 59;
  canon.counts.frozenThemeKeys = (canon.counts.frozenThemeKeys || 0) + 1;
  canon.counts.packsMappedToThemeKey =
    (canon.counts.packsMappedToThemeKey || 0) + 1;
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

const successTagged = s.items.filter((i) =>
  (i.tags || []).includes("success")
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
  "successTagged=" + successTagged
);
console.log("manifest", m.version);
console.log(
  "pack lemmas",
  newPack.items.map((x) => x.lemma).join("·")
);
console.log("Prefer cloze: 성취·바라다");
console.log("chip KO 성공 / ZH 成功 · themeKey success");

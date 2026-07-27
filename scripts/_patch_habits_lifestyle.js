const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "hub", "app");

// ---- 1) intermediate theme pack ----
const packPath = path.join(ROOT, "data/vocab/jabi-theme-packs-intermediate.json");
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));

const newPack = {
  id: "habits-lifestyle",
  title: {
    en: "Habits & lifestyle",
    ko: "습관·생활",
    zh: "习惯与生活",
  },
  grammarHooks: ["기로 하다", "게 되다", "도록"],
  note: "Everyday habit / effort / familiar / unfamiliar / adapt / rest / school vacation / diligent / lazy / lifestyle / give up / endure survival — distinct from daily-routine 일어나다·자다 · celebration 휴가 · sports 연습 · reason 목표 · problem 경험 · work-study 스트레스 · hobby 여가 · think 잊다 · emotion. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 포기하다·참다 → cloze · themes habit · chip 습관/习惯.",
  items: [
    {
      id: "int-hb-01",
      lemma: "습관",
      pos: "n",
      gloss: { en: "habit", ko: "습관", zh: "习惯" },
      example: {
        ko: "아침에 운동하는 습관이 있어요.",
        en: "I have a habit of exercising in the morning.",
        zh: "我有早上运动的习惯。",
      },
    },
    {
      id: "int-hb-02",
      lemma: "노력하다",
      pos: "v",
      gloss: { en: "to make an effort", ko: "노력하다", zh: "努力" },
      derived: ["노력"],
      example: {
        ko: "한국어를 열심히 노력해요.",
        en: "I make an effort with Korean.",
        zh: "我努力学习韩语。",
      },
    },
    {
      id: "int-hb-03",
      lemma: "익숙하다",
      pos: "a",
      gloss: { en: "to be familiar; used to", ko: "익숙하다", zh: "熟悉；习惯" },
      derived: ["익숙"],
      example: {
        ko: "이 길이 이제 익숙해요.",
        en: "I am used to this road now.",
        zh: "这条路我现在熟悉了。",
      },
    },
    {
      id: "int-hb-04",
      lemma: "낯설다",
      pos: "a",
      gloss: { en: "to be unfamiliar; strange", ko: "낯설다", zh: "陌生" },
      example: {
        ko: "처음에는 동네가 낯설었어요.",
        en: "At first the neighborhood felt unfamiliar.",
        zh: "一开始这个街区很陌生。",
      },
    },
    {
      id: "int-hb-05",
      lemma: "적응하다",
      pos: "v",
      gloss: { en: "to adapt; adjust", ko: "적응하다", zh: "适应" },
      derived: ["적응"],
      example: {
        ko: "새 회사에 빨리 적응하고 싶어요.",
        en: "I want to adapt to the new company quickly.",
        zh: "我想快点适应新公司。",
      },
    },
    {
      id: "int-hb-06",
      lemma: "휴식",
      pos: "n",
      gloss: { en: "rest; break", ko: "휴식", zh: "休息" },
      derived: ["휴식하다"],
      example: {
        ko: "잠깐 휴식이 필요해요.",
        en: "I need a short rest.",
        zh: "我需要休息一下。",
      },
    },
    {
      id: "int-hb-07",
      lemma: "방학",
      pos: "n",
      gloss: { en: "school vacation", ko: "방학", zh: "假期（学校）" },
      example: {
        ko: "여름 방학에 집에 가요.",
        en: "I go home during summer vacation.",
        zh: "暑假我回家。",
      },
    },
    {
      id: "int-hb-08",
      lemma: "부지런하다",
      pos: "a",
      gloss: { en: "to be diligent; hardworking", ko: "부지런하다", zh: "勤快；勤奋" },
      derived: ["부지런"],
      example: {
        ko: "동생은 아주 부지런해요.",
        en: "My younger sibling is very diligent.",
        zh: "弟弟/妹妹非常勤快。",
      },
    },
    {
      id: "int-hb-09",
      lemma: "게으르다",
      pos: "a",
      gloss: { en: "to be lazy", ko: "게으르다", zh: "懒" },
      derived: ["게으름"],
      example: {
        ko: "주말에는 조금 게을러요.",
        en: "I am a little lazy on weekends.",
        zh: "周末我会有点懒。",
      },
    },
    {
      id: "int-hb-10",
      lemma: "생활",
      pos: "n",
      gloss: { en: "life; living; lifestyle", ko: "생활", zh: "生活" },
      derived: ["생활하다"],
      example: {
        ko: "항저우 생활에 만족해요.",
        en: "I am satisfied with life in Hangzhou.",
        zh: "我对杭州的生活很满意。",
      },
    },
    {
      id: "int-hb-11",
      lemma: "포기하다",
      pos: "v",
      gloss: { en: "to give up", ko: "포기하다", zh: "放弃" },
      derived: ["포기"],
      example: {
        ko: "중간에 포기하지 마세요.",
        en: "Please do not give up halfway.",
        zh: "请不要中途放弃。",
      },
    },
    {
      id: "int-hb-12",
      lemma: "참다",
      pos: "v",
      gloss: { en: "to endure; hold back", ko: "참다", zh: "忍耐；忍住" },
      example: {
        ko: "배가 고파도 조금 참아요.",
        en: "Even if I am hungry, I hold on a little.",
        zh: "即使饿也再忍一下。",
      },
    },
  ],
};

if (pack.packs.some((p) => p.id === "habits-lifestyle")) {
  console.error("habits-lifestyle already exists");
  process.exit(1);
}

pack.version = 53;
pack.inspiredBy = pack.inspiredBy.replace(
  "opinion-judgment scenes",
  "opinion-judgment/habits-lifestyle scenes"
);
if (!pack.copyright.includes("Habits-lifestyle")) {
  pack.copyright = pack.copyright.replace(
    /(Opinion-judgment pack = generic opinion\/agree\/evaluate\/praise\/criticize terms only \(no brand names\)\.)/,
    "$1 Habits-lifestyle pack = generic habit/effort/adapt/rest terms only (no brand names)."
  );
}
pack.note =
  "+habits-lifestyle 12 (습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·부지런하다·게으르다·생활·포기하다·참다) 2026-07-27. Distinct from routine · celebration 휴가 · sports 연습 · reason 목표 · problem 경험 · work 스트레스 · hobby 여가 · think · emotion. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 포기하다·참다 → cloze · themes habit · chip 습관/习惯. Existing packs kept (incl. opinion-judgment sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
pack.packs.push(newPack);
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");
const itemCount = pack.packs.reduce((n, p) => n + p.items.length, 0);
console.log("pack ok", pack.version, pack.packs.length, "packs", itemCount, "items");

// ---- 2) speed quiz ----
const speedPath = path.join(ROOT, "data/games/speed-quiz-beginner.json");
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
if (speed.items.some((it) => it.id === "sq-531")) {
  console.error("sq-531 already exists");
  process.exit(1);
}
speed.version = 54;
if (!speed.themes.includes("habit")) {
  const ix = speed.themes.indexOf("intermediate");
  if (ix >= 0) speed.themes.splice(ix, 0, "habit");
  else speed.themes.push("habit");
}
if (!speed.copyright.includes("habits-lifestyle")) {
  speed.copyright = speed.copyright.replace(
    "opinion-judgment crossfill",
    "opinion-judgment / habits-lifestyle crossfill"
  );
}

const speedItems = [
  {
    id: "sq-531",
    prompt: { en: "Habit?", ko: "습관?", zh: "习惯？" },
    choices: ["휴식", "습관", "방학", "생활"],
    answer: 1,
    explain: {
      en: "습관 = habit.",
      ko: "습관 = 늘 하는 버릇.",
      zh: "습관 = 习惯。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-532",
    prompt: { en: "To make an effort?", ko: "노력하다?", zh: "努力？" },
    choices: ["노력하다", "게으르다", "낯설다", "익숙하다"],
    answer: 0,
    explain: {
      en: "노력하다 = to make an effort.",
      ko: "노력하다 = 힘을 다해 힘쓰다.",
      zh: "노력하다 = 努力。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-533",
    prompt: { en: "To be familiar / used to?", ko: "익숙하다?", zh: "熟悉？" },
    choices: ["낯설다", "게으르다", "익숙하다", "포기하다"],
    answer: 2,
    explain: {
      en: "익숙하다 = to be familiar / used to.",
      ko: "익숙하다 = 잘 알아서 편하다.",
      zh: "익숙하다 = 熟悉；习惯。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-534",
    prompt: { en: "To be unfamiliar?", ko: "낯설다?", zh: "陌生？" },
    choices: ["익숙하다", "낯설다", "부지런하다", "휴식"],
    answer: 1,
    explain: {
      en: "낯설다 = to be unfamiliar.",
      ko: "낯설다 = 처음이라 익숙하지 않다.",
      zh: "낯설다 = 陌生。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-535",
    prompt: { en: "To adapt / adjust?", ko: "적응하다?", zh: "适应？" },
    choices: ["적응하다", "노력하다", "생활", "방학"],
    answer: 0,
    explain: {
      en: "적응하다 = to adapt / adjust.",
      ko: "적응하다 = 새 환경에 맞추다.",
      zh: "적응하다 = 适应。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-536",
    prompt: { en: "Rest / break?", ko: "휴식?", zh: "休息？" },
    choices: ["습관", "생활", "휴식", "방학"],
    answer: 2,
    explain: {
      en: "휴식 = rest / break.",
      ko: "휴식 = 쉬면서 힘을 회복함.",
      zh: "휴식 = 休息。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-537",
    prompt: { en: "School vacation?", ko: "방학?", zh: "学校假期？" },
    choices: ["방학", "휴식", "생활", "습관"],
    answer: 0,
    explain: {
      en: "방학 = school vacation (not work leave).",
      ko: "방학 = 학교 쉬는 기간.",
      zh: "방학 = 学校假期。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-538",
    prompt: { en: "To be diligent?", ko: "부지런하다?", zh: "勤快？" },
    choices: ["게으르다", "낯설다", "부지런하다", "참다"],
    answer: 2,
    explain: {
      en: "부지런하다 = to be diligent / hardworking.",
      ko: "부지런하다 = 열심히 움직이는 성격이다.",
      zh: "부지런하다 = 勤快；勤奋。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-539",
    prompt: { en: "To be lazy?", ko: "게으르다?", zh: "懒？" },
    choices: ["부지런하다", "게으르다", "노력하다", "적응하다"],
    answer: 1,
    explain: {
      en: "게으르다 = to be lazy.",
      ko: "게으르다 = 움직이기 싫어하다.",
      zh: "게으르다 = 懒。",
    },
    tags: ["habit", "intermediate"],
  },
  {
    id: "sq-540",
    prompt: { en: "Life / lifestyle?", ko: "생활?", zh: "生活？" },
    choices: ["휴식", "방학", "습관", "생활"],
    answer: 3,
    explain: {
      en: "생활 = life / living / lifestyle.",
      ko: "생활 = 일상적으로 살아가는 일.",
      zh: "생활 = 生活。",
    },
    tags: ["habit", "intermediate"],
  },
];

speed.items.push(...speedItems);
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");
const habitTagged = speed.items.filter((it) => (it.tags || []).includes("habit")).length;
console.log("speed ok", speed.version, "items", speed.items.length, "habitTagged", habitTagged);

// ---- 3) speed.js theme labels + ORDER ----
const speedJsPath = path.join(ROOT, "games/speed-quiz/speed.js");
let speedJs = fs.readFileSync(speedJsPath, "utf8");
if (!speedJs.includes("theme_habit:")) {
  speedJs = speedJs.replace(
    'theme_opinion: "Opinion",\n      theme_intermediate: "Mid",',
    'theme_opinion: "Opinion",\n      theme_habit: "Habit",\n      theme_intermediate: "Mid",'
  );
  speedJs = speedJs.replace(
    'theme_opinion: "의견",\n      theme_intermediate: "중급",',
    'theme_opinion: "의견",\n      theme_habit: "습관",\n      theme_intermediate: "중급",'
  );
  speedJs = speedJs.replace(
    'theme_opinion: "意见",\n      theme_intermediate: "中级",',
    'theme_opinion: "意见",\n      theme_habit: "习惯",\n      theme_intermediate: "中级",'
  );
  speedJs = speedJs.replace(
    '"opinion", "intermediate"',
    '"opinion", "habit", "intermediate"'
  );
  fs.writeFileSync(speedJsPath, speedJs);
  console.log("speed.js ok");
} else {
  console.log("speed.js already has habit");
}

// ---- 4) manifest ----
const manPath = path.join(ROOT, "data/games/manifest.json");
const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
man.version = 209;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 577 · listen-match 544 · speed 540 · telephone 497 · scramble 499 · dictation 532 · cloze 522 · particle 526. +habits-lifestyle pack 12 · speed +10 (sq-531–540) · themes habit · habitTagged 10 · Prefer 포기하다·참다 → cloze · chip 제안 KO 습관 / ZH 习惯. opinion-judgment 8-bank sweep closed. hangul.js untouched.";
fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + "\n");
console.log("manifest ok", man.version);

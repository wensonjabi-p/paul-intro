/**
 * habits-lifestyle → cloze +10 (c-523–532), theme habit.
 * Prefer 포기하다·참다. Skip 부지런하다·게으르다 → bingo/listen.
 * No hangul.js. No commit.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const clozePath = path.join(root, "hub/app/data/games/cloze-beginner.json");
const clozeJsPath = path.join(root, "hub/app/games/cloze-race/cloze.js");
const manifPath = path.join(root, "hub/app/data/games/manifest.json");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));

if (cloze.items.some((i) => i.id === "c-523")) {
  console.error("c-523 already exists");
  process.exit(1);
}

if (!cloze.themes.includes("habit")) {
  const ix = cloze.themes.indexOf("intermediate");
  if (ix >= 0) cloze.themes.splice(ix, 0, "habit");
  else cloze.themes.push("habit");
}

if (!cloze.copyright.includes("habits-lifestyle")) {
  cloze.copyright = cloze.copyright.replace(
    "opinion-judgment crossfill",
    "opinion-judgment / habits-lifestyle crossfill"
  );
}

const NEW = [
  {
    id: "c-523",
    template: "계획{0} 포기하지 마세요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "계획을 포기하지 마세요",
    gloss: {
      en: "Please do not give up the plan",
      ko: "습관·생활 · 목적격 · 포기하다",
      zh: "请不要放弃计划",
    },
    tags: ["particle", "object", "habit", "intermediate"],
  },
  {
    id: "c-524",
    template: "웃음{0} 참아요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "웃음을 참아요",
    gloss: {
      en: "I hold back a laugh",
      ko: "습관·생활 · 목적격 · 참다",
      zh: "我忍住笑",
    },
    tags: ["particle", "object", "habit", "intermediate"],
  },
  {
    id: "c-525",
    template: "좋은 습관{0} 있어요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "좋은 습관이 있어요",
    gloss: {
      en: "I have a good habit",
      ko: "습관·생활 · 주격 · 습관",
      zh: "我有好习惯",
    },
    tags: ["particle", "subject", "habit", "intermediate"],
  },
  {
    id: "c-526",
    template: "노력{0} 계속해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "노력을 계속해요",
    gloss: {
      en: "I keep making an effort",
      ko: "습관·생활 · 목적격 · 노력하다",
      zh: "我继续努力",
    },
    tags: ["particle", "object", "habit", "intermediate"],
  },
  {
    id: "c-527",
    template: "이 길{0} 익숙해요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "이 길이 익숙해요",
    gloss: {
      en: "I am used to this road",
      ko: "습관·생활 · 주격 · 익숙하다",
      zh: "这条路我熟悉",
    },
    tags: ["particle", "subject", "habit", "intermediate"],
  },
  {
    id: "c-528",
    template: "동네{0} 아직 낯설어요",
    answers: ["가"],
    choices: ["가", "이", "를", "에"],
    full: "동네가 아직 낯설어요",
    gloss: {
      en: "The neighborhood still feels unfamiliar",
      ko: "습관·생활 · 주격 · 낯설다",
      zh: "街区还很陌生",
    },
    tags: ["particle", "subject", "habit", "intermediate"],
  },
  {
    id: "c-529",
    template: "새 회사{0} 적응해요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "새 회사에 적응해요",
    gloss: {
      en: "I adapt to the new company",
      ko: "습관·생활 · 부사격 · 적응하다",
      zh: "我适应新公司",
    },
    tags: ["particle", "adverbial", "habit", "intermediate"],
  },
  {
    id: "c-530",
    template: "짧은 휴식{0} 필요해요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "짧은 휴식이 필요해요",
    gloss: {
      en: "A short rest is needed",
      ko: "습관·생활 · 주격 · 휴식",
      zh: "需要短暂休息",
    },
    tags: ["particle", "subject", "habit", "intermediate"],
  },
  {
    id: "c-531",
    template: "여름 방학{0} 집에 가요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "여름 방학에 집에 가요",
    gloss: {
      en: "I go home during summer vacation",
      ko: "습관·생활 · 부사격 · 방학",
      zh: "暑假我回家",
    },
    tags: ["particle", "adverbial", "habit", "intermediate"],
  },
  {
    id: "c-532",
    template: "항저우 생활{0} 만족해요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "항저우 생활에 만족해요",
    gloss: {
      en: "I am satisfied with life in Hangzhou",
      ko: "습관·생활 · 부사격 · 생활",
      zh: "我对杭州的生活满意",
    },
    tags: ["particle", "adverbial", "habit", "intermediate"],
  },
];

cloze.items.push(...NEW);
cloze.version = 54;
cloze.note =
  "+10 habits-lifestyle cloze (c-523–532, 2026-07-27): Prefer 포기하다·참다 · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활. Skip 부지런하다·게으르다 → bingo/listen Prefer. Distinct from routine 일어나다 · clinic/health 증상 · change 방학이 지나갔어요 · motion 가다·오다. NIKL/Sejong · 해요체 · no brand names. Suggest bingo/listen next (부지런하다·게으르다 Prefer). Prior opinion c-513–522 · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

const habitTagged = cloze.items.filter((i) => (i.tags || []).includes("habit")).length;
console.log("cloze ok", cloze.version, "items", cloze.items.length, "habitTagged", habitTagged);

let js = fs.readFileSync(clozeJsPath, "utf8");
if (!js.includes("theme_habit:")) {
  js = js
    .replace(
      'theme_opinion: "Opinion",\n      theme_intermediate: "Mid",',
      'theme_opinion: "Opinion",\n      theme_habit: "Habit",\n      theme_intermediate: "Mid",'
    )
    .replace(
      'theme_opinion: "의견",\n      theme_intermediate: "중급",',
      'theme_opinion: "의견",\n      theme_habit: "습관",\n      theme_intermediate: "중급",'
    )
    .replace(
      'theme_opinion: "意见",\n      theme_intermediate: "中级",',
      'theme_opinion: "意见",\n      theme_habit: "习惯",\n      theme_intermediate: "中级",'
    )
    .replace(
      '"opinion", "intermediate"',
      '"opinion", "habit", "intermediate"'
    );
  fs.writeFileSync(clozeJsPath, js);
  console.log("cloze.js habit chip/ORDER ok");
} else {
  console.log("cloze.js already has habit");
}

const manif = JSON.parse(fs.readFileSync(manifPath, "utf8"));
manif.version = 210;
manif.updated = "2026-07-27";
manif.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 577 · listen-match 544 · speed 540 · telephone 497 · scramble 499 · dictation 532 · cloze 532 · particle 526. +habits-lifestyle cloze +10 (c-523–532) · themes habit · habitTagged 10 · Prefer 포기하다·참다 · Skip 부지런하다·게으르다 → bingo/listen · chip KO 습관 / ZH 习惯. hangul.js untouched.";
fs.writeFileSync(manifPath, JSON.stringify(manif, null, 2) + "\n");
console.log("manifest", manif.version);

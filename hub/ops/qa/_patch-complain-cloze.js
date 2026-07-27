/**
 * complain-dissatisfaction → cloze +10 only (no ThemeSm chips, no other games)
 * Prefer 이의·하소연 · Suggest bingo/listen next
 * Run: node hub/ops/qa/_patch-complain-cloze.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const clozePath = path.join(ROOT, "app/data/games/cloze-beginner.json");
const speedPath = path.join(ROOT, "app/data/games/speed-quiz-beginner.json");
const manifestPath = path.join(ROOT, "app/data/games/manifest.json");
const packPath = path.join(ROOT, "app/data/vocab/jabi-theme-packs-intermediate.json");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
if (cloze.items.some((it) => it.id === "c-623")) {
  console.error("c-623 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("complain") === false) {
  const idx = cloze.themes.indexOf("refuse");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "complain");
  else cloze.themes.push("complain");
}

const newItems = [
  {
    id: "c-623",
    template: "결정{0} 이의가 있어요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "결정에 이의가 있어요",
    gloss: {
      en: "I have an objection to the decision",
      ko: "불만·항의 · 부사격 · 이의",
      zh: "对决定有异议",
    },
    tags: ["particle", "adverbial", "complain", "intermediate"],
  },
  {
    id: "c-624",
    template: "긴 하소연{0} 들어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "긴 하소연을 들어요",
    gloss: {
      en: "I listen to a long complaint",
      ko: "불만·항의 · 목적격 · 하소연",
      zh: "听一长段诉苦",
    },
    tags: ["particle", "object", "complain", "intermediate"],
  },
  {
    id: "c-625",
    template: "음식{0} 불평하지 마세요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "음식에 불평하지 마세요",
    gloss: {
      en: "Please don't complain about the food",
      ko: "불만·항의 · 부사격 · 불평하다",
      zh: "请不要抱怨食物",
    },
    tags: ["particle", "adverbial", "complain", "intermediate"],
  },
  {
    id: "c-626",
    template: "요금 인상{0} 항의해요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "요금 인상에 항의해요",
    gloss: {
      en: "I protest the fare increase",
      ko: "불만·항의 · 부사격 · 항의하다",
      zh: "抗议涨价",
    },
    tags: ["particle", "adverbial", "complain", "intermediate"],
  },
  {
    id: "c-627",
    template: "작은 실수{0} 따지지 마세요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "작은 실수를 따지지 마세요",
    gloss: {
      en: "Please don't quibble over small mistakes",
      ko: "불만·항의 · 목적격 · 따지다",
      zh: "请不要计较小失误",
    },
    tags: ["particle", "object", "complain", "intermediate"],
  },
  {
    id: "c-628",
    template: "불만{0} 정중히 제기해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "불만을 정중히 제기해요",
    gloss: {
      en: "I raise the complaint politely",
      ko: "불만·항의 · 목적격 · 제기하다",
      zh: "礼貌地提出不满",
    },
    tags: ["particle", "object", "complain", "intermediate"],
  },
  {
    id: "c-629",
    template: "스트레스{0} 하소연해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "스트레스를 하소연해요",
    gloss: {
      en: "I vent my stress",
      ko: "불만·항의 · 목적격 · 하소연하다",
      zh: "诉说压力",
    },
    tags: ["particle", "object", "complain", "intermediate"],
  },
  {
    id: "c-630",
    template: "서비스{0} 불만스러워요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "서비스가 불만스러워요",
    gloss: {
      en: "The service is unsatisfactory",
      ko: "불만·항의 · 주격 · 불만스럽다",
      zh: "服务让人不满意",
    },
    tags: ["particle", "subject", "complain", "intermediate"],
  },
  {
    id: "c-631",
    template: "불만{0} 말씀해 주세요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "불만을 말씀해 주세요",
    gloss: {
      en: "Please tell me your complaints",
      ko: "불만·항의 · 목적격 · 불만",
      zh: "请说出您的不满",
    },
    tags: ["particle", "object", "complain", "intermediate"],
  },
  {
    id: "c-632",
    template: "불평{0} 계속 나와요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "불평이 계속 나와요",
    gloss: {
      en: "Complaints keep coming up",
      ko: "불만·항의 · 주격 · 불평",
      zh: "抱怨不断",
    },
    tags: ["particle", "subject", "complain", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 64;
cloze.copyright = cloze.copyright.replace(
  "encourage-support/promise-trust/refuse-accept crossfill",
  "encourage-support/promise-trust/refuse-accept/complain-dissatisfaction crossfill"
);
cloze.note =
  "+10 complain-dissatisfaction cloze (c-623–632, 2026-07-27): Prefer 이의·하소연 · 불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평. Suggest bingo/listen next (Prefer 항의·신고하다·불만·따지다). Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology · favor · advice · speech · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. Prior refuse c-613–622 · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Pack note only (no ThemeSm)
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const cm = pack.packs.find((p) => p.id === "complain-dissatisfaction");
if (cm) {
  cm.note =
    "Everyday complain / protest / quibble / raise an issue / vent / be unsatisfactory / dissatisfaction / complaint / protest-noun / report / objection / venting-noun survival — distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology 불편하다 · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (이의·하소연) · Suggest bingo/listen · themes complain · chip 제안 불만/不满 · ThemeSm 미터치.";
}
pack.note =
  "+complain-dissatisfaction 12 (불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평·항의·신고하다·이의·하소연) 2026-07-27. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology 불편하다 · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 이의·하소연 · Suggest bingo/listen · themes complain · chip 제안 불만/不满 · ThemeSm 미터치. Existing packs kept (incl. refuse-accept ThemeSm57 closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Speed note pointer only
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 complain-dissatisfaction MCQ (sq-631–640, 2026-07-27). Pack lemmas 불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평·항의·신고하다. Prefer 이의·하소연 → cloze Done (c-623–632). Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology · favor. NIKL/Sejong·Tammy. No brand names. Prior refuse sq-621–630 kept. Suggest bingo/listen · chip 제안 KO 불만 / ZH 不满 · ThemeSm/칩 미터치.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 250;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 677 · listen-match 644 · speed 640 · telephone 577 · scramble 579 · dictation 632 · cloze 632 · particle 626. +complain-dissatisfaction cloze +10 (c-623–632) · themes complain · complainTagged 10(cloze)+10(speed) · Prefer 이의·하소연 Done · Suggest bingo/listen · chip 제안 KO 불만 / ZH 不满 · ThemeSm/칩 미터치. Prior pack+speed sq-631–640. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 64;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const complainTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("complain")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      complainTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 항의·신고하다·불만·따지다",
    },
    null,
    2
  )
);

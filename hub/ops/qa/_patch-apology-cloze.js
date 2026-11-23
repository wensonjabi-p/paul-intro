/**
 * ThemeSm52a — apology-politeness → cloze +10 + speed/cloze chip
 * Prefer 번거롭다·공손하다 · Skip 인사하다·불편하다 → bingo/listen
 * Run: node hub/ops/qa/_patch-apology-cloze.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const clozePath = path.join(ROOT, "app/data/games/cloze-beginner.json");
const manifestPath = path.join(ROOT, "app/data/games/manifest.json");
const packPath = path.join(ROOT, "app/data/vocab/jabi-theme-packs-intermediate.json");
const canonPath = path.join(ROOT, "app/data/vocab/theme-key-canon.json");
const clozeJs = path.join(ROOT, "app/games/cloze-race/cloze.js");
const speedJs = path.join(ROOT, "app/games/speed-quiz/speed.js");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
if (cloze.items.some((it) => it.id === "c-563")) {
  console.error("c-563 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("apology") === false) {
  const idx = cloze.themes.indexOf("personality");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "apology");
  else cloze.themes.push("apology");
}

const newItems = [
  {
    id: "c-563",
    template: "번거로운 확인{0} 부탁해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "번거로운 확인을 부탁해요",
    gloss: {
      en: "Please do the troublesome check",
      ko: "사과·공손 · 목적격 · 번거롭다",
      zh: "麻烦您核对一下",
    },
    tags: ["particle", "object", "apology", "intermediate"],
  },
  {
    id: "c-564",
    template: "공손한 태도{0} 중요해요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "공손한 태도가 중요해요",
    gloss: {
      en: "A polite attitude is important",
      ko: "사과·공손 · 주격 · 공손하다",
      zh: "恭敬的态度很重要",
    },
    tags: ["particle", "subject", "apology", "intermediate"],
  },
  {
    id: "c-565",
    template: "늦은 도착{0} 미안해요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "늦은 도착이 미안해요",
    gloss: {
      en: "I'm sorry for the late arrival",
      ko: "사과·공손 · 주격 · 미안하다",
      zh: "迟到了，很抱歉",
    },
    tags: ["particle", "subject", "apology", "intermediate"],
  },
  {
    id: "c-566",
    template: "긴 기다림{0} 죄송해요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "긴 기다림이 죄송해요",
    gloss: {
      en: "I'm sorry for the long wait",
      ko: "사과·공손 · 주격 · 죄송하다",
      zh: "久等了，很抱歉",
    },
    tags: ["particle", "subject", "apology", "intermediate"],
  },
  {
    id: "c-567",
    template: "먼저 사과{0} 해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "먼저 사과를 해요",
    gloss: {
      en: "I apologize first",
      ko: "사과·공손 · 목적격 · 사과하다",
      zh: "我先道歉",
    },
    tags: ["particle", "object", "apology", "intermediate"],
  },
  {
    id: "c-568",
    template: "용서{0} 구해 봐요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "용서를 구해 봐요",
    gloss: {
      en: "I ask for forgiveness",
      ko: "사과·공손 · 목적격 · 용서하다",
      zh: "请求原谅",
    },
    tags: ["particle", "object", "apology", "intermediate"],
  },
  {
    id: "c-569",
    template: "잠깐 실례{0} 할게요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "잠깐 실례를 할게요",
    gloss: {
      en: "Excuse me for a moment",
      ko: "사과·공손 · 목적격 · 실례하다",
      zh: "失陪一下",
    },
    tags: ["particle", "object", "apology", "intermediate"],
  },
  {
    id: "c-570",
    template: "관심{0} 감사해요",
    answers: ["에"],
    choices: ["에", "을", "이", "가"],
    full: "관심에 감사해요",
    gloss: {
      en: "Thank you for your interest",
      ko: "사과·공손 · 부사격 · 감사하다",
      zh: "感谢关心",
    },
    tags: ["particle", "adverbial", "apology", "intermediate"],
  },
  {
    id: "c-571",
    template: "친구 덕분{0} 합격했어요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "친구 덕분에 합격했어요",
    gloss: {
      en: "Thanks to a friend, I passed",
      ko: "사과·공손 · 부사격 · 덕분",
      zh: "多亏朋友才合格了",
    },
    tags: ["particle", "adverbial", "apology", "intermediate"],
  },
  {
    id: "c-572",
    template: "수고한 하루{0} 끝나요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "수고한 하루가 끝나요",
    gloss: {
      en: "A hard-working day ends",
      ko: "사과·공손 · 주격 · 수고하다",
      zh: "辛苦的一天结束了",
    },
    tags: ["particle", "subject", "apology", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 58;
cloze.copyright = cloze.copyright.replace(
  /personality-character crossfill/,
  "personality-character/apology-politeness crossfill"
);
cloze.note =
  "+10 apology-politeness cloze (c-563–572, 2026-07-27): Prefer 번거롭다·공손하다 · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다. Skip 인사하다·불편하다 → bingo/listen Prefer. Distinct from favor 고맙다 · rules 예의 · friends 방문 · personality · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. ThemeSm52a chip KO 미안 / ZH 抱歉. Suggest bingo/listen next. Prior personality c-553–562 · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Chip labels + THEME_ORDER for speed + cloze
function wireChip(jsPath) {
  let js = fs.readFileSync(jsPath, "utf8");
  if (js.includes('theme_apology: "미안"')) {
    console.log("chip already in", path.basename(jsPath));
    return;
  }
  js = js.replace(
    'theme_personality: "Personality",\n      theme_intermediate:',
    'theme_personality: "Personality",\n      theme_apology: "Apology",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_personality: "성격",\n      theme_intermediate:',
    'theme_personality: "성격",\n      theme_apology: "미안",\n      theme_intermediate:'
  );
  js = js.replace(
    'theme_personality: "性格",\n      theme_intermediate:',
    'theme_personality: "性格",\n      theme_apology: "抱歉",\n      theme_intermediate:'
  );
  // THEME_ORDER — cloze has multi-line; speed is one line
  if (js.includes('"personality", "intermediate"')) {
    js = js.replace(
      '"personality", "intermediate"',
      '"personality", "apology", "intermediate"'
    );
  } else if (js.includes('"personality",\n    "intermediate"')) {
    js = js.replace(
      '"personality",\n    "intermediate"',
      '"personality",\n    "apology",\n    "intermediate"'
    );
  } else {
    // cloze.js single long line ending
    js = js.replace(
      '"friends", "personality", "intermediate"',
      '"friends", "personality", "apology", "intermediate"'
    );
  }
  fs.writeFileSync(jsPath, js);
  console.log("wired chip", path.basename(jsPath));
}

wireChip(clozeJs);
wireChip(speedJs);

// Pack note
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const ay = pack.packs.find((p) => p.id === "apology-politeness");
if (ay) {
  ay.note =
    "Everyday sorry / apologize / forgive / excuse / thank / owing-to / trouble / greet / inconvenient / polite survival — distinct from favor 고맙다 · rules 예의 · friends 인사 장면 분리(방문) · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (번거롭다·공손하다) · Skip 인사하다·불편하다 → bingo/listen · themes apology · chip 미안/抱歉 · ThemeSm52a.";
}
pack.note =
  "+apology-politeness 12 (미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다·번거롭다·인사하다·불편하다·공손하다) 2026-07-27. Distinct from favor 고맙다 · rules 예의 · friends 방문 · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · celebration 축하 · personality. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 번거롭다·공손하다 · Skip 인사하다·불편하다 → bingo/listen · themes apology · chip 미안/抱歉 · ThemeSm52a. Existing packs kept (incl. personality-character sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Canon
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
if (!canon.themes.some((t) => t.themeKey === "apology")) {
  const pIdx = canon.themes.findIndex((t) => t.themeKey === "personality");
  const entry = {
    themeKey: "apology",
    status: "frozen",
    chip: { ko: "미안", zh: "抱歉", en: "Apology" },
    packIds: ["apology-politeness"],
    notes:
      "Distinct from favor 고맙다 · rules 예의 · friends · personality. ThemeSm52.",
  };
  if (pIdx >= 0) canon.themes.splice(pIdx + 1, 0, entry);
  else canon.themes.push(entry);
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
  console.log("canon +apology");
}

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 226;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 617 · listen-match 584 · speed 580 · telephone 529 · scramble 531 · dictation 572 · cloze 572 · particle 566. +apology-politeness cloze +10 (c-563–572) · themes apology · apologyTagged 10×2(speed+cloze) · Prefer 번거롭다·공손하다 Done · Skip 인사하다·불편하다 → bingo/listen · chip KO 미안 / ZH 抱歉 · ThemeSm52a. Prior speed sq-571–580. hangul.js untouched.";
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const apologyTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("apology")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      apologyTagged,
      ids: newItems.map((x) => x.id),
    },
    null,
    2
  )
);

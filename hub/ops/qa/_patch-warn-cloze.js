/**
 * warn-caution → cloze +10 only (no ThemeSm chips, no bingo/other games)
 * Prefer 긴급·비상 · Suggest bingo/listen next
 * Run: node hub/ops/qa/_patch-warn-cloze.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const clozePath = path.join(ROOT, "app/data/games/cloze-beginner.json");
const speedPath = path.join(ROOT, "app/data/games/speed-quiz-beginner.json");
const manifestPath = path.join(ROOT, "app/data/games/manifest.json");
const packPath = path.join(ROOT, "app/data/vocab/jabi-theme-packs-intermediate.json");
const canonPath = path.join(ROOT, "app/data/vocab/theme-key-canon.json");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
if (cloze.items.some((it) => it.id === "c-633")) {
  console.error("c-633 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("warn") === false) {
  const idx = cloze.themes.indexOf("complain");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "warn");
  else cloze.themes.push("warn");
}

const newItems = [
  {
    id: "c-633",
    template: "긴급 상황{0} 침착하게 대처해요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "긴급 상황에 침착하게 대처해요",
    gloss: {
      en: "I calmly cope with an urgent situation",
      ko: "경고·주의 · 부사격 · 긴급·대처하다",
      zh: "冷静应对紧急情况",
    },
    tags: ["particle", "adverbial", "warn", "intermediate"],
  },
  {
    id: "c-634",
    template: "비상구{0} 미리 확인해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "비상구를 미리 확인해요",
    gloss: {
      en: "I check the emergency exit in advance",
      ko: "경고·주의 · 목적격 · 비상",
      zh: "我提前确认紧急出口",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-635",
    template: "긴급 연락{0} 바로 받아요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "긴급 연락을 바로 받아요",
    gloss: {
      en: "I take the urgent call right away",
      ko: "경고·주의 · 목적격 · 긴급",
      zh: "我马上接紧急联络",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-636",
    template: "비상벨{0} 갑자기 울려요",
    answers: ["이"],
    choices: ["이", "가", "을", "에"],
    full: "비상벨이 갑자기 울려요",
    gloss: {
      en: "The emergency bell suddenly rings",
      ko: "경고·주의 · 주격 · 비상",
      zh: "紧急铃突然响起",
    },
    tags: ["particle", "subject", "warn", "intermediate"],
  },
  {
    id: "c-637",
    template: "긴급 방송{0} 잘 들어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "긴급 방송을 잘 들어요",
    gloss: {
      en: "I listen carefully to the emergency broadcast",
      ko: "경고·주의 · 목적격 · 긴급",
      zh: "我仔细听紧急广播",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-638",
    template: "비상시{0} 계단을 이용해요",
    answers: ["에"],
    choices: ["에", "을", "이", "로"],
    full: "비상시에 계단을 이용해요",
    gloss: {
      en: "In an emergency I use the stairs",
      ko: "경고·주의 · 부사격 · 비상",
      zh: "紧急时我走楼梯",
    },
    tags: ["particle", "adverbial", "warn", "intermediate"],
  },
  {
    id: "c-639",
    template: "경고{0} 무시하지 마세요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "경고를 무시하지 마세요",
    gloss: {
      en: "Please don't ignore the warning",
      ko: "경고·주의 · 목적격 · 경고",
      zh: "请不要忽视警告",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-640",
    template: "주의사항{0} 꼭 읽어요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "주의사항을 꼭 읽어요",
    gloss: {
      en: "I make sure to read the precautions",
      ko: "경고·주의 · 목적격 · 주의사항",
      zh: "我一定阅读注意事项",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-641",
    template: "위험{0} 피하세요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "위험을 피하세요",
    gloss: {
      en: "Please avoid danger",
      ko: "경고·주의 · 목적격 · 위험·피하다",
      zh: "请避开危险",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
  {
    id: "c-642",
    template: "안전{0} 위해 조심해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "안전을 위해 조심해요",
    gloss: {
      en: "I am careful for safety",
      ko: "경고·주의 · 목적격 · 안전",
      zh: "为了安全我小心",
    },
    tags: ["particle", "object", "warn", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 65;
if (!cloze.copyright.includes("warn-caution")) {
  cloze.copyright = cloze.copyright.replace(
    "complain-dissatisfaction crossfill",
    "complain-dissatisfaction/warn-caution crossfill"
  );
}
cloze.note =
  "+10 warn-caution cloze (c-633–642, 2026-07-27): Prefer 긴급·비상 · 대처하다·경고·주의사항·위험·피하다·안전. Suggest bingo/listen next (Prefer 경고하다·주의하다·위험하다·피하다). Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제 · emotion 걱정·불안 · complain · refuse · health · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. Prior complain c-623–632 · refuse · promise · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Pack note only (no ThemeSm)
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const wn = pack.packs.find((p) => p.id === "warn-caution");
if (wn) {
  wn.note =
    "Everyday warn / heed caution / be dangerous / avoid / prevent / cope / warning-noun / caution-noun / safety-noun / precautions / urgent / emergency survival — distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (긴급·비상) · Suggest bingo/listen · themes warn · chip 제안 경고/警告 · ThemeSm 미터치.";
}
pack.note =
  "+warn-caution 12 (경고하다·주의하다·위험하다·피하다·예방하다·대처하다·경고·주의·안전·주의사항·긴급·비상) 2026-07-27. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 긴급·비상 · Suggest bingo/listen · themes warn · chip 제안 경고/警告 · ThemeSm 미터치. Existing packs kept (incl. complain-dissatisfaction ThemeSm58 closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Speed note pointer only
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 warn-caution MCQ (sq-641–650, 2026-07-27). Pack lemmas 경고하다·주의하다·위험하다·피하다·예방하다·대처하다·경고·주의·안전·주의사항. Prefer 긴급·비상 → cloze Done (c-633–642). Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · advice. NIKL/Sejong·Tammy. No brand names. Prior complain sq-631–640 kept. Suggest bingo/listen · chip 제안 KO 경고 / ZH 警告 · ThemeSm/칩 미터치.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Canon note
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
const warnCanon = (canon.themes || canon.keys || []).find
  ? null
  : null;
const themeList = canon.themes || canon.entries || canon.items || null;
// theme-key-canon structure: find warn entry
function findWarnEntry(obj) {
  if (Array.isArray(obj)) {
    return obj.find((t) => t.themeKey === "warn" || t.id === "warn");
  }
  if (obj && typeof obj === "object") {
    if (obj.warn) return obj.warn;
    for (const v of Object.values(obj)) {
      const hit = findWarnEntry(v);
      if (hit) return hit;
    }
  }
  return null;
}
const warnEntry = findWarnEntry(canon);
if (warnEntry && typeof warnEntry === "object") {
  warnEntry.notes =
    "Pack+speed Done · cloze +10 Done (c-633–642 Prefer 긴급·비상, 2026-07-27). ThemeSm chip not enabled yet. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · advice. Suggest bingo/listen.";
  fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
}

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = (man.version || 253) + 1;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 687 · listen-match 654 · speed 650 · telephone 585 · scramble 587 · dictation 642 · cloze 642 · particle 636. +warn-caution cloze +10 (c-633–642) · themes warn · warnTagged 10(cloze)+10(speed) · Prefer 긴급·비상 Done · Suggest bingo/listen · chip 제안 KO 경고 / ZH 警告 · ThemeSm/칩 미터치. Prior pack+speed sq-641–650. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 65;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const warnTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("warn")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      warnTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 경고하다·주의하다·위험하다·피하다",
      warnCanonUpdated: !!warnEntry,
    },
    null,
    2
  )
);

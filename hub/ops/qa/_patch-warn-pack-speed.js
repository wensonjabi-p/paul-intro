/**
 * One-shot: warn-caution intermediate pack + speed +10.
 * No cloze · no ThemeSm chip enable.
 * Run: node hub/ops/qa/_patch-warn-pack-speed.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../../..");
const intPath = path.join(root, "hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const sqPath = path.join(root, "hub/app/data/games/speed-quiz-beginner.json");
const manPath = path.join(root, "hub/app/data/games/manifest.json");
const canonPath = path.join(root, "hub/app/data/vocab/theme-key-canon.json");

const pack = {
  id: "warn-caution",
  title: {
    en: "Warn & caution",
    ko: "경고·주의",
    zh: "警告与注意",
  },
  grammarHooks: ["지 마세요", "(으)면", "때문에"],
  note: "Everyday warn / heed caution / be dangerous / avoid / prevent / cope / warning-noun / caution-noun / safety-noun / precautions / urgent / emergency survival — distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 긴급·비상 → cloze · themes warn · chip 제안 경고/警告 · ThemeSm 미터치.",
  items: [
    {
      id: "int-wn-01",
      lemma: "경고하다",
      pos: "v",
      senseId: "sns:경고하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to warn", ko: "경고하다", zh: "警告" },
      derived: ["경고"],
      example: {
        ko: "선생님께서 늦게 오지 말라고 경고해요.",
        en: "The teacher warns us not to come late.",
        zh: "老师警告我们不要迟到。",
      },
    },
    {
      id: "int-wn-02",
      lemma: "주의하다",
      pos: "v",
      senseId: "sns:주의하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to pay attention; heed caution", ko: "주의하다", zh: "注意；当心" },
      derived: ["주의"],
      example: {
        ko: "미끄러운 길에 주의하세요.",
        en: "Please watch out for the slippery road.",
        zh: "请注意湿滑的路。",
      },
    },
    {
      id: "int-wn-03",
      lemma: "위험하다",
      pos: "a",
      senseId: "sns:위험하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to be dangerous", ko: "위험하다", zh: "危险" },
      derived: ["위험"],
      example: {
        ko: "혼자 밤에 가는 건 위험해요.",
        en: "Going alone at night is dangerous.",
        zh: "晚上一个人走很危险。",
      },
    },
    {
      id: "int-wn-04",
      lemma: "피하다",
      pos: "v",
      senseId: "sns:피하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to avoid", ko: "피하다", zh: "避开；避免" },
      example: {
        ko: "붐비는 시간은 피해요.",
        en: "I avoid busy times.",
        zh: "我避开高峰时间。",
      },
    },
    {
      id: "int-wn-05",
      lemma: "예방하다",
      pos: "v",
      senseId: "sns:예방하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to prevent", ko: "예방하다", zh: "预防" },
      derived: ["예방"],
      example: {
        ko: "감기를 예방하려고 손을 자주 씻어요.",
        en: "I wash my hands often to prevent a cold.",
        zh: "为了预防感冒，我经常洗手。",
      },
    },
    {
      id: "int-wn-06",
      lemma: "대처하다",
      pos: "v",
      senseId: "sns:대처하다.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "to cope; deal with", ko: "대처하다", zh: "应对；处理" },
      derived: ["대처"],
      example: {
        ko: "갑자기 비가 와도 대처할 수 있어요.",
        en: "I can cope even if it rains suddenly.",
        zh: "即使突然下雨也能应对。",
      },
    },
    {
      id: "int-wn-07",
      lemma: "경고",
      pos: "n",
      senseId: "sns:경고.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "warning (noun)", ko: "경고", zh: "警告" },
      example: {
        ko: "첫 경고만 받았어요.",
        en: "I only got a first warning.",
        zh: "我只收到了第一次警告。",
      },
    },
    {
      id: "int-wn-08",
      lemma: "주의",
      pos: "n",
      senseId: "sns:주의.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "caution; attention (noun)", ko: "주의", zh: "注意；当心" },
      example: {
        ko: "계단에서 주의가 필요해요.",
        en: "Caution is needed on the stairs.",
        zh: "楼梯上需要注意。",
      },
    },
    {
      id: "int-wn-09",
      lemma: "안전",
      pos: "n",
      senseId: "sns:안전.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "safety (noun)", ko: "안전", zh: "安全" },
      example: {
        ko: "안전을 위해 헬멧을 써요.",
        en: "I wear a helmet for safety.",
        zh: "为了安全我戴头盔。",
      },
    },
    {
      id: "int-wn-10",
      lemma: "주의사항",
      pos: "n",
      senseId: "sns:주의사항.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "precautions; notices", ko: "주의사항", zh: "注意事项" },
      example: {
        ko: "사용 전에 주의사항을 읽어요.",
        en: "I read the precautions before use.",
        zh: "使用前我阅读注意事项。",
      },
    },
    {
      id: "int-wn-11",
      lemma: "긴급",
      pos: "n",
      senseId: "sns:긴급.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "urgency; emergency (bound)", ko: "긴급", zh: "紧急" },
      example: {
        ko: "긴급 연락처를 남겨 주세요.",
        en: "Please leave an emergency contact.",
        zh: "请留下紧急联系方式。",
      },
    },
    {
      id: "int-wn-12",
      lemma: "비상",
      pos: "n",
      senseId: "sns:비상.1",
      themes: ["warn"],
      levelBand: "int-low",
      gloss: { en: "emergency (noun)", ko: "비상", zh: "紧急；非常" },
      example: {
        ko: "비상구가 어디에 있어요?",
        en: "Where is the emergency exit?",
        zh: "紧急出口在哪里？",
      },
    },
  ],
};

const speedItems = [
  {
    id: "sq-641",
    prompt: { en: "To warn?", ko: "경고하다?", zh: "警告？" },
    choices: ["경고하다", "주의하다", "피하다", "예방하다"],
    answer: 0,
    explain: {
      en: "경고하다 = to warn.",
      ko: "경고하다 = 위험·잘못을 미리 알리다.",
      zh: "경고하다 = 警告。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-642",
    prompt: { en: "To pay attention / heed caution?", ko: "주의하다?", zh: "注意？" },
    choices: ["대처하다", "주의하다", "위험하다", "경고하다"],
    answer: 1,
    explain: {
      en: "주의하다 = to pay attention / heed caution.",
      ko: "주의하다 = 조심하여 살피다.",
      zh: "주의하다 = 注意；当心。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-643",
    prompt: { en: "To be dangerous?", ko: "위험하다?", zh: "危险？" },
    choices: ["안전", "피하다", "위험하다", "주의"],
    answer: 2,
    explain: {
      en: "위험하다 = to be dangerous.",
      ko: "위험하다 = 해로울 가능성이 크다.",
      zh: "위험하다 = 危险。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-644",
    prompt: { en: "To avoid?", ko: "피하다?", zh: "避开？" },
    choices: ["예방하다", "피하다", "대처하다", "경고하다"],
    answer: 1,
    explain: {
      en: "피하다 = to avoid.",
      ko: "피하다 = 만나지 않거나 겪지 않게 하다.",
      zh: "피하다 = 避开；避免。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-645",
    prompt: { en: "To prevent?", ko: "예방하다?", zh: "预防？" },
    choices: ["주의하다", "위험하다", "경고", "예방하다"],
    answer: 3,
    explain: {
      en: "예방하다 = to prevent.",
      ko: "예방하다 = 미리 막아 두다.",
      zh: "예방하다 = 预防。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-646",
    prompt: { en: "To cope / deal with?", ko: "대처하다?", zh: "应对？" },
    choices: ["대처하다", "피하다", "주의하다", "경고하다"],
    answer: 0,
    explain: {
      en: "대처하다 = to cope / deal with.",
      ko: "대처하다 = 상황에 맞게 처리하다.",
      zh: "대처하다 = 应对；处理。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-647",
    prompt: { en: "Warning (noun)?", ko: "경고?", zh: "警告？" },
    choices: ["주의", "안전", "경고", "주의사항"],
    answer: 2,
    explain: {
      en: "경고 = warning (noun).",
      ko: "경고 = 위험·잘못을 알리는 말·행동.",
      zh: "경고 = 警告。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-648",
    prompt: { en: "Caution / attention (noun)?", ko: "주의?", zh: "注意？" },
    choices: ["경고", "주의", "안전", "예방하다"],
    answer: 1,
    explain: {
      en: "주의 = caution / attention (noun).",
      ko: "주의 = 조심하여 살핌.",
      zh: "주의 = 注意；当心。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-649",
    prompt: { en: "Safety (noun)?", ko: "안전?", zh: "安全？" },
    choices: ["안전", "경고", "주의", "위험하다"],
    answer: 0,
    explain: {
      en: "안전 = safety (noun).",
      ko: "안전 = 위험이 없는 상태.",
      zh: "안전 = 安全。",
    },
    tags: ["warn", "intermediate"],
  },
  {
    id: "sq-650",
    prompt: { en: "Precautions / notices?", ko: "주의사항?", zh: "注意事项？" },
    choices: ["대처하다", "피하다", "주의사항", "경고하다"],
    answer: 2,
    explain: {
      en: "주의사항 = precautions / notices.",
      ko: "주의사항 = 조심해야 할 내용.",
      zh: "주의사항 = 注意事项。",
    },
    tags: ["warn", "intermediate"],
  },
];

const int = JSON.parse(fs.readFileSync(intPath, "utf8"));
if (int.packs.some((p) => p.id === "warn-caution")) {
  console.error("warn-caution already present — abort");
  process.exit(1);
}
const allLemmas = new Set();
for (const p of int.packs) {
  for (const it of p.items) allLemmas.add(it.lemma);
}
const dup = pack.items.filter((it) => allLemmas.has(it.lemma)).map((it) => it.lemma);
if (dup.length) {
  console.error("lemma collision:", dup.join(", "));
  process.exit(1);
}

int.version = 65;
int.inspiredBy = int.inspiredBy.replace(
  "complain-dissatisfaction scenes",
  "complain-dissatisfaction/warn-caution scenes"
);
if (!int.copyright.includes("Warn-caution pack")) {
  int.copyright = int.copyright.replace(
    "Complain-dissatisfaction pack = generic complain/protest/dissatisfaction terms only (no brand names).",
    "Complain-dissatisfaction pack = generic complain/protest/dissatisfaction terms only (no brand names). Warn-caution pack = generic warn/caution/safety/emergency terms only (no brand names)."
  );
}
int.note =
  "+warn-caution 12 (경고하다·주의하다·위험하다·피하다·예방하다·대처하다·경고·주의·안전·주의사항·긴급·비상) 2026-07-27. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem 문제·상황 · emotion 걱정·불안 · complain · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 긴급·비상 → cloze · ThemeSm/칩 미터치 · themes warn · chip 제안 경고/警告. Existing packs kept (incl. complain-dissatisfaction sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
int.packs.push(pack);
fs.writeFileSync(intPath, JSON.stringify(int, null, 2) + "\n");

const sq = JSON.parse(fs.readFileSync(sqPath, "utf8"));
if (sq.items.some((i) => i.id === "sq-641")) {
  console.error("sq-641 already present — abort");
  process.exit(1);
}
sq.version = 65;
if (!sq.themes.includes("warn")) sq.themes.push("warn");
sq.copyright = sq.copyright.replace(
  "refuse-accept/complain-dissatisfaction crossfill",
  "refuse-accept/complain-dissatisfaction/warn-caution crossfill"
);
sq.items.push(...speedItems);
sq.note =
  "+10 warn-caution MCQ (sq-641–650, 2026-07-27). Pack lemmas 경고하다·주의하다·위험하다·피하다·예방하다·대처하다·경고·주의·안전·주의사항. Prefer 긴급·비상 → cloze. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · advice. NIKL/Sejong·Tammy. No brand names. Prior complain sq-631–640 kept. ThemeSm/칩 미터치 · Suggest cloze only · chip 제안 KO 경고 / ZH 警告.";
fs.writeFileSync(sqPath, JSON.stringify(sq, null, 2) + "\n");

const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
man.version = 253;
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 687 · listen-match 654 · speed 650 · telephone 585 · scramble 587 · dictation 642 · cloze 632 · particle 636. +warn-caution pack 12 + speed +10 (sq-641–650) · themes warn · warnTagged 10 · Prefer 긴급·비상 → cloze · chip 제안 KO 경고 / ZH 警告 · ThemeSm/칩 미터치. Prior complain ThemeSm58 closed. hangul.js untouched.";
const speedGame = man.games.find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 65;
  speedGame.itemCount = 650;
  speedGame.count = 650;
}
fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + "\n");

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
if (canon.source) canon.source.intermediatePacks = 65;
if (!canon.themes.some((t) => t.themeKey === "warn")) {
  const complainIdx = canon.themes.findIndex((t) => t.themeKey === "complain");
  const warnEntry = {
    themeKey: "warn",
    status: "active",
    chip: { ko: "경고", zh: "警告", en: "Warn" },
    packIds: ["warn-caution"],
    notes:
      "Pack+speed Done (2026-07-27). ThemeSm chip not enabled yet. Distinct from rules 안전하다·금지하다 · driving 위험·조심하다 · problem · emotion 걱정·불안 · complain · advice. Prefer 긴급·비상 → cloze.",
  };
  if (complainIdx >= 0) canon.themes.splice(complainIdx + 1, 0, warnEntry);
  else canon.themes.push(warnEntry);
}
fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");

const lemmaCount = int.packs.reduce((n, p) => n + p.items.length, 0);
const warnTagged = sq.items.filter((i) => (i.tags || []).includes("warn")).length;
console.log(
  JSON.stringify(
    {
      packId: "warn-caution",
      packs: int.packs.length,
      lemmaCount,
      packLemmas: pack.items.length,
      speedTotal: sq.items.length,
      warnTagged,
      manifest: man.version,
      preferCloze: ["긴급", "비상"],
      chipSuggested: { ko: "경고", zh: "警告" },
    },
    null,
    2
  )
);

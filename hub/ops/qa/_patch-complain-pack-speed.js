/**
 * One-shot: complain-dissatisfaction intermediate pack + speed +10.
 * No cloze · no ThemeSm chip enable.
 * Run: node hub/ops/qa/_patch-complain-pack-speed.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../../..");
const intPath = path.join(root, "hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const sqPath = path.join(root, "hub/app/data/games/speed-quiz-beginner.json");
const manPath = path.join(root, "hub/app/data/games/manifest.json");
const canonPath = path.join(root, "hub/app/data/vocab/theme-key-canon.json");

const pack = {
  id: "complain-dissatisfaction",
  title: {
    en: "Complain & dissatisfaction",
    ko: "불만·항의",
    zh: "不满与抗议",
  },
  grammarHooks: ["다고 하다", "-지만", "아/어 주다"],
  note: "Everyday complain / protest / quibble / raise an issue / vent / be unsatisfactory / dissatisfaction / complaint / protest-noun / report / objection / venting-noun survival — distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse 거절하다 · apology 불편하다 · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 이의·하소연 → cloze · themes complain · chip 제안 불만/不满 · ThemeSm 미터치.",
  items: [
    {
      id: "int-cm-01",
      lemma: "불평하다",
      pos: "v",
      senseId: "sns:불평하다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to complain", ko: "불평하다", zh: "抱怨" },
      derived: ["불평"],
      example: {
        ko: "음식에 대해 불평하지 마세요.",
        en: "Please don't complain about the food.",
        zh: "请不要抱怨食物。",
      },
    },
    {
      id: "int-cm-02",
      lemma: "항의하다",
      pos: "v",
      senseId: "sns:항의하다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to protest; object", ko: "항의하다", zh: "抗议" },
      derived: ["항의"],
      example: {
        ko: "요금 인상에 항의해요.",
        en: "I protest the fare increase.",
        zh: "我抗议涨价。",
      },
    },
    {
      id: "int-cm-03",
      lemma: "따지다",
      pos: "v",
      senseId: "sns:따지다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to argue over; quibble", ko: "따지다", zh: "计较；追究" },
      example: {
        ko: "작은 실수를 따지지 마세요.",
        en: "Please don't quibble over small mistakes.",
        zh: "请不要计较小失误。",
      },
    },
    {
      id: "int-cm-04",
      lemma: "제기하다",
      pos: "v",
      senseId: "sns:제기하다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to raise (an issue)", ko: "제기하다", zh: "提出" },
      derived: ["제기"],
      example: {
        ko: "문제를 정중히 제기해요.",
        en: "I raise the issue politely.",
        zh: "我礼貌地提出问题。",
      },
    },
    {
      id: "int-cm-05",
      lemma: "하소연하다",
      pos: "v",
      senseId: "sns:하소연하다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to vent; complain to someone", ko: "하소연하다", zh: "诉苦；诉说" },
      derived: ["하소연"],
      example: {
        ko: "친구에게 스트레스를 하소연해요.",
        en: "I vent my stress to a friend.",
        zh: "我向朋友诉说压力。",
      },
    },
    {
      id: "int-cm-06",
      lemma: "불만스럽다",
      pos: "a",
      senseId: "sns:불만스럽다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to be unsatisfactory; displeased", ko: "불만스럽다", zh: "不满" },
      derived: ["불만"],
      example: {
        ko: "서비스가 불만스러워요.",
        en: "The service is unsatisfactory.",
        zh: "服务让人不满意。",
      },
    },
    {
      id: "int-cm-07",
      lemma: "불만",
      pos: "n",
      senseId: "sns:불만.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "dissatisfaction; complaint", ko: "불만", zh: "不满" },
      example: {
        ko: "불만을 말씀해 주세요.",
        en: "Please tell me your complaints.",
        zh: "请说出您的不满。",
      },
    },
    {
      id: "int-cm-08",
      lemma: "불평",
      pos: "n",
      senseId: "sns:불평.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "complaint; grumbling (noun)", ko: "불평", zh: "抱怨" },
      example: {
        ko: "불평이 계속 나와요.",
        en: "Complaints keep coming up.",
        zh: "抱怨不断。",
      },
    },
    {
      id: "int-cm-09",
      lemma: "항의",
      pos: "n",
      senseId: "sns:항의.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "protest; objection (noun)", ko: "항의", zh: "抗议" },
      example: {
        ko: "항의가 많아서 회의를 열어요.",
        en: "There are many protests, so we're holding a meeting.",
        zh: "抗议很多，所以开会。",
      },
    },
    {
      id: "int-cm-10",
      lemma: "신고하다",
      pos: "v",
      senseId: "sns:신고하다.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "to report (a problem)", ko: "신고하다", zh: "举报；申报" },
      derived: ["신고"],
      example: {
        ko: "소음을 관리실에 신고해요.",
        en: "I report the noise to the management office.",
        zh: "我向管理处举报噪音。",
      },
    },
    {
      id: "int-cm-11",
      lemma: "이의",
      pos: "n",
      senseId: "sns:이의.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "objection; dissent (noun)", ko: "이의", zh: "异议" },
      example: {
        ko: "결정에 이의가 있어요.",
        en: "I have an objection to the decision.",
        zh: "我对决定有异议。",
      },
    },
    {
      id: "int-cm-12",
      lemma: "하소연",
      pos: "n",
      senseId: "sns:하소연.1",
      themes: ["complain"],
      levelBand: "int-low",
      gloss: { en: "venting; complaint (noun)", ko: "하소연", zh: "诉苦；诉说" },
      example: {
        ko: "긴 하소연을 들었어요.",
        en: "I listened to a long complaint.",
        zh: "我听了一大段诉苦。",
      },
    },
  ],
};

const speedItems = [
  {
    id: "sq-631",
    prompt: { en: "To complain?", ko: "불평하다?", zh: "抱怨？" },
    choices: ["불평하다", "항의하다", "신고하다", "제기하다"],
    answer: 0,
    explain: {
      en: "불평하다 = to complain.",
      ko: "불평하다 = 불만스럽게 말하다.",
      zh: "불평하다 = 抱怨。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-632",
    prompt: { en: "To protest / object?", ko: "항의하다?", zh: "抗议？" },
    choices: ["따지다", "항의하다", "불평하다", "하소연하다"],
    answer: 1,
    explain: {
      en: "항의하다 = to protest / object.",
      ko: "항의하다 = 잘못·불이익에 맞서 말하다.",
      zh: "항의하다 = 抗议。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-633",
    prompt: { en: "To argue over / quibble?", ko: "따지다?", zh: "计较？" },
    choices: ["제기하다", "신고하다", "따지다", "불만스럽다"],
    answer: 2,
    explain: {
      en: "따지다 = to argue over / quibble.",
      ko: "따지다 = 잘잘못을 캐물어 말하다.",
      zh: "따지다 = 计较；追究。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-634",
    prompt: { en: "To raise (an issue)?", ko: "제기하다?", zh: "提出？" },
    choices: ["하소연하다", "제기하다", "불평하다", "항의하다"],
    answer: 1,
    explain: {
      en: "제기하다 = to raise (an issue).",
      ko: "제기하다 = 문제·의견을 꺼내 놓다.",
      zh: "제기하다 = 提出。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-635",
    prompt: { en: "To vent / complain to someone?", ko: "하소연하다?", zh: "诉苦？" },
    choices: ["신고하다", "따지다", "불만스럽다", "하소연하다"],
    answer: 3,
    explain: {
      en: "하소연하다 = to vent / complain to someone.",
      ko: "하소연하다 = 힘든 일을 털어놓다.",
      zh: "하소연하다 = 诉苦；诉说。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-636",
    prompt: { en: "To be unsatisfactory / displeased?", ko: "불만스럽다?", zh: "不满？" },
    choices: ["불만스럽다", "불평하다", "항의하다", "제기하다"],
    answer: 0,
    explain: {
      en: "불만스럽다 = to be unsatisfactory / displeased.",
      ko: "불만스럽다 = 마음에 차지 않다.",
      zh: "불만스럽다 = 不满。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-637",
    prompt: { en: "Dissatisfaction (noun)?", ko: "불만?", zh: "不满？" },
    choices: ["항의", "불평", "불만", "신고하다"],
    answer: 2,
    explain: {
      en: "불만 = dissatisfaction (noun).",
      ko: "불만 = 마음에 차지 않음.",
      zh: "불만 = 不满。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-638",
    prompt: { en: "Complaint / grumbling (noun)?", ko: "불평?", zh: "抱怨？" },
    choices: ["이의", "불평", "하소연", "항의"],
    answer: 1,
    explain: {
      en: "불평 = complaint / grumbling (noun).",
      ko: "불평 = 불만스럽게 하는 말.",
      zh: "불평 = 抱怨。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-639",
    prompt: { en: "Protest (noun)?", ko: "항의?", zh: "抗议？" },
    choices: ["항의", "불만", "따지다", "제기하다"],
    answer: 0,
    explain: {
      en: "항의 = protest (noun).",
      ko: "항의 = 잘못에 맞서는 말·행동.",
      zh: "항의 = 抗议。",
    },
    tags: ["complain", "intermediate"],
  },
  {
    id: "sq-640",
    prompt: { en: "To report (a problem)?", ko: "신고하다?", zh: "举报？" },
    choices: ["하소연하다", "불평하다", "신고하다", "따지다"],
    answer: 2,
    explain: {
      en: "신고하다 = to report (a problem).",
      ko: "신고하다 = 사실을 알려 조치를 요청하다.",
      zh: "신고하다 = 举报；申报。",
    },
    tags: ["complain", "intermediate"],
  },
];

const int = JSON.parse(fs.readFileSync(intPath, "utf8"));
if (int.packs.some((p) => p.id === "complain-dissatisfaction")) {
  console.error("complain-dissatisfaction already present — abort");
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

int.version = 64;
int.inspiredBy = int.inspiredBy.replace(
  "refuse-accept scenes",
  "refuse-accept/complain-dissatisfaction scenes"
);
if (!int.copyright.includes("Complain-dissatisfaction pack")) {
  int.copyright = int.copyright.replace(
    "Refuse-accept pack = generic refuse/accept/consent/reject terms only (no brand names).",
    "Refuse-accept pack = generic refuse/accept/consent/reject terms only (no brand names). Complain-dissatisfaction pack = generic complain/protest/dissatisfaction terms only (no brand names)."
  );
}
int.note =
  "+complain-dissatisfaction 12 (불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평·항의·신고하다·이의·하소연) 2026-07-27. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology · favor · advice · speech. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 이의·하소연 → cloze · ThemeSm/칩 미터치 · themes complain · chip 제안 불만/不满. Existing packs kept (incl. refuse-accept sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
int.packs.push(pack);
fs.writeFileSync(intPath, JSON.stringify(int, null, 2) + "\n");

const sq = JSON.parse(fs.readFileSync(sqPath, "utf8"));
if (sq.items.some((i) => i.id === "sq-631")) {
  console.error("sq-631 already present — abort");
  process.exit(1);
}
sq.version = 64;
if (!sq.themes.includes("complain")) sq.themes.push("complain");
sq.copyright = sq.copyright.replace(
  "refuse-accept crossfill",
  "refuse-accept/complain-dissatisfaction crossfill"
);
sq.items.push(...speedItems);
sq.note =
  "+10 complain-dissatisfaction MCQ (sq-631–640, 2026-07-27). Pack lemmas 불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평·항의·신고하다. Prefer 이의·하소연 → cloze. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology · favor. NIKL/Sejong·Tammy. No brand names. Prior refuse sq-621–630 kept. ThemeSm/칩 미터치 · Suggest cloze only · chip 제안 KO 불만 / ZH 不满.";
fs.writeFileSync(sqPath, JSON.stringify(sq, null, 2) + "\n");

const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
man.version = 249;
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 677 · listen-match 644 · speed 640 · telephone 577 · scramble 579 · dictation 632 · cloze 622 · particle 626. +complain-dissatisfaction pack 12 + speed +10 (sq-631–640) · themes complain · complainTagged 10 · Prefer 이의·하소연 → cloze · chip 제안 KO 불만 / ZH 不满 · ThemeSm/칩 미터치. Prior refuse ThemeSm57 closed. hangul.js untouched.";
const speedGame = man.games.find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 64;
  speedGame.itemCount = 640;
  speedGame.count = 640;
}
fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + "\n");

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
if (canon.source) canon.source.intermediatePacks = 64;
if (!canon.themes.some((t) => t.themeKey === "complain")) {
  const refuseIdx = canon.themes.findIndex((t) => t.themeKey === "refuse");
  const complainEntry = {
    themeKey: "complain",
    status: "active",
    chip: { ko: "불만", zh: "不满", en: "Complain" },
    packIds: ["complain-dissatisfaction"],
    notes:
      "Pack+speed Done (2026-07-27). ThemeSm chip not enabled yet. Distinct from emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology. Prefer 이의·하소연 → cloze.",
  };
  if (refuseIdx >= 0) canon.themes.splice(refuseIdx + 1, 0, complainEntry);
  else canon.themes.push(complainEntry);
}
fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");

const lemmaCount = int.packs.reduce((n, p) => n + p.items.length, 0);
const complainTagged = sq.items.filter((i) => (i.tags || []).includes("complain")).length;
console.log(
  JSON.stringify(
    {
      packId: "complain-dissatisfaction",
      packs: int.packs.length,
      lemmaCount,
      packLemmas: pack.items.length,
      speedTotal: sq.items.length,
      complainTagged,
      manifest: man.version,
      preferCloze: ["이의", "하소연"],
      chipSuggested: { ko: "불만", zh: "不满" },
    },
    null,
    2
  )
);

/**
 * Offline loop: advice-counsel pack + speed-quiz +10
 * Run: node hub/ops/qa/_patch-advice-pack-speed.js
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

if (p.packs.some((x) => x.id === "advice-counsel")) {
  console.error("advice-counsel already present — abort");
  process.exit(1);
}

p.version = 59;
p.inspiredBy = p.inspiredBy.replace(
  "success-challenge scenes",
  "success-challenge/advice-counsel scenes"
);
p.copyright = p.copyright.replace(
  "Success-challenge pack = generic success/challenge/hope terms only (no brand names).",
  "Success-challenge pack = generic success/challenge/hope terms only (no brand names). Advice-counsel pack = generic advice/suggest/consult terms only (no brand names)."
);
p.note =
  "+advice-counsel 12 (조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다·조언·상담) 2026-07-27. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 조언·상담 → cloze · Suggest ThemeSm54a · themes advice · chip 조언/建议. Existing packs kept (incl. success-challenge sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";

const newPack = {
  id: "advice-counsel",
  title: {
    en: "Advice & counsel",
    ko: "조언·제안",
    zh: "建议与咨询",
  },
  grammarHooks: ["아/어 주다", "-(으)ㄹ까요", "도록 하다"],
  note: "Everyday advise / suggest / consult / inquire / urge / admonish / info / inform / reply / guide / advice / counseling survival — distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다·부탁하다 · think · problem · success · housing 문의(n). Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 조언·상담 → cloze · Suggest ThemeSm54a · themes advice · chip 조언/建议.",
  items: [
    {
      id: "int-ad-01",
      lemma: "조언하다",
      pos: "v",
      senseId: "sns:조언하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "to advise", ko: "조언하다", zh: "建议；劝告" },
      derived: ["조언"],
      example: {
        ko: "친구에게 진로를 조언해요.",
        en: "I advise a friend about their career path.",
        zh: "我给朋友建议出路。",
      },
    },
    {
      id: "int-ad-02",
      lemma: "제안하다",
      pos: "v",
      senseId: "sns:제안하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "to propose; suggest", ko: "제안하다", zh: "提议；建议" },
      derived: ["제안"],
      example: {
        ko: "회의에서 새 일정을 제안해요.",
        en: "I propose a new schedule at the meeting.",
        zh: "我在会议上提议新日程。",
      },
    },
    {
      id: "int-ad-03",
      lemma: "상담하다",
      pos: "v",
      senseId: "sns:상담하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: {
        en: "to consult; get counseling",
        ko: "상담하다",
        zh: "咨询；商谈",
      },
      derived: ["상담"],
      example: {
        ko: "선생님과 성적을 상담해요.",
        en: "I consult with the teacher about grades.",
        zh: "我和老师商量成绩。",
      },
    },
    {
      id: "int-ad-04",
      lemma: "문의하다",
      pos: "v",
      senseId: "sns:문의하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "to inquire; ask about", ko: "문의하다", zh: "询问；咨询" },
      derived: ["문의"],
      example: {
        ko: "수업 시간에 대해 문의해요.",
        en: "I inquire about class times.",
        zh: "我询问上课时间。",
      },
    },
    {
      id: "int-ad-05",
      lemma: "권하다",
      pos: "v",
      senseId: "sns:권하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: {
        en: "to urge; recommend (doing)",
        ko: "권하다",
        zh: "劝；劝说",
      },
      example: {
        ko: "휴식을 좀 권해요.",
        en: "I urge them to rest a bit.",
        zh: "我劝他们休息一下。",
      },
    },
    {
      id: "int-ad-06",
      lemma: "충고하다",
      pos: "v",
      senseId: "sns:충고하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: {
        en: "to admonish; give counsel",
        ko: "충고하다",
        zh: "忠告；劝诫",
      },
      derived: ["충고"],
      example: {
        ko: "부모님께서 조심하라고 충고하세요.",
        en: "My parents advise me to be careful.",
        zh: "父母忠告我要小心。",
      },
    },
    {
      id: "int-ad-07",
      lemma: "정보",
      pos: "n",
      senseId: "sns:정보.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "information", ko: "정보", zh: "信息；情报" },
      example: {
        ko: "여행 정보가 필요해요.",
        en: "I need travel information.",
        zh: "我需要旅行信息。",
      },
    },
    {
      id: "int-ad-08",
      lemma: "알려주다",
      pos: "v",
      senseId: "sns:알려주다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: {
        en: "to let know; inform (someone)",
        ko: "알려주다",
        zh: "告诉；告知",
      },
      example: {
        ko: "주소를 알려 주세요.",
        en: "Please let me know the address.",
        zh: "请告诉我地址。",
      },
    },
    {
      id: "int-ad-09",
      lemma: "답변",
      pos: "n",
      senseId: "sns:답변.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "reply; answer (noun)", ko: "답변", zh: "答复；回答" },
      derived: ["답변하다"],
      example: {
        ko: "빠른 답변 고마워요.",
        en: "Thanks for the quick reply.",
        zh: "谢谢快速答复。",
      },
    },
    {
      id: "int-ad-10",
      lemma: "안내하다",
      pos: "v",
      senseId: "sns:안내하다.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: {
        en: "to guide; show the way; brief",
        ko: "안내하다",
        zh: "引导；介绍；指引",
      },
      derived: ["안내"],
      example: {
        ko: "직원이 자리를 안내해요.",
        en: "A staff member shows us to our seats.",
        zh: "职员引导我们入座。",
      },
    },
    {
      id: "int-ad-11",
      lemma: "조언",
      pos: "n",
      senseId: "sns:조언.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "advice (noun)", ko: "조언", zh: "建议；忠告" },
      example: {
        ko: "선배의 조언을 들어요.",
        en: "I listen to a senior's advice.",
        zh: "我听前辈的建议。",
      },
    },
    {
      id: "int-ad-12",
      lemma: "상담",
      pos: "n",
      senseId: "sns:상담.1",
      themes: ["advice"],
      levelBand: "int-low",
      gloss: { en: "consultation; counseling", ko: "상담", zh: "咨询；商谈" },
      example: {
        ko: "오늘 상담이 있어요.",
        en: "I have a consultation today.",
        zh: "今天有咨询。",
      },
    },
  ],
};

p.packs.push(newPack);
writeJson(packPath, p);
console.log("pack", p.version, "packs", p.packs.length, "lemmas", newPack.items.length);

const sqPath = "app/data/games/speed-quiz-beginner.json";
const s = JSON.parse(fs.readFileSync(path.join(ROOT, sqPath), "utf8"));

if (s.items.some((i) => i.id === "sq-591")) {
  console.error("sq-591 already present — abort");
  process.exit(1);
}

s.version = 60;
if (!s.themes.includes("advice")) s.themes.push("advice");
s.copyright = s.copyright.replace(
  "apology-politeness/success-challenge",
  "apology-politeness/success-challenge/advice-counsel"
);

const speedItems = [
  {
    id: "sq-591",
    prompt: { en: "To advise?", ko: "조언하다?", zh: "建议？" },
    choices: ["조언하다", "제안하다", "정보", "답변"],
    answer: 0,
    explain: {
      en: "조언하다 = to advise.",
      ko: "조언하다 = 좋은 말을 해 주다.",
      zh: "조언하다 = 建议；劝告。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-592",
    prompt: { en: "To propose / suggest?", ko: "제안하다?", zh: "提议？" },
    choices: ["권하다", "제안하다", "상담하다", "안내하다"],
    answer: 1,
    explain: {
      en: "제안하다 = to propose / suggest.",
      ko: "제안하다 = 안을 내놓다.",
      zh: "제안하다 = 提议；建议。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-593",
    prompt: {
      en: "To consult / get counseling?",
      ko: "상담하다?",
      zh: "咨询？",
    },
    choices: ["문의하다", "알려주다", "상담하다", "충고하다"],
    answer: 2,
    explain: {
      en: "상담하다 = to consult / get counseling.",
      ko: "상담하다 = 문제를 이야기하고 도움을 받다.",
      zh: "상담하다 = 咨询；商谈。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-594",
    prompt: { en: "To inquire / ask about?", ko: "문의하다?", zh: "询问？" },
    choices: ["문의하다", "답변", "정보", "권하다"],
    answer: 0,
    explain: {
      en: "문의하다 = to inquire / ask about.",
      ko: "문의하다 = 알고 싶은 것을 묻다.",
      zh: "문의하다 = 询问；咨询。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-595",
    prompt: {
      en: "To urge / recommend doing?",
      ko: "권하다?",
      zh: "劝？",
    },
    choices: ["안내하다", "충고하다", "제안하다", "권하다"],
    answer: 3,
    explain: {
      en: "권하다 = to urge / recommend doing.",
      ko: "권하다 = 어떤 행동을 하도록 권하다.",
      zh: "권하다 = 劝；劝说。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-596",
    prompt: {
      en: "To admonish / give counsel?",
      ko: "충고하다?",
      zh: "忠告？",
    },
    choices: ["상담하다", "충고하다", "알려주다", "조언하다"],
    answer: 1,
    explain: {
      en: "충고하다 = to admonish / give counsel.",
      ko: "충고하다 = 바르게 하라고 말하다.",
      zh: "충고하다 = 忠告；劝诫。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-597",
    prompt: { en: "Information?", ko: "정보?", zh: "信息？" },
    choices: ["답변", "안내하다", "정보", "문의하다"],
    answer: 2,
    explain: {
      en: "정보 = information.",
      ko: "정보 = 알리는 내용·자료.",
      zh: "정보 = 信息；情报。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-598",
    prompt: {
      en: "To let know / inform someone?",
      ko: "알려주다?",
      zh: "告诉？",
    },
    choices: ["알려주다", "알리다", "답변", "권하다"],
    answer: 0,
    explain: {
      en: "알려주다 = to let someone know / inform them.",
      ko: "알려주다 = 상대에게 사실을 전하다.",
      zh: "알려주다 = 告诉；告知。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-599",
    prompt: { en: "Reply / answer (noun)?", ko: "답변?", zh: "答复？" },
    choices: ["상담하다", "정보", "제안하다", "답변"],
    answer: 3,
    explain: {
      en: "답변 = reply / answer (noun).",
      ko: "답변 = 질문에 대한 대답.",
      zh: "답변 = 答复；回答。",
    },
    tags: ["advice", "intermediate"],
  },
  {
    id: "sq-600",
    prompt: { en: "To guide / show the way?", ko: "안내하다?", zh: "引导？" },
    choices: ["문의하다", "안내하다", "충고하다", "조언하다"],
    answer: 1,
    explain: {
      en: "안내하다 = to guide / show the way / brief.",
      ko: "안내하다 = 길을 알려 주거나 소개하다.",
      zh: "안내하다 = 引导；介绍。",
    },
    tags: ["advice", "intermediate"],
  },
];

s.items.push(...speedItems);
s.note =
  "+10 advice-counsel MCQ (sq-591–600, 2026-07-27). Pack lemmas 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다. 조언·상담 → cloze Prefer. Distinct from opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다 · think · problem · success · housing 문의(n). NIKL/Sejong·Tammy. No brand names. Prior success sq-581–590 kept. Suggest cloze + ThemeSm54a · chip KO 조언 / ZH 建议.";

writeJson(sqPath, s);
console.log(
  "speed",
  s.version,
  "items",
  s.items.length,
  "adviceTagged",
  s.items.filter((i) => i.tags && i.tags.includes("advice")).length
);

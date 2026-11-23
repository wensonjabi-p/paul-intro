/**
 * One-shot: refuse-accept intermediate pack + speed +10.
 * Run: node hub/ops/qa/_patch-refuse-accept-pack.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../../..");
const intPath = path.join(root, "hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const sqPath = path.join(root, "hub/app/data/games/speed-quiz-beginner.json");
const manPath = path.join(root, "hub/app/data/games/manifest.json");
const canonPath = path.join(root, "hub/app/data/vocab/theme-key-canon.json");

const pack = {
  id: "refuse-accept",
  title: {
    en: "Refuse & accept",
    ko: "거절·수락",
    zh: "拒绝与接受",
  },
  grammarHooks: ["-지만", "아/어 주다", "(으)ㄹ 수 없다"],
  note: "Everyday refuse / accept / take in / decline politely / consent / reject / comply / approve / refuse-noun / accept-noun / consent-noun / rejection-noun survival — distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology 사양 장면 분리 · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 승낙·거부 → cloze · themes refuse · chip 거절/拒绝 · ThemeSm57a.",
  items: [
    {
      id: "int-rf-01",
      lemma: "거절하다",
      pos: "v",
      senseId: "sns:거절하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to refuse; decline", ko: "거절하다", zh: "拒绝" },
      derived: ["거절"],
      example: {
        ko: "그 제안은 정중히 거절해요.",
        en: "I politely refuse that proposal.",
        zh: "我礼貌地拒绝那个提议。",
      },
    },
    {
      id: "int-rf-02",
      lemma: "수락하다",
      pos: "v",
      senseId: "sns:수락하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to accept (an offer)", ko: "수락하다", zh: "接受；应允" },
      derived: ["수락"],
      example: {
        ko: "초대를 수락했어요.",
        en: "I accepted the invitation.",
        zh: "我接受了邀请。",
      },
    },
    {
      id: "int-rf-03",
      lemma: "받아들이다",
      pos: "v",
      senseId: "sns:받아들이다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to accept; take in", ko: "받아들이다", zh: "接受；接纳" },
      example: {
        ko: "의견을 받아들이기 어려워요.",
        en: "It's hard to accept that opinion.",
        zh: "很难接受那个意见。",
      },
    },
    {
      id: "int-rf-04",
      lemma: "사양하다",
      pos: "v",
      senseId: "sns:사양하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to decline politely", ko: "사양하다", zh: "婉拒；推辞" },
      derived: ["사양"],
      example: {
        ko: "이번엔 사양할게요.",
        en: "I'll pass this time.",
        zh: "这次我婉拒。",
      },
    },
    {
      id: "int-rf-05",
      lemma: "승낙하다",
      pos: "v",
      senseId: "sns:승낙하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to consent; give permission", ko: "승낙하다", zh: "允诺；答应" },
      derived: ["승낙"],
      example: {
        ko: "부모가 여행을 승낙했어요.",
        en: "My parents consented to the trip.",
        zh: "父母答应了旅行。",
      },
    },
    {
      id: "int-rf-06",
      lemma: "거부하다",
      pos: "v",
      senseId: "sns:거부하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to reject; refuse firmly", ko: "거부하다", zh: "拒绝；拒斥" },
      derived: ["거부"],
      example: {
        ko: "불공정한 조건은 거부해요.",
        en: "I reject unfair conditions.",
        zh: "我拒绝不公平的条件。",
      },
    },
    {
      id: "int-rf-07",
      lemma: "응하다",
      pos: "v",
      senseId: "sns:응하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to respond; comply", ko: "응하다", zh: "答应；响应" },
      example: {
        ko: "요청에 바로 응했어요.",
        en: "I complied with the request right away.",
        zh: "我马上答应了请求。",
      },
    },
    {
      id: "int-rf-08",
      lemma: "승인하다",
      pos: "v",
      senseId: "sns:승인하다.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "to approve; authorize", ko: "승인하다", zh: "批准；核准" },
      derived: ["승인"],
      example: {
        ko: "회사에서 휴가를 승인했어요.",
        en: "The company approved my leave.",
        zh: "公司批准了休假。",
      },
    },
    {
      id: "int-rf-09",
      lemma: "거절",
      pos: "n",
      senseId: "sns:거절.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "refusal (noun)", ko: "거절", zh: "拒绝" },
      example: {
        ko: "거절 이유를 말해 주세요.",
        en: "Please tell me the reason for the refusal.",
        zh: "请告诉我拒绝的理由。",
      },
    },
    {
      id: "int-rf-10",
      lemma: "수락",
      pos: "n",
      senseId: "sns:수락.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "acceptance (noun)", ko: "수락", zh: "接受；应允" },
      example: {
        ko: "수락 여부를 기다려요.",
        en: "I'm waiting to hear if it's accepted.",
        zh: "我在等是否接受。",
      },
    },
    {
      id: "int-rf-11",
      lemma: "승낙",
      pos: "n",
      senseId: "sns:승낙.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "consent (noun)", ko: "승낙", zh: "允诺；答应" },
      example: {
        ko: "승낙을 받은 뒤에 시작해요.",
        en: "We start after getting consent.",
        zh: "得到允诺后再开始。",
      },
    },
    {
      id: "int-rf-12",
      lemma: "거부",
      pos: "n",
      senseId: "sns:거부.1",
      themes: ["refuse"],
      levelBand: "int-low",
      gloss: { en: "rejection (noun)", ko: "거부", zh: "拒绝；拒斥" },
      example: {
        ko: "거부가 이어져서 걱정이에요.",
        en: "I'm worried because the rejections keep coming.",
        zh: "拒绝不断，让人担心。",
      },
    },
  ],
};

const speedItems = [
  {
    id: "sq-621",
    prompt: { en: "To refuse / decline?", ko: "거절하다?", zh: "拒绝？" },
    choices: ["거절하다", "수락하다", "승인하다", "응하다"],
    answer: 0,
    explain: {
      en: "거절하다 = to refuse / decline.",
      ko: "거절하다 = 받아들이지 않고 물리치다.",
      zh: "거절하다 = 拒绝。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-622",
    prompt: { en: "To accept (an offer)?", ko: "수락하다?", zh: "接受？" },
    choices: ["거부하다", "수락하다", "사양하다", "거절하다"],
    answer: 1,
    explain: {
      en: "수락하다 = to accept (an offer).",
      ko: "수락하다 = 제안·요청을 받아들이다.",
      zh: "수락하다 = 接受；应允。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-623",
    prompt: { en: "To accept / take in?", ko: "받아들이다?", zh: "接纳？" },
    choices: ["사양하다", "거부하다", "받아들이다", "거절하다"],
    answer: 2,
    explain: {
      en: "받아들이다 = to accept / take in.",
      ko: "받아들이다 = 의견·상황을 인정하고 받다.",
      zh: "받아들이다 = 接受；接纳。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-624",
    prompt: { en: "To decline politely?", ko: "사양하다?", zh: "婉拒？" },
    choices: ["승인하다", "사양하다", "수락하다", "응하다"],
    answer: 1,
    explain: {
      en: "사양하다 = to decline politely.",
      ko: "사양하다 = 예의 있게 받지 않다.",
      zh: "사양하다 = 婉拒；推辞。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-625",
    prompt: { en: "To consent / give permission?", ko: "승낙하다?", zh: "答应？" },
    choices: ["거절하다", "거부하다", "사양하다", "승낙하다"],
    answer: 3,
    explain: {
      en: "승낙하다 = to consent / give permission.",
      ko: "승낙하다 = 하겠다고 허락하다.",
      zh: "승낙하다 = 允诺；答应。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-626",
    prompt: { en: "To reject / refuse firmly?", ko: "거부하다?", zh: "拒斥？" },
    choices: ["거부하다", "수락하다", "승인하다", "응하다"],
    answer: 0,
    explain: {
      en: "거부하다 = to reject / refuse firmly.",
      ko: "거부하다 = 강하게 받아들이지 않다.",
      zh: "거부하다 = 拒绝；拒斥。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-627",
    prompt: { en: "To respond / comply?", ko: "응하다?", zh: "响应？" },
    choices: ["사양하다", "거절하다", "응하다", "거부하다"],
    answer: 2,
    explain: {
      en: "응하다 = to respond / comply.",
      ko: "응하다 = 요청에 맞춰 따르다.",
      zh: "응하다 = 答应；响应。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-628",
    prompt: { en: "To approve / authorize?", ko: "승인하다?", zh: "批准？" },
    choices: ["거절하다", "승인하다", "사양하다", "거부하다"],
    answer: 1,
    explain: {
      en: "승인하다 = to approve / authorize.",
      ko: "승인하다 = 공식으로 허가하다.",
      zh: "승인하다 = 批准；核准。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-629",
    prompt: { en: "Refusal (noun)?", ko: "거절?", zh: "拒绝？" },
    choices: ["수락", "거절", "승인하다", "응하다"],
    answer: 1,
    explain: {
      en: "거절 = refusal (noun).",
      ko: "거절 = 받아들이지 않음.",
      zh: "거절 = 拒绝。",
    },
    tags: ["refuse", "intermediate"],
  },
  {
    id: "sq-630",
    prompt: { en: "Acceptance (noun)?", ko: "수락?", zh: "接受？" },
    choices: ["거부", "거절", "수락", "사양하다"],
    answer: 2,
    explain: {
      en: "수락 = acceptance (noun).",
      ko: "수락 = 제안·요청을 받음.",
      zh: "수락 = 接受；应允。",
    },
    tags: ["refuse", "intermediate"],
  },
];

const int = JSON.parse(fs.readFileSync(intPath, "utf8"));
if (int.packs.some((p) => p.id === "refuse-accept")) {
  console.error("refuse-accept already present — abort");
  process.exit(1);
}
int.version = 63;
int.inspiredBy = int.inspiredBy.replace(
  "promise-trust scenes",
  "promise-trust/refuse-accept scenes"
);
if (!int.copyright.includes("Refuse-accept pack")) {
  int.copyright = int.copyright.replace(
    "Promise-trust pack = generic promise/trust/doubt/truth terms only (no brand names).",
    "Promise-trust pack = generic promise/trust/doubt/truth terms only (no brand names). Refuse-accept pack = generic refuse/accept/consent/reject terms only (no brand names)."
  );
}
int.note =
  "+refuse-accept 12 (거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·응하다·승인하다·거절·수락·승낙·거부) 2026-07-27. Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 승낙·거부 → cloze · Suggest ThemeSm57a · themes refuse · chip 거절/拒绝. Existing packs kept (incl. promise-trust sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
int.packs.push(pack);
fs.writeFileSync(intPath, JSON.stringify(int, null, 2) + "\n");

const sq = JSON.parse(fs.readFileSync(sqPath, "utf8"));
if (sq.items.some((i) => i.id === "sq-621")) {
  console.error("sq-621 already present — abort");
  process.exit(1);
}
sq.version = 63;
if (!sq.themes.includes("refuse")) sq.themes.push("refuse");
sq.copyright = sq.copyright.replace(
  "promise-trust crossfill",
  "promise-trust/refuse-accept crossfill"
);
sq.items.push(...speedItems);
sq.note =
  "+10 refuse-accept MCQ (sq-621–630, 2026-07-27). Pack lemmas 거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·응하다·승인하다·거절·수락. Prefer 승낙·거부 → cloze. Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. NIKL/Sejong·Tammy. No brand names. Prior promise sq-611–620 kept. Suggest cloze + ThemeSm57a · chip KO 거절 / ZH 拒绝.";
fs.writeFileSync(sqPath, JSON.stringify(sq, null, 2) + "\n");

const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
man.version = 245;
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 667 · listen-match 634 · speed 630 · telephone 569 · scramble 571 · dictation 622 · cloze 612 · particle 616. +refuse-accept pack 12 + speed +10 (sq-621–630) · themes refuse · refuseTagged 10 · Prefer 승낙·거부 → cloze · chip KO 거절 / ZH 拒绝 · Suggest ThemeSm57a. Prior promise particle/dictation/tel/scramble kept · ThemeSm56d closed. hangul.js untouched.";
const speedGame = man.games.find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 63;
  speedGame.itemCount = 630;
  speedGame.count = 630;
}
fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + "\n");

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
if (canon.source) canon.source.intermediatePacks = 63;
if (!canon.themes.some((t) => t.themeKey === "refuse")) {
  const promiseIdx = canon.themes.findIndex((t) => t.themeKey === "promise");
  const refuseEntry = {
    themeKey: "refuse",
    status: "active",
    chip: { ko: "거절", zh: "拒绝", en: "Refuse" },
    packIds: ["refuse-accept"],
    notes:
      "ThemeSm57a speed(+cloze) pending (2026-07-27). Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Prefer 승낙·거부 → cloze.",
  };
  if (promiseIdx >= 0) canon.themes.splice(promiseIdx + 1, 0, refuseEntry);
  else canon.themes.push(refuseEntry);
}
fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");

const lemmaCount = int.packs.reduce((n, p) => n + p.items.length, 0);
const refuseTagged = sq.items.filter((i) => (i.tags || []).includes("refuse")).length;
console.log(
  JSON.stringify(
    {
      packId: "refuse-accept",
      packs: int.packs.length,
      lemmaCount,
      packLemmas: pack.items.length,
      speedTotal: sq.items.length,
      refuseTagged,
      manifest: man.version,
    },
    null,
    2
  )
);

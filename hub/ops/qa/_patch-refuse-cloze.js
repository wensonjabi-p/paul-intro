/**
 * refuse-accept → cloze +10 only (no ThemeSm chips, no other games)
 * Prefer 승낙·거부 · Suggest bingo/listen next
 * Run: node hub/ops/qa/_patch-refuse-cloze.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const clozePath = path.join(ROOT, "app/data/games/cloze-beginner.json");
const speedPath = path.join(ROOT, "app/data/games/speed-quiz-beginner.json");
const manifestPath = path.join(ROOT, "app/data/games/manifest.json");
const packPath = path.join(ROOT, "app/data/vocab/jabi-theme-packs-intermediate.json");

const cloze = JSON.parse(fs.readFileSync(clozePath, "utf8"));
if (cloze.items.some((it) => it.id === "c-613")) {
  console.error("c-613 already exists");
  process.exit(1);
}
if ((cloze.themes || []).includes("refuse") === false) {
  const idx = cloze.themes.indexOf("promise");
  if (idx >= 0) cloze.themes.splice(idx + 1, 0, "refuse");
  else cloze.themes.push("refuse");
}

const newItems = [
  {
    id: "c-613",
    template: "승낙{0} 구해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "승낙을 구해요",
    gloss: {
      en: "I ask for consent",
      ko: "승낙·거부 · 목적격 · 승낙",
      zh: "征求允诺",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-614",
    template: "거부{0} 이어져요",
    answers: ["가"],
    choices: ["가", "이", "을", "에"],
    full: "거부가 이어져요",
    gloss: {
      en: "Rejections keep coming",
      ko: "승낙·거부 · 주격 · 거부",
      zh: "拒绝不断",
    },
    tags: ["particle", "subject", "refuse", "intermediate"],
  },
  {
    id: "c-615",
    template: "요청{0} 승낙해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "요청을 승낙해요",
    gloss: {
      en: "I consent to the request",
      ko: "승낙·거부 · 목적격 · 승낙하다",
      zh: "答应请求",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-616",
    template: "조건{0} 거부해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "조건을 거부해요",
    gloss: {
      en: "I reject the conditions",
      ko: "승낙·거부 · 목적격 · 거부하다",
      zh: "拒绝条件",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-617",
    template: "제안{0} 거절해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "제안을 거절해요",
    gloss: {
      en: "I decline the proposal",
      ko: "승낙·거부 · 목적격 · 거절하다",
      zh: "拒绝提议",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-618",
    template: "초대{0} 수락해요",
    answers: ["를"],
    choices: ["를", "을", "이", "에"],
    full: "초대를 수락해요",
    gloss: {
      en: "I accept the invitation",
      ko: "승낙·거부 · 목적격 · 수락하다",
      zh: "接受邀请",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-619",
    template: "의견{0} 받아들여요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "의견을 받아들여요",
    gloss: {
      en: "I take in the opinion",
      ko: "승낙·거부 · 목적격 · 받아들이다",
      zh: "接纳意见",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-620",
    template: "선물{0} 사양해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "선물을 사양해요",
    gloss: {
      en: "I politely decline the gift",
      ko: "승낙·거부 · 목적격 · 사양하다",
      zh: "婉拒礼物",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-621",
    template: "거절{0} 전해요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "거절을 전해요",
    gloss: {
      en: "I convey the refusal",
      ko: "승낙·거부 · 목적격 · 거절",
      zh: "转达拒绝",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
  {
    id: "c-622",
    template: "수락{0} 기다려요",
    answers: ["을"],
    choices: ["을", "를", "이", "에"],
    full: "수락을 기다려요",
    gloss: {
      en: "I wait for acceptance",
      ko: "승낙·거부 · 목적격 · 수락",
      zh: "等待接受",
    },
    tags: ["particle", "object", "refuse", "intermediate"],
  },
];

cloze.items.push(...newItems);
cloze.version = 63;
cloze.copyright = cloze.copyright.replace(
  "encourage-support/promise-trust crossfill",
  "encourage-support/promise-trust/refuse-accept crossfill"
);
cloze.note =
  "+10 refuse-accept cloze (c-613–622, 2026-07-27): Prefer 승낙·거부 · 승낙하다·거부하다·거절하다·수락하다·받아들이다·사양하다·거절·수락. Suggest bingo/listen next (Prefer 거절하다·수락하다·응하다·승인하다). Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다 · pack/speed verbatim. NIKL/Sejong · 해요체 · no brand names. Prior promise c-603–612 · encourage · advice · success · apology · personality · friends · rules · habit · opinion · problem · reason · compare · change · speech · think · favor · motion · building · electric · accessories · color · senses · size · routine · countries · jobs · bathroom · pantry · places · driving · pets · mail · stationery · kitchen · fruit · furniture · directions · body · chores · time · celebration · media · music · clothes · restaurant · nature · sports · emotion · hobby · family · digital · weather · travel · school · clinic · workplace · housing/banking · beginner kept.";

fs.writeFileSync(clozePath, JSON.stringify(cloze, null, 2) + "\n");

// Pack note only (no ThemeSm)
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const rf = pack.packs.find((p) => p.id === "refuse-accept");
if (rf) {
  rf.note =
    "Everyday refuse / accept / take in / decline politely / consent / reject / comply / approve / refuse-noun / accept-noun / consent-noun / rejection-noun survival — distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done (승낙·거부) · Suggest bingo/listen · themes refuse · chip 거절/拒绝 · ThemeSm57a.";
}
pack.note =
  "+refuse-accept 12 (거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·응하다·승인하다·거절·수락·승낙·거부) 2026-07-27. Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · cloze +10 Done Prefer 승낙·거부 · Suggest bingo/listen · themes refuse · chip 거절/拒绝 · ThemeSm57a. Existing packs kept (incl. promise-trust sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");

// Speed note pointer only
const speed = JSON.parse(fs.readFileSync(speedPath, "utf8"));
speed.note =
  "+10 refuse-accept MCQ (sq-621–630, 2026-07-27). Pack lemmas 거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·응하다·승인하다·거절·수락. Prefer 승낙·거부 → cloze Done (c-613–622). Distinct from opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다. NIKL/Sejong·Tammy. No brand names. Prior promise sq-611–620 kept. Suggest bingo/listen · chip KO 거절 / ZH 拒绝.";
fs.writeFileSync(speedPath, JSON.stringify(speed, null, 2) + "\n");

// Manifest
const man = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
man.version = 246;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 667 · listen-match 634 · speed 630 · telephone 569 · scramble 571 · dictation 622 · cloze 622 · particle 616. +refuse-accept cloze +10 (c-613–622) · themes refuse · refuseTagged 10(cloze)+10(speed) · Prefer 승낙·거부 Done · Suggest bingo/listen · chip KO 거절 / ZH 拒绝 · ThemeSm57a. Prior pack+speed sq-621–630. hangul.js untouched.";
const clozeGame = (man.games || []).find((g) => g.id === "cloze-race");
if (clozeGame) {
  clozeGame.version = 63;
  clozeGame.itemCount = cloze.items.length;
  clozeGame.count = cloze.items.length;
}
fs.writeFileSync(manifestPath, JSON.stringify(man, null, 2) + "\n");

const refuseTagged = cloze.items.filter((it) =>
  (it.tags || []).includes("refuse")
).length;
console.log(
  JSON.stringify(
    {
      clozeVersion: cloze.version,
      clozeCount: cloze.items.length,
      refuseTagged,
      ids: newItems.map((x) => x.id),
      next: "bingo/listen · Prefer 거절하다·수락하다·응하다·승인하다",
    },
    null,
    2
  )
);

/**
 * Offline loop: encourage-support pack + speed-quiz +10
 * Run: node hub/ops/qa/_patch-encourage-pack-speed.js
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

if (p.packs.some((x) => x.id === "encourage-support")) {
  console.error("encourage-support already present — abort");
  process.exit(1);
}

p.version = 61;
p.inspiredBy = p.inspiredBy.replace(
  "advice-counsel scenes",
  "advice-counsel/encourage-support scenes"
);
p.copyright = p.copyright.replace(
  "Advice-counsel pack = generic advice/suggest/consult terms only (no brand names).",
  "Advice-counsel pack = generic advice/suggest/consult terms only (no brand names). Encourage-support pack = generic encourage/cheer/support/comfort terms only (no brand names)."
);
p.note =
  "+encourage-support 12 (격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로) 2026-07-27. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 격려·위로 → cloze · Suggest ThemeSm55a · themes encourage · chip 격려/鼓励. Existing packs kept (incl. advice-counsel sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";

const newPack = {
  id: "encourage-support",
  title: {
    en: "Encourage & support",
    ko: "격려·응원",
    zh: "鼓励与支持",
  },
  grammarHooks: ["아/어 주다", "아/어 주세요", "아/어 보이다"],
  note: "Everyday encourage / cheer / support / comfort / rely / care / feel secure / feel relief / cheer-noun / support-noun / encourage-noun / comfort-noun survival — distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 격려·위로 → cloze · Suggest ThemeSm55a · themes encourage · chip 격려/鼓励.",
  items: [
    {
      id: "int-eg-01",
      lemma: "격려하다",
      pos: "v",
      senseId: "sns:격려하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "to encourage", ko: "격려하다", zh: "鼓励" },
      derived: ["격려"],
      example: {
        ko: "친구를 격려해 주세요.",
        en: "Please encourage your friend.",
        zh: "请鼓励一下朋友。",
      },
    },
    {
      id: "int-eg-02",
      lemma: "응원하다",
      pos: "v",
      senseId: "sns:응원하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: {
        en: "to cheer; root for; back",
        ko: "응원하다",
        zh: "加油；声援",
      },
      derived: ["응원"],
      example: {
        ko: "경기에서 팀을 응원해요.",
        en: "I cheer for the team at the match.",
        zh: "我在比赛中为队伍加油。",
      },
    },
    {
      id: "int-eg-03",
      lemma: "지지하다",
      pos: "v",
      senseId: "sns:지지하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "to support; stand by", ko: "지지하다", zh: "支持" },
      derived: ["지지"],
      example: {
        ko: "가족의 결정을 지지해요.",
        en: "I support my family's decision.",
        zh: "我支持家人的决定。",
      },
    },
    {
      id: "int-eg-04",
      lemma: "위로하다",
      pos: "v",
      senseId: "sns:위로하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "to comfort; console", ko: "위로하다", zh: "安慰" },
      derived: ["위로"],
      example: {
        ko: "슬픈 친구를 위로해요.",
        en: "I comfort a sad friend.",
        zh: "我安慰伤心的朋友。",
      },
    },
    {
      id: "int-eg-05",
      lemma: "의지하다",
      pos: "v",
      senseId: "sns:의지하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "to rely on; depend on", ko: "의지하다", zh: "依靠；依赖" },
      derived: ["의지"],
      example: {
        ko: "어려울 때 친구에게 의지해요.",
        en: "When things are hard, I rely on friends.",
        zh: "困难时我依靠朋友。",
      },
    },
    {
      id: "int-eg-06",
      lemma: "배려하다",
      pos: "v",
      senseId: "sns:배려하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: {
        en: "to be considerate; show care",
        ko: "배려하다",
        zh: "体贴；关照",
      },
      derived: ["배려"],
      example: {
        ko: "다른 사람을 배려해요.",
        en: "I am considerate of others.",
        zh: "我体贴别人。",
      },
    },
    {
      id: "int-eg-07",
      lemma: "든든하다",
      pos: "adj",
      senseId: "sns:든든하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: {
        en: "to feel secure; reliable; reassuring",
        ko: "든든하다",
        zh: "踏实；可靠",
      },
      example: {
        ko: "옆에 있으면 든든해요.",
        en: "I feel secure when you're beside me.",
        zh: "你在旁边就很踏实。",
      },
    },
    {
      id: "int-eg-08",
      lemma: "안심하다",
      pos: "v",
      senseId: "sns:안심하다.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "to feel relieved; be at ease", ko: "안심하다", zh: "放心" },
      derived: ["안심"],
      example: {
        ko: "소식을 듣고 안심했어요.",
        en: "I felt relieved after hearing the news.",
        zh: "听到消息后放心了。",
      },
    },
    {
      id: "int-eg-09",
      lemma: "응원",
      pos: "n",
      senseId: "sns:응원.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "cheering; backing (noun)", ko: "응원", zh: "加油；声援" },
      example: {
        ko: "여러분의 응원이 필요해요.",
        en: "I need everyone's support.",
        zh: "我需要大家的加油。",
      },
    },
    {
      id: "int-eg-10",
      lemma: "지지",
      pos: "n",
      senseId: "sns:지지.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "support (noun)", ko: "지지", zh: "支持" },
      example: {
        ko: "많은 지지를 받았어요.",
        en: "I received a lot of support.",
        zh: "我得到了很多支持。",
      },
    },
    {
      id: "int-eg-11",
      lemma: "격려",
      pos: "n",
      senseId: "sns:격려.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "encouragement (noun)", ko: "격려", zh: "鼓励" },
      example: {
        ko: "선생님의 격려가 힘이 돼요.",
        en: "The teacher's encouragement gives me strength.",
        zh: "老师的鼓励给了我力量。",
      },
    },
    {
      id: "int-eg-12",
      lemma: "위로",
      pos: "n",
      senseId: "sns:위로.1",
      themes: ["encourage"],
      levelBand: "int-low",
      gloss: { en: "comfort; consolation (noun)", ko: "위로", zh: "安慰" },
      example: {
        ko: "따뜻한 위로를 들었어요.",
        en: "I heard warm words of comfort.",
        zh: "我听到了温暖的安慰。",
      },
    },
  ],
};

p.packs.push(newPack);
writeJson(packPath, p);
console.log("pack encourage-support +12 · intermediate v" + p.version);

const sqPath = "app/data/games/speed-quiz-beginner.json";
const s = JSON.parse(fs.readFileSync(path.join(ROOT, sqPath), "utf8"));

if (s.items.some((i) => i.id === "sq-601")) {
  console.error("sq-601 already present — abort");
  process.exit(1);
}

s.version = 61;
if (!s.themes.includes("encourage")) s.themes.push("encourage");
s.copyright = s.copyright.replace(
  "success-challenge/advice-counsel",
  "success-challenge/advice-counsel/encourage-support"
);

const speedItems = [
  {
    id: "sq-601",
    prompt: { en: "To encourage?", ko: "격려하다?", zh: "鼓励？" },
    choices: ["격려하다", "응원하다", "응원", "지지"],
    answer: 0,
    explain: {
      en: "격려하다 = to encourage.",
      ko: "격려하다 = 힘을 내도록 말하다.",
      zh: "격려하다 = 鼓励。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-602",
    prompt: { en: "To cheer / root for?", ko: "응원하다?", zh: "加油？" },
    choices: ["위로하다", "응원하다", "배려하다", "안심하다"],
    answer: 1,
    explain: {
      en: "응원하다 = to cheer / root for / back.",
      ko: "응원하다 = 힘을 보태 주다.",
      zh: "응원하다 = 加油；声援。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-603",
    prompt: { en: "To support / stand by?", ko: "지지하다?", zh: "支持？" },
    choices: ["의지하다", "든든하다", "지지하다", "격려하다"],
    answer: 2,
    explain: {
      en: "지지하다 = to support / stand by.",
      ko: "지지하다 = 편을 들거나 뒤를 받치다.",
      zh: "지지하다 = 支持。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-604",
    prompt: { en: "To comfort / console?", ko: "위로하다?", zh: "安慰？" },
    choices: ["위로하다", "지지", "응원", "배려하다"],
    answer: 0,
    explain: {
      en: "위로하다 = to comfort / console.",
      ko: "위로하다 = 마음을 달래 주다.",
      zh: "위로하다 = 安慰。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-605",
    prompt: { en: "To rely on / depend on?", ko: "의지하다?", zh: "依靠？" },
    choices: ["안심하다", "든든하다", "응원하다", "의지하다"],
    answer: 3,
    explain: {
      en: "의지하다 = to rely on / depend on.",
      ko: "의지하다 = 도움을 바라고 기대다.",
      zh: "의지하다 = 依靠；依赖。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-606",
    prompt: {
      en: "To be considerate / show care?",
      ko: "배려하다?",
      zh: "体贴？",
    },
    choices: ["지지하다", "배려하다", "격려하다", "위로하다"],
    answer: 1,
    explain: {
      en: "배려하다 = to be considerate / show care.",
      ko: "배려하다 = 남을 생각해 주다.",
      zh: "배려하다 = 体贴；关照。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-607",
    prompt: {
      en: "To feel secure / reassuring?",
      ko: "든든하다?",
      zh: "踏实？",
    },
    choices: ["응원", "안심하다", "든든하다", "지지"],
    answer: 2,
    explain: {
      en: "든든하다 = to feel secure / reliable / reassuring.",
      ko: "든든하다 = 마음이 놓이고 믿음직하다.",
      zh: "든든하다 = 踏实；可靠。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-608",
    prompt: { en: "To feel relieved / at ease?", ko: "안심하다?", zh: "放心？" },
    choices: ["안심하다", "의지하다", "격려하다", "응원하다"],
    answer: 0,
    explain: {
      en: "안심하다 = to feel relieved / be at ease.",
      ko: "안심하다 = 걱정을 놓고 마음을 놓다.",
      zh: "안심하다 = 放心。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-609",
    prompt: { en: "Cheering / backing (noun)?", ko: "응원?", zh: "声援？" },
    choices: ["지지하다", "위로하다", "응원", "배려하다"],
    answer: 2,
    explain: {
      en: "응원 = cheering / backing (noun).",
      ko: "응원 = 힘을 보태 주는 일·말.",
      zh: "응원 = 加油；声援。",
    },
    tags: ["encourage", "intermediate"],
  },
  {
    id: "sq-610",
    prompt: { en: "Support (noun)?", ko: "지지?", zh: "支持？" },
    choices: ["든든하다", "지지", "안심하다", "격려하다"],
    answer: 1,
    explain: {
      en: "지지 = support (noun).",
      ko: "지지 = 편을 들거나 뒤를 받치는 일.",
      zh: "지지 = 支持。",
    },
    tags: ["encourage", "intermediate"],
  },
];

s.items.push(...speedItems);
s.note =
  "+10 encourage-support MCQ (sq-601–610, 2026-07-27). Pack lemmas 격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지. Prefer 격려·위로 → cloze. Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports. NIKL/Sejong·Tammy. No brand names. Prior advice sq-591–600 kept. Suggest cloze + ThemeSm55a · chip KO 격려 / ZH 鼓励.";

writeJson(sqPath, s);
console.log("speed +10 encourage · v" + s.version + " · items " + s.items.length);

const canonPath = "app/data/vocab/theme-key-canon.json";
const canon = JSON.parse(fs.readFileSync(path.join(ROOT, canonPath), "utf8"));
if (!canon.themes.some((k) => k.themeKey === "encourage")) {
  const adviceIdx = canon.themes.findIndex((k) => k.themeKey === "advice");
  const entry = {
    themeKey: "encourage",
    status: "active",
    chip: { ko: "격려", zh: "鼓励", en: "Encourage" },
    packIds: ["encourage-support"],
    notes:
      "ThemeSm55a speed(+cloze) chip pending (2026-07-27). Distinct from advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports.",
  };
  if (adviceIdx >= 0) canon.themes.splice(adviceIdx + 1, 0, entry);
  else canon.themes.push(entry);
  if (canon.source) {
    canon.source.intermediatePacks = 61;
    canon.source.gamesThemesUnion = (canon.source.gamesThemesUnion || 71) + 1;
  }
  writeJson(canonPath, canon);
  console.log("canon +encourage");
}

const manPath = "app/data/games/manifest.json";
const m = JSON.parse(fs.readFileSync(path.join(ROOT, manPath), "utf8"));
m.version = 237;
m.updated = "2026-07-27";
m.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 647 · listen-match 614 · speed 610 · telephone 553 · scramble 555 · dictation 602 · cloze 592 · particle 596. +encourage-support pack 12 + speed +10 (sq-601–610) · themes encourage · encourageTagged 10 · Prefer 격려·위로 → cloze · chip 제안 KO 격려 / ZH 鼓励 · Suggest ThemeSm55a. Prior advice ThemeSm54d close kept. hangul.js untouched.";
const speedGame = m.games.find((g) => g.id === "speed-quiz");
if (speedGame) {
  speedGame.version = 61;
  speedGame.itemCount = 610;
  speedGame.count = 610;
}
writeJson(manPath, m);
console.log("manifest v" + m.version + " · speed 610");

console.log("OK encourage-support pack+speed");

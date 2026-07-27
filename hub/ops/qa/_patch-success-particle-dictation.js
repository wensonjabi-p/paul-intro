/**
 * ThemeSm53c — success-challenge → particle/dictation +10 · tel/scramble +8
 * Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 on tel/scramble
 * Run: node hub/ops/qa/_patch-success-particle-dictation.js
 */
const fs = require("fs");

function load(rel) {
  return JSON.parse(fs.readFileSync(rel, "utf8"));
}
function save(rel, data) {
  fs.writeFileSync(rel, JSON.stringify(data, null, 2) + "\n", "utf8");
}
function ensureTheme(data, theme) {
  if (!Array.isArray(data.themes)) data.themes = [];
  if (!data.themes.includes(theme)) data.themes.push(theme);
}

const particlePath = "hub/app/data/games/particle-beginner.json";
const particle = load(particlePath);
if (particle.items.some((i) => i.id === "ps-577")) {
  console.error("Already patched particle");
  process.exit(1);
}
particle.items.push(
  {
    id: "ps-577",
    pair: "object",
    template: "희망{0} 키워요",
    answer: "을",
    full: "희망을 키워요",
    gloss: {
      en: "I grow hope",
      ko: "목적격 · 받침 뒤 을 · 희망",
      zh: "培养希望",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-578",
    pair: "subject",
    template: "기대{0} 커요",
    answer: "가",
    full: "기대가 커요",
    gloss: {
      en: "Expectations are high",
      ko: "주격 · 모음 뒤 가 · 기대하다",
      zh: "期待很大",
    },
    tags: ["subject", "success", "intermediate"],
  },
  {
    id: "ps-579",
    pair: "object",
    template: "성취{0} 축하해요",
    answer: "를",
    full: "성취를 축하해요",
    gloss: {
      en: "I congratulate the achievement",
      ko: "목적격 · 모음 뒤 를 · 성취",
      zh: "祝贺成就",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-580",
    pair: "object",
    template: "바람{0} 적어요",
    answer: "을",
    full: "바람을 적어요",
    gloss: {
      en: "I write down a wish",
      ko: "목적격 · 받침 뒤 을 · 바라다",
      zh: "写下愿望",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-581",
    pair: "subject",
    template: "성공{0} 보여요",
    answer: "이",
    full: "성공이 보여요",
    gloss: {
      en: "Success shows",
      ko: "주격 · 받침 뒤 이 · 성공하다",
      zh: "看得出成功",
    },
    tags: ["subject", "success", "intermediate"],
  },
  {
    id: "ps-582",
    pair: "object",
    template: "실패{0} 기록해요",
    answer: "를",
    full: "실패를 기록해요",
    gloss: {
      en: "I record the failure",
      ko: "목적격 · 모음 뒤 를 · 실패하다",
      zh: "记录失败",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-583",
    pair: "object",
    template: "기회{0} 찾아요",
    answer: "를",
    full: "기회를 찾아요",
    gloss: {
      en: "I look for an opportunity",
      ko: "목적격 · 모음 뒤 를 · 기회",
      zh: "寻找机会",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-584",
    pair: "object",
    template: "도전{0} 즐겨요",
    answer: "을",
    full: "도전을 즐겨요",
    gloss: {
      en: "I enjoy the challenge",
      ko: "목적격 · 받침 뒤 을 · 도전하다",
      zh: "享受挑战",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-585",
    pair: "object",
    template: "합격{0} 축하해요",
    answer: "을",
    full: "합격을 축하해요",
    gloss: {
      en: "I congratulate the pass",
      ko: "목적격 · 받침 뒤 을 · 합격하다",
      zh: "祝贺合格",
    },
    tags: ["object", "success", "intermediate"],
  },
  {
    id: "ps-586",
    pair: "subject",
    template: "불합격{0} 남아요",
    answer: "이",
    full: "불합격이 남아요",
    gloss: {
      en: "The rejection remains",
      ko: "주격 · 받침 뒤 이 · 불합격",
      zh: "不合格还在",
    },
    tags: ["subject", "success", "intermediate"],
  }
);
particle.version = 59;
ensureTheme(particle, "success");
particle.updated = "2026-07-27";
particle.note =
  "+10 success-challenge particle (ps-577–586, 2026-07-27): Prefer 희망·기대하다 residual · 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격. Skip 자랑하다·성과 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (작은 희망·좋은 발표 기대·오늘의 성취…) · listen hosts. Distinct problem/reason/opinion/habit/apology · school 시험 · personality 자신감 · habit 노력하다. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm53c close (전 8 success chip). Prior apology ps-567–576 kept.";
if (particle.copyright && !particle.copyright.includes("success-challenge")) {
  particle.copyright = particle.copyright.replace(
    "apology-politeness crossfill",
    "apology-politeness/success-challenge crossfill"
  );
}
save(particlePath, particle);

const dictationPath = "hub/app/data/games/dictation-beginner.json";
const dictation = load(dictationPath);
if (dictation.items.some((i) => i.id === "d-583")) {
  console.error("Already patched dictation");
  process.exit(1);
}
dictation.items.push(
  {
    id: "d-583",
    text: "희망을 키워요",
    roman: "huimang-eul kiwoyo",
    gloss: { en: "I grow hope", ko: "희망", zh: "培养希望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-584",
    text: "기대가 커요",
    roman: "gidaega keoyo",
    gloss: { en: "Expectations are high", ko: "기대하다", zh: "期待很大" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-585",
    text: "성취를 축하해요",
    roman: "seongchwireul chukhahaeyo",
    gloss: {
      en: "I congratulate the achievement",
      ko: "성취",
      zh: "祝贺成就",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-586",
    text: "바람을 적어요",
    roman: "baram-eul jeogeoyo",
    gloss: { en: "I write down a wish", ko: "바라다", zh: "写下愿望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-587",
    text: "성공이 보여요",
    roman: "seonggongi boyeoyo",
    gloss: { en: "Success shows", ko: "성공하다", zh: "看得出成功" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-588",
    text: "실패를 기록해요",
    roman: "silpaereul girokhaeyo",
    gloss: { en: "I record the failure", ko: "실패하다", zh: "记录失败" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-589",
    text: "기회를 찾아요",
    roman: "gihoereul chajayo",
    gloss: {
      en: "I look for an opportunity",
      ko: "기회",
      zh: "寻找机会",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-590",
    text: "도전을 즐겨요",
    roman: "dojeoneul jeulgyeoyo",
    gloss: { en: "I enjoy the challenge", ko: "도전하다", zh: "享受挑战" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-591",
    text: "합격을 축하해요",
    roman: "hapgyeogeul chukhahaeyo",
    gloss: { en: "I congratulate the pass", ko: "합격하다", zh: "祝贺合格" },
    tags: ["success", "intermediate"],
  },
  {
    id: "d-592",
    text: "불합격이 남아요",
    roman: "bulhapgyeogi namayo",
    gloss: { en: "The rejection remains", ko: "불합격", zh: "不合格还在" },
    tags: ["success", "intermediate"],
  }
);
dictation.version = 61;
ensureTheme(dictation, "success");
dictation.updated = "2026-07-27";
dictation.note =
  "+10 success-challenge dictation (d-583–592, 2026-07-27): Prefer 희망·기대하다 residual · 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격. Skip 자랑하다·성과 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · problem/reason/opinion/habit/apology. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm53c close (전 8 success chip). Prior apology d-573–582 kept.";
save(dictationPath, dictation);

const telPath = "hub/app/data/games/telephone-beginner.json";
const tel = load(telPath);
if (tel.items.some((i) => i.id === "tel-538")) {
  console.error("Already patched telephone");
  process.exit(1);
}
tel.items.push(
  {
    id: "tel-538",
    text: "희망을 키워요",
    gloss: { en: "I grow hope", ko: "희망", zh: "培养希望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-539",
    text: "기대가 커요",
    gloss: { en: "Expectations are high", ko: "기대하다", zh: "期待很大" },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-540",
    text: "상을 자랑해요",
    gloss: {
      en: "I proudly show the award",
      ko: "자랑하다",
      zh: "炫耀奖项",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-541",
    text: "성과를 나눠요",
    gloss: {
      en: "I share the results",
      ko: "성과",
      zh: "分享成果",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-542",
    text: "성취를 축하해요",
    gloss: {
      en: "I congratulate the achievement",
      ko: "성취",
      zh: "祝贺成就",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-543",
    text: "바람을 적어요",
    gloss: { en: "I write down a wish", ko: "바라다", zh: "写下愿望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-544",
    text: "성공이 보여요",
    gloss: { en: "Success shows", ko: "성공하다", zh: "看得出成功" },
    tags: ["success", "intermediate"],
  },
  {
    id: "tel-545",
    text: "실패를 기록해요",
    gloss: { en: "I record the failure", ko: "실패하다", zh: "记录失败" },
    tags: ["success", "intermediate"],
  }
);
tel.version = 58;
ensureTheme(tel, "success");
tel.updated = "2026-07-27";
tel.note =
  "+8 success-challenge telephone (tel-538–545, 2026-07-27): Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 · 성취·바라다·성공하다·실패하다. Skip 기회·도전하다·합격하다·불합격 (particle/dictation). Distinct from cloze/listen hosts (친구에게 상을 자랑해요·팀 성과를 발표해요). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm53c close. Prior apology tel-530–537 kept.";
save(telPath, tel);

const wsPath = "hub/app/data/games/word-scramble-beginner.json";
const ws = load(wsPath);
if (ws.items.some((i) => i.id === "ws-540")) {
  console.error("Already patched scramble");
  process.exit(1);
}
ws.items.push(
  {
    id: "ws-540",
    tokens: ["희망을", "키워요"],
    full: "희망을 키워요",
    gloss: { en: "I grow hope", ko: "희망", zh: "培养希望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-541",
    tokens: ["기대가", "커요"],
    full: "기대가 커요",
    gloss: { en: "Expectations are high", ko: "기대하다", zh: "期待很大" },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-542",
    tokens: ["상을", "자랑해요"],
    full: "상을 자랑해요",
    gloss: {
      en: "I proudly show the award",
      ko: "자랑하다",
      zh: "炫耀奖项",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-543",
    tokens: ["성과를", "나눠요"],
    full: "성과를 나눠요",
    gloss: {
      en: "I share the results",
      ko: "성과",
      zh: "分享成果",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-544",
    tokens: ["성취를", "축하해요"],
    full: "성취를 축하해요",
    gloss: {
      en: "I congratulate the achievement",
      ko: "성취",
      zh: "祝贺成就",
    },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-545",
    tokens: ["바람을", "적어요"],
    full: "바람을 적어요",
    gloss: { en: "I write down a wish", ko: "바라다", zh: "写下愿望" },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-546",
    tokens: ["성공이", "보여요"],
    full: "성공이 보여요",
    gloss: { en: "Success shows", ko: "성공하다", zh: "看得出成功" },
    tags: ["success", "intermediate"],
  },
  {
    id: "ws-547",
    tokens: ["실패를", "기록해요"],
    full: "실패를 기록해요",
    gloss: { en: "I record the failure", ko: "실패하다", zh: "记录失败" },
    tags: ["success", "intermediate"],
  }
);
ws.version = 58;
ensureTheme(ws, "success");
ws.updated = "2026-07-27";
ws.note =
  "+8 success-challenge scramble (ws-540–547, 2026-07-27): Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 · 성취·바라다·성공하다·실패하다. Skip 기회·도전하다·합격하다·불합격 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm53c close. Prior apology ws-532–539 kept.";
save(wsPath, ws);

const manPath = "hub/app/data/games/manifest.json";
const man = load(manPath);
man.version = 232;
man.updated = "2026-07-27";
man.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 637 · listen-match 604 · speed 590 · telephone 545 · scramble 547 · dictation 592 · cloze 582 · particle 586. +success-challenge particle/dictation +10 · tel/scramble +8 (ps-577–586 · d-583–592 · tel-538–545 · ws-540–547) · themes success · successTagged 10×6 + 8×2 · Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 on tel/scramble · chip KO 성공 / ZH 成功 · ThemeSm53c close. Prior bingo/listen bg-628–637 · lm-595–604 · ThemeSm53b kept. hangul.js untouched.";

function bumpGame(id, version, count) {
  const g = man.games.find((x) => x.id === id);
  if (!g) throw new Error("missing " + id);
  g.version = version;
  g.itemCount = count;
  g.count = count;
}
bumpGame("particle-snap", 59, 586);
bumpGame("dictation", 61, 592);
bumpGame("telephone", 58, 545);
bumpGame("word-scramble", 58, 547);
save(manPath, man);

const vocabPath = "hub/app/data/vocab/jabi-theme-packs-intermediate.json";
const vocab = load(vocabPath);
vocab.note =
  "+success-challenge 12 (성공하다·실패하다·기회·도전하다·합격하다·불합격·희망·기대하다·성과·자랑하다·성취·바라다) 2026-07-27. Distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 on tel/scramble · Suggest ThemeSm53c close · themes success · chip 성공/成功. Existing packs kept (incl. apology-politeness sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.";
const pack = (vocab.packs || []).find((p) => p.id === "success-challenge");
if (pack) {
  pack.note =
    "Everyday succeed / fail / chance / challenge / pass / fail-exam / hope / expect / outcome / pride / achievement / wish survival — distinct from habit 노력하다·포기하다 · reason 목표·결과 · problem 경험·선택하다 · personality 자신감 · school 시험·성적 · think 결정하다·계획하다 · emotion · apology. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed+cloze+bingo/listen+particle/dictation(+tel/scramble) Done · Prefer 희망·기대하다 residual · Prefer-adjacent 자랑하다·성과 on tel/scramble · Suggest ThemeSm53c close · themes success · chip 성공/成功.";
}
save(vocabPath, vocab);

for (const [label, file] of [
  ["particle", particlePath],
  ["dictation", dictationPath],
  ["tel", telPath],
  ["scramble", wsPath],
]) {
  const d = load(file);
  const n = (d.items || []).filter((i) =>
    (i.tags || []).includes("success")
  ).length;
  console.log(
    label,
    "v" + d.version,
    "n=" + d.items.length,
    "successTagged=" + n,
    "themes.success=" + d.themes.includes("success")
  );
}
console.log("manifest", man.version);

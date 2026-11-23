/**
 * rules-permission → particle +10 · dictation +10 · tel +8 · scramble +8
 * Prefer 허용하다·안전하다 residual · Prefer-adjacent 예의·질서 on tel/scramble
 * Skip 예의·질서 on particle/dictation (bingo Prefer)
 * Distinct from cloze/listen hosts · favor/problem/jobs/opinion
 * Run: node hub/ops/qa/_patch-rules-particle-dictation.js
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../../app/data/games");

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8"));
}
function save(name, data) {
  fs.writeFileSync(
    path.join(DIR, name),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}
function addTheme(themes, t) {
  if (!themes.includes(t)) themes.push(t);
}
function bumpCopyright(data) {
  if (data.copyright.includes("rules-permission")) return;
  if (data.copyright.includes("habits-lifestyle crossfill")) {
    data.copyright = data.copyright.replace(
      "habits-lifestyle crossfill",
      "habits-lifestyle / rules-permission crossfill"
    );
    return;
  }
  if (data.copyright.includes("habits-lifestyle")) {
    data.copyright = data.copyright.replace(
      "habits-lifestyle",
      "habits-lifestyle / rules-permission"
    );
  }
}

// --- particle +10 ---
const particle = load("particle-beginner.json");
if (particle.items.some((x) => x.id === "ps-537")) {
  console.error("ABORT: ps-537 already present");
  process.exit(1);
}
particle.version = 55;
addTheme(particle.themes, "rules");
bumpCopyright(particle);
particle.items.push(
  {
    id: "ps-537",
    pair: "object",
    template: "반입{0} 허용해요",
    answer: "을",
    full: "반입을 허용해요",
    gloss: {
      en: "They allow bringing items in",
      ko: "목적격 · 받침 뒤 을 · 허용하다",
      zh: "允许携带入场",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-538",
    pair: "subject",
    template: "헬멧{0} 안전해요",
    answer: "이",
    full: "헬멧이 안전해요",
    gloss: {
      en: "A helmet is safe",
      ko: "주격 · 받침 뒤 이 · 안전하다",
      zh: "头盔很安全",
    },
    tags: ["subject", "rules", "intermediate"],
  },
  {
    id: "ps-539",
    pair: "object",
    template: "규칙{0} 확인해요",
    answer: "을",
    full: "규칙을 확인해요",
    gloss: {
      en: "I check the rules",
      ko: "목적격 · 받침 뒤 을 · 규칙",
      zh: "我确认规则",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-540",
    pair: "object",
    template: "약속{0} 지켜요",
    answer: "을",
    full: "약속을 지켜요",
    gloss: {
      en: "I keep the promise",
      ko: "목적격 · 받침 뒤 을 · 지키다",
      zh: "我守约",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-541",
    pair: "object",
    template: "표지판{0} 어기지 않아요",
    answer: "을",
    full: "표지판을 어기지 않아요",
    gloss: {
      en: "I do not break the signs",
      ko: "목적격 · 받침 뒤 을 · 어기다",
      zh: "我不违反标志",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-542",
    pair: "object",
    template: "외출{0} 허락해요",
    answer: "을",
    full: "외출을 허락해요",
    gloss: {
      en: "They allow going out",
      ko: "목적격 · 받침 뒤 을 · 허락하다",
      zh: "允许外出",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-543",
    pair: "object",
    template: "흡연{0} 금지해요",
    answer: "을",
    full: "흡연을 금지해요",
    gloss: {
      en: "They prohibit smoking",
      ko: "목적격 · 받침 뒤 을 · 금지하다",
      zh: "禁止吸烟",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-544",
    pair: "subject",
    template: "선택{0} 자유로워요",
    answer: "이",
    full: "선택이 자유로워요",
    gloss: {
      en: "The choice is free",
      ko: "주격 · 받침 뒤 이 · 자유",
      zh: "选择很自由",
    },
    tags: ["subject", "rules", "intermediate"],
  },
  {
    id: "ps-545",
    pair: "object",
    template: "의무{0} 기억해요",
    answer: "를",
    full: "의무를 기억해요",
    gloss: {
      en: "I remember the duty",
      ko: "목적격 · 받침 없음 를 · 의무",
      zh: "我记得义务",
    },
    tags: ["object", "rules", "intermediate"],
  },
  {
    id: "ps-546",
    pair: "subject",
    template: "법{0} 중요해요",
    answer: "이",
    full: "법이 중요해요",
    gloss: {
      en: "The law is important",
      ko: "주격 · 받침 뒤 이 · 법",
      zh: "法律很重要",
    },
    tags: ["subject", "rules", "intermediate"],
  }
);
particle.note =
  "+10 rules-permission particle (ps-537–546, 2026-07-27): Prefer 허용하다·안전하다 residual · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법. Skip 예의·질서 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze hosts (사진 촬영 허용·이 길 안전·기숙사 규칙·시간 지키·휴식 허락·휴대폰 금지…) · listen hosts (규칙 외워/지켜·입장 허락·주차 금지…). Distinct favor/problem/jobs/opinion. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 rules chip). Prior habit ps-527–536 kept.";

// --- dictation +10 ---
const dictation = load("dictation-beginner.json");
if (dictation.items.some((x) => x.id === "d-543")) {
  console.error("ABORT: d-543 already present");
  process.exit(1);
}
dictation.version = 57;
addTheme(dictation.themes, "rules");
bumpCopyright(dictation);
dictation.items.push(
  {
    id: "d-543",
    text: "반입을 허용해요",
    roman: "banibeul heoyonghaeyo",
    gloss: {
      en: "They allow bringing items in",
      ko: "허용하다",
      zh: "允许携带入场",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-544",
    text: "헬멧이 안전해요",
    roman: "helmeti anjeonhaeyo",
    gloss: {
      en: "A helmet is safe",
      ko: "안전하다",
      zh: "头盔很安全",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-545",
    text: "규칙을 확인해요",
    roman: "gyuchigeul hwaginhaeyo",
    gloss: {
      en: "I check the rules",
      ko: "규칙",
      zh: "我确认规则",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-546",
    text: "약속을 지켜요",
    roman: "yaksogeul jikyeoyo",
    gloss: {
      en: "I keep the promise",
      ko: "지키다",
      zh: "我守约",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-547",
    text: "표지판을 어기지 않아요",
    roman: "pyojipaneul eogiji anayo",
    gloss: {
      en: "I do not break the signs",
      ko: "어기다",
      zh: "我不违反标志",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-548",
    text: "외출을 허락해요",
    roman: "oechureul heorakhaeyo",
    gloss: {
      en: "They allow going out",
      ko: "허락하다",
      zh: "允许外出",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-549",
    text: "흡연을 금지해요",
    roman: "heubyeoneul geumjihaeyo",
    gloss: {
      en: "They prohibit smoking",
      ko: "금지하다",
      zh: "禁止吸烟",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-550",
    text: "선택이 자유로워요",
    roman: "seontaegi jayurowoyo",
    gloss: {
      en: "The choice is free",
      ko: "자유",
      zh: "选择很自由",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-551",
    text: "의무를 기억해요",
    roman: "uimureul gieokhaeyo",
    gloss: {
      en: "I remember the duty",
      ko: "의무",
      zh: "我记得义务",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "d-552",
    text: "법이 중요해요",
    roman: "beobi jungyohaeyo",
    gloss: {
      en: "The law is important",
      ko: "법",
      zh: "法律很重要",
    },
    tags: ["rules", "intermediate"],
  }
);
dictation.note =
  "+10 rules-permission dictation (d-543–552, 2026-07-27): Prefer 허용하다·안전하다 residual · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법. Skip 예의·질서 → bingo Prefer / tel Prefer-adjacent. Distinct from cloze/listen hosts · favor/problem/jobs/opinion. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 rules chip). Prior habit d-533–542 kept.";

// --- telephone +8 ---
const tel = load("telephone-beginner.json");
if (tel.items.some((x) => x.id === "tel-506")) {
  console.error("ABORT: tel-506 already present");
  process.exit(1);
}
tel.version = 54;
addTheme(tel.themes, "rules");
bumpCopyright(tel);
tel.items.push(
  {
    id: "tel-506",
    text: "반입 허용해요",
    gloss: {
      en: "They allow bringing items in",
      ko: "허용하다",
      zh: "允许携带入场",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-507",
    text: "헬멧 안전해요",
    gloss: {
      en: "A helmet is safe",
      ko: "안전하다",
      zh: "头盔很安全",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-508",
    text: "약속 지켜요",
    gloss: {
      en: "I keep the promise",
      ko: "지키다",
      zh: "守约",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-509",
    text: "표지판 어기지 않아요",
    gloss: {
      en: "I do not break the signs",
      ko: "어기다",
      zh: "不违反标志",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-510",
    text: "외출 허락해요",
    gloss: {
      en: "They allow going out",
      ko: "허락하다",
      zh: "允许外出",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-511",
    text: "흡연 금지해요",
    gloss: {
      en: "They prohibit smoking",
      ko: "금지하다",
      zh: "禁止吸烟",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-512",
    text: "손님께 예의 지켜요",
    gloss: {
      en: "I keep manners toward guests",
      ko: "예의",
      zh: "对客人守礼",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "tel-513",
    text: "줄에 질서 지켜요",
    gloss: {
      en: "I keep order in line",
      ko: "질서",
      zh: "排队守秩序",
    },
    tags: ["rules", "intermediate"],
  }
);
tel.note =
  "+8 rules-permission telephone (tel-506–513, 2026-07-27): Prefer 허용하다·안전하다 residual · 지키다·어기다·허락하다·금지하다 · Prefer-adjacent 예의·질서. Skip 규칙·자유·의무·법 (particle/dictation). Distinct from cloze/listen hosts (예의 배워·질서 중요해요). NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close. Prior habit tel-498–505 kept.";

// --- scramble +8 ---
const scramble = load("word-scramble-beginner.json");
if (scramble.items.some((x) => x.id === "ws-508")) {
  console.error("ABORT: ws-508 already present");
  process.exit(1);
}
scramble.version = 54;
addTheme(scramble.themes, "rules");
bumpCopyright(scramble);
scramble.items.push(
  {
    id: "ws-508",
    tokens: ["반입을", "허용해요"],
    full: "반입을 허용해요",
    gloss: {
      en: "They allow bringing items in",
      ko: "허용하다",
      zh: "允许携带入场",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-509",
    tokens: ["헬멧이", "안전해요"],
    full: "헬멧이 안전해요",
    gloss: {
      en: "A helmet is safe",
      ko: "안전하다",
      zh: "头盔很安全",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-510",
    tokens: ["약속을", "지켜요"],
    full: "약속을 지켜요",
    gloss: {
      en: "I keep the promise",
      ko: "지키다",
      zh: "我守约",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-511",
    tokens: ["표지판을", "어기지", "않아요"],
    full: "표지판을 어기지 않아요",
    gloss: {
      en: "I do not break the signs",
      ko: "어기다",
      zh: "我不违反标志",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-512",
    tokens: ["외출을", "허락해요"],
    full: "외출을 허락해요",
    gloss: {
      en: "They allow going out",
      ko: "허락하다",
      zh: "允许外出",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-513",
    tokens: ["흡연을", "금지해요"],
    full: "흡연을 금지해요",
    gloss: {
      en: "They prohibit smoking",
      ko: "금지하다",
      zh: "禁止吸烟",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-514",
    tokens: ["손님께", "예의를", "지켜요"],
    full: "손님께 예의를 지켜요",
    gloss: {
      en: "I keep manners toward guests",
      ko: "예의",
      zh: "对客人守礼",
    },
    tags: ["rules", "intermediate"],
  },
  {
    id: "ws-515",
    tokens: ["줄에서", "질서를", "지켜요"],
    full: "줄에서 질서를 지켜요",
    gloss: {
      en: "I keep order in line",
      ko: "질서",
      zh: "排队守秩序",
    },
    tags: ["rules", "intermediate"],
  }
);
scramble.note =
  "+8 rules-permission scramble (ws-508–515, 2026-07-27): Prefer 허용하다·안전하다 residual · 지키다·어기다·허락하다·금지하다 · Prefer-adjacent 예의·질서. Skip 규칙·자유·의무·법 (particle/dictation). Distinct from cloze/listen hosts. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close. Prior habit ws-500–507 kept.";

save("particle-beginner.json", particle);
save("dictation-beginner.json", dictation);
save("telephone-beginner.json", tel);
save("word-scramble-beginner.json", scramble);

// --- manifest ---
const manifest = load("manifest.json");
manifest.version = 216;
manifest.updated = "2026-07-27";
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 597 · listen-match 564 · speed 550 · telephone 513 · scramble 515 · dictation 552 · cloze 542 · particle 546. +rules-permission particle/dictation(+tel/scramble) +10/+10/+8/+8 (ps-537–546 · d-543–552 · tel-506–513 · ws-508–515) · themes rules · rulesTagged 10/10/8/8 · Prefer 허용하다·안전하다 residual · Prefer-adjacent 예의·질서 on tel/scramble · chip KO 규칙 / ZH 规则. Suggest ThemeSm close. hangul.js untouched.";

function patchGameEntry(id, fields) {
  const g = (manifest.games || []).find((x) => x.id === id);
  if (!g) return;
  Object.assign(g, fields);
}
patchGameEntry("particle-snap", { version: 55, itemCount: 546, count: 546 });
patchGameEntry("dictation", { version: 57, itemCount: 552, count: 552 });
patchGameEntry("telephone", { version: 54, itemCount: 513, count: 513 });
patchGameEntry("word-scramble", { version: 54, itemCount: 515, count: 515 });
save("manifest.json", manifest);

function stats(name) {
  const d = load(name);
  return {
    version: d.version,
    items: d.items.length,
    rulesTagged: d.items.filter((x) => (x.tags || []).includes("rules")).length,
    themesRules: d.themes.includes("rules"),
    lastId: d.items[d.items.length - 1].id,
  };
}
console.log(
  JSON.stringify(
    {
      particle: stats("particle-beginner.json"),
      dictation: stats("dictation-beginner.json"),
      tel: stats("telephone-beginner.json"),
      scramble: stats("word-scramble-beginner.json"),
      manifestVersion: manifest.version,
    },
    null,
    2
  )
);

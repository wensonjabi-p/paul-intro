/**
 * Rewrite habits particle/dictation/tel/scramble hosts to be distinct from cloze/listen.
 * Keep ids/counts/versions; Prefer 포기하다·참다 residual.
 * Run: node hub/ops/qa/_rewrite-habit-particle-dictation.js
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

function replaceById(items, map) {
  for (let i = 0; i < items.length; i++) {
    if (map[items[i].id]) items[i] = map[items[i].id];
  }
}

const particleMap = {
  "ps-527": {
    id: "ps-527",
    pair: "object",
    template: "목표{0} 포기하지 않아요",
    answer: "를",
    full: "목표를 포기하지 않아요",
    gloss: {
      en: "I do not give up the goal",
      ko: "목적격 · 받침 없음 를 · 포기하다",
      zh: "我不放弃目标",
    },
    tags: ["object", "habit", "intermediate"],
  },
  "ps-528": {
    id: "ps-528",
    pair: "object",
    template: "화{0} 참아요",
    answer: "를",
    full: "화를 참아요",
    gloss: {
      en: "I hold back my anger",
      ko: "목적격 · 받침 없음 를 · 참다",
      zh: "我忍住怒气",
    },
    tags: ["object", "habit", "intermediate"],
  },
  "ps-529": {
    id: "ps-529",
    pair: "subject",
    template: "습관{0} 중요해요",
    answer: "이",
    full: "습관이 중요해요",
    gloss: {
      en: "Habits are important",
      ko: "주격 · 받침 뒤 이 · 습관",
      zh: "习惯很重要",
    },
    tags: ["subject", "habit", "intermediate"],
  },
  "ps-530": {
    id: "ps-530",
    pair: "object",
    template: "노력{0} 아끼지 않아요",
    answer: "을",
    full: "노력을 아끼지 않아요",
    gloss: {
      en: "I do not spare effort",
      ko: "목적격 · 받침 뒤 을 · 노력하다",
      zh: "我不吝惜努力",
    },
    tags: ["object", "habit", "intermediate"],
  },
  "ps-531": {
    id: "ps-531",
    pair: "subject",
    template: "키보드{0} 익숙해요",
    answer: "가",
    full: "키보드가 익숙해요",
    gloss: {
      en: "I am used to the keyboard",
      ko: "주격 · 받침 없음 가 · 익숙하다",
      zh: "我对键盘很熟悉",
    },
    tags: ["subject", "habit", "intermediate"],
  },
  "ps-532": {
    id: "ps-532",
    pair: "subject",
    template: "이름{0} 낯설어요",
    answer: "이",
    full: "이름이 낯설어요",
    gloss: {
      en: "The name feels unfamiliar",
      ko: "주격 · 받침 뒤 이 · 낯설다",
      zh: "名字很陌生",
    },
    tags: ["subject", "habit", "intermediate"],
  },
  "ps-533": {
    id: "ps-533",
    pair: "subject",
    template: "적응{0} 빨라요",
    answer: "이",
    full: "적응이 빨라요",
    gloss: {
      en: "Adaptation is quick",
      ko: "주격 · 받침 뒤 이 · 적응하다",
      zh: "适应很快",
    },
    tags: ["subject", "habit", "intermediate"],
  },
  "ps-534": {
    id: "ps-534",
    pair: "object",
    template: "휴식{0} 가져요",
    answer: "을",
    full: "휴식을 가져요",
    gloss: {
      en: "I take a rest",
      ko: "목적격 · 받침 뒤 을 · 휴식",
      zh: "我休息一下",
    },
    tags: ["object", "habit", "intermediate"],
  },
  "ps-535": {
    id: "ps-535",
    pair: "object",
    template: "방학{0} 기다려요",
    answer: "을",
    full: "방학을 기다려요",
    gloss: {
      en: "I wait for school vacation",
      ko: "목적격 · 받침 뒤 을 · 방학",
      zh: "我盼着学校假期",
    },
    tags: ["object", "habit", "intermediate"],
  },
  "ps-536": {
    id: "ps-536",
    pair: "subject",
    template: "생활{0} 단순해요",
    answer: "이",
    full: "생활이 단순해요",
    gloss: {
      en: "Life is simple",
      ko: "주격 · 받침 뒤 이 · 생활",
      zh: "生活很简单",
    },
    tags: ["subject", "habit", "intermediate"],
  },
};

const dictationMap = {
  "d-533": {
    id: "d-533",
    text: "목표를 포기하지 않아요",
    roman: "mokpyoreul pogihaji anayo",
    gloss: {
      en: "I do not give up the goal",
      ko: "포기하다",
      zh: "我不放弃目标",
    },
    tags: ["habit", "intermediate"],
  },
  "d-534": {
    id: "d-534",
    text: "화를 참아요",
    roman: "hwareul chamayo",
    gloss: {
      en: "I hold back my anger",
      ko: "참다",
      zh: "我忍住怒气",
    },
    tags: ["habit", "intermediate"],
  },
  "d-535": {
    id: "d-535",
    text: "습관이 중요해요",
    roman: "seupgwani jungyohaeyo",
    gloss: {
      en: "Habits are important",
      ko: "습관",
      zh: "习惯很重要",
    },
    tags: ["habit", "intermediate"],
  },
  "d-536": {
    id: "d-536",
    text: "노력을 아끼지 않아요",
    roman: "noryeogeul akkiji anayo",
    gloss: {
      en: "I do not spare effort",
      ko: "노력하다",
      zh: "我不吝惜努力",
    },
    tags: ["habit", "intermediate"],
  },
  "d-537": {
    id: "d-537",
    text: "키보드가 익숙해요",
    roman: "kibodeuga iksukhaeyo",
    gloss: {
      en: "I am used to the keyboard",
      ko: "익숙하다",
      zh: "我对键盘很熟悉",
    },
    tags: ["habit", "intermediate"],
  },
  "d-538": {
    id: "d-538",
    text: "이름이 낯설어요",
    roman: "ireumi natseoreoyo",
    gloss: {
      en: "The name feels unfamiliar",
      ko: "낯설다",
      zh: "名字很陌生",
    },
    tags: ["habit", "intermediate"],
  },
  "d-539": {
    id: "d-539",
    text: "적응이 빨라요",
    roman: "jeogeungi ppallayo",
    gloss: {
      en: "Adaptation is quick",
      ko: "적응하다",
      zh: "适应很快",
    },
    tags: ["habit", "intermediate"],
  },
  "d-540": {
    id: "d-540",
    text: "휴식을 가져요",
    roman: "hyusigeul gajyeoyo",
    gloss: {
      en: "I take a rest",
      ko: "휴식",
      zh: "我休息一下",
    },
    tags: ["habit", "intermediate"],
  },
  "d-541": {
    id: "d-541",
    text: "방학을 기다려요",
    roman: "banghageul gidaryeoyo",
    gloss: {
      en: "I wait for school vacation",
      ko: "방학",
      zh: "我盼着学校假期",
    },
    tags: ["habit", "intermediate"],
  },
  "d-542": {
    id: "d-542",
    text: "생활이 단순해요",
    roman: "saenghwari dansunhaeyo",
    gloss: {
      en: "Life is simple",
      ko: "생활",
      zh: "生活很简单",
    },
    tags: ["habit", "intermediate"],
  },
};

const telMap = {
  "tel-498": {
    id: "tel-498",
    text: "목표 포기하지 않아요",
    gloss: {
      en: "I do not give up the goal",
      ko: "포기하다",
      zh: "不放弃目标",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-499": {
    id: "tel-499",
    text: "화 참아요",
    gloss: {
      en: "I hold back my anger",
      ko: "참다",
      zh: "忍住怒气",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-500": {
    id: "tel-500",
    text: "습관 중요해요",
    gloss: {
      en: "Habits are important",
      ko: "습관",
      zh: "习惯很重要",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-501": {
    id: "tel-501",
    text: "노력 아끼지 않아요",
    gloss: {
      en: "I do not spare effort",
      ko: "노력하다",
      zh: "不吝惜努力",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-502": {
    id: "tel-502",
    text: "적응 빨라요",
    gloss: {
      en: "Adaptation is quick",
      ko: "적응하다",
      zh: "适应很快",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-503": {
    id: "tel-503",
    text: "방학 기다려요",
    gloss: {
      en: "I wait for school vacation",
      ko: "방학",
      zh: "盼着学校假期",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-504": {
    id: "tel-504",
    text: "동생 부지런해요",
    gloss: {
      en: "My younger sibling is diligent",
      ko: "부지런하다",
      zh: "弟弟/妹妹很勤快",
    },
    tags: ["habit", "intermediate"],
  },
  "tel-505": {
    id: "tel-505",
    text: "주말에 게을러요",
    gloss: {
      en: "I am lazy on weekends",
      ko: "게으르다",
      zh: "周末很懒",
    },
    tags: ["habit", "intermediate"],
  },
};

const scrambleMap = {
  "ws-500": {
    id: "ws-500",
    tokens: ["목표를", "포기하지", "않아요"],
    full: "목표를 포기하지 않아요",
    gloss: {
      en: "I do not give up the goal",
      ko: "포기하다",
      zh: "我不放弃目标",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-501": {
    id: "ws-501",
    tokens: ["화를", "참아요"],
    full: "화를 참아요",
    gloss: {
      en: "I hold back my anger",
      ko: "참다",
      zh: "我忍住怒气",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-502": {
    id: "ws-502",
    tokens: ["습관이", "중요해요"],
    full: "습관이 중요해요",
    gloss: {
      en: "Habits are important",
      ko: "습관",
      zh: "习惯很重要",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-503": {
    id: "ws-503",
    tokens: ["노력을", "아끼지", "않아요"],
    full: "노력을 아끼지 않아요",
    gloss: {
      en: "I do not spare effort",
      ko: "노력하다",
      zh: "我不吝惜努力",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-504": {
    id: "ws-504",
    tokens: ["적응이", "빨라요"],
    full: "적응이 빨라요",
    gloss: {
      en: "Adaptation is quick",
      ko: "적응하다",
      zh: "适应很快",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-505": {
    id: "ws-505",
    tokens: ["방학을", "기다려요"],
    full: "방학을 기다려요",
    gloss: {
      en: "I wait for school vacation",
      ko: "방학",
      zh: "我盼着学校假期",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-506": {
    id: "ws-506",
    tokens: ["동생이", "부지런해요"],
    full: "동생이 부지런해요",
    gloss: {
      en: "My younger sibling is diligent",
      ko: "부지런하다",
      zh: "弟弟/妹妹很勤快",
    },
    tags: ["habit", "intermediate"],
  },
  "ws-507": {
    id: "ws-507",
    tokens: ["주말에", "게을러요"],
    full: "주말에 게을러요",
    gloss: {
      en: "I am lazy on weekends",
      ko: "게으르다",
      zh: "周末很懒",
    },
    tags: ["habit", "intermediate"],
  },
};

const particle = load("particle-beginner.json");
replaceById(particle.items, particleMap);
particle.note =
  "+10 habits-lifestyle particle (ps-527–536, 2026-07-27): Prefer 포기하다·참다 residual · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활. Skip 부지런하다·게으르다 (bingo/listen Prefer Done) → tel/scramble Prefer-adjacent. Distinct from cloze hosts · listen hosts · routine 일어나다 · clinic/health · change 지나다·바뀌다 · motion 가다·오다 · opinion 노력이 중요해요. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 habit chip). Prior opinion ps-517–526 kept.";
save("particle-beginner.json", particle);

const dictation = load("dictation-beginner.json");
replaceById(dictation.items, dictationMap);
dictation.note =
  "+10 habits-lifestyle dictation (d-533–542, 2026-07-27): Prefer 포기하다·참다 residual · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활. Skip 부지런하다·게으르다 → tel/scramble Prefer-adjacent. Distinct from cloze/listen hosts · routine/clinic/change/motion · opinion 노력이 중요해요. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 habit chip). Prior opinion d-523–532 kept.";
save("dictation-beginner.json", dictation);

const tel = load("telephone-beginner.json");
replaceById(tel.items, telMap);
tel.note =
  "+8 habits-lifestyle telephone (tel-498–505, 2026-07-27): Prefer 포기하다·참다 residual · 습관·노력하다·적응하다·방학 · Prefer-adjacent 부지런하다·게으르다. Skip 익숙하다·낯설다·휴식·생활 (particle/dictation). Distinct from cloze/listen hosts · routine/clinic/change/motion. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 habit chip). Prior opinion tel-490–497 kept.";
save("telephone-beginner.json", tel);

const scramble = load("word-scramble-beginner.json");
replaceById(scramble.items, scrambleMap);
scramble.note =
  "+8 habits-lifestyle scramble (ws-500–507, 2026-07-27): Prefer 포기하다·참다 residual · 습관·노력하다·적응하다·방학 · Prefer-adjacent 부지런하다·게으르다. Skip 익숙하다·낯설다·휴식·생활 (particle/dictation). Distinct from cloze/listen hosts · routine/clinic/change/motion. NIKL/Sejong · 해요체 · no brand names. Suggest ThemeSm close (전 8 habit chip). Prior opinion ws-492–499 kept.";
save("word-scramble-beginner.json", scramble);

const manifest = load("manifest.json");
manifest.version = 212;
manifest.note =
  "Playable digital learning games. Banks = original jabi. only. Counts: bingo 587 · listen-match 554 · speed 540 · telephone 505 · scramble 507 · dictation 542 · cloze 532 · particle 536. +habits-lifestyle particle/dictation(+tel/scramble) +10/+10/+8/+8 (ps-527–536 · d-533–542 · tel-498–505 · ws-500–507) · themes habit · habitTagged 10/10/8/8 · Prefer 포기하다·참다 residual · Prefer-adjacent 부지런하다·게으르다 on tel/scramble · distinct from cloze/listen hosts · chip KO 습관 / ZH 习惯. Suggest ThemeSm close. hangul.js untouched.";
save("manifest.json", manifest);

// distinctness check vs cloze + listen
const cloze = load("cloze-beginner.json");
const listen = load("listen-match-beginner.json");
const clozeFulls = new Set(
  cloze.items
    .filter((x) => (x.tags || []).includes("habit"))
    .map((x) => x.full)
);
const listenTexts = new Set(
  listen.items
    .filter((x) => (x.tags || []).includes("habit"))
    .map((x) => x.text)
);

function check(file, getText) {
  const d = load(file);
  const hits = [];
  for (const x of d.items.filter((it) => (it.tags || []).includes("habit"))) {
    const t = getText(x);
    if (clozeFulls.has(t) || listenTexts.has(t)) hits.push(t);
  }
  return hits;
}

console.log(
  JSON.stringify(
    {
      particleDup: check("particle-beginner.json", (x) => x.full),
      dictationDup: check("dictation-beginner.json", (x) => x.text),
      scrambleDup: check("word-scramble-beginner.json", (x) => x.full),
      particleLast: particle.items.slice(-2).map((x) => x.full),
      telLast: tel.items.slice(-2).map((x) => x.text),
    },
    null,
    2
  )
);

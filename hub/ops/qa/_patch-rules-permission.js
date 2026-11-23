const fs = require('fs');

const packPath = 'hub/app/data/vocab/jabi-theme-packs-intermediate.json';
const speedPath = 'hub/app/data/games/speed-quiz-beginner.json';
const manifestPath = 'hub/app/data/games/manifest.json';

const p = JSON.parse(fs.readFileSync(packPath, 'utf8'));
const existing = new Set();
for (const pack of p.packs) for (const it of pack.items) existing.add(it.lemma);

const lemmas = [
  '규칙', '지키다', '어기다', '허락하다', '금지하다', '자유',
  '의무', '예의', '질서', '법', '허용하다', '안전하다'
];
const overlap = lemmas.filter((l) => existing.has(l));
if (overlap.length) {
  console.error('OVERLAP', overlap);
  process.exit(1);
}
if (p.packs.some((x) => x.id === 'rules-permission')) {
  console.error('pack already exists');
  process.exit(1);
}

const newPack = {
  id: 'rules-permission',
  title: {
    en: 'Rules & permission',
    ko: '규칙·허락',
    zh: '规则与许可'
  },
  grammarHooks: ['아/어도 되다', '으면 안 되다', '도록'],
  note: 'Everyday rule / keep / break / permit / forbid / freedom / duty / manners / order / law / allow / safe survival — distinct from driving 위험·조심하다 · public-life 가능 · school 시험 · favor 필요하다 · habit 적응하다 · problem 힘들다. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 어기다·허용하다 → cloze · themes rules · chip 규칙/规则.',
  items: [
    {
      id: 'int-rp-01',
      lemma: '규칙',
      pos: 'n',
      gloss: { en: 'rule', ko: '규칙', zh: '规则' },
      derived: ['규칙적'],
      example: {
        ko: '도서관 규칙을 잘 지켜 주세요.',
        en: 'Please follow the library rules carefully.',
        zh: '请好好遵守图书馆规则。'
      }
    },
    {
      id: 'int-rp-02',
      lemma: '지키다',
      pos: 'v',
      gloss: { en: 'to keep; observe (a rule)', ko: '지키다', zh: '遵守；守住' },
      example: {
        ko: '약속을 꼭 지킬게요.',
        en: 'I will definitely keep the promise.',
        zh: '我一定会守约。'
      }
    },
    {
      id: 'int-rp-03',
      lemma: '어기다',
      pos: 'v',
      gloss: { en: 'to break (a rule/promise)', ko: '어기다', zh: '违反；违背' },
      example: {
        ko: '교통 규칙을 어기지 마세요.',
        en: 'Please do not break traffic rules.',
        zh: '请不要违反交通规则。'
      }
    },
    {
      id: 'int-rp-04',
      lemma: '허락하다',
      pos: 'v',
      gloss: { en: 'to permit; allow', ko: '허락하다', zh: '允许；许可' },
      derived: ['허락'],
      example: {
        ko: '부모님이 외출을 허락하셨어요.',
        en: 'My parents allowed me to go out.',
        zh: '父母允许我外出了。'
      }
    },
    {
      id: 'int-rp-05',
      lemma: '금지하다',
      pos: 'v',
      gloss: { en: 'to prohibit; forbid', ko: '금지하다', zh: '禁止' },
      derived: ['금지'],
      example: {
        ko: '여기서는 담배를 금지해요.',
        en: 'Smoking is prohibited here.',
        zh: '这里禁止吸烟。'
      }
    },
    {
      id: 'int-rp-06',
      lemma: '자유',
      pos: 'n',
      gloss: { en: 'freedom', ko: '자유', zh: '自由' },
      derived: ['자유롭다'],
      example: {
        ko: '주말에는 시간이 자유로워요.',
        en: 'I have free time on weekends.',
        zh: '周末时间比较自由。'
      }
    },
    {
      id: 'int-rp-07',
      lemma: '의무',
      pos: 'n',
      gloss: { en: 'duty; obligation', ko: '의무', zh: '义务' },
      example: {
        ko: '학생의 의무를 잊지 마세요.',
        en: 'Please do not forget a student’s duties.',
        zh: '请不要忘记学生的义务。'
      }
    },
    {
      id: 'int-rp-08',
      lemma: '예의',
      pos: 'n',
      gloss: { en: 'manners; etiquette', ko: '예의', zh: '礼貌；礼节' },
      example: {
        ko: '어른께는 예의를 지켜야 해요.',
        en: 'You should show manners to elders.',
        zh: '对长辈要有礼貌。'
      }
    },
    {
      id: 'int-rp-09',
      lemma: '질서',
      pos: 'n',
      gloss: { en: 'order; public order', ko: '질서', zh: '秩序' },
      example: {
        ko: '줄을 서서 질서를 지켜요.',
        en: 'We line up and keep order.',
        zh: '我们排队维持秩序。'
      }
    },
    {
      id: 'int-rp-10',
      lemma: '법',
      pos: 'n',
      gloss: { en: 'law', ko: '법', zh: '法律' },
      derived: ['법률'],
      example: {
        ko: '그 나라는 법이 아주 엄격해요.',
        en: 'The laws in that country are very strict.',
        zh: '那个国家的法律很严格。'
      }
    },
    {
      id: 'int-rp-11',
      lemma: '허용하다',
      pos: 'v',
      gloss: { en: 'to allow; accept', ko: '허용하다', zh: '允许；容许' },
      derived: ['허용'],
      example: {
        ko: '이 자리에는 반려동물 입장이 허용돼요.',
        en: 'Pets are allowed in this seat area.',
        zh: '这个座位区允许带宠物入场。'
      }
    },
    {
      id: 'int-rp-12',
      lemma: '안전하다',
      pos: 'a',
      gloss: { en: 'to be safe', ko: '안전하다', zh: '安全' },
      derived: ['안전'],
      example: {
        ko: '헬멧을 쓰면 더 안전해요.',
        en: 'It is safer if you wear a helmet.',
        zh: '戴头盔更安全。'
      }
    }
  ]
};

p.version = 54;
p.inspiredBy = p.inspiredBy.replace(
  'habits-lifestyle scenes',
  'habits-lifestyle/rules-permission scenes'
);
p.copyright = p.copyright.replace(
  'Habits-lifestyle pack = generic habit/effort/adapt/rest terms only (no brand names).',
  'Habits-lifestyle pack = generic habit/effort/adapt/rest terms only (no brand names). Rules-permission pack = generic rule/permit/forbid/duty terms only (no brand names).'
);
p.note =
  '+rules-permission 12 (규칙·지키다·어기다·허락하다·금지하다·자유·의무·예의·질서·법·허용하다·안전하다) 2026-07-27. Distinct from driving 위험·조심하다 · public-life 가능 · school 시험 · favor · habit · problem. Lemmas align NIKL/Sejong·Tammy; original examples. No brand names. Speed +10 · Prefer 어기다·허용하다 → cloze · themes rules · chip 규칙/规则. Existing packs kept (incl. habits-lifestyle sweep closed). Prefer NIKL A ∪ Tammy allowlist for TOPIK I banks. This file is for Games/TOPIK II-adjacent drills; do not merge wholesale into vocab-allowlist.json.';
p.packs.push(newPack);
fs.writeFileSync(packPath, JSON.stringify(p, null, 2) + '\n');

const s = JSON.parse(fs.readFileSync(speedPath, 'utf8'));
s.version = 55;
if (!s.themes.includes('rules')) {
  const idx = s.themes.indexOf('habit');
  if (idx >= 0) s.themes.splice(idx + 1, 0, 'rules');
  else s.themes.push('rules');
}
s.copyright = s.copyright.replace(
  'habits-lifestyle crossfill',
  'habits-lifestyle / rules-permission crossfill'
);

const speedItems = [
  {
    id: 'sq-541',
    prompt: { en: 'Rule?', ko: '규칙?', zh: '规则？' },
    choices: ['자유', '규칙', '예의', '의무'],
    answer: 1,
    explain: {
      en: '규칙 = rule.',
      ko: '규칙 = 지켜야 하는 정해진 내용.',
      zh: '규칙 = 规则。'
    }
  },
  {
    id: 'sq-542',
    prompt: { en: 'To keep / observe (a rule)?', ko: '지키다?', zh: '遵守？' },
    choices: ['지키다', '어기다', '금지하다', '허용하다'],
    answer: 0,
    explain: {
      en: '지키다 = to keep / observe.',
      ko: '지키다 = 어기지 않고 그대로 하다.',
      zh: '지키다 = 遵守；守住。'
    }
  },
  {
    id: 'sq-543',
    prompt: { en: 'To permit / allow?', ko: '허락하다?', zh: '允许？' },
    choices: ['금지하다', '어기다', '허락하다', '질서'],
    answer: 2,
    explain: {
      en: '허락하다 = to permit.',
      ko: '허락하다 = 해도 된다고 하다.',
      zh: '허락하다 = 允许。'
    }
  },
  {
    id: 'sq-544',
    prompt: { en: 'To prohibit / forbid?', ko: '금지하다?', zh: '禁止？' },
    choices: ['금지하다', '허락하다', '자유', '예의'],
    answer: 0,
    explain: {
      en: '금지하다 = to prohibit.',
      ko: '금지하다 = 하면 안 된다고 막다.',
      zh: '금지하다 = 禁止。'
    }
  },
  {
    id: 'sq-545',
    prompt: { en: 'Freedom?', ko: '자유?', zh: '自由？' },
    choices: ['의무', '법', '자유', '질서'],
    answer: 2,
    explain: {
      en: '자유 = freedom.',
      ko: '자유 = 구속 없이 행동할 수 있음.',
      zh: '자유 = 自由。'
    }
  },
  {
    id: 'sq-546',
    prompt: { en: 'Duty / obligation?', ko: '의무?', zh: '义务？' },
    choices: ['자유', '의무', '예의', '규칙'],
    answer: 1,
    explain: {
      en: '의무 = duty / obligation.',
      ko: '의무 = 마땅히 해야 할 일.',
      zh: '의무 = 义务。'
    }
  },
  {
    id: 'sq-547',
    prompt: { en: 'Manners / etiquette?', ko: '예의?', zh: '礼貌？' },
    choices: ['예의', '법', '질서', '안전하다'],
    answer: 0,
    explain: {
      en: '예의 = manners / etiquette.',
      ko: '예의 = 남을 공경하는 태도.',
      zh: '예의 = 礼貌；礼节。'
    }
  },
  {
    id: 'sq-548',
    prompt: { en: 'Order / public order?', ko: '질서?', zh: '秩序？' },
    choices: ['자유', '의무', '질서', '허락하다'],
    answer: 2,
    explain: {
      en: '질서 = order.',
      ko: '질서 = 혼란 없이 정돈된 상태.',
      zh: '질서 = 秩序。'
    }
  },
  {
    id: 'sq-549',
    prompt: { en: 'Law?', ko: '법?', zh: '法律？' },
    choices: ['규칙', '예의', '법', '자유'],
    answer: 2,
    explain: {
      en: '법 = law.',
      ko: '법 = 국가가 정한 강제 규범.',
      zh: '법 = 法律。'
    }
  },
  {
    id: 'sq-550',
    prompt: { en: 'To be safe?', ko: '안전하다?', zh: '安全？' },
    choices: ['금지하다', '안전하다', '어기다', '의무'],
    answer: 1,
    explain: {
      en: '안전하다 = to be safe.',
      ko: '안전하다 = 위험하지 않다.',
      zh: '안전하다 = 安全。'
    }
  }
].map((it) => ({ ...it, tags: ['rules', 'intermediate'] }));

s.items.push(...speedItems);
s.note =
  '+10 rules-permission MCQ (sq-541–550, 2026-07-27). Pack lemmas 규칙·지키다·허락하다·금지하다·자유·의무·예의·질서·법·안전하다. 어기다·허용하다 → cloze Prefer. Distinct from driving 위험·조심하다 · public-life 가능 · school · favor · habit · problem. NIKL/Sejong·Tammy. No brand names. Prior habit sq-531–540 kept. Suggest cloze +8–10 · Prefer 어기다·허용하다 · themes rules · chip KO 규칙 / ZH 规则.';
fs.writeFileSync(speedPath, JSON.stringify(s, null, 2) + '\n');

const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
m.version = 213;
m.note =
  'Playable digital learning games. Banks = original jabi. only. Counts: bingo 587 · listen-match 554 · speed 550 · telephone 505 · scramble 507 · dictation 542 · cloze 532 · particle 536. +rules-permission pack + speed +10 (sq-541–550) · themes rules · rulesTagged 10 · Prefer 어기다·허용하다 → cloze · chip KO 규칙 / ZH 规则. Suggest cloze next. hangul.js untouched.';
fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');

console.log(
  'packs',
  p.packs.length,
  'items',
  p.packs.reduce((n, x) => n + x.items.length, 0)
);
console.log(
  'speed',
  s.version,
  s.items.length,
  'rulesTagged',
  s.items.filter((i) => (i.tags || []).includes('rules')).length
);
console.log('manifest', m.version);

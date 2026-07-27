/** Load brand strings + apply data-i18n. Langs: en | ko | zh (ja reserved later). */
(function () {
  const LANG_KEY = "topik-coach-lang";
  const DEFAULT = "en";
  const SUPPORTED = new Set(["en", "ko", "zh"]);

  const STR = {
    en: {
      logo: "jabi.",
      eyebrow: "jabi. · staging",
      heroTitle: "Korean, caught gently.",
      heroLead:
        "TOPIK I practice in three modes — Catch 🎯 drills hard, Mercy 🌟 never rushes you, Guide 🧭 leads the way. AI weak-spot review, optional live coaches. Separate from wensonjabi.com until launch.",
      doorsLearnPath: "Learning path",
      doorsMore: "More",
      badgeScaffold: "Draft",
      doorLearn: "TOPIK I",
      doorLearnTitle: "TOPIK I practice",
      doorLearnDesc: "Reading + listening practice, streaks, quest tags on words & grammar you miss.",
      doorHangul: "Hangul",
      doorHangulTitle: "Hangul read & write",
      doorHangulDesc: "Sejong 00–17 path · research-backed content · stroke practice · XP & crowns.",
      doorBasic: "Basics",
      doorBasicTitle: "Basics (pre-TOPIK)",
      doorBasicDesc: "Sejong/TOPIK survival themes · research-backed dialogues 01–06 · XP & crowns.",
      doorTopik2: "TOPIK II",
      doorTopik2Title: "TOPIK II",
      doorTopik2Desc: "Listen/read/write practice · formative writing score (not official TOPIK).",
      doorRead: "Read",
      doorReadTitle: "Text collection",
      doorReadDesc: "Learner questions → short EN∥KO parallel readings (pilot · research-backed).",
      doorTeach: "Teach",
      doorTeachTitle: "Coach option",
      doorTeachDesc: "AI learner report → vetted seats for direction & Q&A (pilot · no fake profiles).",
      doorGames: "Games",
      doorGamesTitle: "Learning games",
      doorGamesDesc: "Research-backed drills · Speechling-style dictation · cloze · snap · quiz · scramble · bingo · listen match · telephone. Shop ≠ Games.",
      doorShop: "Shop",
      doorShopTitle: "Merch & boards",
      doorShopDesc: "Board games & character goods — later.",
      aboutPaul: "About Paul (identity) →",
      privacy: "Privacy",
      stagingNote: "This site is not linked from wensonjabi.com yet.",
      onboardingEyebrow: "How do you learn best?",
      onboardingTitle: "Pick your path",
      onboardingLead: "You can change this anytime in settings.",
      modeCatchTitle: "Catch Mode",
      modeCatchSub: "Grab TOPIK tight. Weak spots first.",
      modeMercyTitle: "Mercy Mode",
      modeMercySub: "No rush. jabi. waits for you.",
      modeGuideTitle: "Guide Mode",
      modeGuideSub: "Balanced path. jabi. leads.",
    },
    ko: {
      logo: "jabi.",
      eyebrow: "jabi. · 미리보기",
      heroTitle: "한국어, 다정하게 잡다.",
      heroLead:
        "세 가지 길로 TOPIK I 연습 — 「붙잡기」🎯는 약점부터 몰아보고, 「천천히」🌟는 서두르지 않으며, 「길잡이」🧭는 길을 안내합니다. AI 약점 복습, 선택형 선생님. 출시 전까지 wensonjabi.com과 분리.",
      doorsLearnPath: "학습 경로",
      doorsMore: "더 보기",
      badgeScaffold: "초안",
      doorLearn: "TOPIK I",
      doorLearnTitle: "TOPIK I 연습",
      doorLearnDesc: "읽기·듣기 연습, 연속 학습, 틀린 단어·문법만 퀘스트 복습.",
      doorHangul: "한글",
      doorHangulTitle: "한글 읽기·쓰기",
      doorHangulDesc: "세종 00–17 패스 · 연구 근거 콘텐츠 · 획순 · XP·크라운.",
      doorBasic: "기초",
      doorBasicTitle: "기초 수업",
      doorBasicDesc: "세종·TOPIK 생존 주제 · 연구 근거 대화 01–06 · XP·크라운.",
      doorTopik2: "TOPIK II",
      doorTopik2Title: "TOPIK II",
      doorTopik2Desc: "듣기·읽기·쓰기 연습 · 형성 점수(공식 TOPIK 아님).",
      doorRead: "읽기",
      doorReadTitle: "글모음",
      doorReadDesc: "학습자 질문 → 짧은 영·한 병행 읽기 (파일럿 · 연구 근거).",
      doorTeach: "가르치기",
      doorTeachTitle: "선생님 선택",
      doorTeachDesc: "AI 학습 보고 → 검증 좌석과 방향·질문 (파일럿 · 가짜 프로필 없음).",
      doorGames: "게임",
      doorGamesTitle: "학습 게임",
      doorGamesDesc: "연구 근거 드릴 · Speechling식 받아쓰기 · 빈칸·스냅·퀴즈·어순·빙고·듣기짝·전화. 상점 ≠ 게임.",
      doorShop: "상점",
      doorShopTitle: "굿즈·보드",
      doorShopDesc: "보드게임·캐릭터 굿즈 — 나중에.",
      aboutPaul: "Paul 소개 (정체성) →",
      privacy: "개인정보",
      stagingNote: "아직 wensonjabi.com과 연결되지 않았습니다.",
      onboardingEyebrow: "어떻게 공부하는 게 가장 잘 맞나요?",
      onboardingTitle: "나의 학습 방식 선택",
      onboardingLead: "언제든지 설정에서 바꿀 수 있어요.",
      modeCatchTitle: "붙잡기",
      modeCatchSub: "TOPIK을 확실히 잡습니다. 약점부터.",
      modeMercyTitle: "천천히",
      modeMercySub: "서두르지 마세요. jabi.는 기다립니다.",
      modeGuideTitle: "길잡이",
      modeGuideSub: "균형 잡힌 길. jabi.가 인도합니다.",
    },
    zh: {
      logo: "jabi.",
      eyebrow: "jabi. · 预发",
      heroTitle: "温柔地抓住韩语。",
      heroLead:
        "三种路线练 TOPIK I —— 「抓住」🎯 先攻弱点，「慢慢」🌟 不催你，「向导」🧭 带路。AI 弱项复习，可选真人教练。上线前与 wensonjabi.com 分开。",
      doorsLearnPath: "学习路径",
      doorsMore: "更多",
      badgeScaffold: "草稿",
      doorLearn: "TOPIK I",
      doorLearnTitle: "TOPIK I 练习",
      doorLearnDesc: "阅读+听力练习、连续打卡、错词错语法任务复习。",
      doorHangul: "韩文",
      doorHangulTitle: "韩文字母读写",
      doorHangulDesc: "世宗00–17路径 · 研究依据内容 · 笔顺 · XP与王冠。",
      doorBasic: "基础",
      doorBasicTitle: "基础课程",
      doorBasicDesc: "世宗/TOPIK生存主题 · 研究依据对话01–06 · XP与王冠。",
      doorTopik2: "TOPIK II",
      doorTopik2Title: "TOPIK II",
      doorTopik2Desc: "听读写练习 · 形成性分数（非官方 TOPIK）。",
      doorRead: "读",
      doorReadTitle: "文集",
      doorReadDesc: "学习者提问 → 短英韩对照阅读（试读 · 研究依据）。",
      doorTeach: "教",
      doorTeachTitle: "教练选项",
      doorTeachDesc: "AI 学习报告 → 认证席位方向与答疑（试运行 · 无假资料）。",
      doorGames: "游戏",
      doorGamesTitle: "学习游戏",
      doorGamesDesc: "研究依据练习 · Speechling式听写 · 填空·快选·测验·语序·宾果·听力配对·传话。商店 ≠ 游戏。",
      doorShop: "店",
      doorShopTitle: "周边与桌游",
      doorShopDesc: "桌游与角色周边 — 稍后。",
      aboutPaul: "关于 Paul（身份）→",
      privacy: "隐私",
      stagingNote: "尚未与 wensonjabi.com 链接。",
      onboardingEyebrow: "你更适合怎么学？",
      onboardingTitle: "选择学习方式",
      onboardingLead: "随时可在设置中更改。",
      modeCatchTitle: "抓住",
      modeCatchSub: "抓紧 TOPIK。先攻弱点。",
      modeMercyTitle: "慢慢",
      modeMercySub: "不着急。jabi. 等你。",
      modeGuideTitle: "向导",
      modeGuideSub: "均衡路线。jabi. 带路。",
    },
  };

  function normalizeLang(lang) {
    return SUPPORTED.has(lang) ? lang : DEFAULT;
  }

  function getLang() {
    return normalizeLang(localStorage.getItem(LANG_KEY) || DEFAULT);
  }

  function setLang(lang) {
    const next = normalizeLang(lang);
    localStorage.setItem(LANG_KEY, next);
    apply();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === next);
    });
  }

  function stringsFor(lang) {
    const extra = window.HubI18nExtra || {};
    const L = normalizeLang(lang);
    return {
      ...STR.en,
      ...(STR[L] || {}),
      ...(extra.en || {}),
      ...(extra[L] || {}),
    };
  }

  function t(key) {
    const s = stringsFor(getLang());
    return s[key] || STR.en[key] || key;
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    const lang = getLang();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === getLang());
    });
  });

  window.HubI18n = { getLang, setLang, t, supported: ["en", "ko", "zh"] };
})();

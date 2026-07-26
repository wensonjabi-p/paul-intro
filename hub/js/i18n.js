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
      doorLearn: "Learn",
      doorLearnTitle: "TOPIK I app",
      doorLearnDesc: "Mock reading, streaks, SRS on words & grammar you miss.",
      doorRead: "Read",
      doorReadTitle: "Blog",
      doorReadDesc: "EN + KO posts from real learner questions (Reddit pipeline).",
      doorTeach: "Teach",
      doorTeachTitle: "Coach option",
      doorTeachDesc: "AI learner report → vetted tutor for direction & Q&A.",
      doorShop: "Shop",
      doorShopTitle: "Games & templates",
      doorShopDesc: "Coming later — linked to the same ecosystem.",
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
      doorLearn: "배우기",
      doorLearnTitle: "TOPIK I 연습",
      doorLearnDesc: "읽기 모의고사, 연속 학습, 틀린 단어·문법만 간격 복습.",
      doorRead: "읽기",
      doorReadTitle: "글모음",
      doorReadDesc: "영·한 병행 — 학습자 질문으로 쓴 글.",
      doorTeach: "가르치기",
      doorTeachTitle: "선생님 선택",
      doorTeachDesc: "AI 학습 보고 → 검증된 선생님과 방향·질문.",
      doorShop: "상점",
      doorShopTitle: "놀이·서식",
      doorShopDesc: "나중에 연결 — 같은 세계의 상점.",
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
        "三种模式练 TOPIK I —— Catch 🎯 猛练弱点，Mercy 🌟 不催你，Guide 🧭 带路。AI 弱项复习，可选真人教练。上线前与 wensonjabi.com 分开。",
      doorLearn: "学",
      doorLearnTitle: "TOPIK I 应用",
      doorLearnDesc: "阅读模考、连续打卡、错词错语法 SRS。",
      doorRead: "读",
      doorReadTitle: "博客",
      doorReadDesc: "中英韩相关文章（学习者真实问题）。",
      doorTeach: "教",
      doorTeachTitle: "教练选项",
      doorTeachDesc: "AI 学习报告 → 认证老师方向与答疑。",
      doorShop: "店",
      doorShopTitle: "游戏与模板",
      doorShopDesc: "稍后接入同一生态。",
      aboutPaul: "关于 Paul（身份）→",
      privacy: "隐私",
      stagingNote: "尚未与 wensonjabi.com 链接。",
      onboardingEyebrow: "你更适合怎么学？",
      onboardingTitle: "选择学习方式",
      onboardingLead: "随时可在设置中更改。",
      modeCatchTitle: "Catch 模式",
      modeCatchSub: "抓紧 TOPIK。先攻弱点。",
      modeMercyTitle: "Mercy 模式",
      modeMercySub: "不着急。jabi. 等你。",
      modeGuideTitle: "Guide 模式",
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

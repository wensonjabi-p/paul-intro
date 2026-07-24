/** Load brand.json + apply data-i18n / data-i18n-attr to page. */
(function () {
  const LANG_KEY = "topik-coach-lang";
  const DEFAULT = "en";

  const STR = {
    en: {
      logo: "jabi.",
      eyebrow: "Staging hub · product name TBD",
      heroTitle: "Learn Korean for the real test.",
      heroLead:
        "Gamified TOPIK I practice, AI weak-spot drills, optional live coaches. Built separately from wensonjabi.com until launch.",
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
      // Onboarding (jabi.)
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
      eyebrow: "스테이징 허브 · 상품명 미정",
      heroTitle: "실전 TOPIK을 위한 한국어 학습.",
      heroLead:
        "TOPIK I 게임화 연습, AI 약점 반복, 선택형 라이브 코치. wensonjabi.com과 분리 개발 중입니다.",
      doorLearn: "Learn",
      doorLearnTitle: "TOPIK I 앱",
      doorLearnDesc: "읽기 모의, 스트릭, 틀린 단어·문법만 SRS.",
      doorRead: "Read",
      doorReadTitle: "블로그",
      doorReadDesc: "영·한 병행 — 학습자 질문 기반 글 (Reddit 파이프라인).",
      doorTeach: "Teach",
      doorTeachTitle: "코치 옵션",
      doorTeachDesc: "AI 학습 리포트 → 검증 강사와 방향·Q&A.",
      doorShop: "Shop",
      doorShopTitle: "게임·템플릿",
      doorShopDesc: "추후 연결 — 같은 생태계 상점.",
      aboutPaul: "Paul 소개 (정체성) →",
      privacy: "개인정보",
      stagingNote: "아직 wensonjabi.com과 연결되지 않았습니다.",
      // Onboarding (jabi.)
      onboardingEyebrow: "어떻게 공부하는 게 가장 잘 맞나요?",
      onboardingTitle: "나의 학습 방식 선택",
      onboardingLead: "언제든지 설정에서 바꿀 수 있어요.",
      modeCatchTitle: "Catch 모드",
      modeCatchSub: "TOPIK을 확실히 잡습니다. 약점부터.",
      modeMercyTitle: "Mercy 모드",
      modeMercySub: "서두르지 마세요. jabi.는 기다립니다.",
      modeGuideTitle: "Guide 모드",
      modeGuideSub: "균형 잡힌 길. jabi.가 인도합니다.",
    },
  };

  function getLang() {
    const s = localStorage.getItem(LANG_KEY);
    return s === "ko" ? "ko" : DEFAULT;
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang === "ko" ? "ko" : "en");
    apply();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function stringsFor(lang) {
    const extra = window.HubI18nExtra || {};
    return { ...STR.en, ...STR[lang], ...(extra.en || {}), ...(lang === "ko" ? extra.ko || {} : {}) };
  }

  function t(key) {
    const lang = getLang();
    const s = stringsFor(lang);
    return s[key] || STR.en[key] || key;
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.documentElement.lang = getLang() === "ko" ? "ko" : "en";
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

  window.HubI18n = { getLang, setLang, t };
})();

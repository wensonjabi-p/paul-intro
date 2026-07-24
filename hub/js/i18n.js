/** Load brand.json + apply data-i18n / data-i18n-attr to page. */
(function () {
  const LANG_KEY = "topik-coach-lang";
  const DEFAULT = "en";

  const STR = {
    en: {
      logo: "TOPIK Coach",
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
    },
    ko: {
      logo: "TOPIK Coach",
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

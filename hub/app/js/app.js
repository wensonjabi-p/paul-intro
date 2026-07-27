const LS_KEY = "topik-coach-v1";
const MODE_KEY = "tc-mode";
const MOCK_FILES = [
  "./data/verified-read-01.json",
  "./data/verified-read-02.json",
  "./data/verified-read-03.json",
  "./data/verified-read-04.json",
];
const LISTEN_FILES = [
  "./data/verified-listen-01.json",
  "./data/verified-listen-02.json",
];
/** Reading Set 3 — final-style practice stand-in (not a full 70Q official mock). */
const FINAL_MOCK_FILE = "./data/verified-read-03.json";
const SRS_PRACTICE_SIZE = 8;
const FREE_STAGE_CAP = 2; // pants — D20 provisional
/** XP floors for character stages 1–6 (matches syncCharStageFromXp).
 * Paced for ~15-20 ten-question practice sets (~110 XP/set incl. the
 * finishMock() +20 clear bonus) to reach stage 6 — Paul-confirmed pace,
 * 2026-07-28 (previous floors let a single set jump stage 1→2). */
const STAGE_XP_FLOORS = [0, 220, 550, 1000, 1450, 1900];
const GOAL_SUGGEST_PCT = 25;
const REGISTER_ASK_PCT = 80;
// A single lucky mock shouldn't trigger a "go register" nudge — require a few scored attempts first.
const MIN_ATTEMPTS_FOR_REGISTER = 3;

/** 13 partners (ㅈ/jieut excluded). Art contract: assets/chars/manifest.json · char-{id}-{1..6}.svg */
const PARTNER_JAMOS = [
  { id: "giyeok", glyph: "ㄱ" },
  { id: "nieun", glyph: "ㄴ" },
  { id: "digeut", glyph: "ㄷ" },
  { id: "rieul", glyph: "ㄹ" },
  { id: "mieum", glyph: "ㅁ" },
  { id: "bieup", glyph: "ㅂ" },
  { id: "siot", glyph: "ㅅ" },
  { id: "ieung", glyph: "ㅇ" },
  { id: "chieut", glyph: "ㅊ" },
  { id: "kieuk", glyph: "ㅋ" },
  { id: "tieut", glyph: "ㅌ" },
  { id: "pieup", glyph: "ㅍ" },
  { id: "hieut", glyph: "ㅎ" },
];

const STAGE_LABELS = {
  en: ["baby", "pants", "boots", "weapon", "shield", "crown"],
  ko: ["아기", "바지", "장화", "무기", "방패", "왕관"],
  zh: ["婴儿", "短裤", "靴子", "武器", "盾牌", "王冠"],
};

function defaultProfile() {
  return {
    onboardingDone: false,
    nativeLang: "zh",
    region: "cn",
    priorStudy: "none",
    studyAmount: "steady",
    dailyMinutes: "30",
    hasExamGoal: false,
    goalMonth: "",
    goalSuggestedDismissed: false,
    registerAsked: false,
    partnerId: "",
    partnerGlyph: "",
    charStage: 1,
    pendingMode: "",
    proUnlock: false,
    trialCode: "",
  };
}

function defaultState() {
  return {
    streak: 0,
    lastStudyDate: "",
    xp: 0,
    srs: {},
    attempts: [],
    learner: {
      totalHints: 0,
      totalWrongTries: 0,
      totalCorrect: 0,
      byTag: {},
      /** questionId → { "0": n, "1": n, ... } wrong picks (for eliminate ranking) */
      choiceWrong: {},
    },
    profile: defaultProfile(),
    readinessLog: [],
    /** In-progress quiz — survive refresh */
    session: null,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    const merged = { ...base, ...parsed };
    merged.learner = { ...base.learner, ...(parsed.learner || {}) };
    if (!merged.learner.byTag) merged.learner.byTag = {};
    if (!merged.learner.choiceWrong) merged.learner.choiceWrong = {};
    merged.profile = { ...base.profile, ...(parsed.profile || {}) };
    merged.readinessLog = Array.isArray(parsed.readinessLog) ? parsed.readinessLog : [];
    merged.session = parsed.session && typeof parsed.session === "object" ? parsed.session : null;
    // Legacy: had mode but no new onboarding → keep using app
    if (!merged.profile.onboardingDone && localStorage.getItem(MODE_KEY)) {
      merged.profile.onboardingDone = true;
      if (!merged.profile.partnerId) {
        merged.profile.partnerId = "giyeok";
        merged.profile.partnerGlyph = "ㄱ";
      }
    }
    return merged;
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function todayKey() {
  return dateKey(new Date());
}

function addDaysToKey(key, days) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return dateKey(dt);
}

function normalizeSrsMeta(meta) {
  if (!meta.intervalDays && meta.intervalDays !== 0) meta.intervalDays = 1;
  if (!meta.nextReview) meta.nextReview = todayKey();
  if (!meta.ease) meta.ease = 2.5;
  return meta;
}

function getDueTags(s) {
  const today = todayKey();
  return Object.entries(s.srs)
    .filter(([, meta]) => {
      normalizeSrsMeta(meta);
      return meta.nextReview <= today;
    })
    .map(([tag]) => tag);
}

function scheduleSrs(s, tag, correct) {
  if (!s.srs[tag]) {
    s.srs[tag] = { count: 0, nextReview: todayKey(), ease: 2.5, intervalDays: 1 };
  }
  const m = normalizeSrsMeta(s.srs[tag]);
  const today = todayKey();
  if (correct) {
    if (m.intervalDays <= 1) m.intervalDays = 3;
    else m.intervalDays = Math.min(m.intervalDays + 3, 14);
    m.nextReview = addDaysToKey(today, m.intervalDays);
  } else {
    m.count += 1;
    m.intervalDays = 1;
    m.nextReview = addDaysToKey(today, 1);
  }
  return s;
}

function bumpStreak(state) {
  const today = todayKey();
  if (state.lastStudyDate === today) return state;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = dateKey(yesterday);
  if (state.lastStudyDate === yKey) state.streak += 1;
  else state.streak = 1;
  state.lastStudyDate = today;
  return state;
}

function addXp(state, n) {
  state.xp += n;
  return state;
}

function addSrsTags(state, tags) {
  tags.forEach((tag) => {
    if (!state.srs[tag]) {
      state.srs[tag] = { count: 0, nextReview: todayKey(), ease: 2.5, intervalDays: 1 };
    }
    normalizeSrsMeta(state.srs[tag]);
    state.srs[tag].count += 1;
    state.srs[tag].nextReview = todayKey();
    state.srs[tag].intervalDays = 1;
  });
  return state;
}

function levelFromXp(xp) {
  if (xp < 50) return 1;
  if (xp < 150) return 2;
  if (xp < 300) return 3;
  return 4;
}

function getLang() {
  const l = window.HubI18n && HubI18n.getLang();
  if (l === "ko" || l === "zh") return l;
  return "en";
}

/** Pick en / ko / zh string (zh falls back to en if omitted). */
function L(en, ko, zh) {
  const lang = getLang();
  if (lang === "ko") return ko;
  if (lang === "zh") return zh != null ? zh : en;
  return en;
}

function getMode() {
  return localStorage.getItem(MODE_KEY) || "";
}

function modeDisplayName(mode) {
  const m = mode || getMode() || "";
  if (m === "catch") return L("Catch", "붙잡기", "Catch");
  if (m === "mercy") return L("Mercy", "천천히", "Mercy");
  if (m === "guide") return L("Guide", "길잡이", "Guide");
  return m || "—";
}

function setMode(mode) {
  localStorage.setItem(MODE_KEY, mode);
}

// Mode-specific UI strings (jabi. light branch)
const MODE_UI = {
  en: {
    catch: {
      greeting: "Let's catch this TOPIK. Drill time.",
      ctaPrimary: "Start Mock Exam",
      ctaSecondary: "Review Weak Spots",
    },
    mercy: {
      greeting: "Day {streak}. jabi. never rushes you.",
      ctaPrimary: "Continue Streak",
      ctaSecondary: "Explore Weak Spots",
    },
    guide: {
      greeting: "Your guide knows the way. Forward.",
      ctaPrimary: "Today's Quest",
      ctaSecondary: "Review Focus Areas",
    },
  },
  ko: {
    catch: {
      greeting: "TOPIK을 잡아봅시다. 연습 시작.",
      ctaPrimary: "모의고사 시작",
      ctaSecondary: "약점 복습",
    },
    mercy: {
      greeting: "{streak}일째. jabi.는 당신을 서두르지 않습니다.",
      ctaPrimary: "연속 학습 이어가기",
      ctaSecondary: "약점 살펴보기",
    },
    guide: {
      greeting: "길잡이가 길을 압니다. 앞으로.",
      ctaPrimary: "오늘의 과제",
      ctaSecondary: "집중할 곳 복습",
    },
  },
  zh: {
    catch: {
      greeting: "抓住 TOPIK。开始刷题。",
      ctaPrimary: "开始模考",
      ctaSecondary: "复习弱点",
    },
    mercy: {
      greeting: "第 {streak} 天。jabi. 不催你。",
      ctaPrimary: "继续打卡",
      ctaSecondary: "看看弱点",
    },
    guide: {
      greeting: "向导认得路。继续向前。",
      ctaPrimary: "今日任务",
      ctaSecondary: "重点复习",
    },
  },
};

const UI = {
  en: {
    back: "← jabi.",
    streak: "Streak",
    xp: "XP",
    level: "Level",
    srsDue: "Quests",
    srsDueToday: "Due today",
    reviewSrs: "Open quest review",
    noSrs: "No quest tags yet — clear a mock first.",
    finished: "Mock complete",
    srsReviewDone: "Quest complete",
    score: "Score",
    added: "Added to quest deck:",
    nextReview: "Next quest",
    srsExplainer: "Tags from wrong answers. Due today = today’s quest lane.",
    startSrsReview: "Start today’s quest (up to 3)",
    demoSrs: "Load demo quest tags (3)",
    homeReviewCta: "Today’s quest ({n})",
    resultReviewDue: "Start today’s quest ({n})",
    resultReviewMore: "Continue quest ({n} left)",
    next: "Next",
    finish: "See results",
    srsTitle: "Your quest tags (SRS)",
    practiceSrs: "Practice quest tags (no schedule)",
    days: "days",
    changeMode: "Change mode",
    hint: "Hint",
    submit: "Submit",
    promptTranslate: "Translate",
    promptTranslateHide: "Hide translation",
    promptTranslateMissing: "No translation for this question yet.",
    hintNeedSelect: "Pick an answer, then submit — or tap Hint.",
    hintSelectFirst: "Select a choice first.",
    learnerTitle: "Learner snapshot",
    learnerHints: "Hints used",
    learnerWrongs: "Wrong tries",
    learnerProfile: "Pattern",
    tabHome: "Home",
    tabPractice: "Practice",
    tabMe: "Me",
    todayMission: "Today’s mission",
    practiceLead: "Reading & listening practice sets. Final-style reading when ready.",
    practiceHubNote: "Hangul · Basics · TOPIK II live on the Hub learning path.",
    practiceGamesLink: "Games → Dictation",
    practiceReading: "Reading",
    practiceListening: "Listening",
    practiceListenNote: "MVP: device voice or script. Original — not official audio.",
    practiceFinal: "Final-style reading (Set 3)",
    nextMissionCta: "Next mission",
    stageClearBanner: "Stage clear! → {n} · {name}",
    xpGainLine: "+{n} XP this run · total {total}",
    xpToNext: "{remain} XP to stage {n}",
    xpMaxStage: "Max stage — keep grinding XP",
    stageChip: "S{n}",
    finalMockCta: "Open Reading Set 3",
    finalMockLocked: "Recommended near ~80% readiness. You can still open it.",
    finalMockReady: "Near the goal band — try Reading Set 3 (final-style practice).",
    listenPlay: "Play",
    listenScript: "Show script",
    coachGoalAsk: "At this pace, set an exam month as your goal?",
    coachGoalYes: "Set goal month",
    coachGoalLater: "Later",
    coachRegisterAsk: "Around the 80% band — peek at TOPIK registration when you feel ready?",
    coachRegisterYes: "View registration site",
    coachRegisterNo: "Not yet",
    proSoftCap: "Free court ends at pants (stage 2). Trial code lives in Me.",
    trialCodeLabel: "Trial / Pro code",
    trialApply: "Apply",
    trialOk: "Unlocked",
    trialBad: "Unknown code",
    resumeTitle: "Welcome back",
    resumeLead: "You left a practice in progress.",
    resumeContinue: "Continue where I left off",
    resumeHome: "Go to Home",
    startMock: "Practice",
    meTitle: "Me",
    meAnalysisTitle: "Your analysis",
    meRecNote: "Recommendation only — not a guarantee. TOPIK I is scored /200.",
    meReadyLabel: "Estimated readiness",
    meRangeLegend: "0–79 fail · 80–139 level 1 · 140–200 level 2 · app goal ~160 (80%)",
    meTrendTitle: "Error-correction trend",
    meTrendEmpty: "Take a few practice mocks to see your trend.",
    meStrengths: "Strengths",
    meWeaknesses: "Weak spots",
    meTeachHandoff: "Share AI report with a coach →",
    meCharNote: "Character stage is separate from this chart.",
    meReadyEmpty: "Not enough practice yet — estimate appears after mocks.",
    meReadyEst: "If you took the final mock now ≈ {pct}% (~{pts}/200). Goal band 80–90%.",
    meReadyConfirmed: "Last practice ≈ {pct}% (~{pts}/200).",
    meNone: "—",
    meProfileTitle: "Profile",
    meSettingsTitle: "Settings",
    meSettingsLead: "Change basics anytime. Full onboarding reset stays separate below.",
    mePartnerSettingsTitle: "Track partners",
    mePartnerSettingsLead: "Re-pick per track — XP stays.",
    mePartnerChange: "Change",
    mePartnerPickTitle: "Partner · {sector}",
    meSettingsSaved: "Settings saved",
    mePartnerSaved: "Partner updated · {sector}",
    hofTitle: "Hall of Fame",
    hofLead: "Partners you’ve grown across tracks.",
    hofEmpty: "Not started yet",
    hofMaxBadge: "MAX",
    hofXpLine: "{xp} XP",
    hofSectorHangul: "Hangul",
    hofSectorBasic: "Basics",
    hofSectorTopik1: "TOPIK I",
    hofSectorTopik2: "TOPIK II",
    redoOnboarding: "Redo onboarding",
    obBasicsEyebrow: "About you",
    obBasicsTitle: "Basic info",
    obBasicsLead: "Used to personalize learning analysis. You can change this later.",
    obNativeLang: "Native language",
    obRegion: "Where you take TOPIK",
    obPrior: "Prior Korean study",
    obAmount: "Target study amount",
    obDaily: "Daily study time",
    obNext: "Continue",
    obBack: "Back",
    obGoalEyebrow: "Goal",
    obGoalTitle: "Do you have an exam date?",
    obGoalLead: "If not, we aim to finish the course first (final mock ≥80%).",
    obGoalYes: "Yes — set a month",
    obGoalNo: "Not yet — course first",
    obGoalMonth: "Target month",
    obModeEyebrow: "Mode",
    obModeTitle: "Pick your path",
    obModeLead: "Suggested from your basics & goal — you can change anytime.",
    obModeRec: "Suggested for you: {mode}",
    obPartnerEyebrow: "Partner",
    obPartnerTitle: "Choose your jamo",
    obPartnerLead: "One partner per course. ㅈ is jabi. (guide) — not a partner.",
    missionCatch: "Start a practice mock",
    missionMercy: "Keep your streak — light review",
    missionGuide: "Today’s balanced quest",
    stageLabel: "Stage {n} · {name}",
  },
  ko: {
    back: "← jabi.",
    streak: "연속 학습",
    xp: "경험치",
    level: "등급",
    srsDue: "퀘스트",
    srsDueToday: "오늘 퀘스트",
    reviewSrs: "퀘스트 복습",
    noSrs: "아직 퀘스트 없음 — 모의고사를 먼저 클리어해 보세요.",
    finished: "모의고사 끝",
    srsReviewDone: "퀘스트 완료",
    score: "점수",
    added: "퀘스트 덱에 넣음:",
    nextReview: "다음 퀘스트",
    srsExplainer: "틀린 문항의 주제입니다. “오늘 퀘스트” = 오늘 레인에 오른 주제.",
    startSrsReview: "오늘 퀘스트 시작 (최대 3문항)",
    demoSrs: "예시 퀘스트 넣기 (3개)",
    homeReviewCta: "오늘 퀘스트 ({n})",
    resultReviewDue: "오늘 퀘스트 시작 ({n})",
    resultReviewMore: "남은 퀘스트 이어가기 ({n})",
    next: "다음",
    finish: "결과 보기",
    srsTitle: "나의 퀘스트 태그 (간격 복습)",
    practiceSrs: "퀘스트 연습 (일정 무시)",
    days: "일",
    changeMode: "학습 방식 바꾸기",
    hint: "도움말",
    submit: "제출",
    promptTranslate: "번역",
    promptTranslateHide: "번역 숨기기",
    promptTranslateMissing: "이 문항 번역이 아직 없어요.",
    hintNeedSelect: "보기를 고른 뒤 제출하세요. 도움말도 쓸 수 있어요.",
    hintSelectFirst: "먼저 보기를 선택하세요.",
    learnerTitle: "학습 파악",
    learnerHints: "도움말 횟수",
    learnerWrongs: "틀린 횟수",
    learnerProfile: "학습 경향",
    tabHome: "처음",
    tabPractice: "연습",
    tabMe: "나",
    todayMission: "오늘 할 일",
    practiceLead: "읽기·듣기 연습 세트. 준비되면 읽기 세트 3(최종 연습).",
    practiceHubNote: "한글·기초·TOPIK II는 Hub 학습 경로에서.",
    practiceGamesLink: "게임 → 받아쓰기",
    practiceReading: "읽기",
    practiceListening: "듣기",
    practiceListenNote: "미리보기: 기기 음성 또는 대본. 원작 — 공식 음원 아님.",
    practiceFinal: "최종 연습 읽기 (세트 3)",
    nextMissionCta: "다음 미션",
    stageClearBanner: "스테이지 클리어! → {n} · {name}",
    xpGainLine: "이번 +{n} XP · 합계 {total}",
    xpToNext: "다음 단계까지 {remain} XP (S{n})",
    xpMaxStage: "최고 단계 — XP는 계속 쌓입니다",
    stageChip: "S{n}",
    finalMockCta: "읽기 세트 3 열기",
    finalMockLocked: "준비도 약 80%를 권장합니다. 원하면 지금 열 수 있어요.",
    finalMockReady: "목표에 가깝습니다 — 읽기 세트 3(최종 연습)을 해 보세요.",
    listenPlay: "재생",
    listenScript: "대본 보기",
    coachGoalAsk: "이 속도라면 시험 달을 목표로 정할까요?",
    coachGoalYes: "목표 달 정하기",
    coachGoalLater: "나중에",
    coachRegisterAsk: "준비도 약 80% — 마음이 되면 TOPIK 접수를 살짝 볼까요?",
    coachRegisterYes: "접수 사이트 보기",
    coachRegisterNo: "아직은 괜찮아요",
    proSoftCap: "무료 코트는 바지(2단계)까지. 「나」에 체험 암호가 있어요.",
    trialCodeLabel: "체험 / 유료 암호",
    trialApply: "적용",
    trialOk: "잠금 풀림",
    trialBad: "알 수 없는 암호",
    resumeTitle: "다시 오셨네요",
    resumeLead: "이어서 풀던 연습이 있어요.",
    resumeContinue: "이어서 공부하기",
    resumeHome: "처음으로 가기",
    startMock: "연습",
    meTitle: "나",
    meAnalysisTitle: "학습 분석",
    meRecNote: "추천 안내입니다 · 보장 아님. TOPIK I는 200점 만점.",
    meReadyLabel: "추정 준비도",
    meRangeLegend: "0–79 불합격 · 80–139 1급 · 140–200 2급 · 목표 약 160점(80%)",
    meTrendTitle: "오답 고침 추이",
    meTrendEmpty: "연습 모의고사를 몇 번 풀면 추이가 보여요.",
    meStrengths: "강점",
    meWeaknesses: "약점",
    meTeachHandoff: "AI 학습 보고를 선생님과 공유 →",
    meCharNote: "글자 성장 단계는 이 그림과 별개입니다.",
    meReadyEmpty: "연습이 더 필요해요 — 모의고사 후 추정이 표시됩니다.",
    meReadyEst: "지금 최종 모의고사라면 대략 {pct}% (약 {pts}/200). 추천 목표 80–90%.",
    meReadyConfirmed: "최근 연습 약 {pct}% (약 {pts}/200).",
    meNone: "—",
    meProfileTitle: "내 정보",
    meSettingsTitle: "설정",
    meSettingsLead: "기본 정보는 언제든 바꿀 수 있어요. 전체 온보딩 다시하기는 아래에 따로 있어요.",
    mePartnerSettingsTitle: "트랙별 학습 짝",
    mePartnerSettingsLead: "트랙마다 다시 고르기 — XP는 유지됩니다.",
    mePartnerChange: "바꾸기",
    mePartnerPickTitle: "학습 짝 · {sector}",
    meSettingsSaved: "설정 저장됨",
    mePartnerSaved: "짝 변경됨 · {sector}",
    hofTitle: "명예의 전당",
    hofLead: "트랙마다 키운 학습 짝을 모아요.",
    hofEmpty: "아직 시작 안 함",
    hofMaxBadge: "MAX",
    hofXpLine: "{xp} XP",
    hofSectorHangul: "한글",
    hofSectorBasic: "기초",
    hofSectorTopik1: "TOPIK I",
    hofSectorTopik2: "TOPIK II",
    redoOnboarding: "첫 설정 다시",
    obBasicsEyebrow: "나에 대해",
    obBasicsTitle: "기본 정보",
    obBasicsLead: "학습 분석에 사용됩니다. 나중에 바꿀 수 있어요.",
    obNativeLang: "모국어",
    obRegion: "TOPIK 응시 지역",
    obPrior: "이전 한국어 학습",
    obAmount: "목표 학습량",
    obDaily: "하루 학습 시간",
    obNext: "다음",
    obBack: "뒤로",
    obGoalEyebrow: "목표",
    obGoalTitle: "시험 날짜가 있나요?",
    obGoalLead: "없으면 과정(최종 모의고사 ≥80%)을 먼저 목표로 합니다.",
    obGoalYes: "있어요 — 달 정하기",
    obGoalNo: "아직 — 과정 먼저",
    obGoalMonth: "목표 달",
    obModeEyebrow: "학습 방식",
    obModeTitle: "길을 고르세요",
    obModeLead: "기본 정보·목표로 추천합니다. 언제든 바꿀 수 있어요.",
    obModeRec: "추천 학습 방식: {mode}",
    obPartnerEyebrow: "학습 짝",
    obPartnerTitle: "자음 짝 고르기",
    obPartnerLead: "한 과정에 짝 하나. ㅈ는 자비(길잡이) — 선택 목록에 없음.",
    missionCatch: "연습 모의고사 시작",
    missionMercy: "연속 유지 — 가벼운 퀘스트",
    missionGuide: "오늘의 균형 퀘스트",
    stageLabel: "{n}단계 · {name}",
  },
  zh: {
    back: "← jabi.",
    streak: "连续",
    xp: "XP",
    level: "等级",
    srsDue: "任务",
    srsDueToday: "今日任务",
    reviewSrs: "打开任务复习",
    noSrs: "还没有任务标签 — 先通关一套模考。",
    finished: "模考完成",
    srsReviewDone: "任务完成",
    score: "得分",
    added: "已加入任务牌组：",
    nextReview: "下次任务",
    srsExplainer: "来自错题的标签。“今日任务”= 今天赛道上的题。",
    startSrsReview: "开始今日任务（最多 3 题）",
    demoSrs: "加载演示任务（3 个）",
    homeReviewCta: "今日任务（{n}）",
    resultReviewDue: "开始今日任务（{n}）",
    resultReviewMore: "继续任务（剩 {n}）",
    next: "下一题",
    finish: "查看结果",
    srsTitle: "你的任务标签（SRS）",
    practiceSrs: "练习任务标签（不跟日程）",
    days: "天",
    changeMode: "更换模式",
    hint: "提示",
    submit: "提交",
    promptTranslate: "翻译",
    promptTranslateHide: "收起翻译",
    promptTranslateMissing: "本题暂无翻译。",
    hintNeedSelect: "先选答案再提交 — 也可用提示。",
    hintSelectFirst: "请先选择一个选项。",
    learnerTitle: "学习画像",
    learnerHints: "提示次数",
    learnerWrongs: "错误次数",
    learnerProfile: "模式",
    tabHome: "首页",
    tabPractice: "练习",
    tabMe: "我的",
    todayMission: "今日任务",
    practiceLead: "阅读与听力练习套题。准备好后打开阅读套题 3（最终练习）。",
    practiceHubNote: "韩文·基础·TOPIK II 在 Hub 学习路径。",
    practiceGamesLink: "游戏 → 听写",
    practiceReading: "阅读",
    practiceListening: "听力",
    practiceListenNote: "MVP：设备朗读或文稿。原创 — 非官方音频。",
    practiceFinal: "最终练习阅读（套题 3）",
    nextMissionCta: "下一任务",
    stageClearBanner: "关卡通关！→ {n} · {name}",
    xpGainLine: "本局 +{n} XP · 合计 {total}",
    xpToNext: "距下一阶 {remain} XP（S{n}）",
    xpMaxStage: "已满阶 — XP 继续累积",
    stageChip: "S{n}",
    finalMockCta: "打开阅读套题 3",
    finalMockLocked: "建议准备度约 80%。也可现在打开。",
    finalMockReady: "接近目标区间 — 试试阅读套题 3（最终练习）。",
    listenPlay: "播放",
    listenScript: "显示文稿",
    coachGoalAsk: "按此节奏，要把考试月份设为目标吗？",
    coachGoalYes: "设定目标月",
    coachGoalLater: "以后",
    coachRegisterAsk: "准备度约 80% — 准备好了就先看看 TOPIK 报名入口？",
    coachRegisterYes: "查看报名网站",
    coachRegisterNo: "先不急",
    proSoftCap: "免费赛场到短裤（第 2 阶）。「我的」里有体验码。",
    trialCodeLabel: "体验 / Pro 码",
    trialApply: "应用",
    trialOk: "已解锁",
    trialBad: "无效代码",
    resumeTitle: "欢迎回来",
    resumeLead: "你有未完成的练习。",
    resumeContinue: "继续上次进度",
    resumeHome: "回到首页",
    startMock: "练习",
    meTitle: "我的",
    meAnalysisTitle: "学习分析",
    meRecNote: "仅供参考，不构成保证。TOPIK I 满分 200。",
    meReadyLabel: "估计准备度",
    meRangeLegend: "0–79 不合格 · 80–139 1级 · 140–200 2级 · 应用目标 ~160（80%）",
    meTrendTitle: "纠错趋势",
    meTrendEmpty: "多做几套练习模考后可见趋势。",
    meStrengths: "强项",
    meWeaknesses: "弱项",
    meTeachHandoff: "与教练分享 AI 学习报告 →",
    meCharNote: "角色成长与本图独立。",
    meReadyEmpty: "练习还不够 — 模考后会显示估计。",
    meReadyEst: "若现在考最终模考约 {pct}%（~{pts}/200）。建议目标 80–90%。",
    meReadyConfirmed: "最近练习约 {pct}%（~{pts}/200）。",
    meNone: "—",
    meProfileTitle: "资料",
    meSettingsTitle: "设置",
    meSettingsLead: "可随时改基本信息。完整重做引导仍在下方单独保留。",
    mePartnerSettingsTitle: "各轨道伙伴",
    mePartnerSettingsLead: "按轨道重选 — XP 保留。",
    mePartnerChange: "更换",
    mePartnerPickTitle: "伙伴 · {sector}",
    meSettingsSaved: "设置已保存",
    mePartnerSaved: "伙伴已更新 · {sector}",
    hofTitle: "名人堂",
    hofLead: "各轨道培养过的伙伴。",
    hofEmpty: "尚未开始",
    hofMaxBadge: "MAX",
    hofXpLine: "{xp} XP",
    hofSectorHangul: "韩文",
    hofSectorBasic: "基础",
    hofSectorTopik1: "TOPIK I",
    hofSectorTopik2: "TOPIK II",
    redoOnboarding: "重新引导",
    obBasicsEyebrow: "关于你",
    obBasicsTitle: "基本信息",
    obBasicsLead: "用于个性化学习分析。稍后可改。",
    obNativeLang: "母语",
    obRegion: "TOPIK 报考地区",
    obPrior: "既往韩语学习",
    obAmount: "目标学习量",
    obDaily: "每日学习时间",
    obNext: "继续",
    obBack: "返回",
    obGoalEyebrow: "目标",
    obGoalTitle: "有考试日期吗？",
    obGoalLead: "若无，先以完成课程为目标（最终模考 ≥80%）。",
    obGoalYes: "有 — 选择月份",
    obGoalNo: "还没有 — 先课程",
    obGoalMonth: "目标月份",
    obModeEyebrow: "模式",
    obModeTitle: "选择路线",
    obModeLead: "根据基本信息与目标推荐 — 随时可改。",
    obModeRec: "为你推荐：{mode}",
    obPartnerEyebrow: "伙伴",
    obPartnerTitle: "选择辅音伙伴",
    obPartnerLead: "一门课一位伙伴。ㅈ 是 jabi.（向导）— 不在可选列表。",
    missionCatch: "开始练习模考",
    missionMercy: "保持连续 — 轻松任务",
    missionGuide: "今日均衡任务",
    stageLabel: "第 {n} 阶 · {name}",
  },
};

function ui(key) {
  const lang = getLang();
  return (UI[lang] && UI[lang][key]) || UI.en[key] || key;
}

function modeString(mode, key) {
  const lang = getLang();
  const m = MODE_UI[lang]?.[mode] || MODE_UI.en[mode];
  return m?.[key] || "";
}

function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

let state = loadState();
if (!state.learner) state.learner = defaultState().learner;
if (!state.profile) state.profile = defaultProfile();
let mocks = [];
let listens = [];
let finalMock = null;
let activeQuestions = [];
let activeMockId = "";
let qi = 0;
let wrongTags = [];
let wrongCount = 0;
let srsReviewLog = [];
let selectedChoice = null;
let qHints = 0;
let qWrongs = 0;
let sessionHints = 0;
let sessionWrongTries = 0;
let runXpStart = 0;
let runStageStart = 1;
let eliminated = new Set();
let obStep = 1;
let currentTab = "home";

async function loadMocks() {
  const results = await Promise.all(
    MOCK_FILES.map((url) =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  );
  mocks = results.filter(Boolean);
  const listenResults = await Promise.all(
    LISTEN_FILES.map((url) =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  );
  listens = listenResults.filter(Boolean);
  try {
    const fr = await fetch(FINAL_MOCK_FILE);
    finalMock = fr.ok ? await fr.json() : mocks[mocks.length - 1] || null;
  } catch {
    finalMock = mocks[mocks.length - 1] || null;
  }
}

function applyUiStrings() {
  document.querySelectorAll("[data-ui]").forEach((el) => {
    const k = el.getAttribute("data-ui");
    if (k) el.textContent = ui(k);
  });
  applySelectLabels();
}

/** Onboarding <select> labels — Korean UI only uses native wording. */
function applySelectLabels() {
  const lang = getLang();
  const map = {
    en: {
      "ob-native-lang": { zh: "中文", en: "English", ko: "한국어", ja: "日本語", other: "Other" },
      "ob-region": { cn: "China (NEEA)", kr: "Korea", other: "Other / undecided" },
      "ob-prior": {
        none: "Just starting",
        lt6: "< 6 months",
        "6to24": "6 months – 2 years",
        gt24: "2+ years",
      },
      "ob-amount": { light: "Light", steady: "Steady", intense: "Intense" },
      "ob-daily": { "15": "~15 min", "30": "~30 min", "60": "~60 min", "90": "90+ min" },
    },
    ko: {
      "ob-native-lang": { zh: "중국어", en: "영어", ko: "한국어", ja: "일본어", other: "그 외" },
      "ob-region": { cn: "중국 (NEEA)", kr: "한국", other: "그 외 / 미정" },
      "ob-prior": {
        none: "이제 시작",
        lt6: "6개월 미만",
        "6to24": "6개월–2년",
        gt24: "2년 이상",
      },
      "ob-amount": { light: "가볍게", steady: "꾸준히", intense: "집중적으로" },
      "ob-daily": { "15": "약 15분", "30": "약 30분", "60": "약 60분", "90": "90분 이상" },
    },
    zh: {
      "ob-native-lang": { zh: "中文", en: "英语", ko: "韩语", ja: "日语", other: "其他" },
      "ob-region": { cn: "中国（NEEA）", kr: "韩国", other: "其他 / 未定" },
      "ob-prior": {
        none: "刚开始",
        lt6: "不到 6 个月",
        "6to24": "6 个月–2 年",
        gt24: "2 年以上",
      },
      "ob-amount": { light: "轻松", steady: "稳定", intense: "高强度" },
      "ob-daily": { "15": "约 15 分钟", "30": "约 30 分钟", "60": "约 60 分钟", "90": "90 分钟以上" },
    },
  };
  const pack = map[lang] || map.en;
  const aliases = {
    "me-set-native-lang": "ob-native-lang",
    "me-set-region": "ob-region",
    "me-set-amount": "ob-amount",
    "me-set-daily": "ob-daily",
  };
  Object.keys(pack).forEach((id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const labels = pack[id];
    [...sel.options].forEach((opt) => {
      if (labels[opt.value] != null) opt.textContent = labels[opt.value];
    });
  });
  Object.keys(aliases).forEach((meId) => {
    const sel = document.getElementById(meId);
    const labels = pack[aliases[meId]];
    if (!sel || !labels) return;
    [...sel.options].forEach((opt) => {
      if (labels[opt.value] != null) opt.textContent = labels[opt.value];
    });
  });
}

function mockTitle(m) {
  const lang = getLang();
  return (m.title && (m.title[lang] || m.title.zh || m.title.ko || m.title.en)) || m.id;
}

function renderMockList() {
  const box = document.getElementById("mock-list");
  if (!box) return;
  box.innerHTML = "";
  mocks.forEach((m, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    btn.textContent = mockTitle(m);
    btn.addEventListener("click", () => startMock(idx));
    box.appendChild(btn);
  });
}

function renderListenList() {
  const box = document.getElementById("listen-list");
  if (!box) return;
  box.innerHTML = "";
  listens.forEach((m, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    btn.textContent = mockTitle(m);
    btn.addEventListener("click", () => startListen(idx));
    box.appendChild(btn);
  });
}

function startListen(idx) {
  const m = listens[idx];
  if (!m || !m.questions || !m.questions.length) return;
  beginQuiz(m.questions, m.id);
}

function startFinalMock() {
  const m = finalMock;
  if (!m || !m.questions || !m.questions.length) {
    toast(L("Final mock not ready", "최종 모의 준비 중", "最终模考尚未就绪"));
    return;
  }
  beginQuiz(m.questions, `final:${m.id}`);
}

function registerUrl() {
  const r = state.profile.region;
  if (r === "cn") return "https://topik.neea.edu.cn/";
  return "https://www.topik.go.kr/";
}

function effectiveCharStage() {
  const raw = state.profile.charStage || 1;
  if (state.profile.proUnlock) return Math.min(6, raw);
  return Math.min(FREE_STAGE_CAP, raw);
}

function syncCharStageFromXp() {
  const xp = state.xp || 0;
  let stage = 1;
  // Modest pace: ~1 clean mock (~100 XP) → pants; not mid-quiz after 4 items.
  for (let i = STAGE_XP_FLOORS.length - 1; i >= 0; i--) {
    if (xp >= STAGE_XP_FLOORS[i]) {
      stage = i + 1;
      break;
    }
  }
  const prev = state.profile.charStage || 1;
  state.profile.charStage = stage;
  if (!state.profile.proUnlock && stage > FREE_STAGE_CAP && prev <= FREE_STAGE_CAP) {
    toast(ui("proSoftCap"));
  }
}

function xpProgressTowardNext() {
  const xp = state.xp || 0;
  let stage = 1;
  for (let i = STAGE_XP_FLOORS.length - 1; i >= 0; i--) {
    if (xp >= STAGE_XP_FLOORS[i]) {
      stage = i + 1;
      break;
    }
  }
  if (stage >= 6) {
    return { stage, pct: 100, xp, nextAt: null, remain: 0 };
  }
  const floor = STAGE_XP_FLOORS[stage - 1];
  const nextAt = STAGE_XP_FLOORS[stage];
  const span = Math.max(1, nextAt - floor);
  const pct = Math.min(100, Math.round(((xp - floor) / span) * 100));
  return { stage, pct, xp, nextAt, remain: Math.max(0, nextAt - xp) };
}

/** Learner-facing tag label: hide internal prefixes like grammar:와/과 */
const TAG_KIND_LABELS = {
  en: { grammar: "Grammar", vocab: "Vocab", reading: "Reading", listening: "Listening" },
  ko: { grammar: "문법", vocab: "어휘", reading: "읽기", listening: "듣기" },
  zh: { grammar: "语法", vocab: "词汇", reading: "阅读", listening: "听力" },
};

function formatTagLabel(tag) {
  const s = String(tag || "");
  const i = s.indexOf(":");
  if (i < 0) return s;
  const kind = s.slice(0, i);
  const name = s.slice(i + 1);
  const map = TAG_KIND_LABELS[getLang()] || TAG_KIND_LABELS.en;
  const kindLabel = map[kind] || kind;
  return `${name} · ${kindLabel}`;
}

function renderFinalMockBox() {
  const status = document.getElementById("final-mock-status");
  const btn = document.getElementById("btn-final-mock");
  const est = estimateReadiness();
  if (status) {
    status.textContent =
      est.pct != null && est.pct >= REGISTER_ASK_PCT - 5 ? ui("finalMockReady") : ui("finalMockLocked");
  }
  if (btn) btn.textContent = ui("finalMockCta");
}

function renderCoachBanners() {
  const home = document.getElementById("home-coach");
  const me = document.getElementById("me-coach");
  const est = estimateReadiness();
  const p = state.profile;

  const blocks = [];
  if (
    est.pct != null &&
    est.pct >= GOAL_SUGGEST_PCT &&
    !p.hasExamGoal &&
    !p.goalSuggestedDismissed
  ) {
    blocks.push("goal");
  }
  if (
    est.pct != null &&
    est.pct >= REGISTER_ASK_PCT &&
    (est.attemptCount || 0) >= MIN_ATTEMPTS_FOR_REGISTER &&
    !p.registerAsked
  ) {
    blocks.push("register");
  }

  function fill(el) {
    if (!el) return;
    el.innerHTML = "";
    if (!blocks.length) {
      el.classList.add("hidden");
      return;
    }
    el.classList.remove("hidden");
    if (blocks.includes("goal")) {
      const row = document.createElement("div");
      row.className = "coach-row";
      row.innerHTML = `<span>${ui("coachGoalAsk")}</span>`;
      const y = document.createElement("button");
      y.type = "button";
      y.className = "btn";
      y.textContent = ui("coachGoalYes");
      y.addEventListener("click", () => {
        p.hasExamGoal = true;
        const month = prompt(ui("obGoalMonth"), p.goalMonth || "");
        if (month) p.goalMonth = month;
        saveState(state);
        renderCoachBanners();
        renderMe();
      });
      const n = document.createElement("button");
      n.type = "button";
      n.className = "btn btn-ghost";
      n.textContent = ui("coachGoalLater");
      n.addEventListener("click", () => {
        p.goalSuggestedDismissed = true;
        saveState(state);
        renderCoachBanners();
      });
      row.appendChild(y);
      row.appendChild(n);
      el.appendChild(row);
    }
    if (blocks.includes("register")) {
      const row = document.createElement("div");
      row.className = "coach-row";
      row.innerHTML = `<span>${ui("coachRegisterAsk")}</span>`;
      const y = document.createElement("button");
      y.type = "button";
      y.className = "btn";
      y.textContent = ui("coachRegisterYes");
      y.addEventListener("click", () => {
        window.open(registerUrl(), "_blank", "noopener");
        p.registerAsked = true;
        saveState(state);
        renderCoachBanners();
      });
      const n = document.createElement("button");
      n.type = "button";
      n.className = "btn btn-ghost";
      n.textContent = ui("coachRegisterNo");
      n.addEventListener("click", () => {
        p.registerAsked = true;
        saveState(state);
        renderCoachBanners();
      });
      row.appendChild(y);
      row.appendChild(n);
      el.appendChild(row);
    }
  }
  fill(home);
  fill(me);
}

function onLangSwitch() {
  applyUiStrings();
  const visible = (id) => !document.getElementById(id)?.classList.contains("hidden");
  if (visible("resume-gate")) showResumeGate();
  else if (visible("view-quiz")) renderQuestion({
    restore: { qHints, qWrongs, eliminated: [...eliminated] },
  });
  else if (visible("view-srs")) showSrs();
  else if (visible("view-practice")) renderPractice();
  else if (visible("view-me")) renderMe();
  else if (visible("view-home")) renderHome();
  else if (visible("view-onboarding")) showObStep(obStep);
}

/* ---------- Tabs & chrome ---------- */

function setTabBarVisible(on) {
  document.getElementById("tab-bar")?.classList.toggle("hidden", !on);
}

function setActiveTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
}

function hideAllViews() {
  [
    "view-home",
    "view-practice",
    "view-me",
    "view-quiz",
    "view-result",
    "view-srs",
    "view-onboarding",
  ].forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });
}

function goTab(tab) {
  if (!state.profile.onboardingDone) {
    showOnboarding();
    return;
  }
  setActiveTab(tab);
  setTabBarVisible(true);
  if (tab === "home") renderHome();
  else if (tab === "practice") renderPractice();
  else if (tab === "me") renderMe();
}

/* ---------- Onboarding ---------- */

function recommendMode(p) {
  if (p.hasExamGoal || p.studyAmount === "intense" || p.dailyMinutes === "90") return "catch";
  if (p.priorStudy === "none" || p.studyAmount === "light" || p.dailyMinutes === "15") return "mercy";
  return "guide";
}

function showObStep(step) {
  obStep = step;
  document.querySelectorAll(".ob-step").forEach((el) => {
    el.classList.toggle("hidden", Number(el.dataset.obStep) !== step);
  });
  const prog = document.getElementById("ob-progress");
  if (prog) prog.textContent = `${step} / 4`;
  applyUiStrings();
  if (step === 3) {
    const rec = recommendMode(state.profile);
    state.profile.pendingMode = rec;
    const lead = document.getElementById("ob-mode-rec");
    if (lead) lead.textContent = interpolate(ui("obModeRec"), { mode: modeDisplayName(rec) });
    document.querySelectorAll(".mode-card").forEach((c) => {
      c.classList.toggle("recommended", c.dataset.mode === rec);
    });
  }
  if (step === 4) renderJamoGrid();
}

function showOnboarding(reset) {
  hideAllViews();
  setTabBarVisible(false);
  document.getElementById("view-onboarding")?.classList.remove("hidden");
  if (reset) {
    state.profile = { ...defaultProfile(), ...(state.profile || {}), onboardingDone: false };
    saveState(state);
  }
  showObStep(1);
}

function saveBasicsFromForm() {
  const p = state.profile;
  p.nativeLang = document.getElementById("ob-native-lang")?.value || "zh";
  p.region = document.getElementById("ob-region")?.value || "cn";
  p.priorStudy = document.getElementById("ob-prior")?.value || "none";
  p.studyAmount = document.getElementById("ob-amount")?.value || "steady";
  p.dailyMinutes = document.getElementById("ob-daily")?.value || "30";
  saveState(state);
}

/** SVG path for a partner's growth-stage art. Not every id/stage has art yet —
 * callers must handle the <img> onerror fallback to the plain glyph. */
function charArtSrc(id, stage) {
  return `./assets/chars/char-${id}-${stage}.svg`;
}

function renderJamoGrid() {
  const grid = document.getElementById("ob-jamo-grid");
  if (!grid) return;
  grid.innerHTML = "";
  PARTNER_JAMOS.forEach((j) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "jamo-card";
    btn.setAttribute("aria-label", j.glyph);
    btn.innerHTML =
      `<span class="jamo-glyph">` +
      `<img class="jamo-art" src="${charArtSrc(j.id, 1)}" alt="${j.glyph}" ` +
      `onerror="this.replaceWith(document.createTextNode('${j.glyph}'))">` +
      `</span>`;
    btn.addEventListener("click", () => finishOnboarding(j));
    grid.appendChild(btn);
  });
}

function finishOnboarding(jamo) {
  const p = state.profile;
  p.partnerId = jamo.id;
  p.partnerGlyph = jamo.glyph;
  p.charStage = 1;
  p.onboardingDone = true;
  const mode = p.pendingMode || recommendMode(p) || "guide";
  setMode(mode);
  delete p.pendingMode;
  saveState(state);
  toast(L(`Partner ${jamo.glyph}`, `학습 짝 ${jamo.glyph}`, `伙伴 ${jamo.glyph}`));
  goTab("home");
}

/* ---------- Home / Practice / Me ---------- */

function missionLabel() {
  const mode = getMode() || "guide";
  if (mode === "catch") return ui("missionCatch");
  if (mode === "mercy") return ui("missionMercy");
  return ui("missionGuide");
}

function runTodayMission() {
  const mode = getMode() || "guide";
  const due = getDueTags(state);
  if (mode === "mercy" && due.length) {
    startSrsReview();
    return;
  }
  if (mode === "guide" && due.length) {
    startSrsReview();
    return;
  }
  goTab("practice");
}

function renderHome() {
  hideAllViews();
  setTabBarVisible(true);
  setActiveTab("home");
  document.getElementById("view-home")?.classList.remove("hidden");

  const mode = getMode();
  const greetingEl = document.getElementById("home-greeting");
  if (greetingEl) {
    const raw = modeString(mode, "greeting") || modeString("guide", "greeting");
    greetingEl.textContent = interpolate(raw, { streak: state.streak });
  }

  const p = state.profile;
  const glyph = document.getElementById("partner-glyph");
  const name = document.getElementById("partner-name");
  const stageEl = document.getElementById("partner-stage");
  syncCharStageFromXp();
  const n = effectiveCharStage();
  if (glyph) {
    const fallback = p.partnerGlyph || "·";
    if (p.partnerId) {
      glyph.innerHTML =
        `<img class="partner-art" src="${charArtSrc(p.partnerId, n)}" alt="${fallback}" ` +
        `onerror="this.replaceWith(document.createTextNode('${fallback}'))">`;
    } else {
      glyph.textContent = fallback;
    }
  }
  if (name) name.textContent = p.partnerId || "—";
  if (stageEl) {
    const labels = STAGE_LABELS[getLang()] || STAGE_LABELS.en;
    stageEl.textContent = interpolate(ui("stageLabel"), { n, name: labels[n - 1] });
  }
  const stagePill = document.getElementById("partner-stage-pill");
  if (stagePill) stagePill.textContent = `STAGE ${n}`;
  renderCoachBanners();

  const prog = xpProgressTowardNext();
  const xpLabel = document.getElementById("xp-bar-label");
  const xpFill = document.getElementById("xp-bar-fill");
  const xpBar = document.getElementById("xp-bar");
  const xpHint = document.getElementById("xp-bar-hint");
  if (xpLabel) xpLabel.textContent = String(prog.xp);
  if (xpFill) xpFill.style.width = `${prog.pct}%`;
  if (xpBar) xpBar.setAttribute("aria-valuenow", String(prog.pct));
  if (xpHint) {
    xpHint.textContent =
      prog.nextAt == null
        ? ui("xpMaxStage")
        : interpolate(ui("xpToNext"), { remain: prog.remain, n: prog.stage + 1 });
  }
  const chips = document.getElementById("stage-chips");
  if (chips) {
    const labels = STAGE_LABELS[getLang()] || STAGE_LABELS.en;
    const shown = effectiveCharStage();
    chips.innerHTML = "";
    for (let i = 1; i <= 6; i++) {
      const span = document.createElement("span");
      span.className = "stage-chip";
      if (i < shown) span.classList.add("is-done");
      else if (i === shown) span.classList.add("is-current");
      else span.classList.add("is-locked");
      span.title = labels[i - 1] || "";
      span.textContent = interpolate(ui("stageChip"), { n: i });
      chips.appendChild(span);
    }
  }

  document.getElementById("stat-streak").textContent = state.streak;
  const dueN = getDueTags(state).length;
  document.getElementById("stat-srs-due").textContent = dueN;
  const banner = document.getElementById("srs-due-banner");
  const homeReview = document.getElementById("btn-home-srs-review");
  if (dueN > 0) {
    if (banner) {
      banner.textContent = L(
                  `${dueN} quest(s) due today — start below.`,
          `오늘 퀘스트 ${dueN}개 — 아래 버튼으로 시작.`,
          `今日任务 ${dueN} 个 — 点下方按钮开始。`
        );
      banner.classList.remove("hidden");
    }
    if (homeReview) {
      homeReview.textContent = interpolate(ui("homeReviewCta"), { n: dueN });
      homeReview.classList.remove("hidden");
    }
  } else {
    banner?.classList.add("hidden");
    homeReview?.classList.add("hidden");
  }

  const missionBtn = document.getElementById("btn-home-mission");
  if (missionBtn) missionBtn.textContent = missionLabel();

  applyUiStrings();
  if (missionBtn) missionBtn.textContent = missionLabel();
  if (dueN > 0 && homeReview) {
    homeReview.textContent = interpolate(ui("homeReviewCta"), { n: dueN });
  }
}

function renderPractice() {
  hideAllViews();
  setTabBarVisible(true);
  setActiveTab("practice");
  document.getElementById("view-practice")?.classList.remove("hidden");
  applyUiStrings();
  renderMockList();
  renderListenList();
  renderFinalMockBox();
}

/** Estimate readiness % (0–100) from practice — D2 C. Maps to /200 for display. */
function estimateReadiness() {
  const scored = (state.attempts || []).filter((a) => typeof a.scorePct === "number");
  if (scored.length) {
    const last = scored[scored.length - 1];
    const recent = scored.slice(-3);
    const avg = recent.reduce((s, a) => s + a.scorePct, 0) / recent.length;
    const pct = Math.round(avg * 0.65 + last.scorePct * 0.35);
    return { pct: Math.min(100, Math.max(0, pct)), source: "practice", attemptCount: scored.length };
  }
  const L = state.learner || {};
  const ok = L.totalCorrect || 0;
  const bad = L.totalWrongTries || 0;
  if (ok + bad < 3) return { pct: null, source: "none" };
  const raw = (ok / (ok + bad)) * 100;
  // Slightly discount when many hints
  const hintPen = Math.min(15, (L.totalHints || 0) * 1.5);
  return { pct: Math.round(Math.min(95, Math.max(5, raw - hintPen))), source: "learner", attemptCount: 0 };
}

function tagStrengthRows() {
  const byTag = (state.learner && state.learner.byTag) || {};
  const rows = Object.entries(byTag)
    .filter(([tag]) => !String(tag).startsWith("source:"))
    .map(([tag, m]) => {
      const corrects = m.corrects || 0;
      const wrongs = m.wrongs || 0;
      const hints = m.hints || 0;
      const total = corrects + wrongs;
      const rate = total ? corrects / total : 0;
      return { tag, corrects, wrongs, hints, total, rate };
    })
    .filter((r) => r.total > 0);
  const strengths = rows
    .filter((r) => r.corrects >= 1 && r.rate >= 0.6)
    .sort((a, b) => b.rate - a.rate || b.corrects - a.corrects)
    .slice(0, 4);
  const weaknesses = rows
    .filter((r) => r.wrongs >= 1)
    .sort((a, b) => b.wrongs - a.wrongs || a.rate - b.rate)
    .slice(0, 4);
  return { strengths, weaknesses };
}

function pushReadinessLog(pct) {
  if (pct == null) return;
  if (!Array.isArray(state.readinessLog)) state.readinessLog = [];
  state.readinessLog.push({ at: new Date().toISOString(), pct });
  if (state.readinessLog.length > 12) state.readinessLog = state.readinessLog.slice(-12);
}

function renderAnalysis() {
  applyUiStrings();
  const est = estimateReadiness();
  const pctEl = document.getElementById("me-ready-pct");
  const noteEl = document.getElementById("me-ready-note");
  const fill = document.getElementById("me-range-fill");
  const you = document.getElementById("me-range-you");

  if (est.pct == null) {
    if (pctEl) pctEl.textContent = "—";
    if (noteEl) noteEl.textContent = ui("meReadyEmpty");
    if (fill) fill.style.width = "0%";
    if (you) you.style.left = "0%";
  } else {
    const pts = Math.round((est.pct / 100) * 200);
    if (pctEl) pctEl.textContent = `${est.pct}%`;
    if (noteEl) {
      const key = est.source === "practice" ? "meReadyConfirmed" : "meReadyEst";
      noteEl.textContent = interpolate(ui(key), { pct: est.pct, pts });
    }
    // Position on 0–200 axis
    const left = Math.min(100, Math.max(0, (pts / 200) * 100));
    if (fill) fill.style.width = `${left}%`;
    if (you) you.style.left = `calc(${left}% - 7px)`;
  }

  const trend = document.getElementById("me-trend-bars");
  const trendEmpty = document.getElementById("me-trend-empty");
  const log = state.readinessLog || [];
  if (trend) {
    trend.innerHTML = "";
    if (!log.length) {
      trendEmpty?.classList.remove("hidden");
    } else {
      trendEmpty?.classList.add("hidden");
      const max = Math.max(...log.map((x) => x.pct), 1);
      log.forEach((entry) => {
        const bar = document.createElement("div");
        bar.className = "trend-bar";
        bar.style.height = `${Math.max(8, (entry.pct / max) * 56)}px`;
        bar.title = `${entry.pct}%`;
        trend.appendChild(bar);
      });
    }
  }

  const { strengths, weaknesses } = tagStrengthRows();
  const sUl = document.getElementById("me-strengths");
  const wUl = document.getElementById("me-weaknesses");
  const none = ui("meNone");
  if (sUl) {
    sUl.innerHTML = "";
    if (!strengths.length) {
      const li = document.createElement("li");
      li.textContent = none;
      sUl.appendChild(li);
    } else {
      strengths.forEach((r) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${escapeHtml(formatTagLabel(r.tag))}</strong> · ${Math.round(r.rate * 100)}%`;
        sUl.appendChild(li);
      });
    }
  }
  if (wUl) {
    wUl.innerHTML = "";
    if (!weaknesses.length) {
      const li = document.createElement("li");
      li.textContent = none;
      wUl.appendChild(li);
    } else {
      weaknesses.forEach((r) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${escapeHtml(formatTagLabel(r.tag))}</strong> · ×${r.wrongs}`;
        wUl.appendChild(li);
      });
    }
  }
}

function renderMe() {
  hideAllViews();
  setTabBarVisible(true);
  setActiveTab("me");
  document.getElementById("view-me")?.classList.remove("hidden");
  applyUiStrings();
  renderHallOfFame();
  fillSettingsForm();
  renderPartnerSettings();
  renderAnalysis();
  const p = state.profile;
  const el = document.getElementById("me-profile-summary");
  if (el) {
    const bits = L(
        `Mode ${modeDisplayName()} · Partner ${p.partnerGlyph || "—"} · Region ${p.region || "—"} · Goal ${p.hasExamGoal ? p.goalMonth || "—" : "course first"} · Char ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`,
        `학습 방식 ${modeDisplayName()} · 짝 ${p.partnerGlyph || "—"} · 지역 ${p.region || "—"} · 목표 달 ${p.hasExamGoal ? p.goalMonth || "—" : "과정 우선"} · 글자 ${effectiveCharStage()}/6${p.proUnlock ? " · 유료" : ""}`,
        `模式 ${modeDisplayName()} · 伙伴 ${p.partnerGlyph || "—"} · 地区 ${p.region || "—"} · 目标月 ${p.hasExamGoal ? p.goalMonth || "—" : "先课程"} · 角色 ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`
      );
    el.textContent = bits;
  }
  renderCoachBanners();
  ensureTrialUi();
}

function readLsJson(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function stageFromXpValue(xp) {
  let stage = 1;
  for (let i = STAGE_XP_FLOORS.length - 1; i >= 0; i--) {
    if (xp >= STAGE_XP_FLOORS[i]) {
      stage = i + 1;
      break;
    }
  }
  return stage;
}

function xpPctTowardNext(xp) {
  const stage = stageFromXpValue(xp);
  if (stage >= 6) return 100;
  const floor = STAGE_XP_FLOORS[stage - 1];
  const nextAt = STAGE_XP_FLOORS[stage];
  const span = Math.max(1, nextAt - floor);
  return Math.min(100, Math.round(((xp - floor) / span) * 100));
}

function effectiveStageForSector(rawStage, proUnlock) {
  const raw = Math.max(1, Math.min(6, rawStage || 1));
  if (proUnlock) return raw;
  return Math.min(FREE_STAGE_CAP, raw);
}

/** SpecPartner-3 — read partner snapshots from all 4 sector stores. */
function collectHofSectors() {
  const hangul = readLsJson("jabi.hangul.v1");
  const basic = readLsJson("jabi.basic.v1");
  const topik2 = readLsJson("jabi.topik2.v1");
  syncCharStageFromXp();
  const topik1Xp = state.xp || 0;
  const topik1Pro = !!state.profile.proUnlock;

  function pack(id, labelKey, href, blob, fallbackPartner) {
    const xp = typeof blob?.xp === "number" ? blob.xp : 0;
    const proUnlock = !!blob?.proUnlock;
    let partner = null;
    if (fallbackPartner?.id) {
      partner = {
        id: fallbackPartner.id,
        glyph: fallbackPartner.glyph || "",
      };
    } else if (blob?.partner?.id) {
      partner = {
        id: String(blob.partner.id),
        glyph: String(blob.partner.glyph || ""),
      };
    }
    const rawStage = partner ? stageFromXpValue(xp) : 0;
    const stage = partner ? effectiveStageForSector(rawStage, proUnlock) : 0;
    return {
      id,
      labelKey,
      href,
      partner,
      xp,
      stage,
      rawStage,
      pct: partner ? xpPctTowardNext(xp) : 0,
      isMax: !!(partner && stage >= 6),
    };
  }

  return [
    pack("hangul", "hofSectorHangul", "./hangul/", hangul),
    pack("basic", "hofSectorBasic", "./basic/", basic),
    pack(
      "topik1",
      "hofSectorTopik1",
      null,
      { xp: topik1Xp, proUnlock: topik1Pro, partner: null },
      state.profile.partnerId
        ? { id: state.profile.partnerId, glyph: state.profile.partnerGlyph || "" }
        : null
    ),
    pack("topik2", "hofSectorTopik2", "./topik2/", topik2),
  ];
}

function hofTileHtml(sector) {
  const sectorName = escapeHtml(ui(sector.labelKey));
  if (!sector.partner) {
    const inner = `
      <span class="hof-tile-sector">${sectorName}</span>
      <span class="hof-empty-label">${escapeHtml(ui("hofEmpty"))}</span>`;
    if (sector.href) {
      return `<a class="hof-tile is-empty" href="${sector.href}">${inner}</a>`;
    }
    return `<div class="hof-tile is-empty">${inner}</div>`;
  }
  const labels = STAGE_LABELS[getLang()] || STAGE_LABELS.en;
  const stageName = labels[sector.stage - 1] || "";
  const fallback = escapeHtml(sector.partner.glyph || "·");
  const partnerId = escapeHtml(sector.partner.id);
  const art = charArtSrc(sector.partner.id, sector.stage);
  const maxBadge = sector.isMax
    ? `<span class="hof-badge-max">${escapeHtml(ui("hofMaxBadge"))}</span>`
    : "";
  const stageLine = escapeHtml(
    interpolate(ui("stageLabel"), { n: sector.stage, name: stageName })
  );
  const xpLine = escapeHtml(interpolate(ui("hofXpLine"), { xp: sector.xp }));
  const cls = sector.isMax ? "hof-tile is-max" : "hof-tile";
  const body = `
    ${maxBadge}
    <div class="hof-tile-art">
      <img src="${art}" alt="${fallback}" onerror="this.replaceWith(document.createTextNode('${fallback}'))">
    </div>
    <span class="hof-tile-sector">${sectorName}</span>
    <span class="hof-tile-name">${partnerId}</span>
    <span class="hof-tile-stage">${stageLine} · ${xpLine}</span>
    <div class="hof-tile-bar" aria-hidden="true"><span style="width:${sector.pct}%"></span></div>`;
  if (sector.href) {
    return `<a class="${cls}" href="${sector.href}">${body}</a>`;
  }
  return `<div class="${cls}">${body}</div>`;
}

function renderHallOfFame() {
  const grid = document.getElementById("me-hof-grid");
  const maxRow = document.getElementById("me-hof-max");
  if (!grid) return;
  const sectors = collectHofSectors();
  const maxed = sectors.filter((s) => s.isMax);
  const rest = sectors.filter((s) => !s.isMax);
  if (maxRow) {
    if (maxed.length) {
      maxRow.hidden = false;
      maxRow.innerHTML = maxed.map(hofTileHtml).join("");
    } else {
      maxRow.hidden = true;
      maxRow.innerHTML = "";
    }
  }
  grid.innerHTML = rest.map(hofTileHtml).join("");
}

let settingsWired = false;
let partnerPickerSector = null;

function fillSettingsForm() {
  const p = state.profile || {};
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el && val != null && val !== "") el.value = String(val);
  };
  set("me-set-native-lang", p.nativeLang || "zh");
  set("me-set-region", p.region || "cn");
  set("me-set-amount", p.studyAmount || "steady");
  set("me-set-daily", p.dailyMinutes || "30");
  applySelectLabels();
}

function saveSettingsFromForm(opts) {
  const p = state.profile;
  p.nativeLang = document.getElementById("me-set-native-lang")?.value || p.nativeLang || "zh";
  p.region = document.getElementById("me-set-region")?.value || p.region || "cn";
  p.studyAmount = document.getElementById("me-set-amount")?.value || p.studyAmount || "steady";
  p.dailyMinutes = document.getElementById("me-set-daily")?.value || p.dailyMinutes || "30";
  saveState(state);
  if (opts?.toast !== false) toast(ui("meSettingsSaved"));
  const el = document.getElementById("me-profile-summary");
  if (el) {
    el.textContent = L(
      `Mode ${modeDisplayName()} · Partner ${p.partnerGlyph || "—"} · Region ${p.region || "—"} · Goal ${p.hasExamGoal ? p.goalMonth || "—" : "course first"} · Char ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`,
      `학습 방식 ${modeDisplayName()} · 짝 ${p.partnerGlyph || "—"} · 지역 ${p.region || "—"} · 목표 달 ${p.hasExamGoal ? p.goalMonth || "—" : "과정 우선"} · 글자 ${effectiveCharStage()}/6${p.proUnlock ? " · 유료" : ""}`,
      `模式 ${modeDisplayName()} · 伙伴 ${p.partnerGlyph || "—"} · 地区 ${p.region || "—"} · 目标月 ${p.hasExamGoal ? p.goalMonth || "—" : "先课程"} · 角色 ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`
    );
  }
}

function writePathPartner(lsKey, jamo) {
  let data = readLsJson(lsKey);
  if (!data || typeof data !== "object") {
    data = { xp: 0, skills: {}, partner: null, proUnlock: false };
  }
  if (!data.skills || typeof data.skills !== "object") data.skills = {};
  const xp = typeof data.xp === "number" && data.xp >= 0 ? data.xp : 0;
  data.xp = xp;
  data.partner = {
    id: jamo.id,
    glyph: jamo.glyph || "",
    stage: stageFromXpValue(xp),
  };
  try {
    localStorage.setItem(lsKey, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function writeTopik2Partner(jamo) {
  let data = readLsJson("jabi.topik2.v1");
  if (!data || typeof data !== "object") {
    data = { xp: 0, partner: null, awarded: {}, proUnlock: false };
  }
  const xp = typeof data.xp === "number" && data.xp >= 0 ? data.xp : 0;
  data.xp = xp;
  if (!data.awarded || typeof data.awarded !== "object") data.awarded = {};
  data.partner = {
    id: jamo.id,
    glyph: jamo.glyph || "",
    stage: stageFromXpValue(xp),
  };
  try {
    localStorage.setItem("jabi.topik2.v1", JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function setSectorPartner(sectorId, jamo) {
  if (!jamo?.id) return;
  if (sectorId === "topik1") {
    state.profile.partnerId = jamo.id;
    state.profile.partnerGlyph = jamo.glyph || "";
    syncCharStageFromXp();
    saveState(state);
  } else if (sectorId === "hangul") {
    writePathPartner("jabi.hangul.v1", jamo);
  } else if (sectorId === "basic") {
    writePathPartner("jabi.basic.v1", jamo);
  } else if (sectorId === "topik2") {
    writeTopik2Partner(jamo);
  }
}

function closePartnerPicker() {
  partnerPickerSector = null;
  const host = document.getElementById("me-partner-picker");
  if (host) {
    host.hidden = true;
    host.classList.add("hidden");
  }
}

function openPartnerPicker(sectorId) {
  const host = document.getElementById("me-partner-picker");
  const grid = document.getElementById("me-partner-picker-grid");
  const title = document.getElementById("me-partner-picker-title");
  if (!host || !grid) return;
  partnerPickerSector = sectorId;
  const sectorLabel = ui(
    sectorId === "hangul"
      ? "hofSectorHangul"
      : sectorId === "basic"
        ? "hofSectorBasic"
        : sectorId === "topik2"
          ? "hofSectorTopik2"
          : "hofSectorTopik1"
  );
  if (title) {
    title.textContent = interpolate(ui("mePartnerPickTitle"), { sector: sectorLabel });
  }
  grid.innerHTML = "";
  PARTNER_JAMOS.forEach((j) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "jamo-card";
    btn.setAttribute("aria-label", j.glyph);
    btn.innerHTML =
      `<span class="jamo-glyph">` +
      `<img class="jamo-art" src="${charArtSrc(j.id, 1)}" alt="${j.glyph}" ` +
      `onerror="this.replaceWith(document.createTextNode('${j.glyph}'))">` +
      `</span>`;
    btn.addEventListener("click", () => {
      setSectorPartner(sectorId, j);
      closePartnerPicker();
      toast(interpolate(ui("mePartnerSaved"), { sector: sectorLabel }));
      renderHallOfFame();
      renderPartnerSettings();
      const p = state.profile;
      const el = document.getElementById("me-profile-summary");
      if (el) {
        el.textContent = L(
          `Mode ${modeDisplayName()} · Partner ${p.partnerGlyph || "—"} · Region ${p.region || "—"} · Goal ${p.hasExamGoal ? p.goalMonth || "—" : "course first"} · Char ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`,
          `학습 방식 ${modeDisplayName()} · 짝 ${p.partnerGlyph || "—"} · 지역 ${p.region || "—"} · 목표 달 ${p.hasExamGoal ? p.goalMonth || "—" : "과정 우선"} · 글자 ${effectiveCharStage()}/6${p.proUnlock ? " · 유료" : ""}`,
          `模式 ${modeDisplayName()} · 伙伴 ${p.partnerGlyph || "—"} · 地区 ${p.region || "—"} · 目标月 ${p.hasExamGoal ? p.goalMonth || "—" : "先课程"} · 角色 ${effectiveCharStage()}/6${p.proUnlock ? " · Pro" : ""}`
        );
      }
    });
    grid.appendChild(btn);
  });
  host.hidden = false;
  host.classList.remove("hidden");
}

function renderPartnerSettings() {
  const host = document.getElementById("me-partner-settings");
  if (!host) return;
  const sectors = collectHofSectors();
  host.innerHTML = "";
  sectors.forEach((s) => {
    const row = document.createElement("div");
    row.className = "me-partner-row";
    const name = s.partner
      ? `${s.partner.glyph || ""} ${s.partner.id}`.trim()
      : ui("hofEmpty");
    row.innerHTML = `
      <div class="me-partner-row-meta">
        <span class="me-partner-row-sector">${escapeHtml(ui(s.labelKey))}</span>
        <span class="me-partner-row-name">${escapeHtml(name)}</span>
      </div>`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-ghost";
    btn.textContent = ui("mePartnerChange");
    btn.addEventListener("click", () => openPartnerPicker(s.id));
    row.appendChild(btn);
    host.appendChild(row);
  });
}

function wireSettingsOnce() {
  if (settingsWired) return;
  settingsWired = true;
  ["me-set-native-lang", "me-set-region", "me-set-amount", "me-set-daily"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", () => saveSettingsFromForm());
  });
  document.getElementById("me-partner-picker-cancel")?.addEventListener("click", closePartnerPicker);
  document.getElementById("me-partner-picker")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closePartnerPicker();
  });
}

function ensureTrialUi() {
  let wrap = document.getElementById("me-trial-wrap");
  const card = document.querySelector("#view-me .me-card:last-child");
  if (!card) return;
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "me-trial-wrap";
    wrap.className = "trial-wrap";
    wrap.innerHTML = `<label class="field"><span data-ui="trialCodeLabel"></span><input type="text" id="me-trial-code" placeholder="JABI-TRY" /></label><button type="button" class="btn btn-ghost" id="btn-trial-apply"></button>`;
    card.appendChild(wrap);
    document.getElementById("btn-trial-apply")?.addEventListener("click", () => {
      const code = (document.getElementById("me-trial-code")?.value || "").trim().toUpperCase();
      if (code === "JABI-TRY" || code === "JABI-PRO") {
        state.profile.proUnlock = true;
        saveState(state);
        toast(ui("trialOk"));
        renderMe();
      } else {
        toast(ui("trialBad"));
      }
    });
  }
  applyUiStrings();
  const applyBtn = document.getElementById("btn-trial-apply");
  if (applyBtn) applyBtn.textContent = ui("trialApply");
}

function showOnboardingModeOnly() {
  // Me → change mode: jump to step 3 with existing profile
  hideAllViews();
  setTabBarVisible(false);
  document.getElementById("view-onboarding")?.classList.remove("hidden");
  showObStep(3);
}

function renderQuestion(opts = {}) {
  const q = activeQuestions[qi];
  if (!q) return;
  const lang = getLang();
  const restore = opts.restore;
  selectedChoice = null;
  if (restore) {
    qHints = restore.qHints || 0;
    qWrongs = restore.qWrongs || 0;
    eliminated = new Set(restore.eliminated || []);
  } else {
    qHints = 0;
    qWrongs = 0;
    eliminated = new Set();
  }

  const qnumEl = document.getElementById("qnum");
  const reviewEl = document.getElementById("review-tag");
  if (activeMockId === "srs-review-v1" && q._reviewTag) {
    qnumEl.textContent =
      L(`Review ${qi + 1} / ${activeQuestions.length}`, `복습 ${qi + 1} / ${activeQuestions.length}`, `复习 ${qi + 1} / ${activeQuestions.length}`);
    if (reviewEl) {
      reviewEl.textContent = q._reviewTag;
      reviewEl.classList.remove("hidden");
    }
  } else {
    qnumEl.textContent = `${qi + 1} / ${activeQuestions.length}`;
    reviewEl?.classList.add("hidden");
  }
  setQuestionPrompt(q);
  const listenTools = document.getElementById("listen-tools");
  const scriptEl = document.getElementById("listen-script");
  if (listenTools) {
    const isListen = q.type === "listening" || !!q.script;
    listenTools.classList.toggle("hidden", !isListen);
    if (scriptEl) {
      scriptEl.textContent = "";
      scriptEl.classList.add("hidden");
    }
  }
  const hintBox = document.getElementById("hint-box");
  if (hintBox) {
    hintBox.textContent = "";
    hintBox.classList.add("hidden");
    hintBox.replaceChildren();
  }
  const box = document.getElementById("choices");
  box.innerHTML = "";
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (eliminated.has(i) ? " eliminated" : "");
    btn.dataset.index = String(i);
    btn.dataset.letter = String.fromCharCode(65 + i);
    btn.textContent = c;
    btn.addEventListener("click", () => selectChoice(i));
    box.appendChild(btn);
  });
  document.getElementById("btn-hint")?.removeAttribute("disabled");
  document.getElementById("btn-submit")?.removeAttribute("disabled");
  updateQuizMeta();
  persistSession();
}

function hasResumableSession() {
  const s = state.session;
  return !!(
    s &&
    Array.isArray(s.questions) &&
    s.questions.length &&
    typeof s.qi === "number" &&
    s.qi >= 0 &&
    s.qi < s.questions.length &&
    s.mockId
  );
}

function persistSession() {
  if (!activeMockId || !activeQuestions.length) return;
  if (qi < 0 || qi >= activeQuestions.length) {
    clearSession();
    return;
  }
  state.session = {
    mockId: activeMockId,
    qi,
    eliminated: [...eliminated],
    qHints,
    qWrongs,
    sessionHints,
    sessionWrongTries,
    wrongTags: [...wrongTags],
    wrongCount,
    questions: activeQuestions,
    savedAt: Date.now(),
  };
  saveState(state);
}

function clearSession() {
  if (state.session == null) return;
  state.session = null;
  saveState(state);
}

function resumeSession() {
  const s = state.session;
  if (!hasResumableSession()) return false;
  activeQuestions = s.questions;
  activeMockId = s.mockId;
  qi = s.qi;
  wrongTags = Array.isArray(s.wrongTags) ? [...s.wrongTags] : [];
  wrongCount = s.wrongCount || 0;
  sessionHints = s.sessionHints || 0;
  sessionWrongTries = s.sessionWrongTries || 0;
  runXpStart = state.xp || 0;
  runStageStart = state.profile.charStage || 1;
  srsReviewLog = [];
  hideAllViews();
  hideResumeGate();
  setTabBarVisible(false);
  document.getElementById("view-quiz")?.classList.remove("hidden");
  renderQuestion({
    restore: {
      qHints: s.qHints || 0,
      qWrongs: s.qWrongs || 0,
      eliminated: s.eliminated || [],
    },
  });
  return true;
}

function discardSessionAndHome() {
  clearSession();
  hideResumeGate();
  goTab("home");
}

function showResumeGate() {
  const s = state.session;
  const gate = document.getElementById("resume-gate");
  const meta = document.getElementById("resume-meta");
  if (!gate) return;
  applyUiStrings();
  if (meta && s) {
    meta.textContent = L(
      `Question ${s.qi + 1} / ${s.questions.length}`,
      `문항 ${s.qi + 1} / ${s.questions.length}`,
      `第 ${s.qi + 1} / ${s.questions.length} 题`
    );
  }
  gate.classList.remove("hidden");
  setTabBarVisible(false);
  hideAllViews();
}

function hideResumeGate() {
  document.getElementById("resume-gate")?.classList.add("hidden");
}

function selectChoice(index) {
  if (eliminated.has(index)) return;
  selectedChoice = index;
  document.querySelectorAll(".choice").forEach((b) => {
    const i = Number(b.dataset.index);
    b.classList.remove("wrong", "correct");
    b.classList.toggle("selected", i === index);
    b.classList.toggle("eliminated", eliminated.has(i));
  });
  updateQuizMeta();
}

function updateQuizMeta() {
  const el = document.getElementById("quiz-meta");
  if (!el) return;
  el.textContent = L(
    `This item · hints ${qHints} · wrongs ${qWrongs}`,
    `이 문항 · 도움말 ${qHints} · 틀림 ${qWrongs}`,
    `本题 · 提示 ${qHints} · 错误 ${qWrongs}`
  );
}

function bumpLearnerTag(tags, field, n = 1) {
  if (!state.learner.byTag) state.learner.byTag = {};
  (tags || []).forEach((tag) => {
    if (!state.learner.byTag[tag]) {
      state.learner.byTag[tag] = { hints: 0, wrongs: 0, corrects: 0 };
    }
    state.learner.byTag[tag][field] += n;
  });
}

function bumpChoiceWrong(questionId, choiceIndex) {
  if (!questionId || choiceIndex == null) return;
  if (!state.learner.choiceWrong) state.learner.choiceWrong = {};
  const row = state.learner.choiceWrong[questionId] || {};
  const key = String(choiceIndex);
  row[key] = (row[key] || 0) + 1;
  state.learner.choiceWrong[questionId] = row;
}

/**
 * Stage-3 eliminate: most confusing wrong choice.
 * Prefer local learner wrong picks when enough data; else q.distractOrder (pedagogy).
 */
function pickConfusingWrong(q, already) {
  const wrongs = [0, 1, 2, 3].filter((i) => i !== q.answer && !already.has(i));
  if (!wrongs.length) return null;

  const stats = (state.learner.choiceWrong || {})[q.id];
  const totalWrongPicks = stats
    ? wrongs.reduce((s, i) => s + (stats[String(i)] || 0), 0)
    : 0;

  if (totalWrongPicks >= 3 && stats) {
    wrongs.sort((a, b) => (stats[String(b)] || 0) - (stats[String(a)] || 0));
    return wrongs[0];
  }

  const order = Array.isArray(q.distractOrder) ? q.distractOrder : null;
  if (order) {
    for (const i of order) {
      if (wrongs.includes(i)) return i;
    }
  }
  return wrongs[0];
}

function distractWhyText(q, choiceIndex) {
  const field = q?.distractWhy && q.distractWhy[String(choiceIndex)];
  if (!field) return "";
  return learnerHintText(field, "");
}

function showEliminateExplain(q, kill) {
  const wrap = document.createElement("div");
  const step = document.createElement("p");
  step.className = "hint-step";
  step.textContent = L("Why not this?", "왜 이건 아니에요?", "为什么不是这个？");
  const ask = document.createElement("p");
  ask.className = "hint-why-ask";
  ask.textContent = L(
    `Why not “${q.choices[kill]}”?`,
    `왜 「${q.choices[kill]}」이/가 아니에요?`,
    `为什么不是「${q.choices[kill]}」？`
  );
  const body = document.createElement("p");
  body.className = "hint-l1";
  const explain = distractWhyText(q, kill);
  body.textContent =
    explain ||
    L(
      `“${q.choices[kill]}” doesn’t fit this sentence. Try another.`,
      `「${q.choices[kill]}」은/는 이 문장에 안 맞아요. 다른 걸 고르세요.`,
      `「${q.choices[kill]}」不适合这句。请另选。`
    );
  wrap.append(step, ask, body);
  renderHintBox(wrap);
}

function profileLabel(hints, wrongs, totalQ) {
  const h = hints / Math.max(totalQ, 1);
  const w = wrongs / Math.max(totalQ, 1);
  if (w >= 1.2 && h >= 0.8)
    return L("High help + retries → go slow together", "도움·다시 풀기가 많음 → 함께 천천히", "提示和重试多 → 一起慢慢来");
  if (w >= 1.2 && h < 0.5)
    return L("Many wrongs, few hints → guessing pattern", "도움말 없이 많이 틀림 → 짐작하는 경향", "少提示却常错 → 猜测倾向");
  if (w < 0.5 && h >= 1)
    return L("Hint-guided success → careful learner", "도움말로 조심스럽게 맞춤 → 안내형", "靠提示做对 → 谨慎型");
  if (w < 0.4 && h < 0.4)
    return L("Confident → ready for next level", "자신 있게 맞춤 → 다음 단계로 좋아요", "很有把握 → 可进入下一阶段");
  return L("Steady pace → review weak tags", "보통 속도 → 약점 주제 복습을 권합니다", "节奏平稳 → 建议复习弱点标签");
}

function localizedField(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  const prefer = lang || getLang();
  return field[prefer] || field.en || field.ko || field.zh || "";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Exam stem: Korean always. Translate icon beside instruction; L1 gloss under that line only (no passage repeat). */
function setQuestionPrompt(q) {
  const stem = document.getElementById("q-stem");
  if (!stem) return;
  stem.replaceChildren();
  stem._promptTr = { open: false, instr: "", ask: "", l1: "en" };

  const ko = (q.prompt && (q.prompt.ko || q.prompt.zh || q.prompt.en)) || "";
  const parts = splitKoreanStem(ko);
  const words = Array.isArray(q.underline)
    ? q.underline.filter((w) => typeof w === "string" && w)
    : [];
  const l1 = getPromptL1();
  const gloss = extractL1Gloss(promptTranslationRaw(q, l1), parts);
  const canTr = getLang() !== "ko" && !!(gloss.instr || gloss.ask);
  stem._promptTr = { open: false, ...gloss, l1 };

  const instrWrap = document.createElement("div");
  instrWrap.className = "q-instr-block";

  const instrRow = document.createElement("div");
  instrRow.className = "q-instr-row";
  const instrEl = document.createElement("p");
  instrEl.className = "q-instr";
  instrEl.lang = "ko";
  const instrText = document.createElement("span");
  setTextWithUnderline(instrText, parts.instr, words);
  instrEl.appendChild(instrText);

  if (canTr) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-tr-btn";
    btn.id = "btn-prompt-translate";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute(
      "aria-label",
      L("Show translation", "번역 보기", "显示翻译")
    );
    btn.title = L("Translate", "번역", "翻译");
    btn.textContent = promptTrBtnLabel(l1, false);
    btn.addEventListener("click", togglePromptTranslate);
    instrEl.appendChild(btn);
  }
  instrRow.appendChild(instrEl);
  instrWrap.appendChild(instrRow);

  const instrGloss = document.createElement("p");
  instrGloss.className = "q-gloss hidden";
  instrGloss.id = "q-instr-tr";
  instrGloss.setAttribute("aria-live", "polite");
  instrWrap.appendChild(instrGloss);
  stem.appendChild(instrWrap);

  if (parts.body) {
    const bodyEl = document.createElement("pre");
    bodyEl.className = "q-body";
    bodyEl.lang = "ko";
    setTextWithUnderline(bodyEl, parts.body, words);
    stem.appendChild(bodyEl);
  }

  if (parts.ask) {
    const askBlock = document.createElement("div");
    askBlock.className = "q-ask-block";
    const askRow = document.createElement("div");
    askRow.className = "q-ask-row";
    const askEl = document.createElement("p");
    askEl.className = "q-ask";
    askEl.lang = "ko";
    setTextWithUnderline(askEl, parts.ask, words);
    askRow.appendChild(askEl);
    askBlock.appendChild(askRow);
    const askGloss = document.createElement("p");
    askGloss.className = "q-gloss hidden";
    askGloss.id = "q-ask-tr";
    askBlock.appendChild(askGloss);
    stem.appendChild(askBlock);
  }
}

function promptTrBtnLabel(l1, open) {
  if (open) return "×";
  return l1 === "zh" ? "译" : "EN";
}

function setTextWithUnderline(el, text, words) {
  const list = Array.isArray(words) ? words.filter(Boolean) : [];
  if (!list.length) {
    el.textContent = text;
    return;
  }
  let html = escapeHtml(text);
  const sorted = [...list].sort((a, b) => b.length - a.length);
  for (const w of sorted) {
    const esc = escapeHtml(w);
    const re = new RegExp(esc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    html = html.replace(re, `<u class="q-underline">${esc}</u>`);
  }
  el.innerHTML = html;
}

function splitKoreanStem(ko) {
  const raw = String(ko || "").trim();
  if (!raw) return { instr: "", body: "", ask: "" };
  const blocks = raw.split(/\n\n+/);
  const instr = (blocks[0] || "").trim();
  const rest = blocks.slice(1).join("\n\n").trim();
  if (!rest) return { instr, body: "", ask: "" };
  const lines = rest.split("\n");
  const last = (lines[lines.length - 1] || "").trim();
  const looksAsk =
    lines.length > 1 &&
    (/[?？]$/.test(last) ||
      /(?:까|니까|니까\?|습니까|세요)\??$/.test(last));
  if (looksAsk) {
    return {
      instr,
      body: lines.slice(0, -1).join("\n").trim(),
      ask: last,
    };
  }
  return { instr, body: rest, ask: "" };
}

function mostlyHangul(s) {
  const chars = String(s).replace(/\s+/g, "");
  if (!chars) return false;
  let h = 0;
  for (const ch of chars) {
    if (ch >= "가" && ch <= "힣") h += 1;
  }
  return h / chars.length >= 0.35;
}

function promptTranslationRaw(q, lang) {
  if (!q?.prompt || !lang || lang === "ko") return "";
  const ko = (q.prompt.ko || "").trim();
  let t = (q.prompt[lang] || "").trim();
  // Do not fall back to a different L1 (e.g. zh when UI is en).
  if (!t || t === ko) return "";
  return t;
}

/** L1 gloss = instruction (+ optional ask). Never include Korean passage. */
function extractL1Gloss(l1Text, koParts) {
  const out = { instr: "", ask: "" };
  if (!l1Text) return out;
  const blocks = l1Text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  for (const block of blocks) {
    const arrow = block.match(/^→\s*(.+)$/s);
    if (arrow) {
      out.ask = arrow[1].trim();
      continue;
    }
    if (mostlyHangul(block)) continue;
    const firstLine = block.split("\n")[0].trim();
    if (!out.instr) out.instr = firstLine;
  }
  // Fallback: translate ask from known Korean question if → missing
  if (koParts.ask && !out.ask) {
    const map = ASK_GLOSS[getPromptL1()] || ASK_GLOSS.en;
    out.ask = map[koParts.ask] || "";
  }
  return out;
}

const ASK_GLOSS = {
  en: {
    "도서관은 언제 쉽니까?": "When is the library closed?",
    "이 버스는 어디로 갑니까?": "Where does this bus go?",
    "식당은 몇 층에 있습니까?": "Which floor is the cafeteria on?",
    "수업은 몇 시부터 시작합니까?": "What time does class start?",
  },
  zh: {
    "도서관은 언제 쉽니까?": "图书馆哪天休息？",
    "이 버스는 어디로 갑니까?": "这班车去哪里？",
    "식당은 몇 층에 있습니까?": "食堂在几楼？",
    "수업은 몇 시부터 시작합니까?": "课几点开始？",
  },
};

/**
 * Stem translation language = UI lang (EN/中文).
 * KO UI: use onboarding nativeLang when it is en/zh; otherwise hide.
 */
function getPromptL1() {
  const uiLang = getLang();
  if (uiLang === "en" || uiLang === "zh") return uiLang;
  const n = (state.profile && state.profile.nativeLang) || "";
  if (n === "en" || n === "zh") return n;
  return "en";
}

function togglePromptTranslate() {
  const stem = document.getElementById("q-stem");
  const btn = document.getElementById("btn-prompt-translate");
  const instrTr = document.getElementById("q-instr-tr");
  const askTr = document.getElementById("q-ask-tr");
  if (!stem || !btn || !stem._promptTr) return;
  const tr = stem._promptTr;
  tr.open = !tr.open;
  btn.setAttribute("aria-pressed", tr.open ? "true" : "false");
  btn.setAttribute(
    "aria-label",
    tr.open
      ? L("Hide translation", "번역 숨기기", "收起翻译")
      : L("Show translation", "번역 보기", "显示翻译")
  );
  btn.textContent = promptTrBtnLabel(tr.l1, tr.open);

  if (instrTr) {
    if (tr.open && tr.instr) {
      instrTr.textContent = tr.instr;
      instrTr.lang = tr.l1;
      instrTr.classList.remove("hidden");
    } else {
      instrTr.textContent = "";
      instrTr.classList.add("hidden");
    }
  }
  if (askTr) {
    if (tr.open && tr.ask) {
      askTr.textContent = tr.ask;
      askTr.lang = tr.l1;
      askTr.classList.remove("hidden");
    } else {
      askTr.textContent = "";
      askTr.classList.add("hidden");
    }
  }

  if (tr.open) {
    if (!state.learner.totalPromptTranslate) state.learner.totalPromptTranslate = 0;
    state.learner.totalPromptTranslate += 1;
    saveState(state);
  }
}

/**
 * Visual hints = clear nouns / clear verbs only (per-question hint.visual).
 * No meta tag fallbacks (📌 topic, 🙇 polite, etc.).
 * Later: hint.visual.img photo in the same slot.
 */
function hasPictureHint(q) {
  const v = q?.hint?.visual;
  if (!v || v.skip) return false;
  if (v.kind === "size-compare") return true;
  if (v.img) return true;
  if (Array.isArray(v.emoji) && v.emoji.length) return true;
  return false;
}

function resolveHintVisual(q) {
  if (!hasPictureHint(q)) return null;
  const v = q.hint.visual;
  return {
    kind: v.kind || (v.img ? "img" : "emoji"),
    emoji: Array.isArray(v.emoji) ? v.emoji : [],
    img: v.img || "",
    en: v.en || v.label || "",
    ko: v.ko || v.label || "",
    zh: v.zh || v.label || "",
  };
}

function visualCaptionEl(vis) {
  const cap = document.createElement("p");
  cap.className = "hint-visual-cap";
  const ko = (vis.ko || "").trim();
  const gloss =
    getLang() === "zh" ? (vis.zh || vis.en || "").trim() : (vis.en || "").trim();

  // Always show the Korean word(s) the picture stands for.
  if (ko) {
    const koEl = document.createElement("strong");
    koEl.className = "hint-visual-ko";
    koEl.textContent = ko;
    koEl.lang = "ko";
    cap.appendChild(koEl);
    if (getLang() !== "ko" && gloss && gloss !== ko) {
      const g = document.createElement("span");
      g.className = "hint-visual-gloss";
      g.textContent = ` · ${gloss}`;
      cap.appendChild(g);
    }
  } else {
    cap.textContent = L(vis.en || "idea", vis.ko || "단서", vis.zh || vis.en || "线索");
  }
  return cap;
}

function buildHintVisualEl(vis) {
  const emo = document.createElement("div");
  emo.className = "hint-visual";
  emo.setAttribute("aria-hidden", "true");
  if (vis.kind === "size-compare") {
    emo.classList.add("hint-visual-size");
    const small = document.createElement("span");
    small.className = "hint-size-box hint-size-sm";
    const mid = document.createElement("span");
    mid.className = "hint-size-lt";
    mid.textContent = "<";
    const big = document.createElement("span");
    big.className = "hint-size-box hint-size-lg";
    emo.append(small, mid, big);
  } else if (vis.kind === "img" && vis.img) {
    emo.classList.add("hint-visual-img");
    const img = document.createElement("img");
    img.src = vis.img;
    img.alt = (vis.ko || vis.en || "").trim();
    img.loading = "lazy";
    emo.appendChild(img);
  } else {
    emo.textContent = (vis.emoji || []).join(" ");
  }
  return emo;
}

function learnerHintText(field, fallback) {
  const lang = getLang();
  const t = localizedField(field, lang);
  if (t) return t;
  return fallback || "";
}

/** MCQ answer strings that must not appear in early hint stages. */
function answerSpoilers(q) {
  const out = [];
  const at = String(q?.answerText || "").trim();
  if (at) out.push(at);
  const choices = q?.choices || [];
  const ai = q?.answer;
  if (typeof ai === "number" && choices[ai] != null) {
    const c = String(choices[ai]).trim();
    if (c && !out.includes(c)) out.push(c);
  }
  return out;
}

/** True if a hint line would reveal the keyed answer (Match:/답: or long answerText). */
function isSpoilerHintLine(line, spoilers) {
  const s = String(line || "").trim();
  if (!s) return false;
  // Pair markers only — case-sensitive Match (do not strip “Listening match: …”)
  if (/^\s*(Match|답|对应|Answer)\s*[:：]/.test(s)) return true;
  if (/(?:^|[.\s])(?:Match|답|对应)\s*[:：]/.test(s)) return true;
  if (/^\s*answer\s*[:：]/i.test(s)) return true;
  for (const sp of spoilers) {
    if (!sp) continue;
    // Short particles (와, 명, 때…): only spoiler if line is an explicit “pick this” reveal
    if (sp.length <= 2) {
      if (s.includes(sp) && /(?:답|Match|对应|→\s*use|골라|정답)/.test(s)) return true;
      continue;
    }
    if (s.includes(sp)) return true;
  }
  return false;
}

function hintStepList(q) {
  const steps = q?.hint?.steps;
  if (!steps) return [];
  const lang = getLang();
  const list = steps[lang] || steps.en || steps.ko;
  return Array.isArray(list) ? list : [];
}

/**
 * Early scaffold lines only: Meaning + Look (steps[0], steps[1]).
 * Never include Pair/Match (usually steps[2]) — that belongs in bottom-out `why`.
 */
function earlyScaffoldLines(q) {
  const spoilers = answerSpoilers(q);
  const list = hintStepList(q);
  const clean = [];
  for (let i = 0; i < Math.min(2, list.length); i++) {
    if (!isSpoilerHintLine(list[i], spoilers)) clean.push(list[i]);
  }
  if (clean.length) return clean;
  const fallback = learnerHintText(q.hint, "");
  if (fallback && !isSpoilerHintLine(fallback, spoilers)) {
    // Prefer first sentence only to avoid dumping a full Meaning→Look→Pair blob
    const first = fallback.split(/(?<=[.。！？!?])\s+/)[0] || fallback;
    if (!isSpoilerHintLine(first, spoilers)) return [first];
  }
  return [
    L(
      "Think about what the sentence is asking — don’t guess from one word alone.",
      "문장이 무엇을 묻는지 먼저 생각해 보세요. 단어 하나만 보고 짐작하지 마세요.",
      "先想句子在问什么 — 不要只靠一个词猜。"
    ),
  ];
}

/** Visual caption must not equal the MCQ answer (e.g. 공항 on a “where does it go?” item). */
function safeVisualForHint(q) {
  const vis = resolveHintVisual(q);
  if (!vis) return null;
  const spoilers = answerSpoilers(q);
  const ko = (vis.ko || "").trim();
  const en = (vis.en || "").trim();
  const zh = (vis.zh || "").trim();
  const leaks = spoilers.some(
    (sp) => sp.length > 2 && (ko.includes(sp) || en.includes(sp) || zh.includes(sp))
  );
  if (!leaks) return vis;
  return {
    ...vis,
    en: L("clue picture", "단서 그림", "线索图"),
    ko: "단서",
    zh: "线索",
  };
}

function renderHintBox(nodes, { clear = false } = {}) {
  const hintBox = document.getElementById("hint-box");
  if (!hintBox) return;
  hintBox.classList.remove("hidden", "hint-bilingual");
  hintBox.classList.add("hint-stage");
  if (clear) hintBox.replaceChildren();

  const layer = document.createElement("div");
  layer.className = "hint-layer";
  if (typeof nodes === "string") {
    layer.textContent = nodes;
  } else if (Array.isArray(nodes)) {
    nodes.forEach((n) => layer.appendChild(n));
  } else if (nodes) {
    layer.appendChild(nodes);
  }
  hintBox.appendChild(layer);
  try {
    layer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch {
    /* ignore */
  }
}

function showHint() {
  const q = activeQuestions[qi];
  if (!q) return;
  const pictured = hasPictureHint(q);
  // Tiered scaffold: strategy → look → eliminate → bottom-out why
  // Never dump Pair/Match (full answer) on the first L1 tap.
  const maxHints = pictured ? 4 : 3;
  if (qHints >= maxHints) {
    toast(
      L(
        "All hints are above — scroll up to review",
        "도움말은 위에 쌓여 있어요 — 위로 다시 보세요",
        "提示都在上面 — 可向上回顾"
      )
    );
    return;
  }
  qHints += 1;
  sessionHints += 1;
  state.learner.totalHints += 1;
  bumpLearnerTag(q.tags || (q._reviewTag ? [q._reviewTag] : []), "hints");

  // With picture: 1 visual → 2 scaffold (no answer) → 3 eliminate → 4 why
  // Without: 1 scaffold → 2 eliminate → 3 why
  const stage = pictured ? qHints : qHints + 1;

  if (pictured && stage === 1) {
    const vis = safeVisualForHint(q);
    const wrap = document.createElement("div");
    wrap.className = "hint-visual-wrap";
    const emo = buildHintVisualEl(vis);
    const cap = visualCaptionEl(vis);
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = L("Hint 1 · picture", "도움말 1 · 그림", "提示 1 · 图");
    wrap.append(step, emo, cap);
    renderHintBox(wrap);
  } else if (stage === 2) {
    const wrap = document.createElement("div");
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = pictured
      ? L("Hint 2 · strategy", "도움말 2 · 전략", "提示 2 · 策略")
      : L("Hint 1 · strategy", "도움말 1 · 전략", "提示 1 · 策略");
    wrap.appendChild(step);
    const lines = earlyScaffoldLines(q);
    if (lines.length > 1) {
      const ol = document.createElement("ol");
      ol.className = "hint-skill-steps";
      lines.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        ol.appendChild(li);
      });
      wrap.appendChild(ol);
    } else {
      const body = document.createElement("p");
      body.className = "hint-l1";
      body.textContent = lines[0] || "";
      wrap.appendChild(body);
    }
    renderHintBox(wrap);
  } else if (stage === 3) {
    const kill = pickConfusingWrong(q, eliminated);
    if (kill != null) {
      eliminated.add(kill);
      document.querySelectorAll(".choice").forEach((b) => {
        if (Number(b.dataset.index) === kill) b.classList.add("eliminated");
      });
      if (selectedChoice === kill) selectedChoice = null;
      showEliminateExplain(q, kill);
    } else {
      renderHintBox(
        L(
          "Choose among the remaining options.",
          "남은 보기 중에서 고르세요.",
          "从剩下的选项中选择。"
        )
      );
    }
  } else {
    // Bottom-out: full why (may name the answer). Last resort only.
    const line = learnerHintText(
      q.why,
      L("Re-read the whole sentence for meaning.", "문장 전체 뜻을 다시 읽어 보세요.", "再读整句，抓住意思。")
    );
    const wrap = document.createElement("div");
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = pictured
      ? L("Hint 4 · why (answer)", "도움말 4 · 왜 (정답 설명)", "提示 4 · 为什么（含答案）")
      : L("Hint 3 · why (answer)", "도움말 3 · 왜 (정답 설명)", "提示 3 · 为什么（含答案）");
    const body = document.createElement("p");
    body.className = "hint-l1";
    body.textContent = line;
    wrap.append(step, body);
    renderHintBox(wrap);
  }

  updateQuizMeta();
  saveState(state);
  persistSession();
}

function submitAnswer() {
  if (selectedChoice === null) {
    toast(ui("hintSelectFirst"));
    return;
  }
  if (eliminated.has(selectedChoice)) {
    selectedChoice = null;
    toast(L("That option is out — pick another", "그 보기는 제외됐어요 — 다른 걸 고르세요", "该选项已排除 — 请另选"));
    return;
  }
  const q = activeQuestions[qi];
  const correct = selectedChoice === q.answer;
  const buttons = document.querySelectorAll(".choice");

  if (!correct) {
    const wrongPick = selectedChoice;
    qWrongs += 1;
    sessionWrongTries += 1;
    state.learner.totalWrongTries += 1;
    bumpLearnerTag(q.tags || (q._reviewTag ? [q._reviewTag] : []), "wrongs");
    bumpChoiceWrong(q.id, wrongPick);
    eliminated.add(wrongPick);
    selectedChoice = null;
    buttons.forEach((b) => {
      const i = Number(b.dataset.index);
      b.classList.remove("selected", "wrong", "correct");
      if (i === wrongPick) b.classList.add("eliminated");
      b.classList.toggle("eliminated", eliminated.has(i));
    });
    showEliminateExplain(q, wrongPick);
    updateQuizMeta();
    saveState(state);
    persistSession();
    return;
  }

  // correct
  buttons.forEach((b) => {
    b.disabled = true;
    const i = Number(b.dataset.index);
    if (i === q.answer) b.classList.add("correct");
  });
  document.getElementById("btn-hint")?.setAttribute("disabled", "true");
  document.getElementById("btn-submit")?.setAttribute("disabled", "true");

  const firstTryClean = qWrongs === 0 && qHints === 0;
  addXp(state, firstTryClean ? 10 : qWrongs === 0 ? 7 : 4);
  state.learner.totalCorrect += 1;
  bumpLearnerTag(q.tags || (q._reviewTag ? [q._reviewTag] : []), "corrects");

  if (qWrongs > 0 || qHints >= 3) {
    if (activeMockId !== "srs-review-v1") wrongTags.push(...(q.tags || []));
    if (qWrongs > 0) wrongCount += 1;
  }

  if (activeMockId === "srs-review-v1" && q._reviewTag) {
    const ok = qWrongs === 0;
    scheduleSrs(state, q._reviewTag, ok);
    srsReviewLog.push({
      tag: q._reviewTag,
      correct: ok,
      hints: qHints,
      wrongs: qWrongs,
      nextReview: state.srs[q._reviewTag].nextReview,
    });
  }

  saveState(state);
  setTimeout(() => {
    qi += 1;
    if (qi >= activeQuestions.length) {
      if (activeMockId === "srs-review-v1") finishSrsReview();
      else finishMock();
    } else renderQuestion();
  }, 650);
}

function renderLearnerSnapshot(el, hints, wrongs, totalQ) {
  if (!el) return;
  const label = profileLabel(hints, wrongs, totalQ);
  el.innerHTML = `<strong>${ui("learnerTitle")}</strong><br>${ui("learnerHints")}: ${hints} · ${ui("learnerWrongs")}: ${wrongs}<br>${ui("learnerProfile")}: ${label}`;
}

function finishMock() {
  const total = activeQuestions.length;
  const uniqueWrong = [...new Set(wrongTags)];
  const right = total - wrongCount;
  const scorePct = total ? Math.round((right / total) * 100) : 0;
  addSrsTags(state, uniqueWrong);
  bumpStreak(state);
  addXp(state, 20);
  state.attempts.push({
    mockId: activeMockId,
    at: new Date().toISOString(),
    wrong: uniqueWrong,
    hints: sessionHints,
    wrongTries: sessionWrongTries,
    right,
    total,
    scorePct,
    profile: profileLabel(sessionHints, sessionWrongTries, total),
  });
  pushReadinessLog(estimateReadiness().pct ?? scorePct);
  syncCharStageFromXp();
  clearSession();
  saveState(state);

  document.getElementById("view-quiz").classList.add("hidden");
  setTabBarVisible(false);
  document.getElementById("view-result").classList.remove("hidden");
  document.getElementById("result-score").textContent = `${right} / ${total} (${ui("added")} ${uniqueWrong.length}${L(" tags", "개 주제", " 个标签")})`;
  document.getElementById("result-tags").textContent =
    uniqueWrong.map(formatTagLabel).join(", ") || "—";
  document.getElementById("result-srs-schedule")?.classList.add("hidden");
  renderLearnerSnapshot(document.getElementById("result-learner"), sessionHints, sessionWrongTries, total);
  document.querySelector("#view-result h2")?.setAttribute("data-ui", "finished");
  applyUiStrings();
  renderResultGrowth({
    xpBefore: runXpStart,
    stageBefore: runStageStart,
    xpGained: Math.max(0, (state.xp || 0) - runXpStart),
  });
  updateResultActions(uniqueWrong.length > 0 ? "mock-with-due" : "mock");
}

function renderResultGrowth({ xpBefore, stageBefore, xpGained }) {
  const clearEl = document.getElementById("result-clear");
  const clearText = document.getElementById("result-clear-text");
  const clearArt = document.getElementById("result-clear-art");
  const xpLine = document.getElementById("result-xp-line");
  syncCharStageFromXp();
  const stageNow = effectiveCharStage();
  const labels = STAGE_LABELS[getLang()] || STAGE_LABELS.en;
  const cleared = (state.profile.charStage || 1) > stageBefore;
  if (clearEl) {
    if (cleared) {
      const banner = interpolate(ui("stageClearBanner"), {
        n: stageNow,
        name: labels[stageNow - 1] || "",
      });
      if (clearText) clearText.textContent = banner;
      else clearEl.textContent = banner;
      const partnerId = state.profile.partnerId;
      if (clearArt && partnerId) {
        clearArt.src = charArtSrc(partnerId, stageNow);
        clearArt.alt = state.profile.partnerGlyph || "";
      } else if (clearArt) {
        clearArt.removeAttribute("src");
        clearArt.alt = "";
      }
      clearEl.classList.add("hidden");
      // reflow so clear-banner-in can replay
      void clearEl.offsetWidth;
      clearEl.classList.remove("hidden");
    } else {
      if (clearText) clearText.textContent = "";
      clearEl.classList.add("hidden");
    }
  }
  if (xpLine) {
    const gained = typeof xpGained === "number" ? xpGained : Math.max(0, (state.xp || 0) - (xpBefore || 0));
    xpLine.textContent = interpolate(ui("xpGainLine"), { n: gained, total: state.xp || 0 });
  }
}

function updateResultActions(kind) {
  const dueN = getDueTags(state).length;
  const reviewBtn = document.getElementById("btn-result-review");
  const srsBtn = document.getElementById("btn-result-srs");
  applyUiStrings();
  if (reviewBtn) {
    if (dueN > 0) {
      const key = kind === "srs" ? "resultReviewMore" : "resultReviewDue";
      reviewBtn.textContent = interpolate(ui(key), { n: Math.min(dueN, 3) });
      reviewBtn.classList.remove("hidden");
    } else {
      reviewBtn.classList.add("hidden");
    }
  }
  if (srsBtn) srsBtn.classList.toggle("hidden", Object.keys(state.srs).length === 0);
}

function finishSrsReview() {
  const total = activeQuestions.length;
  bumpStreak(state);
  addXp(state, 15);
  state.attempts.push({
    mockId: activeMockId,
    at: new Date().toISOString(),
    hints: sessionHints,
    wrongTries: sessionWrongTries,
    profile: profileLabel(sessionHints, sessionWrongTries, total),
  });
  syncCharStageFromXp();
  clearSession();
  saveState(state);

  document.getElementById("view-quiz").classList.add("hidden");
  setTabBarVisible(false);
  document.getElementById("view-result").classList.remove("hidden");
  const right = total - wrongCount;
  const h2 = document.querySelector("#view-result h2");
  if (h2) {
    h2.textContent = ui("srsReviewDone");
    h2.removeAttribute("data-ui");
  }
  document.getElementById("result-score").textContent = `${right} / ${total} · ${ui("nextReview")}:`;
  document.getElementById("result-tags").textContent = "";
  renderLearnerSnapshot(document.getElementById("result-learner"), sessionHints, sessionWrongTries, total);
  const ul = document.getElementById("result-srs-schedule");
  if (ul) {
    ul.innerHTML = "";
    ul.classList.remove("hidden");
    srsReviewLog.forEach(({ tag, correct, nextReview, hints, wrongs }) => {
      const li = document.createElement("li");
      const mark = correct ? "✓" : "·";
      const extra = L(
        ` (hints ${hints ?? 0}, wrongs ${wrongs ?? 0})`,
        ` (도움말 ${hints ?? 0}, 틀림 ${wrongs ?? 0})`,
        ` (提示 ${hints ?? 0}，错误 ${wrongs ?? 0})`
      );
      li.innerHTML = `<strong>${escapeHtml(formatTagLabel(tag))}</strong> ${mark} → ${nextReview}${extra}`;
      ul.appendChild(li);
    });
  }
  srsReviewLog = [];
  renderResultGrowth({
    xpBefore: runXpStart,
    stageBefore: runStageStart,
    xpGained: Math.max(0, (state.xp || 0) - runXpStart),
  });
  updateResultActions("srs");
}

function beginQuiz(questions, mockId) {
  activeQuestions = questions;
  activeMockId = mockId;
  qi = 0;
  wrongTags = [];
  wrongCount = 0;
  srsReviewLog = [];
  sessionHints = 0;
  sessionWrongTries = 0;
  runXpStart = state.xp || 0;
  runStageStart = state.profile.charStage || 1;
  hideAllViews();
  setTabBarVisible(false);
  document.getElementById("view-quiz")?.classList.remove("hidden");
  renderQuestion();
}

function startMock(idx) {
  const m = mocks[idx];
  if (!m || !m.questions || !m.questions.length) return;
  beginQuiz(m.questions, m.id);
}

function weakTagQuestions() {
  const weak = new Set(Object.keys(state.srs));
  if (!weak.size) return [];
  const all = mocks.flatMap((m) => m.questions || []);
  return all.filter((q) => (q.tags || []).some((t) => weak.has(t)));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function findQuestionForTag(tag) {
  const all = mocks.flatMap((m) => m.questions || []);
  return all.find((q) => (q.tags || []).includes(tag)) || null;
}

function seedDemoSrs() {
  const tags = ["grammar:와/과", "vocab:형용사", "grammar:존댓말"];
  tags.forEach((tag) => {
    state.srs[tag] = { count: 1, nextReview: todayKey(), ease: 2.5, intervalDays: 1 };
  });
  saveState(state);
  showSrs();
  toast(L("Demo: 3 tags due today", "예시 약점 3개 (오늘 복습)", "演示弱点 3 个（今日复习）"));
}

function startSrsReview() {
  const due = getDueTags(state).slice(0, 3);
  if (!due.length) {
    toast(L("Nothing due today", "오늘 복습할 주제 없음", "今日没有待复习标签"));
    return;
  }
  const questions = [];
  due.forEach((tag) => {
    const q = findQuestionForTag(tag);
    if (q) questions.push({ ...q, _reviewTag: tag });
  });
  if (!questions.length) {
    toast(L("No questions for due tags", "문항을 찾지 못했습니다", "找不到对应题目"));
    return;
  }
  beginQuiz(questions, "srs-review-v1");
}

function startSrsPractice() {
  const pool = shuffle(weakTagQuestions()).slice(0, SRS_PRACTICE_SIZE);
  if (!pool.length) return;
  beginQuiz(pool, "srs-practice");
}

function showSrs() {
  hideAllViews();
  setTabBarVisible(true);
  setActiveTab("practice");
  document.getElementById("view-srs")?.classList.remove("hidden");
  applyUiStrings();
  const ul = document.getElementById("srs-items");
  ul.innerHTML = "";
  const today = todayKey();
  const dueSet = new Set(getDueTags(state));
  const summary = document.getElementById("srs-due-summary");
  if (summary) {
    summary.textContent =
      dueSet.size > 0
        ? L(
            `Due today: ${dueSet.size} tag(s)`,
            `오늘 복습 대상: ${dueSet.size}개`,
            `今日待复习：${dueSet.size} 个`
          )
        : L(
            "Nothing due today (take a mock or load demo)",
            "오늘 복습 대상 없음 (모의고사 또는 예시로 추가)",
            "今日无待复习（请先模考或加载演示）"
          );
  }
  const entries = Object.entries(state.srs);
  if (!entries.length) {
    const li = document.createElement("li");
    li.textContent = ui("noSrs");
    ul.appendChild(li);
  } else {
    entries.forEach(([tag, meta]) => {
      normalizeSrsMeta(meta);
      const li = document.createElement("li");
      if (dueSet.has(tag)) li.classList.add("due-today");
      const dueLabel = meta.nextReview <= today ? (L("· due", "· 오늘", "· 今日")) : "";
      const missLabel = L(
        `misses ${meta.count}`,
        `틀림 ${meta.count}`,
        `错 ${meta.count}`
      );
      li.innerHTML = `<strong>${escapeHtml(formatTagLabel(tag))}</strong> · ${missLabel} · ${meta.nextReview} ${dueLabel}`;
      ul.appendChild(li);
    });
  }
  const reviewBtn = document.getElementById("btn-start-srs-review");
  if (reviewBtn) reviewBtn.classList.toggle("hidden", dueSet.size === 0);
  const practiceBtn = document.getElementById("btn-practice-srs");
  if (practiceBtn) practiceBtn.classList.toggle("hidden", weakTagQuestions().length === 0);
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2000);
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", async () => {
  await loadMocks();

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => goTab(btn.dataset.tab));
  });

  document.getElementById("ob-next-1")?.addEventListener("click", () => {
    saveBasicsFromForm();
    showObStep(2);
  });
  document.getElementById("ob-goal-yes")?.addEventListener("click", () => {
    state.profile.hasExamGoal = true;
    document.getElementById("ob-month-wrap")?.classList.remove("hidden");
    document.getElementById("ob-next-2")?.classList.remove("hidden");
    saveState(state);
  });
  document.getElementById("ob-goal-no")?.addEventListener("click", () => {
    state.profile.hasExamGoal = false;
    state.profile.goalMonth = "";
    document.getElementById("ob-month-wrap")?.classList.add("hidden");
    document.getElementById("ob-next-2")?.classList.add("hidden");
    saveState(state);
    showObStep(3);
  });
  document.getElementById("ob-next-2")?.addEventListener("click", () => {
    const month = document.getElementById("ob-goal-month")?.value || "";
    state.profile.goalMonth = month;
    saveState(state);
    showObStep(3);
  });
  document.getElementById("ob-back-2")?.addEventListener("click", () => showObStep(1));
  document.getElementById("ob-back-3")?.addEventListener("click", () => showObStep(2));
  document.getElementById("ob-back-4")?.addEventListener("click", () => showObStep(3));

  document.querySelectorAll(".mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.dataset.mode;
      if (!state.profile.onboardingDone || obStep === 3) {
        state.profile.pendingMode = mode;
        setMode(mode);
        saveState(state);
        if (!state.profile.onboardingDone) {
          showObStep(4);
        } else {
          toast(L(`Mode: ${mode}`, `학습 방식: ${modeDisplayName(mode)}`, `模式：${modeDisplayName(mode)}`));
          goTab("home");
        }
      }
    });
  });

  document.getElementById("btn-srs")?.addEventListener("click", showSrs);
  document.getElementById("btn-home")?.addEventListener("click", () => goTab("home"));
  document.getElementById("btn-quiz-exit")?.addEventListener("click", () => {
    persistSession();
    goTab("home");
  });
  document.getElementById("btn-home2")?.addEventListener("click", () => goTab("practice"));
  document.getElementById("btn-mode")?.addEventListener("click", showOnboardingModeOnly);
  document.getElementById("btn-redo-onboarding")?.addEventListener("click", () => showOnboarding(true));
  wireSettingsOnce();
  document.getElementById("btn-home-mission")?.addEventListener("click", runTodayMission);
  document.getElementById("btn-home-srs-review")?.addEventListener("click", startSrsReview);
  document.getElementById("btn-result-mission")?.addEventListener("click", runTodayMission);
  document.getElementById("btn-result-review")?.addEventListener("click", startSrsReview);
  document.getElementById("btn-result-srs")?.addEventListener("click", showSrs);
  document.getElementById("btn-practice-srs")?.addEventListener("click", startSrsPractice);
  document.getElementById("btn-start-srs-review")?.addEventListener("click", startSrsReview);
  document.getElementById("btn-demo-srs")?.addEventListener("click", seedDemoSrs);
  document.getElementById("btn-hint")?.addEventListener("click", showHint);
  document.getElementById("btn-submit")?.addEventListener("click", submitAnswer);
  document.getElementById("btn-final-mock")?.addEventListener("click", startFinalMock);
  document.getElementById("btn-listen-play")?.addEventListener("click", () => {
    const q = activeQuestions[qi];
    const script = q?.script?.ko || q?.script?.en || "";
    if (!script) return;
    try {
      const u = new SpeechSynthesisUtterance(script);
      u.lang = "ko-KR";
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {
      toast(L("Voice not available — use Show script", "음성 불가 — 대본 보기 사용", "无法朗读 — 请显示文稿"));
    }
  });
  document.getElementById("btn-listen-script")?.addEventListener("click", () => {
    const q = activeQuestions[qi];
    const el = document.getElementById("listen-script");
    if (!el || !q) return;
    el.textContent = q.script?.ko || q.script?.en || "—";
    el.classList.remove("hidden");
  });

  if (!state.profile.onboardingDone) {
    showOnboarding();
  } else if (hasResumableSession()) {
    showResumeGate();
  } else {
    goTab("home");
  }

  document.getElementById("btn-resume-continue")?.addEventListener("click", () => {
    if (!resumeSession()) goTab("home");
  });
  document.getElementById("btn-resume-home")?.addEventListener("click", discardSessionAndHome);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  const hash = location.hash;
  if (hash.startsWith("#deck=")) toast(`Deck hook: ${hash.slice(7)} (content coming soon)`);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("lang-btn")) {
    setTimeout(onLangSwitch, 0);
  }
});

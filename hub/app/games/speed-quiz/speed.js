/**
 * Speed Quiz — soft-timer MCQ · tap choice · never punished by empty pace bar.
 * Original beginner–elementary bank only.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Speed Quiz",
      title: "Tap fast",
      lead: "Short MCQ round — soft pace bar, never punished by time. Kahoot-style, jabi bank.",
      backGames: "← Games",
      backHub: "Hub",
      note: "Pace bar is feel only — empty bar does not fail the question.",
      pickPrompt: "Choose one",
      pace: "Pace",
      skip: "Skip",
      reveal: "Give up",
      autoNext: "Auto-advance on correct",
      youPicked: "You picked",
      correctIs: "Correct",
      next: "Next →",
      retry: "Try again",
      great: "Nice!",
      greatFast: "Quick!",
      almost: "Not quite",
      revealed: "Answer shown",
      skipped: "Skipped",
      calm: "Take your time",
      racing: "Go!",
      doneTitle: "Round complete",
      score: "{ok} correct · {fast} quick · {skip} skipped · {miss} missed",
      restart: "Play again",
      loadFail: "Could not load quiz bank.",
      dash: "—",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "No items in this theme.",
      theme_shopping: "Shopping",
      theme_snack: "Snack",
      theme_transit: "Transit",
      theme_housing: "Housing",
      theme_banking: "Banking",
      theme_workplace: "Workplace",
      theme_clinic: "Clinic",
      theme_school: "School",
      theme_travel: "Travel",
      theme_weather: "Weather",
      theme_digital: "Digital",
      theme_family: "Family",
      theme_hobby: "Hobby",
      theme_emotion: "Emotion",
      theme_sports: "Sports",
      theme_nature: "Nature",
      theme_restaurant: "Restaurant",
      theme_clothes: "Clothes",
      theme_music: "Music",
      theme_media: "Media",
      theme_celebration: "Celebration",
      theme_time: "Time",
      theme_chores: "Chores",
      theme_body: "Body",
      theme_direction: "Direction",
      theme_furniture: "Furniture",
      theme_fruit: "Fruit",
      theme_kitchen: "Kitchen",
      theme_stationery: "Stationery",
      theme_mail: "Mail",
      theme_pets: "Pets",
      theme_driving: "Driving",
      theme_places: "Places",
      theme_pantry: "Pantry",
      theme_bathroom: "Bathroom",
      theme_jobs: "Jobs",
      theme_country: "Country",
      theme_routine: "Routine",
      theme_size: "Size",
      theme_senses: "Senses",
      theme_color: "Color",
      theme_accessories: "Accessories",
      theme_electric: "Electricity",
      theme_building: "Building",
      theme_motion: "Motion",
      theme_favor: "Favor",
      theme_think: "Think",
      theme_speech: "Speech",
      theme_change: "Change",
      theme_compare: "Compare",
      theme_reason: "Reason",
      theme_problem: "Problem",
      theme_opinion: "Opinion",
      theme_habit: "Habit",
      theme_rules: "Rules",
      theme_friends: "Friends",
      theme_personality: "Personality",
      theme_apology: "Apology",
      theme_success: "Success",
      theme_advice: "Advice",
      theme_encourage: "Encourage",
      theme_promise: "Promise",
      theme_refuse: "Refuse",
      theme_complain: "Complain",
      theme_intermediate: "Mid",
    },
    ko: {
      eyebrow: "스피드 퀴즈",
      title: "빠르게 고르기",
      lead: "짧은 MCQ 한 판 — 페이스 바는 가볍게, 시간 처벌 없음. Kahoot식 · jabi 뱅크.",
      backGames: "← 게임",
      backHub: "허브",
      note: "페이스 바는 분위기용입니다 — 비어도 오답 처리하지 않습니다.",
      pickPrompt: "하나를 고르세요",
      pace: "페이스",
      skip: "스킵",
      reveal: "포기",
      autoNext: "정답이면 자동으로 다음",
      youPicked: "나의 선택",
      correctIs: "정답",
      next: "다음 →",
      retry: "다시 시도",
      great: "잘했어요!",
      greatFast: "빠름!",
      almost: "아쉬워요",
      revealed: "정답 공개",
      skipped: "스킵함",
      calm: "천천히 해도 돼요",
      racing: "출발!",
      doneTitle: "한 판 끝",
      score: "정답 {ok} · 빠름 {fast} · 스킵 {skip} · 오답 {miss}",
      restart: "다시 하기",
      loadFail: "퀴즈 뱅크를 불러오지 못했습니다.",
      dash: "—",
      themeFilter: "테마",
      themeAll: "전체",
      themeEmpty: "이 테마 문항이 없습니다.",
      theme_shopping: "쇼핑",
      theme_snack: "간식",
      theme_transit: "교통",
      theme_housing: "주거",
      theme_banking: "은행",
      theme_workplace: "직장",
      theme_clinic: "병원",
      theme_school: "학교",
      theme_travel: "여행",
      theme_weather: "날씨",
      theme_digital: "디지털",
      theme_family: "가족",
      theme_hobby: "취미",
      theme_emotion: "감정",
      theme_sports: "스포츠",
      theme_nature: "자연",
      theme_restaurant: "식당",
      theme_clothes: "옷",
      theme_music: "음악",
      theme_media: "미디어",
      theme_celebration: "축하",
      theme_time: "시간",
      theme_chores: "집안일",
      theme_body: "신체",
      theme_direction: "방향",
      theme_furniture: "가구",
      theme_fruit: "과일",
      theme_kitchen: "주방",
      theme_stationery: "문구",
      theme_mail: "우편",
      theme_pets: "동물",
      theme_driving: "운전",
      theme_places: "장소",
      theme_pantry: "재료",
      theme_bathroom: "욕실",
      theme_jobs: "직업",
      theme_country: "국가",
      theme_routine: "일상",
      theme_size: "크기",
      theme_senses: "감각",
      theme_color: "색깔",
      theme_accessories: "소지품",
      theme_electric: "전기",
      theme_building: "건물",
      theme_motion: "동작",
      theme_favor: "부탁",
      theme_think: "생각",
      theme_speech: "대화",
      theme_change: "변화",
      theme_compare: "비교",
      theme_reason: "이유",
      theme_problem: "문제",
      theme_opinion: "의견",
      theme_habit: "습관",
      theme_rules: "규칙",
      theme_friends: "친구",
      theme_personality: "성격",
      theme_apology: "미안",
      theme_success: "성공",
      theme_advice: "조언",
      theme_encourage: "격려",
      theme_promise: "약속",
      theme_refuse: "거절",
      theme_complain: "불만",
      theme_intermediate: "중급",
    },
    zh: {
      eyebrow: "速度测验",
      title: "快速点选",
      lead: "短时选择题 — 进度条只是气氛，超时不判错。Kahoot 式 · jabi 题库。",
      backGames: "← 游戏",
      backHub: "中心",
      note: "进度条仅作节奏感 — 空了也不会判错。",
      pickPrompt: "选一个",
      pace: "节奏",
      skip: "跳过",
      reveal: "放弃",
      autoNext: "答对自动下一题",
      youPicked: "你的选择",
      correctIs: "正确答案",
      next: "下一题 →",
      retry: "再试",
      great: "很好!",
      greatFast: "很快!",
      almost: "再试试",
      revealed: "已显示答案",
      skipped: "已跳过",
      calm: "慢慢来也行",
      racing: "开始!",
      doneTitle: "本轮完成",
      score: "正确 {ok} · 快速 {fast} · 跳过 {skip} · 错误 {miss}",
      restart: "再玩一次",
      loadFail: "无法加载测验题库。",
      dash: "—",
      themeFilter: "主题",
      themeAll: "全部",
      themeEmpty: "该主题暂无题目。",
      theme_shopping: "购物",
      theme_snack: "零食",
      theme_transit: "交通",
      theme_housing: "居住",
      theme_banking: "银行",
      theme_workplace: "职场",
      theme_clinic: "医院",
      theme_school: "学校",
      theme_travel: "旅游",
      theme_weather: "天气",
      theme_digital: "数码",
      theme_family: "家人",
      theme_hobby: "爱好",
      theme_emotion: "情绪",
      theme_sports: "体育",
      theme_nature: "自然",
      theme_restaurant: "餐饮",
      theme_clothes: "服装",
      theme_music: "音乐",
      theme_media: "媒体",
      theme_celebration: "庆祝",
      theme_time: "时间",
      theme_chores: "家务",
      theme_body: "身体",
      theme_direction: "方向",
      theme_furniture: "家具",
      theme_fruit: "水果",
      theme_kitchen: "厨房",
      theme_stationery: "文具",
      theme_mail: "邮寄",
      theme_pets: "动物",
      theme_driving: "驾驶",
      theme_places: "场所",
      theme_pantry: "食材",
      theme_bathroom: "浴室",
      theme_jobs: "职业",
      theme_country: "国家",
      theme_routine: "日常",
      theme_size: "大小",
      theme_senses: "感觉",
      theme_color: "颜色",
      theme_accessories: "随身",
      theme_electric: "电器",
      theme_building: "建筑",
      theme_motion: "动作",
      theme_favor: "拜托",
      theme_think: "想法",
      theme_speech: "对话",
      theme_change: "变化",
      theme_compare: "比较",
      theme_reason: "原因",
      theme_problem: "问题",
      theme_opinion: "意见",
      theme_habit: "习惯",
      theme_rules: "规则",
      theme_friends: "朋友",
      theme_personality: "性格",
      theme_apology: "抱歉",
      theme_success: "成功",
      theme_advice: "建议",
      theme_encourage: "鼓励",
      theme_promise: "约定",
      theme_refuse: "拒绝",
      theme_complain: "不满",
      theme_intermediate: "中级",
    },
  };

  const BANK_URL = "../../data/games/speed-quiz-beginner.json";
  const AUTO_KEY = "jabi.games.speedQuiz.autoNext";
  const THEME_KEY = "jabi.games.speedQuiz.theme";
  const DEFAULT_SECONDS = 18;
  const LETTERS = ["A", "B", "C", "D"];
  const THEME_ORDER = ["shopping", "snack", "transit", "housing", "banking", "workplace", "clinic", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "senses", "color", "accessories", "electric", "building", "motion", "favor", "think", "speech", "change", "compare", "reason", "problem", "opinion", "habit", "rules", "friends", "personality", "apology", "success", "advice", "encourage", "promise", "refuse", "complain", "intermediate"];

  let bankItems = [];
  let themeList = [];
  let activeTheme = "all";
  let items = [];
  let timerSeconds = DEFAULT_SECONDS;
  let idx = 0;
  let stats = { ok: 0, miss: 0, skip: 0, fast: 0 };
  let checked = false;
  let itemResult = null;
  let wasFast = false;
  let selectedIdx = null;
  let choiceOrder = [];
  let raceTimer = null;
  let raceStart = 0;
  let raceLeft = 1;

  const $ = (id) => document.getElementById(id);

  function lang() {
    return window.HubI18n?.getLang?.() || "en";
  }

  function s(key) {
    const L = lang();
    return (STR[L] && STR[L][key]) || STR.en[key] || key;
  }

  function pickI18n(obj) {
    if (!obj || typeof obj !== "object") return String(obj || "");
    const L = lang();
    return obj[L] || obj.en || obj.ko || "";
  }

  function applyDic() {
    document.querySelectorAll("[data-sq]").forEach((el) => {
      const key = el.getAttribute("data-sq");
      if (key) el.textContent = s(key);
    });
    renderThemeChips();
    renderItemTags(current());
  }

  function themeLabel(id) {
    if (id === "all") return s("themeAll");
    const key = "theme_" + id;
    const L = lang();
    return (STR[L] && STR[L][key]) || STR.en[key] || id;
  }

  function collectThemes(data) {
    const fromMeta = Array.isArray(data.themes) ? data.themes.slice() : [];
    const seen = new Set();
    const out = [];
    THEME_ORDER.forEach((t) => {
      if (fromMeta.includes(t) || bankItems.some((it) => (it.tags || []).includes(t))) {
        if (!seen.has(t)) {
          seen.add(t);
          out.push(t);
        }
      }
    });
    fromMeta.forEach((t) => {
      if (!seen.has(t) && bankItems.some((it) => (it.tags || []).includes(t))) {
        seen.add(t);
        out.push(t);
      }
    });
    return out;
  }

  function filterByTheme(theme) {
    if (!theme || theme === "all") return bankItems.slice();
    return bankItems.filter((it) => (it.tags || []).includes(theme));
  }

  function renderThemeChips() {
    const box = $("sq-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sq-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function renderItemTags(item) {
    const el = $("sq-item-tags");
    if (!el) return;
    el.innerHTML = "";
    if (!item || !Array.isArray(item.tags) || !item.tags.length) return;
    const known = themeList.length ? themeList : THEME_ORDER;
    item.tags
      .filter((tag) => known.includes(tag))
      .forEach((tag) => {
        const span = document.createElement("span");
        span.className = "sq-tag";
        span.textContent = themeLabel(tag);
        el.appendChild(span);
      });
  }

  function setTheme(theme) {
    const next = theme || "all";
    if (next !== "all" && !themeList.includes(next)) return;
    const filtered = filterByTheme(next);
    if (!filtered.length) {
      toast(s("themeEmpty"));
      return;
    }
    activeTheme = next;
    try {
      localStorage.setItem(THEME_KEY, activeTheme);
    } catch {
      /* ignore */
    }
    stopRace();
    stats = { ok: 0, miss: 0, skip: 0, fast: 0 };
    itemResult = null;
    wasFast = false;
    idx = 0;
    items = shuffleInPlace(filtered.slice());
    renderThemeChips();
    const done = $("sq-done");
    if (done) done.classList.add("hidden");
    showItem();
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function toast(msg) {
    const el = $("sq-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function current() {
    return items[idx] || null;
  }

  function stopRace() {
    if (raceTimer) {
      clearInterval(raceTimer);
      raceTimer = null;
    }
  }

  function startRace() {
    stopRace();
    raceStart = Date.now();
    raceLeft = 1;
    const fill = $("sq-race-fill");
    const label = $("sq-race-label");
    if (fill) {
      fill.classList.remove("is-draining");
      fill.style.width = "100%";
      void fill.offsetWidth;
      fill.classList.add("is-draining");
      fill.style.transitionDuration = `${timerSeconds}s`;
      fill.style.width = "0%";
    }
    if (label) {
      label.textContent = s("racing");
      label.classList.remove("is-calm");
    }
    raceTimer = setInterval(() => {
      const elapsed = (Date.now() - raceStart) / 1000;
      raceLeft = Math.max(0, 1 - elapsed / timerSeconds);
      if (raceLeft <= 0) {
        stopRace();
        if (label && !checked) {
          label.textContent = s("calm");
          label.classList.add("is-calm");
        }
      }
    }, 200);
  }

  function updateProgress() {
    const total = items.length || 1;
    const text = $("sq-progress-text");
    const fill = $("sq-progress-fill");
    if (text) text.textContent = `${Math.min(idx + 1, total)} / ${total}`;
    if (fill) fill.style.width = `${Math.round((idx / total) * 100)}%`;
  }

  function renderChoices(item, mark) {
    const box = $("sq-choices");
    if (!box || !item) return;
    box.innerHTML = "";
    const choices = item.choices || [];
    choiceOrder.forEach((origIdx, displayIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sq-choice";
      if (selectedIdx === origIdx) btn.classList.add("is-selected");
      if (mark && origIdx === item.answer) btn.classList.add("is-ok");
      if (mark && selectedIdx === origIdx && origIdx !== item.answer) btn.classList.add("is-bad");
      btn.disabled = checked;
      btn.innerHTML =
        `<span class="sq-choice-letter">${LETTERS[displayIdx] || "?"}</span>` +
        `<span>${escapeHtml(choices[origIdx] ?? "")}</span>`;
      btn.addEventListener("click", () => pick(origIdx));
      box.appendChild(btn);
    });
  }

  function escapeHtml(ch) {
    return String(ch)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pick(origIdx) {
    if (checked) return;
    selectedIdx = origIdx;
    const item = current();
    if (!item) return;
    wasFast = raceLeft > 0.08;
    const ok = origIdx === item.answer;
    itemResult = ok ? "ok" : "miss";
    showFeedback(ok ? "ok" : "miss");
    if (ok) {
      const auto = $("sq-auto-next");
      if (auto?.checked) setTimeout(() => goNext(), 700);
    }
  }

  function showFeedback(kind) {
    const item = current();
    if (!item) return;
    checked = true;
    stopRace();
    const fb = $("sq-feedback");
    const status = $("sq-feedback-status");
    const yours = $("sq-yours");
    const correct = $("sq-correct");
    const explain = $("sq-explain");
    if (!fb) return;
    fb.classList.remove("hidden", "is-ok", "is-bad");
    if (kind === "ok") {
      fb.classList.add("is-ok");
      if (status) status.textContent = wasFast ? s("greatFast") : s("great");
    } else if (kind === "reveal") {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("revealed");
    } else if (kind === "skip") {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("skipped");
    } else {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("almost");
    }
    const choices = item.choices || [];
    if (yours) {
      yours.textContent =
        selectedIdx == null ? s("dash") : String(choices[selectedIdx] ?? s("dash"));
    }
    if (correct) correct.textContent = String(choices[item.answer] ?? "");
    if (explain) explain.textContent = pickI18n(item.explain);
    renderChoices(item, true);
  }

  function commitResult() {
    if (!itemResult) return;
    if (itemResult === "ok") {
      stats.ok += 1;
      if (wasFast) stats.fast += 1;
    } else if (itemResult === "skip") stats.skip += 1;
    else stats.miss += 1;
    itemResult = null;
  }

  function showItem() {
    checked = false;
    itemResult = null;
    wasFast = false;
    selectedIdx = null;
    const item = current();
    const stage = document.querySelector(".sq-stage");
    const fb = $("sq-feedback");
    const done = $("sq-done");
    if (!item) {
      stopRace();
      renderItemTags(null);
      if (stage) stage.classList.add("hidden");
      if (fb) fb.classList.add("hidden");
      if (done) {
        done.classList.remove("hidden");
        const score = $("sq-score");
        if (score) {
          score.textContent = s("score")
            .replace("{ok}", String(stats.ok))
            .replace("{fast}", String(stats.fast))
            .replace("{skip}", String(stats.skip))
            .replace("{miss}", String(stats.miss));
        }
      }
      updateProgress();
      const fill = $("sq-progress-fill");
      if (fill) fill.style.width = "100%";
      return;
    }
    if (stage) stage.classList.remove("hidden");
    if (done) done.classList.add("hidden");
    if (fb) fb.classList.add("hidden");
    const prompt = $("sq-prompt");
    if (prompt) prompt.textContent = pickI18n(item.prompt);
    renderItemTags(item);
    choiceOrder = shuffleInPlace(
      (item.choices || []).map((_, i) => i)
    );
    renderChoices(item, false);
    updateProgress();
    startRace();
  }

  function goNext() {
    commitResult();
    idx += 1;
    showItem();
  }

  function reveal() {
    if (!current() || checked) return;
    itemResult = "miss";
    showFeedback("reveal");
  }

  function skip() {
    if (!current() || checked) return;
    itemResult = "skip";
    showFeedback("skip");
    setTimeout(() => goNext(), 450);
  }

  function retry() {
    checked = false;
    itemResult = null;
    wasFast = false;
    selectedIdx = null;
    const fb = $("sq-feedback");
    if (fb) fb.classList.add("hidden");
    const item = current();
    if (item) {
      choiceOrder = shuffleInPlace((item.choices || []).map((_, i) => i));
      renderChoices(item, false);
      startRace();
    }
  }

  function restart() {
    stopRace();
    stats = { ok: 0, miss: 0, skip: 0, fast: 0 };
    itemResult = null;
    wasFast = false;
    idx = 0;
    items = shuffleInPlace(filterByTheme(activeTheme));
    const done = $("sq-done");
    if (done) done.classList.add("hidden");
    showItem();
  }

  function bind() {
    $("sq-skip")?.addEventListener("click", skip);
    $("sq-reveal")?.addEventListener("click", reveal);
    $("sq-next")?.addEventListener("click", goNext);
    $("sq-retry")?.addEventListener("click", retry);
    $("sq-restart")?.addEventListener("click", restart);

    const auto = $("sq-auto-next");
    if (auto) {
      const saved = localStorage.getItem(AUTO_KEY);
      if (saved === "0") auto.checked = false;
      auto.addEventListener("change", () => {
        localStorage.setItem(AUTO_KEY, auto.checked ? "1" : "0");
      });
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        const item = current();
        const prompt = $("sq-prompt");
        if (prompt && item) prompt.textContent = pickI18n(item.prompt);
        const explain = $("sq-explain");
        if (explain && item && checked) explain.textContent = pickI18n(item.explain);
        const label = $("sq-race-label");
        if (label && !checked) {
          if (raceLeft <= 0) {
            label.textContent = s("calm");
            label.classList.add("is-calm");
          } else {
            label.textContent = s("racing");
            label.classList.remove("is-calm");
          }
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (checked && e.key === "Enter") {
        e.preventDefault();
        goNext();
        return;
      }
      if (checked) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4 && choiceOrder[n - 1] != null) {
        e.preventDefault();
        pick(choiceOrder[n - 1]);
      }
    });
  }

  async function boot() {
    applyDic();
    bind();
    try {
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      timerSeconds = Number(data.timer?.seconds) || DEFAULT_SECONDS;
      bankItems = (data.items || []).filter((it) => it.id && Array.isArray(it.choices));
      if (!bankItems.length) throw new Error("empty");
      themeList = collectThemes(data);
      let saved = "all";
      try {
        saved = localStorage.getItem(THEME_KEY) || "all";
      } catch {
        saved = "all";
      }
      if (saved !== "all" && !themeList.includes(saved)) saved = "all";
      activeTheme = saved;
      const filtered = filterByTheme(activeTheme);
      if (!filtered.length) {
        activeTheme = "all";
        items = shuffleInPlace(bankItems.slice());
      } else {
        items = shuffleInPlace(filtered.slice());
      }
      renderThemeChips();
      showItem();
    } catch {
      const err = $("sq-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

/**
 * Particle Snap � ?/? � ?/? � ?/? quick tap � soft snap bar (no punish).
 * Original beginner bank only. Tap chip = instant check.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Particle Snap",
      title: "Pick the particle",
      lead: "은/는 · 이/가 · 을/를 — tap the right one fast. Soft snap bar, never punished by time.",
      backGames: "← Games",
      backHub: "Hub",
      note: "Tap a big chip to answer. Empty bar does not fail the question.",
      pickPrompt: "Which particle?",
      pace: "Snap",
      skip: "Skip",
      reveal: "Give up",
      autoNext: "Auto-advance on correct",
      youPicked: "You picked",
      correctIs: "Full sentence",
      next: "Next →",
      retry: "Try again",
      great: "Snap!",
      greatFast: "Lightning!",
      almost: "Not quite",
      revealed: "Answer shown",
      skipped: "Skipped",
      calm: "Take your time",
      racing: "Go!",
      doneTitle: "Round complete",
      score: "{ok} correct · {fast} quick · {skip} skipped · {miss} missed",
      restart: "Play again",
      loadFail: "Could not load particle bank.",
      pairTopic: "Topic · 은/는",
      pairSubject: "Subject · 이/가",
      pairObject: "Object · 을/를",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "No items in this theme.",
      theme_shopping: "Shopping",
      theme_snack: "Snack",
      theme_transit: "Transit",
      theme_cosmetics: "Cosmetics",
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
      eyebrow: "조사 스냅",
      title: "조사 고르기",
      lead: "은/는 · 이/가 · 을/를 — 빠르게 맞는 조사를 탭하세요. 페이스 바는 가볍게, 시간 처벌 없음.",
      backGames: "← 게임",
      backHub: "허브",
      note: "큰 칩을 탭해 답하세요. 바가 비어도 오답 처리하지 않습니다.",
      pickPrompt: "어느 조사일까요?",
      pace: "스냅",
      skip: "스킵",
      reveal: "포기",
      autoNext: "정답이면 자동으로 다음",
      youPicked: "나의 선택",
      correctIs: "완성 문장",
      next: "다음 →",
      retry: "다시 시도",
      great: "스냅!",
      greatFast: "번개!",
      almost: "아쉬워요",
      revealed: "정답 공개",
      skipped: "스킵함",
      calm: "천천히 해도 돼요",
      racing: "출발!",
      doneTitle: "한 판 끝",
      score: "정답 {ok} · 빠름 {fast} · 스킵 {skip} · 오답 {miss}",
      restart: "다시 하기",
      loadFail: "조사 뱅크를 불러오지 못했습니다.",
      pairTopic: "주제 · 은/는",
      pairSubject: "주어 · 이/가",
      pairObject: "목적어 · 을/를",
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
      eyebrow: "助词快选",
      title: "选助词",
      lead: "은/는 · 이/가 · 을/를 — 快速点选正确助词。进度条只是气氛，超时不判错。",
      backGames: "← 游戏",
      backHub: "中心",
      note: "点大按钮作答。进度条空了也不会判错。",
      pickPrompt: "哪个助词？",
      pace: "快选",
      skip: "跳过",
      reveal: "放弃",
      autoNext: "答对自动下一题",
      youPicked: "你的选择",
      correctIs: "完整句子",
      next: "下一题 →",
      retry: "再试",
      great: "咔!",
      greatFast: "闪电!",
      almost: "再试试",
      revealed: "已显示答案",
      skipped: "已跳过",
      calm: "慢慢来也行",
      racing: "开始!",
      doneTitle: "本轮完成",
      score: "正确 {ok} · 快速 {fast} · 跳过 {skip} · 错误 {miss}",
      restart: "再玩一次",
      loadFail: "无法加载助词题库。",
      pairTopic: "主题 · 은/는",
      pairSubject: "主语 · 이/가",
      pairObject: "宾语 · 을/를",
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

  const BANK_URL = "../../data/games/particle-beginner.json";
  const AUTO_KEY = "jabi.games.particle.autoNext";
  const THEME_KEY = "jabi.games.particle.theme";
  const DEFAULT_SECONDS = 8;
  const THEME_ORDER = [
    "shopping",
    "snack",
    "transit",
    "cosmetics",
    "housing",
    "banking",
    "workplace",
    "clinic",
    "school",
    "travel",
    "weather",
    "digital",
    "family",
    "hobby",
    "emotion",
    "sports",
    "nature",
    "restaurant",
    "clothes",
    "music",
    "media",
    "celebration",
    "time",
    "chores",
    "body",
    "direction",
    "furniture",
    "fruit",
    "kitchen",
    "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "senses", "color", "accessories", "electric", "building", "motion", "favor", "think", "speech", "change", "compare", "reason", "problem", "opinion", "habit", "rules", "friends", "personality", "apology", "success", "advice", "encourage", "promise", "refuse", "complain", "intermediate",
  ];
  const PAIR_DEFAULTS = {
    topic: ["?", "?"],
    subject: ["?", "?"],
    object: ["?", "?"],
  };

  let bankItems = [];
  let themeList = [];
  let activeTheme = "all";
  let items = [];
  let pairsMap = PAIR_DEFAULTS;
  let timerSeconds = DEFAULT_SECONDS;
  let idx = 0;
  let stats = { ok: 0, miss: 0, skip: 0, fast: 0 };
  let checked = false;
  let itemResult = null;
  let wasFast = false;
  let selected = "";
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

  function applyDic() {
    document.querySelectorAll("[data-ps]").forEach((el) => {
      const key = el.getAttribute("data-ps");
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
    const box = $("snap-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "snap-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function renderItemTags(item) {
    const el = $("snap-item-tags");
    if (!el) return;
    el.innerHTML = "";
    if (!item || !Array.isArray(item.tags) || !item.tags.length) return;
    const known = themeList.length ? themeList : THEME_ORDER;
    item.tags
      .filter((tag) => known.includes(tag))
      .forEach((tag) => {
        const span = document.createElement("span");
        span.className = "snap-tag";
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
    const done = $("snap-done");
    if (done) done.classList.add("hidden");
    showItem();
  }

  function toast(msg) {
    const el = $("snap-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function pickGloss(item) {
    if (!item?.gloss) return "";
    const L = lang();
    return item.gloss[L] || item.gloss.en || item.gloss.ko || "";
  }

  function pairLabel(pair) {
    if (pair === "topic") return s("pairTopic");
    if (pair === "subject") return s("pairSubject");
    if (pair === "object") return s("pairObject");
    return pair || "";
  }

  function choicesFor(item) {
    const fromMap = pairsMap[item.pair];
    if (Array.isArray(fromMap) && fromMap.length >= 2) return fromMap.slice(0, 2);
    if (Array.isArray(item.choices) && item.choices.length >= 2) return item.choices.slice(0, 2);
    return (PAIR_DEFAULTS[item.pair] || ["?", "?"]).slice();
  }

  function escapeHtml(ch) {
    return String(ch)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
    const fill = $("snap-race-fill");
    const label = $("snap-race-label");
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

  function renderSentence(item, fillText, stateClass) {
    const el = $("snap-sentence");
    if (!el || !item) return;
    const parts = String(item.template || "").split(/\{(\d+)\}/g);
    let html = "";
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        html += escapeHtml(parts[i]);
      } else {
        const shown = fillText != null ? fillText : selected || "���";
        const cls = ["snap-blank"];
        if (fillText != null || selected) cls.push("is-filled");
        if (stateClass) cls.push(stateClass);
        if (fillText != null && stateClass === "is-ok") cls.push("is-pop");
        html += `<span class="${cls.join(" ")}">${escapeHtml(shown)}</span>`;
      }
    }
    el.innerHTML = html;
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderChips(item, markCorrect) {
    const box = $("snap-chips");
    if (!box) return;
    box.innerHTML = "";
    const choices = shuffleInPlace(choicesFor(item).slice());
    choices.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "snap-chip";
      if (selected === c) btn.classList.add("is-selected");
      if (markCorrect) {
        if (c === item.answer) btn.classList.add("is-correct");
        else if (selected === c) btn.classList.add("is-wrong");
      }
      btn.textContent = c;
      btn.disabled = checked;
      btn.addEventListener("click", () => {
        if (checked) return;
        snapPick(c);
      });
      box.appendChild(btn);
    });
  }

  function updateProgress() {
    const total = items.length || 1;
    const text = $("snap-progress-text");
    const fill = $("snap-progress-fill");
    if (text) text.textContent = `${Math.min(idx + 1, total)} / ${total}`;
    if (fill) fill.style.width = `${Math.round((idx / total) * 100)}%`;
  }

  function showItem() {
    checked = false;
    itemResult = null;
    wasFast = false;
    selected = "";
    const item = current();
    const stage = document.querySelector(".snap-stage");
    const fb = $("snap-feedback");
    const done = $("snap-done");
    if (!item) {
      stopRace();
      if (stage) stage.classList.add("hidden");
      if (fb) fb.classList.add("hidden");
      if (done) {
        done.classList.remove("hidden");
        const score = $("snap-score");
        if (score) {
          score.textContent = s("score")
            .replace("{ok}", String(stats.ok))
            .replace("{fast}", String(stats.fast))
            .replace("{skip}", String(stats.skip))
            .replace("{miss}", String(stats.miss));
        }
      }
      updateProgress();
      const fill = $("snap-progress-fill");
      if (fill) fill.style.width = "100%";
      return;
    }
    if (stage) stage.classList.remove("hidden");
    if (done) done.classList.add("hidden");
    if (fb) fb.classList.add("hidden");
    const badge = $("snap-pair-badge");
    if (badge) badge.textContent = pairLabel(item.pair);
    const gloss = $("snap-gloss");
    if (gloss) gloss.textContent = pickGloss(item);
    renderItemTags(item);
    renderSentence(item);
    renderChips(item, false);
    updateProgress();
    startRace();
  }

  function showFeedback(kind, userRaw) {
    const item = current();
    if (!item) return;
    checked = true;
    stopRace();
    const fb = $("snap-feedback");
    const status = $("snap-feedback-status");
    const yours = $("snap-yours");
    const correct = $("snap-correct");
    if (!fb) return;
    fb.classList.remove("hidden", "is-ok", "is-bad");
    if (kind === "ok") {
      fb.classList.add("is-ok");
      if (status) status.textContent = wasFast ? s("greatFast") : s("great");
      renderSentence(item, userRaw || item.answer, "is-ok");
    } else if (kind === "reveal") {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("revealed");
      renderSentence(item, item.answer, "is-ok");
    } else if (kind === "skip") {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("skipped");
      renderSentence(item, item.answer, "is-ok");
    } else {
      fb.classList.add("is-bad");
      if (status) status.textContent = s("almost");
      renderSentence(item, userRaw || "���", "is-bad");
    }
    if (yours) yours.textContent = userRaw || "�";
    if (correct) correct.textContent = item.full || "";
    renderChips(item, true);
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

  function snapPick(choice) {
    const item = current();
    if (!item || checked) return;
    selected = choice;
    const ok = choice === item.answer;
    if (ok) {
      wasFast = raceLeft > 0.08;
      itemResult = "ok";
      showFeedback("ok", choice);
      const auto = $("snap-auto-next");
      if (auto?.checked) {
        setTimeout(() => goNext(), 650);
      }
    } else {
      itemResult = "miss";
      showFeedback("miss", choice);
    }
  }

  function goNext() {
    commitResult();
    idx += 1;
    showItem();
  }

  function reveal() {
    if (!current() || checked) return;
    itemResult = "miss";
    showFeedback("reveal", selected || "");
  }

  function skip() {
    if (!current() || checked) return;
    itemResult = "skip";
    showFeedback("skip", "");
    setTimeout(() => goNext(), 450);
  }

  function retry() {
    checked = false;
    itemResult = null;
    wasFast = false;
    selected = "";
    const fb = $("snap-feedback");
    if (fb) fb.classList.add("hidden");
    const item = current();
    if (item) {
      renderSentence(item);
      renderChips(item, false);
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
    const done = $("snap-done");
    if (done) done.classList.add("hidden");
    showItem();
  }

  function bind() {
    $("snap-skip")?.addEventListener("click", skip);
    $("snap-reveal")?.addEventListener("click", reveal);
    $("snap-next")?.addEventListener("click", goNext);
    $("snap-retry")?.addEventListener("click", retry);
    $("snap-restart")?.addEventListener("click", restart);

    const auto = $("snap-auto-next");
    if (auto) {
      const saved = localStorage.getItem(AUTO_KEY);
      if (saved === "0") auto.checked = false;
      auto.addEventListener("change", () => {
        localStorage.setItem(AUTO_KEY, auto.checked ? "1" : "0");
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "1" || e.key === "2") {
        if (checked) return;
        const chips = $("snap-chips")?.querySelectorAll(".snap-chip");
        const n = Number(e.key) - 1;
        if (chips && chips[n]) {
          e.preventDefault();
          chips[n].click();
        }
      } else if (e.key === "Enter" && checked) {
        e.preventDefault();
        goNext();
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        const item = current();
        const gloss = $("snap-gloss");
        const badge = $("snap-pair-badge");
        if (gloss && item) gloss.textContent = pickGloss(item);
        if (badge && item) badge.textContent = pairLabel(item.pair);
        const label = $("snap-race-label");
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
  }

  async function boot() {
    applyDic();
    bind();
    try {
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      timerSeconds = Number(data.timer?.seconds) || DEFAULT_SECONDS;
      pairsMap = { ...PAIR_DEFAULTS, ...(data.pairs || {}) };
      bankItems = (data.items || []).filter((it) => it.id && it.answer);
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
      const err = $("snap-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

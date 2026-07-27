/**
 * Dictation game � Speechling-like listen ? type ? check.
 * Audio: Web Speech API TTS (ko-KR). Original beginner bank only.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Dictation",
      title: "Listen & type",
      lead: "Play audio, type what you hear in Korean, then check.",
      backGames: "← Games",
      backHub: "Hub",
      ttsNote: "Audio: device TTS (ko-KR). Quality varies by browser — not recorded speech.",
      listenPrompt: "Listen, then type",
      play: "▶ Play",
      slow: "Slow",
      stop: "Stop",
      yourAnswer: "Your answer",
      placeholder: "Type in Korean…",
      check: "Check",
      skip: "Skip",
      reveal: "Give up",
      autoNext: "Auto-advance on correct",
      youWrote: "You wrote",
      correctIs: "Correct",
      next: "Next →",
      retry: "Try again",
      great: "Nice!",
      almost: "Not quite",
      revealed: "Answer shown",
      skipped: "Skipped",
      doneTitle: "Round complete",
      score: "{ok} correct · {skip} skipped · {miss} missed",
      restart: "Play again",
      loadFail: "Could not load dictation bank.",
      noTts: "Voice not available on this device.",
      empty: "Type something first.",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "No items in this theme.",
      theme_shopping: "Shopping",
      theme_snack: "Snack",
      theme_transit: "Transit",
      theme_banking: "Banking",
      theme_cosmetics: "Cosmetics",
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
      eyebrow: "받아쓰기",
      title: "듣고 쓰기",
      lead: "음성을 듣고 한국어를 입력한 뒤 확인하세요.",
      backGames: "← 게임",
      backHub: "허브",
      ttsNote: "음성: 기기 TTS(ko-KR). 품질은 브라우저마다 다름 — 녹음 음성이 아닙니다.",
      listenPrompt: "듣고 입력",
      play: "▶ 듣기",
      slow: "느리게",
      stop: "멈춤",
      yourAnswer: "나의 답",
      placeholder: "한국어로 입력…",
      check: "확인",
      skip: "스킵",
      reveal: "포기",
      autoNext: "정답이면 자동으로 다음",
      youWrote: "내가 쓴 답",
      correctIs: "정답",
      next: "다음 →",
      retry: "다시 시도",
      great: "잘했어요!",
      almost: "아쉬워요",
      revealed: "정답 공개",
      skipped: "스킵함",
      doneTitle: "한 판 끝",
      score: "정답 {ok} · 스킵 {skip} · 오답 {miss}",
      restart: "다시 하기",
      loadFail: "받아쓰기 뱅크를 불러오지 못했습니다.",
      noTts: "이 기기에서 음성을 쓸 수 없습니다.",
      empty: "먼저 입력하세요.",
      themeFilter: "테마",
      themeAll: "전체",
      themeEmpty: "이 테마 문항이 없습니다.",
      theme_shopping: "쇼핑",
      theme_snack: "간식",
      theme_transit: "교통",
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
      eyebrow: "听写",
      title: "听后写",
      lead: "播放音频，用韩语输入听到的内容，再检查。",
      backGames: "← 游戏",
      backHub: "中心",
      ttsNote: "音频：设备 TTS（ko-KR）。质量因浏览器而异 — 非录音。",
      listenPrompt: "听完再输入",
      play: "▶ 听",
      slow: "慢速",
      stop: "停止",
      yourAnswer: "你的答案",
      placeholder: "用韩语输入…",
      check: "检查",
      skip: "跳过",
      reveal: "放弃",
      autoNext: "答对自动下一题",
      youWrote: "你写的",
      correctIs: "正确答案",
      next: "下一题 →",
      retry: "再试",
      great: "很好!",
      almost: "再试试",
      revealed: "已显示答案",
      skipped: "已跳过",
      doneTitle: "本轮完成",
      score: "正确 {ok} · 跳过 {skip} · 错误 {miss}",
      restart: "再玩一次",
      loadFail: "无法加载听写题库。",
      noTts: "此设备无法使用语音。",
      empty: "请先输入。",
      themeFilter: "主题",
      themeAll: "全部",
      themeEmpty: "该主题暂无题目。",
      theme_shopping: "购物",
      theme_snack: "零食",
      theme_transit: "交通",
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

  const BANK_URL = "../../data/games/dictation-beginner.json";
  const AUTO_KEY = "jabi.games.dictation.autoNext";
  const THEME_KEY = "jabi.games.dictation.theme";
  const THEME_ORDER = [
    "shopping",
    "snack",
    "transit",
    "banking",
    "cosmetics",
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

  let bankItems = [];
  let themeList = [];
  let activeTheme = "all";
  let items = [];
  let idx = 0;
  let stats = { ok: 0, miss: 0, skip: 0 };
  let checked = false;
  let itemResult = null; // "ok" | "miss" | "skip" | null
  let voicesReady = false;

  const $ = (id) => document.getElementById(id);

  function lang() {
    return window.HubI18n?.getLang?.() || "en";
  }

  function s(key) {
    const L = lang();
    return (STR[L] && STR[L][key]) || STR.en[key] || key;
  }

  function applyDic() {
    document.querySelectorAll("[data-dic]").forEach((el) => {
      const key = el.getAttribute("data-dic");
      if (key) el.textContent = s(key);
    });
    const input = $("dict-input");
    if (input) input.placeholder = s("placeholder");
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
    const box = $("dict-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dict-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function renderItemTags(item) {
    const el = $("dict-item-tags");
    if (!el) return;
    el.innerHTML = "";
    if (!item || !Array.isArray(item.tags) || !item.tags.length) return;
    const known = themeList.length ? themeList : THEME_ORDER;
    item.tags
      .filter((tag) => known.includes(tag))
      .forEach((tag) => {
        const span = document.createElement("span");
        span.className = "dict-tag";
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
    stopSpeak();
    stats = { ok: 0, miss: 0, skip: 0 };
    itemResult = null;
    idx = 0;
    items = shuffle(filtered.slice());
    renderThemeChips();
    const done = $("dict-done");
    if (done) done.classList.add("hidden");
    showItem();
  }

  function pickGloss(item) {
    if (!item?.gloss) return "";
    const L = lang();
    return item.gloss[L] || item.gloss.en || item.gloss.ko || "";
  }

  function normalize(str) {
    return String(str || "")
      .normalize("NFC")
      .replace(/\u200b/g, "")
      .replace(/[.,!?��?!??~~'"����]/g, "")
      .replace(/\s+/g, "")
      .trim();
  }

  /** Simple LCS-based char diff for display */
  function diffHtml(user, correct) {
    const a = [...user];
    const b = [...correct];
    const n = a.length;
    const m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const parts = [];
    let i = n;
    let j = m;
    const stack = [];
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
        stack.push({ t: "ok", c: a[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        stack.push({ t: "miss", c: b[j - 1] });
        j--;
      } else {
        stack.push({ t: "extra", c: a[i - 1] });
        i--;
      }
    }
    stack.reverse().forEach((p) => {
      if (p.t === "ok") parts.push(`<span class="ok">${escapeHtml(p.c)}</span>`);
      else if (p.t === "extra") parts.push(`<span class="extra">${escapeHtml(p.c)}</span>`);
      else parts.push(`<span class="bad">${escapeHtml(p.c)}</span>`);
    });
    return parts.join("") || "�";
  }

  function escapeHtml(ch) {
    return String(ch)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function ensureVoices() {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve([]);
        return;
      }
      const list = speechSynthesis.getVoices();
      if (list.length) {
        voicesReady = true;
        resolve(list);
        return;
      }
      speechSynthesis.onvoiceschanged = () => {
        voicesReady = true;
        resolve(speechSynthesis.getVoices());
      };
      setTimeout(() => resolve(speechSynthesis.getVoices()), 400);
    });
  }

  function pickKoVoice(voices) {
    const ko = voices.filter((v) => /ko(-|_)?KR|Korean/i.test(v.lang + " " + v.name));
    return ko[0] || null;
  }

  function speak(text, rate) {
    if (!window.speechSynthesis) {
      toast(s("noTts"));
      return;
    }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ko-KR";
      u.rate = rate || 1;
      const voice = pickKoVoice(speechSynthesis.getVoices());
      if (voice) u.voice = voice;
      speechSynthesis.speak(u);
    } catch {
      toast(s("noTts"));
    }
  }

  function stopSpeak() {
    try {
      speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
  }

  function toast(msg) {
    const el = $("dict-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function current() {
    return items[idx] || null;
  }

  function updateProgress() {
    const total = items.length || 1;
    const text = $("dict-progress-text");
    const fill = $("dict-progress-fill");
    if (text) text.textContent = `${Math.min(idx + 1, total)} / ${total}`;
    if (fill) fill.style.width = `${Math.round((idx / total) * 100)}%`;
  }

  function showItem() {
    checked = false;
    itemResult = null;
    const item = current();
    const stage = document.querySelector(".dict-stage");
    const fb = $("dict-feedback");
    const done = $("dict-done");
    if (!item) {
      if (stage) stage.classList.add("hidden");
      if (fb) fb.classList.add("hidden");
      if (done) {
        done.classList.remove("hidden");
        const score = $("dict-score");
        if (score) {
          score.textContent = s("score")
            .replace("{ok}", String(stats.ok))
            .replace("{skip}", String(stats.skip))
            .replace("{miss}", String(stats.miss));
        }
      }
      updateProgress();
      const fill = $("dict-progress-fill");
      if (fill) fill.style.width = "100%";
      return;
    }
    if (stage) stage.classList.remove("hidden");
    if (done) done.classList.add("hidden");
    if (fb) fb.classList.add("hidden");
    const gloss = $("dict-gloss");
    if (gloss) gloss.textContent = pickGloss(item);
    renderItemTags(item);
    const input = $("dict-input");
    if (input) {
      input.value = "";
      input.focus({ preventScroll: true });
    }
    updateProgress();
  }

  function showFeedback(kind, userRaw) {
    const item = current();
    if (!item) return;
    checked = true;
    const fb = $("dict-feedback");
    const status = $("dict-feedback-status");
    const yours = $("dict-yours");
    const correct = $("dict-correct");
    if (!fb) return;
    fb.classList.remove("hidden", "is-ok", "is-bad");
    if (kind === "ok") {
      fb.classList.add("is-ok");
      if (status) status.textContent = s("great");
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
    const u = userRaw || "";
    if (yours) {
      if (kind === "ok") yours.innerHTML = `<span class="ok">${escapeHtml(u || item.text)}</span>`;
      else if (!u) yours.textContent = "�";
      else yours.innerHTML = diffHtml(normalize(u) ? u.replace(/\s+/g, "") : u, item.text);
    }
    if (correct) correct.textContent = item.text;
  }

  function commitResult() {
    if (!itemResult) return;
    if (itemResult === "ok") stats.ok += 1;
    else if (itemResult === "skip") stats.skip += 1;
    else stats.miss += 1;
    itemResult = null;
  }

  function checkAnswer() {
    const item = current();
    if (!item || checked) return;
    const input = $("dict-input");
    const raw = (input?.value || "").trim();
    if (!raw) {
      toast(s("empty"));
      return;
    }
    const ok = normalize(raw) === normalize(item.text);
    if (ok) {
      itemResult = "ok";
      showFeedback("ok", raw);
      const auto = $("dict-auto-next");
      if (auto?.checked) {
        setTimeout(() => goNext(), 700);
      }
    } else {
      itemResult = "miss";
      showFeedback("miss", raw);
    }
  }

  function goNext() {
    stopSpeak();
    commitResult();
    idx += 1;
    showItem();
  }

  function reveal() {
    if (!current() || checked) return;
    itemResult = "miss";
    showFeedback("reveal", ($("dict-input")?.value || "").trim());
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
    const fb = $("dict-feedback");
    if (fb) fb.classList.add("hidden");
    $("dict-input")?.focus();
  }

  function restart() {
    stats = { ok: 0, miss: 0, skip: 0 };
    itemResult = null;
    idx = 0;
    items = shuffle(filterByTheme(activeTheme));
    showItem();
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function bind() {
    $("dict-play")?.addEventListener("click", () => {
      const item = current();
      if (item) speak(item.text, 1);
    });
    $("dict-slow")?.addEventListener("click", () => {
      const item = current();
      if (item) speak(item.text, 0.7);
    });
    $("dict-stop")?.addEventListener("click", stopSpeak);
    $("dict-check")?.addEventListener("click", checkAnswer);
    $("dict-skip")?.addEventListener("click", skip);
    $("dict-reveal")?.addEventListener("click", reveal);
    $("dict-next")?.addEventListener("click", goNext);
    $("dict-retry")?.addEventListener("click", retry);
    $("dict-restart")?.addEventListener("click", restart);

    const auto = $("dict-auto-next");
    if (auto) {
      const saved = localStorage.getItem(AUTO_KEY);
      if (saved === "0") auto.checked = false;
      auto.addEventListener("change", () => {
        localStorage.setItem(AUTO_KEY, auto.checked ? "1" : "0");
      });
    }

    $("dict-input")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (checked) goNext();
        else checkAnswer();
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const item = current();
        if (item) speak(item.text, 1);
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        const gloss = $("dict-gloss");
        const item = current();
        if (gloss && item) gloss.textContent = pickGloss(item);
        renderItemTags(item);
      });
    });
  }

  async function boot() {
    applyDic();
    bind();
    await ensureVoices();
    try {
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      bankItems = (data.items || []).filter((it) => it.id && it.text);
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
        items = shuffle(bankItems.slice());
      } else {
        items = shuffle(filtered.slice());
      }
      renderThemeChips();
      showItem();
      // auto-play first item lightly after user gesture is safer � skip autoplay
    } catch {
      const err = $("dict-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
    void voicesReady;
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

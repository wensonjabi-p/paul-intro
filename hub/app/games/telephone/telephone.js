/**
 * Telephone (????) � solo classroom whisper.
 * Modes: recall (see/hear ? hide ? type) � distort (corrupted Korean ? repair).
 * Soft Hangul similarity scoring. Offline � no multiplayer.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Telephone",
      title: "Whisper & recall",
      lead: "Classroom telephone — solo. See or hear a phrase, it “passes,” then type what you remember. Soft scoring.",
      backGames: "← Games",
      backHub: "Hub",
      note: "Offline solo: no multiplayer. Optional distort mode shows corrupted Korean to repair. TTS quality varies by browser.",
      modeRecall: "Recall",
      modeDistort: "Distort",
      phaseSeed: "Seed phrase",
      phasePass: "Passing…",
      phaseType: "Type what you remember",
      phaseRepair: "Repair the whisper",
      passing: "Passing along…",
      corruptLabel: "Heard / corrupted",
      play: "▶ Listen",
      slow: "Slow",
      stop: "Stop",
      startPass: "Pass →",
      yourAnswer: "Your recall",
      placeholder: "Type in Korean…",
      check: "Check",
      skip: "Skip",
      reveal: "Give up",
      autoNext: "Auto-advance on full match",
      youWrote: "You wrote",
      correctIs: "Original",
      next: "Next →",
      retry: "Try again",
      great: "Nice — clear line!",
      almost: "Close — the line warped a bit",
      miss: "Lost in the chain",
      revealed: "Original shown",
      skipped: "Skipped",
      sim: "Match {pct}%",
      doneTitle: "Round complete",
      score: "{ok} clear · {soft} almost · {skip} skipped · {miss} lost",
      restart: "Play again",
      loadFail: "Could not load telephone bank.",
      noTts: "Voice not available on this device.",
      empty: "Type something first.",
      dash: "—",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "No items in this theme.",
      theme_shopping: "Shopping",
      theme_cosmetics: "Cosmetics",
      theme_cafe: "Cafe",
      theme_clinic: "Clinic",
      theme_food: "Food",
      theme_transport: "Transport",
      theme_leisure: "Leisure",
      theme_daily: "Daily",
      theme_banking: "Banking",
      theme_workplace: "Workplace",
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
      eyebrow: "전화 게임",
      title: "듣고 전달하기",
      lead: "교실 전화 놀이 — 혼자. 문장을 보고/듣고 ‘전달’된 뒤 기억한 대로 입력. 부드러운 채점.",
      backGames: "← 게임",
      backHub: "허브",
      note: "오프라인 솔로: 멀티플레이 없음. 왜곡 모드는 깨진 한국어를 고쳐 씁니다. TTS 품질은 브라우저마다 다름.",
      modeRecall: "기억",
      modeDistort: "왜곡",
      phaseSeed: "씨앗 문장",
      phasePass: "전달 중…",
      phaseType: "기억한 내용을 입력",
      phaseRepair: "속삭임을 고치기",
      passing: "전달하는 중…",
      corruptLabel: "들은 말 / 깨진 말",
      play: "▶ 듣기",
      slow: "느리게",
      stop: "멈춤",
      startPass: "전달 →",
      yourAnswer: "나의 기억",
      placeholder: "한국어로 입력…",
      check: "확인",
      skip: "스킵",
      reveal: "포기",
      autoNext: "완전 일치면 자동으로 다음",
      youWrote: "내가 쓴 답",
      correctIs: "원문",
      next: "다음 →",
      retry: "다시 시도",
      great: "좋아요 — 또렷해요!",
      almost: "거의 — 조금 왜곡됐어요",
      miss: "전달 중 사라졌어요",
      revealed: "원문 공개",
      skipped: "스킵함",
      sim: "일치 {pct}%",
      doneTitle: "한 판 끝",
      score: "명확 {ok} · 거의 {soft} · 스킵 {skip} · 놓침 {miss}",
      restart: "다시 하기",
      loadFail: "전화 게임 뱅크를 불러오지 못했습니다.",
      noTts: "이 기기에서 음성을 쓸 수 없습니다.",
      empty: "먼저 입력하세요.",
      dash: "—",
      themeFilter: "테마",
      themeAll: "전체",
      themeEmpty: "이 테마 문항이 없습니다.",
      theme_shopping: "쇼핑",
      theme_clinic: "병원",
      theme_banking: "은행",
      theme_workplace: "직장",
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
      eyebrow: "传话游戏",
      title: "听后回忆",
      lead: "课堂传话 — 单人。看/听短句，“传递”后再输入记得的内容。宽松计分。",
      backGames: "← 游戏",
      backHub: "中心",
      note: "离线单人：无多人。扭曲模式需修复损坏韩语。TTS 质量因浏览器而异。",
      modeRecall: "回忆",
      modeDistort: "扭曲",
      phaseSeed: "原句",
      phasePass: "传递中…",
      phaseType: "输入你记得的",
      phaseRepair: "修复低语",
      passing: "正在传递…",
      corruptLabel: "听到的 / 损坏的",
      play: "▶ 听",
      slow: "慢速",
      stop: "停止",
      startPass: "传递 →",
      yourAnswer: "你的回忆",
      placeholder: "用韩语输入…",
      check: "检查",
      skip: "跳过",
      reveal: "放弃",
      autoNext: "完全匹配自动下一题",
      youWrote: "你写的",
      correctIs: "原文",
      next: "下一题 →",
      retry: "再试",
      great: "很好 — 清楚!",
      almost: "接近 — 有点走样",
      miss: "传丢了",
      revealed: "已显示原文",
      skipped: "已跳过",
      sim: "匹配 {pct}%",
      doneTitle: "本轮完成",
      score: "清楚 {ok} · 接近 {soft} · 跳过 {skip} · 丢失 {miss}",
      restart: "再玩一次",
      loadFail: "无法加载传话题库。",
      noTts: "此设备无法使用语音。",
      empty: "请先输入。",
      dash: "—",
      themeFilter: "主题",
      themeAll: "全部",
      themeEmpty: "该主题暂无题目。",
      theme_shopping: "购物",
      theme_clinic: "医院",
      theme_banking: "银行",
      theme_workplace: "职场",
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

  const BANK_URL = "../../data/games/telephone-beginner.json";
  const AUTO_KEY = "jabi.games.telephone.autoNext";
  const MODE_KEY = "jabi.games.telephone.mode";
  const THEME_KEY = "jabi.games.telephone.theme";
  const THEME_ORDER = [
    "daily",
    "shopping",
    "cosmetics",
    "cafe",
    "clinic",
    "food",
    "transport",
    "leisure",
    "banking",
    "workplace",
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

  /** Hangul lookalikes for soft distortion */
  const CONFUSABLES = {
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "?",
    ?: "??",
    ??: "?",
  };

  let bankItems = [];
  let themeList = [];
  let activeTheme = "all";
  let items = [];
  let showMs = 3500;
  let passSteps = 3;
  let fullThresh = 0.88;
  let partialThresh = 0.55;
  let playMode = "recall"; // recall | distort
  let phase = "seed"; // seed | pass | type | done-item
  let idx = 0;
  let stats = { ok: 0, soft: 0, miss: 0, skip: 0 };
  let checked = false;
  let itemResult = null;
  let corruptText = "";
  let passTimer = null;
  let fadeTimer = null;
  let unlockedSpeak = false;

  const $ = (id) => document.getElementById(id);

  function lang() {
    return window.HubI18n?.getLang?.() || "en";
  }

  function s(key) {
    const L = lang();
    return (STR[L] && STR[L][key]) || STR.en[key] || key;
  }

  function pickGloss(item) {
    if (!item?.gloss) return "";
    const L = lang();
    return item.gloss[L] || item.gloss.en || item.gloss.ko || "";
  }

  function applyDic() {
    document.querySelectorAll("[data-tel]").forEach((el) => {
      const key = el.getAttribute("data-tel");
      if (key) el.textContent = s(key);
    });
    const input = $("tel-input");
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
    const box = $("tel-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tel-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function renderItemTags(item) {
    const el = $("tel-item-tags");
    if (!el) return;
    el.innerHTML = "";
    if (!item || !Array.isArray(item.tags) || !item.tags.length) return;
    const known = themeList.length ? themeList : THEME_ORDER;
    item.tags
      .filter((tag) => known.includes(tag))
      .forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tel-tag";
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
    clearPassTimer();
    stopSpeak();
    stats = { ok: 0, soft: 0, miss: 0, skip: 0 };
    itemResult = null;
    idx = 0;
    items = shuffleInPlace(filtered.slice());
    renderThemeChips();
    const done = $("tel-done");
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

  function escapeHtml(ch) {
    return String(ch)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(str) {
    return String(str || "")
      .normalize("NFC")
      .replace(/\u200b/g, "")
      .replace(/[.,!?��?!??~~'"����]/g, "")
      .replace(/\s+/g, "")
      .trim();
  }

  function levenshtein(a, b) {
    const n = a.length;
    const m = b.length;
    if (!n) return m;
    if (!m) return n;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[n][m];
  }

  function similarity(user, correct) {
    const a = normalize(user);
    const b = normalize(correct);
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    if (a === b) return 1;
    const maxLen = Math.max(a.length, b.length);
    return Math.max(0, 1 - levenshtein(a, b) / maxLen);
  }

  function diffHtml(user, correct) {
    const a = [...normalize(user) ? String(user).replace(/\s+/g, "") : String(user || "")];
    const b = [...String(correct || "").replace(/\s+/g, "")];
    const n = a.length;
    const m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const stack = [];
    let i = n;
    let j = m;
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
    return (
      stack
        .reverse()
        .map((p) => {
          if (p.t === "ok") return `<span class="ok">${escapeHtml(p.c)}</span>`;
          if (p.t === "extra") return `<span class="extra">${escapeHtml(p.c)}</span>`;
          return `<span class="bad">${escapeHtml(p.c)}</span>`;
        })
        .join("") || s("dash")
    );
  }

  function toast(msg) {
    const el = $("tel-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function pickKoVoice(voices) {
    const ko = voices.filter((v) => /ko(-|_)?KR|Korean/i.test(v.lang + " " + v.name));
    return ko[0] || null;
  }

  function ensureVoices() {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve([]);
        return;
      }
      const list = speechSynthesis.getVoices();
      if (list.length) {
        resolve(list);
        return;
      }
      speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
      setTimeout(() => resolve(speechSynthesis.getVoices()), 400);
    });
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
      unlockedSpeak = true;
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

  function current() {
    return items[idx] || null;
  }

  function clearPassTimer() {
    if (passTimer) {
      clearTimeout(passTimer);
      passTimer = null;
    }
    if (fadeTimer) {
      clearTimeout(fadeTimer);
      fadeTimer = null;
    }
  }

  /** Korean-friendly soft corruption for telephone chain simulation */
  function distortKorean(text) {
    let t = String(text || "");
    if (!t) return t;
    const words = t.split(/\s+/);
    const ops = shuffleInPlace(["swap", "confusable", "drop", "space", "order"].slice());

    for (let step = 0; step < Math.min(passSteps, ops.length); step++) {
      const op = ops[step];
      if (op === "swap" && t.length >= 2) {
        const chars = [...t];
        let i = Math.floor(Math.random() * (chars.length - 1));
        if (chars[i] === " ") i = Math.max(0, i - 1);
        if (chars[i + 1] === " " && i + 2 < chars.length) {
          [chars[i], chars[i + 2]] = [chars[i + 2], chars[i]];
        } else {
          [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
        }
        t = chars.join("");
      } else if (op === "confusable") {
        const keys = Object.keys(CONFUSABLES);
        const hits = keys.filter((k) => t.includes(k));
        if (hits.length) {
          const k = hits[Math.floor(Math.random() * hits.length)];
          t = t.replace(k, CONFUSABLES[k]);
        }
      } else if (op === "drop" && t.length > 3) {
        const chars = [...t];
        let i = Math.floor(Math.random() * chars.length);
        if (chars[i] === " ") i = (i + 1) % chars.length;
        chars.splice(i, 1);
        t = chars.join("");
      } else if (op === "space" && words.length === 1 && t.length > 4) {
        const cut = Math.floor(t.length / 2);
        t = t.slice(0, cut) + " " + t.slice(cut);
      } else if (op === "order" && words.length >= 2) {
        const w = words.slice();
        const i = Math.floor(Math.random() * (w.length - 1));
        [w[i], w[i + 1]] = [w[i + 1], w[i]];
        t = w.join(" ");
      }
    }

    if (normalize(t) === normalize(text)) {
      // Ensure at least one visible warp
      const chars = [...t];
      if (chars.length >= 2) {
        [chars[0], chars[1]] = [chars[1], chars[0]];
        t = chars.join("");
      }
    }
    return t;
  }

  function updateProgress() {
    const total = items.length || 1;
    const text = $("tel-progress-text");
    const fill = $("tel-progress-fill");
    if (text) text.textContent = `${Math.min(idx + 1, total)} / ${total}`;
    if (fill) fill.style.width = `${Math.round((idx / total) * 100)}%`;
  }

  function setModeButtons() {
    document.querySelectorAll(".tel-mode-btn").forEach((btn) => {
      btn.classList.toggle("is-on", btn.getAttribute("data-mode") === playMode);
    });
  }

  function setPhaseLabel() {
    const el = $("tel-phase-label");
    if (!el) return;
    if (phase === "seed") el.textContent = s("phaseSeed");
    else if (phase === "pass") el.textContent = s("phasePass");
    else if (phase === "type") el.textContent = playMode === "distort" ? s("phaseRepair") : s("phaseType");
  }

  function autoNextOn() {
    const el = $("tel-auto-next");
    return el ? el.checked : true;
  }

  function hideFeedback() {
    const fb = $("tel-feedback");
    if (fb) fb.classList.add("hidden");
  }

  function showFeedback(kind, statusText, yoursHtml, correct, explain, pct) {
    const fb = $("tel-feedback");
    if (!fb) return;
    fb.classList.remove("hidden", "is-ok", "is-soft", "is-bad");
    if (kind === "ok") fb.classList.add("is-ok");
    else if (kind === "soft") fb.classList.add("is-soft");
    else fb.classList.add("is-bad");
    const st = $("tel-feedback-status");
    if (st) st.textContent = statusText;
    const sim = $("tel-sim");
    if (sim) {
      sim.textContent =
        pct != null ? s("sim").replace("{pct}", String(Math.round(pct * 100))) : "";
    }
    const y = $("tel-yours");
    if (y) y.innerHTML = yoursHtml || s("dash");
    const c = $("tel-correct");
    if (c) c.textContent = correct || s("dash");
    const ex = $("tel-explain");
    if (ex) ex.textContent = explain || "";
    const retry = $("tel-retry");
    if (retry) {
      retry.classList.toggle(
        "hidden",
        kind === "ok" || itemResult === "skip" || itemResult === "reveal"
      );
    }
  }

  function enterTypePhase() {
    phase = "type";
    setPhaseLabel();
    const seed = $("tel-seed");
    const pass = $("tel-pass");
    const typePanel = $("tel-type-panel");
    const startBtn = $("tel-start-pass");
    if (seed) seed.classList.add("is-hidden");
    if (pass) {
      pass.classList.remove("is-on");
      pass.setAttribute("aria-hidden", "true");
    }
    if (typePanel) typePanel.classList.remove("hidden");
    if (startBtn) startBtn.classList.add("hidden");

    if (playMode === "distort") {
      const distortPanel = $("tel-distort-panel");
      const corrupt = $("tel-corrupt");
      if (distortPanel) distortPanel.classList.remove("hidden");
      if (corrupt) corrupt.textContent = corruptText;
      const seedPanel = $("tel-seed-panel");
      if (seedPanel) seedPanel.classList.add("hidden");
    }

    const input = $("tel-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function startPass() {
    if (checked || phase === "type") return;
    const item = current();
    if (!item) return;
    clearPassTimer();
    phase = "pass";
    setPhaseLabel();
    stopSpeak();

    const seed = $("tel-seed");
    const pass = $("tel-pass");
    const startBtn = $("tel-start-pass");
    if (startBtn) startBtn.disabled = true;
    if (pass) {
      pass.classList.add("is-on");
      pass.setAttribute("aria-hidden", "false");
    }

    // Brief show of seed fading, then hide
    const fadeAt = Math.max(600, Math.floor(showMs * 0.45));
    clearPassTimer();
    fadeTimer = setTimeout(() => {
      if (seed) seed.classList.add("is-hidden");
      fadeTimer = null;
    }, fadeAt);

    passTimer = setTimeout(() => {
      passTimer = null;
      if (startBtn) startBtn.disabled = false;
      enterTypePhase();
    }, showMs);
  }

  function showItem() {
    clearPassTimer();
    hideFeedback();
    checked = false;
    itemResult = null;
    corruptText = "";
    phase = "seed";
    stopSpeak();

    const item = current();
    const stage = $("tel-stage");
    const done = $("tel-done");
    const typePanel = $("tel-type-panel");
    const distortPanel = $("tel-distort-panel");
    const seedPanel = $("tel-seed-panel");
    const seed = $("tel-seed");
    const pass = $("tel-pass");
    const startBtn = $("tel-start-pass");
    const input = $("tel-input");

    if (!item) {
      if (stage) stage.classList.add("hidden");
      if (done) {
        done.classList.remove("hidden");
        const score = $("tel-score");
        if (score) {
          score.textContent = s("score")
            .replace("{ok}", String(stats.ok))
            .replace("{soft}", String(stats.soft))
            .replace("{skip}", String(stats.skip))
            .replace("{miss}", String(stats.miss));
        }
      }
      const fill = $("tel-progress-fill");
      if (fill) fill.style.width = "100%";
      const text = $("tel-progress-text");
      if (text) text.textContent = `${items.length} / ${items.length}`;
      return;
    }

    if (stage) stage.classList.remove("hidden");
    if (done) done.classList.add("hidden");
    if (typePanel) typePanel.classList.add("hidden");
    if (distortPanel) distortPanel.classList.add("hidden");
    if (seedPanel) seedPanel.classList.remove("hidden");
    if (seed) {
      seed.textContent = item.text;
      seed.classList.remove("is-hidden");
    }
    if (pass) {
      pass.classList.remove("is-on");
      pass.setAttribute("aria-hidden", "true");
    }
    if (startBtn) {
      startBtn.classList.remove("hidden");
      startBtn.disabled = false;
    }
    if (input) input.value = "";

    corruptText = playMode === "distort" ? distortKorean(item.text) : "";

    const gloss = $("tel-gloss");
    if (gloss) gloss.textContent = pickGloss(item);
    renderItemTags(item);
    setPhaseLabel();
    updateProgress();

    if (unlockedSpeak) speak(item.text, 1);

    // Auto-start pass after a beat so solo flow feels like telephone
    if (playMode === "recall") {
      passTimer = setTimeout(() => startPass(), 900);
    } else {
      // Distort: show seed briefly then jump to repair with corrupted text
      passTimer = setTimeout(() => startPass(), 700);
    }
  }

  function finishItem(result, pct) {
    checked = true;
    itemResult = result;
    phase = "done-item";
    clearPassTimer();
    stopSpeak();
    const item = current();
    if (!item) return;

    if (result === "ok") stats.ok += 1;
    else if (result === "soft") stats.soft += 1;
    else if (result === "skip") stats.skip += 1;
    else if (result === "reveal" || result === "miss") stats.miss += 1;

    const raw = ($("tel-input")?.value || "").trim();
    const yoursHtml =
      result === "skip" ? s("dash") : result === "ok" ? escapeHtml(raw || item.text) : diffHtml(raw, item.text);

    if (result === "ok") {
      showFeedback("ok", s("great"), yoursHtml, item.text, pickGloss(item), pct ?? 1);
      if (autoNextOn()) {
        clearTimeout(finishItem._t);
        finishItem._t = setTimeout(() => goNext(), 900);
      }
      return;
    }
    if (result === "soft") {
      showFeedback("soft", s("almost"), yoursHtml, item.text, pickGloss(item), pct);
      return;
    }
    if (result === "skip") {
      showFeedback("bad", s("skipped"), s("dash"), item.text, pickGloss(item), null);
      return;
    }
    if (result === "reveal") {
      showFeedback("bad", s("revealed"), yoursHtml, item.text, pickGloss(item), pct);
      return;
    }
    showFeedback("bad", s("miss"), yoursHtml, item.text, pickGloss(item), pct);
  }

  function checkAnswer() {
    if (checked) return;
    if (phase !== "type") {
      // Allow check only after pass
      return;
    }
    const item = current();
    if (!item) return;
    const raw = ($("tel-input")?.value || "").trim();
    if (!raw) {
      toast(s("empty"));
      return;
    }
    const pct = similarity(raw, item.text);
    if (pct >= fullThresh) finishItem("ok", pct);
    else if (pct >= partialThresh) finishItem("soft", pct);
    else finishItem("miss", pct);
  }

  function goNext() {
    clearTimeout(finishItem._t);
    clearPassTimer();
    stopSpeak();
    idx += 1;
    showItem();
  }

  function skipItem() {
    if (checked && (itemResult === "ok" || itemResult === "soft" || itemResult === "skip" || itemResult === "reveal"))
      return;
    if (phase === "seed" || phase === "pass") {
      clearPassTimer();
      enterTypePhase();
    }
    finishItem("skip", null);
  }

  function revealItem() {
    if (checked && (itemResult === "ok" || itemResult === "soft" || itemResult === "skip" || itemResult === "reveal"))
      return;
    if (phase !== "type") {
      clearPassTimer();
      enterTypePhase();
    }
    const raw = ($("tel-input")?.value || "").trim();
    const pct = raw ? similarity(raw, current()?.text || "") : null;
    finishItem("reveal", pct);
  }

  function retryItem() {
    clearTimeout(finishItem._t);
    if (itemResult === "ok") stats.ok = Math.max(0, stats.ok - 1);
    else if (itemResult === "soft") stats.soft = Math.max(0, stats.soft - 1);
    else if (itemResult === "skip") stats.skip = Math.max(0, stats.skip - 1);
    else if (itemResult === "reveal" || itemResult === "miss") stats.miss = Math.max(0, stats.miss - 1);
    // Re-show same item from seed
    showItem();
  }

  function restart() {
    clearPassTimer();
    stopSpeak();
    idx = 0;
    stats = { ok: 0, soft: 0, miss: 0, skip: 0 };
    items = shuffleInPlace(filterByTheme(activeTheme));
    showItem();
  }

  function setPlayMode(mode) {
    if (mode !== "recall" && mode !== "distort") return;
    if (mode === playMode) return;
    playMode = mode;
    localStorage.setItem(MODE_KEY, playMode);
    setModeButtons();
    // Restart current item in new mode without advancing
    if (itemResult === "ok") stats.ok = Math.max(0, stats.ok - 1);
    else if (itemResult === "soft") stats.soft = Math.max(0, stats.soft - 1);
    clearTimeout(finishItem._t);
    showItem();
  }

  function bind() {
    $("tel-play")?.addEventListener("click", () => {
      const item = current();
      if (!item) return;
      const text = phase === "type" && playMode === "distort" ? corruptText || item.text : item.text;
      speak(text, 1);
    });
    $("tel-slow")?.addEventListener("click", () => {
      const item = current();
      if (!item) return;
      const text = phase === "type" && playMode === "distort" ? corruptText || item.text : item.text;
      speak(text, 0.7);
    });
    $("tel-stop")?.addEventListener("click", stopSpeak);
    $("tel-start-pass")?.addEventListener("click", () => {
      clearPassTimer();
      startPass();
    });
    $("tel-check")?.addEventListener("click", checkAnswer);
    $("tel-skip")?.addEventListener("click", skipItem);
    $("tel-reveal")?.addEventListener("click", revealItem);
    $("tel-next")?.addEventListener("click", goNext);
    $("tel-retry")?.addEventListener("click", retryItem);
    $("tel-restart")?.addEventListener("click", restart);

    $("tel-mode-recall")?.addEventListener("click", () => setPlayMode("recall"));
    $("tel-mode-distort")?.addEventListener("click", () => setPlayMode("distort"));

    const auto = $("tel-auto-next");
    if (auto) {
      const saved = localStorage.getItem(AUTO_KEY);
      if (saved === "0") auto.checked = false;
      if (saved === "1") auto.checked = true;
      auto.addEventListener("change", () => {
        localStorage.setItem(AUTO_KEY, auto.checked ? "1" : "0");
      });
    }

    $("tel-input")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        checkAnswer();
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        setPhaseLabel();
        const gloss = $("tel-gloss");
        const item = current();
        if (gloss && item) gloss.textContent = pickGloss(item);
        renderItemTags(item);
      });
    });
  }

  async function boot() {
    applyDic();
    const savedMode = localStorage.getItem(MODE_KEY);
    if (savedMode === "recall" || savedMode === "distort") playMode = savedMode;
    setModeButtons();
    bind();
    try {
      await ensureVoices();
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data.defaults?.showMs) showMs = Number(data.defaults.showMs) || showMs;
      if (data.defaults?.passSteps) passSteps = Number(data.defaults.passSteps) || passSteps;
      if (data.scoring?.full != null) fullThresh = Number(data.scoring.full) || fullThresh;
      if (data.scoring?.partial != null) partialThresh = Number(data.scoring.partial) || partialThresh;
      bankItems = (data.items || []).filter((it) => it.id && it.text);
      if (bankItems.length < 8) throw new Error("short bank");
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
      const err = $("tel-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

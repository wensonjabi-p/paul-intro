/**
 * Bingo Board — vocab grid · gloss/TTS call · tap to mark · win line.
 * Original beginner bank · Sunstage Play · free center.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Bingo Board",
      title: "Vocab bingo",
      lead: "Hear or read the call, tap the matching Korean cell. Get a line — bingo!",
      backGames: "← Games",
      backHub: "Hub",
      note: "Center FREE is already marked. Wrong taps do not mark. TTS quality varies by browser.",
      sizeLabel: "Size",
      newBoard: "New board",
      callLabel: "Call",
      play: "▶ Listen",
      slow: "Slow",
      skip: "Skip call",
      tapHint: "Tap the matching cell on the board →",
      callMeta: "Call {n} of {total}",
      free: "FREE",
      marked: "Marked!",
      miss: "Not that one",
      skipped: "Call skipped",
      bingoTitle: "Bingo!",
      bingoLine: "Bingo! Line complete.",
      score: "{marks} marked · {miss} misses · {skip} skipped",
      playAgain: "Play again",
      loadFail: "Could not load bingo bank.",
      noTts: "Voice not available on this device.",
      doneExhaust: "Board cleared — no bingo line (rare).",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "Not enough words in this theme for the board.",
      themeSize3: "Theme board uses 3×3 (too few words for 5×5).",
      theme_cafe: "Cafe",
      theme_food: "Food",
      theme_shopping: "Shopping",
      theme_transport: "Transit",
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
      theme_leisure: "Leisure",
      theme_cosmetics: "Cosmetics",
      theme_housing: "Housing",
      theme_banking: "Banking",
      theme_workplace: "Workplace",
      theme_money: "Money",
      theme_basic: "Basic",
      theme_people: "People",
      theme_place: "Place",
      theme_object: "Objects",
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
      theme_lang: "Language",
      theme_services: "Services",
    },
    ko: {
      eyebrow: "어휘 빙고",
      title: "어휘 빙고",
      lead: "콜(뜻·듣기)을 보고 맞는 한국어 칸을 탭하세요. 한 줄이면 빙고!",
      backGames: "← 게임",
      backHub: "허브",
      note: "가운데 FREE는 이미 표시됩니다. 틀린 탭은 표시되지 않습니다. TTS는 기기마다 다릅니다.",
      sizeLabel: "크기",
      newBoard: "새 판",
      callLabel: "콜",
      play: "▶ 듣기",
      slow: "느리게",
      skip: "콜 스킵",
      tapHint: "보드에서 맞는 칸을 탭 →",
      callMeta: "콜 {n} / {total}",
      free: "FREE",
      marked: "표시!",
      miss: "그 칸이 아니에요",
      skipped: "콜 스킵함",
      bingoTitle: "빙고!",
      bingoLine: "빙고! 한 줄 완성.",
      score: "표시 {marks} · 오탭 {miss} · 스킵 {skip}",
      playAgain: "다시 하기",
      loadFail: "빙고 뱅크를 불러오지 못했습니다.",
      noTts: "이 기기에서 음성을 쓸 수 없습니다.",
      doneExhaust: "칸을 다 채웠지만 줄이 없어요(드묾).",
      themeFilter: "테마",
      themeAll: "전체",
      themeEmpty: "이 테마 단어가 보드에 부족합니다.",
      themeSize3: "이 테마는 5×5에 부족해 3×3으로 열어요.",
      theme_cafe: "카페",
      theme_food: "음식",
      theme_shopping: "쇼핑",
      theme_transport: "교통",
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
      theme_leisure: "여가",
      theme_cosmetics: "화장품",
      theme_housing: "주거",
      theme_banking: "은행",
      theme_workplace: "직장",
      theme_money: "돈",
      theme_basic: "기초",
      theme_people: "사람",
      theme_place: "장소",
      theme_object: "사물",
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
      theme_lang: "언어",
      theme_services: "서비스",
    },
    zh: {
      eyebrow: "词汇宾果",
      title: "词汇宾果",
      lead: "看提示或听朗读，点对应的韩文格。连成一线即宾果！",
      backGames: "← 游戏",
      backHub: "中心",
      note: "中心 FREE 已标记。点错不会标记。TTS 因设备而异。",
      sizeLabel: "尺寸",
      newBoard: "新棋盘",
      callLabel: "叫号",
      play: "▶ 听",
      slow: "慢速",
      skip: "跳过",
      tapHint: "在棋盘上点对应格子 →",
      callMeta: "第 {n} / {total} 次",
      free: "FREE",
      marked: "已标记!",
      miss: "不是这一格",
      skipped: "已跳过",
      bingoTitle: "宾果!",
      bingoLine: "宾果！连线完成。",
      score: "标记 {marks} · 点错 {miss} · 跳过 {skip}",
      playAgain: "再玩一次",
      loadFail: "无法加载宾果词库。",
      noTts: "此设备无法朗读。",
      doneExhaust: "格子已满但未连线（少见）。",
      themeFilter: "主题",
      themeAll: "全部",
      themeEmpty: "该主题词数不够填棋盘。",
      themeSize3: "该主题词不够 5×5，已改为 3×3。",
      theme_cafe: "咖啡",
      theme_food: "饮食",
      theme_shopping: "购物",
      theme_transport: "交通",
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
      theme_leisure: "休闲",
      theme_cosmetics: "美妆",
      theme_housing: "居住",
      theme_banking: "银行",
      theme_workplace: "职场",
      theme_money: "金钱",
      theme_basic: "基础",
      theme_people: "人物",
      theme_place: "场所",
      theme_object: "物品",
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
      theme_lang: "语言",
      theme_services: "服务",
    },
  };

  const BANK_URL = "../../data/games/bingo-beginner.json";
  const SIZE_KEY = "jabi.games.bingo.size";
  const THEME_KEY = "jabi.games.bingo.theme";
  const THEME_ORDER = [
    "cafe",
    "food",
    "shopping",
    "transport",
    "clinic",
    "leisure",
    "cosmetics",
    "housing",
    "banking",
    "money",
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
    "basic",
    "people",
    "place",
    "object",
    "time",
    "chores",
    "body",
    "direction",
    "furniture",
    "fruit",
    "kitchen",
    "stationery",
    "mail",
    "pets", "driving", "places", "pantry", "bathroom", "jobs", "country",
    "routine",
    "size",
    "senses",
    "color",
    "accessories",
    "electric",
    "building",
    "motion",
    "favor",
    "think",
    "speech",
    "change",
    "compare",
    "reason",
    "problem",
    "opinion",
    "habit",
    "rules",
    "friends",
    "personality",
    "apology",
    "success",
    "advice",
    "encourage",
    "promise",
    "refuse",
    "complain",
    "lang",
    "services",
  ];

  /** @type {{ id: string, word: string, gloss: object, tags?: string[] }[]} */
  let fullBank = [];
  /** @type {{ id: string, word: string, gloss: object, tags?: string[] }[]} */
  let bank = [];
  let themeList = [];
  let activeTheme = "all";
  let freeCenter = true;
  let size = 5;
  /** @type {({ id: string, word: string, gloss: object, free?: boolean } | null)[]} */
  let cells = [];
  /** @type {boolean[]} */
  let marked = [];
  /** @type {string[]} call word ids still pending */
  let callQueue = [];
  let callIdx = 0;
  let won = false;
  /** @type {number[] | null} */
  let winLine = null;
  let stats = { marks: 0, miss: 0, skip: 0 };

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
    document.querySelectorAll("[data-bg]").forEach((el) => {
      const key = el.getAttribute("data-bg");
      if (key) el.textContent = s(key);
    });
    renderThemeChips();
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
    const needMin = neededWords(3);
    THEME_ORDER.forEach((t) => {
      if (fromMeta.includes(t) || fullBank.some((it) => (it.tags || []).includes(t))) {
        if (!seen.has(t)) {
          seen.add(t);
          out.push(t);
        }
      }
    });
    fromMeta.forEach((t) => {
      if (!seen.has(t) && fullBank.some((it) => (it.tags || []).includes(t))) {
        seen.add(t);
        out.push(t);
      }
    });
    // Hide chips that cannot fill even a 3×3 (avoid empty-state toast dead-ends).
    return out.filter((t) => filterByTheme(t).length >= needMin);
  }

  function filterByTheme(theme) {
    if (!theme || theme === "all") return fullBank.slice();
    return fullBank.filter((it) => (it.tags || []).includes(theme));
  }

  function renderThemeChips() {
    const box = $("bg-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bg-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function setTheme(theme) {
    const next = theme || "all";
    if (next !== "all" && !themeList.includes(next)) return;
    const filtered = filterByTheme(next);
    const need3 = neededWords(3);
    if (filtered.length < need3) {
      toast(s("themeEmpty"));
      return;
    }
    let nextSize = size;
    let sizeNote = false;
    if (filtered.length < neededWords(size)) {
      nextSize = 3;
      sizeNote = size === 5;
    }
    activeTheme = next;
    size = nextSize;
    bank = filtered;
    try {
      localStorage.setItem(THEME_KEY, activeTheme);
      localStorage.setItem(SIZE_KEY, String(size));
    } catch {
      /* ignore */
    }
    renderThemeChips();
    buildRound();
    if (sizeNote) toast(s("themeSize3"));
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

  function toast(msg) {
    const el = $("bg-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function flashFeedback(kind, text) {
    const el = $("bg-feedback");
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden", "is-ok", "is-bad", "is-bingo");
    if (kind === "ok") el.classList.add("is-ok");
    else if (kind === "bingo") el.classList.add("is-bingo");
    else el.classList.add("is-bad");
    clearTimeout(flashFeedback._t);
    if (kind !== "bingo") {
      flashFeedback._t = setTimeout(() => el.classList.add("hidden"), 1600);
    }
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
    } catch {
      toast(s("noTts"));
    }
  }

  function centerIndex(n) {
    return Math.floor((n * n) / 2);
  }

  function neededWords(n) {
    const total = n * n;
    return freeCenter ? total - 1 : total;
  }

  function currentCall() {
    if (won || callIdx >= callQueue.length) return null;
    const id = callQueue[callIdx];
    return bank.find((w) => w.id === id) || null;
  }

  function findWinLine() {
    const n = size;
    const lines = [];
    for (let r = 0; r < n; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(r * n + c);
      lines.push(row);
    }
    for (let c = 0; c < n; c++) {
      const col = [];
      for (let r = 0; r < n; r++) col.push(r * n + c);
      lines.push(col);
    }
    const d1 = [];
    const d2 = [];
    for (let i = 0; i < n; i++) {
      d1.push(i * n + i);
      d2.push(i * n + (n - 1 - i));
    }
    lines.push(d1, d2);
    for (const line of lines) {
      if (line.every((i) => marked[i])) return line;
    }
    return null;
  }

  function updateProgress() {
    const total = callQueue.length || 1;
    const n = Math.min(callIdx + (won ? 0 : 1), total);
    const text = $("bg-progress-text");
    const fill = $("bg-progress-fill");
    if (text) text.textContent = `${Math.min(callIdx + 1, total)} / ${total}`;
    if (fill) {
      const pct = won ? 100 : Math.round((callIdx / total) * 100);
      fill.style.width = `${pct}%`;
    }
    void n;
  }

  function updateSizeChips() {
    document.querySelectorAll(".bg-chip[data-size]").forEach((btn) => {
      const on = Number(btn.getAttribute("data-size")) === size;
      btn.classList.toggle("is-on", on);
    });
  }

  function renderCall() {
    const call = currentCall();
    const glossEl = $("bg-call-gloss");
    const meta = $("bg-call-meta");
    const done = $("bg-done");
    const stage = document.querySelector(".bg-stage");
    const callBox = document.querySelector(".bg-call");

    if (won) {
      if (glossEl) glossEl.textContent = s("bingoTitle");
      if (meta) meta.textContent = "";
      if (done) {
        done.classList.remove("hidden");
        const score = $("bg-score");
        if (score) {
          score.textContent = s("score")
            .replace("{marks}", String(stats.marks))
            .replace("{miss}", String(stats.miss))
            .replace("{skip}", String(stats.skip));
        }
      }
      updateProgress();
      return;
    }

    if (done) done.classList.add("hidden");
    if (stage) stage.classList.remove("hidden");
    if (callBox) callBox.classList.remove("hidden");

    if (!call) {
      if (glossEl) glossEl.textContent = s("doneExhaust");
      if (meta) meta.textContent = "";
      if (done) {
        done.classList.remove("hidden");
        const title = $("bg-done-title");
        if (title) title.textContent = s("doneExhaust");
        const score = $("bg-score");
        if (score) {
          score.textContent = s("score")
            .replace("{marks}", String(stats.marks))
            .replace("{miss}", String(stats.miss))
            .replace("{skip}", String(stats.skip));
        }
      }
      updateProgress();
      return;
    }

    if (glossEl) glossEl.textContent = pickGloss(call);
    if (meta) {
      meta.textContent = s("callMeta")
        .replace("{n}", String(callIdx + 1))
        .replace("{total}", String(callQueue.length));
    }
    updateProgress();
  }

  function renderGrid() {
    const grid = $("bg-grid");
    if (!grid) return;
    grid.className = `bg-grid bg-grid--${size}`;
    grid.innerHTML = "";
    const winSet = winLine ? new Set(winLine) : null;

    cells.forEach((cell, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bg-cell";
      btn.setAttribute("role", "gridcell");
      if (cell?.free) {
        btn.classList.add("is-free", "is-marked");
        btn.textContent = s("free");
        btn.disabled = true;
      } else {
        btn.innerHTML = escapeHtml(cell?.word || "");
        btn.disabled = won || marked[i];
        if (marked[i]) btn.classList.add("is-marked");
      }
      if (winSet && winSet.has(i)) btn.classList.add("is-win");
      btn.addEventListener("click", () => onCellTap(i));
      grid.appendChild(btn);
    });
  }

  function onCellTap(i) {
    if (won || marked[i]) return;
    const cell = cells[i];
    if (!cell || cell.free) return;
    const call = currentCall();
    if (!call) return;

    if (cell.id !== call.id) {
      stats.miss += 1;
      flashFeedback("bad", s("miss"));
      const grid = $("bg-grid");
      const btn = grid?.children[i];
      if (btn) {
        btn.classList.add("is-miss");
        setTimeout(() => btn.classList.remove("is-miss"), 380);
      }
      return;
    }

    marked[i] = true;
    stats.marks += 1;
    flashFeedback("ok", s("marked"));
    const line = findWinLine();
    if (line) {
      won = true;
      winLine = line;
      flashFeedback("bingo", s("bingoLine"));
      try {
        speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
      renderGrid();
      renderCall();
      return;
    }

    callIdx += 1;
    renderGrid();
    renderCall();
  }

  function skipCall() {
    if (won) return;
    const call = currentCall();
    if (!call) return;
    stats.skip += 1;
    flashFeedback("bad", s("skipped"));
    callIdx += 1;
    renderCall();
  }

  function buildRound() {
    won = false;
    winLine = null;
    stats = { marks: 0, miss: 0, skip: 0 };
    callIdx = 0;
    const need = neededWords(size);
    if (bank.length < need) {
      toast(s("loadFail"));
      return;
    }
    const picked = shuffleInPlace(bank.slice()).slice(0, need);
    const n = size;
    const mid = centerIndex(n);
    cells = new Array(n * n).fill(null);
    marked = new Array(n * n).fill(false);
    let p = 0;
    for (let i = 0; i < n * n; i++) {
      if (freeCenter && i === mid) {
        cells[i] = { id: "__free", word: "", gloss: {}, free: true };
        marked[i] = true;
      } else {
        cells[i] = picked[p++];
      }
    }
    callQueue = shuffleInPlace(
      cells.filter((c) => c && !c.free).map((c) => c.id)
    );
    const fb = $("bg-feedback");
    if (fb) fb.classList.add("hidden");
    const done = $("bg-done");
    if (done) done.classList.add("hidden");
    const title = $("bg-done-title");
    if (title) title.textContent = s("bingoTitle");
    updateSizeChips();
    renderGrid();
    renderCall();
  }

  function setSize(n) {
    if (n !== 3 && n !== 5) return;
    if (bank.length < neededWords(n)) {
      toast(s("themeEmpty"));
      return;
    }
    size = n;
    try {
      localStorage.setItem(SIZE_KEY, String(n));
    } catch {
      /* ignore */
    }
    buildRound();
  }

  function bind() {
    $("bg-play")?.addEventListener("click", () => {
      const call = currentCall();
      if (call) speak(call.word, 1);
    });
    $("bg-slow")?.addEventListener("click", () => {
      const call = currentCall();
      if (call) speak(call.word, 0.7);
    });
    $("bg-skip")?.addEventListener("click", skipCall);
    $("bg-new")?.addEventListener("click", buildRound);
    $("bg-restart")?.addEventListener("click", buildRound);
    $("bg-size-3")?.addEventListener("click", () => setSize(3));
    $("bg-size-5")?.addEventListener("click", () => setSize(5));

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        renderCall();
        renderGrid();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.code === "Space") {
        const tag = (e.target && e.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
        e.preventDefault();
        const call = currentCall();
        if (call) speak(call.word, 1);
      }
    });
  }

  async function boot() {
    applyDic();
    bind();
    const savedSize = localStorage.getItem(SIZE_KEY);
    if (savedSize === "3" || savedSize === "5") size = Number(savedSize);
    try {
      await ensureVoices();
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      freeCenter = data.freeCenter !== false;
      if (data.defaultSize === 3 || data.defaultSize === 5) {
        if (!savedSize) size = data.defaultSize;
      }
      fullBank = (data.items || []).filter((it) => it.id && it.word);
      if (fullBank.length < neededWords(5)) throw new Error("short bank");
      themeList = collectThemes(data);
      let savedTheme = "all";
      try {
        savedTheme = localStorage.getItem(THEME_KEY) || "all";
      } catch {
        savedTheme = "all";
      }
      if (savedTheme !== "all" && !themeList.includes(savedTheme)) savedTheme = "all";
      const filtered = filterByTheme(savedTheme);
      if (filtered.length < neededWords(3)) {
        savedTheme = "all";
        bank = fullBank.slice();
      } else {
        activeTheme = savedTheme;
        bank = filtered;
        if (bank.length < neededWords(size)) {
          size = 3;
          try {
            localStorage.setItem(SIZE_KEY, "3");
          } catch {
            /* ignore */
          }
        }
      }
      renderThemeChips();
      buildRound();
    } catch {
      const err = $("bg-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

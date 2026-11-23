/**
 * Listen Match — TTS (ko-KR) → pick matching Korean phrase.
 * Soft UX: miss = nudge + retry; skip/reveal OK; no time fail.
 * Original beginner bank · Sunstage Play.
 */
(function () {
  const STR = {
    en: {
      eyebrow: "Listen Match",
      title: "Hear & match",
      lead: "Play the audio, then tap the matching Korean phrase. Soft practice — no harsh fails.",
      backGames: "← Games",
      backHub: "Hub",
      note: "Audio: device TTS (ko-KR). Wrong taps just nudge — skip or reveal anytime. Quality varies by browser.",
      listenPrompt: "Listen, then pick",
      play: "▶ Listen",
      slow: "Slow",
      stop: "Stop",
      tapHint: "Tap the phrase you heard →",
      skip: "Skip",
      reveal: "Give up",
      autoNext: "Auto-advance on correct",
      youPicked: "You picked",
      correctIs: "Correct",
      next: "Next →",
      retry: "Try again",
      great: "Nice!",
      almost: "Not quite — try again or reveal",
      revealed: "Answer shown",
      skipped: "Skipped",
      doneTitle: "Round complete",
      score: "{ok} correct · {skip} skipped · {miss} missed",
      restart: "Play again",
      loadFail: "Could not load listen-match bank.",
      noTts: "Voice not available on this device.",
      dash: "—",
      themeFilter: "Theme",
      themeAll: "All",
      themeEmpty: "No items in this theme.",
      theme_shopping: "Shopping",
      theme_cosmetics: "Cosmetics",
      theme_housing: "Housing",
      theme_cafe: "Cafe",
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
      theme_food: "Food",
      theme_transport: "Transport",
      theme_leisure: "Leisure",
      theme_banking: "Banking",
      theme_workplace: "Workplace",
      theme_intermediate: "Mid",
    },
    ko: {
      eyebrow: "듣기 짝맞추기",
      title: "듣고 고르기",
      lead: "음성을 듣고 맞는 한국어 문장/구를 탭하세요. 부드러운 연습 — 강한 처벌 없음.",
      backGames: "← 게임",
      backHub: "허브",
      note: "음성: 기기 TTS(ko-KR). 틀린 탭은 살짝 알림만 — 스킵·포기 언제든. 품질은 브라우저마다 다름.",
      listenPrompt: "듣고 고르기",
      play: "▶ 듣기",
      slow: "느리게",
      stop: "멈춤",
      tapHint: "들은 문장을 탭 →",
      skip: "스킵",
      reveal: "포기",
      autoNext: "정답이면 자동으로 다음",
      youPicked: "나의 선택",
      correctIs: "정답",
      next: "다음 →",
      retry: "다시 시도",
      great: "잘했어요!",
      almost: "아쉬워요 — 다시 듣거나 포기해도 돼요",
      revealed: "정답 공개",
      skipped: "스킵함",
      doneTitle: "한 판 끝",
      score: "정답 {ok} · 스킵 {skip} · 오답 {miss}",
      restart: "다시 하기",
      loadFail: "듣기 짝맞추기 뱅크를 불러오지 못했습니다.",
      noTts: "이 기기에서 음성을 쓸 수 없습니다.",
      dash: "—",
      themeFilter: "테마",
      themeAll: "전체",
      themeEmpty: "이 테마 문항이 없습니다.",
      theme_shopping: "쇼핑",
      theme_cosmetics: "화장품",
      theme_housing: "주거",
      theme_cafe: "카페",
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
      theme_food: "음식",
      theme_transport: "교통",
      theme_leisure: "여가",
      theme_banking: "은행",
      theme_workplace: "직장",
      theme_intermediate: "중급",
    },
    zh: {
      eyebrow: "听力配对",
      title: "听后选",
      lead: "播放音频，点选对应的韩语短句。轻量练习 — 无严惩。",
      backGames: "← 游戏",
      backHub: "中心",
      note: "音频：设备 TTS（ko-KR）。点错只轻提示 — 可随时跳过或放弃。质量因浏览器而异。",
      listenPrompt: "听完再选",
      play: "▶ 听",
      slow: "慢速",
      stop: "停止",
      tapHint: "点你听到的句子 →",
      skip: "跳过",
      reveal: "放弃",
      autoNext: "答对自动下一题",
      youPicked: "你的选择",
      correctIs: "正确答案",
      next: "下一题 →",
      retry: "再试",
      great: "很好！",
      almost: "再听听或放弃也行",
      revealed: "已显示答案",
      skipped: "已跳过",
      doneTitle: "本轮完成",
      score: "正确 {ok} · 跳过 {skip} · 错误 {miss}",
      restart: "再玩一次",
      loadFail: "无法加载听力配对题库。",
      noTts: "此设备无法朗读。",
      dash: "—",
      themeFilter: "主题",
      themeAll: "全部",
      themeEmpty: "该主题暂无题目。",
      theme_shopping: "购物",
      theme_cosmetics: "美妆",
      theme_housing: "居住",
      theme_cafe: "咖啡",
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
      theme_food: "饮食",
      theme_transport: "交通",
      theme_leisure: "休闲",
      theme_banking: "银行",
      theme_workplace: "职场",
      theme_intermediate: "中级",
    },
  };

  const BANK_URL = "../../data/games/listen-match-beginner.json";
  const AUTO_KEY = "jabi.games.listenMatch.autoNext";
  const THEME_KEY = "jabi.games.listenMatch.theme";
  const LETTERS = ["A", "B", "C", "D"];
  const THEME_ORDER = [
    "shopping",
    "cosmetics",
    "housing",
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

  let bankItems = [];
  let themeList = [];
  let activeTheme = "all";
  let items = [];
  let choiceCount = 4;
  let idx = 0;
  let stats = { ok: 0, miss: 0, skip: 0 };
  let checked = false;
  let itemResult = null;
  let selectedIdx = null;
  /** @type {{ id: string, text: string }[]} */
  let choicePool = [];
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
    document.querySelectorAll("[data-lm]").forEach((el) => {
      const key = el.getAttribute("data-lm");
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
    const box = $("lm-theme-chips");
    if (!box) return;
    box.innerHTML = "";
    const ids = ["all"].concat(themeList);
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lm-theme-chip" + (activeTheme === id ? " is-on" : "");
      btn.setAttribute("data-theme", id);
      btn.textContent = themeLabel(id);
      btn.addEventListener("click", () => setTheme(id));
      box.appendChild(btn);
    });
  }

  function renderItemTags(item) {
    const el = $("lm-item-tags");
    if (!el) return;
    el.innerHTML = "";
    if (!item || !Array.isArray(item.tags) || !item.tags.length) return;
    const known = themeList.length ? themeList : THEME_ORDER;
    item.tags
      .filter((tag) => known.includes(tag))
      .forEach((tag) => {
        const span = document.createElement("span");
        span.className = "lm-tag";
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
    items = shuffleInPlace(filtered.slice());
    renderThemeChips();
    const done = $("lm-done");
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

  function toast(msg) {
    const el = $("lm-error");
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

  function buildChoices(item) {
    const n = Math.min(choiceCount, bankItems.length);
    const distractors = shuffleInPlace(bankItems.filter((it) => it.id !== item.id).slice()).slice(0, n - 1);
    const pool = shuffleInPlace([{ id: item.id, text: item.text }, ...distractors.map((d) => ({ id: d.id, text: d.text }))]);
    return pool;
  }

  function updateProgress() {
    const total = items.length || 1;
    const text = $("lm-progress-text");
    const fill = $("lm-progress-fill");
    if (text) text.textContent = `${Math.min(idx + 1, total)} / ${total}`;
    if (fill) {
      const pct = Math.round((idx / total) * 100);
      fill.style.width = `${pct}%`;
    }
  }

  function autoNextOn() {
    const el = $("lm-auto-next");
    return el ? el.checked : true;
  }

  function renderChoices() {
    const box = $("lm-choices");
    if (!box) return;
    box.innerHTML = "";
    choicePool.forEach((ch, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lm-choice";
      btn.disabled = checked;
      btn.innerHTML = `<span class="lm-choice-letter" aria-hidden="true">${LETTERS[i] || i + 1}</span><span>${escapeHtml(ch.text)}</span>`;
      if (checked) {
        if (ch.id === current()?.id) btn.classList.add("is-reveal", "is-ok");
        if (selectedIdx === i && itemResult === "miss") btn.classList.add("is-bad", "is-picked");
        if (selectedIdx === i && itemResult === "ok") btn.classList.add("is-picked", "is-ok");
      }
      btn.addEventListener("click", () => onPick(i));
      box.appendChild(btn);
    });
  }

  function showFeedback(kind, statusText, yours, correct, explain) {
    const fb = $("lm-feedback");
    if (!fb) return;
    fb.classList.remove("hidden", "is-ok", "is-bad");
    if (kind === "ok") fb.classList.add("is-ok");
    else fb.classList.add("is-bad");
    const st = $("lm-feedback-status");
    if (st) st.textContent = statusText;
    const y = $("lm-yours");
    if (y) y.textContent = yours || s("dash");
    const c = $("lm-correct");
    if (c) c.textContent = correct || s("dash");
    const ex = $("lm-explain");
    if (ex) ex.textContent = explain || "";
    const retry = $("lm-retry");
    if (retry) retry.classList.toggle("hidden", kind === "ok" || itemResult === "skip" || itemResult === "reveal");
  }

  function hideFeedback() {
    const fb = $("lm-feedback");
    if (fb) fb.classList.add("hidden");
  }

  function showItem() {
    const item = current();
    const stage = document.querySelector(".lm-stage");
    const done = $("lm-done");
    hideFeedback();
    checked = false;
    itemResult = null;
    selectedIdx = null;

    if (!item) {
      if (stage) stage.classList.add("hidden");
      if (done) {
        done.classList.remove("hidden");
        const score = $("lm-score");
        if (score) {
          score.textContent = s("score")
            .replace("{ok}", String(stats.ok))
            .replace("{skip}", String(stats.skip))
            .replace("{miss}", String(stats.miss));
        }
      }
      const fill = $("lm-progress-fill");
      if (fill) fill.style.width = "100%";
      const text = $("lm-progress-text");
      if (text) text.textContent = `${items.length} / ${items.length}`;
      return;
    }

    if (stage) stage.classList.remove("hidden");
    if (done) done.classList.add("hidden");

    choicePool = buildChoices(item);
    const gloss = $("lm-gloss");
    if (gloss) gloss.textContent = pickGloss(item);
    renderItemTags(item);
    updateProgress();
    renderChoices();

    if (unlockedSpeak) {
      speak(item.text, 1);
    }
  }

  function finishItem(result) {
    checked = true;
    itemResult = result;
    stopSpeak();
    const item = current();
    if (!item) return;

    if (result === "ok") stats.ok += 1;
    else if (result === "skip") stats.skip += 1;
    else if (result === "reveal") stats.miss += 1;

    const yours =
      selectedIdx != null && choicePool[selectedIdx] ? choicePool[selectedIdx].text : s("dash");

    if (result === "ok") {
      showFeedback("ok", s("great"), yours, item.text, pickGloss(item));
      renderChoices();
      if (autoNextOn()) {
        clearTimeout(finishItem._t);
        finishItem._t = setTimeout(() => goNext(), 900);
      }
      return;
    }

    if (result === "skip") {
      showFeedback("bad", s("skipped"), s("dash"), item.text, pickGloss(item));
      renderChoices();
      return;
    }

    if (result === "reveal") {
      showFeedback("bad", s("revealed"), yours, item.text, pickGloss(item));
      renderChoices();
    }
  }

  function onPick(i) {
    if (checked) return;
    const item = current();
    if (!item) return;
    selectedIdx = i;
    const ch = choicePool[i];
    if (!ch) return;
    if (ch.id === item.id) {
      finishItem("ok");
    } else {
      // Soft miss: nudge only — no score punish; unlock retry
      checked = true;
      itemResult = "miss";
      const yours = ch.text;
      showFeedback("bad", s("almost"), yours, s("dash"), pickGloss(item));
      renderChoices();
      setTimeout(() => {
        if (itemResult === "miss") {
          checked = false;
          itemResult = null;
          selectedIdx = null;
          hideFeedback();
          renderChoices();
        }
      }, 1100);
    }
  }

  function goNext() {
    clearTimeout(finishItem._t);
    stopSpeak();
    idx += 1;
    showItem();
  }

  function skipItem() {
    if (checked && (itemResult === "ok" || itemResult === "skip" || itemResult === "reveal")) return;
    selectedIdx = null;
    finishItem("skip");
  }

  function revealItem() {
    if (checked && (itemResult === "ok" || itemResult === "skip" || itemResult === "reveal")) return;
    finishItem("reveal");
  }

  function retryItem() {
    clearTimeout(finishItem._t);
    if (itemResult === "ok") {
      // undo ok if somehow retrying
      stats.ok = Math.max(0, stats.ok - 1);
    } else if (itemResult === "skip") {
      stats.skip = Math.max(0, stats.skip - 1);
    } else if (itemResult === "reveal") {
      stats.miss = Math.max(0, stats.miss - 1);
    }
    checked = false;
    itemResult = null;
    selectedIdx = null;
    hideFeedback();
    renderChoices();
    const item = current();
    if (item) speak(item.text, 1);
  }

  function restart() {
    stopSpeak();
    idx = 0;
    stats = { ok: 0, miss: 0, skip: 0 };
    items = shuffleInPlace(filterByTheme(activeTheme));
    showItem();
  }

  function bind() {
    $("lm-play")?.addEventListener("click", () => {
      const item = current();
      if (item) speak(item.text, 1);
    });
    $("lm-slow")?.addEventListener("click", () => {
      const item = current();
      if (item) speak(item.text, 0.7);
    });
    $("lm-stop")?.addEventListener("click", stopSpeak);
    $("lm-skip")?.addEventListener("click", skipItem);
    $("lm-reveal")?.addEventListener("click", revealItem);
    $("lm-next")?.addEventListener("click", goNext);
    $("lm-retry")?.addEventListener("click", retryItem);
    $("lm-restart")?.addEventListener("click", restart);

    const auto = $("lm-auto-next");
    if (auto) {
      const saved = localStorage.getItem(AUTO_KEY);
      if (saved === "0") auto.checked = false;
      if (saved === "1") auto.checked = true;
      auto.addEventListener("change", () => {
        localStorage.setItem(AUTO_KEY, auto.checked ? "1" : "0");
      });
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyDic();
        const gloss = $("lm-gloss");
        const item = current();
        if (gloss && item) gloss.textContent = pickGloss(item);
        renderItemTags(item);
        if (checked && item) {
          const yours =
            selectedIdx != null && choicePool[selectedIdx] ? choicePool[selectedIdx].text : s("dash");
          const status =
            itemResult === "ok"
              ? s("great")
              : itemResult === "skip"
                ? s("skipped")
                : itemResult === "reveal"
                  ? s("revealed")
                  : s("almost");
          const kind = itemResult === "ok" ? "ok" : "bad";
          const correct = itemResult === "miss" ? s("dash") : item.text;
          showFeedback(kind, status, yours, correct, pickGloss(item));
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        const item = current();
        if (item && !checked) speak(item.text, 1);
        return;
      }
      const num = Number(e.key);
      if (num >= 1 && num <= choicePool.length && !checked) {
        e.preventDefault();
        onPick(num - 1);
      }
    });
  }

  async function boot() {
    applyDic();
    bind();
    try {
      await ensureVoices();
      const res = await fetch(BANK_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data.choiceCount >= 2 && data.choiceCount <= 6) choiceCount = data.choiceCount;
      bankItems = (data.items || []).filter((it) => it.id && it.text);
      if (bankItems.length < choiceCount) throw new Error("short bank");
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
      const err = $("lm-error");
      if (err) {
        err.textContent = s("loadFail");
        err.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

const LS_KEY = "topik-coach-v1";

function defaultState() {
  return {
    streak: 0,
    lastStudyDate: "",
    xp: 0,
    srs: {},
    attempts: [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(state) {
  const today = todayKey();
  if (state.lastStudyDate === today) return state;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
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
      state.srs[tag] = { count: 0, nextReview: todayKey(), ease: 2.5 };
    }
    state.srs[tag].count += 1;
    state.srs[tag].nextReview = todayKey();
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
  return window.HubI18n && HubI18n.getLang() === "ko" ? "ko" : "en";
}

const UI = {
  en: {
    back: "← Hub",
    streak: "Streak",
    xp: "XP",
    level: "Level",
    srsDue: "Weak spots",
    startMock: "Start reading mock",
    reviewSrs: "Review weak tags",
    noSrs: "No weak spots yet — take a mock.",
    finished: "Mock complete",
    score: "Score",
    added: "Added to weak-spot deck:",
    next: "Next",
    finish: "See results",
    srsTitle: "Your weak-spot tags (SRS v0)",
    days: "days",
  },
  ko: {
    back: "← 허브",
    streak: "스트릭",
    xp: "XP",
    level: "레벨",
    srsDue: "약점",
    startMock: "읽기 모의 시작",
    reviewSrs: "약점 태그 보기",
    noSrs: "아직 약점 없음 — 모의고사를 풀어보세요.",
    finished: "모의 완료",
    score: "점수",
    added: "약점 덱에 추가:",
    next: "다음",
    finish: "결과 보기",
    srsTitle: "약점 태그 (SRS v0)",
    days: "일",
  },
};

function ui(key) {
  const lang = getLang();
  return UI[lang][key] || UI.en[key];
}

let state = loadState();
let mock = null;
let qi = 0;
let wrongTags = [];
let wrongCount = 0;

async function loadMock() {
  const res = await fetch("./data/mock-read-01.json");
  mock = await res.json();
}

function renderHome() {
  document.getElementById("view-home").classList.remove("hidden");
  document.getElementById("view-quiz").classList.add("hidden");
  document.getElementById("view-result").classList.add("hidden");
  document.getElementById("view-srs").classList.add("hidden");

  document.getElementById("stat-streak").textContent = state.streak;
  document.getElementById("stat-xp").textContent = state.xp;
  document.getElementById("stat-level").textContent = levelFromXp(state.xp);
  const tags = Object.keys(state.srs);
  document.getElementById("stat-srs").textContent = tags.length;

  document.querySelectorAll("[data-ui]").forEach((el) => {
    const k = el.getAttribute("data-ui");
    if (k) el.textContent = ui(k);
  });
}

function renderQuestion() {
  const q = mock.questions[qi];
  const lang = getLang();
  document.getElementById("qnum").textContent = `${qi + 1} / ${mock.questions.length}`;
  document.getElementById("qtext").textContent = q.prompt[lang] || q.prompt.en;
  const box = document.getElementById("choices");
  box.innerHTML = "";
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.textContent = c;
    btn.addEventListener("click", () => pick(i, btn));
    box.appendChild(btn);
  });
}

function pick(index, btn) {
  const q = mock.questions[qi];
  const correct = index === q.answer;
  document.querySelectorAll(".choice").forEach((b) => {
    b.disabled = true;
  });
  if (correct) {
    btn.classList.add("correct");
    addXp(state, 10);
  } else {
    btn.classList.add("wrong");
    document.querySelectorAll(".choice")[q.answer].classList.add("correct");
    wrongCount += 1;
    wrongTags.push(...(q.tags || []));
  }
  setTimeout(() => {
    qi += 1;
    if (qi >= mock.questions.length) finishMock();
    else renderQuestion();
  }, 700);
}

function finishMock() {
  const total = mock.questions.length;
  const uniqueWrong = [...new Set(wrongTags)];
  addSrsTags(state, uniqueWrong);
  bumpStreak(state);
  addXp(state, 20);
  state.attempts.push({
    mockId: mock.id,
    at: new Date().toISOString(),
    wrong: uniqueWrong,
  });
  saveState(state);

  document.getElementById("view-quiz").classList.add("hidden");
  document.getElementById("view-result").classList.remove("hidden");
  const right = total - wrongCount;
  document.getElementById("result-score").textContent = `${right} / ${total} (${ui("added")} ${uniqueWrong.length} tags)`;
  document.getElementById("result-tags").textContent = uniqueWrong.join(", ") || "—";
}

function startMock() {
  qi = 0;
  wrongTags = [];
  wrongCount = 0;
  document.getElementById("view-home").classList.add("hidden");
  document.getElementById("view-result").classList.add("hidden");
  document.getElementById("view-quiz").classList.remove("hidden");
  renderQuestion();
}

function showSrs() {
  document.getElementById("view-home").classList.add("hidden");
  document.getElementById("view-srs").classList.remove("hidden");
  const ul = document.getElementById("srs-items");
  ul.innerHTML = "";
  const entries = Object.entries(state.srs);
  if (!entries.length) {
    const li = document.createElement("li");
    li.textContent = ui("noSrs");
    ul.appendChild(li);
    return;
  }
  entries.forEach(([tag, meta]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${tag}</strong> · misses ${meta.count} · review ${meta.nextReview}`;
    ul.appendChild(li);
  });
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2000);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadMock();
  renderHome();
  document.getElementById("btn-start").addEventListener("click", startMock);
  document.getElementById("btn-srs").addEventListener("click", showSrs);
  document.getElementById("btn-home").addEventListener("click", renderHome);
  document.getElementById("btn-home2").addEventListener("click", renderHome);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  const hash = location.hash;
  if (hash.startsWith("#deck=")) toast(`Deck hook: ${hash.slice(7)} (content coming soon)`);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("lang-btn")) {
    setTimeout(renderHome, 0);
  }
});

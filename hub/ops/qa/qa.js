const GATE_KEY = "jabi-qa-unlock";
const FB_KEY = "jabi-qa-feedback-v1";
const UNLOCK = "QA-PAUL";

const BANKS = [
  { file: "verified-read-01.json", path: "../../app/data/verified-read-01.json", skill: "reading" },
  { file: "verified-read-02.json", path: "../../app/data/verified-read-02.json", skill: "reading" },
  { file: "verified-read-03.json", path: "../../app/data/verified-read-03.json", skill: "reading" },
  { file: "verified-listen-01.json", path: "../../app/data/verified-listen-01.json", skill: "listening" },
];

const TARGETS = [
  { id: "prompt", ko: "지문/질문" },
  { id: "choices", ko: "보기" },
  { id: "answer", ko: "정답" },
  { id: "why", ko: "해설(why)" },
  { id: "hint", ko: "힌트 로직" },
  { id: "tags", ko: "태그" },
  { id: "script", ko: "듣기 대본" },
  { id: "other", ko: "기타" },
];

const REASONS = [
  { id: "wrong_answer", ko: "정답이 틀림" },
  { id: "bad_distractor", ko: "오답 보기 부적절" },
  { id: "ambiguous", ko: "애매함" },
  { id: "hint_too_strong", ko: "힌트가 답을 줌" },
  { id: "hint_useless", ko: "힌트 쓸모없음" },
  { id: "why_wrong", ko: "해설 오류" },
  { id: "why_too_hard", ko: "해설·힌트 너무 어려움" },
  { id: "tag_wrong", ko: "태그 부정확" },
  { id: "level_mismatch", ko: "난이도 부적합" },
  { id: "not_original_risk", ko: "원작 의심" },
  { id: "typo", ko: "오탈자" },
  { id: "audio_script_mismatch", ko: "음성·대본 불일치" },
  { id: "other", ko: "기타" },
];

let bankData = null;
let bankMeta = BANKS[0];
let qi = 0;
let selectedTargets = new Set();
let selectedReasons = new Set();

function uid() {
  return `qa_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadFeedback() {
  try {
    const raw = localStorage.getItem(FB_KEY);
    if (!raw) return { version: 1, items: [] };
    const parsed = JSON.parse(raw);
    return { version: 1, items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { version: 1, items: [] };
  }
}

function saveFeedback(bundle) {
  localStorage.setItem(FB_KEY, JSON.stringify(bundle));
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2000);
}

function unlocked() {
  return sessionStorage.getItem(GATE_KEY) === "1" || localStorage.getItem(GATE_KEY) === "1";
}

function setUnlocked(on) {
  if (on) {
    sessionStorage.setItem(GATE_KEY, "1");
    localStorage.setItem(GATE_KEY, "1");
  }
}

function showGate() {
  document.getElementById("view-gate")?.classList.remove("hidden");
  document.getElementById("view-qa")?.classList.add("hidden");
}

function showQa() {
  document.getElementById("view-gate")?.classList.add("hidden");
  document.getElementById("view-qa")?.classList.remove("hidden");
}

function renderChips(containerId, defs, selectedSet) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = "";
  defs.forEach((d) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (selectedSet.has(d.id) ? " on" : "");
    btn.textContent = d.ko;
    btn.addEventListener("click", () => {
      if (selectedSet.has(d.id)) selectedSet.delete(d.id);
      else selectedSet.add(d.id);
      renderChips(containerId, defs, selectedSet);
    });
    box.appendChild(btn);
  });
}

function updateStatus() {
  const n = loadFeedback().items.length;
  const el = document.getElementById("qa-status");
  if (el) el.textContent = `로컬 피드백 ${n}건 · 스키마 hub/ops/qa/feedback.schema.json · 내보내기 후 Cursor/Claude에 전달`;
}

async function loadBank(meta) {
  bankMeta = meta;
  const res = await fetch(meta.path);
  if (!res.ok) throw new Error("bank fetch failed");
  bankData = await res.json();
  qi = 0;
  renderQuestion();
}

function currentQ() {
  return bankData?.questions?.[qi] || null;
}

function renderQuestion() {
  const q = currentQ();
  const total = bankData?.questions?.length || 0;
  if (!q) return;
  selectedTargets = new Set();
  selectedReasons = new Set();
  renderChips("chips-target", TARGETS, selectedTargets);
  renderChips("chips-reason", REASONS, selectedReasons);
  document.getElementById("qa-note").value = "";

  document.getElementById("qa-progress").textContent = `${qi + 1} / ${total}`;
  document.getElementById("qa-qnum").textContent = `${qi + 1} / ${total} · ${q.id || "?"}`;
  const prompt = q.prompt?.ko || q.prompt?.en || "";
  document.getElementById("qa-prompt").textContent = prompt;
  document.getElementById("qa-meta").textContent = `tags: ${(q.tags || []).join(", ") || "—"} · answer index ${q.answer}`;

  function fieldLang(field) {
    if (!field) return { ko: "", en: "", zh: "" };
    if (typeof field === "string") return { ko: field, en: "", zh: "" };
    return { ko: field.ko || "", en: field.en || "", zh: field.zh || "" };
  }
  const hint = fieldLang(q.hint);
  const why = fieldLang(q.why);
  const vis = q.hint?.visual;
  let visLabel = "(skip / none)";
  if (vis?.skip) visLabel = "skip (abstract)";
  else if (vis?.kind === "size-compare") visLabel = `size-compare (${vis.en || "big"})`;
  else if (vis?.img) visLabel = `img: ${vis.img}`;
  else if (vis?.emoji) visLabel = `${vis.emoji.join(" ")} · ${vis.en || ""}`;
  const whyEl = document.getElementById("qa-why");
  whyEl.innerHTML = "";
  const parts = [];
  parts.push(`<div class="qa-bi"><strong>visual</strong> ${esc(visLabel)} · <strong>distractOrder</strong> ${esc(JSON.stringify(q.distractOrder || []))}</div>`);
  if (q.distractWhy) {
    const lines = Object.keys(q.distractWhy)
      .sort()
      .map((k) => {
        const c = q.choices?.[Number(k)] || k;
        const t = q.distractWhy[k];
        return `<strong>${esc(c)}</strong> — ${esc(t.en || t.ko || "")}`;
      });
    parts.push(`<div class="qa-bi"><strong>distractWhy</strong><br>${lines.join("<br>")}</div>`);
  }
  parts.push(
    `<div class="qa-bi"><strong>hint EN</strong> ${esc(hint.en) || "—"}<br><strong>hint ZH</strong> ${esc(hint.zh) || "—"}<br><strong>hint KO</strong> ${esc(hint.ko) || "—"}</div>`
  );
  parts.push(
    `<div class="qa-bi"><strong>why EN</strong> ${esc(why.en) || "—"}<br><strong>why ZH</strong> ${esc(why.zh) || "—"}<br><strong>why KO</strong> ${esc(why.ko) || "—"}</div>`
  );
  whyEl.innerHTML = parts.join("");
  whyEl.classList.remove("hidden");

  const scriptEl = document.getElementById("qa-script");
  if (q.script?.ko) {
    scriptEl.textContent = `script:\n${q.script.ko}`;
    scriptEl.classList.remove("hidden");
  } else {
    scriptEl.textContent = "";
    scriptEl.classList.add("hidden");
  }

  const box = document.getElementById("qa-choices");
  box.innerHTML = "";
  (q.choices || []).forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "choice" + (i === q.answer ? " correct-key" : "");
    div.textContent = `${i}. ${c}`;
    box.appendChild(div);
  });
  updateStatus();
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function nextQ() {
  const total = bankData?.questions?.length || 0;
  if (qi + 1 >= total) {
    toast("세트 끝 — 다른 뱅크를 고르거나 내보내기");
    return;
  }
  qi += 1;
  renderQuestion();
}

function prevQ() {
  if (qi <= 0) return;
  qi -= 1;
  renderQuestion();
}

function flagCurrent(okOnly) {
  const q = currentQ();
  if (!q) return;
  if (!okOnly) {
    if (!selectedTargets.size || !selectedReasons.size) {
      toast("대상과 이유를 하나 이상 고르세요");
      return;
    }
    const bundle = loadFeedback();
    bundle.items.push({
      id: uid(),
      at: new Date().toISOString(),
      bankFile: bankMeta.file,
      questionId: q.id,
      skill: bankMeta.skill,
      targets: [...selectedTargets],
      reasons: [...selectedReasons],
      note: (document.getElementById("qa-note")?.value || "").trim(),
      snapshot: {
        prompt: q.prompt,
        choices: q.choices,
        answer: q.answer,
        answerText: q.answerText,
        tags: q.tags,
        why: q.why,
        script: q.script || null,
        type: q.type,
      },
    });
    saveFeedback(bundle);
    toast("표시 저장");
  }
  nextQ();
}

function exportFeedback() {
  const bundle = loadFeedback();
  bundle.exportedAt = new Date().toISOString();
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `jabi-qa-feedback-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  navigator.clipboard?.writeText(JSON.stringify(bundle, null, 2)).then(
    () => toast("다운로드 + 클립보드 복사"),
    () => toast("다운로드 완료")
  );
}

function clearFeedback() {
  if (!confirm("로컬 피드백을 모두 지울까요?")) return;
  saveFeedback({ version: 1, items: [] });
  updateStatus();
  toast("비움");
}

document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("qa-bank");
  BANKS.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.file;
    opt.textContent = `${b.file} (${b.skill})`;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", async () => {
    const meta = BANKS.find((b) => b.file === sel.value) || BANKS[0];
    try {
      await loadBank(meta);
    } catch {
      toast("뱅크 로드 실패");
    }
  });

  document.getElementById("btn-gate")?.addEventListener("click", () => {
    const code = (document.getElementById("gate-code")?.value || "").trim();
    if (code === UNLOCK) {
      setUnlocked(true);
      showQa();
      loadBank(BANKS[0]).catch(() => toast("뱅크 로드 실패"));
    } else {
      toast("코드 불일치");
    }
  });

  document.getElementById("btn-flag")?.addEventListener("click", () => flagCurrent(false));
  document.getElementById("btn-ok")?.addEventListener("click", () => flagCurrent(true));
  document.getElementById("btn-prev")?.addEventListener("click", prevQ);
  document.getElementById("btn-export")?.addEventListener("click", exportFeedback);
  document.getElementById("btn-clear")?.addEventListener("click", clearFeedback);

  if (unlocked()) {
    showQa();
    loadBank(BANKS[0]).catch(() => toast("뱅크 로드 실패"));
  } else {
    showGate();
  }
});

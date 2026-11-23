/** Basic track — unit list + lesson notes + MCQ pilot player (no TOPIK app.js). */
(function () {
  const MANIFEST_URL = "../data/basic/track-manifest.json";
  const TRACK = "basic";

  let trackCache = null;
  let playerState = { unit: null, bank: null, index: 0, locked: false, correct: 0 };
  let xpGainTimer = null;

  function progressApi() {
    return window.JabiPathProgress || null;
  }

  function mountPartnerSector() {
    const api = window.JabiPartnerSector;
    if (!api) return;
    api.mount({
      track: TRACK,
      artBase: "../assets/chars",
      t,
      lang,
      els: {
        pick: "#basic-partner-pick",
        grid: "#basic-jamo-grid",
        pickEyebrow: "#basic-partner-pick-eyebrow",
        pickTitle: "#basic-partner-pick-title",
        pickLead: "#basic-partner-pick-lead",
        growth: "#basic-growth",
        glyph: "#basic-partner-glyph",
        name: "#basic-partner-name",
        stage: "#basic-partner-stage",
        pill: "#basic-partner-pill",
        xpLabel: "#basic-partner-xp-label",
        xpBar: "#basic-partner-xp-bar",
        xpFill: "#basic-partner-xp-fill",
        xpHint: "#basic-partner-xp-hint",
        chips: "#basic-partner-chips",
      },
      hideWhilePicking: ["#basic-list", ".basic-nav", "#basic-xp", "#basic-player"],
      onPicked: () => renderXpHud(0),
    });
  }

  function refreshPartnerGrowth() {
    window.JabiPartnerSector?.refresh?.(TRACK);
  }

  function renderXpHud(flashGain) {
    const el = document.getElementById("basic-xp");
    const api = progressApi();
    if (!el || !api) return;
    const xp = api.getXp(TRACK);
    const done = api.doneCount(TRACK);
    const total = (trackCache?.units || []).length;
    let text = t("basicXpLine", "{xp} XP · {done}/{total} skills")
      .replace("{xp}", String(xp))
      .replace("{done}", String(done))
      .replace("{total}", String(total || "—"));
    if (flashGain && flashGain > 0) {
      text += ` <span class="path-xp-gain">+${flashGain}</span>`;
    }
    el.innerHTML = text;
    if (flashGain && flashGain > 0) {
      clearTimeout(xpGainTimer);
      xpGainTimer = setTimeout(() => renderXpHud(0), 1200);
    }
  }

  function crownsHtml(n) {
    const on = Math.max(0, Math.min(3, n | 0));
    const marks = [0, 1, 2]
      .map((i) => `<i class="skill-crown${i < on ? " is-on" : ""}"></i>`)
      .join("");
    return `<span class="skill-crowns" aria-hidden="true">${marks}</span>`;
  }

  function paintSkillNode(node, done, crowns) {
    if (!node) return;
    node.classList.toggle("is-complete", done);
    if (done && crowns > 0) {
      node.dataset.crowns = String(crowns);
      let row = node.querySelector(".skill-crowns");
      if (!row) {
        node.insertAdjacentHTML("beforeend", crownsHtml(crowns));
      } else {
        row.querySelectorAll(".skill-crown").forEach((el, i) => {
          el.classList.toggle("is-on", i < crowns);
        });
      }
    } else {
      delete node.dataset.crowns;
      node.querySelector(".skill-crowns")?.remove();
    }
  }

  function doneBadgeHtml(crowns) {
    if (crowns >= 3) {
      return `<span class="basic-badge basic-badge--crowns">${escapeHtml(
        t("basicBadgeCrownsMax", "★★★")
      )}</span>`;
    }
    if (crowns >= 1) {
      return `<span class="basic-badge basic-badge--retry">${escapeHtml(
        t("basicBadgeRetry", "retry")
      )}</span>`;
    }
    return `<span class="basic-badge basic-badge--done">${escapeHtml(
      t("basicBadgeDone", "done")
    )}</span>`;
  }

  function practiceBadgeHtml() {
    return `<span class="basic-badge basic-badge--practice">${escapeHtml(
      t("basicBadgePractice", "practice")
    )}</span>`;
  }

  function unitHasPractice(unit) {
    return (
      !!unit?.bankFile &&
      (unit.questionCount || 0) > 0 &&
      ["pilot", "draft", "ready"].includes(unit.status || "")
    );
  }

  function applyUnitComplete(unitId) {
    const api = progressApi();
    if (!api || !unitId) return null;
    const result = api.completeSkill(TRACK, unitId);
    const totalGain = (result.gained || 0) + (result.crownXp || 0);
    renderXpHud(totalGain);
    refreshPartnerGrowth();
    refreshPathNodes();
    return result;
  }

  function refreshPathNodes() {
    const api = progressApi();
    const list = document.getElementById("basic-list");
    if (!api || !list) return;
    list.querySelectorAll(".basic-item[data-id]").forEach((card) => {
      const id = card.dataset.id;
      const li = card.closest("li");
      const node = li?.querySelector(".skill-node");
      const done = api.isDone(TRACK, id);
      const crowns = api.getCrowns?.(TRACK, id) || (done ? 1 : 0);
      paintSkillNode(node, done, crowns);
      card.classList.toggle("is-skill-done", done);
      const top = card.querySelector(".basic-item-top");
      if (top && done) {
        let badge = top.querySelector(".basic-badge");
        if (!badge) {
          badge = document.createElement("span");
          top.appendChild(badge);
        }
        const wrap = document.createElement("div");
        wrap.innerHTML = doneBadgeHtml(crowns);
        const next = wrap.firstElementChild;
        badge.className = next.className;
        badge.textContent = next.textContent;
      }
    });
  }

  function lang() {
    return window.HubI18n?.getLang?.() || localStorage.getItem("topik-coach-lang") || "en";
  }

  function pick(obj) {
    if (!obj || typeof obj !== "object") return "";
    const L = lang();
    return obj[L] || obj.en || obj.ko || "";
  }

  function t(key, fallback) {
    const v = window.HubI18n?.t?.(key);
    if (v && v !== key) return v;
    return fallback || key;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function loadBank(relPath) {
    if (!relPath) return null;
    const url = new URL(relPath, new URL(MANIFEST_URL, location.href));
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`bank HTTP ${res.status}`);
    return res.json();
  }

  function playerEls() {
    return {
      root: document.getElementById("basic-player"),
      title: document.getElementById("basic-player-title"),
      meta: document.getElementById("basic-player-meta"),
      prompt: document.getElementById("basic-player-prompt"),
      choices: document.getElementById("basic-player-choices"),
      feedback: document.getElementById("basic-player-feedback"),
      next: document.getElementById("basic-player-next"),
      close: document.getElementById("basic-player-close"),
    };
  }

  function showPlayer(show) {
    const { root } = playerEls();
    if (!root) return;
    root.hidden = !show;
    root.classList.toggle("hidden", !show);
    if (show) root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderPlayerQuestion() {
    const { bank, index } = playerState;
    const els = playerEls();
    if (!bank?.questions?.length || !els.prompt || !els.choices) return;

    const q = bank.questions[index];
    const total = bank.questions.length;
    playerState.locked = false;

    if (els.title) els.title.textContent = pick(bank.title) || pick(playerState.unit?.title) || t("basicPilotTitle", "Basics pilot");
    if (els.meta) {
      els.meta.textContent = `${index + 1} / ${total} · ${q.id || ""} · ${t("basicMcqHint", "Pick one answer")}`;
    }
    els.prompt.textContent = pick(q.prompt);

    const choices = Array.isArray(q.choices) ? q.choices : [];
    els.choices.innerHTML = choices
      .map(
        (c, i) =>
          `<button type="button" class="basic-choice" data-choice="${i}">${escapeHtml(c)}</button>`
      )
      .join("");

    els.choices.querySelectorAll(".basic-choice").forEach((btn) => {
      btn.addEventListener("click", () => onChoose(Number(btn.dataset.choice)));
    });

    if (els.feedback) {
      els.feedback.hidden = true;
      els.feedback.className = "basic-feedback";
      els.feedback.innerHTML = "";
    }
    if (els.next) els.next.hidden = true;
  }

  function onChoose(choiceIndex) {
    const { bank, index } = playerState;
    const els = playerEls();
    if (playerState.locked || !bank?.questions?.[index] || !els.feedback) return;

    const q = bank.questions[index];
    const ok = choiceIndex === q.answer;
    playerState.locked = true;
    if (ok) playerState.correct = (playerState.correct || 0) + 1;

    els.choices?.querySelectorAll(".basic-choice").forEach((btn) => {
      const i = Number(btn.dataset.choice);
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("is-correct");
      if (i === choiceIndex && !ok) btn.classList.add("is-wrong");
    });

    const why = pick(q.why);
    let tip = "";
    if (!ok && q.distractWhy?.[String(choiceIndex)]) {
      tip = pick(q.distractWhy[String(choiceIndex)]);
    } else if (!ok) {
      tip = pick(q.hint) || "";
    }

    els.feedback.hidden = false;
    els.feedback.className = `basic-feedback ${ok ? "is-ok" : "is-no"}`;
    els.feedback.innerHTML = `
      <p class="basic-feedback-verdict">${escapeHtml(
        ok ? t("basicCorrect", "Correct") : t("basicIncorrect", "Not quite")
      )}</p>
      ${
        !ok
          ? `<p class="basic-model"><span class="k">${escapeHtml(t("basicAnswer", "Answer"))}</span> ${escapeHtml(
              q.answerText || q.choices?.[q.answer] || ""
            )}</p>`
          : ""
      }
      ${tip ? `<p class="basic-tip">${escapeHtml(tip)}</p>` : ""}
      ${
        why
          ? `<p class="basic-why"><span class="k">${escapeHtml(
              t("basicGrammarWhy", "Grammar")
            )}</span> ${escapeHtml(why)}</p>`
          : ""
      }`;

    if (els.next) {
      els.next.hidden = false;
      els.next.textContent =
        index + 1 < bank.questions.length
          ? t("basicNextQ", "Next item →")
          : t("basicDonePilot", "Done — close");
    }
  }

  function onNext() {
    const { bank, index, unit } = playerState;
    if (!bank?.questions?.length) return;
    if (index + 1 < bank.questions.length) {
      playerState.index = index + 1;
      renderPlayerQuestion();
    } else {
      if (unit?.id) applyUnitComplete(unit.id);
      showPlayer(false);
    }
  }

  function openPlayer(unit, bank) {
    playerState = { unit, bank, index: 0, locked: false, correct: 0 };
    showPlayer(true);
    renderPlayerQuestion();
  }

  function renderPhrases(bank) {
    const phrases = bank?.phrases;
    if (!Array.isArray(phrases) || !phrases.length) return "";
    const items = phrases
      .map((p) => {
        const gloss = pick(p.gloss);
        return `<li><strong>${escapeHtml(p.ko || "")}</strong>${
          gloss ? ` · ${escapeHtml(gloss)}` : ""
        }</li>`;
      })
      .join("");
    return `
      <p class="k">${escapeHtml(t("basicPhrases", "Key phrases"))}</p>
      <ul class="basic-phrases">${items}</ul>`;
  }

  function renderDialogue(bank) {
    const d = bank?.dialogue;
    if (!d?.lines?.length) return "";
    const title = pick(d.title) || t("basicDialogue", "Dialogue");
    const lines = d.lines
      .map(
        (ln) =>
          `<li><span class="basic-who">${escapeHtml(ln.who || "")}</span> ${escapeHtml(ln.ko || "")}</li>`
      )
      .join("");
    return `
      <p class="k">${escapeHtml(title)}</p>
      <ol class="basic-dialogue">${lines}</ol>`;
  }

  function renderSteps(bank) {
    const steps = bank?.steps;
    if (!Array.isArray(steps) || !steps.length) return "";
    const items = steps
      .map(
        (s) =>
          `<li><strong>${escapeHtml(pick(s.title) || s.id || "")}</strong> — ${escapeHtml(
            pick(s.body) || ""
          )}</li>`
      )
      .join("");
    return `
      <p class="k">${escapeHtml(t("basicSteps", "Skill steps"))}</p>
      <ol class="basic-steps">${items}</ol>`;
  }

  function renderGrammarCards(bank) {
    const cards = bank?.grammarCards;
    if (!Array.isArray(cards) || !cards.length) return "";
    const blocks = cards
      .map((card) => {
        const title = pick(card.title) || card.id || "";
        const body = pick(card.body) || "";
        const trap = pick(card.trap) || "";
        const contrast = card.kind === "contrast" || !!card.contrast;
        const ex = Array.isArray(card.examples) ? card.examples : [];
        const related = Array.isArray(card.related) ? card.related : [];
        const exRows = ex
          .map((it) => {
            const gloss = pick(it.gloss) || it.en || "";
            return `<li class="basic-grammar-ex"><span class="basic-grammar-ko">${escapeHtml(
              it.ko || ""
            )}</span>${gloss ? `<span class="basic-grammar-gloss">${escapeHtml(gloss)}</span>` : ""}</li>`;
          })
          .join("");
        const trapRow = trap
          ? `<p class="basic-grammar-trap"><span class="basic-grammar-trap-label">${escapeHtml(
              t("basicGrammarTrap", "Watch out")
            )}</span> ${escapeHtml(trap)}</p>`
          : "";
        const relatedRow = related.length
          ? `<p class="basic-grammar-related">${related
              .map((r) => {
                const href = r.href || "";
                const label = pick(r.label) || href;
                if (!href) return "";
                return `<a class="basic-grammar-link" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
              })
              .filter(Boolean)
              .join(" · ")}</p>`
          : "";
        return `<article class="basic-grammar-card${contrast ? " is-contrast" : ""}">
          <p class="basic-grammar-card-title">${escapeHtml(title)}</p>
          <p class="basic-grammar-card-body">${escapeHtml(body)}</p>
          ${exRows ? `<ul class="basic-grammar-ex-list">${exRows}</ul>` : ""}
          ${trapRow}
          ${relatedRow}
        </article>`;
      })
      .join("");
    return `
      <p class="k basic-grammar-k">${escapeHtml(t("basicGrammar", "Grammar"))}</p>
      <div class="basic-grammar-grid">${blocks}</div>`;
  }

  function renderDetail(unit, bank) {
    const objective = pick(unit.objective) || pick(bank?.objective) || "";
    const explain = pick(bank?.explain) || "";
    const qCount = bank?.questions?.length ?? unit.questionCount ?? 0;

    const canPractice =
      ["pilot", "draft", "ready"].includes(unit.status) && bank?.questions?.length;
    const already = progressApi()?.isDone(TRACK, unit.id);
    const crownsNow = progressApi()?.getCrowns?.(TRACK, unit.id) || (already ? 1 : 0);
    const practiceLabel = already
      ? t("basicRetryPractice", "Retry →")
      : t("basicStartPractice", "Practice dialogue →");
    const practiceBtn = canPractice
      ? `<button type="button" class="basic-practice-btn" data-practice="${escapeHtml(unit.id)}">${escapeHtml(
          practiceLabel
        )}</button>`
      : `<p class="basic-empty" style="margin-top:10px">${escapeHtml(
          t("basicQuizLater", "Quiz player not wired for this unit yet.")
        )}</p>`;

    const practiceMeta = canPractice
      ? `<p class="basic-practice-meta">${escapeHtml(
          t("basicPracticeCount", "{n} practice questions").replace("{n}", String(qCount))
        )}</p>`
      : "";

    const crownTip =
      already && crownsNow > 0 && crownsNow < 3
        ? `<p class="basic-empty" style="margin-top:8px">${escapeHtml(
            t("basicCrownHint", "Retry practice to earn another crown (+3 XP, max 3).")
          )}</p>`
        : "";

    return `
      <div class="basic-detail">
        <p class="hangul-flow">${escapeHtml(
          t("basicFlow", "Path: Intro → Teach → Dialogue → Practice → Checkpoint")
        )}</p>
        ${
          objective
            ? `<p class="k">${escapeHtml(t("basicObjective", "Objective"))}</p><p class="basic-objective">${escapeHtml(
                objective
              )}</p>`
            : ""
        }
        ${renderGrammarCards(bank)}
        ${
          explain
            ? `<p class="k basic-grammar-k">${escapeHtml(
                t("basicExplain", "Grammar note")
              )}</p><p class="basic-explain">${escapeHtml(explain)}</p>`
            : ""
        }
        ${renderSteps(bank)}
        ${renderDialogue(bank)}
        ${renderPhrases(bank)}
        ${practiceMeta}
        ${practiceBtn}
        ${crownTip}
      </div>`;
  }

  function previewText(unit) {
    if (["pilot", "draft", "ready"].includes(unit.status) && (unit.questionCount || 0) > 0) {
      return `${unit.questionCount || 0} Q`;
    }
    if (unit.objective) {
      return pick(unit.objective);
    }
    return t("basicPlanned", "Planned — no content yet");
  }

  function renderList(track) {
    const list = document.getElementById("basic-list");
    const title = document.getElementById("basic-title");
    const lead = document.getElementById("basic-lead");
    const meta = document.getElementById("basic-meta");
    if (!list) return;

    if (title) title.textContent = pick(track.title);
    if (lead) lead.textContent = pick(track.lead);
    if (meta) {
      const units = track.units || [];
      /* Learner-facing meta only — no track.id / status watermark (cf. Hangul path). */
      const filled = units.filter((u) => unitHasPractice(u)).length;
      meta.textContent = `v${track.version} · ${units.length} skills · ${t(
        "basicMetaPractice",
        "{n} with practice"
      ).replace("{n}", String(filled))}`;
    }

    const api = progressApi();

    list.classList.add("skill-path");
    list.innerHTML = "";
    (track.units || []).forEach((unit) => {
      const li = document.createElement("li");
      const node = document.createElement("div");
      const done = api?.isDone(TRACK, unit.id);
      const crowns = api?.getCrowns?.(TRACK, unit.id) || (done ? 1 : 0);
      /* Visual kind only — never stamp raw status (pilot/draft) into learner chrome. */
      node.className = `skill-node skill-node--dialogue${done ? " is-complete" : ""}`;
      node.textContent = unit.pathLabel || String(unit.order ?? "").padStart(2, "0");
      node.setAttribute("aria-hidden", "true");
      paintSkillNode(node, done, crowns);

      const wrap = document.createElement("div");
      wrap.className = "skill-card";

      const card = document.createElement("div");
      card.className = `basic-item${done ? " is-skill-done" : ""}`;
      card.dataset.id = unit.id;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "basic-item-toggle";
      /* Badge: done/crowns, or practice when bank exists — never pilot/ready/scaffold. */
      let statusBadge = "";
      if (done) {
        statusBadge = doneBadgeHtml(crowns);
      } else if (unitHasPractice(unit)) {
        statusBadge = practiceBadgeHtml();
      }
      toggle.innerHTML = `
        <div class="basic-item-top">
          <span class="basic-item-title">${escapeHtml(pick(unit.title))}</span>
          ${statusBadge}
        </div>
        <div class="basic-preview">${escapeHtml(previewText(unit))}</div>`;

      const slot = document.createElement("div");
      slot.className = "basic-detail-slot";
      slot.hidden = true;

      toggle.addEventListener("click", async () => {
        const open = card.classList.contains("is-open");
        list.querySelectorAll(".basic-item").forEach((el) => {
          el.classList.remove("is-open");
          const s = el.querySelector(".basic-detail-slot");
          if (s) {
            s.hidden = true;
            s.innerHTML = "";
          }
        });
        if (!open) {
          card.classList.add("is-open");
          slot.hidden = false;
          slot.innerHTML = `<p class="basic-empty">${escapeHtml(t("basicLoading", "Loading…"))}</p>`;
          try {
            const bank = unit.bankFile ? await loadBank(unit.bankFile) : null;
            slot.innerHTML = renderDetail(unit, bank);
            const practice = slot.querySelector("[data-practice]");
            if (practice && bank) {
              practice.addEventListener("click", (e) => {
                e.stopPropagation();
                openPlayer(unit, bank);
              });
            }
          } catch (err) {
            console.error(err);
            slot.innerHTML = `<p class="basic-error">${escapeHtml(
              t("basicBankError", "Could not load pilot bank JSON.")
            )}</p>`;
          }
        }
      });

      card.appendChild(toggle);
      card.appendChild(slot);
      wrap.appendChild(card);
      li.appendChild(node);
      li.appendChild(wrap);
      list.appendChild(li);
    });

    renderXpHud(0);
  }

  function bindPlayerChrome() {
    const els = playerEls();
    els.next?.addEventListener("click", onNext);
    els.close?.addEventListener("click", () => showPlayer(false));
  }

  async function boot() {
    const errEl = document.getElementById("basic-error");
    try {
      mountPartnerSector();
      const res = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackCache = await res.json();
      renderList(trackCache);
      window.JabiPartnerSector?.gate?.(TRACK);
      if (errEl) errEl.classList.add("hidden");
    } catch (e) {
      console.error(e);
      if (errEl) {
        errEl.classList.remove("hidden");
        errEl.textContent = t(
          "basicLoadError",
          "Could not load basic track manifest. Serve hub/ over http (not file://)."
        );
      }
    }
  }

  window.HubI18nExtra = {
    en: {
      basicEyebrow: "Basics skill path",
      basicBackHub: "← Hub",
      basicBackHangul: "Hangul →",
      basicBackTopik2: "TOPIK II →",
      basicBackTopik: "TOPIK I app →",
      basicTheme: "Theme",
      basicBank: "Unit bank",
      basicQuestions: "Questions",
      basicObjective: "Objective",
      basicExplain: "Grammar note",
      basicGrammar: "Grammar",
      basicGrammarTrap: "Watch out",
      basicGrammarWhy: "Grammar",
      basicPhrases: "Key phrases",
      basicDialogue: "Dialogue",
      basicSteps: "Skill steps",
      basicFlow: "Path: Intro → Teach → Dialogue → Practice → Checkpoint",
      basicNoBank: "No question bank yet (planned).",
      basicPlanned: "Planned — no content yet",
      basicPilot: "pilot",
      basicLoading: "Loading…",
      basicBankError: "Could not load pilot bank JSON.",
      basicQuizLater: "Quiz player not wired for this unit yet.",
      basicLoadError: "Could not load basic track manifest. Serve hub/ over http (not file://).",
      basicStartPractice: "Practice dialogue →",
      basicPilotTitle: "Basics pilot",
      basicMcqHint: "Pick one answer",
      basicCorrect: "Correct",
      basicIncorrect: "Not quite",
      basicAnswer: "Answer",
      basicNextQ: "Next item →",
      basicDonePilot: "Done — close",
      basicClose: "Close",
      basicPlayerHint: "Choose the best reply to complete the dialogue.",
      basicXpLine: "{xp} XP · {done}/{total} skills",
      basicBadgeDone: "done",
      basicBadgeRetry: "retry",
      basicBadgeCrownsMax: "★★★",
      basicBadgePractice: "practice",
      basicMetaPractice: "{n} with practice",
      basicRetryPractice: "Retry →",
      basicXpGain: "+{n} XP — skill complete",
      basicPracticeCount: "{n} practice questions",
      basicCrownHint: "Retry practice to earn another crown (+3 XP, max 3).",
      partnerEyebrow: "Partner",
      partnerTitle: "Choose your jamo",
      partnerLead: "One partner for Basics. ㅈ is jabi. (guide) — not a partner.",
      partnerStageLabel: "Stage {n} · {name}",
      partnerXpMax: "Max stage",
      partnerXpToNext: "{remain} XP → stage {n}",
    },
    ko: {
      basicEyebrow: "기초 스킬 패스",
      basicBackHub: "← 허브",
      basicBackHangul: "한글 →",
      basicBackTopik2: "TOPIK II →",
      basicBackTopik: "TOPIK I 앱 →",
      basicTheme: "주제",
      basicBank: "단원 뱅크",
      basicQuestions: "문항",
      basicObjective: "목표",
      basicExplain: "문법 노트",
      basicGrammar: "문법",
      basicGrammarTrap: "함정",
      basicGrammarWhy: "문법",
      basicPhrases: "핵심 표현",
      basicDialogue: "대화",
      basicSteps: "스킬 단계",
      basicFlow: "경로: 소개 → 배우기 → 대화 → 연습 → 체크포인트",
      basicNoBank: "아직 문제 뱅크 없음 (예정).",
      basicPlanned: "예정 — 콘텐츠 없음",
      basicPilot: "파일럿",
      basicLoading: "불러오는 중…",
      basicBankError: "파일럿 뱅크 JSON을 불러오지 못했습니다.",
      basicQuizLater: "이 단원은 퀴즈 플레이어 미연결.",
      basicLoadError: "기초 트랙 매니페스트를 불러오지 못했습니다. hub/를 http로 여세요.",
      basicStartPractice: "대화 연습하기 →",
      basicPilotTitle: "기초 파일럿",
      basicMcqHint: "하나를 고르세요",
      basicCorrect: "정답",
      basicIncorrect: "아쉬워요",
      basicAnswer: "정답",
      basicNextQ: "다음 문항 →",
      basicDonePilot: "완료 — 닫기",
      basicClose: "닫기",
      basicPlayerHint: "대화를 완성하는 가장 알맞은 답을 고르세요.",
      basicXpLine: "{xp} XP · 스킬 {done}/{total}",
      basicBadgeDone: "완료",
      basicBadgeRetry: "다시 도전",
      basicBadgeCrownsMax: "★★★",
      basicBadgePractice: "연습",
      basicMetaPractice: "연습 {n}개",
      basicRetryPractice: "다시 도전 →",
      basicXpGain: "+{n} XP — 스킬 완료",
      basicPracticeCount: "연습 문항 {n}개",
      basicCrownHint: "연습을 다시 통과하면 왕관 +1 (+3 XP, 최대 3).",
      partnerEyebrow: "학습 짝",
      partnerTitle: "자음 짝 고르기",
      partnerLead: "기초 트랙용 학습 짝 하나. ㅈ는 자비(길잡이) — 파트너 아님.",
      partnerStageLabel: "스테이지 {n} · {name}",
      partnerXpMax: "최고 스테이지",
      partnerXpToNext: "다음 스테이지 {n}까지 {remain} XP",
    },
    zh: {
      basicEyebrow: "基础技能路径",
      basicBackHub: "← 中心",
      basicBackHangul: "韩文 →",
      basicBackTopik2: "TOPIK II →",
      basicBackTopik: "TOPIK I 应用 →",
      basicTheme: "主题",
      basicBank: "单元题库",
      basicQuestions: "题目",
      basicObjective: "目标",
      basicExplain: "语法笔记",
      basicGrammar: "语法",
      basicGrammarTrap: "注意",
      basicGrammarWhy: "语法",
      basicPhrases: "关键表达",
      basicDialogue: "对话",
      basicSteps: "技能步骤",
      basicFlow: "路径：介绍 → 学习 → 对话 → 练习 → 关卡",
      basicNoBank: "尚无题库（计划中）。",
      basicPlanned: "计划中 — 尚无内容",
      basicPilot: "试点",
      basicLoading: "加载中…",
      basicBankError: "无法加载试点题库 JSON。",
      basicQuizLater: "本单元尚未接入测验播放器。",
      basicLoadError: "无法加载基础轨道清单。请用 http 打开 hub/。",
      basicStartPractice: "练习对话 →",
      basicPilotTitle: "基础试点",
      basicMcqHint: "选择一项",
      basicCorrect: "正确",
      basicIncorrect: "不太对",
      basicAnswer: "答案",
      basicNextQ: "下一题 →",
      basicDonePilot: "完成 — 关闭",
      basicClose: "关闭",
      basicPlayerHint: "选择最合适的选项完成对话。",
      basicXpLine: "{xp} XP · 技能 {done}/{total}",
      basicBadgeDone: "完成",
      basicBadgeRetry: "再挑战",
      basicBadgeCrownsMax: "★★★",
      basicBadgePractice: "练习",
      basicMetaPractice: "{n} 个可练",
      basicRetryPractice: "再挑战 →",
      basicXpGain: "+{n} XP — 技能完成",
      basicPracticeCount: "{n} 道练习题",
      basicCrownHint: "再通过练习可加一顶皇冠（+3 XP，最多 3）。",
      partnerEyebrow: "伙伴",
      partnerTitle: "选择辅音伙伴",
      partnerLead: "基础轨道选一位伙伴。ㅈ是 jabi.（向导）— 不是伙伴。",
      partnerStageLabel: "阶段 {n} · {name}",
      partnerXpMax: "最高阶段",
      partnerXpToNext: "距阶段 {n} 还差 {remain} XP",
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    bindPlayerChrome();
    const hint = document.getElementById("basic-player-hint");
    if (hint) hint.textContent = t("basicPlayerHint", hint.textContent);
    const close = document.getElementById("basic-player-close");
    if (close) close.textContent = t("basicClose", "Close");

    boot();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          if (hint) hint.textContent = t("basicPlayerHint", "");
          if (close) close.textContent = t("basicClose", "Close");
          boot();
          if (playerState.bank && !document.getElementById("basic-player")?.hidden) {
            renderPlayerQuestion();
          }
        }, 0);
      });
    });
  });
})();

/** Hangul track — lesson list + stroke practice (Hanzi Writer + jamo JSON). */
(function () {
  const MANIFEST_URL = "../data/hangul/track-manifest.json";
  /* Bump STROKE_DATA_V when stroke JSON / HW wrapper options change (defeats sticky caches). */
  const STROKE_DATA_V = "20260727c";
  const STROKES_13_URL =
    "../assets/chars/strokes/jamo-strokes-13.json?v=" + STROKE_DATA_V;
  const STROKES_TENSE_URL =
    "../assets/chars/strokes/jamo-strokes-tense.json?v=" + STROKE_DATA_V;
  const TRACK = "hangul";

  /**
   * Hanzi Writer is a Chinese (Hanzi) engine. Hangul-safe create defaults:
   * - Y-up 1024 grid is REQUIRED by HW (scale(s,-s)); our JSON is authored in that space.
   * - No radicalColor / empty radStrokes (no 部首).
   * - No Chinese CDN fallback (charDataLoader only).
   * - Warm hint / soft guide tones (not default cyan #AAF).
   * - strokeFadeDuration 0: avoid “ghost fade” when leaving Replay for Trace.
   * - Slightly kinder leniency for finger Trace on simple jamo.
   * - Soft tube look: light outline guide + thicker finger trail.
   */
  const HANGUL_HW = {
    strokeColor: "#1a1612",
    outlineColor: "#d5d0c6",
    drawingColor: "#e87722",
    drawingWidth: 5,
    highlightColor: "#f0a060",
    highlightCompleteColor: "#e87722",
    radicalColor: null,
    strokeFadeDuration: 0,
    drawingFadeDuration: 180,
    leniency: 1.15,
    showHintAfterMisses: 3,
    highlightOnComplete: true,
    acceptBackwardsStrokes: false,
    markStrokeCorrectAfterMisses: false,
  };

  /** Strip Chinese leftover fields; never pass radical indices for Hangul. */
  function toHangulCharData(raw) {
    if (!raw || !Array.isArray(raw.strokes) || !Array.isArray(raw.medians)) return null;
    if (raw.strokes.length !== raw.medians.length) return null;
    return {
      strokes: raw.strokes,
      medians: raw.medians,
      radStrokes: [],
    };
  }

  /**
   * Partner roster (jabi. 13) — ㅈ is the guide (jabi.), never a selectable partner.
   * Keep this list for partner/onboarding contracts; do not add jieut here.
   */
  const ROSTER_PARTNERS = [
    { glyph: "ㄱ", id: "giyeok" },
    { glyph: "ㄴ", id: "nieun" },
    { glyph: "ㄷ", id: "digeut" },
    { glyph: "ㄹ", id: "rieul" },
    { glyph: "ㅁ", id: "mieum" },
    { glyph: "ㅂ", id: "bieup" },
    { glyph: "ㅅ", id: "siot" },
    { glyph: "ㅇ", id: "ieung" },
    { glyph: "ㅊ", id: "chieut" },
    { glyph: "ㅋ", id: "kieuk" },
    { glyph: "ㅌ", id: "tieut" },
    { glyph: "ㅍ", id: "pieup" },
    { glyph: "ㅎ", id: "hieut" },
  ];

  /** Stroke-practice roster — includes ㅈ (`jieut` in jamo-strokes-13.json), after ㅅ. */
  const ROSTER_STROKE = [
    { glyph: "ㄱ", id: "giyeok" },
    { glyph: "ㄴ", id: "nieun" },
    { glyph: "ㄷ", id: "digeut" },
    { glyph: "ㄹ", id: "rieul" },
    { glyph: "ㅁ", id: "mieum" },
    { glyph: "ㅂ", id: "bieup" },
    { glyph: "ㅅ", id: "siot" },
    { glyph: "ㅈ", id: "jieut" },
    { glyph: "ㅇ", id: "ieung" },
    { glyph: "ㅊ", id: "chieut" },
    { glyph: "ㅋ", id: "kieuk" },
    { glyph: "ㅌ", id: "tieut" },
    { glyph: "ㅍ", id: "pieup" },
    { glyph: "ㅎ", id: "hieut" },
  ];

  /** @deprecated alias — prefer ROSTER_PARTNERS */
  const ROSTER_13 = ROSTER_PARTNERS;

  const ROSTER_TENSE = [
    { glyph: "ㄲ", id: "ssanggiyeok" },
    { glyph: "ㄸ", id: "ssangdigeut" },
    { glyph: "ㅃ", id: "ssangbieup" },
    { glyph: "ㅆ", id: "ssangsiot" },
  ];

  /** Former stub ids (e.g. `ji`) — empty now that `jieut` is real data. */
  const STROKE_STUB_IDS = new Set();

  const GLYPH_TO_ID = Object.fromEntries(
    [...ROSTER_STROKE, ...ROSTER_TENSE].map((j) => [j.glyph, j.id])
  );

  function isUsableStrokeId(id) {
    return !!(id && !STROKE_STUB_IDS.has(id));
  }

  /** Stroke badge only if lesson wires trace AND has ≥1 glyph with real stroke JSON. */
  function lessonHasUsableStrokePractice(lesson) {
    const hasTrace = (lesson.modules || []).some((m) => m.type === "trace");
    if (!hasTrace) return false;
    const glyphs = (lesson.groups || []).flatMap((g) => g.jamo || []);
    if (!glyphs.length) return true;
    return glyphs.some((g) => isUsableStrokeId(GLYPH_TO_ID[g]));
  }

  const strokeCache = Object.create(null);
  const strokePromises = Object.create(null);
  let activeWriter = null;
  let practicePanelEl = null;
  let trackCache = null;
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
        pick: "#hangul-partner-pick",
        grid: "#hangul-jamo-grid",
        pickEyebrow: "#hangul-partner-pick-eyebrow",
        pickTitle: "#hangul-partner-pick-title",
        pickLead: "#hangul-partner-pick-lead",
        growth: "#hangul-growth",
        glyph: "#hangul-partner-glyph",
        name: "#hangul-partner-name",
        stage: "#hangul-partner-stage",
        pill: "#hangul-partner-pill",
        xpLabel: "#hangul-partner-xp-label",
        xpBar: "#hangul-partner-xp-bar",
        xpFill: "#hangul-partner-xp-fill",
        xpHint: "#hangul-partner-xp-hint",
        chips: "#hangul-partner-chips",
      },
      hideWhilePicking: ["#hangul-list", ".hangul-nav", "#hangul-stroke-hub", "#hangul-xp"],
      onPicked: () => {
        renderXpHud(0);
        if (trackCache) renderStrokeHub();
      },
    });
  }

  function refreshPartnerGrowth() {
    window.JabiPartnerSector?.refresh?.(TRACK);
  }

  function renderXpHud(flashGain) {
    const el = document.getElementById("hangul-xp");
    const api = progressApi();
    if (!el || !api) return;
    const xp = api.getXp(TRACK);
    const done = api.doneCount(TRACK);
    const total = (trackCache?.lessons || []).length;
    let text = t("hangulXpLine", "{xp} XP · {done}/{total} skills")
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
      return `<span class="hangul-badge hangul-badge--crowns">${escapeHtml(
        t("hangulBadgeCrownsMax", "★★★")
      )}</span>`;
    }
    if (crowns >= 1) {
      return `<span class="hangul-badge hangul-badge--retry">${escapeHtml(
        t("hangulBadgeRetry", "retry")
      )}</span>`;
    }
    return `<span class="hangul-badge hangul-badge--done">${escapeHtml(
      t("hangulBadgeDone", "done")
    )}</span>`;
  }

  function applySkillComplete(lessonId, opts) {
    const api = progressApi();
    if (!api || !lessonId) return null;
    const result = opts?.checkpoint
      ? api.completeCheckpoint(TRACK, lessonId)
      : api.completeSkill(TRACK, lessonId, opts);
    const totalGain =
      (result.gained || 0) + (result.checkpointGained || 0) + (result.crownXp || 0);
    renderXpHud(totalGain);
    refreshPartnerGrowth();
    refreshPathNodes();
    return result;
  }

  function refreshPathNodes() {
    const api = progressApi();
    const list = document.getElementById("hangul-list");
    if (!api || !list) return;
    list.querySelectorAll(".hangul-item[data-id]").forEach((btn) => {
      const id = btn.dataset.id;
      const li = btn.closest("li");
      const node = li?.querySelector(".skill-node");
      const done = api.isDone(TRACK, id);
      const crowns = api.getCrowns?.(TRACK, id) || (done ? 1 : 0);
      paintSkillNode(node, done, crowns);
      btn.classList.toggle("is-skill-done", done);
      const badgeHost = btn.querySelector(".hangul-item-top");
      if (badgeHost && done) {
        let badge = badgeHost.querySelector(".hangul-badge");
        if (!badge) {
          badge = document.createElement("span");
          badgeHost.appendChild(badge);
        }
        const wrap = document.createElement("div");
        wrap.innerHTML = doneBadgeHtml(crowns);
        const next = wrap.firstElementChild;
        badge.className = next.className;
        badge.textContent = next.textContent;
      }
    });
  }

  function loadStrokeData(url) {
    if (strokeCache[url]) return Promise.resolve(strokeCache[url]);
    if (!strokePromises[url]) {
      strokePromises[url] = fetch(url, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) throw new Error(`stroke HTTP ${r.status}`);
          return r.json();
        })
        .then((data) => {
          strokeCache[url] = data;
          return data;
        })
        .catch((err) => {
          delete strokePromises[url];
          throw err;
        });
    }
    return strokePromises[url];
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

  function ensurePracticePanel() {
    if (practicePanelEl) return practicePanelEl;
    const el = document.createElement("div");
    el.id = "hangul-practice";
    el.className = "hangul-practice hidden";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML = `
      <div class="hangul-practice-card">
        <div class="hangul-practice-top">
          <p class="hangul-practice-glyph" id="hangul-practice-glyph">ㄱ</p>
          <button type="button" class="hangul-practice-close" id="hangul-practice-close" aria-label="Close">×</button>
        </div>
        <p class="hangul-practice-hint" id="hangul-practice-hint"></p>
        <div class="hangul-practice-stage">
          <div class="hangul-practice-target" id="hangul-practice-target"></div>
        </div>
        <div class="hangul-practice-actions">
          <button type="button" class="hangul-practice-btn" id="hangul-practice-replay"></button>
          <button type="button" class="hangul-practice-btn hangul-practice-btn--primary" id="hangul-practice-quiz"></button>
        </div>
        <p class="hangul-practice-status" id="hangul-practice-status" aria-live="polite"></p>
      </div>`;
    document.body.appendChild(el);
    practicePanelEl = el;

    el.querySelector("#hangul-practice-close").addEventListener("click", closePractice);
    el.addEventListener("click", (e) => {
      if (e.target === el) closePractice();
    });
    el.querySelector("#hangul-practice-replay").addEventListener("click", () => {
      if (!activeWriter) return;
      setStageClear(false);
      setStatus(t("hangulTraceWatch", "Watch the stroke order…"), "watch");
      /* Replay: cancel quiz, clear outline, redraw ink only (no gray second glyph). */
      try {
        activeWriter.cancelQuiz?.();
        activeWriter.hideOutline?.();
        activeWriter.hideCharacter?.();
      } catch (_) {
        /* ignore */
      }
      activeWriter.animateCharacter({
        onComplete: () =>
          setStatus(t("hangulTraceReady", "Ready — tap Trace to practice.")),
      });
    });
    el.querySelector("#hangul-practice-quiz").addEventListener("click", startQuiz);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !el.classList.contains("hidden")) closePractice();
    });
    return el;
  }

  function setStatus(msg, tone) {
    const s = document.getElementById("hangul-practice-status");
    if (!s) return;
    s.textContent = msg || "";
    s.classList.toggle("is-clear", tone === "clear");
    s.classList.toggle("is-watch", tone === "watch");
  }

  function setStageClear(on) {
    const stage = document.querySelector(".hangul-practice-stage");
    if (stage) stage.classList.toggle("is-clear", !!on);
  }

  function closePractice() {
    const el = practicePanelEl;
    if (!el) return;
    if (activeWriter) {
      try {
        activeWriter.cancelQuiz?.();
      } catch (_) {
        /* ignore */
      }
      activeWriter = null;
    }
    const target = document.getElementById("hangul-practice-target");
    if (target) target.innerHTML = "";
    el.classList.add("hidden");
    setStageClear(false);
    setStatus("");
  }

  function startQuiz() {
    if (!activeWriter) return;
    setStageClear(false);
    setStatus(t("hangulTraceDraw", "Trace each stroke. 3 misses → hint."));
    /*
     * Hangul Trace setup (Chinese-default quiz fades full ink → looks broken):
     * hideCharacter instantly, then showOutline from the same strokes[].
     * Never a CSS font ghost.
     */
    try {
      activeWriter.cancelQuiz?.();
      activeWriter.hideCharacter?.();
      activeWriter.showOutline?.();
    } catch (_) {
      /* ignore */
    }
    activeWriter.quiz({
      onComplete: () => {
        setStageClear(true);
        setStatus(t("hangulTraceDone", "Nice — stroke practice clear."), "clear");
      },
    });
  }

  /** Uniform pace for all jamo/strokes (HW already scales duration ≈ length / speed). */
  const STROKE_ANIM_SPEED = 0.5;
  const STROKE_DELAY_MS = 450;

  function openPractice(glyph, id, dataUrl) {
    if (typeof HanziWriter === "undefined") {
      setStatus(t("hangulTraceLibMissing", "Stroke library failed to load."));
      return;
    }
    const panel = ensurePracticePanel();
    panel.classList.remove("hidden");
    document.getElementById("hangul-practice-glyph").textContent = glyph;
    document.getElementById("hangul-practice-hint").textContent = t(
      "hangulTraceHint",
      "Replay = stroke order · Trace = draw on matching outline"
    );
    document.getElementById("hangul-practice-replay").textContent = t(
      "hangulTraceReplay",
      "Replay"
    );
    document.getElementById("hangul-practice-quiz").textContent = t(
      "hangulTraceQuiz",
      "Trace"
    );
    setStatus(t("hangulTraceLoading", "Loading…"));

    const target = document.getElementById("hangul-practice-target");
    target.innerHTML = "";
    activeWriter = null;
    setStageClear(false);

    const size = Math.min(280, Math.floor(window.innerWidth * 0.72));

    loadStrokeData(dataUrl)
      .then((data) => {
        if (!isUsableStrokeId(id) || !data[id]) {
          setStatus(t("hangulTraceSoon", "Stroke data coming later"));
          return;
        }
        const charData = toHangulCharData(data[id]);
        if (!charData) {
          setStatus(t("hangulTraceSoon", "Stroke data coming later"));
          return;
        }
        activeWriter = HanziWriter.create(target, id, {
          width: size,
          height: size,
          padding: 12,
          /* Replay starts without outline; Trace enables matching strokes[] guide. */
          showOutline: false,
          showCharacter: false,
          ...HANGUL_HW,
          strokeAnimationSpeed: STROKE_ANIM_SPEED,
          delayBetweenStrokes: STROKE_DELAY_MS,
          strokeHighlightSpeed: STROKE_ANIM_SPEED,
          /* Never hit default CDN hanzi-writer-data/{char}.json (Chinese). */
          charDataLoader: (_c, onLoad, onError) => {
            const normalized = toHangulCharData(data[id]);
            if (!normalized) {
              if (typeof onError === "function") onError(new Error("bad hangul stroke data"));
              return;
            }
            onLoad(normalized);
          },
          onLoadCharDataError: () => {
            setStatus(t("hangulTraceLoadError", "Could not load stroke data."));
          },
        });
        setStatus(t("hangulTraceWatch", "Watch the stroke order…"), "watch");
        try {
          activeWriter.hideOutline?.();
        } catch (_) {
          /* ignore */
        }
        activeWriter.animateCharacter({
          onComplete: () =>
            setStatus(t("hangulTraceReady", "Ready — tap Trace to practice.")),
        });
      })
      .catch((err) => {
        console.error(err);
        setStatus(t("hangulTraceLoadError", "Could not load stroke data."));
      });
  }

  function renderRoster(container, items, dataUrl) {
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "hangul-trace-grid";

    loadStrokeData(dataUrl)
      .then((data) => {
        items.forEach(({ glyph, id }) => {
          const cell = document.createElement("button");
          cell.type = "button";
          cell.className = "hangul-trace-cell";
          const ready = isUsableStrokeId(id) && !!data[id];
          if (!ready) {
            cell.classList.add("is-missing");
            cell.disabled = true;
            cell.innerHTML = `<span class="hangul-trace-missing">${glyph}</span><span class="hangul-trace-label">${t(
              "hangulTraceSoon",
              "coming later"
            )}</span>`;
          } else {
            cell.innerHTML = `<span class="hangul-trace-glyph">${glyph}</span><span class="hangul-trace-label">${t(
              "hangulTraceOpen",
              "practice"
            )}</span>`;
            cell.addEventListener("click", () => openPractice(glyph, id, dataUrl));
          }
          grid.appendChild(cell);
        });
        container.appendChild(grid);
      })
      .catch((err) => {
        console.error(err);
        container.innerHTML = `<p class="hangul-empty">${t(
          "hangulTraceLoadError",
          "Could not load stroke data."
        )}</p>`;
      });
  }

  function renderTraceModule(container, lesson, mod) {
    /* Only glyphs with real stroke data — ㅉ still coming later. */
    const glyphs = (lesson.groups || [])
      .flatMap((g) => g.jamo || [])
      .filter((glyph) => isUsableStrokeId(GLYPH_TO_ID[glyph]));
    if (!glyphs.length) {
      container.innerHTML = `<p class="hangul-empty">${t(
        "hangulTraceSoon",
        "Stroke data coming later"
      )}</p>`;
      return;
    }
    const items = glyphs.map((glyph) => ({
      glyph,
      id: GLYPH_TO_ID[glyph],
    }));
    renderRoster(container, items, mod.dataUrl);
  }

  function renderStrokeHub() {
    const host = document.getElementById("hangul-stroke-hub");
    if (!host) return;
    host.innerHTML = `
      <div class="hangul-stroke-block">
        <p class="k">${t("hangulStroke13", "Stroke practice · 14 consonants")}</p>
        <p class="hangul-stroke-lead">${t(
          "hangulStrokeLead",
          "Tap a jamo → watch stroke order → Trace to draw."
        )}</p>
        <div id="hangul-roster-13"></div>
      </div>
      <div class="hangul-stroke-block">
        <p class="k">${t("hangulStrokeTense", "Tense (된소리) · doubled shapes")}</p>
        <div id="hangul-roster-tense"></div>
      </div>`;
    renderRoster(document.getElementById("hangul-roster-13"), ROSTER_STROKE, STROKES_13_URL);
    renderRoster(
      document.getElementById("hangul-roster-tense"),
      ROSTER_TENSE,
      STROKES_TENSE_URL
    );
  }

  function stepLabel(step) {
    const map = {
      intro: t("hangulStepIntro", "1 · Intro"),
      teach: t("hangulStepTeach", "2 · Teach"),
      practice: t("hangulStepPractice", "3 · Practice"),
      checkpoint: t("hangulStepCheckpoint", "4 · Checkpoint"),
    };
    return map[step] || step || "";
  }

  function moduleStepKey(mod) {
    if (!mod) return "";
    if (mod.step) return mod.step;
    if (mod.type === "intro" || mod.type === "objective") return "intro";
    if (mod.type === "explain" || mod.type === "examples") return "teach";
    if (mod.type === "check") return "practice";
    if (mod.type === "checkpoint" || mod.type === "task") return "checkpoint";
    return "";
  }

  function choiceLabel(c) {
    if (c == null) return "";
    if (typeof c === "string" || typeof c === "number") return String(c);
    return pick(c) || c.en || c.ko || "";
  }

  function renderModuleBlock(mod, lesson, opts = {}) {
    if (!mod || !mod.type) return "";
    const stepKey = moduleStepKey(mod);
    const step =
      opts.showStep && stepKey
        ? `<span class="hangul-step-pill">${stepLabel(stepKey)}</span>`
        : "";
    switch (mod.type) {
      case "objective":
        return `<section class="hangul-mod hangul-mod--objective" data-step="${mod.step || "intro"}">
          ${step}
          <p class="k">${t("hangulModObjective", "Objective")}</p>
          <p class="hangul-mod-body">${pick(mod.body)}</p>
        </section>`;
      case "intro":
        return `<section class="hangul-mod hangul-mod--intro" data-step="intro">
          ${step}
          <p class="k">${t("hangulModIntro", "Hook")}</p>
          <p class="hangul-mod-body">${pick(mod.body)}</p>
        </section>`;
      case "explain": {
        const label = pick(mod.label) || t("hangulModExplain", "Grammar");
        const title = pick(mod.title);
        const inlineEx = Array.isArray(mod.examples) ? mod.examples : [];
        const exRows = inlineEx
          .map((it) => {
            const gloss = pick(it.gloss) || "";
            return `<li class="hangul-ex hangul-ex--inline">
              <span class="hangul-ex-ko">${it.ko || ""}</span>
              ${gloss ? `<span class="hangul-ex-gloss">${gloss}</span>` : ""}
            </li>`;
          })
          .join("");
        return `<section class="hangul-mod hangul-mod--explain" data-step="${mod.step || "teach"}">
          ${step}
          <p class="k hangul-grammar-k">${label}</p>
          ${title ? `<p class="hangul-grammar-title">${title}</p>` : ""}
          <p class="hangul-mod-body">${pick(mod.body)}</p>
          ${exRows ? `<ul class="hangul-ex-list hangul-ex-list--grammar">${exRows}</ul>` : ""}
        </section>`;
      }
      case "examples": {
        const items = Array.isArray(mod.items) ? mod.items : [];
        if (!items.length) return "";
        const rows = items
          .map((it) => {
            const gloss = pick(it.gloss) || "";
            return `<li class="hangul-ex">
              <span class="hangul-ex-ko">${it.ko || ""}</span>
              ${gloss ? `<span class="hangul-ex-gloss">${gloss}</span>` : ""}
            </li>`;
          })
          .join("");
        return `<section class="hangul-mod hangul-mod--examples" data-step="${mod.step || "teach"}">
          ${step}
          <p class="k">${t("hangulModExamples", "Examples")}</p>
          <ul class="hangul-ex-list">${rows}</ul>
        </section>`;
      }
      case "check": {
        const choices = Array.isArray(mod.choices) ? mod.choices : [];
        const btns = choices
          .map(
            (c, i) =>
              `<button type="button" class="hangul-check-btn" data-check-i="${i}">${choiceLabel(c)}</button>`
          )
          .join("");
        return `<section class="hangul-mod hangul-mod--check" data-step="practice" data-answer="${mod.answer}">
          ${step}
          <p class="k">${t("hangulModCheck", "Quick check")}</p>
          <p class="hangul-mod-body">${pick(mod.prompt)}</p>
          <div class="hangul-check-choices">${btns}</div>
          <p class="hangul-check-tip hidden" data-tip>${pick(mod.tip) || ""}</p>
        </section>`;
      }
      case "checkpoint": {
        const done = progressApi()?.isDone(TRACK, lesson.id);
        const cp = progressApi()?.hasCheckpoint(TRACK, lesson.id);
        const crowns = progressApi()?.getCrowns?.(TRACK, lesson.id) || (done ? 1 : 0);
        const btnLabel = cp
          ? t("hangulCheckpointDone", "Checkpoint ✓")
          : t("hangulCheckpointMark", "Mark checkpoint ✓");
        let tip = "";
        if (done && !cp) {
          tip = `<p class="hangul-empty">${t("hangulSkillDoneHint", "Skill done — mark checkpoint for bonus XP.")}</p>`;
        } else if (done && crowns > 0 && crowns < 3) {
          tip = `<p class="hangul-empty">${t(
            "hangulCrownHint",
            "Retry the check to earn another crown (+3 XP, max 3)."
          )}</p>`;
        }
        return `<section class="hangul-mod hangul-mod--checkpoint" data-step="checkpoint" data-lesson="${lesson.id || ""}">
          ${step}
          <p class="k">${t("hangulModCheckpoint", "Checkpoint")}</p>
          <p class="hangul-mod-body">${pick(mod.body)}</p>
          <button type="button" class="path-complete-btn${cp ? " is-done" : ""}" data-checkpoint="${lesson.id || ""}"${
            cp ? " disabled" : ""
          }>${btnLabel}</button>
          ${tip}
        </section>`;
      }
      case "task":
        return `<section class="hangul-mod hangul-mod--task" data-step="${mod.step || "checkpoint"}">
          ${step}
          <p class="k">${t("hangulModTask", "Try")}</p>
          <p class="hangul-mod-body">${pick(mod.body)}</p>
        </section>`;
      case "trace":
        return `<section class="hangul-mod hangul-mod--trace">
          <p class="k">${t("hangulModTrace", "Stroke practice")}</p>
          <div class="hangul-trace-grid-host" data-trace-for="${lesson.id}"></div>
          <p class="hangul-empty hangul-trace-note">${t(
            "hangulTraceLessonNote",
            "Lesson jamo only — missing glyphs show as coming later."
          )}</p>
        </section>`;
      default:
        return "";
    }
  }

  function bindChecks(root, lessonId) {
    if (!root) return;
    root.querySelectorAll(".hangul-mod--check").forEach((sec) => {
      const answer = Number(sec.dataset.answer);
      const tip = sec.querySelector("[data-tip]");
      sec.querySelectorAll(".hangul-check-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (sec.classList.contains("is-locked")) return;
          sec.classList.add("is-locked");
          const i = Number(btn.dataset.checkI);
          const ok = i === answer;
          btn.classList.add(ok ? "is-correct" : "is-wrong");
          sec.querySelectorAll(".hangul-check-btn").forEach((b) => {
            b.disabled = true;
            if (Number(b.dataset.checkI) === answer) b.classList.add("is-correct");
          });
          if (tip) {
            tip.classList.toggle("hidden", ok);
            if (!ok) tip.classList.remove("hidden");
          }
          if (ok && lessonId) applySkillComplete(lessonId);
        });
      });
    });

    root.querySelectorAll("[data-checkpoint]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-checkpoint");
        if (!id || btn.disabled) return;
        applySkillComplete(id, { checkpoint: true });
        btn.disabled = true;
        btn.classList.add("is-done");
        btn.textContent = t("hangulCheckpointDone", "Checkpoint ✓");
      });
    });
  }

  function renderDetail(lesson) {
    const groups = lesson.groups || [];
    const groupHtml =
      groups.length === 0
        ? ""
        : `<p class="k">${t("hangulGroups", "Jamo groups")}</p>
           <div class="hangul-groups">${groups
             .map((g) => {
               const jam = Array.isArray(g.jamo) ? g.jamo.join(" ") : "";
               if (!jam) return "";
               const label = g.label ? pick(g.label) : "";
               const tip = label ? ` title="${label}"` : "";
               return `<span class="hangul-chip"${tip}>${jam}</span>`;
             })
             .join("")}</div>`;

    const modules = lesson.modules || [];
    const contentMods = modules.filter((m) =>
      ["objective", "intro", "explain", "examples", "check", "checkpoint", "task", "trace"].includes(
        m.type
      )
    );
    let lastStep = null;
    const modulesHtml = contentMods.length
      ? contentMods
          .map((m) => {
            const stepKey = moduleStepKey(m);
            const showStep = !!stepKey && stepKey !== lastStep;
            if (stepKey) lastStep = stepKey;
            return renderModuleBlock(m, lesson, { showStep });
          })
          .join("")
      : `<p class="hangul-empty">${t(
          "hangulModulesEmpty",
          "Empty — body/audio later. Stroke practice is at the top of this page."
        )}</p>`;

    const objectiveLine = lesson.objective ? pick(lesson.objective) : "";
    const flow = `<p class="hangul-flow">${t(
      "hangulFlow",
      "Path: Intro → Teach → Practice → Checkpoint"
    )}</p>`;

    return `
      <div class="hangul-detail">
        ${
          objectiveLine
            ? `<p class="hangul-objective-line">${objectiveLine}</p>`
            : ""
        }
        ${flow}
        ${groupHtml}
        ${modulesHtml}
      </div>`;
  }

  function renderList(track) {
    const list = document.getElementById("hangul-list");
    const title = document.getElementById("hangul-title");
    const lead = document.getElementById("hangul-lead");
    const meta = document.getElementById("hangul-meta");
    if (!list) return;

    if (title) title.textContent = pick(track.title);
    if (lead) lead.textContent = pick(track.lead);
    if (meta) {
      /* Learner-facing meta only — no track.id / status watermark (cf. Basics filled line). */
      meta.textContent = `v${track.version} · ${
        (track.lessons || []).length
      } skills · ${t("hangulMetaStroke", "stroke where data exists")}`;
    }

    const api = progressApi();

    list.classList.add("skill-path");
    list.innerHTML = "";
    (track.lessons || []).forEach((lesson) => {
      const li = document.createElement("li");
      const node = document.createElement("div");
      const done = api?.isDone(TRACK, lesson.id);
      const crowns = api?.getCrowns?.(TRACK, lesson.id) || (done ? 1 : 0);
      node.className = `skill-node skill-node--${lesson.kind || "intro"}${done ? " is-complete" : ""}`;
      node.textContent = lesson.pathLabel || String(lesson.order ?? "").padStart(2, "0");
      node.setAttribute("aria-hidden", "true");
      paintSkillNode(node, done, crowns);

      const card = document.createElement("div");
      card.className = "skill-card";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `hangul-item${done ? " is-skill-done" : ""}`;
      btn.dataset.id = lesson.id;

      /* Badge: done/crowns, or 획순 only when usable stroke JSON exists for lesson jamo.
         Never stamp "pilot"/"ready" — that watermarked every card. */
      let badge = "";
      if (done) {
        badge = doneBadgeHtml(crowns);
      } else if (lessonHasUsableStrokePractice(lesson)) {
        badge = `<span class="hangul-badge hangul-badge--trace">${t("hangulBadgeTrace", "stroke")}</span>`;
      }

      const preview =
        Array.isArray(lesson.jamoPreview) && lesson.jamoPreview.length
          ? `<div class="hangul-preview">${lesson.jamoPreview
              .map((tok) => `<span class="hangul-preview-tok">${tok}</span>`)
              .join("")}</div>`
          : "";

      btn.innerHTML = `
        <div class="hangul-item-top">
          <span class="hangul-item-title">${pick(lesson.title)}</span>
          ${badge}
        </div>
        ${preview}
        <div class="hangul-detail-slot" hidden></div>`;

      btn.addEventListener("click", (e) => {
        /* Nested controls — don't toggle the lesson closed. */
        if (
          e.target.closest(".hangul-detail-slot .hangul-trace-cell") ||
          e.target.closest(".hangul-detail-slot .hangul-check-btn") ||
          e.target.closest(".hangul-detail-slot .path-complete-btn")
        ) {
          return;
        }
        const open = btn.classList.contains("is-open");
        list.querySelectorAll(".hangul-item").forEach((el) => {
          el.classList.remove("is-open");
          const slot = el.querySelector(".hangul-detail-slot");
          if (slot) {
            slot.hidden = true;
            slot.innerHTML = "";
          }
        });
        if (!open) {
          btn.classList.add("is-open");
          const slot = btn.querySelector(".hangul-detail-slot");
          if (slot) {
            slot.hidden = false;
            slot.innerHTML = renderDetail(lesson);
            bindChecks(slot, lesson.id);
            const traceModule = (lesson.modules || []).find((m) => m.type === "trace");
            if (traceModule) {
              const traceEl = slot.querySelector(`[data-trace-for="${lesson.id}"]`);
              if (traceEl) renderTraceModule(traceEl, lesson, traceModule);
            }
          }
        }
      });

      card.appendChild(btn);
      li.appendChild(node);
      li.appendChild(card);
      list.appendChild(li);
    });

    renderXpHud(0);
  }

  async function boot() {
    const errEl = document.getElementById("hangul-error");
    try {
      mountPartnerSector();
      renderStrokeHub();
      const res = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const track = await res.json();
      trackCache = track;
      if (!Array.isArray(track.lessons) || track.lessons.length !== 18) {
        console.warn("hangul scaffold: expected 18 lessons (00–17), got", track.lessons?.length);
      }
      renderList(track);
      window.JabiPartnerSector?.gate?.(TRACK);
      if (errEl) errEl.classList.add("hidden");
    } catch (e) {
      console.error(e);
      if (errEl) {
        errEl.classList.remove("hidden");
        errEl.textContent = t(
          "hangulLoadError",
          "Could not load hangul track manifest. Serve hub/ over http (not file://)."
        );
      }
    }
  }

  window.HubI18nExtra = {
    en: {
      hangulEyebrow: "Hangul skill path",
      hangulBackHub: "← Hub",
      hangulBackBasic: "Basics →",
      hangulBackTopik2: "TOPIK II →",
      hangulBackTopik: "TOPIK I app →",
      hangulGroups: "Jamo groups",
      hangulFlow: "Path: Intro → Teach → Practice → Checkpoint",
      hangulStepIntro: "1 · Intro",
      hangulStepTeach: "2 · Teach",
      hangulStepPractice: "3 · Practice",
      hangulStepCheckpoint: "4 · Checkpoint",
      hangulNoGroups: "No subgroups in this unit.",
      hangulModulesEmpty: "Empty — body/audio later. Stroke practice is at the top of this page.",
      hangulModObjective: "Objective",
      hangulModIntro: "Hook",
      hangulModExplain: "Grammar",
      hangulModExamples: "Examples",
      hangulModCheck: "Quick check",
      hangulModCheckpoint: "Checkpoint",
      hangulModTask: "Try",
      hangulModTrace: "Stroke practice",
      hangulLoadError: "Could not load hangul track manifest. Serve hub/ over http (not file://).",
      hangulTraceSoon: "coming later",
      hangulTraceOpen: "practice",
      hangulStroke13: "Stroke practice · 14 consonants",
      hangulStrokeTense: "Tense (된소리) · doubled shapes",
      hangulStrokeLead: "Tap a jamo → watch stroke order → Trace to draw.",
      hangulTraceHint: "Replay = stroke order · Trace = draw on matching outline",
      hangulTraceReplay: "Replay",
      hangulTraceQuiz: "Trace",
      hangulTraceWatch: "Watch the stroke order…",
      hangulTraceReady: "Ready — tap Trace to practice.",
      hangulTraceDraw: "Trace each stroke. 3 misses → hint.",
      hangulTraceDone: "Nice — stroke practice clear.",
      hangulTraceLoading: "Loading…",
      hangulTraceLoadError: "Could not load stroke data.",
      hangulTraceLibMissing: "Stroke library failed to load.",
      hangulTraceLessonNote: "Lesson jamo only — missing glyphs show as coming later.",
      hangulBadgeTrace: "stroke",
      hangulMetaStroke: "stroke where data exists",
      hangulBadgeDone: "done",
      hangulBadgeRetry: "retry",
      hangulBadgeCrownsMax: "★★★",
      hangulXpLine: "{xp} XP · {done}/{total} skills",
      hangulCheckpointMark: "Mark checkpoint ✓",
      hangulCheckpointDone: "Checkpoint ✓",
      hangulSkillDoneHint: "Skill done — mark checkpoint for bonus XP.",
      hangulCrownHint: "Retry the check to earn another crown (+3 XP, max 3).",
      partnerEyebrow: "Partner",
      partnerTitle: "Choose your jamo",
      partnerLead: "One partner for Hangul. ㅈ is jabi. (guide) — not a partner.",
      partnerStageLabel: "Stage {n} · {name}",
      partnerXpMax: "Max stage",
      partnerXpToNext: "{remain} XP → stage {n}",
    },
    ko: {
      hangulEyebrow: "한글 스킬 패스",
      hangulBackHub: "← 허브",
      hangulBackBasic: "기초 →",
      hangulBackTopik2: "TOPIK II →",
      hangulBackTopik: "TOPIK I 앱 →",
      hangulGroups: "자모 그룹",
      hangulFlow: "경로: 소개 → 배우기 → 연습 → 체크포인트",
      hangulStepIntro: "1 · 소개",
      hangulStepTeach: "2 · 배우기",
      hangulStepPractice: "3 · 연습",
      hangulStepCheckpoint: "4 · 체크포인트",
      hangulNoGroups: "이 단원에는 하위 그룹이 없습니다.",
      hangulModulesEmpty: "비어 있음 — 본문·오디오는 나중에. 획순 연습은 이 페이지 상단.",
      hangulModObjective: "목표",
      hangulModIntro: "훅",
      hangulModExplain: "문법",
      hangulModExamples: "예",
      hangulModCheck: "빠른 확인",
      hangulModCheckpoint: "체크포인트",
      hangulModTask: "해보기",
      hangulModTrace: "획순 연습",
      hangulLoadError: "한글 트랙 매니페스트를 불러오지 못했습니다. hub/를 http로 여세요 (file:// 불가).",
      hangulTraceSoon: "준비 중",
      hangulTraceOpen: "연습",
      hangulStroke13: "획순 연습 · 자음 14",
      hangulStrokeTense: "경음(된소리) · 겹친 모양",
      hangulStrokeLead: "자모 탭 → 획순 보기 → Trace로 따라 쓰기.",
      hangulTraceHint: "Replay = 획순 · Trace = 같은 획 윤곽 위에 따라 쓰기",
      hangulTraceReplay: "다시 보기",
      hangulTraceQuiz: "따라 쓰기",
      hangulTraceWatch: "획순을 보세요…",
      hangulTraceReady: "준비됨 — Trace를 눌러 연습하세요.",
      hangulTraceDraw: "획을 따라 그리세요. 3번 틀리면 힌트.",
      hangulTraceDone: "완료 — 획순 연습 클리어.",
      hangulTraceLoading: "불러오는 중…",
      hangulTraceLoadError: "획순 데이터를 불러오지 못했습니다.",
      hangulTraceLibMissing: "획순 라이브러리를 불러오지 못했습니다.",
      hangulTraceLessonNote: "이 레슨 자모만 — 없는 글자는 준비 중으로 표시.",
      hangulBadgeTrace: "획순",
      hangulMetaStroke: "획순 데이터 있는 레슨만",
      hangulBadgeDone: "완료",
      hangulBadgeRetry: "다시 도전",
      hangulBadgeCrownsMax: "★★★",
      hangulXpLine: "{xp} XP · 스킬 {done}/{total}",
      hangulCheckpointMark: "체크포인트 완료 ✓",
      hangulCheckpointDone: "체크포인트 ✓",
      hangulSkillDoneHint: "스킬 완료 — 체크포인트로 보너스 XP.",
      hangulCrownHint: "체크를 다시 통과하면 왕관 +1 (+3 XP, 최대 3).",
      partnerEyebrow: "학습 짝",
      partnerTitle: "자음 짝 고르기",
      partnerLead: "한글 트랙용 학습 짝 하나. ㅈ는 자비(길잡이) — 파트너 아님.",
      partnerStageLabel: "스테이지 {n} · {name}",
      partnerXpMax: "최고 스테이지",
      partnerXpToNext: "다음 스테이지 {n}까지 {remain} XP",
    },
    zh: {
      hangulEyebrow: "韩文技能路径",
      hangulBackHub: "← 中心",
      hangulBackBasic: "基础 →",
      hangulBackTopik2: "TOPIK II →",
      hangulBackTopik: "TOPIK I 应用 →",
      hangulGroups: "字母分组",
      hangulFlow: "路径：介绍 → 学习 → 练习 → 关卡",
      hangulStepIntro: "1 · 介绍",
      hangulStepTeach: "2 · 学习",
      hangulStepPractice: "3 · 练习",
      hangulStepCheckpoint: "4 · 关卡",
      hangulNoGroups: "本单元无子分组。",
      hangulModulesEmpty: "空 — 正文/音频稍后。笔顺练习在本页顶部。",
      hangulModObjective: "目标",
      hangulModIntro: "引入",
      hangulModExplain: "语法",
      hangulModExamples: "例子",
      hangulModCheck: "快测",
      hangulModCheckpoint: "关卡",
      hangulModTask: "试一试",
      hangulModTrace: "笔顺练习",
      hangulLoadError: "无法加载韩文轨道清单。请用 http 打开 hub/（不要用 file://）。",
      hangulTraceSoon: "准备中",
      hangulTraceOpen: "练习",
      hangulStroke13: "笔顺练习 · 14辅音",
      hangulStrokeTense: "紧音 · 双写字形",
      hangulStrokeLead: "点字母 → 看笔顺 → Trace 跟写。",
      hangulTraceHint: "Replay 看顺序 · Trace 在同一笔画灰线上跟写",
      hangulTraceReplay: "重播",
      hangulTraceQuiz: "跟写",
      hangulTraceWatch: "请看笔顺…",
      hangulTraceReady: "就绪 — 点 Trace 开始练习。",
      hangulTraceDraw: "按笔画跟写。错 3 次出提示。",
      hangulTraceDone: "完成 — 笔顺练习通关。",
      hangulTraceLoading: "加载中…",
      hangulTraceLoadError: "无法加载笔顺数据。",
      hangulTraceLibMissing: "笔顺库加载失败。",
      hangulTraceLessonNote: "仅本课字母 — 缺失显示为准备中。",
      hangulBadgeTrace: "笔顺",
      hangulMetaStroke: "有笔顺数据的课才标",
      hangulBadgeDone: "完成",
      hangulBadgeRetry: "再挑战",
      hangulBadgeCrownsMax: "★★★",
      hangulXpLine: "{xp} XP · 技能 {done}/{total}",
      hangulCheckpointMark: "完成关卡 ✓",
      hangulCheckpointDone: "关卡 ✓",
      hangulSkillDoneHint: "技能已完成 — 关卡可获额外 XP。",
      hangulCrownHint: "再通过快测可加一顶皇冠（+3 XP，最多 3）。",
      partnerEyebrow: "伙伴",
      partnerTitle: "选择辅音伙伴",
      partnerLead: "韩文轨道选一位伙伴。ㅈ是 jabi.（向导）— 不是伙伴。",
      partnerStageLabel: "阶段 {n} · {name}",
      partnerXpMax: "最高阶段",
      partnerXpToNext: "距阶段 {n} 还差 {remain} XP",
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    boot();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(boot, 0);
      });
    });
  });
})();

/**
 * TOPIK II — Writing Q51–54 formative scorer (rules only, no AI/Lemon).
 * Axis map (official-ish → UI): content=내용·과제 · organization=조직·흐름 · language=언어
 * See docs/topik2-writing-axis-mapping-ko.md
 */
(function () {
  const MANIFEST_URL = "../data/topik2/track-manifest.json";
  const FREE_TYPES = new Set(["write-short", "write-essay"]);
  const MCQ_TYPES = new Set([
    "listening",
    "notice",
    "topic",
    "blank",
    "inference",
    "detail",
    "mcq",
  ]);
  const CONTENT_IDS = new Set([
    "trend",
    "change",
    "reason",
    "compare",
    "conclude",
    "pros",
    "cons",
    "stance",
    "allow",
    "limit",
    "rule",
  ]);
  const ORG_IDS = new Set(["structure"]);
  const LANG_IDS = new Set(["register", "length"]);

  /* TOPIK writing axes → jabi traits (formative weights; not official points). */
  const DEFAULT_TRAITS = {
    content: {
      weight: 0.4,
      label: { en: "Content", ko: "내용", zh: "内容" },
    },
    organization: {
      weight: 0.3,
      label: { en: "Organization / flow", ko: "조직·흐름", zh: "结构/连贯" },
    },
    language: {
      weight: 0.3,
      label: { en: "Language", ko: "언어", zh: "语言" },
    },
  };

  const CLOZE_TRAITS = {
    content: {
      weight: 0.85,
      label: { en: "Content", ko: "내용", zh: "内容" },
    },
    organization: {
      weight: 0,
      na: true,
      label: { en: "Organization / flow", ko: "조직·흐름", zh: "结构/连贯" },
    },
    language: {
      weight: 0.15,
      label: { en: "Language", ko: "언어", zh: "语言" },
    },
  };

  let trackCache = null;
  let playerState = {
    unit: null,
    bank: null,
    index: 0,
    revealModel: false,
    revealScript: false,
    locked: false,
    attempts: {},
  };

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

  function getOrCreateUid() {
    const KEY = "jabi_uid";
    let uid = null;
    try {
      uid = localStorage.getItem(KEY);
    } catch (e) {
      uid = null;
    }
    if (!uid) {
      uid =
        crypto.randomUUID?.() ||
        String(Date.now()) + Math.random().toString(36).slice(2);
      try {
        localStorage.setItem(KEY, uid);
      } catch (e) {
        /* ignore */
      }
    }
    return uid;
  }

  /* ---------- SpecPartner §4.1 — TOPIK II partner growth (own LS; never touch topik-coach-v1) ---------- */
  const T2_PROGRESS_KEY = "jabi.topik2.v1";
  const T2_FREE_STAGE_CAP = 2;
  const T2_STAGE_XP_FLOORS = [0, 100, 250, 450, 700, 1000];
  const T2_PARTNER_JAMOS = [
    { id: "giyeok", glyph: "ㄱ" },
    { id: "nieun", glyph: "ㄴ" },
    { id: "digeut", glyph: "ㄷ" },
    { id: "rieul", glyph: "ㄹ" },
    { id: "mieum", glyph: "ㅁ" },
    { id: "bieup", glyph: "ㅂ" },
    { id: "siot", glyph: "ㅅ" },
    { id: "ieung", glyph: "ㅇ" },
    { id: "chieut", glyph: "ㅊ" },
    { id: "kieuk", glyph: "ㅋ" },
    { id: "tieut", glyph: "ㅌ" },
    { id: "pieup", glyph: "ㅍ" },
    { id: "hieut", glyph: "ㅎ" },
  ];
  const T2_STAGE_LABELS = {
    en: ["baby", "pants", "boots", "weapon", "shield", "crown"],
    ko: ["아기", "바지", "장화", "무기", "방패", "왕관"],
    zh: ["婴儿", "短裤", "靴子", "武器", "盾牌", "王冠"],
  };

  function defaultT2Progress() {
    return {
      xp: 0,
      partner: null,
      awarded: {},
      proUnlock: false,
    };
  }

  function loadT2Progress() {
    try {
      const raw = localStorage.getItem(T2_PROGRESS_KEY);
      if (!raw) return defaultT2Progress();
      const parsed = JSON.parse(raw);
      const partner =
        parsed.partner && typeof parsed.partner === "object" && parsed.partner.id
          ? {
              id: String(parsed.partner.id),
              glyph: String(parsed.partner.glyph || ""),
              stage: Math.max(1, Math.min(6, Number(parsed.partner.stage) || 1)),
            }
          : null;
      return {
        xp: typeof parsed.xp === "number" && parsed.xp >= 0 ? parsed.xp : 0,
        partner,
        awarded:
          parsed.awarded && typeof parsed.awarded === "object" && !Array.isArray(parsed.awarded)
            ? parsed.awarded
            : {},
        proUnlock: !!parsed.proUnlock,
      };
    } catch {
      return defaultT2Progress();
    }
  }

  function saveT2Progress(st) {
    try {
      localStorage.setItem(T2_PROGRESS_KEY, JSON.stringify(st));
    } catch {
      /* private mode / quota */
    }
    return st;
  }

  function stageFromXp(xp) {
    let stage = 1;
    for (let i = T2_STAGE_XP_FLOORS.length - 1; i >= 0; i--) {
      if (xp >= T2_STAGE_XP_FLOORS[i]) {
        stage = i + 1;
        break;
      }
    }
    return stage;
  }

  function syncT2Stage(st) {
    const stage = stageFromXp(st.xp || 0);
    if (st.partner) st.partner.stage = stage;
    return stage;
  }

  function effectiveT2Stage(st) {
    const raw = st.partner?.stage || stageFromXp(st.xp || 0);
    if (st.proUnlock) return Math.min(6, raw);
    return Math.min(T2_FREE_STAGE_CAP, raw);
  }

  function t2XpProgress(st) {
    const xp = st.xp || 0;
    const stage = stageFromXp(xp);
    if (stage >= 6) return { stage, pct: 100, xp, nextAt: null, remain: 0 };
    const floor = T2_STAGE_XP_FLOORS[stage - 1];
    const nextAt = T2_STAGE_XP_FLOORS[stage];
    const span = Math.max(1, nextAt - floor);
    const pct = Math.min(100, Math.round(((xp - floor) / span) * 100));
    return { stage, pct, xp, nextAt, remain: Math.max(0, nextAt - xp) };
  }

  function charArtSrc(id, stage) {
    return `../assets/chars/char-${id}-${stage}.svg`;
  }

  function setElVisible(el, on) {
    if (!el) return;
    el.hidden = !on;
    el.classList.toggle("hidden", !on);
  }

  function hasT2Partner(st) {
    return !!(st?.partner && st.partner.id);
  }

  function awardT2Xp(qId, want) {
    if (!qId || !want || want <= 0) return false;
    const st = loadT2Progress();
    if (!hasT2Partner(st)) return false;
    const prev = Number(st.awarded[qId]) || 0;
    if (want <= prev) return false;
    st.xp = (st.xp || 0) + (want - prev);
    st.awarded[qId] = want;
    syncT2Stage(st);
    saveT2Progress(st);
    renderT2Growth();
    return true;
  }

  function xpWantForComposite(composite) {
    if (composite >= 75) return 10;
    if (composite >= 45) return 7;
    return 0;
  }

  function renderT2PartnerPick() {
    const host = document.getElementById("topik2-partner-pick");
    const grid = document.getElementById("topik2-jamo-grid");
    if (!host || !grid) return;
    const eyebrow = document.getElementById("topik2-partner-pick-eyebrow");
    const title = document.getElementById("topik2-partner-pick-title");
    const lead = document.getElementById("topik2-partner-pick-lead");
    if (eyebrow) eyebrow.textContent = t("topik2PartnerEyebrow", "Partner");
    if (title) title.textContent = t("topik2PartnerTitle", "Choose your jamo");
    if (lead) {
      lead.textContent = t(
        "topik2PartnerLead",
        "One partner for TOPIK II. ㅈ is jabi. (guide) — not a partner."
      );
    }
    grid.innerHTML = "";
    T2_PARTNER_JAMOS.forEach((j) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topik2-jamo-card";
      btn.setAttribute("aria-label", j.glyph);
      btn.innerHTML =
        `<span class="topik2-jamo-glyph">` +
        `<img src="${charArtSrc(j.id, 1)}" alt="${j.glyph}" ` +
        `onerror="this.replaceWith(document.createTextNode('${j.glyph}'))">` +
        `</span>`;
      btn.addEventListener("click", () => finishT2PartnerPick(j));
      grid.appendChild(btn);
    });
    setElVisible(host, true);
    setElVisible(document.getElementById("topik2-growth"), false);
    setElVisible(document.getElementById("topik2-list"), false);
    setElVisible(document.querySelector(".topik2-nav"), false);
    const official = document.getElementById("topik2-official");
    if (official) official.hidden = true;
  }

  function finishT2PartnerPick(jamo) {
    const st = loadT2Progress();
    st.partner = { id: jamo.id, glyph: jamo.glyph, stage: 1 };
    if (!st.xp) st.xp = 0;
    syncT2Stage(st);
    saveT2Progress(st);
    setElVisible(document.getElementById("topik2-partner-pick"), false);
    setElVisible(document.getElementById("topik2-list"), true);
    setElVisible(document.querySelector(".topik2-nav"), true);
    renderT2Growth();
    wireOfficialScoreForm();
  }

  function renderT2Growth() {
    const st = loadT2Progress();
    const host = document.getElementById("topik2-growth");
    if (!host) return;
    if (!hasT2Partner(st)) {
      setElVisible(host, false);
      return;
    }
    syncT2Stage(st);
    saveT2Progress(st);
    const n = effectiveT2Stage(st);
    const labels = T2_STAGE_LABELS[lang()] || T2_STAGE_LABELS.en;
    const glyph = document.getElementById("topik2-partner-glyph");
    const name = document.getElementById("topik2-partner-name");
    const stageEl = document.getElementById("topik2-partner-stage");
    const pill = document.getElementById("topik2-partner-pill");
    const fallback = st.partner.glyph || "·";
    if (glyph) {
      glyph.innerHTML =
        `<img class="partner-art" src="${charArtSrc(st.partner.id, n)}" alt="${fallback}" ` +
        `onerror="this.replaceWith(document.createTextNode('${fallback}'))">`;
    }
    if (name) name.textContent = st.partner.id;
    if (stageEl) {
      stageEl.textContent = t("topik2StageLabel", "Stage {n} · {name}")
        .replace("{n}", String(n))
        .replace("{name}", labels[n - 1] || "");
    }
    if (pill) pill.textContent = `STAGE ${n}`;

    const prog = t2XpProgress(st);
    const xpLabel = document.getElementById("topik2-xp-label");
    const xpFill = document.getElementById("topik2-xp-fill");
    const xpBar = document.getElementById("topik2-xp-bar");
    const xpHint = document.getElementById("topik2-xp-hint");
    if (xpLabel) xpLabel.textContent = String(prog.xp);
    if (xpFill) xpFill.style.width = `${prog.pct}%`;
    if (xpBar) xpBar.setAttribute("aria-valuenow", String(prog.pct));
    if (xpHint) {
      xpHint.textContent =
        prog.nextAt == null
          ? t("topik2XpMax", "Max stage")
          : t("topik2XpToNext", "{remain} XP → stage {n}")
              .replace("{remain}", String(prog.remain))
              .replace("{n}", String(prog.stage + 1));
    }
    const chips = document.getElementById("topik2-stage-chips");
    if (chips) {
      chips.innerHTML = "";
      for (let i = 1; i <= 6; i++) {
        const span = document.createElement("span");
        span.className = "topik2-stage-chip";
        if (i < n) span.classList.add("is-done");
        else if (i === n) span.classList.add("is-current");
        else span.classList.add("is-locked");
        span.title = labels[i - 1] || "";
        span.textContent = String(i);
        chips.appendChild(span);
      }
    }
    setElVisible(host, true);
  }

  function gateT2PartnerOrGrowth() {
    const st = loadT2Progress();
    if (!hasT2Partner(st)) {
      renderT2PartnerPick();
      return false;
    }
    setElVisible(document.getElementById("topik2-partner-pick"), false);
    setElVisible(document.getElementById("topik2-list"), true);
    setElVisible(document.querySelector(".topik2-nav"), true);
    renderT2Growth();
    return true;
  }

  function normalizeAnswer(s) {
    return String(s || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.。！!？?]+$/g, "");
  }

  function compactAnswer(s) {
    return normalizeAnswer(s).replace(/\s+/g, "");
  }

  function charLen(s) {
    return Array.from(String(s || "").trim()).length;
  }

  function isFreeType(q) {
    return FREE_TYPES.has(q?.type);
  }

  function isMcqType(q) {
    if (!q) return false;
    if (MCQ_TYPES.has(q.type)) return true;
    return Array.isArray(q.choices) && typeof q.answer === "number";
  }

  function clampScore(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  function levenshtein(a, b) {
    const s = String(a || "");
    const t = String(b || "");
    if (s === t) return 0;
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const rows = s.length + 1;
    const cols = t.length + 1;
    const prev = new Array(cols);
    const cur = new Array(cols);
    for (let j = 0; j < cols; j++) prev[j] = j;
    for (let i = 1; i < rows; i++) {
      cur[0] = i;
      for (let j = 1; j < cols; j++) {
        const cost = s.charCodeAt(i - 1) === t.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      for (let j = 0; j < cols; j++) prev[j] = cur[j];
    }
    return prev[t.length];
  }

  const STEM_ENDINGS = [
    "주시기 바랍니다",
    "주셨으면 합니다",
    "주십시오",
    "주세요",
    "하십시오",
    "하세요",
    "합니다",
    "습니다",
    "ㅂ니다",
    "입니다",
    "됩니다",
    "했습니다",
    "려고 합니다",
    "예정입니다",
    "계획입니다",
    "기로 했습니다",
    "고자 합니다",
    "겠습니다",
    "았습니다",
    "었습니다",
    "였다",
    "이다",
    "하다",
    "다",
    "요",
    "죠",
  ].sort((a, b) => b.length - a.length);

  function koreanStem(s) {
    let t = compactAnswer(s);
    for (const end of STEM_ENDINGS) {
      const e = end.replace(/\s+/g, "");
      if (t.length > e.length + 1 && t.endsWith(e)) {
        t = t.slice(0, -e.length);
        break;
      }
    }
    return t;
  }

  /** Q51–52 partial credit: exact / near / stem / honorific / meaningful attempt. */
  function fuzzyClozeMatch(raw, q) {
    const n = normalizeAnswer(raw);
    if (!n) {
      return { tier: "empty", content: 0, bestKey: "", distance: null, tip: null };
    }

    const keys = (q.acceptedAnswers || []).map(normalizeAnswer).filter(Boolean);
    if (q.modelAnswer) {
      const m = normalizeAnswer(q.modelAnswer);
      if (m && !keys.includes(m)) keys.unshift(m);
    }

    const compact = compactAnswer(n);
    for (const k of keys) {
      if (normalizeAnswer(k) === n || compactAnswer(k) === compact) {
        return { tier: "exact", content: 100, bestKey: k, distance: 0, tip: null };
      }
    }

    let bestKey = keys[0] || "";
    let bestDist = Infinity;
    keys.forEach((k) => {
      const d = levenshtein(compact, compactAnswer(k));
      if (d < bestDist) {
        bestDist = d;
        bestKey = k;
      }
    });

    const stemN = koreanStem(n);
    let stemHit = false;
    let stemKey = "";
    keys.forEach((k) => {
      const sk = koreanStem(k);
      if (!stemN || !sk) return;
      if (stemN === sk || (stemN.length >= 2 && sk.length >= 2 && (stemN.includes(sk) || sk.includes(stemN)))) {
        stemHit = true;
        stemKey = k;
      }
    });

    const maxLen = Math.max(compact.length, compactAnswer(bestKey).length, 1);
    const ratio = bestDist / maxLen;
    const formalOk =
      hasFormalRegister(n) || /십시오|세요|합니다|습니다|바랍니다|다$/.test(n);
    const casualOnly = hasCasualRegister(n) && !formalOk;
    const hasHangul = /[가-힣]{2,}/.test(n);

    if (stemHit && bestDist <= 4 && casualOnly) {
      return {
        tier: "honorific",
        content: 68,
        bestKey: stemKey || bestKey,
        distance: bestDist,
          tip: {
          en: "Meaning is close — switch to a more formal written ending.",
          ko: "뜻은 통합니다 — 격식체 문어 종결로 바꿔 보세요.",
          zh: "意思接近 — 请改成更正式的书面语尾。",
        },
      };
    }

    if (ratio <= 0.2 && bestDist <= 2) {
      return {
        tier: "near",
        content: 82,
        bestKey,
        distance: bestDist,
        tip: {
          en: "Very close to an accepted form — check spelling / spacing / ending.",
          ko: "허용 답에 매우 가깝습니다 — 맞춤법·띄어쓰기·어미를 다듬어 보세요.",
          zh: "非常接近可接受答案 — 请检查拼写/空格/语尾。",
        },
      };
    }

    if (stemHit && (ratio <= 0.45 || bestDist <= 5)) {
      return {
        tier: "stem",
        content: 60,
        bestKey: stemKey || bestKey,
        distance: bestDist,
        tip: {
          en: "Stem overlaps an accepted answer — fix the ending / politeness.",
          ko: "어간이 허용 답과 겹칩니다 — 종결·경어를 고치세요.",
          zh: "词干与可接受答案重叠 — 请修正语尾/敬语。",
        },
      };
    }

    if (ratio <= 0.4 && bestDist <= 5) {
      return {
        tier: "near-loose",
        content: 48,
        bestKey,
        distance: bestDist,
        tip: {
          en: "Partial overlap with the accepted set — revise toward the model idea.",
          ko: "허용 답과 부분적으로 겹칩니다 — 모범 의미에 더 가깝게 고쳐 보세요.",
          zh: "与可接受集部分重叠 — 请朝范例意思修改。",
        },
      };
    }

    if (hasHangul && formalOk) {
      return {
        tier: "meaningful",
        content: 34,
        bestKey,
        distance: bestDist === Infinity ? null : bestDist,
        tip: {
          en: "Grammatically plausible, but not the expected blank meaning.",
          ko: "문장으로는 통할 수 있으나, 이 빈칸에 기대되는 뜻은 아닙니다.",
          zh: "语法上说得通，但不是本空期望的意思。",
        },
      };
    }

    if (hasHangul) {
      return {
        tier: "attempt",
        content: 20,
        bestKey,
        distance: bestDist === Infinity ? null : bestDist,
        tip: {
          en: "Attempt noted — aim for the task meaning and formal register.",
          ko: "시도는 반영됨 — 과제 의미와 격식체를 맞춰 보세요.",
          zh: "已记录作答 — 请对齐任务意思与书面敬体。",
        },
      };
    }

    return {
      tier: "miss",
      content: 5,
      bestKey,
      distance: bestDist === Infinity ? null : bestDist,
      tip: {
        en: "Does not match the accepted set.",
        ko: "허용 답 집합과 맞지 않습니다.",
        zh: "与可接受答案集不符。",
      },
    };
  }

  async function loadBank(relPath) {
    if (!relPath) return null;
    const url = new URL(relPath, new URL(MANIFEST_URL, location.href));
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`bank HTTP ${res.status}`);
    return res.json();
  }

  function isAnswerOk(q, raw) {
    const n = normalizeAnswer(raw);
    if (!n) return false;
    const keys = (q.acceptedAnswers || []).map(normalizeAnswer);
    if (keys.some((k) => k === n)) return true;
    if (q.modelAnswer && normalizeAnswer(q.modelAnswer) === n) return true;
    return false;
  }

  function hasFormalRegister(text) {
    return /습니다|ㅂ니다|입니다|합니다|됩니다|했습니다|있었다|였다|이다\.|한다\.|된다\.|였다\.|다\./.test(
      text
    );
  }

  function hasCasualRegister(text) {
    return /아요|어요|네요|거든요|ㅋㅋ|ㅎㅎ|ㅠㅠ|요\./.test(text);
  }

  function resolveTraits(bank, q) {
    const fromBank = bank?.scoring?.traits;
    if (fromBank) return fromBank;
    if (isFreeType(q)) {
      if (q.type === "write-essay") {
        return {
          content: { ...DEFAULT_TRAITS.content, weight: 0.35 },
          organization: { ...DEFAULT_TRAITS.organization, weight: 0.3 },
          language: { ...DEFAULT_TRAITS.language, weight: 0.35 },
        };
      }
      return DEFAULT_TRAITS;
    }
    return CLOZE_TRAITS;
  }

  function mapChecklistItem(c, ctx) {
    let score = 0;
    let trait = "content";
    let rule = c.id;

    if (CONTENT_IDS.has(c.id)) {
      trait = "content";
      if (c.id === "pros" || c.id === "cons" || c.id === "allow" || c.id === "limit") {
        if (ctx.softHits >= 1 && ctx.lenOk) score = 100;
        else if (ctx.softHits >= 1) score = 72;
        else if (ctx.lenOk) score = 38;
        else score = 12;
        rule = "softKeywords+length";
      } else {
        const need = Math.min(2, Math.max(1, ctx.softTotal || 2));
        const hitRatio = ctx.softTotal ? ctx.softHits / ctx.softTotal : 0;
        let base = softKeywordScore(
          Array.from({ length: ctx.softTotal || 0 }),
          ctx.softHits
        );
        if (!ctx.softTotal) base = 70;
        else if (ctx.softHits >= need) base = Math.max(base, 78);
        score = clampScore(base * 0.75 + (ctx.lenOk ? 25 : lengthScore(ctx.len, ctx.min, ctx.max) * 0.25) + hitRatio * 5);
        rule = "softKeywords+length";
      }
    } else if (ORG_IDS.has(c.id) || c.id === "structure") {
      trait = "organization";
      score = organizationScore(ctx.q, ctx.text, ctx.markerHits, ctx.structureOk);
      rule = "discourseMarkers|paragraph";
    } else if (LANG_IDS.has(c.id) || c.id === "register") {
      trait = "language";
      if (c.id === "length") {
        score = lengthScore(ctx.len, ctx.min, ctx.max);
        rule = "lengthBand";
      } else {
        if (ctx.formalOk) score = 100;
        else if (ctx.casualOnly) score = 28;
        else if (ctx.text) score = 42;
        else score = 0;
        rule = "formalRegister";
      }
    } else if (c.id === "length") {
      trait = "language";
      score = lengthScore(ctx.len, ctx.min, ctx.max);
      rule = "lengthBand";
    } else {
      score = clampScore((ctx.lenOk ? 50 : lengthScore(ctx.len, ctx.min, ctx.max) * 0.5) + (ctx.formalOk ? 50 : 20));
      rule = "length+register";
    }

    const pass = score >= 55;
    return { id: c.id, label: pick(c), pass, score, trait, rule };
  }

  function detectPatterns(text) {
    const patterns = [];
    if (!text) return patterns;

    if (hasCasualRegister(text) && !hasFormalRegister(text)) {
      patterns.push({
        id: "casual-register",
        count: 1,
        label: {
          en: "Casual endings detected (prefer formal written register)",
          ko: "구어체 종결이 감지됨 (격식체 문어 권장)",
          zh: "检测到口语语尾（建议书面敬体）",
        },
      });
    }

    const sentences = String(text)
      .split(/[.。!！?？\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 8);
    const seen = Object.create(null);
    sentences.forEach((s) => {
      const key = s.slice(0, 24);
      seen[key] = (seen[key] || 0) + 1;
    });
    const repeats = Object.entries(seen).filter(([, n]) => n >= 2);
    if (repeats.length) {
      const max = Math.max(...repeats.map(([, n]) => n));
      patterns.push({
        id: "sentence-repeat",
        count: max,
        label: {
          en: `Similar sentence fragments repeated (~${max}×) — may look like padding`,
          ko: `비슷한 문장 조각이 반복됨(약 ${max}회) — 분량 채우기로 보일 수 있음`,
          zh: `相似句段重复（约${max}次）— 可能像凑字数`,
        },
      });
    }

    return patterns;
  }

  function lengthScore(len, min, max) {
    if (len <= 0) return 0;
    if (len >= min && len <= max) return 100;
    if (len > max && len <= Math.round(max * 1.15)) return 72;
    if (len > Math.round(max * 1.15)) return 45;
    if (len >= Math.round(min * 0.7)) return 55;
    if (len >= Math.round(min * 0.4)) return 30;
    return 12;
  }

  function softKeywordScore(soft, hits) {
    const total = Array.isArray(soft) ? soft.length : Number(soft) || 0;
    if (!total) return 70;
    const need = Math.min(2, total);
    if (hits >= total) return 100;
    if (hits >= need) return 78;
    if (hits === 1) return 48;
    return 18;
  }

  function organizationScore(q, text, markerHits, structureOk) {
    const markers = q.discourseMarkers || [];
    const paras = String(text || "").split(/\n+/).filter((p) => p.trim()).length;
    let score = 40;
    if (markers.length) {
      score = markerHits >= 2 ? 100 : markerHits === 1 ? 72 : paras >= 2 ? 48 : 22;
    } else if (paras >= 2) {
      score = 78;
    } else if (structureOk) {
      score = 70;
    } else if (charLen(text) >= (q.minChars || 0) * 0.5) {
      score = 50;
    }
    return score;
  }

  function evaluateFreeText(q, raw) {
    const text = String(raw || "").trim();
    const len = charLen(text);
    const min = q.minChars || 0;
    const max = q.maxChars || 9999;
    const lenOk = len >= min && len <= Math.round(max * 1.15);
    const formalOk = hasFormalRegister(text);
    const casualOnly = hasCasualRegister(text) && !formalOk;
    const soft = q.softKeywords || [];
    const softHits = soft.filter((k) => text.includes(k)).length;
    const softOk = soft.length === 0 || softHits >= Math.min(2, soft.length);
    const markers = q.discourseMarkers || [];
    const markerHits = markers.filter((m) => text.includes(m)).length;
    const structureOk = markers.length === 0 || markerHits >= 1 || text.includes("\n");

    const ctx = {
      q,
      text,
      len,
      min,
      max,
      lenOk,
      formalOk,
      casualOnly,
      softHits,
      softTotal: soft.length,
      softOk,
      structureOk,
      markerHits,
    };
    const items = (q.checklist || []).map((c) => mapChecklistItem(c, ctx));

    const contentItems = items.filter((i) => i.trait === "content");
    const orgItems = items.filter((i) => i.trait === "organization");
    const langItems = items.filter((i) => i.trait === "language");

    const avgScore = (arr, fallback) => {
      if (!arr.length) return fallback;
      return arr.reduce((s, i) => s + (i.score != null ? i.score : i.pass ? 100 : 0), 0) / arr.length;
    };

    const contentCheckAvg = avgScore(contentItems, softKeywordScore(soft, softHits));
    const content = clampScore(contentCheckAvg * 0.65 + softKeywordScore(soft, softHits) * 0.35);

    const orgCheckAvg = orgItems.length ? avgScore(orgItems, null) : null;
    const orgBase = organizationScore(q, text, markerHits, structureOk);
    const organization = clampScore(orgCheckAvg == null ? orgBase : orgCheckAvg * 0.55 + orgBase * 0.45);

    const langLen = lengthScore(len, min, max);
    const langFormal = formalOk ? 100 : casualOnly ? 24 : text ? 40 : 0;
    const langCheckAvg = langItems.length ? avgScore(langItems, null) : null;
    const language = clampScore(
      langCheckAvg == null
        ? langLen * 0.45 + langFormal * 0.55
        : langCheckAvg * 0.35 + langLen * 0.3 + langFormal * 0.35
    );

    const rules = [
      {
        trait: "content",
        label: t("topik2RuleSoftKw", "Soft keywords"),
        detail: `${softHits}/${soft.length || "—"}`,
        ok: softOk,
      },
      {
        trait: "language",
        label: t("topik2RuleLength", "Length band"),
        detail: `${len} (${min}–${max})`,
        ok: lenOk,
      },
      {
        trait: "language",
        label: t("topik2RuleFormal", "Formal register"),
        detail: formalOk ? t("topik2Detected", "detected") : t("topik2Missing", "missing"),
        ok: formalOk,
      },
      {
        trait: "organization",
        label: t("topik2RuleFlow", "Markers / paragraphs"),
        detail:
          markers.length > 0
            ? `${markerHits}/${markers.length} markers`
            : text.includes("\n")
              ? t("topik2HasBreaks", "line breaks")
              : t("topik2NoBreaks", "single block"),
        ok: structureOk,
      },
    ];

    const issues = [];
    if (!text) {
      issues.push({
        en: "No text submitted.",
        ko: "작성한 글이 없습니다.",
        zh: "未提交正文。",
      });
    } else {
      if (len < min) {
        issues.push({
          en: `Too short (${len} < ${min}).`,
          ko: `분량이 짧습니다 (${len} < ${min}).`,
          zh: `篇幅过短（${len} < ${min}）。`,
        });
      }
      if (len > max) {
        issues.push({
          en: `Over the practice band (${len} > ${max}).`,
          ko: `연습 분량대를 넘었습니다 (${len} > ${max}).`,
          zh: `超出练习篇幅（${len} > ${max}）。`,
        });
      }
      if (!formalOk) {
        issues.push({
          en: "Formal written endings (-습니다 / -다) not clearly detected.",
          ko: "격식체 문어 종결(-습니다/-다)이 분명히 보이지 않습니다.",
          zh: "未明确检测到书面敬体语尾（-습니다/-다）。",
        });
      }
      if (soft.length && softHits < Math.min(2, soft.length)) {
        issues.push({
          en: "Few task keywords found — check data points / required axes.",
          ko: "과제 핵심어가 적습니다 — 자료·필수 축을 다시 확인하세요.",
          zh: "任务关键词偏少 — 请核对资料/必含要点。",
        });
      }
      if (markers.length && markerHits < 1 && !text.includes("\n")) {
        issues.push({
          en: "Little discourse flow (no markers / paragraph breaks).",
          ko: "담화 흐름 신호가 약합니다 (연결어·문단 구분 부족).",
          zh: "衔接较弱（缺少连接词/分段）。",
        });
      }
    }

    const flowNotes = [];
    if (markers.length && markerHits >= 1) {
      flowNotes.push({
        en: `Discourse markers hit: ${markerHits}.`,
        ko: `담화 표지 ${markerHits}개 감지.`,
        zh: `检测到衔接词 ${markerHits} 个。`,
      });
    } else if (q.type === "write-essay") {
      flowNotes.push({
        en: "Try intro → reasons → closing with connectors (그러나, 따라서…).",
        ko: "도입 → 근거 → 마무리 + 연결어(그러나, 따라서…)를 시도해 보세요.",
        zh: "可试：引入→理由→收尾，并加衔接词（그러나、따라서…）。",
      });
    } else {
      flowNotes.push({
        en: "Order facts (trend → change → reason) for clearer organization.",
        ko: "사실 순서(추세 → 변화 → 이유)를 잡으면 조직이 선명해집니다.",
        zh: "按趋势→变化→原因排序，结构更清晰。",
      });
    }

    const patterns = detectPatterns(text);
    const gaming =
      len > max * 1.2 && softHits <= 1
        ? {
            en: "Length-heavy with few task signals — possible padding.",
            ko: "분량만 길고 과제 신호가 약함 — 분량 채우기 가능.",
            zh: "篇幅很长但任务信号少 — 可能是凑字。",
          }
        : patterns.some((p) => p.id === "sentence-repeat" && p.count >= 3)
          ? {
              en: "Heavy repetition flagged.",
              ko: "과도한 반복이 감지되어 표시됨.",
              zh: "检测到过度重复。",
            }
          : null;

    const scoreSum = items.reduce((s, i) => s + (i.score != null ? i.score : i.pass ? 100 : 0), 0);
    const scoreAvg = items.length ? scoreSum / items.length : content;
    const ok = scoreAvg >= 70 && lenOk && (formalOk || language >= 60);

    return {
      ok,
      len,
      min,
      max,
      items,
      softHits,
      markerHits,
      traits: { content, organization, language },
      rules,
      issues,
      flowNotes,
      patterns,
      gaming,
    };
  }

  function evaluateCloze(q, raw) {
    const text = String(raw || "").trim();
    const fuzzy = fuzzyClozeMatch(raw, q);
    const matched = fuzzy.tier === "exact";
    const formalOk = text
      ? hasFormalRegister(text) || /십시오|세요|합니다|습니다|바랍니다|다$/.test(normalizeAnswer(text))
      : false;
    const casualOnly = text ? hasCasualRegister(text) && !formalOk : false;

    const content = clampScore(fuzzy.content);
    let language = 0;
    if (!text) language = 0;
    else if (matched) language = 100;
    else if (formalOk && fuzzy.tier !== "miss") language = clampScore(55 + content * 0.35);
    else if (formalOk) language = 50;
    else if (casualOnly) language = 28;
    else language = 38;

    const organization = null;
    const issues = [];
    if (!text) {
      issues.push({
        en: "Blank is empty.",
        ko: "빈칸이 비어 있습니다.",
        zh: "空格未填写。",
      });
    } else if (!matched) {
      if (fuzzy.tip) issues.push(fuzzy.tip);
      else {
        issues.push({
          en: "Partial credit applied — revise toward an accepted formal answer.",
          ko: "부분 점수가 반영됨 — 허용 격식 답에 가깝게 고쳐 보세요.",
          zh: "已给部分分 — 请改向可接受的敬体答案。",
        });
      }
      if (casualOnly) {
        issues.push({
          en: "Tone looks casual — try a formal written ending.",
          ko: "구어 느낌이 납니다 — 격식체 문어 종결을 써 보세요.",
          zh: "语气偏口语 — 请改用书面敬体语尾。",
        });
      }
    }

    const rules = [
      {
        trait: "content",
        label: t("topik2RuleExact", "Accepted-answer match"),
        detail: matched
          ? t("topik2Hit", "hit")
          : `${t("topik2Partial", "partial")} · ${fuzzy.tier}`,
        ok: matched || content >= 55,
      },
      {
        trait: "language",
        label: t("topik2RuleFormal", "Formal register"),
        detail: !text
          ? t("topik2Missing", "missing")
          : formalOk || matched
            ? t("topik2Detected", "detected")
            : t("topik2Unclear", "unclear"),
        ok: matched || formalOk,
      },
    ];

    return {
      ok: matched || content >= 78,
      matched,
      fuzzyTier: fuzzy.tier,
      traits: { content, organization, language },
      rules,
      issues,
      flowNotes: [],
      patterns: [],
      gaming: null,
      items: [],
    };
  }

  function compositeFromTraits(traitsCfg, traitScores) {
    let wSum = 0;
    let sSum = 0;
    Object.keys(traitsCfg).forEach((key) => {
      const cfg = traitsCfg[key];
      const w = Number(cfg.weight) || 0;
      if (w <= 0 || cfg.na) return;
      const s = traitScores[key];
      if (s == null || Number.isNaN(s)) return;
      wSum += w;
      sSum += w * s;
    });
    if (wSum <= 0) return 0;
    return clampScore(sSum / wSum);
  }

  function scoreSubmission(bank, q, raw) {
    const traitsCfg = resolveTraits(bank, q);
    if (isFreeType(q)) {
      const ev = evaluateFreeText(q, raw);
      const composite = compositeFromTraits(traitsCfg, ev.traits);
      return { kind: "free", ...ev, traitsCfg, composite };
    }
    const ev = evaluateCloze(q, raw);
    const composite = compositeFromTraits(traitsCfg, {
      content: ev.traits.content,
      language: ev.traits.language,
      organization: 0,
    });
    return { kind: "cloze", ...ev, traitsCfg, composite };
  }

  function playerEls() {
    return {
      root: document.getElementById("topik2-player"),
      title: document.getElementById("topik2-player-title"),
      meta: document.getElementById("topik2-player-meta"),
      hint: document.getElementById("topik2-player-hint"),
      prompt: document.getElementById("topik2-player-prompt"),
      disclaimer: document.getElementById("topik2-player-disclaimer"),
      scriptWrap: document.getElementById("topik2-script-wrap"),
      scriptToggle: document.getElementById("topik2-script-toggle"),
      script: document.getElementById("topik2-player-script"),
      choices: document.getElementById("topik2-choices"),
      input: document.getElementById("topik2-player-input"),
      textarea: document.getElementById("topik2-player-textarea"),
      inputWrap: document.getElementById("topik2-input-wrap"),
      textWrap: document.getElementById("topik2-text-wrap"),
      counter: document.getElementById("topik2-char-count"),
      feedback: document.getElementById("topik2-player-feedback"),
      check: document.getElementById("topik2-player-check"),
      next: document.getElementById("topik2-player-next"),
      close: document.getElementById("topik2-player-close"),
    };
  }

  function activeField(q) {
    const els = playerEls();
    return isFreeType(q) ? els.textarea : els.input;
  }

  function showPlayer(show) {
    const { root } = playerEls();
    if (!root) return;
    root.hidden = !show;
    root.classList.toggle("hidden", !show);
    if (show) root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateCharCounter(q) {
    const els = playerEls();
    if (!els.counter || !isFreeType(q)) {
      if (els.counter) els.counter.hidden = true;
      return;
    }
    const n = charLen(els.textarea?.value || "");
    const min = q.minChars || 0;
    const max = q.maxChars || 0;
    els.counter.hidden = false;
    els.counter.textContent = `${n} / ${min}–${max} ${t("topik2Chars", "chars")}`;
    els.counter.classList.toggle("is-low", n > 0 && n < min);
    els.counter.classList.toggle("is-ok-len", n >= min && n <= max);
    els.counter.classList.toggle("is-high", max > 0 && n > max);
  }

  function renderPlayerQuestion() {
    const { bank, index } = playerState;
    const els = playerEls();
    if (!bank?.questions?.length || !els.prompt) return;

    const q = bank.questions[index];
    const total = bank.questions.length;
    const mcq = isMcqType(q);
    const free = isFreeType(q);
    playerState.revealModel = false;
    playerState.revealScript = false;
    playerState.locked = false;

    if (els.title) {
      els.title.textContent =
        pick(bank.title) ||
        pick(playerState.unit?.title) ||
        t("topik2PilotTitle", "Writing pilot");
    }
    if (els.meta) {
      els.meta.textContent = mcq
        ? `${index + 1} / ${total} · ${t("topik2McqMeta", "MCQ practice")}`
        : `${index + 1} / ${total} · ${t("topik2FormativeMeta", "Formative practice score")}`;
    }
    if (els.hint) {
      if (mcq) {
        els.hint.textContent = q.script
          ? t("topik2PlayerHintListen", "Pick one answer. No audio yet — reveal the script if needed.")
          : t("topik2PlayerHintMcq", "Pick one answer. Feedback shows after you choose.");
      } else if (free) {
        els.hint.textContent = t(
          "topik2PlayerHintFree",
          "Write a formal answer in the length band, then Check. Tips do not show a full model."
        );
      } else {
        els.hint.textContent = t(
          "topik2PlayerHint",
          "Type one formal written answer for the blank, then Check."
        );
      }
    }
    if (els.disclaimer) {
      els.disclaimer.hidden = false;
      els.disclaimer.textContent = mcq
        ? t("topik2McqDisclaimer", "Practice MCQ · not official TOPIK")
        : t("topik2FormativeDisclaimer", "연습용 형성 점수 · 공식 TOPIK 아님");
    }
    els.prompt.textContent = pick(q.prompt);

    if (els.scriptWrap) {
      const hasScript = Boolean(q.script && (q.script.ko || pick(q.script)));
      els.scriptWrap.hidden = !hasScript;
      if (els.script) {
        els.script.hidden = true;
        els.script.textContent = q.script?.ko || pick(q.script) || "";
      }
      if (els.scriptToggle) {
        els.scriptToggle.disabled = !hasScript;
        els.scriptToggle.textContent = t("topik2RevealScript", "Show script");
      }
    }

    if (els.choices) {
      if (mcq) {
        els.choices.hidden = false;
        const choices = Array.isArray(q.choices) ? q.choices : [];
        els.choices.innerHTML = choices
          .map(
            (c, i) =>
              `<button type="button" class="topik2-choice" data-choice="${i}">${escapeHtml(c)}</button>`
          )
          .join("");
        els.choices.querySelectorAll(".topik2-choice").forEach((btn) => {
          btn.addEventListener("click", () => onChoose(Number(btn.dataset.choice)));
        });
      } else {
        els.choices.hidden = true;
        els.choices.innerHTML = "";
      }
    }

    if (els.inputWrap) els.inputWrap.hidden = mcq || free;
    if (els.textWrap) els.textWrap.hidden = mcq || !free;
    if (els.input) {
      els.input.value = "";
      els.input.disabled = mcq || free;
    }
    if (els.textarea) {
      els.textarea.value = "";
      els.textarea.disabled = mcq || !free;
      els.textarea.rows = q.type === "write-essay" ? 12 : 8;
    }
    updateCharCounter(q);

    if (els.feedback) {
      els.feedback.hidden = true;
      els.feedback.className = "topik2-feedback";
      els.feedback.innerHTML = "";
    }
    if (els.next) els.next.hidden = true;
    if (els.check) {
      els.check.hidden = mcq;
      els.check.disabled = mcq;
      els.check.textContent = t("topik2Check", "제출");
    }

    if (!mcq) {
      const field = activeField(q);
      field?.focus();
    }
  }

  function onChoose(choiceIndex) {
    const { bank, index } = playerState;
    const els = playerEls();
    if (playerState.locked || !bank?.questions?.[index] || !els.feedback) return;
    const q = bank.questions[index];
    if (!isMcqType(q)) return;

    const ok = choiceIndex === q.answer;
    playerState.locked = true;

    els.choices?.querySelectorAll(".topik2-choice").forEach((btn) => {
      const i = Number(btn.dataset.choice);
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("is-correct");
      if (i === choiceIndex && !ok) btn.classList.add("is-wrong");
    });

    if (ok) awardT2Xp(q.id || `q-${index}`, 10);

    const why = pick(q.why);
    let tip = "";
    if (!ok && q.distractWhy?.[String(choiceIndex)]) {
      tip = pick(q.distractWhy[String(choiceIndex)]);
    } else if (!ok && q.hint?.steps) {
      const steps = q.hint.steps[lang()] || q.hint.steps.en || q.hint.steps.ko;
      if (Array.isArray(steps) && steps[0]) tip = steps[0];
    } else if (!ok) {
      tip = pick(q.hint) || "";
    }

    els.feedback.hidden = false;
    els.feedback.className = `topik2-feedback ${ok ? "is-ok" : "is-stub"}`;
    els.feedback.innerHTML = `
      <p class="topik2-feedback-verdict">${escapeHtml(
        ok ? t("topik2McqCorrect", "Correct") : t("topik2McqIncorrect", "Not quite")
      )}</p>
      ${
        !ok
          ? `<p class="topik2-model"><span class="k">${escapeHtml(t("topik2Answer", "Answer"))}</span> ${escapeHtml(
              q.answerText || q.choices?.[q.answer] || ""
            )}</p>`
          : ""
      }
      ${tip ? `<p>${escapeHtml(tip)}</p>` : ""}
      ${why ? `<p class="topik2-why">${escapeHtml(why)}</p>` : ""}
      <p class="topik2-disclaimer">${escapeHtml(
        t("topik2McqDisclaimer", "Practice MCQ · not official TOPIK")
      )}</p>`;

    if (els.next) {
      els.next.hidden = false;
      els.next.textContent =
        index + 1 < bank.questions.length
          ? t("topik2NextQ", "Next item →")
          : t("topik2DonePilot", "Done — close");
    }
  }

  function recordAttempt(qId, composite) {
    if (!playerState.attempts) playerState.attempts = {};
    const prev = playerState.attempts[qId] || { count: 0, last: null, best: null };
    const next = {
      count: prev.count + 1,
      last: composite,
      best: prev.best == null ? composite : Math.max(prev.best, composite),
    };
    playerState.attempts[qId] = next;
    return next;
  }

  function openPlayer(unit, bank) {
    playerState = {
      unit,
      bank,
      index: 0,
      revealModel: false,
      revealScript: false,
      locked: false,
      attempts: {},
    };
    showPlayer(true);
    renderPlayerQuestion();
  }

  function modelBlockHtml(q) {
    if (isFreeType(q)) {
      const outline = pick(q.modelOutline);
      if (!outline) return "";
      return `<p class="topik2-model"><span class="k">${escapeHtml(
        t("topik2Outline", "Outline")
      )}</span> ${escapeHtml(outline)}</p>`;
    }
    if (!q.modelAnswer) return "";
    return `<p class="topik2-model"><span class="k">${escapeHtml(
      t("topik2Model", "Model")
    )}</span> ${escapeHtml(q.modelAnswer)}</p>`;
  }

  function checklistHtml(items) {
    if (!items?.length) return "";
    const lis = items
      .map((i) => {
        const mark = i.pass ? "✓" : i.score >= 30 ? "◐" : "○";
        const sc = i.score != null ? ` <span class="topik2-rule-tag">${escapeHtml(String(i.score))}</span>` : "";
        return `<li class="${i.pass ? "is-pass" : i.score >= 30 ? "is-mid" : "is-miss"}">${mark} ${escapeHtml(
          i.label
        )}${sc} <span class="topik2-rule-tag">${escapeHtml(i.rule || i.trait || "")}</span></li>`;
      })
      .join("");
    return `<div class="topik2-layer"><h3 class="topik2-layer-title">${escapeHtml(
      t("topik2LayerRubric", "4 · Rubric checklist")
    )}</h3><ul class="topik2-checklist">${lis}</ul></div>`;
  }

  function traitBarsHtml(score, aiRef) {
    const order = ["content", "organization", "language"];
    const rows = order
      .map((key) => {
        const cfg = score.traitsCfg[key] || DEFAULT_TRAITS[key];
        const na = cfg.na || score.traits[key] == null;
        const val = na ? null : score.traits[key];
        const label = pick(cfg.label) || key;
        const w = cfg.weight != null ? ` · w${cfg.weight}` : "";
        if (na) {
          return `<div class="topik2-trait is-na">
            <div class="topik2-trait-head"><span>${escapeHtml(label)}</span><span class="topik2-trait-val">—</span></div>
            <div class="topik2-trait-track"><div class="topik2-trait-fill" style="width:0%"></div></div>
            <p class="topik2-trait-note">${escapeHtml(t("topik2TraitNA", "Not scored for this item type"))}</p>
          </div>`;
        }
        const tone = val >= 75 ? "is-high" : val >= 45 ? "is-mid" : "is-low";
        let aiBadge = "";
        if (key === "language" && aiRef != null && Number.isFinite(aiRef)) {
          const compact = score.kind === "cloze" ? " is-compact" : "";
          aiBadge = `<span class="topik2-ai-ref-badge${compact}" title="${escapeHtml(
            t("topik2AiRefTitle", "Reference only — may differ from rule-based scoring; still being validated")
          )}">${escapeHtml(t("topik2AiRef", "AI ref"))} ${Math.round(aiRef)}</span>`;
        }
        return `<div class="topik2-trait ${tone}" data-trait="${escapeHtml(key)}">
          <div class="topik2-trait-head"><span>${escapeHtml(label)}${escapeHtml(w)}</span><span class="topik2-trait-val">${val}${aiBadge}</span></div>
          <div class="topik2-trait-track" role="meter" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="100">
            <div class="topik2-trait-fill" style="width:${val}%"></div>
          </div>
        </div>`;
      })
      .join("");
    return `<div class="topik2-traits">${rows}</div>`;
  }

  function aiCoachPanelShellHtml(hasText) {
    const disabled = hasText ? "" : " disabled";
    return `<div class="topik2-ai-coach" id="topik2-ai-coach">
      <h3 class="topik2-layer-title">${escapeHtml(t("topik2AiCoachTitle", "AI coaching (language)"))}</h3>
      <p class="topik2-ai-coach-note">${escapeHtml(
        t("topik2AiCoachNote", "Separate from the rule-based score above. Grammar & register only.")
      )}</p>
      <button type="button" class="topik2-ai-coach-btn" id="topik2-ai-coach-btn"${disabled}>${escapeHtml(
        t("topik2AiCoachBtn", "Get AI coaching")
      )}</button>
      <div class="topik2-ai-coach-body" id="topik2-ai-coach-body" hidden></div>
    </div>`;
  }

  function renderAiCoachBody(payload) {
    if (!payload || !payload.ai) {
      return `<p class="topik2-ai-coach-fallback">${escapeHtml(
        t("topik2AiCoachUnavailable", "AI coaching is not available right now.")
      )}</p>`;
    }
    const summary = payload.summary
      ? `<p class="topik2-ai-coach-summary">${escapeHtml(payload.summary)}</p>`
      : "";
    const issues = Array.isArray(payload.issues) ? payload.issues : [];
    const cards = issues.length
      ? `<ul class="topik2-ai-issues">${issues
          .map(
            (i) => `<li class="topik2-ai-issue">
          <p class="topik2-ai-quote">「${escapeHtml(i.quote || "")}」</p>
          <p class="topik2-ai-problem">${escapeHtml(i.problem || "")}</p>
          <p class="topik2-ai-suggestion">${escapeHtml(i.suggestion || "")}</p>
        </li>`
          )
          .join("")}</ul>`
      : `<p class="topik2-ai-coach-empty">${escapeHtml(
          t("topik2AiCoachNoIssues", "No grammar/register issues flagged.")
        )}</p>`;
    return `${summary}${cards}`;
  }

  function applyAiLanguageBadge(aiScore, isCloze) {
    const langVal = document.querySelector('.topik2-trait[data-trait="language"] .topik2-trait-val');
    if (!langVal || aiScore == null || !Number.isFinite(aiScore)) return;
    langVal.querySelector(".topik2-ai-ref-badge")?.remove();
    const badge = document.createElement("span");
    badge.className = `topik2-ai-ref-badge${isCloze ? " is-compact" : ""}`;
    badge.title = t(
      "topik2AiRefTitle",
      "Reference only — may differ from rule-based scoring; still being validated"
    );
    badge.textContent = `${t("topik2AiRef", "AI ref")} ${Math.round(aiScore)}`;
    langVal.appendChild(badge);
  }

  async function requestAiCoaching(q, text) {
    const body = document.getElementById("topik2-ai-coach-body");
    const btn = document.getElementById("topik2-ai-coach-btn");
    if (!body || !btn) return;
    btn.disabled = true;
    btn.textContent = t("topik2AiCoachLoading", "Getting coaching…");
    body.hidden = false;
    body.innerHTML = `<p class="topik2-ai-coach-loading">${escapeHtml(
      t("topik2AiCoachLoading", "Getting coaching…")
    )}</p>`;
    let payload = { ai: false, issues: [], languageScore: null, summary: "" };
    const ruleLang = playerState.lastScore?.traits?.language;
    try {
      const r = await fetch("/api/topik2-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: q.type || "write-essay",
          prompt: pick(q.prompt) || pick(q.stem) || "",
          text,
          uid: getOrCreateUid(),
          questionId: q.id || null,
          ruleBasedLanguageScore:
            typeof ruleLang === "number" ? ruleLang : null,
        }),
      });
      if (r.ok) payload = await r.json();
    } catch (e) {
      payload = { ai: false, issues: [], languageScore: null, summary: "" };
    }
    body.innerHTML = renderAiCoachBody(payload);
    if (payload.ai && payload.languageScore != null) {
      applyAiLanguageBadge(payload.languageScore, q.type === "write-blank");
    }
    btn.disabled = !String(text || "").trim();
    btn.textContent = t("topik2AiCoachBtn", "Get AI coaching");
  }

  function wireAiCoach(q, text) {
    const btn = document.getElementById("topik2-ai-coach-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const field = activeField(q);
      const live = (field?.value || text || "").trim();
      if (!live) return;
      requestAiCoaching(q, live);
    });
  }

  function rulesHtml(rules) {
    if (!rules?.length) return "";
    const lis = rules
      .map(
        (r) =>
          `<li class="${r.ok ? "is-pass" : "is-miss"}"><span class="topik2-rule-tag">${escapeHtml(
            r.trait
          )}</span> ${escapeHtml(r.label)}: ${escapeHtml(r.detail)}</li>`
      )
      .join("");
    return `<div class="topik2-layer"><h3 class="topik2-layer-title">${escapeHtml(
      t("topik2LayerWhy", "Why these trait scores")
    )}</h3><ul class="topik2-rules">${lis}</ul></div>`;
  }

  function layerListHtml(title, items, className) {
    if (!items?.length) return "";
    const lis = items.map((it) => `<li>${escapeHtml(pick(it) || String(it))}</li>`).join("");
    return `<div class="topik2-layer ${className || ""}"><h3 class="topik2-layer-title">${escapeHtml(
      title
    )}</h3><ul>${lis}</ul></div>`;
  }

  function patternsHtml(patterns) {
    if (!patterns?.length) return "";
    const lis = patterns
      .map((p) => `<li>${escapeHtml(pick(p.label))} <span class="topik2-rule-tag">${escapeHtml(p.id)}</span></li>`)
      .join("");
    return `<div class="topik2-layer"><h3 class="topik2-layer-title">${escapeHtml(
      t("topik2LayerPatterns", "2 · Recurring patterns")
    )}</h3><ul>${lis}</ul></div>`;
  }

  function scorePanelHtml(q, score, attempt, submittedText) {
    const tone = score.composite >= 75 ? "is-ok" : score.composite >= 45 ? "is-mid" : "is-stub";
    const verdict = score.ok
      ? t("topik2Correct", "Looks good")
      : score.kind === "cloze" && score.composite >= 45
        ? t("topik2PartialCredit", "Partial credit — revise and resubmit")
        : score.kind === "cloze"
          ? t("topik2ClozeMiss", "Not in the accepted set — revise")
          : t("topik2TryAgain", "Keep revising with the axes below");

    const tip = score.ok ? pick(q.feedback?.ok) : pick(q.feedback?.stub);
    const gaming = score.gaming
      ? `<p class="topik2-gaming">${escapeHtml(pick(score.gaming))}</p>`
      : "";
    const hist =
      attempt && attempt.count > 0
        ? `<p class="topik2-attempt-hist">${escapeHtml(
            t("topik2AttemptHist", "Attempts")
          )}: ${attempt.count} · ${escapeHtml(t("topik2LastScore", "Last"))} ${
            attempt.last
          } · ${escapeHtml(t("topik2BestScore", "Best"))} ${attempt.best}</p>`
        : "";
    const hasText = !!(submittedText && String(submittedText).trim());

    return `
      <div class="topik2-score-panel ${tone}">
        <p class="topik2-score-eyebrow">${escapeHtml(t("topik2ScoreEyebrow", "Formative practice score"))}</p>
        <div class="topik2-score-row">
          <div class="topik2-score-num" aria-label="${escapeHtml(t("topik2Composite", "Composite"))}">${score.composite}</div>
          <div class="topik2-score-copy">
            <p class="topik2-feedback-verdict">${escapeHtml(verdict)}</p>
            <p class="topik2-score-scale">0–100 · ${escapeHtml(t("topik2NotTopikPts", "not official TOPIK points"))}</p>
            ${hist}
          </div>
        </div>
        ${traitBarsHtml(score)}
        ${gaming}
        <p class="topik2-rewrite-cta">${escapeHtml(
          t("topik2RewriteHint", "Edit your answer anytime, then resubmit — no hearts lost.")
        )}</p>
        <p class="topik2-disclaimer topik2-disclaimer--sticky">${escapeHtml(
          t("topik2FormativeDisclaimer", "연습용 형성 점수 · 공식 TOPIK 아님")
        )}</p>
      </div>
      ${aiCoachPanelShellHtml(hasText)}
      <p>${escapeHtml(tip || "")}</p>
      ${layerListHtml(t("topik2LayerIssues", "1 · Clear issues"), score.issues, "topik2-layer--issues")}
      ${patternsHtml(score.patterns)}
      ${layerListHtml(t("topik2LayerFlow", "3 · Flow / organization"), score.flowNotes)}
      ${checklistHtml(score.items)}
      ${rulesHtml(score.rules)}
      ${
        score.kind === "free"
          ? `<p class="topik2-why">${escapeHtml(t("topik2CharMeta", "Length"))}: ${score.len} (${score.min}–${score.max})</p>`
          : ""
      }`;
  }

  function onCheck() {
    const { bank, index } = playerState;
    const els = playerEls();
    if (!bank?.questions?.[index] || !els.feedback) return;

    const q = bank.questions[index];
    if (isMcqType(q)) return;
    const field = activeField(q);
    const raw = field?.value || "";
    const score = scoreSubmission(bank, q, raw);
    const attempt = recordAttempt(q.id || `q-${index}`, score.composite);
    const why = pick(q.why);
    playerState.lastScore = score;
    playerState.lastQuestionId = q.id || `q-${index}`;
    awardT2Xp(q.id || `q-${index}`, xpWantForComposite(score.composite));

    /* Rewrite loop: keep field editable; no heart cost. */
    if (field) field.disabled = false;
    if (els.check) {
      els.check.disabled = false;
      els.check.textContent = t("topik2Resubmit", "다시 쓰고 제출");
    }

    els.feedback.hidden = false;
    els.feedback.className = `topik2-feedback ${
      score.composite >= 75 ? "is-ok" : score.composite >= 45 ? "is-mid" : "is-stub"
    }`;
    els.feedback.innerHTML = `
      ${scorePanelHtml(q, score, attempt, raw)}
      <p class="topik2-reveal-row">
        <button type="button" class="topik2-reveal-btn" id="topik2-reveal-model">${escapeHtml(
          isFreeType(q)
            ? t("topik2RevealOutline", "Show outline (optional)")
            : t("topik2RevealModel", "Show model (optional)")
        )}</button>
      </p>
      <div id="topik2-model-slot" hidden></div>
      ${why ? `<p class="topik2-why">${escapeHtml(why)}</p>` : ""}
      <p class="topik2-disclaimer">${escapeHtml(
        t("topik2FormativeDisclaimer", "연습용 형성 점수 · 공식 TOPIK 아님")
      )}</p>`;

    wireAiCoach(q, raw);

    const revealBtn = document.getElementById("topik2-reveal-model");
    const slot = document.getElementById("topik2-model-slot");
    if (playerState.revealModel && slot) {
      slot.hidden = false;
      slot.innerHTML = modelBlockHtml(q);
      if (revealBtn) revealBtn.disabled = true;
    } else {
      revealBtn?.addEventListener("click", () => {
        playerState.revealModel = true;
        if (slot) {
          slot.hidden = false;
          slot.innerHTML = modelBlockHtml(q);
        }
        revealBtn.disabled = true;
      });
    }

    if (els.next) {
      els.next.hidden = false;
      els.next.textContent =
        index + 1 < bank.questions.length
          ? t("topik2NextQ", "Next item →")
          : t("topik2DonePilot", "Done — close");
    }
  }

  function onNext() {
    const { bank, index } = playerState;
    if (!bank?.questions?.length) return;
    if (index + 1 < bank.questions.length) {
      playerState.index = index + 1;
      renderPlayerQuestion();
    } else {
      showPlayer(false);
    }
  }

  function renderDetail(unit, bank) {
    const note = pick(unit.note) || t("topik2NoNote", "No note.");
    const qCount = bank?.questions?.length ?? unit.questionCount ?? 0;

    const canPractice = unit.status === "pilot" && bank?.questions?.length;
    const practiceBtn = canPractice
      ? `<button type="button" class="topik2-practice-btn" data-practice="${escapeHtml(unit.id)}">${escapeHtml(
          t("topik2StartPractice", "Practice these items →")
        )}</button>`
      : `<p class="topik2-empty" style="margin-top:10px">${escapeHtml(
          t("topik2QuizLater", "Quiz player / AI writing coach not wired for this unit yet.")
        )}</p>`;

    const practiceMeta = canPractice
      ? `<p class="topik2-practice-meta">${escapeHtml(
          t("topik2PracticeCount", "{n} practice questions").replace("{n}", String(qCount))
        )}</p>`
      : !bank?.questions?.length
        ? `<p class="topik2-empty">${escapeHtml(
            t("topik2NoBank", "No question bank yet (scaffold/planned).")
          )}</p>`
        : "";

    const shellMods = Array.isArray(unit.modules)
      ? unit.modules
          .filter((m) => m && (m.type === "shell" || m.body))
          .map(
            (m) =>
              `<li class="topik2-shell-line">${escapeHtml(pick(m.body) || "")}</li>`
          )
          .join("")
      : "";
    const shellHtml = shellMods
      ? `<p class="k">${escapeHtml(t("topik2Shell", "Shell map"))}</p><ul class="topik2-qlist">${shellMods}</ul>`
      : "";

    return `
      <div class="topik2-detail">
        ${shellHtml}
        <p class="k">${escapeHtml(t("topik2Note", "Note"))}</p>
        <p>${escapeHtml(note)}</p>
        ${practiceMeta}
        ${practiceBtn}
      </div>`;
  }

  function previewText(unit) {
    if (unit.status === "pilot" && (unit.questionCount || 0) > 0) {
      return t("topik2PracticeCount", "{n} practice questions").replace(
        "{n}",
        String(unit.questionCount || 0)
      );
    }
    if (unit.status === "planned") {
      return t("topik2Planned", "Planned — no content yet");
    }
    if (unit.section === "writing") {
      return t("topik2WriteShell", "Writing shell — no prompt bank yet");
    }
    if (unit.section === "listening" || unit.section === "reading") {
      return t("topik2EngineLater", "Engine reuse later — no bank yet");
    }
    return t("topik2Scaffold", "Scaffold — structure only");
  }

  function unitBadgeHtml(unit) {
    if (unit.status === "pilot" && (unit.questionCount || 0) > 0) {
      return `<span class="topik2-badge topik2-badge--practice">${escapeHtml(
        t("topik2BadgePractice", "practice")
      )}</span>`;
    }
    return "";
  }

  function renderList(track) {
    const list = document.getElementById("topik2-list");
    const title = document.getElementById("topik2-title");
    const lead = document.getElementById("topik2-lead");
    const meta = document.getElementById("topik2-meta");
    if (!list) return;

    if (title) title.textContent = pick(track.title);
    if (lead) lead.textContent = pick(track.lead);
    if (meta) {
      const units = track.units || [];
      /* Learner-facing meta only — no track.id / status watermark (cf. Hangul/Basics path). */
      const practiceReady = units.filter(
        (u) => u.status === "pilot" && (u.questionCount || 0) > 0
      ).length;
      meta.textContent = `v${track.version} · ${units.length} units · ${t(
        "topik2MetaPractice",
        "{n} with practice"
      ).replace("{n}", String(practiceReady))}`;
    }

    list.classList.add("skill-path");
    list.innerHTML = "";
    (track.units || []).forEach((unit) => {
      const li = document.createElement("li");
      const node = document.createElement("div");
      node.className = `skill-node skill-node--${unit.kind || "planned"}`;
      node.textContent = String(unit.order ?? "").padStart(2, "0");
      node.setAttribute("aria-hidden", "true");

      const wrap = document.createElement("div");
      wrap.className = "skill-card";

      const card = document.createElement("div");
      card.className = "topik2-item";
      card.dataset.id = unit.id;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "topik2-item-toggle";
      toggle.innerHTML = `
        <div class="topik2-item-top">
          <span class="topik2-item-title">${escapeHtml(pick(unit.title))}</span>
          ${unitBadgeHtml(unit)}
        </div>
        <div class="topik2-preview">${escapeHtml(previewText(unit))}</div>`;

      const slot = document.createElement("div");
      slot.className = "topik2-detail-slot";
      slot.hidden = true;

      toggle.addEventListener("click", async () => {
        const open = card.classList.contains("is-open");
        list.querySelectorAll(".topik2-item").forEach((el) => {
          el.classList.remove("is-open");
          const s = el.querySelector(".topik2-detail-slot");
          if (s) {
            s.hidden = true;
            s.innerHTML = "";
          }
        });
        if (!open) {
          card.classList.add("is-open");
          slot.hidden = false;
          slot.innerHTML = `<p class="topik2-empty">${escapeHtml(t("topik2Loading", "Loading…"))}</p>`;
          try {
            const bank = unit.bankFile ? await loadBank(unit.bankFile) : null;
            slot.innerHTML = renderDetail(unit, bank);
            const practice = slot.querySelector("[data-practice]");
            if (practice) {
              practice.addEventListener("click", () => openPlayer(unit, bank));
            }
          } catch (err) {
            console.error(err);
            slot.innerHTML = `<p class="topik2-error">${escapeHtml(
              t("topik2BankError", "Could not load question bank.")
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
  }

  function bindPlayerChrome() {
    const els = playerEls();
    els.check?.addEventListener("click", onCheck);
    els.next?.addEventListener("click", onNext);
    els.close?.addEventListener("click", () => showPlayer(false));
    els.scriptToggle?.addEventListener("click", () => {
      const q = playerState.bank?.questions?.[playerState.index];
      if (!q?.script || !els.script) return;
      playerState.revealScript = !playerState.revealScript;
      els.script.hidden = !playerState.revealScript;
      els.scriptToggle.textContent = playerState.revealScript
        ? t("topik2HideScript", "Hide script")
        : t("topik2RevealScript", "Show script");
    });
    els.input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onCheck();
      }
    });
    els.textarea?.addEventListener("input", () => {
      const q = playerState.bank?.questions?.[playerState.index];
      if (q) updateCharCounter(q);
    });
  }

  function applyOfficialI18n() {
    const set = (id, key, fb) => {
      const el = document.getElementById(id);
      if (el) el.textContent = t(key, fb);
    };
    set("topik2-official-title", "topik2OfficialTitle", "Actual TOPIK score");
    set(
      "topik2-official-lead",
      "topik2OfficialLead",
      "Have you taken a real TOPIK exam? Sharing your result helps us keep validating jabi scoring."
    );
    set(
      "topik2-official-privacy",
      "topik2OfficialPrivacy",
      "Stored fully anonymously and used only to validate scoring accuracy."
    );
    set("topik2-official-level-label", "topik2OfficialLevel", "Level");
    set("topik2-official-score-label", "topik2OfficialWriting", "Writing score (optional)");
    set("topik2-official-date-label", "topik2OfficialDate", "Exam date (optional)");
    const submit = document.getElementById("topik2-official-submit");
    const later = document.getElementById("topik2-official-later");
    if (submit) submit.textContent = t("topik2OfficialSubmit", "Submit");
    if (later) later.textContent = t("topik2OfficialLater", "Later");
  }

  function wireOfficialScoreForm() {
    const section = document.getElementById("topik2-official");
    const form = document.getElementById("topik2-official-form");
    const thanks = document.getElementById("topik2-official-thanks");
    const later = document.getElementById("topik2-official-later");
    if (!section || !form) return;

    const SKIP_KEY = "topik2_official_skip";
    const DONE_KEY = "topik2_official_done";
    let skipped = false;
    let done = false;
    try {
      skipped = localStorage.getItem(SKIP_KEY) === "1";
      done = localStorage.getItem(DONE_KEY) === "1";
    } catch (e) {
      /* ignore */
    }
    if (skipped || done) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    applyOfficialI18n();

    later?.addEventListener("click", () => {
      try {
        localStorage.setItem(SKIP_KEY, "1");
      } catch (e) {
        /* ignore */
      }
      section.hidden = true;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const level = document.getElementById("topik2-official-level")?.value || null;
      const scoreRaw = document.getElementById("topik2-official-score")?.value;
      const examDate = document.getElementById("topik2-official-date")?.value || null;
      const writingScore =
        scoreRaw === "" || scoreRaw == null ? null : Number(scoreRaw);
      try {
        await fetch("/api/topik2-official-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: getOrCreateUid(),
            level: level || null,
            writingScore: Number.isFinite(writingScore) ? writingScore : null,
            examDate,
          }),
        });
      } catch (err) {
        /* quiet */
      }
      try {
        localStorage.setItem(DONE_KEY, "1");
      } catch (err) {
        /* ignore */
      }
      form.hidden = true;
      if (thanks) {
        thanks.hidden = false;
        thanks.textContent = t("topik2OfficialThanks", "Thanks — this helps us improve feedback.");
      }
    });
  }

  async function boot() {
    const errEl = document.getElementById("topik2-error");
    gateT2PartnerOrGrowth();
    try {
      const res = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackCache = await res.json();
      renderList(trackCache);
      wireOfficialScoreForm();
      gateT2PartnerOrGrowth();
      if (errEl) errEl.classList.add("hidden");
    } catch (e) {
      console.error(e);
      if (errEl) {
        errEl.classList.remove("hidden");
        errEl.textContent = t(
          "topik2LoadError",
          "Could not load TOPIK II track manifest. Serve hub/ over http (not file://)."
        );
      }
    }
  }

  function applyChromeI18n() {
    const hint = document.getElementById("topik2-player-hint");
    const check = document.getElementById("topik2-player-check");
    const close = document.getElementById("topik2-player-close");
    const labelIn = document.querySelector('label[for="topik2-player-input"]');
    const labelTa = document.querySelector('label[for="topik2-player-textarea"]');
    const disc = document.getElementById("topik2-player-disclaimer");
    const q = playerState.bank?.questions?.[playerState.index];
    const mcq = isMcqType(q);
    if (hint) {
      if (mcq) {
        hint.textContent = q?.script
          ? t("topik2PlayerHintListen", hint.textContent)
          : t("topik2PlayerHintMcq", hint.textContent);
      } else {
        hint.textContent = isFreeType(q)
          ? t("topik2PlayerHintFree", hint.textContent)
          : t("topik2PlayerHint", hint.textContent);
      }
    }
    if (check) check.textContent = t("topik2Check", "제출");
    if (close) close.textContent = t("topik2Close", "Close");
    if (labelIn) labelIn.textContent = t("topik2InputLabel", "Your answer");
    if (labelTa) labelTa.textContent = t("topik2TextLabel", "Your composition");
    if (disc) {
      disc.textContent = mcq
        ? t("topik2McqDisclaimer", "Practice MCQ · not official TOPIK")
        : t("topik2FormativeDisclaimer", "연습용 형성 점수 · 공식 TOPIK 아님");
    }
  }

  window.HubI18nExtra = {
    en: {
      topik2Eyebrow: "Track pilot",
      topik2BackHub: "← Hub",
      topik2BackBasic: "Basics →",
      topik2BackHangul: "Hangul →",
      topik2BackTopik1: "TOPIK I app →",
      topik2Section: "Section",
      topik2Bank: "Bank",
      topik2Note: "Note",
      topik2Questions: "Items",
      topik2NoNote: "No note.",
      topik2Shell: "Shell map",
      topik2NoBank: "No question bank yet (scaffold/planned).",
      topik2Planned: "Planned — no content yet",
      topik2Pilot: "pilot",
      topik2WriteShell: "Writing shell — no prompt bank yet",
      topik2EngineLater: "Engine reuse later — no bank yet",
      topik2Scaffold: "Scaffold — structure only",
      topik2QuizLater: "Quiz player / AI writing coach not wired for this unit yet.",
      topik2LoadError: "Could not load TOPIK II track manifest. Serve hub/ over http (not file://).",
      topik2BankError: "Could not load question bank.",
      topik2Loading: "Loading…",
      topik2StartPractice: "Practice these items →",
      topik2PracticeCount: "{n} practice questions",
      topik2BadgePractice: "practice",
      topik2MetaPractice: "{n} with practice",
      topik2PilotTitle: "Writing pilot",
      topik2StubGrade: "Formative check — not official score",
      topik2FormativeMeta: "Formative practice score",
      topik2Check: "Submit",
      topik2Resubmit: "Revise & resubmit",
      topik2NextQ: "Next item →",
      topik2DonePilot: "Done — close",
      topik2Close: "Close",
      topik2InputLabel: "Your answer",
      topik2TextLabel: "Your composition",
      topik2Correct: "Looks good",
      topik2TryAgain: "Keep revising with the axes below",
      topik2ClozeMiss: "Not in the accepted set — revise",
      topik2PartialCredit: "Partial credit — revise and resubmit",
      topik2Partial: "partial",
      topik2AttemptHist: "Attempts",
      topik2LastScore: "Last",
      topik2BestScore: "Best",
      topik2RewriteHint: "Edit your answer anytime, then resubmit — no hearts lost.",
      topik2Model: "Model",
      topik2Outline: "Outline",
      topik2RevealModel: "Show model (optional)",
      topik2RevealOutline: "Show outline (optional)",
      topik2Chars: "chars",
      topik2CharMeta: "Length",
      topik2NoOfficial: "Practice feedback only — not an official TOPIK score.",
      topik2FormativeDisclaimer: "Formative practice score · not official TOPIK",
      topik2ScoreEyebrow: "Formative practice score",
      topik2Composite: "Composite",
      topik2NotTopikPts: "not official TOPIK points",
      topik2TraitNA: "Not scored for this item type",
      topik2LayerIssues: "1 · Clear issues",
      topik2LayerPatterns: "2 · Recurring patterns",
      topik2LayerFlow: "3 · Flow / organization",
      topik2LayerRubric: "4 · Rubric checklist",
      topik2LayerWhy: "Why these trait scores",
      topik2RuleSoftKw: "Soft keywords",
      topik2RuleLength: "Length band",
      topik2RuleFormal: "Formal register",
      topik2RuleFlow: "Markers / paragraphs",
      topik2RuleExact: "Accepted-answer match",
      topik2Detected: "detected",
      topik2Missing: "missing",
      topik2Unclear: "unclear",
      topik2Hit: "hit",
      topik2Miss: "miss",
      topik2HasBreaks: "line breaks",
      topik2NoBreaks: "single block",
      topik2PlayerHint: "Type one formal written answer for the blank, then Check. Model stays hidden until you opt in.",
      topik2PlayerHintFree: "Write a formal answer in the length band, then Check. Tips do not show a full model.",
      topik2PlayerHintMcq: "Pick one answer. Feedback shows after you choose.",
      topik2PlayerHintListen: "Pick one answer. No audio yet — reveal the script if needed.",
      topik2McqMeta: "MCQ practice",
      topik2McqDisclaimer: "Practice MCQ · not official TOPIK",
      topik2McqCorrect: "Correct",
      topik2McqIncorrect: "Not quite",
      topik2Answer: "Answer",
      topik2RevealScript: "Show script",
      topik2HideScript: "Hide script",
      topik2AiCoachTitle: "AI coaching (language)",
      topik2AiCoachNote: "Separate from the rule-based score above. Grammar & register only.",
      topik2AiCoachBtn: "Get AI coaching",
      topik2AiCoachLoading: "Getting coaching…",
      topik2AiCoachUnavailable: "AI coaching is not available right now.",
      topik2AiCoachNoIssues: "No grammar/register issues flagged.",
      topik2AiRef: "AI ref",
      topik2AiRefTitle: "Reference only — may differ from rule-based scoring; still being validated",
      topik2OfficialTitle: "Actual TOPIK score",
      topik2OfficialLead:
        "Have you taken a real TOPIK exam? Sharing your result helps us keep validating jabi scoring.",
      topik2OfficialPrivacy:
        "Stored fully anonymously and used only to validate scoring accuracy.",
      topik2OfficialLevel: "Level",
      topik2OfficialWriting: "Writing score (optional)",
      topik2OfficialDate: "Exam date (optional)",
      topik2OfficialSubmit: "Submit",
      topik2OfficialLater: "Later",
      topik2OfficialThanks: "Thanks — this helps us improve feedback.",
      topik2PartnerEyebrow: "Partner",
      topik2PartnerTitle: "Choose your jamo",
      topik2PartnerLead: "One partner for TOPIK II. ㅈ is jabi. (guide) — not a partner.",
      topik2StageLabel: "Stage {n} · {name}",
      topik2XpMax: "Max stage",
      topik2XpToNext: "{remain} XP → stage {n}",
    },
    ko: {
      topik2Eyebrow: "트랙 파일럿",
      topik2BackHub: "← 허브",
      topik2BackBasic: "기초 →",
      topik2BackHangul: "한글 →",
      topik2BackTopik1: "TOPIK I 앱 →",
      topik2Section: "영역",
      topik2Bank: "뱅크",
      topik2Note: "메모",
      topik2Questions: "문항",
      topik2NoNote: "메모 없음.",
      topik2Shell: "껍데기 지도",
      topik2NoBank: "아직 문제 뱅크 없음 (스캐폴드/예정).",
      topik2Planned: "예정 — 콘텐츠 없음",
      topik2Pilot: "파일럿",
      topik2WriteShell: "쓰기 껍데기 — 프롬프트 뱅크 없음",
      topik2EngineLater: "엔진 재사용은 나중 — 뱅크 없음",
      topik2Scaffold: "스캐폴드 — 구조만",
      topik2QuizLater: "이 유닛은 퀴즈·AI 작문 코치 미연결.",
      topik2LoadError: "TOPIK II 트랙 매니페스트를 불러오지 못했습니다. hub/를 http로 여세요.",
      topik2BankError: "문제 뱅크를 불러오지 못했습니다.",
      topik2Loading: "불러오는 중…",
      topik2StartPractice: "문항 연습하기 →",
      topik2PracticeCount: "연습 문항 {n}개",
      topik2BadgePractice: "연습",
      topik2MetaPractice: "연습 {n}개",
      topik2PilotTitle: "쓰기 파일럿",
      topik2StubGrade: "형성 채점 — 공식 점수 아님",
      topik2FormativeMeta: "연습용 형성 점수",
      topik2Check: "제출",
      topik2Resubmit: "다시 쓰고 제출",
      topik2NextQ: "다음 문항 →",
      topik2DonePilot: "완료 — 닫기",
      topik2Close: "닫기",
      topik2InputLabel: "내 답",
      topik2TextLabel: "내 작문",
      topik2Correct: "맞아요",
      topik2TryAgain: "아래 축을 보고 더 다듬어 보세요",
      topik2ClozeMiss: "허용 답 집합에 없음 — 다시 쓰기",
      topik2PartialCredit: "부분 점수 — 다시 쓰고 제출하세요",
      topik2Partial: "부분",
      topik2AttemptHist: "시도",
      topik2LastScore: "최근",
      topik2BestScore: "최고",
      topik2RewriteHint: "언제든 고쳐 다시 제출하세요 — 하트 차감 없음.",
      topik2Model: "모범",
      topik2Outline: "개요",
      topik2RevealModel: "모범 보기 (선택)",
      topik2RevealOutline: "개요 보기 (선택)",
      topik2Chars: "자",
      topik2CharMeta: "분량",
      topik2NoOfficial: "연습용 피드백만 — 공식 TOPIK 점수 아님.",
      topik2FormativeDisclaimer: "연습용 형성 점수 · 공식 TOPIK 아님",
      topik2ScoreEyebrow: "연습용 형성 점수",
      topik2Composite: "합산",
      topik2NotTopikPts: "공식 TOPIK 배점 아님",
      topik2TraitNA: "이 문항 유형에서는 채점하지 않음",
      topik2LayerIssues: "1 · 명확한 실수",
      topik2LayerPatterns: "2 · 반복 패턴",
      topik2LayerFlow: "3 · 흐름·조직",
      topik2LayerRubric: "4 · 루브릭 체크리스트",
      topik2LayerWhy: "왜 이 축 점수인가",
      topik2RuleSoftKw: "소프트 키워드",
      topik2RuleLength: "분량 대역",
      topik2RuleFormal: "격식체",
      topik2RuleFlow: "담화 표지·문단",
      topik2RuleExact: "허용 답 일치",
      topik2Detected: "감지됨",
      topik2Missing: "없음",
      topik2Unclear: "불명확",
      topik2Hit: "일치",
      topik2Miss: "불일치",
      topik2HasBreaks: "줄바꿈 있음",
      topik2NoBreaks: "단일 블록",
      topik2PlayerHint: "빈칸에 격식체 답을 쓰고 확인. 모범은 선택 공개까지 숨김.",
      topik2PlayerHintFree: "분량대에 맞춰 격식체로 쓰고 확인. 팁에 전문 모범은 없음.",
      topik2PlayerHintMcq: "보기 하나를 고르세요. 고른 뒤 피드백이 나옵니다.",
      topik2PlayerHintListen: "보기 하나를 고르세요. 오디오 없음 — 필요하면 대본을 확인하세요.",
      topik2McqMeta: "객관식 연습",
      topik2McqDisclaimer: "연습용 MCQ · 공식 TOPIK 아님",
      topik2McqCorrect: "맞아요",
      topik2McqIncorrect: "다시 볼까요",
      topik2Answer: "정답",
      topik2RevealScript: "대본 보기",
      topik2HideScript: "대본 숨기기",
      topik2AiCoachTitle: "AI 코칭 (언어)",
      topik2AiCoachNote: "위 규칙 기반 점수와 별개입니다. 문법·격식만 봅니다.",
      topik2AiCoachBtn: "AI 코칭 받기",
      topik2AiCoachLoading: "코칭 불러오는 중…",
      topik2AiCoachUnavailable: "지금은 AI 코칭을 받을 수 없습니다.",
      topik2AiCoachNoIssues: "문법·격식 이슈가 표시되지 않았습니다.",
      topik2AiRef: "AI 참고",
      topik2AiRefTitle: "참고용 — 규칙 기반 점수와 다를 수 있음 · 계속 검증 중",
      topik2OfficialTitle: "실제 TOPIK 성적",
      topik2OfficialLead:
        "실제 TOPIK 시험을 보셨나요? 결과를 알려주시면 jabi의 채점 정확도를 계속 검증하는 데 도움이 됩니다.",
      topik2OfficialPrivacy: "완전 익명으로 저장되며, 채점 정확도 검증 목적으로만 사용됩니다.",
      topik2OfficialLevel: "급수",
      topik2OfficialWriting: "쓰기 점수 (선택)",
      topik2OfficialDate: "응시일 (선택)",
      topik2OfficialSubmit: "제출",
      topik2OfficialLater: "나중에",
      topik2OfficialThanks: "감사합니다 — 피드백 개선에 도움이 됩니다.",
      topik2PartnerEyebrow: "학습 짝",
      topik2PartnerTitle: "자음 짝 고르기",
      topik2PartnerLead: "TOPIK II용 학습 짝 하나. ㅈ는 자비(길잡이) — 파트너 아님.",
      topik2StageLabel: "스테이지 {n} · {name}",
      topik2XpMax: "최고 스테이지",
      topik2XpToNext: "다음 스테이지 {n}까지 {remain} XP",
    },
    zh: {
      topik2Eyebrow: "轨道试点",
      topik2BackHub: "← 中心",
      topik2BackBasic: "基础 →",
      topik2BackHangul: "韩文 →",
      topik2BackTopik1: "TOPIK I 应用 →",
      topik2Section: "分区",
      topik2Bank: "题库",
      topik2Note: "说明",
      topik2Questions: "题目",
      topik2NoNote: "无说明。",
      topik2Shell: "外壳地图",
      topik2NoBank: "尚无题库（骨架/计划中）。",
      topik2Planned: "计划中 — 尚无内容",
      topik2Pilot: "试点",
      topik2WriteShell: "写作外壳 — 尚无提示题库",
      topik2EngineLater: "引擎复用稍后 — 尚无题库",
      topik2Scaffold: "骨架 — 仅结构",
      topik2QuizLater: "本单元尚未接入测验 / AI 写作教练。",
      topik2LoadError: "无法加载 TOPIK II 轨道清单。请用 http 打开 hub/。",
      topik2BankError: "无法加载题库。",
      topik2Loading: "加载中…",
      topik2StartPractice: "练习这些题 →",
      topik2PracticeCount: "{n} 道练习题",
      topik2BadgePractice: "练习",
      topik2MetaPractice: "{n} 个可练",
      topik2PilotTitle: "写作试点",
      topik2StubGrade: "形成性核对 — 非官方分数",
      topik2FormativeMeta: "形成性练习分",
      topik2Check: "提交",
      topik2Resubmit: "改写并再交",
      topik2NextQ: "下一题 →",
      topik2DonePilot: "完成 — 关闭",
      topik2Close: "关闭",
      topik2InputLabel: "你的答案",
      topik2TextLabel: "你的作文",
      topik2Correct: "看起来对",
      topik2TryAgain: "请按下方轴继续修改",
      topik2ClozeMiss: "不在可接受答案集 — 请改写",
      topik2PartialCredit: "部分得分 — 请改写再交",
      topik2Partial: "部分",
      topik2AttemptHist: "尝试",
      topik2LastScore: "最近",
      topik2BestScore: "最高",
      topik2RewriteHint: "可随时修改再交 — 不扣爱心。",
      topik2Model: "范例",
      topik2Outline: "提纲",
      topik2RevealModel: "查看范例（可选）",
      topik2RevealOutline: "查看提纲（可选）",
      topik2Chars: "字（韩文）",
      topik2CharMeta: "篇幅",
      topik2NoOfficial: "仅练习反馈 — 非官方 TOPIK 分数。",
      topik2FormativeDisclaimer: "形成性练习分 · 非官方 TOPIK",
      topik2ScoreEyebrow: "形成性练习分",
      topik2Composite: "综合",
      topik2NotTopikPts: "非官方 TOPIK 分值",
      topik2TraitNA: "本题型不评分",
      topik2LayerIssues: "1 · 明确问题",
      topik2LayerPatterns: "2 · 反复模式",
      topik2LayerFlow: "3 · 连贯/结构",
      topik2LayerRubric: "4 · 量表清单",
      topik2LayerWhy: "各轴分数依据",
      topik2RuleSoftKw: "软关键词",
      topik2RuleLength: "篇幅区间",
      topik2RuleFormal: "书面敬体",
      topik2RuleFlow: "衔接词/分段",
      topik2RuleExact: "可接受答案匹配",
      topik2Detected: "已检测到",
      topik2Missing: "缺失",
      topik2Unclear: "不明确",
      topik2Hit: "命中",
      topik2Miss: "未命中",
      topik2HasBreaks: "有换行",
      topik2NoBreaks: "单块",
      topik2PlayerHint: "填写书面敬体空格后核对。范例默认隐藏，需可选查看。",
      topik2PlayerHintFree: "按篇幅写书面敬体后核对。提示不含全文范例。",
      topik2PlayerHintMcq: "选择一个答案。选择后显示反馈。",
      topik2PlayerHintListen: "选择一个答案。暂无音频 — 需要时可查看文稿。",
      topik2McqMeta: "选择题练习",
      topik2McqDisclaimer: "练习MCQ · 非官方 TOPIK",
      topik2McqCorrect: "正确",
      topik2McqIncorrect: "再看看",
      topik2Answer: "答案",
      topik2RevealScript: "显示文稿",
      topik2HideScript: "隐藏文稿",
      topik2AiCoachTitle: "AI 辅导（语言）",
      topik2AiCoachNote: "与上方规则评分分开。仅看语法与语体。",
      topik2AiCoachBtn: "获取 AI 辅导",
      topik2AiCoachLoading: "正在获取辅导…",
      topik2AiCoachUnavailable: "目前无法使用 AI 辅导。",
      topik2AiCoachNoIssues: "未标出语法/语体问题。",
      topik2AiRef: "AI参考",
      topik2AiRefTitle: "仅供参考 — 可能与规则评分不同 · 持续校验中",
      topik2OfficialTitle: "真实 TOPIK 成绩",
      topik2OfficialLead:
        "参加过正式 TOPIK 吗？分享结果有助于我们持续校验 jabi 评分准确度。",
      topik2OfficialPrivacy: "完全匿名存储，仅用于评分准确度校验。",
      topik2OfficialLevel: "等级",
      topik2OfficialWriting: "写作分数（可选）",
      topik2OfficialDate: "考试日期（可选）",
      topik2OfficialSubmit: "提交",
      topik2OfficialLater: "以后再说",
      topik2OfficialThanks: "谢谢 — 这有助于改进反馈。",
      topik2PartnerEyebrow: "伙伴",
      topik2PartnerTitle: "选择辅音伙伴",
      topik2PartnerLead: "TOPIK II 选一位伙伴。ㅈ是 jabi.（向导）— 不是伙伴。",
      topik2StageLabel: "阶段 {n} · {name}",
      topik2XpMax: "最高阶段",
      topik2XpToNext: "距阶段 {n} 还差 {remain} XP",
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    bindPlayerChrome();
    applyChromeI18n();
    boot();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          applyChromeI18n();
          applyOfficialI18n();
          boot();
          gateT2PartnerOrGrowth();
          if (playerState.bank && !document.getElementById("topik2-player")?.hidden) {
            renderPlayerQuestion();
          }
        }, 0);
      });
    });
  });
})();

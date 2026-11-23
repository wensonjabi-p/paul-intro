/**
 * Teach — AI learner report preview + vetted seat list (no fake credentials).
 * Handoff packet shape follows data/report-schema.json.
 */
(function () {
  const DATA_BASE = "./data/";
  const LS_KEY = "topik-coach-v1";
  const MAIL = "wensonjabi@gmail.com";
  const KNOWN_MODES = { catch: true, mercy: true, guide: true };

  const reportEl = document.getElementById("teach-report");
  const seatsEl = document.getElementById("teach-seats");
  const policyEl = document.getElementById("teach-policy");
  const errorEl = document.getElementById("teach-error");

  let manifest = null;

  function t(key) {
    return (window.HubI18n && window.HubI18n.t(key)) || key;
  }

  function uiLang() {
    return (window.HubI18n && window.HubI18n.getLang()) || "en";
  }

  function pick(obj) {
    if (!obj || typeof obj !== "object") return "";
    const L = uiLang();
    if (L === "ko" && obj.ko) return obj.ko;
    if (L === "zh" && obj.zh) return obj.zh;
    return obj.en || obj.ko || "";
  }

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.remove("hidden");
  }

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "teach-toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function formatTag(tag) {
    const s = String(tag || "");
    return s
      .replace(/^grammar:/, "grammar · ")
      .replace(/^vocab:/, "vocab · ")
      .replace(/^skill:/, "skill · ");
  }

  function tagStrengthRows(state) {
    const byTag = (state && state.learner && state.learner.byTag) || {};
    const rows = Object.entries(byTag)
      .filter(([tag]) => !String(tag).startsWith("source:"))
      .map(([tag, m]) => {
        const corrects = m.corrects || 0;
        const wrongs = m.wrongs || 0;
        const hints = m.hints || 0;
        const total = corrects + wrongs;
        const rate = total ? corrects / total : 0;
        return { tag, corrects, wrongs, hints, total, rate };
      })
      .filter((r) => r.total > 0);
    const strengths = rows
      .filter((r) => r.corrects >= 1 && r.rate >= 0.6)
      .sort((a, b) => b.rate - a.rate || b.corrects - a.corrects)
      .slice(0, 4);
    const weaknesses = rows
      .filter((r) => r.wrongs >= 1)
      .sort((a, b) => b.wrongs - a.wrongs || a.rate - b.rate)
      .slice(0, 4);
    return { strengths, weaknesses, rows };
  }

  function estimateReadiness(state) {
    const L = (state && state.learner) || {};
    const ok = L.totalCorrectTries || 0;
    const bad = L.totalWrongTries || 0;
    if (ok + bad < 3) return null;
    const raw = (ok / (ok + bad)) * 100;
    const hintPen = Math.min(15, (L.totalHints || 0) * 1.5);
    return Math.round(Math.min(95, Math.max(5, raw - hintPen)));
  }

  function buildReport(state) {
    const { strengths, weaknesses, rows } = tagStrengthRows(state);
    const L = (state && state.learner) || {};
    const totalHints = L.totalHints || 0;
    const totalTries = (L.totalCorrectTries || 0) + (L.totalWrongTries || 0);
    const hintHeavy = totalTries > 0 && totalHints / Math.max(1, totalTries) >= 0.45;
    const stalledTags = weaknesses
      .filter((r) => r.wrongs >= 2 && r.rate < 0.45)
      .map((r) => r.tag);
    let sparseness = "high";
    if (rows.length >= 6) sparseness = "low";
    else if (rows.length >= 3) sparseness = "medium";

    const suggestedFocus = [];
    if (weaknesses.length) suggestedFocus.push("direction", "qna");
    if (hintHeavy) suggestedFocus.push("direction");
    const uniqFocus = [...new Set(suggestedFocus.length ? suggestedFocus : ["direction"])];

    const aiAlreadyTried = [];
    const mode = state && state.mode ? String(state.mode).toLowerCase() : "";
    if (KNOWN_MODES[mode]) aiAlreadyTried.push("Catch/Mercy/Guide mode");
    if (state && state.srs && (Array.isArray(state.srs) ? state.srs.length : Object.keys(state.srs || {}).length)) {
      aiAlreadyTried.push("SRS weak-deck");
    }
    if (totalHints > 0) aiAlreadyTried.push("hint ladder");
    if (!aiAlreadyTried.length) aiAlreadyTried.push("app practice (when available)");

    return {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      source: LS_KEY,
      readinessPct: estimateReadiness(state),
      strengths,
      weaknesses,
      signals: { hintHeavy, stalledTags, sparseness },
      aiAlreadyTried,
      suggestedFocus: uniqFocus,
      learnerNote: "",
    };
  }

  /** Slim rows to report-schema tagRow shape (no internal corrects/hints/total). */
  function toHandoffPacket(report, learnerNote) {
    return {
      schemaVersion: report.schemaVersion,
      generatedAt: report.generatedAt,
      source: report.source,
      readinessPct: report.readinessPct,
      strengths: (report.strengths || []).map((r) => ({
        tag: r.tag,
        rate: Math.round((r.rate || 0) * 100) / 100,
      })),
      weaknesses: (report.weaknesses || []).map((r) => ({
        tag: r.tag,
        wrongs: r.wrongs || 0,
      })),
      signals: {
        hintHeavy: !!(report.signals && report.signals.hintHeavy),
        stalledTags: (report.signals && report.signals.stalledTags) || [],
        sparseness: (report.signals && report.signals.sparseness) || "high",
      },
      aiAlreadyTried: report.aiAlreadyTried || [],
      suggestedFocus: report.suggestedFocus || [],
      learnerNote: learnerNote || "",
    };
  }

  function sparseLabel(level) {
    if (level === "low") return t("teachSparseLow");
    if (level === "medium") return t("teachSparseMed");
    return t("teachSparseHigh");
  }

  function listHtml(rows, emptyMsg, kind) {
    if (!rows.length) return "<li>" + emptyMsg + "</li>";
    return rows
      .map((r) => {
        const extra =
          kind === "weak"
            ? " · ×" + r.wrongs
            : " · " + Math.round(r.rate * 100) + "%";
        return "<li><strong>" + escapeHtml(formatTag(r.tag)) + "</strong>" + extra + "</li>";
      })
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderReport() {
    if (!reportEl) return;
    const state = loadState();
    const report = buildReport(state);
    const empty = t("teachReportEmpty");
    const readyLabel =
      report.readinessPct == null
        ? t("teachReadyNone")
        : t("teachReadyPct").replace("{pct}", String(report.readinessPct));

    const signalItems = [
      t("teachSignalHints") +
        ": " +
        (report.signals.hintHeavy ? t("teachYes") : t("teachNo")),
      t("teachSignalSparse") + ": " + sparseLabel(report.signals.sparseness),
      t("teachSignalStalled") +
        ": " +
        (report.signals.stalledTags.length
          ? report.signals.stalledTags.map(formatTag).join(", ")
          : t("teachNone")),
    ];

    const focusLabels = (manifest && manifest.focusLabels) || {};
    const focusText = report.suggestedFocus
      .map((id) => pick(focusLabels[id]) || id)
      .join(" · ");

    const triedLabels = report.aiAlreadyTried.map((s) => {
      if (s === "Catch/Mercy/Guide mode") return t("teachTriedMode");
      if (s === "SRS weak-deck") return t("teachTriedSrs");
      if (s === "hint ladder") return t("teachTriedHints");
      if (s === "app practice (when available)") return t("teachTriedApp");
      return s;
    });

    reportEl.innerHTML =
      '<div class="teach-report-meta">' +
      '<span class="ready">' +
      escapeHtml(readyLabel) +
      "</span>" +
      "<span>" +
      escapeHtml(t("teachReportSource")) +
      "</span>" +
      "</div>" +
      (report.weaknesses.length || report.strengths.length
        ? ""
        : '<p class="teach-empty">' + escapeHtml(empty) + "</p>") +
      '<div class="teach-cols">' +
      "<div><h3>" +
      escapeHtml(t("teachStrengths")) +
      "</h3><ul>" +
      listHtml(report.strengths, t("teachNone"), "strong") +
      "</ul></div>" +
      "<div><h3>" +
      escapeHtml(t("teachWeaknesses")) +
      "</h3><ul>" +
      listHtml(report.weaknesses, t("teachNone"), "weak") +
      "</ul></div>" +
      "</div>" +
      '<h3 class="teach-block-h">' +
      escapeHtml(t("teachSignals")) +
      "</h3>" +
      '<ul class="teach-signals">' +
      signalItems.map((s) => "<li>" + escapeHtml(s) + "</li>").join("") +
      "</ul>" +
      '<h3 class="teach-block-h">' +
      escapeHtml(t("teachAiTried")) +
      "</h3>" +
      '<ul class="teach-signals">' +
      triedLabels.map((s) => "<li>" + escapeHtml(s) + "</li>").join("") +
      "</ul>" +
      '<h3 class="teach-block-h">' +
      escapeHtml(t("teachSuggestFocus")) +
      "</h3>" +
      '<p class="teach-empty teach-empty--tight">' +
      escapeHtml(focusText || t("teachNone")) +
      "</p>" +
      '<label class="teach-note-label" for="teach-note">' +
      escapeHtml(t("teachNoteLabel")) +
      "</label>" +
      '<textarea id="teach-note" class="teach-note" maxlength="280" placeholder="' +
      escapeHtml(t("teachNotePh")) +
      '"></textarea>' +
      '<p class="teach-privacy">' +
      escapeHtml(t("teachPrivacy")) +
      "</p>" +
      '<div class="teach-actions">' +
      '<button type="button" class="teach-btn teach-btn--primary" id="teach-copy">' +
      escapeHtml(t("teachCopy")) +
      "</button>" +
      '<a class="teach-btn" href="../app/">' +
      escapeHtml(t("teachToApp")) +
      "</a>" +
      "</div>";

    const noteEl = document.getElementById("teach-note");
    const copyBtn = document.getElementById("teach-copy");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const packet = toHandoffPacket(report, (noteEl && noteEl.value.trim()) || "");
        const text = JSON.stringify(packet, null, 2);
        try {
          await navigator.clipboard.writeText(text);
          toast(t("teachCopied"));
        } catch (_) {
          toast(t("teachCopyFail"));
        }
      });
    }
  }

  function badgeClass(status) {
    if (status === "anchor") return "teach-badge teach-badge--anchor";
    if (status === "open") return "teach-badge teach-badge--open";
    return "teach-badge teach-badge--waitlist";
  }

  function badgeLabel(status) {
    if (status === "anchor") return t("teachBadgeAnchor");
    if (status === "open") return t("teachBadgeOpen");
    return t("teachBadgeWait");
  }

  function mailtoHref(seat) {
    const sub = encodeURIComponent(seat.mailtoSubject || "jabi. coach waitlist");
    return "mailto:" + MAIL + "?subject=" + sub;
  }

  function waitlistSubject(seat) {
    if (seat.mailtoSubject) return seat.mailtoSubject;
    const enName = (seat.displayName && seat.displayName.en) || "open seat";
    return "jabi. coach waitlist — " + enName;
  }

  function renderSeats() {
    if (!seatsEl || !manifest) return;
    seatsEl.innerHTML = "";
    const focusLabels = manifest.focusLabels || {};

    manifest.seats.forEach((seat) => {
      const li = document.createElement("li");
      li.className = "teach-seat";

      const tags = (seat.focus || [])
        .map((id) => {
          const label = pick(focusLabels[id]) || id;
          return '<span class="teach-tag">' + escapeHtml(label) + "</span>";
        })
        .join("");

      let cred = "";
      if (seat.credentialClaim) {
        cred =
          '<p class="teach-seat-cred">' +
          escapeHtml(pick(seat.credentialClaim)) +
          "</p>";
      } else if (seat.verifyFilter) {
        cred =
          '<p class="teach-seat-filter">' +
          escapeHtml(t("teachFilter") + ": " + pick(seat.verifyFilter)) +
          "</p>";
      }

      let cta = "";
      if (seat.booking === "mailto") {
        cta =
          '<a class="teach-btn teach-btn--primary" href="' +
          mailtoHref(seat) +
          '">' +
          escapeHtml(t("teachMailCta")) +
          "</a>";
      } else if (seat.booking === "waitlist") {
        cta =
          '<a class="teach-btn" href="' +
          mailtoHref({ mailtoSubject: waitlistSubject(seat) }) +
          '">' +
          escapeHtml(t("teachWaitCta")) +
          "</a>";
      }

      li.innerHTML =
        '<div class="teach-seat-top">' +
        '<span class="teach-seat-name">' +
        escapeHtml(pick(seat.displayName)) +
        "</span>" +
        '<span class="' +
        badgeClass(seat.status) +
        '">' +
        escapeHtml(badgeLabel(seat.status)) +
        "</span></div>" +
        '<p class="teach-seat-role">' +
        escapeHtml(pick(seat.role)) +
        "</p>" +
        cred +
        '<div class="teach-tags">' +
        tags +
        "</div>" +
        '<div class="teach-actions">' +
        cta +
        "</div>";
      seatsEl.appendChild(li);
    });
  }

  function refreshUi() {
    if (!manifest) return;
    if (policyEl) policyEl.textContent = pick(manifest.verifyPolicy);
    renderReport();
    renderSeats();
  }

  async function init() {
    try {
      const res = await fetch(DATA_BASE + "manifest.json");
      if (!res.ok) throw new Error("manifest");
      manifest = await res.json();
      refreshUi();
    } catch (_) {
      showError(t("teachLoadFail"));
    }
  }

  document.addEventListener("hub:langchange", refreshUi);

  // i18n.js may not emit hub:langchange — hook lang buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(refreshUi, 0);
    });
  });

  init();
})();

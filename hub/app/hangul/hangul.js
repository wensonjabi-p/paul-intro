/** Hangul track — list lessons from track-manifest.json. Stroke tracing (Claude-owned) wired via "trace" modules. */
(function () {
  const MANIFEST_URL = "../data/hangul/track-manifest.json";
  const GLYPH_TO_ID = {
    "ㄱ": "giyeok", "ㄴ": "nieun", "ㄷ": "digeut", "ㄹ": "rieul", "ㅁ": "mieum",
    "ㅂ": "bieup", "ㅅ": "siot", "ㅇ": "ieung", "ㅊ": "chieut", "ㅋ": "kieuk",
    "ㅌ": "tieut", "ㅍ": "pieup", "ㅎ": "hieut",
    "ㄲ": "ssanggiyeok", "ㄸ": "ssangdigeut", "ㅃ": "ssangbieup", "ㅆ": "ssangsiot",
  };
  let strokeDataCache = null;
  let strokeDataPromise = null;

  function loadStrokeData(url) {
    if (strokeDataCache) return Promise.resolve(strokeDataCache);
    if (!strokeDataPromise) {
      strokeDataPromise = fetch(url, { cache: "no-store" })
        .then((r) => r.json())
        .then((data) => { strokeDataCache = data; return data; });
    }
    return strokeDataPromise;
  }

  function renderTraceModule(container, lesson, mod) {
    const glyphs = (lesson.groups || []).flatMap((g) => g.jamo || []);
    loadStrokeData(mod.dataUrl).then((data) => {
      container.innerHTML = "";
      glyphs.forEach((glyph) => {
        const id = GLYPH_TO_ID[glyph];
        const cell = document.createElement("div");
        cell.className = "hangul-trace-cell";
        if (!id || !data[id] || typeof HanziWriter === "undefined") {
          cell.innerHTML = `<div class="hangul-trace-missing">${glyph}</div><div class="hangul-trace-label">${t(
            "hangulTraceSoon", "stroke data coming later"
          )}</div>`;
          container.appendChild(cell);
          return;
        }
        const target = document.createElement("div");
        target.className = "hangul-trace-target";
        cell.appendChild(target);
        const label = document.createElement("div");
        label.className = "hangul-trace-label";
        label.textContent = glyph;
        cell.appendChild(label);
        container.appendChild(cell);

        const writer = HanziWriter.create(target, id, {
          width: 120, height: 120, padding: 8,
          showOutline: true, showCharacter: false,
          charDataLoader: (c, onLoad) => onLoad(data[id]),
        });
        writer.animateCharacter();
        target.addEventListener("click", () => {
          writer.quiz({
            onComplete: () => {
              label.textContent = glyph + " ✓";
            },
          });
        });
      });
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
    return window.HubI18n?.t?.(key) || fallback || key;
  }

  function renderDetail(lesson) {
    const groups = lesson.groups || [];
    const groupHtml =
      groups.length === 0
        ? `<p class="hangul-empty">${t("hangulNoGroups", "No subgroups in this unit.")}</p>`
        : `<div class="hangul-groups">${groups
            .map((g) => {
              const jam = Array.isArray(g.jamo) ? g.jamo.join(" ") : "";
              return `<span class="hangul-chip">${jam || g.id}</span>`;
            })
            .join("")}</div>`;

    const traceModule = (lesson.modules || []).find((m) => m.type === "trace");
    const modulesHtml = traceModule
      ? `<div class="hangul-trace-grid" data-trace-for="${lesson.id}"></div>`
      : `<p class="hangul-empty">${t(
          "hangulModulesEmpty",
          "Empty — content, audio, and stroke practice come later (stroke UI = Claude)."
        )}</p>`;

    return `
      <div class="hangul-detail">
        <p class="k">${t("hangulKind", "Kind")}</p>
        <p><code>${lesson.kind || "—"}</code> · <code>${lesson.slug || ""}</code></p>
        <p class="k">${t("hangulGroups", "Jamo groups (structure)")}</p>
        ${groupHtml}
        <p class="k">${t("hangulModules", "Modules")}</p>
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
      meta.textContent = `${track.id} · v${track.version} · ${track.status} · ${
        (track.lessons || []).length
      } lessons`;
    }

    list.innerHTML = "";
    (track.lessons || []).forEach((lesson) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hangul-item";
      btn.dataset.id = lesson.id;

      const preview =
        Array.isArray(lesson.jamoPreview) && lesson.jamoPreview.length
          ? `<div class="hangul-preview">${lesson.jamoPreview.join(" ")}</div>`
          : "";

      btn.innerHTML = `
        <div class="hangul-item-top">
          <span class="hangul-item-title">${pick(lesson.title)}</span>
          <span class="hangul-badge">${lesson.status || "scaffold"}</span>
        </div>
        ${preview}
        <div class="hangul-detail-slot" hidden></div>`;

      btn.addEventListener("click", () => {
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
            const traceModule = (lesson.modules || []).find((m) => m.type === "trace");
            if (traceModule) {
              const traceEl = slot.querySelector(`[data-trace-for="${lesson.id}"]`);
              if (traceEl) renderTraceModule(traceEl, lesson, traceModule);
            }
          }
        }
      });

      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  async function boot() {
    const errEl = document.getElementById("hangul-error");
    try {
      const res = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const track = await res.json();
      if (!Array.isArray(track.lessons) || track.lessons.length !== 18) {
        console.warn("hangul scaffold: expected 18 lessons (00–17), got", track.lessons?.length);
      }
      renderList(track);
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
      hangulEyebrow: "Track scaffold",
      hangulBackHub: "← Hub",
      hangulBackTopik: "TOPIK I app →",
      hangulKind: "Kind",
      hangulGroups: "Jamo groups (structure)",
      hangulModules: "Modules",
      hangulNoGroups: "No subgroups in this unit.",
      hangulModulesEmpty:
        "Empty — content, audio, and stroke practice come later (stroke UI = Claude).",
      hangulLoadError: "Could not load hangul track manifest. Serve hub/ over http (not file://).",
      hangulTraceSoon: "stroke data coming later",
    },
    ko: {
      hangulEyebrow: "트랙 스캐폴딩",
      hangulBackHub: "← 허브",
      hangulBackTopik: "TOPIK I 앱 →",
      hangulKind: "종류",
      hangulGroups: "자모 그룹 (구조만)",
      hangulModules: "모듈",
      hangulNoGroups: "이 단원에는 하위 그룹이 없습니다.",
      hangulModulesEmpty: "비어 있음 — 본문·오디오·획순은 나중에 (획순 UI = Claude).",
      hangulLoadError: "한글 트랙 매니페스트를 불러오지 못했습니다. hub/를 http로 여세요 (file:// 불가).",
      hangulTraceSoon: "획순 데이터 준비 중",
    },
    zh: {
      hangulEyebrow: "轨道骨架",
      hangulBackHub: "← 中心",
      hangulBackTopik: "TOPIK I 应用 →",
      hangulKind: "类型",
      hangulGroups: "字母分组（仅结构）",
      hangulModules: "模块",
      hangulNoGroups: "本单元无子分组。",
      hangulModulesEmpty: "空 — 正文、音频、笔顺稍后（笔顺 UI = Claude）。",
      hangulLoadError: "无法加载韩文轨道清单。请用 http 打开 hub/（不要用 file://）。",
      hangulTraceSoon: "笔顺数据准备中",
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    boot();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // i18n.js already set lang; re-fetch titles from cached? re-boot is simplest
        setTimeout(boot, 0);
      });
    });
  });
})();

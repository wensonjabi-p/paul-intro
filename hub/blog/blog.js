/**
 * 글모음 — list + hash detail for learner-question parallel readings.
 */
(function () {
  const DATA_BASE = "./data/";
  const listEl = document.getElementById("blog-list");
  const detailEl = document.getElementById("blog-detail");
  const errorEl = document.getElementById("blog-error");
  const listView = document.getElementById("blog-list-view");

  let manifest = null;
  let postCache = {};
  let readingLang = null;

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

  function hideError() {
    if (!errorEl) return;
    errorEl.classList.add("hidden");
    errorEl.textContent = "";
  }

  async function loadManifest() {
    const res = await fetch(DATA_BASE + "manifest.json");
    if (!res.ok) throw new Error("manifest");
    return res.json();
  }

  async function loadPost(file) {
    if (postCache[file]) return postCache[file];
    const res = await fetch(DATA_BASE + file);
    if (!res.ok) throw new Error(file);
    const data = await res.json();
    postCache[file] = data;
    return data;
  }

  function hashId() {
    const h = (location.hash || "").replace(/^#/, "");
    return h || null;
  }

  function renderList() {
    if (!manifest || !listEl) return;
    listEl.innerHTML = "";
    manifest.posts.forEach((meta) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "blog-card";
      btn.dataset.id = meta.id;
      const qPreview = meta._q || meta.id;
      btn.innerHTML =
        '<div class="blog-card-meta">' +
        '<span class="blog-badge">' +
        (meta.level || "A1") +
        "</span>" +
        "<span>" +
        t("blogPilot") +
        "</span></div>" +
        '<p class="blog-card-q"></p>' +
        '<p class="blog-card-tags"></p>';
      btn.querySelector(".blog-card-q").textContent = qPreview;
      btn.querySelector(".blog-card-tags").textContent = (meta.tags || []).join(" · ");
      btn.addEventListener("click", () => {
        location.hash = meta.id;
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  async function enrichListQuestions() {
    if (!manifest) return;
    await Promise.all(
      manifest.posts.map(async (meta) => {
        try {
          const post = await loadPost(meta.file);
          meta._q = pick(post.question);
        } catch (_) {
          meta._q = meta.id;
        }
      })
    );
    renderList();
  }

  function defaultReadingLang() {
    return uiLang() === "ko" ? "ko" : "en";
  }

  function renderDetail(post) {
    if (!detailEl || !listView) return;
    listView.classList.add("hidden");
    detailEl.classList.remove("hidden");
    hideError();

    if (!readingLang) readingLang = defaultReadingLang();
    const body = post.reading[readingLang] || post.reading.en || "";

    const points = (post.keyPoints || [])
      .map((p) => "<li>" + escapeHtml(pick(p) || p.en || "") + "</li>")
      .join("");

    const examples = (post.examples || [])
      .map(
        (ex) =>
          "<li><span class=\"blog-ex-ko\">" +
          escapeHtml(ex.ko || "") +
          '</span> <span class="blog-ex-en">— ' +
          escapeHtml(ex.en || "") +
          "</span></li>"
      )
      .join("");

    const checks = (post.checkQuestions || [])
      .map(
        (c) =>
          '<details class="blog-check"><summary>' +
          escapeHtml(pick(c.q)) +
          '</summary><p class="blog-check-a">' +
          escapeHtml(pick(c.a)) +
          "</p></details>"
      )
      .join("");

    const practice = post.practice
      ? '<a class="blog-cta" href="' +
        escapeAttr(post.practice.href) +
        '">' +
        escapeHtml(pick(post.practice.label)) +
        "</a>"
      : "";

    const related = (post.related || [])
      .map(
        (r) =>
          '<a class="blog-cta blog-cta-secondary" href="' +
          escapeAttr(r.href) +
          '">' +
          escapeHtml(pick(r.label)) +
          "</a>"
      )
      .join("");

    detailEl.innerHTML =
      '<button type="button" class="blog-back" id="blog-back">' +
      t("blogBack") +
      "</button>" +
      '<div class="blog-card-meta"><span class="blog-badge">' +
      escapeHtml(post.level || "") +
      "</span><span>" +
      t("blogPilot") +
      "</span></div>" +
      '<h2 class="blog-q">' +
      escapeHtml(pick(post.question)) +
      "</h2>" +
      '<div class="blog-lang-tabs" role="tablist">' +
      '<button type="button" class="blog-lang-tab' +
      (readingLang === "en" ? " active" : "") +
      '" data-rlang="en" role="tab">EN</button>' +
      '<button type="button" class="blog-lang-tab' +
      (readingLang === "ko" ? " active" : "") +
      '" data-rlang="ko" role="tab">KO</button>' +
      "</div>" +
      '<div class="blog-reading">' +
      escapeHtml(body) +
      "</div>" +
      (points
        ? '<h3 class="blog-section-title">' +
          t("blogKeyPoints") +
          '</h3><ul class="blog-points">' +
          points +
          "</ul>"
        : "") +
      (examples
        ? '<h3 class="blog-section-title">' +
          t("blogExamples") +
          '</h3><ul class="blog-examples">' +
          examples +
          "</ul>"
        : "") +
      (checks
        ? '<h3 class="blog-section-title">' +
          t("blogCheck") +
          '</h3><div class="blog-checks">' +
          checks +
          "</div>"
        : "") +
      '<div class="blog-cta-row">' +
      practice +
      related +
      "</div>" +
      '<p class="blog-source">' +
      escapeHtml(post.sourceNote || "") +
      "</p>";

    detailEl.querySelector("#blog-back").addEventListener("click", () => {
      readingLang = null;
      location.hash = "";
    });

    detailEl.querySelectorAll(".blog-lang-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        readingLang = tab.getAttribute("data-rlang");
        renderDetail(post);
      });
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  async function route() {
    const id = hashId();
    if (!id) {
      readingLang = null;
      if (detailEl) {
        detailEl.classList.add("hidden");
        detailEl.innerHTML = "";
      }
      if (listView) listView.classList.remove("hidden");
      return;
    }
    if (!manifest) return;
    const meta = manifest.posts.find((p) => p.id === id);
    if (!meta) {
      showError(t("blogLoadFail"));
      location.hash = "";
      return;
    }
    try {
      const post = await loadPost(meta.file);
      renderDetail(post);
    } catch (_) {
      showError(t("blogLoadFail"));
    }
  }

  async function init() {
    try {
      manifest = await loadManifest();
      await enrichListQuestions();
      await route();
    } catch (_) {
      showError(t("blogLoadFail"));
    }
  }

  window.addEventListener("hashchange", () => {
    route();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const extraApply = () => {
      if (window.HubI18n) window.HubI18n.t("blogTitle");
      enrichListQuestions();
      const id = hashId();
      if (id && postCache) {
        const meta = manifest && manifest.posts.find((p) => p.id === id);
        if (meta && postCache[meta.file]) {
          readingLang = null;
          renderDetail(postCache[meta.file]);
        }
      }
    };
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setTimeout(extraApply, 0));
    });
    init();
  });
})();

/** Games index — loads data/games/manifest.json */
(function () {
  const grid = document.getElementById("games-grid");
  const errEl = document.getElementById("games-error");
  let cached = null;

  function lang() {
    return window.HubI18n?.getLang?.() || "en";
  }

  function t(key) {
    return window.HubI18n?.t?.(key) || key;
  }

  function pick(obj) {
    if (!obj || typeof obj !== "object") return "";
    const L = lang();
    return obj[L] || obj.en || obj.ko || "";
  }

  function render(manifest) {
    if (!grid || !manifest) return;
    cached = manifest;
    grid.innerHTML = "";
    const games = (manifest.games || []).slice().sort((a, b) => (a.priority || 99) - (b.priority || 99));
    games.forEach((g) => {
      const live = g.status === "pilot" || g.status === "live";
      const href = live && g.href ? g.href : null;
      const li = document.createElement("li");
      const badge = live ? t("gamesLive") : t("gamesSoon");
      const inner =
        `<span class="game-card-label">${badge}</span>` +
        `<h2>${pick(g.title)}</h2>` +
        `<p>${pick(g.blurb)}</p>` +
        `<span class="game-card-cta">${live ? "→" : "…"}</span>`;

      if (href) {
        const a = document.createElement("a");
        a.href = href;
        a.className = "game-card is-live";
        a.innerHTML = inner;
        li.appendChild(a);
      } else {
        const div = document.createElement("div");
        div.className = "game-card is-soon";
        div.setAttribute("aria-disabled", "true");
        div.innerHTML = inner;
        li.appendChild(div);
      }
      grid.appendChild(li);
    });
  }

  function showError() {
    if (!errEl) return;
    errEl.textContent = t("gamesLoadFail");
    errEl.classList.remove("hidden");
  }

  async function boot() {
    try {
      const res = await fetch("../data/games/manifest.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      render(await res.json());
    } catch {
      showError();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    boot();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (cached) render(cached);
      });
    });
  });
})();

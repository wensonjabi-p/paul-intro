/**
 * SpecPartner — sector partner pick + growth badge for hangul / basic.
 * Progress lives in JabiPathProgress (jabi.hangul.v1 / jabi.basic.v1).partner.
 * Does not touch topik-coach-v1 or jabi.topik2.v1.
 */
(function (global) {
  const FREE_STAGE_CAP = 2;
  const STAGE_XP_FLOORS = [0, 100, 250, 450, 700, 1000];
  const PARTNER_JAMOS = [
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
  const STAGE_LABELS = {
    en: ["baby", "pants", "boots", "weapon", "shield", "crown"],
    ko: ["아기", "바지", "장화", "무기", "방패", "왕관"],
    zh: ["婴儿", "短裤", "靴子", "武器", "盾牌", "王冠"],
  };

  const mounts = Object.create(null);

  function progressApi() {
    return global.JabiPathProgress || null;
  }

  function stageFromXp(xp) {
    let stage = 1;
    for (let i = STAGE_XP_FLOORS.length - 1; i >= 0; i--) {
      if (xp >= STAGE_XP_FLOORS[i]) {
        stage = i + 1;
        break;
      }
    }
    return stage;
  }

  function effectiveStage(st) {
    const raw = st.partner?.stage || stageFromXp(st.xp || 0);
    if (st.proUnlock) return Math.min(6, raw);
    return Math.min(FREE_STAGE_CAP, raw);
  }

  function xpProgress(st) {
    const xp = st.xp || 0;
    const stage = stageFromXp(xp);
    if (stage >= 6) return { stage, pct: 100, xp, nextAt: null, remain: 0 };
    const floor = STAGE_XP_FLOORS[stage - 1];
    const nextAt = STAGE_XP_FLOORS[stage];
    const span = Math.max(1, nextAt - floor);
    const pct = Math.min(100, Math.round(((xp - floor) / span) * 100));
    return { stage, pct, xp, nextAt, remain: Math.max(0, nextAt - xp) };
  }

  function charArtSrc(artBase, id, stage) {
    const base = (artBase || "../assets/chars").replace(/\/$/, "");
    return `${base}/char-${id}-${stage}.svg`;
  }

  function setVisible(el, on) {
    if (!el) return;
    el.hidden = !on;
    el.classList.toggle("hidden", !on);
  }

  function hasPartner(st) {
    return !!(st?.partner && st.partner.id);
  }

  function tOf(cfg, key, fallback) {
    if (typeof cfg.t === "function") {
      const v = cfg.t(key, fallback);
      if (v && v !== key) return v;
    }
    return fallback || key;
  }

  function langOf(cfg) {
    if (typeof cfg.lang === "function") return cfg.lang();
    return global.HubI18n?.getLang?.() || "en";
  }

  function syncAndSave(api, track, st) {
    if (st.partner) {
      st.partner.stage = stageFromXp(st.xp || 0);
    }
    api.save(track, st);
    return st;
  }

  function setPartner(track, jamo) {
    const api = progressApi();
    if (!api || !jamo?.id) return null;
    const st = api.load(track);
    st.partner = {
      id: jamo.id,
      glyph: jamo.glyph || "",
      stage: stageFromXp(st.xp || 0) || 1,
    };
    return syncAndSave(api, track, st);
  }

  function renderPick(cfg) {
    const host = cfg.els.pick;
    const grid = cfg.els.grid;
    if (!host || !grid) return;
    const eyebrow = cfg.els.pickEyebrow;
    const title = cfg.els.pickTitle;
    const lead = cfg.els.pickLead;
    if (eyebrow) eyebrow.textContent = tOf(cfg, "partnerEyebrow", "Partner");
    if (title) title.textContent = tOf(cfg, "partnerTitle", "Choose your jamo");
    if (lead) {
      lead.textContent = tOf(
        cfg,
        "partnerLead",
        "One partner for this track. ㅈ is jabi. (guide) — not a partner."
      );
    }
    grid.innerHTML = "";
    PARTNER_JAMOS.forEach((j) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ps-jamo-card";
      btn.setAttribute("aria-label", j.glyph);
      btn.innerHTML =
        `<span class="ps-jamo-glyph">` +
        `<img src="${charArtSrc(cfg.artBase, j.id, 1)}" alt="${j.glyph}" ` +
        `onerror="this.replaceWith(document.createTextNode('${j.glyph}'))">` +
        `</span>`;
      btn.addEventListener("click", () => {
        setPartner(cfg.track, j);
        gate(cfg.track);
        if (typeof cfg.onPicked === "function") cfg.onPicked(j);
      });
      grid.appendChild(btn);
    });
  }

  function renderGrowth(cfg) {
    const api = progressApi();
    const host = cfg.els.growth;
    if (!api || !host) return;
    const st = api.load(cfg.track);
    if (!hasPartner(st)) {
      setVisible(host, false);
      return;
    }
    syncAndSave(api, cfg.track, st);
    const n = effectiveStage(st);
    const labels = STAGE_LABELS[langOf(cfg)] || STAGE_LABELS.en;
    const glyph = cfg.els.glyph;
    const name = cfg.els.name;
    const stageEl = cfg.els.stage;
    const pill = cfg.els.pill;
    const fallback = st.partner.glyph || "·";
    if (glyph) {
      glyph.innerHTML =
        `<img class="ps-partner-art" src="${charArtSrc(cfg.artBase, st.partner.id, n)}" alt="${fallback}" ` +
        `onerror="this.replaceWith(document.createTextNode('${fallback}'))">`;
    }
    if (name) name.textContent = st.partner.id;
    if (stageEl) {
      stageEl.textContent = tOf(cfg, "partnerStageLabel", "Stage {n} · {name}")
        .replace("{n}", String(n))
        .replace("{name}", labels[n - 1] || "");
    }
    if (pill) pill.textContent = `STAGE ${n}`;

    const prog = xpProgress(st);
    if (cfg.els.xpLabel) cfg.els.xpLabel.textContent = String(prog.xp);
    if (cfg.els.xpFill) cfg.els.xpFill.style.width = `${prog.pct}%`;
    if (cfg.els.xpBar) cfg.els.xpBar.setAttribute("aria-valuenow", String(prog.pct));
    if (cfg.els.xpHint) {
      cfg.els.xpHint.textContent =
        prog.nextAt == null
          ? tOf(cfg, "partnerXpMax", "Max stage")
          : tOf(cfg, "partnerXpToNext", "{remain} XP → stage {n}")
              .replace("{remain}", String(prog.remain))
              .replace("{n}", String(prog.stage + 1));
    }
    const chips = cfg.els.chips;
    if (chips) {
      chips.innerHTML = "";
      for (let i = 1; i <= 6; i++) {
        const span = document.createElement("span");
        span.className = "ps-stage-chip";
        if (i < n) span.classList.add("is-done");
        else if (i === n) span.classList.add("is-current");
        else span.classList.add("is-locked");
        span.title = labels[i - 1] || "";
        span.textContent = String(i);
        chips.appendChild(span);
      }
    }
    setVisible(host, true);
  }

  function setContentVisible(cfg, on) {
    (cfg.hideWhilePicking || []).forEach((el) => setVisible(el, on));
  }

  function gate(track) {
    const cfg = mounts[track];
    const api = progressApi();
    if (!cfg || !api) return false;
    const st = api.load(track);
    if (!hasPartner(st)) {
      renderPick(cfg);
      setVisible(cfg.els.pick, true);
      setVisible(cfg.els.growth, false);
      setContentVisible(cfg, false);
      return false;
    }
    setVisible(cfg.els.pick, false);
    setContentVisible(cfg, true);
    renderGrowth(cfg);
    return true;
  }

  function refresh(track) {
    const cfg = mounts[track];
    if (!cfg) return;
    const api = progressApi();
    if (!api) return;
    const st = api.load(track);
    if (!hasPartner(st)) return;
    syncAndSave(api, track, st);
    renderGrowth(cfg);
  }

  function resolveEls(map) {
    const out = {};
    Object.keys(map || {}).forEach((k) => {
      const v = map[k];
      out[k] = typeof v === "string" ? document.querySelector(v) : v;
    });
    return out;
  }

  /**
   * @param {object} opts
   * @param {"hangul"|"basic"} opts.track
   * @param {string} [opts.artBase]
   * @param {object} opts.els — element refs or selectors
   * @param {Array} [opts.hideWhilePicking] — els/selectors to hide until partner picked
   * @param {function} [opts.t]
   * @param {function} [opts.lang]
   * @param {function} [opts.onPicked]
   */
  function mount(opts) {
    if (!opts?.track) return null;
    const cfg = {
      track: opts.track,
      artBase: opts.artBase || "../assets/chars",
      els: resolveEls(opts.els),
      hideWhilePicking: (opts.hideWhilePicking || []).map((v) =>
        typeof v === "string" ? document.querySelector(v) : v
      ),
      t: opts.t,
      lang: opts.lang,
      onPicked: opts.onPicked,
    };
    mounts[opts.track] = cfg;
    gate(opts.track);
    return cfg;
  }

  global.JabiPartnerSector = {
    PARTNER_JAMOS,
    STAGE_XP_FLOORS,
    FREE_STAGE_CAP,
    STAGE_LABELS,
    stageFromXp,
    mount,
    gate,
    refresh,
    setPartner,
    hasPartner: (track) => {
      const api = progressApi();
      return api ? hasPartner(api.load(track)) : false;
    },
  };
})(typeof window !== "undefined" ? window : globalThis);

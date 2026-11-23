/**
 * Duolingo-style skill-path progress for hangul / basic tracks.
 * Stable keys (do not rename): jabi.hangul.v1 · jabi.basic.v1
 * Vocab theme/sense mastery uses separate key jabi.vocab.v1 (see hub/app/data/vocab/progress-contract-v1.json) — not this module.
 * Never touch topik-coach-v1 (TOPIK I growth XP). TOPIK II partner/XP lives in topik2.js as jabi.topik2.v1 — not here.
 *
 * Skill entry schema (v1, additive):
 *   { done, at?, checkpoint?, crowns? }  — crowns 1–3; legacy `done` without crowns ⇒ 1
 *
 * Partner (SpecPartner, additive):
 *   partner: { id, glyph, stage } | null — sector character; stage mirrors XP floors
 *   proUnlock: boolean — free stage cap bypass (default false, cap 2)
 *
 * XP rules:
 *   First clear → +XP_SKILL, crowns=1
 *   Checkpoint (once) → +XP_CHECKPOINT
 *   Redo that bumps a crown tier (→2 or →3) → +XP_CROWN once per new tier
 *   Redo at max crowns → no XP (UI can show “다시 도전”)
 */
(function (global) {
  /** Frozen map — renaming keys would orphan learner progress. */
  const KEYS = Object.freeze({
    hangul: "jabi.hangul.v1",
    basic: "jabi.basic.v1",
  });
  const TRACKS = new Set(Object.keys(KEYS));

  const XP_SKILL = 10;
  const XP_CHECKPOINT = 5;
  const XP_CROWN = 3;
  const MAX_CROWNS = 3;
  const STAGE_XP_FLOORS = [0, 100, 250, 450, 700, 1000];

  function keyFor(track) {
    if (!TRACKS.has(track)) throw new Error(`path-progress: unknown track ${track}`);
    return KEYS[track];
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

  function normalizePartner(raw) {
    if (!raw || typeof raw !== "object" || !raw.id) return null;
    return {
      id: String(raw.id),
      glyph: String(raw.glyph || ""),
      stage: Math.max(1, Math.min(6, Number(raw.stage) || 1)),
    };
  }

  function defaultState() {
    return { xp: 0, skills: {}, partner: null, proUnlock: false };
  }

  function syncPartnerStage(state) {
    if (state.partner) {
      state.partner.stage = stageFromXp(state.xp || 0);
    }
    return state;
  }

  function load(track) {
    try {
      const raw = localStorage.getItem(keyFor(track));
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const skills =
        parsed.skills && typeof parsed.skills === "object" && !Array.isArray(parsed.skills)
          ? parsed.skills
          : {};
      const state = {
        xp: typeof parsed.xp === "number" && parsed.xp >= 0 ? parsed.xp : 0,
        skills,
        partner: normalizePartner(parsed.partner),
        proUnlock: !!parsed.proUnlock,
      };
      syncPartnerStage(state);
      return state;
    } catch {
      return defaultState();
    }
  }

  function save(track, state) {
    try {
      syncPartnerStage(state);
      localStorage.setItem(keyFor(track), JSON.stringify(state));
    } catch {
      /* private mode / quota — skip persist; in-memory callers still get `state` */
    }
    return state;
  }

  function skillEntry(state, id) {
    if (typeof id !== "string" || !id) return null;
    return state.skills[id] || null;
  }

  /** Crowns for a skill: 0 if not done; legacy done without `crowns` counts as 1. */
  function crownsOf(entry) {
    if (!entry || !entry.done) return 0;
    const c = entry.crowns;
    if (typeof c === "number" && c >= 1) return Math.min(MAX_CROWNS, Math.floor(c));
    return 1;
  }

  function isDone(track, id) {
    const s = skillEntry(load(track), id);
    return !!(s && s.done);
  }

  function hasCheckpoint(track, id) {
    const s = skillEntry(load(track), id);
    return !!(s && s.checkpoint);
  }

  function getCrowns(track, id) {
    return crownsOf(skillEntry(load(track), id));
  }

  function doneCount(track) {
    const state = load(track);
    return Object.values(state.skills).filter((s) => s && s.done).length;
  }

  function getXp(track) {
    return load(track).xp || 0;
  }

  function getPartner(track) {
    return load(track).partner;
  }

  /**
   * Mark a skill/lesson/unit complete.
   * First clear: +skill XP, crowns=1.
   * Redo: bump crown (max 3) with +XP_CROWN once per new tier; no XP spam at max.
   * @returns {{ state, gained, already, checkpointGained, crowns, crownUp, crownXp }}
   */
  function completeSkill(track, id, opts) {
    if (typeof id !== "string" || !id) {
      return {
        state: load(track),
        gained: 0,
        already: false,
        checkpointGained: 0,
        crowns: 0,
        crownUp: false,
        crownXp: 0,
      };
    }
    const options = opts || {};
    const xpAmount = typeof options.xp === "number" ? options.xp : XP_SKILL;
    const wantCheckpoint = !!options.checkpoint;
    /** Checkpoint-only calls should not consume a crown tier. */
    const allowCrownBump = options.crownBump !== false;
    const state = load(track);
    const prev = state.skills[id] || {};
    const already = !!prev.done;
    let gained = 0;
    let checkpointGained = 0;
    let crownUp = false;
    let crownXp = 0;
    let crowns = crownsOf(prev);

    const next = {
      ...prev,
      done: true,
      at: prev.at || new Date().toISOString().slice(0, 10),
    };

    if (!already) {
      state.xp += xpAmount;
      gained = xpAmount;
      crowns = 1;
      crownUp = true;
      next.crowns = 1;
    } else if (allowCrownBump) {
      const prevCrowns = crownsOf(prev);
      if (prevCrowns < MAX_CROWNS) {
        crowns = prevCrowns + 1;
        next.crowns = crowns;
        state.xp += XP_CROWN;
        crownXp = XP_CROWN;
        crownUp = true;
      } else {
        crowns = MAX_CROWNS;
        next.crowns = MAX_CROWNS;
      }
    } else {
      crowns = crownsOf(prev) || 1;
      next.crowns = crowns;
    }

    if (wantCheckpoint && !prev.checkpoint) {
      next.checkpoint = true;
      state.xp += XP_CHECKPOINT;
      checkpointGained = XP_CHECKPOINT;
    } else if (prev.checkpoint || wantCheckpoint) {
      next.checkpoint = true;
    }

    state.skills[id] = next;
    save(track, state);
    return { state, gained, already, checkpointGained, crowns, crownUp, crownXp };
  }

  /** Mark checkpoint only (also marks done if not yet; no crown bump). */
  function completeCheckpoint(track, id) {
    return completeSkill(track, id, { checkpoint: true, crownBump: false });
  }

  global.JabiPathProgress = {
    KEYS,
    keyFor,
    XP_SKILL,
    XP_CHECKPOINT,
    XP_CROWN,
    MAX_CROWNS,
    STAGE_XP_FLOORS,
    stageFromXp,
    load,
    save,
    isDone,
    hasCheckpoint,
    getCrowns,
    doneCount,
    getXp,
    getPartner,
    completeSkill,
    completeCheckpoint,
  };
})(typeof window !== "undefined" ? window : globalThis);

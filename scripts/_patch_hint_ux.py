# -*- coding: utf-8 -*-
"""One-shot: patch app.js hint UX + fix verified banks for Paul hint feedback."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP_JS = ROOT / "hub" / "app" / "js" / "app.js"
DATA = ROOT / "hub" / "app" / "data"

NEW_HINT_BLOCK = r'''function learnerHintText(field, fallback) {
  const lang = getLang();
  const t = localizedField(field, lang);
  if (t) return t;
  return fallback || "";
}

/** MCQ answer strings that must not appear in early hint stages. */
function answerSpoilers(q) {
  const out = [];
  const at = String(q?.answerText || "").trim();
  if (at) out.push(at);
  const choices = q?.choices || [];
  const ai = q?.answer;
  if (typeof ai === "number" && choices[ai] != null) {
    const c = String(choices[ai]).trim();
    if (c && !out.includes(c)) out.push(c);
  }
  return out;
}

/** True if a hint line would reveal the keyed answer (Match:/답: or long answerText). */
function isSpoilerHintLine(line, spoilers) {
  const s = String(line || "").trim();
  if (!s) return false;
  if (/^\s*(Match|답|对应|Answer)\s*[:：]/i.test(s)) return true;
  if (/(?:^|[.\s])(?:Match|답|对应)\s*[:：]/i.test(s)) return true;
  for (const sp of spoilers) {
    if (!sp) continue;
    // Short particles (와, 명, 때…): only spoiler if line is an explicit “pick this” reveal
    if (sp.length <= 2) {
      if (s.includes(sp) && /(?:답|Match|对应|→\s*use|골라|정답)/i.test(s)) return true;
      continue;
    }
    if (s.includes(sp)) return true;
  }
  return false;
}

function hintStepList(q) {
  const steps = q?.hint?.steps;
  if (!steps) return [];
  const lang = getLang();
  const list = steps[lang] || steps.en || steps.ko;
  return Array.isArray(list) ? list : [];
}

/**
 * Early scaffold lines only: Meaning + Look (steps[0], steps[1]).
 * Never include Pair/Match (usually steps[2]) — that belongs in bottom-out `why`.
 */
function earlyScaffoldLines(q) {
  const spoilers = answerSpoilers(q);
  const list = hintStepList(q);
  const clean = [];
  for (let i = 0; i < Math.min(2, list.length); i++) {
    if (!isSpoilerHintLine(list[i], spoilers)) clean.push(list[i]);
  }
  if (clean.length) return clean;
  const fallback = learnerHintText(q.hint, "");
  if (fallback && !isSpoilerHintLine(fallback, spoilers)) {
    // Prefer first sentence only to avoid dumping a full Meaning→Look→Pair blob
    const first = fallback.split(/(?<=[.。！？!?])\s+/)[0] || fallback;
    if (!isSpoilerHintLine(first, spoilers)) return [first];
  }
  return [
    L(
      "Think about what the sentence is asking — don’t guess from one word alone.",
      "문장이 무엇을 묻는지 먼저 생각해 보세요. 단어 하나만 보고 짐작하지 마세요.",
      "先想句子在问什么 — 不要只靠一个词猜。"
    ),
  ];
}

/** Visual caption must not equal the MCQ answer (e.g. 공항 on a “where does it go?” item). */
function safeVisualForHint(q) {
  const vis = resolveHintVisual(q);
  if (!vis) return null;
  const spoilers = answerSpoilers(q);
  const ko = (vis.ko || "").trim();
  const en = (vis.en || "").trim();
  const zh = (vis.zh || "").trim();
  const leaks = spoilers.some(
    (sp) => sp.length > 2 && (ko.includes(sp) || en.includes(sp) || zh.includes(sp))
  );
  if (!leaks) return vis;
  return {
    ...vis,
    en: L("clue picture", "단서 그림", "线索图"),
    ko: "단서",
    zh: "线索",
  };
}

function renderHintBox(nodes, { clear = false } = {}) {
  const hintBox = document.getElementById("hint-box");
  if (!hintBox) return;
  hintBox.classList.remove("hidden", "hint-bilingual");
  hintBox.classList.add("hint-stage");
  if (clear) hintBox.replaceChildren();

  const layer = document.createElement("div");
  layer.className = "hint-layer";
  if (typeof nodes === "string") {
    layer.textContent = nodes;
  } else if (Array.isArray(nodes)) {
    nodes.forEach((n) => layer.appendChild(n));
  } else if (nodes) {
    layer.appendChild(nodes);
  }
  hintBox.appendChild(layer);
  try {
    layer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch {
    /* ignore */
  }
}

function showHint() {
  const q = activeQuestions[qi];
  if (!q) return;
  const pictured = hasPictureHint(q);
  // Tiered scaffold: strategy → look → eliminate → bottom-out why
  // Never dump Pair/Match (full answer) on the first L1 tap.
  const maxHints = pictured ? 4 : 3;
  if (qHints >= maxHints) {
    toast(
      L(
        "All hints are above — scroll up to review",
        "도움말은 위에 쌓여 있어요 — 위로 다시 보세요",
        "提示都在上面 — 可向上回顾"
      )
    );
    return;
  }
  qHints += 1;
  sessionHints += 1;
  state.learner.totalHints += 1;
  bumpLearnerTag(q.tags || (q._reviewTag ? [q._reviewTag] : []), "hints");

  // With picture: 1 visual → 2 scaffold (no answer) → 3 eliminate → 4 why
  // Without: 1 scaffold → 2 eliminate → 3 why
  const stage = pictured ? qHints : qHints + 1;

  if (pictured && stage === 1) {
    const vis = safeVisualForHint(q);
    const wrap = document.createElement("div");
    wrap.className = "hint-visual-wrap";
    const emo = buildHintVisualEl(vis);
    const cap = visualCaptionEl(vis);
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = L("Hint 1 · picture", "도움말 1 · 그림", "提示 1 · 图");
    wrap.append(step, emo, cap);
    renderHintBox(wrap);
  } else if (stage === 2) {
    const wrap = document.createElement("div");
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = pictured
      ? L("Hint 2 · strategy", "도움말 2 · 전략", "提示 2 · 策略")
      : L("Hint 1 · strategy", "도움말 1 · 전략", "提示 1 · 策略");
    wrap.appendChild(step);
    const lines = earlyScaffoldLines(q);
    if (lines.length > 1) {
      const ol = document.createElement("ol");
      ol.className = "hint-skill-steps";
      lines.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        ol.appendChild(li);
      });
      wrap.appendChild(ol);
    } else {
      const body = document.createElement("p");
      body.className = "hint-l1";
      body.textContent = lines[0] || "";
      wrap.appendChild(body);
    }
    renderHintBox(wrap);
  } else if (stage === 3) {
    const kill = pickConfusingWrong(q, eliminated);
    if (kill != null) {
      eliminated.add(kill);
      document.querySelectorAll(".choice").forEach((b) => {
        if (Number(b.dataset.index) === kill) b.classList.add("eliminated");
      });
      if (selectedChoice === kill) selectedChoice = null;
      showEliminateExplain(q, kill);
    } else {
      renderHintBox(
        L(
          "Choose among the remaining options.",
          "남은 보기 중에서 고르세요.",
          "从剩下的选项中选择。"
        )
      );
    }
  } else {
    // Bottom-out: full why (may name the answer). Last resort only.
    const line = learnerHintText(
      q.why,
      L("Re-read the whole sentence for meaning.", "문장 전체 뜻을 다시 읽어 보세요.", "再读整句，抓住意思。")
    );
    const wrap = document.createElement("div");
    const step = document.createElement("p");
    step.className = "hint-step";
    step.textContent = pictured
      ? L("Hint 4 · why (answer)", "도움말 4 · 왜 (정답 설명)", "提示 4 · 为什么（含答案）")
      : L("Hint 3 · why (answer)", "도움말 3 · 왜 (정답 설명)", "提示 3 · 为什么（含答案）");
    const body = document.createElement("p");
    body.className = "hint-l1";
    body.textContent = line;
    wrap.append(step, body);
    renderHintBox(wrap);
  }

  updateQuizMeta();
  saveState(state);
  persistSession();
}

'''


def patch_app_js() -> None:
    text = APP_JS.read_text(encoding="utf-8")
    start = text.index("function learnerHintText(field, fallback) {")
    end = text.index("function submitAnswer() {")
    APP_JS.write_text(text[:start] + NEW_HINT_BLOCK + text[end:], encoding="utf-8")
    print("patched app.js")


SPOILER_LINE = re.compile(r"^\s*(Match|답|对应)\s*[:：]", re.I)


def soften_steps(hint: dict, answer_text: str) -> None:
    """Rewrite steps[2] Match/답 lines into non-revealing pair cues; keep why as bottom-out."""
    steps = (hint or {}).get("steps") or {}
    at = (answer_text or "").strip()
    for lang, lines in list(steps.items()):
        if not isinstance(lines, list) or len(lines) < 3:
            continue
        third = lines[2]
        if SPOILER_LINE.search(third) or (at and len(at) > 2 and at in third):
            if lang == "ko":
                lines[2] = "짝/대조만 보고, 보기에서 스스로 고르세요."
            elif lang == "zh":
                lines[2] = "只看对照句式，自己从选项里选。"
            else:
                lines[2] = "Use the pattern contrast — pick the choice yourself."
        steps[lang] = lines
    # Also scrub top-level hint.ko/en/zh if they embed “답: …”
    for lang in ("ko", "en", "zh"):
        blob = hint.get(lang)
        if not isinstance(blob, str):
            continue
        if SPOILER_LINE.search(blob) or (at and len(at) > 2 and f"답: {at}" in blob):
            # Keep first sentence only
            parts = re.split(r"(?<=[.。])\s+", blob)
            hint[lang] = parts[0] if parts else blob


def fix_paul_items(data: dict) -> None:
    by_id = {q["id"]: q for q in data.get("questions") or []}

    # v2-02: 달다 — sweet foods visual
    if "v2-02" in by_id:
        q = by_id["v2-02"]
        h = q["hint"]
        h["visual"] = {
            "emoji": ["🍰", "🍭", "🍬"],
            "en": "sweet · dessert",
            "ko": "달다·단맛",
            "zh": "甜·甜点",
        }
        h["ko"] = "「달아요」= 맛이 달다(단 음식). 두 사과를 비교해요. 「A보다 더 ~」."
        h["en"] = "달아요 = tastes sweet (think desserts). Comparing two apples. Pattern: A보다 더 ~."
        h["zh"] = "달아요 = 甜（想想甜点）。比较两个苹果。句式：A보다 더 ~。"
        h["steps"] = {
            "en": [
                "달아요 = sweet (like candy or dessert).",
                "You compare two apples — look for the “than” pattern: A보다 더 ~.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            "zh": [
                "달아요 = 甜（像甜点）。",
                "比较两个苹果 — 找“比”的句式：A보다 더 ~。",
                "只看对照句式，自己从选项里选。",
            ],
            "ko": [
                "「달아요」= 단맛(사탕·디저트).",
                "두 사과 비교 → 「A보다 더 ~」 자리를 보세요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
        }

    # v2-03: hard words 출발/도착 — no airport answer in visual/early hints
    if "v2-03" in by_id:
        q = by_id["v2-03"]
        h = q["hint"]
        h["visual"] = {
            "emoji": ["🚌", "📋"],
            "en": "bus notice · start / arrive",
            "ko": "버스 안내·출발/도착",
            "zh": "公交告示·出发/到达",
        }
        h["ko"] = "어려운 말: 「출발」(시작)·「도착」(끝나는 곳). 어디로 가냐면 「도착」줄을 보세요."
        h["en"] = "Hard words: 출발 = start/depart, 도착 = arrive/destination. For “where does it go?”, read the 도착 line."
        h["zh"] = "难词：출발=出发，도착=到达。问去哪里 → 看「도착」那一行。"
        h["steps"] = {
            "en": [
                "Hard words on the notice: 출발 (start) vs 도착 (arrive).",
                "The question asks where the bus goes — look at the 도착 line, not 출발.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            "zh": [
                "告示难词：출발（出发）vs 도착（到达）。",
                "问去哪里 → 看「도착」行，不要看「출발」。",
                "只看对照句式，自己从选项里选。",
            ],
            "ko": [
                "어려운 말: 「출발」=시작, 「도착」=끝나는 곳.",
                "「어디로 갑니까?」→ 「도착」줄을 보세요 (「출발」아님).",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
        }

    # v2-04: teach 닫다 before 주세요
    if "v2-04" in by_id:
        q = by_id["v2-04"]
        h = q["hint"]
        h["visual"] = {
            "emoji": ["🚪", "🔒", "🥶"],
            "en": "close the door · cold",
            "ko": "닫다·문·추움",
            "zh": "关门·冷",
        }
        h["ko"] = "「닫다」= 문을 닫다(닫아요). 부탁할 때 「~아/어 주세요」."
        h["en"] = "닫다 = to close (a door). Soft request ending: ~아/어 주세요 ≈ please …"
        h["zh"] = "닫다 = 关（门）。拜托别人：~아/어 주세요 ≈ 请…"
        h["steps"] = {
            "en": [
                "닫다 = close (the door). It’s cold, so you want the door closed.",
                "You’re asking someone politely — look for ~아/어 주세요.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            "zh": [
                "닫다 = 关（门）。很冷，所以想关门。",
                "礼貌拜托别人 → 找 ~아/어 주세요。",
                "只看对照句式，自己从选项里选。",
            ],
            "ko": [
                "「닫다」= 문을 닫다. 추워서 문을 닫고 싶어요.",
                "부탁 → 「~아/어 주세요」를 찾으세요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
        }

    # v2-08: hard idea is telling/recommending to a friend, not just “book”
    if "v2-08" in by_id:
        q = by_id["v2-08"]
        h = q["hint"]
        h["visual"] = {
            "emoji": ["👥", "💬"],
            "en": "tell a friend",
            "ko": "친구에게 말하다",
            "zh": "告诉朋友",
        }
        h["ko"] = "친구에게 말해 주다 ≈ 알리다/권하다. 문장 끝은 「어요」로 닫아요."
        h["en"] = "말해 주다 ≈ tell / recommend to a friend. The first sentence ends with polite 어요."
        h["zh"] = "말해 주다 ≈ 告诉/推荐给朋友。第一句要用礼貌结尾 어요 收住。"
        h["steps"] = {
            "en": [
                "Hard idea: 말해 주다 ≈ tell / recommend to a friend (not just “book”).",
                "The first sentence ends here — you need a full polite ending, not a connector.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            "zh": [
                "难的是「말해 주다」≈ 告诉/推荐给朋友（不只是“书”）。",
                "第一句在这里结束 → 要完整礼貌结尾，不要连接词。",
                "只看对照句式，自己从选项里选。",
            ],
            "ko": [
                "어려운 뜻: 「말해 주다」≈ 친구에게 알리다/권하다 (책이 핵심 아님).",
                "첫 문장을 끝내요 → 이어서가 아니라 마침 어미.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
        }


def reorder_ease_first(data: dict) -> None:
    """Put notice/topic reading items after blank/grammar to soften difficulty spikes."""
    qs = data.get("questions") or []
    if not qs:
        return

    def rank(q: dict) -> tuple:
        t = q.get("type") or ""
        # blanks / grammar first; notice & topic later
        hard = 1 if t in ("notice", "topic", "reading") else 0
        return (hard, q.get("id") or "")

    data["questions"] = sorted(qs, key=rank)


def patch_banks() -> None:
    for name in (
        "verified-read-01.json",
        "verified-read-02.json",
        "verified-read-03.json",
        "verified-listen-01.json",
    ):
        path = DATA / name
        data = json.loads(path.read_text(encoding="utf-8"))
        if name == "verified-read-02.json":
            fix_paul_items(data)
        for q in data.get("questions") or []:
            soften_steps(q.get("hint") or {}, q.get("answerText") or "")
        reorder_ease_first(data)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("patched", name, "n=", len(data.get("questions") or []))


if __name__ == "__main__":
    patch_app_js()
    patch_banks()

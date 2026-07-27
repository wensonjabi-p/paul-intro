# -*- coding: utf-8 -*-
"""Ensure prompt.en / prompt.zh are L1 translations (display uses prompt.ko)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "hub" / "app" / "data"

# (substring in first Korean instruction line) → (en, zh) instruction only
INSTR = [
    (
        "밑줄 친",
        "What does the underlined part refer to?",
        "请选择划线部分指的是什么。",
    ),
    (
        "빈칸에",
        "Choose the best word for the blank.",
        "请选择填入空格的最佳词语。",
    ),
    (
        "다음을 읽고",
        "Read the following and answer.",
        "请阅读并回答问题。",
    ),
    (
        "글의 내용과 같은",
        "Which statement matches the text?",
        "请选择与短文内容一致的一项。",
    ),
    (
        "주로 무엇에 대한",
        "What is this mainly about?",
        "这段文字主要在说什么？",
    ),
    (
        "알맞은 것을 고르십시오",
        "Choose the best answer.",
        "请选择正确答案。",
    ),
]


def split_stem(ko: str) -> tuple[str, str]:
    if "\n\n" in ko:
        head, body = ko.split("\n\n", 1)
        return head.strip(), body
    return ko.strip(), ""


def instr_for(head: str) -> tuple[str, str]:
    for key, en, zh in INSTR:
        if key in head:
            return en, zh
    return "Read and answer.", "请阅读并回答。"


def refine_question_line(body: str, lang: str) -> str:
    """If body ends with a Korean question line after a notice, append L1 gloss line."""
    lines = body.strip().split("\n")
    if not lines:
        return body
    last = lines[-1].strip()
    gloss = {
        "en": {
            "도서관은 언제 쉽니까?": "When is the library closed?",
            "이 버스는 어디로 갑니까?": "Where does this bus go?",
            "식당은 몇 층에 있습니까?": "Which floor is the cafeteria on?",
            "수업은 몇 시부터 시작합니까?": "What time does class start?",
            "내과는 몇 층에 있습니까?": "Which floor is it on?",
        },
        "zh": {
            "도서관은 언제 쉽니까?": "图书馆哪天休息？",
            "이 버스는 어디로 갑니까?": "这班车去哪里？",
            "식당은 몇 층에 있습니까?": "食堂在几楼？",
            "수업은 몇 시부터 시작합니까?": "课几点开始？",
            "내과는 몇 층에 있습니까?": "在几楼？",
        },
    }
    g = gloss.get(lang, {}).get(last)
    if not g:
        return body
    # Keep Korean body; add L1 question under it for clarity
    return body.rstrip() + f"\n\n→ {g}"


def build_l1(ko: str, lang: str) -> str:
    head, body = split_stem(ko)
    en_i, zh_i = instr_for(head)
    instr = en_i if lang == "en" else zh_i
    if not body:
        return instr
    body2 = refine_question_line(body, lang)
    return f"{instr}\n\n{body2}"


def needs_replace(existing: str | None, ko: str) -> bool:
    if not existing:
        return True
    if existing.strip() == ko.strip():
        return True
    # Korean-only instruction still present
    if existing.lstrip().startswith("※") and any(
        k in existing.split("\n", 1)[0] for k in ("읽고", "빈칸", "밑줄", "고르십시오")
    ):
        # if first line is still Korean exam boilerplate, replace
        first = existing.split("\n", 1)[0]
        if any(ch >= "가" and ch <= "힣" for ch in first) and "Choose" not in first and "请" not in first:
            return True
    return False


def patch_file(path: Path) -> int:
    data = json.loads(path.read_text(encoding="utf-8"))
    n = 0
    for q in data.get("questions", []):
        p = q.get("prompt") or {}
        ko = p.get("ko") or ""
        if not ko:
            continue
        changed = False
        if needs_replace(p.get("en"), ko):
            p["en"] = build_l1(ko, "en")
            changed = True
        if needs_replace(p.get("zh"), ko):
            p["zh"] = build_l1(ko, "zh")
            changed = True
        # Also upgrade notices that keep Korean question without → gloss
        for lang in ("en", "zh"):
            cur = p.get(lang) or ""
            if "→ " in cur:
                continue
            head, body = split_stem(ko)
            if "다음을 읽고" not in head and "밑줄" not in head:
                continue
            refined = refine_question_line(body, lang)
            if refined != body and body:
                en_i, zh_i = instr_for(head)
                instr = en_i if lang == "en" else zh_i
                p[lang] = f"{instr}\n\n{refined}"
                changed = True
        if changed:
            q["prompt"] = p
            n += 1
    if n:
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
    return n


def main() -> None:
    total = 0
    for path in sorted(ROOT.glob("verified-*.json")):
        c = patch_file(path)
        print(f"{path.name}: updated {c}")
        total += c
    print(f"done, questions touched: {total}")


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""Build jabi. vocab allowlist: NIKL A ∪ (Tammy 1671 − hard abstracts). Scan verified banks."""
from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VOCAB = ROOT / "hub" / "app" / "data" / "vocab"
SOURCE = VOCAB / "source"
DATA = ROOT / "hub" / "app" / "data"
AGENT_TOOLS = Path.home() / ".cursor" / "projects" / "c-Users-biker-Documents-ClaudeWeb-paul-intro" / "agent-tools"

# Heuristic hard Sino/abstract lemmas to strip from 1671 before union
HARD = {
    "사회", "정치", "경제", "문화", "역사", "정부", "기업", "관계", "경우", "문제",
    "대하다", "위하다", "통하다", "의하다", "관하다", "관련", "관련되다", "관련하다",
    "의미", "의미하다", "상황", "현실", "이론", "철학", "법률", "정책", "제도",
    "국제", "외교", "선거", "의회", "헌법", "언론", "언론인", "여론", "여론조사",
    "과학", "기술", "산업", "자본", "자본주의", "사회주의", "민주주의",
    "내과", "외과", "접수", "휴관", "휴관일", "일과", "방문",
}

# Function words / particles always allowed even if not in lists
ALWAYS = {
    "이", "가", "을", "를", "은", "는", "에", "에서", "으로", "로", "와", "과",
    "도", "만", "의", "께", "에게", "한테", "부터", "까지", "처럼", "보다",
    "고", "서", "며", "면", "니", "니까", "지만", "는데", "거든요",
    "요", "다", "습니다", "ㅂ니다", "예요", "이에요", "입니다",
    "그", "이", "저", "것", "거", "수", "분", "명", "번", "개", "살",
}

# Exam / UI instruction boilerplate (not content vocab)
BOILERPLATE = {
    "고르십시오", "고르세요", "빈칸에", "들어갈", "알맞은", "것을", "다음",
    "물음에", "답하십시오", "맞는", "내용과", "들은", "같은", "가장",
}

HANGUL_TOKEN = re.compile(r"[가-힣]+")


def in_allow(token: str, allow: set[str]) -> bool:
    if token in allow or token in ALWAYS or token in BOILERPLATE:
        return True
    # common stem aliases
    ALIASES = {
        "있어요": "있다",
        "없어요": "없다",
        "있어요": "있다",
        "있어요": "있다",
        "아니에요": "아니다",
        "아니요": "아니다",
        "아니라": "아니다",
        "커요": "크다",
        "커고": "크다",
        "돼요": "되다",
        "돼요": "되다",
        "하세요": "하다",
        "해요": "하다",
        "하는": "하다",
        "하세요": "하다",
        "주세요": "주다",
        "계세요": "계시다",
        "갑니다": "가다",
        "갑니까": "가다",
        "갔어요": "가다",
        "가요": "가다",
        "같아요": "같다",
        "먹어요": "먹다",
        "먹지": "먹다",
        "쉬는": "쉬다",
        "쉽니다": "쉬다",
        "재미있어요": "재미있다",
        "필요해요": "필요하다",
        "깨끗해요": "깨끗하다",
        "추워요": "춥다",
        "더워요": "덥다",
    }
    if token in ALIASES and ALIASES[token] in allow:
        return True
    # light conjugation / particle peeling
    candidates = [token]
    for suf in (
        "습니다", "ㅂ니다", "세요", "으세요", "아요", "어요", "여요", "해요",
        "예요", "이에요", "입니다", "었어요", "았어요", "였어요", "했어요",
        "는다", "니다", "다", "요", "죠", "네요",
        "은", "는", "을", "를", "이", "가", "도", "만", "와", "과",
        "에", "의", "로", "으로", "께", "보다", "까지", "부터",
    ):
        if token.endswith(suf) and len(token) > len(suf) + 1:
            candidates.append(token[: -len(suf)])
    for c in candidates:
        if c in allow or c in ALWAYS:
            return True
        if c.endswith("하") and (c + "다") in allow:
            return True
        if (c + "다") in allow:
            return True
        if (c + "요") in allow:
            return True
        # ㅂ irregular-ish: 추우←춥, 더우←덥, 가까←가깝
        if c.endswith("우") and (c[:-1] + "ㅂ다") in allow:
            return True
        if c.endswith("워") and (c[:-1] + "ㅂ다") in allow:
            return True
    return False


def normalize_lemma(w: str) -> str:
    w = (w or "").strip()
    # strip sense numbers like 가다03, -가13
    w = re.sub(r"^-?", "", w)
    w = re.sub(r"\d+$", "", w)
    return w.strip()


def load_combined_rows(tsv_path: Path) -> list[dict]:
    text = tsv_path.read_text(encoding="utf-8")
    return list(csv.DictReader(text.splitlines(), delimiter="\t"))


def load_nikl_a(tsv_path: Path) -> set[str]:
    """NIKL 2003 grade A (~982).

    julienshim combined TSV mislabels columns: the A/B/C field with counts
    982/2111/2872 (classic NIKL sizes) lives in `topik_level`, while
    `nikl_level` uses 초급/중급. We take topik_level==A as NIKL A.
    """
    out: set[str] = set()
    for r in load_combined_rows(tsv_path):
        if (r.get("topik_level") or "").strip() != "A":
            continue
        lemma = normalize_lemma(r.get("word") or "")
        if lemma and HANGUL_TOKEN.fullmatch(lemma):
            out.add(lemma)
    return out


def load_nikl_chogeup(tsv_path: Path) -> set[str]:
    """Broader '초급' label in the same TSV (informational overlap)."""
    out: set[str] = set()
    for r in load_combined_rows(tsv_path):
        if (r.get("nikl_level") or "").strip() != "초급":
            continue
        lemma = normalize_lemma(r.get("word") or "")
        if lemma and HANGUL_TOKEN.fullmatch(lemma):
            out.add(lemma)
    return out


def load_tammy_1671(paths: list[Path]) -> list[dict]:
    pat = re.compile(
        r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|?\s*$", re.M
    )
    for p in paths:
        if not p.exists():
            continue
        text = p.read_text(encoding="utf-8")
        rows = []
        for m in pat.finditer(text):
            n, ko, en = int(m.group(1)), m.group(2).strip(), m.group(3).strip()
            if ko in ("한글", "----") or not HANGUL_TOKEN.search(ko):
                continue
            rows.append({"no": n, "ko": ko, "en": en})
        if len(rows) > 1000:
            return rows
    raise FileNotFoundError("Tammy 1671 markdown table not found")


def extract_tokens_from_obj(obj, bag: Counter, by_field: dict) -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("en", "zh", "ja", "ru", "vi", "id", "th", "tag", "tags", "id", "qid"):
                if k in ("tag", "tags") and isinstance(v, (str, list)):
                    pass  # skip tags for lemma scan of learner-facing KO
                extract_tokens_from_obj(v, bag, by_field)
                continue
            if k in ("ko", "prompt", "passage", "text", "stem", "why", "hint", "choices", "label"):
                if isinstance(v, str) and k == "ko":
                    for t in HANGUL_TOKEN.findall(v):
                        bag[t] += 1
                        by_field[k][t] += 1
                else:
                    extract_tokens_from_obj(v, bag, by_field)
            else:
                extract_tokens_from_obj(v, bag, by_field)
    elif isinstance(obj, list):
        for x in obj:
            extract_tokens_from_obj(x, bag, by_field)
    elif isinstance(obj, str):
        # only count if caller path already filtered; still scrape hangul from bilingual blobs carefully
        pass


def walk_ko_strings(obj, path: str = "") -> list[tuple[str, str]]:
    """Return (path, korean_string) for learner-facing KO fields."""
    out: list[tuple[str, str]] = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f"{path}.{k}" if path else k
            if k in ("en", "zh", "ja", "ru", "vi", "id", "th", "audio", "src", "url"):
                continue
            if k == "ko" and isinstance(v, str):
                out.append((p, v))
            elif k in ("choices",) and isinstance(v, list):
                for i, c in enumerate(v):
                    if isinstance(c, str):
                        out.append((f"{p}[{i}]", c))
                    else:
                        out.extend(walk_ko_strings(c, f"{p}[{i}]"))
            else:
                out.extend(walk_ko_strings(v, p))
    elif isinstance(obj, list):
        for i, x in enumerate(obj):
            out.extend(walk_ko_strings(x, f"{path}[{i}]"))
    return out


def main() -> None:
    SOURCE.mkdir(parents=True, exist_ok=True)
    tsv = SOURCE / "nikl-topik-combined.tsv"
    if not tsv.exists():
        raise SystemExit(f"missing {tsv}")

    nikl_a = load_nikl_a(tsv)
    nikl_chogeup = load_nikl_chogeup(tsv)

    tammy_paths = [
        AGENT_TOOLS / "a4443050-9c2b-4ad3-8584-11e7d69644e7.txt",
        AGENT_TOOLS / "5b4240b7-138f-436c-90d5-9fd4da9165ab.txt",
    ]
    tammy = load_tammy_1671(tammy_paths)
    tammy_set = {r["ko"] for r in tammy}
    tammy_soft = {w for w in tammy_set if w not in HARD}

    # Persist sources used
    (SOURCE / "tammy-topik1-1671.json").write_text(
        json.dumps(tammy, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (SOURCE / "nikl-a-lemmas.json").write_text(
        json.dumps(sorted(nikl_a), ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (SOURCE / "nikl-chogeup-lemmas.json").write_text(
        json.dumps(sorted(nikl_chogeup), ensure_ascii=False, indent=2), encoding="utf-8"
    )

    allow = set(nikl_a) | tammy_soft | ALWAYS
    allow_sorted = sorted(allow)

    allowlist = {
        "policy": "NIKL grade A ∪ (Tammy TOPIK I 1671 − hard abstracts) ∪ particles/function ALWAYS",
        "sources": {
            "nikl_combined_tsv": "hub/app/data/vocab/source/nikl-topik-combined.tsv (julienshim; A/B/C in topik_level col = NIKL sizes 982/2111/2872)",
            "nikl_official": "https://www.korean.go.kr/front/etcData/etcDataView.do?etc_seq=71",
            "tammy_1671": "https://learning-korean.com/elementary/20210101-10466/",
        },
        "counts": {
            "nikl_a": len(nikl_a),
            "nikl_chogeup_label": len(nikl_chogeup),
            "tammy_1671": len(tammy_set),
            "tammy_after_hard_filter": len(tammy_soft),
            "hard_removed": len(tammy_set & HARD),
            "always_particles": len(ALWAYS),
            "allowlist": len(allow),
            "nikl_a_intersect_tammy": len(nikl_a & tammy_set),
            "nikl_a_only": len(nikl_a - tammy_set),
            "tammy_soft_only": len(tammy_soft - nikl_a),
        },
        "hard_filter": sorted(HARD),
        "lemmas": allow_sorted,
    }
    (VOCAB / "vocab-allowlist.json").write_text(
        json.dumps(allowlist, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (VOCAB / "vocab-allowlist.txt").write_text(
        "\n".join(allow_sorted) + "\n", encoding="utf-8"
    )

    # Scan verified banks
    bank_files = sorted(DATA.glob("verified-*.json"))
    oov_by_bank: dict[str, Counter] = {}
    oov_examples: dict[str, list] = defaultdict(list)
    token_total = Counter()

    for bf in bank_files:
        data = json.loads(bf.read_text(encoding="utf-8"))
        bags = Counter()
        for path, s in walk_ko_strings(data):
            for t in HANGUL_TOKEN.findall(s):
                bags[t] += 1
                token_total[t] += 1
        oov = Counter()
        for t, c in bags.items():
            if in_allow(t, allow):
                continue
            oov[t] += c
        oov_by_bank[bf.name] = oov
        for t, c in oov.most_common(40):
            oov_examples[bf.name].append({"token": t, "count": c})

    unique_oov = sorted({t for c in oov_by_bank.values() for t in c})
    # Prefer content-looking OOV: length>=2 and not pure particles leftovers
    review_priority = [
        t
        for t in unique_oov
        if len(t) >= 2 and t not in BOILERPLATE
    ]
    report = {
        "allowlist_size": len(allow),
        "banks_scanned": [b.name for b in bank_files],
        "unique_oov_tokens": unique_oov,
        "unique_oov_count": len(unique_oov),
        "review_priority_count": len(review_priority),
        "review_priority_sample": review_priority[:120],
        "oov_counts_by_bank": {k: len(v) for k, v in oov_by_bank.items()},
        "oov_top_per_bank": {k: v for k, v in oov_examples.items()},
        "note": "Surface hangul + light ending peel. Not a full morphological analyzer — manual review before item rewrites.",
    }
    (VOCAB / "bank-oov-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    summary = {
        "ok": True,
        "allowlist": len(allow),
        "nikl_a": len(nikl_a),
        "tammy": len(tammy_set),
        "tammy_soft": len(tammy_soft),
        "banks": {k: len(v) for k, v in oov_by_bank.items()},
        "unique_oov": len(report["unique_oov_tokens"]),
    }
    (VOCAB / "allowlist-build-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(summary, ensure_ascii=True))


if __name__ == "__main__":
    main()

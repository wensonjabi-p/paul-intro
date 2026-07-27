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
    "고르십시오", "고르세요", "빈칸에", "빈칸은", "빈칸", "들어갈", "알맞은", "것을", "다음",
    "물음에", "답하십시오", "맞는", "내용과", "들은", "같은", "가장",
    "밑줄", "가리키는", "부분이", "대한", "이야기입니까", "재생", "버튼을", "대본을",
    "준비되면",
}

# Hint/why metalanguage — surface OOV but not learner bank gaps
META_NOISE = {
    "받침", "받침이", "높임", "높여", "대본", "동작", "대비", "대상", "대상을",
    "명사", "동사", "형용사", "끝소리", "끝소리에", "지시문", "선지", "보기", "지문",
    "해설", "힌트", "문법", "어휘", "발음", "음절", "초성", "중성", "종성",
    "활용형", "활용", "모음", "주어", "주제", "전체", "부분", "비교", "비교는",
    "비교해요", "표시해요", "완성해요", "없음", "아님", "자연스러워요", "인사말이에요",
    "앞부분만이에요", "이어가요", "추움", "허락", "허락을",
}

# Common dialogue proper names in TOPIK-style banks (not vocab gaps)
DIALOGUE_NAMES = {"민수", "민수가", "민수는", "유나", "유나는", "민지", "지수", "철수"}

# Verbal / connective endings peeled when classifying OOV noise (활용형)
NOISE_SUFFIXES = (
    "습니다", "습니까", "ㅂ니다", "ㅂ니까", "세요", "으세요", "아요", "어요", "여요", "해요",
    "예요", "이에요", "입니다", "입니까", "었어요", "았어요", "였어요", "했어요",
    "습니다만", "는데요", "거든요", "답니다",
    "는다", "니다", "니까", "ㄹ까요", "을까요", "드릴까요",
    "다고", "라고", "냐고", "자고",
    "거나", "든지", "면서", "아서", "어서", "해서", "지만", "는데",
    "으면", "면", "니까", "으니", "으면서",
    "고", "서", "며", "기", "게", "지", "다", "요", "죠", "네", "네요",
    "은", "는", "을", "를", "이", "가", "도", "만", "와", "과", "들",
    "에", "의", "로", "으로", "께", "보다", "까지", "부터", "에서", "마다",
    "하고",  # comitative after nouns (친구하고)
)

# Frequent bank surface forms → allowlisted lemmas (morphology the light peeler misses)
SURFACE_LEMMA = {
    "있어요": "있다", "있습니까": "있다", "없습니다": "없다", "없어요": "없다",
    "아니에요": "아니다", "아니요": "아니다", "아니라": "아니다", "아님": "아니다",
    "커요": "크다", "커고": "크다",
    "돼요": "되다", "하세요": "하다", "해요": "하다", "하는": "하다", "합니다": "하다",
    "했어요": "하다", "해주세요": "하다",
    "주세요": "주다", "계세요": "계시다",
    "갑니다": "가다", "갑니까": "가다", "갔어요": "가다", "가요": "가다",
    "같아요": "같다", "어때요": "어떻다",
    "먹어요": "먹다", "먹지": "먹다", "먹어": "먹다", "멉니다": "먹다",
    "쉬는": "쉬다", "쉽니다": "쉬다", "쉽시다": "쉬다",
    "재미있어요": "재미있다", "필요해요": "필요하다",
    "깨끗해요": "깨끗하다", "깨끗한지": "깨끗하다",
    "추워요": "춥다", "더워요": "덥다",
    "좋아해요": "좋아하다", "좋아합니다": "좋아하다",
    "마셨어요": "마시다", "마셨습니다": "마시다", "마신": "마시다",
    "만듭니다": "만들다", "끝난다": "끝나다", "끝났다": "끝나다",
    "온다": "오다", "옵니다": "오다",
    "엽니다": "열다", "여는": "열다",
    "일어납니다": "일어나다", "예뻤어요": "예쁘다",
    "삽니다": "살다", "다녀요": "다니다", "닫아": "닫다",
    "드릴까요": "드리다", "드십니다": "드시다",
    "말씀드려도": "말씀", "말한": "말하다", "말해도": "말하다",
    "빌렸어요": "빌리다", "빌린": "빌리다",
    "공부할": "공부하다", "시작합니까": "시작하다",
    "두었습니다": "두다", "았어요": "있다",  # remnant past ending in distractors
}

HANGUL_TOKEN = re.compile(r"[가-힣]+")
_JONG_B = 17  # ㅂ
_JONG_SS = 20  # ㅆ
_JONG_L = 8  # ㄹ
_JONG_N = 4  # ㄴ


def _syllable_parts(ch: str) -> tuple[int, int, int] | None:
    o = ord(ch) - 0xAC00
    if o < 0 or o > 11171:
        return None
    return o // 588, (o % 588) // 28, o % 28


def _compose(cho: int, jung: int, jong: int = 0) -> str:
    return chr(0xAC00 + cho * 588 + jung * 28 + jong)


def morph_extra_stems(token: str) -> list[str]:
    """Hangul-aware extras: ㅂ니다 merge, past ㅆ, 관형형 ㄴ/ㄹ, 해요 compounds."""
    extra: list[str] = []
    if not token:
        return extra

    # …니다 with ㅂ-batchim on preceding syllable (합니다/옵니다/엽니다/삽니다/만듭니다)
    if token.endswith("니다") and len(token) >= 3:
        head = token[: -2]  # drop 니다 → …합
        last = head[-1]
        parts = _syllable_parts(last)
        if parts and parts[2] == _JONG_B:
            cho, jung, _ = parts
            no_b = _compose(cho, jung, 0)
            stem = head[:-1] + no_b
            extra.append(stem)
            # ㄹ-irregular recover: 삽←살, 엽←열, 만드←만들
            with_l = head[:-1] + _compose(cho, jung, _JONG_L)
            extra.append(with_l)

    # Past/adjective ㅆ batchim: 마셨/예뻤/빌렸/두었/끝났 → try drop ㅆ + 다 forms
    last = token[-1]
    parts = _syllable_parts(last)
    if parts and parts[2] == _JONG_SS:
        cho, jung, _ = parts
        base = token[:-1] + _compose(cho, jung, 0)
        extra.append(base)
        # 셨 often ← 시: 마셨 ← 마시
        if _compose(cho, jung, 0).endswith("여") or jung in (4, 6):  # ㅕ/ㅓ-ish
            pass
        # 시 irregular: syllable was 셨 (시+었)
        if last in ("셨",) or (cho == 9 and jung == 4):  # 시+ㅓ+ㅆ ≈ 셨
            extra.append(token[:-1] + "시")
        # generic: 예뻤→예쁘, 빌렸→빌리 (replace final with 이/우 variants)
        if jung == 6:  # ㅓ
            extra.append(token[:-1] + _compose(cho, 20, 0))  # ㅡ? skip
        # 렸 (리+었): cho of ㄹ, jung ㅕ
        if last == "렸":
            extra.append(token[:-1] + "리")
        if last == "셨":
            extra.append(token[:-1] + "시")
        if last == "뻤":
            extra.append(token[:-1] + "쁘")
        if last == "었":
            extra.append(token[:-1])  # 두었→두
        if last == "았":
            extra.append(token[:-1])  # 끝났→끝나 via further peel

    # 관형형/미래 ㄴ·ㄹ: 마신/빌린/말한/공부할/가리키는
    if len(token) >= 2:
        lp = _syllable_parts(token[-1])
        if lp and lp[2] == _JONG_N:
            cho, jung, _ = lp
            extra.append(token[:-1] + _compose(cho, jung, 0))
        if lp and lp[2] == _JONG_L:
            cho, jung, _ = lp
            extra.append(token[:-1] + _compose(cho, jung, 0))
        if token.endswith("는") and len(token) > 2:
            extra.append(token[:-1])  # 가리키는→가리키; 여는→여 (weak)

    # 해요 / 해 복합: 좋아해요→좋아하, 말해→말하
    for suf, repl in (("해요", "하"), ("합니다", "하"), ("합니까", "하"), ("해", "하")):
        if token.endswith(suf) and len(token) > len(suf):
            extra.append(token[: -len(suf)] + repl)

    # 아/어 informal: 먹어→먹, 닫아→닫, 높여→높
    for suf in ("어", "아", "여"):
        if token.endswith(suf) and len(token) > 1:
            extra.append(token[: -len(suf)])

    return [x for x in extra if x]


def peel_stems(token: str) -> list[str]:
    """Multi-pass light peel for conjugation / particle noise detection."""
    seen: set[str] = set()
    out: list[str] = []
    queue = [token]
    while queue:
        cur = queue.pop()
        if cur in seen or len(cur) < 1:
            continue
        seen.add(cur)
        out.append(cur)
        for suf in NOISE_SUFFIXES:
            if not cur.endswith(suf):
                continue
            stem = cur[: -len(suf)]
            if not stem or stem in seen:
                continue
            if len(stem) >= 1:
                queue.append(stem)
        for stem in morph_extra_stems(cur):
            if stem and stem not in seen:
                queue.append(stem)
    return out


def stem_in_allow(stem: str, allow: set[str]) -> bool:
    if stem in allow or stem in ALWAYS or stem in BOILERPLATE or stem in META_NOISE:
        return True
    if stem in DIALOGUE_NAMES:
        return True
    if stem.endswith("하") and (stem + "다") in allow:
        return True
    if (stem + "다") in allow:
        return True
    if (stem + "요") in allow:
        return True
    if stem.endswith("우") and (stem[:-1] + "ㅂ다") in allow:
        return True
    if stem.endswith("워") and (stem[:-1] + "ㅂ다") in allow:
        return True
    # 말씀드리- compounds
    if stem.startswith("말씀") and ("말씀" in allow or "말" in allow):
        return True
    return False


def is_oov_noise(token: str, allow: set[str]) -> bool:
    """True when surface OOV is likely an inflection/particle attach of an allowlisted lemma."""
    if token in META_NOISE or token in BOILERPLATE or token in DIALOGUE_NAMES:
        return True
    if token in SURFACE_LEMMA and SURFACE_LEMMA[token] in allow:
        return True
    # name + particle already in DIALOGUE_NAMES; also bare name prefixes
    for name in ("민수", "유나", "민지", "지수", "철수"):
        if token == name or token.startswith(name):
            return True
    for stem in peel_stems(token):
        if stem == token:
            continue
        if stem_in_allow(stem, allow):
            return True
    return False


def in_allow(token: str, allow: set[str]) -> bool:
    if token in allow or token in ALWAYS or token in BOILERPLATE:
        return True
    if token in DIALOGUE_NAMES:
        return True
    if token in SURFACE_LEMMA and SURFACE_LEMMA[token] in allow:
        return True
    # light conjugation / particle peeling
    candidates = list(peel_stems(token))
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
    noise_likely = sorted(t for t in unique_oov if is_oov_noise(t, allow))
    content_review = sorted(
        t
        for t in unique_oov
        if t not in noise_likely and len(t) >= 2 and t not in BOILERPLATE
    )
    # Prefer content-looking OOV for manual bank rewrites
    review_priority = content_review
    report = {
        "allowlist_size": len(allow),
        "banks_scanned": [b.name for b in bank_files],
        "unique_oov_tokens": unique_oov,
        "unique_oov_count": len(unique_oov),
        "noise_likely_count": len(noise_likely),
        "noise_likely_sample": noise_likely[:80],
        "content_review_count": len(content_review),
        "content_review_sample": content_review[:120],
        "review_priority_count": len(review_priority),
        "review_priority_sample": review_priority[:120],
        "oov_counts_by_bank": {k: len(v) for k, v in oov_by_bank.items()},
        "oov_top_per_bank": {k: v for k, v in oov_examples.items()},
        "note": (
            "Surface hangul + light ending peel. "
            "noise_likely ≈ 활용형/조사 부착·힌트 메타어 (수동 리라이트 불필요). "
            "content_review / review_priority = 실제 검토 후보. "
            "Not a full morphological analyzer."
        ),
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
        "noise_likely": len(noise_likely),
        "content_review": len(content_review),
    }
    (VOCAB / "allowlist-build-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(summary, ensure_ascii=True))


if __name__ == "__main__":
    main()

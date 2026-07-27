# -*- coding: utf-8 -*-
"""R1: Hangul check choices → {en,ko,zh} + e-mak → eu-mak."""
from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "hub" / "app" / "data" / "hangul" / "track-manifest.json"

TR = {
    "ㅇ (silent seat)": {
        "en": "ㅇ (silent seat)",
        "ko": "ㅇ (자리만, 소리 없음)",
        "zh": "ㅇ（占位，不发音）",
    },
    "Stops ㄱㄷㅂ": {
        "en": "Stops ㄱㄷㅂ",
        "ko": "파열음 ㄱㄷㅂ",
        "zh": "破裂音 ㄱㄷㅂ",
    },
    "Soft / nasal-ish": {
        "en": "Soft / nasal-ish",
        "ko": "부드러운·비음 쪽",
        "zh": "软音/鼻音类",
    },
    "Aspirated ㅋㅌㅍㅊ": {
        "en": "Aspirated ㅋㅌㅍㅊ",
        "ko": "격음 ㅋㅌㅍㅊ",
        "zh": "送气音 ㅋㅌㅍㅊ",
    },
    "Vowels": {"en": "Vowels", "ko": "모음", "zh": "元音"},
    "Silent seat": {
        "en": "Silent seat",
        "ko": "소리 없는 자리",
        "zh": "不发音占位",
    },
    "Light breath consonant": {
        "en": "Light breath consonant",
        "ko": "가벼운 숨소리 자음",
        "zh": "轻送气辅音",
    },
    "Final ng": {"en": "Final ng", "ko": "받침 ng", "zh": "韵尾 ng"},
    "Vowel": {"en": "Vowel", "ko": "모음", "zh": "元音"},
    "ka-na": {"en": "ka-na", "ko": "카나", "zh": "ka-na"},
    "ga-na": {"en": "ga-na", "ko": "가나", "zh": "ga-na"},
    "ha-na": {"en": "ha-na", "ko": "하나", "zh": "ha-na"},
    "a-na": {"en": "a-na", "ko": "아나", "zh": "a-na"},
    "Rush all triples": {
        "en": "Rush all triples",
        "ko": "세 쌍을 급하게",
        "zh": "三组全赶着练",
    },
    "Slow clear triples": {
        "en": "Slow clear triples",
        "ko": "천천히 또렷한 세 쌍",
        "zh": "慢而清楚练三组",
    },
    "Only English letters": {
        "en": "Only English letters",
        "ko": "영어 철자만",
        "zh": "只用英文字母",
    },
    "Skip aspirated": {
        "en": "Skip aspirated",
        "ko": "격음 건너뛰기",
        "zh": "跳过送气音",
    },
    "Full paragraphs": {
        "en": "Full paragraphs",
        "ko": "긴 문단 전체",
        "zh": "整段长文",
    },
    "Short 2-syllable chunks": {
        "en": "Short 2-syllable chunks",
        "ko": "짧은 2음절 덩어리",
        "zh": "短的两音节块",
    },
    "Only romanization": {
        "en": "Only romanization",
        "ko": "로마자만",
        "zh": "只用罗马字",
    },
    "Skip diphthongs": {
        "en": "Skip diphthongs",
        "ko": "이중모음 건너뛰기",
        "zh": "跳过双元音",
    },
    "silent": {"en": "silent", "ko": "소리 없음", "zh": "不发音"},
    "h": {"en": "h", "ko": "h", "zh": "h"},
    "ng": {"en": "ng", "ko": "ng", "zh": "ng"},
    "same as initial ㅇ": {
        "en": "same as initial ㅇ",
        "ko": "초성 ㅇ과 같음",
        "zh": "与声母ㅇ相同",
    },
    "Only ㅇ": {"en": "Only ㅇ", "ko": "ㅇ만", "zh": "只有ㅇ"},
    "To ignore spelling": {
        "en": "To ignore spelling",
        "ko": "철자를 무시하려고",
        "zh": "为了忽略拼写",
    },
    "To skip vowels": {
        "en": "To skip vowels",
        "ko": "모음을 건너뛰려고",
        "zh": "为了跳过元音",
    },
    "For TOPIK essay only": {
        "en": "For TOPIK essay only",
        "ko": "TOPIK 작문만을 위해",
        "zh": "只为TOPIK作文",
    },
    "Two vowels": {"en": "Two vowels", "ko": "모음 둘", "zh": "两个元音"},
    "Two finals under one vowel": {
        "en": "Two finals under one vowel",
        "ko": "한 모음 아래 받침 둘",
        "zh": "一个元音下两个收音",
    },
    "No final": {"en": "No final", "ko": "받침 없음", "zh": "无收音"},
    "ㅎ only": {"en": "ㅎ only", "ko": "ㅎ만", "zh": "只有ㅎ"},
    "Never": {"en": "Never", "ko": "절대 안 됨", "zh": "从不"},
    "ㄱ from 국": {"en": "ㄱ from 국", "ko": "국의 ㄱ", "zh": "국里的ㄱ"},
    "Only ㅏ": {"en": "Only ㅏ", "ko": "ㅏ만", "zh": "只有ㅏ"},
    "Nothing": {"en": "Nothing", "ko": "없음", "zh": "没有"},
    "조 / 아요 → 조아요 feel": {
        "en": "조 / 아요 → 조아요 feel",
        "ko": "조 / 아요 → 조아요 느낌",
        "zh": "조 / 아요 → 조아요感",
    },
    "Only roman letters": {
        "en": "Only roman letters",
        "ko": "로마 글자만",
        "zh": "只有罗马字母",
    },
    "No vowels": {"en": "No vowels", "ko": "모음 없음", "zh": "没有元音"},
    "Always silent": {
        "en": "Always silent",
        "ko": "항상 무음",
        "zh": "总是不发音",
    },
    "New alphabet": {"en": "New alphabet", "ko": "새 알파벳", "zh": "新字母表"},
    "Warm-up mix before phrases": {
        "en": "Warm-up mix before phrases",
        "ko": "표현 전 워밍업 섞기",
        "zh": "短语前的热身混合",
    },
    "TOPIK II essay": {
        "en": "TOPIK II essay",
        "ko": "TOPIK II 작문",
        "zh": "TOPIK II作文",
    },
    "Skip reading": {
        "en": "Skip reading",
        "ko": "읽기 건너뛰기",
        "zh": "跳过阅读",
    },
    "English first only": {
        "en": "English first only",
        "ko": "영어만 먼저",
        "zh": "只先看英语",
    },
    "Sound out Hangul blocks → meaning": {
        "en": "Sound out Hangul blocks → meaning",
        "ko": "한글 블록 소리 내기 → 뜻",
        "zh": "读出韩文块 → 含义",
    },
    "Skip Hangul": {
        "en": "Skip Hangul",
        "ko": "한글 건너뛰기",
        "zh": "跳过韩文",
    },
    "Memorize roman only": {
        "en": "Memorize roman only",
        "ko": "로마자만 외우기",
        "zh": "只背罗马字",
    },
    "Ordering coffee size": {
        "en": "Ordering coffee size",
        "ko": "커피 사이즈 주문",
        "zh": "点咖啡杯型",
    },
    "Polite hello": {
        "en": "Polite hello",
        "ko": "공손한 인사",
        "zh": "礼貌问候",
    },
    "Writing Q54": {
        "en": "Writing Q54",
        "ko": "쓰기 54번",
        "zh": "写作第54题",
    },
    "Batchim only": {"en": "Batchim only", "ko": "받침만", "zh": "只有收音"},
    "Time only": {"en": "Time only", "ko": "시간만", "zh": "只问时间"},
    "Price": {"en": "Price", "ko": "가격", "zh": "价格"},
    "Name spelling": {
        "en": "Name spelling",
        "ko": "이름 철자",
        "zh": "名字拼写",
    },
    "Batchim theory": {
        "en": "Batchim theory",
        "ko": "받침 이론",
        "zh": "收音理论",
    },
    "A greeting": {"en": "A greeting", "ko": "인사말", "zh": "问候语"},
    "A help request": {
        "en": "A help request",
        "ko": "도움 요청",
        "zh": "求助请求",
    },
    "A vowel chart": {"en": "A vowel chart", "ko": "모음 표", "zh": "元音表"},
    "A tense consonant": {
        "en": "A tense consonant",
        "ko": "경음 자음",
        "zh": "紧辅音",
    },
}

# curly (U+2019) + straight apostrophe variants for the freeze tip
FREEZE_CURLED = "So reading doesn\u2019t freeze on new finals"
FREEZE_STRAIGHT = "So reading doesn't freeze on new finals"
_FREEZE_I18N = {
    "en": FREEZE_CURLED,
    "ko": "새 받침에서 읽기가 멈추지 않게",
    "zh": "读到新收音时不卡壳",
}
TR[FREEZE_CURLED] = dict(_FREEZE_I18N)
TR[FREEZE_STRAIGHT] = {**_FREEZE_I18N, "en": FREEZE_STRAIGHT}


def has_ascii_alpha(s: str) -> bool:
    return any(ch.isalpha() and ch.isascii() for ch in s)


def walk_fix_emak(obj) -> int:
    n = 0
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str) and "e-mak" in v:
                obj[k] = v.replace("e-mak", "eu-mak")
                n += 1
            else:
                n += walk_fix_emak(v)
    elif isinstance(obj, list):
        for it in obj:
            n += walk_fix_emak(it)
    return n


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    missing: set[str] = set()
    converted = 0

    for lesson in data.get("lessons", []):
        for mod in lesson.get("modules", []):
            if mod.get("type") != "check":
                continue
            choices = mod.get("choices") or []
            new_choices = []
            for c in choices:
                if isinstance(c, dict) or not isinstance(c, str):
                    new_choices.append(c)
                    continue
                if not has_ascii_alpha(c):
                    new_choices.append(c)
                    continue
                if c in TR:
                    new_choices.append(deepcopy(TR[c]))
                else:
                    missing.add(c)
                    new_choices.append({"en": c, "ko": c, "zh": c})
                converted += 1
            mod["choices"] = new_choices

    emak = walk_fix_emak(data)
    data["updated"] = "2026-07-27"

    MANIFEST.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"converted={converted} emak={emak} missing={sorted(missing)}")


if __name__ == "__main__":
    main()

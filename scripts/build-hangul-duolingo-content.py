#!/usr/bin/env python3
"""Enrich hangul track-manifest with Duolingo-style steps + Sejong-aligned original draft.

Preserves existing trace modules / stroke dataUrls. Structure only from Sejong 입문 00–17.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "hub" / "app" / "data" / "hangul" / "track-manifest.json"


def T(en: str, ko: str, zh: str) -> dict:
    return {"en": en, "ko": ko, "zh": zh}


def body(en: str, ko: str, zh: str) -> dict:
    return {"type": "explain", "status": "ready", "step": "teach", "body": T(en, ko, zh)}


def intro(en: str, ko: str, zh: str) -> dict:
    return {"type": "intro", "status": "ready", "step": "intro", "body": T(en, ko, zh)}


def objective(en: str, ko: str, zh: str) -> dict:
    return {"type": "objective", "status": "ready", "step": "intro", "body": T(en, ko, zh)}


def examples(items: list[tuple[str, str, str, str]], step: str = "teach") -> dict:
    return {
        "type": "examples",
        "status": "ready",
        "step": step,
        "items": [{"ko": ko, "gloss": T(en, gko, zh)} for ko, en, gko, zh in items],
    }


def check(prompt: dict, choices: list[str], answer: int, tip: dict) -> dict:
    return {
        "type": "check",
        "status": "ready",
        "step": "practice",
        "prompt": prompt,
        "choices": choices,
        "answer": answer,
        "tip": tip,
    }


def checkpoint(en: str, ko: str, zh: str) -> dict:
    return {"type": "checkpoint", "status": "ready", "step": "checkpoint", "body": T(en, ko, zh)}


def task(en: str, ko: str, zh: str) -> dict:
    return {"type": "task", "status": "ready", "step": "checkpoint", "body": T(en, ko, zh)}


# Rich original content keyed by lesson id. Sejong order/grouping only.
RICH: dict[str, list[dict]] = {}


def build_rich() -> None:
    RICH["hangul-00"] = [
        objective(
            "See how Hangul syllable blocks assemble before memorizing letters.",
            "글자를 외우기 전에 한글 음절 블록이 어떻게 모이는지 보기.",
            "先看韩文音节块怎么拼，再背字母。",
        ),
        intro(
            "Hangul is a building game: one sound = one square. Inside the square you read left→right, top→bottom.",
            "한글은 조립 게임: 소리 하나 = 네모 하나. 안에서는 왼→오, 위→아래.",
            "韩文像拼装：一声一方块。块内左→右、上→下。",
        ),
        body(
            "Three jobs in a block: (1) initial consonant, (2) vowel, (3) optional final under the vowel. Empty initial uses silent ㅇ.",
            "블록 안 일 3가지: (1) 초성 자음 (2) 모음 (3) 선택 받침. 초성이 없으면 ㅇ(소리 없음).",
            "块内三职：(1)声母 (2)元音 (3)可选收音。无声母用静音ㅇ。",
        ),
        examples(
            [
                ("아", "a — silent ㅇ + ㅏ", "아 — ㅇ+ㅏ", "아 — 静音ㅇ+ㅏ"),
                ("가", "ga — ㄱ + ㅏ", "가 — ㄱ+ㅏ", "가 — ㄱ+ㅏ"),
                ("나", "na — ㄴ + ㅏ", "나 — ㄴ+ㅏ", "나 — ㄴ+ㅏ"),
                ("강", "gang — ㄱ+ㅏ+ㅇ final", "강 — ㄱ+ㅏ+받침 ㅇ", "강 — ㄱ+ㅏ+韵尾ㅇ"),
            ]
        ),
        check(
            T("Which part is the vowel in 가?", "「가」에서 모음은?", "「가」里元音是？"),
            ["ㄱ", "ㅏ", "가 전체", "ㅇ"],
            1,
            T("ㄱ is consonant; ㅏ is the vowel.", "ㄱ=자음, ㅏ=모음.", "ㄱ辅音，ㅏ元音。"),
        ),
        check(
            T("When a vowel stands alone, what fills the initial slot?", "모음만 쓸 때 초성 자리는?", "元音单独写时声母位？"),
            ["ㄱ", "ㅎ", "ㅇ (silent)", "받침"],
            2,
            T("Silent ㅇ holds the spot (아 어 오…).", "ㅇ이 자리만 지킴(아 어 오…).", "静音ㅇ占位（아 어 오…）。"),
        ),
        checkpoint(
            "Checkpoint: you can point at consonant vs vowel in a simple block.",
            "체크포인트: 간단한 블록에서 자음·모음을 가리킬 수 있음.",
            "关卡：能指出简单块里的辅音与元音。",
        ),
        task(
            "Draw three empty squares. Write 아 · 가 · 나 and circle the vowel in each.",
            "빈 네모 세 개에 아·가·나를 쓰고 모음에 동그라미.",
            "画三个空格写아·가·나，圈出元音。",
        ),
    ]

    RICH["hangul-01"] = [
        objective(
            "Recognize and produce the 8 basic vowels in two bite-size groups.",
            "기본 모음 8개를 두 그룹으로 보고 소리 내기.",
            "分两组认读 8 个基本元音。",
        ),
        intro(
            "Sejong-style path starts with vowels first. Group A: ㅏㅓㅗㅜ · Group B: ㅡㅣㅔㅐ.",
            "세종 입문 순서처럼 모음이 먼저. 그룹 A ㅏㅓㅗㅜ · 그룹 B ㅡㅣㅔㅐ.",
            "入门路径先元音。A组ㅏㅓㅗㅜ · B组ㅡㅣㅔㅐ。",
        ),
        body(
            "Group A mouth map: ㅏ open front · ㅓ open back · ㅗ rounded high · ㅜ rounded back. Alone → 아 어 오 우.",
            "그룹 A: ㅏ 앞 열림 · ㅓ 뒤 열림 · ㅗ 둥글 높음 · ㅜ 둥글 뒤. 혼자면 아 어 오 우.",
            "A组：ㅏ前开 · ㅓ后开 · ㅗ圆高 · ㅜ圆后。单独＝아 어 오 우。",
        ),
        examples(
            [
                ("아", "a · like “ah”", "아", "아 · a"),
                ("어", "eo · open “uh”", "어", "어 · eo"),
                ("오", "o", "오", "오 · o"),
                ("우", "u", "우", "우 · u"),
            ],
            "teach",
        ),
        body(
            "Group B: ㅡ tight unrounded · ㅣ smile “ee” · ㅔ/ㅐ both near “e” for beginners — hear the pair, don’t panic about spelling yet.",
            "그룹 B: ㅡ 좁고 안 둥글 · ㅣ 이 · ㅔ/ㅐ는 초급에선 비슷한 ‘에’ 느낌 OK.",
            "B组：ㅡ紧平 · ㅣ ee · ㅔ/ㅐ初学可当近 e。",
        ),
        examples(
            [
                ("으", "eu · tight uh", "으", "으 · eu"),
                ("이", "i", "이", "이 · i"),
                ("에", "e", "에", "에 · e"),
                ("애", "ae · near 에 for many speakers", "애 (에와 비슷)", "애（常近에）"),
            ],
            "teach",
        ),
        check(
            T("Which set is Group A?", "그룹 A는?", "A组是？"),
            ["ㅡㅣㅔㅐ", "ㅏㅓㅗㅜ", "ㅑㅕㅛㅠ", "ㅋㅌㅍㅊ"],
            1,
            T("Basic open/round vowels first.", "기본 열림·둥글 모음이 먼저.", "先学开口/圆唇基本元音。"),
        ),
        check(
            T("Alone, ㅗ is written and read as…", "ㅗ 혼자면?", "ㅗ单独读作？"),
            ["오", "우", "어", "요"],
            0,
            T("Silent ㅇ + ㅗ → 오.", "ㅇ+ㅗ → 오.", "ㅇ+ㅗ → 오。"),
        ),
        checkpoint(
            "Checkpoint: list Group A then Group B from memory.",
            "체크포인트: 그룹 A → B를 기억해서 말하기.",
            "关卡：默背 A组再 B组。",
        ),
        task(
            "Cover the list; write ㅏㅓㅗㅜ then ㅡㅣㅔㅐ. Whisper 아어오우 · 으이에애.",
            "목록 가리고 ㅏㅓㅗㅜ · ㅡㅣㅔㅐ 쓰기. 아어오우 · 으이에애 속삭이기.",
            "遮表默写ㅏㅓㅗㅜ与ㅡㅣㅔㅐ，轻读아어오우 · 으이에애。",
        ),
    ]

    RICH["hangul-02"] = [
        objective(
            "Learn 8 basic consonants in three sound/shape groups (not ABC order).",
            "기본 자음 8개를 소리·모양 3그룹으로 (가나다순 아님).",
            "按声形三组学 8 个基本辅音（非字母表序）。",
        ),
        intro(
            "Soft group ㄴㅁㄹ → stop group ㄱㄷㅂ → ㅅㅈ. Combine with ㅏ: 나마라 · 가다바 · 사자.",
            "부드러운 ㄴㅁㄹ → 막힘 ㄱㄷㅂ → ㅅㅈ. ㅏ와: 나마라 · 가다바 · 사자.",
            "柔ㄴㅁㄹ → 塞ㄱㄷㅂ → ㅅㅈ。配ㅏ：나마라 · 가다바 · 사자。",
        ),
        body(
            "ㄴ tip of tongue on gum · ㅁ lips closed · ㄹ flap/light L–R. Feel the soft set before hard stops.",
            "ㄴ 혀끝 · ㅁ 입술 · ㄹ 가볍게 튕김. 부드러운 세트를 막힘 소리보다 먼저.",
            "ㄴ舌尖 · ㅁ双唇 · ㄹ轻弹。先柔后塞。",
        ),
        examples(
            [
                ("나", "na", "나", "나"),
                ("마", "ma", "마", "마"),
                ("라", "ra/la", "라", "라"),
            ]
        ),
        body(
            "Stops: ㄱ back of tongue · ㄷ tip · ㅂ lips. Short puff — not the strong aspirated set yet.",
            "막힘: ㄱ 목구멍 쪽 · ㄷ 혀끝 · ㅂ 입술. 짧게 — 아직 거센소리 아님.",
            "塞音：ㄱ舌根 · ㄷ舌尖 · ㅂ双唇。短促——尚非送气。",
        ),
        examples(
            [
                ("가", "ga", "가", "가"),
                ("다", "da", "다", "다"),
                ("바", "ba", "바", "바"),
                ("사", "sa", "사", "사"),
                ("자", "ja", "자", "자"),
            ]
        ),
        check(
            T("Which group is ㄴㅁㄹ?", "ㄴㅁㄹ은 어느 그룹?", "ㄴㅁㄹ属哪组？"),
            ["Stops ㄱㄷㅂ", "Soft / nasal-ish", "Aspirated ㅋㅌㅍㅊ", "Vowels"],
            1,
            T("Soft feel first in Sejong-style grouping.", "세종식 묶음에서 부드러운 소리 먼저.", "入门分组先柔音。"),
        ),
        check(
            T("ㄱ + ㅏ = ?", "ㄱ+ㅏ=?", "ㄱ+ㅏ=？"),
            ["카", "가", "까", "아"],
            1,
            T("Plain ㄱ + ㅏ → 가.", "평음 ㄱ+ㅏ → 가.", "平音ㄱ+ㅏ→가。"),
        ),
        checkpoint(
            "Checkpoint: say 나마라 · 가다바 · 사자 without looking.",
            "체크포인트: 나마라 · 가다바 · 사자를 보지 않고.",
            "关卡：不看资料读나마라 · 가다바 · 사자。",
        ),
        task(
            "Stroke-practice the 7 available consonants (skip ㅈ if marked coming later), then read the three chunks.",
            "획순으로 가능한 자음 연습(ㅈ 준비 중이면 스킵) 후 세 덩어리 읽기.",
            "笔顺练习可用辅音（ㅈ若准备中则跳过），再读三组。",
        ),
    ]

    RICH["hangul-03"] = [
        objective(
            "Mix vowels + basic consonants; meet silent ㅇ and breathy ㅎ.",
            "모음+기본 자음 섞기. ㅇ(자리)·ㅎ 만나기.",
            "混读元音+基本辅音；认识ㅇ占位与ㅎ。",
        ),
        intro(
            "Practice unit: recycle 01–02, then add ㅇ/ㅎ. Short CV only.",
            "연습활용: 01–02 재활용 + ㅇ/ㅎ. 짧은 CV만.",
            "练习课：复用01–02，加ㅇ/ㅎ。只要短CV。",
        ),
        body(
            "ㅇ initial = silent seat. ㅎ = light breath (하). Don’t confuse final ㅇ (ng) — that’s later.",
            "초성 ㅇ=무음 자리. ㅎ=가벼운 숨(하). 종성 ㅇ(ng)과 헷갈리지 않기 — 나중.",
            "声母ㅇ静音。ㅎ轻送气。别与韵尾ㅇ(ng)混淆——稍后。",
        ),
        examples(
            [
                ("아", "a (ㅇ silent)", "아 (ㅇ 무음)", "아（ㅇ静音）"),
                ("오", "o", "오", "오"),
                ("하", "ha", "하", "하"),
                ("고마", "go-ma practice", "고마 (연습)", "고마（练习）"),
                ("나라", "na-ra", "나라", "나라"),
                ("미소", "mi-so", "미소", "미소"),
            ]
        ),
        check(
            T("In 하, what is ㅎ?", "「하」의 ㅎ는?", "「하」的ㅎ是？"),
            ["Silent seat", "Light breath consonant", "Final ng", "Vowel"],
            1,
            T("ㅎ is a consonant with breath.", "ㅎ는 숨이 섞인 자음.", "ㅎ是带气辅音。"),
        ),
        check(
            T("Read: 가나", "읽기: 가나", "朗读：가나"),
            ["ka-na", "ga-na", "ha-na", "a-na"],
            1,
            T("ㄱ→ga, ㄴ→na.", "ㄱ→가, ㄴ→나.", "ㄱ→가，ㄴ→나。"),
        ),
        checkpoint(
            "Checkpoint: read 가나 · 다라 · 마바 · 사아 · 하 smoothly.",
            "체크포인트: 가나 · 다라 · 마바 · 사아 · 하 부드럽게.",
            "关卡：流畅读가나 · 다라 · 마바 · 사아 · 하。",
        ),
        task(
            "Write five CV syllables mixing any vowel from 01 with ㄱㄴㅁㅅㅎ.",
            "01 모음 + ㄱㄴㅁㅅㅎ로 CV 다섯 개 쓰기.",
            "用01元音+ㄱㄴㅁㅅㅎ写五个CV。",
        ),
    ]

    RICH["hangul-04"] = [
        objective(
            "Hear/write aspirated ㅋㅌㅍㅊ — more air than plain ㄱㄷㅂㅈ.",
            "거센소리 ㅋㅌㅍㅊ — ㄱㄷㅂㅈ보다 숨이 셈.",
            "送气音ㅋㅌㅍㅊ——比ㄱㄷㅂㅈ送气更强。",
        ),
        intro(
            "Hold a hand in front of your mouth: 카 should puff more than 가.",
            "손등을 입 앞에: 카가 가보다 바람이 셈.",
            "手背对嘴：카比가风更强。",
        ),
        body(
            "Map: ㅋ←ㄱ, ㅌ←ㄷ, ㅍ←ㅂ, ㅊ←ㅈ. Same place, more air. Contrast pairs beat isolated drilling.",
            "ㅋ←ㄱ, ㅌ←ㄷ, ㅍ←ㅂ, ㅊ←ㅈ. 자리 같고 숨만 셈. 단독보다 대비 쌍.",
            "ㅋ←ㄱ等。同部位更多气。对比对比单练更好。",
        ),
        examples(
            [
                ("카", "ka vs 가", "카 (가와 비교)", "카（对比가）"),
                ("타", "ta vs 다", "타 (다와 비교)", "타（对比다）"),
                ("파", "pa vs 바", "파 (바와 비교)", "파（对比바）"),
                ("차", "cha vs 자", "차 (자와 비교)", "차（对比자）"),
                ("커피", "keo-pi practice", "커피 (연습)", "커피（练习）"),
            ]
        ),
        check(
            T("Strong-breath partner of ㄱ is…", "ㄱ의 거센소리는?", "ㄱ的送气是？"),
            ["ㄲ", "ㅋ", "ㅎ", "ㅇ"],
            1,
            T("ㅋ is aspirated ㄱ.", "ㅋ=거센 ㄱ.", "ㅋ＝送气ㄱ。"),
        ),
        check(
            T("Which pair contrasts plain vs aspirated?", "평음·격음 대비는?", "平/送气对比？"),
            ["가 / 까", "가 / 카", "아 / 어", "나 / 마"],
            1,
            T("가 plain · 카 aspirated.", "가 평 · 카 격.", "가平 · 카送气。"),
        ),
        checkpoint(
            "Checkpoint: contrast-read 가/카 · 다/타 · 바/파 · 자/차.",
            "체크포인트: 가/카 · 다/타 · 바/파 · 자/차 대비.",
            "关卡：对比读가/카等。",
        ),
        task(
            "Trace ㅋㅌㅍㅊ in the stroke panel, then whisper each contrast pair twice.",
            "획순으로 ㅋㅌㅍㅊ 연습 후 대비 쌍을 두 번씩.",
            "笔顺练ㅋㅌㅍㅊ，再轻读每对比两遍。",
        ),
    ]

    RICH["hangul-05"] = [
        objective(
            "Meet tense doubles ㄲㄸㅃㅆ (ㅉ later — needs ㅈ stroke data).",
            "된소리 ㄲㄸㅃㅆ (ㅉ는 ㅈ 데이터 후).",
            "紧音ㄲㄸㅃㅆ（ㅉ待ㅈ数据）。",
        ),
        intro(
            "Tighten the throat — shorter/harder than plain. Shape looks like a double letter.",
            "목을 조여 짧고 단단하게. 모양은 글자 두 번.",
            "收紧喉咙更短硬。字形像双写。",
        ),
        body(
            "Triple for ㄱ-family: 가 (plain) · 카 (aspirated) · 까 (tense). Same for ㄷ/ㅂ; ㅅ has 사/싸 (ㅊ/ㅉ later).",
            "ㄱ 계열 삼중: 가·카·까. ㄷ/ㅂ도 같음. ㅅ는 사/싸 (ㅊ/ㅉ 나중).",
            "ㄱ系三连：가·카·까。ㄷ/ㅂ同。ㅅ为사/싸。",
        ),
        examples(
            [
                ("까", "kka vs 가·카", "까 (가·카와)", "까（对比가·카）"),
                ("따", "tta", "따", "따"),
                ("빠", "ppa", "빠", "빠"),
                ("싸", "ssa", "싸", "싸"),
                ("짜", "jja — later", "짜 (나중에)", "짜（稍后）"),
            ]
        ),
        check(
            T("Tense partner of ㄱ is…", "ㄱ의 된소리는?", "ㄱ的紧音是？"),
            ["ㅋ", "ㄲ", "ㅎ", "ㅇ"],
            1,
            T("ㄲ is tense (된소리).", "ㄲ=된소리.", "ㄲ＝紧音。"),
        ),
        check(
            T("Order of strength for g-set?", "ㄱ 계열 세기 순?", "ㄱ系力度顺序？"),
            ["까 · 가 · 카", "가 · 카 · 까", "카 · 까 · 가", "가 · 까 · 카"],
            1,
            T("Plain → aspirated → tense is a handy drill order.", "평→격→경 연습 순이 편함.", "平→送气→紧便于练。"),
        ),
        checkpoint(
            "Checkpoint: say 가·카·까 and 다·타·따 slowly.",
            "체크포인트: 가·카·까 / 다·타·따 천천히.",
            "关卡：慢读가·카·까与다·타·따。",
        ),
        task(
            "Trace ㄲㄸㅃㅆ; skip ㅉ if unavailable. Record yourself on one triple.",
            "ㄲㄸㅃㅆ 획순(ㅉ 없으면 스킵). 삼중 하나 녹음.",
            "笔顺ㄲㄸㅃㅆ；无ㅉ则跳过。录一组三连。",
        ),
    ]

    RICH["hangul-06"] = [
        objective(
            "Review plain / aspirated / tense contrasts together.",
            "평음 · 격음 · 경음 대비 복습.",
            "综合复习平/送气/紧。",
        ),
        intro(
            "Practice 2: slow triples beat fast guessing. Same mouth place, three strengths.",
            "연습활용 2: 빠른 찍기보다 느린 삼중. 자리 같고 세기만 다름.",
            "练习2：慢三连胜过快猜。同部位三种力度。",
        ),
        examples(
            [
                ("가카까", "ga-ka-kka", "가·카·까", "가·카·까"),
                ("다타따", "da-ta-tta", "다·타·따", "다·타·따"),
                ("바파빠", "ba-pa-ppa", "바·파·빠", "바·파·빠"),
                ("사싸", "sa-ssa", "사·싸", "사·싸"),
                ("자차짜", "ja-cha-jja (ㅉ optional)", "자·차·짜 (선택)", "자·차·짜（可选）"),
            ]
        ),
        check(
            T("바파빠 drills which family?", "바파빠는 어느 계열?", "바파빠属哪系？"),
            ["ㄱ", "ㄷ", "ㅂ", "ㅅ"],
            2,
            T("ㅂ · ㅍ · ㅃ.", "ㅂ·ㅍ·ㅃ.", "ㅂ·ㅍ·ㅃ。"),
        ),
        check(
            T("Best practice tip?", "가장 좋은 연습 팁?", "最佳练习提示？"),
            ["Rush all triples", "Slow clear triples", "Only English letters", "Skip aspirated"],
            1,
            T("Clarity > speed for contrasts.", "대비는 또렷함이 속도보다 중요.", "对比靠清晰度。"),
        ),
        checkpoint(
            "Checkpoint: write one remembered triple without looking.",
            "체크포인트: 기억나는 삼중 하나 보기 없이 쓰기.",
            "关卡：默写一组三连。",
        ),
        task(
            "Pick your weakest pair (e.g. 다/타) and do 10 slow reps.",
            "가장 약한 쌍(예: 다/타) 10번 천천히.",
            "选最弱对比（如다/타）慢练10次。",
        ),
    ]

    RICH["hangul-07"] = [
        objective(
            "Add y-glide diphthongs ㅑㅕㅛㅠ.",
            "y 미끄러짐 이중모음 ㅑㅕㅛㅠ.",
            "加 y 滑音双元音ㅑㅕㅛㅠ。",
        ),
        intro(
            "Think y + basic vowel. Extra stroke on the basic vowel shape.",
            "y + 기본 모음. 기본 모음에 획 하나 더.",
            "y+基本元音。基本形多一笔。",
        ),
        body(
            "Map: ㅑ≈ya ←ㅏ, ㅕ≈yeo ←ㅓ, ㅛ≈yo ←ㅗ, ㅠ≈yu ←ㅜ. Say the base, then add the glide.",
            "ㅑ≈야←ㅏ, ㅕ≈여←ㅓ, ㅛ≈요←ㅗ, ㅠ≈유←ㅜ. 기본 먼저 → 미끄러짐.",
            "ㅑ≈ya←ㅏ等。先基本再滑。",
        ),
        examples(
            [
                ("야", "ya", "야", "야"),
                ("여", "yeo", "여", "여"),
                ("요", "yo", "요", "요"),
                ("유", "yu", "유", "유"),
                ("야구", "ya-gu practice", "야구 (연습)", "야구（练习）"),
                ("우유", "u-yu", "우유", "우유"),
            ]
        ),
        check(
            T("ㅑ comes from which basic vowel?", "ㅑ의 기본 모음은?", "ㅑ来自哪个基本元音？"),
            ["ㅓ", "ㅏ", "ㅗ", "ㅜ"],
            1,
            T("ㅑ ← ㅏ + y-glide.", "ㅑ ← ㅏ + y.", "ㅑ←ㅏ+y。"),
        ),
        check(
            T("ㅛ is closest to…", "ㅛ에 가까운 것은?", "ㅛ最接近？"),
            ["야", "요", "와", "으"],
            1,
            T("ㅛ → 요.", "ㅛ → 요.", "ㅛ→요。"),
        ),
        checkpoint(
            "Checkpoint: match ㅑㅕㅛㅠ to ㅏㅓㅗㅜ.",
            "체크포인트: ㅑㅕㅛㅠ ↔ ㅏㅓㅗㅜ 짝.",
            "关卡：配对ㅑㅕㅛㅠ与ㅏㅓㅗㅜ。",
        ),
        task(
            "Write 야 여 요 유, then invent two nonsense syllables with ㅛ.",
            "야여요유 쓰고 ㅛ로 nonsense 음절 둘.",
            "写야여요유，再用ㅛ造两个无音节。",
        ),
    ]

    RICH["hangul-08"] = [
        objective(
            "Build combo vowels ㅘㅝㅟㅢ from parts.",
            "합쳐진 모음 ㅘㅝㅟㅢ를 부품으로.",
            "用零件组合ㅘㅝㅟㅢ。",
        ),
        intro(
            "Say the parts, then blend: ㅗ+ㅏ=ㅘ (wa), ㅜ+ㅓ=ㅝ, ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ.",
            "나눠 말한 뒤 붙이기: ㅗ+ㅏ=ㅘ, ㅜ+ㅓ=ㅝ, ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ.",
            "先分读再合：ㅗ+ㅏ=ㅘ等。",
        ),
        body(
            "ㅢ often sounds like “e” in fast speech (의사→e-sa for many). Learn the spelling parts first.",
            "ㅢ는 빠르게 말할 때 ‘에’처럼 들리기도(의사). 철자 부품을 먼저.",
            "ㅢ口语常近 e。先记字形零件。",
        ),
        examples(
            [
                ("와", "wa", "와", "와"),
                ("워", "wo", "워", "워"),
                ("위", "wi", "위", "위"),
                ("의", "ui (often e)", "의 (자주 에)", "의（常近에）"),
                ("과일", "gwa-il", "과일", "과일"),
                ("의사", "ui-sa / e-sa", "의사", "의사"),
            ]
        ),
        check(
            T("ㅗ + ㅏ = ?", "ㅗ+ㅏ=?", "ㅗ+ㅏ=？"),
            ["ㅝ", "ㅘ", "ㅟ", "ㅢ"],
            1,
            T("ㅘ = wa.", "ㅘ=와.", "ㅘ＝와。"),
        ),
        check(
            T("Which uses ㅡ + ㅣ?", "ㅡ+ㅣ인 것은?", "哪个是ㅡ+ㅣ？"),
            ["ㅘ", "ㅝ", "ㅟ", "ㅢ"],
            3,
            T("ㅢ.", "ㅢ.", "ㅢ。"),
        ),
        checkpoint(
            "Checkpoint: build 와 · 워 · 위 · 의 from parts out loud.",
            "체크포인트: 와·워·위·의를 부품부터 소리 내어.",
            "关卡：从零件读出와·워·위·의。",
        ),
        task(
            "For each of ㅘㅝㅟㅢ, write the two source vowels beside it.",
            "ㅘㅝㅟㅢ 옆에 재료 모음 둘씩 쓰기.",
            "在ㅘㅝㅟㅢ旁写出两个源元音。",
        ),
    ]

    RICH["hangul-09"] = [
        objective(
            "Mix all vowels so far (basic + both diphthong sets).",
            "지금까지 모음(기본+이중) 섞어 읽기.",
            "混读已学全部元音。",
        ),
        intro(
            "Attach known consonants ㄱㄴㅁㅅㅎ to y- and w-vowels. Keep chunks short.",
            "아는 자음 ㄱㄴㅁㅅㅎ를 y·w 모음에. 짧게.",
            "把已会辅音接到 y/w 元音，保持短。",
        ),
        examples(
            [
                ("야호", "ya-ho", "야호", "야호"),
                ("와요", "wa-yo", "와요", "와요"),
                ("위에", "wi-e", "위에", "위에"),
                ("의자", "ui-ja", "의자", "의자"),
                ("휴가", "hyu-ga", "휴가", "휴가"),
                ("과일", "gwa-il", "과일", "과일"),
            ]
        ),
        check(
            T("와요 uses which w-vowel?", "「와요」의 w 모음은?", "「와요」的 w 元音？"),
            ["ㅝ", "ㅘ", "ㅟ", "ㅢ"],
            1,
            T("와 = ㅘ.", "와=ㅘ.", "와＝ㅘ。"),
        ),
        check(
            T("Best drill length?", "연습 길이는?", "练习长度？"),
            ["Full paragraphs", "Short 2-syllable chunks", "Only romanization", "Skip diphthongs"],
            1,
            T("Bite-size like a skill path step.", "스킬 패스처럼 한입 크기.", "像技能路径一口大小。"),
        ),
        checkpoint(
            "Checkpoint: invent three nonsense syllables using ㅛ or ㅘ.",
            "체크포인트: ㅛ 또는 ㅘ로 nonsense 셋.",
            "关卡：用ㅛ或ㅘ造三个无音节。",
        ),
        task(
            "Read the example list twice: once slow, once normal.",
            "예 목록 두 번: 느림 → 보통.",
            "例句表读两遍：慢→常速。",
        ),
    ]

    RICH["hangul-10"] = [
        objective(
            "Add simple finals (받침) under the vowel — new job for known letters.",
            "쉬운 받침 — 아는 글자의 새 일.",
            "简单收音——已知字母的新角色。",
        ),
        intro(
            "Final closes the syllable. ㅇ as final = ng (강), not silent!",
            "받침은 음절을 닫음. 종성 ㅇ=ng(강) — 무음 아님!",
            "收音闭合音节。韵尾ㅇ=ng，不是静音！",
        ),
        body(
            "Start with ㄱㄴㄹㅁㅂㅇ under 가 → 각 간 갈 감 갑 강. Feel the stop vs nasal vs ng.",
            "가 아래 ㄱㄴㄹㅁㅂㅇ → 각 간 갈 감 갑 강. 막힘·비음·ng 느낌.",
            "가下加ㄱㄴㄹㅁㅂㅇ→각간갈갑강。感受塞/鼻/ng。",
        ),
        examples(
            [
                ("각", "gak", "각", "각"),
                ("간", "gan", "간", "간"),
                ("갈", "gal", "갈", "갈"),
                ("감", "gam", "감", "감"),
                ("갑", "gap", "갑", "갑"),
                ("강", "gang (ㅇ=ng)", "강 (ㅇ=ng)", "강（ㅇ=ng）"),
            ]
        ),
        check(
            T("Final ㅇ sounds like…", "받침 ㅇ 소리는?", "韵尾ㅇ读作？"),
            ["silent", "h", "ng", "same as initial ㅇ"],
            2,
            T("Final ㅇ = ng.", "종성 ㅇ=ng.", "韵尾ㅇ＝ng。"),
        ),
        check(
            T("가 + ㄴ final = ?", "가+ㄴ 받침=?", "가+ㄴ收音=？"),
            ["강", "간", "갈", "갓"],
            1,
            T("간.", "간.", "간。"),
        ),
        checkpoint(
            "Checkpoint: change 가 by adding ㄴ · ㅁ · ㅇ and read each.",
            "체크포인트: 가에 ㄴ·ㅁ·ㅇ 넣어 각각 읽기.",
            "关卡：가下加ㄴ·ㅁ·ㅇ并朗读。",
        ),
        task(
            "Write 산 · 문 · 밥 and underline the final in each.",
            "산·문·밥 쓰고 받침에 밑줄.",
            "写산·문·밥并给收音划线。",
        ),
    ]

    RICH["hangul-11"] = [
        objective(
            "More finals; notice end-sound shortcuts (several letters → few stop sounds).",
            "받침 더 · 끝소리 줄임 알아채기.",
            "更多收音，察觉尾音简化。",
        ),
        intro(
            "At syllable end, ㅅ/ㅈ/ㅊ often collapse toward a t-like stop. You’ll refine with listening later.",
            "음절 끝 ㅅ/ㅈ/ㅊ는 ㄷ 계열로 모이기도. 듣기는 나중에 다듬기.",
            "音节末ㅅ/ㅈ/ㅊ常近ㄷ。听力稍后精修。",
        ),
        examples(
            [
                ("갓", "gat-like end", "갓 (끝≈ㄷ)", "갓（尾近ㄷ）"),
                ("낮", "nat-like", "낮", "낮"),
                ("꽃", "kkot-like", "꽃", "꽃"),
                ("부엌", "bu-eok", "부엌", "부엌"),
                ("앞", "ap", "앞", "앞"),
                ("히읗", "hieut name practice", "히읗 (이름 연습)", "히읗（名称练习）"),
            ]
        ),
        check(
            T("Why learn shortcuts now?", "지금 줄임을 배우는 이유?", "为何现在学简化？"),
            ["To ignore spelling", "So reading doesn’t freeze on new finals", "To skip vowels", "For TOPIK essay only"],
            1,
            T("Recognize the pattern; polish later.", "패턴만 알고 정교함은 나중에.", "先认模式，精修稍后。"),
        ),
        check(
            T("앞 ends with which letter?", "「앞」받침은?", "「앞」的收音？"),
            ["ㅂ", "ㅍ", "ㅁ", "ㅇ"],
            1,
            T("ㅍ final.", "받침 ㅍ.", "韵尾ㅍ。"),
        ),
        checkpoint(
            "Checkpoint: read 갓 · 낮 · 앞 slowly without English letter names.",
            "체크포인트: 갓·낮·앞을 영어 알파벳 이름 없이.",
            "关卡：慢读갓·낮·앞，不用英文字母名。",
        ),
        task(
            "Copy three words from the examples and mark C–V–C in each block.",
            "예에서 단어 셋 베끼고 각 블록에 C–V–C 표시.",
            "从例子抄三词，标出每块 C–V–C。",
        ),
    ]

    RICH["hangul-12"] = [
        objective(
            "CVC reading drill with finals from lessons 10–11.",
            "10–11 받침으로 CVC 읽기.",
            "用10–11收音做CVC朗读。",
        ),
        intro(
            "Build consonant + vowel + final. Pause between syllables if needed — then glue.",
            "자음+모음+받침. 필요하면 음절 사이 쉬고 붙이기.",
            "辅音+元音+收音。需要就停顿再粘。",
        ),
        examples(
            [
                ("산", "san · mountain", "산 · mountain", "산 · 山"),
                ("물", "mul · water", "물 · water", "물 · 水"),
                ("밥", "bap · meal", "밥 · meal", "밥 · 饭"),
                ("옷", "ot · clothes", "옷 · clothes", "옷 · 衣服"),
                ("한국", "han-guk", "한국", "한국"),
                ("친구", "chin-gu", "친구", "친구"),
            ]
        ),
        check(
            T("물 has which final?", "「물」받침은?", "「물」收音？"),
            ["ㅁ", "ㄹ", "ㅂ", "ㅇ"],
            1,
            T("ㄹ.", "ㄹ.", "ㄹ。"),
        ),
        check(
            T("한국 is how many blocks?", "「한국」블록 수?", "「한국」几块？"),
            ["1", "2", "3", "4"],
            1,
            T("한 + 국.", "한+국.", "한+국。"),
        ),
        checkpoint(
            "Checkpoint: write three CVC syllables you can read without help.",
            "체크포인트: 혼자 읽을 CVC 셋 쓰기.",
            "关卡：写出三个自己能读的CVC。",
        ),
        task(
            "Make a mini word list: place · food · thing — one Hangul word each.",
            "미니 목록: 장소·음식·물건 한글 단어 하나씩.",
            "迷你表：地点·食物·物品各一词。",
        ),
    ]

    RICH["hangul-13"] = [
        objective(
            "See double finals (겹받침); usually only one sound is heard in careful speech.",
            "겹받침 — 천천히 말할 때 소리 하나.",
            "双收音——慢说常只听一个音。",
        ),
        intro(
            "Two letters under one vowel. Before a vowel, the second may move (liaison → next lesson).",
            "모음 아래 둘. 다음이 모음이면 뒤 글자가 넘어가기도(연음→다음).",
            "一元音下两字母。后接元音时后字可连（下一课）。",
        ),
        examples(
            [
                ("앉다", "an-da (앉·)", "앉다", "앉다"),
                ("없다", "eop-da", "없다", "없다"),
                ("읽다", "ik-da", "읽다", "읽다"),
                ("흙", "heuk", "흙", "흙"),
                ("많다", "man-ta (many)", "많다", "많다"),
            ]
        ),
        check(
            T("겹받침 means…", "겹받침은?", "겹받침是？"),
            ["Two vowels", "Two finals under one vowel", "No final", "Only ㅇ"],
            1,
            T("Double final cluster.", "받침이 둘.", "双收音。"),
        ),
        check(
            T("Circle the double final in 없다 — which cluster?", "「없다」겹받침은?", "「없다」双收音？"),
            ["ㄴㅈ", "ㅂㅅ", "ㄹㄱ", "ㄴㅎ"],
            1,
            T("ㅄ.", "ㅄ.", "ㅄ。"),
        ),
        checkpoint(
            "Checkpoint: find the double final in 없다 and 읽다.",
            "체크포인트: 없다·읽다에서 겹받침 찾기.",
            "关卡：在없다、읽다找双收音。",
        ),
        task(
            "Copy 없다 · 읽다 · 앉다 and underline the two final letters.",
            "없다·읽다·앉다 베끼고 받침 두 글자에 밑줄.",
            "抄없다·읽다·앉다并给两收音字母划线。",
        ),
    ]

    RICH["hangul-14"] = [
        objective(
            "Liaison: when the next block starts with silent ㅇ, the final often moves over.",
            "연음: 다음이 초성 ㅇ이면 받침이 자주 넘어감.",
            "连音：下一块声母ㅇ时收音常前移。",
        ),
        intro(
            "Spelling stays; speaking links. 한국어 ≈ han-gu-geo (ㄱ fills the empty ㅇ).",
            "철자 그대로, 말할 때 연결. 한국어 ≈ 한구거.",
            "写法不变，说时相连。한국어≈한구거。",
        ),
        examples(
            [
                ("한국어", "≈ han-gu-geo", "≈ 한구거", "≈ 한구거"),
                ("음악", "e-mak link", "음악 연음", "音乐连读"),
                ("있어요", "≈ i-sseo-yo", "≈ 이써요", "≈ 이써요"),
                ("꽃이", "≈ kko-chi", "≈ 꼬치", "≈ 꼬치"),
                ("옷이", "≈ o-si", "≈ 오시", "≈ 오시"),
            ]
        ),
        check(
            T("Liaison often happens when next initial is…", "연음이 자주 되는 다음 초성은?", "连音常发生在下一声母为？"),
            ["ㄱ", "ㅇ (silent seat)", "ㅎ only", "Never"],
            1,
            T("Empty ㅇ seat invites the final.", "빈 ㅇ 자리가 받침을 받음.", "空ㅇ位承接收音。"),
        ),
        check(
            T("한국어 spoken linking moves which sound?", "「한국어」연음으로 움직이는 소리?", "「한국어」连音移动的音？"),
            ["ㅎ", "ㄱ from 국", "Only ㅏ", "Nothing"],
            1,
            T("ㄱ moves toward the next ㅇ.", "ㄱ이 다음 ㅇ 쪽으로.", "ㄱ移向下一ㅇ。"),
        ),
        checkpoint(
            "Checkpoint: say 한국어 slow (3 parts) then normal speed.",
            "체크포인트: 한국어 천천히 세 덩어리 → 보통.",
            "关卡：한국어先慢拆三截再常速。",
        ),
        task(
            "Take 꽃이 and 있어요: write spelling, then write a linked reading aid.",
            "꽃이·있어요: 철자 쓰고 연음 읽기 도우미 적기.",
            "꽃이·있어요：写拼法，再写连读提示。",
        ),
    ]

    RICH["hangul-15"] = [
        objective(
            "Full Hangul warm-up before survival phrases.",
            "생존 표현 전 한글 종합 워밍업.",
            "生存表达前的综合热身。",
        ),
        intro(
            "Pull vowels, consonants, finals, liaison into short real-looking words.",
            "모음·자음·받침·연음을 짧은 실전 느낌 단어로.",
            "把元音辅音收音连音收进短词。",
        ),
        examples(
            [
                ("읽어요", "il-geo-yo", "읽어요", "읽어요"),
                ("없어요", "eop-seo-yo", "없어요", "없어요"),
                ("좋아요", "jo-a-yo", "좋아요", "좋아요"),
                ("학교", "hak-gyo", "학교", "학교"),
                ("안녕하세요", "an-nyeong… (preview)", "안녕하세요 (맛보기)", "안녕하세요（预览）"),
            ]
        ),
        check(
            T("좋아요 may show liaison on which boundary?", "「좋아요」연음 경계는?", "「좋아요」连音边界？"),
            ["조 / 아요 → 조아요 feel", "Only roman letters", "No vowels", "Always silent"],
            0,
            T("ㅎ can weaken; listen for a smooth jo-a-yo.", "ㅎ가 약해지며 조아요처럼.", "ㅎ弱化，听成조아요。"),
        ),
        check(
            T("This unit’s job?", "이 단원 역할?", "本课作用？"),
            ["New alphabet", "Warm-up mix before phrases", "TOPIK II essay", "Skip reading"],
            1,
            T("Practice 5 = mix before survival lines.", "연습활용 5=표현 전 섞기.", "练习5＝表达前混合。"),
        ),
        checkpoint(
            "Checkpoint: pick one hard word and write it three times while saying it.",
            "체크포인트: 어려운 단어 하나 쓰며 세 번.",
            "关卡：选难词边写边说三遍。",
        ),
        task(
            "Make a 60-second reading loop: 읽어요 · 없어요 · 학교 · 좋아요.",
            "60초 루프: 읽어요 · 없어요 · 학교 · 좋아요.",
            "60秒循环读：읽어요 · 없어요 · 학교 · 좋아요。",
        ),
    ]

    RICH["hangul-16"] = [
        objective(
            "Read three polite survival lines with Hangul you know.",
            "아는 한글로 예의 있는 생존 문장 세 줄.",
            "用已会韩文读三句礼貌生存句。",
        ),
        intro(
            "Original jabi. lines — decode blocks first, then meaning. Classroom-polite tone.",
            "jabi. 원작. 블록 먼저 → 뜻. 교실 존댓말 톤.",
            "jabi.原创。先解码再意思。课堂敬体。",
        ),
        body(
            "Pattern pack: greeting · thanks · apology. Same polite -습니다 / -요 family feel.",
            "패턴: 인사 · 감사 · 사과. 존댓말 -습니다/-요 느낌.",
            "句型：问候·感谢·道歉。敬体 -습니다/-요。",
        ),
        examples(
            [
                ("안녕하세요", "Hello (polite)", "안녕하세요", "你好（敬体）"),
                ("감사합니다", "Thank you", "감사합니다", "谢谢"),
                ("죄송합니다", "I’m sorry", "죄송합니다", "对不起"),
                ("만나서 반가워요", "Nice to meet you", "만나서 반가워요", "很高兴认识你"),
            ]
        ),
        check(
            T("Best order when learning a line?", "문장 학습 순서는?", "学一句的最佳顺序？"),
            ["English first only", "Sound out Hangul blocks → meaning", "Skip Hangul", "Memorize roman only"],
            1,
            T("Letters first keeps the Hangul track honest.", "글자 먼저가 한글 트랙의 약속.", "先字母才符合韩文轨。"),
        ),
        check(
            T("안녕하세요 is mainly used for…", "「안녕하세요」주요 용도?", "「안녕하세요」主要用于？"),
            ["Ordering coffee size", "Polite hello", "Writing Q54", "Batchim only"],
            1,
            T("Polite greeting.", "예의 있는 인사.", "礼貌问候。"),
        ),
        checkpoint(
            "Checkpoint: cover glosses; read only Hangul twice.",
            "체크포인트: 뜻 가리고 한글만 두 번.",
            "关卡：遮释义只读韩文两遍。",
        ),
        task(
            "Pick one line to say aloud once a day this week.",
            "이번 주 매일 한 번 소리 낼 문장 하나.",
            "选一句本周每天大声说一次。",
        ),
    ]

    RICH["hangul-17"] = [
        objective(
            "Ask for help / place / price in Hangul.",
            "도움·장소·가격을 한글로 묻기.",
            "用韩文问帮忙、地点、价钱。",
        ),
        intro(
            "Survival set 2 — still decode first. Liaison may appear (어디예요).",
            "표현 2 — 여전히 글자 먼저. 연음 가능(어디예요).",
            "表达2——仍先解码。可能有连音。",
        ),
        body(
            "Question endings you’ll hear a lot: -예요/-이에요 · -세요. Meaning after sound.",
            "자주 듣는 물음: -예요/-이에요 · -세요. 소리 다음 뜻.",
            "常听疑问尾：-예요/-이에요 · -세요。先声后义。",
        ),
        examples(
            [
                ("화장실 어디예요?", "Where is the restroom?", "화장실 어디예요?", "洗手间在哪？"),
                ("얼마예요?", "How much is it?", "얼마예요?", "多少钱？"),
                ("도와 주세요", "Please help me", "도와 주세요", "请帮帮我"),
                ("다시 말해 주세요", "Please say that again", "다시 말해 주세요", "请再说一次"),
            ]
        ),
        check(
            T("얼마예요? asks about…", "「얼마예요?」는?", "「얼마예요?」问？"),
            ["Time only", "Price", "Name spelling", "Batchim theory"],
            1,
            T("Price question.", "가격.", "价钱。"),
        ),
        check(
            T("도와 주세요 is…", "「도와 주세요」는?", "「도와 주세요」是？"),
            ["A greeting", "A help request", "A vowel chart", "A tense consonant"],
            1,
            T("Please help.", "도와 달라는 말.", "请帮忙。"),
        ),
        checkpoint(
            "Checkpoint: choose one line for daily aloud practice.",
            "체크포인트: 매일 소리 낼 문장 하나 고르기.",
            "关卡：选一句每日朗读。",
        ),
        task(
            "Role-play 10 seconds: point somewhere and ask 어디예요? then answer with a place word you know.",
            "10초 롤플레이: 어디예요? → 아는 장소 단어로 답.",
            "10秒角色：问어디예요？再用已知地点词答。",
        ),
    ]


def merge_trace(old_modules: list, new_modules: list) -> list:
    traces = [m for m in old_modules if m.get("type") == "trace"]
    if not traces:
        return new_modules
    # Insert trace before checkpoint/task
    out = []
    inserted = False
    for m in new_modules:
        if not inserted and m.get("type") in ("checkpoint", "task") and m.get("step") == "checkpoint":
            out.extend(traces)
            inserted = True
        out.append(m)
    if not inserted:
        out.extend(traces)
    return out


def main() -> None:
    build_rich()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    data["version"] = 2
    data["status"] = "draft"
    data["updated"] = "2026-07-26"
    data["format"] = "duolingo-steps-v1"
    data["lead"] = T(
        "Duolingo-style skill path · Sejong 00–17 structure · rich jabi. draft (edit later). Stroke practice live.",
        "듀오링고식 스킬 패스 · 세종 입문 00–17 구조 · jabi. 상세 초안(나중에 수정). 획순 연습 가능.",
        "多邻国式技能路径 · 世宗入门00–17结构 · jabi.详细草稿（稍后改）。笔顺可用。",
    )
    data["schema"]["moduleTypes"].update(
        {
            "intro": "body {en,ko,zh} — hook card",
            "check": "prompt + choices + answer + tip — quick practice (no spoiling early tip)",
            "checkpoint": "body — end-of-skill gate copy",
        }
    )
    data["schema"]["steps"] = ["intro", "teach", "practice", "checkpoint"]

    for lesson in data["lessons"]:
        lid = lesson["id"]
        old = lesson.get("modules") or []
        rich = RICH.get(lid)
        if not rich:
            continue
        lesson["modules"] = merge_trace(old, rich)
        lesson["status"] = "draft"
        lesson["pathLabel"] = f"{lesson['order']:02d}"

    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST} · lessons={len(data['lessons'])}")


if __name__ == "__main__":
    main()

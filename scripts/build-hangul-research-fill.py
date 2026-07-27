#!/usr/bin/env python3
"""Research-backed Hangul content fill (2026-07-26).

Sources summarized in docs/research-hangul-content-fill-ko.md.
Sejong 00–17 structure/order only — original jabi. wording.
Preserves existing trace modules / stroke dataUrls.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "hub" / "app" / "data" / "hangul" / "track-manifest.json"


def T(en: str, ko: str, zh: str) -> dict:
    return {"en": en, "ko": ko, "zh": zh}


def objective(en: str, ko: str, zh: str) -> dict:
    return {"type": "objective", "status": "ready", "step": "intro", "body": T(en, ko, zh)}


def intro(en: str, ko: str, zh: str) -> dict:
    return {"type": "intro", "status": "ready", "step": "intro", "body": T(en, ko, zh)}


def body(en: str, ko: str, zh: str) -> dict:
    return {"type": "explain", "status": "ready", "step": "teach", "body": T(en, ko, zh)}


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


def merge_trace(old_modules: list, new_modules: list) -> list:
    traces = [m for m in old_modules if m.get("type") == "trace"]
    if not traces:
        return new_modules
    out: list = []
    inserted = False
    for m in new_modules:
        if not inserted and m.get("type") in ("checkpoint", "task") and m.get("step") == "checkpoint":
            out.extend(traces)
            inserted = True
        out.append(m)
    if not inserted:
        out.extend(traces)
    return out


def build_rich() -> dict[str, list[dict]]:
    R: dict[str, list[dict]] = {}

    R["hangul-00"] = [
        objective(
            "See syllable blocks (초·중·종) before memorizing letters.",
            "글자 암기 전에 음절 블록(초·중·종) 구조 보기.",
            "先看音节块（初·中·终）结构，再背字母。",
        ),
        intro(
            "Hangul is a building game: one spoken syllable ≈ one square. Inside: left→right, top→bottom (same idea as Hunminjeongeum combining).",
            "한글은 조립: 소리 음절 ≈ 네모 하나. 안은 왼→오·위→아래(훈민정음 합자 방향과 같음).",
            "韩文像拼装：一声节约一块。块内左→右、上→下（合字方向）。",
        ),
        body(
            "Three jobs: (1) initial consonant 초성 (2) vowel 중성 (3) optional final 종성/받침 under the vowel. Empty initial → silent ㅇ seat.",
            "일 3가지: (1) 초성 자음 (2) 중성 모음 (3) 선택 종성(받침). 초성 비면 ㅇ이 자리만 지킴(무음).",
            "三职：(1)声母 (2)元音 (3)可选韵尾。无声母用静音ㅇ占位。",
        ),
        body(
            "Later: the same letter ㅇ as a final means ng (강). Role changes with position — train your eyes on the slot first.",
            "나중에: 같은 ㅇ이 종성이면 ng(강). 글자 같고 자리가 다름 — 먼저 자리 보기.",
            "稍后：韵尾ㅇ=ng。字形同、位置不同——先看槽位。",
        ),
        examples(
            [
                ("아", "a — silent ㅇ + ㅏ", "아 — ㅇ(무음)+ㅏ", "아 — 静音ㅇ+ㅏ"),
                ("가", "ga — ㄱ + ㅏ", "가 — ㄱ+ㅏ", "가 — ㄱ+ㅏ"),
                ("나", "na — ㄴ + ㅏ", "나 — ㄴ+ㅏ", "나 — ㄴ+ㅏ"),
                ("강", "gang — ㄱ+ㅏ+ㅇ final (ng)", "강 — ㄱ+ㅏ+종성 ㅇ(ng)", "강 — ㄱ+ㅏ+韵尾ㅇ(ng)"),
            ]
        ),
        check(
            T("Which part is the vowel in 가?", "「가」에서 모음(중성)은?", "「가」里元音是？"),
            ["ㄱ", "ㅏ", "가 전체", "ㅇ"],
            1,
            T("ㄱ=consonant; ㅏ=vowel.", "ㄱ=자음, ㅏ=모음.", "ㄱ辅音，ㅏ元音。"),
        ),
        check(
            T("When a vowel stands alone, what fills the initial slot?", "모음만 쓸 때 초성 자리는?", "元音单独写时声母位？"),
            ["ㄱ", "ㅎ", "ㅇ (silent seat)", "받침"],
            2,
            T("Silent ㅇ holds the spot (아 어 오…).", "ㅇ이 자리만 지킴(아 어 오…).", "静音ㅇ占位。"),
        ),
        checkpoint(
            "Checkpoint: point to consonant vs vowel in 아 · 가 · 나.",
            "체크포인트: 아·가·나에서 자음·모음 가리키기.",
            "关卡：在아·가·나指出辅音与元音。",
        ),
        task(
            "Draw three squares. Write 아 · 가 · 나; circle the vowel; underline any final if present.",
            "빈 네모 셋에 아·가·나. 모음 동그라미. 받침 있으면 밑줄.",
            "画三格写아·가·나；圈元音；有收音则划线。",
        ),
    ]

    R["hangul-01"] = [
        objective(
            "Recognize and say the 8 basic vowels in two groups (Sejong 「기본 모음」 order).",
            "세종 입문 「기본 모음」8개를 두 그룹으로 보고 소리 내기.",
            "按世宗入门「基本元音」认读 8 个，分两组。",
        ),
        intro(
            "KFL paths usually teach vowels before consonants. Group A ㅏㅓㅗㅜ · Group B ㅡㅣㅔㅐ.",
            "KFL 교재는 보통 모음이 먼저. 그룹 A ㅏㅓㅗㅜ · 그룹 B ㅡㅣㅔㅐ.",
            "KFL 通常先元音。A组ㅏㅓㅗㅜ · B组ㅡㅣㅔㅐ。",
        ),
        body(
            "Shape tip: vertical-ish ㅏㅓㅣ (stem beside) · horizontal-ish ㅗㅜㅡ (stem under/over). Alone → 아 어 오 우.",
            "모양: 세로형 ㅏㅓㅣ · 가로형 ㅗㅜㅡ. 혼자면 아 어 오 우.",
            "形：竖型ㅏㅓㅣ · 横型ㅗㅜㅡ。单独＝아 어 오 우。",
        ),
        examples(
            [
                ("아", "a · open front", "아 · 앞 열림", "아 · 前开"),
                ("어", "eo · open back/central", "어 · 뒤·가운데 열림", "어 · 后/央开"),
                ("오", "o · rounded", "오 · 둥글", "오 · 圆唇"),
                ("우", "u · rounded back", "우 · 둥글 뒤", "우 · 圆后"),
            ]
        ),
        body(
            "Group B: ㅡ tight unrounded · ㅣ “ee”. ㅔ/ㅐ often merge toward “e” for many speakers — hear the pair; spelling precision comes later.",
            "그룹 B: ㅡ 좁고 안 둥글 · ㅣ 이. ㅔ/ㅐ는 구어에서 비슷한 ‘에’로 들리기도 — 철자 정교함은 나중.",
            "B组：ㅡ紧平 · ㅣ ee。ㅔ/ㅐ口语常近 e——拼写稍后精修。",
        ),
        examples(
            [
                ("으", "eu · tight uh", "으", "으 · eu"),
                ("이", "i", "이", "이 · i"),
                ("에", "e", "에", "에 · e"),
                ("애", "ae · often near 에", "애 (에와 비슷할 수)", "애（常近에）"),
            ]
        ),
        check(
            T("Which set is Group A (basic open/round)?", "그룹 A(열림·둥글)는?", "A组（开口/圆唇）？"),
            ["ㅡㅣㅔㅐ", "ㅏㅓㅗㅜ", "ㅑㅕㅛㅠ", "ㅋㅌㅍㅊ"],
            1,
            T("Basic open/round vowels first in Sejong path.", "세종 경로에서 기본 열림·둥글이 먼저.", "世宗路径先基本开口/圆唇。"),
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

    R["hangul-02"] = [
        objective(
            "Learn 8 basic consonants in three sound/shape groups (not ABC order).",
            "기본 자음 8개를 소리·모양 3그룹으로 (가나다순 아님).",
            "按声形三组学 8 个基本辅音（非字母表序）。",
        ),
        intro(
            "Sejong-style grouping: soft ㄴㅁㄹ → stops ㄱㄷㅂ → ㅅㅈ. With ㅏ: 나마라 · 가다바 · 사자.",
            "세종식 묶음: 부드러운 ㄴㅁㄹ → 막힘 ㄱㄷㅂ → ㅅㅈ. ㅏ와: 나마라 · 가다바 · 사자.",
            "世宗式分组：柔ㄴㅁㄹ → 塞ㄱㄷㅂ → ㅅㅈ。配ㅏ：나마라 · 가다바 · 사자。",
        ),
        body(
            "ㄴ tongue tip · ㅁ lips · ㄹ light flap. Feel the soft set before hard stops — matches articulatory grouping used in many KFL intros.",
            "ㄴ 혀끝 · ㅁ 입술 · ㄹ 가볍게 튕김. 부드러운 세트를 막힘보다 먼저 — KFL 입문 조음 묶음과 같음.",
            "ㄴ舌尖 · ㅁ双唇 · ㄹ轻弹。先柔后塞——与常见KFL入门分组一致。",
        ),
        examples(
            [
                ("나", "na", "나", "나"),
                ("마", "ma", "마", "마"),
                ("라", "ra/la flap", "라", "라"),
            ]
        ),
        body(
            "Stops: ㄱ back · ㄷ tip · ㅂ lips — short, not aspirated yet. Stroke habit (not NIKL law): horizontal L→R, vertical T→B.",
            "막힘: ㄱ 목구멍 쪽 · ㄷ 혀끝 · ㅂ 입술 — 짧게, 아직 거센소리 아님. 획 관행(국어원 필순법 아님): 가로 왼→오, 세로 위→아래.",
            "塞音：ㄱ舌根 · ㄷ舌尖 · ㅂ双唇。笔顺习惯（非国语院成文）：横左→右，竖上→下。",
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
            "Use the stroke panel for available consonants (skip ㅈ if marked later). Trace once, then read the three chunks.",
            "획순 패널로 가능한 자음 연습(ㅈ 준비 중이면 스킵). 한 번 따라 쓴 뒤 세 덩어리 읽기.",
            "笔顺练习可用辅音（ㅈ若准备中则跳过），再读三组。",
        ),
    ]

    R["hangul-03"] = [
        objective(
            "Mix vowels + basic consonants; meet silent ㅇ and breathy ㅎ.",
            "모음+기본 자음 섞기. ㅇ(자리)·ㅎ 만나기.",
            "混读元音+基本辅音；认识ㅇ占位与ㅎ。",
        ),
        intro(
            "Practice unit (세종 「연습활용」 role): recycle 01–02, add ㅇ/ㅎ. Short CV only — no finals yet.",
            "연습활용 역할: 01–02 재활용 + ㅇ/ㅎ. 짧은 CV만 — 아직 받침 없음.",
            "练习课角色：复用01–02，加ㅇ/ㅎ。只要短CV——尚无收音。",
        ),
        body(
            "Initial ㅇ = silent seat. ㅎ = light breath (하). Do not confuse with final ㅇ (ng) — that arrives in 받침 1.",
            "초성 ㅇ=무음 자리. ㅎ=가벼운 숨(하). 종성 ㅇ(ng)과 구분 — 받침 1에서.",
            "声母ㅇ静音。ㅎ轻送气。别与韵尾ㅇ混淆——在收音1。",
        ),
        examples(
            [
                ("아", "a (ㅇ silent)", "아 (ㅇ 무음)", "아（ㅇ静音）"),
                ("오", "o", "오", "오"),
                ("하", "ha", "하", "하"),
                ("고마", "go-ma (drill)", "고마 (연습)", "고마（练习）"),
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

    R["hangul-04"] = [
        objective(
            "Hear/write aspirated ㅋㅌㅍㅊ — more air than plain ㄱㄷㅂㅈ.",
            "거센소리 ㅋㅌㅍㅊ — ㄱㄷㅂㅈ보다 숨이 셈.",
            "送气音ㅋㅌㅍㅊ——比ㄱㄷㅂㅈ送气更强。",
        ),
        intro(
            "Hand in front of mouth: 카 should puff more than 가 (classic aspiration contrast drill).",
            "손등을 입 앞에: 카가 가보다 바람이 셈 (격음 대비 드릴).",
            "手背对嘴：카比가风更强。",
        ),
        body(
            "Map: ㅋ←ㄱ, ㅌ←ㄷ, ㅍ←ㅂ, ㅊ←ㅈ. Same place, more air. Minimal pairs beat isolated drilling.",
            "ㅋ←ㄱ, ㅌ←ㄷ, ㅍ←ㅂ, ㅊ←ㅈ. 자리 같고 숨만 셈. 단독보다 최소대립 쌍.",
            "ㅋ←ㄱ等。同部位更多气。最小对立对比单练更好。",
        ),
        examples(
            [
                ("카", "ka vs 가", "카 (가와 비교)", "카（对比가）"),
                ("타", "ta vs 다", "타 (다와 비교)", "타（对比다）"),
                ("파", "pa vs 바", "파 (바와 비교)", "파（对比바）"),
                ("차", "cha vs 자", "차 (자와 비교)", "차（对比자）"),
                ("커피", "keo-pi (drill)", "커피 (연습)", "커피（练习）"),
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

    R["hangul-05"] = [
        objective(
            "Meet tense doubles ㄲㄸㅃㅆ (ㅉ later if ㅈ stroke missing).",
            "된소리 ㄲㄸㅃㅆ (ㅉ는 ㅈ 획 데이터 후).",
            "紧音ㄲㄸㅃㅆ（ㅉ待ㅈ数据）。",
        ),
        intro(
            "Tighten — shorter/harder than plain. Shape looks doubled. Third member of the plain/aspirated/tense set.",
            "목을 조여 짧고 단단하게. 모양은 글자 두 번. 평·격·경 삼중의 세 번째.",
            "收紧更短硬。字形双写。平/送气/紧三连的第三。",
        ),
        body(
            "Drill order (pedagogy, not “physics ranking”): 가 (plain) · 카 (aspirated) · 까 (tense). Same for ㄷ/ㅂ; ㅅ → 사/싸.",
            "연습 순(물리 세기표 아님): 가·카·까. ㄷ/ㅂ도 같음. ㅅ → 사/싸.",
            "练习序：가·카·까。ㄷ/ㅂ同。ㅅ→사/싸。",
        ),
        examples(
            [
                ("까", "kka vs 가·카", "까 (가·카와)", "까（对比가·카）"),
                ("따", "tta", "따", "따"),
                ("빠", "ppa", "빠", "빠"),
                ("싸", "ssa", "싸", "싸"),
                ("짜", "jja — later if needed", "짜 (필요 시 나중에)", "짜（稍后）"),
            ]
        ),
        check(
            T("Tense partner of ㄱ is…", "ㄱ의 된소리는?", "ㄱ的紧音是？"),
            ["ㅋ", "ㄲ", "ㅎ", "ㅇ"],
            1,
            T("ㄲ is tense (된소리).", "ㄲ=된소리.", "ㄲ＝紧音。"),
        ),
        check(
            T("Handy drill order for the g-set?", "ㄱ 계열 연습 순?", "ㄱ系练习顺序？"),
            ["까 · 가 · 카", "가 · 카 · 까", "카 · 까 · 가", "가 · 까 · 카"],
            1,
            T("Plain → aspirated → tense is a clear classroom drill.", "평→격→경이 교실 드릴로 또렷함.", "平→送气→紧便于课堂练。"),
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

    R["hangul-06"] = [
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
        body(
            "If one pair is fuzzy (e.g. 다/타), stay there — contrast listening is the gate before diphthongs.",
            "한 쌍이 흐리면(예: 다/타) 거기 머물기 — 이중모음 전 대비 청취가 게이트.",
            "某一对比糊就停住——双元音前对比听力是关卡。",
        ),
        examples(
            [
                ("가카까", "ga-ka-kka", "가·카·까", "가·카·까"),
                ("다타따", "da-ta-tta", "다·타·따", "다·타·따"),
                ("바파빠", "ba-pa-ppa", "바·파·빠", "바·파·빠"),
                ("사싸", "sa-ssa", "사·싸", "사·싸"),
                ("자차짜", "ja-cha-jja (optional)", "자·차·짜 (선택)", "자·차·짜（可选）"),
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

    R["hangul-07"] = [
        objective(
            "Add y-glide diphthongs ㅑㅕㅛㅠ (세종 이중모음 1).",
            "y 미끄러짐 이중모음 ㅑㅕㅛㅠ (세종 이중모음 1).",
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
                ("야구", "ya-gu (drill)", "야구 (연습)", "야구（练习）"),
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

    R["hangul-08"] = [
        objective(
            "Build combo vowels ㅘㅝㅟㅢ from parts (세종 이중모음 2 core set).",
            "합쳐진 모음 ㅘㅝㅟㅢ를 부품으로 (이중모음 2 핵심).",
            "用零件组合ㅘㅝㅟㅢ（双元音2核心）。",
        ),
        intro(
            "Say the parts, then blend: ㅗ+ㅏ=ㅘ (wa), ㅜ+ㅓ=ㅝ, ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ.",
            "나눠 말한 뒤 붙이기: ㅗ+ㅏ=ㅘ, ㅜ+ㅓ=ㅝ, ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ.",
            "先分读再合：ㅗ+ㅏ=ㅘ等。",
        ),
        body(
            "ㅢ often sounds like “e” in fast speech (의사). Learn spelling parts first; polish listening later. (Extra ㅚ/ㅙ/ㅞ can wait.)",
            "ㅢ는 빠르게 ‘에’처럼 들리기도(의사). 철자 부품 먼저. (ㅚ/ㅙ/ㅞ는 후속.)",
            "ㅢ口语常近 e。先记零件。（ㅚ等稍后。）",
        ),
        examples(
            [
                ("와", "wa", "와", "와"),
                ("워", "wo/weo", "워", "워"),
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

    R["hangul-09"] = [
        objective(
            "Mix all vowels so far (basic + both diphthong sets).",
            "지금까지 모음(기본+이중) 섞어 읽기.",
            "混读已学全部元音（基本+双元音）。",
        ),
        intro(
            "Attach known consonants ㄱㄴㅁㅅㅎ to y- and w-vowels. Keep chunks short (skill-path bite size).",
            "아는 자음 ㄱㄴㅁㅅㅎ를 y·w 모음에. 한입 크기.",
            "把已会辅音接到 y/w 元音，保持一口大小。",
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

    # Batchim pedagogy: position → 7 reps → unreleased → shortcuts → liaison
    R["hangul-10"] = [
        objective(
            "Spot 받침 position, then the 7 representative finals (ㄱㄴㄷㄹㅁㅂㅇ).",
            "받침 자리 보기 → 7대표음(ㄱㄴㄷㄹㅁㅂㅇ).",
            "先看收音位置，再学 7 代表音。",
        ),
        intro(
            "Research order: (1) see the bottom slot (2) learn 7 sounds (3) keep endings short/unreleased. Final ㅇ = ng — not silent!",
            "연구 순서: (1) 아래 자리 (2) 7소리 (3) 끝소리 짧게·미방출. 종성 ㅇ=ng — 무음 아님!",
            "研究顺序：(1)看底部 (2)七音 (3)尾音短促不爆破。韵尾ㅇ=ng！",
        ),
        body(
            "Start under 가 → 각 간 갈 감 갑 강. Feel stop vs nasal vs ng. Do not add an English “uh” after (밥 ≠ ba-buh).",
            "가 아래 → 각 간 갈 감 갑 강. 막힘·비음·ng. 영어식 ‘어’ 덧붙이지 않기(밥 ≠ ba-buh).",
            "가下→각간갈갑강。塞/鼻/ng。勿加英文 uh。",
        ),
        examples(
            [
                ("각", "gak · [ㄱ] final", "각 · 끝 [ㄱ]", "각 · 尾[ㄱ]"),
                ("간", "gan · [ㄴ]", "간 · [ㄴ]", "간 · [ㄴ]"),
                ("갈", "gal · [ㄹ]", "갈 · [ㄹ]", "갈 · [ㄹ]"),
                ("감", "gam · [ㅁ]", "감 · [ㅁ]", "감 · [ㅁ]"),
                ("갑", "gap · [ㅂ]", "갑 · [ㅂ]", "갑 · [ㅂ]"),
                ("강", "gang · [ㅇ]=ng", "강 · [ㅇ]=ng", "강 · [ㅇ]=ng"),
            ]
        ),
        check(
            T("Final ㅇ sounds like…", "받침 ㅇ 소리는?", "韵尾ㅇ读作？"),
            ["silent", "h", "ng", "same as initial ㅇ"],
            2,
            T("Final ㅇ = ng.", "종성 ㅇ=ng.", "韵尾ㅇ＝ng。"),
        ),
        check(
            T("How many representative final sounds for beginners?", "초급 받침 대표음 개수는?", "初学收音代表音几个？"),
            ["2", "7", "24", "Only ㅇ"],
            1,
            T("Seven: ㄱㄴㄷㄹㅁㅂㅇ.", "일곱: ㄱㄴㄷㄹㅁㅂㅇ.", "七个：ㄱㄴㄷㄹㅁㅂㅇ。"),
        ),
        checkpoint(
            "Checkpoint: change 가 by adding ㄴ · ㅁ · ㅇ and read each.",
            "체크포인트: 가에 ㄴ·ㅁ·ㅇ 넣어 각각 읽기.",
            "关卡：가下加ㄴ·ㅁ·ㅇ并朗读。",
        ),
        task(
            "Write 산 · 문 · 밥; underline the final; say each once without a trailing “uh”.",
            "산·문·밥 쓰고 받침 밑줄. ‘어’ 없이 한 번씩.",
            "写산·문·밥并划收音；尾不加 uh。",
        ),
    ]

    R["hangul-11"] = [
        objective(
            "More finals: several letters collapse to few end-sounds (esp. ㄷ-family).",
            "받침 더 — 여러 글자가 몇 끝소리로 모임(특히 ㄷ 계열).",
            "更多收音：多字母归并到少数尾音（尤其ㄷ系）。",
        ),
        intro(
            "After the 7 reps: at syllable end, ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/(ㅎ) often sound ㄷ-like. Spelling stays; sound shortens.",
            "7대표 다음: 음절 끝 ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/(ㅎ)는 ㄷ처럼. 철자 그대로, 소리만 짧아짐.",
            "七音之后：音节末ㅅ等常近ㄷ。写法不变，音变短。",
        ),
        body(
            "Quick map (reading aid): ㅋ/ㄲ → [ㄱ] feel · ㅍ → [ㅂ] · ㅅㅈㅊ… → [ㄷ]. Refine with listening later — don’t freeze on new shapes.",
            "읽기 지도: ㅋ/ㄲ → [ㄱ] · ㅍ → [ㅂ] · ㅅㅈㅊ… → [ㄷ]. 듣기는 나중에 — 새 모양에 멈추지 않기.",
            "读音提示：ㅋ/ㄲ→[ㄱ] · ㅍ→[ㅂ] · ㅅㅈㅊ→[ㄷ]。听力稍后。",
        ),
        examples(
            [
                ("갓", "gat-like end ≈ [ㄷ]", "갓 (끝≈ㄷ)", "갓（尾近ㄷ）"),
                ("낮", "nat-like ≈ [ㄷ]", "낮", "낮"),
                ("꽃", "kkot-like ≈ [ㄷ]", "꽃", "꽃"),
                ("부엌", "bu-eok · [ㄱ] family", "부엌 · [ㄱ] 계열", "부엌 · [ㄱ]系"),
                ("앞", "ap · [ㅂ] family", "앞 · [ㅂ] 계열", "앞 · [ㅂ]系"),
                ("빛", "bit-like ≈ [ㄷ]", "빛", "빛"),
            ]
        ),
        check(
            T("Why learn end-sound shortcuts now?", "지금 끝소리 줄임을 배우는 이유?", "为何现在学尾音简化？"),
            ["To ignore spelling", "So reading doesn’t freeze on new finals", "To skip vowels", "For TOPIK essay only"],
            1,
            T("Recognize the pattern; polish later.", "패턴만 알고 정교함은 나중에.", "先认模式，精修稍后。"),
        ),
        check(
            T("앞 ends with which letter (spelling)?", "「앞」받침 글자는?", "「앞」收音字母？"),
            ["ㅂ", "ㅍ", "ㅁ", "ㅇ"],
            1,
            T("Spelling ㅍ; end-sound near [ㅂ].", "철자 ㅍ; 끝소리는 [ㅂ] 쪽.", "拼写ㅍ；尾音近[ㅂ]。"),
        ),
        checkpoint(
            "Checkpoint: read 갓 · 낮 · 앞 slowly without English letter names.",
            "체크포인트: 갓·낮·앞을 영어 알파벳 이름 없이.",
            "关卡：慢读갓·낮·앞，不用英文字母名。",
        ),
        task(
            "Copy three example words; mark C–V–C in each block.",
            "예에서 단어 셋 베끼고 각 블록에 C–V–C 표시.",
            "从例子抄三词，标出每块 C–V–C。",
        ),
    ]

    R["hangul-12"] = [
        objective(
            "CVC reading drill with finals from lessons 10–11.",
            "10–11 받침으로 CVC 읽기.",
            "用10–11收音做CVC朗读。",
        ),
        intro(
            "Build consonant + vowel + final. Pause between syllables if needed — then glue. Original short nouns only.",
            "자음+모음+받침. 필요하면 음절 사이 쉬고 붙이기. 원작 짧은 명사.",
            "辅音+元音+收音。需要就停顿再粘。原创短名词。",
        ),
        examples(
            [
                ("산", "san · mountain", "산 · mountain", "산 · 山"),
                ("물", "mul · water", "물 · water", "물 · 水"),
                ("밥", "bap · meal (no trailing uh)", "밥 · meal (‘어’ 없이)", "밥 · 饭（无uh）"),
                ("옷", "ot · clothes ≈ [ㄷ] end", "옷 · clothes (끝≈ㄷ)", "옷 · 衣服（尾近ㄷ）"),
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
            "Mini list: place · food · thing — one Hangul word each.",
            "미니 목록: 장소·음식·물건 한글 단어 하나씩.",
            "迷你表：地点·食物·物品各一词。",
        ),
    ]

    R["hangul-13"] = [
        objective(
            "See double finals (겹받침): two letters under one vowel; usually one sound when alone.",
            "겹받침: 모음 아래 둘 — 단독일 때 소리 하나인 경우가 많음.",
            "双收音：一元音下两字母——单独时常只听一个音。",
        ),
        intro(
            "Two letters under one vowel. Before a vowel, the second may move (연음 → next lesson). Don’t memorize every cluster rule today.",
            "모음 아래 둘. 다음이 모음이면 뒤 글자가 넘어가기도(연음→다음). 오늘 전 규칙 암기 금지.",
            "一元音下两字母。后接元音可连（下一课）。今天不背全规则。",
        ),
        body(
            "Spot the cluster first (ㅄ in 없다, ㄺ in 읽다, ㄵ in 앉다). Sound shortcuts come after eyes can see two letters.",
            "먼저 묶음 찾기(없다의 ㅄ, 읽다의 ㄺ, 앉다의 ㄵ). 소리 줄임은 눈이 둘을 본 다음.",
            "先找双字（없다的ㅄ等）。音变在眼睛能看见两个之后。",
        ),
        examples(
            [
                ("앉다", "an-da feel (앉·)", "앉다", "앉다"),
                ("없다", "eop-da · cluster ㅄ", "없다 · 겹받침 ㅄ", "없다 · 双收音ㅄ"),
                ("읽다", "ik-da feel · ㄺ", "읽다 · ㄺ", "읽다 · ㄺ"),
                ("흙", "heuk", "흙", "흙"),
                ("많다", "man-ta feel", "많다", "많다"),
            ]
        ),
        check(
            T("겹받침 means…", "겹받침은?", "겹받침是？"),
            ["Two vowels", "Two finals under one vowel", "No final", "Only ㅇ"],
            1,
            T("Double final cluster.", "받침이 둘.", "双收音。"),
        ),
        check(
            T("「없다」 double final cluster?", "「없다」겹받침은?", "「없다」双收音？"),
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

    R["hangul-14"] = [
        objective(
            "Liaison (연음): when the next block starts with silent ㅇ, the final often moves over.",
            "연음: 다음이 초성 ㅇ이면 받침이 자주 넘어감.",
            "连音：下一块声母ㅇ时收音常前移。",
        ),
        intro(
            "Teach liaison before heavier sound-change rules. Spelling stays; speaking links. 한국어 ≈ han-gu-geo.",
            "무거운 음운 규칙보다 연음을 먼저. 철자 그대로, 말할 때 연결. 한국어 ≈ 한구거.",
            "先连音再学更重音变。写法不变。한국어≈한구거。",
        ),
        body(
            "Empty ㅇ seat invites the previous final. Practice slow (3 chunks) → normal. Advanced nasalization can wait.",
            "빈 ㅇ 자리가 앞 받침을 받음. 느림(세 덩어리) → 보통. 비음화 등은 후속.",
            "空ㅇ位承接收音。慢拆→常速。鼻音化等稍后。",
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

    R["hangul-15"] = [
        objective(
            "Full Hangul warm-up before survival phrases.",
            "생존 표현 전 한글 종합 워밍업.",
            "生存表达前的综合热身。",
        ),
        intro(
            "Pull vowels, consonants, finals, liaison into short real-looking words — still decode-first.",
            "모음·자음·받침·연음을 짧은 실전 느낌 단어로 — 여전히 글자 먼저.",
            "把元音辅音收音连音收进短词——仍先解码。",
        ),
        examples(
            [
                ("읽어요", "il-geo-yo (겹받침+연음 맛)", "읽어요", "읽어요"),
                ("없어요", "eop-seo-yo", "없어요", "없어요"),
                ("좋아요", "jo-a-yo (ㅎ weaken possible)", "좋아요 (ㅎ 약화 가능)", "좋아요"),
                ("학교", "hak-gyo", "학교", "학교"),
                ("안녕하세요", "preview toward 표현 1", "안녕하세요 (표현 맛보기)", "안녕하세요（预览）"),
            ]
        ),
        check(
            T("좋아요 may show liaison/weakening on which boundary?", "「좋아요」연음·약화 경계는?", "「좋아요」连音/弱化边界？"),
            ["조 / 아요 → 조아요 feel", "Only roman letters", "No vowels", "Always silent"],
            0,
            T("ㅎ can weaken; listen for smooth jo-a-yo.", "ㅎ가 약해지며 조아요처럼.", "ㅎ弱化，听成조아요。"),
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
            "60-second loop: 읽어요 · 없어요 · 학교 · 좋아요.",
            "60초 루프: 읽어요 · 없어요 · 학교 · 좋아요.",
            "60秒循环：읽어요 · 없어요 · 학교 · 좋아요。",
        ),
    ]

    R["hangul-16"] = [
        objective(
            "Read polite survival lines with Hangul you know (jabi. original — not Sejong text).",
            "아는 한글로 예의 있는 생존 문장 (jabi. 원작 — 세종 문구 아님).",
            "用已会韩文读礼貌生存句（jabi.原创，非世宗原文）。",
        ),
        intro(
            "Expression section role only: greeting · thanks · apology. Decode blocks first, then meaning.",
            "표현 편 역할만: 인사 · 감사 · 사과. 블록 먼저 → 뜻.",
            "仅对齐表达篇角色：问候·感谢·道歉。先解码再意思。",
        ),
        body(
            "Pattern pack: polite -습니다 / -요 family feel. Classroom tone — still a Hangul reading drill.",
            "패턴: 존댓말 -습니다/-요 느낌. 교실 톤 — 여전히 한글 읽기 드릴.",
            "句型：敬体 -습니다/-요。课堂语气——仍是韩文朗读。",
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

    R["hangul-17"] = [
        objective(
            "Ask for help / place / price in Hangul (jabi. original survival set 2).",
            "도움·장소·가격을 한글로 묻기 (jabi. 원작 표현 2).",
            "用韩文问帮忙、地点、价钱（原创表达2）。",
        ),
        intro(
            "Still decode first. Liaison may appear (어디예요). Question endings: -예요/-이에요 · -세요 as listening taste only.",
            "여전히 글자 먼저. 연음 가능(어디예요). 물음 어미 -예요/-이에요 · -세요는 듣기 맛보기.",
            "仍先解码。可能有连音。疑问尾仅听力预览。",
        ),
        body(
            "Meaning after sound. Basics track will deepen conversation themes — here Hangul literacy is the goal.",
            "소리 다음 뜻. 대화 주제 심화는 기초 수업 트랙 — 여기는 한글 문해.",
            "先声后义。会话深化在基础课——这里是韩文识字。",
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
            "10-second role-play: ask 어디예요? then answer with a place word you know.",
            "10초 롤플레이: 어디예요? → 아는 장소 단어로 답.",
            "10秒角色：问어디예요？再用已知地点词答。",
        ),
    ]

    return R


def main() -> None:
    rich = build_rich()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    data["version"] = 4
    data["status"] = "pilot"
    data["updated"] = "2026-07-26"
    data["format"] = "duolingo-steps-v1"
    data["lead"] = T(
        "Sejong 00–17 structure · research-backed jabi. content · stroke practice live · XP & crowns on.",
        "세종 입문 00–17 구조 · 연구 근거 jabi. 콘텐츠 · 획순 연습 · XP·크라운 동작.",
        "世宗入门00–17结构 · 研究依据原创内容 · 笔顺可用 · XP与王冠可用。",
    )
    data["sourcePolicy"] = {
        "note": "Sejong structure (unit order / grouping / practice-expression roles) only — no official wording or audio. Original jabi. research-backed fill.",
        "research": [
            "docs/research-hangul-content-fill-ko.md",
            "docs/research-hangul-track-implementation-ko.md",
            "docs/research-next-tracks-ko.md",
        ],
    }
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
        modules = rich.get(lid)
        if not modules:
            continue
        lesson["modules"] = merge_trace(old, modules)
        lesson["status"] = "pilot"
        lesson["pathLabel"] = f"{lesson['order']:02d}"

    # Path-card previews must match pedagogy (not 가나다). See research §7 errata.
    PREVIEWS: dict[str, list[str]] = {
        "hangul-00": ["아", "가", "강"],
        "hangul-01": ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅔ", "ㅐ"],
        "hangul-02": ["ㄴ", "ㅁ", "ㄹ", "ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"],
        "hangul-03": ["ㅇ", "ㅎ", "가", "오", "하"],
        "hangul-04": ["ㅋ", "ㅌ", "ㅍ", "ㅊ"],
        "hangul-05": ["ㄲ", "ㄸ", "ㅃ", "ㅆ"],
        "hangul-06": ["가", "카", "까", "다", "타", "따"],
        "hangul-07": ["ㅑ", "ㅕ", "ㅛ", "ㅠ"],
        "hangul-08": ["ㅘ", "ㅝ", "ㅟ", "ㅢ"],
        "hangul-09": ["야", "와", "위", "의"],
        "hangul-10": ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ"],
        "hangul-11": ["ㅅ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
        "hangul-12": ["산", "물", "밥", "옷"],
        "hangul-13": ["ㄵ", "ㅄ", "ㄺ"],
        "hangul-14": ["한국어", "음악", "있어요"],
        "hangul-15": ["읽어요", "없어요", "한국어"],
        "hangul-16": ["안녕하세요", "감사합니다", "죄송합니다"],
        "hangul-17": ["어디예요?", "얼마예요?", "도와 주세요"],
    }
    GROUPS_02 = [
        {"id": "cons-soft", "label": T("Soft / nasal-ish", "부드러운 소리", "柔/鼻近"), "jamo": ["ㄴ", "ㅁ", "ㄹ"]},
        {"id": "cons-stop", "label": T("Stops", "막힘 소리", "塞音"), "jamo": ["ㄱ", "ㄷ", "ㅂ"]},
        {"id": "cons-fric", "label": T("S / J", "ㅅ · ㅈ", "ㅅ · ㅈ"), "jamo": ["ㅅ", "ㅈ"]},
    ]
    for lesson in data["lessons"]:
        lid = lesson["id"]
        if lid in PREVIEWS:
            lesson["jamoPreview"] = PREVIEWS[lid]
        if lid == "hangul-02":
            lesson["groups"] = GROUPS_02
        if lid == "hangul-05":
            lesson["groups"] = [
                {
                    "id": "tense-all",
                    "label": T("Tense set (stroke-ready)", "경음 세트 (획순 가능)", "紧音组（有笔顺）"),
                    "jamo": ["ㄲ", "ㄸ", "ㅃ", "ㅆ"],
                }
            ]
        if lid == "hangul-13":
            lesson["groups"] = [
                {
                    "id": "dbl-common",
                    "label": T("Core doubles (앉·없·읽)", "핵심 겹받침 (앉·없·읽)", "核心双收音（앉·없·읽）"),
                    "jamo": ["ㄵ", "ㅄ", "ㄺ"],
                }
            ]

    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST} · lessons={len(data['lessons'])} · status={data['status']} · v{data['version']}")


if __name__ == "__main__":
    main()

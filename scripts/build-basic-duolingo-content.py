#!/usr/bin/env python3
"""Build Basics units 01–06 as Duolingo-style classroom drafts (original jabi. content).

Sejong classroom themes only — no official wording.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "hub" / "app" / "data"
MANIFEST = DATA / "basic" / "track-manifest.json"


def T(en, ko, zh):
    return {"en": en, "ko": ko, "zh": zh}


def q(qid, prompt, choices, answer, why, hint, tags, distract=None):
    item = {
        "id": qid,
        "type": "blank",
        "prompt": prompt,
        "choices": choices,
        "answer": answer,
        "answerText": choices[answer],
        "tags": tags,
        "hint": hint,
        "why": why,
    }
    if distract:
        item["distractOrder"] = [i for i in range(len(choices)) if i != answer]
        item["distractWhy"] = distract
    return item


def bank(meta, steps, dialogue, phrases, questions):
    return {
        **meta,
        "format": "duolingo-basic-v1",
        "steps": steps,
        "dialogue": dialogue,
        "phrases": phrases,
        "questions": questions,
        "verified": False,
        "verifiedAt": "2026-07-26",
        "source": "jabi-original",
    }


def write_bank(name, obj):
    path = DATA / name
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", path.name, "Q=", len(obj["questions"]))


def unit01():
    return bank(
        {
            "id": "jabi-basic-v1-01",
            "title": T(
                "jabi. Basics · Unit 1 — Greetings & Self-intro",
                "jabi. 기초 · 1과 — 인사와 자기소개",
                "jabi. 基础 · 第1课 — 打招呼和自我介绍",
            ),
            "level": "Basic (pre-TOPIK)",
            "sourceNote": "PILOT/DRAFT — jabi. 원작. 세종 입문·초급 '인사' 주제만 참고(문장 미차용).",
            "objective": T(
                "Greet, introduce yourself, say where you are from, reply to 만나서 반가워요.",
                "인사·자기소개·국적·「만나서 반가워요」답하기.",
                "打招呼、自我介绍、国籍，回应「만나서 반가워요」。",
            ),
            "explain": T(
                "Core: 안녕하세요? · 저는 [이름]이에요/예요 · [나라] 사람이에요 · 저도 반가워요.",
                "핵심: 안녕하세요? · 저는 [이름]이에요/예요 · [나라] 사람이에요 · 저도 반가워요.",
                "核心：안녕하세요？ · 저는 [名字]이에요/예요 · [国家] 사람이에요 · 저도 반가워요。",
            ),
        },
        [
            {"id": "intro", "title": T("Skill intro", "스킬 소개", "技能介绍"), "body": T(
                "Classroom goal: survive the first 30 seconds of meeting someone.",
                "교실 목표: 처음 30초 인사 생존.",
                "课堂目标：见面前30秒能打招呼。",
            )},
            {"id": "teach", "title": T("Teach · 이에요/예요", "설명 · 이에요/예요", "讲解 · 이에요/예요"), "body": T(
                "받침 → 이에요 · no 받침 → 예요. Listen for the name ending, not English spelling.",
                "받침 있으면 이에요 · 없으면 예요. 영어 철자보다 이름 끝소리.",
                "有收音→이에요，无→예요。看名字尾音。",
            )},
            {"id": "dialogue", "title": T("Dialogue", "대화", "对话"), "body": T(
                "Read the scene aloud once before drills.",
                "연습 전에 장면을 한 번 소리 내어 읽기.",
                "做题前先朗读场景。",
            )},
            {"id": "practice", "title": T("Practice", "연습", "练习"), "body": T(
                "Complete dialogues — tips don’t reveal the answer word first.",
                "대화 완성 — 힌트는 정답 단어를 바로 주지 않음.",
                "完成对话——提示不先泄露答案词。",
            )},
            {"id": "checkpoint", "title": T("Checkpoint", "체크포인트", "关卡"), "body": T(
                "Say your name + country in one polite turn.",
                "이름+국적을 존댓말로 한 턴.",
                "用敬体说名字+国籍一轮。",
            )},
        ],
        {
            "title": T("First meeting", "첫 만남", "初次见面"),
            "lines": [
                {"who": "민수", "ko": "안녕하세요? 저는 민수예요."},
                {"who": "민준", "ko": "안녕하세요? 저는 민준이에요. 중국 사람이에요."},
                {"who": "민수", "ko": "만나서 반가워요."},
                {"who": "민준", "ko": "저도 반가워요."},
            ],
        },
        [
            {"ko": "안녕하세요?", "gloss": T("Hello (polite)", "인사", "你好（敬体）")},
            {"ko": "저는 민준이에요.", "gloss": T("I'm Minjun (받침 → 이에요)", "받침 → 이에요", "有收音 → 이에요")},
            {"ko": "저는 유키예요.", "gloss": T("I'm Yuki (no 받침 → 예요)", "받침 없음 → 예요", "无收音 → 예요")},
            {"ko": "중국 사람이에요.", "gloss": T("I'm Chinese.", "국적", "国籍")},
            {"ko": "베트남 사람이에요.", "gloss": T("I'm Vietnamese.", "국적", "国籍")},
            {"ko": "저도 반가워요.", "gloss": T("Nice to meet you too.", "답인사", "回礼问候")},
            {"ko": "이름이 뭐예요?", "gloss": T("What's your name?", "이름 묻기", "问名字")},
            {"ko": "어디에서 왔어요?", "gloss": T("Where are you from?", "출신", "从哪里来")},
        ],
        [
            q(
                "basic-01-01",
                T(
                    "※ Complete.\n\n민수: 안녕하세요? 저는 민수예요.\n민준: 안녕하세요? 저는 민준(    ).",
                    "※ 다음 대화를 완성하십시오.\n\n민수: 안녕하세요? 저는 민수예요.\n민준: 안녕하세요? 저는 민준(    ).",
                    "※ 完成对话。\n\n民秀：안녕하세요? 저는 민수예요.\n民俊：안녕하세요? 저는 민준(    )。",
                ),
                ["이에요", "예요", "해요", "있어요"],
                0,
                T("민준 has 받침 ㄴ → 이에요.", "민준은 받침 ㄴ → 이에요.", "민준有收音ㄴ→이에요。"),
                {
                    "ko": "저는 OO이에요/예요. 받침 있으면 이에요.",
                    "en": "Pattern 저는 OO이에요/예요. 받침 → 이에요.",
                    "zh": "句型 저는 OO이에요/예요。有收音→이에요。",
                    "steps": {
                        "en": ["Look at the name ending.", "받침? → 이에요.", "민준 ends with ㄴ."],
                        "ko": ["이름 끝 보기", "받침? → 이에요", "민준은 ㄴ"],
                        "zh": ["看名字尾", "有收音→이에요", "민준以ㄴ收"],
                    },
                },
                ["topic:인사", "grammar:이에요/예요"],
                {
                    "1": T("예요 is for no 받침 (민수예요).", "예요는 받침 없을 때.", "예요用于无收音。"),
                    "2": T("해요 is a general verb ending.", "해요는 일반 동사 어미.", "해요是通用动词尾。"),
                    "3": T("있어요 means exist/have.", "있어요는 있다.", "있어요表示有。"),
                },
            ),
            q(
                "basic-01-02",
                T(
                    "※ Complete.\n\nA: 저는 유키(    ).\nB: 아, 유키 씨!",
                    "※ 대화 완성.\n\nA: 저는 유키(    ).\nB: 아, 유키 씨!",
                    "※ 完成。\n\nA: 저는 유키(    ).\nB: 아, 유키 씨!",
                ),
                ["이에요", "예요", "입니다만", "합니까"],
                1,
                T("유키 has no 받침 → 예요.", "유키는 받침 없음 → 예요.", "유키无收音→예요。"),
                {
                    "ko": "받침이 없으면 예요.",
                    "en": "No 받침 → 예요.",
                    "zh": "无收音→예요。",
                    "steps": {
                        "en": ["Check 키 ending.", "No final consonant letter.", "Use 예요."],
                        "ko": ["「키」끝 확인", "받침 없음", "예요"],
                        "zh": ["看「키」", "无收音", "用예요"],
                    },
                },
                ["topic:인사", "grammar:이에요/예요"],
            ),
            q(
                "basic-01-03",
                T(
                    "※ Complete.\n\nA: 어디에서 왔어요?\nB: 저는 중국(    ).",
                    "※ 대화 완성.\n\nA: 어디에서 왔어요?\nB: 저는 중국(    ).",
                    "※ 完成。\n\nA: 어디에서 왔어요?\nB: 저는 중국(    )。",
                ),
                ["사람이에요", "먹어요", "가요", "읽어요"],
                0,
                T("국적: [나라] 사람이에요.", "국적은 [나라] 사람이에요.", "国籍：[国家] 사람이에요。"),
                {
                    "ko": "나라 이름 + 사람이에요.",
                    "en": "Country + 사람이에요.",
                    "zh": "国名 + 사람이에요。",
                    "steps": {
                        "en": ["Question asks origin.", "Pattern: country + 사람이에요."],
                        "ko": ["출신을 물음", "나라+사람이에요"],
                        "zh": ["问出身", "国名+사람이에요"],
                    },
                },
                ["topic:인사", "vocab:국적"],
            ),
            q(
                "basic-01-04",
                T(
                    "※ Reply.\n\nA: 만나서 반가워요.\nB: (    ).",
                    "※ 대답.\n\nA: 만나서 반가워요.\nB: (    ).",
                    "※ 回答。\n\nA: 만나서 반가워요.\nB: (    )。",
                ),
                ["저도 반가워요", "저는 학생이에요", "얼마예요", "도와 주세요"],
                0,
                T("Mirror the nicety: 저도 반가워요.", "맞장구: 저도 반가워요.", "回礼：저도 반가워요。"),
                {
                    "ko": "반가워요에 대한 자연스러운 답.",
                    "en": "Natural reply to nice-to-meet-you.",
                    "zh": "对「很高兴认识你」的自然回应。",
                    "steps": {
                        "en": ["A said nice to meet you.", "Reply with 저도…"],
                        "ko": ["A가 반가워요", "저도…로 답"],
                        "zh": ["A说반가워요", "用저도…答"],
                    },
                },
                ["topic:인사"],
            ),
            q(
                "basic-01-05",
                T(
                    "※ Ask the name.\n\nA: (    )?\nB: 저는 하나예요.",
                    "※ 이름 묻기.\n\nA: (    )?\nB: 저는 하나예요.",
                    "※ 问名字。\n\nA: (    )?\nB: 저는 하나예요。",
                ),
                ["이름이 뭐예요", "몇 시예요", "어디예요", "뭐 먹어요"],
                0,
                T("이름이 뭐예요?", "이름이 뭐예요?", "이름이 뭐예요？"),
                {
                    "ko": "이름을 묻는 표현.",
                    "en": "Asking for a name.",
                    "zh": "询问名字。",
                    "steps": {
                        "en": ["B answers with a name.", "A must ask for the name."],
                        "ko": ["B가 이름으로 답", "A는 이름 질문"],
                        "zh": ["B用名字回答", "A应问名字"],
                    },
                },
                ["topic:인사", "vocab:이름"],
            ),
            q(
                "basic-01-06",
                T(
                    "※ Choose the greeting.\n\n(First class morning)\n선생님: (    )?\n학생들: 안녕하세요?",
                    "※ 인사 고르기.\n\n(수업 아침)\n선생님: (    )?\n학생들: 안녕하세요?",
                    "※ 选问候。\n\n（早上上课）\n老师：(    )?\n学生：안녕하세요?",
                ),
                ["안녕하세요", "안녕히 주무세요", "축하합니다", "맛있어요"],
                0,
                T("Class greeting: 안녕하세요?", "교실 인사: 안녕하세요?", "课堂问候：안녕하세요？"),
                {
                    "ko": "낮/수업에서 쓰는 기본 인사.",
                    "en": "Default daytime/class hello.",
                    "zh": "白天/课堂基本问候。",
                    "steps": {
                        "en": ["Morning class context.", "Students reply 안녕하세요."],
                        "ko": ["아침 수업", "학생도 안녕하세요"],
                        "zh": ["早上课", "学生也说안녕하세요"],
                    },
                },
                ["topic:인사"],
            ),
            q(
                "basic-01-07",
                T(
                    "※ Complete.\n\nA: 저는 베트남 사람이에요. 마이예요.\nB: 저는 한국 사람이에요. 저는 도윤(    ).",
                    "※ 완성.\n\nA: 저는 베트남 사람이에요. 마이예요.\nB: 저는 한국 사람이에요. 저는 도윤(    ).",
                    "※ 完成。\n\nA: 저는 베트남 사람이에요. 마이예요.\nB: 저는 한국 사람이에요. 저는 도윤(    )。",
                ),
                ["이에요", "예요", "해요", "와요"],
                0,
                T("도윤 has 받침 ㄴ → 이에요.", "도윤 받침 ㄴ → 이에요.", "도윤有ㄴ→이에요。"),
                {
                    "ko": "이름 받침 확인.",
                    "en": "Check name 받침.",
                    "zh": "检查名字收音。",
                    "steps": {
                        "en": ["윤 ends with ㄴ.", "Use 이에요."],
                        "ko": ["윤=ㄴ", "이에요"],
                        "zh": ["윤有ㄴ", "用이에요"],
                    },
                },
                ["topic:인사", "grammar:이에요/예요"],
            ),
            q(
                "basic-01-08",
                T(
                    "※ Best next line after self-intro?\n\nA: 저는 수진이에요. 한국 사람이에요.\nB: (    )",
                    "※ 자기소개 다음으로 자연스러운 말?\n\nA: 저는 수진이에요. 한국 사람이에요.\nB: (    )",
                    "※ 自我介绍后最自然？\n\nA: 저는 수진이에요. 한국 사람이에요.\nB: (    )",
                ),
                ["만나서 반가워요", "밥 먹었어요", "시험을 봐요", "받침이 뭐예요"],
                0,
                T("Nice-to-meet-you fits first meeting.", "첫 만남엔 반가워요.", "初见用반가워요。"),
                {
                    "ko": "첫 만남 맥락.",
                    "en": "First-meeting context.",
                    "zh": "初次见面语境。",
                    "steps": {
                        "en": ["A introduced name/country.", "B responds politely."],
                        "ko": ["A가 소개함", "B 예의 답"],
                        "zh": ["A已介绍", "B礼貌回应"],
                    },
                },
                ["topic:인사"],
            ),
        ],
    )


def unit02():
    return bank(
        {
            "id": "jabi-basic-v1-02",
            "title": T(
                "jabi. Basics · Unit 2 — Daily life",
                "jabi. 기초 · 2과 — 일상생활",
                "jabi. 基础 · 第2课 — 日常生活",
            ),
            "level": "Basic (pre-TOPIK)",
            "sourceNote": "DRAFT — jabi. 원작. 세종 '일상 행동' 주제만 참고.",
            "objective": T(
                "Talk about what you do now, evening routines, wake-up time.",
                "지금 하는 일, 저녁 습관, 기상 시간.",
                "说现在在做的事、晚上习惯、起床时间。",
            ),
            "explain": T(
                "Core: 지금 뭐 해요? · [시간]에 [동사] · 보통 [장소]에서 [동사].",
                "핵심: 지금 뭐 해요? · [시간]에 [동사] · 보통 [장소]에서 [동사].",
                "核心：지금 뭐 해요？ · [时间]에 [动词] · 보통 [场所]에서 [动词]。",
            ),
        },
        [
            {"id": "intro", "title": T("Skill intro", "스킬 소개", "技能介绍"), "body": T(
                "Describe a simple day without fancy grammar.",
                "화려한 문법 없이 하루를 말하기.",
                "不用复杂语法说一天。",
            )},
            {"id": "teach", "title": T("Teach · 에 / 에서", "설명 · 에 / 에서", "讲解 · 에 / 에서"), "body": T(
                "Time often takes 에 (일곱 시에). Place of action often 에서 (집에서 쉬어요).",
                "시간은 자주 에 · 동작 장소는 에서.",
                "时间常用에，动作场所常用에서。",
            )},
            {"id": "dialogue", "title": T("Dialogue", "대화", "对话"), "body": T(
                "Campus afternoon chat.",
                "캠퍼스 오후 수다.",
                "校园下午闲聊。",
            )},
            {"id": "practice", "title": T("Practice", "연습", "练习"), "body": T("Dialogue drills.", "대화 드릴.", "对话练习。")},
            {"id": "checkpoint", "title": T("Checkpoint", "체크포인트", "关卡"), "body": T(
                "Say: wake time + one evening activity.",
                "기상 시간 + 저녁 활동 하나.",
                "起床时间+晚上活动一句。",
            )},
        ],
        {
            "title": T("After class", "수업 후", "课后"),
            "lines": [
                {"who": "타완", "ko": "지금 뭐 해요?"},
                {"who": "투이", "ko": "저는 지금 한국어를 공부해요."},
                {"who": "타완", "ko": "저녁에 보통 뭐 해요?"},
                {"who": "투이", "ko": "일곱 시에 운동해요. 그리고 집에서 쉬어요."},
            ],
        },
        [
            {"ko": "지금 뭐 해요?", "gloss": T("What are you doing now?", "현재 행동", "现在做什么")},
            {"ko": "한국어를 공부해요.", "gloss": T("I'm studying Korean.", "공부", "学习韩语")},
            {"ko": "집에서 쉬어요.", "gloss": T("I rest at home.", "휴식", "在家休息")},
            {"ko": "일곱 시에 일어나요.", "gloss": T("I get up at 7.", "기상", "七点起床")},
            {"ko": "저녁에 운동해요.", "gloss": T("I exercise in the evening.", "운동", "晚上运动")},
            {"ko": "보통 카페에서 만나요.", "gloss": T("We usually meet at a café.", "장소+에서", "通常在咖啡馆见")},
            {"ko": "주에 세 번 가요.", "gloss": T("I go three times a week.", "빈도", "一周去三次")},
            {"ko": "오늘 바빠요.", "gloss": T("I'm busy today.", "상태", "今天忙")},
        ],
        [
            q(
                "basic-02-01",
                T(
                    "※ Complete.\n\n타완: 지금 뭐 해요?\n투이: 저는 지금 한국어를 (    ).",
                    "※ 완성.\n\n타완: 지금 뭐 해요?\n투이: 저는 지금 한국어를 (    ).",
                    "※ 完成。\n\n他万：지금 뭐 해요?\n翠：저는 지금 한국어를 (    )。",
                ),
                ["공부해요", "운동해요", "요리해요", "청소해요"],
                0,
                T("Study Korean → 공부해요.", "한국어 → 공부해요.", "学韩语→공부해요。"),
                {"ko": "공부하다.", "en": "Study.", "zh": "学习。", "steps": {"en": ["Object is Korean.", "Verb: study."], "ko": ["목적어=한국어", "동사=공부"], "zh": ["宾语是韩语", "动词=学习"]}},
                ["topic:일상", "vocab:공부"],
            ),
            q(
                "basic-02-02",
                T(
                    "※ Complete.\n\nA: 어디에서 쉬어요?\nB: (    ) 쉬어요.",
                    "※ 완성.\n\nA: 어디에서 쉬어요?\nB: (    ) 쉬어요.",
                    "※ 完成。\n\nA: 어디에서 쉬어요?\nB: (    ) 쉬어요。",
                ),
                ["집에서", "집에", "집으로만", "집까지요만"],
                0,
                T("Action place → 에서.", "동작 장소는 에서.", "动作场所用에서。"),
                {"ko": "장소+에서+동작.", "en": "Place+에서+action.", "zh": "场所+에서+动作。", "steps": {"en": ["쉬는 장소", "에서"], "ko": ["쉬는 장소", "에서"], "zh": ["休息地点", "에서"]}},
                ["topic:일상", "grammar:에서"],
            ),
            q(
                "basic-02-03",
                T(
                    "※ Complete.\n\nA: 몇 시에 일어나요?\nB: (    ) 일어나요.",
                    "※ 완성.\n\nA: 몇 시에 일어나요?\nB: (    ) 일어나요.",
                    "※ 完成。\n\nA: 몇 시에 일어나요?\nB: (    ) 일어나요。",
                ),
                ["일곱 시에", "일곱 시에서", "일곱 시만", "일곱"],
                0,
                T("Time marker 에.", "시간 조사 에.", "时间助词에。"),
                {"ko": "시간에 에.", "en": "Time takes 에.", "zh": "时间加에。", "steps": {"en": ["Clock time", "Attach 에"], "ko": ["시계 시간", "에 붙임"], "zh": ["钟点", "加에"]}},
                ["topic:일상", "grammar:에"],
            ),
            q(
                "basic-02-04",
                T(
                    "※ Evening activity.\n\nA: 저녁에 보통 뭐 해요?\nB: 저녁에 (    ).",
                    "※ 저녁.\n\nA: 저녁에 보통 뭐 해요?\nB: 저녁에 (    ).",
                    "※ 晚上。\n\nA: 저녁에 보통 뭐 해요?\nB: 저녁에 (    )。",
                ),
                ["운동해요", "아침이에요", "사람이에요", "받침이에요"],
                0,
                T("운동해요 fits evening activity.", "저녁 활동으로 운동해요.", "晚上活动用운동해요。"),
                {"ko": "활동 동사.", "en": "Activity verb.", "zh": "活动动词。", "steps": {"en": ["Ask what you do", "Pick an activity"], "ko": ["뭐 해요 질문", "활동 선택"], "zh": ["问做什么", "选活动"]}},
                ["topic:일상"],
            ),
            q(
                "basic-02-05",
                T(
                    "※ Complete.\n\nA: 오늘 어때요?\nB: 오늘 (    ). 숙제가 많아요.",
                    "※ 완성.\n\nA: 오늘 어때요?\nB: 오늘 (    ). 숙제가 많아요.",
                    "※ 完成。\n\nA: 오늘 어때요?\nB: 오늘 (    ). 숙제가 많아요。",
                ),
                ["바빠요", "과일이요", "화장실이요", "받침이요"],
                0,
                T("Busy → 바빠요.", "바쁘다 → 바빠요.", "忙→바빠요。"),
                {"ko": "상태 형용사.", "en": "State adjective.", "zh": "状态形容词。", "steps": {"en": ["Lots of homework cue", "Busy"], "ko": ["숙제 많음", "바쁘다"], "zh": ["作业多", "忙"]}},
                ["topic:일상"],
            ),
            q(
                "basic-02-06",
                T(
                    "※ Complete.\n\nA: 친구를 어디에서 만나요?\nB: 보통 카페(    ) 만나요.",
                    "※ 완성.\n\nA: 친구를 어디에서 만나요?\nB: 보통 카페(    ) 만나요.",
                    "※ 完成。\n\nA: 친구를 어디에서 만나요?\nB: 보통 카페(    ) 만나요。",
                ),
                ["에서", "에만", "으로요", "와"],
                0,
                T("Meet at place → 에서.", "만나는 장소 에서.", "见面场所用에서。"),
                {"ko": "동작 장소.", "en": "Action location.", "zh": "动作地点。", "steps": {"en": ["Meeting is an action", "에서"], "ko": ["만남은 동작", "에서"], "zh": ["见面是动作", "에서"]}},
                ["topic:일상", "grammar:에서"],
            ),
            q(
                "basic-02-07",
                T(
                    "※ Frequency.\n\nA: 운동을 얼마나 자주 해요?\nB: 주에 (    ) 가요.",
                    "※ 빈도.\n\nA: 운동을 얼마나 자주 해요?\nB: 주에 (    ) 가요.",
                    "※ 频率。\n\nA: 운동을 얼마나 자주 해요?\nB: 주에 (    ) 가요。",
                ),
                ["세 번", "세 시", "세 사람", "세 받침"],
                0,
                T("세 번 = three times.", "세 번=세 차례.", "세 번＝三次。"),
                {"ko": "횟수 번.", "en": "Count with 번.", "zh": "次数用번。", "steps": {"en": ["How often", "N번"], "ko": ["빈도", "N번"], "zh": ["频率", "N번"]}},
                ["topic:일상", "vocab:빈도"],
            ),
            q(
                "basic-02-08",
                T(
                    "※ Choose.\n\nA: 지금 뭐 해요?\nB: (    ) — I'm resting at home.",
                    "※ 고르기.\n\nA: 지금 뭐 해요?\nB: (    ) — 집에서 쉬는 중.",
                    "※ 选择。\n\nA: 지금 뭐 해요?\nB: (    ) — 在家休息。",
                ),
                ["집에서 쉬어요", "집 사람이에요", "일곱 시예요", "만나서 반가워요"],
                0,
                T("집에서 쉬어요.", "집에서 쉬어요.", "집에서 쉬어요。"),
                {"ko": "장소+동작.", "en": "Place+action.", "zh": "场所+动作。", "steps": {"en": ["Rest + home", "에서"], "ko": ["쉬다+집", "에서"], "zh": ["休息+家", "에서"]}},
                ["topic:일상"],
            ),
        ],
    )


def _simple_unit(num, uid, title, theme, objective, explain, source_note, dialogue, phrases, questions):
    steps = [
        {"id": "intro", "title": T("Skill intro", "스킬 소개", "技能介绍"), "body": objective},
        {"id": "teach", "title": T("Teach", "설명", "讲解"), "body": explain},
        {"id": "dialogue", "title": T("Dialogue", "대화", "对话"), "body": T("Read the scene, then drill.", "장면 읽고 드릴.", "读场景再练习。")},
        {"id": "practice", "title": T("Practice", "연습", "练习"), "body": T("Complete dialogues.", "대화 완성.", "完成对话。")},
        {"id": "checkpoint", "title": T("Checkpoint", "체크포인트", "关卡"), "body": T("Use 2 phrases from the unit aloud.", "핵심 표현 2개를 소리 내어.", "大声说本课2个表达。")},
    ]
    return bank(
        {
            "id": uid,
            "title": title,
            "level": "Basic (pre-TOPIK)",
            "sourceNote": source_note,
            "objective": objective,
            "explain": explain,
            "theme": theme,
        },
        steps,
        dialogue,
        phrases,
        questions,
    )


def unit03():
    return _simple_unit(
        3,
        "jabi-basic-v1-03",
        T("jabi. Basics · Unit 3 — At a café", "jabi. 기초 · 3과 — 카페에서", "jabi. 基础 · 第3课 — 在咖啡馆"),
        "카페",
        T("Order a drink, ask price, say take-out vs for-here.", "음료 주문·가격·포장/매장.", "点饮料、问价、外带/堂食。"),
        T("Patterns: [음료] 주세요 · 얼마예요? · 포장이요 / 여기서 마실게요.", "패턴: [음료] 주세요 · 얼마예요? · 포장이요 / 여기서 마실게요.", "句型：[饮料] 주세요 · 얼마예요？ · 포장이요 / 여기서 마실게요。"),
        "DRAFT — jabi. 원작. 세종 초급 '음식점/카페' 주제만 참고.",
        {
            "title": T("Ordering", "주문", "点单"),
            "lines": [
                {"who": "직원", "ko": "안녕하세요. 뭐 드릴까요?"},
                {"who": "손님", "ko": "아메리카노 한 잔 주세요."},
                {"who": "직원", "ko": "여기서 드실래요, 포장드릴까요?"},
                {"who": "손님", "ko": "포장이요. 얼마예요?"},
                {"who": "직원", "ko": "사천 원이에요."},
            ],
        },
        [
            {"ko": "뭐 드릴까요?", "gloss": T("What can I get you?", "주문 받기", "您需要什么")},
            {"ko": "아메리카노 한 잔 주세요.", "gloss": T("One americano, please.", "주문", "美式一杯")},
            {"ko": "아이스 / 핫으로요.", "gloss": T("Iced / hot.", "온도", "冰/热")},
            {"ko": "포장이요.", "gloss": T("To go.", "포장", "外带")},
            {"ko": "여기서 마실게요.", "gloss": T("For here.", "매장", "堂食")},
            {"ko": "얼마예요?", "gloss": T("How much?", "가격", "多少钱")},
            {"ko": "카드로 결제할게요.", "gloss": T("I'll pay by card.", "결제", "刷卡")},
            {"ko": "샷 추가해 주세요.", "gloss": T("Add a shot, please.", "옵션", "加一份浓缩")},
        ],
        [
            q("basic-03-01", T("※ Order.\n\n손님: 아메리카노 한 잔 (    ).", "※ 주문.\n\n손님: 아메리카노 한 잔 (    ).", "※ 点单。\n\n客人：아메리카노 한 잔 (    )。"), ["주세요", "이에요", "가요", "읽어요"], 0, T("주세요 = please give.", "주세요=주세요.", "주세요＝请给。"), {"ko": "부탁 주문.", "en": "Polite order.", "zh": "礼貌点单。", "steps": {"en": ["Ordering drink", "주세요"], "ko": ["음료 주문", "주세요"], "zh": ["点饮料", "주세요"]}}, ["topic:카페"]),
            q("basic-03-02", T("※ Price.\n\n손님: (    )?\n직원: 사천 원이에요.", "※ 가격.\n\n손님: (    )?\n직원: 사천 원이에요.", "※ 价钱。\n\n客人：(    )?\n店员：사천 원이에요。"), ["얼마예요", "어디예요", "누구예요", "뭐예요 이름"], 0, T("얼마예요?", "얼마예요?", "얼마예요？"), {"ko": "가격 질문.", "en": "Ask price.", "zh": "问价格。", "steps": {"en": ["Staff gives money amount", "Ask how much"], "ko": ["직원이 금액", "얼마"], "zh": ["店员报金额", "问多少"]}}, ["topic:카페"]),
            q("basic-03-03", T("※ To go.\n\n직원: 여기서 드실래요, 포장드릴까요?\n손님: (    ).", "※ 포장.\n\n직원: 여기서 드실래요, 포장드릴까요?\n손님: (    ).", "※ 外带。\n\n店员：堂食还是外带？\n客人：(    )。"), ["포장이요", "안녕하세요", "공부해요", "받침이요"], 0, T("포장이요.", "포장이요.", "포장이요。"), {"ko": "가져가기.", "en": "Take-out.", "zh": "外带。", "steps": {"en": ["Choose take-out", "포장"], "ko": ["포장 선택", "포장이요"], "zh": ["选外带", "포장이요"]}}, ["topic:카페"]),
            q("basic-03-04", T("※ For here.\n\n손님: (    ). 천천히 마실게요.", "※ 매장.\n\n손님: (    ). 천천히 마실게요.", "※ 堂食。\n\n客人：(    ). 我会慢慢喝。"), ["여기서 마실게요", "포장이요", "도와 주세요", "일곱 시예요"], 0, T("여기서 마실게요.", "여기서 마실게요.", "여기서 마실게요。"), {"ko": "매장 이용.", "en": "Drink here.", "zh": "在店里喝。", "steps": {"en": ["Not take-out", "여기서"], "ko": ["포장 아님", "여기서"], "zh": ["非外带", "여기서"]}}, ["topic:카페"]),
            q("basic-03-05", T("※ Option.\n\n손님: 아이스로 (    ).", "※ 옵션.\n\n손님: 아이스로 (    ).", "※ 选项。\n\n客人：请做成冰的 (    )。"), ["해 주세요", "사람이에요", "읽어요", "앉아요"], 0, T("해 주세요 softens a request.", "해 주세요=부탁.", "해 주세요＝请做成。"), {"ko": "해 주세요 부탁.", "en": "Please do ~.", "zh": "请做成～。", "steps": {"en": ["Want iced", "해 주세요"], "ko": ["아이스", "해 주세요"], "zh": ["要冰", "해 주세요"]}}, ["topic:카페"]),
            q("basic-03-06", T("※ Payment.\n\n직원: 현금이세요, 카드세요?\n손님: (    ).", "※ 결제.\n\n직원: 현금이세요, 카드세요?\n손님: (    ).", "※ 付款。\n\n店员：现金还是卡？\n客人：(    )。"), ["카드로 결제할게요", "산이에요", "받침이에요", "운동해요"], 0, T("Pay by card.", "카드 결제.", "刷卡。"), {"ko": "카드 결제.", "en": "Card payment.", "zh": "刷卡。", "steps": {"en": ["Payment choice", "카드"], "ko": ["결제 선택", "카드"], "zh": ["选支付", "卡"]}}, ["topic:카페"]),
            q("basic-03-07", T("※ Staff line.\n\n직원: (    )?\n손님: 라떼 주세요.", "※ 직원.\n\n직원: (    )?\n손님: 라떼 주세요.", "※ 店员。\n\n店员：(    )?\n客人：라떼 주세요。"), ["뭐 드릴까요", "이름이 뭐예요", "몇 시예요", "도와 주세요"], 0, T("뭐 드릴까요?", "뭐 드릴까요?", "뭐 드릴까요？"), {"ko": "주문 유도.", "en": "Taking order.", "zh": "询问点单。", "steps": {"en": ["Cafe staff", "Offer to take order"], "ko": ["카페 직원", "주문 받기"], "zh": ["咖啡馆店员", "接单"]}}, ["topic:카페"]),
            q("basic-03-08", T("※ Size.\n\n손님: 큰 거로 (    ).", "※ 사이즈.\n\n손님: 큰 거로 (    ).", "※ 杯型。\n\n客人：大杯 (    )。"), ["주세요", "이에요요", "산요", "받침요"], 0, T("주세요 after option.", "옵션 뒤 주세요.", "选项后加주세요。"), {"ko": "주문 종결.", "en": "Close the order.", "zh": "结束点单。", "steps": {"en": ["Size chosen", "주세요"], "ko": ["사이즈 정함", "주세요"], "zh": ["已选杯型", "주세요"]}}, ["topic:카페"]),
        ],
    )


def unit04():
    return _simple_unit(
        4,
        "jabi-basic-v1-04",
        T("jabi. Basics · Unit 4 — Shopping", "jabi. 기초 · 4과 — 물건 사기", "jabi. 基础 · 第4课 — 购物"),
        "쇼핑",
        T("Ask for items, sizes/colors, and price.", "물건·사이즈·색깔·가격.", "问商品、尺码/颜色、价格。"),
        T("Patterns: 이거는 얼마예요? · 다른 색깔 있어요? · 한번 입어 봐도 돼요?", "패턴: 이거는 얼마예요? · 다른 색깔 있어요? · 한번 입어 봐도 돼요?", "句型：这个多少钱？·有其他颜色吗？·可以试穿吗？"),
        "DRAFT — jabi. 원작. 세종 초급 '쇼핑' 주제만 참고.",
        {
            "title": T("At the store", "가게에서", "在店里"),
            "lines": [
                {"who": "손님", "ko": "이 티셔츠 있어요?"},
                {"who": "직원", "ko": "네, 있어요. 사이즈가 어떻게 되세요?"},
                {"who": "손님", "ko": "엠 사이즈요. 다른 색깔 있어요?"},
                {"who": "직원", "ko": "검정하고 흰색 있어요."},
                {"who": "손님", "ko": "이거 얼마예요?"},
            ],
        },
        [
            {"ko": "이 티셔츠 있어요?", "gloss": T("Do you have this T-shirt?", "재고", "有这件T恤吗")},
            {"ko": "사이즈가 어떻게 되세요?", "gloss": T("What size?", "사이즈", "要什么尺码")},
            {"ko": "다른 색깔 있어요?", "gloss": T("Other colors?", "색깔", "有其他颜色吗")},
            {"ko": "한번 입어 봐도 돼요?", "gloss": T("May I try it on?", "피팅", "可以试穿吗")},
            {"ko": "이거 얼마예요?", "gloss": T("How much is this?", "가격", "这个多少钱")},
            {"ko": "너무 작아요 / 커요.", "gloss": T("Too small / big.", "핏", "太小/太大")},
            {"ko": "이거로 할게요.", "gloss": T("I'll take this.", "구매", "就要这个")},
            {"ko": "영수증 주세요.", "gloss": T("Receipt, please.", "영수증", "请给收据")},
        ],
        [
            q("basic-04-01", T("※ Ask stock.\n\n손님: 이 모자 (    )?", "※ 재고.\n\n손님: 이 모자 (    )?", "※ 库存。\n\n客人：이 모자 (    )？"), ["있어요", "공부해요", "일어나요", "포장이요"], 0, T("있어요 asks availability.", "있어요=있는지.", "있어요问有没有。"), {"ko": "있는지 묻기.", "en": "Ask if available.", "zh": "问是否有。", "steps": {"en": ["Want item", "있어요?"], "ko": ["물건", "있어요?"], "zh": ["要商品", "있어요?"]}}, ["topic:쇼핑"]),
            q("basic-04-02", T("※ Size.\n\n직원: 사이즈가 어떻게 되세요?\n손님: (    ).", "※ 사이즈.\n\n직원: 사이즈가 어떻게 되세요?\n손님: (    ).", "※ 尺码。\n\n店员：要什么尺码？\n客人：(    )。"), ["엠 사이즈요", "아메리카노요", "일곱 시요", "안녕하세요"], 0, T("State a size.", "사이즈 말하기.", "说出尺码。"), {"ko": "사이즈 답.", "en": "Give size.", "zh": "回答尺码。", "steps": {"en": ["Asked size", "Answer M"], "ko": ["사이즈 질문", "M 답"], "zh": ["问尺码", "答M"]}}, ["topic:쇼핑"]),
            q("basic-04-03", T("※ Color.\n\n손님: (    )?\n직원: 파랑하고 빨강 있어요.", "※ 색깔.\n\n손님: (    )?\n직원: 파랑하고 빨강 있어요.", "※ 颜色。\n\n客人：(    )?\n店员：有蓝和红。"), ["다른 색깔 있어요", "지금 뭐 해요", "화장실 어디예요", "샷 추가해 주세요"], 0, T("Ask other colors.", "다른 색깔.", "问其他颜色。"), {"ko": "색 옵션.", "en": "Color options.", "zh": "颜色选项。", "steps": {"en": ["Want another color", "다른 색깔"], "ko": ["다른 색", "있어요?"], "zh": ["要其他色", "있어요?"]}}, ["topic:쇼핑"]),
            q("basic-04-04", T("※ Price.\n\n손님: 이거 (    )?\n직원: 이만 원이에요.", "※ 가격.\n\n손님: 이거 (    )?\n직원: 이만 원이에요.", "※ 价钱。\n\n客人：이거 (    )?\n店员：이만 원이에요。"), ["얼마예요", "누구예요", "어디예요", "언제예요"], 0, T("얼마예요?", "얼마예요?", "얼마예요？"), {"ko": "가격.", "en": "Price.", "zh": "价格。", "steps": {"en": ["Point at item", "Ask price"], "ko": ["물건 가리킴", "가격"], "zh": ["指商品", "问价"]}}, ["topic:쇼핑"]),
            q("basic-04-05", T("※ Try on.\n\n손님: 한번 입어 봐도 (    )?", "※ 피팅.\n\n손님: 한번 입어 봐도 (    )?", "※ 试穿。\n\n客人：한번 입어 봐도 (    )？"), ["돼요", "사람이에요", "포장이요", "운동해요"], 0, T("~아/어 봐도 돼요? permission.", "해도 되나요 뉘앙스.", "可以…吗许可。"), {"ko": "허락 구하기.", "en": "Ask permission.", "zh": "请求许可。", "steps": {"en": ["Want to try", "돼요?"], "ko": ["입어 보기", "돼요?"], "zh": ["想试穿", "돼요?"]}}, ["topic:쇼핑"]),
            q("basic-04-06", T("※ Fit.\n\n손님: 조금 (    ). 더 큰 거 있어요?", "※ 핏.\n\n손님: 조금 (    ). 더 큰 거 있어요?", "※ 合身。\n\n客人：有点 (    ). 有更大的吗？"), ["작아요", "감사해요만", "일어나요", "공부해요"], 0, T("Too small → 작아요.", "작다 → 작아요.", "太小→작아요。"), {"ko": "작다.", "en": "Small.", "zh": "小。", "steps": {"en": ["Needs bigger", "작아요"], "ko": ["더 큰 거", "작아요"], "zh": ["要更大", "작아요"]}}, ["topic:쇼핑"]),
            q("basic-04-07", T("※ Decide.\n\n손님: (    ).\n직원: 계산대로 오세요.", "※ 결정.\n\n손님: (    ).\n직원: 계산대로 오세요.", "※ 决定。\n\n客人：(    ).\n店员：请到收银台。"), ["이거로 할게요", "집이요", "받침이요", "운동이요"], 0, T("I'll take this.", "이걸로 살게요.", "就要这个。"), {"ko": "구매 결정.", "en": "Purchase decision.", "zh": "决定购买。", "steps": {"en": ["Chosen item", "이거로"], "ko": ["선택함", "이거로"], "zh": ["已选", "이거로"]}}, ["topic:쇼핑"]),
            q("basic-04-08", T("※ Receipt.\n\n손님: (    ).\n직원: 네, 여기요.", "※ 영수증.\n\n손님: (    ).\n직원: 네, 여기요.", "※ 收据。\n\n客人：(    ).\n店员：네, 여기요。"), ["영수증 주세요", "아메리카노 주세요만", "일곱 시에 주세요", "만나서 주세요"], 0, T("영수증 주세요.", "영수증 주세요.", "영수증 주세요。"), {"ko": "영수증 요청.", "en": "Ask for receipt.", "zh": "要收据。", "steps": {"en": ["After pay", "영수증"], "ko": ["결제 후", "영수증"], "zh": ["付款后", "收据"]}}, ["topic:쇼핑"]),
        ],
    )


def unit05():
    return _simple_unit(
        5,
        "jabi-basic-v1-05",
        T("jabi. Basics · Unit 5 — Places & directions", "jabi. 기초 · 5과 — 장소와 길 찾기", "jabi. 基础 · 第5课 — 地点与问路"),
        "장소",
        T("Ask where a place is; understand go-straight / turn.", "어디인지 묻기 · 직진·회전 이해.", "问路；理解直行、转弯。"),
        T("Patterns: [장소] 어디예요? · 직진하세요 · 왼쪽/오른쪽으로 도세요 · 가까워요.", "패턴: [장소] 어디예요? · 직진하세요 · 왼쪽/오른쪽으로 도세요 · 가까워요.", "句型：地点在哪？·请直行·向左/右转·很近。"),
        "DRAFT — jabi. 원작. 세종 초급 '길 찾기' 주제만 참고.",
        {
            "title": T("Asking the way", "길 묻기", "问路"),
            "lines": [
                {"who": "유키", "ko": "저기요, 지하철역이 어디예요?"},
                {"who": "행인", "ko": "이쪽으로 직진하세요."},
                {"who": "유키", "ko": "그리고요?"},
                {"who": "행인", "ko": "은행에서 오른쪽으로 도세요. 가까워요."},
            ],
        },
        [
            {"ko": "지하철역이 어디예요?", "gloss": T("Where is the subway station?", "위치", "地铁站在哪")},
            {"ko": "직진하세요.", "gloss": T("Go straight.", "직진", "请直行")},
            {"ko": "왼쪽으로 도세요.", "gloss": T("Turn left.", "좌회전", "请向左转")},
            {"ko": "오른쪽으로 도세요.", "gloss": T("Turn right.", "우회전", "请向右转")},
            {"ko": "가까워요 / 멀어요.", "gloss": T("It's near / far.", "거리", "近/远")},
            {"ko": "옆에 있어요.", "gloss": T("It's next to ~.", "옆", "在旁边")},
            {"ko": "건너편에 있어요.", "gloss": T("Across the street.", "건너편", "在对面")},
            {"ko": "지도로 보여 주세요.", "gloss": T("Please show me on a map.", "지도", "请用地图指给我")},
        ],
        [
            q("basic-05-01", T("※ Ask place.\n\n유키: 화장실 (    )?\n행인: 저쪽이에요.", "※ 위치.\n\n유키: 화장실 (    )?\n행인: 저쪽이에요.", "※ 位置。\n\n雪：화장실 (    )?\n路人：저쪽이에요。"), ["어디예요", "얼마예요", "누구예요", "뭐 해요"], 0, T("어디예요?", "어디예요?", "어디예요？"), {"ko": "위치 질문.", "en": "Ask where.", "zh": "问哪里。", "steps": {"en": ["Need location", "어디"], "ko": ["위치", "어디"], "zh": ["要位置", "어디"]}}, ["topic:장소"]),
            q("basic-05-02", T("※ Straight.\n\n행인: 이쪽으로 (    ).", "※ 직진.\n\n행인: 이쪽으로 (    ).", "※ 直行。\n\n路人：이쪽으로 (    )。"), ["직진하세요", "공부하세요", "포장하세요", "결제하세요"], 0, T("직진하세요.", "직진하세요.", "직진하세요。"), {"ko": "직진 안내.", "en": "Go straight.", "zh": "直行指引。", "steps": {"en": ["Direction help", "직진"], "ko": ["길 안내", "직진"], "zh": ["指路", "直行"]}}, ["topic:장소"]),
            q("basic-05-03", T("※ Turn.\n\n행인: 은행에서 (    ).", "※ 회전.\n\n행인: 은행에서 (    ).", "※ 转弯。\n\n路人：은행에서 (    )。"), ["오른쪽으로 도세요", "아메리카노 주세요", "일곱 시에 일어나요", "만나서 반가워요"], 0, T("Turn right.", "우회전.", "右转。"), {"ko": "방향 전환.", "en": "Turn.", "zh": "转弯。", "steps": {"en": ["At bank landmark", "Right turn"], "ko": ["은행 기준", "오른쪽"], "zh": ["以银行为准", "右转"]}}, ["topic:장소"]),
            q("basic-05-04", T("※ Distance.\n\n유키: 멀어요?\n행인: 아니요, (    ).", "※ 거리.\n\n유키: 멀어요?\n행인: 아니요, (    ).", "※ 距离。\n\n雪：멀어요?\n路人：아니요, (    )。"), ["가까워요", "매워어요", "감사해요만", "사람이에요"], 0, T("가까워요.", "가까워요.", "가까워요。"), {"ko": "가깝다.", "en": "Near.", "zh": "近。", "steps": {"en": ["Not far", "가까워요"], "ko": ["안 멀다", "가까워요"], "zh": ["不远", "가까워요"]}}, ["topic:장소"]),
            q("basic-05-05", T("※ Next to.\n\n행인: 편의점은 은행 (    ).", "※ 옆.\n\n행인: 편의점은 은행 (    ).", "※ 旁边。\n\n路人：편의점은 은행 (    )。"), ["옆에 있어요", "위에만 있어요", "받침에 있어요", "포장에 있어요"], 0, T("옆에 있어요.", "옆에 있어요.", "옆에 있어요。"), {"ko": "옆 위치.", "en": "Beside.", "zh": "旁边。", "steps": {"en": ["Relative place", "옆"], "ko": ["상대 위치", "옆"], "zh": ["相对位置", "옆"]}}, ["topic:장소"]),
            q("basic-05-06", T("※ Across.\n\n행인: 카페는 길 (    ).", "※ 건너편.\n\n행인: 카페는 길 (    ).", "※ 对面。\n\n路人：카페는 길 (    )。"), ["건너편에 있어요", "안에서만 있어요", "모음에 있어요", "획순에 있어요"], 0, T("건너편에 있어요.", "건너편.", "对面。"), {"ko": "길 건너.", "en": "Across.", "zh": "马路对面。", "steps": {"en": ["Other side of street", "건너편"], "ko": ["반대편", "건너편"], "zh": ["街对面", "건너편"]}}, ["topic:장소"]),
            q("basic-05-07", T("※ Polite attention.\n\n유키: (    ), 서점이 어디예요?", "※ 부르기.\n\n유키: (    ), 서점이 어디예요?", "※ 招呼。\n\n雪：(    ), 서점이 어디예요？"), ["저기요", "포장이요", "이에요", "받침이요"], 0, T("저기요 to get attention.", "저기요=부르기.", "저기요用于招呼。"), {"ko": "陌生人 부르기.", "en": "Excuse me.", "zh": "劳驾。", "steps": {"en": ["Stop a passerby", "저기요"], "ko": ["행인 부르기", "저기요"], "zh": ["叫住路人", "저기요"]}}, ["topic:장소"]),
            q("basic-05-08", T("※ Map help.\n\n유키: (    ).\n행인: 여기 보세요.", "※ 지도.\n\n유키: (    ).\n행인: 여기 보세요.", "※ 地图。\n\n雪：(    ).\n路人：여기 보세요。"), ["지도로 보여 주세요", "아메리카노 보여 주세요", "이름만 보여 주세요", "받침 보여 주세요"], 0, T("Show on a map.", "지도로 보여 주기.", "用地图指。"), {"ko": "지도 부탁.", "en": "Ask for map demo.", "zh": "请用地图演示。", "steps": {"en": ["Confused verbally", "Ask map"], "ko": ["말로 어려움", "지도"], "zh": ["口头难懂", "地图"]}}, ["topic:장소"]),
        ],
    )


def unit06():
    return _simple_unit(
        6,
        "jabi-basic-v1-06",
        T("jabi. Basics · Unit 6 — Food & restaurants", "jabi. 기초 · 6과 — 음식과 식당", "jabi. 基础 · 第6课 — 食物与餐厅"),
        "음식",
        T("Order food, say likes/dislikes, ask for the check.", "주문·기호·계산.", "点餐、喜恶、结账。"),
        T("Patterns: [음식] 주세요 · 맛있어요 · 안 매운 걸로요 · 계산해 주세요.", "패턴: [음식] 주세요 · 맛있어요 · 안 매운 걸로요 · 계산해 주세요.", "句型：请给我[食物] · 好吃 · 不要辣的 · 请结账。"),
        "DRAFT — jabi. 원작. 세종 초급 '식당' 주제만 참고.",
        {
            "title": T("At a restaurant", "식당에서", "在餐厅"),
            "lines": [
                {"who": "직원", "ko": "몇 분이세요?"},
                {"who": "손님", "ko": "두 명이요."},
                {"who": "직원", "ko": "주문하시겠어요?"},
                {"who": "손님", "ko": "비빔밥 하나, 불고기 하나 주세요. 안 매운 걸로요."},
                {"who": "손님", "ko": "계산해 주세요."},
            ],
        },
        [
            {"ko": "몇 분이세요?", "gloss": T("How many people?", "인원", "几位")},
            {"ko": "주문하시겠어요?", "gloss": T("Ready to order?", "주문", "可以点餐了吗")},
            {"ko": "비빔밥 하나 주세요.", "gloss": T("One bibimbap, please.", "주문", "一份拌饭")},
            {"ko": "안 매운 걸로요.", "gloss": T("Not spicy, please.", "맵기", "不要辣的")},
            {"ko": "맛있어요!", "gloss": T("It's delicious!", "평가", "好吃")},
            {"ko": "물 좀 주세요.", "gloss": T("Water, please.", "물", "请给水")},
            {"ko": "계산해 주세요.", "gloss": T("Check, please.", "계산", "请结账")},
            {"ko": "따로따로 계산할게요.", "gloss": T("We'll pay separately.", "더치페이", "分开付")},
        ],
        [
            q("basic-06-01", T("※ Party size.\n\n직원: (    )?\n손님: 두 명이요.", "※ 인원.\n\n직원: (    )?\n손님: 두 명이요.", "※ 人数。\n\n店员：(    )?\n客人：두 명이요。"), ["몇 분이세요", "얼마예요", "어디예요", "이름이 뭐예요"], 0, T("몇 분이세요?", "몇 분이세요?", "몇 분이세요？"), {"ko": "인원 확인.", "en": "Headcount.", "zh": "确认人数。", "steps": {"en": ["Restaurant entry", "How many"], "ko": ["입장", "인원"], "zh": ["进店", "人数"]}}, ["topic:음식"]),
            q("basic-06-02", T("※ Order.\n\n손님: 김치찌개 하나 (    ).", "※ 주문.\n\n손님: 김치찌개 하나 (    ).", "※ 点餐。\n\n客人：김치찌개 하나 (    )。"), ["주세요", "이에요요", "직진하세요", "읽어세요"], 0, T("주세요.", "주세요.", "주세요。"), {"ko": "주문.", "en": "Order.", "zh": "点餐。", "steps": {"en": ["Food + quantity", "주세요"], "ko": ["음식+수량", "주세요"], "zh": ["食物+数量", "주세요"]}}, ["topic:음식"]),
            q("basic-06-03", T("※ Spice.\n\n손님: (    ). 못 먹어요.", "※ 맵기.\n\n손님: (    ). 못 먹어요.", "※ 辣度。\n\n客人：(    ). 我吃不了。"), ["안 매운 걸로요", "포장이요만", "직진으로요", "받침으로요"], 0, T("Not spicy.", "안 매운 거.", "不要辣。"), {"ko": "맵기 조절.", "en": "Spice level.", "zh": "辣度。", "steps": {"en": ["Can't eat spicy", "안 매운"], "ko": ["맵면 안 됨", "안 매운"], "zh": ["不能吃辣", "안 매운"]}}, ["topic:음식"]),
            q("basic-06-04", T("※ Water.\n\n손님: (    ).\n직원: 네, 곧 가져올게요.", "※ 물.\n\n손님: (    ).\n직원: 네, 곧 가져올게요.", "※ 水。\n\n客人：(    ).\n店员：马上送来。"), ["물 좀 주세요", "산 좀 주세요", "받침 좀 주세요", "획순 좀 주세요"], 0, T("물 좀 주세요.", "물 좀 주세요.", "물 좀 주세요。"), {"ko": "물 요청.", "en": "Ask for water.", "zh": "要水。", "steps": {"en": ["Need water", "주세요"], "ko": ["물", "주세요"], "zh": ["水", "주세요"]}}, ["topic:음식"]),
            q("basic-06-05", T("※ Taste.\n\n손님: 와, (    )!", "※ 맛.\n\n손님: 와, (    )!", "※ 味道。\n\n客人：哇，(    )！"), ["맛있어요", "멀어요", "직진해요", "포장해요"], 0, T("맛있어요!", "맛있어요!", "맛있어요！"), {"ko": "맛 평가.", "en": "Compliment food.", "zh": "评价好吃。", "steps": {"en": ["Positive reaction", "맛있다"], "ko": ["긍정", "맛있다"], "zh": ["正面", "好吃"]}}, ["topic:음식"]),
            q("basic-06-06", T("※ Check.\n\n손님: (    ).\n직원: 카드로 하세요?", "※ 계산.\n\n손님: (    ).\n직원: 카드로 하세요?", "※ 结账。\n\n客人：(    ).\n店员：刷卡吗？"), ["계산해 주세요", "직진해 주세요", "읽어 주세요 받침", "운동해 주세요"], 0, T("계산해 주세요.", "계산해 주세요.", "계산해 주세요。"), {"ko": "계산 요청.", "en": "Ask for check.", "zh": "请结账。", "steps": {"en": ["Finished meal", "계산"], "ko": ["식사 끝", "계산"], "zh": ["吃完", "结账"]}}, ["topic:음식"]),
            q("basic-06-07", T("※ Split.\n\n손님: (    ).\n직원: 네, 알겠습니다.", "※ 더치.\n\n손님: (    ).\n직원: 네, 알겠습니다.", "※ 分开付。\n\n客人：(    ).\n店员：好的。"), ["따로따로 계산할게요", "같이 직진할게요", "같이 받침할게요", "같이 포장만 할게요"], 0, T("Pay separately.", "따로 계산.", "分开付。"), {"ko": "더치페이.", "en": "Split bill.", "zh": "AA制。", "steps": {"en": ["Not one bill", "따로"], "ko": ["한 장 아님", "따로"], "zh": ["不共单", "따로"]}}, ["topic:음식"]),
            q("basic-06-08", T("※ Ready to order?\n\n직원: (    )?\n손님: 네, 불고기 주세요.", "※ 주문 준비.\n\n직원: (    )?\n손님: 네, 불고기 주세요.", "※ 可以点了吗？\n\n店员：(    )?\n客人：네, 불고기 주세요。"), ["주문하시겠어요", "운동하시겠어요", "직진하시겠어요", "받침하시겠어요"], 0, T("주문하시겠어요?", "주문하시겠어요?", "주문하시겠어요？"), {"ko": "주문 시점.", "en": "Offer to take order.", "zh": "询问是否点餐。", "steps": {"en": ["Staff prompt", "주문"], "ko": ["직원 유도", "주문"], "zh": ["店员提示", "点餐"]}}, ["topic:음식"]),
        ],
    )


def main():
    banks = {
        "draft-basic-unit01-greetings.json": unit01(),
        "draft-basic-unit02-daily-life.json": unit02(),
        "draft-basic-unit03-cafe.json": unit03(),
        "draft-basic-unit04-shopping.json": unit04(),
        "draft-basic-unit05-directions.json": unit05(),
        "draft-basic-unit06-food.json": unit06(),
    }
    for name, obj in banks.items():
        write_bank(name, obj)

    manifest = {
        "id": "jabi-basic-v0",
        "version": 2,
        "status": "draft",
        "updated": "2026-07-26",
        "format": "duolingo-skill-path-v1",
        "title": T("Basics (pre-TOPIK)", "기초 수업", "基础课程"),
        "lead": T(
            "Duolingo-style skill path · Sejong classroom themes · rich dialogue drafts for units 01–06 (edit later).",
            "듀오링고식 스킬 패스 · 세종 교실 주제 · 01–06 상세 대화 초안(나중에 수정).",
            "多邻国式技能路径 · 世宗课堂主题 · 01–06详细对话草稿（稍后改）。",
        ),
        "sourcePolicy": {
            "note": "Sejong theme structure only — no official wording. Original jabi. dialogue items.",
            "research": ["docs/research-next-tracks-ko.md"],
        },
        "schema": {
            "unit": {
                "id": "basic-NN",
                "steps": "intro | teach | dialogue | practice | checkpoint",
                "bankFile": "draft JSON with dialogue + phrases + questions",
            }
        },
        "units": [
            {
                "id": "basic-01",
                "order": 1,
                "slug": "greetings",
                "kind": "dialogue",
                "title": T("01 · Greetings & self-intro", "01 · 인사와 자기소개", "01 · 打招呼和自我介绍"),
                "theme": "인사",
                "objective": banks["draft-basic-unit01-greetings.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit01-greetings.json",
                "bankId": "jabi-basic-v1-01",
                "questionCount": 8,
                "pathLabel": "01",
            },
            {
                "id": "basic-02",
                "order": 2,
                "slug": "daily-life",
                "kind": "dialogue",
                "title": T("02 · Daily life", "02 · 일상생활", "02 · 日常生活"),
                "theme": "일상",
                "objective": banks["draft-basic-unit02-daily-life.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit02-daily-life.json",
                "bankId": "jabi-basic-v1-02",
                "questionCount": 8,
                "pathLabel": "02",
            },
            {
                "id": "basic-03",
                "order": 3,
                "slug": "cafe",
                "kind": "dialogue",
                "title": T("03 · At a café", "03 · 카페에서", "03 · 在咖啡馆"),
                "theme": "카페",
                "objective": banks["draft-basic-unit03-cafe.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit03-cafe.json",
                "bankId": "jabi-basic-v1-03",
                "questionCount": 8,
                "pathLabel": "03",
            },
            {
                "id": "basic-04",
                "order": 4,
                "slug": "shopping",
                "kind": "dialogue",
                "title": T("04 · Shopping", "04 · 물건 사기", "04 · 购物"),
                "theme": "쇼핑",
                "objective": banks["draft-basic-unit04-shopping.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit04-shopping.json",
                "bankId": "jabi-basic-v1-04",
                "questionCount": 8,
                "pathLabel": "04",
            },
            {
                "id": "basic-05",
                "order": 5,
                "slug": "directions",
                "kind": "dialogue",
                "title": T("05 · Places & directions", "05 · 장소와 길 찾기", "05 · 地点与问路"),
                "theme": "장소",
                "objective": banks["draft-basic-unit05-directions.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit05-directions.json",
                "bankId": "jabi-basic-v1-05",
                "questionCount": 8,
                "pathLabel": "05",
            },
            {
                "id": "basic-06",
                "order": 6,
                "slug": "food",
                "kind": "dialogue",
                "title": T("06 · Food & restaurants", "06 · 음식과 식당", "06 · 食物与餐厅"),
                "theme": "음식",
                "objective": banks["draft-basic-unit06-food.json"]["objective"],
                "status": "draft",
                "bankFile": "../draft-basic-unit06-food.json",
                "bankId": "jabi-basic-v1-06",
                "questionCount": 8,
                "pathLabel": "06",
            },
        ],
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote manifest v2 · 6 units")


if __name__ == "__main__":
    main()

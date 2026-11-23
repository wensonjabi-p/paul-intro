# -*- coding: utf-8 -*-
from pathlib import Path
import json

# Finish i18n if needed
p = Path("hub/js/i18n.js")
t = p.read_text(encoding="utf-8")
repls = {
    'badgeScaffold: "Scaffold"': 'badgeScaffold: "Draft"',
    'badgeScaffold: "준비 중"': 'badgeScaffold: "초안"',
    'badgeScaffold: "筹备中"': 'badgeScaffold: "草稿"',
    'doorHangulDesc: "Lesson list 00–17 · stroke practice for 13 consonants live."':
        'doorHangulDesc: "Duolingo-style path 00–17 · Sejong structure · stroke practice live."',
    'doorBasicDesc: "Pilot units 1–2 dialogue drills (scaffold)."':
        'doorBasicDesc: "Skill path units 01–06 · dialogue + drills (rich draft)."',
    'doorTopik2Desc: "Listen · read · write 51–54 shells — banks next."':
        'doorTopik2Desc: "Writing 51–54 pilots · listen/read still shells."',
    'doorHangulDesc: "레슨 00–17 · 자음 13 획순 연습 가능."':
        'doorHangulDesc: "듀오식 패스 00–17 · 세종 구조 · 획순 연습 가능."',
    'doorBasicDesc: "파일럿 1–2과 대화 연습 (껍데기)."':
        'doorBasicDesc: "스킬 패스 01–06 · 대화+드릴 (상세 초안)."',
    'doorTopik2Desc: "듣기·읽기·쓰기 51–54 껍데기 · 뱅크는 다음."':
        'doorTopik2Desc: "쓰기 51–54 파일럿 · 듣기·읽기는 껍데기."',
    'doorHangulDesc: "00–17 课表 · 13 辅音笔顺可练。"':
        'doorHangulDesc: "多邻国式路径 00–17 · 世宗结构 · 笔顺可练。"',
    'doorBasicDesc: "试点第1–2课对话练习（骨架）。"':
        'doorBasicDesc: "技能路径 01–06 · 对话+练习（详细草稿）。"',
    'doorTopik2Desc: "听/读/写 51–54 外壳 · 题库下一步。"':
        'doorTopik2Desc: "写作 51–54 试点 · 听读仍为外壳。"',
}
n = 0
for a, b in repls.items():
    if a in t:
        t = t.replace(a, b)
        n += 1
p.write_text(t, encoding="utf-8")
print("i18n replacements:", n)

# Light TOPIK II listen/read shells
mp = Path("hub/app/data/topik2/track-manifest.json")
data = json.loads(mp.read_text(encoding="utf-8"))
data["updated"] = "2026-07-26"
data["lead"] = {
    "en": "Writing Q51–54 pilots live. Listen/read = light shells (section map only). No Lemon / AI grading.",
    "ko": "쓰기 51–54 파일럿 가동. 듣기·읽기 = 가벼운 껍데기(영역 지도만). Lemon/AI 채점 없음.",
    "zh": "写作51–54试点可用。听读=轻外壳（仅分区地图）。无 Lemon/AI 评分。",
}

def shell_modules(kind):
    if kind == "listen":
        return [
            {
                "type": "shell",
                "status": "scaffold",
                "body": {
                    "en": "Planned: longer TOPIK II listening items reusing the TOPIK I quiz runner. No bank yet — structure only.",
                    "ko": "예정: TOPIK I 퀴즈 러너 재사용 · 더 긴 II 듣기. 뱅크 없음 — 구조만.",
                    "zh": "计划：复用 TOPIK I 测验引擎 · 更长 II 听力。尚无题库 — 仅结构。",
                },
            },
            {
                "type": "shell",
                "status": "scaffold",
                "body": {
                    "en": "Future skill nodes: dialogue · announcement · conversation · lecture-style (counts TBD).",
                    "ko": "향후 노드: 대화 · 안내 · 대화 이어가기 · 강연형(문항 수 TBD).",
                    "zh": "后续节点：对话·通知·接续对话·讲义型（题量待定）。",
                },
            },
        ]
    if kind == "read":
        return [
            {
                "type": "shell",
                "status": "scaffold",
                "body": {
                    "en": "Planned: advanced passages on the TOPIK I reading runner. No bank yet.",
                    "ko": "예정: TOPIK I 읽기 러너 위 고급 지문. 뱅크 없음.",
                    "zh": "计划：在 TOPIK I 阅读器上挂高级篇章。尚无题库。",
                },
            },
            {
                "type": "shell",
                "status": "scaffold",
                "body": {
                    "en": "Future skill nodes: topic sentence · detail · inference · vocabulary-in-context (counts TBD).",
                    "ko": "향후 노드: 중심 내용 · 세부 · 추론 · 문맥 어휘(문항 수 TBD).",
                    "zh": "后续节点：主旨·细节·推断·语境词汇（题量待定）。",
                },
            },
        ]
    return []

for u in data["units"]:
    if u["id"] == "topik2-listen":
        u["status"] = "scaffold"
        u["modules"] = shell_modules("listen")
        u["note"] = {
            "en": "Light shell — section map only. Full listen bank later (after Hangul/Basics drafts).",
            "ko": "가벼운 껍데기 — 영역 지도만. 듣기 뱅크는 한글/기초 초안 이후.",
            "zh": "轻外壳 — 仅分区地图。听力题库在韩文/基础草稿之后。",
        }
    if u["id"] == "topik2-read":
        u["status"] = "scaffold"
        u["modules"] = shell_modules("read")
        u["note"] = {
            "en": "Light shell — section map only. Full read bank later.",
            "ko": "가벼운 껍데기 — 영역 지도만. 읽기 뱅크는 나중.",
            "zh": "轻外壳 — 仅分区地图。阅读题库稍后。",
        }
    if u["id"] == "topik2-00":
        u["modules"] = [
            {
                "type": "shell",
                "status": "scaffold",
                "body": {
                    "en": "TOPIK II = Listening + Reading + Writing (51–54). Writing pilots are the playable slice today.",
                    "ko": "TOPIK II = 듣기 + 읽기 + 쓰기(51–54). 오늘은 쓰기 파일럿이 플레이 가능 구간.",
                    "zh": "TOPIK II = 听力+阅读+写作(51–54)。今天可玩的是写作试点。",
                },
            }
        ]

mp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("topik2 shells updated")

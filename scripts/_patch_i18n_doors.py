# -*- coding: utf-8 -*-
from pathlib import Path

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
for a, b in repls.items():
    if a not in t:
        print("MISS:", a[:50])
    else:
        t = t.replace(a, b)
        print("OK:", a[:40])
p.write_text(t, encoding="utf-8")

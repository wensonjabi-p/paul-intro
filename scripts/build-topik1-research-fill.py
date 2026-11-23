# -*- coding: utf-8 -*-
"""Build TOPIK I research-fill banks: listen-02 + read-04; retitle existing."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "hub" / "app" / "data"


def q_listening(
    qid,
    script_ko,
    choices,
    answer,
    tags,
    *,
    prompt_extra_ko="",
    visual,
    steps_en,
    steps_zh,
    steps_ko,
    why,
    distract_why,
    flat_hint_en,
):
    prompt_ko = "※ 들은 내용과 같은 것을 고르십시오."
    if prompt_extra_ko:
        prompt_ko = prompt_extra_ko
    return {
        "id": qid,
        "type": "listening",
        "prompt": {
            "ko": prompt_ko,
            "en": "※ Choose what matches what you heard."
            if "응답" not in prompt_ko
            else "※ Choose the best response.",
            "zh": "※ 选择与听到内容一致的一项。"
            if "응답" not in prompt_ko
            else "※ 选择最合适的回答。",
        },
        "script": {"ko": script_ko},
        "choices": choices,
        "answer": answer,
        "answerText": choices[answer],
        "tags": tags,
        "hint": {
            "ko": steps_ko[0],
            "en": flat_hint_en,
            "zh": steps_zh[0],
            "visual": visual,
            "steps": {"en": steps_en, "zh": steps_zh, "ko": steps_ko},
        },
        "why": why,
        "distractOrder": [i for i in range(4) if i != answer][:3]
        if answer != 0
        else [1, 2, 3],
        "distractWhy": distract_why,
    }


def mcq(
    qid,
    qtype,
    prompt,
    choices,
    answer,
    tags,
    visual,
    steps_en,
    steps_zh,
    steps_ko,
    why,
    distract_why,
    flat_hint_en,
    underline=None,
):
    item = {
        "id": qid,
        "type": qtype,
        "prompt": prompt,
        "choices": choices,
        "answer": answer,
        "answerText": choices[answer],
        "tags": tags,
        "hint": {
            "ko": steps_ko[0],
            "en": flat_hint_en,
            "zh": steps_zh[0],
            "visual": visual,
            "steps": {"en": steps_en, "zh": steps_zh, "ko": steps_ko},
        },
        "why": why,
        "distractOrder": [1, 2, 3] if answer == 0 else [i for i in range(4) if i != answer],
        "distractWhy": distract_why,
    }
    if underline:
        item["underline"] = underline
    return item


LISTEN_02 = {
    "id": "jabi-topik1-listen-v1-02",
    "title": {
        "en": "jabi. Listening · Set 2 (response · place · topic)",
        "ko": "jabi. 듣기 연습 2 (응답·장소·주제)",
        "zh": "jabi. 听力 · 套题 2（应答·地点·主题）",
    },
    "level": "TOPIK I",
    "skill": "listening",
    "verified": True,
    "verifiedAt": "2026-07-26",
    "source": "jabi-original",
    "sourceNote": (
        "Research-fill #3. Official TOPIK I listening shapes only "
        "(response · place · topic · next action · detail match). "
        "Original scripts — no official items/audio. Hint: Meaning→Look early; Pair in why."
    ),
    "questions": [
        q_listening(
            "l2-01",
            "가: 민수 씨, 지금 뭐 해요?\n나: …",
            ["책을 읽어요.", "네, 저는 학생이에요.", "어제 갔어요.", "비가 와요."],
            0,
            ["listening:응답", "vocab:읽다"],
            prompt_extra_ko="※ 이어질 말로 알맞은 것을 고르십시오.\n(재생 버튼을 누르거나, 준비되면 대본을 확인하세요.)",
            visual={
                "emoji": ["📖"],
                "en": "book activity",
                "ko": "책",
                "zh": "书",
            },
            steps_en=[
                "Response: answer “what are you doing now?”",
                "Look for a present activity ending (-아요/어요), not past or weather.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            steps_zh=[
                "应答：回答“现在在做什么？”",
                "找现在进行的活动结尾（-아요/어요），不是过去或天气。",
                "只看对照句式，自己从选项里选。",
            ],
            steps_ko=[
                "응답: 「지금 뭐 해요?」에 답.",
                "지금 하는 일(-아요/어요). 과거·날씨 아님.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            why={
                "en": "지금 뭐 해요? → present activity: 책을 읽어요.",
                "zh": "지금 뭐 해요? → 现在活动：책을 읽어요。",
                "ko": "지금 뭐 해요? → 책을 읽어요.",
            },
            distract_why={
                "1": {
                    "en": "Why not “I am a student”? That answers who you are, not what you are doing now.",
                    "zh": "为什么不是“我是学生”？那是身份，不是正在做什么。",
                    "ko": "왜 「학생이에요」가 아니에요? 지금 하는 일이 아니에요.",
                },
                "2": {
                    "en": "Why not past tense? The question is about now (지금).",
                    "zh": "为什么不是过去？问题是现在。",
                    "ko": "왜 과거가 아니에요? 「지금」이에요.",
                },
                "3": {
                    "en": "Why not weather? The question is about 나’s activity.",
                    "zh": "为什么不是天气？问的是对方在做什么。",
                    "ko": "왜 날씨가 아니에요? 지금 하는 일이에요.",
                },
            },
            flat_hint_en="Response to “what are you doing now?” — present activity.",
        ),
        q_listening(
            "l2-02",
            "가: 여기 메뉴 좀 주세요.\n나: 네, 잠시만요. 음료는 셀프예요.",
            ["식당", "은행", "우체국", "교실"],
            0,
            ["listening:장소", "vocab:메뉴"],
            visual={
                "emoji": ["🍽️", "📋"],
                "en": "meal · menu",
                "ko": "식사·메뉴",
                "zh": "用餐·菜单",
            },
            steps_en=[
                "Place: where does this talk happen?",
                "Listen for 메뉴 / 음료 — food-service words.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            steps_zh=[
                "地点：这段对话在哪里？",
                "听 메뉴 / 음료 — 餐饮用语。",
                "只看对照句式，自己从选项里选。",
            ],
            steps_ko=[
                "장소: 어디서 하는 말인가요?",
                "메뉴·음료 = 음식 관련.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            why={
                "en": "메뉴·음료 → restaurant (식당).",
                "zh": "메뉴·음료 → 餐厅（식당）。",
                "ko": "메뉴·음료 → 식당.",
            },
            distract_why={
                "1": {
                    "en": "Why not bank? No money/account words — menu and drinks.",
                    "zh": "为什么不是银行？没有存款用语，是菜单和饮料。",
                    "ko": "왜 은행이 아니에요? 메뉴·음료예요.",
                },
                "2": {
                    "en": "Why not post office? No mail/stamps — food service.",
                    "zh": "为什么不是邮局？没有邮票，是餐饮。",
                    "ko": "왜 우체국이 아니에요? 식사 장면이에요.",
                },
                "3": {
                    "en": "Why not classroom? Teacher/lesson not mentioned — menu.",
                    "zh": "为什么不是教室？没有上课，是菜单。",
                    "ko": "왜 교실이 아니에요? 메뉴예요.",
                },
            },
            flat_hint_en="Place from menu/drink words.",
        ),
        q_listening(
            "l2-03",
            "가: 오늘 모임에 올 수 있어요?\n나: 미안해요. 오늘 일이 많아서 못 가요.",
            ["모임에 못 감", "모임에 감", "일이 없음", "내일에 만남"],
            0,
            ["listening:주제", "vocab:모임"],
            visual={
                "emoji": ["👥", "💼"],
                "en": "people · work",
                "ko": "사람들·일",
                "zh": "人·工作",
            },
            steps_en=[
                "Topic: can 나 join today’s meetup?",
                "Listen after 미안해요 — busy with work, cannot go.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            steps_zh=[
                "主题：对方今天能来聚会吗？",
                "听「미안해요」之后——事情多，去不了。",
                "只看对照句式，自己从选项里选。",
            ],
            steps_ko=[
                "주제: 오늘 모임에 오나요?",
                "미안해요 → 일이 많아서 못 가요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            why={
                "en": "일이 많아서 못 가요 → cannot go to the meetup.",
                "zh": "일이 많아서 못 가요 → 不能去聚会。",
                "ko": "일이 많아서 못 가요 → 모임에 못 감.",
            },
            distract_why={
                "1": {
                    "en": "Why not “will go”? 나 said 못 가요.",
                    "zh": "为什么不是“会去”？对方说去不了。",
                    "ko": "왜 「감」이 아니에요? 「못 가요」.",
                },
                "2": {
                    "en": "Why not “no work”? 나 has a lot of work today.",
                    "zh": "为什么不是“没工作”？对方说事情多。",
                    "ko": "왜 「일이 없음」이 아니에요? 일이 많아요.",
                },
                "3": {
                    "en": "Why not meet tomorrow? Only today was refused — tomorrow not said.",
                    "zh": "为什么不是明天见？只说了今天去不了。",
                    "ko": "왜 내일이 아니에요? 오늘은 못 가요만 나왔어요.",
                },
            },
            flat_hint_en="Topic: joining today’s meetup or not.",
        ),
        q_listening(
            "l2-04",
            "가: 가방이 무거워요. 좀 도와주세요.\n나: 네. 제가 들어 줄게요.",
            ["가방을 들어 줌", "가방을 사 줌", "집에 감", "사진을 찍음"],
            0,
            ["listening:행동", "vocab:도와주다"],
            visual={
                "emoji": ["👜", "🤝"],
                "en": "bag · help",
                "ko": "가방·도움",
                "zh": "包·帮忙",
            },
            steps_en=[
                "Next action: what will 나 do?",
                "Hear 들어 줄게요 after offering help.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            steps_zh=[
                "接下来：对方会做什么？",
                "听帮忙之后的 들어 줄게요。",
                "只看对照句式，自己从选项里选。",
            ],
            steps_ko=[
                "다음 행동: 나가 뭘 할까요?",
                "도와주세요 → 들어 줄게요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            why={
                "en": "들어 줄게요 = will carry/lift the bag for 가.",
                "zh": "들어 줄게요 = 帮对方拿包。",
                "ko": "들어 줄게요 → 가방을 들어 줌.",
            },
            distract_why={
                "1": {
                    "en": "Why not buy a bag? Help is carrying, not shopping.",
                    "zh": "为什么不是买包？是帮忙拿，不是买。",
                    "ko": "왜 사 줌이 아니에요? 들어 줄게요.",
                },
                "2": {
                    "en": "Why not go home? No 집 — they talk about the bag.",
                    "zh": "为什么不是回家？说的是包。",
                    "ko": "왜 집에 감이 아니에요? 가방이에요.",
                },
                "3": {
                    "en": "Why not take a photo? Verb is 들다 (lift), not 찍다.",
                    "zh": "为什么不是拍照？动词是拿/提。",
                    "ko": "왜 사진이 아니에요? 들어 줄게요.",
                },
            },
            flat_hint_en="Next action after “please help with the bag.”",
        ),
        q_listening(
            "l2-05",
            "가: 약국이 몇 층에 있어요?\n나: 2층에 있어요. 엘리베이터 옆에 있어요.",
            ["2층 · 엘리베이터 옆", "1층 · 계단 옆", "3층 · 화장실 옆", "지하 · 출구 옆"],
            0,
            ["listening:세부", "vocab:약국"],
            visual={
                "emoji": ["💊", "🛗"],
                "en": "pharmacy · elevator",
                "ko": "약국·엘리베이터",
                "zh": "药房·电梯",
            },
            steps_en=[
                "Detail check: floor + nearby landmark.",
                "Listen for 몇 층 → number floor, then 옆에.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            steps_zh=[
                "细节核对：楼层 + 旁边标志。",
                "听 몇 층 → 几楼，再听 옆에。",
                "只看对照句式，自己从选项里选。",
            ],
            steps_ko=[
                "세부 확인: 층 + 옆 위치.",
                "몇 층? → 옆에 있어요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            why={
                "en": "2층 + next to the elevator.",
                "zh": "2层 + 电梯旁。",
                "ko": "2층 · 엘리베이터 옆.",
            },
            distract_why={
                "1": {
                    "en": "Why not 1F by stairs? 나 said 2층 and elevator.",
                    "zh": "为什么不是1楼楼梯旁？说的是2楼电梯旁。",
                    "ko": "왜 1층·계단이 아니에요? 2층·엘리베이터.",
                },
                "2": {
                    "en": "Why not 3F by restroom? Floor and landmark differ.",
                    "zh": "为什么不是3楼厕所旁？楼层和标志都不同。",
                    "ko": "왜 3층·화장실이 아니에요? 2층·엘리베이터.",
                },
                "3": {
                    "en": "Why not basement by exit? 나 said second floor.",
                    "zh": "为什么不是地下出口旁？说的是2楼。",
                    "ko": "왜 지하가 아니에요? 2층이에요.",
                },
            },
            flat_hint_en="Detail: floor number and what is beside it.",
        ),
    ],
}


READ_04 = {
    "id": "jabi-topik1-read-v1-04",
    "title": {
        "en": "jabi. Reading · Set 4 (purpose · content · order)",
        "ko": "jabi. 읽기 연습 4 (목적·내용·순서)",
        "zh": "jabi. 阅读 · 套题 4（目的·内容·顺序）",
    },
    "level": "TOPIK I",
    "verified": True,
    "verifiedAt": "2026-07-26",
    "source": "jabi-original",
    "sourceNote": (
        "Research-fill #3. Official TOPIK I reading shapes only "
        "(purpose · content match · sentence order · notice · topic). "
        "Original — no official items. Hint UX: Meaning→Look early; no Match:/답: spoilers."
    ),
    "questions": [
        mcq(
            "v4-01",
            "purpose",
            {
                "ko": "※ 다음을 읽고 물음에 답하십시오.\n\n[알림]\n이번 주 토요일에 도서관에서 한국어 말하기 모임이 있습니다. 오고 싶은 분은 금요일까지 이름을 적어 주세요.\n\n이 글의 목적은 무엇입니까?",
                "en": "※ Read and answer.\n\n[Notice]\nThere is a Korean speaking meetup at the library this Saturday. If you want to come, write your name by Friday.\n\nWhat is the purpose of this text?",
                "zh": "※ 阅读并答题。\n\n[通知]\n本周六图书馆有韩语口语聚会。想来的人请在周五前写下名字。\n\n这篇文章的目的是什么？",
            },
            ["모임 알리고 신청 받기", "도서 반납 독촉", "도서관 휴관 알림", "시험 일정 안내"],
            0,
            ["reading:목적", "vocab:모임"],
            {"emoji": ["📢", "✍️"], "en": "notice · write name", "ko": "알림·이름", "zh": "通知·写名字"},
            [
                "Purpose: why was this notice written?",
                "Look for event day + “write your name by…” — invite + sign-up.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "目的：为什么写这份通知？",
                "看活动日 + “周五前写下名字” — 告知并报名。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "목적: 이 글을 왜 썼나요?",
                "모임 날 + 이름 적기 = 알림·신청.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "Announces a meetup and asks people to sign up by Friday.",
                "zh": "告知聚会并请周五前报名。",
                "ko": "모임을 알리고 금요일까지 신청받음.",
            },
            {
                "1": {
                    "en": "Why not book return reminder? No late books — speaking meetup.",
                    "zh": "为什么不是催还书？没有逾期书，是口语聚会。",
                    "ko": "왜 반납 독촉이 아니에요? 말하기 모임이에요.",
                },
                "2": {
                    "en": "Why not closed day? Library is open for the meetup.",
                    "zh": "为什么不是闭馆？图书馆为聚会开放。",
                    "ko": "왜 휴관이 아니에요? 모임이 있어요.",
                },
                "3": {
                    "en": "Why not exam schedule? No test date — speaking club.",
                    "zh": "为什么不是考试安排？没有考试，是口语会。",
                    "ko": "왜 시험이 아니에요? 말하기 모임이에요.",
                },
            },
            "Purpose of a short notice — event + sign-up.",
        ),
        mcq(
            "v4-02",
            "content",
            {
                "ko": "※ 다음을 읽고 내용과 같은 것을 고르십시오.\n\n유나는 매일 버스를 타고 학교에 갑니다. 오늘은 비가 와서 우산을 가지고 갔습니다.",
                "en": "※ Choose what matches the text.\n\nYuna takes the bus to school every day. Today it rained, so she took an umbrella.",
                "zh": "※ 选择与内容一致的一项。\n\nYuna每天坐公交去学校。今天下雨，所以她带了伞。",
            },
            [
                "오늘은 우산을 가지고 감",
                "오늘은 걸어서 감",
                "비가 안 옴",
                "지하철을 탐",
            ],
            0,
            ["reading:내용", "vocab:우산"],
            {"emoji": ["🚌", "☂️"], "en": "bus · umbrella", "ko": "버스·우산", "zh": "公交·伞"},
            [
                "Content check: which choice is true in the text?",
                "Today + rain → she brought something for rain.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "内容核对：哪一项与文章相符？",
                "今天 + 下雨 → 带了防雨的东西。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "내용 확인: 글과 같은 것은?",
                "오늘 + 비 → 우산.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "비가 와서 우산을 가지고 갔습니다 → brought an umbrella today.",
                "zh": "下雨所以带了伞。",
                "ko": "우산을 가지고 갔습니다.",
            },
            {
                "1": {
                    "en": "Why not walk? She takes the bus every day — walking not said.",
                    "zh": "为什么不是走路？文中是坐公交。",
                    "ko": "왜 걸어감이 아니에요? 버스를 타요.",
                },
                "2": {
                    "en": "Why not “no rain”? The text says it rained today.",
                    "zh": "为什么不是“没下雨”？文中说今天下雨。",
                    "ko": "왜 비 안 옴이 아니에요? 비가 왔어요.",
                },
                "3": {
                    "en": "Why not subway? Transport named is bus.",
                    "zh": "为什么不是地铁？交通工具是公交。",
                    "ko": "왜 지하철이 아니에요? 버스예요.",
                },
            },
            "Content match with a short everyday paragraph.",
        ),
        mcq(
            "v4-03",
            "order",
            {
                "ko": "※ 다음 문장을 순서대로 맞게 배열한 것을 고르십시오.\n\n(가) 그래서 택시를 탔습니다.\n(나) 오늘 아침에 버스를 놓쳤습니다.\n(다) 학교에 조금 늦게 도착했습니다.",
                "en": "※ Choose the correct order.\n\n(가) So I took a taxi.\n(나) This morning I missed the bus.\n(다) I arrived at school a little late.",
                "zh": "※ 选择正确顺序。\n\n(가) 所以坐了出租车。\n(나) 今天早上误了公交。\n(다) 稍微晚到了学校。",
            },
            ["(나)-(가)-(다)", "(가)-(나)-(다)", "(다)-(나)-(가)", "(나)-(다)-(가)"],
            0,
            ["reading:순서", "vocab:버스"],
            {"emoji": ["🚌", "🚕"], "en": "bus · taxi", "ko": "버스·택시", "zh": "公交·出租"},
            [
                "Order: cause → result → later result.",
                "Missed bus first, then taxi (그래서), then late arrival.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "顺序：原因 → 结果 → 之后结果。",
                "先误公交，再坐出租（그래서），然后迟到。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "순서: 원인 → 결과 → 나중.",
                "버스 놓침 → 그래서 택시 → 늦게 도착.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "(나) miss bus → (가) so taxi → (다) arrive late.",
                "zh": "(나)误公交 → (가)所以出租 → (다)迟到。",
                "ko": "(나)-(가)-(다).",
            },
            {
                "1": {
                    "en": "Why not (가) first? 그래서 needs a reason before it.",
                    "zh": "为什么不是(가)开头？「그래서」前面要有原因。",
                    "ko": "왜 (가) 먼저가 아니에요? 「그래서」 앞에 이유가 필요해요.",
                },
                "2": {
                    "en": "Why not late first? Arrival is the end of the story.",
                    "zh": "为什么不是先迟到？到达是结尾。",
                    "ko": "왜 (다) 먼저가 아니에요? 도착은 마지막이에요.",
                },
                "3": {
                    "en": "Why skip taxi before arriving? 그래서 links miss→taxi, then late.",
                    "zh": "为什么先到再坐车？因果是误车→出租→迟到。",
                    "ko": "왜 택시 없이 도착이 먼저예요? (나)-(가)-(다)예요.",
                },
            },
            "Sentence order with 그래서 linking cause and result.",
        ),
        mcq(
            "v4-04",
            "notice",
            {
                "ko": "※ 다음을 읽고 물음에 답하십시오.\n\n[버스 안내]\n이 버스는 시장에 갑니다.\n마지막 정류장: 시장\n\n이 버스의 마지막 정류장은 어디입니까?",
                "en": "※ Read and answer.\n\n[Bus info]\nThis bus goes to the market.\nLast stop: market\n\nWhere is the last stop?",
                "zh": "※ 阅读并答题。\n\n[公交提示]\n这班车去市场。\n终点站：市场\n\n终点站在哪里？",
            },
            ["시장", "학교", "병원", "공항"],
            0,
            ["reading:글", "vocab:버스"],
            {"emoji": ["🚌", "🛒"], "en": "bus · market", "ko": "버스·시장", "zh": "公交·市场"},
            [
                "Notice: find the last stop line.",
                "Look for 마지막 정류장 — do not guess from other places.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "告示：找终点站那一行。",
                "看 마지막 정류장 — 不要猜其他地点。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "안내문: 마지막 정류장 줄.",
                "「마지막 정류장」을 보세요. 다른 장소 짐작 금지.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "마지막 정류장: 시장.",
                "zh": "终点站：市场。",
                "ko": "마지막 정류장: 시장.",
            },
            {
                "1": {
                    "en": "Why not school? The notice names market as last stop.",
                    "zh": "为什么不是学校？告示写的是市场。",
                    "ko": "왜 학교가 아니에요? 시장이에요.",
                },
                "2": {
                    "en": "Why not hospital? Not written on the notice.",
                    "zh": "为什么不是医院？告示没写。",
                    "ko": "왜 병원이 아니에요? 안내에 없어요.",
                },
                "3": {
                    "en": "Why not airport? Destination line says market.",
                    "zh": "为什么不是机场？写的是市场。",
                    "ko": "왜 공항이 아니에요? 시장이에요.",
                },
            },
            "Notice reading: last stop line (no answer leak in early steps).",
        ),
        mcq(
            "v4-05",
            "topic",
            {
                "ko": "※ 다음은 무엇에 대한 이야기입니까?\n\n저는 주말에 공원에서 산책합니다. 가끔 친구와 같이 자전거를 타기도 합니다.",
                "en": "※ What is this about?\n\nOn weekends I walk in the park. Sometimes I also ride a bike with a friend.",
                "zh": "※ 这段在说什么？\n\n周末我在公园散步。有时也和朋友一起骑自行车。",
            },
            ["주말 여가", "시험 공부", "회사 야근", "병원 진료"],
            0,
            ["reading:주제", "vocab:주말"],
            {"emoji": ["🌳", "🚲"], "en": "park · bike", "ko": "공원·자전거", "zh": "公园·自行车"},
            [
                "Topic = the whole text, not one noun only.",
                "Weekend + park walk + bike with friend → free-time activity.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "主题 = 整段，不只看一个词。",
                "周末 + 公园散步 + 骑车 → 休闲。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "주제 = 글 전체.",
                "주말 + 공원 + 자전거 → 여가.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "Weekend park walk and bike = leisure.",
                "zh": "周末公园散步骑车 = 休闲。",
                "ko": "주말 여가.",
            },
            {
                "1": {
                    "en": "Why not exam study? No books/tests — park and bike.",
                    "zh": "为什么不是考试学习？没有书本，是公园骑车。",
                    "ko": "왜 시험이 아니에요? 공원·자전거예요.",
                },
                "2": {
                    "en": "Why not overtime? Workplace not mentioned.",
                    "zh": "为什么不是加班？没有公司。",
                    "ko": "왜 야근이 아니에요? 주말 공원이에요.",
                },
                "3": {
                    "en": "Why not hospital visit? Health clinic not in the text.",
                    "zh": "为什么不是看病？没有医院。",
                    "ko": "왜 병원이 아니에요? 산책·자전거예요.",
                },
            },
            "Topic of a short leisure paragraph.",
        ),
        mcq(
            "v4-06",
            "blank",
            {
                "ko": "※ 빈칸에 들어갈 알맞은 것을 고르십시오.\n\n날씨가 추워요. 창문을 (    ) 주세요.",
                "en": "※ Choose the best word for the blank.\n\n날씨가 추워요. 창문을 (    ) 주세요.",
                "zh": "※ 选择填入空格的最佳词语。\n\n날씨가 추워요. 창문을 (    ) 주세요.",
            },
            ["닫아", "열어", "읽어", "만나"],
            0,
            ["grammar:요청", "vocab:창문"],
            {"emoji": ["🪟", "🧥"], "en": "window · cold", "ko": "창문·추위", "zh": "窗户·冷"},
            [
                "Request: do something to the window because it is cold.",
                "Cold outside → you usually shut the window, then 주세요.",
                "Use the pattern contrast — pick the choice yourself.",
            ],
            [
                "请求：因为冷，对窗户做什么。",
                "外面冷 → 通常关上窗户，再加 주세요。",
                "只看对照句式，自己从选项里选。",
            ],
            [
                "요청: 추워서 창문을 어떻게?",
                "추움 → 창문을 닫는 동사 + 주세요.",
                "짝/대조만 보고, 보기에서 스스로 고르세요.",
            ],
            {
                "en": "추워요 → 창문을 닫아 주세요.",
                "zh": "冷 → 请关窗。",
                "ko": "창문을 닫아 주세요.",
            },
            {
                "1": {
                    "en": "Why not open? Opening makes it colder when it is already cold.",
                    "zh": "为什么不是开？已经冷了再开会更冷。",
                    "ko": "왜 열어가 아니에요? 추워요.",
                },
                "2": {
                    "en": "Why not read? 읽다 is for books, not windows.",
                    "zh": "为什么不是读？读用于书，不是窗户。",
                    "ko": "왜 읽어가 아니에요? 창문이에요.",
                },
                "3": {
                    "en": "Why not meet? 만나다 is people, not windows.",
                    "zh": "为什么不是见？见的是人，不是窗户。",
                    "ko": "왜 만나가 아니에요? 창문이에요.",
                },
            },
            "Cold → close the window + 주세요 (verb first, then polite ask).",
        ),
    ],
}


TITLE_UPDATES = {
    "verified-listen-01.json": {
        "en": "jabi. Listening · Set 1 (match · everyday)",
        "ko": "jabi. 듣기 연습 1 (일치·일상)",
        "zh": "jabi. 听力 · 套题 1（一致·日常）",
    },
    "verified-read-01.json": {
        "en": "jabi. Reading · Set 1 (grammar · topic · notice)",
        "ko": "jabi. 읽기 연습 1 (문법·주제·안내)",
        "zh": "jabi. 阅读 · 套题 1（语法·主题·告示）",
    },
    "verified-read-02.json": {
        "en": "jabi. Reading · Set 2 (grammar · notice · topic)",
        "ko": "jabi. 읽기 연습 2 (문법·안내·주제)",
        "zh": "jabi. 阅读 · 套题 2（语法·告示·主题）",
    },
    "verified-read-03.json": {
        "en": "jabi. Reading · Set 3 (final-style practice)",
        "ko": "jabi. 읽기 연습 3 (최종 연습용)",
        "zh": "jabi. 阅读 · 套题 3（最终练习）",
    },
}


def main():
    for name, bank in [
        ("verified-listen-02.json", LISTEN_02),
        ("verified-read-04.json", READ_04),
    ]:
        path = DATA / name
        path.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {path.name} n={len(bank['questions'])}")

    for name, title in TITLE_UPDATES.items():
        path = DATA / name
        d = json.loads(path.read_text(encoding="utf-8"))
        d["title"] = title
        note = d.get("sourceNote") or ""
        if "Research-fill #3" not in note:
            d["sourceNote"] = (
                note.rstrip(".")
                + ". Research-fill #3: titles aligned to TOPIK I section labels; official format only."
            )
        d["verifiedAt"] = "2026-07-26"
        path.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"retitled {name}")


if __name__ == "__main__":
    main()

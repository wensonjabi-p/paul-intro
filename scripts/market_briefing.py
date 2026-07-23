#!/usr/bin/env python3
"""Generate market briefing and post to Notion DB (+ push via People + comment)."""
from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone, timedelta
from typing import Any

import requests

# --- Config (env) ---
NOTION_TOKEN = os.environ["NOTION_TOKEN"]
NOTION_DATABASE_ID = os.environ.get(
    "NOTION_DATABASE_ID", "8aa7fba139d54c51af5afefc206a74fc"
)
NOTION_USER_ID = os.environ.get(
    "NOTION_USER_ID", "28caa677-f697-490a-b110-07e712ccf474"
)
PORTFOLIO_PAGE_ID = os.environ.get(
    "NOTION_PORTFOLIO_PAGE_ID", "3a66d7c8-3f44-81aa-a071-c192c86e200f"
)

AI_API_KEY = os.environ.get("AI_API_KEY") or os.environ.get("DEEPSEEK_API_KEY")
AI_BASE_URL = os.environ.get("AI_BASE_URL", "https://api.deepseek.com/v1")
AI_MODEL = os.environ.get("AI_MODEL", "deepseek-chat")

NOTION_VERSION = "2022-06-28"
TZ = timezone(timedelta(hours=8))

SLOTS = {
    "morning": {
        "label": "🌅 아침 통합",
        "focus": "미국 장후 + 한국 장전",
    },
    "midday": {
        "label": "☀️ 정오 체크",
        "focus": "한국 오전장 + 포트 손익",
    },
    "kr_close": {
        "label": "🇰🇷 장마감",
        "focus": "한국 종가 + 내일 시나리오",
    },
    "us_premarket": {
        "label": "🇺🇸 미장전",
        "focus": "미국 선물 + 보유 미국주",
    },
}

SYSTEM = """You are a Korean market briefing assistant for Paul Bhang's portfolio.
Return ONLY valid JSON (no markdown fences) with keys:
- title: string e.g. "[7/23] 🌅 아침 통합"
- composite_score: number 0-100
- position_signal: one of "100% 매수","50% 분할","25% 축소","현금"
- kospi: string short
- kosdaq: string short
- sp500: string short
- port_kr: string short
- port_us: string short
- key_action: string one line Korean
- push_line: string one line for mobile notification
- body: string Notion-friendly markdown, 500-700 chars, sections with ## headers

Scoring: composite = momentum*0.35 + value*0.40 + fg_contrarian*0.25
Position: >=58 100% | 42-57 50% | 30-41 25% | <30 cash
Clusters: A semi, B index, C hanwha/securities/hitepharm, D robot, E SCHD/XLV
Disclaimer: information only, not investment advice."""


def notion_headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def fetch_portfolio_summary() -> str:
    r = requests.get(
        f"https://api.notion.com/v1/blocks/{PORTFOLIO_PAGE_ID}/children?page_size=100",
        headers=notion_headers(),
        timeout=60,
    )
    r.raise_for_status()
    lines: list[str] = []
    for block in r.json().get("results", []):
        t = block.get("type")
        data = block.get(t, {})
        rich = data.get("rich_text") or data.get("text") or []
        text = "".join(part.get("plain_text", "") for part in rich)
        if text.strip():
            lines.append(text.strip())
    return "\n".join(lines[:80]) or "(portfolio page empty)"


def call_ai(slot_key: str, portfolio: str) -> dict[str, Any]:
    slot = SLOTS[slot_key]
    today = datetime.now(TZ).strftime("%Y-%m-%d")
    user = f"""Today: {today} (UTC+8)
Slot: {slot['label']} — {slot['focus']}

Portfolio reference:
{portfolio[:6000]}

Search your knowledge for latest KOSPI/KOSDAQ/US market if needed.
Generate today's briefing JSON."""

    r = requests.post(
        f"{AI_BASE_URL.rstrip('/')}/chat/completions",
        headers={
            "Authorization": f"Bearer {AI_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": AI_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": user},
            ],
            "temperature": 0.4,
        },
        timeout=120,
    )
    r.raise_for_status()
    content = r.json()["choices"][0]["message"]["content"].strip()
    content = re.sub(r"^```(?:json)?\s*", "", content)
    content = re.sub(r"\s*```$", "", content)
    return json.loads(content)


def rich_text(content: str) -> list[dict]:
    return [{"type": "text", "text": {"content": content[:2000]}}]


def markdown_to_blocks(md: str) -> list[dict]:
    blocks: list[dict] = []
    for line in md.splitlines():
        line = line.rstrip()
        if not line.strip():
            continue
        if line.startswith("## "):
            blocks.append(
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {"rich_text": rich_text(line[3:].strip())},
                }
            )
        elif line.startswith("- "):
            blocks.append(
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {"rich_text": rich_text(line[2:].strip())},
                }
            )
        else:
            blocks.append(
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": rich_text(line.strip())},
                }
            )
    return blocks[:100]


def create_briefing_page(data: dict[str, Any], slot_key: str) -> str:
    slot = SLOTS[slot_key]
    today = datetime.now(TZ).strftime("%Y-%m-%d")
    db_id = NOTION_DATABASE_ID.strip()
    props = {
        "제목": {"title": rich_text(data.get("title", f"[{today}] {slot['label']}"))},
        "날짜": {"date": {"start": today}},
        "슬롯": {"select": {"name": slot["label"]}},
        "복합점수": {"number": float(data.get("composite_score", 50))},
        "포지션신호": {"select": {"name": data.get("position_signal", "50% 분할")}},
        "코스피": {"rich_text": rich_text(str(data.get("kospi", "—")))},
        "코스닥": {"rich_text": rich_text(str(data.get("kosdaq", "—")))},
        "S&P500": {"rich_text": rich_text(str(data.get("sp500", "—")))},
        "포트손익(KR)": {"rich_text": rich_text(str(data.get("port_kr", "—")))},
        "포트손익(US)": {"rich_text": rich_text(str(data.get("port_us", "—")))},
        "핵심액션": {"rich_text": rich_text(str(data.get("key_action", "—")))},
        "알림": {"people": [{"id": NOTION_USER_ID}]},
    }
    children = markdown_to_blocks(str(data.get("body", "")))
    payload: dict[str, Any] = {
        "parent": {"database_id": db_id},
        "properties": props,
    }
    if children:
        payload["children"] = children

    r = requests.post(
        "https://api.notion.com/v1/pages",
        headers=notion_headers(),
        json=payload,
        timeout=60,
    )
    if not r.ok:
        print(r.status_code, r.text, file=sys.stderr)
        r.raise_for_status()
    page_id = r.json()["id"]
    return page_id


def add_push_comment(page_id: str, push_line: str) -> None:
    r = requests.post(
        "https://api.notion.com/v1/comments",
        headers=notion_headers(),
        json={
            "parent": {"page_id": page_id},
            "rich_text": [
                {
                    "type": "mention",
                    "mention": {"type": "user", "user": {"id": NOTION_USER_ID}},
                },
                {
                    "type": "text",
                    "text": {"content": f" 📊 {push_line[:500]}"},
                },
            ],
        },
        timeout=30,
    )
    r.raise_for_status()


def main() -> None:
    if len(sys.argv) < 2 or sys.argv[1] not in SLOTS:
        print(f"Usage: {sys.argv[0]} [{'|'.join(SLOTS)}]", file=sys.stderr)
        sys.exit(1)
    slot_key = sys.argv[1]
    if not AI_API_KEY:
        print("Missing AI_API_KEY or DEEPSEEK_API_KEY", file=sys.stderr)
        sys.exit(1)

    portfolio = fetch_portfolio_summary()
    data = call_ai(slot_key, portfolio)
    page_id = create_briefing_page(data, slot_key)
    add_push_comment(page_id, data.get("push_line", data.get("key_action", "브리핑")))
    print(json.dumps({"ok": True, "page_id": page_id, "title": data.get("title")}))


if __name__ == "__main__":
    main()

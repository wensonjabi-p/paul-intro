# -*- coding: utf-8 -*-
"""One-shot: enrich Hangul/Basics/TOPIK grammar explain + why. No commit."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANGUL = ROOT / "hub/app/data/hangul/track-manifest.json"
BASIC_DIR = ROOT / "hub/app/data"
TOPIK_FILES = [
    "verified-listen-01.json",
    "verified-listen-02.json",
    "verified-read-01.json",
    "verified-read-02.json",
    "verified-read-03.json",
    "verified-read-04.json",
]


def loc(en: str, ko: str, zh: str) -> dict:
    return {"en": en, "ko": ko, "zh": zh}


def explain_mod(title_en, title_ko, title_zh, body_en, body_ko, body_zh, examples=None):
    m = {
        "type": "explain",
        "status": "ready",
        "step": "teach",
        "label": loc("Grammar", "문법", "语法"),
        "title": loc(title_en, title_ko, title_zh),
        "body": loc(body_en, body_ko, body_zh),
    }
    if examples:
        m["examples"] = examples
    return m


def insert_after_first_explain(modules: list, new_mods: list) -> list:
    out = []
    inserted = False
    for m in modules:
        out.append(m)
        if not inserted and m.get("type") == "explain":
            out.extend(new_mods)
            inserted = True
    if not inserted:
        # before first examples or after intro
        idx = next((i for i, m in enumerate(out) if m.get("type") == "examples"), len(out))
        out[idx:idx] = new_mods
    return out


def enrich_hangul_explain(m: dict, extra: dict | None = None) -> dict:
    """Add label Grammar to existing explain; optionally overwrite body/title."""
    m = dict(m)
    m["label"] = loc("Grammar", "문법", "语法")
    if extra:
        m.update(extra)
    return m


def patch_hangul():
    data = json.loads(HANGUL.read_text(encoding="utf-8"))
    extras = {
        "hangul-00": [
            explain_mod(
                "Syllable block rule",
                "음절 블록 규칙",
                "音节块规则",
                "One spoken syllable ≈ one square. Jobs: initial + vowel + optional final. Empty initial → silent ㅇ seat (아). Same letter ㅇ as final = ng (강) — train the slot, not the shape alone.",
                "소리 음절 ≈ 네모 하나. 일: 초성+중성+(선택)종성. 초성 비면 ㅇ이 자리만(아). 같은 ㅇ이 종성이면 ng(강) — 글자보다 자리.",
                "一声节约一块。职：声母+元音+可选韵尾。无声母用静音ㅇ(아)。韵尾ㅇ=ng(강)——先看槽位。",
                examples=[
                    {"ko": "아", "gloss": loc("silent ㅇ + ㅏ", "ㅇ(무음)+ㅏ", "静音ㅇ+ㅏ")},
                    {"ko": "강", "gloss": loc("ㄱ+ㅏ+ㅇ ng", "ㄱ+ㅏ+종성 ㅇ", "ㄱ+ㅏ+韵尾ㅇ")},
                ],
            )
        ],
        "hangul-10": [
            explain_mod(
                "7 representative finals",
                "7대표 받침",
                "七代表收音",
                "Beginner reading uses seven final sounds: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ. Keep them short/unreleased — no English “uh” after (밥 ≠ ba-buh). Final ㅇ is ng, never silent.",
                "초급 읽기는 끝소리 일곱: ㄱㄴㄷㄹㅁㅂㅇ. 짧게·미방출 — 영어식 ‘어’ 금지(밥 ≠ ba-buh). 종성 ㅇ=ng(무음 아님).",
                "初学尾音七个：ㄱㄴㄷㄹㅁㅂㅇ。短促不爆破——勿加英文 uh。韵尾ㅇ=ng。",
                examples=[
                    {"ko": "밥", "gloss": loc("[ㅂ] stop, no puff", "[ㅂ] 막힘·짧게", "[ㅂ] 塞、短")},
                    {"ko": "강", "gloss": loc("[ㅇ]=ng", "[ㅇ]=ng", "[ㅇ]=ng")},
                ],
            )
        ],
        "hangul-11": [
            explain_mod(
                "Final sound shortcuts",
                "끝소리 줄임",
                "尾音归并",
                "Many letters share a final sound when alone: ㅅ/ㅆ/ㅈ/ㅊ/ㅌ… often feel like [ㄷ]; ㅋ/ㄲ → [ㄱ]; ㅍ → [ㅂ]. Eyes first, then listen — don’t freeze on every new shape.",
                "혼자 있을 때 여러 글자가 같은 끝소리: ㅅㅆㅈㅊㅌ… ≈ [ㄷ] · ㅋㄲ→[ㄱ] · ㅍ→[ㅂ]. 눈 먼저, 듣기는 나중.",
                "单独时多字同尾音：ㅅㅆㅈㅊ…≈[ㄷ]；ㅋㄲ→[ㄱ]；ㅍ→[ㅂ]。先眼后耳。",
                examples=[
                    {"ko": "옷", "gloss": loc("reads like [ㄷ] end", "끝 [ㄷ] 느낌", "尾近[ㄷ]")},
                    {"ko": "밖", "gloss": loc("ㄲ → [ㄱ] feel", "ㄲ→[ㄱ]", "ㄲ→[ㄱ]")},
                ],
            )
        ],
        "hangul-13": [
            explain_mod(
                "Double finals = two letters",
                "겹받침 = 글자 둘",
                "双收音=两字",
                "Clusters (ㅄ, ㄺ, ㄵ…) write two consonants under the vowel. Alone, you usually hear one; before a vowel, liaison can move a sound. Spot the cluster before memorizing every rule.",
                "ㅄ·ㄺ·ㄵ 등은 모음 아래 자음 둘. 단독은 대개 소리 하나 · 다음이 모음이면 연음 가능. 규칙 암기 전에 묶음부터 찾기.",
                "ㅄ/ㄺ等在元音下写两辅音。单独常听一个；后接元音可连音。先看见双字。",
                examples=[
                    {"ko": "없다", "gloss": loc("ㅄ cluster", "ㅄ 묶음", "ㅄ 双字")},
                    {"ko": "읽다", "gloss": loc("ㄺ cluster", "ㄺ 묶음", "ㄺ 双字")},
                ],
            )
        ],
        "hangul-14": [
            explain_mod(
                "Liaison into empty ㅇ",
                "빈 ㅇ으로 연음",
                "空ㅇ连音",
                "When the next syllable starts with silent ㅇ, the previous final often moves over (꽃이 → 꼬치 feel). Practice slow chunks → normal. Advanced nasalization can wait.",
                "다음 초성이 무음 ㅇ이면 앞 받침이 넘어가는 경우가 많음(꽃이). 느림(세 덩어리)→보통. 비음화는 후속.",
                "下一音节静音ㅇ时，前收音常移过去（꽃이）。慢拆→常速。鼻音化稍后。",
                examples=[
                    {"ko": "한국어", "gloss": loc("받침 moves before 어", "국어 앞 연음", "收音前移")},
                    {"ko": "있어요", "gloss": loc("ㅆ + 어 feel", "ㅆ+어 느낌", "ㅆ+어")},
                ],
            )
        ],
        "hangul-16": [
            explain_mod(
                "Polite ending taste",
                "존댓말 어미 맛보기",
                "敬体语尾初尝",
                "Survival lines often end in -요 / -습니다 family. Here the goal is still Hangul decoding — Basics track deepens conversation grammar.",
                "생존 문장은 자주 -요/-습니다 계열로 끝남. 여기는 한글 디코드가 목표 — 대화 문법은 기초 수업.",
                "生存句常以-요/-습니다收尾。这里仍是识字——会话语法在基础课。",
                examples=[
                    {"ko": "감사합니다", "gloss": loc("formal polite feel", "격식 공손", "正式敬体")},
                    {"ko": "안녕하세요", "gloss": loc("-요 polite", "-요 공손", "-요敬体")},
                ],
            )
        ],
        "hangul-17": [
            explain_mod(
                "Question ending feel",
                "물음 어미 맛보기",
                "疑问语尾初尝",
                "Questions often keep the same polite coat (-요?) while pitch/particle marks the ask. Decode the Hangul first; meaning practice continues in Basics.",
                "물음도 같은 공손 코트(-요?)를 쓰며 억양·조사로 묻는다. 글자 먼저 — 뜻 연습은 기초 수업.",
                "疑问常用同一敬体(-요?)，靠语调/助词提问。先识字——意义在基础课。",
                examples=[
                    {"ko": "어디예요?", "gloss": loc("where? polite", "어디? 공손", "哪里？敬")},
                    {"ko": "얼마예요?", "gloss": loc("how much?", "얼마?", "多少钱？")},
                ],
            )
        ],
    }

    for les in data["lessons"]:
        lid = les["id"]
        mods = les.get("modules") or []
        # label existing explains
        new_mods = []
        for m in mods:
            if m.get("type") == "explain":
                new_mods.append(enrich_hangul_explain(m))
            else:
                new_mods.append(m)
        if lid in extras:
            # Avoid duplicating if already patched (title present on a later explain)
            already = any(
                m.get("type") == "explain" and m.get("title") for m in new_mods
            )
            if not already:
                new_mods = insert_after_first_explain(new_mods, extras[lid])
            else:
                # refresh labels only already done
                pass
        les["modules"] = new_mods

    data["updated"] = "2026-07-27"
    HANGUL.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("hangul patched")


BASIC_UNITS = {
    "draft-basic-unit01-greetings.json": {
        "explain": loc(
            "Two decisions this unit: (1) 이에요 after a name with 받침, 예요 with none. (2) 은/는 marks the topic — what the sentence is about (저는…). Do not treat them as English a/the.",
            "이 단원 결정 둘: (1) 이름에 받침→이에요 · 없으면 예요. (2) 은/는은 주제(저는…). 영어 a/the로 옮기지 마세요.",
            "本课两个决定：(1)名字有收音→이에요，无→예요。(2)은/는标话题(저는…)。别当成英文冠词。",
        ),
        "teach_body": loc(
            "받침 → 이에요 · no 받침 → 예요. 저는 = topic (은/는). Listen for the name’s last sound, not English spelling. Contrast later with 이/가 (new focus) in Blog FAQ.",
            "받침 있으면 이에요 · 없으면 예요. 「저는」=주제(은/는). 영어 철자보다 끝소리. 이/가(새 초점)는 글모음 FAQ.",
            "有收音→이에요，无→예요。「저는」=话题。看尾音。이/가见博客FAQ。",
        ),
        "grammarCards": [
            {
                "id": "ieyo-yeyo",
                "title": loc("이에요 / 예요", "이에요 / 예요", "이에요 / 예요"),
                "body": loc(
                    "After a noun: if it ends in a consonant (받침) → 이에요. If it ends in a vowel → 예요. Same meaning (“am/is/are” linking).",
                    "명사 뒤: 받침 있으면 이에요 · 모음으로 끝나면 예요. 뜻은 같음(이다 계열).",
                    "名词后：有收音→이에요；元音结尾→예요。意思相同。",
                ),
                "examples": [
                    {"ko": "민준이에요.", "gloss": loc("준 has ㄴ → 이에요", "준에 ㄴ → 이에요", "준有ㄴ→이에요")},
                    {"ko": "민수예요.", "gloss": loc("수 no 받침 → 예요", "수 받침 없음 → 예요", "수无收音→예요")},
                ],
            },
            {
                "id": "eunneun",
                "title": loc("은 / 는 (topic)", "은 / 는 (주제)", "은 / 는（话题）"),
                "body": loc(
                    "은 after 받침, 는 after vowel. Marks the frame (“as for…”). Soft spotlight — not the same job as subject-focus 이/가.",
                    "받침 뒤 은 · 모음 뒤 는. 「…에 대해」틀. 조명은 부드럽게 — 이/가(주어 초점)와 역할이 다름.",
                    "收音后은、元音后는。标“关于…”。轻焦点——与이/가不同。",
                ),
                "examples": [
                    {"ko": "저는 학생이에요.", "gloss": loc("As for me…", "나는 주제", "至于我…")},
                    {"ko": "중국 사람이에요.", "gloss": loc("Nationality line", "국적 한 줄", "国籍一句")},
                ],
            },
        ],
        "why": {
            "basic-01-01": loc(
                "민준 ends with 받침 ㄴ → link with 이에요 (not 예요).",
                "민준은 받침 ㄴ으로 끝 → 이에요(예요 아님).",
                "민준以ㄴ收音结尾→이에요。",
            ),
            "basic-01-02": loc(
                "유키 ends with a vowel sound → 예요.",
                "유키는 모음으로 끝 → 예요.",
                "유키元音结尾→예요。",
            ),
            "basic-01-03": loc(
                "저는 marks the speaker as topic (은/는). Country + 사람이에요.",
                "저는=화자 주제(은/는). 나라+사람이에요.",
                "저는=话题。国家+사람이에요。",
            ),
            "basic-01-04": loc(
                "Polite greeting opener — 안녕하세요? before name lines.",
                "공손 인사 오프너 — 이름 전에 안녕하세요?",
                "敬体开场：안녕하세요？",
            ),
            "basic-01-05": loc(
                "Reply to 만나서 반가워요 with 저도 반가워요 (same polite coat).",
                "만나서 반가워요 → 저도 반가워요(같은 공손).",
                "回应반가워요：저도 반가워요。",
            ),
            "basic-01-06": loc(
                "Name + 이에요/예요 follows the 받침 rule from teach.",
                "이름+이에요/예요는 받침 규칙.",
                "名字+이에요/예요跟收音规则。",
            ),
            "basic-01-07": loc(
                "국적: [나라] 사람이에요 — noun + linking ending.",
                "국적: [나라] 사람이에요.",
                "国籍：[国家] 사람이에요。",
            ),
            "basic-01-08": loc(
                "저도 adds “me too” with topic particle feel on 저.",
                "저도=나도(저+도).",
                "저도=我也。",
            ),
        },
    },
    "draft-basic-unit02-daily-life.json": {
        "explain": loc(
            "Present polite: stem + -아요/-어요 (하다→해요). Time often 에 (일곱 시에). Action place 에서 (집에서 쉬어요). Destination: (place)에 가요 — not 에서.",
            "존댓말 현재: 어간+-아요/어요(하다→해요). 시간은 에. 동작 장소는 에서. 목적지는 에 가요(에서 아님).",
            "敬体现在：词干+-아요/어요。时间用에；动作场所用에서；目的地用에 가요。",
        ),
        "teach_body": loc(
            "Pick 아요 vs 어요 by the stem vowel (bright ㅏ/ㅗ → 아요; else often 어요). Clock 에 · do-something-at 에서 · go-to 에 가요.",
            "어간 모음으로 아요/어요 선택(ㅏ/ㅗ→아요). 시계 에 · 동작 장소 에서 · 가기 에 가요.",
            "按词干元音选아요/어요。钟点에；做事场所에서；去某处에 가요。",
        ),
        "grammarCards": [
            {
                "id": "ayo-oyo",
                "title": loc("-아요 / -어요", "-아요 / -어요", "-아요 / -어요"),
                "body": loc(
                    "Attach to the verb/adjective stem for everyday polite present. Common shortcuts: 하다→해요, 가다→가요, 먹다→먹어요.",
                    "어간에 붙여 일상 공손 현재. 자주: 하다→해요, 가다→가요, 먹다→먹어요.",
                    "接词干表日常敬体现在。常见：하다→해요等。",
                ),
                "examples": [
                    {"ko": "공부해요.", "gloss": loc("하다 → 해요", "하다→해요", "하다→해요")},
                    {"ko": "먹어요.", "gloss": loc("먹다 → 어요", "먹다→어요", "먹다→어요")},
                ],
            },
            {
                "id": "e-eseo",
                "title": loc("에 vs 에서", "에 vs 에서", "에 vs 에서"),
                "body": loc(
                    "에: time or destination (일곱 시에 / 학교에 가요). 에서: place where an action happens (카페에서 만나요).",
                    "에: 시간·목적지. 에서: 동작이 일어나는 장소.",
                    "에：时间/目的地。에서：动作发生的场所。",
                ),
                "examples": [
                    {"ko": "일곱 시에 만나요.", "gloss": loc("time 에", "시간 에", "时间에")},
                    {"ko": "집에서 쉬어요.", "gloss": loc("action place 에서", "동작 장소 에서", "动作场所에서")},
                ],
            },
        ],
        "why": {
            "basic-02-01": loc(
                "공부하다 → 공부해요 (하다→해요 shortcut).",
                "공부하다 → 공부해요.",
                "공부하다→공부해요。",
            ),
            "basic-02-02": loc(
                "Action happens at home → 에서 (not destination 에).",
                "동작 장소=집 → 에서(목적지 에 아님).",
                "在家做动作→에서。",
            ),
            "basic-02-03": loc(
                "Clock time takes 에: 일곱 시에.",
                "시계 시간은 에: 일곱 시에.",
                "钟点加에。",
            ),
            "basic-02-04": loc(
                "Destination of 가다 → (place)에 가요.",
                "가다 목적지 → 에 가요.",
                "去某处：에 가요。",
            ),
            "basic-02-05": loc(
                "Polite present for 만나다 → 만나요.",
                "만나다 → 만나요.",
                "만나다→만나요。",
            ),
            "basic-02-06": loc(
                "지금 뭐 해요? asks present activity with -아요/어요.",
                "지금 뭐 해요?=현재 활동.",
                "지금 뭐 해요？问正在做的事。",
            ),
            "basic-02-07": loc(
                "Cafe is where they meet → 에서.",
                "만나는 장소=카페 → 에서.",
                "见面场所→에서。",
            ),
            "basic-02-08": loc(
                "쉬다 → 쉬어요 (stem + 어요).",
                "쉬다 → 쉬어요.",
                "쉬다→쉬어요。",
            ),
        },
    },
    "draft-basic-unit03-cafe.json": {
        "explain": loc(
            "Order pattern: [drink] + (한 잔) + 주세요. Ask price with 얼마예요? Sino-Korean number + 원. 포장이요 vs 여기서 마실게요 chooses take-out vs for-here.",
            "주문: [음료]+(한 잔)+주세요. 가격 얼마예요? 한자어 수+원. 포장 vs 여기서 마시기.",
            "点单：[饮料]+(한 잔)+주세요。问价얼마예요？汉字数+원。外带/堂食。",
        ),
        "teach_body": loc(
            "주세요 softens “please give.” Counter 잔 for cups. Price: 사천 원이에요. Card/cash can follow after the price line.",
            "주세요=부탁. 컵은 잔. 가격 사천 원이에요. 결제 말은 가격 다음.",
            "주세요表请求。잔=杯。价格后再说付款。",
        ),
        "grammarCards": [
            {
                "id": "juseyo",
                "title": loc("… 주세요", "… 주세요", "… 주세요"),
                "body": loc(
                    "Noun + 주세요 = polite request for that thing. Add a counter when natural: 아메리카노 한 잔 주세요.",
                    "명사+주세요=공손 부탁. 자연스러우면 수량: 아메리카노 한 잔 주세요.",
                    "名词+주세요=礼貌请求。可加数量。",
                ),
                "examples": [
                    {"ko": "아메리카노 주세요.", "gloss": loc("drink + please", "음료+부탁", "饮料+请")},
                    {"ko": "물 한 잔 주세요.", "gloss": loc("counter 잔", "잔", "잔")},
                ],
            },
            {
                "id": "olma",
                "title": loc("얼마예요? · 원", "얼마예요? · 원", "얼마예요？·원"),
                "body": loc(
                    "얼마예요? asks the price. Answer with Sino numbers + 원 (사천 원이에요). Not native Korean counters for money.",
                    "얼마예요?=가격. 답은 한자어 수+원. 돈은 고유어 수 아님.",
                    "얼마예요？问价。答：汉字数+원。",
                ),
                "examples": [
                    {"ko": "얼마예요?", "gloss": loc("How much?", "얼마?", "多少钱？")},
                    {"ko": "사천 원이에요.", "gloss": loc("4000 won", "사천 원", "四千원")},
                ],
            },
        ],
        "why": {
            "basic-03-01": loc(
                "Request a drink with noun + 주세요.",
                "음료 명사+주세요.",
                "饮料+주세요。",
            ),
            "basic-03-02": loc(
                "얼마예요? is the price question (이에요/예요 on 얼마).",
                "얼마예요?=가격 물음.",
                "얼마예요？问价。",
            ),
            "basic-03-03": loc(
                "한 잔 = one cup counter after the drink.",
                "한 잔=컵 수량.",
                "한 잔=一杯。",
            ),
            "basic-03-04": loc(
                "포장이요 marks take-out.",
                "포장이요=포장.",
                "포장이요=外带。",
            ),
            "basic-03-05": loc(
                "Sino number + 원 for money amounts.",
                "금액=한자어 수+원.",
                "金额=汉字数+원。",
            ),
            "basic-03-06": loc(
                "여기서 마실게요 = for-here (contrast 포장).",
                "여기서 마실게요=매장(포장 대조).",
                "堂食（对外带）。",
            ),
            "basic-03-07": loc(
                "카드로 결제할게요 — pay-by-card pattern after price.",
                "카드 결제 패턴.",
                "刷卡付款。",
            ),
            "basic-03-08": loc(
                "주세요 again softens the order line.",
                "주문 줄도 주세요.",
                "点单也用주세요。",
            ),
        },
    },
    "draft-basic-unit04-shopping.json": {
        "explain": loc(
            "Stock: 있어요/없어요. Point with 이거 + 얼마예요? Permission: …봐도 돼요? Size/color lines stay noun-heavy; grammar focus is existence + soft permission.",
            "재고 있어요/없어요. 이거+얼마예요? 허락 …봐도 돼요? 사이즈·색은 명사 · 문법은 존재+허락.",
            "库存있어요/없어요。이거问价。…봐도 돼요？表许可。",
        ),
        "teach_body": loc(
            "있어요 asks if something exists/is available. 봐도 돼요? asks permission (돼다 soft). Pointing: 이거.",
            "있어요=있는지. 봐도 돼요?=허락. 가리킴: 이거.",
            "있어요问有没有。봐도 돼요？许可。指：이거。",
        ),
        "grammarCards": [
            {
                "id": "isseoyo",
                "title": loc("있어요 / 없어요", "있어요 / 없어요", "있어요 / 없어요"),
                "body": loc(
                    "있어요 = there is / I have / it’s available. 없어요 = opposite. Great for stock and belongings.",
                    "있어요=있다/있다(재고·소유). 없어요=없다.",
                    "있어요=有；없어요=没有。",
                ),
                "examples": [
                    {"ko": "사이즈 있어요?", "gloss": loc("Do you have the size?", "사이즈 있나요?", "有这码吗？")},
                    {"ko": "다른 색깔 있어요?", "gloss": loc("Another color?", "다른 색?", "其他颜色？")},
                ],
            },
            {
                "id": "doeyo",
                "title": loc("… 봐도 돼요?", "… 봐도 돼요?", "… 봐도 돼요？"),
                "body": loc(
                    "V-아/어 봐도 돼요? ≈ May I try …? Soft permission — common in shops (입어 봐도 돼요?).",
                    "V-아/어 봐도 돼요?=해도 될까요? 매장에서 자주.",
                    "…봐도 돼요？≈可以试试吗？",
                ),
                "examples": [
                    {"ko": "입어 봐도 돼요?", "gloss": loc("May I try it on?", "입어 봐도 될까요?", "可以试穿吗？")},
                    {"ko": "이거 얼마예요?", "gloss": loc("Point + price", "가리킴+가격", "这个多少钱")},
                ],
            },
        ],
        "why": {
            "basic-04-01": loc(
                "있어요 checks availability/stock.",
                "있어요=재고·있는지.",
                "있어요问库存。",
            ),
            "basic-04-02": loc(
                "State size as a noun line the clerk can confirm.",
                "사이즈를 명사로 말하기.",
                "说出尺码。",
            ),
            "basic-04-03": loc(
                "다른 색깔 있어요? uses 있어요 for stock.",
                "다른 색+있어요.",
                "其他颜色+있어요。",
            ),
            "basic-04-04": loc(
                "입어 봐도 돼요? = permission pattern.",
                "입어 봐도 돼요?=허락.",
                "试穿许可。",
            ),
            "basic-04-05": loc(
                "이거 points; 얼마예요? asks price.",
                "이거+얼마예요?",
                "这个多少钱。",
            ),
            "basic-04-06": loc(
                "없어요 = not available.",
                "없어요=없음.",
                "없어요=没有。",
            ),
            "basic-04-07": loc(
                "Decision line: 이거로 할게요.",
                "이거로 할게요=결정.",
                "就这个。",
            ),
            "basic-04-08": loc(
                "영수증 주세요 — noun + 주세요 again.",
                "영수증+주세요.",
                "请给发票。",
            ),
        },
    },
    "draft-basic-unit05-directions.json": {
        "explain": loc(
            "Ask where: [place] 어디예요? Locate: [place]에 있어요. Then guide with 직진하세요 / 왼쪽·오른쪽으로 도세요. 에 here is location/existence — not action-에서.",
            "어디예요? · 에 있어요(위치). 안내: 직진/돌다. 여기서 에는 위치 — 동작 에서와 구분.",
            "어디예요？·에 있어요。指路：直走/转弯。에=位置，不是动作에서。",
        ),
        "teach_body": loc(
            "어디예요 asks where. Existence/location: N에 있어요. Movement cues: 직진 · 돌다. 가까워요 softens distance.",
            "어디예요=어디. N에 있어요=위치. 직진·돌다. 가까워요=거리.",
            "어디예요问哪里。N에 있어요=位置。",
        ),
        "grammarCards": [
            {
                "id": "eodieyo",
                "title": loc("어디예요? · 에 있어요", "어디예요? · 에 있어요", "어디예요？·에 있어요"),
                "body": loc(
                    "어디예요? = Where is it? Answer with place + 에 있어요 (exists/is located at).",
                    "어디예요?=어디. 답: 장소+에 있어요.",
                    "어디예요？答：场所+에 있어요。",
                ),
                "examples": [
                    {"ko": "화장실 어디예요?", "gloss": loc("Where’s the restroom?", "화장실 어디?", "厕所在哪？")},
                    {"ko": "오른쪽에 있어요.", "gloss": loc("It’s on the right", "오른쪽", "在右边")},
                ],
            },
            {
                "id": "directions",
                "title": loc("직진 / 돌다", "직진 / 돌다", "直走 / 转弯"),
                "body": loc(
                    "Guide verbs in polite form: 직진하세요 · 왼쪽으로 도세요. Keep them short — one cue per turn.",
                    "안내: 직진하세요 · 왼쪽으로 도세요. 한 턴에 한 지시.",
                    "指路：직진하세요等。一轮一个指示。",
                ),
                "examples": [
                    {"ko": "직진하세요.", "gloss": loc("Go straight", "직진", "直走")},
                    {"ko": "왼쪽으로 도세요.", "gloss": loc("Turn left", "좌회전", "左转")},
                ],
            },
        ],
        "why": {
            "basic-05-01": loc(
                "어디예요? is the where-question with polite linking ending.",
                "어디예요?=위치 물음.",
                "어디예요？问位置。",
            ),
            "basic-05-02": loc(
                "(place)에 있어요 — location/existence 에 (Sejong-style location).",
                "장소에 있어요 — 위치 에.",
                "场所+에 있어요。",
            ),
            "basic-05-03": loc(
                "직진하세요 = go-straight cue.",
                "직진하세요.",
                "直走。",
            ),
            "basic-05-04": loc(
                "오른쪽으로 도세요 — direction + 돌다 polite.",
                "오른쪽+도세요.",
                "右转。",
            ),
            "basic-05-05": loc(
                "가까워요 softens “it’s nearby.”",
                "가까워요=가깝다.",
                "很近。",
            ),
            "basic-05-06": loc(
                "건너편 / 옆 noun cues for relative place.",
                "건너편·옆 위치 명사.",
                "对面/旁边。",
            ),
            "basic-05-07": loc(
                "저기요 opens a polite ask-to-stranger.",
                "저기요=부르기.",
                "저기요打招呼。",
            ),
            "basic-05-08": loc(
                "Location answer again uses 에 있어요.",
                "답도 에 있어요.",
                "回答仍用에 있어요。",
            ),
        },
    },
    "draft-basic-unit06-food.json": {
        "explain": loc(
            "Headcount: 몇 분이세요? Order dishes with …주세요. Soften spicy with 안 + adjective (안 매운 걸로요). Pay: 계산해 주세요. Praise: 맛있어요.",
            "인원 몇 분이세요? 음식+주세요. 안+형(안 매운). 계산해 주세요. 맛있어요.",
            "人数几位？菜+주세요。안+形。结账주세요。맛있어요。",
        ),
        "teach_body": loc(
            "수량+주세요 for dishes. 안 negates adjectives before the noun (안 매운 걸로). End the meal with 계산해 주세요.",
            "음식+주세요. 안+형용사. 끝은 계산해 주세요.",
            "点菜주세요。안+形。结账。",
        ),
        "grammarCards": [
            {
                "id": "food-juseyo",
                "title": loc("음식 + 주세요", "음식 + 주세요", "菜 + 주세요"),
                "body": loc(
                    "Same request pattern as the café, now for dishes: 비빔밥 주세요. Add people count first if seating asks.",
                    "카페와 같은 부탁, 음식용: 비빔밥 주세요. 좌석이면 인원 먼저.",
                    "与咖啡店同：菜+주세요。先报人数。",
                ),
                "examples": [
                    {"ko": "두 명이에요.", "gloss": loc("two people", "두 명", "两位")},
                    {"ko": "김치찌개 주세요.", "gloss": loc("dish + please", "찌개+부탁", "请给汤")},
                ],
            },
            {
                "id": "an-adj",
                "title": loc("안 + adjective", "안 + 형용사", "안 + 形容词"),
                "body": loc(
                    "안 before an adjective softens/negates: 안 매운 걸로요 (the not-spicy one). Separate from verb 안 + V.",
                    "형용사 앞 안: 안 매운 걸로요. 동사 안+V와는 자리만 기억.",
                    "形前안：안 매운。",
                ),
                "examples": [
                    {"ko": "안 매운 걸로요.", "gloss": loc("not spicy one", "안 매운", "不辣的")},
                    {"ko": "계산해 주세요.", "gloss": loc("Please bring the check", "계산 부탁", "请结账")},
                ],
            },
        ],
        "why": {
            "basic-06-01": loc(
                "몇 분이세요? asks party size (honorific 이세요).",
                "몇 분이세요?=인원.",
                "问几位。",
            ),
            "basic-06-02": loc(
                "Dish noun + 주세요 for the order.",
                "음식+주세요.",
                "菜+주세요。",
            ),
            "basic-06-03": loc(
                "안 매운 걸로요 — 안 + adjective before 걸로.",
                "안+형용사.",
                "안+形。",
            ),
            "basic-06-04": loc(
                "물 좀 주세요 — soft request with 좀.",
                "물+좀+주세요.",
                "请给点水。",
            ),
            "basic-06-05": loc(
                "맛있어요 praises the food (있다→있어요 feel on 맛).",
                "맛있어요=칭찬.",
                "好吃。",
            ),
            "basic-06-06": loc(
                "계산해 주세요 = please calculate/check (request ending).",
                "계산해 주세요=계산 부탁.",
                "请结账。",
            ),
            "basic-06-07": loc(
                "따로따로 asks separate checks when useful.",
                "따로따로=각자 계산.",
                "分开付。",
            ),
            "basic-06-08": loc(
                "Order line again uses …주세요.",
                "주문도 주세요.",
                "点单仍用주세요。",
            ),
        },
    },
}


def patch_basic():
    for fname, patch in BASIC_UNITS.items():
        path = BASIC_DIR / fname
        data = json.loads(path.read_text(encoding="utf-8"))
        data["explain"] = patch["explain"]
        data["grammarCards"] = patch["grammarCards"]
        for step in data.get("steps") or []:
            if step.get("id") == "teach":
                step["body"] = patch["teach_body"]
        why_map = patch["why"]
        for q in data.get("questions") or []:
            qid = q.get("id")
            if qid in why_map:
                q["why"] = why_map[qid]
            elif q.get("why"):
                # generic boost if still tiny
                w = q["why"]
                en = (w.get("en") or "").strip()
                if len(en) < 25:
                    q["why"] = loc(
                        f"Grammar cue: {en}" if en else "Match the unit grammar pattern from teach.",
                        f"문법: {w.get('ko') or en}" if (w.get("ko") or en) else "단원 문법 패턴을 떠올리세요.",
                        f"语法：{w.get('zh') or en}" if (w.get("zh") or en) else "回想本课语法。",
                    )
        # leftover ids not in map — keep but ensure trilingual
        for q in data.get("questions") or []:
            w = q.get("why") or {}
            if "en" in w and "ko" not in w:
                w["ko"] = w["en"]
            if "en" in w and "zh" not in w:
                w["zh"] = w["en"]
            q["why"] = w
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("basic", fname)


TOPIK_WHY = {
    "verified-listen-01.json": {
        "l1-01": loc(
            "Key line 비가 와요 matches the choice about rain falling (온다/와요 present).",
            "핵심 「비가 와요」=비가 온다/와요 현재.",
            "关键句비가 와요＝下雨。",
        ),
        "l1-02": loc(
            "Location phrase 학교 정문 옆에 있어요 — place + 에 있어요 (beside the main gate).",
            "「학교 정문 옆에 있어요」=위치 에 있어요.",
            "学校正门旁边+에 있어요。",
        ),
        "l1-03": loc(
            "볼 거예요 marks future plan — watching a movie fits.",
            "볼 거예요=계획(미래). 영화 보기.",
            "볼 거예요＝打算看电影。",
        ),
        "l1-04": loc(
            "시장에 가요 uses destination 에 + 가다 — market, not city hall (시청).",
            "시장에 가요=목적지 에. 시청과 구분.",
            "去市场에 가요，不是市政府。",
        ),
        "l1-05": loc(
            "네 시에 끝나요 — clock time 에 + end verb.",
            "네 시에 끝나요=시간 에.",
            "四点结束：时间에。",
        ),
    },
    "verified-listen-02.json": {
        "l2-01": loc(
            "지금 뭐 해요? + 책을 읽어요 = present activity with -아요/어요.",
            "지금 뭐 해요? → 책을 읽어요(현재 -아요/어요).",
            "正在读书：-아요/어요。",
        ),
        "l2-02": loc(
            "Menu/drink cues point to a restaurant (식당), not another place type.",
            "메뉴·음료 단서 → 식당.",
            "菜单饮料→餐厅。",
        ),
        "l2-03": loc(
            "일이 많아서 못 가요 — reason + 못 (cannot) before 가다.",
            "일이 많아서 못 가요=이유+못.",
            "事多+못 가요＝去不了。",
        ),
        "l2-04": loc(
            "들어 줄게요 = help-offer -(아/어) 줄게요 (carry for someone).",
            "들어 줄게요=도와줌 줄게요.",
            "들어 줄게요＝帮你拿。",
        ),
        "l2-05": loc(
            "2층 + next to elevator — floor noun + location 옆.",
            "2층+엘리베이터 옆 위치.",
            "二楼电梯旁。",
        ),
    },
    "verified-read-01.json": {
        "v1-01": loc(
            "After a vowel-final noun 친구, use 와 (not 과) for “with.”",
            "친구(모음 끝)→와(함께).",
            "친구元音尾→와。",
        ),
        "v1-02": loc(
            "A보다 B = B compared to A; 커요 closes the polite adjective.",
            "A보다 B · 커요로 끝.",
            "A보다…커요。",
        ),
        "v1-03": loc(
            "…돼도 돼요? / 돼요 = permission OK — “May I speak?”",
            "돼도 돼요?/돼요=허락.",
            "돼요＝可以吗。",
        ),
        "v1-05": loc(
            "도서관에서 빌렸어요 — action place 에서 + past 았어요/었어요.",
            "도서관에서=동작 장소 · 빌렸어요 과거.",
            "在图书馆借：에서+过去。",
        ),
        "v1-06": loc(
            "쉬는 날 marks closed day — Monday line matches.",
            "쉬는 날=휴무(월요일).",
            "休息日＝周一。",
        ),
        "v1-07": loc(
            "-으면 conditional: 비가 오면 … 필요해요.",
            "비가 오면=조건 -으면.",
            "如果下雨：-으면。",
        ),
        "v1-08": loc(
            "People counter 명 after native number 열.",
            "열 명=사람 수 명.",
            "열 명＝十人。",
        ),
        "v1-09": loc(
            "먹지 않아요 = long negation -지 않다 (don’t eat).",
            "먹지 않아요=-지 않다 부정.",
            "먹지 않아요＝不吃。",
        ),
        "v1-10": loc(
            "Pronoun 그것 refers back to the coffee just mentioned.",
            "그것=앞에서 말한 커피.",
            "그것回指咖啡。",
        ),
    },
    "verified-read-02.json": {
        "v2-01": loc(
            "A에서 B까지 = from A to B (path endpoints).",
            "학교에서 집까지=에서~까지.",
            "从学校到家。",
        ),
        "v2-02": loc(
            "보다 + 더 + adjective: sweeter than that apple.",
            "보다 더 달아요=비교.",
            "比…更甜。",
        ),
        "v2-03": loc(
            "도착 cue: destination is the airport — match 공항.",
            "도착 장소=공항.",
            "到达地＝机场。",
        ),
        "v2-04": loc(
            "닫다 + 아/어 주세요 = please close (verb first, then soft request).",
            "닫아 주세요=동사+주세요.",
            "请关上：닫다+주세요。",
        ),
        "v2-05": loc(
            "어디에 있어요? = where + existence location pattern.",
            "어디에 있어요?=위치.",
            "어디에 있어요？",
        ),
        "v2-06": loc(
            "Topic of the hobby sentence is 취미 (요리).",
            "주제=취미(요리).",
            "话题＝爱好。",
        ),
        "v2-07": loc(
            "계세요 is honorific “to be” for father — not 있어요.",
            "계세요=높임 있다(아버지).",
            "계세요＝敬语在。",
        ),
        "v2-08": loc(
            "은/는 topic on 이 책 + 재미있어요.",
            "이 책은=주제 은/는.",
            "这本书：은/는。",
        ),
        "v2-09": loc(
            "병 counter for bottles after native number 세.",
            "세 병=병 수.",
            "三瓶：병。",
        ),
        "v2-10": loc(
            "Text 은행도 쉽니다 matches the closed-bank choice (도 “also”).",
            "은행도 쉽니다=은행 휴무(도).",
            "银行也休息。",
        ),
    },
    "verified-read-03.json": {
        "v3-01": loc(
            "생일 has 받침 → 이에요 (not 예요) after the noun.",
            "생일 받침 → 이에요.",
            "생일有收音→이에요。",
        ),
        "v3-02": loc(
            "지난주에 … 갔어요 — past time + destination 에 + 았어요.",
            "지난주+에 갔어요 과거.",
            "上周去了：过去。",
        ),
        "v3-03": loc(
            "Floor noun 2층 answers location in the restaurant notice.",
            "식당 위치=2층.",
            "二楼。",
        ),
        "v3-04": loc(
            "A와 B 중에서 = choosing between coffee and tea.",
            "와/과 중에서=선택.",
            "之中选。",
        ),
        "v3-05": loc(
            "입으세요 imperative/soft command — reason is cold (추워요).",
            "입으세요 ← 추워요 이유.",
            "因为冷所以穿。",
        ),
        "v3-06": loc(
            "그곳 refers back to 공원 as the place they go.",
            "그곳=공원 지시.",
            "그곳＝公园。",
        ),
        "v3-07": loc(
            "-을 때 marks “when (studying).”",
            "공부할 때=-을 때.",
            "…的时候。",
        ),
        "v3-08": loc(
            "께서 + 드십니다 — honorific subject + honorific eat.",
            "께서+드십니다 높임.",
            "敬语：께서+드십니다。",
        ),
        "v3-09": loc(
            "Time span 오후 2시~4시 → starts at 2 p.m.",
            "2시~4시 → 시작 2시.",
            "从下午2点开始。",
        ),
        "v3-10": loc(
            "Dorm living line matches the residence choice.",
            "기숙사 거주=거처 선택.",
            "住宿舍。",
        ),
    },
    "verified-read-04.json": {
        "v4-01": loc(
            "Notice function: announce meetup + ask signup by Friday (purpose of text).",
            "글 목적: 모임 알림+금요일까지 신청.",
            "通知目的：报名。",
        ),
        "v4-02": loc(
            "-아서/어서 reason: 비가 와서 … 가지고 갔습니다.",
            "비가 와서=이유 -아서.",
            "因为下雨所以带伞。",
        ),
        "v4-03": loc(
            "Order of events: miss bus → taxi → arrive late (sequence).",
            "순서: 버스 놓침→택시→지각.",
            "事件顺序。",
        ),
        "v4-04": loc(
            "마지막 정류장 names the last stop: 시장.",
            "마지막 정류장=시장.",
            "末站＝市场。",
        ),
        "v4-05": loc(
            "Weekend park + bike cues = leisure topic.",
            "주말 공원·자전거=여가.",
            "周末休闲。",
        ),
        "v4-06": loc(
            "추워요 leads to 창문을 닫아 주세요 (cause → soft request).",
            "추워요 → 닫아 주세요.",
            "冷→请关窗。",
        ),
    },
}


def patch_topik():
    for fname, mapping in TOPIK_WHY.items():
        path = BASIC_DIR / fname
        data = json.loads(path.read_text(encoding="utf-8"))
        for q in data.get("questions") or []:
            qid = q.get("id")
            if qid in mapping:
                q["why"] = mapping[qid]
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("topik", fname)


def main():
    patch_hangul()
    patch_basic()
    patch_topik()
    print("done")


if __name__ == "__main__":
    main()

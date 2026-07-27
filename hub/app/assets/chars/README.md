# 자음 캐릭터 에셋 계약

Owner: **Cursor + Claude** (생성은 **이 Canva AI 스레드** 기준) → 앱 연결 Cursor.  
파이프라인: **한 캐릭터로 검증 → Paul 확인 → 나머지 일괄**.

**Canva AI 스레드 (원본 작업장):**  
https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379  
(= “jabi App Icon Design” · 스타일락·13 로스터·6단계 노트 있음)

⚠️ Cursor **Canva MCP는 일반 디자인만** 다룸. `/ai/thread/` 는 MCP로 안 열림 → 브라우저 로그인 세션 또는 스레드에서 **단계별 PNG 내보내기 → `trace-character-multi.py`** 로 진행.

**파일럿 진행 (ㄱ giyeok):**
- ✅ `char-giyeok-1.svg` + `source/giyeok-1.png` (베이비)
- ✅ `char-giyeok-2.svg` … `5.svg` + `source/giyeok-2.png` … `5.png` ← Paul **넣었어**(최종 Canva PNG) → Cursor `trace-giyeok-sources.py` 추적 (2026-07-26)
- ✅ `char-giyeok-6.svg` + `source/giyeok-6.png` ← 풀히어로 · **Paul OK 2026-07-26**
- ✅ **stage 3–5 Paul OK** (2026-07-26 · `_check.html` 시각 승인) → 파일럿 ㄱ **1–6 전부 Paul OK**

### “나머지 12 자음 일괄”이란?

파트너 **13마리**(ㅈ 제외) − 파일럿 ㄱ = **남은 12자**.  
한 글자당 Canva **stage 1–6 PNG** → `source/{id}-{n}.png` → `trace-char-sources.py` → `char-{id}-{n}.svg`.  
**≠** Cursor가 오늘 72장 아트를 발명하는 것. **≠** 획순(stroke).

| 슬라이스 | Owner | 상태 |
|----------|-------|------|
| `manifest.json` · 배치 추적 · `_check.html` 로스터 · ㄴ/ㄷ 워크시트 | **Cursor** | ✅ 2026-07-26 |
| Canva PNG (자음별 1–6) · `_check` Paul OK | **Paul** | ★ **지금=ㄴ nieun** (`CANVA-BATCH-12-ko.md`) |
| 앱 로드 `char-{id}-{stage}.svg` + 글리프 폴백 | **Cursor** (이미 `app.js`) | ✅ |

- 배치 가이드: [`CANVA-BATCH-12-ko.md`](./CANVA-BATCH-12-ko.md)  
- ㄱ 재생성 참고: [`CANVA-STAGE-2-5-ko.md`](./CANVA-STAGE-2-5-ko.md)  
- 미리보기: [`_check.html`](./_check.html) · 메타: [`manifest.json`](./manifest.json)  
- 추적: `python scripts/trace-char-sources.py nieun` · `--status` · giyeok는 기본 **보호(덮어쓰기 금지)**

### Canva 요약

스레드: https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379  
**지금 ㄴ:** [`CANVA-BATCH-12-ko.md`](./CANVA-BATCH-12-ko.md) 워크시트 A · 저장 `nieun-1.png`…`nieun-6.png` → `source/` → **넣었어**  
ㄱ 아카이브: [`CANVA-STAGE-2-5-ko.md`](./CANVA-STAGE-2-5-ko.md) · [`CANVA-PASTE-WORKSHEET-ko.md`](./CANVA-PASTE-WORKSHEET-ko.md)

## 성장 = 6단계 아이템 장착 (확정)

이전 4단(흐릿→완성) **대신** 아이템이 쌓이는 히어로 성장.

| stage | id 접미사 | 형태 |
|-------|-----------|------|
| 1 | `1-baby` | **베이비** — 단순·둥근 자음 몸통, 짧고 통통한 다리, 아이템 없음, 작고 둥근 비율 |
| 2 | `2-pants` | **팬티** — 시그니처 빨간 팬티 (허리밴드 + 다리 구멍 둘) |
| 3 | `3-boots` | **부츠** — 팬티 + 양발 작은 부츠 |
| 4 | `4-weapon` | **무기** — + 한 손. 자음 형태를 반영한 후크/스태프 등 (ㄱ=갈고리) |
| 5 | `5-shield` | **방패** — + 다른 팔 작은 둥근 방패 |
| 6 | `6-crown` | **왕관** — + 상단 작은 왕관 = **완전 성장 히어로** |

업그레이드 조건: **참여 + 이해 + 개선** 점수 합산 (비율은 앱에서 조정). 단일 게이트에 묶지 않음.

## 파일명 — ⚠️ 2026-07-26 변경: webp → **svg** (Paul 승인)

```
char-{id}-{stage}.svg   # stage = 1..6
```

예: `char-giyeok-1.svg` … `char-giyeok-6.svg`  
(메타: [`manifest.json`](./manifest.json) — stage 라벨·무기 힌트·paulOk·배치 우선순위)

**왜 webp 대신 svg인가 (Claude 제안 → Paul 승인, 2026-07-26):**
- 자비 로고(`hub/app/icons/`)를 만들 때 이미 검증함 — 32px 파비콘부터 512px까지 한 파일로 전부 선명, 파일 크기도 훨씬 작음(자비 마크 3KB). raster는 해상도별로 여러 장 내보내야 함.
- **`<img src="char-giyeok-3.svg">`처럼 webp와 완전히 동일하게 로드됩니다 — 확장자만 바뀌는 것이라 Cursor 쪽 앱 연결 코드 변경 불필요.**
- 나중에 필요하면 CSS 커스텀 프로퍼티로 색만 바꿔 테마 적용 가능(webp는 불가능).
- **Cursor: 이 확장자 변경이 실제로 문제 되는 다른 이유(빌드 파이프라인, 캐시 전략 등)가 있으면 알려주세요** — 없으면 이대로 진행합니다.

| id (초안) | 한글 | 비고 |
|-----------|------|------|
| giyeok | ㄱ | 파일럿 |
| nieun | ㄴ | |
| digeut | ㄷ | |
| rieul | ㄹ | |
| mieum | ㅁ | |
| bieup | ㅂ | |
| siot | ㅅ | |
| ieung | ㅇ | |
| chieut | ㅊ | |
| kieuk | ㅋ | |
| tieut | ㅌ | |
| pieup | ㅍ | |
| hieut | ㅎ | |

**제외:** `jieut` **ㅈ** = **자비(jabi.)** — 선생님·친구·조교. 학생 파트너 선택 목록에 넣지 않음. 완성형 가이드 NPC.

## 파일럿 → 일괄

1. ✅ **첫 캐릭터:** `giyeok` (ㄱ) — stage 1–6 Paul OK  
2. 🔄 나머지 12 id — Paul Canva(우선 ㄴ·ㄷ) → Cursor 추적. 가짜 SVG 일괄 생성 금지.

## 앱 연결 시 주의 (Cursor)

- **캐릭터 단계** ≠ **시험 준비도 %** (준비도 = 최종 간이 모의·약점; 캐릭터 = 참여·이해·개선 합산 점수)  
- 목표 80% 달성 후에도 stage 6·만점 방향 성장 가능

## 넣지 말 것

- `hub/app/js/app.js` 퀴즈/SRS 대규모 수정 (Cursor)  
- 공식 기출 JSON을 MOCK에 연결

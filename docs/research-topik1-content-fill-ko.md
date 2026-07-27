# 리서치 — TOPIK I 연습 콘텐츠 채우기 (2026-07-26)

> **목적:** Hub 학습 도어 #3「TOPIK I 연습」을 **임의 문항 더미로 채우지 않고**, 공식 시험 구조 + 기존 verified/엔진(SRS·퀘스트)을 대조한 뒤 jabi. **원작 MCQ**로 보강.  
> **저작권:** 공식 TOPIK PDF·기출 = **형식·문항 유형만** 참고. 문장·지문·보기 **동일 복제 금지** (`docs/handoff-growth-character-ko.md`).  
> **짝 문서:** [`research-hint-ux-ko.md`](research-hint-ux-ko.md) · [`research-hangul-content-fill-ko.md`](research-hangul-content-fill-ko.md) · [`research-basic-content-fill-ko.md`](research-basic-content-fill-ko.md) · [`handoff-growth-character-ko.md`](handoff-growth-character-ko.md)

---

## 1. 결론 (채우기 원칙)

1. **공식 뼈대 = TOPIK I PBT** — 듣기 30Q / 40분 · 읽기 40Q / 60분 · 합 70Q / 100분 · 만점 200 · 전 문항 4지 객관식 · **쓰기 없음**. (NIIED 개요 · TopikLab 구조 안내)
2. **앱은 풀모의 복제가 아니라 연습 뱅크.** 세트당 ~10Q 읽기 + 듣기 세트(대본/TTS) + SRS 퀘스트. 최종 모의 UI는 당분간 **읽기 세트 3 대용** — 카피로 “풀 70문항 공식 모의”라고 쓰지 말 것.
3. **유형 커버 = 공식 유형의 축소판.** 읽기: `blank`(문법·문맥) · `topic` · `notice` + 보강 `purpose` · `content` · `order`. 듣기: 일치·장소·계획·응답·주제·다음 행동(원작 짧은 대화).
4. **힌트 UX 회귀 금지.** Meaning→Look만 조기 공개 · Pair/`Match:`/`답:` · 정답 시각 캡션 금지 (`research-hint-ux-ko.md` · `earlyScaffoldLines`).
5. **click-topik-*.json = 메인 경로에 넣지 않음.** CLIcK 출처 · TOPIK I–II 혼합 · verified 원작 정책과 다름. 참고·별도 실험만.
6. **합격 밴드(앱 공시):** 종합 % → /200 · 80%(≈160) 합격선 · 80–90% 안정 · 90%+ 준비 (D17). 급수 1/2 세분화 UI는 없음.

---

## 2. 출처

| 출처 | 무엇을 가져왔는가 | URL / 위치 |
|------|-------------------|------------|
| NIIED TOPIK Overview | TOPIKⅠ: Listening 30 + Reading 40 · 합 100분 · 200점 · L1 80–139 · L2 140–200 | https://www.niied.go.kr/…/eng_topikOverview |
| TopikLab TOPIK I guide (2026) | 듣기 40분→읽기 60분 연속 · 4지 · 듣기 10유형 · 읽기 16유형 요약 · 어휘 L1≈800 / L2≈1500–2000 | https://info.topiklab.com/en/topik-1/ |
| TOPIK GUIDE overview | I = 듣기+읽기만 · II = +쓰기 · 세션 구조 대조 | https://www.topikguide.com/topik-overview/ |
| 내부 handoff D17 | 앱 목표 %·면책보다 추천 공시 · 공식 PDF=형식만 | `docs/handoff-growth-character-ko.md` |
| 내부 뱅크·엔진 | verified-read-01..03 · listen-01 · SRS 퀘스트 · 힌트 단계 | `hub/app/data/verified-*.json` · `hub/app/js/app.js` |
| 어휘 allowlist | NIKL A ∪ Tammy TOPIK I − hard · OOV content_review 0 | `hub/app/data/vocab/` |

---

## 3. 공식 TOPIK I vs jabi. 연습

| 축 | 공식 TOPIK I (PBT) | jabi. 지금 | 채택 |
|----|---------------------|------------|------|
| 영역 | 듣기+읽기 | 동일 | 유지 |
| 문항 수 | 70 (30+40) | 읽기 3×10 + 듣기 세트 | **연습 세트** (풀모의 ≠ 목표) |
| 시간 | 100분 고정 | 타이머 없음(연습) | 유지 · 풀모의는 후속 |
| 듣기 오디오 | 1회 재생 | TTS 또는 대본 공개 | 원작 대본 · 공식 음원 금지 |
| 쓰기 | 없음 | 없음 (II 트랙으로 분리) | 유지 |
| 급수 | 총점→1급/2급 | 종합 %만 | D17 유지 |
| 오답 복습 | 없음 | 태그 SRS 퀘스트 | **핵심 차별** |

**시사점:** 콘텐츠 fill은 “70문항 복제”가 아니라 **유형 균형 + 듣기 비중 + 도어/카피 정확도**.

---

## 4. 공식 문항 유형 → jabi. 매핑

### 4-1. 듣기 (요약 · TopikLab 10유형 축약)

| 공식 축 | 예 | jabi. `type`/태그 |
|---------|----|-------------------|
| 그림·짧은 말 일치 | Q1–4 | `listening` + match (그림은 visual 힌트만) |
| 알맞은 응답 | Q5–6 | `listening` + `listening:응답` |
| 장소 | Q7–10 | `listening:장소` |
| 주제 | Q11–14 | `listening:주제` |
| 내용 일치·세부 | Q17–21, 27–28 | `listening` + vocab/상황 |
| 화자 다음 행동 | Q22–24 | `listening:계획` / 다음 행동 |

### 4-2. 읽기 (요약 · 16유형 축약)

| 공식 축 | 예 | jabi. `type` |
|---------|----|--------------|
| 문법 빈칸 | Q31–33 | `blank` |
| 주제 | Q34–36, 47–48 | `topic` |
| 안내문·표지 | Q37–38 | `notice` |
| 문장 배열 | Q39–41 | `order` (4지 순서 보기) |
| 문맥 어휘 | Q42–44 | `blank` + vocab 태그 |
| 내용 일치 | Q45–46, 53–54 | `content` |
| 글의 목적 | Q51–52 | `purpose` |

미구현(후속): 긴 지문 2문항 묶음, 문장 삽입 위치 — UI/스키마 확장 후.

---

## 5. 갭 진단 (research-fill 직전)

| 항목 | 상태 | 조치 |
|------|------|------|
| 읽기 verified 01–03 | 각 10Q · hint/why/distract 완비 · blank 편중 | 제목=읽기 명시 · 유형 보강 세트 |
| 듣기 | **1세트 5Q만** | **listen-02** 추가(응답·장소·주제·행동·일치) |
| 최종 모의 | `FINAL_MOCK` = read-03 대용 | 카피 “읽기 세트 3(최종 연습)” 정직화 |
| Hub 도어 | “읽기 모의”만 강조 | 듣기+읽기+퀘스트 SRS |
| click-topik | I–II 혼합 · CLIcK | **미연결** |
| 힌트 UX | 고정됨 | 신규 문항도 Pair를 steps[2]/why만 |

---

## 6. 채우기 가이드 (원작만)

- 어휘: allowlist·초급 명사 (병원·약국·버스·층…). 전문 한자어·공식 기출 문구 금지.
- 듣기 대본: 2–4줄 가/나 · 일상 생존 장면.
- 힌트: `steps` 3줄 · 조기 2줄에 `answerText`·`Match:` 금지 · visual 캡션 ≠ 정답.
- 태그: `grammar:` / `vocab:` / `reading:` / `listening:` — SRS 퀘스트가 오답 태그를 모음.

---

## 7. 상태·도어 카피

- 뱅크: `verified: true` · `source: jabi-original` · 연구 보강 후 `verifiedAt` 갱신.
- Hub: TOPIK I = 읽기·듣기 연습 · 스트릭 · 틀린 태그 퀘스트. “풀 공식 70문항” 암시 금지.
- Next queue: **#4 TOPIK II research-fill**.

---

## 8. 넣지 말 것

- 공식/사설 기출 문장 복제 · click-topik을 verified로 승격
- 힌트 1탭에 정답 · Hangul/Basics/Games 범위 침범
- 거대 미구조 뱅크(유형·힌트 없는 양만 늘리기)

---

*작성: Cursor · 2026-07-26 · 커밋/푸시 없음*

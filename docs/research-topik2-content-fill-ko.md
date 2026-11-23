# 리서치 — TOPIK II 연습 콘텐츠 채우기 (2026-07-26)

> **목적:** Hub 학습 도어 #4「TOPIK II」를 **임의 더미로 채우지 않고**, 공식 시험 구조(듣기·읽기·쓰기 51–54) + 기존 파일럿 뱅크·형성 채점 UI·축 매핑·영어 AES 리서치를 대조한 뒤 jabi. **원작**으로 보강.  
> **저작권:** 공식 TOPIK PDF·기출 = **형식·문항 유형만** 참고. 문장·지문·보기·작문 프롬프트 **동일 복제 금지** (`docs/handoff-growth-character-ko.md`).  
> **짝 문서:** [`research-topik1-content-fill-ko.md`](research-topik1-content-fill-ko.md) · [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md) · [`research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md) · [`research-topik2-writing-scoring-papers-ko.md`](research-topik2-writing-scoring-papers-ko.md) · [`research-hint-ux-ko.md`](research-hint-ux-ko.md)

---

## 1. 결론 (채우기 원칙)

1. **공식 뼈대 = TOPIK II PBT** — 듣기 50Q / 60분 · 쓰기 4Q / 50분 · 읽기 50Q / 70분 · 합 **104Q / 180분 / 300점**. 1교시(듣기+쓰기 110분) → 휴식 → 2교시(읽기 70분). (NIIED Overview · TopikLab TOPIK II 가이드)
2. **앱은 풀모의 복제가 아니라 영역별 연습 뱅크.** 듣기/읽기 = 짧은 MCQ 세트(대본 선택 공개) · 쓰기 = Q51–54 원작 + **형성 점수(부분점수·trait)**. 카피에 “풀 104문항 공식 모의”·“공식 TOPIK 점수” 금지.
3. **유형 커버 = 공식 축의 축소판.** 듣기: 일치·안내·이어가기·중심 + 보강 **태도·다음 행동·세부 추론**. 읽기: 안내 세부·제목·내용일치·문맥 빈칸 + 보강 **목적·배열**. 쓰기: 51–52 격식 빈칸 · 53 자료 단문 · 54 논술 — 기존 형성 채점 유지.
4. **형성 채점 회귀 금지.** Phase 1.1 규칙(퍼지 부분점수 · 3 trait · 다시쓰기 · disclaimer) 유지. Lemon / 신경망 AES / “급수 확정” 금지 (`research-english-aes-for-jabi-ko.md`).
5. **힌트 UX.** Meaning→전략만 조기 공개 · 조기 steps에 `Match:`/`답:`/`answerText` 금지 · 모범·개요는 확인 후 선택 공개.
6. **합격 밴드(앱 공시):** 종합 연습 %만. 공식 L3–L6 컷(120/150/190/230)은 참고용 면책 — UI에 급수 단정하지 않음.

---

## 2. 출처

| 출처 | 무엇을 가져왔는가 | URL / 위치 |
|------|-------------------|------------|
| NIIED TOPIK Overview | TOPIKⅡ: L50+R50+W4 · 180분 · 300점 · L3 120–149 … L6 230–300 | https://www.niied.go.kr/…/eng_topikOverview |
| TopikLab TOPIK II guide (2026) | 1교시 L60+W50 · 2교시 R70 · 쓰기 51–54 길이·성격 | https://info.topiklab.com/en/topik-2/ |
| TopikLab Writing guide | 51–52 빈칸 · 53≈200–300자 · 54≈600–700자 · 이중 채점자(준공식) | https://info.topiklab.com/en/topik-writing/ |
| TOPIK GUIDE overview | I vs II 세션·쓰기 유무 대조 | https://www.topikguide.com/topik-overview/ |
| 내부 축 매핑 | 내용/조직/언어 → jabi 3 trait · 가중 | `docs/topik2-writing-axis-mapping-ko.md` |
| 내부 AES·papers | 형성 점수 필수 · Phase 1.1 shipped · Phase 2 캘리브 대기 | `docs/research-english-aes-for-jabi-ko.md` 등 |
| 내부 뱅크·엔진 | listen/read 01–02 · write 51–54 · `topik2.js` | `hub/app/data/topik2/` · `hub/app/topik2/` |

---

## 3. 공식 TOPIK II vs jabi. 연습

| 축 | 공식 TOPIK II (PBT) | jabi. 지금 | 채택 |
|----|---------------------|------------|------|
| 영역 | 듣기+쓰기+읽기 | 동일 영역 도어 | 유지 |
| 문항 수 | 104 (50+4+50) | 듣기/읽기 짧은 뱅크 + 쓰기 소량 | **연습 세트** (풀모의 ≠ 목표) |
| 시간 | 180분 고정 2교시 | 타이머 없음 | 유지 · 풀모의는 후속 |
| 듣기 오디오 | 1회 재생 | 대본 선택 공개 · 오디오 없음 | 원작 대본 · 공식 음원 금지 |
| 쓰기 채점 | 인간 이중 채점(준공식 4축) | 규칙 형성 0–100 + 3 trait | **형성만** · 공식 배점 미표시 |
| 급수 | 총점→3–6급 | 종합 연습 %만 | D17식 정직 카피 |
| 풀모의 | 회차 PDF | `topik2-mock` = planned | 카피 “예정” 유지 |

**시사점:** fill = **유형 균형 + 쓰기 프롬프트 다양화 + 도어/고지 정확도**. 104문항 복제 금지.

---

## 4. 공식 문항 유형 → jabi. 매핑

### 4-1. 듣기 (중급 축약)

| 공식 축 | 예 | jabi. 태그 |
|---------|----|------------|
| 짧은 대화·내용 일치 | 초반부 | `listening:내용일치` |
| 안내방송 | 시간·장소·규칙 | `listening:안내` |
| 이어지는 말 | 화행 응답 | `listening:이어가기` |
| 중심 내용 | 독백·인터뷰 | `listening:중심내용` |
| 태도·심정 | 중후반 | `listening:태도` |
| 다음 행동·의도 | 중후반 | `listening:다음행동` |
| 세부 추론 | 긴 대화 | `listening:세부` |

### 4-2. 읽기 (중급 축약)

| 공식 축 | jabi. `type` |
|---------|--------------|
| 안내문 세부 | `notice` |
| 제목·주제 | `topic` |
| 내용 일치 | `inference` / content |
| 문맥 빈칸 | `blank` |
| 글의 목적 | `purpose` |
| 문장 배열 | `order` |

미구현(후속): 긴 지문 2문항 묶음 · 문장 삽입 위치 · 문학 발췌 — 스키마/UI 확장 후.

### 4-3. 쓰기 51–54 (유지)

| 문항 | 공식 | jabi. | 채점 |
|------|------|-------|------|
| 51 | 실용 빈칸 | `write-blank` | cloze-partial |
| 52 | 문어·논리적 빈칸 | `write-blank` | cloze-partial |
| 53 | 자료 단문 ~200–300자 | `write-short` | trait continuum |
| 54 | 논술 ~600–700자 | `write-essay` | trait + discourse |

축 가중 = [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md).

---

## 5. 갭 진단 (research-fill 직전)

| 항목 | 상태 | 조치 |
|------|------|------|
| 듣기 01–02 | 각 4Q · 일치·안내·이어가기·중심 | **listen-03** 태도·다음행동·세부 |
| 읽기 01–02 | 각 4Q · 안내·제목·일치·빈칸 | **read-03** 목적·배열 + 보강 |
| 쓰기 51–54 | 각 2–3문항 · 형성 채점 OK | 문항 +1씩 · softKeywords/accepted 보강 |
| 풀모의 | planned | 카피 유지 · 착수 금지(이번 슬라이스) |
| Hub 도어 | “파일럿”만 | 듣기·읽기·쓰기 + **형성 점수(공식 아님)** |
| 힌트 | 일부 EN steps에 `Match:` | 신규·수정 문항에서 제거 |
| Lemon/AES | 금지 | 유지 |

---

## 6. 채우기 가이드 (원작만)

- **어휘:** 중급 시사·직장·캠퍼스·공공안내. 공식 기출 문구·전문 한자어 과다 금지.
- **듣기 대본:** 2–6줄 · 격식·반말 혼용은 화자 관계에 맞게 · 오디오 없음 고지 유지.
- **읽기:** 안내문·짧은 논설·표 비교형 지문. 보기 4지 · distractWhy 완비.
- **쓰기:** 격식체 문어 · 53은 수치 조건 · 54는 장단점+입장 · 조기 tip에 모범 전문 금지.
- **힌트:** steps 3줄 · 조기 2줄에 정답 문자열 금지 · why/distractWhy 유지.

---

## 7. 상태·도어 카피

- 뱅크: `source: jabi-original` · research-fill 후 `sourceNote`·manifest `lead` 갱신 · `verified`는 draft 유지(I의 verified 승격 정책과 분리).
- Hub: TOPIK II = 듣기·읽기 MCQ + 쓰기 51–54 **연습용 형성 점수**. “풀 공식 모의”·“공식 급수” 암시 금지.
- Next queue: **#5 Games research-fill polish** (선호) · #6 글모음은 후순위.

---

## 8. 넣지 말 것

- 공식/사설 기출 문장·작문 주제 복제
- Lemon · 신경망 AES · 캘리브 없는 급수 UI
- Hangul/Basics/TOPIK I/Games 범위 침범 (이번 #4만)
- 거대 미구조 뱅크(유형·힌트·채점 필드 없는 양만 늘리기)

---

## 9. 뱅크 04 확장 노트 (2026-07-26 · 누적)

| 파일 | Q | 유형 커버 |
|------|---|-----------|
| `draft-listen-04.json` | 4 | 내용일치 · 안내 · 이어가기 · 중심내용 (01–02 축 재순환 · 새 장면) |
| `draft-read-04.json` | 4 | 안내세부 · 제목 · 내용일치 · 문맥빈칸 (01–02 축 재순환) |

- **누적:** 듣기 **16Q** (4뱅크×4) · 읽기 **16Q** (4뱅크×4) · 쓰기 기존 유지.
- **주제:** 캠퍼스 열람실 · 수영장 주차 · 직장 슬라이드 · 지역 독서 모임 · 요리 교실 · 중고 나눔 · 구내식당 채식 · 공공 도서관.
- **정책 유지:** `source: jabi-original` · 오디오 없음 · 조기 hint에 Match:/답: 금지 · Lemon/공식 급수 금지.
- **manifest:** `track-manifest.json` v3 · lead “각 4뱅크” · 유닛 order 재정렬(듣기01–04 → 읽기01–04 → 쓰기51–54 → mock).

---

*작성: Cursor · 2026-07-26 · 커밋/푸시 없음*

# 스펙 — TOPIK II 유닛 목록을 TOPIK I 패턴에 맞춰 재구성 (옵션 B: 톤만 통일)

> Paul 승인(2026-07-27) — [`proposal-ux-overhaul-tracks-ko.md`](proposal-ux-overhaul-tracks-ko.md) 문제 2, **옵션 B(트랙별 세부 유지, 진행 문법만 통일)** 확정. "기본 러닝 패턴은 TOPIK II 타임라인이 아니라 TOPIK I 화면과 같아야 한다"는 Paul 원 지시를 구체 방향으로 채택. Cursor 담당(Claude는 `hub/app/**` 편집 금지).

---

## 현재 구조 (실제 코드 확인)

- **TOPIK I** (`hub/app/js/app.js`, `renderPractice()`) — Practice 탭이 **섹션별(Reading/Listening) 평평한 목록**, 각 세트가 텍스트 링크. 번호 배지·타임라인 없음.
- **TOPIK II** (`hub/app/topik2/topik2.js`, `renderList()`, 1498행) — `.skill-path`/`.skill-node`/`.skill-card` 클래스로 **00~13 번호 원형 배지 세로 목록**. `unit.kind`에 따라 배지 스타일 분기(`skill-node--${unit.kind || "planned"}`). **"00·Overview"(스캐폴딩, 클릭 무의미)와 "13·Full mock(planned)"이 실제 연습 가능한 유닛(01~12)과 시각적 구분 없이 같은 목록에 섞여 있음** — 이게 가장 큰 실사용 문제.
- **Basics**(`hub/app/basic/basic.js`, `renderList()`, 460행)도 같은 `.skill-path`/`.skill-node` 클래스를 이미 재사용 중 — 즉 Basics·TOPIK II는 이미 같은 컴포넌트 계열이고, **TOPIK I만 이 계열에서 빠져 있는 원조(legacy) 앱**.

## 목표 — "동일한 화면"이 아니라 "동일한 진행 문법" (리서치 근거: `proposal-ux-overhaul-tracks-ko.md` 문제 2)

옵션 B 확정에 따라, TOPIK II를 TOPIK I과 **픽셀 단위로 똑같이** 만들 필요는 없습니다. 대신 아래 골격만 통일:

1. **섹션 그룹핑** — TOPIK II도 TOPIK I처럼 듣기(Listening)/읽기(Reading)/쓰기(Writing) **섹션 헤더로 그룹**(지금은 00~13이 섹션 구분 없이 한 줄로 쭉 이어짐).
2. **비기능 항목을 실제 연습 유닛과 시각적으로 분리** — "00·Overview"(스캐폴딩)와 "13·Full mock(planned)"을 각 섹션의 연습 카드 목록에서 빼고, 별도 "예정" 섹션(또는 완전히 숨김, 콘텐츠 준비 전엔 노출 안 함)으로 이동. **이게 가장 시급하고 공수 대비 효과가 큰 부분.**
3. **번호 원형 배지(`skill-node`) 유지 여부** — TOPIK I은 배지가 없지만, Basics도 같은 배지를 쓰고 있어 완전히 없애면 Basics와도 벌어짐. **배지 자체는 유지하되(트랙 고유 요소로 인정), 섹션 그룹핑 + 비기능 항목 분리 2가지만 우선 적용**을 권장 — 배지 제거는 이번 스펙 범위 밖(더 큰 변경이라 별도 검토).
4. **CTA 버튼 문법**은 이미 TOPIK II/Basics 둘 다 "PRACTICE" 버튼 형태로 유사 — 유지.

## 구현 메모

- `renderList()`(1498행)에서 `(track.units || []).forEach(...)` 순회를 섹션별로 묶어 렌더링하도록 변경 — `unit.kind`(section 필드가 있는지 확인 필요, 없으면 `unit.id`/`unit.title` 패턴으로 listening/reading/writing 구분해 신규 그룹핑 로직 추가) 후 섹션 헤더(`<h3>`) + 그 섹션의 유닛들만 리스트업.
- "00·Overview"·"13·Full mock" 같은 `unit.kind === "scaffold"` 또는 콘텐츠 없는 유닛(`bank?.questions?.length` 0 또는 `bankFile` 없음) 필터링해서 별도 렌더링(예: 페이지 하단에 흐리게 "예정 콘텐츠" 목록) 또는 완전 숨김 — 어느 쪽이 나을지는 Cursor 판단, **다만 지금처럼 PRACTICE 버튼 유닛들 사이에 섞여 있으면 안 됨**.
- TOPIK I `renderPractice()`(`app.js`)의 섹션 그룹핑 마크업 구조를 참고해 톤만 맞추되, 코드 자체를 공유할 필요는 없음(두 앱이 물리적으로 분리돼 있으므로 무리하게 합치지 말 것).

## 하지 않는 것 (스코프 아웃)

- Basics·Hangul·Games까지 이번에 같이 바꾸는 것 — 이번 스펙은 **TOPIK II만** (가장 문제가 심한 트랙). 다른 트랙은 이번 결과 보고 후속 검토.
- `skill-node` 원형 배지 완전 제거 — 유지.
- TOPIK I 앱과 TOPIK II 앱의 코드/컴포넌트 통합 — 각자 독립 유지, 시각적 톤만 맞춤.

## 회귀·검증 체크리스트

1. TOPIK II 목록이 듣기/읽기/쓰기 섹션으로 그룹핑되어 보이는지.
2. "00·Overview"·"13·Full mock"이 더 이상 01~12 실제 연습 유닛과 같은 줄에 섞여 있지 않은지(숨김 또는 별도 구역 확인).
3. 각 유닛 클릭 시 기존 상세/연습 흐름(`renderDetail`, 문항 플레이어)이 그대로 정상 작동하는지(회귀 없어야 함).
4. `git commit`/`push`는 Paul 요청 전까지 보류.

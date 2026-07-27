# Claude ↔ Cursor 협업 루프 (고정)

> **확정:** 2026-07-26 · Paul이 Claude 플랜을 수락한 모델.  
> **목적:** Claude = **brain**(리서치·기획·큐 채움) · Cursor = **hands**(코드 구현·체인). 같은 문서를 읽고 같은 규칙으로 돈다.  
> **운영 큐:** [`cursor-work-queue-ko.md`](cursor-work-queue-ko.md) · 흐름 [`DAILY-LOG.md`](DAILY-LOG.md) · 상태 [`PROGRESS.md`](PROGRESS.md)

---

## 1. 한 줄 요약

| 역할 | 누가 | 하는 일 | 하지 않는 일 |
|------|------|---------|--------------|
| **Brain** | Claude | `git pull` → 큐/PROGRESS/로그/최근 커밋 리뷰 → 필요 시 리서치 → **docs만** 작성 → Next append · (선택) **docs만** commit+push | `hub/app/**` 앱 소스 · `.js`/`.css` 구현 · Lemon · Vercel 프로젝트 생성 |
| **Hands** | Cursor | 큐 **Now/Next** 읽고 코드 구현 · **항목 범위 안** 리서치 자동 가능 → Done 갱신 → 다음 항목 · 큐 비면 **self-QA만** | Next **발명 금지** · Lemon / 새 Vercel 프로젝트 / commit·push(Paul 말 전) |

Paul은 **큐 + DAILY-LOG**만 보면 “누가 무엇을 했고 다음에 뭐가 있는지”를 추적할 수 있다.

---

## 2. Claude 루프 (brain)

### 2-1. 주기 (cron · 세션 한계)

- Claude 세션 안 **예: 6시간 cron**으로 주기 리뷰를 돌릴 수 있다.
- **세션에 묶임:** cron은 그 Claude 세션이 살아 있는 동안에만 동작한다.
- **대략 ~7일 만료:** 세션/스케줄이 끊기면 조용히 멈춘다. Paul이 새 세션을 열거나 cron을 다시 걸어야 재개.
- 채울 Next가 없으면 **조용히 skip** (빈 커밋·스팸 로그 금지).

### 2-2. 매 주기 절차

1. `git pull` (최신 큐·로그·코드 상태 맞춤).
2. 읽기: `docs/cursor-work-queue-ko.md` · `docs/PROGRESS.md` · `docs/DAILY-LOG.md` · 최근 커밋.
3. 필요하면 리서치 → **문서만** 작성 (`docs/**` specs / research / handoffs).
4. **Next**에 항목 append + DAILY-LOG에 한 블록 append.
5. (선택) **docs only** `commit` + `push`. 앱 소스·구현 파일은 커밋에 넣지 않는다.

### 2-3. 안전 splice (덮어쓰기 레이스 방지)

여러 에이전트가 같은 md를 고칠 수 있으므로:

- **전체 파일 rewrite 금지.** 섹션을 통째로 갈아끼우지 않는다.
- **Append-only 우선:** DAILY-LOG는 최신 항목을 **맨 위**에 새 블록으로 추가.
- 큐의 Next/Done은 **행 단위로 추가·이동**만. 다른 섹션(Now 테이블·Stop·Parallel)을 임의로 지우지 않는다.
- 충돌 시: pull → 로컬 append 재적용 → push. 상대가 넣은 Next 행을 삭제하지 않는다.

### 2-4. Hard stop (Claude)

- `hub/app/**` 및 학습 앱 구현(`.js` / `.css` / 게임·트랙 런타임) **편집 금지**.
- Lemon Squeezy / 결제 배선 **금지**.
- Vercel **New Project** 생성 **금지** (URL은 Paul → Task A docs만).
- Next가 비어 있고 리서치 필요도 없으면 **아무 것도 쓰지 않고 종료**.

---

## 3. Cursor 루프 (hands)

### 3-1. Multitask 자동 체인

1. `cursor-work-queue-ko.md`의 **Now** / **Next** 상단부터 읽는다.
2. 해당 항목을 **코드로 구현** (리서치 문서가 있으면 그것을 스펙으로).
3. 끝나면 큐에서 Done으로 옮기고 DAILY-LOG·PROGRESS에 짧게 반영.
4. Paul 대기 없이 **다음 Next**로 진행 (큐 규칙의 예외 제외).

### 3-2. 리서치·큐 소유권 (Paul 확정 · 2026-07-26)

1. **큐를 채우는 일(Next 발명)** = **Claude만**. Cursor는 큐가 비었다고 **새 백로그 항목을 만들지 않는다**.
2. **예외:** 이미 큐에 있는 항목을 **구현하는 중**이면, 그 항목 **범위 안**에서 리서치·스펙 보완을 해도 된다.
3. 그 범위 안 작업에 리서치가 필요하다고 Cursor가 판단하면 → **자동으로 리서치 실행**해도 된다. **Paul 대기 불필요**.

**Self-QA (큐 비었을 때):**

- Next가 비어 있으면 → **리뷰·버그 수정만**. Next를 **발명하지 않는다**.
- Next 채움은 **Claude**에게 맡긴다 (이 문서 §2 Claude 루프).

### 3-3. Stop 라인 (Cursor · Paul 말 전 금지)

- Lemon / 결제
- Vercel **새 프로젝트** 생성
- **commit / push** (Paul이 요청하기 전)

게이트·`paulOk: false` 항목은 기존 ops 규칙 그대로.

---

## 4. 문서 역할 (중복 금지)

| 파일 | 역할 |
|------|------|
| [`claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md) | **이 프로토콜** (역할·cron·금지) |
| [`cursor-work-queue-ko.md`](cursor-work-queue-ko.md) | Now / Next / Done · 자동 체인 규칙 |
| [`DAILY-LOG.md`](DAILY-LOG.md) | 시간순 흐름 (누가·언제·무엇) append |
| [`PROGRESS.md`](PROGRESS.md) | 작업별 상태 스냅샷 |

---

## 5. Paul 모니터링

1. **[`cursor-work-queue-ko.md`](cursor-work-queue-ko.md)** — Now가 뭔지 · Next에 Claude가 뭘 넣었는지 · Done 진행.
2. **[`DAILY-LOG.md`](DAILY-LOG.md)** — 오늘 Claude 리뷰 블록 / Cursor 구현 블록이 위에 쌓이는지.
3. (선택) PROGRESS 해당 섹션·Notion 미러.

이상이면: Claude 세션/cron이 만료됐거나, Cursor가 Stop 라인에 걸린 것. 새 Claude 세션 또는 Paul 한 줄 지시로 재개.

---

## 6. 체크리스트 (복붙용)

**Claude 주기 시작**

- [ ] `git pull`
- [ ] 큐 · PROGRESS · DAILY-LOG · 최근 커밋 읽기
- [ ] docs-only 산출 (있을 때만)
- [ ] Next + DAILY-LOG **splice/append** (overwrite 금지)
- [ ] (선택) docs-only commit+push
- [ ] 앱 코드 / Lemon / Vercel new project 손대지 않음

**Cursor 체인 한 칸**

- [ ] Now/Next 읽기
- [ ] 스펙(research/handoff) 따라 구현 · 범위 안 리서치 필요 시 **자동 실행**(Paul 대기 X)
- [ ] Done + 로그/PROGRESS
- [ ] 다음 Next (Stop이면 정지)
- [ ] Next 비면 → self-QA(리뷰/버그)만 · **Next 발명 금지** · 채움은 Claude
- [ ] commit/push/Lemon/Vercel-new 금지(Paul 전)

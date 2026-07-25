# Claude Task A — Vercel 배포 URL 반영 (Paul OK 후)

> **Owner:** Claude (직접 실행). Cursor는 B(`app.js` SRS·듣기) 담당.  
> **시작 조건:** Paul 채팅에 **`jabi. OK`** + **Vercel hub 미리보기 URL** (Root Directory = `hub`).

---

## Paul → Claude 보낼 한 줄 (조건 충족 시)

```text
jabi. OK. Vercel hub URL: https://________.vercel.app
docs/claude-task-a-vercel-deploy.md 따라 Task A 실행해줘. commit push까지.
```

---

## Task A 체크리스트 (Claude)

브랜치: `cursor/hub-phase0-0f7e` (pull 먼저)

1. **`hub/config/brand.json`**
   - `domain.staging` = Paul가 준 URL (끝 `/` 없이 또는 팀 convention에 맞게)

2. **`hub/config/ops-links.json`**
   - `updated` = 오늘 날짜
   - 관련 `items[]` 의 `links.vercel` 채우기 (최소):
     - `phase-0-hub`
     - `phase-0-vercel`
     - `phase-0-ops-dashboard` → `…/ops/`
     - `phase-1-app-mvp` → `…/app/`
   - `milestones` → `milestone-phase-0` 에 `targetDate` 또는 note는 선택

3. **`docs/PROGRESS.md`**
   - §1 Phase 0: “Vercel 배포 완료” + URL
   - §3 ops: 배포 후 `/ops` URL

4. **`docs/DAILY-LOG.md`**
   - append (최상단 2026-07-25 블록 아래):  
     `### Claude` · ✅ Task A — staging URL 반영 · commit `…`

5. **Notion** (Claude Notion MCP 있으면)
   - [PM 허브](https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8) 작업 로그에 배포 URL 한 줄  
   - §1 Phase 0 하위 페이지 vercel 상태 갱신 (선택)

6. **Git**
   - `git add` 위 파일만 (backtest 등 unrelated 제외)
   - commit message 예: `chore(hub): set Vercel staging URL after Paul deploy`
   - `git push origin cursor/hub-phase0-0f7e`

7. **Paul에게 답**
   - 확인 URL 3개: `/` · `/app/` · `/ops/review.html`

---

## 하지 않음 (Task A 범위 밖)

- PR merge (Paul 요청 시만)
- `app.js` SRS / 듣기 (Cursor B)
- wensonjabi.com 루트 수정
- Lemon Squeezy

---

## 아직 URL 없을 때

Paul URL 전까지 **대기**. 이 파일만 repo에 두고 DAILY-LOG에 “Claude Task A 대기 중” 유지.

*Created: 2026-07-25 · Cursor (Paul 요청: Claude에게 A 직접)*

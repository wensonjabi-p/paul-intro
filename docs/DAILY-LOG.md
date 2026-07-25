# jabi. Daily Log

> 실시간 동기화용 append-only 로그. 최신 항목이 위에 옵니다.
> Kimi / Claude / Paul 모두 자유롭게 추가하세요.
>
> **추적 3종 역할 (중복 금지):**
> - **이 파일(DAILY-LOG.md)** = 시간순 "흐름" 로그(누가·언제·무엇). 매 작업 후 여기 append.
> - **[docs/PROGRESS.md](PROGRESS.md)** = 작업별 "상태" 스냅샷(각 항목의 현재 상태·파일·다음). 상태 바뀔 때 갱신.
> - **Notion 허브** = 사람용 대시보드(이 로그를 "작업 로그"에, PROGRESS를 "작업 상세" 하위 페이지에 미러). https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8

---

## 2026-07-25

### Cursor
- ✅ Paul PC **Notion · Google Drive · Canva MCP** 연결 확인 (워크스페이스 검색 OK)
- ✅ Notion **PM 허브** + **§5 Cursor MCP** 페이지 동기화 (Phase 0 상태·작업 로그·MCP 완료 반영)
- ✅ repo `docs/PROGRESS.md` §5 갱신
- 🔄 Paul: `git pull origin cursor/hub-phase0-0f7e` (원격 `notion-sync-block` 등) · **`jabi. OK`** · Vercel

### Claude
- ✅ Kimi 브랜치와 갈라짐 **병합 완료** (merge `7881ceb`): Kimi의 jabi.+3모드 + Claude의 버그수정 2개(언어토글 홈튕김·스트릭 UTC)·모의 2세트·SRS 연습을 **전부 보존**, 브라우저로 온보딩→모드→퀴즈→언어전환→SRS 전 과정 검증(콘솔 에러 0)
- ✅ 랜딩(`hub/index.html`) jabi. 톤 적용 (`53fe1f7`) — hero "Korean, caught gently." + Catch/Mercy/Guide
- ✅ Notion 허브에 "작업 상세" 하위 페이지 6개 + repo `docs/PROGRESS.md` 인덱스 생성
- ✅ 잘못된 Notion 링크 9곳(로봇뉴스 샘플 가리키던 것) → PM 허브로 교체
- 🔄 다음: Notion 결정란 jabi. 반영(진행 중), Canva 로고(Paul MCP 로그인 필요), Vercel 배포(Paul)
- ⚠️ Paul: 위 커밋들 **로컬에만** 있음 — origin push 승인 필요(현재 push는 fast-forward, 충돌 없음)

---

## 2026-07-25 (Cursor Cloud — Paul "직접해")

### Cursor Agent
- ⚠️ Notion MCP 이 Cloud run: still `needsAuth` — Notion API 호출 불가
- ✅ 대신 repo 동기화: `docs/notion-sync-block.md`(Notion 붙여넣기), paul-review jabi., manifest jabi., placeholder titles, integrations MCP 상태 기록
- 🔄 Paul PC Cursor(Notion MCP ON) 채팅: `docs/notion-sync-block.md Notion PM 허브에 반영해줘`

---
- ✅ origin `cursor/hub-phase0-0f7e` pull 확인 (`855cadb`, main 대비 **17 commits**, PR #2 Draft)
- ✅ repo와 PROGRESS.md 대체로 일치: jabi. brand.json, 3모드, mock-02, SRS 연습, Notion PM URL `Paul-PM-3a76…`
- ⚠️ `hub/jabi-logo-preview.html` — DAILY-LOG에는 있으나 **repo에 파일 없음** (재생성 또는 Kimi 커밋 누락 확인)
- ⚠️ 문서·manifest 일부仍 "TOPIK Coach" (Claude 정리 예정)
- 🔄 다음: Paul **MCP Login** → 채팅 `MCP 연결했어`

---

### 23:40 Kimi
- jabi. 리브랜딩 완료: brand.json, app.js, i18n.js, index.html
- 3모드 확정: Catch / Mercy / Guide
- 로고 프리뷰 4옵션 생성 (`hub/jabi-logo-preview.html`)
- Option D (lowercase + period) 임시 확정 → Claude에서 Canva 디자인 이어갈 예정
- 🔄 다음: Claude — Canva 로고 디자인, 랜딩 페이지 jabi. 톤 적용

### 23:20 Paul
- 브랜딩 방향 확정: "jabi." (wensonjabi에서 추출)
- 자비/잡이/길잡이 3중 의미 확정
- Canva 연계는 Claude에서 이어서 진행하기로

---

# 로그 작성 규칙

```
### HH:MM 이름
- 한 줄 요약
- 한 줄 요약
- 🔄 다음: 누구 — 할 일
```

- `🔄 다음:` — 핸드오프가 필요한 항목
- `⚠️ Paul:` — Paul의 결정/확인이 필요한 항목
- `✅ 완료:` — 완료된 항목

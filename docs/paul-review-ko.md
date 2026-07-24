# Paul — 지금까지 정리된 생각 (확인용)

> **Paul이 할 일:** 아래를 읽고, 틀린 것만 알려 주세요. 맞으면 Notion에 복사해 두고 `/ops/review.html`에서도 같은 내용을 봅니다.  
> **Notion 홈:** https://app.notion.com/p/3a56d7c83f4481229fdde56471410908

---

## 1. 한 장 그림

| 구분 | 주소·이름 | 역할 |
|------|-----------|------|
| **Paul 본인** | [wensonjabi.com](https://www.wensonjabi.com/) | 정체성·신뢰 (교육 상품 이름 아님) |
| **교육 허브 (만드는 중)** | Vercel `hub/` 폴더 | Learn·Blog·앱·강사·샵 — **아직 본 사이트와 연결 안 함** |
| **앱 1차** | TOPIK **I** (읽기 모의, 스트릭, 약점 SRS) | Zoom 학생 5명 베타 목표 |
| **콘텐츠** | Reddit 질문 → 블로그 **영+한** | Reddit에 **자동 글쓰기는 안 함** |
| **앱 유료** | Lemon Squeezy Pro (~$6.99/월) | **지금 달러 내는 가입비 없음**, 팔릴 때만 수수료 |
| **1:1 강의** | PayPal / Wise 등 **직접** | Lemon Squeezy에 안 태움 |

---

## 2. 이미 정해 둔 것 (✅ = Paul도 동의하면 OK)

- [ ] **허브는 wensonjabi.com과 분리** — merge 체크리스트 전까지 본 사이트 안 건드림  
- [ ] **상품 브랜드 이름은 아직 미정** — 코드만 임시 이름 **TOPIK Coach**, 나중에 `brand.json`에서 변경  
- [ ] **블로그 영·한 병행**  
- [ ] **앱 v1 = TOPIK I만** (듣기·읽기, L1–L2 밴드)  
- [ ] **AI 중심 앱**, 강사는 **선택** (AI 리포트 → 1:1)  
- [ ] **결제** 앱 Pro = Lemon Squeezy, 강의 = 직접 송금  

---

## 3. 아직 안 정한 것 (나중에 OK)

- 최종 **상품명·도메인** (예: topikcoach.app 등)  
- **hub.wensonjabi.com** — 브랜드 확정 전엔 Vercel 미리보기 URL 먼저  
- Google **Sheet / Doc / Canva** 링크 (만들면 `hub/config/ops-links.json`에 붙임)  

---

## 4. 지금 코드로 만들어진 것

| 것 | 상태 | 바로가기 |
|----|------|----------|
| 스테이징 허브 + TOPIK I 앱 MVP | PR #2, Vercel은 Paul 계정에 연결 필요 | [GitHub PR](https://github.com/wensonjabi-p/paul-intro/pull/2) |
| PM 링크 페이지 | `/ops/` | 배포 후 `…/ops/` |
| **이 확인 페이지** | `/ops/review.html` | 배포 후 열기 |
| 상세 기술 문서 | repo `docs/` | [마스터 플랜](https://github.com/wensonjabi-p/paul-intro/blob/main/docs/wensonjabi-ecosystem-master-plan.md) |

---

## 5. Phase — 지금 어디?

| Phase | 뜻 | Paul 관점 |
|-------|-----|-----------|
| **0** | 허브·앱 껍데기 공유 가능 | **지금** — Vercel에 `hub` 올리기 + 이 문서 확인 |
| **1** | 앱 본격 + Pro(나중) + 베타 5명 | Zoom 학생에게 링크 |
| **2** | Reddit→블로그 루프 | Google Sheet 큐 |
| **3+** | 강사·상점 등 | **아직 안 함** |

---

## 6. Paul 매일 쓰는 흐름 (앞으로)

1. **Notion** 열기 (위 홈 링크)  
2. **「확인할 것」**만 읽고, OK면 체크  
3. OK 난 것만 Cursor/코드 진행  
4. 링크 모음은 **Notion + `/ops/`** (같은 URL 유지)

---

## 7. Notion에 5분만 (Paul 손)

Cursor가 Notion에 자동으로 페이지를 못 만듭니다. **Paul PC Cursor에서 Notion 로그인**하면 다음부터 에이전트가 대신 넣을 수 있습니다.

지금은 Notion 홈 아래에 페이지 하나:

**제목:** `한국어 생태계 — Paul PM`

**본문에 붙여넣기:** 이 파일 전체 (`docs/paul-review-ko.md`) 또는 `/ops/review.html` 내용

**선택:** 표 하나 추가 — 열 `이름 | Phase | 진행 | GitHub 링크` — `/ops/`에 나온 항목 복사

---

## 8. 다음 자동 진행 (Paul 답 없이 할 수 있는 것)

- Vercel 배포는 **Paul이 프로젝트 연결**해야 URL 생김 → 연결 후 URL만 알려 주면 json에 반영  
- Google Sheet·Canva URL 오면 `ops-links.json` + `/ops` 버튼 활성화  

**Paul에게 한 가지만:** 위 **§2 체크리스트**에서 틀린 번호가 있으면 알려 주세요. 없으면 **「§2 OK」**라고만 보내 주시면 Phase 0(Vercel) 안내로 넘어갑니다.

# jabi. 문항 QA 관리 앱

URL (로컬): `http://127.0.0.1:8765/ops/qa/`  
Unlock: `QA-PAUL`

## 루프

1. Paul이 학습 앱과 같은 문항을 보고 **대상·이유 칩**으로 표시  
2. 로컬에 쌓인 피드백 → **JSON 내보내기** (클립보드 포함)  
3. Cursor/Claude 채팅에 붙여넣기 → **수정 제안(diff)**  
4. Paul 승인 후에만 `hub/app/data/verified-*.json` 반영  
5. 다시 QA 앱으로 재검수  

AI가 뱅크를 자동 커밋하지 않음.

## 파일

| 경로 | 역할 |
|------|------|
| `index.html` / `qa.js` / `qa.css` | 검수 UI |
| `feedback.schema.json` | 피드백 스키마 |
| `../` ops 허브에서 링크 | 바로가기 |

## 다음 (아직 미구현)

- 서버 동기화 / 진짜 로그인  
- AI 배치 자동 제안 파이프  
- 복수 검수자

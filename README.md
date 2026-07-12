# Paul Bhang — Thought Constellation

인터랙티브 자기소개 페이지. 머릿속 단어들을 성좌처럼 띄우고, 방문자가 단어를 골라 조합하면
실제 커리어 여정(The Atlas, 8 chapters)과 최근의 생각이 합성되어 나타납니다.

- 단일 `index.html` — 빌드 없음, 의존성 없음
- 디자인: 다크(#050419) + 브라스(#D4A24E) 투컬러, Awwwards Vectr(2026 SOTD) 스타일 학습 기반
- 방문자가 추가한 생각/단어는 localStorage에 저장

## 배포

GitHub `main` 브랜치에 push하면 Vercel이 자동으로 배포합니다.

```
git add . && git commit -m "update" && git push
```

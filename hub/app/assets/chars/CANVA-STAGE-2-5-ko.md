# Canva에서 ㄱ(giyeok) stage 2–5 만들기 — Paul용 상세 가이드

> **짧게 복붙만 하려면:** [`CANVA-PASTE-WORKSHEET-ko.md`](./CANVA-PASTE-WORKSHEET-ko.md) (stage 3–5 순차 체크리스트)

> **목표:** 앱용 PNG 4장 (`giyeok-2` … `giyeok-5`)  
> **이미 완료:** stage1 베이비 · stage6 풀히어로 (Paul OK)  
> **작업장:** https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379  
> **끝난 뒤:** 파일을 `hub/app/assets/chars/source/`에 넣고 Cursor 채팅에 **넣었어**

---

## 0. 한 번만 읽기 (규칙)

1. **Chrome**에서 위 스레드를 연다. (Cursor 안 브라우저 X — 로그인 안 됨)
2. **한 번에 캐릭터 하나만.** 6칸 그리드 / “progression grid” 금지.
3. 자음은 반드시 **ㄱ (giyeok)** 만. ㄴㄷㄹㅈ 나오면 **버림**.
4. 아이템은 **이전 단계 것을 모두 유지한 채** 하나만 추가.
5. **얼굴·글자·배지·둥근 사각 배경·그림자·그라데이션** 넣지 말 것.
6. 배경은 **단색 검정 또는 흰색** (지금 stage1·6과 같이 검정이면 검정 유지).
7. 후보가 여러 장 나오면 **ㄱ 형태가 stage1과 제일 비슷한 것** 1장만 고른다.

### 스타일락 (승인된 stage1 기준)

| 항목 | 값 |
|------|-----|
| 몸통 | 플랫 초록 `#7AB968` 근처 |
| 외곽선 | 두껍고 균일, 거의 검정/짙은 차콜 |
| 형태 | 한글 **ㄱ** — 위 가로바 + 오른쪽에서 내려오는 줄기 + **짧은 두 다리** |
| 팬티 | **빨강** (시그니처) |
| 부츠 | 작고 둥근, 남색/어두운 톤 (stage6과 비슷) |
| 무기 | 갈색 갈고리/목동 지팡이 (ㄱ 느낌의 훅) |
| 방패 | 작은 원형, 노랑/금 + 가운데 점 |
| 왕관 | stage5까지는 **없음** (stage6만) |

### 레퍼런스로 붙이면 좋은 파일 (스레드에 업로드 / 이전 이미지 지정)

- stage1: `hub/app/assets/chars/source/giyeok-1.png`
- stage6: `hub/app/assets/chars/source/giyeok-6.png` (최종 아이템 색·비율 참고용)

Canva AI에서 “이전 이미지와 동일 스타일” / reference로 지정할 수 있으면 **stage1을 본체 기준**, stage6은 **아이템 색만 참고**.

---

## 1. 공통으로 앞에 붙이는 문장 (매 프롬프트)

아래 블록을 **매번 프롬프트 맨 앞**에 붙입니다.

```text
STYLE LOCK (must match our approved giyeok stage-1 mascot):
- Single character only. No grid, no collage, no multiple poses.
- Korean Hangul consonant ㄱ (giyeok) body ONLY — looks like a thick rounded "ㄱ" / inverted-L with two stubby feet. NOT ㄴ, ㄷ, ㄹ, ㅈ, or any other letter.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge, no rounded-square frame.
- Plain solid black background.
- Centered, full body, facing forward.
- Keep the SAME body proportions as the reference baby ㄱ.
```

---

## 2. Stage 2 — 빨간 팬티만 → `giyeok-2.png`

### 할 일
1. 스레드 입력창에 **§1 공통문 + 아래 프롬프트** 붙여넣기 → Generate  
2. 결과 중 **ㄱ + 빨간 팬티만** 있는 장 고르기  
3. 다운로드 (JPG/PNG 상관없음)  
4. 파일 이름을 **`giyeok-2.png`** 로 바꿔  
   `Documents\ClaudeWeb\paul-intro\hub\app\assets\chars\source\` 에 넣기  

### 프롬프트 (복붙)

```text
STYLE LOCK (must match our approved giyeok stage-1 mascot):
- Single character only. No grid, no collage, no multiple poses.
- Korean Hangul consonant ㄱ (giyeok) body ONLY — looks like a thick rounded "ㄱ" / inverted-L with two stubby feet. NOT ㄴ, ㄷ, ㄹ, ㅈ, or any other letter.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge, no rounded-square frame.
- Plain solid black background.
- Centered, full body, facing forward.
- Keep the SAME body proportions as the reference baby ㄱ.

STAGE 2 — add ONLY red briefs:
- Same green ㄱ body and stubby feet as stage 1.
- Add signature bright RED briefs/panties at the hips (clear waistband + two leg openings).
- Do NOT add boots, weapon, shield, crown, hands holding items, or any other gear.
- Items must look attached to the body, not floating stickers.
```

### 합격 체크
- [ ] 자음이 **ㄱ** 인가  
- [ ] **빨간** 팬티만 있는가  
- [ ] 부츠·무기·방패·왕관이 **없는가**

---

## 3. Stage 3 — 팬티 + 부츠 → `giyeok-3.png`

### 할 일
동일. 저장명 **`giyeok-3.png`**

### 프롬프트 (복붙)

```text
STYLE LOCK (must match our approved giyeok stage-1 mascot):
- Single character only. No grid, no collage, no multiple poses.
- Korean Hangul consonant ㄱ (giyeok) body ONLY — looks like a thick rounded "ㄱ" / inverted-L with two stubby feet. NOT ㄴ, ㄷ, ㄹ, ㅈ, or any other letter.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge, no rounded-square frame.
- Plain solid black background.
- Centered, full body, facing forward.
- Keep the SAME body proportions as the reference baby ㄱ.

STAGE 3 — keep pants, add boots:
- Same green ㄱ body.
- KEEP the bright RED briefs (waistband + two leg openings).
- ADD small dark navy/charcoal boots on BOTH feet.
- Do NOT add weapon, shield, or crown.
- Boots and briefs must both be clearly visible together.
```

### 합격 체크
- [ ] ㄱ  
- [ ] 빨간 팬티 **있음**  
- [ ] 양발 부츠 **있음**  
- [ ] 무기·방패·왕관 **없음**

---

## 4. Stage 4 — +갈고리 무기 → `giyeok-4.png`

### 할 일
저장명 **`giyeok-4.png`**

### 프롬프트 (복붙)

```text
STYLE LOCK (must match our approved giyeok stage-1 mascot):
- Single character only. No grid, no collage, no multiple poses.
- Korean Hangul consonant ㄱ (giyeok) body ONLY — looks like a thick rounded "ㄱ" / inverted-L with two stubby feet. NOT ㄴ, ㄷ, ㄹ, ㅈ, or any other letter.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge, no rounded-square frame.
- Plain solid black background.
- Centered, full body, facing forward.
- Keep the SAME body proportions as the reference baby ㄱ.

STAGE 4 — keep pants+boots, add hook weapon:
- KEEP bright RED briefs.
- KEEP dark navy boots on both feet.
- ADD one brown wooden hook staff / shepherd crook (ㄱ-inspired hook) held on ONE side, with a simple small green hand if needed.
- Do NOT add shield or crown.
- Pants + boots + weapon must all be visible together.
```

### 합격 체크
- [ ] ㄱ  
- [ ] 팬티+부츠+갈고리 **모두**  
- [ ] 방패·왕관 **없음**

---

## 5. Stage 5 — +방패 → `giyeok-5.png`

### 할 일
저장명 **`giyeok-5.png`**

### 프롬프트 (복붙)

```text
STYLE LOCK (must match our approved giyeok stage-1 mascot):
- Single character only. No grid, no collage, no multiple poses.
- Korean Hangul consonant ㄱ (giyeok) body ONLY — looks like a thick rounded "ㄱ" / inverted-L with two stubby feet. NOT ㄴ, ㄷ, ㄹ, ㅈ, or any other letter.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge, no rounded-square frame.
- Plain solid black background.
- Centered, full body, facing forward.
- Keep the SAME body proportions as the reference baby ㄱ.

STAGE 5 — keep pants+boots+weapon, add shield:
- KEEP bright RED briefs.
- KEEP dark navy boots on both feet.
- KEEP the brown hook staff on one side.
- ADD a small round shield on the OPPOSITE side (yellow/gold ring with a small brown center), held by a simple green hand if needed.
- Do NOT add a crown yet (crown is stage 6 only — already approved).
- Pants + boots + weapon + shield must all be visible together.
```

### 합격 체크
- [ ] ㄱ  
- [ ] 팬티+부츠+무기+방패 **모두**  
- [ ] 왕관 **없음**

---

## 6. 다운로드 · 이름 · 넣는 위치

1. Canva에서 고른 이미지 → **Download** (PNG 가능하면 PNG, JPG도 OK)  
2. 탐색기에서 이름을 정확히:
   - `giyeok-2.png`
   - `giyeok-3.png`
   - `giyeok-4.png`
   - `giyeok-5.png`  
3. 폴더:
   ```
   C:\Users\biker\Documents\ClaudeWeb\paul-intro\hub\app\assets\chars\source\
   ```
4. Cursor 채팅에: **넣었어**

한 장만 먼저 넣어도 됩니다. (예: stage2만 → 추적 확인 후 3–5)

---

## 7. 자주 하는 실수

| 증상 | 대응 |
|------|------|
| ㄷ·ㄹ·ㅈ로 나옴 | 버림. 프롬프트에 `ㄱ ONLY / NOT ㅈ` 다시 넣고 재생성 |
| 그리드 6칸 | 버림. “Single character only” 유지 |
| 4단계에서 팬티 사라짐 | 버림. “KEEP bright RED briefs” 강조된 프롬프트로 재생성 |
| 파란/남색 팬티 | 버림. 시그니처는 **빨강** |
| stage5에 왕관까지 | 버림. 왕관은 stage6만 |

---

## 8. Cursor가 이어서 할 일 (Paul 할 일 아님)

`source/giyeok-2.png` … `5.png`가 오면:

```bash
python scripts/trace-character-multi.py hub/app/assets/chars/source/giyeok-2.png hub/app/assets/chars/char-giyeok-2.svg
# … 3,4,5 동일
```

그다음 `_check.html`로 1·2·3·4·5·6 나란히 확인.

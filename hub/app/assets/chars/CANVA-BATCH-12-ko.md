# 나머지 12 자음 일괄 — Canva 배치 체크리스트

> **★ Paul 실행 순서 (한 문서):** [`CANVA-SCRIPTS-ORDERED-ko.md`](./CANVA-SCRIPTS-ORDERED-ko.md) — Script A ㄴ → Script B ㄷ…ㅎ · 복붙 프롬프트·공통 규칙.  
> **의미:** 파트너 로스터 13마리 중 파일럿 **ㄱ(giyeok) 1–6 Paul OK** 완료 → **남은 12자**를 같은 6단 아이템 스택으로 제작.  
> **★ 지금 Paul:** **ㄴ nieun** stage 1–6 (아래 워크시트 A = 위 스크립트 §2와 동일) · Chrome Canva 스레드.  
> **Cursor:** 워크시트·manifest·추적 스크립트만. **하지 말 것:** 가짜 SVG · giyeok 덮어쓰기 · 획순.

**Canva AI 스레드:** https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379  
**스타일락:** giyeok stage1/2/6 PNG 참고 · 초록 몸통 · 두꺼운 외곽선 · 검정 배경 · 얼굴 없음 · **한 장에 캐릭터 1개** · 그리드 금지  
**저장 경로:** `hub/app/assets/chars/source/{id}-{1..6}.png` → 채팅에 **넣었어** → Cursor `python scripts/trace-char-sources.py {id}`

---

## 로스터 (ㅈ 제외)

| 순번 | id | 글자 | 무기 힌트 | Canva | PNG×6 | SVG×6 | Paul OK |
|------|-----|------|-----------|-------|-------|-------|---------|
| 0 | giyeok | ㄱ | 갈고리 지팡이 | ✅ | ✅ | ✅ | ✅ **완료** |
| **1** | **nieun** | **ㄴ** | L선반 지팡이 | ☐ | ☐ | ☐ | ☐ ← **다음** |
| **2** | **digeut** | **ㄷ** | U요람 지팡이 | ☐ | ☐ | ☐ | ☐ ← **그다음** |
| 3 | rieul | ㄹ | 지그재그 스태프 | ☐ | ☐ | ☐ | ☐ |
| 4 | mieum | ㅁ | 사각 프레임 | ☐ | ☐ | ☐ | ☐ |
| 5 | bieup | ㅂ | 쌍기둥 | ☐ | ☐ | ☐ | ☐ |
| 6 | siot | ㅅ | V포크 | ☐ | ☐ | ☐ | ☐ |
| 7 | ieung | ㅇ | 링/후프 | ☐ | ☐ | ☐ | ☐ |
| 8 | chieut | ㅊ | 삼지창+윗획 | ☐ | ☐ | ☐ | ☐ |
| 9 | kieuk | ㅋ | ㄱ훅+가로획 | ☐ | ☐ | ☐ | ☐ |
| 10 | tieut | ㅌ | 삼단 가로 | ☐ | ☐ | ☐ | ☐ |
| 11 | pieup | ㅍ | H레일 | ☐ | ☐ | ☐ | ☐ |
| 12 | hieut | ㅎ | 모자/헤일로 | ☐ | ☐ | ☐ | ☐ |

**제외:** `jieut` ㅈ = 자비(jabi.) NPC — 파트너 목록 밖.

---

## 자음당 작업 순서 (ㄱ과 동일)

1. **stage 1 baby** — 아이템 없음 · 자음 몸통만  
2. **stage 2 pants** — +빨간 팬티  
3. **stage 3 boots** — +남색 부츠  
4. **stage 4 weapon** — +그 자음 형태 무기 (표의 힌트)  
5. **stage 5 shield** — +금테 갈색 원형 방패  
6. **stage 6 crown** — +작은 왕관  

각 단계: 이전 단계 PNG를 Canva에 **사진으로 붙인 뒤** “ONLY add …” 프롬프트. 그리드·다른 자음·얼굴 나오면 **버림**.

끝난 뒤:

```text
source/{id}-1.png … {id}-6.png 넣음
```

Cursor:

```bash
python scripts/trace-char-sources.py {id}
# 상태 표:
python scripts/trace-char-sources.py --status
```

미리보기: `hub/app/assets/chars/_check.html` → Paul OK → 다음 글자.

---

## 상세 워크시트 A — ㄴ nieun ★ 지금 이 글자

> **목표:** PNG 6장 → `source/nieun-1.png` … `nieun-6.png`  
> **id 확정:** `manifest.json` → `"id": "nieun"` · 추적: `python scripts/trace-char-sources.py nieun`  
> **스레드:** https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379 (Chrome만 · Cursor 안 브라우저 X)  
> **끝나면:** 채팅에 **넣었어** → Cursor가 SVG 추적 · giyeok는 **절대 덮어쓰지 않음**

### 0) 한 번만 읽기

1. Chrome에서 위 Canva AI 스레드 열기  
2. **한 장에 캐릭터 1개** · 그리드 / progression collage **버림**  
3. 자음은 반드시 **ㄴ (nieun)** · ㄱㄷㄹㅈ 나오면 **버림**  
4. 아이템은 **이전 단계 전부 유지** + **하나만** 추가  
5. 얼굴·글자·배지·그림자·그라데이션 금지 · 배경 **단색 검정**  
6. 후보 여러 장이면 **ㄴ 형태가 제일 선명한 것** 1장만

### 스타일 참고 사진 (색·비율만 · 몸통은 ㄴ)

| 용도 | 파일 (이미 있음) |
|------|------------------|
| 베이비 몸통 비율·초록·외곽선 | `hub/app/assets/chars/source/giyeok-1.png` |
| 빨간 팬티 색 | `source/giyeok-2.png` |
| 부츠·무기·방패·왕관 색 | `source/giyeok-6.png` |

**체인 사진 (단계마다 직전 nieun PNG):** stage2부터는 **방금 만든 `nieun-(n-1).png`** 를 Canva에 사진으로 붙인 뒤 프롬프트.

### 저장 폴더 · 파일명 (정확히 이 이름)

```text
C:\Users\biker\Documents\ClaudeWeb\paul-intro\hub\app\assets\chars\source\
  nieun-1.png
  nieun-2.png
  nieun-3.png
  nieun-4.png
  nieun-5.png
  nieun-6.png
```

---

### Stage 1 — 베이비 · `nieun-1.png`

**할 일**
1. (선택) 스레드에 참고로 `giyeok-1.png` 업로드 — **색·스타일만**, 글자는 ㄴ  
2. 아래 프롬프트 통째로 복붙 → Generate  
3. **ㄴ 몸통만** (아이템 없음) 고르기 → 다운로드 → 이름 **`nieun-1.png`** → `source/` 에 넣기  

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㄴ (nieun) body ONLY — thick rounded shelf / reverse-L shape (horizontal top bar with vertical stem down the RIGHT side), two stubby feet. NOT ㄱ, ㄷ, ㄹ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

**합격:** [ ] ㄴ인가 [ ] 아이템 없음 [ ] 검정 배경 [ ] `nieun-1.png`

---

### Stage 2 — +빨간 팬티 · `nieun-2.png`

**할 일**
1. Canva에 **사진 붙이기:** `source/nieun-1.png`  
2. 아래 복붙 → Generate → 팬티만 추가된 장 고르기  
3. 저장명 **`nieun-2.png`** → `source/`  

```text
Same green Hangul ㄴ (nieun) character as the reference: thick rounded shelf / reverse-L body, two stubby feet, thick dark outline, flat colors, solid black background. No face. Single character only, no grid.
ONLY add bright red briefs (clear waistband + two leg holes). No boots, no staff, no shield, no crown.
```

**합격:** [ ] ㄴ [ ] 빨간 팬티만 [ ] 부츠·무기 없음 [ ] `nieun-2.png`

---

### Stage 3 — +남색 부츠 · `nieun-3.png`

**사진:** `source/nieun-2.png` → 저장 **`nieun-3.png`**

```text
Same green Hangul ㄴ character as the reference: red briefs, thick outline, black background. No face. Single character only, no grid.
KEEP red briefs. ONLY add small dark navy rounded boots on both stubby legs. No staff, no shield, no crown.
```

**합격:** [ ] 팬티 유지 [ ] 양발 남색 부츠 [ ] 무기·방패·왕관 없음

---

### Stage 4 — +L선반 지팡이 · `nieun-4.png`

**사진:** `source/nieun-3.png` → 저장 **`nieun-4.png`**  
(무기 모양 = **ㄴ** · ㄱ 갈고리 아님 · 색은 `giyeok-6.png` 갈색 참고)

```text
Same green Hangul ㄴ character as the reference: red briefs, navy boots, thick outline, black background. No face. Single character only, no grid.
KEEP briefs and boots. ONLY add a large clear brown wooden L-shaped shelf staff / corner cane beside the body (matches ㄴ shape — top shelf + right downstroke). No shield, no crown.
```

**합격:** [ ] L선반/코너 케인 [ ] ㄱ훅 아님 [ ] 방패·왕관 없음

---

### Stage 5 — +금테 방패 · `nieun-5.png`

**사진:** `source/nieun-4.png` → 저장 **`nieun-5.png`**

```text
Same green Hangul ㄴ character as the reference: briefs, boots, L-staff, thick outline, black background. No face. Single character only, no grid.
KEEP briefs, boots, and L-staff. ONLY add a large clear round shield with gold/yellow rim and brown center. No crown.
```

**합격:** [ ] 지팡이 유지 [ ] 금테 원형 방패 [ ] 왕관 없음

---

### Stage 6 — +왕관 · `nieun-6.png`

**사진:** `source/nieun-5.png` → 저장 **`nieun-6.png`**

```text
Same green Hangul ㄴ character as the reference: briefs, boots, L-staff, round gold-rim shield, thick outline, black background. No face. Single character only, no grid.
KEEP all items. ONLY add a small simple crown on top of the character.
```

**합격:** [ ] 아이템 전부 유지 [ ] 작은 왕관 [ ] `nieun-6.png`

---

### ㄴ 끝나면 Paul

1. 위 6파일 `source/`에 있음 확인  
2. Cursor 채팅에 **넣었어** (또는 `nieun 1–6 넣음`)  
3. Cursor가 실행: `python scripts/trace-char-sources.py nieun` → `char-nieun-1.svg` … `6.svg`  
4. `_check.html`에서 눈으로 OK → 다음 글자 **ㄷ**

### 결과 체크

- [ ] `source/nieun-1.png` … `nieun-6.png`  
- [ ] Cursor 추적 → `char-nieun-*.svg`  
- [ ] `_check.html` Paul OK  

---

## 상세 워크시트 B — ㄷ digeut (ㄴ 다음 · 가볍게 대기)

> ㄴ과 같은 순서. 저장: `digeut-1.png` … `digeut-6.png` · 추적: `python scripts/trace-char-sources.py digeut`  
> 스타일 참고는 동일하게 `giyeok-1` / `2` / `6`. 체인 사진은 직전 `digeut-*.png`.

| Stage | 파일 | 사진 붙이기 | 추가 |
|-------|------|-------------|------|
| 1 | `digeut-1.png` | (선택) giyeok-1 색참고 | ㄷ 베이비만 |
| 2 | `digeut-2.png` | digeut-1 | 빨간 팬티 |
| 3 | `digeut-3.png` | digeut-2 | 남색 부츠 |
| 4 | `digeut-4.png` | digeut-3 | U요람/오픈박스 지팡이 |
| 5 | `digeut-5.png` | digeut-4 | 금테 방패 |
| 6 | `digeut-6.png` | digeut-5 | 왕관 |

### Stage 1 프롬프트 (ㄷ)

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
Green Hangul consonant ㄷ (digeut) body ONLY — thick rounded open-box / C-on-its-side shape (top bar, left vertical, bottom bar; open on the right), two stubby feet, thick dark outline, flat colors, solid black background. No face. No items. Single character only, no grid. NOT ㄱ, ㄴ, ㄹ, or ㅈ.
Baby proportions: simple round body, short stubby legs, no pants/boots/weapon/shield/crown.
```

### Stage 2–6 한 줄 (ㄷ · 사진=직전 digeut)

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden U-cradle / open-box staff (matches ㄷ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㄷ, no face, single character, black background, no grid.
```

### 결과 체크 (ㄷ)

- [ ] `source/digeut-1.png` … `6.png`  
- [ ] Cursor 추적 → `char-digeut-*.svg`  
- [ ] `_check.html` Paul OK  

---

## Cursor 쪽 (이미 배선됨)

- 앱: `charArtSrc(id, stage)` → `./assets/chars/char-{id}-{stage}.svg` · 없으면 `<img onerror>`로 글자 글리프 폴백  
- 온보딩 `PARTNER_JAMOS` = 위 13 id (ㅈ 없음)  
- 배치 추적: `scripts/trace-char-sources.py` (giyeok는 기본 보호)  
- 메타: `manifest.json`

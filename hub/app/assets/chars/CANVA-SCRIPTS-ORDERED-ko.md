# Canva 작업 스크립트 (순서대로) — Paul용

> **한 문서에 모은 실행 순서.** 디자인 시스템·프롬프트는 기존 giyeok / BATCH-12 / STAGE 가이드와 동일.  
> **지금 시작:** **Script A — ㄴ nieun 1→6**  
> 상세 원본: [`CANVA-BATCH-12-ko.md`](./CANVA-BATCH-12-ko.md) · ㄱ 아카이브: [`CANVA-PASTE-WORKSHEET-ko.md`](./CANVA-PASTE-WORKSHEET-ko.md) · [`CANVA-STAGE-2-5-ko.md`](./CANVA-STAGE-2-5-ko.md) · 메타: [`manifest.json`](./manifest.json)

---

## 1. Overview

### 완료 vs 남은 것

| 상태 | 내용 |
|------|------|
| ✅ **완료** | **ㄱ giyeok** stage 1–6 · PNG + SVG · **Paul OK** (덮어쓰기 금지) |
| ★ **지금** | **ㄴ nieun** stage 1–6 (Script A) |
| ☐ **그다음** | ㄷ → ㄹ → ㅁ → ㅂ → ㅅ → ㅇ → ㅊ → ㅋ → ㅌ → ㅍ → ㅎ (Script B, 로스터 순) |
| ❌ **제외** | **ㅈ jieut** = 자비(jabi.) NPC — 파트너 목록 밖 |

파트너 13마리(ㅈ 제외) − ㄱ = **남은 12자** × 6단 = Canva PNG 72장 목표. Cursor는 추적·배선만.

### Canva AI 스레드 (Chrome만)

https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379

- **Chrome**에서 연다. Cursor 안 브라우저 / Canva MCP로는 AI 스레드 안 열림.
- 한 장에 캐릭터 **1개**. 그리드·progression collage **버림**.

### 저장 경로 (공통)

```text
C:\Users\biker\Documents\ClaudeWeb\paul-intro\hub\app\assets\chars\source\
  {id}-1.png … {id}-6.png
```

끝나면 Cursor 채팅에 **넣었어** → `python scripts/trace-char-sources.py {id}`

### 참고 사진 (색·비율만 · 몸통은 그 글자)

| 용도 | 파일 |
|------|------|
| 베이비 몸통 비율·초록·외곽선 | `source/giyeok-1.png` |
| 빨간 팬티 색 | `source/giyeok-2.png` |
| 부츠·무기·방패·왕관 색 | `source/giyeok-6.png` |

stage 2부터는 **직전 단계 그 글자 PNG**를 Canva에 사진으로 붙인 뒤 프롬프트.

---

## 2. Script A — ㄴ nieun 1→6 ★ 지금 이 글자

**목표:** `nieun-1.png` … `nieun-6.png` → `source/` → 채팅 **넣었어**  
**추적:** `python scripts/trace-char-sources.py nieun`  
**스레드:** 위 Chrome 링크

### 0) 한 번만 읽기

1. Chrome에서 Canva AI 스레드 열기  
2. **한 장에 캐릭터 1개** · 그리드 버림  
3. 자음은 반드시 **ㄴ** · ㄱㄷㄹㅈ 나오면 **버림**  
4. 아이템 = **이전 단계 전부 유지** + **하나만** 추가  
5. 얼굴·글자·배지·그림자·그라데이션 금지 · 배경 **단색 검정**  
6. 후보 여러 장이면 **ㄴ 형태가 제일 선명한 것** 1장만

### 저장 파일명

```text
nieun-1.png
nieun-2.png
nieun-3.png
nieun-4.png
nieun-5.png
nieun-6.png
```

---

### Stage 1 — 베이비 · `nieun-1.png`

1. (선택) `giyeok-1.png` 업로드 — **색·스타일만**, 글자는 ㄴ  
2. 아래 통째로 복붙 → Generate  
3. **ㄴ 몸통만** 고르기 → 다운로드 → **`nieun-1.png`** → `source/`

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

1. **사진 붙이기:** `source/nieun-1.png`  
2. 복붙 → Generate → **`nieun-2.png`**

```text
Same green Hangul ㄴ (nieun) character as the reference: thick rounded shelf / reverse-L body, two stubby feet, thick dark outline, flat colors, solid black background. No face. Single character only, no grid.
ONLY add bright red briefs (clear waistband + two leg holes). No boots, no staff, no shield, no crown.
```

**합격:** [ ] ㄴ [ ] 빨간 팬티만 [ ] 부츠·무기 없음 [ ] `nieun-2.png`

---

### Stage 3 — +남색 부츠 · `nieun-3.png`

**사진:** `source/nieun-2.png` → **`nieun-3.png`**

```text
Same green Hangul ㄴ character as the reference: red briefs, thick outline, black background. No face. Single character only, no grid.
KEEP red briefs. ONLY add small dark navy rounded boots on both stubby legs. No staff, no shield, no crown.
```

**합격:** [ ] 팬티 유지 [ ] 양발 남색 부츠 [ ] 무기·방패·왕관 없음

---

### Stage 4 — +L선반 지팡이 · `nieun-4.png`

**사진:** `source/nieun-3.png` → **`nieun-4.png`**  
(무기 = **ㄴ** 형태 · ㄱ 갈고리 아님 · 갈색은 `giyeok-6.png` 참고)

```text
Same green Hangul ㄴ character as the reference: red briefs, navy boots, thick outline, black background. No face. Single character only, no grid.
KEEP briefs and boots. ONLY add a large clear brown wooden L-shaped shelf staff / corner cane beside the body (matches ㄴ shape — top shelf + right downstroke). No shield, no crown.
```

**합격:** [ ] L선반/코너 케인 [ ] ㄱ훅 아님 [ ] 방패·왕관 없음

---

### Stage 5 — +금테 방패 · `nieun-5.png`

**사진:** `source/nieun-4.png` → **`nieun-5.png`**

```text
Same green Hangul ㄴ character as the reference: briefs, boots, L-staff, thick outline, black background. No face. Single character only, no grid.
KEEP briefs, boots, and L-staff. ONLY add a large clear round shield with gold/yellow rim and brown center. No crown.
```

**합격:** [ ] 지팡이 유지 [ ] 금테 원형 방패 [ ] 왕관 없음

---

### Stage 6 — +왕관 · `nieun-6.png`

**사진:** `source/nieun-5.png` → **`nieun-6.png`**

```text
Same green Hangul ㄴ character as the reference: briefs, boots, L-staff, round gold-rim shield, thick outline, black background. No face. Single character only, no grid.
KEEP all items. ONLY add a small simple crown on top of the character.
```

**합격:** [ ] 아이템 전부 유지 [ ] 작은 왕관 [ ] `nieun-6.png`

---

### ㄴ 끝나면

1. 6파일 `source/` 확인  
2. Cursor에 **넣었어** (또는 `nieun 1–6 넣음`)  
3. Cursor: `python scripts/trace-char-sources.py nieun` → `char-nieun-1.svg` … `6.svg`  
4. `_check.html` 눈으로 OK → **Script B의 다음 = ㄷ**

- [ ] `source/nieun-1.png` … `nieun-6.png`  
- [ ] SVG 추적 완료  
- [ ] `_check.html` Paul OK  

---

## 3. Script B — 다음 자음 (로스터 순 · ㄱ·ㅈ 제외)

각 글자마다 **ㄱ과 동일 6단 누적**:

| Stage | 파일 | 추가 (이전 전부 KEEP) |
|-------|------|------------------------|
| 1 | `{id}-1.png` | 베이비 몸통만 (아이템 없음) |
| 2 | `{id}-2.png` | +빨간 팬티 |
| 3 | `{id}-3.png` | +남색 부츠 |
| 4 | `{id}-4.png` | +그 자음 형태 무기 (아래 표) |
| 5 | `{id}-5.png` | +금테 갈색 원형 방패 |
| 6 | `{id}-6.png` | +작은 왕관 |

**체인:** stage2부터 **직전 `{id}-(n-1).png`** 를 사진으로 붙임.  
**끝나면:** `source/` 넣고 **넣었어** → `python scripts/trace-char-sources.py {id}`

### 로스터 순서 (남은 11 + ㄷ부터)

| 순 | id | 글자 | 몸통 힌트 | Stage4 무기 |
|----|-----|------|-----------|-------------|
| 2 | **digeut** | **ㄷ** | open-box / C-on-side (위·왼·아래, 오른쪽 열림) | U요람 / open-box 갈색 지팡이 |
| 3 | rieul | ㄹ | stair / zigzag | 지그재그 스태프 |
| 4 | mieum | ㅁ | box | 사각 프레임 스태프 |
| 5 | bieup | ㅂ | two pillars + top | 쌍기둥 스태프 |
| 6 | siot | ㅅ | V / chevron | V포크 스태프 |
| 7 | ieung | ㅇ | ring / circle | 링/후프 랜스 |
| 8 | chieut | ㅊ | ㅅ + top stroke | 삼지창+윗획 |
| 9 | kieuk | ㅋ | ㄱ + mid stroke | ㄱ훅+가로획 스태프 |
| 10 | tieut | ㅌ | ㄷ + mid bar | 삼단 가로 스태프 |
| 11 | pieup | ㅍ | two horizontals + stem | H레일 / twin rail |
| 12 | hieut | ㅎ | hat / o with top | 모자·헤일로 메이스 |

---

### B-1 · ㄷ digeut (ㄴ 다음)

**저장:** `digeut-1.png` … `digeut-6.png` · 추적: `digeut`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㄷ (digeut) body ONLY — thick rounded open-box / C-on-its-side shape (top bar, left vertical, bottom bar; open on the right), two stubby feet. NOT ㄱ, ㄴ, ㄹ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2 — 사진 `digeut-1.png`

```text
Same green Hangul ㄷ (digeut) character as the reference: thick rounded open-box body, two stubby feet, thick dark outline, flat colors, solid black background. No face. Single character only, no grid.
ONLY add bright red briefs (clear waistband + two leg holes). No boots, no staff, no shield, no crown.
```

#### Stage 3 — 사진 `digeut-2.png`

```text
Same green Hangul ㄷ character as the reference: red briefs, thick outline, black background. No face. Single character only, no grid.
KEEP red briefs. ONLY add small dark navy rounded boots on both stubby legs. No staff, no shield, no crown.
```

#### Stage 4 — 사진 `digeut-3.png`

```text
Same green Hangul ㄷ character as the reference: red briefs, navy boots, thick outline, black background. No face. Single character only, no grid.
KEEP briefs and boots. ONLY add a large clear brown wooden U-cradle / open-box staff beside the body (matches ㄷ shape). No shield, no crown.
```

#### Stage 5 — 사진 `digeut-4.png`

```text
Same green Hangul ㄷ character as the reference: briefs, boots, U-cradle staff, thick outline, black background. No face. Single character only, no grid.
KEEP briefs, boots, and staff. ONLY add a large clear round shield with gold/yellow rim and brown center. No crown.
```

#### Stage 6 — 사진 `digeut-5.png`

```text
Same green Hangul ㄷ character as the reference: briefs, boots, U-cradle staff, round gold-rim shield, thick outline, black background. No face. Single character only, no grid.
KEEP all items. ONLY add a small simple crown on top of the character.
```

---

### B-2 · ㄹ rieul

**저장:** `rieul-1.png` … `6.png` · 추적: `rieul`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㄹ (rieul) body ONLY — thick rounded stair / zigzag shape, two stubby feet. NOT ㄱ, ㄴ, ㄷ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6 (사진 = 직전 `rieul-*.png`)

```text
#2 Same green Hangul ㄹ as reference: thick outline, black background, no face, single character. ONLY add bright red briefs. No boots/staff/shield/crown.
#3 KEEP red briefs. ONLY add small dark navy rounded boots on both legs. No staff/shield/crown.
#4 KEEP briefs+boots. ONLY add a large clear brown wooden zigzag staff / snake crook (matches ㄹ). No shield/crown.
#5 KEEP briefs+boots+zigzag staff. ONLY add round gold-rim brown-center shield. No crown.
#6 KEEP all. ONLY add a small simple crown on top.
```

---

### B-3 · ㅁ mieum

**저장:** `mieum-1.png` … `6.png` · 추적: `mieum`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅁ (mieum) body ONLY — thick rounded box / square frame shape, two stubby feet. NOT ㄱ, ㅂ, ㅇ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden square-frame staff (matches ㅁ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅁ, no face, single character, black background, no grid.
```

---

### B-4 · ㅂ bieup

**저장:** `bieup-1.png` … `6.png` · 추적: `bieup`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅂ (bieup) body ONLY — thick rounded two-pillars-plus-top shape, two stubby feet. NOT ㅁ, ㅍ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden double-pillar staff (matches ㅂ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅂ, no face, single character, black background, no grid.
```

---

### B-5 · ㅅ siot

**저장:** `siot-1.png` … `6.png` · 추적: `siot`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅅ (siot) body ONLY — thick rounded V / chevron shape, two stubby feet. NOT ㅈ, ㅊ, or ㅎ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden V-fork / prong staff (matches ㅅ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅅ, no face, single character, black background, no grid.
```

---

### B-6 · ㅇ ieung

**저장:** `ieung-1.png` … `6.png` · 추적: `ieung`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅇ (ieung) body ONLY — thick rounded ring / circle shape, two stubby feet. NOT ㅎ, ㅁ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden ring staff / hoop lance (matches ㅇ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅇ, no face, single character, black background, no grid.
```

---

### B-7 · ㅊ chieut

**저장:** `chieut-1.png` … `6.png` · 추적: `chieut`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅊ (chieut) body ONLY — thick rounded ㅅ-plus-top-stroke shape, two stubby feet. NOT ㅅ, ㅈ, or ㅎ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden trident / forked spear with top bar (matches ㅊ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅊ, no face, single character, black background, no grid.
```

---

### B-8 · ㅋ kieuk

**저장:** `kieuk-1.png` … `6.png` · 추적: `kieuk`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅋ (kieuk) body ONLY — thick rounded ㄱ-plus-mid-stroke shape, two stubby feet. NOT plain ㄱ, ㅌ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden hook staff with crossbar (matches ㅋ — not plain ㄱ crook). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅋ, no face, single character, black background, no grid.
```

---

### B-9 · ㅌ tieut

**저장:** `tieut-1.png` … `6.png` · 추적: `tieut`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅌ (tieut) body ONLY — thick rounded ㄷ-plus-mid-bar shape, two stubby feet. NOT plain ㄷ, ㅋ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden triple-bar staff (matches ㅌ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅌ, no face, single character, black background, no grid.
```

---

### B-10 · ㅍ pieup

**저장:** `pieup-1.png` … `6.png` · 추적: `pieup`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅍ (pieup) body ONLY — thick rounded two-horizontals-plus-stem / H-rail shape, two stubby feet. NOT ㅂ, ㅁ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden H-frame / twin-rail staff (matches ㅍ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅍ, no face, single character, black background, no grid.
```

---

### B-11 · ㅎ hieut

**저장:** `hieut-1.png` … `6.png` · 추적: `hieut`

#### Stage 1

```text
STYLE LOCK (match approved jabi. giyeok mascot style, but different letter):
- Single character only. No grid, no collage, no multiple poses.
- Green Hangul consonant ㅎ (hieut) body ONLY — thick rounded hat / circle-with-top shape, two stubby feet. NOT ㅇ, ㅊ, or ㅈ.
- Flat vector logo look: bold even dark outline, solid medium-green body fill, no gradients, no shadows, no face, no text, no badge.
- Plain solid black background. Centered, full body, facing forward.
- Baby proportions: simple body, short stubby legs. No pants, boots, weapon, shield, or crown.
```

#### Stage 2–6

```text
#2 ONLY add bright red briefs. #3 KEEP briefs; ONLY add navy boots. #4 KEEP briefs+boots; ONLY add brown wooden halo staff / hat-top mace (matches ㅎ). #5 KEEP all; ONLY add round gold-rim brown shield. #6 KEEP all; ONLY add small crown. Always: same green ㅎ, no face, single character, black background, no grid.
```

---

## 4. Shared rules (모든 글자 공통)

1. **배경** — 단색 **검정** (giyeok와 동일)  
2. **스타일** — flat vector · 두꺼운 균일 외곽선 · 초록 몸통 · **얼굴 없음** · 그라데이션·그림자·배지·글자 금지  
3. **ㄱ 스타일 유지, 글자 형태만 바꿈** — 비율·외곽선·아이템 색은 giyeok 참고  
4. **아이템 색** — `source/giyeok-6.png` (빨간 팬티 / 남색 부츠 / 갈색 무기 / 금테·갈색 방패 / 작은 왕관)  
5. **누적** — 이전 단계 아이템 **전부 KEEP** + **하나만** 추가  
6. **한 장 1캐릭터** — 그리드·콜라주·다른 자음 나오면 **버림**  
7. **giyeok 덮어쓰기 금지** · **ㅈ는 만들지 않음**  
8. **Chrome 스레드만** — https://www.canva.com/ai/thread/7c6a61cb-c08d-40b2-b985-72fe4bbdf379  

---

## 5. 글자 하나 끝날 때마다

```text
1. source/{id}-1.png … {id}-6.png 넣기
2. Cursor 채팅: 넣었어
3. Cursor 실행: python scripts/trace-char-sources.py {id}
4. _check.html 눈으로 Paul OK
5. 다음 글자 (로스터 순)
```

상태 전체:

```bash
python scripts/trace-char-sources.py --status
```

미리보기: `hub/app/assets/chars/_check.html`

---

## 빠른 포인터

| 지금 | 문서 |
|------|------|
| ★ **Script A ㄴ** | 이 파일 §2 |
| ㄴ 끝나면 ㄷ… | 이 파일 §3 Script B |
| 배치 체크리스트·표 | [`CANVA-BATCH-12-ko.md`](./CANVA-BATCH-12-ko.md) |
| ㄱ 아카이브 | [`CANVA-PASTE-WORKSHEET-ko.md`](./CANVA-PASTE-WORKSHEET-ko.md) · [`CANVA-STAGE-2-5-ko.md`](./CANVA-STAGE-2-5-ko.md) |
| 메타 | [`manifest.json`](./manifest.json) |

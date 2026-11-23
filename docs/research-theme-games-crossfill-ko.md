# 테마 ↔ 게임 교차 보강 메모 (2026-07-27)

> **목적:** Paul offline 데이터 루프에서 Bida 구조만 참고한 **원작** 테마·게임 교차 기록.  
> **짝:** [research-topik-bida-vocab-ko.md](research-topik-bida-vocab-ko.md) · [DAILY-LOG.md](DAILY-LOG.md)  
> **규칙:** theme-pack lemma → 게임 tags 수동 정렬 · source: original-jabi · NIKL/Sejong · ThemeSm은 tags/themes 착지 후 칩 enable.

## Latest (2026-07-27)

### ≈ GR (중급 personality-character 1팩 + speed +10)

| 산출 | 결과 |
|------|------|
| pack | intermediate **v56=676** · **`personality-character`** **12** |
| speed | **v57=570** · sq-561–570 · personalityTagged **10** · themes `personality` |
| Lemmas | 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다·소심하다·용감하다 (+ Prefer 겸손하다·엄격하다) |
| Distinct | emotion mood · habit 부지런하다·게으르다 · friends 친하다 · rules 예의 · senses 조용하다·밝다 · favor 고맙다 · celebration 축하 · opinion 칭찬하다·비판하다 |
| Chip | 제안 KO **성격** / ZH **性格** / EN Personality · key `personality` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v221** |

**Sibling next 제안:** personality-character → **cloze +8–10** (겸손하다·엄격하다 Prefer) · themes `personality` · chip KO **성격** / ZH **性格**.

### ≈ ThemeSm50b (cloze friends chip enable · 2 SHOW)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **친구** / ZH **朋友** / EN Friends · key `friends` · ThemeSm50a ORDER 재사용 |
| SHOW | speed+cloze · friendsTagged **10**×2 + `themes` · empty 6 HIDE |
| smoke | `_smoke-friends-focus.js` PASS · celebration/family 별개 · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** friends-social → **bingo/listen +8–10** (반갑다·가깝다 Prefer) · themes `friends` · chip KO **친구** / ZH **朋友**.

### ≈ GS (friends-social → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v56=552** · c-543–552 · friendsTagged **10** · themes `friends` |
| Prefer | **사귀다·방문** · 친구·친하다·함께·혼자·모이다·동아리·나누다·놀다 |
| Skip | **반갑다·가깝다** → bingo/listen Prefer |
| Distinct | celebration 모임·초대 · family kin · jobs · routine · time 만나다·약속 · speech · emotion 외롭다 · directions 사이·근처 · housing 이웃 · pack/speed verbatim |
| Chip | KO **친구** / ZH **朋友** / EN Friends · cloze.js ORDER `friends` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v218** |

**Sibling next 제안:** friends-social → **bingo/listen +8–10** (반갑다·가깝다 Prefer) · themes `friends` · chip KO **친구** / ZH **朋友**.

### ≈ GR (중급 friends-social 1팩 + speed +10)

| 산출 | 결과 |
|------|------|
| pack | intermediate **v55=664** · **`friends-social`** **12** |
| speed | **v56=560** · sq-551–560 · friendsTagged **10** · themes `friends` |
| Lemmas | 친구·친하다·함께·혼자·모이다·동아리·나누다·놀다·반갑다·가깝다 (+ Prefer 사귀다·방문) |
| Distinct | celebration 모임·초대 · family kin · time 만나다·약속 · speech 소개하다·이야기하다 · emotion 외롭다 · directions 사이·근처 · housing 이웃 · school · jobs |
| Chip | 제안 KO **친구** / ZH **朋友** / EN Friends · key `friends` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v217** |

**Sibling next 제안:** ~~cloze +8–10~~ → **Done (≈ GS)** · bingo/listen (반갑다·가깝다 Prefer).

### ≈ ThemeSm50a (friends chip enable · speed 1 SHOW)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **친구** / ZH **朋友** / EN Friends · key `friends` · 전 8 ORDER |
| SHOW | speed → ThemeSm50b 후 **2 SHOW** · empty HIDE |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~cloze~~ → **Done (≈ GS + ThemeSm50b)** · bingo/listen.

### ≈ ThemeSm49d (rules chip smoke close · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **규칙** / ZH **规则** / EN Rules · key `rules` (ThemeSm49a–49b 재사용) |
| SHOW | 전 8 · rulesTagged **10**×6 + **8**×2 + `themes` |
| smoke | `_smoke-rules-focus.js` PASS · bothTags vs favor/problem/jobs/opinion = 0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **rules-permission 스윕 닫힘** |

**Sibling next 제안:** *(닫힘)* · invent Next 금지.

### ≈ GQ (rules-permission → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v55=546** · ps-537–546 · rulesTagged **10** · themes `rules` |
| dictation | **v57=552** · d-543–552 · rulesTagged **10** · themes `rules` |
| telephone | **v54=513** · tel-506–513 · rulesTagged **8** · themes `rules` |
| scramble | **v54=515** · ws-508–515 · rulesTagged **8** · themes `rules` |
| Prefer | **허용하다·안전하다** residual · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법 (particle/dictation) · tel/scramble +예의·질서 Prefer-adjacent |
| Skip | particle/dictation: **예의·질서** (bingo/listen Prefer Done) |
| Distinct | cloze/listen hosts · favor · problem · jobs · opinion · driving · school · habit · pack verbatim |
| Chip | KO **규칙** / ZH **规则** · ThemeSm49a ORDER 재사용 · ThemeSm49d close Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v216** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done (ThemeSm49d)**.

### ≈ GP (rules-permission → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v61=597** · bg-588–597 · rulesTagged **10** · themes `rules` |
| listen | **v61=564** · lm-555–564 · rulesTagged **10** · themes `rules` |
| Prefer | **예의·질서** · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법 |
| Skip | **허용하다·안전하다** → particle residual |
| Distinct | favor · problem · jobs · opinion · driving · school · habit · cloze/listen hosts · pack verbatim |
| Chip | KO **규칙** / ZH **规则** · ThemeSm49a → ThemeSm49b (4 SHOW) → ThemeSm49d close |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v215** |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GQ)** · ~~ThemeSm close~~ → **Done (ThemeSm49d)**.

### ≈ ThemeSm49a (speed(+cloze) rules chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **규칙** / ZH **规则** / EN Rules · key `rules` |
| SHOW | speed+cloze · rulesTagged **10**×2 + `themes` · empty 6 HIDE → ThemeSm49b +bingo/listen = **4 SHOW** → ThemeSm49d **전 8** |
| Distinct | favor / problem / jobs / opinion |
| Smoke | `_smoke-rules-focus.js` PASS |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~bingo/listen~~ → **Done (≈ GP)** · ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GQ)** · ~~ThemeSm close~~ → **Done (ThemeSm49d)**.

### ≈ GO (rules-permission → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v55=542** · c-533–542 · rulesTagged **10** · themes `rules` |
| Prefer | **어기다·허용하다** · 규칙·지키다·허락하다·금지하다·자유·의무·법·안전하다 |
| Skip | **예의·질서** → bingo/listen Prefer |
| Distinct | favor · problem · jobs · opinion · driving · school · habit · pack/speed verbatim 회피 |
| Chip | KO **규칙** / ZH **规则** / EN Rules · cloze.js ORDER `rules` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v214** |

**Sibling next 제안:** ~~bingo/listen~~ → **Done (≈ GP)** · ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GQ)** · ~~ThemeSm close~~ → **Done (ThemeSm49d)**.

### ≈ GN (중급 rules-permission 1팩 + speed +10)

| 산출 | 결과 |
|------|------|
| pack | intermediate **v54=652** · **`rules-permission`** **12** |
| speed | **v55=550** · sq-541–550 · rulesTagged **10** · themes `rules` |
| Lemmas | 규칙·지키다·허락하다·금지하다·자유·의무·예의·질서·법·안전하다 (+ Prefer 어기다·허용하다) |
| Distinct | driving 위험·조심하다 · public-life 가능 · school 시험 · favor · habit · problem |
| Chip | 제안 KO **규칙** / ZH **规则** / EN Rules · speed.js ORDER `rules` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v213** |

**Sibling next 제안:** ~~cloze~~ → **Done** · bingo/listen (예의·질서 Prefer).

### ≈ ThemeSm48d (habit chip smoke close · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **습관** / ZH **习惯** / EN Habit · key `habit` (ThemeSm48a–48b 재사용) |
| SHOW | 전 8 · habitTagged **10**×6 + **8**×2 + `themes` |
| smoke | `_smoke-habit-focus.js` PASS · bothTags vs routine/change/clinic = 0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **habits-lifestyle 스윕 닫힘** |

**Sibling next 제안:** *(닫힘)* · invent Next 금지.

### ≈ GM (habits-lifestyle → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v54=536** · ps-527–536 · habitTagged **10** · themes `habit` |
| dictation | **v56=542** · d-533–542 · habitTagged **10** · themes `habit` |
| telephone | **v53=505** · tel-498–505 · habitTagged **8** · themes `habit` |
| scramble | **v53=507** · ws-500–507 · habitTagged **8** · themes `habit` |
| Prefer | **포기하다·참다** residual · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활 (particle/dictation) · tel/scramble +부지런하다·게으르다 Prefer-adjacent |
| Skip | particle/dictation: **부지런하다·게으르다** (bingo/listen Prefer Done) · tel/scramble: 익숙하다·낯설다·휴식·생활 (particle/dictation) |
| Distinct | cloze/listen hosts 분리(목표·화·키보드·이름·적응이 빨라요 등) · routine 일어나다 · clinic/health · change · motion · opinion 노력이 중요해요 |
| Chip | KO **습관** / ZH **习惯** · ThemeSm48a ORDER 재사용 · ThemeSm48d close Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v212** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done (ThemeSm48d)**.

### ≈ GL (habits-lifestyle → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v54=532** · c-523–532 · habitTagged **10** · themes `habit` |
| Prefer | **포기하다·참다** · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활 |
| Skip | **부지런하다·게으르다** → bingo/listen Prefer |
| Distinct | routine 일어나다 · clinic/health 증상 · change 방학이 지나갔어요 · motion 가다·오다 |
| Chip | KO **습관** / ZH **习惯** / EN Habit · cloze.js ORDER `habit` · SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v210** |

**Sibling next 제안:** ~~bingo/listen~~ → **Done** · ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GM)** · ~~ThemeSm close~~ → **Done (ThemeSm48d)**.

### ≈ GK (중급 habits-lifestyle 1팩 + speed +10)

| 산출 | 결과 |
|------|------|
| pack | intermediate **v53=640** · **`habits-lifestyle`** **12** |
| speed | **v54=540** · sq-531–540 · habitTagged **10** · themes `habit` |
| Lemmas | 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·부지런하다·게으르다·생활 (+ Prefer 포기하다·참다) |
| Distinct | routine · celebration 휴가 · sports 연습 · reason 목표 · problem 경험 · work 스트레스 · hobby 여가 · think · emotion |
| Chip | 제안 KO **습관** / ZH **习惯** / EN Habit · speed.js ORDER `habit` |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v209** |

**Sibling next 제안:** ~~cloze~~ → **Done (≈ GL)** · bingo/listen (부지런하다·게으르다 Prefer).

### ≈ ThemeSm47d (opinion chip smoke close · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **의견** / ZH **意见** / EN Opinion · key `opinion` (ThemeSm47a–47c 재사용) |
| SHOW | 전 8 · opinionTagged **10**×6 + **8**×2 + `themes` |
| smoke | `_smoke-opinion-focus.js` PASS · bothTags vs think/speech/favor/problem = 0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **opinion-judgment 스윕 닫힘** |

**Sibling next 제안:** *(닫힘)* · invent Next 금지.

### ≈ GH (opinion-judgment → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v53=526** · ps-517–526 · opinionTagged **10** · themes `opinion` |
| dictation | **v55=532** · d-523–532 · opinionTagged **10** · themes `opinion` |
| telephone | **v52=497** · tel-490–497 · opinionTagged **8** · themes `opinion` |
| scramble | **v52=499** · ws-492–499 · opinionTagged **8** · themes `opinion` |
| Prefer | **칭찬하다·비판하다** residual · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 (particle/dictation) · tel/scramble +확실하다·분명하다 |
| Skip | particle/dictation: **확실하다·분명하다** (bingo/listen Prefer Done) · tel/scramble: 동의하다·흥미롭다·틀리다·판단하다 (particle/dictation) |
| Distinct | think 믿다 · speech 말하다 · favor 필요하다 · problem 선택하다 · compare 반대 · hobby 관심 · cloze/listen hosts · pack verbatim |
| Chip | KO **의견** / ZH **意见** · ThemeSm47a ORDER 재사용 · ThemeSm47d close Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v208** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done (ThemeSm47d)**.

### ≈ ThemeSm47b (cloze opinion chip enable)

| 산출 | 결과 |
|------|------|
| chip | KO **의견** / ZH **意见** / EN Opinion · ThemeSm47a ORDER 재사용 |
| cloze | opinionTagged **10** + `themes` → SHOW |
| smoke | cloze SHOW · empty HIDE · (+bingo/listen ThemeSm47c → 4 SHOW) · think/speech/favor/problem 별개 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GH)** · ~~ThemeSm close~~ → **Done (ThemeSm47d)**.

### ≈ GF (opinion-judgment → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v59=577** · bg-568–577 · opinionTagged **10** · themes `opinion` |
| listen | **v59=544** · lm-535–544 · opinionTagged **10** · themes `opinion` |
| Prefer | **확실하다·분명하다** · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 |
| Skip | **칭찬하다·비판하다** (cloze Done) |
| Distinct | think 믿다 · speech 말하다 · favor 필요하다 · problem 선택하다 · compare 반대 · hobby 관심 |
| Chip | KO **의견** / ZH **意见** · ThemeSm47a ORDER 재사용 · smoke 4 SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v207** |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GH)** · ~~ThemeSm close~~ → **Done (ThemeSm47d)**.

### ≈ GE (opinion-judgment → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v53=522** · c-513–522 · opinionTagged **10** · themes `opinion` |
| Prefer | **칭찬하다·비판하다** · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 |
| Skip | **확실하다·분명하다** → bingo/listen Prefer |
| Distinct | think 믿다·그 문제 · speech 설명하다 · favor 필요하다 · problem 선택하다·상황 · compare 반대 · hobby 관심 |
| Chip | KO **의견** / ZH **意见** · ThemeSm47a ORDER 재사용 · cloze 칩 SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v206** |

**Sibling next 제안:** ~~bingo/listen~~ → **Done (GF)** · particle/dictation(+tel/scramble).

### ≈ GJ (중급 opinion-judgment 1팩 + speed +10)

| 산출 | 결과 |
|------|------|
| pack | intermediate **v52=628** · **`opinion-judgment`** **12** |
| speed | **v53=530** · sq-521–530 · opinionTagged **10** · themes `opinion` |
| Prefer cloze | **칭찬하다·비판하다** → **Done (GE)** |
| Distinct | compare 반대 · hobby 관심 · favor 필요하다 · clothes 맞다 · think 믿다 · problem 선택하다 |
| Chip | KO **의견** / ZH **意见** · ThemeSm47a 전 8 ORDER · speed SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v205** |

**Sibling next 제안:** ~~cloze~~ → **Done (GE)** · bingo/listen (확실하다·분명하다).

### ≈ ThemeSm46d (problem chip smoke close · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **문제** / ZH **问题** / EN Problem · key `problem` (ThemeSm46a–46c 재사용) |
| SHOW | 전 8 · problemTagged=**10**×6 + **8**×2 + `themes` |
| Distinct | favor · reason · think |
| Smoke | `_smoke-problem-focus.js` 전 8 SHOW PASS · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done** · **problem-solution 스윕 닫힘**.

### ≈ GI (problem-solution → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v52=516** · ps-507–516 · themes `problem` · problemTagged **10** |
| dictation | **v54=522** · d-513–522 · themes `problem` · problemTagged **10** |
| telephone | **v51=489** · tel-482–489 · themes `problem` · problemTagged **8** |
| scramble | **v51=491** · ws-484–491 · themes `problem` · problemTagged **8** |
| Prefer | **상황·조건** residual · 문제·해결·실수·어려움·도움·경험·선택·고치다 |
| Skip | **힘들다·쉽다** (bingo/listen Done) |
| Distinct | favor · reason · think · speech |
| Chip | KO **문제** / ZH **问题** · ThemeSm46d → 전 8 SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v204** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done (ThemeSm46d)**.

### ≈ GH (problem-solution → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v58=567** · bg-558–567 · problemTagged **10** · themes `problem` |
| listen | **v58=534** · lm-525–534 · problemTagged **10** · themes `problem` |
| Prefer | **힘들다·쉽다** · 문제·해결하다·고치다·실수·어려움·도움·경험·선택하다 |
| Skip | **상황·조건** (cloze Done) · pack/cloze/speed verbatim · favor/reason/think/speech |
| Chip | KO **문제** / ZH **问题** · ThemeSm46a/46b → speed+cloze+bingo/listen **4 SHOW** → ThemeSm46d 전 8 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v203** |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GI)** · ThemeSm close → **Done**.

### ≈ GG (cause-reason → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v51=506** · ps-497–506 · themes `reason` · reasonTagged **10** |
| dictation | **v53=512** · d-503–512 · themes `reason` · reasonTagged **10** |
| telephone | **v50=481** · tel-474–481 · themes `reason` · reasonTagged **8** |
| scramble | **v50=483** · ws-476–483 · themes `reason` · reasonTagged **8** |
| Prefer | **관련·효과** (particle/dict) + 이유·원인·결과·목적·방법·과정·순서·목표 |
| Skip | **그래서·왜냐하면** (bingo/listen Done) · tel/scramble skip 관련·효과 |
| Distinct | think (방법·모르다) · speech (순서·설명) · favor (순서·바꾸다) · change · compare · cloze/listen hosts |
| Chip | KO **이유** / ZH **原因** · ThemeSm close → 전 8 SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v200** |

**Sibling next 제안:** **ThemeSm close** (전 8 reasonTagged+themes · 칩 KO **이유** / ZH **原因** · smoke).

### ≈ GF (cause-reason → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v57=557** · bg-548–557 · reasonTagged **10** · themes `reason` |
| listen | **v57=524** · lm-515–524 · reasonTagged **10** · themes `reason` |
| Prefer | **그래서·왜냐하면** · 이유·원인·결과·목적·방법·과정·순서·목표 |
| Skip | **관련·효과** (cloze Done) · pack/cloze/speed verbatim · think/speech/favor/change/compare |
| Chip | KO **이유** / ZH **原因** · ThemeSm45a/45b → speed+cloze+bingo/listen **4 SHOW** |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v199** |

**Sibling next 제안:** cause-reason → **particle/dictation(+tel/scramble) +8–10** · theme `reason` · chip KO **이유** / ZH **原因**. → **Done (≈ GG)**.

### ≈ ThemeSm45b (cloze reason chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **이유** / ZH **原因** / EN Reason · key `reason` (ThemeSm45a 재사용) |
| SHOW | speed+cloze · reasonTagged=**10** + `themes` · (+bingo/listen concurrent → **4 SHOW**) |
| HIDE | particle/dictation/tel/scramble (tagged=0) |
| Distinct | think · speech · favor |
| Smoke | `_smoke-reason-focus.js` 4 SHOW · 4 HIDE PASS · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done (≈ GG)** · bingo/listen → **Done (≈ GF)** · **ThemeSm close**.

### ≈ GE (cause-reason → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v51=502** · c-493–502 · reasonTagged **10** · themes `reason` |
| Prefer | **관련·효과** · 이유·원인·결과·목적·방법·과정·순서·목표 |
| Skip | **그래서·왜냐하면** → bingo/listen |
| Distinct | think (그 이유·모르다) · speech (결과·알리다) · favor · change · compare · pack/speed verbatim |
| Chip | KO **이유** / ZH **原因** · cloze.js `theme_reason` 기존 · ThemeSm45b → SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v198** |

**Sibling next 제안:** ~~bingo/listen~~ → **Done (concurrent)** · particle/dictation(+tel/scramble).

### ≈ ThemeSm45a (speed reason chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **이유** / ZH **原因** / EN Reason · key `reason` |
| SHOW | speed · reasonTagged=**10** + `themes` → cloze 착지 후 **ThemeSm45b** |
| HIDE | bingo/listen/particle/dictation/tel/scramble (tagged=0) |
| Distinct | think · speech · favor |
| Smoke | `_smoke-reason-focus.js` 1 SHOW · 7 HIDE PASS · bothTags=0 (cloze 전) |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~cloze chip~~ → **Done (ThemeSm45b)** · particle/dictation(+tel/scramble).

### ≈ GD (cause-reason pack + speed +10)

| 산출 | 결과 |
|------|------|
| pack | **cause-reason** · 12 lemmas · intermediate **v50=604** · packs **51** |
| speed | **v51=510** · sq-501–510 · reasonTagged **10** · themes `reason` |
| Prefer cloze | **관련·효과** → **Done (GE)** |
| Distinct | compare · change · think · speech · favor · news 영향 · family 관계 |
| Chip | KO **이유** / ZH **原因** / EN Reason · ThemeSm45a Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v197** |

**Sibling next 제안:** ~~cloze~~ → **Done (GE)** · bingo/listen (그래서·왜냐하면).

---

## 최근 슬라이스

### ≈ ThemeSm close (compare chip smoke · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **비교** / ZH **比较** / EN Compare · key `compare` (ThemeSm44a 재사용) |
| SHOW | 전 8 · compareTagged=**10**×6 + **8**×2 + `themes` |
| Distinct | size · change · motion · speech · think · favor |
| Smoke | `_smoke-compare-focus.js` 전 8 SHOW PASS · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · manifest **v196** |

**Sibling next 제안:** *(없음)* · **comparison-degree 스윕 닫힘** · invent Next 금지 · Claude Next 대기.

### ≈ GF2 (comparison-degree → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v50=496** · ps-487–496 · themes `compare` · compareTagged **10** |
| dictation | **v52=502** · d-493–502 · themes `compare` · compareTagged **10** |
| telephone | **v49=473** · tel-466–473 · themes `compare` · compareTagged **8** |
| scramble | **v49=475** · ws-468–475 · themes `compare` · compareTagged **8** |
| Prefer | **똑같다·전혀** (두 색·소식) + 같다·다르다·비슷하다·비교하다·더·가장·훨씬·차이; tel/scramble skip 훨씬·차이 |
| Distinct | change · size · motion · speech · think · favor · cloze/listen/pack hosts |
| Chip | KO **비교** / ZH **比较** · ThemeSm close → **Done** |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v195**→**v196** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done** · comparison-degree 스윕 닫힘.

### ≈ ThemeSm44a (compare chip enable · tagged>0)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **비교** / ZH **比较** / EN Compare · THEME_ORDER `compare` (전 8) |
| 칩 활성 | speed+cloze+bingo+listen compareTagged=**10**×4 + `themes` → 칩 활성 |
| smoke | `_smoke-compare-focus.js` PASS · 4 SHOW · empty 4 HIDE · size/change/motion와 별개 · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** comparison-degree → **particle/dictation(+tel/scramble) +8–10**. → **Done** (≈ GF2).

### ≈ GF (comparison-degree → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v56=547** · bg-538–547 · compareTagged **10** · themes `compare` |
| listen | **v56=514** · lm-505–514 · compareTagged **10** · themes `compare` |
| Prefer | **만큼·반대** · 같다·다르다·비슷하다·비교하다·더·가장·훨씬·차이 |
| Skip | 똑같다·전혀 (cloze Done) |
| Distinct | change · size · motion · speech · think · favor |
| Chip | KO **비교** / ZH **比较** · ThemeSm44a 4 SHOW |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v195** |

**Sibling next 제안:** comparison-degree → **particle/dictation(+tel/scramble) +8–10**. → **Done** (≈ GF2) · ThemeSm close → **Done**.

### ≈ ThemeSm44a (speed(+cloze) compare chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **비교** / ZH **比较** / EN Compare · THEME_ORDER `compare` (전 8) |
| 칩 활성 | speed+cloze compareTagged=**10** + `themes` → 칩 활성 · (이후 bingo/listen 동시 SHOW) |
| smoke | `_smoke-compare-focus.js` PASS · tagged>0 SHOW · size/change/motion와 별개 · bothTags=0 |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~bingo/listen~~ → **Done (GF)** · particle/dictation.

### ≈ GE (comparison-degree → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v50=492** · c-483–492 · compareTagged **10** · themes `compare` |
| Prefer | **똑같다·전혀** · 같다·다르다·비슷하다·비교하다·더·가장·훨씬·차이 |
| Skip | **만큼·반대** → bingo/listen |
| Distinct | change · size · motion · speech · think · favor · pack/speed verbatim |
| Chip | KO **비교** / ZH **比较** · ThemeSm44a Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v194** |

**Sibling next 제안:** comparison-degree → **bingo/listen +8–10** (만큼·반대) · ThemeSm44a 라벨 재사용. → **Done** (≈ GF).

### ≈ GD (comparison-degree pack + speed +10)

| 산출 | 결과 |
|------|------|
| pack | **comparison-degree** · 12 lemmas · intermediate **v49=592** · packs **50** |
| speed | **v50=500** · sq-491–500 · compareTagged **10** · themes `compare` |
| Prefer cloze | **똑같다·전혀** → **Done (GE)** |
| Distinct | change · size · colors · speech · think · favor · motion |
| Chip | KO **비교** / ZH **比较** / EN Compare · ThemeSm44a Done |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v193**→**v194** |

**Sibling next 제안:** ~~cloze~~ → **Done** · bingo/listen (만큼·반대).

### ≈ ThemeSm close (change chip smoke · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **변화** / ZH **变化** / EN Change · key `change` (ThemeSm43a 재사용) |
| SHOW | 전 8 · changeTagged=**10**×6 + **8**×2 + `themes` |
| ThemeSm43b | bingo/listen changeTagged=**10** → 칩 SHOW |
| Distinct | motion · size · routine · time · favor · speech · think |
| Smoke | `_smoke-change-focus.js` 전 8 SHOW PASS |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · manifest **v192** |

**Sibling next 제안:** *(없음)* · **change-progress 스윕 닫힘** · invent Next 금지 · Claude Next 대기.

### ≈ GC (change-progress → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v49=486** · ps-477–486 · themes `change` · changeTagged **10** |
| dictation | **v51=492** · d-483–492 · themes `change` · changeTagged **10** |
| telephone | **v48=465** · tel-458–465 · themes `change` · changeTagged **8** |
| scramble | **v48=467** · ws-460–467 · themes `change` · changeTagged **8** |
| Prefer | **늘다·줄다** (손님·소음) + 시작하다·끝나다·계속하다·멈추다·변하다·바뀌다·지나다·남다; tel/scramble skip 지나다·남다 |
| Distinct | motion · size · routine · time · favor · speech · think · cloze/listen/pack hosts |
| Chip | KO **변화** / ZH **变化** · ThemeSm close → **Done** |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v191**→**v192** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done** · change-progress 스윕 닫힘.

### ≈ ThemeSm close (think chip smoke · 전 8)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **생각** / ZH **想法** / EN Think · key `think` (ThemeSm41a 재사용) |
| SHOW | 전 8 · thinkTagged=**10**×6 + **8**×2 + `themes` |
| Distinct | favor · emotion · routine · bothTags=0 |
| Smoke | `_smoke-think-focus.js` 전 8 SHOW PASS |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** *(없음)* · **thoughts-plans 스윕 닫힘** · invent Next 금지 · Claude Next 대기.

### ≈ GB (thoughts-plans → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v47=466** · ps-457–466 · themes `think` · thinkTagged **10** |
| dictation | **v49=472** · d-463–472 · themes `think` · thinkTagged **10** |
| telephone | **v46=449** · tel-442–449 · themes `think` · thinkTagged **8** |
| scramble | **v46=451** · ws-444–451 · themes `think` · thinkTagged **8** |
| Prefer | **믿다·계획하다** (+ 생각하다·알다·모르다·기억하다·잊다·이해하다·결정하다·고르다; tel/scramble skip 잊다·고르다) |
| Distinct | favor · emotion · routine · jobs · cloze/listen/pack hosts |
| Chip | KO **생각** / ZH **想法** · ThemeSm close → **Done** |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v183** |

**Sibling next 제안:** ~~ThemeSm close~~ → **Done** · thoughts-plans 스윕 닫힘.

### ≈ ThemeSm41a (think chip enable · tagged>0)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **생각** / ZH **想法** / EN Think · key `think` |
| THEME_ORDER | 전 8게임 `think` |
| SHOW | speed+cloze+bingo+listen thinkTagged=**10** + `themes` |
| HIDE | *(당시)* particle/dictation/tel/scramble (tagged=0) → GB로 데이터 착지 → ThemeSm close 전 8 |
| Distinct | favor · emotion · routine |
| Smoke | `_smoke-think-focus.js` PASS (이후 ThemeSm close로 전 8) |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~thoughts-plans → particle/dictation(+tel/scramble)~~ → **Done (GB)**. ~~ThemeSm close~~ → **Done**.

### ≈ GA (thoughts-plans → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v47=462** · c-453–462 · themes `think` · thinkTagged **10** |
| Lemmas | 믿다·계획하다·생각하다·알다·모르다·기억하다·잊다·이해하다·결정하다·고르다 |
| Prefer | **믿다·계획하다** |
| Skip | 배우다·가르치다 → bingo/listen |
| Distinct | favor · emotion · routine · jobs · school · pack/speed verbatim |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v181** |

**Sibling next 제안:** ThemeSm41a chip → **Done**. thoughts-plans → bingo/listen → **Done**. particle/dictation(+tel/scramble) → **Done (GB)**. ThemeSm close → **Done**.

### ≈ FZ (중급 thoughts-plans + speed +10)

| 산출 | 결과 |
|------|------|
| intermediate | **v46** · packs **47** · items **556** · `thoughts-plans` **12** |
| speed | **v47=470** · sq-461–470 · themes `think` · thinkTagged **10** |
| Lemmas (speed) | 생각하다·알다·모르다·기억하다·잊다·이해하다·배우다·가르치다·결정하다·고르다 |
| Pack thin | 믿다·계획하다 → cloze Prefer → **Done (GA)** |
| Distinct | requests-favors · emotion-mood · school-class · work-study 준비(n)·집중 · digital-comms · hobby 관심 |
| Source | original-jabi · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v180** |

**Sibling next 제안:** thoughts-plans → **cloze +8–10** (믿다·계획하다) · theme `think` · chip KO **생각** / ZH **想法**. → **Done (GA)**.

### ≈ FY (requests-favors → particle/dictation(+tel/scramble))

| 산출 | 결과 |
|------|------|
| particle | **v46=456** · ps-447–456 · themes `favor` · favorTagged **10** |
| dictation | **v48=462** · d-453–462 · themes `favor` · favorTagged **10** |
| telephone | **v45=441** · tel-434–441 · themes `favor` · favorTagged **8** |
| scramble | **v45=443** · ws-436–443 · themes `favor` · favorTagged **8** |
| Lemmas | 물어보다·확인하다·부탁하다·도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다 |
| Prefer | **물어보다·확인하다** |
| Distinct | celebration · jobs · routine · motion · cloze/listen/pack hosts · stationery 지우개·가위 · direction 길 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v179** |

**Sibling next 제안:** **ThemeSm close** (전 8 favorTagged+themes · 칩 KO **부탁** / ZH **拜托** 이미 JS · smoke ThemeSm40d). → **Done (ThemeSm40d)** · **requests-favors 스윕 닫힘**.

### ≈ FX (requests-favors → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v52=507** · bg-498–507 · themes `favor` · favorTagged **10** |
| listen | **v52=474** · lm-465–474 · themes `favor` · favorTagged **10** |
| Lemmas | 찾다·만들다·부탁하다·도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다 |
| Prefer | **찾다·만들다** |
| Pack thin | 물어보다·확인하다 → particle/dictation |
| Distinct | celebration · jobs · routine · motion · cloze/speed/pack verbatim · housing 수리 · stationery 빌려 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v178** |

**Sibling next 제안:** requests-favors → **particle/dictation(+tel/scramble)** · theme `favor` · Prefer **물어보다·확인하다** · chip KO **부탁** / ZH **拜托**. → **Done (FY)**.

### ≈ FW (movement-actions → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v51=497** · bg-488–497 · themes `motion` · motionTagged **10** |
| listen | **v51=464** · lm-455–464 · themes `motion` · motionTagged **10** |
| Lemmas | 들다·건너다·걷다·뛰다·서다·앉다·눕다·오르다·놓다·잡다 |
| Prefer | **들다·건너다** |
| Pack thin | 따라가다·들어오다 → particle/dictation |
| Distinct | body · direction · driving 횡단보도 · sports · routine · transit · electric · furniture 앉다/놓다 · cloze/speed/pack verbatim |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v174** |

**Sibling next 제안:** movement-actions → **particle/dictation(+tel/scramble)** · theme `motion` · chip KO **동작** / ZH **动作**.

### ≈ FV (movement-actions → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v45=442** · c-433–442 · themes `motion` · motionTagged **10** |
| Lemmas | 따라가다·들어오다·걷다·뛰다·서다·앉다·눕다·오르다·놓다·잡다 |
| Prefer | **따라가다·들어오다** |
| Pack thin | 들다·건너다 → bingo/listen → **Done** |
| Distinct | body · direction · driving · sports · routine · transit · electric · pack/speed verbatim · building 로비 앉아요 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v173** |

**Sibling next 제안:** movement-actions → **bingo/listen +8–10** (들다·건너다) → **Done**. Suggest particle/dictation.

### ≈ FU (중급 movement-actions + speed +10)

| 산출 | 결과 |
|------|------|
| intermediate | **v44** · packs **45** · items **532** · `movement-actions` **12** |
| speed | **v45=450** · sq-441–450 · themes `motion` · motionTagged **10** |
| Lemmas (speed) | 걷다·뛰다·서다·앉다·눕다·오르다·들다·놓다·건너다·잡다 |
| Pack thin | 따라가다·들어오다 → cloze → **Done** |
| Distinct | body-parts · directions-location · vehicles-driving · sports-exercise · daily-routine 일어나다·자다 · beginner transit 타다·내리다 · electric 엘리베이터·계단 |
| Source | original-jabi · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v172** |

**Sibling next 제안:** movement-actions → **cloze +8–10** (따라가다·들어오다) → **Done**. Suggest bingo/listen.

### ≈ FT (ThemeSm37d(+37b) electric chip enable · sweep close)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **전기** / ZH **电器** / EN Electricity · THEME_ORDER `electric` · ThemeSm37a 재사용 |
| SHOW | 전 8 · electricTagged=**10**×6 + **8**×2 + `themes` → 칩 활성 |
| Distinct | chores 집안일/家务 · media 미디어/媒体 · digital 디지털/数码와 별개 · bothTags=0 |
| Smoke | `_smoke-electric-focus.js` ThemeSm37d PASS |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **electricity-appliances 스윕 닫힘** |

**Sibling next 제안:** *(없음 — invent Next 금지 · Claude만 Next)*

### ≈ FS (electricity-appliances → particle/dictation(+tel/scramble) +8–10)

| 산출 | 결과 |
|------|------|
| particle | **v43=426** · ps-417–426 · themes `electric` · electricTagged **10** |
| dictation | **v45=432** · d-423–432 · themes `electric` · electricTagged **10** |
| telephone | **v42=417** · tel-410–417 · themes `electric` · electricTagged **8** |
| scramble | **v42=419** · ws-412–419 · themes `electric` · electricTagged **8** |
| Prefer | **켜다** (에어컨·선풍기·불·전자레인지) · 끄다 ctx (가스) |
| Distinct | chores/media/digital/housing · pack/bingo/cloze/listen verbatim |
| Chip | KO **전기** / ZH **电器** · ThemeSm37d |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v167** |

**Sibling next 제안:** ~~ThemeSm37d~~ → **Done** · electricity 스윕 닫힘.

### ≈ FR (electricity-appliances → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v49=477** · bg-468–477 · themes `electric` · electricTagged **10** |
| listen | **v49=444** · lm-435–444 · themes `electric` · electricTagged **10** |
| Lemmas | 전기·에어컨·선풍기·불·엘리베이터·계단·수도·가스·**전자레인지·다리미** |
| Verb ctx | listen 끄다 (불을 끄고…) · 켜다 spare → particle |
| Distinct | chores 냉장고·청소기·세탁기 · media 텔레비전 · digital 배터리·충전 · housing「수도가 고장…」 · pack/cloze verbatim |
| Chip | KO **전기** / ZH **电器** · ThemeSm37a THEME_ORDER 이미 착지 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v166** |

**Sibling next 제안:** ~~particle/dictation(+tel/scramble)~~ → **Done** · ThemeSm37d 스윕 닫힘.

### ≈ FQ (electricity-appliances → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v43=422** · c-413–422 · themes `electric` · electricTagged **10** |
| Lemmas | 전기·에어컨·선풍기·불·엘리베이터·계단·수도·가스·**전자레인지·다리미** |
| Verb ctx | 켜다/끄다 (불 켜·선풍기 끄) |
| Distinct | chores 냉장고·청소기·세탁기 · media 텔레비전 · digital 배터리·충전 · housing 열쇠·고장 · pack/speed verbatim |
| Chip | KO **전기** / ZH **电器** / EN Electricity · THEME_ORDER `electric` |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v165** |

**Sibling next 제안:** ~~bingo/listen +8–10~~ → **Done** · ~~particle/dictation~~ → **Done** · ThemeSm37d 스윕 닫힘.

### ≈ FP (ThemeSm36d accessories chip enable · sweep close)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **소지품** / ZH **随身** / EN Accessories · THEME_ORDER `accessories` · ThemeSm36a 재사용 |
| SHOW | 전 8 · particle/dictation=**10** · tel/scramble=**8** + `themes` → 칩 활성 |
| Distinct | clothes 옷/服装와 별개 · bothTags=0 |
| Smoke | `_smoke-accessories-focus.js` ThemeSm36d PASS · `_smoke_games_theme_filter.js` PASS |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **accessories-belongings 스윕 닫힘** |

**Sibling next 제안:** *(없음 — invent Next 금지 · Claude만 Next)*

### ≈ FO (ThemeSm36a accessories chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **소지품** / ZH **随身** / EN Accessories · THEME_ORDER `accessories` · 전 8게임 i18n |
| SHOW | speed+cloze+bingo+listen accessoriesTagged=**10** + `themes` → 칩 활성 |
| HIDE | *(당시)* particle/dictation/tel/scramble (tagged=0 · themes 미추가) → ThemeSm36d로 SHOW |
| Distinct | clothes 옷/服装와 별개 |
| Smoke | `_smoke-accessories-focus.js` PASS (ThemeSm36a) |
| hangul.js | 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 |

**Sibling next 제안:** ~~accessories-belongings → particle/dictation(+tel/scramble)~~ → ThemeSm36d Done.

### ≈ FN (accessories-belongings → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v48=467** · bg-458–467 · themes `accessories` · accessoriesTagged **10** |
| listen | **v48=434** · lm-425–434 · themes `accessories` · accessoriesTagged **10** |
| Lemmas | **우산·가방**·모자·양말·장갑·안경·지갑·벨트·목도리·반지 |
| Prefer remaining | 우산·가방 (cloze skip) |
| Distinct | clothes 옷·바지·치마·신발·코트 · time 시계 · bathroom 손수건 · travel 짐 · weather「비가 와서 우산을…」· clothes「모자를 벗어요」· stationery「노트를 가방에…」 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v162** |

**Sibling next 제안:** ~~accessories-belongings → particle/dictation(+tel/scramble)~~ → ThemeSm36d Done.

### ≈ FM (accessories-belongings → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v42=412** · c-403–412 · themes `accessories` · accessoriesTagged **10** |
| Lemmas | 모자·양말·장갑·안경·지갑·벨트·목도리·반지·**귀걸이·넥타이** |
| Skip | 가방·우산 (beginner/color overlap) |
| Distinct | clothes 옷·바지·치마·신발·코트 · time 시계 · bathroom 손수건 · pack/speed verbatim |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v161** |

**Sibling next 제안:** accessories-belongings → **bingo/listen +8–10** → **Done**. Suggest particle/dictation(+tel/scramble).

### ≈ FL (accessories-belongings pack + speed +10)

| 산출 | 결과 |
|------|------|
| intermediate | **v41** · packs **42** · items **496** · `accessories-belongings` **12** |
| speed | **v42=420** · sq-411–420 · themes `accessories` · accessoriesTagged **10** |
| Lemmas (speed) | 모자·양말·장갑·안경·우산·가방·지갑·벨트·목도리·반지 |
| Pack thin | 귀걸이·넥타이 → cloze → **Done (≈FM)** |
| Distinct | clothes 옷·바지·치마·신발·코트 · time 시계 · bathroom 손수건 · travel 짐 |
| Source | original-jabi · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v160** |

**Sibling next 제안:** accessories-belongings → **cloze +8–10** (귀걸이·넥타이) → **Done**. Suggest bingo/listen.

### ≈ FK (colors-shapes → particle/dictation +10 · tel/scramble +8)

| 산출 | 결과 |
|------|------|
| particle | **v41=406** · ps-397–406 · themes `color` · colorTagged **10** |
| dictation | **v43=412** · d-403–412 · themes `color` · colorTagged **10** |
| telephone | **v40=401** · tel-394–401 · themes `color` · colorTagged **8** |
| scramble | **v40=403** · ws-396–403 · themes `color` · colorTagged **8** |
| Lemmas | **회색·분홍색·세모·모양**·빨간색·파란색·노란색·초록색·하얀색·둥글다 (+dict 검은색 · tel/ws 네모) |
| Prefer remaining | 회색·분홍색 · 세모·모양 (hosts: 지붕·풍선·산·모양) |
| Distinct | clothes 색깔·사이즈 · size · senses · nature 꽃·나무 · cloze 펜/우산/접시 · listen 벽지/지우개/깃발 · pack 구름/공/상자/표지판 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v159** |

**색깔·모양 8-bank data Done.** **ThemeSm35d Done** — 전 8 color 칩 SHOW · colors-shapes 스윕 닫힘. invent Next 금지.

### ≈ FJ (colors-shapes → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo | **v47=457** · bg-448–457 · themes `color` · colorTagged **10** |
| listen | **v47=424** · lm-415–424 · themes `color` · colorTagged **10** |
| Lemmas | **회색·분홍색·세모·모양**·하얀색·검은색·둥글다·네모·초록색·노란색 |
| Prefer remaining | 회색·분홍색 (cloze thin) · 세모·모양 (speed thin) |
| Distinct | clothes 색깔·사이즈 · size · senses · nature · pack 구름/꽃/공/상자/표지판 · cloze 펜/우산/접시/창문/스티커 |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v158** |

**Sibling next 제안:** colors-shapes → **particle/dictation(+tel/scramble) +8–10** → **Done**. Suggest ThemeSm35d.

### ≈ FI (colors-shapes → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v41=402** · c-393–402 · themes `color` · colorTagged **10** |
| Lemmas | 빨간색·파란색·노란색·초록색·하얀색·둥글다·네모·**세모**·**모양**·검은색 |
| Distinct | clothes 색깔·사이즈 · size · senses · nature 꽃·나무 · pack/speed verbatim |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v157** |

**Sibling next 제안:** colors-shapes → **bingo/listen +10** → **Done**. Suggest particle/dictation(+tel/scramble).

### ≈ FH (colors-shapes pack + speed +10)

| 산출 | 결과 |
|------|------|
| intermediate | **v40** · packs **41** · items **484** · `colors-shapes` **12** |
| speed | **v41=410** · sq-401–410 · themes `color` · colorTagged **10** |
| Lemmas (speed) | 빨간색·파란색·노란색·초록색·하얀색·검은색·회색·분홍색·둥글다·네모 |
| Pack thin | 세모·모양 → cloze **Done** |
| Distinct | clothes 색깔·사이즈 · size-quantity · temperature-senses · nature 꽃·나무 |
| Source | original-jabi · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v156** |

**Sibling next 제안:** colors-shapes → **cloze +8–10** → **Done** · bingo/listen → **Done**. Suggest particle/dictation(+tel/scramble).

### ≈ FG (temperature-senses → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle | **v40=396** · ps-387–396 · themes `senses` · sensesTagged **10** |
| dictation | **v42=402** · d-393–402 · themes `senses` · sensesTagged **10** |
| telephone | **v39=393** · tel-384–393 · themes `senses` · sensesTagged **10** |
| scramble | **v39=395** · ws-386–395 · themes `senses` · sensesTagged **10** |
| Lemmas | **쓰다·부드럽다**·뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다 |
| Distinct | weather 맑다·흐리다 · emotion · restaurant 짜다·맛있다 · snacks 달다·맵다 · cloze/listen/bingo/pack verbatim · 쓰다(write) |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v155** |

**온도·감각 8-bank data Done.** Suggest **ThemeSm34d** particle/dictation/tel/scramble senses chip enable → sweep close. invent Next 금지.

### ThemeSm34a (speed(+cloze) senses chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **감각** / ZH **感觉** / EN Senses · THEME_ORDER `senses` (전 8) |
| 칩 활성 | speed+cloze sensesTagged=**10** + `themes` → 칩 활성 |
| smoke | `_smoke-senses-focus.js` PASS · speed+cloze SHOW · empty 6 HIDE · weather/emotion와 별개 |

invent Next 금지 · sibling: temperature-senses → bingo/listen → particle/dictation **Done**.

### ≈ FE (temperature-senses → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze | **v40=392** · c-383–392 · themes `senses` · sensesTagged **10** |
| Lemmas | 뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다·**쓰다**·**부드럽다** |
| Distinct | weather 맑다·흐리다 · emotion · restaurant 짜다·맛있다 · snacks 달다·맵다 · bathroom · size |
| Source | original-jabi · NIKL/Sejong · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v153** |

**Sibling next 제안:** temperature-senses → **bingo/listen +10** (시다·싱겁다 권장).

### ≈ FD (temperature-senses pack + speed +10)

| 산출 | 결과 |
|------|------|
| intermediate | **v39** · packs **40** · items **472** · `temperature-senses` **12** |
| speed | **v40=400** · sq-391–400 · themes `senses` · sensesTagged **10** |
| Lemmas (speed) | 뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다·시다·싱겁다 |
| Pack thin | 쓰다·부드럽다 → cloze **Done** |
| Distinct | weather 맑다·흐리다 · restaurant 짜다·맛있다 · snacks 달다·맵다 · bathroom · size-quantity |
| Source | original-jabi · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 |
| hangul.js | 미터치 · 커밋/푸시 없음 · manifest **v152** |

**Sibling next:** cloze Done → bingo/listen.

### ThemeSm33d (particle/dictation/tel/scramble size chip enable · size-quantity sweep closed)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **크기** / ZH **大小** / EN Size · THEME_ORDER `size` (ThemeSm33a 재사용) |
| 칩 활성 | particle/dictation/tel/scramble sizeTagged=**10** + `themes` → 칩 활성 · 전 8 |
| smoke | `_smoke-size-focus.js` PASS ×8 · `scripts/_smoke_games_theme_filter.js` size×8 · clothes와 별개 |

**size-quantity 스윕 닫힘.** invent Next 금지 · self-QA만.

### ThemeSm33a (speed(+cloze) size chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **크기** / ZH **大小** / EN Size · THEME_ORDER `size` (전 8) |
| 칩 활성 | speed+cloze sizeTagged=**10** + `themes` → 칩 활성 |
| smoke | `_smoke-size-focus.js` PASS · speed+cloze SHOW · empty 6 HIDE · clothes와 별개 |

invent Next 금지 · sibling: size-quantity → bingo/listen.

### ≈ FL (size-quantity → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v39** · +10 (c-373–382) · 합계 **382** · themes `size` · sizeTagged **10** |
| manifest | **v149** |

Lemmas: 크다·작다·많다·적다·길다·짧다·무겁다·가볍다·**넓다·좁다**. Distinct from clothes 사이즈·색깔 · body · directions 길 · furniture 거실 넓어요. NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. Prior routine c-363–372 kept · speed sizeTagged=10 kept.

**Sibling next 제안:** size-quantity → **bingo/listen** next.

### ≈ FK (중급 size-quantity + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v38** · packs **39** · items **460** · pack `size-quantity` **12** |
| speed-quiz-beginner.json | **v39** · +10 (sq-381–390) · 합계 **390** · themes `size` · sizeTagged **10** |
| manifest | **v148** |

Lemmas (speed): 크다·작다·많다·적다·길다·짧다·무겁다·가볍다·높다·낮다. Pack thin → cloze: **넓다·좁다** → **Done (≈FL)**. Distinct from clothes-shopping 사이즈·색깔 · body-parts · directions 길 · furniture. NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. Existing packs kept (incl. daily-routine).

**Sibling next 제안:** size-quantity → **cloze +10** (넓다·좁다 포함) → **Done**.

### ThemeSm32d (particle/dictation/tel/scramble routine chip enable · daily-routine sweep closed)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **일상** / ZH **日常** / EN Routine · THEME_ORDER `routine` (ThemeSm32a 재사용) |
| 칩 활성 | particle/dictation/tel/scramble routineTagged=**10** + `themes` → 칩 활성 · 전 8 |
| smoke | `_smoke-routine-focus.js` PASS ×8 · `scripts/_smoke_games_theme_filter.js` routine×8 · time와 별개 |

**daily-routine 스윕 닫힘.** invent Next 금지 · self-QA만.

### ≈ FJ (daily-routine → particle +10 · dictation +10 · tel +10 · scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v38** · +10 (ps-367–376) · 합계 **376** · themes `routine` · routineTagged **10** |
| dictation-beginner.json | **v40** · +10 (d-373–382) · 합계 **382** · themes `routine` · routineTagged **10** |
| telephone-beginner.json | **v37** · +10 (tel-364–373) · 합계 **373** · themes `routine` · routineTagged **10** |
| word-scramble-beginner.json | **v37** · +10 (ws-366–375) · 합계 **375** · themes `routine` · routineTagged **10** |
| manifest | **v147** |

Lemmas (dictation/tel/scramble): 일어나다·자다·아침·점심·저녁·밤·하루·매일·**어제·내일**. Particle: 아침·점심·밤·하루·오늘·내일·잠·저녁·어제·잠(을). Distinct from time 시계·약속·요일·주말·오전·오후 · chores · bathroom · restaurant · listen/cloze verbatim. NIKL/Sejong · 해요체 · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. speed/cloze/bingo/listen routineTagged=10 kept.

**Sibling next 제안:** **ThemeSm32d** → **Done**.

### ≈ FI (daily-routine → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v38** · +10 (c-363–372) · 합계 **372** · themes `routine` · routineTagged **10** |
| manifest | **v145** |

Lemmas: 일어나다·자다·아침·점심·저녁·하루·매일·오늘·**어제·내일**. Distinct from time-appointment 시계·약속·요일·주말·오전·오후 · home-chores · bathroom · restaurant 식사. NIKL/Sejong · 해요체 · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. Prior countries c-353–362 kept.

**Sibling next 제안:** daily-routine → **bingo/listen +10**.

### ≈ FH (중급 daily-routine + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v37** · packs **38** · items **448** · pack `daily-routine` **12** |
| speed-quiz-beginner.json | **v38** · +10 (sq-371–380) · 합계 **380** · themes `routine` · routineTagged **10** |
| manifest | **v144** |

Lemmas (speed): 일어나다·자다·아침·점심·저녁·밤·하루·매일·지금·오늘. Pack thin → cloze: **어제·내일** → **Done**. Distinct from time-appointment 시계·약속·요일·주말·오전·오후 · home-chores · bathroom · restaurant 식사. NIKL/Sejong·Tammy · 해요체 · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. Existing packs kept (incl. countries).

**Sibling next 제안:** daily-routine → **cloze +10** (어제·내일 포함) → **Done**.

### ThemeSm31d (particle/dictation/tel/scramble country chip enable · countries sweep closed)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **국가** / ZH **国家** / EN Country · THEME_ORDER `country` (ThemeSm31a 재사용) |
| 칩 활성 | particle/dictation/tel/scramble countryTagged=**10** + `themes` → 칩 활성 · 전 8 |
| smoke | `_smoke-country-focus.js` PASS ×8 · `scripts/_smoke_games_theme_filter.js` country×8 · travel와 별개 |

**countries-nationality 스윕 닫힘.** invent Next 금지 · self-QA만.

### ≈ FG (countries-nationality → particle +10 · dictation +10 · tel +10 · scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v37** · +10 (ps-357–366) · 합계 **366** · themes `country` · countryTagged **10** |
| dictation-beginner.json | **v39** · +10 (d-363–372) · 합계 **372** · themes `country` · countryTagged **10** |
| telephone-beginner.json | **v36** · +10 (tel-354–363) · 합계 **363** · themes `country` · countryTagged **10** |
| word-scramble-beginner.json | **v36** · +10 (ws-356–365) · 합계 **365** · themes `country` · countryTagged **10** |
| manifest | **v143** |

Lemmas (dictation/tel/scramble): 나라·외국·외국인·국적·고향·살다·일본어·태어나다·**해외·유학생**. Particle: 나라·외국·해외·외국인·국적·고향·유학생·일본어·영어·중국어 (살다·태어나다 → 문장형 게임). Distinct from travel 여권·숙소·관광 · family · school · jobs · cloze/listen/pack. NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm31d** → **Done**.

### ThemeSm31 / ThemeSm31a (country chip enable · countryTagged>0 · wave verify)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **국가** / ZH **国家** / EN Country · THEME_ORDER `country` (전 8 · ThemeSm31a 라벨) |
| 칩 활성 | speed+cloze+bingo+listen countryTagged=**10** + `themes` → 칩 활성 · empty 4 (particle/dictation/tel/scramble) 숨김 → data Done 후 ThemeSm31d **Done** |
| smoke | `_smoke-country-focus.js` PASS · `scripts/_smoke_games_theme_filter.js` country on 4 · off 4 · travel와 별개 |

**Sibling next 제안:** countries-nationality → particle/dictation(+tel/scramble) +10 → **Done** · **ThemeSm31d** → **Done**.

### ≈ FF (countries-nationality → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v43** · +10 (bg-408–417) · 합계 **417** · themes `country` · countryTagged **10** |
| listen-match-beginner.json | **v43** · +10 (lm-375–384) · 합계 **384** · themes `country` · countryTagged **10** |
| manifest | **v142** |

Lemmas: 나라·외국·외국인·국적·고향·살다·일본어·태어나다·**해외·유학생**. Bingo-dup 영어·중국어(lang) skip. Distinct from travel 여권·숙소·관광 · family · school · jobs. NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** countries-nationality → **particle/dictation(+tel/scramble) +10** · ThemeSm31a → **Done**.

### ≈ FE (countries-nationality → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v37** · +10 (c-353–362) · 합계 **362** · themes `country` · countryTagged **10** |
| manifest | **v141** |

Lemmas: 나라·외국·외국인·국적·고향·살다·영어·일본어·**해외·유학생**. Include 해외·유학생. Distinct from travel 여권·숙소·관광 · family · school · jobs. NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** countries-nationality → **bingo/listen +10** → **Done**.

### ≈ FD (중급 countries-nationality + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v36** · packs **37** · items **436** · pack `countries-nationality` **12** |
| speed-quiz-beginner.json | **v37** · +10 (sq-361–370) · 합계 **370** · themes `country` · countryTagged **10** |
| manifest | **v140** |

Lemmas (speed): 나라·외국·외국인·국적·고향·살다·영어·중국어·일본어·태어나다. Pack thin → cloze: **해외·유학생** → Done. Distinct from travel-lodging 여권·숙소·관광 · family kin · school · jobs. NIKL/Sejong·Tammy · 해요체 · 항공/대사관 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** countries-nationality → **cloze +10** (해외·유학생 포함) → **Done**.

### ThemeSm30d (particle/dictation/tel/scramble jobs chips · sweep closed)

| 산출 | 결과 |
|------|------|
| 칩 활성 | particle/dictation/tel/scramble jobsTagged=**10** + `themes` → 칩 **직업/职业** (ThemeSm30a 라벨/ORDER 재사용) |
| smoke | `_smoke-jobs-focus.js` + `scripts/_smoke_games_theme_filter.js` · 전 8 jobs focus |
| 스윕 | jobs-occupations **닫힘** · workplace/public-life와 별개 |

**Sibling next 제안:** *(없음 — invent Next 금지 · Claude Next 대기)* → 이후 ≈ FD countries pack.

### ≈ FC (jobs-occupations → particle +10 · dictation +10 · tel +10 · scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v36** · +10 (ps-347–356) · 합계 **356** · themes `jobs` · jobsTagged **10** |
| dictation-beginner.json | **v38** · +10 (d-353–362) · 합계 **362** · themes `jobs` · jobsTagged **10** |
| telephone-beginner.json | **v35** · +10 (tel-344–353) · 합계 **353** · themes `jobs` · jobsTagged **10** |
| word-scramble-beginner.json | **v35** · +10 (ws-346–355) · 합계 **355** · themes `jobs` · jobsTagged **10** |
| manifest | **v139** |

Lemmas: 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Distinct from workplace 출장·서류 · public · clinic/health · media · driving · music · school · cloze/listen/pack. NIKL/Sejong · 해요체 · 회사 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 회사·월급 → cloze Done.

**Sibling next 제안:** **ThemeSm30d** → **Done**.

### ThemeSm30 / ThemeSm30a (jobs chip enable · jobsTagged>0)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **직업** / ZH **职业** / EN Jobs · THEME_ORDER `jobs` (전 8 · ThemeSm30a 라벨) |
| 칩 활성 | speed+cloze+bingo+listen jobsTagged=**10** + `themes` → 칩 활성 · (ThemeSm30d로 전 8) |
| smoke | `_smoke-jobs-focus.js` · 전 8 jobs focus |
| 구분 | workplace 직장/职场 · public-life (칩 없음) · clinic/media/driving/music과 별개 |

**Sibling next 제안:** ThemeSm30d → **Done**.

### ≈ FB (jobs-occupations → bingo +10 · listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v42** · +10 (bg-398–407) · 합계 **407** · themes `jobs` · jobsTagged **10** |
| listen-match-beginner.json | **v42** · +10 (lm-365–374) · 합계 **374** · themes `jobs` · jobsTagged **10** |
| manifest | **v138** |

Lemmas: 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Distinct from workplace 출장·서류 · public · clinic/health · media · driving · music · school. NIKL/Sejong · 해요체 · 회사 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 회사·월급 → cloze Done.

**Sibling next 제안:** jobs-occupations → **particle/dictation(+tel/scramble) +10**.

### ≈ FA (jobs-occupations → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v36** · +10 (c-343–352) · 합계 **352** · themes `jobs` · jobsTagged **10** |
| manifest | **v137** |

Lemmas: 직업·회사원·간호사·선생님·요리사·일하다·직원·사장·**회사**·**월급**. Distinct from work-study 직장 · workplace 출장·서류 · clinic/health · media · driving · music · school. NIKL/Sejong · 해요체 · 회사 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** jobs-occupations → **bingo/listen +10** → **Done**.

### ≈ EZ (중급 jobs-occupations + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v35** · packs **36** · items **424** · pack `jobs-occupations` **12** |
| speed-quiz-beginner.json | **v36** · +10 (sq-351–360) · 합계 **360** · themes `jobs` · jobsTagged **10** |
| manifest | **v136** |

Lemmas (speed): 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Pack thin → cloze: **회사·월급** → **Done**. Distinct from work-study 직장 · workplace 출장·서류 · clinic-basic 의사 · health 약사 · media 기자 · driving 경찰·운전 · music 가수·배우. NIKL/Sejong·Tammy · 해요체 · 회사 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** jobs-occupations → **cloze +10** (회사·월급 포함) → **Done**.

### ≈ BX (중급 clothes-shopping + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v17** · +1 pack clothes-shopping **12**어 · 합계 **208** |
| speed-quiz-beginner.json | **v18** · +10 · 합계 **180** · themes clothes |

### ≈ BY–CD (clothes 8-game · ThemeSm12*)

clothes 스윕 닫힘 · 칩 **옷/服装** · manifest **v68**.

### ≈ CE (중급 music-arts + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v18** · +1 pack music-arts **12**어 · 합계 **220** |
| speed-quiz-beginner.json | **v19** · +10 (sq-181–190) · 합계 **190** · themes music |

Lemmas: 예술·악기·연주·감상·노래·가수·부르다·그림·그리다·춤 (+배우·무대 pack thin). hobby-culture·beginner leisure와 분리. 브랜드 없음.

### ≈ CF–ThemeSm13c (music 8-game)

music 스윕 닫힘 · 칩 **음악/音乐** · manifest **v71**.

### ≈ CG (중급 media-news + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v19** · +1 pack media-news **12**어 · 합계 **232** |
| speed-quiz-beginner.json | **v20** · +10 (sq-191–200) · 합계 **200** · themes `media` |
| manifest | **v72** |

Lemmas: 뉴스·신문·방송·기자·보도·텔레비전·라디오·프로그램·시청·기사 (+언론·제목 pack thin). **news-taste**(물가·정책…)·**digital-comms**(와이파이·앱·문자…)와 분리. 방송사·앱·신문 브랜드 없음.

### ≈ CH (media-news → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v20** · +10 (c-183–192) · 합계 **192** · themes `media` |
| manifest | **v73** |

Lemmas: 뉴스·신문·방송·기자·보도·프로그램·시청·기사·**언론**·**제목**. 텔레비전·라디오 → bingo/listen 잔여. ThemeSm14 칩 **미디어/媒体** · ThemeSm14b cloze mediaTagged=10 → 칩 활성(speed+cloze). hangul.js 미터치 · 커밋/푸시 없음.

### ≈ CI (media-news → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v26** · +10 (bg-238–247) · 합계 **247** · themes `media` |
| listen-match-beginner.json | **v26** · +10 (lm-205–214) · 합계 **214** · themes `media` |
| manifest | **v74** |

Lemmas: 뉴스·신문·방송·기자·보도·**텔레비전**·**라디오**·프로그램·시청·기사. Include 텔레비전·라디오. 언론·제목 cloze 유지. 해요체(listen) · NIKL/Sejong · 원작 · 브랜드 없음. ThemeSm14c bingo/listen chips → 데이터 착지 후 enable. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** ThemeSm14d **Done** — particle/dictation/tel/scramble mediaTagged=**10** → 칩 **미디어/媒体** · smoke 전 8게임 media focus · media 스윕 닫힘. hangul.js 미터치 · 커밋/푸시 없음. Claude Next 대기 · invent 금지.

### ≈ CI (media-news → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | +10 (ps-187–196) · 합계 **196** · themes `media` |
| dictation-beginner.json | +10 (d-193–202) · 합계 **202** · themes `media` |
| telephone-beginner.json | +10 (tel-184–193) · 합계 **193** · themes `media` |
| word-scramble-beginner.json | +10 (ws-186–195) · 합계 **195** · themes `media` |
| manifest | **v75** |

Lemmas: 언론·제목(particle) · 텔레비전·라디오(dictation/tel/scramble) 등 media-news 교차. ThemeSm14d chips enable Done. hangul.js 미터치 · 커밋/푸시 없음.

### ≈ CJ (중급 celebration-holiday + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v20** · +1 pack celebration-holiday **12**어 · 합계 **244** |
| speed-quiz-beginner.json | **v21** · +10 (sq-201–210) · 합계 **210** · themes `celebration` |
| manifest | **v76** |

Lemmas: 생일·축하·선물·명절·초대·파티·케이크·휴가·모임·건배 (+결혼식·연휴 pack thin). **hobby-culture** 축제 · **family** 결혼 · **emotion** · **restaurant** 손님과 분리. 브랜드 없음. hangul.js 미터치 · 커밋/푸시 없음.

### ≈ CK (celebration-holiday → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v21** · +10 (c-193–202) · 합계 **202** · themes `celebration` |
| manifest | **v77** |

Lemmas: 생일·축하·선물·명절·파티·휴가·모임·건배·**결혼식**·**연휴**. Include 결혼식·연휴. 초대·케이크 → bingo/listen 잔여. ThemeSm15 칩 **축하/庆祝** · ThemeSm15b cloze celebrationTagged=10 → 칩 활성(speed+cloze) 후보. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** celebration-holiday → **bingo/listen +8–10** (초대·케이크) · ThemeSm15 / ThemeSm15b 칩 residual.

### ≈ CL (celebration-holiday → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v27** · +10 (bg-248–257) · 합계 **257** · themes `celebration` |
| listen-match-beginner.json | **v27** · +10 (lm-215–224) · 합계 **224** · themes `celebration` |
| manifest | **v78** |

Lemmas: 생일·축하·선물·명절·**초대**·파티·**케이크**·휴가·모임·건배. Include 초대·케이크. 결혼식·연휴 cloze 유지. 해요체(listen) · NIKL/Sejong · 원작 · 브랜드 없음. ThemeSm15c bingo/listen chips → 데이터 착지 후 enable. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** celebration-holiday → **particle/dictation(+tel/scramble) +8–10** · ThemeSm15 / ThemeSm15b/c 칩 residual.

### ≈ CM (celebration-holiday → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | +10 (ps-197–206) · 합계 **206** · themes `celebration` |
| dictation-beginner.json | +10 (d-203–212) · 합계 **212** · themes `celebration` |
| telephone-beginner.json | +10 (tel-194–203) · 합계 **203** · themes `celebration` |
| word-scramble-beginner.json | +10 (ws-196–205) · 합계 **205** · themes `celebration` |
| manifest | **v79** |

Lemmas: celebration-holiday 교차 · 초대·케이크 dictation/tel/scramble · 결혼식·연휴 cloze 유지. ThemeSm15d chips enable. hangul.js 미터치 · 커밋/푸시 없음.

### ≈ ThemeSm15d (particle/dictation/tel/scramble celebration chips enable)

| 산출 | 결과 |
|------|------|
| 4× games JS | 라벨·THEME_ORDER **유지**(ThemeSm15a–c) · tags+`themes` → 칩 **축하/庆祝** 활성 |
| smoke | 전 8게임 celebration focus OK · celebrationTagged=**10** |

celebration 스윕 닫힘. invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.

### ≈ CN (중급 time-appointment + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v21** · +1 pack time-appointment **12**어 · 합계 **256** |
| speed-quiz-beginner.json | **v22** · +10 (sq-211–220) · 합계 **220** · themes `time` |
| manifest | **v80** |

Lemmas: 시간·시계·약속·만나다·기다리다·일찍·분·시·요일·주말 (+오전·오후 pack thin). **work-study** 일정 · **public-life** 예약 · beginner **늦다** · **celebration** 휴가·연휴와 분리. 브랜드/캘린더앱명 없음. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** time-appointment → **cloze +8–10** (오전·오후 포함) · ThemeSm16 칩 residual.

### ≈ CO (time-appointment → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v22** · +10 (c-203–212) · 합계 **212** · themes `time` |
| manifest | **v81** |

Lemmas: 시간·약속·만나다·기다리다·시·분·요일·주말·**오전**·**오후**. Include 오전·오후. 시계·일찍 → bingo/listen 잔여. ThemeSm16a 칩 **시간/时间** · ThemeSm16a로 speed(+cloze tags 착지 시) 칩 활성. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** time-appointment → **bingo/listen +8–10** (시계·일찍) · ThemeSm16b cloze smoke residual 후보.

### ≈ ThemeSm16a (speed time chip enable)

| 산출 | 결과 |
|------|------|
| 8× games JS | 칩 캐논 KO **시간** / ZH **时间** / EN Time · THEME_ORDER `time` |
| smoke | speed time focus OK · speed timeTagged=**10** + `themes` → 칩 활성 |

empty 게임 themes 미추가 · invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.

### ≈ CP (time-appointment → particle/dictation(+tel/scramble) +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v22** · +10 (ps-207–216) · 합계 **216** · themes `time` |
| dictation-beginner.json | **v24** · +10 (d-213–222) · 합계 **222** · themes `time` |
| telephone-beginner.json | **v21** · +10 (tel-204–213) · 합계 **213** · themes `time` |
| word-scramble-beginner.json | **v21** · +10 (ws-206–215) · 합계 **215** · themes `time` · timeTagged=**11** |
| manifest | **v83** |

Lemmas: 시간·약속·만나다·기다리다·일찍·시계·분·시·요일·주말·오전·오후 교차. Distinct from cloze/listen/bingo. ThemeSm16d 칩 enable(THEME_ORDER·`theme_time` 기존). hangul.js 미터치 · 커밋/푸시 없음.

### ≈ ThemeSm16 / ThemeSm16d (time chips enable · all 8 · sweep close)

| 산출 | 결과 |
|------|------|
| smoke `_smoke_games_theme_filter.js` | 전 8게임 time focus · timeTagged≥**10** + `themes` → 칩 **시간/时间** |
| ThemeSm16a | 라벨/THEME_ORDER 재사용 · ThemeSm16d 흡수 |
| counts | speed **10** · cloze **12** · bingo **16** · listen **11** · particle **10** · dictation **10** · tel **10** · scramble **11** |

time 스윕 닫힘 · invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #58.

### ≈ CQ (중급 home-chores + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v22** · +1 pack home-chores **12**어 · 합계 **268** |
| speed-quiz-beginner.json | **v23** · +10 (sq-221–230) · 합계 **230** · themes `chores` |
| manifest | **v84** |

Lemmas: 청소·빨래·설거지·부엌·냉장고·닦다·씻다·정리하다·수건·침대 (+청소기·세탁기 pack thin). **nature** 쓰레기·재활용 · **housing** 고장·수리 · **clothes** 세탁소 · **restaurant** 요리 · beginner **비누**와 분리. 브랜드/가전앱명 없음. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** home-chores → **cloze +8–10** (청소기·세탁기 포함) · ThemeSm17 칩 residual.

### ≈ CQ (ThemeSm17b/c · bingo/listen chores chips)

| 산출 | 결과 |
|------|------|
| bingo/listen | choresTagged=**10** + `themes` → 칩 KO **집안일** / ZH **家务** |
| ThemeSm17a | 라벨/THEME_ORDER 재사용 |
| smoke | bingo+listen(+speed/cloze) chores focus OK |
| empty 4 | particle/dictation/tel/scramble choresTagged=**0** → 칩 숨김 |

invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #59/#60.

**Sibling Next:** home-chores → **particle/dictation(+tel/scramble) +8–10** (Claude Next 아님 · invent Next 금지).

### ≈ CQ (home-chores → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v23** · +10 (ps-217–226) · 합계 **226** · themes `chores` · **청소기·세탁기** |
| dictation-beginner.json | **v25** · +10 (d-223–232) · 합계 **232** · themes `chores` · **수건·침대** |
| telephone-beginner.json | **v22** · +10 (tel-214–223) · 합계 **223** · themes `chores` |
| word-scramble-beginner.json | **v22** · +10 (ws-216–225) · 합계 **225** · themes `chores` |
| manifest | **v87** |
| choresTagged | particle/dictation/tel/scramble 각 **10** · 전 8게임 **10** |

해요체 · NIKL/Sejong · cloze/bingo/listen/speed 유지 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** **ThemeSm17d** particle+dictation+tel+scramble chores 칩 enable (**집안일/家务**).

### ≈ CQ (ThemeSm17d · particle/dictation/tel/scramble chores chips)

| 산출 | 결과 |
|------|------|
| particle/dictation/tel/scramble | choresTagged=**10** + `themes` → 칩 KO **집안일** / ZH **家务** |
| ThemeSm17a | 라벨/THEME_ORDER 재사용 |
| smoke | 전 8게임 chores focus OK |
| chores 스윕 | **닫힘** (전 8게임 choresTagged=**10**) |

해요체 · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### ≈ CR (중급 body-parts + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v23** · +1 pack body-parts **12**어 · 합계 **280** |
| speed-quiz-beginner.json | **v24** · +10 (sq-231–240) · 합계 **240** · themes `body` |
| manifest | **v88** |

Lemmas: 머리·손·발·얼굴·몸·팔·다리·목·귀·코 (+입·어깨 pack thin). **health-clinic** 증상·진료 · **sports** 체력 · **weather** 눈(snow)과 분리 · 눈(eye) 생략. 브랜드 없음. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** body-parts → **cloze +8–10** (입·어깨 포함) · ThemeSm18 칩 residual.

### ≈ CS (body-parts → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v24** · +10 (c-223–232) · 합계 **232** · themes `body` · bodyTagged **10** |
| manifest | **v89** |

Lemmas: 머리·손·발·얼굴·몸·팔·다리·목·**입**·**어깨**. Include 입·어깨. Distinct from health-clinic · sports · weather 눈(snow). 귀·코 → bingo/listen residual OK. 해요체 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** body-parts → **bingo/listen +8–10** (귀·코 포함) · ThemeSm18 칩 residual.

### ≈ CT (body-parts → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v30** · +10 (bg-278–287) · 합계 **287** · themes `body` · bodyTagged **10** |
| listen-match-beginner.json | **v30** · +10 (lm-245–254) · 합계 **254** · themes `body` · bodyTagged **10** |
| manifest | **v90** |

Lemmas: 머리·손·발·얼굴·몸·팔·다리·목·**귀**·**코**. Include 귀·코. Distinct from health-clinic · sports · weather 눈(snow). 입·어깨 → particle/dictation residual OK. 해요체(listen) · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** body-parts → **particle/dictation(+tel/scramble) +8–10** (입·어깨) · ThemeSm18a 칩 Done · ThemeSm18d는 data 후.

### ≈ CU (ThemeSm18a · body chip enable)

| 산출 | 결과 |
|------|------|
| 전 8게임 `theme_body` | EN Body / KO **신체** / ZH **身体** |
| THEME_ORDER | `body` (chores 다음) |
| speed+cloze+bingo+listen | bodyTagged=**10** + `themes` → 칩 활성 |
| particle/dictation/tel/scramble | bodyTagged=**0** → themes 미추가 · 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · 4게임 body focus OK |

Sibling data (bingo/listen body) 착지 후 칩도 활성. hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.

**Next:** Claude Now/Next **비어 있음** · sibling 제안 = body → particle/dictation(+tel/scramble) · invent Next 금지.

### ≈ CV (body-parts → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v24** · +10 (ps-227–236) · 합계 **236** · themes `body` · bodyTagged **10** |
| dictation-beginner.json | **v26** · +10 (d-233–242) · 합계 **242** · themes `body` · bodyTagged **10** |
| telephone-beginner.json | **v23** · +10 (tel-224–233) · 합계 **233** · themes `body` · bodyTagged **10** |
| word-scramble-beginner.json | **v23** · +10 (ws-226–235) · 합계 **235** · themes `body` · bodyTagged **10** |
| manifest | **v91** |

Lemmas: 머리·손·발·얼굴·몸·팔·다리·목·**입**·**어깨**. Include 입·어깨. Distinct from cloze/listen/bingo. 해요체 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음. bodyTagged 합 **80** (전 8×10).

**Next:** **ThemeSm18d** body chip enable (particle+dictation+tel+scramble) · body 스윕 닫힘 후보.

### ≈ CW (ThemeSm18d · body chip enable)

| 산출 | 결과 |
|------|------|
| ThemeSm18a 라벨/ORDER | 재사용 · KO **신체** / ZH **身体** / EN Body |
| particle/dictation/tel/scramble | bodyTagged=**10** + `themes` → 칩 활성 |
| 전 8게임 | body 칩 활성 · body 스윕 닫힘 |
| smoke | `_smoke_games_theme_filter.js` · 전 8게임 body focus OK |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지.

### ≈ CX (중급 directions-location + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v24** · +1 pack directions-location **12**어 · 합계 **292** |
| speed-quiz-beginner.json | **v25** · +10 (sq-241–250) · 합계 **250** · themes `direction` |
| manifest | **v92** |

Lemmas: 앞·뒤·옆·위·아래·왼쪽·오른쪽·근처·사이·건너편·**길**·**지도**. Speed covers first 10; 길·지도 pack thin → cloze. Distinct from beginner transit 출구 · travel 안내소. NIKL/Sejong·Tammy · 해요체 · 브랜드/지도앱명 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** directions-location → **cloze +8–10** (길·지도).

### ≈ CY (directions-location → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v25** · +10 (c-233–242) · 합계 **242** · themes `direction` · directionTagged **10** |
| manifest | **v93** |

Lemmas: 앞·뒤·옆·위·왼쪽·오른쪽·근처·건너편·**길**·**지도**. 아래·사이 → bingo/listen residual. Distinct from beginner transit 출구 · travel 안내소. NIKL/Sejong·Tammy · 해요체 · 브랜드/지도앱명 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** directions-location → **bingo/listen +8–10** (아래·사이).

### ≈ CZ (directions-location → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v31** · +10 (bg-288–297) · 합계 **297** · themes `direction` · directionTagged **10** |
| listen-match-beginner.json | **v31** · +10 (lm-255–264) · 합계 **264** · themes `direction` · directionTagged **10** |
| manifest | **v94** |

Lemmas include **아래**·**사이**. 길·지도 → particle/dictation residual. Distinct from beginner transit 출구 · travel 안내소. NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** ThemeSm19a direction chip (labels already parallel).

### ≈ DA (ThemeSm19a · direction chip enable)

| 산출 | 결과 |
|------|------|
| 전 8게임 `theme_direction` | EN Direction / KO **방향** / ZH **方向** |
| THEME_ORDER | `direction` (body 다음) · travel/transit과 별개 |
| speed+cloze+bingo+listen | directionTagged=**10** + `themes` → 칩 활성 |
| empty 4게임 | particle/dictation/tel/scramble themes 미추가 · 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · 4게임 direction focus OK |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.

**Next:** Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) · invent Next 금지.

### ≈ DB (directions-location → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v25** · +10 (ps-237–246) · 합계 **246** · themes `direction` · directionTagged **10** |
| dictation-beginner.json | **v27** · +10 (d-243–252) · 합계 **252** · themes `direction` · directionTagged **10** |
| telephone-beginner.json | **v24** · +10 (tel-234–243) · 합계 **243** · themes `direction` · directionTagged **10** |
| word-scramble-beginner.json | **v24** · +10 (ws-236–245) · 합계 **245** · themes `direction` · directionTagged **10** |
| manifest | **v95** |

Lemmas: 앞·뒤·옆·위·아래·왼쪽·오른쪽·근처·**길**·**지도**. Include 길·지도 residual. Pairs particle topic3/subject4/object3. Distinct from cloze (이 길로 곧장 가요 / 지도를 펼쳐 주세요) · bingo/listen. 사이·건너편 already in bingo/listen. 해요체 · NIKL/Sejong · 브랜드/지도앱명 없음 · hangul.js 미터치 · 커밋/푸시 없음. directionTagged 합 **80** (전 8×10).

**Next:** **ThemeSm19d** particle+dictation+tel+scramble direction 칩 enable (**방향/方向**).

### ≈ DC (ThemeSm19d · direction chip enable)

| 산출 | 결과 |
|------|------|
| ThemeSm19a 라벨/ORDER | 재사용 · KO **방향** / ZH **方向** / EN Direction |
| particle/dictation/tel/scramble | directionTagged=**10** + `themes` → 칩 활성 |
| smoke | `_smoke_games_theme_filter.js` · 전 8게임 direction focus OK |
| 스윕 | directions 스윕 닫힘 · directionTagged 합 **80** |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지.

### ≈ DD (중급 furniture-room + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v25** · +1 pack furniture-room **12**어 · 합계 **304** |
| speed-quiz-beginner.json | **v26** · +10 (sq-251–260) · 합계 **260** · themes `furniture` |
| manifest | **v96** |

Lemmas: 가구·책상·의자·소파·옷장·창문·문·거울·책장·식탁·**거실**·**방**. Speed covers first 10; 거실·방 pack thin → cloze. Distinct from home-chores 침대·부엌·냉장고 · housing 월세·이사. NIKL/Sejong·Tammy · 해요체 · 가구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** furniture-room → **cloze +8–10** (거실·방 포함).

### ≈ DE (furniture-room → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v26** · +10 (c-243–252) · 합계 **252** · themes `furniture` · furnitureTagged **10** |
| manifest | **v97** |

Lemmas: 가구·책상·의자·소파·옷장·창문·문·책장·**거실**·**방**. Include 거실·방. 거울·식탁 → bingo/listen. Distinct from home-chores 침대·부엌·냉장고 · housing 월세·이사. 해요체 · NIKL/Sejong · 가구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** furniture-room → **bingo/listen +8–10** (거울·식탁).

### ≈ DF (furniture-room → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v32** · +10 (bg-298–307) · 합계 **307** · themes `furniture` · furnitureTagged **10** |
| listen-match-beginner.json | **v32** · +10 (lm-265–274) · 합계 **274** · themes `furniture` · furnitureTagged **10** |
| manifest | **v98** |

Lemmas: 가구·소파·옷장·**거울**·책장·**식탁**·거실·책상·의자·창문. Include 거울·식탁. Beginner place/object 방·문·창문·의자·책상 kept (furniture retag via new IDs where needed). 문·방 → particle/dictation residual OK. Distinct from chores 옷장 정리 · housing 월세·이사. 해요체 · NIKL/Sejong · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** furniture-room → **particle/dictation(+tel/scramble) +8–10** (문·방).

### ≈ DG (ThemeSm20a · furniture chip enable)

| 산출 | 결과 |
|------|------|
| 8게임 `theme_furniture` i18n | KO **가구** / ZH **家具** / EN Furniture |
| THEME_ORDER | `furniture` (전 8 · direction 다음) |
| 칩 활성 | speed+cloze+bingo+listen furnitureTagged=**10** + `themes` |
| smoke | speed furniture focus · empty 4게임(particle/dictation/tel/scramble) 숨김 |
| Distinct | housing 주거/居住 · chores 집안일/家务 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #66.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling = particle/dictation(+tel/scramble) data.

### ≈ DH (ThemeSm20 wave verify · furniture chips)

| 산출 | 결과 |
|------|------|
| ThemeSm20a 라벨/ORDER/themes | 재사용 · KO **가구** / ZH **家具** / EN Furniture |
| furnitureTagged>0 | speed/cloze/bingo/listen=**10** → 칩 활성 |
| empty 4게임 | particle/dictation/tel/scramble furnitureTagged=**0** → themes 미추가·칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · 4게임 furniture focus OK |
| Distinct | housing 주거/居住 · chores 집안일/家务 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #66 유지.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling = particle/dictation(+tel/scramble) data.

### ≈ DI (furniture-room → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v26** · +10 (ps-247–256) · 합계 **256** · themes `furniture` · furnitureTagged **10** |
| dictation-beginner.json | **v28** · +10 (d-253–262) · 합계 **262** · themes `furniture` · furnitureTagged **10** |
| telephone-beginner.json | **v25** · +10 (tel-244–253) · 합계 **253** · themes `furniture` · furnitureTagged **10** |
| word-scramble-beginner.json | **v25** · +10 (ws-246–255) · 합계 **255** · themes `furniture` · furnitureTagged **10** |
| manifest | **v99** |

Lemmas: **문**·**방**·가구·거실·소파·식탁·의자·창문·거울·책장·옷장. Include 문·방. Particle pairs topic3/subject4/object3. Distinct from cloze 에/에서 · bingo/listen · chores/housing. 해요체 · NIKL/Sejong · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** **ThemeSm20d** particle+dictation+tel+scramble furniture 칩 enable/smoke (**가구/家具**).

### ≈ DJ (ThemeSm20d · furniture chip enable)

| 산출 | 결과 |
|------|------|
| ThemeSm20a 라벨/ORDER | 재사용 · KO **가구** / ZH **家具** / EN Furniture |
| 칩 활성 | particle/dictation/tel/scramble furnitureTagged=**10** + `themes` → 전 8 |
| smoke | `_smoke_games_theme_filter.js` · 전 8게임 furniture focus OK |
| housing/chores | 주거/居住 · 집안일/家务와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #67 · **furniture 스윕 닫힘**.

**Next:** 중급 **fruit-market** + speed +10.

### ≈ DK (중급 fruit-market + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v26** · +1 pack fruit-market **12**어 · 합계 **316** |
| speed-quiz-beginner.json | **v27** · +10 (sq-261–270) · 합계 **270** · themes `fruit` |
| manifest | **v100** |

Lemmas: 과일·채소·시장·사과·바나나·포도·수박·딸기·오렌지·토마토·**봉지**·**상자**. Speed covers first 10; 봉지·상자 pack thin → cloze. Distinct from beginner snacks-street · restaurant-cooking. NIKL/Sejong·Tammy · 해요체 · 마트/앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** fruit-market → **cloze +8–10** (봉지·상자 포함).

### ≈ DL (fruit-market → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v27** · +10 (c-253–262) · 합계 **262** · themes `fruit` |
| fruitTagged | **10** · **봉지·상자** 포함 |
| manifest | **v101** |

Lemmas: 과일·채소·시장·사과·바나나·포도·수박·**봉지**·**상자**·토마토. Distinct from snacks-street · restaurant-cooking. 오렌지 residual → bingo/listen. NIKL/Sejong · 해요체 · 마트 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Next:** fruit-market → **bingo +8–10** 또는 **listen-match +8–10** (오렌지).

### ≈ DM (fruit-market → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v33** · +10 (bg-308–317) · 합계 **317** · themes `fruit` · fruitTagged **10** |
| listen-match-beginner.json | **v33** · +10 (lm-275–284) · 합계 **284** · themes `fruit` · fruitTagged **10** |
| manifest | **v102** |

Lemmas include **오렌지**. 사과 food kept. 상자 → particle residual. hangul.js 미터치 · 커밋/푸시 없음.

**Next:** fruit-market → **particle/dictation(+tel/scramble) +8–10** (상자) · ThemeSm21a 칩.

### ≈ DN (fruit-market → particle/dictation/tel/scramble +10 · ThemeSm21a/d)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v27** · +10 (ps-257–266) · 합계 **266** · themes `fruit` · fruitTagged **10** |
| dictation-beginner.json | **v29** · +10 (d-263–272) · 합계 **272** · themes `fruit` · fruitTagged **10** |
| telephone-beginner.json | **v26** · +10 (tel-254–263) · 합계 **263** · themes `fruit` · fruitTagged **10** |
| word-scramble-beginner.json | **v26** · +10 (ws-256–265) · 합계 **265** · themes `fruit` · fruitTagged **10** |
| ThemeSm21a/d | 칩 KO **과일** / ZH **水果** · THEME_ORDER · 전 8 fruitTagged=**10** |
| manifest | **v103** |
| smoke | `_smoke_games_theme_filter.js` · 전 8게임 fruit focus OK |

Lemmas: 과일·채소·시장·사과·바나나·포도·수박·딸기·토마토·**상자**. Include 상자. Particle topic3/subject4/object3. Distinct from snacks-street · restaurant-cooking · bingo food. 해요체 · NIKL/Sejong · 마트 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #68 · **fruit 스윕 닫힘**.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만. (Paul offline loop 재개 → kitchen-tableware)

### ≈ DO (ThemeSm21 wave verify · fruit chips)

| 산출 | 결과 |
|------|------|
| ThemeSm21a 라벨/ORDER/themes | 재사용 · KO **과일** / ZH **水果** / EN Fruit |
| 칩 활성 | 전 8 fruitTagged=**10** + `themes` → 칩 활성 |
| smoke | `_smoke_games_theme_filter.js` · 전 8게임 fruit focus OK |
| food/restaurant/snack | 음식/饮食 · 식당/餐饮 · snack과 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #68 · **fruit 스윕 닫힘**.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만. (Paul offline loop 재개 → kitchen-tableware)

### ≈ DP (중급 kitchen-tableware + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v27** · +1 pack kitchen-tableware **12**어 · 합계 **328** |
| speed-quiz-beginner.json | **v28** · +10 (sq-271–280) · 합계 **280** · themes `kitchen` |
| speed.js | `theme_kitchen` KO **주방** / ZH **厨房** / EN Kitchen · THEME_ORDER |
| manifest | **v104** |

Lemmas: 그릇·접시·컵·숟가락·젓가락·포크·칼·냄비·주전자·도마·**쟁반**·**프라이팬**. Speed covers first 10; 쟁반·프라이팬 pack thin → cloze. Distinct from restaurant-cooking · home-chores · fruit-market · beginner 잔. NIKL/Sejong·Tammy · 해요체 · 조리기구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · fruit fills 미중복.

**Next:** kitchen-tableware → **cloze +8–10** (쟁반·프라이팬 포함).

### ≈ DQ (kitchen-tableware → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v28** · +10 (c-263–272) · 합계 **272** · themes `kitchen` · kitchenTagged **10** |
| cloze.js | `theme_kitchen` KO **주방** / ZH **厨房** / EN Kitchen · THEME_ORDER (speed 캐논 정렬) |
| manifest | **v105** |

Lemmas: 그릇·접시·컵·숟가락·젓가락·냄비·칼·도마·**쟁반**·**프라이팬**. Distinct from restaurant-cooking · home-chores · fruit-market · furniture · beginner 잔 · chores 그릇 씻다. NIKL/Sejong · 해요체 · 조리기구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** kitchen-tableware → **bingo/listen +8–10** (포크·주전자 residual OK). Claude Now/Next invent 금지.

### ≈ DR (ThemeSm22a · kitchen chip enable)

| 산출 | 결과 |
|------|------|
| 8 games theme_* / THEME_ORDER | 칩 캐논 KO **주방** / ZH **厨房** / EN Kitchen · key `kitchen` |
| 칩 활성 | speed(+cloze) kitchenTagged=**10** + `themes` → 칩 활성 |
| empty 6 | bingo/listen/particle/dictation/tel/scramble themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · speed kitchen focus OK |
| 구분 | restaurant 식당/餐饮 · furniture 가구/家具 · fruit 과일/水果와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #69.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: kitchen → bingo/listen.

### ≈ DS (ThemeSm22b/c · bingo/listen kitchen chips enable)

| 산출 | 결과 |
|------|------|
| 칩 활성 | bingo/listen kitchenTagged=**10** + `themes` → 칩 KO **주방** / ZH **厨房** (ThemeSm22a 라벨/ORDER 재사용) |
| empty 4 | particle/dictation/tel/scramble kitchenTagged=**0** · themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · bingo+listen(+speed/cloze) kitchen focus OK |
| 구분 | restaurant 식당/餐饮 · furniture 가구/家具 · fruit 과일/水果와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #70.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: kitchen → particle/dictation(+tel/scramble).

### ≈ DT (kitchen-tableware → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v28** · +10 (ps-267–276) · 합계 **276** · themes `kitchen` · kitchenTagged **10** |
| dictation-beginner.json | **v30** · +10 (d-273–282) · 합계 **282** · themes `kitchen` · kitchenTagged **10** |
| telephone-beginner.json | **v27** · +10 (tel-264–273) · 합계 **273** · themes `kitchen` · kitchenTagged **10** |
| word-scramble-beginner.json | **v27** · +10 (ws-266–275) · 합계 **275** · themes `kitchen` · kitchenTagged **10** |
| manifest | **v107** |

Lemmas: 그릇·접시·냄비·컵·포크·**쟁반**·**프라이팬**·숟가락·젓가락·도마(+dict/tel/scramble 주전자). Include 쟁반·프라이팬. Particle topic3/subject4/object3. Distinct from cloze 가져오세요/달궈요 · restaurant · chores · fruit · furniture. 해요체 · NIKL/Sejong · 조리기구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**ThemeSm22d Done** — 전 8 kitchen chips · kitchen 스윕 닫힘.

### ≈ ED (중급 animals-pets + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v30** · packs **31** · items **364** · pack `animals-pets` **12** |
| speed-quiz-beginner.json | **v31** · +10 (sq-301–310) · 합계 **310** · themes `pets` · petsTagged **10** |
| manifest | **v116** |

Lemmas: 개·고양이·새·강아지·물고기·토끼·닭·말·소·돼지 (+**키우다**·**동물원** → cloze → **Done ≈EE**). Distinct from nature-environment 동물·산·강·바다·공원. 해요체 · NIKL/Sejong·Tammy · 펫푸드·동물원 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** animals-pets → **cloze +10** (키우다·동물원 포함) → **Done (≈EE)**.

### ≈ EE (animals-pets → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v31** · +10 (c-293–302) · 합계 **302** · themes `pets` · petsTagged **10** |
| cloze.js | `theme_pets` KO **동물** / ZH **动物** / EN Pets · THEME_ORDER |
| manifest | **v117** |

Lemmas: 개·고양이·강아지·새·물고기·토끼·닭·말·**키우다**·**동물원**. Include 키우다·동물원. Distinct from nature 동물·산·강·바다·공원. 해요체 · NIKL/Sejong · 펫/동물원 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** animals-pets → **bingo/listen +8–10** (소·돼지 residual OK) → **Done (≈EG)**.

### ≈ EF (ThemeSm25a · pets chip enable)

| 산출 | 결과 |
|------|------|
| 칩 캐논 | KO **동물** / ZH **动物** / EN Pets · THEME_ORDER `pets` 전 8게임 |
| 칩 활성 | speed+cloze petsTagged=**10** + `themes` → 칩 활성 · **≈EH** 후 bingo/listen도 활성 |
| empty | particle/dictation/tel/scramble themes 미추가 · 칩 숨김 (bingo/listen → ≈EH Done) |
| smoke | speed+cloze pets focus OK · nature와 별개 |
| hangul.js | 미터치 · invent Next/lemma 없음 · 커밋/푸시 없음 |

**Sibling next 제안:** animals-pets → **bingo/listen +8–10** → **Done** · ThemeSm25b/c → **Done (≈EH)**.

### ≈ EG (animals-pets → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v37** · +10 (bg-348–357) · 합계 **357** · themes `pets` · petsTagged **10** |
| listen-match-beginner.json | **v37** · +10 (lm-315–324) · 합계 **324** · themes `pets` · petsTagged **10** |
| bingo.js / match.js | `theme_pets` 이미 있음 (동물/动物) · THEME_ORDER `pets` |
| manifest | **v118** |

Lemmas: 개·고양이·새·강아지·물고기·토끼·닭·말·**키우다**·**동물원**. Include 키우다·동물원. Distinct from nature 동물·산·강·바다·공원. 해요체 · NIKL/Sejong · 펫/동물원 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm25b/c** chip enable → **Done (≈EH)** · animals-pets → particle/dictation(+tel/scramble) +8–10 (소·돼지) → **Done (≈EI)**.

### ≈ EH (ThemeSm25b/c · bingo/listen pets chips enable)

| 산출 | 결과 |
|------|------|
| 칩 활성 | bingo/listen petsTagged=**10** + `themes` → 칩 **동물/动物** (ThemeSm25a 라벨/ORDER 재사용) |
| 함께 활성 | speed+cloze+bingo+listen pets focus |
| empty 4 | particle/dictation/tel/scramble themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · bingo+listen(+speed/cloze) pets focus OK |
| 구분 | nature 자연/自然와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #78.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: animals-pets → particle/dictation(+tel/scramble) (소·돼지) → **Done (≈EI)**.

### ≈ EI (animals-pets → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v31** · +10 (ps-297–306) · 합계 **306** · themes `pets` · petsTagged **10** |
| dictation-beginner.json | **v33** · +10 (d-303–312) · 합계 **312** · themes `pets` · petsTagged **10** |
| telephone-beginner.json | **v30** · +10 (tel-294–303) · 합계 **303** · themes `pets` · petsTagged **10** |
| word-scramble-beginner.json | **v30** · +10 (ws-296–305) · 합계 **305** · themes `pets` · petsTagged **10** |
| manifest | **v119** |

Lemmas: **소**·**돼지**·개·고양이·새·강아지·물고기·토끼·닭·말. Include 소·돼지 residual. Particle topic3/subject4/object3. Distinct from cloze/listen 키우다·동물원 · nature 동물. 해요체 · NIKL/Sejong · 펫 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm25d** particle+dictation+tel+scramble pets chip enable → pets 8-bank 스윕 닫기 → **Done**.

### ≈ EJ (중급 vehicles-driving + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v31** · packs **32** · items **376** · pack `vehicles-driving` **12** |
| speed-quiz-beginner.json | **v32** · +10 (sq-311–320) · 합계 **320** · themes `driving` · drivingTagged **10** |
| manifest | **v120** |

Lemmas: 운전·자동차·자전거·택시·횡단보도·사고·위험·조심하다·경찰·도로 (+**주차장**·**막히다** → cloze). Distinct from beginner transit 버스·지하철·표·정류장 · public-life 교통. 해요체 · NIKL/Sejong·Tammy · 차/택시 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** vehicles-driving → **cloze +10** (주차장·막히다 포함) → **Done (≈EK)**.

### ≈ EK (vehicles-driving → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v32** · +10 (c-303–312) · 합계 **312** · themes `driving` · drivingTagged **10** |
| cloze.js | `theme_driving` KO **운전** / ZH **驾驶** / EN Driving · THEME_ORDER (ThemeSm26a 캐논) |
| manifest | **v121** |

Lemmas: 운전·자동차·자전거·택시·횡단보도·사고·도로·경찰·**주차장**·**막히다**. Include 주차장·막히다. Distinct from beginner transit 버스·지하철·표·정류장 and travel-lodging. 해요체 · NIKL/Sejong · 차/택시 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm26b** cloze driving chip enable → **Done** · vehicles-driving → **bingo/listen +10** → **Done (≈EL)** · **ThemeSm26c** → **Done**.

### ≈ ThemeSm26b (cloze driving chip enable)

| 산출 | 결과 |
|------|------|
| ThemeSm26a 라벨/ORDER | 재사용 · KO **운전** / ZH **驾驶** / EN Driving |
| 칩 활성 | cloze drivingTagged=**10** + `themes` → 칩 활성 (speed와 함께) |
| empty 6 | bingo/listen/particle/dictation/tel/scramble (당시) · themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · speed+cloze driving focus OK |
| 구분 | travel 여행/旅游 · transit 교통/交通과 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #81.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: vehicles-driving → bingo/listen +10 → **Done**.

### ≈ EL (vehicles-driving → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v38** · +10 (bg-358–367) · 합계 **367** · themes `driving` · drivingTagged **10** |
| listen-match-beginner.json | **v38** · +10 (lm-325–334) · 합계 **334** · themes `driving` · drivingTagged **10** |
| bingo.js / match.js | `theme_driving` 이미 있음 (운전/驾驶) · THEME_ORDER `driving` |
| manifest | **v122** |

Data sibling 착지 확인 · ThemeSm26c chip enable. hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm26c** bingo/listen driving chips enable → **Done**.

### ≈ ThemeSm26c (bingo/listen driving chips enable)

| 산출 | 결과 |
|------|------|
| ThemeSm26a 라벨/ORDER | 재사용 · KO **운전** / ZH **驾驶** / EN Driving |
| 칩 활성 | cloze/bingo/listen drivingTagged=**10** + `themes` → 칩 활성 (speed와 함께 · 4게임) |
| empty 4 | particle/dictation/tel/scramble drivingTagged=**0** · themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · speed+cloze+bingo+listen driving focus OK |
| 구분 | travel 여행/旅游 · transit 교통/交通과 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #82.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: vehicles-driving → particle/dictation(+tel/scramble) +10 → **Done (≈EM)**.

### ≈ EM (vehicles-driving → particle/dictation(+tel/scramble) +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v32** · +10 (ps-307–316) · 합계 **316** · themes `driving` · drivingTagged **10** |
| dictation-beginner.json | **v34** · +10 (d-313–322) · 합계 **322** · themes `driving` · drivingTagged **10** |
| telephone-beginner.json | **v31** · +10 (tel-304–313) · 합계 **313** · themes `driving` · drivingTagged **10** |
| word-scramble-beginner.json | **v31** · +10 (ws-306–315) · 합계 **315** · themes `driving` · drivingTagged **10** |
| manifest | **v123** |

Lemmas: 운전·자동차·자전거·택시·횡단보도·사고·**위험**·**조심하다**·경찰·도로·**주차장**·**막히다**. Particle topic3/subject4/object3. Distinct from cloze 세차/불러요 · listen 배워요/헬멧 · transit 버스·지하철 · travel. 해요체 · NIKL/Sejong · 차/택시 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm26d** particle+dictation+tel+scramble driving chip enable → vehicles-driving 8-bank 스윕 닫기 → **Done**.

### ≈ ER (중급 pantry-ingredients + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v33** · packs **34** · items **400** · pack `pantry-ingredients` **12** |
| speed-quiz-beginner.json | **v34** · +10 (sq-331–340) · 합계 **340** · themes `pantry` · pantryTagged **10** |
| manifest | **v128** |

Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·생선·빵·김치 (+**간장**·**양파** → cloze). Distinct from restaurant-cooking · fruit-market · kitchen-tableware · beginner drinks 우유 · snacks. 해요체 · NIKL/Sejong·Tammy · 식료품 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** pantry-ingredients → **cloze +10** (간장·양파 포함) → **Done**.

### ≈ ES (pantry-ingredients → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v34** · +10 (c-323–332) · 합계 **332** · themes `pantry` · pantryTagged **10** |
| manifest | **v129** |

Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·김치·**간장**·**양파**. Include 간장·양파. Distinct from restaurant-cooking · fruit-market · kitchen-tableware · beginner drinks 우유 · snacks. 해요체 · NIKL/Sejong · 식료품 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 생선·빵 → bingo/listen.

**Sibling next 제안:** pantry-ingredients → **bingo/listen +8–10** (생선·빵) → **Done**.

### ≈ ET (pantry-ingredients → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v40** · +10 (bg-378–387) · 합계 **387** · themes `pantry` · pantryTagged **10** |
| listen-match-beginner.json | **v40** · +10 (lm-345–354) · 합계 **354** · themes `pantry` · pantryTagged **10** |
| manifest | **v130** |

Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·**생선**·**빵**·김치. Include 생선·빵. Distinct from restaurant-cooking · fruit-market · kitchen-tableware · beginner food 빵 · cloze/pack examples. 해요체 · NIKL/Sejong · 식료품 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 간장·양파 → cloze 잔여 OK.

**Sibling next 제안:** pantry-ingredients → **particle/dictation(+tel/scramble) +8–10** → **Done**.

### ThemeSm28a (pantry chip enable · speed+cloze+bingo+listen)

| 산출 | 결과 |
|------|------|
| 8게임 JS | 칩 캐논 KO **재료** / ZH **食材** / EN Pantry · `THEME_ORDER` + `theme_pantry` |
| speed+cloze+bingo+listen | pantryTagged=**10**×4 + `themes` → 칩 활성 |
| empty 4 | themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` focus pantry×4 OK |

Distinct from kitchen 주방/厨房 · fruit 과일/水果 · restaurant 식당/餐饮. invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #87.

**Sibling next 제안:** invent Next 금지 (Claude Next 대기). data Suggest particle/dictation(+tel/scramble)은 sibling data 레인 → **Done**.

### ≈ EU (pantry-ingredients → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v34** · +10 (ps-327–336) · 합계 **336** · themes `pantry` · pantryTagged **10** |
| dictation-beginner.json | **v36** · +10 (d-333–342) · 합계 **342** · themes `pantry` · pantryTagged **10** |
| telephone-beginner.json | **v33** · +10 (tel-324–333) · 합계 **333** · themes `pantry` · pantryTagged **10** |
| word-scramble-beginner.json | **v33** · +10 (ws-326–335) · 합계 **335** · themes `pantry` · pantryTagged **10** |
| manifest | **v131** |

Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·**생선**·**빵**·김치. Include 생선·빵. Pairs particle topic3/subject4/object3. Distinct from kitchen-tableware · fruit-market · restaurant-cooking · cloze/listen/pack examples. 해요체 · NIKL/Sejong · 식료품 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 간장·양파 → cloze 잔여 OK.

**Sibling next 제안:** **ThemeSm28d** pantry chip enable (particle+dictation+tel+scramble) → pantry 8-bank 스윕 닫기 → **Done**.

### ThemeSm28d (particle+dictation+tel+scramble pantry chip enable)

| 산출 | 결과 |
|------|------|
| particle/dictation/tel/scramble | pantryTagged=**10**×4 + `themes` → 칩 KO **재료** / ZH **食材** / EN Pantry |
| 전 8 | pantry 칩 활성 · smoke `_smoke_games_theme_filter.js` focus pantry×8 OK |
| sweep | pantry-ingredients 8-bank 스윕 닫힘 |

Distinct from kitchen 주방/厨房 · fruit 과일/水果 · restaurant 식당/餐饮. invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #88.

**Sibling next 제안:** invent Next 금지 (Claude Next 대기) · self-QA만.

### ≈ EV (중급 bathroom-hygiene + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v34** · packs **35** · items **412** · pack `bathroom-hygiene` **12** |
| speed-quiz-beginner.json | **v35** · +10 (sq-341–350) · 합계 **350** · themes `bathroom` · bathroomTagged **10** |
| manifest | **v132** |

Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·면도·더럽다 (+**깨끗하다**·**손수건** → cloze). Distinct from cosmetics-basic 샴푸·비누 · home-chores 수건·씻다·닦다 · furniture 거울 · nature 쓰레기. 해요체 · NIKL/Sejong·Tammy · 위생 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** bathroom-hygiene → **cloze +10** (깨끗하다·손수건 포함) → **Done** (아래 EW).

### ≈ EW (bathroom-hygiene → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v35** · +10 (c-333–342) · 합계 **342** · themes `bathroom` · bathroomTagged **10** |
| manifest | **v133** |

Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·**깨끗하다**·**손수건**. Distinct from cosmetics 샴푸·비누 · chores 수건·씻다·닦다 · clinic/health · furniture 거울 · nature 쓰레기. 해요체 · NIKL/Sejong · 위생 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** bathroom-hygiene → **bingo/listen +10** (면도·더럽다 포함) → **Done** (아래 EX).

### ≈ EX (bathroom-hygiene → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v41** · +10 (bg-388–397) · 합계 **397** · themes `bathroom` · bathroomTagged **10** |
| listen-match-beginner.json | **v41** · +10 (lm-355–364) · 합계 **364** · themes `bathroom` · bathroomTagged **10** |
| manifest | **v134** |

Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·**면도**·**더럽다**. Distinct from cosmetics 샴푸·비누 · chores 수건·씻다 · clinic/health · furniture 거울 · nature 쓰레기 · beginner lm-11 길묻기. 해요체 · NIKL/Sejong · 위생 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm29b/c** bingo/listen bathroom chips → **Done** (아래) · bathroom-hygiene → **particle/dictation(+tel/scramble) +10** → **Done** (≈ EY).

### ThemeSm29b/c (bingo/listen bathroom chips enable)

| 산출 | 결과 |
|------|------|
| 칩 활성 | bingo/listen bathroomTagged=**10** + `themes` → 칩 KO **욕실** / ZH **浴室** (ThemeSm29a 라벨/ORDER 재사용) |
| 함께 활성 | speed+cloze+bingo+listen bathroom focus |
| empty 4 | particle/dictation/tel/scramble bathroomTagged=**0** · themes 미추가 → 칩 숨김 *(data 전)* |
| smoke | `_smoke_games_theme_filter.js` · bingo+listen(+speed/cloze) bathroom focus OK |
| 구분 | clinic 병원/医院 · chores 집안일/家务와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #90.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: bathroom-hygiene → particle/dictation(+tel/scramble) +10 → **Done** (≈ EY).

### ≈ EY (bathroom-hygiene → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v35** · +10 (ps-337–346) · 합계 **346** · themes `bathroom` · bathroomTagged **10** · pairs topic3/subject4/object3 |
| dictation-beginner.json | **v37** · +10 (d-343–352) · 합계 **352** · themes `bathroom` · bathroomTagged **10** |
| telephone-beginner.json | **v34** · +10 (tel-334–343) · 합계 **343** · themes `bathroom` · bathroomTagged **10** |
| word-scramble-beginner.json | **v34** · +10 (ws-336–345) · 합계 **345** · themes `bathroom` · bathroomTagged **10** |
| manifest | **v135** |

Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·**면도**·**더럽다**. Distinct from cosmetics 샴푸·비누 · chores 수건·씻다 · clinic/health · furniture 거울 · nature 쓰레기 · cloze/listen/pack. 해요체 · NIKL/Sejong · 위생 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 깨끗하다·손수건 → cloze 잔여 OK.

**Sibling next 제안:** **ThemeSm29d** bathroom chip enable (particle+dictation+tel+scramble) → bathroom 8-bank 스윕 닫기.

### ≈ EN (중급 city-places + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v32** · packs **33** · items **388** · pack `city-places` **12** |
| speed-quiz-beginner.json | **v33** · +10 (sq-321–330) · 합계 **330** · themes `places` · placesTagged **10** |
| manifest | **v124** |

Lemmas: 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·카페·경찰서 (+**운동장**·**역** → cloze). Distinct from money-banking 계좌·이체 · fruit 시장 · nature 공원 · hobby 박물관·미술관 · clinic 병원 · mail 우체국 · transit 정류장 · school lesson · travel 숙소·항공권. 해요체 · NIKL/Sejong·Tammy · 가게/은행/미용실 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** city-places → **cloze +10** (운동장·역 포함).

### ThemeSm27a (speed(+cloze) places chip enable)

| 산출 | 결과 |
|------|------|
| 8게임 JS | `theme_places` KO **장소** / ZH **场所** / EN Places · THEME_ORDER `places` |
| speed+cloze themes | `places` · placesTagged **10**×2 → 칩 활성 |
| empty 6게임 | themes `places` 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` focus places×speed+cloze · OK |

travel/direction/driving와 별개 · bingo beginner `place`(단수)와 키 분리 · invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.

### ≈ EO (city-places → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v33** · +10 (c-313–322) · 합계 **322** · themes `places` · placesTagged **10** |
| manifest | **v125** |

Lemmas: 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·**운동장**·**역**. Include 운동장·역. Distinct from travel-lodging · directions-location · vehicles-driving · money-banking 계좌·이체 · beginner transit 정류장. 해요체 · NIKL/Sejong · 가게/은행/미용실 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 카페·경찰서 → bingo/listen.

**Sibling next 제안:** city-places → **bingo/listen +10** (카페·경찰서) → **Done**.

### ≈ EP (city-places → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v39** · +10 (bg-368–377) · 합계 **377** · themes `places` · placesTagged **10** |
| listen-match-beginner.json | **v39** · +10 (lm-335–344) · 합계 **344** · themes `places` · placesTagged **10** |
| manifest | **v126** |

Lemmas: 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·**카페**·**경찰서**. Include 카페·경찰서. Tag `places` (≠ `place`/travel/direction/driving). 해요체 · NIKL/Sejong · 가게/은행/미용실 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. Distinct from cloze/pack examples · beginner cafe orders · driving 경찰.

**Sibling next 제안:** city-places → **particle/dictation(+tel/scramble) +8–10** → **Done**.

### ≈ EQ (city-places → particle/dictation/tel/scramble +10)

| 산출 | 결과 |
|------|------|
| particle-beginner.json | **v33** · +10 (ps-317–326) · 합계 **326** · themes `places` · placesTagged **10** |
| dictation-beginner.json | **v35** · +10 (d-323–332) · 합계 **332** · themes `places` · placesTagged **10** |
| telephone-beginner.json | **v32** · +10 (tel-314–323) · 합계 **323** · themes `places` · placesTagged **10** |
| word-scramble-beginner.json | **v32** · +10 (ws-316–325) · 합계 **325** · themes `places` · placesTagged **10** |
| manifest | **v127** |

Lemmas: 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·**카페**·**경찰서**. Tag `places`. 해요체 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** **ThemeSm27d** places chip enable → city-places 8-bank 스윕 닫기 → **Done**.

### ThemeSm27b/c (bingo/listen places chips enable)

| 산출 | 결과 |
|------|------|
| bingo/listen(+speed/cloze) | placesTagged=**10** + `themes` → 칩 KO **장소** / ZH **场所** |
| smoke | bingo+listen(+speed/cloze) places focus OK |

### ThemeSm27d (particle/dictation/tel/scramble places chips enable)

| 산출 | 결과 |
|------|------|
| particle/dictation/tel/scramble | placesTagged=**10** + `themes` → 칩 KO **장소** / ZH **场所** |
| 전 8 | placesTagged=**10**×8 · 칩 **장소/场所** |
| smoke | `_smoke_games_theme_filter.js` focus places×8 · `_smoke-places-focus.js` OK |
| 스윕 | city-places **닫힘** |

travel/direction/driving와 별개 · invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #86.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### ≈ EB (post-mail → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v36** · +10 (bg-338–347) · 합계 **347** · themes `mail` · mailTagged **10** |
| listen-match-beginner.json | **v36** · +10 (lm-305–314) · 합계 **314** · themes `mail` · mailTagged **10** |
| bingo.js / match.js | `theme_mail` 이미 있음 (우편/邮寄) · THEME_ORDER `mail` |
| manifest | **v114** |

Lemmas: 편지·소포·우표·우체국·보내다·받다·주소·봉투·**부치다**·**포장**. Include 부치다·포장. Distinct from housing 배달 · fruit 상자 · digital · stationery · family lm-125 부모님께 편지. 해요체 · NIKL/Sejong · 택배 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** post-mail → **particle/dictation(+tel/scramble) +8–10** (엽서·도착 residual OK).

### ≈ EC (ThemeSm24a · mail chip enable)

| 산출 | 결과 |
|------|------|
| 8 games theme_* / THEME_ORDER | 칩 캐논 KO **우편** / ZH **邮寄** / EN Mail · key `mail` |
| 칩 활성 | speed+cloze+bingo+listen mailTagged=**10** + `themes` → 칩 활성 |
| empty 4 | particle/dictation/tel/scramble themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · speed+cloze+bingo+listen mail focus OK |
| 구분 | housing 주거/居住 · digital 디지털/数码 · stationery 문구/文具와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #75.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: post-mail → particle/dictation(+tel/scramble) (엽서·도착).

### ≈ EA (post-mail → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v30** · +10 (c-283–292) · 합계 **292** · themes `mail` · mailTagged **10** |
| cloze.js | `theme_mail` KO **우편** / ZH **邮寄** / EN Mail · THEME_ORDER |
| manifest | **v113** |

Lemmas: 편지·소포·우표·우체국·보내다·받다·주소·봉투·**엽서**·**도착**. Include 엽서·도착. Distinct from housing 배달 · fruit 상자 · digital · stationery 봉투(desk). 해요체 · NIKL/Sejong · 택배 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** post-mail → **bingo/listen +8–10** (부치다·포장 residual OK) → **Done (≈EB)**.

### ≈ DZ (중급 post-mail + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v29** · packs **30** · items **352** · pack `post-mail` **12** |
| speed-quiz-beginner.json | **v30** · +10 (sq-291–300) · 합계 **300** · themes `mail` · mailTagged **10** |
| manifest | **v112** |

Lemmas: 편지·소포·우표·우체국·보내다·받다·주소·봉투·부치다·포장 (+**엽서**·**도착** → cloze → **Done ≈EA**). Distinct from housing-services 배달 · fruit-market 상자 · digital-comms · office-stationery. 해요체 · NIKL/Sejong·Tammy · 택배 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** post-mail → **cloze +10** (엽서·도착 포함) → **Done (≈EA)**.

### ≈ DU (ThemeSm22d · particle/dictation/tel/scramble kitchen chips enable)

| 산출 | 결과 |
|------|------|
| 칩 활성 | particle/dictation/tel/scramble kitchenTagged=**10** + `themes` → 칩 KO **주방** / ZH **厨房** (ThemeSm22a 라벨/ORDER 재사용) |
| smoke | `_smoke_games_theme_filter.js` · 전 8 kitchen focus OK |
| 구분 | restaurant 식당/餐饮 · furniture 가구/家具 · fruit 과일/水果와 별개 |
| 스윕 | **kitchen 스윕 닫힘** |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #71.

**Next:** office-stationery bingo/listen Done → **particle/dictation(+tel/scramble) +8–10** (필통·자).

### ≈ DY (office-stationery → bingo/listen +10)

| 산출 | 결과 |
|------|------|
| bingo-beginner.json | **v35** · +10 (bg-328–337) · 합계 **337** · themes `stationery` · stationeryTagged **10** |
| listen-match-beginner.json | **v35** · +10 (lm-295–304) · 합계 **304** · themes `stationery` · stationeryTagged **10** |
| manifest | **v110** |

Lemmas: 펜·연필·볼펜·지우개·공책·종이·가위·풀·**책**·**노트**. Distinct from school-class · workplace · music · kitchen · furniture 책상·책장. 해요체 · NIKL/Sejong · 문구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음. 필통·자 residual → particle/dictation.

**Sibling next 제안:** office-stationery → **particle/dictation(+tel/scramble) +8–10** (필통·자).

### ≈ DW (office-stationery → cloze +10)

| 산출 | 결과 |
|------|------|
| cloze-beginner.json | **v29** · +10 (c-273–282) · 합계 **282** · themes `stationery` · stationeryTagged **10** |
| cloze.js | `theme_stationery` KO **문구** / ZH **文具** / EN Stationery · THEME_ORDER |
| manifest | **v109** |

Lemmas: 펜·연필·볼펜·지우개·공책·종이·가위·풀·**필통**·**자**. Distinct from school-class · workplace · music · kitchen. 해요체 · NIKL/Sejong · 문구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** office-stationery → **bingo/listen +8–10** (책·노트 residual OK) → **Done (≈DY)**.

### ≈ DY (ThemeSm23b/c · bingo/listen stationery chips enable)

| 산출 | 결과 |
|------|------|
| 칩 활성 | bingo/listen stationeryTagged=**10** + `themes` → 칩 **문구/文具** (ThemeSm23a 라벨/ORDER 재사용) |
| 함께 활성 | speed+cloze+bingo+listen stationery focus |
| empty 4 | particle/dictation/tel/scramble themes 미추가 → 칩 숨김 |
| smoke | `_smoke_games_theme_filter.js` · bingo+listen(+speed/cloze) stationery focus OK |
| 구분 | school 학교/学校 · workplace 직장/职场와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #73.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: office-stationery → particle/dictation(+tel/scramble) (필통·자).

### ≈ DX (ThemeSm23a · stationery chip enable)

| 산출 | 결과 |
|------|------|
| 8 games theme_* / THEME_ORDER | 칩 캐논 KO **문구** / ZH **文具** / EN Stationery · key `stationery` |
| 칩 활성 | speed(+cloze) stationeryTagged=**10** + `themes` → 칩 활성 · **≈DY** 후 bingo/listen도 활성 |
| empty 4 | particle/dictation/tel/scramble themes 미추가 → 칩 숨김 (bingo/listen → ≈DY Done) |
| smoke | `_smoke_games_theme_filter.js` · speed(+cloze) stationery focus OK |
| 구분 | school 학교/学校 · workplace 직장/职场와 별개 |

hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · ask-paul #72.

**Next:** Claude Now/Next **비어 있음** · invent Next 금지 · sibling: office-stationery → particle/dictation(+tel/scramble) (필통·자).

### ≈ DV (중급 office-stationery + speed +10)

| 산출 | 결과 |
|------|------|
| jabi-theme-packs-intermediate.json | **v28** · packs **29** · items **340** · pack `office-stationery` **12** |
| speed-quiz-beginner.json | **v29** · +10 (sq-281–290) · 합계 **290** · themes `stationery` · stationeryTagged **10** |
| manifest | **v108** |

Lemmas: 펜·연필·볼펜·지우개·공책·종이·가위·풀·책·노트 (+**필통**·**자** → cloze). Distinct from school-class · work-study · public-workplace · music-arts 그리다. 해요체 · NIKL/Sejong·Tammy · 문구 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.

**Sibling next 제안:** office-stationery → **cloze +10** (필통·자 포함) → **Done (≈DW)**.

---

*Cursor · 2026-07-27 (animals-pets + speed)*

---

*Cursor · 2026-07-27 (ThemeSm24a mail chip)*

---

*Cursor · 2026-07-27 (post-mail → bingo/listen)*

---

*Cursor · 2026-07-27 (post-mail → cloze)*

---

*Cursor · 2026-07-27 (post-mail + speed)*

---

*Cursor · 2026-07-27 (ThemeSm23a stationery chip)*

---

*Cursor · 2026-07-27 (office-stationery → bingo/listen)*

---

*Cursor · 2026-07-27 (office-stationery → cloze)*

---

*Cursor · 2026-07-27 (office-stationery + speed)*

---

*Cursor · 2026-07-27 (ThemeSm22d kitchen chips · sweep closed)*

---

*Cursor · 2026-07-27 (kitchen-tableware → particle/dictation/tel/scramble)*

---

*Cursor · 2026-07-27 (ThemeSm22b/c bingo/listen kitchen chips)*

---

*Cursor · 2026-07-27 (ThemeSm22a kitchen chip)*

---

*Cursor · 2026-07-27 (kitchen-tableware → cloze)*

---

*Cursor · 2026-07-27 (kitchen-tableware + speed)*

---

*Cursor · 2026-07-27 (ThemeSm21 wave verify)*

---

*Cursor · 2026-07-27 (ThemeSm21a/d fruit chips + particle 4-game)*

---

*Cursor · 2026-07-27 (fruit-market → cloze)*

---

*Cursor · 2026-07-27 (fruit-market + speed)*

---

*Cursor · 2026-07-27 (ThemeSm20d furniture chips)*

---

*Cursor · 2026-07-27 (furniture-room → particle/dictation/tel/scramble)*

---

*Cursor · 2026-07-27 (ThemeSm20 wave furniture)*

---

*Cursor · 2026-07-27 (ThemeSm20a furniture chip)*

---

*Cursor · 2026-07-27 (furniture-room → bingo/listen)*

---

*Cursor · 2026-07-27 (ThemeSm25a pets chip)*

---

*Cursor · 2026-07-27 (animals-pets → bingo/listen)*

---

*Cursor · 2026-07-27 (ThemeSm25b/c bingo/listen pets chips)*

---

*Cursor · 2026-07-27 (animals-pets → particle/dictation/tel/scramble)*

---

*Cursor · 2026-07-27 (ThemeSm26c bingo/listen driving chips)*


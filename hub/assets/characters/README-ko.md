# 자음 동료 캐릭터 에셋

> Owner: **Claude** (비주얼) · Cursor는 경로·단계 수만 맞추면 됩니다.
> 관련: [`docs/handoff-growth-character-ko.md`](../../../docs/handoff-growth-character-ko.md)

## 파일 규칙

```
hub/assets/characters/
  char-{roman}-{stage}.svg   진화 단계별 (stage = 1..4)
  char-{roman}.svg           마스터 (CSS 변수로 색 제어)
  source/{roman}.png         원본 아트 (재추적용, 앱에서 안 씀)
```

`{roman}` = 자모 로마자 이름: `giyeok`(ㄱ) `nieun`(ㄴ) `mieum`(ㅁ) `bieup`(ㅂ)
`siot`(ㅅ) `ieung`(ㅇ) `rieul`(ㄹ) `hieut`(ㅎ) … 자비는 `jieut`(ㅈ)이지만
로고를 겸하므로 [`hub/app/icons/jabi-mark.svg`](../../app/icons/jabi-mark.svg)에 별도로 있습니다.

## 단계 수는 4단계

핸드오프의 "포켓몬식 실루엣→또렷"을 이렇게 구현했습니다:

| 단계 | 모습 |
|------|------|
| 1 | 회색 실루엣 — 형태만 보임, 무슨 자음인지 짐작만 |
| 2 | 외곽선이 드러나고 본체 색이 희미하게 |
| 3 | 본체 색 완성, 팬티는 아직 어두움 |
| 4 | 팬티까지 완성 — 자비와 같은 완성형 |

**1단계가 검정이 아니라 중간 회색인 이유**: 앱 배경이 매우 어두워서(`#050419`)
검정 실루엣은 배경에 묻혀 안 보입니다. 밝은 배경에서도 읽히는 톤으로 잡았습니다.

## 쓰는 법

단계 파일은 그냥 `<img>`로 쓰면 됩니다 — 별도 CSS 없이 동작합니다.

```html
<img src="../assets/characters/char-giyeok-2.svg" alt="" width="48" height="48">
```

`char-{roman}.svg`(마스터)는 **인라인으로 넣었을 때만** 색 제어가 됩니다.
`<img>`로 불러오면 바깥 CSS 변수가 안 먹으니, 그 경우엔 단계 파일을 쓰세요.

## 새 자모 추가 / 다시 만들기

```bash
python scripts/make-characters.py giyeok=path/to/art.png nieun=path/to/nieun.png
```

원본 PNG만 있으면 4단계가 자동 생성됩니다. 팔레트(외곽선·본체·팬티)는
이미지에서 자동 감지하므로 색을 따로 지정할 필요가 없습니다.

**아트 생성 규칙**(재생성 시 스타일 유지):
- 자비와 동일한 락업 — 굵은 균일 다크 외곽선, 청키한 둥근 획, 짧고 통통한 다리,
  **팬티(허리밴드 + 둥근 다리 구멍)**, 얼굴 없음, 배경 없음, 플랫 벡터
- **팬티는 브랜드 시그니처이므로 빼지 말 것**
- 자모 하나당 **단독 캐릭터로 생성** — 그리드로 뽑으면 칸당 해상도가 낮아 추적 불가
- 생성 후 자모 형태가 맞는지 반드시 눈으로 확인 (AI가 자주 틀림)

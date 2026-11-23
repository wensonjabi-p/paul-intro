/**
 * Smoke: games theme-filter chips · labels · localStorage keys · empty-guard.
 * Focus tags: clinic, workplace, school, travel, weather, digital, family, hobby, emotion, sports, nature, restaurant, clothes, music, media, celebration, time, chores, body, direction, furniture (all 8 games), fruit (all 8 games), kitchen (all 8 games · ThemeSm22d Done · kitchen sweep closed), stationery (all 8 games · ThemeSm23d Done · stationery sweep closed), mail (all 8 games · ThemeSm24d Done · post-mail sweep closed), pets (all 8 games · ThemeSm25d Done · animals-pets sweep closed), driving (all 8 games · ThemeSm26d Done · vehicles-driving sweep closed), places (all 8 games · ThemeSm27d Done · city-places sweep closed), pantry (all 8 games · ThemeSm28d Done · pantry-ingredients sweep closed), bathroom (all 8 games · ThemeSm29d Done · bathroom-hygiene sweep closed), jobs (all 8 games · ThemeSm30d Done · jobs-occupations sweep closed), country (all 8 games · ThemeSm31d Done · countries-nationality sweep closed), routine (all 8 games · ThemeSm32d Done · daily-routine sweep closed), size (all 8 games · ThemeSm33d Done · size-quantity sweep closed), senses (speed+cloze · ThemeSm34a), housing, banking.
 * Media sweep closed (ThemeSm14d): all 8 games mediaTagged=10 → chips 미디어/媒体.
 * ThemeSm15 celebration: label canon 축하/庆祝 on all 8; THEME_ORDER celebration; Pack celebration-holiday → tag `celebration`.
 *   ThemeSm15a–d: all 8 games celebrationTagged=10 → chips 축하/庆祝. Celebration sweep closed.
 * ThemeSm16 time: label canon 시간/时间 on all 8; THEME_ORDER time; Pack time-appointment → tag `time`.
 *   ThemeSm16a: speed timeTagged=10 + themes → chip 활성 (labels+ORDER on all 8).
 *   ThemeSm16: enable chips wherever timeTagged>0 + themes — speed/cloze/bingo/listen/particle/dictation/tel/scramble (≥10). Time sweep closed.
 * ThemeSm17 chores: label canon 집안일/家务 on all 8; THEME_ORDER chores; Pack home-chores → tag `chores`.
 *   ThemeSm17a: speed(+cloze after data) choresTagged=10 + themes → chip 활성; empty games themes 미추가 (chip 숨김).
 *   ThemeSm17b/c: bingo/listen choresTagged=10 + themes → chips 집안일/家务 (with speed+cloze).
 *   ThemeSm17d: particle/dictation/tel/scramble choresTagged=10 → chips 집안일/家务 (all 8 games). Chores sweep closed.
 * ThemeSm18 body: label canon 신체/身体 on all 8; THEME_ORDER body; Pack body-parts → tag `body`.
 *   ThemeSm18a (= ThemeSm18 wave for bodyTagged>0): speed+cloze+bingo+listen bodyTagged=10 + themes → chip 활성; empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm18d: particle/dictation/tel/scramble bodyTagged=10 → chips 신체/身体 (all 8 games). Body sweep closed.
 * ThemeSm19 / ThemeSm19a / ThemeSm19d direction: label canon 방향/方向 on all 8; THEME_ORDER direction; Pack directions-location → tag `direction`.
 *   Distinct from travel 여행/旅游 · transit 교통/交通 · older beginner tag `directions` (plural, no chip).
 *   ThemeSm19a: labels+ORDER on all 8.
 *   ThemeSm19 (= wave for directionTagged>0): speed+cloze+bingo+listen directionTagged=10 + themes → chip 활성;
 *   ThemeSm19d: particle/dictation/tel/scramble directionTagged=10 → chips 방향/方向 (all 8 games). Direction sweep closed.
 * ThemeSm20 / ThemeSm20a / ThemeSm20d furniture: label canon 가구/家具 on all 8; THEME_ORDER furniture; Pack furniture-room → tag `furniture`.
 *   Distinct from housing 주거/居住 · chores 집안일/家务.
 *   ThemeSm20a: labels+ORDER on all 8; speed(+cloze/bingo/listen sibling data) furnitureTagged=10 + themes → chip 활성.
 *   ThemeSm20 (= wave for furnitureTagged>0): smoke focus speed+cloze+bingo+listen furniture; empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm20d: particle/dictation/tel/scramble furnitureTagged=10 → chips 가구/家具 (all 8 games). Furniture sweep closed.
 * ThemeSm21 / ThemeSm21a / ThemeSm21d fruit: label canon 과일/水果 on all 8; THEME_ORDER fruit; Pack fruit-market → tag `fruit`.
 *   Distinct from restaurant 식당/餐饮 · snack · shopping · bingo food 음식/饮食.
 *   ThemeSm21a: labels+ORDER on all 8; speed(+cloze/bingo/listen) fruitTagged=10 + themes → chip 활성.
 *   ThemeSm21 (= wave for fruitTagged>0): enable chips wherever fruitTagged>0 + themes.
 *   ThemeSm21d: particle/dictation/tel/scramble fruitTagged=10 → chips 과일/水果 (all 8). Fruit sweep closed.
 * ThemeSm22 kitchen: label canon 주방/厨房 on all 8; THEME_ORDER kitchen; Pack kitchen-tableware → tag `kitchen`.
 *   Distinct from restaurant 식당/餐饮 · furniture 가구/家具 · fruit 과일/水果.
 *   ThemeSm22a: labels+ORDER on all 8; speed+cloze kitchenTagged=10 + themes → chip 활성.
 *   ThemeSm22b/c: bingo/listen kitchenTagged=10 + themes → chips 주방/厨房 (with speed+cloze).
 *   ThemeSm22d: particle/dictation/tel/scramble kitchenTagged=10 → chips 주방/厨房 (all 8). Kitchen sweep closed.
 * ThemeSm23 stationery: label canon 문구/文具 on all 8; THEME_ORDER stationery; Pack office-stationery → tag `stationery`.
 *   Distinct from school 학교/学校 · workplace 직장/职场.
 *   ThemeSm23a: labels+ORDER on all 8; speed(+cloze) stationeryTagged=10 + themes → chip 활성; empty games themes 미추가 (chip 숨김).
 *   ThemeSm23b/c: bingo/listen stationeryTagged=10 + themes → chips 문구/文具 (with speed+cloze).
 *   ThemeSm23d: particle/dictation/tel/scramble stationeryTagged=10 → chips 문구/文具 (all 8). Stationery sweep closed.
 * ThemeSm24 mail: label canon 우편/邮寄 on all 8; THEME_ORDER mail; Pack post-mail → tag `mail`.
 *   Distinct from housing 주거/居住 · digital 디지털/数码 · stationery 문구/文具.
 *   ThemeSm24a: labels+ORDER on all 8; speed(+cloze/bingo/listen) mailTagged=10 + themes → chip 활성; empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm24d: particle/dictation/tel/scramble mailTagged=10 → chips 우편/邮寄 (all 8). Post-mail sweep closed.
 * ThemeSm25 pets: label canon 동물/动物 on all 8; THEME_ORDER pets; Pack animals-pets → tag `pets`.
 *   Distinct from nature 자연/自然.
 *   ThemeSm25a: labels+ORDER on all 8; speed(+cloze sibling data) petsTagged=10 + themes → chip 활성; empty 6 games themes 미추가 (chip 숨김).
 *   ThemeSm25b/c: bingo/listen petsTagged=10 + themes → chips 동물/动物 (with speed+cloze); empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm25d: particle/dictation/tel/scramble petsTagged=10 → chips 동물/动物 (all 8). Animals-pets sweep closed.
 * ThemeSm26 driving: label canon 운전/驾驶 on all 8; THEME_ORDER driving; Pack vehicles-driving → tag `driving`.
 *   Distinct from travel 여행/旅游 · transit 교통/交通.
 *   ThemeSm26a: labels+ORDER on all 8; speed drivingTagged=10 + themes → chip 활성.
 *   ThemeSm26b: cloze drivingTagged=10 + themes → chip 운전/驾驶 (with speed).
 *   ThemeSm26c: bingo/listen drivingTagged=10 + themes → chips 운전/驾驶 (with speed+cloze).
 *   ThemeSm26d: particle/dictation/tel/scramble drivingTagged=10 → chips 운전/驾驶 (all 8). Vehicles-driving sweep closed.
 * ThemeSm27 places: label canon 장소/场所 on all 8; THEME_ORDER places; Pack city-places → tag `places`.
 *   Distinct from travel 여행/旅游 · direction 방향/方向 · driving 운전/驾驶 · bingo beginner `place` (singular).
 *   ThemeSm27a: labels+ORDER on all 8; speed(+cloze sibling data) placesTagged=10 + themes → chip 활성; empty 6 games themes 미추가 (chip 숨김).
 *   ThemeSm27b/c: bingo/listen placesTagged=10 + themes → chips 장소/场所 (with speed+cloze).
 *   ThemeSm27d: particle/dictation/tel/scramble placesTagged=10 → chips 장소/场所 (all 8). City-places sweep closed.
 * ThemeSm28 pantry: label canon 재료/食材 on all 8; THEME_ORDER pantry; Pack pantry-ingredients → tag `pantry`.
 *   Distinct from kitchen 주방/厨房 · fruit 과일/水果 · restaurant 식당/餐饮.
 *   ThemeSm28a: labels+ORDER on all 8; speed+cloze+bingo+listen pantryTagged=10 + themes → chip 활성; empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm28b/c: bingo/listen pantryTagged=10 + themes → chips 재료/食材 (with speed+cloze).
 *   ThemeSm28d: particle/dictation/tel/scramble pantryTagged=10 → chips 재료/食材 (all 8). Pantry-ingredients sweep closed.
 * ThemeSm29 bathroom: label canon 욕실/浴室 on all 8; THEME_ORDER bathroom; Pack bathroom-hygiene → tag `bathroom`.
 *   Distinct from clinic 병원/医院 (health) · chores 집안일/家务.
 *   ThemeSm29a: labels+ORDER on all 8; speed(+cloze sibling data) bathroomTagged=10 + themes → chip 활성; empty 6 games themes 미추가 (chip 숨김).
 *   ThemeSm29b/c: bingo/listen bathroomTagged=10 + themes → chips 욕실/浴室 (with speed+cloze); empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm29d: particle/dictation/tel/scramble bathroomTagged=10 → chips 욕실/浴室 (all 8). Bathroom-hygiene sweep closed.
 * ThemeSm30 jobs: label canon 직업/职业 on all 8; THEME_ORDER jobs; Pack jobs-occupations → tag `jobs`.
 *   Distinct from workplace 직장/职场 · public-life pack (no chip) · clinic 의사 · media 기자 · driving 경찰 · music 가수.
 *   ThemeSm30a: labels+ORDER on all 8; speed+cloze+bingo+listen jobsTagged=10 + themes → chip 활성.
 *   ThemeSm30d: particle/dictation/tel/scramble jobsTagged=10 → chips 직업/职业 (all 8). Jobs-occupations sweep closed.
 * ThemeSm31 country: label canon 국가/国家 on all 8; THEME_ORDER country; Pack countries-nationality → tag `country`.
 *   Distinct from travel 여행/旅游.
 *   ThemeSm31a: labels+ORDER on all 8; speed+cloze+bingo+listen countryTagged=10 + themes → chip 활성; empty 4 games themes 미추가 (chip 숨김).
 *   ThemeSm31d: particle/dictation/tel/scramble countryTagged=10 → chips 국가/国家 (all 8). Countries-nationality sweep closed.
 * ThemeSm32 routine: label canon 일상/日常 on all 8; THEME_ORDER routine; Pack daily-routine → tag `routine`.
 *   Distinct from time 시간/时间.
 *   ThemeSm32a: labels+ORDER on all 8; speed+cloze+bingo+listen routineTagged=10 + themes → chip 활성; empty 4 games themes 미추가 (chip 숨김).
 *   ThemeSm32d: particle/dictation/tel/scramble routineTagged=10 → chips 일상/日常 (all 8). Daily-routine sweep closed.
 * ThemeSm33 size: label canon 크기/大小 on all 8; THEME_ORDER size; Pack size-quantity → tag `size`.
 *   Distinct from clothes 옷/服装 (사이즈·색깔) · body · direction 길 · furniture.
 *   ThemeSm33a: labels+ORDER on all 8; speed(+cloze sibling data) sizeTagged=10 + themes → chip 활성; empty 6 games themes 미추가 (chip 숨김).
 *   ThemeSm33b/c: bingo/listen sizeTagged=10 + themes → chips 크기/大小 (with speed+cloze); empty 4 (particle/dictation/tel/scramble) themes 미추가 (chip 숨김).
 *   ThemeSm33d: particle/dictation/tel/scramble sizeTagged=10 → chips 크기/大小 (all 8). Size-quantity sweep closed.
 * ThemeSm34 senses: label canon 감각/感觉 on all 8; THEME_ORDER senses; Pack temperature-senses → tag `senses`.
 *   Distinct from weather 날씨/天气 · emotion 감정/情绪.
 *   ThemeSm34a: labels+ORDER on all 8; speed(+cloze sibling data) sensesTagged=10 + themes → chip 활성; empty 6 games themes 미추가 (chip 숨김).
 * ThemeSm35 color: label canon 색깔/颜色 on all 8; THEME_ORDER color; Pack colors-shapes → tag `color`.
 *   Distinct from clothes 옷/服装.
 * ThemeSm36 accessories: label canon 소지품/随身 on all 8; THEME_ORDER accessories; Pack accessories-belongings → tag `accessories`.
 *   Distinct from clothes 옷/服装.
 *   ThemeSm36a: labels+ORDER on all 8; speed+cloze+bingo+listen accessoriesTagged=10 + themes → chip 활성.
 *   ThemeSm36b: bingo/listen accessoriesTagged=10 + themes → chips 소지품/随身 (with speed+cloze).
 *   ThemeSm36d: particle/dictation/tel/scramble accessoriesTagged=10/10/8/8 + themes → chips 소지품/随身 (전 8). Accessories-belongings sweep closed.
 * ThemeSm37 electric: label canon 전기/电器 on all 8; THEME_ORDER electric; Pack electricity-appliances → tag `electric`.
 *   Distinct from chores 집안일/家务 · media 미디어/媒体 · digital 디지털/数码.
 *   ThemeSm37a: labels+ORDER on all 8; speed+cloze electricTagged=10 + themes → chip 활성; empty 6 themes 미추가.
 *   ThemeSm37b: bingo/listen(+37d residual particle/dictation/tel/scramble) electricTagged=10/10/10/10/8/8 + themes → chips 전기/电器 (전 8). Electricity-appliances sweep closed.

 * Weather/digital/family/hobby/emotion/sports/nature/restaurant: label canon on all 8 games; chips active where bank has tags
 * (all 8 games have emotion/sports/nature tags after ThemeSm8d/9d/10d). Restaurant: ThemeSm11 labels+ORDER;
 * ThemeSm11b: speed+cloze+bingo+listen restaurantTagged=10 → chips 식당/餐饮.
 * ThemeSm11c: particle/dictation/tel/scramble restaurantTagged=10 → chips 식당/餐饮 (all 8 games).
 * ThemeSm12 clothes: label canon 옷/服装 on all 8; THEME_ORDER clothes; Distinct from beginner shopping 쇼핑/购物.
 * ThemeSm12b: bingo/listen clothesTagged=10 + themes → chips 옷/服装 (with speed+cloze).
 * ThemeSm12c: particle/dictation/tel/scramble clothesTagged=10 → chips 옷/服装 (all 8 games).
 * ThemeSm13 music: label canon 음악/音乐 on all 8; THEME_ORDER music; Distinct from hobby 취미/爱好.
 *   Pack id music-arts → theme tag `music`. ThemeSm13: speed+cloze musicTagged=10 → chip 활성.
 * ThemeSm13b: bingo/listen musicTagged=10 + themes → chips 음악/音乐 (with speed+cloze).
 * ThemeSm13c: particle/dictation/tel/scramble musicTagged=10 → chips 음악/音乐 (all 8 games).
 * ThemeSm14 media: label canon 미디어/媒体 on all 8; THEME_ORDER media; Distinct from digital 디지털/数码.
 *   Pack id media-news → theme tag `media`. ThemeSm14: speed mediaTagged=10 → chip 활성.
 * ThemeSm14b: cloze mediaTagged=10 + themes → chips 미디어/媒体 (with speed).
 * ThemeSm14c: bingo/listen mediaTagged=10 + themes → chips 미디어/媒体 (with speed+cloze).
 * ThemeSm14d: particle/dictation/tel/scramble mediaTagged=10 → chips 미디어/媒体 (all 8 games).
 * Run: node scripts/_smoke_games_theme_filter.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const GAMES = [
  {
    id: "speed-quiz",
    bank: "hub/app/data/games/speed-quiz-beginner.json",
    js: "hub/app/games/speed-quiz/speed.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "senses", "accessories", "electric", "housing", "banking"],
  },
  {
    id: "cloze-race",
    bank: "hub/app/data/games/cloze-beginner.json",
    js: "hub/app/games/cloze-race/cloze.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "senses", "accessories", "electric", "housing", "banking"],
  },
  {
    id: "particle-snap",
    bank: "hub/app/data/games/particle-beginner.json",
    js: "hub/app/games/particle-snap/particle.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "housing", "banking"],
  },
  {
    id: "dictation",
    bank: "hub/app/data/games/dictation-beginner.json",
    js: "hub/app/games/dictation/dictation.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "banking"],
  },
  {
    id: "listen-match",
    bank: "hub/app/data/games/listen-match-beginner.json",
    js: "hub/app/games/listen-match/match.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "housing", "banking"],
  },
  {
    id: "telephone",
    bank: "hub/app/data/games/telephone-beginner.json",
    js: "hub/app/games/telephone/telephone.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "banking"],
  },
  {
    id: "word-scramble",
    bank: "hub/app/data/games/word-scramble-beginner.json",
    js: "hub/app/games/word-scramble/scramble.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "banking"],
  },
  {
    id: "bingo-board",
    bank: "hub/app/data/games/bingo-beginner.json",
    js: "hub/app/games/bingo-board/bingo.js",
    focus: ["clinic", "workplace", "school", "travel", "weather", "digital", "family", "hobby", "emotion", "sports", "nature", "restaurant", "clothes", "music", "media", "celebration", "time", "chores", "body", "direction", "furniture", "fruit", "kitchen", "stationery", "mail", "pets", "driving", "places", "pantry", "bathroom", "jobs", "country", "routine", "size", "accessories", "electric", "housing", "banking"],
    minWords: 8, // 3x3 needs 8 + free
  },
];

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

function extractThemeOrder(js) {
  const m = js.match(/THEME_ORDER\s*=\s*\[([\s\S]*?)\];/);
  assert(m, "THEME_ORDER missing");
  const out = [];
  const re = /"([^"]+)"/g;
  let hit;
  while ((hit = re.exec(m[1]))) out.push(hit[1]);
  return out;
}

function labelMap(js, localeBlock) {
  // Pull theme_* from STR.en / .ko / .zh roughly via sequential locale objects
  const maps = { en: {}, ko: {}, zh: {} };
  const blocks = {
    en: js.match(/en:\s*\{([\s\S]*?)\},\s*ko:/),
    ko: js.match(/ko:\s*\{([\s\S]*?)\},\s*zh:/),
    zh: js.match(/zh:\s*\{([\s\S]*?)\},\s*\};/),
  };
  for (const loc of ["en", "ko", "zh"]) {
    const body = blocks[loc] && blocks[loc][1];
    assert(body, `${localeBlock || "STR"} missing ${loc}`);
    const re = /theme_([a-z]+):\s*"([^"]*)"/g;
    let hit;
    while ((hit = re.exec(body))) maps[loc][hit[1]] = hit[2];
  }
  return maps;
}

function collectThemes(themesMeta, items, order, minWords) {
  const seen = new Set();
  const out = [];
  order.forEach((t) => {
    if (themesMeta.includes(t) || items.some((it) => (it.tags || []).includes(t))) {
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    }
  });
  themesMeta.forEach((t) => {
    if (!seen.has(t) && items.some((it) => (it.tags || []).includes(t))) {
      seen.add(t);
      out.push(t);
    }
  });
  if (minWords) {
    return out.filter(
      (t) => items.filter((it) => (it.tags || []).includes(t)).length >= minWords
    );
  }
  return out;
}

const CLINIC_KO_CANON = "병원";
const CLINIC_ZH_CANON = "医院";
const SCHOOL_KO_CANON = "학교";
const SCHOOL_ZH_CANON = "学校";
const TRAVEL_KO_CANON = "여행";
const TRAVEL_ZH_CANON = "旅游";
const WEATHER_KO_CANON = "날씨";
const WEATHER_ZH_CANON = "天气";
const DIGITAL_KO_CANON = "디지털";
const DIGITAL_ZH_CANON = "数码";
const FAMILY_KO_CANON = "가족";
const FAMILY_ZH_CANON = "家人";
const HOBBY_KO_CANON = "취미";
const HOBBY_ZH_CANON = "爱好";
const EMOTION_KO_CANON = "감정";
const EMOTION_ZH_CANON = "情绪";
const SPORTS_KO_CANON = "스포츠";
const SPORTS_ZH_CANON = "体育";
const NATURE_KO_CANON = "자연";
const NATURE_ZH_CANON = "自然";
const RESTAURANT_KO_CANON = "식당";
const RESTAURANT_ZH_CANON = "餐饮";
const CLOTHES_KO_CANON = "옷";
const CLOTHES_ZH_CANON = "服装";
const SHOPPING_KO_CANON = "쇼핑";
const SHOPPING_ZH_CANON = "购物";
const MUSIC_KO_CANON = "음악";
const MUSIC_ZH_CANON = "音乐";
const MEDIA_KO_CANON = "미디어";
const MEDIA_ZH_CANON = "媒体";
const CELEBRATION_KO_CANON = "축하";
const CELEBRATION_ZH_CANON = "庆祝";
const TIME_KO_CANON = "시간";
const TIME_ZH_CANON = "时间";
const CHORES_KO_CANON = "집안일";
const CHORES_ZH_CANON = "家务";
const BODY_KO_CANON = "신체";
const BODY_ZH_CANON = "身体";
const DIRECTION_KO_CANON = "방향";
const DIRECTION_ZH_CANON = "方向";
const FURNITURE_KO_CANON = "가구";
const FURNITURE_ZH_CANON = "家具";
const FRUIT_KO_CANON = "과일";
const FRUIT_ZH_CANON = "水果";
const KITCHEN_KO_CANON = "주방";
const KITCHEN_ZH_CANON = "厨房";
const STATIONERY_KO_CANON = "문구";
const STATIONERY_ZH_CANON = "文具";
const MAIL_KO_CANON = "우편";
const MAIL_ZH_CANON = "邮寄";
const PETS_KO_CANON = "동물";
const PETS_ZH_CANON = "动物";
const DRIVING_KO_CANON = "운전";
const DRIVING_ZH_CANON = "驾驶";
const PLACES_KO_CANON = "장소";
const PLACES_ZH_CANON = "场所";
const PANTRY_KO_CANON = "재료";
const PANTRY_ZH_CANON = "食材";
const BATHROOM_KO_CANON = "욕실";
const BATHROOM_ZH_CANON = "浴室";
const JOBS_KO_CANON = "직업";
const JOBS_ZH_CANON = "职业";
const COUNTRY_KO_CANON = "국가";
const COUNTRY_ZH_CANON = "国家";
const ROUTINE_KO_CANON = "일상";
const ROUTINE_ZH_CANON = "日常";
const SIZE_KO_CANON = "크기";
const SIZE_ZH_CANON = "大小";
const SENSES_KO_CANON = "감각";
const SENSES_ZH_CANON = "感觉";
const ACCESSORIES_KO_CANON = "소지품";
const ACCESSORIES_ZH_CANON = "随身";
const ELECTRIC_KO_CANON = "전기";
const ELECTRIC_ZH_CANON = "电器";

let summary = [];

for (const g of GAMES) {
  const bank = JSON.parse(fs.readFileSync(path.join(root, g.bank), "utf8"));
  const js = fs.readFileSync(path.join(root, g.js), "utf8");
  const items = bank.items || [];
  const themesMeta = Array.isArray(bank.themes) ? bank.themes : [];
  const order = extractThemeOrder(js);
  const labels = labelMap(js, g.id);

  assert(js.includes("THEME_KEY"), `${g.id}: THEME_KEY`);
  assert(js.includes("themeEmpty"), `${g.id}: themeEmpty`);
  assert(/localStorage\.setItem\(\s*THEME_KEY/.test(js), `${g.id}: localStorage set theme`);
  assert(
    /localStorage\.getItem\(\s*THEME_KEY/.test(js),
    `${g.id}: localStorage get theme`
  );
  assert(
    /themeList\.includes\(saved/.test(js),
    `${g.id}: saved-theme fallback`
  );

  const chips = collectThemes(themesMeta, items, order, g.minWords);

  for (const tag of g.focus) {
    const n = items.filter((it) => (it.tags || []).includes(tag)).length;
    assert(n > 0, `${g.id}: focus tag ${tag} has 0 items`);
    assert(chips.includes(tag), `${g.id}: chip missing for ${tag} (order/meta)`);
    assert(labels.en[tag], `${g.id}: EN label missing theme_${tag}`);
    assert(labels.ko[tag], `${g.id}: KO label missing theme_${tag}`);
    assert(labels.zh[tag], `${g.id}: ZH label missing theme_${tag}`);
    assert(labels.en[tag] !== tag, `${g.id}: EN label raw id for ${tag}`);
    if (g.minWords) {
      assert(n >= g.minWords, `${g.id}: ${tag} has ${n} words, need >=${g.minWords} for board`);
    }
  }

  // themes meta with zero items → would toast empty if selected; ban
  for (const t of themesMeta) {
    const n = items.filter((it) => (it.tags || []).includes(t)).length;
    assert(n > 0, `${g.id}: themes meta '${t}' has 0 items (empty filter)`);
  }

  // clinic / school / travel / weather label canon
  if (labels.ko.clinic) {
    assert(
      labels.ko.clinic === CLINIC_KO_CANON,
      `${g.id}: KO clinic label '${labels.ko.clinic}' ≠ '${CLINIC_KO_CANON}'`
    );
  }
  if (labels.zh.clinic) {
    assert(
      labels.zh.clinic === CLINIC_ZH_CANON,
      `${g.id}: ZH clinic label '${labels.zh.clinic}' ≠ '${CLINIC_ZH_CANON}'`
    );
  }
  if (labels.ko.school) {
    assert(
      labels.ko.school === SCHOOL_KO_CANON,
      `${g.id}: KO school label '${labels.ko.school}' ≠ '${SCHOOL_KO_CANON}'`
    );
  }
  if (labels.zh.school) {
    assert(
      labels.zh.school === SCHOOL_ZH_CANON,
      `${g.id}: ZH school label '${labels.zh.school}' ≠ '${SCHOOL_ZH_CANON}'`
    );
  }
  if (labels.ko.travel) {
    assert(
      labels.ko.travel === TRAVEL_KO_CANON,
      `${g.id}: KO travel label '${labels.ko.travel}' ≠ '${TRAVEL_KO_CANON}'`
    );
  }
  if (labels.zh.travel) {
    assert(
      labels.zh.travel === TRAVEL_ZH_CANON,
      `${g.id}: ZH travel label '${labels.zh.travel}' ≠ '${TRAVEL_ZH_CANON}'`
    );
  }
  if (labels.ko.weather) {
    assert(
      labels.ko.weather === WEATHER_KO_CANON,
      `${g.id}: KO weather label '${labels.ko.weather}' ≠ '${WEATHER_KO_CANON}'`
    );
  }
  if (labels.zh.weather) {
    assert(
      labels.zh.weather === WEATHER_ZH_CANON,
      `${g.id}: ZH weather label '${labels.zh.weather}' ≠ '${WEATHER_ZH_CANON}'`
    );
  }
  if (labels.ko.digital) {
    assert(
      labels.ko.digital === DIGITAL_KO_CANON,
      `${g.id}: KO digital label '${labels.ko.digital}' ≠ '${DIGITAL_KO_CANON}'`
    );
  }
  if (labels.zh.digital) {
    assert(
      labels.zh.digital === DIGITAL_ZH_CANON,
      `${g.id}: ZH digital label '${labels.zh.digital}' ≠ '${DIGITAL_ZH_CANON}'`
    );
  }
  if (labels.ko.family) {
    assert(
      labels.ko.family === FAMILY_KO_CANON,
      `${g.id}: KO family label '${labels.ko.family}' ≠ '${FAMILY_KO_CANON}'`
    );
  }
  if (labels.zh.family) {
    assert(
      labels.zh.family === FAMILY_ZH_CANON,
      `${g.id}: ZH family label '${labels.zh.family}' ≠ '${FAMILY_ZH_CANON}'`
    );
  }
  if (labels.ko.hobby) {
    assert(
      labels.ko.hobby === HOBBY_KO_CANON,
      `${g.id}: KO hobby label '${labels.ko.hobby}' ≠ '${HOBBY_KO_CANON}'`
    );
  }
  if (labels.zh.hobby) {
    assert(
      labels.zh.hobby === HOBBY_ZH_CANON,
      `${g.id}: ZH hobby label '${labels.zh.hobby}' ≠ '${HOBBY_ZH_CANON}'`
    );
  }
  if (labels.ko.emotion) {
    assert(
      labels.ko.emotion === EMOTION_KO_CANON,
      `${g.id}: KO emotion label '${labels.ko.emotion}' ≠ '${EMOTION_KO_CANON}'`
    );
  }
  if (labels.zh.emotion) {
    assert(
      labels.zh.emotion === EMOTION_ZH_CANON,
      `${g.id}: ZH emotion label '${labels.zh.emotion}' ≠ '${EMOTION_ZH_CANON}'`
    );
  }
  if (labels.ko.sports) {
    assert(
      labels.ko.sports === SPORTS_KO_CANON,
      `${g.id}: KO sports label '${labels.ko.sports}' ≠ '${SPORTS_KO_CANON}'`
    );
  }
  if (labels.zh.sports) {
    assert(
      labels.zh.sports === SPORTS_ZH_CANON,
      `${g.id}: ZH sports label '${labels.zh.sports}' ≠ '${SPORTS_ZH_CANON}'`
    );
  }
  if (labels.ko.nature) {
    assert(
      labels.ko.nature === NATURE_KO_CANON,
      `${g.id}: KO nature label '${labels.ko.nature}' ≠ '${NATURE_KO_CANON}'`
    );
  }
  if (labels.zh.nature) {
    assert(
      labels.zh.nature === NATURE_ZH_CANON,
      `${g.id}: ZH nature label '${labels.zh.nature}' ≠ '${NATURE_ZH_CANON}'`
    );
  }
  if (labels.ko.restaurant) {
    assert(
      labels.ko.restaurant === RESTAURANT_KO_CANON,
      `${g.id}: KO restaurant label '${labels.ko.restaurant}' ≠ '${RESTAURANT_KO_CANON}'`
    );
  }
  if (labels.zh.restaurant) {
    assert(
      labels.zh.restaurant === RESTAURANT_ZH_CANON,
      `${g.id}: ZH restaurant label '${labels.zh.restaurant}' ≠ '${RESTAURANT_ZH_CANON}'`
    );
  }
  // every game must prep weather/digital/family/hobby/emotion/sports/nature label canon + THEME_ORDER (chips only if bank has tags)
  assert(labels.en.weather === "Weather", `${g.id}: EN weather label must be Weather`);
  assert(labels.ko.weather === WEATHER_KO_CANON, `${g.id}: KO weather chip label`);
  assert(labels.zh.weather === WEATHER_ZH_CANON, `${g.id}: ZH weather chip label`);
  assert(order.includes("weather"), `${g.id}: THEME_ORDER missing weather`);
  assert(labels.en.digital === "Digital", `${g.id}: EN digital label must be Digital`);
  assert(labels.ko.digital === DIGITAL_KO_CANON, `${g.id}: KO digital chip label`);
  assert(labels.zh.digital === DIGITAL_ZH_CANON, `${g.id}: ZH digital chip label`);
  assert(order.includes("digital"), `${g.id}: THEME_ORDER missing digital`);
  assert(labels.en.family === "Family", `${g.id}: EN family label must be Family`);
  assert(labels.ko.family === FAMILY_KO_CANON, `${g.id}: KO family chip label`);
  assert(labels.zh.family === FAMILY_ZH_CANON, `${g.id}: ZH family chip label`);
  assert(order.includes("family"), `${g.id}: THEME_ORDER missing family`);
  assert(labels.en.hobby === "Hobby", `${g.id}: EN hobby label must be Hobby`);
  assert(labels.ko.hobby === HOBBY_KO_CANON, `${g.id}: KO hobby chip label`);
  assert(labels.zh.hobby === HOBBY_ZH_CANON, `${g.id}: ZH hobby chip label`);
  assert(order.includes("hobby"), `${g.id}: THEME_ORDER missing hobby`);
  assert(labels.en.emotion === "Emotion", `${g.id}: EN emotion label must be Emotion`);
  assert(labels.ko.emotion === EMOTION_KO_CANON, `${g.id}: KO emotion chip label`);
  assert(labels.zh.emotion === EMOTION_ZH_CANON, `${g.id}: ZH emotion chip label`);
  assert(order.includes("emotion"), `${g.id}: THEME_ORDER missing emotion`);
  assert(labels.en.sports === "Sports", `${g.id}: EN sports label must be Sports`);
  assert(labels.ko.sports === SPORTS_KO_CANON, `${g.id}: KO sports chip label`);
  assert(labels.zh.sports === SPORTS_ZH_CANON, `${g.id}: ZH sports chip label`);
  assert(order.includes("sports"), `${g.id}: THEME_ORDER missing sports`);
  assert(labels.en.nature === "Nature", `${g.id}: EN nature label must be Nature`);
  assert(labels.ko.nature === NATURE_KO_CANON, `${g.id}: KO nature chip label`);
  assert(labels.zh.nature === NATURE_ZH_CANON, `${g.id}: ZH nature chip label`);
  assert(order.includes("nature"), `${g.id}: THEME_ORDER missing nature`);
  assert(labels.en.restaurant === "Restaurant", `${g.id}: EN restaurant label must be Restaurant`);
  assert(labels.ko.restaurant === RESTAURANT_KO_CANON, `${g.id}: KO restaurant chip label`);
  assert(labels.zh.restaurant === RESTAURANT_ZH_CANON, `${g.id}: ZH restaurant chip label`);
  assert(order.includes("restaurant"), `${g.id}: THEME_ORDER missing restaurant`);
  assert(labels.en.clothes === "Clothes", `${g.id}: EN clothes label must be Clothes`);
  assert(labels.ko.clothes === CLOTHES_KO_CANON, `${g.id}: KO clothes chip label`);
  assert(labels.zh.clothes === CLOTHES_ZH_CANON, `${g.id}: ZH clothes chip label`);
  assert(order.includes("clothes"), `${g.id}: THEME_ORDER missing clothes`);
  // Distinct from beginner shopping (쇼핑/购物) — clothes is 옷/服装
  if (labels.ko.shopping) {
    assert(labels.ko.shopping === SHOPPING_KO_CANON, `${g.id}: KO shopping stays '${SHOPPING_KO_CANON}'`);
    assert(labels.ko.shopping !== CLOTHES_KO_CANON, `${g.id}: clothes KO must differ from shopping`);
  }
  if (labels.zh.shopping) {
    assert(labels.zh.shopping === SHOPPING_ZH_CANON, `${g.id}: ZH shopping stays '${SHOPPING_ZH_CANON}'`);
    assert(labels.zh.shopping !== CLOTHES_ZH_CANON, `${g.id}: clothes ZH must differ from shopping`);
  }
  assert(labels.en.music === "Music", `${g.id}: EN music label must be Music`);
  assert(labels.ko.music === MUSIC_KO_CANON, `${g.id}: KO music chip label`);
  assert(labels.zh.music === MUSIC_ZH_CANON, `${g.id}: ZH music chip label`);
  assert(order.includes("music"), `${g.id}: THEME_ORDER missing music`);
  // Distinct from hobby (취미/爱好) — music is 음악/音乐
  assert(labels.ko.music !== HOBBY_KO_CANON, `${g.id}: music KO must differ from hobby`);
  assert(labels.zh.music !== HOBBY_ZH_CANON, `${g.id}: music ZH must differ from hobby`);
  assert(labels.ko.hobby === HOBBY_KO_CANON, `${g.id}: hobby KO stays '${HOBBY_KO_CANON}'`);
  assert(labels.zh.hobby === HOBBY_ZH_CANON, `${g.id}: hobby ZH stays '${HOBBY_ZH_CANON}'`);
  assert(labels.en.media === "Media", `${g.id}: EN media label must be Media`);
  assert(labels.ko.media === MEDIA_KO_CANON, `${g.id}: KO media chip label`);
  assert(labels.zh.media === MEDIA_ZH_CANON, `${g.id}: ZH media chip label`);
  assert(order.includes("media"), `${g.id}: THEME_ORDER missing media`);
  // Distinct from digital (디지털/数码) — media is 미디어/媒体
  assert(labels.ko.media !== DIGITAL_KO_CANON, `${g.id}: media KO must differ from digital`);
  assert(labels.zh.media !== DIGITAL_ZH_CANON, `${g.id}: media ZH must differ from digital`);
  assert(labels.ko.digital === DIGITAL_KO_CANON, `${g.id}: digital KO stays '${DIGITAL_KO_CANON}'`);
  assert(labels.zh.digital === DIGITAL_ZH_CANON, `${g.id}: digital ZH stays '${DIGITAL_ZH_CANON}'`);
  // ThemeSm15 celebration: 축하/庆祝 on all 8; THEME_ORDER; chips only where bank has tags
  assert(labels.en.celebration === "Celebration", `${g.id}: EN celebration label must be Celebration`);
  assert(labels.ko.celebration === CELEBRATION_KO_CANON, `${g.id}: KO celebration chip label`);
  assert(labels.zh.celebration === CELEBRATION_ZH_CANON, `${g.id}: ZH celebration chip label`);
  assert(order.includes("celebration"), `${g.id}: THEME_ORDER missing celebration`);
  assert(labels.ko.celebration !== HOBBY_KO_CANON, `${g.id}: celebration KO must differ from hobby`);
  assert(labels.zh.celebration !== HOBBY_ZH_CANON, `${g.id}: celebration ZH must differ from hobby`);
  // ThemeSm16 time: 시간/时间 on all 8; THEME_ORDER; chips where bank has tags
  assert(labels.en.time === "Time", `${g.id}: EN time label must be Time`);
  assert(labels.ko.time === TIME_KO_CANON, `${g.id}: KO time chip label`);
  assert(labels.zh.time === TIME_ZH_CANON, `${g.id}: ZH time chip label`);
  assert(order.includes("time"), `${g.id}: THEME_ORDER missing time`);
  // ThemeSm17 chores: 집안일/家务 on all 8; THEME_ORDER; chips where bank has tags (ThemeSm17d: all 8)
  assert(labels.en.chores === "Chores", `${g.id}: EN chores label must be Chores`);
  assert(labels.ko.chores === CHORES_KO_CANON, `${g.id}: KO chores chip label`);
  assert(labels.zh.chores === CHORES_ZH_CANON, `${g.id}: ZH chores chip label`);
  assert(order.includes("chores"), `${g.id}: THEME_ORDER missing chores`);
  assert(labels.ko.chores !== labels.ko.housing, `${g.id}: chores KO must differ from housing`);
  assert(labels.zh.chores !== labels.zh.housing, `${g.id}: chores ZH must differ from housing`);
  // ThemeSm18 body: 신체/身体 on all 8; THEME_ORDER; chips where bank has tags (ThemeSm18d: all 8)
  assert(labels.en.body === "Body", `${g.id}: EN body label must be Body`);
  assert(labels.ko.body === BODY_KO_CANON, `${g.id}: KO body chip label`);
  assert(labels.zh.body === BODY_ZH_CANON, `${g.id}: ZH body chip label`);
  assert(order.includes("body"), `${g.id}: THEME_ORDER missing body`);
  assert(labels.ko.body !== labels.ko.clinic, `${g.id}: body KO must differ from clinic`);
  assert(labels.zh.body !== labels.zh.clinic, `${g.id}: body ZH must differ from clinic`);
  assert(labels.ko.body !== labels.ko.sports, `${g.id}: body KO must differ from sports`);
  assert(labels.zh.body !== labels.zh.sports, `${g.id}: body ZH must differ from sports`);
  // ThemeSm19 / ThemeSm19a direction: 방향/方向 on all 8; THEME_ORDER; chips where bank has tags
  assert(labels.en.direction === "Direction", `${g.id}: EN direction label must be Direction`);
  assert(labels.ko.direction === DIRECTION_KO_CANON, `${g.id}: KO direction chip label`);
  assert(labels.zh.direction === DIRECTION_ZH_CANON, `${g.id}: ZH direction chip label`);
  assert(order.includes("direction"), `${g.id}: THEME_ORDER missing direction`);
  assert(!order.includes("directions"), `${g.id}: THEME_ORDER must not include plural directions`);
  assert(!labels.en.directions && !labels.ko.directions && !labels.zh.directions, `${g.id}: no theme_directions labels (use direction)`);
  assert(labels.ko.direction !== labels.ko.travel, `${g.id}: direction KO must differ from travel`);
  assert(labels.zh.direction !== labels.zh.travel, `${g.id}: direction ZH must differ from travel`);
  assert(labels.ko.direction !== labels.ko.transit, `${g.id}: direction KO must differ from transit`);
  assert(labels.zh.direction !== labels.zh.transit, `${g.id}: direction ZH must differ from transit`);
  // ThemeSm20 / ThemeSm20a furniture: 가구/家具 on all 8; THEME_ORDER; chips where bank has tags (speed+cloze+bingo+listen)
  assert(labels.en.furniture === "Furniture", `${g.id}: EN furniture label must be Furniture`);
  assert(labels.ko.furniture === FURNITURE_KO_CANON, `${g.id}: KO furniture chip label`);
  assert(labels.zh.furniture === FURNITURE_ZH_CANON, `${g.id}: ZH furniture chip label`);
  assert(order.includes("furniture"), `${g.id}: THEME_ORDER missing furniture`);
  assert(labels.ko.furniture !== labels.ko.housing, `${g.id}: furniture KO must differ from housing`);
  assert(labels.zh.furniture !== labels.zh.housing, `${g.id}: furniture ZH must differ from housing`);
  assert(labels.ko.furniture !== labels.ko.chores, `${g.id}: furniture KO must differ from chores`);
  assert(labels.zh.furniture !== labels.zh.chores, `${g.id}: furniture ZH must differ from chores`);
  // ThemeSm21 / ThemeSm21a fruit: 과일/水果 on all 8; THEME_ORDER; chips where bank has tags (speed+cloze+bingo+listen)
  assert(labels.en.fruit === "Fruit", `${g.id}: EN fruit label must be Fruit`);
  assert(labels.ko.fruit === FRUIT_KO_CANON, `${g.id}: KO fruit chip label`);
  assert(labels.zh.fruit === FRUIT_ZH_CANON, `${g.id}: ZH fruit chip label`);
  assert(order.includes("fruit"), `${g.id}: THEME_ORDER missing fruit`);
  assert(labels.ko.fruit !== labels.ko.restaurant, `${g.id}: fruit KO must differ from restaurant`);
  assert(labels.zh.fruit !== labels.zh.restaurant, `${g.id}: fruit ZH must differ from restaurant`);
  if (labels.ko.snack) {
    assert(labels.ko.fruit !== labels.ko.snack, `${g.id}: fruit KO must differ from snack`);
  }
  if (labels.zh.snack) {
    assert(labels.zh.fruit !== labels.zh.snack, `${g.id}: fruit ZH must differ from snack`);
  }
  if (labels.ko.food) {
    assert(labels.ko.fruit !== labels.ko.food, `${g.id}: fruit KO must differ from food`);
  }
  if (labels.zh.food) {
    assert(labels.zh.fruit !== labels.zh.food, `${g.id}: fruit ZH must differ from food`);
  }
  // ThemeSm22 kitchen: 주방/厨房 on all 8; THEME_ORDER; chips where bank has tags (all 8 after particle data)
  assert(labels.en.kitchen === "Kitchen", `${g.id}: EN kitchen label must be Kitchen`);
  assert(labels.ko.kitchen === KITCHEN_KO_CANON, `${g.id}: KO kitchen chip label`);
  assert(labels.zh.kitchen === KITCHEN_ZH_CANON, `${g.id}: ZH kitchen chip label`);
  assert(order.includes("kitchen"), `${g.id}: THEME_ORDER missing kitchen`);
  assert(labels.ko.kitchen !== labels.ko.restaurant, `${g.id}: kitchen KO must differ from restaurant`);
  assert(labels.zh.kitchen !== labels.zh.restaurant, `${g.id}: kitchen ZH must differ from restaurant`);
  assert(labels.ko.kitchen !== labels.ko.furniture, `${g.id}: kitchen KO must differ from furniture`);
  assert(labels.zh.kitchen !== labels.zh.furniture, `${g.id}: kitchen ZH must differ from furniture`);
  assert(labels.ko.kitchen !== labels.ko.fruit, `${g.id}: kitchen KO must differ from fruit`);
  assert(labels.zh.kitchen !== labels.zh.fruit, `${g.id}: kitchen ZH must differ from fruit`);
  // ThemeSm23 / ThemeSm23a–d stationery: 문구/文具 on all 8; THEME_ORDER; chips where bank has tags (all 8 · sweep closed)
  assert(labels.en.stationery === "Stationery", `${g.id}: EN stationery label must be Stationery`);
  assert(labels.ko.stationery === STATIONERY_KO_CANON, `${g.id}: KO stationery chip label`);
  assert(labels.zh.stationery === STATIONERY_ZH_CANON, `${g.id}: ZH stationery chip label`);
  assert(order.includes("stationery"), `${g.id}: THEME_ORDER missing stationery`);
  assert(labels.ko.stationery !== labels.ko.school, `${g.id}: stationery KO must differ from school`);
  assert(labels.zh.stationery !== labels.zh.school, `${g.id}: stationery ZH must differ from school`);
  assert(labels.ko.stationery !== labels.ko.workplace, `${g.id}: stationery KO must differ from workplace`);
  assert(labels.zh.stationery !== labels.zh.workplace, `${g.id}: stationery ZH must differ from workplace`);
  // ThemeSm24 / ThemeSm24a / ThemeSm24d mail: 우편/邮寄 on all 8; THEME_ORDER; chips where mailTagged>0 (all 8)
  assert(labels.en.mail === "Mail", `${g.id}: EN mail label must be Mail`);
  assert(labels.ko.mail === MAIL_KO_CANON, `${g.id}: KO mail chip label`);
  assert(labels.zh.mail === MAIL_ZH_CANON, `${g.id}: ZH mail chip label`);
  assert(order.includes("mail"), `${g.id}: THEME_ORDER missing mail`);
  assert(labels.ko.mail !== labels.ko.housing, `${g.id}: mail KO must differ from housing`);
  assert(labels.zh.mail !== labels.zh.housing, `${g.id}: mail ZH must differ from housing`);
  assert(labels.ko.mail !== labels.ko.digital, `${g.id}: mail KO must differ from digital`);
  assert(labels.zh.mail !== labels.zh.digital, `${g.id}: mail ZH must differ from digital`);
  assert(labels.ko.mail !== labels.ko.stationery, `${g.id}: mail KO must differ from stationery`);
  assert(labels.zh.mail !== labels.zh.stationery, `${g.id}: mail ZH must differ from stationery`);
  // ThemeSm25 / ThemeSm25a–d pets: 동물/动物 on all 8; THEME_ORDER; chips where petsTagged>0 (all 8 · ThemeSm25d)
  assert(labels.en.pets === "Pets", `${g.id}: EN pets label must be Pets`);
  assert(labels.ko.pets === PETS_KO_CANON, `${g.id}: KO pets chip label`);
  assert(labels.zh.pets === PETS_ZH_CANON, `${g.id}: ZH pets chip label`);
  assert(order.includes("pets"), `${g.id}: THEME_ORDER missing pets`);
  assert(labels.ko.pets !== labels.ko.nature, `${g.id}: pets KO must differ from nature`);
  assert(labels.zh.pets !== labels.zh.nature, `${g.id}: pets ZH must differ from nature`);
  // ThemeSm26 / ThemeSm26a–d driving: 운전/驾驶 on all 8; THEME_ORDER; chips where drivingTagged>0 (all 8 · ThemeSm26d)
  assert(labels.en.driving === "Driving", `${g.id}: EN driving label must be Driving`);
  assert(labels.ko.driving === DRIVING_KO_CANON, `${g.id}: KO driving chip label`);
  assert(labels.zh.driving === DRIVING_ZH_CANON, `${g.id}: ZH driving chip label`);
  assert(order.includes("driving"), `${g.id}: THEME_ORDER missing driving`);
  assert(labels.ko.driving !== labels.ko.travel, `${g.id}: driving KO must differ from travel`);
  assert(labels.zh.driving !== labels.zh.travel, `${g.id}: driving ZH must differ from travel`);
  assert(labels.ko.driving !== labels.ko.transit, `${g.id}: driving KO must differ from transit`);
  assert(labels.zh.driving !== labels.zh.transit, `${g.id}: driving ZH must differ from transit`);
  // ThemeSm27 / ThemeSm27a–d places: 장소/场所 on all 8; THEME_ORDER; chips where placesTagged>0 (all 8 · ThemeSm27d)
  assert(labels.en.places === "Places", `${g.id}: EN places label must be Places`);
  assert(labels.ko.places === PLACES_KO_CANON, `${g.id}: KO places chip label`);
  assert(labels.zh.places === PLACES_ZH_CANON, `${g.id}: ZH places chip label`);
  assert(order.includes("places"), `${g.id}: THEME_ORDER missing places`);
  assert(labels.ko.places !== labels.ko.travel, `${g.id}: places KO must differ from travel`);
  assert(labels.zh.places !== labels.zh.travel, `${g.id}: places ZH must differ from travel`);
  assert(labels.ko.places !== labels.ko.direction, `${g.id}: places KO must differ from direction`);
  assert(labels.zh.places !== labels.zh.direction, `${g.id}: places ZH must differ from direction`);
  assert(labels.ko.places !== labels.ko.driving, `${g.id}: places KO must differ from driving`);
  assert(labels.zh.places !== labels.zh.driving, `${g.id}: places ZH must differ from driving`);
  // ThemeSm28 / ThemeSm28a–d pantry: 재료/食材 on all 8; THEME_ORDER; chips where pantryTagged>0 (all 8 · ThemeSm28d)
  assert(labels.en.pantry === "Pantry", `${g.id}: EN pantry label must be Pantry`);
  assert(labels.ko.pantry === PANTRY_KO_CANON, `${g.id}: KO pantry chip label`);
  assert(labels.zh.pantry === PANTRY_ZH_CANON, `${g.id}: ZH pantry chip label`);
  assert(order.includes("pantry"), `${g.id}: THEME_ORDER missing pantry`);
  assert(labels.ko.pantry !== labels.ko.kitchen, `${g.id}: pantry KO must differ from kitchen`);
  assert(labels.zh.pantry !== labels.zh.kitchen, `${g.id}: pantry ZH must differ from kitchen`);
  assert(labels.ko.pantry !== labels.ko.fruit, `${g.id}: pantry KO must differ from fruit`);
  assert(labels.zh.pantry !== labels.zh.fruit, `${g.id}: pantry ZH must differ from fruit`);
  assert(labels.ko.pantry !== labels.ko.restaurant, `${g.id}: pantry KO must differ from restaurant`);
  assert(labels.zh.pantry !== labels.zh.restaurant, `${g.id}: pantry ZH must differ from restaurant`);
  // ThemeSm29 / ThemeSm29a–d bathroom: 욕실/浴室 on all 8; THEME_ORDER; chips where bathroomTagged>0 (all 8 · ThemeSm29d)
  assert(labels.en.bathroom === "Bathroom", `${g.id}: EN bathroom label must be Bathroom`);
  assert(labels.ko.bathroom === BATHROOM_KO_CANON, `${g.id}: KO bathroom chip label`);
  assert(labels.zh.bathroom === BATHROOM_ZH_CANON, `${g.id}: ZH bathroom chip label`);
  assert(order.includes("bathroom"), `${g.id}: THEME_ORDER missing bathroom`);
  assert(labels.ko.bathroom !== labels.ko.clinic, `${g.id}: bathroom KO must differ from clinic (health)`);
  assert(labels.zh.bathroom !== labels.zh.clinic, `${g.id}: bathroom ZH must differ from clinic (health)`);
  assert(labels.ko.bathroom !== labels.ko.chores, `${g.id}: bathroom KO must differ from chores`);
  assert(labels.zh.bathroom !== labels.zh.chores, `${g.id}: bathroom ZH must differ from chores`);
  // ThemeSm30 / ThemeSm30a jobs: 직업/职业 on all 8; THEME_ORDER; chips where jobsTagged>0 (speed+cloze+bingo+listen · ThemeSm30a)
  assert(labels.en.jobs === "Jobs", `${g.id}: EN jobs label must be Jobs`);
  assert(labels.ko.jobs === JOBS_KO_CANON, `${g.id}: KO jobs chip label`);
  assert(labels.zh.jobs === JOBS_ZH_CANON, `${g.id}: ZH jobs chip label`);
  assert(order.includes("jobs"), `${g.id}: THEME_ORDER missing jobs`);
  assert(labels.ko.jobs !== labels.ko.workplace, `${g.id}: jobs KO must differ from workplace`);
  assert(labels.zh.jobs !== labels.zh.workplace, `${g.id}: jobs ZH must differ from workplace`);
  // ThemeSm31 / ThemeSm31d country: 국가/国家 on all 8; THEME_ORDER; chips where countryTagged>0 (all 8 · ThemeSm31d)
  assert(labels.en.country === "Country", `${g.id}: EN country label must be Country`);
  assert(labels.ko.country === COUNTRY_KO_CANON, `${g.id}: KO country chip label`);
  assert(labels.zh.country === COUNTRY_ZH_CANON, `${g.id}: ZH country chip label`);
  assert(order.includes("country"), `${g.id}: THEME_ORDER missing country`);
  assert(labels.ko.country !== labels.ko.travel, `${g.id}: country KO must differ from travel`);
  assert(labels.zh.country !== labels.zh.travel, `${g.id}: country ZH must differ from travel`);
  // ThemeSm32d routine: 일상/日常 on all 8; THEME_ORDER; chips where routineTagged>0 (all 8 · daily-routine sweep closed)
  assert(labels.en.routine === "Routine", `${g.id}: EN routine label must be Routine`);
  assert(labels.ko.routine === ROUTINE_KO_CANON, `${g.id}: KO routine chip label`);
  assert(labels.zh.routine === ROUTINE_ZH_CANON, `${g.id}: ZH routine chip label`);
  assert(order.includes("routine"), `${g.id}: THEME_ORDER missing routine`);
  assert(labels.ko.routine !== labels.ko.time, `${g.id}: routine KO must differ from time`);
  assert(labels.zh.routine !== labels.zh.time, `${g.id}: routine ZH must differ from time`);
  // ThemeSm33d size: 크기/大小 on all 8; THEME_ORDER; chips where sizeTagged>0 (all 8)
  assert(labels.en.size === "Size", `${g.id}: EN size label must be Size`);
  assert(labels.ko.size === SIZE_KO_CANON, `${g.id}: KO size chip label`);
  assert(labels.zh.size === SIZE_ZH_CANON, `${g.id}: ZH size chip label`);
  assert(order.includes("size"), `${g.id}: THEME_ORDER missing size`);
  assert(labels.ko.size !== labels.ko.clothes, `${g.id}: size KO must differ from clothes`);
  assert(labels.zh.size !== labels.zh.clothes, `${g.id}: size ZH must differ from clothes`);
  // ThemeSm34a senses: 감각/感觉 on all 8; THEME_ORDER; chips where sensesTagged>0 (speed+cloze · ThemeSm34a)
  assert(labels.en.senses === "Senses", `${g.id}: EN senses label must be Senses`);
  assert(labels.ko.senses === SENSES_KO_CANON, `${g.id}: KO senses chip label`);
  assert(labels.zh.senses === SENSES_ZH_CANON, `${g.id}: ZH senses chip label`);
  assert(order.includes("senses"), `${g.id}: THEME_ORDER missing senses`);
  assert(labels.ko.senses !== labels.ko.weather, `${g.id}: senses KO must differ from weather`);
  assert(labels.zh.senses !== labels.zh.weather, `${g.id}: senses ZH must differ from weather`);
  assert(labels.ko.senses !== labels.ko.emotion, `${g.id}: senses KO must differ from emotion`);
  assert(labels.zh.senses !== labels.zh.emotion, `${g.id}: senses ZH must differ from emotion`);
  // ThemeSm36a accessories: 소지품/随身 on all 8; THEME_ORDER; chips where accessoriesTagged>0 (speed+cloze+bingo+listen)
  assert(labels.en.accessories === "Accessories", `${g.id}: EN accessories label must be Accessories`);
  assert(labels.ko.accessories === ACCESSORIES_KO_CANON, `${g.id}: KO accessories chip label`);
  assert(labels.zh.accessories === ACCESSORIES_ZH_CANON, `${g.id}: ZH accessories chip label`);
  assert(order.includes("accessories"), `${g.id}: THEME_ORDER missing accessories`);
  assert(labels.ko.accessories !== labels.ko.clothes, `${g.id}: accessories KO must differ from clothes`);
  assert(labels.zh.accessories !== labels.zh.clothes, `${g.id}: accessories ZH must differ from clothes`);
  // ThemeSm37a/b electric: 전기/电器 on all 8; THEME_ORDER; chips where electricTagged>0 (speed+cloze+bingo+listen · ThemeSm37b)
  assert(labels.en.electric === "Electricity", `${g.id}: EN electric label must be Electricity`);
  assert(labels.ko.electric === ELECTRIC_KO_CANON, `${g.id}: KO electric chip label`);
  assert(labels.zh.electric === ELECTRIC_ZH_CANON, `${g.id}: ZH electric chip label`);
  assert(order.includes("electric"), `${g.id}: THEME_ORDER missing electric`);
  assert(labels.ko.electric !== labels.ko.chores, `${g.id}: electric KO must differ from chores`);
  assert(labels.zh.electric !== labels.zh.chores, `${g.id}: electric ZH must differ from chores`);
  assert(labels.ko.electric !== labels.ko.media, `${g.id}: electric KO must differ from media`);
  assert(labels.zh.electric !== labels.zh.media, `${g.id}: electric ZH must differ from media`);
  assert(labels.ko.electric !== labels.ko.digital, `${g.id}: electric KO must differ from digital`);
  assert(labels.zh.electric !== labels.zh.digital, `${g.id}: electric ZH must differ from digital`);

  // every game with school chips must expose EN/KO/ZH labels (not raw id)
  if (chips.includes("school")) {
    assert(labels.en.school === "School", `${g.id}: EN school label must be School`);
    assert(labels.ko.school === SCHOOL_KO_CANON, `${g.id}: KO school chip label`);
    assert(labels.zh.school === SCHOOL_ZH_CANON, `${g.id}: ZH school chip label`);
  }
  if (chips.includes("travel")) {
    assert(labels.en.travel === "Travel", `${g.id}: EN travel label must be Travel`);
    assert(labels.ko.travel === TRAVEL_KO_CANON, `${g.id}: KO travel chip label`);
    assert(labels.zh.travel === TRAVEL_ZH_CANON, `${g.id}: ZH travel chip label`);
    assert(order.includes("travel"), `${g.id}: THEME_ORDER missing travel`);
    assert(themesMeta.includes("travel"), `${g.id}: themes meta missing travel`);
  }
  if (chips.includes("weather")) {
    assert(labels.en.weather === "Weather", `${g.id}: EN weather chip label`);
    assert(labels.ko.weather === WEATHER_KO_CANON, `${g.id}: KO weather chip label`);
    assert(labels.zh.weather === WEATHER_ZH_CANON, `${g.id}: ZH weather chip label`);
    assert(themesMeta.includes("weather"), `${g.id}: themes meta missing weather`);
  }
  if (chips.includes("digital")) {
    assert(labels.en.digital === "Digital", `${g.id}: EN digital chip label`);
    assert(labels.ko.digital === DIGITAL_KO_CANON, `${g.id}: KO digital chip label`);
    assert(labels.zh.digital === DIGITAL_ZH_CANON, `${g.id}: ZH digital chip label`);
    assert(themesMeta.includes("digital"), `${g.id}: themes meta missing digital`);
  }
  if (chips.includes("family")) {
    assert(labels.en.family === "Family", `${g.id}: EN family chip label`);
    assert(labels.ko.family === FAMILY_KO_CANON, `${g.id}: KO family chip label`);
    assert(labels.zh.family === FAMILY_ZH_CANON, `${g.id}: ZH family chip label`);
    assert(themesMeta.includes("family"), `${g.id}: themes meta missing family`);
  }
  if (chips.includes("hobby")) {
    assert(labels.en.hobby === "Hobby", `${g.id}: EN hobby chip label`);
    assert(labels.ko.hobby === HOBBY_KO_CANON, `${g.id}: KO hobby chip label`);
    assert(labels.zh.hobby === HOBBY_ZH_CANON, `${g.id}: ZH hobby chip label`);
    assert(themesMeta.includes("hobby"), `${g.id}: themes meta missing hobby`);
  }
  if (chips.includes("emotion")) {
    assert(labels.en.emotion === "Emotion", `${g.id}: EN emotion chip label`);
    assert(labels.ko.emotion === EMOTION_KO_CANON, `${g.id}: KO emotion chip label`);
    assert(labels.zh.emotion === EMOTION_ZH_CANON, `${g.id}: ZH emotion chip label`);
    assert(themesMeta.includes("emotion"), `${g.id}: themes meta missing emotion`);
  }
  if (chips.includes("sports")) {
    assert(labels.en.sports === "Sports", `${g.id}: EN sports chip label`);
    assert(labels.ko.sports === SPORTS_KO_CANON, `${g.id}: KO sports chip label`);
    assert(labels.zh.sports === SPORTS_ZH_CANON, `${g.id}: ZH sports chip label`);
    assert(themesMeta.includes("sports"), `${g.id}: themes meta missing sports`);
  }
  if (chips.includes("nature")) {
    assert(labels.en.nature === "Nature", `${g.id}: EN nature chip label`);
    assert(labels.ko.nature === NATURE_KO_CANON, `${g.id}: KO nature chip label`);
    assert(labels.zh.nature === NATURE_ZH_CANON, `${g.id}: ZH nature chip label`);
    assert(themesMeta.includes("nature"), `${g.id}: themes meta missing nature`);
  }
  if (chips.includes("restaurant")) {
    assert(labels.en.restaurant === "Restaurant", `${g.id}: EN restaurant chip label`);
    assert(labels.ko.restaurant === RESTAURANT_KO_CANON, `${g.id}: KO restaurant chip label`);
    assert(labels.zh.restaurant === RESTAURANT_ZH_CANON, `${g.id}: ZH restaurant chip label`);
    assert(themesMeta.includes("restaurant"), `${g.id}: themes meta missing restaurant`);
  }
  if (chips.includes("clothes")) {
    assert(labels.en.clothes === "Clothes", `${g.id}: EN clothes chip label`);
    assert(labels.ko.clothes === CLOTHES_KO_CANON, `${g.id}: KO clothes chip label`);
    assert(labels.zh.clothes === CLOTHES_ZH_CANON, `${g.id}: ZH clothes chip label`);
    assert(themesMeta.includes("clothes"), `${g.id}: themes meta missing clothes`);
    // ThemeSm12c: all 8 games clothesTagged=10 → chip 옷/服装
    const clothesTagged = items.filter((it) => (it.tags || []).includes("clothes")).length;
    assert(clothesTagged === 10, `${g.id}: clothesTagged expected 10, got ${clothesTagged}`);
  } else {
    const clothesTagged = items.filter((it) => (it.tags || []).includes("clothes")).length;
    assert(clothesTagged === 0, `${g.id}: clothes tags without chip (or themes mismatch)`);
  }
  if (chips.includes("music")) {
    assert(labels.en.music === "Music", `${g.id}: EN music chip label`);
    assert(labels.ko.music === MUSIC_KO_CANON, `${g.id}: KO music chip label`);
    assert(labels.zh.music === MUSIC_ZH_CANON, `${g.id}: ZH music chip label`);
    assert(themesMeta.includes("music"), `${g.id}: themes meta missing music`);
    // ThemeSm13b: speed+cloze+bingo+listen musicTagged=10 → chip 음악/音乐 (distinct from hobby)
    const musicTagged = items.filter((it) => (it.tags || []).includes("music")).length;
    assert(musicTagged === 10, `${g.id}: musicTagged expected 10, got ${musicTagged}`);
  } else {
    const musicTagged = items.filter((it) => (it.tags || []).includes("music")).length;
    assert(musicTagged === 0, `${g.id}: music tags without chip (or themes mismatch)`);
    const musicArtsTagged = items.filter((it) => (it.tags || []).includes("music-arts")).length;
    assert(musicArtsTagged === 0, `${g.id}: unexpected music-arts tags (use theme tag music)`);
  }
  if (chips.includes("media")) {
    assert(labels.en.media === "Media", `${g.id}: EN media chip label`);
    assert(labels.ko.media === MEDIA_KO_CANON, `${g.id}: KO media chip label`);
    assert(labels.zh.media === MEDIA_ZH_CANON, `${g.id}: ZH media chip label`);
    assert(themesMeta.includes("media"), `${g.id}: themes meta missing media`);
    // ThemeSm14–14d: all 8 games mediaTagged=10 → chip 미디어/媒体 (distinct from digital)
    const mediaTagged = items.filter((it) => (it.tags || []).includes("media")).length;
    assert(mediaTagged === 10, `${g.id}: mediaTagged expected 10, got ${mediaTagged}`);
  } else {
    const mediaTagged = items.filter((it) => (it.tags || []).includes("media")).length;
    assert(mediaTagged === 0, `${g.id}: media tags without chip (or themes mismatch)`);
    const mediaNewsTagged = items.filter((it) => (it.tags || []).includes("media-news")).length;
    assert(mediaNewsTagged === 0, `${g.id}: unexpected media-news tags (use theme tag media)`);
  }

  if (chips.includes("celebration")) {
    assert(labels.en.celebration === "Celebration", `${g.id}: EN celebration chip label`);
    assert(labels.ko.celebration === CELEBRATION_KO_CANON, `${g.id}: KO celebration chip label`);
    assert(labels.zh.celebration === CELEBRATION_ZH_CANON, `${g.id}: ZH celebration chip label`);
    assert(themesMeta.includes("celebration"), `${g.id}: themes meta missing celebration`);
    // ThemeSm15a–d: all 8 games celebrationTagged=10 → chip 축하/庆祝
    const celebrationTagged = items.filter((it) => (it.tags || []).includes("celebration")).length;
    assert(celebrationTagged === 10, `${g.id}: celebrationTagged expected 10, got ${celebrationTagged}`);
  } else {
    const celebrationTagged = items.filter((it) => (it.tags || []).includes("celebration")).length;
    assert(celebrationTagged === 0, `${g.id}: celebration tags without chip (or themes mismatch)`);
    const holidayTagged = items.filter((it) => (it.tags || []).includes("celebration-holiday")).length;
    assert(holidayTagged === 0, `${g.id}: unexpected celebration-holiday tags (use theme tag celebration)`);
  }

  if (chips.includes("time")) {
    assert(labels.en.time === "Time", `${g.id}: EN time chip label`);
    assert(labels.ko.time === TIME_KO_CANON, `${g.id}: KO time chip label`);
    assert(labels.zh.time === TIME_ZH_CANON, `${g.id}: ZH time chip label`);
    assert(themesMeta.includes("time"), `${g.id}: themes meta missing time`);
    // ThemeSm16: all 8 games timeTagged≥10 → chip 시간/时间 (bingo/listen/cloze/scramble may be >10)
    const timeTagged = items.filter((it) => (it.tags || []).includes("time")).length;
    assert(timeTagged >= 10, `${g.id}: timeTagged expected >=10, got ${timeTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("time-appointment")).length;
    assert(packTagged === 0, `${g.id}: unexpected time-appointment tags (use theme tag time)`);
  } else {
    const timeTagged = items.filter((it) => (it.tags || []).includes("time")).length;
    assert(timeTagged === 0, `${g.id}: time tags without chip (or themes mismatch)`);
    const packTagged = items.filter((it) => (it.tags || []).includes("time-appointment")).length;
    assert(packTagged === 0, `${g.id}: unexpected time-appointment tags (use theme tag time)`);
  }

  if (chips.includes("chores")) {
    assert(labels.en.chores === "Chores", `${g.id}: EN chores chip label`);
    assert(labels.ko.chores === CHORES_KO_CANON, `${g.id}: KO chores chip label`);
    assert(labels.zh.chores === CHORES_ZH_CANON, `${g.id}: ZH chores chip label`);
    assert(themesMeta.includes("chores"), `${g.id}: themes meta missing chores`);
    // ThemeSm17a–d: all 8 games choresTagged=10 → chip 집안일/家务
    const choresTagged = items.filter((it) => (it.tags || []).includes("chores")).length;
    assert(choresTagged === 10, `${g.id}: choresTagged expected 10, got ${choresTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("home-chores")).length;
    assert(packTagged === 0, `${g.id}: unexpected home-chores tags (use theme tag chores)`);
  } else {
    const choresTagged = items.filter((it) => (it.tags || []).includes("chores")).length;
    assert(choresTagged === 0, `${g.id}: chores tags without chip (or themes mismatch)`);
    const packTagged = items.filter((it) => (it.tags || []).includes("home-chores")).length;
    assert(packTagged === 0, `${g.id}: unexpected home-chores tags (use theme tag chores)`);
  }

  if (chips.includes("body")) {
    assert(labels.en.body === "Body", `${g.id}: EN body chip label`);
    assert(labels.ko.body === BODY_KO_CANON, `${g.id}: KO body chip label`);
    assert(labels.zh.body === BODY_ZH_CANON, `${g.id}: ZH body chip label`);
    assert(themesMeta.includes("body"), `${g.id}: themes meta missing body`);
    // ThemeSm18a–d: all 8 games bodyTagged=10 → chip 신체/身体
    const bodyTagged = items.filter((it) => (it.tags || []).includes("body")).length;
    assert(bodyTagged === 10, `${g.id}: bodyTagged expected 10, got ${bodyTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("body-parts")).length;
    assert(packTagged === 0, `${g.id}: unexpected body-parts tags (use theme tag body)`);
  } else {
    const bodyTagged = items.filter((it) => (it.tags || []).includes("body")).length;
    assert(bodyTagged === 0, `${g.id}: body tags without chip (or themes mismatch)`);
    const packTagged = items.filter((it) => (it.tags || []).includes("body-parts")).length;
    assert(packTagged === 0, `${g.id}: unexpected body-parts tags (use theme tag body)`);
  }

  if (chips.includes("direction")) {
    assert(labels.en.direction === "Direction", `${g.id}: EN direction chip label`);
    assert(labels.ko.direction === DIRECTION_KO_CANON, `${g.id}: KO direction chip label`);
    assert(labels.zh.direction === DIRECTION_ZH_CANON, `${g.id}: ZH direction chip label`);
    assert(themesMeta.includes("direction"), `${g.id}: themes meta missing direction`);
    // ThemeSm19a–d: all 8 games directionTagged=10 → chip 방향/方向
    const directionTagged = items.filter((it) => (it.tags || []).includes("direction")).length;
    assert(directionTagged === 10, `${g.id}: directionTagged expected 10, got ${directionTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("directions-location")).length;
    assert(packTagged === 0, `${g.id}: unexpected directions-location tags (use theme tag direction)`);
  } else {
    const directionTagged = items.filter((it) => (it.tags || []).includes("direction")).length;
    assert(directionTagged === 0, `${g.id}: direction tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("direction"), `${g.id}: themes meta must not list direction when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("directions-location")).length;
    assert(packTagged === 0, `${g.id}: unexpected directions-location tags (use theme tag direction)`);
  }
  // Older beginner tag `directions` (plural) must never surface as a chip
  assert(!chips.includes("directions"), `${g.id}: plural directions must not be a chip (use direction)`);
  assert(!themesMeta.includes("directions"), `${g.id}: themes meta must not list plural directions`);

  if (chips.includes("furniture")) {
    assert(labels.en.furniture === "Furniture", `${g.id}: EN furniture chip label`);
    assert(labels.ko.furniture === FURNITURE_KO_CANON, `${g.id}: KO furniture chip label`);
    assert(labels.zh.furniture === FURNITURE_ZH_CANON, `${g.id}: ZH furniture chip label`);
    assert(themesMeta.includes("furniture"), `${g.id}: themes meta missing furniture`);
    // ThemeSm20a–d: all 8 games furnitureTagged=10 → chip 가구/家具
    const furnitureTagged = items.filter((it) => (it.tags || []).includes("furniture")).length;
    assert(furnitureTagged === 10, `${g.id}: furnitureTagged expected 10, got ${furnitureTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("furniture-room")).length;
    assert(packTagged === 0, `${g.id}: unexpected furniture-room tags (use theme tag furniture)`);
  } else {
    const furnitureTagged = items.filter((it) => (it.tags || []).includes("furniture")).length;
    assert(furnitureTagged === 0, `${g.id}: furniture tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("furniture"), `${g.id}: themes meta must not list furniture when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("furniture-room")).length;
    assert(packTagged === 0, `${g.id}: unexpected furniture-room tags (use theme tag furniture)`);
  }

  if (chips.includes("fruit")) {
    assert(labels.en.fruit === "Fruit", `${g.id}: EN fruit chip label`);
    assert(labels.ko.fruit === FRUIT_KO_CANON, `${g.id}: KO fruit chip label`);
    assert(labels.zh.fruit === FRUIT_ZH_CANON, `${g.id}: ZH fruit chip label`);
    assert(themesMeta.includes("fruit"), `${g.id}: themes meta missing fruit`);
    // ThemeSm21a–d: all 8 games fruitTagged=10 → chip 과일/水果
    const fruitTagged = items.filter((it) => (it.tags || []).includes("fruit")).length;
    assert(fruitTagged === 10, `${g.id}: fruitTagged expected 10, got ${fruitTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("fruit-market")).length;
    assert(packTagged === 0, `${g.id}: unexpected fruit-market tags (use theme tag fruit)`);
  } else {
    const fruitTagged = items.filter((it) => (it.tags || []).includes("fruit")).length;
    assert(fruitTagged === 0, `${g.id}: fruit tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("fruit"), `${g.id}: themes meta must not list fruit when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("fruit-market")).length;
    assert(packTagged === 0, `${g.id}: unexpected fruit-market tags (use theme tag fruit)`);
  }

  if (chips.includes("kitchen")) {
    assert(labels.en.kitchen === "Kitchen", `${g.id}: EN kitchen chip label`);
    assert(labels.ko.kitchen === KITCHEN_KO_CANON, `${g.id}: KO kitchen chip label`);
    assert(labels.zh.kitchen === KITCHEN_ZH_CANON, `${g.id}: ZH kitchen chip label`);
    assert(themesMeta.includes("kitchen"), `${g.id}: themes meta missing kitchen`);
    // ThemeSm22d: all 8 kitchenTagged=10 → chip 주방/厨房 (kitchen sweep closed)
    const kitchenTagged = items.filter((it) => (it.tags || []).includes("kitchen")).length;
    assert(kitchenTagged === 10, `${g.id}: kitchenTagged expected 10, got ${kitchenTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("kitchen-tableware")).length;
    assert(packTagged === 0, `${g.id}: unexpected kitchen-tableware tags (use theme tag kitchen)`);
  } else {
    // no kitchen chip → must have zero kitchen tags/themes
    const kitchenTagged = items.filter((it) => (it.tags || []).includes("kitchen")).length;
    assert(kitchenTagged === 0, `${g.id}: kitchen tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("kitchen"), `${g.id}: themes meta must not list kitchen when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("kitchen-tableware")).length;
    assert(packTagged === 0, `${g.id}: unexpected kitchen-tableware tags (use theme tag kitchen)`);
  }

  if (chips.includes("stationery")) {
    assert(labels.en.stationery === "Stationery", `${g.id}: EN stationery chip label`);
    assert(labels.ko.stationery === STATIONERY_KO_CANON, `${g.id}: KO stationery chip label`);
    assert(labels.zh.stationery === STATIONERY_ZH_CANON, `${g.id}: ZH stationery chip label`);
    assert(themesMeta.includes("stationery"), `${g.id}: themes meta missing stationery`);
    // ThemeSm23d: all 8 stationeryTagged=10 → chip 문구/文具 (stationery sweep closed)
    const stationeryTagged = items.filter((it) => (it.tags || []).includes("stationery")).length;
    assert(stationeryTagged === 10, `${g.id}: stationeryTagged expected 10, got ${stationeryTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("office-stationery")).length;
    assert(packTagged === 0, `${g.id}: unexpected office-stationery tags (use theme tag stationery)`);
  } else {
    // no stationery chip → must have zero stationery tags/themes
    const stationeryTagged = items.filter((it) => (it.tags || []).includes("stationery")).length;
    assert(stationeryTagged === 0, `${g.id}: stationery tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("stationery"), `${g.id}: themes meta must not list stationery when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("office-stationery")).length;
    assert(packTagged === 0, `${g.id}: unexpected office-stationery tags (use theme tag stationery)`);
  }

  if (chips.includes("mail")) {
    assert(labels.en.mail === "Mail", `${g.id}: EN mail chip label`);
    assert(labels.ko.mail === MAIL_KO_CANON, `${g.id}: KO mail chip label`);
    assert(labels.zh.mail === MAIL_ZH_CANON, `${g.id}: ZH mail chip label`);
    assert(themesMeta.includes("mail"), `${g.id}: themes meta missing mail`);
    // ThemeSm24d: all 8 mailTagged=10 → chip 우편/邮寄 (ThemeSm24a: first 4; ThemeSm24d: particle/dictation/tel/scramble)
    const mailTagged = items.filter((it) => (it.tags || []).includes("mail")).length;
    assert(mailTagged === 10, `${g.id}: mailTagged expected 10, got ${mailTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("post-mail")).length;
    assert(packTagged === 0, `${g.id}: unexpected post-mail tags (use theme tag mail)`);
  } else {
    // no mail chip → must have zero mail tags/themes
    const mailTagged = items.filter((it) => (it.tags || []).includes("mail")).length;
    assert(mailTagged === 0, `${g.id}: mail tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("mail"), `${g.id}: themes meta must not list mail when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("post-mail")).length;
    assert(packTagged === 0, `${g.id}: unexpected post-mail tags (use theme tag mail)`);
  }

  if (chips.includes("pets")) {
    assert(labels.en.pets === "Pets", `${g.id}: EN pets chip label`);
    assert(labels.ko.pets === PETS_KO_CANON, `${g.id}: KO pets chip label`);
    assert(labels.zh.pets === PETS_ZH_CANON, `${g.id}: ZH pets chip label`);
    assert(themesMeta.includes("pets"), `${g.id}: themes meta missing pets`);
    // ThemeSm25d: all 8 petsTagged=10 → chip 동물/动物
    const petsTagged = items.filter((it) => (it.tags || []).includes("pets")).length;
    assert(petsTagged === 10, `${g.id}: petsTagged expected 10, got ${petsTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("animals-pets")).length;
    assert(packTagged === 0, `${g.id}: unexpected animals-pets tags (use theme tag pets)`);
  } else {
    // no pets chip → must have zero pets tags/themes
    const petsTagged = items.filter((it) => (it.tags || []).includes("pets")).length;
    assert(petsTagged === 0, `${g.id}: pets tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("pets"), `${g.id}: themes meta must not list pets when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("animals-pets")).length;
    assert(packTagged === 0, `${g.id}: unexpected animals-pets tags (use theme tag pets)`);
  }

  if (chips.includes("driving")) {
    assert(labels.en.driving === "Driving", `${g.id}: EN driving chip label`);
    assert(labels.ko.driving === DRIVING_KO_CANON, `${g.id}: KO driving chip label`);
    assert(labels.zh.driving === DRIVING_ZH_CANON, `${g.id}: ZH driving chip label`);
    assert(themesMeta.includes("driving"), `${g.id}: themes meta missing driving`);
    // ThemeSm26a–d: all 8 drivingTagged=10 → chip 운전/驾驶 (distinct from travel/transit); ThemeSm26d closes sweep
    const drivingTagged = items.filter((it) => (it.tags || []).includes("driving")).length;
    assert(drivingTagged === 10, `${g.id}: drivingTagged expected 10, got ${drivingTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("vehicles-driving")).length;
    assert(packTagged === 0, `${g.id}: unexpected vehicles-driving tags (use theme tag driving)`);
  } else {
    // no driving chip → must have zero driving tags/themes (empty games stay hidden)
    const drivingTagged = items.filter((it) => (it.tags || []).includes("driving")).length;
    assert(drivingTagged === 0, `${g.id}: driving tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("driving"), `${g.id}: themes meta must not list driving when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("vehicles-driving")).length;
    assert(packTagged === 0, `${g.id}: unexpected vehicles-driving tags (use theme tag driving)`);
  }

  if (chips.includes("places")) {
    assert(labels.en.places === "Places", `${g.id}: EN places chip label`);
    assert(labels.ko.places === PLACES_KO_CANON, `${g.id}: KO places chip label`);
    assert(labels.zh.places === PLACES_ZH_CANON, `${g.id}: ZH places chip label`);
    assert(themesMeta.includes("places"), `${g.id}: themes meta missing places`);
    // ThemeSm27a–d: all 8 placesTagged=10 → chip 장소/场所 (distinct from travel/direction/driving); ThemeSm27d closes sweep
    const placesTagged = items.filter((it) => (it.tags || []).includes("places")).length;
    assert(placesTagged === 10, `${g.id}: placesTagged expected 10, got ${placesTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("city-places")).length;
    assert(packTagged === 0, `${g.id}: unexpected city-places tags (use theme tag places)`);
  } else {
    // no places chip → must have zero places tags/themes (empty games stay hidden)
    const placesTagged = items.filter((it) => (it.tags || []).includes("places")).length;
    assert(placesTagged === 0, `${g.id}: places tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("places"), `${g.id}: themes meta must not list places when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("city-places")).length;
    assert(packTagged === 0, `${g.id}: unexpected city-places tags (use theme tag places)`);
  }

  if (chips.includes("pantry")) {
    assert(labels.en.pantry === "Pantry", `${g.id}: EN pantry chip label`);
    assert(labels.ko.pantry === PANTRY_KO_CANON, `${g.id}: KO pantry chip label`);
    assert(labels.zh.pantry === PANTRY_ZH_CANON, `${g.id}: ZH pantry chip label`);
    assert(themesMeta.includes("pantry"), `${g.id}: themes meta missing pantry`);
    // ThemeSm28d: all 8 pantryTagged=10 → chip 재료/食材 (distinct from kitchen/fruit/restaurant)
    const pantryTagged = items.filter((it) => (it.tags || []).includes("pantry")).length;
    assert(pantryTagged === 10, `${g.id}: pantryTagged expected 10, got ${pantryTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("pantry-ingredients")).length;
    assert(packTagged === 0, `${g.id}: unexpected pantry-ingredients tags (use theme tag pantry)`);
  } else {
    // no pantry chip → must have zero pantry tags/themes (should not happen after ThemeSm28d)
    const pantryTagged = items.filter((it) => (it.tags || []).includes("pantry")).length;
    assert(pantryTagged === 0, `${g.id}: pantry tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("pantry"), `${g.id}: themes meta must not list pantry when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("pantry-ingredients")).length;
    assert(packTagged === 0, `${g.id}: unexpected pantry-ingredients tags (use theme tag pantry)`);
  }

  if (chips.includes("bathroom")) {
    assert(labels.en.bathroom === "Bathroom", `${g.id}: EN bathroom chip label`);
    assert(labels.ko.bathroom === BATHROOM_KO_CANON, `${g.id}: KO bathroom chip label`);
    assert(labels.zh.bathroom === BATHROOM_ZH_CANON, `${g.id}: ZH bathroom chip label`);
    assert(themesMeta.includes("bathroom"), `${g.id}: themes meta missing bathroom`);
    // ThemeSm29d: all 8 bathroomTagged=10 → chip 욕실/浴室 (distinct from clinic/chores)
    const bathroomTagged = items.filter((it) => (it.tags || []).includes("bathroom")).length;
    assert(bathroomTagged === 10, `${g.id}: bathroomTagged expected 10, got ${bathroomTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("bathroom-hygiene")).length;
    assert(packTagged === 0, `${g.id}: unexpected bathroom-hygiene tags (use theme tag bathroom)`);
  } else {
    // no bathroom chip → must have zero bathroom tags/themes (should not happen after ThemeSm29d)
    const bathroomTagged = items.filter((it) => (it.tags || []).includes("bathroom")).length;
    assert(bathroomTagged === 0, `${g.id}: bathroom tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("bathroom"), `${g.id}: themes meta must not list bathroom when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("bathroom-hygiene")).length;
    assert(packTagged === 0, `${g.id}: unexpected bathroom-hygiene tags (use theme tag bathroom)`);
  }

  if (chips.includes("jobs")) {
    assert(labels.en.jobs === "Jobs", `${g.id}: EN jobs chip label`);
    assert(labels.ko.jobs === JOBS_KO_CANON, `${g.id}: KO jobs chip label`);
    assert(labels.zh.jobs === JOBS_ZH_CANON, `${g.id}: ZH jobs chip label`);
    assert(themesMeta.includes("jobs"), `${g.id}: themes meta missing jobs`);
    // ThemeSm30a: speed+cloze+bingo+listen jobsTagged=10 → chip 직업/职业 (distinct from workplace/public-life)
    const jobsTagged = items.filter((it) => (it.tags || []).includes("jobs")).length;
    assert(jobsTagged === 10, `${g.id}: jobsTagged expected 10, got ${jobsTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("jobs-occupations")).length;
    assert(packTagged === 0, `${g.id}: unexpected jobs-occupations tags (use theme tag jobs)`);
  } else {
    // ThemeSm30a: empty 4 games — no jobs chip / tags / themes
    const jobsTagged = items.filter((it) => (it.tags || []).includes("jobs")).length;
    assert(jobsTagged === 0, `${g.id}: jobs tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("jobs"), `${g.id}: themes meta must not list jobs when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("jobs-occupations")).length;
    assert(packTagged === 0, `${g.id}: unexpected jobs-occupations tags (use theme tag jobs)`);
  }

  if (chips.includes("country")) {
    assert(labels.en.country === "Country", `${g.id}: EN country chip label`);
    assert(labels.ko.country === COUNTRY_KO_CANON, `${g.id}: KO country chip label`);
    assert(labels.zh.country === COUNTRY_ZH_CANON, `${g.id}: ZH country chip label`);
    assert(themesMeta.includes("country"), `${g.id}: themes meta missing country`);
    // ThemeSm31d: all 8 countryTagged=10 → chip 국가/国家 (distinct from travel); ThemeSm31d closes sweep
    const countryTagged = items.filter((it) => (it.tags || []).includes("country")).length;
    assert(countryTagged === 10, `${g.id}: countryTagged expected 10, got ${countryTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("countries-nationality")).length;
    assert(packTagged === 0, `${g.id}: unexpected countries-nationality tags (use theme tag country)`);
  } else {
    // no country chip → must have zero country tags/themes (should not happen after ThemeSm31d)
    const countryTagged = items.filter((it) => (it.tags || []).includes("country")).length;
    assert(countryTagged === 0, `${g.id}: country tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("country"), `${g.id}: themes meta must not list country when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("countries-nationality")).length;
    assert(packTagged === 0, `${g.id}: unexpected countries-nationality tags (use theme tag country)`);
  }

  if (chips.includes("routine")) {
    assert(labels.en.routine === "Routine", `${g.id}: EN routine chip label`);
    assert(labels.ko.routine === ROUTINE_KO_CANON, `${g.id}: KO routine chip label`);
    assert(labels.zh.routine === ROUTINE_ZH_CANON, `${g.id}: ZH routine chip label`);
    assert(themesMeta.includes("routine"), `${g.id}: themes meta missing routine`);
    // ThemeSm32d: all 8 games routineTagged=10 → chip 일상/日常 (distinct from time)
    const routineTagged = items.filter((it) => (it.tags || []).includes("routine")).length;
    assert(routineTagged === 10, `${g.id}: routineTagged expected 10, got ${routineTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("daily-routine")).length;
    assert(packTagged === 0, `${g.id}: unexpected daily-routine tags (use theme tag routine)`);
  } else {
    // no routine chip → must have zero routine tags/themes (should not happen after ThemeSm32d)
    const routineTagged = items.filter((it) => (it.tags || []).includes("routine")).length;
    assert(routineTagged === 0, `${g.id}: routine tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("routine"), `${g.id}: themes meta must not list routine when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("daily-routine")).length;
    assert(packTagged === 0, `${g.id}: unexpected daily-routine tags (use theme tag routine)`);
  }

  if (chips.includes("size")) {
    assert(labels.en.size === "Size", `${g.id}: EN size chip label`);
    assert(labels.ko.size === SIZE_KO_CANON, `${g.id}: KO size chip label`);
    assert(labels.zh.size === SIZE_ZH_CANON, `${g.id}: ZH size chip label`);
    assert(themesMeta.includes("size"), `${g.id}: themes meta missing size`);
    // ThemeSm33d: all 8 games sizeTagged=10 → chip 크기/大小 (distinct from clothes)
    const sizeTagged = items.filter((it) => (it.tags || []).includes("size")).length;
    assert(sizeTagged === 10, `${g.id}: sizeTagged expected 10, got ${sizeTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("size-quantity")).length;
    assert(packTagged === 0, `${g.id}: unexpected size-quantity tags (use theme tag size)`);
  } else {
    // no size chip → must have zero size tags/themes (should not happen after ThemeSm33d)
    const sizeTagged = items.filter((it) => (it.tags || []).includes("size")).length;
    assert(sizeTagged === 0, `${g.id}: size tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("size"), `${g.id}: themes meta must not list size when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("size-quantity")).length;
    assert(packTagged === 0, `${g.id}: unexpected size-quantity tags (use theme tag size)`);
  }

  if (chips.includes("senses")) {
    assert(labels.en.senses === "Senses", `${g.id}: EN senses chip label`);
    assert(labels.ko.senses === SENSES_KO_CANON, `${g.id}: KO senses chip label`);
    assert(labels.zh.senses === SENSES_ZH_CANON, `${g.id}: ZH senses chip label`);
    assert(themesMeta.includes("senses"), `${g.id}: themes meta missing senses`);
    // ThemeSm34a: speed+cloze sensesTagged=10 → chip 감각/感觉 (distinct from weather/emotion)
    const sensesTagged = items.filter((it) => (it.tags || []).includes("senses")).length;
    assert(sensesTagged === 10, `${g.id}: sensesTagged expected 10, got ${sensesTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("temperature-senses")).length;
    assert(packTagged === 0, `${g.id}: unexpected temperature-senses tags (use theme tag senses)`);
  } else {
    // ThemeSm34a: empty 6 → no senses chip / tags / themes
    const sensesTagged = items.filter((it) => (it.tags || []).includes("senses")).length;
    assert(sensesTagged === 0, `${g.id}: senses tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("senses"), `${g.id}: themes meta must not list senses when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("temperature-senses")).length;
    assert(packTagged === 0, `${g.id}: unexpected temperature-senses tags (use theme tag senses)`);
  }

  if (chips.includes("accessories")) {
    assert(labels.en.accessories === "Accessories", `${g.id}: EN accessories chip label`);
    assert(labels.ko.accessories === ACCESSORIES_KO_CANON, `${g.id}: KO accessories chip label`);
    assert(labels.zh.accessories === ACCESSORIES_ZH_CANON, `${g.id}: ZH accessories chip label`);
    assert(themesMeta.includes("accessories"), `${g.id}: themes meta missing accessories`);
    // ThemeSm36d: all 8 games accessoriesTagged≥8 + themes → chip 소지품/随身 (distinct from clothes)
    // speed/cloze/bingo/listen/particle/dictation =10; telephone/scramble thin =8
    const accessoriesTagged = items.filter((it) => (it.tags || []).includes("accessories")).length;
    assert(accessoriesTagged >= 8, `${g.id}: accessoriesTagged expected >=8, got ${accessoriesTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("accessories-belongings")).length;
    assert(packTagged === 0, `${g.id}: unexpected accessories-belongings tags (use theme tag accessories)`);
  } else {
    // no accessories chip → must have zero accessories tags/themes (should not happen after ThemeSm36d)
    const accessoriesTagged = items.filter((it) => (it.tags || []).includes("accessories")).length;
    assert(accessoriesTagged === 0, `${g.id}: accessories tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("accessories"), `${g.id}: themes meta must not list accessories when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("accessories-belongings")).length;
    assert(packTagged === 0, `${g.id}: unexpected accessories-belongings tags (use theme tag accessories)`);
  }

  if (chips.includes("electric")) {
    assert(labels.en.electric === "Electricity", `${g.id}: EN electric chip label`);
    assert(labels.ko.electric === ELECTRIC_KO_CANON, `${g.id}: KO electric chip label`);
    assert(labels.zh.electric === ELECTRIC_ZH_CANON, `${g.id}: ZH electric chip label`);
    assert(themesMeta.includes("electric"), `${g.id}: themes meta missing electric`);
    // ThemeSm37b(+residual): all 8 electricTagged≥8 + themes → chip 전기/电器
    // speed/cloze/bingo/listen/particle/dictation =10; telephone/scramble thin =8
    const electricTagged = items.filter((it) => (it.tags || []).includes("electric")).length;
    assert(electricTagged >= 8, `${g.id}: electricTagged expected >=8, got ${electricTagged}`);
    const packTagged = items.filter((it) => (it.tags || []).includes("electricity-appliances")).length;
    assert(packTagged === 0, `${g.id}: unexpected electricity-appliances tags (use theme tag electric)`);
  } else {
    // no electric chip → must have zero electric tags/themes (should not happen after ThemeSm37b residual)
    const electricTagged = items.filter((it) => (it.tags || []).includes("electric")).length;
    assert(electricTagged === 0, `${g.id}: electric tags without chip (or themes mismatch)`);
    assert(!themesMeta.includes("electric"), `${g.id}: themes meta must not list electric when tags=0`);
    const packTagged = items.filter((it) => (it.tags || []).includes("electricity-appliances")).length;
    assert(packTagged === 0, `${g.id}: unexpected electricity-appliances tags (use theme tag electric)`);
  }

  // no raw 'class' tag without school alias (chip would show as 'class')
  const classOnly = items.filter(
    (it) => (it.tags || []).includes("class") && !(it.tags || []).includes("school")
  );
  assert(classOnly.length === 0, `${g.id}: orphan 'class' tags without school`);

  if (g.id === "bingo-board") {
    assert(js.includes("needMin") || js.includes("neededWords(3)"), `${g.id}: min-words chip gate`);
    assert(!chips.includes("leisure"), `${g.id}: thin leisure chip should be hidden`);
    assert(!chips.includes("cafe"), `${g.id}: thin cafe chip should be hidden`);
  }

  summary.push(
    `${g.id}: chips=${chips.filter((t) => g.focus.includes(t)).join(",")} · focus OK`
  );
}

console.log("OK: games theme-filter smoke");
summary.forEach((line) => console.log(" ", line));

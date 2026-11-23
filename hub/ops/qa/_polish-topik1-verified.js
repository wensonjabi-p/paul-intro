/**
 * TOPIK I verified polish — early-hint de-spoil + thin why.zh expand.
 * Run: node hub/ops/qa/_polish-topik1-verified.js
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../app/data");

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
}
function save(name, j) {
  fs.writeFileSync(path.join(dir, name), JSON.stringify(j, null, 2) + "\n", "utf8");
}

function qById(bank, id) {
  const q = bank.questions.find((x) => x.id === id);
  if (!q) throw new Error("missing " + id);
  return q;
}

function setSteps(q, lang, steps) {
  q.hint.steps[lang] = steps;
}

function scrubFlatHint(q) {
  // Remove Pair-style Match:/답:/对应: clauses from flat hint blobs (fallback path)
  for (const lang of ["en", "ko", "zh"]) {
    let s = String(q.hint[lang] || "");
    s = s.replace(/\s*(?:Match|답|对应)\s*[:：][^.。！？!?\n]*/g, "");
    s = s.replace(/\s{2,}/g, " ").trim();
    if (s) q.hint[lang] = s;
  }
}

// --- listen-01 ---
{
  const b = load("verified-listen-01.json");
  for (const q of b.questions) {
    // Meaning lines: avoid “Listening match:” Pair-looking English; keep clear type cue
    const en0 = q.hint.steps.en[0];
    if (/^Listening match:/i.test(en0)) {
      q.hint.steps.en[0] = en0.replace(/^Listening match:\s*/i, "Listening · ");
    }
    scrubFlatHint(q);
  }
  // l1-02 Look must not embed answerText 학교 정문 옆
  {
    const q = qById(b, "l1-02");
    setSteps(q, "en", [
      "Listening · place.",
      "Listen after 어디에 — the place next to the school main gate.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "zh", [
      "听力一致：地点。",
      "听「어디에」后面 — 学校正门旁边的位置。",
      "只看对照句式，自己从选项里选。",
    ]);
    setSteps(q, "ko", [
      "장소 답.",
      "「어디에」 뒤 — 학교 정문 옆 위치.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    // ko Look still has answer substring — soften further
    q.hint.steps.ko[1] = "「어디에」 뒤에 나오는 위치를 들으세요.";
    scrubFlatHint(q);
  }
  for (const qq of b.questions) {
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-listen-01.json", b);
}

// --- listen-02 ---
{
  const b = load("verified-listen-02.json");
  const q = qById(b, "l2-05");
  q.why.zh = "关键信息：2层，电梯旁边。不要选楼梯或其它楼层。";
  for (const qq of b.questions) {
    scrubFlatHint(qq);
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-listen-02.json", b);
}

// --- read-01 ---
{
  const b = load("verified-read-01.json");
  {
    const q = qById(b, "v1-07");
    setSteps(q, "en", [
      "It’s raining — what do you need?",
      "Pick the ‘need / necessary’ ending (not taste or fun).",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "비가 와요. 무엇이 필요할까요?",
      "‘필요하다’ 서술어 끝을 고르세요 (맛·재미 아님).",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "下雨 — 你需要什么？",
      "选“需要”的谓语结尾（不是好吃/有趣）。",
      "只看对照句式，自己从选项里选。",
    ]);
    // "필요할까요" still contains 필요 — answerText is 필요해요. Check: 필요 is prefix of 필요해요!
    // answerSpoilers uses full answerText "필요해요" — "필요할까요" does NOT include "필요해요" as substring.
    // Good.
    scrubFlatHint(q);
  }
  qById(b, "v1-02").why.zh = "比较句 A보다…커요：句尾用커요，不是名词前的큰。";
  qById(b, "v1-03").why.zh = "돼요＝“可以吗/行吗”（许可）。不是안 돼요（不行）。";
  qById(b, "v1-08").why.zh = "数人用명：학생 열 명＝十名学生。개是东西，권是书。";
  qById(b, "v1-06").why.zh = "告示「쉬는 날」＝休息日 → 星期一闭馆。";
  qById(b, "v1-10").why.zh = "그것回指前面喝过的东西 → 咖啡。";
  for (const qq of b.questions) {
    scrubFlatHint(qq);
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-read-01.json", b);
}

// --- read-02 ---
{
  const b = load("verified-read-02.json");
  {
    const q = qById(b, "v2-04");
    setSteps(q, "en", [
      "닫다 = close (the door). It’s cold, so you want the door closed.",
      "You’re asking politely — look for the ~아/어 + please request ending.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "「닫다」= 문을 닫다. 추워서 문을 닫고 싶어요.",
      "부탁할 때 쓰는 ~아/어 + 청유 끝을 찾으세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "닫다 = 关（门）。很冷，所以想关门。",
      "礼貌拜托别人 → 找 ~아/어 + 请… 的请求结尾。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  {
    const q = qById(b, "v2-05");
    setSteps(q, "en", [
      "You’re asking where something is.",
      "Look for the place question word (where + location particle).",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "장소를 물어요.",
      "장소 의문사(어디 + 조사)를 찾으세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "你在问在哪里。",
      "找地点疑问词（哪里 + 助词）。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  {
    const q = qById(b, "v2-07");
    setSteps(q, "en", [
      "Father “is” at the company — polite form for adults.",
      "Prefer the honorific ‘be / stay’ over plain 있어요.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "아버지께 「있다」를 높여 말해요.",
      "평서 「있어요」보다 높임 존재를 고르세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "爸爸“在”公司 — 对长辈用敬语。",
      "比起随便的 있어요，选敬语“在”。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  qById(b, "v2-01").why.zh = "A에서 B까지：从学校到家。에서标起点。";
  qById(b, "v2-02").why.zh = "比较：A보다 더 달아요＝比那个更甜。";
  qById(b, "v2-09").why.zh = "数瓶装水用병：물이 세 병＝三瓶。";
  qById(b, "v2-03").why.zh = "看「도착」行：到达地是机场，不是出发地。";
  qById(b, "v2-06").why.zh = "全文话题＝爱好（烹饪），不是工作或旅行。";
  qById(b, "v2-10").why.zh = "文中写银行也休息 → 选与此一致的一项。";
  for (const qq of b.questions) {
    scrubFlatHint(qq);
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-read-02.json", b);
}

// --- read-03 ---
{
  const b = load("verified-read-03.json");
  {
    const q = qById(b, "v3-01");
    setSteps(q, "en", [
      "After a noun, pick the polite ‘is’ ending (two common shapes).",
      "Check whether 생일 has a final consonant (받침) — that picks which ending.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "명사 뒤 정중체 「이다」 끝맺음(두 형태).",
      "「생일」받침 유무로 끝을 고르세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "名词后面的礼貌“是”（两种常见词尾）。",
      "看 생일 有无收音(받침) — 据此选词尾。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  {
    const q = qById(b, "v3-02");
    setSteps(q, "en", [
      "지난주 = last week → already past.",
      "Past polite: ~았어요/었어요 (went).",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "지난주 = 과거.",
      "과거 정중체 ~았/었어요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "지난주 = 上周 → 过去。",
      "过去礼貌形：~았/었어요。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  {
    const q = qById(b, "v3-05");
    setSteps(q, "en", [
      "They say wear a coat → weather feeling.",
      "Pick the ‘cold’ weather adjective.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "코트 → 날씨가 어때요?",
      "추운 느낌의 형용사를 고르세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "说穿外套 → 天气感觉。",
      "选表示“冷”的天气形容词。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  {
    const q = qById(b, "v3-08");
    setSteps(q, "en", [
      "Mother is the subject — raise the verb “eat.”",
      "Pick the honorific form of 먹다.",
      "Use the pattern contrast — pick the choice yourself.",
    ]);
    setSteps(q, "ko", [
      "어머니 주어 → 「먹다」를 높여 말해요.",
      "「먹다」 높임형을 고르세요.",
      "짝/대조만 보고, 보기에서 스스로 고르세요.",
    ]);
    setSteps(q, "zh", [
      "主语是妈妈 — 抬高“吃”。",
      "选 먹다 的敬语形式。",
      "只看对照句式，自己从选项里选。",
    ]);
    scrubFlatHint(q);
  }
  qById(b, "v3-04").why.zh = "A와/과 B 중에서：在咖啡和茶之中选。";
  qById(b, "v3-05").why.zh = "让穿外套 → 天气冷（추워요）。";
  qById(b, "v3-07").why.zh = "V을/를 때＝……的时候。这里是‘学习的时候’。";
  qById(b, "v3-03").why.zh = "医院告示：식당 那一行是 2층（二楼）。";
  qById(b, "v3-06").why.zh = "그곳回指前面去的地方 → 公园。";
  qById(b, "v3-10").why.zh = "文中写住在宿舍 → 选与此一致的一项。";
  // scrub why that still say Match:/답: in early-looking way is ok for why
  for (const qq of b.questions) {
    scrubFlatHint(qq);
    // soft-clean why of "Match:" / "답:" labels for cleaner post-answer gloss (keep meaning)
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-read-03.json", b);
}

// --- read-04 ---
{
  const b = load("verified-read-04.json");
  qById(b, "v4-03").why.zh = "按因果·时间排句子顺序：理由在前，「그래서」在后。";
  qById(b, "v4-04").why.zh = "公告终点站＝市场。不要选学校或机场。";
  qById(b, "v4-05").why.zh = "话题＝周末在公园休闲（散步·自行车）。";
  qById(b, "v4-06").why.zh = "天冷 → 请关窗（~아/어 주세요）。";
  for (const qq of b.questions) {
    scrubFlatHint(qq);
    for (const lang of ["en", "ko", "zh"]) {
      let w = String(qq.why[lang] || "");
      w = w.replace(/\bMatch:\s*/g, "→ ");
      w = w.replace(/\b답:\s*/g, "→ ");
      w = w.replace(/对应[：:]\s*/g, "→ ");
      qq.why[lang] = w.trim();
    }
  }
  save("verified-read-04.json", b);
}

console.log("polished verified listen/read banks");

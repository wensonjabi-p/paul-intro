/**
 * ThemeSm54a — enable advice theme chip (i18n + THEME_ORDER) across 8 games.
 * Canon: KO 조언 / ZH 建议 / EN Advice.
 * Distinct from opinion / speech / favor / think / problem / success.
 * Chip SHOW only when adviceTagged>0 + themes.advice (speed now).
 * Run: node hub/ops/qa/_patch-advice-theme-chip.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../app/games");
const files = [
  "speed-quiz/speed.js",
  "cloze-race/cloze.js",
  "bingo-board/bingo.js",
  "listen-match/match.js",
  "particle-snap/particle.js",
  "dictation/dictation.js",
  "telephone/telephone.js",
  "word-scramble/scramble.js",
];

function patch(rel) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, "utf8");
  let n = 0;

  if (!s.includes('theme_advice: "Advice"')) {
    if (!s.includes('theme_success: "Success",'))
      throw new Error(`${rel}: missing EN theme_success`);
    s = s.replace(
      'theme_success: "Success",',
      'theme_success: "Success",\n      theme_advice: "Advice",'
    );
    n++;
  }
  if (!s.includes('theme_advice: "조언"')) {
    if (!s.includes('theme_success: "성공",'))
      throw new Error(`${rel}: missing KO theme_success`);
    s = s.replace(
      'theme_success: "성공",',
      'theme_success: "성공",\n      theme_advice: "조언",'
    );
    n++;
  }
  if (!s.includes('theme_advice: "建议"')) {
    if (!s.includes('theme_success: "成功",'))
      throw new Error(`${rel}: missing ZH theme_success`);
    s = s.replace(
      'theme_success: "成功",',
      'theme_success: "成功",\n      theme_advice: "建议",'
    );
    n++;
  }

  const orderBlock = s.match(/THEME_ORDER[\s\S]*?\];/)?.[0] || "";
  if (!/"advice"/.test(orderBlock)) {
    const repls = [
      ['"success", "intermediate"', '"success", "advice", "intermediate"'],
      ['"success", "intermediate",', '"success", "advice", "intermediate",'],
      [
        '"success",\n    "intermediate"',
        '"success",\n    "advice",\n    "intermediate"',
      ],
      ['"success",\r\n    "intermediate"', '"success",\r\n    "advice",\r\n    "intermediate"'],
      ['"success",\n    "lang",', '"success",\n    "advice",\n    "lang",'],
      ['"success",\r\n    "lang",', '"success",\r\n    "advice",\r\n    "lang",'],
    ];
    let done = false;
    for (const [a, b] of repls) {
      if (s.includes(a)) {
        s = s.replace(a, b);
        n++;
        done = true;
        break;
      }
    }
    if (!done) {
      throw new Error(
        `${rel}: THEME_ORDER insert failed\n${orderBlock.slice(-160)}`
      );
    }
  }

  fs.writeFileSync(p, s);
  const ok = /THEME_ORDER[\s\S]*?"advice"/.test(s);
  console.log(`${rel}: +${n} · ORDER advice=${ok}`);
}

for (const f of files) patch(f);
console.log("ThemeSm54a advice chip patch OK");

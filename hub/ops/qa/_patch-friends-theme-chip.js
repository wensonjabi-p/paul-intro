/**
 * ThemeSm50a — enable friends theme chip (i18n + THEME_ORDER) across 8 games.
 * Canon: KO 친구 / ZH 朋友 / EN Friends. Distinct from celebration/family.
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

  if (!s.includes('theme_friends: "Friends"')) {
    if (!s.includes('theme_rules: "Rules",')) throw new Error(`${rel}: missing EN theme_rules`);
    s = s.replace('theme_rules: "Rules",', 'theme_rules: "Rules",\n      theme_friends: "Friends",');
    n++;
  }
  if (!s.includes('theme_friends: "친구"')) {
    if (!s.includes('theme_rules: "규칙",')) throw new Error(`${rel}: missing KO theme_rules`);
    s = s.replace('theme_rules: "규칙",', 'theme_rules: "규칙",\n      theme_friends: "친구",');
    n++;
  }
  if (!s.includes('theme_friends: "朋友"')) {
    if (!s.includes('theme_rules: "规则",')) throw new Error(`${rel}: missing ZH theme_rules`);
    s = s.replace('theme_rules: "规则",', 'theme_rules: "规则",\n      theme_friends: "朋友",');
    n++;
  }

  const orderBlock = s.match(/THEME_ORDER[\s\S]*?\];/)?.[0] || "";
  if (!/"friends"/.test(orderBlock)) {
    if (s.includes('"rules", "intermediate"')) {
      s = s.replace('"rules", "intermediate"', '"rules", "friends", "intermediate"');
      n++;
    } else if (s.includes('"rules", "intermediate",')) {
      s = s.replace('"rules", "intermediate",', '"rules", "friends", "intermediate",');
      n++;
    } else if (s.includes('"rules",\n    "lang",')) {
      s = s.replace('"rules",\n    "lang",', '"rules",\n    "friends",\n    "lang",');
      n++;
    } else {
      throw new Error(`${rel}: THEME_ORDER insert failed\n${orderBlock.slice(-160)}`);
    }
  }

  fs.writeFileSync(p, s);
  const ok = /THEME_ORDER[\s\S]*?"friends"/.test(s);
  console.log(`${rel}: +${n} · ORDER friends=${ok}`);
}

for (const f of files) patch(f);
console.log("ThemeSm50a patch OK");

/**
 * ThemeSm52a — finish apology labels on remaining games.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../../app/games");

function patchFile(rel, nextEnKey) {
  const p = path.join(root, rel);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes('theme_apology:')) {
    console.log("already", rel);
    return true;
  }
  const nl = s.includes("\r\n") ? "\r\n" : "\n";
  const re = (enKey) =>
    new RegExp(
      `theme_personality: "Personality",${nl}(\\s*)theme_${enKey}:`
    );

  // Detect next key after personality in EN block
  const m = s.match(
    new RegExp(`theme_personality: "Personality",${nl}(\\s*)theme_([a-z]+):`)
  );
  if (!m) {
    console.error("no next key", rel);
    return false;
  }
  const indent = m[1];
  const nextKey = m[2];
  if (nextEnKey && nextKey !== nextEnKey) {
    console.error("unexpected next", rel, nextKey, "want", nextEnKey);
    return false;
  }

  s = s.replace(
    new RegExp(`theme_personality: "Personality",${nl}${indent}theme_${nextKey}:`),
    `theme_personality: "Personality",${nl}${indent}theme_apology: "Apology",${nl}${indent}theme_${nextKey}:`
  );
  s = s.replace(
    new RegExp(`theme_personality: "성격",${nl}${indent}theme_`),
    `theme_personality: "성격",${nl}${indent}theme_apology: "미안",${nl}${indent}theme_`
  );
  s = s.replace(
    new RegExp(`theme_personality: "性格",${nl}${indent}theme_`),
    `theme_personality: "性格",${nl}${indent}theme_apology: "抱歉",${nl}${indent}theme_`
  );

  // THEME_ORDER
  if (/"personality", "intermediate"/.test(s)) {
    s = s.replace(/"personality", "intermediate"/, '"personality", "apology", "intermediate"');
  } else if (new RegExp(`"personality",${nl}\\s*"intermediate"`).test(s)) {
    s = s.replace(
      new RegExp(`"personality",${nl}(\\s*)"intermediate"`),
      `"personality",${nl}$1"apology",${nl}$1"intermediate"`
    );
  } else if (new RegExp(`"personality",${nl}\\s*"lang"`).test(s)) {
    s = s.replace(
      new RegExp(`"personality",${nl}(\\s*)"lang"`),
      `"personality",${nl}$1"apology",${nl}$1"lang"`
    );
  } else {
    // listen etc — personality then maybe something else in ORDER
    s = s.replace(
      new RegExp(`"personality",${nl}(\\s*)"intermediate"`),
      `"personality",${nl}$1"apology",${nl}$1"intermediate"`
    );
    s = s.replace(
      /"friends", "personality", "intermediate"/,
      '"friends", "personality", "apology", "intermediate"'
    );
    // last resort: insert after "personality" once in THEME_ORDER region
    if (!/"apology"/.test(s)) {
      s = s.replace(/"personality"/, '"personality", "apology"');
    }
  }

  if (!s.includes('theme_apology: "미안"') || !/"apology"/.test(s)) {
    console.error("FAIL verify", rel);
    return false;
  }
  fs.writeFileSync(p, s);
  console.log("patched", rel, "next=", nextKey);
  return true;
}

let ok = true;
ok = patchFile("bingo-board/bingo.js") && ok;
ok = patchFile("listen-match/match.js") && ok;
ok = patchFile("dictation/dictation.js") && ok;
if (!ok) process.exit(1);
console.log("remaining apology patches OK");

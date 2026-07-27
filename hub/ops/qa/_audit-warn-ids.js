const fs = require("fs");
const games = [
  "particle-beginner",
  "dictation-beginner",
  "telephone-beginner",
  "word-scramble-beginner",
  "cloze-beginner",
  "bingo-beginner",
  "listen-match-beginner",
  "speed-quiz-beginner",
];
for (const g of games) {
  const j = JSON.parse(fs.readFileSync("hub/app/data/games/" + g + ".json", "utf8"));
  const items = j.items || [];
  const warnItems = items.filter((it) => Array.isArray(it.tags) && it.tags.includes("warn"));
  const last = items[items.length - 1];
  console.log(
    g,
    "n=" + items.length,
    "warnTagged=" + warnItems.length,
    "lastId=" + (last && last.id),
    "ver=" + j.version,
    "themesWarn=" + (Array.isArray(j.themes) && j.themes.includes("warn"))
  );
  if (warnItems.length) {
    warnItems.slice(0, 3).forEach((it) => {
      console.log(
        "  ",
        it.id,
        it.full || it.text || it.word || it.template || (it.tokens && it.tokens.join(" "))
      );
    });
    if (warnItems.length > 3) console.log("  ... +" + (warnItems.length - 3));
  }
  console.log("  note=", (j.note || "").slice(0, 180));
}

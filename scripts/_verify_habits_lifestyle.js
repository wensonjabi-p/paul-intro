const fs = require("fs");
const pack = require("../hub/app/data/vocab/jabi-theme-packs-intermediate.json");
const speed = require("../hub/app/data/games/speed-quiz-beginner.json");
const p = pack.packs.find((x) => x.id === "habits-lifestyle");
const lemmas = p.items.map((i) => i.lemma);
const habit = speed.items.filter((i) => (i.tags || []).includes("habit"));
const all = new Set();
for (const x of pack.packs) {
  if (x.id === "habits-lifestyle") continue;
  for (const it of x.items) all.add(it.lemma);
}
const overlap = lemmas.filter((l) => all.has(l));
const js = fs.readFileSync("hub/app/games/speed-quiz/speed.js", "utf8");
console.log(
  JSON.stringify(
    {
      ver: pack.version,
      packs: pack.packs.length,
      items: pack.packs.reduce((n, pk) => n + pk.items.length, 0),
      lemmaN: lemmas.length,
      lemmas,
      speedVer: speed.version,
      speedN: speed.items.length,
      habitTagged: habit.length,
      themesHas: speed.themes.includes("habit"),
      overlap,
      labelKo: js.includes('theme_habit: "습관"'),
      labelZh: js.includes('theme_habit: "习惯"'),
      order: /"habit"/.test(js),
      effortEn: p.items[1].example.en,
      lastSpeed: habit.map((i) => i.id),
    },
    null,
    2
  )
);

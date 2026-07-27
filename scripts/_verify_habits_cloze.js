const cloze = require("../hub/app/data/games/cloze-beginner.json");
const js = require("fs").readFileSync(
  require("path").join(__dirname, "../hub/app/games/cloze-race/cloze.js"),
  "utf8"
);
const habit = cloze.items.filter((i) => (i.tags || []).includes("habit"));
const both = (a, b) =>
  cloze.items.filter((i) => {
    const t = i.tags || [];
    return t.includes(a) && t.includes(b);
  }).length;
console.log(
  JSON.stringify(
    {
      version: cloze.version,
      count: cloze.items.length,
      habitTagged: habit.length,
      themesHas: cloze.themes.includes("habit"),
      ids: habit.map((i) => i.id),
      prefer: habit
        .filter((i) => /포기|웃음/.test(i.full || ""))
        .map((i) => i.full),
      bothRoutine: both("habit", "routine"),
      bothChange: both("habit", "change"),
      bothMotion: both("habit", "motion"),
      bothClinic: both("habit", "clinic"),
      labelKo: /theme_habit:\s*"습관"/.test(js),
      labelZh: /theme_habit:\s*"习惯"/.test(js),
      labelEn: /theme_habit:\s*"Habit"/.test(js),
      order: /"habit"/.test(js),
    },
    null,
    2
  )
);

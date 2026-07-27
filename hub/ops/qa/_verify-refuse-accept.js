const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "../../..");
const i = require(path.join(root, "hub/app/data/vocab/jabi-theme-packs-intermediate.json"));
const s = require(path.join(root, "hub/app/data/games/speed-quiz-beginner.json"));
const last = i.packs[i.packs.length - 1];
const js = fs.readFileSync(path.join(root, "hub/app/games/speed-quiz/speed.js"), "utf8");
console.log({
  version: i.version,
  pack: last.id,
  packLemmas: last.items.length,
  lemmas: last.items.map((x) => x.lemma).join("·"),
  copyrightRefuse: i.copyright.includes("Refuse-accept"),
  inspiredRefuse: i.inspiredBy.includes("refuse-accept"),
  sqVersion: s.version,
  sqTotal: s.items.length,
  refuseTagged: s.items.filter((x) => (x.tags || []).includes("refuse")).length,
  themeOrderRefuse: js.includes('"refuse"'),
  labelKo: js.includes('theme_refuse: "거절"'),
  labelZh: js.includes('theme_refuse: "拒绝"'),
  labelEn: js.includes('theme_refuse: "Refuse"'),
});

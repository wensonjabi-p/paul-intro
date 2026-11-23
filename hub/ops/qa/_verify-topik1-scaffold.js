const fs = require("fs");
const files = [
  "verified-listen-01.json",
  "verified-listen-02.json",
  "verified-read-01.json",
  "verified-read-02.json",
  "verified-read-03.json",
  "verified-read-04.json",
];
function isSpoiler(line, spoilers) {
  const s = String(line || "").trim();
  if (!s) return false;
  if (/^\s*(Match|답|对应|Answer)\s*[:：]/.test(s)) return true;
  if (/(?:^|[.\s])(?:Match|답|对应)\s*[:：]/.test(s)) return true;
  if (/^\s*answer\s*[:：]/i.test(s)) return true;
  for (const sp of spoilers) {
    if (!sp) continue;
    if (sp.length <= 2) {
      if (s.includes(sp) && /(?:답|Match|对应|→\s*use|골라|정답)/.test(s)) return true;
      continue;
    }
    if (s.includes(sp)) return true;
  }
  return false;
}
let empty = 0;
let partial = 0;
let keyBad = 0;
for (const f of files) {
  const j = JSON.parse(fs.readFileSync("hub/app/data/" + f, "utf8"));
  (j.questions || []).forEach((q) => {
    const ans = String(q.choices[q.answer] || "").trim();
    const at = String(q.answerText || "").trim();
    if (at !== ans) {
      keyBad++;
      console.log("KEY", f, q.id, at, ans);
    }
    const spoilers = [at, ans].filter(Boolean);
    for (const l of ["en", "ko", "zh"]) {
      const steps = (q.hint && q.hint.steps && q.hint.steps[l]) || [];
      const early = steps.slice(0, 2).filter((line) => !isSpoiler(line, spoilers));
      if (early.length === 0) {
        empty++;
        console.log("EMPTY", f, q.id, l);
        steps.slice(0, 2).forEach((s) => console.log(" ", s));
      } else if (early.length < Math.min(2, steps.length)) {
        partial++;
        console.log("PARTIAL", f, q.id, l, early);
      }
    }
  });
}
console.log(JSON.stringify({ empty, partial, keyBad }));

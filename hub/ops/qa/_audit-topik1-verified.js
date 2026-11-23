const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../../app/data");
const files = [
  "verified-listen-01.json",
  "verified-listen-02.json",
  "verified-read-01.json",
  "verified-read-02.json",
  "verified-read-03.json",
  "verified-read-04.json",
];
const normRe =
  /아니어요|되요|안되요|안 되요|할께요|하겟습니다|입니다요|예요요|뭐에요(?![요])|돼어요|안되어요|않이에요|할께 |할께\.|할께!/g;
const issues = [];

function choiceKo(c) {
  if (c == null) return "";
  if (typeof c === "string") return c;
  return String(c.ko || c.text || c.label || "");
}

function walkStrings(obj, fn, trail) {
  if (obj == null) return;
  if (typeof obj === "string") {
    fn(obj, trail);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkStrings(v, fn, trail + "[" + i + "]"));
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) walkStrings(v, fn, trail + "." + k);
  }
}

for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const qs = j.questions || [];
  console.log("\n===" + f + " q=" + qs.length + "===");
  qs.forEach((q) => {
    const choices = q.choices || [];
    if (choices.length !== 4) issues.push(f + ":" + q.id + " choices=" + choices.length);
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= choices.length) {
      issues.push(f + ":" + q.id + " bad answer idx " + q.answer);
    } else {
      const ansKo = choiceKo(choices[q.answer]);
      const at = String(q.answerText || "").trim();
      if (at && ansKo && at !== ansKo) {
        // allow answerText as short form contained in choice
        if (!ansKo.includes(at) && !at.includes(ansKo)) {
          issues.push(
            f + ":" + q.id + " answerText!=choice[" + q.answer + "]: [" + at + "] vs [" + ansKo + "]"
          );
        }
      }
    }
    choices.forEach((c, ci) => {
      if (c && typeof c === "object") {
        if (!c.ko) issues.push(f + ":" + q.id + " choice" + ci + " missing ko");
        if (!c.en) issues.push(f + ":" + q.id + " choice" + ci + " missing en");
        if (!c.zh) issues.push(f + ":" + q.id + " choice" + ci + " missing zh");
      }
    });
    ["prompt", "why"].forEach((field) => {
      const p = q[field];
      if (p && typeof p === "object") {
        ["en", "ko", "zh"].forEach((l) => {
          if (!p[l]) issues.push(f + ":" + q.id + " " + field + " missing " + l);
        });
      }
    });
    const h = q.hint;
    if (h && h.steps && typeof h.steps === "object" && !Array.isArray(h.steps)) {
      ["en", "ko", "zh"].forEach((l) => {
        const list = h.steps[l];
        if (!Array.isArray(list) || list.length < 2) {
          issues.push(f + ":" + q.id + " hint.steps." + l + " short/missing");
          return;
        }
        // early Meaning/Look should not contain Match:/답:
        list.slice(0, 2).forEach((line, si) => {
          if (/(?:Match|답|对应)\s*[:：]/i.test(String(line))) {
            issues.push(f + ":" + q.id + " early steps." + l + "[" + si + "] spoiler");
          }
        });
      });
    }
    walkStrings(q, (s, trail) => {
      let m;
      normRe.lastIndex = 0;
      while ((m = normRe.exec(s))) {
        issues.push(f + ":" + q.id + " norm [" + m[0] + "] @" + trail);
      }
    }, "q");
  });
}
console.log("\n---ISSUES (" + issues.length + ")---");
issues.forEach((i) => console.log(i));

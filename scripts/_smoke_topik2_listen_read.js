/**
 * Smoke: TOPIK II listen/read banks + manifest wiring.
 * Run: node scripts/_smoke_topik2_listen_read.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "hub", "app", "data", "topik2");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "track-manifest.json"), "utf8"));

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const listenUnits = [
  { id: "topik2-listen", file: "draft-listen-01.json", q: 4 },
  { id: "topik2-listen-02", file: "draft-listen-02.json", q: 4 },
  { id: "topik2-listen-03", file: "draft-listen-03.json", q: 4 },
  { id: "topik2-listen-04", file: "draft-listen-04.json", q: 4 },
];
const readUnits = [
  { id: "topik2-read", file: "draft-read-01.json", q: 4 },
  { id: "topik2-read-02", file: "draft-read-02.json", q: 4 },
  { id: "topik2-read-03", file: "draft-read-03.json", q: 4 },
  { id: "topik2-read-04", file: "draft-read-04.json", q: 4 },
];
const writeUnits = [
  { id: "topik2-write-51", file: "draft-write-51.json", q: 4 },
  { id: "topik2-write-52", file: "draft-write-52.json", q: 4 },
  { id: "topik2-write-53", file: "draft-write-53.json", q: 3 },
  { id: "topik2-write-54", file: "draft-write-54.json", q: 3 },
];

const allQs = [];

for (const spec of [...listenUnits, ...readUnits]) {
  const unit = manifest.units.find((u) => u.id === spec.id);
  if (!unit || unit.status !== "pilot" || !unit.bankFile) {
    fail(`${spec.id} unit not pilot`);
  }
  if (!unit.bankFile.includes(spec.file.replace(".json", ""))) {
    fail(`${spec.id} bankFile mismatch: ${unit.bankFile}`);
  }
  const bank = JSON.parse(fs.readFileSync(path.join(root, spec.file), "utf8"));
  if (bank.questions?.length !== spec.q) {
    fail(`${spec.file} Q count ${bank.questions?.length}`);
  }
  if (unit.questionCount !== bank.questions.length) {
    fail(`${spec.id} questionCount ${unit.questionCount} != bank ${bank.questions.length}`);
  }
  allQs.push(...bank.questions);
}

for (const spec of writeUnits) {
  const unit = manifest.units.find((u) => u.id === spec.id);
  if (!unit || unit.status !== "pilot" || !unit.bankFile) {
    fail(`${spec.id} write unit not pilot`);
  }
  const bank = JSON.parse(fs.readFileSync(path.join(root, spec.file), "utf8"));
  if (bank.questions?.length !== spec.q) {
    fail(`${spec.file} Q count ${bank.questions?.length}`);
  }
  if (unit.questionCount !== bank.questions.length) {
    fail(`${spec.id} questionCount ${unit.questionCount} != bank ${bank.questions.length}`);
  }
  if (!bank.scoring?.traits) fail(`${spec.file} missing scoring.traits`);
}

for (const q of allQs) {
  if (!Array.isArray(q.choices) || q.choices.length < 2) fail(`${q.id} choices`);
  if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.choices.length) {
    fail(`${q.id} answer index`);
  }
  if (!q.prompt?.ko) fail(`${q.id} prompt.ko`);
  if (!q.why?.ko && !q.why?.en) fail(`${q.id} why`);
  if (q.hint?.ko && /^(Match:|답:)/i.test(String(q.hint.ko).trim())) {
    fail(`${q.id} spoiling early hint`);
  }
  const steps = q.hint?.steps;
  if (steps) {
    for (const lang of ["en", "ko", "zh"]) {
      const arr = steps[lang];
      if (!Array.isArray(arr)) continue;
      for (let i = 0; i < Math.min(2, arr.length); i++) {
        if (/^(Match:|답:)/i.test(String(arr[i] || "").trim())) {
          fail(`${q.id} early steps[${i}] (${lang}) spoils with Match:/답:`);
        }
      }
    }
  }
}

for (const spec of listenUnits) {
  const bank = JSON.parse(fs.readFileSync(path.join(root, spec.file), "utf8"));
  for (const q of bank.questions) {
    if (!q.script?.ko) fail(`${q.id} script.ko`);
    if (/Closing합니다/i.test(q.script.ko)) fail(`${q.id} English leak in script`);
  }
}

const ids = allQs.map((q) => q.id);
if (new Set(ids).size !== ids.length) fail("duplicate question ids");

const leadKo = manifest.lead?.ko || "";
const leadEn = manifest.lead?.en || "";
if (/공식 TOPIK 점수/.test(leadKo)) {
  fail("manifest lead overclaims official score");
}
if (/풀.?104/.test(leadKo) && !/아님|아닌/.test(leadKo)) {
  fail("manifest lead overclaims full mock");
}
if (!/형성/.test(leadKo)) fail("manifest lead missing formative mention");
if (!/아님|아닌|Not a full/i.test(leadKo + " " + leadEn)) {
  fail("manifest lead should deny full official mock");
}

const js = fs.readFileSync(path.join(__dirname, "..", "hub", "app", "topik2", "topik2.js"), "utf8");
if (!js.includes("isMcqType") || !js.includes("onChoose")) fail("topik2.js missing MCQ helpers");
if (!js.includes("scoreSubmission") || !js.includes("fuzzyClozeMatch")) {
  fail("topik2.js missing formative scoring helpers");
}
const html = fs.readFileSync(path.join(__dirname, "..", "hub", "app", "topik2", "index.html"), "utf8");
if (!html.includes("topik2-choices") || !html.includes("topik2-script-wrap")) {
  fail("index.html missing MCQ/script chrome");
}
if (!html.includes("topik2FormativeDisclaimer") && !html.includes("형성")) {
  fail("index.html missing formative disclaimer hook");
}

const i18n = fs.readFileSync(path.join(__dirname, "..", "hub", "js", "i18n.js"), "utf8");
if (!i18n.includes("doorTopik2Desc") || !/형성 점수|formative writing score|形成性分数/.test(i18n)) {
  fail("hub i18n doorTopik2Desc not updated");
}

console.log(
  "OK: listen 01–04 (16Q) + read 01–04 (16Q) + write 51–54 (14Q) + formative chrome + door copy"
);

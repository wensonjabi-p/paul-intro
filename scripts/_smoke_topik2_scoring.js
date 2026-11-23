/** Smoke: TOPIK II formative partial credit (no Lemon). Run: node scripts/_smoke_topik2_scoring.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "hub/app/topik2/topik2.js"), "utf8");
const sandbox = {
  window: { HubI18n: null },
  document: {
    addEventListener() {},
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
  },
  localStorage: {
    getItem() {
      return "ko";
    },
  },
  console,
  location: { href: "http://localhost/hub/app/topik2/" },
  URL,
  fetch: async () => ({ ok: false }),
  setTimeout,
};

const needle = 'document.addEventListener("DOMContentLoaded"';
const inject =
  "window.__TOPIK2_TEST__ = { scoreSubmission, fuzzyClozeMatch };\n" + needle;
if (!src.includes(needle)) {
  console.error("FAIL: DOMContentLoaded hook not found");
  process.exit(1);
}
vm.createContext(sandbox);
vm.runInContext(src.replace(needle, inject), sandbox);
const api = sandbox.window.__TOPIK2_TEST__;
if (!api?.scoreSubmission) {
  console.error("FAIL: scoreSubmission not exported");
  process.exit(1);
}

const bank51 = JSON.parse(fs.readFileSync(path.join(root, "hub/app/data/topik2/draft-write-51.json"), "utf8"));
const bank53 = JSON.parse(fs.readFileSync(path.join(root, "hub/app/data/topik2/draft-write-53.json"), "utf8"));
const q51 = bank51.questions[0];
const q53 = bank53.questions[0];

function show(label, score) {
  console.log(
    label,
    "=> composite",
    score.composite,
    "C",
    score.traits.content,
    "L",
    score.traits.language,
    "tier",
    score.fuzzyTier || "-",
    "ok",
    score.ok
  );
}

console.log("--- Q51 partial credit ---");
[
  ["exact", "해 주십시오"],
  ["space", "해주십시오"],
  ["accepted-casual", "해 주세요"],
  ["near-typo", "해 주십시요"],
  ["meaningful-wrong", "공부하십시오"],
  ["empty", ""],
].forEach(([name, ans]) => show(name, api.scoreSubmission(bank51, q51, ans)));

const essayShort =
  "2018년 28%에서 2024년 41%로 증가했습니다. 특히 2021년 이후 늘었습니다. 건강에 대한 관심이 커졌기 때문입니다.";
const essayPartial = "운동하는 사람이 늘었어요.";
console.log("--- Q53 continuum ---");
show("solid", api.scoreSubmission(bank53, q53, essayShort));
show("weak-casual", api.scoreSubmission(bank53, q53, essayPartial));

const near = api.scoreSubmission(bank51, q51, "해 주십시요");
const wrong = api.scoreSubmission(bank51, q51, "공부하십시오");
const empty = api.scoreSubmission(bank51, q51, "");
const exact = api.scoreSubmission(bank51, q51, "해 주십시오");
let fail = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error("ASSERT", msg);
    fail++;
  }
}
assert(exact.composite >= 95, "exact high");
assert(near.composite > 20 && near.composite < 95, "near mid " + near.composite);
assert(wrong.composite > 0 && wrong.composite < 80, "meaningful partial " + wrong.composite);
assert(empty.composite === 0, "empty 0");
assert(api.scoreSubmission(bank53, q53, essayPartial).composite > 0, "q53 weak not zero");
console.log(fail ? "SMOKE FAIL " + fail : "SMOKE OK");
process.exit(fail ? 1 : 0);

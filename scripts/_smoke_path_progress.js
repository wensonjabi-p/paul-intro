/** Smoke: jabi hangul/basic path progress + crowns (does not touch topik-coach-v1). */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
for (const f of [
  "hub/app/js/path-progress.js",
  "hub/app/hangul/hangul.js",
  "hub/app/basic/basic.js",
  "hub/app/topik2/topik2.js",
]) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  try {
    // eslint-disable-next-line no-new-func
    new Function(src);
    console.log("syntax OK", f);
  } catch (e) {
    console.error("syntax FAIL", f, e.message);
    process.exit(1);
  }
}

const store = Object.create(null);
global.localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
  setItem: (k, v) => {
    store[k] = String(v);
  },
  removeItem: (k) => {
    delete store[k];
  },
};
global.window = global;

require(path.join(root, "hub/app/js/path-progress.js"));
const P = global.JabiPathProgress;

if (P.KEYS.hangul !== "jabi.hangul.v1" || P.KEYS.basic !== "jabi.basic.v1") {
  throw new Error("KEYS map");
}
if (P.keyFor("hangul") !== "jabi.hangul.v1") throw new Error("hangul key");
if (P.keyFor("basic") !== "jabi.basic.v1") throw new Error("basic key");
let threw = false;
try {
  P.keyFor("topik2");
} catch {
  threw = true;
}
if (!threw) throw new Error("topik2 must not be a path-progress track");
if (P.MAX_CROWNS !== 3 || P.XP_CROWN !== 3) throw new Error("crown constants");

store["topik-coach-v1"] = JSON.stringify({ xp: 999, sentinel: true });

let r = P.completeSkill("hangul", "hangul-00");
if (r.gained !== 10 || r.already || r.crowns !== 1 || !r.crownUp || P.getXp("hangul") !== 10) {
  throw new Error("first complete");
}
if (P.getCrowns("hangul", "hangul-00") !== 1) throw new Error("crowns=1");

r = P.completeSkill("hangul", "");
if (r.gained !== 0 || r.crowns !== 0 || P.getXp("hangul") !== 10) throw new Error("empty id");

r = P.completeSkill("hangul", "hangul-00");
if (r.gained !== 0 || !r.already || r.crowns !== 2 || r.crownXp !== 3 || P.getXp("hangul") !== 13) {
  throw new Error("crown 2 bump");
}

r = P.completeSkill("hangul", "hangul-00");
if (r.crowns !== 3 || r.crownXp !== 3 || P.getXp("hangul") !== 16) throw new Error("crown 3 bump");

r = P.completeSkill("hangul", "hangul-00");
if (r.crowns !== 3 || r.crownXp !== 0 || r.crownUp || P.getXp("hangul") !== 16) {
  throw new Error("max crowns no XP spam");
}

r = P.completeCheckpoint("hangul", "hangul-00");
if (r.checkpointGained !== 5 || r.crowns !== 3 || r.crownXp !== 0 || P.getXp("hangul") !== 21) {
  throw new Error("checkpoint no crown bump");
}

/* Legacy done without crowns field → getCrowns = 1 */
store["jabi.basic.v1"] = JSON.stringify({
  xp: 10,
  skills: { "basic-01": { done: true, at: "2026-07-26" } },
});
if (P.getCrowns("basic", "basic-01") !== 1) throw new Error("legacy crowns");
r = P.completeSkill("basic", "basic-01");
if (r.crowns !== 2 || r.crownXp !== 3 || P.getXp("basic") !== 13) throw new Error("legacy bump");

const topik = JSON.parse(store["topik-coach-v1"]);
if (topik.xp !== 999 || !topik.sentinel) throw new Error("topik-coach-v1 mutated");

const hangulSrc = fs.readFileSync(path.join(root, "hub/app/hangul/hangul.js"), "utf8");
const basicSrc = fs.readFileSync(path.join(root, "hub/app/basic/basic.js"), "utf8");
const topik2Src = fs.readFileSync(path.join(root, "hub/app/topik2/topik2.js"), "utf8");
if (/units \(\$\{filled\} filled\)/.test(basicSrc)) {
  throw new Error("basic meta still uses filled debug line");
}
if (/unit\.status \|\| "scaffold"/.test(basicSrc)) {
  throw new Error("basic badge still leaks status");
}
if (/\$\{track\.id\}/.test(topik2Src)) {
  throw new Error("topik2 meta still leaks track.id");
}
if (/unit\.status \|\| "scaffold"/.test(topik2Src)) {
  throw new Error("topik2 badge still leaks status");
}
if (!/hangulBackBasic/.test(hangulSrc)) throw new Error("hangul nav i18n missing");
if (!/basicMetaPractice/.test(basicSrc)) throw new Error("basic meta i18n missing");
if (!/topik2MetaPractice/.test(topik2Src)) throw new Error("topik2 meta i18n missing");
if (/JabiPathProgress/.test(topik2Src)) throw new Error("topik2 must not consume path-progress");

console.log("smoke OK", {
  hangulKey: P.keyFor("hangul"),
  basicKey: P.keyFor("basic"),
  hangulXp: P.getXp("hangul"),
  hangulCrowns: P.getCrowns("hangul", "hangul-00"),
  basicXp: P.getXp("basic"),
  basicCrowns: P.getCrowns("basic", "basic-01"),
  keys: Object.keys(store),
});

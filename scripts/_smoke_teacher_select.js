/**
 * Smoke: 선생님 선택 (teach) report schema + seats + shell.
 * Run: node scripts/_smoke_teacher_select.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const teachDir = path.join(root, "hub/teach");
const dataDir = path.join(teachDir, "data");
const manifestPath = path.join(dataDir, "manifest.json");
const schemaPath = path.join(dataDir, "report-schema.json");

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

assert(fs.existsSync(path.join(teachDir, "index.html")), "teach index missing");
assert(fs.existsSync(path.join(teachDir, "teach.js")), "teach.js missing");
assert(fs.existsSync(path.join(teachDir, "teach.css")), "teach.css missing");
assert(fs.existsSync(manifestPath), "manifest missing");
assert(fs.existsSync(schemaPath), "report-schema missing");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
assert(manifest.schemaVersion === 1, "schemaVersion");
assert(manifest.trackId === "teacher-select", "trackId");
assert(manifest.status === "pilot", "status pilot");
assert(Array.isArray(manifest.seats) && manifest.seats.length >= 3, "need ≥3 seats");
assert(manifest.verifyPolicy && manifest.verifyPolicy.en && manifest.verifyPolicy.ko, "verifyPolicy");

const ids = new Set();
let hasAnchor = false;
for (const seat of manifest.seats) {
  assert(seat.id && seat.status, "seat id/status");
  assert(!ids.has(seat.id), "duplicate seat " + seat.id);
  ids.add(seat.id);
  assert(["anchor", "open", "waitlist"].includes(seat.status), "bad status " + seat.id);
  assert(seat.displayName && seat.displayName.en && seat.displayName.ko, "displayName " + seat.id);
  assert(Array.isArray(seat.focus) && seat.focus.length >= 1, "focus " + seat.id);

  if (seat.status === "anchor") {
    hasAnchor = true;
    assert(seat.credentialClaim && /한국어교원|2급/.test(JSON.stringify(seat.credentialClaim)), "anchor credential");
    assert(/Paul/i.test(JSON.stringify(seat.displayName)), "anchor is Paul");
  } else {
    assert(!seat.credentialClaim, "non-anchor must not invent credentials " + seat.id);
    assert(seat.verifyFilter || seat.status === "waitlist", "open/waitlist filter " + seat.id);
    // No fake university / star ratings in open seats
    const blob = JSON.stringify(seat);
    assert(!/Harvard|서울대|만점|⭐|★{2,}/i.test(blob), "marketing fluff " + seat.id);
  }
}
assert(hasAnchor, "need Paul anchor seat");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
assert(schema.schemaVersion === 1, "report schemaVersion");
assert(schema.id === "ai-learner-report", "report id");
assert(Array.isArray(schema.fields) && schema.fields.length >= 5, "report fields");

const indexHtml = fs.readFileSync(path.join(teachDir, "index.html"), "utf8");
assert(indexHtml.includes("teach.js"), "index wires teach.js");
assert(indexHtml.includes("HubI18nExtra"), "index HubI18nExtra");
assert(indexHtml.includes("teach-report"), "report mount");
assert(indexHtml.includes("teach-seats"), "seats mount");
assert(indexHtml.includes("teachPrivacy"), "index privacy string");
assert(indexHtml.includes("teachSparseHigh"), "sparseness i18n");
assert(!/topik-coach-v1 \(local\)|topik-coach-v1 \(로컬\)/.test(indexHtml), "UI source not raw LS key");

const teachJs = fs.readFileSync(path.join(teachDir, "teach.js"), "utf8");
assert(teachJs.includes("topik-coach-v1"), "reads coach LS key");
assert(teachJs.includes("tagStrengthRows") || teachJs.includes("weaknesses"), "builds from tags");
assert(teachJs.includes("toHandoffPacket"), "slim handoff packet");
assert(!/mode:\s*"\s*\+\s*state\.mode/.test(teachJs) && !teachJs.includes('"mode: " +'), "no raw mode: leak");
assert(!teachJs.includes("seat.id"), "no seat.id in mailto subject");
assert(teachJs.includes("teachPrivacy"), "privacy copy wired");

const fieldKeys = (schema.fields || []).map((f) => f.key);
assert(fieldKeys.includes("signals") && fieldKeys.includes("suggestedFocus"), "schema core fields");
assert(schema.tagRow && schema.tagRow.strengths && schema.tagRow.weaknesses, "tagRow shape documented");
assert(schema.escalationHints && schema.escalationHints.zh && schema.escalationHints.zh.length, "escalationHints zh");
assert(schema.privacy && schema.privacy.ko, "privacy i18n");

for (const seat of manifest.seats) {
  if (seat.booking === "waitlist") {
    assert(seat.mailtoSubject && !/seat-open|seat-waitlist/i.test(seat.mailtoSubject), "waitlist subject no raw id " + seat.id);
  }
  if (seat.booking === "mailto") {
    assert(seat.mailtoSubject && !/^jabi\. coach waitlist — seat-/i.test(seat.mailtoSubject), "mailto subject human " + seat.id);
  }
}

const i18n = fs.readFileSync(path.join(root, "hub/js/i18n.js"), "utf8");
assert(i18n.includes("선생님 선택"), "ko door title");
assert(i18n.includes("가짜 프로필") || i18n.includes("vetted seats"), "door desc research fill");

const hubIndex = fs.readFileSync(path.join(root, "hub/index.html"), "utf8");
assert(/doorTeachTitle[\s\S]*badgeScaffold/.test(hubIndex), "hub teach has Draft badge");

const appIndex = fs.readFileSync(path.join(root, "hub/app/index.html"), "utf8");
assert(appIndex.includes("../teach/") && appIndex.includes("meTeachHandoff"), "Me → teach CTA");

const research = path.join(root, "docs/research-teacher-select-content-fill-ko.md");
assert(fs.existsSync(research), "research doc missing");

console.log("OK teacher-select smoke:", manifest.seats.length, "seats · pilot · residual polish");

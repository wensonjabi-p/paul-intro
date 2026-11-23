/**
 * Smoke: 글모음 (text collection) manifest + 6 parallel posts + blog shell.
 * Run: node scripts/_smoke_geulmoeum.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const blogDir = path.join(root, "hub/blog");
const dataDir = path.join(blogDir, "data");
const manifestPath = path.join(dataDir, "manifest.json");

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

assert(fs.existsSync(path.join(blogDir, "index.html")), "blog index missing");
assert(fs.existsSync(path.join(blogDir, "blog.js")), "blog.js missing");
assert(fs.existsSync(path.join(blogDir, "blog.css")), "blog.css missing");
assert(fs.existsSync(manifestPath), "manifest missing");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
assert(manifest.schemaVersion === 1, "schemaVersion");
assert(manifest.trackId === "geulmoeum", "trackId");
assert(manifest.status === "pilot", "status pilot");
assert(Array.isArray(manifest.posts) && manifest.posts.length >= 6, "need ≥6 posts");

const ids = new Set();
for (const meta of manifest.posts) {
  assert(meta.id && meta.file, "post meta id/file");
  assert(!ids.has(meta.id), "duplicate id " + meta.id);
  ids.add(meta.id);

  const postPath = path.join(dataDir, meta.file);
  assert(fs.existsSync(postPath), "missing " + meta.file);
  const post = JSON.parse(fs.readFileSync(postPath, "utf8"));
  assert(post.id === meta.id, "id mismatch " + meta.id);
  assert(post.question && post.question.en && post.question.ko, "question EN/KO " + meta.id);
  assert(post.reading && post.reading.en && post.reading.ko, "reading EN/KO " + meta.id);
  assert(post.reading.en.length >= 120, "EN too short " + meta.id);
  assert(post.reading.ko.length >= 80, "KO too short " + meta.id);
  assert(!/commuter\?/.test(post.reading.en), "junk text in " + meta.id);
  assert(Array.isArray(post.keyPoints) && post.keyPoints.length >= 2, "keyPoints " + meta.id);
  assert(Array.isArray(post.examples) && post.examples.length >= 2, "examples " + meta.id);
  assert(post.practice && post.practice.href, "practice CTA " + meta.id);
  assert(
    !/#deck=/.test(post.practice.href),
    "practice CTA must not use stub #deck= hook " + meta.id
  );
  // Soft CTAs must resolve under hub/ (hash-only same-page links OK as ./#id).
  const href = post.practice.href;
  if (!href.startsWith("http") && !href.startsWith("./#") && !href.startsWith("#")) {
    const target = path.normalize(path.join(blogDir, href));
    const ok =
      fs.existsSync(target) ||
      fs.existsSync(path.join(target, "index.html")) ||
      fs.existsSync(target.replace(/[/\\]$/, "") + ".html");
    assert(ok, "practice href missing on disk " + meta.id + " → " + href);
  }
  assert(post.sourceNote && /original|원작|jabi/i.test(post.sourceNote), "sourceNote " + meta.id);
}

const indexHtml = fs.readFileSync(path.join(blogDir, "index.html"), "utf8");
assert(indexHtml.includes("blog.js"), "index wires blog.js");
assert(indexHtml.includes("HubI18nExtra"), "index HubI18nExtra");

const i18n = fs.readFileSync(path.join(root, "hub/js/i18n.js"), "utf8");
assert(i18n.includes("Text collection") || i18n.includes("doorReadTitle"), "hub door title");
assert(i18n.includes("학습자 질문"), "ko door desc");
assert(!/doorTopik2Desc: "[^"]*"\s*\n\s*doorRead/.test(i18n), "zh missing comma after topik2");

const research = path.join(root, "docs/research-geulmoeum-content-fill-ko.md");
assert(fs.existsSync(research), "research doc missing");

console.log("OK geulmoeum smoke:", manifest.posts.length, "posts · pilot");

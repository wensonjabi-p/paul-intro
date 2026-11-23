/** Smoke: Hangul skill-path pedagogy + UI badge rules (manifest v5+). */

const fs = require("fs");

const path = require("path");



const root = path.join(__dirname, "..");

const manifestPath = path.join(root, "hub/app/data/hangul/track-manifest.json");

const hangulJsPath = path.join(root, "hub/app/hangul/hangul.js");

const hangulCssPath = path.join(root, "hub/app/hangul/hangul.css");

const strokes13Path = path.join(root, "hub/app/assets/chars/strokes/jamo-strokes-13.json");

const strokesTensePath = path.join(

  root,

  "hub/app/assets/chars/strokes/jamo-strokes-tense.json"

);



const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const hangulJs = fs.readFileSync(hangulJsPath, "utf8");

const hangulCss = fs.readFileSync(hangulCssPath, "utf8");

const strokes13 = JSON.parse(fs.readFileSync(strokes13Path, "utf8"));

const strokesTense = JSON.parse(fs.readFileSync(strokesTensePath, "utf8"));



function fail(msg) {

  console.error("FAIL:", msg);

  process.exit(1);

}



try {

  // eslint-disable-next-line no-new-func

  new Function(hangulJs);

  console.log("syntax OK hub/app/hangul/hangul.js");

} catch (e) {

  fail(`hangul.js syntax: ${e.message}`);

}



if (m.version < 5) fail(`expected version >= 5, got ${m.version}`);

if (!Array.isArray(m.lessons) || m.lessons.length !== 18) {

  fail(`expected 18 lessons, got ${m.lessons?.length}`);

}



const byId = Object.fromEntries(m.lessons.map((l) => [l.id, l]));



/* Grouped preview chunks — not per-jamo 가나다-looking lists */

const expectPreview = {

  "hangul-00": ["아", "가", "강"],

  "hangul-01": ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅔ", "ㅐ"],

  "hangul-02": ["ㄴㅁㄹ", "ㄱㄷㅂ", "ㅅㅈ"],

  "hangul-03": ["ㅇ", "ㅎ", "가", "오", "하"],

  "hangul-05": ["ㄲ", "ㄸ", "ㅃ", "ㅆ"],

  "hangul-08": ["ㅘ", "ㅝ", "ㅟ", "ㅢ"],

  "hangul-13": ["ㄵ", "ㅄ", "ㄺ"],

};



for (const [id, want] of Object.entries(expectPreview)) {

  const got = byId[id]?.jamoPreview || [];

  if (JSON.stringify(got) !== JSON.stringify(want)) {

    fail(`${id} jamoPreview ${JSON.stringify(got)} !== ${JSON.stringify(want)}`);

  }

}



/* Joined card text must show pedagogical groups */

const preview02Joined = byId["hangul-02"].jamoPreview.join(" ");

if (preview02Joined !== "ㄴㅁㄹ ㄱㄷㅂ ㅅㅈ") {

  fail(`hangul-02 joined preview "${preview02Joined}"`);

}

if (preview02Joined === "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅈ" || preview02Joined.startsWith("ㄱ")) {

  fail("hangul-02 still looks 가나다-ordered");

}



/* 02 groups must be ㄴㅁㄹ → ㄱㄷㅂ → ㅅㅈ (not 가나다) */

const g2 = (byId["hangul-02"].groups || []).map((g) => (g.jamo || []).join(""));

if (g2.join("|") !== "ㄴㅁㄹ|ㄱㄷㅂ|ㅅㅈ") fail(`hangul-02 groups ${g2.join("|")}`);



/* ㅔㅐ stay with basic vowels, not diphthong lessons */

const d1 = byId["hangul-07"].jamoPreview.join("");

const d2 = byId["hangul-08"].jamoPreview.join("");

if (d1.includes("ㅔ") || d1.includes("ㅐ") || d2.includes("ㅔ") || d2.includes("ㅐ")) {

  fail("ㅔ/ㅐ leaked into diphthong previews");

}



/* ㅇㅎ join in practice 1, not basic consonants preview */

if (byId["hangul-02"].jamoPreview.join("").includes("ㅇ") || byId["hangul-02"].jamoPreview.join("").includes("ㅎ")) {

  fail("ㅇ/ㅎ should not be in hangul-02 preview");

}

if (!byId["hangul-03"].jamoPreview.includes("ㅇ") || !byId["hangul-03"].jamoPreview.includes("ㅎ")) {

  fail("ㅇ/ㅎ missing from hangul-03 preview");

}



/* ㅉ not advertised without stroke data */

if ((byId["hangul-05"].jamoPreview || []).includes("ㅉ")) fail("ㅉ in hangul-05 preview");

const g5 = (byId["hangul-05"].groups || []).flatMap((g) => g.jamo || []);

if (g5.includes("ㅉ")) fail("ㅉ in hangul-05 groups");



/* Trace modules only on stroke-backed lessons */

const TRACE_OK = new Set(["hangul-02", "hangul-04", "hangul-05"]);

for (const lesson of m.lessons) {

  const hasTrace = (lesson.modules || []).some((mod) => mod.type === "trace");

  if (hasTrace && !TRACE_OK.has(lesson.id)) {

    fail(`unexpected trace on ${lesson.id}`);

  }

  if (!hasTrace && TRACE_OK.has(lesson.id)) {

    fail(`missing trace on ${lesson.id}`);

  }

}



/* Stroke JSON inventory */

const NEED_13 = [

  "giyeok",

  "nieun",

  "digeut",

  "rieul",

  "mieum",

  "bieup",

  "siot",

  "ieung",

  "chieut",

  "kieuk",

  "tieut",

  "pieup",

  "hieut",

];

for (const k of NEED_13) {

  if (!strokes13[k]?.strokes?.length) fail(`missing usable strokes for ${k}`);

}

/* ㅂ: middle then bottom (blog 위→아래); bottom must stay Y-up low (not flipped). */
{
  const b = strokes13.bieup;
  if (!b || b.strokes.length !== 4) fail("bieup must have 4 strokes");
  const midMed = b.medians[2];
  const bottomMed = b.medians[3];
  const midY = midMed[0][1];
  const bottomY = bottomMed[0][1];
  if (midY < 350 || midY > 550) fail(`bieup stroke3 median Y=${midY} expected middle ~450`);
  if (bottomY > 300) fail(`bieup stroke4 median Y=${bottomY} should be bottom (~150), not top`);
  if (!hangulJs.includes("STROKE_ANIM_SPEED = 0.5") && !hangulJs.includes("strokeAnimationSpeed: STROKE_ANIM_SPEED")) {
    fail("Replay should use uniform STROKE_ANIM_SPEED 0.5");
  }
  if (!hangulJs.includes("delayBetweenStrokes: STROKE_DELAY_MS")) {
    fail("Replay should use uniform STROKE_DELAY_MS (not mixed per-stroke delays)");
  }
}

/* Continuous stroke tubes (no abutting rects `Z M`). Single HW visual (no CSS Gulim ghost). */
{
  const ringOk = new Set(["ieung"]);
  for (const k of NEED_13) {
    const strokes = strokes13[k].strokes || [];
    strokes.forEach((s, i) => {
      if (ringOk.has(k) || (k === "hieut" && i === 2)) return;
      if (/\bZ\s*M\b/i.test(s) || (s.match(/\bM\b/g) || []).length > 1) {
        fail(`${k}[${i}] must be one continuous outline (no mid-path Z M break)`);
      }
    });
  }
  if ((strokes13.rieul.strokes || []).length !== 3) fail("rieul must stay 3 strokes [기역, 긋고, 니은]");
  if ((strokes13.chieut.strokes || []).length !== 4) fail("chieut must be 4 strokes [모자+ㅈ]");
  if ((strokes13.mieum.strokes || []).length !== 3) fail("mieum must be 3 strokes [내리고, 기역, 닫고]");
  if ((strokes13.pieup.strokes || []).length !== 4) fail("pieup must be 4 strokes [긋고, 내×2, 닫고]");
  if ((strokes13.kieuk.strokes || []).length !== 2) fail("kieuk must be 2 strokes [기역, 닫기]");
  if ((strokes13.tieut.strokes || []).length !== 3) fail("tieut must be 3 strokes [긋고, 긋고, 니은]");
  const ieStart = strokes13.ieung.medians[0][0];
  if (ieStart[1] < 650) fail(`ieung median should start near top, got ${JSON.stringify(ieStart)}`);
  if (hangulJs.includes("hangul-practice-gulim-ref") || hangulCss.includes("hangul-practice-gulim-ref")) {
    fail("practice panel must not use floating Gulim CSS ghost (misaligns vs HW)");
  }
  if (!hangulJs.includes("hideOutline") || !hangulJs.includes("showOutline")) {
    fail("Replay should hideOutline; Trace should showOutline from same strokes[]");
  }
  if (!hangulJs.includes("STROKE_ANIM_SPEED") || !hangulJs.includes("STROKE_DELAY_MS")) {
    fail("uniform STROKE_ANIM_SPEED / STROKE_DELAY_MS required");
  }
  /* Hanzi Writer Chinese leftovers must stay neutralized in Hangul wrapper. */
  if (!hangulJs.includes("HANGUL_HW") || !hangulJs.includes("toHangulCharData")) {
    fail("missing HANGUL_HW / toHangulCharData Hangul-safe wrapper");
  }
  if (!hangulJs.includes("radStrokes: []") && !hangulJs.includes("radStrokes:[]")) {
    fail("charDataLoader must inject empty radStrokes (no Chinese radicals)");
  }
  if (!hangulJs.includes("strokeFadeDuration: 0") && !hangulJs.includes("strokeFadeDuration:0")) {
    fail("strokeFadeDuration must be 0 (avoid Chinese full-ink fade on Trace)");
  }
  if (!hangulJs.includes("radicalColor: null") && !hangulJs.includes("radicalColor:null")) {
    fail("radicalColor must be null for Hangul");
  }
  if (!hangulJs.includes("hideCharacter")) {
    fail("Trace/Replay should hideCharacter to avoid HW fade artifacts");
  }
  if (!hangulJs.includes('STROKE_DATA_V = "20260727c"') && !hangulJs.includes("STROKE_DATA_V = '20260727c'")) {
    fail("STROKE_DATA_V should be 20260727c after stroke tube joint polish");
  }
}

if (!strokes13.ji) fail("expected ji stub key to remain (denylisted in UI)");

if ((strokes13.ji.strokes || []).length !== 1) fail("ji stub shape changed unexpectedly");

/* Stub must not look like multi-stroke ㅈ */

if ((strokes13.ji.medians || []).length !== 1) fail("ji stub should stay 1-median denylist target");



for (const k of ["ssanggiyeok", "ssangdigeut", "ssangbieup", "ssangsiot"]) {

  if (!strokesTense[k]?.strokes?.length) fail(`missing tense strokes for ${k}`);

}

if (strokesTense.ssangjieut || strokes13.ssangjieut) fail("ㅉ stroke data must not appear yet");



/* UI: no pilot watermark on content cards / detail chrome */

if (hangulJs.includes('hangul-badge--ready">${lesson.status')) {

  fail("pilot/ready status still stamped on path cards");

}

if (/hangul-badge--ready.*lesson\.status/.test(hangulJs.replace(/\s+/g, ""))) {

  fail("status badge still wired");

}

const assign = hangulJs.match(/badge\s*=\s*`[^`]*hangul-badge--ready/);

if (assign) fail("still assigning hangul-badge--ready");

if (hangulCss.includes("hangul-badge--ready")) {

  fail("dead hangul-badge--ready CSS leftover");

}

if (!hangulJs.includes("STROKE_STUB_IDS") || !hangulJs.includes("lessonHasUsableStrokePractice")) {

  fail("missing stub denylist / usable-stroke badge gate");

}

if (!hangulJs.includes('"ji"') && !hangulJs.includes("'ji'")) {

  fail("ji stub not denylisted");

}

/* Detail must not echo lesson.status (pilot watermark in open card) */

if (/lesson\.status\s*\|\|/.test(hangulJs) && hangulJs.includes("lesson.status || \"\"")) {

  fail("lesson.status still rendered in detail chrome");

}

/* Path meta: no raw track.id watermark; css/js cache-bust without moving stroke tube token */

if (/meta\.textContent\s*=\s*`\$\{track\.id\}/.test(hangulJs)) {

  fail("hangul meta still stamps track.id");

}

if (hangulJs.includes("hangulKind:") || hangulJs.includes("hangulKind :")) {

  fail("hangulKind i18n leftover (kind/slug chrome removed)");

}

if (!hangulJs.includes("hangul-preview-tok")) {

  fail("path preview should render token spans for UX consistency");

}

if (!hangulJs.includes('STROKE_DATA_V = "20260727c"') && !hangulJs.includes("STROKE_DATA_V = '20260727c'")) {

  fail("STROKE_DATA_V must stay 20260727c (tube joint polish)");

}

const hangulIndex = fs.readFileSync(

  path.join(root, "hub/app/hangul/index.html"),

  "utf8"

);

if (!hangulIndex.includes("hangul.js?v=20260727d") || !hangulIndex.includes("hangul.css?v=20260727d")) {

  fail("hangul index should cache-bust css/js at 20260727d (stroke JSON stays 20260727c)");

}



/* 00 must not look like alphabet drill */

if (JSON.stringify(byId["hangul-00"].jamoPreview) === JSON.stringify(["가", "나", "다"])) {

  fail("hangul-00 still 가나다 preview");

}



/* 02 teach: 사/자 must not sit only inside the stops examples blob — dedicated ㅅㅈ block */

const mods02 = byId["hangul-02"].modules || [];

const exampleBlocks = mods02.filter((x) => x.type === "examples");

if (exampleBlocks.length < 3) {

  fail("hangul-02 should split soft / stops / ㅅㅈ example blocks");

}

const lastEx = exampleBlocks[exampleBlocks.length - 1];

const lastKos = (lastEx.items || []).map((i) => i.ko).join("|");

if (!lastKos.includes("사") || !lastKos.includes("자")) {

  fail("hangul-02 final examples should cover ㅅㅈ");

}

const stopEx = exampleBlocks[1];

const stopKos = (stopEx.items || []).map((i) => i.ko).join("|");

if (stopKos.includes("사") || stopKos.includes("자")) {

  fail("hangul-02 stops examples still mix 사/자");

}



console.log("smoke OK hangul path", {

  version: m.version,

  lessons: m.lessons.length,

  preview02: preview02Joined,

  preview00: byId["hangul-00"].jamoPreview.join(" "),

  traceLessons: [...TRACE_OK],

  strokeKeys13: NEED_13.length,

});



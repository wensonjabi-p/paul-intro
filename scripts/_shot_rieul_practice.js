/** Visual smoke: HW-only practice for key jamo (ㄹㄴㅋㅂㅇㅊㅌ). */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "hub/app/assets/chars/strokes");
const KEY = ["ㄹ", "ㄴ", "ㅋ", "ㅂ", "ㅇ", "ㅊ", "ㅌ"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 960, height: 900 } });

  // Static check page (HW outline only)
  const checkUrl =
    "file:///" +
    path.join(OUT, "_check-gulim.html").replace(/\\/g, "/");
  await page.goto(checkUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: path.join(OUT, "_check-hw-only-grid.png") });
  console.log("wrote _check-hw-only-grid.png");

  // Serve hub via file? Hangul needs relative assets — use simple static if available
  const hangulIndex = path.join(ROOT, "hub/app/hangul/index.html");
  if (!fs.existsSync(hangulIndex)) {
    console.log("skip hangul practice (no index)");
    await browser.close();
    return;
  }

  // Prefer localhost if Paul has server; else file URL may break fetch
  let ok = false;
  for (const base of ["http://127.0.0.1:8766/hangul/", "http://127.0.0.1:5500/hub/app/hangul/"]) {
    try {
      const res = await page.goto(base, { waitUntil: "networkidle", timeout: 4000 });
      if (res && res.ok()) {
        ok = true;
        console.log("hangul via", base);
        break;
      }
    } catch (_) {
      /* try next */
    }
  }
  if (!ok) {
    console.log("no local hangul server — grid shot only; start python -m http.server in hub/app");
    await browser.close();
    process.exit(0);
  }

  await page.waitForTimeout(1200);
  if ((await page.locator("#hangul-practice-gulim-ref").count()) > 0) {
    console.error("FAIL: gulim ghost still in DOM");
    process.exit(1);
  }

  for (const glyph of KEY) {
    const cells = page.locator(".hangul-trace-cell:not(.is-missing)");
    const n = await cells.count();
    let clicked = false;
    for (let i = 0; i < n; i++) {
      const t = await cells.nth(i).innerText();
      if (t.includes(glyph)) {
        await cells.nth(i).click();
        clicked = true;
        break;
      }
    }
    console.log(glyph, "clicked", clicked);
    await page.waitForTimeout(2800);
    const safe = { ㄹ: "rieul", ㄴ: "nieun", ㅋ: "kieuk", ㅂ: "bieup", ㅇ: "ieung", ㅊ: "chieut", ㅌ: "tieut" }[
      glyph
    ];
    await page.screenshot({ path: path.join(OUT, `_check-practice-${safe}.png`) });
    await page.locator("#hangul-practice-close").click().catch(() => {});
    await page.waitForTimeout(400);
  }

  await browser.close();
  console.log("visual practice shots OK");
})();

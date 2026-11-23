/* data.js / data.en.js / data.zh.js 무결성 검사.  사용법:  node scripts/check-content-data.js
   - 노드 id 중복/누락 필드/자기참조/끊어진 링크
   - thoughts 태그, combos id, openQuestions 노드 참조
   - 세 언어의 노드 id·type·links, thoughts id·tags, combos id 집합이 동일한지(다국어 패리티)
   - 들어오는 링크가 하나도 없는 'provenance' 노드(= 성좌에서 고립된 새 노드)
   - X 원글 URL(node.xUrls / thought.xUrl): @wensonjabi status URL 형식만 허용, 세 언어 동일 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
function load(file, name) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8') + ';this.__d=' + name, ctx);
  return ctx.__d;
}
const D = { ko: load('data.js', 'DATA'), en: load('data.en.js', 'DATA_EN'), zh: load('data.zh.js', 'DATA_ZH') };

const X_URL = /^https:\/\/x\.com\/wensonjabi\/status\/\d+$/;
let problems = 0;
const fail = msg => { problems++; console.error('FAIL', msg); };

for (const lang of Object.keys(D)) {
  const d = D[lang];
  const ids = d.nodes.map(n => n.id);
  const set = new Set(ids);
  console.log(`${lang}: nodes=${ids.length} thoughts=${d.thoughts.length} combos=${d.combos.length} contentAsOf=${d.profile.contentAsOf}`);
  ids.forEach((id, i) => { if (ids.indexOf(id) !== i) fail(`${lang} duplicate id ${id}`); });
  const incoming = {};
  d.nodes.forEach(n => {
    ['id', 'label', 'type', 'status', 'story'].forEach(f => { if (!n[f]) fail(`${lang} ${n.id} missing ${f}`); });
    (n.links || []).forEach(k => {
      if (k === n.id) fail(`${lang} self link ${n.id}`);
      else if (!set.has(k)) fail(`${lang} dangling link ${n.id} -> ${k}`);
      incoming[k] = (incoming[k] || 0) + 1;
    });
  });
  d.nodes.filter(n => n.provenance && !incoming[n.id]).forEach(n => fail(`${lang} isolated new node ${n.id}`));
  d.nodes.forEach(n => { if (n.xUrls !== undefined && (!Array.isArray(n.xUrls) || !n.xUrls.length || n.xUrls.some(u => !X_URL.test(u)))) fail(`${lang} ${n.id} invalid xUrls`); });
  d.thoughts.forEach(t => { if (t.xUrl !== undefined && !X_URL.test(t.xUrl)) fail(`${lang} thought ${t.id} invalid xUrl`); });
  d.thoughts.forEach(t => t.tags.forEach(k => { if (!set.has(k)) fail(`${lang} thought ${t.id} unknown tag ${k}`); }));
  d.combos.forEach(c => c.ids.forEach(k => { if (!set.has(k)) fail(`${lang} combo unknown id ${k}`); }));
  (d.openQuestions || []).forEach(q => { if (!set.has(q.node)) fail(`${lang} openQuestion unknown node ${q.node}`); });
}

const sig = (lang, fn) => JSON.stringify(D[lang].nodes.map(fn));
['en', 'zh'].forEach(l => {
  if (sig('ko', n => [n.id, n.type, n.status, (n.links || []).join(), (n.xUrls || []).join()]) !== sig(l, n => [n.id, n.type, n.status, (n.links || []).join(), (n.xUrls || []).join()])) fail(`ko/${l} node id/type/status/links mismatch`);
  const th = lang => JSON.stringify(D[lang].thoughts.map(t => [t.id, t.tags.join(), t.xUrl || '']));
  if (th('ko') !== th(l)) fail(`ko/${l} thoughts mismatch`);
  const cb = lang => JSON.stringify(D[lang].combos.map(c => [...c.ids].sort().join()));
  if (cb('ko') !== cb(l)) fail(`ko/${l} combos mismatch`);
  if (D.ko.profile.contentAsOf !== D[l].profile.contentAsOf) fail(`ko/${l} contentAsOf mismatch`);
});

console.log(problems ? `${problems} problem(s)` : 'OK: data integrity and multilingual parity');
process.exit(problems ? 1 : 0);

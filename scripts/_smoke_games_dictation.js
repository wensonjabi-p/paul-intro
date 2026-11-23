/**
 * Smoke: games manifest + dictation + cloze-race + particle-snap + speed-quiz + word-scramble + bingo-board + listen-match + telephone banks.
 * Run: node scripts/_smoke_games_dictation.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "hub/app/data/games/manifest.json");
const bankPath = path.join(root, "hub/app/data/games/dictation-beginner.json");
const clozePath = path.join(root, "hub/app/data/games/cloze-beginner.json");
const particlePath = path.join(root, "hub/app/data/games/particle-beginner.json");
const speedPath = path.join(root, "hub/app/data/games/speed-quiz-beginner.json");
const scramblePath = path.join(root, "hub/app/data/games/word-scramble-beginner.json");
const bingoPath = path.join(root, "hub/app/data/games/bingo-beginner.json");
const listenMatchPath = path.join(root, "hub/app/data/games/listen-match-beginner.json");
const telephonePath = path.join(root, "hub/app/data/games/telephone-beginner.json");
const dictationHtml = path.join(root, "hub/app/games/dictation/index.html");
const clozeHtml = path.join(root, "hub/app/games/cloze-race/index.html");
const clozeJs = path.join(root, "hub/app/games/cloze-race/cloze.js");
const clozeCss = path.join(root, "hub/app/games/cloze-race/cloze.css");
const particleHtml = path.join(root, "hub/app/games/particle-snap/index.html");
const particleJs = path.join(root, "hub/app/games/particle-snap/particle.js");
const particleCss = path.join(root, "hub/app/games/particle-snap/particle.css");
const speedHtml = path.join(root, "hub/app/games/speed-quiz/index.html");
const speedJs = path.join(root, "hub/app/games/speed-quiz/speed.js");
const speedCss = path.join(root, "hub/app/games/speed-quiz/speed.css");
const scrambleHtml = path.join(root, "hub/app/games/word-scramble/index.html");
const scrambleJs = path.join(root, "hub/app/games/word-scramble/scramble.js");
const scrambleCss = path.join(root, "hub/app/games/word-scramble/scramble.css");
const bingoHtml = path.join(root, "hub/app/games/bingo-board/index.html");
const bingoJs = path.join(root, "hub/app/games/bingo-board/bingo.js");
const bingoCss = path.join(root, "hub/app/games/bingo-board/bingo.css");
const listenMatchHtml = path.join(root, "hub/app/games/listen-match/index.html");
const listenMatchJs = path.join(root, "hub/app/games/listen-match/match.js");
const listenMatchCss = path.join(root, "hub/app/games/listen-match/match.css");
const telephoneHtml = path.join(root, "hub/app/games/telephone/index.html");
const telephoneJs = path.join(root, "hub/app/games/telephone/telephone.js");
const telephoneCss = path.join(root, "hub/app/games/telephone/telephone.css");
const gamesHtml = path.join(root, "hub/app/games/index.html");

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

assert(fs.existsSync(gamesHtml), "games index missing");
assert(fs.existsSync(dictationHtml), "dictation index missing");
assert(fs.existsSync(clozeHtml), "cloze-race index missing");
assert(fs.existsSync(clozeJs), "cloze.js missing");
assert(fs.existsSync(clozeCss), "cloze.css missing");
assert(fs.existsSync(particleHtml), "particle-snap index missing");
assert(fs.existsSync(particleJs), "particle.js missing");
assert(fs.existsSync(particleCss), "particle.css missing");
assert(fs.existsSync(speedHtml), "speed-quiz index missing");
assert(fs.existsSync(speedJs), "speed.js missing");
assert(fs.existsSync(speedCss), "speed.css missing");
assert(fs.existsSync(scrambleHtml), "word-scramble index missing");
assert(fs.existsSync(scrambleJs), "scramble.js missing");
assert(fs.existsSync(scrambleCss), "scramble.css missing");
assert(fs.existsSync(bingoHtml), "bingo-board index missing");
assert(fs.existsSync(bingoJs), "bingo.js missing");
assert(fs.existsSync(bingoCss), "bingo.css missing");
assert(fs.existsSync(listenMatchHtml), "listen-match index missing");
assert(fs.existsSync(listenMatchJs), "match.js missing");
assert(fs.existsSync(listenMatchCss), "match.css missing");
assert(fs.existsSync(telephoneHtml), "telephone index missing");
assert(fs.existsSync(telephoneJs), "telephone.js missing");
assert(fs.existsSync(telephoneCss), "telephone.css missing");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
assert(Array.isArray(manifest.games) && manifest.games.length >= 7, "manifest.games need >=7");
const dict = manifest.games.find((g) => g.id === "dictation");
assert(dict && (dict.status === "pilot" || dict.status === "live"), "dictation not pilot/live");
assert(dict.href === "./dictation/", "dictation href");

const cloze = manifest.games.find((g) => g.id === "cloze-race");
assert(cloze && (cloze.status === "pilot" || cloze.status === "live"), "cloze-race not pilot/live");
assert(cloze.href === "./cloze-race/", "cloze-race href");

const particle = manifest.games.find((g) => g.id === "particle-snap");
assert(particle && (particle.status === "pilot" || particle.status === "live"), "particle-snap not pilot/live");
assert(particle.href === "./particle-snap/", "particle-snap href");

const speed = manifest.games.find((g) => g.id === "speed-quiz");
assert(speed && (speed.status === "pilot" || speed.status === "live"), "speed-quiz not pilot/live");
assert(speed.href === "./speed-quiz/", "speed-quiz href");

const scramble = manifest.games.find((g) => g.id === "word-scramble");
assert(scramble && (scramble.status === "pilot" || scramble.status === "live"), "word-scramble not pilot/live");
assert(scramble.href === "./word-scramble/", "word-scramble href");

const bingo = manifest.games.find((g) => g.id === "bingo-board");
assert(bingo && (bingo.status === "pilot" || bingo.status === "live"), "bingo-board not pilot/live");
assert(bingo.href === "./bingo-board/", "bingo-board href");

const listenMatch = manifest.games.find((g) => g.id === "listen-match");
assert(listenMatch && (listenMatch.status === "pilot" || listenMatch.status === "live"), "listen-match not pilot/live");
assert(listenMatch.href === "./listen-match/", "listen-match href");

const telephone = manifest.games.find((g) => g.id === "telephone");
assert(telephone && (telephone.status === "pilot" || telephone.status === "live"), "telephone not pilot/live");
assert(telephone.href === "./telephone/", "telephone href");

const bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
assert(bank.audio?.mode === "tts", "audio mode tts");
assert(bank.source === "original-jabi", "must be original bank");
assert(Array.isArray(bank.items) && bank.items.length >= 20, "dictation need >=20 items (research-fill)");
assert(manifest.version >= 2, "games manifest version >= 2");
assert(!!manifest.research, "games manifest should cite research doc");
for (const it of bank.items) {
  assert(it.id && it.text, `item missing id/text: ${JSON.stringify(it)}`);
  assert(/[\uAC00-\uD7A3]/.test(it.text), `item ${it.id} should contain Hangul`);
}

const clozeBank = JSON.parse(fs.readFileSync(clozePath, "utf8"));
assert(clozeBank.source === "original-jabi", "cloze must be original bank");
assert(clozeBank.timer?.punish === false, "cloze timer must not punish");
assert(Array.isArray(clozeBank.items) && clozeBank.items.length >= 12, "cloze need >=12 items");
for (const it of clozeBank.items) {
  assert(it.id && it.template && it.full, `cloze item missing fields: ${it.id}`);
  assert(/\{0\}/.test(it.template), `cloze ${it.id} needs {0} blank`);
  assert(/[\uAC00-\uD7A3]/.test(it.full), `cloze ${it.id} full should contain Hangul`);
  let filled = it.template;
  it.answers.forEach((a, i) => {
    filled = filled.replace(`{${i}}`, a);
  });
  const norm = (s) =>
    String(s)
      .normalize("NFC")
      .replace(/[?？]/g, "")
      .replace(/\s+/g, "")
      .trim();
  assert(norm(filled) === norm(it.full), `cloze ${it.id} template+answers ≠ full (${filled} vs ${it.full})`);
}

const particleBank = JSON.parse(fs.readFileSync(particlePath, "utf8"));
assert(particleBank.source === "original-jabi", "particle must be original bank");
assert(particleBank.timer?.punish === false, "particle timer must not punish");
assert(Array.isArray(particleBank.items) && particleBank.items.length >= 16, "particle need >=16 items");
const allowedPairs = {
  topic: new Set(["은", "는"]),
  subject: new Set(["이", "가"]),
  object: new Set(["을", "를"]),
};
for (const it of particleBank.items) {
  assert(it.id && it.template && it.full && it.answer && it.pair, `particle item missing fields: ${it.id}`);
  assert(/\{0\}/.test(it.template), `particle ${it.id} needs {0} blank`);
  assert(allowedPairs[it.pair], `particle ${it.id} bad pair: ${it.pair}`);
  assert(allowedPairs[it.pair].has(it.answer), `particle ${it.id} answer not in pair`);
  assert(/[\uAC00-\uD7A3]/.test(it.full), `particle ${it.id} full should contain Hangul`);
  const filled = it.template.replace("{0}", it.answer);
  const norm = (s) =>
    String(s)
      .normalize("NFC")
      .replace(/[?？]/g, "")
      .replace(/\s+/g, "")
      .trim();
  assert(norm(filled) === norm(it.full), `particle ${it.id} template+answer ≠ full (${filled} vs ${it.full})`);
}

const speedBank = JSON.parse(fs.readFileSync(speedPath, "utf8"));
assert(speedBank.source === "original-jabi", "speed must be original bank");
assert(speedBank.timer?.punish === false, "speed timer must not punish");
assert(Array.isArray(speedBank.items) && speedBank.items.length >= 12, "speed need >=12 items");
for (const it of speedBank.items) {
  assert(it.id && it.prompt && Array.isArray(it.choices), `speed item fields: ${it.id}`);
  assert(it.choices.length >= 2, `speed ${it.id} choices`);
  assert(
    Number.isInteger(it.answer) && it.answer >= 0 && it.answer < it.choices.length,
    `speed ${it.id} answer idx`
  );
  const promptKo = typeof it.prompt === "object" ? it.prompt.ko || it.prompt.en : String(it.prompt);
  assert(promptKo && String(promptKo).length > 2, `speed ${it.id} prompt`);
}

const scrambleBank = JSON.parse(fs.readFileSync(scramblePath, "utf8"));
assert(scrambleBank.source === "original-jabi", "scramble must be original bank");
assert(scrambleBank.timer?.punish === false, "scramble timer must not punish");
assert(Array.isArray(scrambleBank.items) && scrambleBank.items.length >= 12, "scramble need >=12 items");
for (const it of scrambleBank.items) {
  assert(it.id && Array.isArray(it.tokens) && it.full, `scramble item fields: ${it.id}`);
  assert(it.tokens.length >= 2, `scramble ${it.id} need >=2 tokens`);
  assert(/[\uAC00-\uD7A3]/.test(it.full), `scramble ${it.id} full should contain Hangul`);
  const joined = it.tokens.join(" ");
  const norm = (s) =>
    String(s)
      .normalize("NFC")
      .replace(/[?？]/g, "")
      .replace(/\s+/g, "")
      .trim();
  assert(norm(joined) === norm(it.full), `scramble ${it.id} tokens ≠ full (${joined} vs ${it.full})`);
}

const bingoBank = JSON.parse(fs.readFileSync(bingoPath, "utf8"));
assert(bingoBank.source === "original-jabi", "bingo must be original bank");
assert(bingoBank.mode === "bingo", "bingo mode");
assert(bingoBank.freeCenter === true, "bingo freeCenter");
assert(Array.isArray(bingoBank.sizes) && bingoBank.sizes.includes(3) && bingoBank.sizes.includes(5), "bingo sizes 3/5");
assert(Array.isArray(bingoBank.items) && bingoBank.items.length >= 24, "bingo need >=24 words for 5x5");
const bingoWords = new Set();
for (const it of bingoBank.items) {
  assert(it.id && it.word, `bingo item fields: ${it.id}`);
  assert(/[\uAC00-\uD7A3]/.test(it.word), `bingo ${it.id} word should contain Hangul`);
  assert(it.gloss && (it.gloss.en || it.gloss.ko), `bingo ${it.id} gloss`);
  assert(!bingoWords.has(it.word), `bingo duplicate word: ${it.word}`);
  bingoWords.add(it.word);
}

const lmBank = JSON.parse(fs.readFileSync(listenMatchPath, "utf8"));
assert(lmBank.source === "original-jabi", "listen-match must be original bank");
assert(lmBank.mode === "listen-match", "listen-match mode");
assert(lmBank.audio?.mode === "tts", "listen-match audio tts");
assert(lmBank.timer?.punish === false, "listen-match must not punish");
assert(lmBank.choiceCount >= 2, "listen-match choiceCount");
assert(Array.isArray(lmBank.items) && lmBank.items.length >= 12, "listen-match need >=12 items");
const lmTexts = new Set();
for (const it of lmBank.items) {
  assert(it.id && it.text, `listen-match item fields: ${it.id}`);
  assert(/[\uAC00-\uD7A3]/.test(it.text), `listen-match ${it.id} text should contain Hangul`);
  assert(it.gloss && (it.gloss.en || it.gloss.ko), `listen-match ${it.id} gloss`);
  assert(!lmTexts.has(it.text), `listen-match duplicate text: ${it.text}`);
  lmTexts.add(it.text);
}

const telBank = JSON.parse(fs.readFileSync(telephonePath, "utf8"));
assert(telBank.source === "original-jabi", "telephone must be original bank");
assert(telBank.mode === "telephone", "telephone mode");
assert(telBank.timer?.punish === false, "telephone must not punish");
assert(telBank.scoring?.soft === true, "telephone soft scoring");
assert(Array.isArray(telBank.modes) && telBank.modes.includes("recall") && telBank.modes.includes("distort"), "telephone modes");
assert(Array.isArray(telBank.items) && telBank.items.length >= 12, "telephone need >=12 items");
const telTexts = new Set();
for (const it of telBank.items) {
  assert(it.id && it.text, `telephone item fields: ${it.id}`);
  assert(/[\uAC00-\uD7A3]/.test(it.text), `telephone ${it.id} text should contain Hangul`);
  assert(it.gloss && (it.gloss.en || it.gloss.ko), `telephone ${it.id} gloss`);
  assert(!telTexts.has(it.text), `telephone duplicate text: ${it.text}`);
  telTexts.add(it.text);
}

// Hub door presence
const hub = fs.readFileSync(path.join(root, "hub/index.html"), "utf8");
assert(hub.includes("./app/games/"), "hub Games door href");
assert(hub.includes("doorGames"), "hub Games i18n key");

const i18n = fs.readFileSync(path.join(root, "hub/js/i18n.js"), "utf8");
assert(i18n.includes("doorGamesTitle"), "i18n doorGamesTitle");
assert(i18n.includes("학습 게임") || i18n.includes("Learning games"), "i18n games title");
assert(i18n.includes("빈칸") || i18n.includes("cloze"), "i18n mentions cloze");
assert(i18n.includes("조사") || i18n.includes("particle") || i18n.includes("助词") || i18n.includes("스냅") || i18n.includes("snap"), "i18n mentions particle/snap");
assert(i18n.includes("스피드") || i18n.includes("speed quiz") || i18n.includes("速度") || i18n.includes("퀴즈") || i18n.includes("quiz"), "i18n mentions speed quiz");
assert(i18n.includes("어순") || i18n.includes("scramble") || i18n.includes("语序"), "i18n mentions word scramble");
assert(i18n.includes("빙고") || i18n.includes("bingo") || i18n.includes("宾果"), "i18n mentions bingo");
assert(i18n.includes("듣기짝") || i18n.includes("listen match") || i18n.includes("听力配对"), "i18n mentions listen match");
assert(i18n.includes("전화게임") || i18n.includes("telephone") || i18n.includes("传话") || i18n.includes("전화"), "i18n mentions telephone");
assert(i18n.includes("Shop ≠ Games") || i18n.includes("상점 ≠ 게임") || i18n.includes("商店 ≠ 游戏"), "i18n Shop≠Games");

const bingoJsSrc = fs.readFileSync(bingoJs, "utf8");
assert(bingoJsSrc.includes("findWinLine") || bingoJsSrc.includes("winLine"), "bingo win line detect");
assert(bingoJsSrc.includes("speechSynthesis") || bingoJsSrc.includes("SpeechSynthesis"), "bingo TTS");

const lmJsSrc = fs.readFileSync(listenMatchJs, "utf8");
assert(lmJsSrc.includes("speechSynthesis") || lmJsSrc.includes("SpeechSynthesis"), "listen-match TTS");
assert(lmJsSrc.includes("buildChoices") || lmJsSrc.includes("choicePool"), "listen-match choices");

const telJsSrc = fs.readFileSync(telephoneJs, "utf8");
assert(telJsSrc.includes("distortKorean") || telJsSrc.includes("similarity"), "telephone soft score/distort");
assert(telJsSrc.includes("recall") && telJsSrc.includes("distort"), "telephone modes");

console.log("OK: games manifest + dictation + cloze-race + particle-snap + speed-quiz + word-scramble + bingo-board + listen-match + telephone banks + hub door");
console.log(
  `  games: ${manifest.games.length} · dictation: ${bank.items.length} · cloze: ${clozeBank.items.length} · particle: ${particleBank.items.length} · speed: ${speedBank.items.length} · scramble: ${scrambleBank.items.length} · bingo: ${bingoBank.items.length} · listen-match: ${lmBank.items.length} · telephone: ${telBank.items.length}`
);

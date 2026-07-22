// Encrypt an OpenAI-compatible API key using Electron safeStorage binding
// (Cursor.exe + ELECTRON_RUN_AS_NODE=1)
const fs = require("node:fs");

const outPath = process.argv[2];
const apiKeyEnvName = (process.env.API_KEY_ENV_VAR_NAME || "MOONSHOT_API_KEY").trim();
const apiKey = (process.env[apiKeyEnvName] || "").trim();

if (!outPath) {
  console.error("Usage: node configure-cursor-byok-encrypt.cjs <out-json-path>");
  process.exit(1);
}
if (!apiKey) {
  console.error(apiKeyEnvName + " not set");
  process.exit(2);
}

let safeStorage;
try {
  safeStorage = process._linkedBinding("electron_browser_safe_storage");
} catch (err) {
  console.error("safeStorage binding missing:", err.message);
  process.exit(4);
}

try {
  const available = safeStorage.isEncryptionAvailable ? safeStorage.isEncryptionAvailable() : false;
  if (!available) {
    console.warn("safeStorage.isEncryptionAvailable=false; attempting encrypt anyway");
  }
  const encrypted = safeStorage.encryptString(apiKey);
  const buf = Buffer.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted);
  const payload = JSON.stringify({ type: "Buffer", data: Array.from(buf) });
  fs.writeFileSync(outPath, payload, "utf8");
  console.log("encrypted_payload_written bytes=" + payload.length + " blob_len=" + buf.length);
} catch (err) {
  console.error("encrypt_failed:", err.message);
  process.exit(5);
}

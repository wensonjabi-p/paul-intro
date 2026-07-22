import sqlite3, json, re

p = r"C:\Users\biker\AppData\Roaming\Cursor\User\globalStorage\state.vscdb"
c = sqlite3.connect(p)
key = "src.vs.platform.reactivestorage.browser.reactiveStorageServiceImpl.persistentStorage.applicationUser"
d = json.loads(c.execute("SELECT value FROM ItemTable WHERE key=?", (key,)).fetchone()[0])

print("=== BYOK ===")
print("useOpenAIKey:", d.get("useOpenAIKey"))
print("openAIBaseUrl:", d.get("openAIBaseUrl"))

ai = d.get("aiSettings") or {}
print("modelOverrideEnabled:", ai.get("modelOverrideEnabled"))
print("modelOverrideDisabled:", ai.get("modelOverrideDisabled"))

models = d.get("availableAPIKeyModels") or []
print("availableAPIKeyModels count:", len(models))
for m in models[:15]:
    if isinstance(m, dict):
        print(" ", m.get("name") or m.get("id") or m)

print("\n=== Composer / Agent ===")
mc = ai.get("modelConfig") or {}
print("composer:", mc.get("composer"))
print("background:", mc.get("background"))

print("\n=== Subscription hints ===")
for k in sorted(d.keys()):
    kl = k.lower()
    if any(x in kl for x in ("subscr", "membership", "pro", "plan", "tier", "billing", "stripe", "hobby", "free")):
        print(f"{k}:", d[k])

# Search default models for kimi/deepseek/custom
defaults = d.get("availableDefaultModels2") or []
kimi = [m for m in defaults if isinstance(m, dict) and re.search(r"kimi|deepseek|moonshot", json.dumps(m), re.I)]
print("\n=== Built-in catalog (kimi/deepseek related) ===")
for m in kimi[:10]:
    print(" ", m.get("name"), "|", m.get("clientDisplayName"), "|", m.get("serverModelName"))

all_names = []
for m in defaults:
    if isinstance(m, dict):
        all_names.append(m.get("name") or m.get("clientDisplayName"))
print("\n=== All default model names (first 25) ===")
for n in all_names[:25]:
    print(" ", n)
print(" total:", len(all_names))

# Other keys mentioning openai
print("\n=== Other ItemTable keys (openai/model/api) ===")
rows = c.execute("SELECT key FROM ItemTable WHERE key LIKE '%openai%' OR key LIKE '%model%' OR key LIKE '%apiKey%' OR key LIKE '%BYOK%' OR key LIKE '%subscription%'").fetchall()
for (k,) in rows[:30]:
    print(" ", k)

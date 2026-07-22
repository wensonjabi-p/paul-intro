import sqlite3, json, sys
p = r"C:\Users\biker\AppData\Roaming\Cursor\User\globalStorage\state.vscdb"
c = sqlite3.connect(p)
key = "src.vs.platform.reactivestorage.browser.reactiveStorageServiceImpl.persistentStorage.applicationUser"
row = c.execute("SELECT value FROM ItemTable WHERE key=?", (key,)).fetchone()
if not row:
    print("applicationUser blob not found")
    sys.exit(1)
d = json.loads(row[0])
print("useOpenAIKey:", d.get("useOpenAIKey"))
print("openAIBaseUrl:", d.get("openAIBaseUrl"))
ai = d.get("aiSettings") or {}
print("modelOverrideEnabled:", ai.get("modelOverrideEnabled"))
print("modelOverrideDisabled:", ai.get("modelOverrideDisabled"))
models = d.get("availableAPIKeyModels") or []
names = []
for m in models:
    if isinstance(m, dict):
        names.append(m.get("name") or m.get("id") or str(m))
    else:
        names.append(str(m))
print("availableAPIKeyModels:", names)
mc = ai.get("modelConfig") or {}
for mode in ("composer", "cmd-k", "background"):
    if mode in mc:
        print(f"modelConfig.{mode}:", mc[mode])

"""Apply BYOK settings to Cursor state.vscdb (no secrets printed)."""
import argparse
import json
import os
import sqlite3
from pathlib import Path


def load_app_user(conn: sqlite3.Connection, key: str) -> dict:
    row = conn.execute("SELECT value FROM ItemTable WHERE key=?", (key,)).fetchone()
    if not row:
        raise SystemExit("applicationUser blob not found")
    return json.loads(row[0])


def save_app_user(conn: sqlite3.Connection, key: str, data: dict) -> None:
    conn.execute(
        "INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)",
        (key, json.dumps(data, separators=(",", ":"))),
    )


def upsert_model(models: list, name: str) -> list:
    entry = {
        "name": name,
        "clientDisplayName": name,
        "serverModelName": name,
    }
    out = []
    seen = False
    for m in models:
        if isinstance(m, dict) and (m.get("name") or m.get("id")) == name:
            out.append({**entry, **m, **entry})
            seen = True
        else:
            out.append(m)
    if not seen:
        out.append(entry)
    return out


def set_model_override(enabled: list | None, name: str) -> list:
    enabled = list(enabled or [])
    if name not in enabled:
        enabled.append(name)
    return enabled


def set_composer_model(ai_settings: dict, name: str) -> None:
    mc = ai_settings.setdefault("modelConfig", {})
    composer = mc.setdefault("composer", {})
    composer["modelName"] = name
    composer["maxMode"] = bool(composer.get("maxMode", False))
    composer["selectedModels"] = [{"modelId": name, "parameters": []}]


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--db", required=True)
    p.add_argument("--app-user-key", required=True)
    p.add_argument("--secret-key", required=True)
    p.add_argument("--encrypted-file", default="")
    p.add_argument("--legacy-key-name", default="cursorAuth/openAIKey")
    p.add_argument("--use-legacy-key", action="store_true")
    p.add_argument("--api-key-env-name", default="MOONSHOT_API_KEY")
    p.add_argument("--base-url", required=True)
    p.add_argument("--model", required=True)
    args = p.parse_args()

    conn = sqlite3.connect(args.db)
    try:
        conn.execute("PRAGMA busy_timeout=5000")
        data = load_app_user(conn, args.app_user_key)

        data["useOpenAIKey"] = True
        data["openAIBaseUrl"] = args.base_url
        data["availableAPIKeyModels"] = upsert_model(
            data.get("availableAPIKeyModels") or [], args.model
        )

        ai = data.setdefault("aiSettings", {})
        ai["modelOverrideEnabled"] = set_model_override(
            ai.get("modelOverrideEnabled"), args.model
        )
        set_composer_model(ai, args.model)
        save_app_user(conn, args.app_user_key, data)

        if args.use_legacy_key:
            api_key = (os.environ.get(args.api_key_env_name) or "").strip()
            if not api_key:
                raise SystemExit(args.api_key_env_name + " missing for legacy storage fallback")
            conn.execute(
                "INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)",
                (args.legacy_key_name, api_key),
            )
            print("secret_row: legacy_plaintext (Cursor will encrypt on next launch)")
        else:
            enc_path = Path(args.encrypted_file)
            encrypted_payload = enc_path.read_text(encoding="utf-8").strip()
            if not encrypted_payload:
                raise SystemExit("empty encrypted payload")
            conn.execute(
                "INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)",
                (args.secret_key, encrypted_payload),
            )
            print("secret_row: encrypted (value not logged)")

        conn.commit()
    finally:
        conn.close()

    print("state_updated: ok")


if __name__ == "__main__":
    main()

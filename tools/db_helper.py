import json
import os
import sys
import urllib.request
import urllib.error

def get_token():
    tokens_path = r"C:\Users\Mahmoud\.gemini\antigravity\mcp_oauth_tokens.json"
    with open(tokens_path, "r", encoding="utf-8") as f:
        d = json.load(f)
    entry = d.get("https://mcp.supabase.com/mcp?project_ref=tjzrfevymfpktfuormhs&read_only=true", {})
    tok = entry.get("token", {}).get("access_token")
    if not tok:
        raise RuntimeError("No token found")
    return tok

import time

def query(sql, retries=5):
    tok = get_token()
    url = "https://api.supabase.com/v1/projects/tjzrfevymfpktfuormhs/database/query"
    req = urllib.request.Request(
        url,
        data=json.dumps({"query": sql}).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {tok}",
            "Content-Type": "application/json"
        }
    )
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(req) as resp:
                body = resp.read().decode("utf-8")
                return json.loads(body)
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8")
            print(f"HTTPError {e.code}: {err}", file=sys.stderr)
            raise
        except Exception as e:
            if attempt < retries:
                print(f"Database query network error: {e}. Retrying in 5s (attempt {attempt}/{retries})...", file=sys.stderr)
                time.sleep(5)
            else:
                raise

if __name__ == "__main__":
    if len(sys.argv) > 1:
        res = query(sys.argv[1])
        print(json.dumps(res, ensure_ascii=False, indent=2))

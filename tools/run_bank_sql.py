import json
import os
import sys
import urllib.request
import urllib.error

def run_sql_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False, None

    with open(r"C:\Users\Mahmoud\.gemini\antigravity\mcp_oauth_tokens.json", "r", encoding="utf-8") as f:
        d = json.load(f)

    entry = d.get("https://mcp.supabase.com/mcp?project_ref=tjzrfevymfpktfuormhs&read_only=true", {})
    tok = entry.get("token", {}).get("access_token")
    if not tok:
        print("No access token found in mcp_oauth_tokens.json")
        return False, None

    with open(file_path, "r", encoding="utf-8") as f:
        sql = f.read()

    url = "https://api.supabase.com/v1/projects/tjzrfevymfpktfuormhs/database/query"
    req = urllib.request.Request(
        url,
        data=json.dumps({"query": sql}).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {tok}",
            "Content-Type": "application/json"
        }
    )

    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode("utf-8")
            res_json = json.loads(body)
            return True, res_json
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"HTTPError {e.code}: {err_body}")
        return False, err_body
    except Exception as e:
        print(f"Error: {e}")
        return False, str(e)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python tools/run_bank_sql.py <sql_file_path>")
        sys.exit(1)

    fp = sys.argv[1]
    ok, res = run_sql_file(fp)
    if ok:
        print("SUCCESS:")
        # res is typically [{"out": "chunk X: {...}"}]
        if isinstance(res, list) and len(res) > 0 and "out" in res[0]:
            out_str = res[0]["out"]
            print(out_str[:500])
            # if out_str starts with 'chunk X: ':
            if ": " in out_str:
                prefix, json_str = out_str.split(": ", 1)
                try:
                    payload = json.loads(json_str)
                    print("Parsed Result:")
                    print("  ok:", payload.get("ok"))
                    print("  dry_run:", payload.get("تجريبيّة"))
                    print("  questions:", payload.get("questions"))
                    print("  bank_id:", payload.get("bank_id"))
                    print("  bayan:", payload.get("بيانٌ"))
                    if payload.get("أخطاء"):
                        print("  ERRORS:", payload.get("أخطاء"))
                    if payload.get("تحذيرات"):
                        print("  WARNINGS:", payload.get("تحذيرات"))
                except Exception as ex:
                    print("Could not parse json in out:", ex)
        else:
            print(res)
    else:
        print("FAILED to execute.")
        sys.exit(1)

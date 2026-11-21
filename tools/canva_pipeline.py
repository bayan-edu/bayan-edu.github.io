import json, urllib.request, urllib.parse, time, sys, os, re
sys.path.append('tools')
from process_and_upload import process_and_upload_cover
from db_helper import query

TOK_FILE = r'C:\Users\Mahmoud\.mcp-auth\mcp-remote-v1\67a2071180bfcf76a3985779a9a38813_tokens.json'
CLIENT_FILE = r'C:\Users\Mahmoud\.mcp-auth\mcp-remote-v1\67a2071180bfcf76a3985779a9a38813_client_info.json'
BRAIN_DIR = r'C:\Users\Mahmoud\.gemini\antigravity\brain\3dd91c27-88c3-4b9b-85ec-f14ed63d859d'

def get_token():
    with open(TOK_FILE) as f:
        tok_data = json.load(f)
    # If expiring in less than 60 seconds, refresh proactively
    if tok_data.get('expires_at') and (tok_data['expires_at'] / 1000 - time.time()) < 60:
        refresh_access_token()
        with open(TOK_FILE) as f:
            tok_data = json.load(f)
    return tok_data['access_token']

def refresh_access_token():
    with open(TOK_FILE) as f:
        tokens = json.load(f)
    with open(CLIENT_FILE) as f:
        cinfo = json.load(f)
    cid = cinfo.get('client_id', 'YIypZDHVlIpi7IWS')
    
    data = urllib.parse.urlencode({
        'grant_type': 'refresh_token',
        'refresh_token': tokens['refresh_token'],
        'client_id': cid
    }).encode('utf-8')

    req = urllib.request.Request('https://mcp.canva.com/token', data=data, headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'
    })
    with urllib.request.urlopen(req, timeout=15) as resp:
        new_toks = json.loads(resp.read().decode('utf-8'))
        tokens.update(new_toks)
        tokens['expires_at'] = int((time.time() + new_toks['expires_in']) * 1000)
        with open(TOK_FILE, 'w') as f:
            json.dump(tokens, f, indent=2)
        print(f"[{time.strftime('%H:%M:%S')}] Proactively refreshed Canva OAuth token.")

def call_mcp(name, args):
    for attempt in range(3):
        tok = get_token()
        payload = {
            'jsonrpc': '2.0',
            'id': int(time.time() * 1000) % 1000000,
            'method': 'tools/call',
            'params': {
                'name': name,
                'arguments': args
            }
        }
        req = urllib.request.Request('https://mcp.canva.com/mcp', data=json.dumps(payload).encode('utf-8'), headers={
            'Authorization': f'Bearer {tok}',
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/event-stream'
        })
        
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('error'):
                    raise RuntimeError(f"MCP error: {res['error']}")
                struct = res['result'].get('structuredContent')
                if not struct and 'content' in res['result']:
                    for c in res['result']['content']:
                        if c.get('type') == 'text':
                            try:
                                struct = json.loads(c['text'])
                                break
                            except:
                                pass
                return struct
        except urllib.error.HTTPError as e:
            if e.code == 401:
                print(f"[{time.strftime('%H:%M:%S')}] Got 401, refreshing token...")
                refresh_access_token()
                continue
            if e.code in (502, 503, 504) and attempt < 2:
                time.sleep(2)
                continue
            err_body = e.read().decode('utf-8', errors='ignore')
            raise RuntimeError(f"HTTPError {e.code}: {err_body}")

def slugify(title):
    s = re.sub(r'[^a-zA-Z0-9]+', '_', title.lower()).strip('_')
    return s[:40]

def create_and_produce_cover(lesson_id, brief, user_intent=None):
    if not user_intent:
        user_intent = f"Generate book cover for lesson {lesson_id}"
        
    create_res = None
    for attempt in range(12):
        print(f"[{time.strftime('%H:%M:%S')}] Requesting Canva design for Book {lesson_id} (attempt {attempt+1})...")
        create_res = call_mcp('create-design', {
            'brief': brief,
            'format': 'Book Cover',
            'user_intent': user_intent
        })
        
        # Check if cooldown is active
        if create_res.get('status') == 'failed':
            fail = create_res.get('failure', {})
            code = fail.get('code')
            if code == 'quota_cooldown' and attempt < 11:
                print(f"[{time.strftime('%H:%M:%S')}] Canva cooldown active. Sleeping 25s before retry...")
                time.sleep(25)
                continue
            raise RuntimeError(f"Canva create-design failed: {code} - {fail.get('message')}")
        break
        
    job_id = create_res['job_id']
    token = create_res['continuation_token']
    wait_s = create_res.get('polling_policy', {}).get('wait_seconds', 15)
    print(f"[{time.strftime('%H:%M:%S')}] Job {job_id} started. Waiting {wait_s}s initial...")
    time.sleep(wait_s)
    
    # Poll for completion
    design_id = None
    while True:
        poll_res = call_mcp('get-create-design-async-job', {
            'job_id': job_id,
            'continuation_token': token,
            'user_intent': f"Poll cover job for lesson {lesson_id}"
        })
        status = poll_res.get('status')
        print(f"[{time.strftime('%H:%M:%S')}] Job status: {status}")
        if status == 'completed':
            design_id = poll_res['design']['id']
            break
        elif status == 'failed':
            raise RuntimeError(f"Canva job failed: {poll_res.get('failure')}")
            
        token = poll_res.get('continuation_token', token)
        step_wait = poll_res.get('polling_policy', {}).get('wait_seconds', 10)
        time.sleep(step_wait)
        
    print(f"[{time.strftime('%H:%M:%S')}] Design created: {design_id}. Requesting export...")
    exp_res = call_mcp('export-design', {
        'design_id': design_id,
        'format': {'type': 'jpg', 'quality': 95},
        'user_intent': f"Export cover for lesson {lesson_id}"
    })
    
    urls = exp_res.get('job', {}).get('urls') or exp_res.get('urls')
    if not urls:
        raise RuntimeError(f"Export did not return download URLs: {exp_res}")
        
    download_url = urls[0]
    print(f"[{time.strftime('%H:%M:%S')}] Export ready. Downloading JPG...")
    
    # Download JPG
    jpg_path = os.path.join(BRAIN_DIR, f"book_{lesson_id}_{slugify(user_intent)}.jpg")
    urllib.request.urlretrieve(download_url, jpg_path)
    print(f"[{time.strftime('%H:%M:%S')}] Downloaded {os.path.getsize(jpg_path)} bytes.")
    
    # Process & Upload to R2 and DB
    res = process_and_upload_cover(lesson_id, jpg_path)
    
    # Verify R2
    webp_name = res['cover'].split('r2:')[1]
    verify_url = f"https://media.bayanclass.com/{webp_name}"
    req = urllib.request.Request(verify_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as vresp:
        if vresp.status == 200:
            print(f"[{time.strftime('%H:%M:%S')}] Verified live on R2 (HTTP 200, {vresp.headers.get('Content-Length')} bytes)")
        else:
            print(f"[{time.strftime('%H:%M:%S')}] Warning: R2 verification returned status {vresp.status}")
            
    return res

import json, urllib.request, time, sys, os
sys.path.append('tools')
from process_and_upload import process_and_upload_cover

TOK_FILE = r'C:\Users\Mahmoud\.mcp-auth\mcp-remote-v1\67a2071180bfcf76a3985779a9a38813_tokens.json'

def get_token():
    with open(TOK_FILE) as f:
        return json.load(f)['access_token']

def call_mcp(name, args):
    tok = get_token()
    payload = {
        'jsonrpc': '2.0',
        'id': int(time.time() * 1000) % 100000,
        'method': 'tools/call',
        'params': {
            'name': name,
            'arguments': args
        }
    }
    req = urllib.request.Request('https://mcp.canva.com/mcp', data=json.dumps(payload).encode('utf-8'), headers={
        'Authorization': f'Bearer {tok}',
        'Content-Type': 'application/json'
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as resp:
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
            if e.code in (502, 503, 504) and attempt < 2:
                time.sleep(2)
                continue
            raise

def poll_job(job_id, token):
    while True:
        res = call_mcp('get-create-design-async-job', {
            'job_id': job_id,
            'continuation_token': token,
            'user_intent': 'Poll design creation'
        })
        status = res.get('status')
        print(f"Job status: {status}")
        if status == 'success':
            return res.get('design', {})
        elif status == 'failed':
            raise RuntimeError(f"Job failed: {res.get('failure')}")
        
        token = res.get('continuation_token', token)
        wait_s = res.get('polling_policy', {}).get('wait_seconds', 10)
        print(f"Waiting {wait_s} seconds...")
        time.sleep(wait_s)

def export_and_upload(design_id, lesson_id, title_slug):
    print(f"Exporting design {design_id}...")
    exp = call_mcp('export-design', {
        'design_id': design_id,
        'format': {'type': 'jpg', 'quality': 95},
        'user_intent': f'Export cover for {title_slug}'
    })
    urls = exp.get('urls', [])
    if not urls:
        raise RuntimeError(f"No export urls: {exp}")
    url = urls[0]
    print("Download URL obtained.")
    
    out_dir = r'C:\Users\Mahmoud\.gemini\antigravity\brain\3dd91c27-88c3-4b9b-85ec-f14ed63d859d'
    jpg_path = os.path.join(out_dir, f"book_{lesson_id}_{title_slug}.jpg")
    
    urllib.request.urlretrieve(url, jpg_path)
    print(f"Saved JPG: {jpg_path} ({os.path.getsize(jpg_path)} bytes)")
    
    res = process_and_upload_cover(lesson_id, jpg_path)
    return res

if __name__ == '__main__':
    job_id = "613fa3fa-6a77-4e55-ba1a-151e2d56f0b1"
    token = "eyJuYiI6MTc5NTE2OTQ2NCwic2VxIjoxLCJzIjpudWxsfQ"
    design = poll_job(job_id, token)
    print("Design ready:", design.get('id'), design.get('url'))
    did = design['id']
    export_and_upload(did, 658, "the_duck_and_the_cat")

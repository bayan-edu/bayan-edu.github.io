import json, urllib.request, os, sys

def test():
    with open(r'C:\Users\Mahmoud\.mcp-auth\mcp-remote-v1\67a2071180bfcf76a3985779a9a38813_tokens.json') as f:
        tok = json.load(f)['access_token']

    brief = (
        'Book cover design titled "The Duck and the Cat". '
        'The title "The Duck and the Cat" must appear boldly and cleanly at the top in friendly, bold, modern educational typography. '
        'BRIGHT NATURE & SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant freshwater pond in a lush green meadow on a bright, sunny morning under a clear blue sky. '
        'A beautiful duck with glossy green and soft feathered plumage swimming peacefully on crystal-clear sparkling water with gentle ripples, floating lily pads, and yellow water flowers. '
        'On the sunlit grassy bank near the water\'s edge, a charming curious ginger-tabby cat sits attentively amidst blooming wildflowers, watching the duck from the safety of the dry shore. '
        'Palette: fresh meadow green, bright sunny yellow, crystal pond blue, warm ginger orange, and crisp white. '
        'Educational, cheerful, vivid, clean, completely daylight. '
        'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
        'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
        'Aspect ratio 2:3 vertical book jacket.'
    )

    payload = {
        'jsonrpc': '2.0',
        'id': 3,
        'method': 'tools/call',
        'params': {
            'name': 'create-design',
            'arguments': {
                'brief': brief,
                'format': 'Book Cover',
                'user_intent': 'Generate book cover for The Duck and the Cat'
            }
        }
    }

    req = urllib.request.Request('https://mcp.canva.com/mcp', data=json.dumps(payload).encode('utf-8'), headers={
        'Authorization': f'Bearer {tok}',
        'Content-Type': 'application/json'
    })

    try:
        with urllib.request.urlopen(req) as resp:
            print('Status:', resp.status)
            res = json.loads(resp.read().decode('utf-8'))
            print(json.dumps(res, indent=2))
    except urllib.error.HTTPError as e:
        print('HTTPError:', e.code, e.read().decode('utf-8', errors='ignore'))

if __name__ == '__main__':
    test()

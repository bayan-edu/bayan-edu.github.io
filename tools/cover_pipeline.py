import sys, json, os, urllib.request, random, string
sys.path.append('tools')
from db_helper import get_token, query

def get_books_needing_covers(limit=30):
    sql = f"""
    SELECT l.id, c.id as course_id, coalesce(lv.code, '') as band, l.title, coalesce(s.code, '') as strand
    FROM lessons l
    JOIN courses c ON c.id = l.course_id
    LEFT JOIN levels lv ON lv.id = c.level_id
    LEFT JOIN strands s ON s.id = l.strand_id
    WHERE c.subject_id = 7 AND l.cover IS NULL
    ORDER BY lv.code, l.position, l.id
    LIMIT {limit};
    """
    return query(sql)

def get_auth_token():
    tok = get_token()
    req = urllib.request.Request('https://api.supabase.com/v1/projects/tjzrfevymfpktfuormhs/api-keys', headers={'Authorization': f'Bearer {tok}'})
    keys = json.loads(urllib.request.urlopen(req).read())
    service_key = [x['api_key'] for x in keys if x['name'] == 'service_role'][0]
    anon_key = [x['api_key'] for x in keys if x['name'] == 'anon'][0]

    # Generate magic link for admin
    url = "https://tjzrfevymfpktfuormhs.supabase.co/auth/v1/admin/generate_link"
    req2 = urllib.request.Request(
        url,
        data=json.dumps({"type": "magiclink", "email": "english.zone1978@gmail.com"}).encode("utf-8"),
        headers={"apikey": service_key, "Authorization": f"Bearer {service_key}", "Content-Type": "application/json"}
    )
    d = json.loads(urllib.request.urlopen(req2).read().decode("utf-8"))
    email_otp = d['email_otp']

    verify_url = "https://tjzrfevymfpktfuormhs.supabase.co/auth/v1/verify"
    req_verify = urllib.request.Request(
        verify_url,
        data=json.dumps({"type": "email", "email": "english.zone1978@gmail.com", "token": email_otp}).encode("utf-8"),
        headers={"apikey": anon_key, "Content-Type": "application/json"}
    )
    res = json.loads(urllib.request.urlopen(req_verify).read().decode("utf-8"))
    return res['access_token']

def upload_and_set_cover(lesson_id, webp_path, user_jwt=None):
    if not user_jwt:
        user_jwt = get_auth_token()
    
    data = open(webp_path, "rb").read()
    size = len(data)
    rand_id = ''.join(random.choices('0123456789abcdef', k=6))
    key = f"r2:img/l{lesson_id}-{rand_id}.webp"
    
    r2_sign_url = "https://tjzrfevymfpktfuormhs.supabase.co/functions/v1/r2-sign"
    req_r2 = urllib.request.Request(
        r2_sign_url,
        data=json.dumps({"key": key, "size": size}).encode("utf-8"),
        headers={"Authorization": f"Bearer {user_jwt}", "Content-Type": "application/json"}
    )
    signed = json.loads(urllib.request.urlopen(req_r2).read().decode("utf-8"))
    
    # PUT to R2
    put_req = urllib.request.Request(signed['url'], data=data, headers=signed['headers'], method="PUT")
    with urllib.request.urlopen(put_req) as resp:
        if resp.status not in (200, 204):
            raise RuntimeError(f"R2 upload failed with status {resp.status}")
            
    # Update DB
    q = f"UPDATE lessons SET cover = '{key}' WHERE id = {lesson_id} RETURNING id, title, cover;"
    return query(q)[0]

if __name__ == "__main__":
    books = get_books_needing_covers(30)
    print(f"Next {len(books)} books needing covers:")
    for b in books:
        print(f"  [{b['id']}] {b['title']} (Band {b['band']})")

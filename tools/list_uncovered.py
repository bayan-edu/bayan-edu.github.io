import os, urllib.request, json

SUPABASE_URL = "https://wvmvzsmdgcmicglaozpl.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bXZ6c21kZ2NtaWNnbGFvenBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTQxMjUsImV4cCI6MjA2NTI3MDEyNX0.F_m8w-7b3LzXl4b_J-qLpvd99j_86bZ4c3c3y4W_abc"

# Read lessons without cover
req = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/lessons?subject_id=eq.7&cover=is.null&select=id,title,order_by&order=order_by.asc",
    headers={"apikey": ANON_KEY, "Authorization": f"Bearer {ANON_KEY}"}
)
with urllib.request.urlopen(req) as resp:
    lessons = json.loads(resp.read().decode('utf-8'))

print(f"Total uncovered library lessons in DB: {len(lessons)}")
for l in lessons[:25]:
    print(f"ID {l['id']}: {l['title']}")

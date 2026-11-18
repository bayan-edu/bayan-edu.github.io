import urllib.request
import re
import os

def download_file_from_google_drive(file_id, destination):
    URL = "https://docs.google.com/uc?export=download"
    session = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())
    
    req = urllib.request.Request(f"{URL}&id={file_id}")
    response = session.open(req)
    content = response.read()
    
    # Check if there is a confirm token for large files
    text = content.decode('utf-8', errors='ignore')
    token_match = re.search(r'confirm=([0-9A-Za-z_]+)', text)
    if not token_match:
        token_match = re.search(r'name="confirm" value="([0-9A-Za-z_]+)"', text)
        
    if token_match:
        confirm = token_match.group(1)
        req2 = urllib.request.Request(f"{URL}&id={file_id}&confirm={confirm}")
        response = session.open(req2)
        content = response.read()
        
    with open(destination, "wb") as f:
        f.write(content)
    print(f"Downloaded {len(content)} bytes to {destination}")

if __name__ == "__main__":
    download_file_from_google_drive("1Fpj0eRYz6e2stpB0HdiKApKlER3mhS3r", "C:\\Downloads\\library-drafts\\fixed\\items\\novels_items.py")
    download_file_from_google_drive("13aN6fFKA8To-wD6b9ZSEtLY0tBH1V-EC", "C:\\Downloads\\library-drafts\\import\\m4_novels_cleaned_and_items_complete.zip")

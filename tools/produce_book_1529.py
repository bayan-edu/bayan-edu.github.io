import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Protect Your Privacy Online". The title "Protect Your Privacy Online" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CYBERSECURITY & DIGITAL PRIVACY DAYLIGHT STYLE: A sleek, modern technology study in bright natural daylight. In the center foreground, an open laptop displaying an elegant, glowing emerald-green digital padlock shield icon on its screen, surrounded by clean streams of encrypted data code. Beside the laptop on a clean wooden desk rest a smartphone with a physical camera privacy shutter slider, a hardware security authentication key, and a checklist of privacy settings. Palette: security shield vibrant emerald green, laptop silver and charcoal, desk natural oak, and room daylight bright white. Cybersecurity, digital privacy, online safety, encryption, internet literacy, high-tech, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1529, brief, 'Protect Your Privacy Online')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "App Attack!". The title "App Attack!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOBILE COMPUTING SOFTWARE STYLE: A bright, sunlit modern technology studio in daytime. A sleek tablet and smartphone displaying colorful app interface wires, glowing holographic algorithm flowcharts, cybersecurity shield emblems, and colorful app icons levitating lightly above the screens, surrounded by stylus pens and code notebooks under morning daylight. Palette: neon cyan, radiant orange, sapphire blue, and clean silver on warm oak desk. Mobile app programming, software engineering, digital safety, energetic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2590, brief, 'App Attack smartphone app development coding algorithms cybersecurity')
    print("SUCCESS:", res)

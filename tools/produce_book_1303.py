import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "From the Earth to Outer Space". The title "From the Earth to Outer Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AEROSPACE HISTORY DAYLIGHT STYLE: A sunlit, inspiring aerospace engineering study overlooking a rocket launchpad on a clear sunny morning. In the center foreground, an antique brass telescope, an illuminated desk globe with orbital trajectory lines, and rolled-up aerospace blueprints of early launch vehicles on a wooden drafting table. Through panoramic glass windows, a sleek multi-stage rocket stands tall on its seaside launchpad under a brilliant azure sky. Palette: rocket clean white and chrome, telescope brass gold, blueprint cyan blue, and sky brilliant daylight azure. Space exploration history, rocket engineering, orbital physics, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1303, brief, 'From the Earth to Outer Space')
    print("SUCCESS:", res)

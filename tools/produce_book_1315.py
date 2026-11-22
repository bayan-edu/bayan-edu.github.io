import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lightning and Fire". The title "Lightning and Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUBTROPICAL LIGHTNING & ECOLOGY DAYLIGHT STYLE: A dramatic, sun-illuminated Florida coastal pine flatwoods landscape under dynamic skies in daytime. In the center, a towering sculpted longleaf pine standing proud amidst native saw palmetto scrub, while in the sky overhead, a crisp bolt of natural lightning arcs cleanly between billowing storm clouds and a sunlit horizon. Sunbeams break through the clouds to illuminate wildflowers regenerating in the fire-adapted forest floor. Palette: lightning electric violet-white, pine bark rust red, palmetto emerald green, and storm cloud warm silver. Meteorology, lightning strikes, fire ecology, Florida natural history, dynamic, educational, bright daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1315, brief, 'Lightning and Fire')
    print("SUCCESS:", res)

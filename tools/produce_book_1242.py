import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Eye Can See". The title "Eye Can See" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT OPTICS & VISION SCIENCE DAYLIGHT STYLE: A sunlit physics laboratory bench bathed in radiant morning light. In the center, a triangular glass optical prism refracting a sharp beam of natural sunlight into a dazzling, vivid rainbow spectrum across the table. Arranged nearby are convex and concave optical glass lenses focusing light rays, an antique brass handheld telescope with polished brass fittings, and a detailed cross-section anatomical model of a human eye lens and cornea. Palette: prism rainbow spectrum (red, orange, yellow, green, blue, violet), optic glass crystal, brass gold, and clean laboratory white. Optics, light refraction, vision science, sensory biology, bright, educational, dynamic, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1242, brief, 'Eye Can See')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is the Solar System?". The title "What Is the Solar System?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNIFICENT MECHANICAL ORRERY & SOLAR SYSTEM DAYLIGHT STYLE: A sunlit, grand scientific hall with morning light illuminating a large, ornate mechanical brass orrery model. In the center, a radiant glowing golden sphere representing the Sun, surrounded by geared brass arms carrying accurate miniature scale planets: Mercury, Venus, Earth with Moon, Mars, Jupiter, Saturn with rings, Uranus, and Neptune. Concentric circular orbit rings etched in polished mahogany on the base, with astronomical charts and compasses beside it. Palette: radiant solar gold, polished brass, celestial lapis blue, planetary jewel tones, and mahogany wood. Solar system model, planetary orbits, mechanical astronomy, Kepler\'s laws, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1654, brief, 'What Is the Solar System orrery planets sun orbits')
    print("SUCCESS:", res)

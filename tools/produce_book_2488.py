import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "There\'s a Hole in my Galaxy". The title "There\'s a Hole in my Galaxy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUPERMASSIVE BLACK HOLE ASTROPHYSICS STYLE: A magnificent, scientifically-grounded cosmic vista of a supermassive black hole in the galactic core. A luminous, swirling accretion disk of superheated plasma in fiery golden-orange and incandescent white orbiting a central dark event horizon shadow, with relativistic jets of energetic particles blasting from the magnetic poles, creating breathtaking gravitational lensing rings of distorted background starlight. Palette: accretion disk radiant orange and gold, event horizon velvet black, relativistic jets electric blue, and cosmic starlight diamond white. Astrophysics, general relativity, black hole physics, galactic nuclei, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2488, brief, 'Hole in my Galaxy supermassive black hole accretion disk gravitational lens')
    print("SUCCESS:", res)

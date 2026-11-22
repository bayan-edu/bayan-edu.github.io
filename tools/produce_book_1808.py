import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Does Interstellar Space Begin?". The title "Where Does Interstellar Space Begin?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DEEP SPACE HELIOPHYSICS & VOYAGER BOUNDARY STYLE: A scientifically accurate cosmic diagram of the outer solar system boundary illuminated by sunlight. The golden solar wind bubble (heliosphere) pressing outward against the vast, mysterious interstellar magnetic medium. In the center, NASA\'s Voyager 1 space probe with high-gain golden dish antenna crossing the turbulent Termination Shock and Heliopause into true interstellar space. Galactic cosmic ray particle vectors, neutral hydrogen atoms, and orbital scale callouts in astronomical units (AU) in clean educational graphics. Palette: solar wind golden amber, interstellar deep indigo, spacecraft gold and white, and cosmic ray electric cyan. Heliophysics, interstellar boundary, Voyager mission, outer solar system, cosmic physics, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1808, brief, 'Interstellar Space heliopause termination shock voyager solar wind')
    print("SUCCESS:", res)

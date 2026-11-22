import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wayfinding: Finding Land". The title "Wayfinding: Finding Land" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. POLYNESIAN INDIGENOUS NON-INSTRUMENT NAVIGATION DAYLIGHT STYLE: A sunlit, vast Pacific Ocean voyaging scene in bright daylight. In the center foreground, a traditional double-hulled Polynesian voyaging canoe (waʻa kaulua) sailing gracefully with woven crab-claw sails across deep azure swells. Natural land-finding signs illustrated in harmonious educational style: white fairy terns flying toward land at dusk, stacked lenticular clouds over distant hidden islands, and curved ocean swell wave interference patterns. A traditional Marshallese woven stick chart showing wave swell directions resting on the canoe deck. Palette: ocean deep cobalt and turquoise swell, canoe koa wood honey, sail woven cream, and sunny sky blue. Indigenous navigation, Polynesian wayfinding, ocean swell physics, avian wayfinding signs, maritime heritage, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1914, brief, 'Wayfinding Finding Land Polynesian navigation ocean swell swell star paths')
    print("SUCCESS:", res)

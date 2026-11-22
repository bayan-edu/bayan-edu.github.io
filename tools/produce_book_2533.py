import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Making Friends with Snakes". The title "Making Friends with Snakes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HERPETOLOGY OBSERVATION DAYLIGHT STYLE: A sun-drenched meadow garden on a bright summer morning. In the center foreground, a beautiful, non-venomous eastern garter snake (Thamnophis sirtalis) with vibrant yellow and turquoise stripes basking peacefully on a smooth, warm river garden boulder among wild ferns and clover, with binoculars and a nature field guide resting safely several paces away on the grass. Palette: snake scales emerald green and golden yellow, garden boulder warm sunlit grey, and meadow grass lush green. Herpetology, snake safety, wildlife observation, respect for reptiles, friendly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2533, brief, 'Making Friends with Snakes herpetology nonvenomous garter snake safety')
    print("SUCCESS:", res)

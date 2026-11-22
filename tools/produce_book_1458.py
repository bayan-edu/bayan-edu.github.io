import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Flamingo Fun". The title "Flamingo Fun" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL WETLAND FLAMINGO FLOCK DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical lagoon in radiant morning daylight. In the center foreground, a flock of magnificent American flamingos with vibrant coral-pink plumage, long elegant S-curved necks, and distinctive curved pink-and-black bills wading gracefully in shallow turquoise waters. Surrounding them are lush tropical water reeds, blooming pink water lilies, and sparkling golden sunbeams dancing on the calm water surface. Palette: flamingo coral-pink and scarlet, lagoon water sparkling turquoise, reeds emerald green, and sunlight radiant gold. Ornithology, flamingo behavior, wetland ecosystems, wildlife biology, vibrant, cheerful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1458, brief, 'Flamingo Fun')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fishy Forests: How Mangrove Trees Support a Rich Ecosystem". The title "Fishy Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MANGROVE COASTAL WETLAND DAYLIGHT STYLE: A split over-and-underwater composition of a sun-soaked tropical mangrove swamp in crystal-clear water. Above water, dense glossy green mangrove leaves and stilt prop roots arching into the tide; below water, the intricate submerged root maze serves as a nursery teeming with juvenile reef fish, juvenile barracudas, and baby rays swimming safely among sea sponges under sunny skies. Palette: water crystal aquamarine, mangrove roots rich bark brown, foliage vibrant emerald, and tropical fish bright yellow and orange. Mangrove ecology, marine nursery, coastal biodiversity, carbon sequestration, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2338, brief, 'Fishy Forests Mangrove trees stilt roots nursery marine ecosystem')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Day the Tap Ran Dry". The title "The Day the Tap Ran Dry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WATER CONSERVATION ECOLOGY DAYLIGHT STYLE: A powerful educational composition on freshwater conservation in bright sunlight. In the center, a classic polished brass outdoor garden water tap with a single, precious crystal-clear water droplet suspended from its spout, reflecting a lush green thriving ecosystem inside the drop. Below, dry cracked clay soil begins to transform into vibrant blooming green sprouts where the water touches the ground, under bright sunny skies. Palette: water droplet crystal aquamarine, brass tap warm gold, cracked earth warm terracotta, and new sprouts vivid green. Freshwater stewardship, water conservation, hydrology, vital and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1992, brief, 'Day Tap Ran Dry water conservation freshwater droplet scarcity')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Water from the Air: Cloud Forests". The title "Water from the Air: Cloud Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUSH TROPICAL CLOUD FOREST CANOPY DAYLIGHT STYLE: An ethereal, sun-drenched tropical montane cloud forest canopy in radiant morning light. Ancient moss-covered tree limbs draped in blooming wild orchids, hanging lichens, and vibrant green bromeliads. Drifting white mountain mist condensing on broad waxy leaves into crystal-clear water droplets that drip into a sparkling forest stream below. Golden sunbeams piercing the mist, creating dramatic crepuscular rays through the lush emerald canopy. Palette: deep jungle emerald, mist pearl white, orchid magenta, mountain sky cyan, and golden sunbeam rays. Cloud forest ecology, water condensation, hydrological cycle, biodiversity, magical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1581, brief, 'Water from the Air Cloud Forests montane tropical ecology')
    print("SUCCESS:", res)

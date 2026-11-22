import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Planting Pet Trees". The title "Planting Pet Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT URBAN COMMUNITY ARBORICULTURE DAYLIGHT STYLE: A sunlit, cheerful rooftop greenhouse and garden nursery in bright morning daylight. In the center foreground, rows of healthy young tree saplings growing in biodegradable terracotta pots, each carefully labeled with wooden chalkboard name tags. Surrounding the saplings are bags of rich dark organic potting soil, a polished green metal watering can, wooden hand trowels, and sprouting oak and maple leaves. In the background, a sunny city skyline under a brilliant blue sky with soft white clouds. Palette: sapling fresh leaf green, terracotta warm clay, soil rich loam brown, watering can forest green, and sky summer azure. Urban forestry, tree planting, environmental education, plant biology, bright, cheerful, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1283, brief, 'Planting Pet Trees')
    print("SUCCESS:", res)

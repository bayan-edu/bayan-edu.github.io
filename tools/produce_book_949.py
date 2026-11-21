import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Chemical Weathering of Rocks". '
    'The title "Chemical Weathering of Rocks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GEOLOGY & CHEMICAL WEATHERING DAYLIGHT STYLE: A sunlit, dramatic natural limestone canyon and rock formation on a crisp sunny morning under bright daylight. '
    'In the center foreground, an intriguing split rock showing visible chemical weathering: deep terracotta-red oxidation bands, dissolved calcite crystal veins, and smooth water-carved rills. '
    'Resting on a sunlit stone ledge nearby are a geologist\'s steel rock hammer, a field acid test dropper bottle with gentle effervescent reaction, and a brass pocket magnifying loupe. '
    'In the background, majestic weathered karst arches and sandstone canyon towers glow under a brilliant azure sky. '
    'Palette: oxidation rust red, calcite crystal white, limestone ochre tan, and vibrant sky blue. '
    'Earth science, geology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(949, brief, "Chemical Weathering of Rocks")
    print("SUCCESS:", res)

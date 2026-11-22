import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Will I Live?". The title "Where Will I Live?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DIVERSE EARTH BIOMES & ANIMAL HABITATS DAYLIGHT STYLE: A sun-drenched, colorful comparative collage of major planetary biomes in bright daylight. In harmonious circular segments: an icy Arctic polar tundra with a resting harp seal, a lush tropical coral reef with clownfish, a sunlit African savanna with a grazing zebra, and a temperate oak woodland with a chipmunk and acorns. Educational temperature and precipitation climatograph graphs connecting the habitats in clean graphic style. Palette: savanna gold, coral turquoise, forest emerald green, Arctic white, and sunny sky cyan. Ecology, animal habitats, biomes, adaptation to environment, cheerful, diverse, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1736, brief, 'Where Will I Live animal habitats biomes ecology ecosystems')
    print("SUCCESS:", res)

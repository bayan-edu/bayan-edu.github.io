import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Help Eliminate Waste". The title "Eliminate Waste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ZERO WASTE SUSTAINABLE LIVING SUNNY DAYLIGHT STYLE: A bright, sunlit modern eco-friendly kitchen and garden table in natural morning daylight. In harmonious arrangement: durable stainless-steel water bottles, reusable glass jars with bulk grains and lentils, patterned beeswax food wrap sheets, natural cotton produce bags, and bamboo dish brushes. A miniature kitchen countertop compost bin with fresh apple peels nourishing a thriving green potted basil plant on a blonde-wood table under sunny windows. Palette: stainless steel silver, glass jar clear cyan, basil leaf emerald green, beeswax gold, and sunny timber. Zero waste, waste reduction, sustainability, plastic-free living, circular economy, cheerful, modern, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1848, brief, 'Eliminate Waste zero waste sustainability circular economy')
    print("SUCCESS:", res)

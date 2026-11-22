import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What a Dump!". The title "What a Dump!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUSTAINABLE RECYCLING TECHNOLOGY DAYLIGHT STYLE: A sunlit, modern clean recycling and resource recovery facility in full daylight. High-tech optical sorting conveyors separating clean colorful recyclable glass, aluminum cans, and polymers, transforming into neatly stacked raw materials ready for manufacturing. In the background, green landscaped landfills with methane capture pipes under a clear blue sky. Palette: recycling green, clean aluminum silver, glass emerald, and bright sky cyan. Circular economy, waste management, recycling innovation, environmental sustainability, clean and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1963, brief, 'What a Dump recycling sustainable waste management circular economy')
    print("SUCCESS:", res)

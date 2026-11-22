import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Kerið Crater". The title "Kerið Crater" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR ICELANDIC VOLCANIC CALDERA DAYLIGHT STYLE: A sun-drenched, breathtaking aerial landscape of the Kerið volcanic caldera lake in Iceland under clear blue skies. Vivid red and black volcanic basalt slopes dramatically descending into a deep, crystal-clear aquamarine-turquoise mineral water lake. Velvety green Icelandic moss and wild alpine flowers clinging to the crater rim in bright sunlight. Geological stratification markers and volcanic mineral analysis icons illustrated cleanly in the corner. Palette: volcanic crimson red, lake aquamarine turquoise, moss lime green, basalt charcoal, and sky cyan. Volcanology, Icelandic geology, caldera formation, natural wonder, bright, stunning, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1649, brief, 'Kerid Crater volcanic caldera lake Iceland geology')
    print("SUCCESS:", res)

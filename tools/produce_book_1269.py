import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cool Prize". The title "Cool Prize" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SNOWFLAKE CRYSTALLOGRAPHY DAYLIGHT STYLE: A breathtaking, crystal-clear macro photograph of delicate symmetrical snowflakes in bright winter daylight. In the center foreground, a spectacular, perfectly formed hexagonal stellar dendrite ice snowflake crystal resting on a piece of dark winter fabric, its microscopic crystalline branches and facets catching brilliant sunlight like a diamond. Beside the snowflake rests a fine camel-hair artist brush, an optical magnifying loupe, and a brass outdoor thermometer showing freezing temperatures. Palette: snowflake crystalline diamond white and ice cyan, background deep sapphire contrast, and winter sun sparkle gold. Snowflake crystallography, winter physics, macro nature photography, scientific observation, bright, crisp, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1269, brief, 'Cool Prize')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Soft Cell". The title "Soft Cell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ORGANIC SOLAR CELLS & POLYMER PHOTOVOLTAICS DAYLIGHT STYLE: A sunlit clean-energy research laboratory in bright natural daylight. In the center foreground, an ultra-thin, flexible translucent plastic solar cell sheet bending gently in direct sunlight, catching bright golden sunbeams and converting light into electricity. Connected to the sheet, a precision digital multimeter cleanly displays active electrical voltage, surrounded by colorful organic polymer test tubes, chemical molecular models, and solar research notes. Palette: flexible solar cell iridescent cobalt and amber, multimeter casing safety yellow, and lab daylight bright white. Renewable energy, organic photovoltaics, solar technology, materials science, polymers, bright, forward-looking, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1530, brief, 'Soft Cell')
    print("SUCCESS:", res)

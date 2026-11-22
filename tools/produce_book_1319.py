import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Printing the Future". The title "Printing the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT 3D PRINTING & ADDITIVE MANUFACTURING DAYLIGHT STYLE: A sunlit modern maker innovation lab in bright natural daylight. In the center foreground, a precision desktop 3D printer actively depositing colorful glowing filaments to fabricate an intricate geometric turbine and honeycomb structure on a heated build plate. Beside the printer rest spools of vibrant PLA filament (cyan, coral, lime), digital vernier calipers, and an open computer tablet displaying 3D CAD modeling software. Palette: 3D printer sleek black and aluminum, filament vibrant cyan and coral, and lab sunny daylight ivory. Additive manufacturing, 3D printing, CAD design, engineering innovation, bright, modern, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1319, brief, 'Printing the Future')
    print("SUCCESS:", res)

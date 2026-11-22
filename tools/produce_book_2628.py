import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Inside the World Wide Web". The title "Inside the World Wide Web" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL WEB ARCHITECTURE STYLE: A luminous, colorful visualization of World Wide Web hyperlinks and global interconnected data. Intertwining digital web threads linking interactive webpage wireframes, glowing DNS server towers, satellite data beams, and fiber-optic transatlantic cables encircling a stylized digital globe in daylight. Palette: hyperlink threads radiant cyan and emerald, data packets glowing amber, globe oceans deep blue, and background bright daylight white. World Wide Web history, internet protocols, information networks, computer science, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2628, brief, 'Inside World Wide Web internet packets hyperlinks HTML servers routing')
    print("SUCCESS:", res)

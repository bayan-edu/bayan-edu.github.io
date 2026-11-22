import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Hoover Dam". The title "The Hoover Dam" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MONUMENTAL CIVIL ENGINEERING DAYLIGHT STYLE: A sun-drenched, colossal panoramic view of Hoover Dam on the Colorado River on a bright clear day. The monumental Art Deco concrete arch-gravity dam wall spanning the rugged Black Canyon, holding back the vast deep-blue waters of Lake Mead, with intake towers standing tall and water flowing through turbine penstocks generating hydroelectricity under a brilliant desert sky. Palette: dam concrete pale sandstone, Lake Mead deep sapphire blue, canyon rocks rich terracotta ochre, and desert sky azure. Civil engineering marvel, hydroelectricity, water resource infrastructure, monumental and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2664, brief, 'Hoover Dam civil engineering Lake Mead Colorado river hydroelectric')
    print("SUCCESS:", res)

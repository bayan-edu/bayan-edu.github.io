import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Shasta Dam". The title "Shasta Dam" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CIVIL ENGINEERING HYDROPOWER DAYLIGHT STYLE: A sun-drenched, monumental panoramic view of Shasta Dam in northern California on a bright clear day. The colossal curved concrete gravity dam wall holding back the vast deep blue Shasta Lake reservoir, with water roaring through massive spillways generating clean hydroelectric power, backed by snow-capped Mount Shasta towering majestically in the distance under a sunny sky. Palette: concrete dam clean pale grey, reservoir water deep sapphire blue, surrounding pine forests evergreen, and sky brilliant azure. Civil engineering, hydroelectricity, water infrastructure, monumental and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2330, brief, 'Shasta Dam civil engineering hydroelectric power spillway reservoir')
    print("SUCCESS:", res)

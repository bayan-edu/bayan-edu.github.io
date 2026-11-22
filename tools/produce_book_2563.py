import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to View a Solar Eclipse". The title "How to View a Solar Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SAFE ECLIPSE VIEWING ASTRONOMY DAYLIGHT STYLE: A bright, sunlit outdoor observation setup in full daylight. Certified ISO solar eclipse viewing glasses with dark silvery filters resting on a star chart, beside a homemade pinhole projector box casting a sharp crescent-sun projection onto clean white cardstock, with a solar telescope filter and the partially eclipsed Sun in a clear blue sky. Palette: eclipse glasses black and silver, crescent projection golden, star chart navy and white, and sky clear sunny blue. Solar safety, eclipse viewing, optical projection, astronomy education, practical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2563, brief, 'How to View Solar Eclipse certified glasses pinhole camera sun safety')
    print("SUCCESS:", res)

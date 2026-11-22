import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Practice Makes Perfect". The title "Practice Makes Perfect" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MUSICAL MASTERY AND PRACTICE DAYLIGHT STYLE: A sunlit music conservatory practice room in morning sunshine. An exquisite polished wooden violin and horsehair bow resting on a vintage grand piano, beside an open music stand with classical sheet music, an antique wooden metronome ticking rhythmically, and warm sunbeams illuminating golden dust motes in the air. Palette: violin wood warm amber, piano glossy ebony, sheet music ivory, and sunlight radiant gold. Deliberate practice, musical discipline, cognitive skill development, dedication, warm and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2564, brief, 'Practice Makes Perfect musical violin piano practice sheet music metronome')
    print("SUCCESS:", res)

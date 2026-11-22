import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Freddy Finds the Thief". The title "Freddy Finds the Thief" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC DETECTIVE MYSTERY DAYLIGHT STYLE: A sunlit, cozy vintage detective office on a bright morning. On a polished parquet wooden floor, a high-magnification brass detective magnifying glass is focusing closely on a set of mysterious dusty pawprints and a dropped gold key. On the nearby detective desk rests a classic detective fedora hat, an open pocket notebook with sketch diagrams, and an antique brass pocket watch. Palette: polished wood floor warm amber, brass magnifying glass gleaming gold, detective notebook ivory, and sunlight clear white. Mystery investigation, detective clues, problem-solving deduction, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2185, brief, 'Freddy Finds the Thief detective magnifying glass footprints fedora clues')
    print("SUCCESS:", res)

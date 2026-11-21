import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Head Count". '
    'The title "Head Count" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SAVANNAH WILDLIFE CENSUS DAYLIGHT STYLE: A sun-drenched, radiant African savannah wilderness on a glorious morning under bright daylight. '
    'In the center foreground, an autonomous research camera trap in clean camouflage housing with solar mini-panels mounted on an acacia tree, with a researcher\'s brass binoculars and field notes resting on a sunlit rock. '
    'In the golden grasslands beyond, a majestic herd of wild zebras and towering giraffes peacefully graze under warm golden morning sunbeams and a clear azure sky. '
    'Palette: savannah golden amber, zebra crisp monochrome, acacia emerald, and vibrant sky blue. '
    'Wildlife biology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(930, brief, "Head Count")
    print("SUCCESS:", res)

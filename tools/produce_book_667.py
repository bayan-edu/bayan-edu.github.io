import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Test Pen". '
    'The title "The Test Pen" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ELECTRICAL SAFETY DAYLIGHT STYLE: A sun-drenched, radiant and tidy electrical workshop on a bright morning with natural light streaming across the workbench. '
    'In the center foreground, a professional voltage tester pen (test pen) with clear transparent insulated handle, resting on a clean wooden bench beside insulated electrical pliers, neat coils of colorful copper wire, and an open electrical circuit blueprint diagram. '
    'In the bright background, a clean pegboard with organized tools and a safety breaker panel. '
    'Palette: vibrant safety orange, bright electrical yellow, metallic copper, clean steel, and crisp white. '
    'Precise, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(667, brief, "The Test Pen")
    print("SUCCESS:", res)

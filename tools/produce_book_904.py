import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Carbon Monoxide". '
    'The title "Carbon Monoxide" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HOME SAFETY & CLEAN AIR DAYLIGHT STYLE: A sun-drenched, airy modern home on a bright sunny morning with fresh air circulating through open windows. '
    'In the center foreground, a sleek digital carbon monoxide and smoke detector mounted on a pristine wall, with a glowing green safety LED screen displaying "0 PPM SAFE AIR". '
    'On a sunlit wooden windowsill below, a thriving potted botanical air-purifying plant with glossy green leaves catches warm golden sunbeams. '
    'Palette: clean wall ivory, leafy botanical emerald, sensor safety green, and warm morning sunbeam gold. '
    'Safety science, clean air, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(904, brief, "Carbon Monoxide")
    print("SUCCESS:", res)

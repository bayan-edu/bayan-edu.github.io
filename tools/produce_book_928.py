import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Electricity & Energy - Energy". '
    'The title "Electricity & Energy - Energy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PHYSICS & CLEAN ENERGY DAYLIGHT STYLE: A sun-drenched science laboratory on a bright morning with natural daylight pouring through modern glass windows. '
    'In the center foreground, a polished chrome Newton\'s cradle with steel spheres clicking in kinetic motion, catching bright morning sunbeams. '
    'Beside it on a clean white laboratory workbench, a compact miniature solar cell powering a brightly glowing LED light bulb, a digital voltmeter, and an open notebook with colorful energy transformation diagrams. '
    'In the background, modern wind turbines spin gracefully on sunlit green rolling hills. '
    'Palette: chrome steel silver, electric filament amber, solar cobalt blue, meadow green, and bright daylight white. '
    'Physics science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(928, brief, "Electricity & Energy - Energy")
    print("SUCCESS:", res)

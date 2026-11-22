import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Mars Like?". The title "What Is Mars Like?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIGH-DEFINITION MARTIAN GEOLOGY DAYLIGHT STYLE: A sunlit, scientifically grounded panorama of the Martian surface under a dusty salmon-pink sky. In the center foreground, iron-oxide red sand ripples, layered sedimentary bedrock ledges, and rounded pebbles in a dry ancient river channel. In the midground, towering Olympus Mons and the vast canyon walls of Valles Marineris illuminated by bright sunlight. A robotic weather monitoring station mast measuring barometric pressure and atmospheric temperature. Palette: Martian rust red, hematite ochre, salmon pink sky, and solar array gold. Mars exploration, planetary geology, atmospheric science, red planet topography, educational and striking. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1703, brief, 'What Is Mars Like martian geology landscape atmosphere rovers')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Introduction to Lightning". The title "Introduction to Lightning" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ATMOSPHERIC ELECTRICAL PHYSICS DAYLIGHT STYLE: A dramatic yet bright meteorological scene illustrating thunderstorm electrostatics. A towering cumulonimbus storm cloud cross-section showing electrostatic charge separation: positive charges (+) gathering at the icy upper anvil, and negative charges (-) concentrated at the warm rain base. A brilliant, branching lightning discharge bolt striking a copper lightning rod atop a weather tower in crisp, luminous detail. Clean educational vector graphics showing stepped leader ion channels and return stroke current. Palette: electric lightning cyan, cloud billow slate grey, copper gold, and bright flash white. Atmospheric physics, lightning generation, electrostatic charge, meteorology, dynamic, powerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1713, brief, 'Introduction to Lightning atmospheric electricity physics electrostatic charge')
    print("SUCCESS:", res)

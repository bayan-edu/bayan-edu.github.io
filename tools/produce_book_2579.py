import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Simple Machines: Inclined Planes". The title "Simple Machines: Inclined Planes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MECHANICAL PHYSICS INCLINED PLANE STYLE: A bright, sunlit physics laboratory workbench in full daylight. A smooth wooden inclined plane ramp with a spring scale pulling a wheeled wooden cart upward, showing force vectors and mechanical advantage (MA = L/h), accompanied by real-world applications: a sharp steel axe wedge splitting a log and a giant spiraling Archimedes screw lifting water under sunny skies. Palette: wooden ramp polished oak, force vectors radiant cyan, steel wedge silver, and lab table clean white. Simple machines, classical mechanics, inclined planes, physics principles, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2579, brief, 'Simple Machines Inclined Planes mechanical physics ramp wedge screw')
    print("SUCCESS:", res)

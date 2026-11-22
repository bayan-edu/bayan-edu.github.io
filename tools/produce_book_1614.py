import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Spider Chronicle". The title "The Spider Chronicle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INTRICATE ARACHNOLOGY & SPIDER SILK DAYLIGHT STYLE: A sun-drenched botanical garden scene in radiant morning sunlight. In the center foreground, a magnificent, geometrically perfect orb spider web suspended between green flowering bramble branches, covered in sparkling morning dew drops that reflect the sun like jewels. A gentle, colorful yellow-and-black garden orb-weaver spider resting patiently at the center of the web. In the corner, an educational magnifying inset illustrating the microscopic protein structure of tensile spider dragline silk. Palette: dew crystal white, garden spider yellow and black, leaf emerald green, and golden morning sunbeams. Arachnology, spider silk biopolymers, nature architecture, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1614, brief, 'The Spider Chronicle arachnology orb web silk')
    print("SUCCESS:", res)

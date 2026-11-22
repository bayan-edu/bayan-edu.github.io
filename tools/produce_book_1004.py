import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Sweet Sickness". '
    'The title "A Sweet Sickness" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MEDICAL BIOCHEMISTRY & HEALTH SCIENCE DAYLIGHT STYLE: A sunlit, pristine medical biology research laboratory on a bright sunny day under natural daylight. '
    'In the center foreground, on a clean white desk: a sleek modern digital blood glucose meter displaying healthy stats, an antique glass laboratory vial labeled insulin with crystalline solution, and a colorful 3D molecular model of a glucose hexamer ring. '
    'Beside it, a crisp green apple and a classic brass microscope catching warm morning sunbeams. '
    'Palette: medical teal and cyan, crystalline lab amber, fresh apple green, and clean white. '
    'Medical science, history of diabetes, biochemistry, nutrition, bright, educational, clear, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1004, brief, "A Sweet Sickness")
    print("SUCCESS:", res)

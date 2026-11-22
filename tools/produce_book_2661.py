import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Benjamin Franklin: The Ultimate Solution Creator". The title "Benjamin Franklin" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENLIGHTENMENT INVENTIONS WORKBENCH STYLE: A bright, sunlit colonial inventor\'s workshop in daytime. Arranged on an oak desk are Franklin\'s famous practical inventions: an authentic pair of split-lens bifocal spectacles, a miniature cast-iron Franklin heating stove model, a pointed copper lightning rod model with a grounding wire, and handwritten inventor\'s sketches with a quill pen and ink pot. Palette: oak desk warm honey, cast iron stove charcoal black, bifocals silver and glass, and morning window daylight bright white. History of invention, practical science, American innovation, industrious, enlightened and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2661, brief, 'Benjamin Franklin inventions bifocals lightning rod Franklin stove daylight')
    print("SUCCESS:", res)

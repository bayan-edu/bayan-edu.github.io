import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Famous Scientists - Robert Hooke". The title "Robert Hooke & the Microscopic World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. 17TH-CENTURY HISTORIC MICROSCOPY STUDY STYLE: A warm, sunlit 17th-century Royal Society laboratory study filled with radiant morning window light. In the center foreground, the iconic historic compound microscope of Robert Hooke: ornate gold-tooled leather barrel, brass fittings, and glass water globe light-condenser with oil flame. Beside it, open folio pages of Micrographia (1665) showing the famous detailed copperplate engraving of sliced cork cells (the origin of the biological term "cell"). A slice of oak tree cork, brass specimen forceps, and drafting quills on a polished oak desk. Palette: leather mahogany brown, brass gold, parchment cream, and radiant morning sunlight. History of science, microscopy, discovery of cells, biological history, scholarly, dignified, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1680, brief, 'Famous Scientists Robert Hooke history of microscopy cork cells')
    print("SUCCESS:", res)

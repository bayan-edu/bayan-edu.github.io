import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Can You Tell the Difference Between a Butterfly and a Moth?". The title "How Can You Tell the Difference Between a Butterfly and a Moth?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT COMPARATIVE ENTOMOLOGY DAYLIGHT STYLE: A sun-drenched naturalist\'s study table in bright morning daylight. In the center foreground, a clear side-by-side comparative display: on the left, a colorful swallowtail butterfly with slender clubbed antennae and wings folded upright; on the right, a magnificent luna moth with feathery antennae and plush furry body resting with wings spread flat. Between them, a brass magnifying glass highlights the distinct antennae structures with clean educational labels. Palette: butterfly swallowtail yellow and black, moth luna mint-green, magnifying glass brass gold, and study table oak brown. Entomology, comparative insect biology, butterflies vs moths, antennae morphology, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1308, brief, 'How Can You Tell the Difference Between a Butterfly and a Moth')
    print("SUCCESS:", res)

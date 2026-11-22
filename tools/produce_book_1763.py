import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Under the Microscope". The title "Under the Microscope" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIGH-POWER MICROSCOPY & CELLULAR WONDER DAYLIGHT STYLE: A sunlit, clean biology laboratory workbench bathed in bright morning daylight. In the center foreground, an advanced optical compound research microscope with revolving turret objectives and an illuminated condenser stage. A large circular circular eyepiece field-of-view callout revealing the intricate beauty of microscopic cells: stained plant onion epidermal cells with distinct brick-like cell walls and nuclei, and spiraling green chloroplasts in Elodea leaves. Glass specimen slides, a box of precision cover slips, and pipettes with colored biological stains. Palette: optical glass cyan, stained cell magenta and emerald, microscope chrome silver and enamel white, and sunny timber desk. Microscopy, cell biology, histology, plant cells, scientific investigation, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1763, brief, 'Under the Microscope cellular biology histology optics slides')
    print("SUCCESS:", res)

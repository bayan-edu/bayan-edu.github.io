import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Stitch in Time". The title "A Stitch in Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VINTAGE TEXTILE WORKSHOP DAYLIGHT STYLE: A sunlit, artisanal tailor and sewing studio on a bright morning. In the center, a classic vintage cast-iron sewing machine with ornate golden filigree resting on a polished oak workbench, with colorful wooden spools of cotton thread, a brass tape measure, tailor\'s chalk, fabric shears, and beautifully folded quilted patchwork textiles basking in warm window sunlight. Palette: textiles warm indigo, terracotta and emerald, oak desk warm honey, and sunlight bright white. Textile craft, geometry of sewing, craftsmanship, patience, warm and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2444, brief, 'A Stitch in Time tailoring textile sewing machine craft embroidery')
    print("SUCCESS:", res)

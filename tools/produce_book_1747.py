import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Recycling & Conservation: Why Recycle?". The title "Why Recycle?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RESOURCE PRESERVATION & CIRCULAR ECONOMY SUNNY DAYLIGHT STYLE: A sunlit, inspiring environmental contrast scene bathed in radiant natural light. On one side, conserved virgin forests and clean rivers preserved by recycling paper and materials. A clear educational comparative bar chart showing energy savings: recycling aluminum saves 95% of energy compared to mining raw bauxite ore! In the foreground, a sprouting green oak seedling growing in recycled paper mulch beside a sparkling clean reusable glass water bottle. Palette: forest emerald green, recycling arrow leaf green, water glass cyan, and sunbeam gold. Environmental conservation, energy savings, resource preservation, waste reduction, uplifting, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1747, brief, 'Why Recycle conservation resource preservation circular economy')
    print("SUCCESS:", res)

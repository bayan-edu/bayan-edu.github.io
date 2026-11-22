import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Happens When You Flush?". The title "What Happens When You Flush?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT WATER ENGINEERING & TREATMENT DAYLIGHT STYLE: A clean, colorful, fascinating cutaway cross-section and diagram of modern urban water infrastructure in bright daylight. In the center, sleek transparent pipes with swirling crystal-clear sparkling water flowing into high-tech modern eco-filtration aeration chambers, with mechanical valves, brass pressure gauges, and clean bubbling purification tanks. Educational arrows and clean graphics illustrate the flow of water through nature and municipal treatment back into a sunlit clean river. Palette: sparkling aqua cyan, fresh river teal, polished brass gold, porcelain white, and sunlit sky blue. Civil engineering, water filtration, urban sanitation, environmental science, bright, educational, completely clean and daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1239, brief, 'What Happens When You Flush?')
    print("SUCCESS:", res)

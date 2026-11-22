import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "All the Pieces Matter". The title "All the Pieces Matter" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ECOSYSTEM WEB AND INTERCONNECTED BIODIVERSITY STYLE: A stunning visual representation of ecosystem interconnectivity. A sunlit natural landscape where every element connects through luminous, delicate golden web threads: a sunlit oak tree, a busy honeybee, a soil-enriching earthworm, a clear stream with swimming trout, and an owl watching over the woodland, illustrating how removing one piece impacts the whole. Palette: landscape emerald green and earth brown, connecting web threads radiant gold, stream water sapphire, and sky clear blue. Ecology, food webs, keystone species, ecological balance, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2503, brief, 'All Pieces Matter ecosystem food web biodiversity keystone species')
    print("SUCCESS:", res)

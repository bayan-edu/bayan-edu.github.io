import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Save the World". The title "Save the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL ENVIRONMENTAL RESTORATION & HOPEFUL BIOSPHERE STYLE: A sunlit, breathtaking celebration of global Earth stewardship in radiant daylight. In the center, a vibrant living globe of Earth surrounded by thriving, restored ecosystems: reforested emerald rainforests, clean turquoise ocean coral reefs, modern white wind turbines on rolling hills, and rooftop solar arrays on clean cities. Soaring eagles, leaping dolphins, and blooming wildflowers framing the planet under a brilliant sunny blue sky. Palette: Earth ocean brilliant blue, forest deep emerald, solar gold, clean white, and wildflower rainbow. Environmental conservation, ecological restoration, global stewardship, sustainability, hopeful, inspiring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1858, brief, 'Save the World planetary conservation ecological restoration biosphere')
    print("SUCCESS:", res)

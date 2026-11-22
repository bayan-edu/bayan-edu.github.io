import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Endangered Animals at a Glance". The title "Endangered Animals at a Glance" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL WILDLIFE BIODIVERSITY & CONSERVATION DAYLIGHT STYLE: A sun-drenched, harmonious natural collage of iconic endangered wildlife in radiant morning daylight. In the center foreground, a beloved giant panda happily munching fresh green bamboo leaves, a snow leopard resting gracefully on a sunlit Himalayan rocky outcrop, and a magnificent sea turtle gliding through clear turquoise waters below. A globe showing protected wildlife national parks and biosphere reserves highlighted in green under a bright sunny sky. Palette: panda black and clean white, bamboo fresh emerald green, ocean turquoise, mountain slate, and sunny gold. Wildlife conservation, endangered species, biodiversity hotspots, habitat protection, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1783, brief, 'Endangered Animals at a Glance global wildlife biodiversity protection')
    print("SUCCESS:", res)

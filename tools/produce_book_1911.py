import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mexican Long-Nosed Bat". The title "The Mexican Long-Nosed Bat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AGAVE POLLINATION MUTUALISM DAYLIGHT STYLE: A sun-drenched, dramatic desert plateau landscape in northern Mexico on a bright clear morning. In the center foreground, a wild century plant agave sending up a colossal, tree-like flowering stalk crowned with rich clusters of golden-yellow flowers dripping with nectar. A graceful Mexican long-nosed bat feeding from the blossoms, showing its specialized elongated snout and bristled tongue. Rugged desert canyons, yucca plants, and clean educational mutualism nectar-cycle graphics under sunny skies. Palette: agave flower golden yellow, agave rosettes blue-green, desert clay warm terracotta, and sunny sky blue. Agave pollination, bat conservation, desert mutualism, migratory nectar corridors, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1911, brief, 'Mexican Long-Nosed Bat agave pollination nectar desert conservation')
    print("SUCCESS:", res)

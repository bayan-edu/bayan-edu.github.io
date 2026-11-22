import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Save Your Paper, Help Earth". The title "Save Your Paper, Help Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PAPER RECYCLING & SUSTAINABLE FORESTRY DAYLIGHT STYLE: A cheerful, sunlit educational scene on a bright spring morning. In the center foreground, a green recycling bin filled with neatly folded paper, cardboard, and newspapers. Beside it, a small green pine tree sapling growing vigorously from recycled paper mulch in a biodegradable pot. In the background, a thriving, lush temperate pine and deciduous forest under a radiant sunny blue sky with fluffy white clouds. Clean circular recycling arrows and eco-friendly paper fiber icons in crisp vector style. Palette: recycling clover green, forest pine emerald, paper cream, rich potting soil brown, and sunny sky blue. Paper recycling, forest conservation, sustainability, environmental action, bright, cheerful, and uplifting. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1652, brief, 'Save Your Paper Help Earth recycling forestry conservation')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Every Drop Counts". The title "Every Drop Counts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT WATER CONSERVATION & SUSTAINABILITY DAYLIGHT STYLE: A sunlit, clean educational scene bathed in bright natural morning daylight. In the center foreground, a single crystal-clear water droplet falling from a brass garden spigot into a precision glass graduated beaker. Beside it, a thriving drought-tolerant flowering succulent and miniature drip-irrigation tubes gently nourishing green plant roots. In the background, a sunny community garden with rain collection barrels and lush vegetables under a brilliant blue sky. Palette: water aquamarine, garden emerald green, terracotta earth, brass gold, and sunny sky blue. Freshwater conservation, sustainability, environmental care, water cycle, bright and uplifting. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1605, brief, 'Every Drop Counts water conservation freshwater ecology')
    print("SUCCESS:", res)

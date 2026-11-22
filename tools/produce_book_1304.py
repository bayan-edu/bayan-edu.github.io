import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fuels of the Future". The title "Fuels of the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CLEAN ENERGY & BIOFUELS DAYLIGHT STYLE: A sunlit, high-tech renewable energy laboratory workbench bathed in bright natural daylight. In the center foreground, glass photobioreactor tubes containing vibrant emerald-green microalgae bubbling in sunlight, glass flasks of clear amber biofuel, and miniature solar hydrogen fuel cells. In the outdoor background through large laboratory windows, modern wind turbines and solar panel arrays cover rolling green hills under a bright blue sky. Palette: algae emerald green, biofuel amber gold, solar panel cobalt blue, and laboratory clean white. Renewable energy, biofuels, sustainability, environmental engineering, bright, forward-looking, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1304, brief, 'Fuels of the Future')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Take Care of Our Planet". The title "Take Care of Our Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT PLANETARY STEWARDSHIP & ECOSYSTEM DAYLIGHT STYLE: A sun-drenched, cheerful ecological paradise celebrating environmental care in radiant morning light. In the center, a beautiful living miniature Earth globe surrounded by lush green forests, clean cascading waterfalls, blooming wildflowers, and soaring birds. Renewable energy icons: a miniature white wind turbine, a solar panel array, and a green recycling leaf symbol integrated harmoniously around the globe. Fluffy white clouds, clear turquoise rivers, and a bright blue sky filled with warm sunshine. Palette: planet ocean blue, forest emerald green, solar gold, wildflower crimson, and clean cloud white. Environmental stewardship, sustainability, Earth care, conservation science, bright, joyful, and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1733, brief, 'Take Care of Our Planet environmental conservation earth stewardship')
    print("SUCCESS:", res)

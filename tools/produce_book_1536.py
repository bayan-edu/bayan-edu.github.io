import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Most Expensive House in the Universe". The title "The Most Expensive House in the Universe" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ISS ORBITAL HOME DAYLIGHT STYLE: An awe-inspiring, sun-illuminated view of the International Space Station flying in low Earth orbit bathed in brilliant sunlight. In the center foreground, the colossal space station showing its golden solar array wings, pressurized living modules, cupola observation dome, and docking adapters in intricate architectural detail. Below, the radiant blue curvature of planet Earth shows glittering turquoise coastlines and swirling white cloud patterns against the deep space sky. Palette: solar arrays rich amber gold, station modules titanium white, Earth sapphire and turquoise, and brilliant sun flare white. Space exploration, space station architecture, ISS, astronaut habitat, engineering marvel, bright, magnificent, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1536, brief, 'The Most Expensive House in the Universe')
    print("SUCCESS:", res)

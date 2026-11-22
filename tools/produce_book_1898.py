import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s It Like in Space?". The title "What\'s It Like in Space?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ORBITAL MICROGRAVITY & SPACE STATION LIFE STYLE: A sunlit, fascinating interior view of an orbital space station module in bright daylight. In the center, a perfectly spherical floating water droplet suspended in mid-air in zero gravity, reflecting the curved horizon of Earth inside. A space helmet, floating food pouches with velcro straps, a zero-gravity pen, and laptops docked to walls. Through the panoramic cupola windows, the radiant blue marble of Earth with white clouds shines brightly in sunlight. Palette: space station interior high-tech white and titanium, water droplet crystal cyan, Earth blue and white, and solar gold. Microgravity physics, space station life, astronautics, living in space, curious, wondrous, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1898, brief, 'Whats It Like in Space microgravity space station astronautics')
    print("SUCCESS:", res)

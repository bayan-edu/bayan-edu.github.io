import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Astral Bodies". The title "Astral Bodies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SPACEFLIGHT PHYSIOLOGY DAYLIGHT STYLE: A sun-illuminated space station research module bathed in natural daylight from low Earth orbit. In the center foreground, floating in microgravity: crystal-clear spherical water droplets acting like tiny magnifying lenses, nutrient food packs with hydration tubes, and zero-gravity resistance bungee exercise equipment. Through the panoramic cupola observation windows, planet Earth\'s brilliant blue oceans and cloud patterns shine under bright solar illumination. Palette: station titanium white and brushed aluminum, Earth sapphire and turquoise, water droplet crystal clear, and sunlight brilliant gold. Space medicine, human physiology in microgravity, astronaut life, space science, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1443, brief, 'Astral Bodies')
    print("SUCCESS:", res)

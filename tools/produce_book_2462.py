import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Panipuri inside a Spaceship". The title "Panipuri inside a Spaceship" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ZERO GRAVITY SPACE STATION CUISINE STYLE: Inside the bright, sunlit cupola observation module of an advanced space station. Floating freely in microgravity are crispy, golden hollow spherical panipuri puris, accompanied by shimmering, perfectly spherical droplets of spiced mint-green water hovering mid-air like floating liquid marbles, with the magnificent blue curve of planet Earth visible through the panoramic bay windows. Palette: panipuri golden-crisp brown, mint water droplets translucent emerald, space station modules high-tech silver, and Earth vibrant blue. Microgravity physics, fluid surface tension, space station life, whimsical, cultural and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2462, brief, 'Panipuri inside Spaceship zero gravity floating spherical water food space')
    print("SUCCESS:", res)

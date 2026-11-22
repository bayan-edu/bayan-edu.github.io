import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Our Changing Solar System". The title "Our Changing Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CELESTIAL MECHANICS & PLANETARY ORBITS STYLE: An awe-inspiring, sun-illuminated astronomical visualization of the solar system in educational brilliance. At the center, the brilliant golden Sun casting radiant sunbeams across geometric orbital rings holding the planets: blue Earth, red Mars, ringed Saturn, and banded Jupiter in cosmic harmony. Educational callout rings showcase planetary formation accretion disks and asteroid belts in rich, bright colors. Palette: Sun radiant gold, Earth sapphire, Mars rust red, Saturn amber, and space vibrant deep indigo. Astronomy, planetary evolution, solar system science, celestial mechanics, majestic, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1464, brief, 'Our Changing Solar System')
    print("SUCCESS:", res)

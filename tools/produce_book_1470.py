import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Satellites and Gravity". The title "Satellites and Gravity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ORBITAL GRAVITATIONAL MECHANICS DAYLIGHT STYLE: A sunlit physics study overlooking the curvature of planet Earth in daylight. In the center foreground, an antique brass desk globe of Earth, an open leather-bound volume of classical physics, and a fresh crisp red apple resting on the desk. Radiating gracefully from the globe, glowing orbital trajectory paths show a miniature gleaming satellite in permanent freefall orbit around the world, held by gravitational attraction. Palette: globe brass gold, apple vibrant red, Earth blue and white, and orbital paths radiant cyan. Physics of gravity, orbital mechanics, Isaac Newton discoveries, satellite dynamics, classic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1470, brief, 'Satellites and Gravity')
    print("SUCCESS:", res)

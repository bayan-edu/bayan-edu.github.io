import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Was the Space Shuttle?". The title "The Space Shuttle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPACE SHUTTLE ORBITAL MISSION DAYLIGHT STYLE: A magnificent, sun-illuminated view of the Space Shuttle orbiter in low Earth orbit. The Shuttle\'s payload bay doors are open, revealing the Canadarm robotic arm deploying a communications satellite. Crisp, high-definition details of the black thermal protection heat-shield tiles, delta wings, and vertical stabilizer with American flag insignia. Below, the radiant blue curve of Earth with swirling white storm clouds and turquoise shallow seas in brilliant sunlight. Palette: Shuttle orbiter black and white tiles, satellite solar panel gold and navy, Earth brilliant blue, and sunbeam radiant white. Space Shuttle program, reusable spacecraft, astronautics history, orbital mechanics, iconic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1917, brief, 'Space Shuttle orbiter reusable spacecraft Canadarm payload bay')
    print("SUCCESS:", res)

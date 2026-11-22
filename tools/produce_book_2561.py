import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Dynamics of Flight". The title "Dynamics of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FOUR FORCES OF FLIGHT AERODYNAMICS STYLE: A bright, sunlit aeronautical engineering visualization in daytime. A sleek modern jet aircraft soaring through sunlit sky, with clean, glowing educational vector arrows showing the four fundamental forces of flight: Lift upward, Weight downward, Thrust forward, and Drag rearward, with streamlines illustrating smooth airflow over the wings. Palette: jet fuselage pearl white, force vector arrows glowing gold, red, cyan and purple, and sky sunny cerulean. Aviation physics, flight dynamics, aerodynamics, engineering principles, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2561, brief, 'Dynamics of Flight aerodynamics lift drag thrust gravity four forces')
    print("SUCCESS:", res)

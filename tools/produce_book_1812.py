import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Do Airplanes Fly?". The title "How Do Airplanes Fly?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AERODYNAMIC FLIGHT PHYSICS & AIRFOIL DAYLIGHT STYLE: A sleek modern commercial jetliner soaring gracefully through clear sunny skies in bright daylight. In the foreground, a detailed cross-sectional cutaway diagram of an aerodynamic airplane wing (cambered airfoil). Clean educational vector graphics illustrating the four fundamental forces of flight: Lift (pointing up), Weight (pointing down), Thrust (pointing forward), and Drag (pointing back). Smooth laminar streamline airflow curves flowing faster over the curved top of the wing, demonstrating Bernoulli\'s principle and Newton\'s third law downwash. Palette: airplane fuselage pearl white, sky azure cyan, airflow streamlines electric blue, and lift vector coral red. Aviation physics, aerodynamics, Bernoulli\'s principle, four forces of flight, aerospace engineering, clear and dynamic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1812, brief, 'How Do Airplanes Fly aerodynamics lift Bernoulli thrust drag')
    print("SUCCESS:", res)

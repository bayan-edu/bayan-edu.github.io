import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Aerodynamics?". The title "What Is Aerodynamics?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AERODYNAMICS ENGINEERING LAB STYLE: A bright, modern aeronautical engineering wind tunnel test chamber in full daylight. A polished metallic aircraft wing airfoil section mounted in the test section, with smooth laminar smoke streamlines flowing over its curved upper camber, illustrating Bernoulli\'s principle, air pressure differentials, and clean aerodynamic lift and drag vector arrows. High-speed digital sensors and transparent inspection glass. Palette: streamlined smoke glowing cyan, airfoil polished silver-grey, airflow vectors warm gold, and lab white. Aeronautical physics, fluid dynamics, flight mechanics, engineering science, precise and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1977, brief, 'What Is Aerodynamics fluid dynamics wind tunnel airfoil lift drag')
    print("SUCCESS:", res)

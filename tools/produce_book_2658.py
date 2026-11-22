import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Story of Sadi Carnot". The title "The Story of Sadi Carnot" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. THERMODYNAMICS AND HEAT ENGINE STYLE: A bright, sunlit nineteenth-century physics and engineering study in daylight. A brass model of an idealized thermodynamic heat engine with transparent glass cylinder and moving piston, surrounded by clean pressure-volume (P-V) Carnot cycle diagrams, hot and cold thermal reservoir icons, an open thermodynamics treatise on oak desk, and a brass thermometer. Palette: engine cylinder brass gold, steam expansion translucent white, thermal diagrams crimson and ice blue, and desk rich mahogany. Thermodynamics, Carnot cycle, engine physics, industrial revolution science, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2658, brief, 'Sadi Carnot thermodynamics heat engine Carnot cycle steam piston physics')
    print("SUCCESS:", res)

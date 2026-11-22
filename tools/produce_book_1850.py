import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Kalpana Chawla". The title "Kalpana Chawla" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE ENGINEERING & SPACE EXPLORATION TRIBUTE STYLE: A sunlit aerospace engineering design studio and observatory in bright morning daylight. On a polished oak workbench: precision scale models of the Space Shuttle orbiter, wind-tunnel aerodynamic airfoil models, and computational fluid dynamics grid blueprints. An open astronautical mission flight binder, mission STS-87 and STS-107 insignia patches, and a telescope beside open sunny windows looking up into a radiant blue sky. Palette: shuttle ceramic black and white, aerospace mission navy blue, drafting parchment gold, and sky azure cyan. Aerospace engineering, Space Shuttle history, orbital mechanics, astronautics tribute, inspiring, dignified, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1850, brief, 'Kalpana Chawla aerospace engineering space shuttle Columbia')
    print("SUCCESS:", res)

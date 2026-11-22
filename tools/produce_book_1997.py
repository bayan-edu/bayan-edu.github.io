import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Whoopee... Hyperloop!". The title "Whoopee... Hyperloop!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HYPERLOOP TRANSPORTATION ENGINEERING DAYLIGHT STYLE: A sunlit, high-tech landscape in full daylight showing the future of ground transportation. A transparent, low-pressure steel and glass Hyperloop transit tube snaking gracefully across rolling green hills and modern wind turbine fields. Inside the translucent tube, an ultra-sleek, aerodynamic passenger pod propelled by magnetic levitation (maglev) streaking forward at near-supersonic speed, leaving a luminous motion blur and magnetic field lines under a bright sunny sky. Palette: pod aerodynamic pearl white and cobalt blue, magnetic fields glowing cyan, rolling hills lush green, and sunny sky azure. Maglev technology, pneumatic transit, high-speed engineering, sustainable mobility, exhilarating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1997, brief, 'Hyperloop magnetic levitation vacuum tube high speed transit engineering')
    print("SUCCESS:", res)

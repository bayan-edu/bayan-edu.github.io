import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Moons in Our Solar System". The title "The Moons in Our Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPARATIVE PLANETARY SATELLITES ASTRONOMY STYLE: A scientifically accurate and stunning array of diverse moons in space illuminated by directional sunlight. In the center foreground: sulfur-volcano moon Io with yellow volcanic calderas, smooth fractured ice-crust Europa, dark cratered Callisto, giant Ganymede, Saturn\'s golden-hazed Titan, and ice-geyser Enceladus. Jupiter\'s Great Red Spot and Saturn\'s rings glowing majestically in the background. Scale diameter measurement brackets and geological composition icons in crisp educational graphics. Palette: sulfur volcanic yellow, ice Europa crystal cyan, Titan golden amber, deep cosmic navy, and solar white. Planetary science, solar system moons, extraterrestrial geology, cryovolcanism, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1702, brief, 'Moons in Our Solar System comparative planetary satellites astronomy')
    print("SUCCESS:", res)

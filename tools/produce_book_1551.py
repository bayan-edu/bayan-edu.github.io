import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Solar Absorbers and the Future of Electricity". The title "Solar Absorbers and the Future of Electricity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RADIANT SUNLIT RENEWABLE ENERGY LANDSCAPE STYLE: A breathtaking panorama of an advanced solar thermal and photovoltaic energy park under blazing midday blue skies. In the foreground, high-efficiency crystalline silicon solar absorber panels with micro-textured anti-reflective hexagonal patterns reflecting radiant golden sunlight. A glowing copper induction coil and clean electric circuit schematics softly overlaid in clean graphic vector style. In the background, sleek white wind turbine towers turning gracefully on rolling green hills under bright blue skies. Palette: electric solar gold, deep cobalt blue, emerald green, and radiant solar white. Clean energy, high technology, bright sustainability, forward-looking engineering. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1551, brief, 'Solar Absorbers and the Future of Electricity renewable energy')
    print("SUCCESS:", res)

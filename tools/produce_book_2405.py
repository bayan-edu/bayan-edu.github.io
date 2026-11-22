import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Earth?". The title "What Is Earth?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EARTH PLANETARY SCIENCE STYLE: A breathtaking, crystal-clear view of planet Earth floating gracefully in the cosmos. The vibrant blue oceans, swirling pure white storm clouds, and richly colored continents showing green rainforests and golden deserts, with an elegant cutaway quadrant revealing the interior layers: thin rocky crust, molten mantle, and glowing metallic core. Palette: oceans deep sapphire and turquoise, continents emerald green and ochre, interior mantle glowing golden-orange, and space deep velvet black. Earth science, geology, planetary structure, environmental wonder, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2405, brief, 'What Is Earth planet geology atmosphere oceans continents biosphere')
    print("SUCCESS:", res)

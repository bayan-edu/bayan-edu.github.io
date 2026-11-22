import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Augmented Reality Has Arrived". The title "Augmented Reality Has Arrived" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPATIAL COMPUTING AR TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern architectural studio in daytime. On a clean wooden desk, lightweight modern AR smart glasses are placed next to a floating, translucent 3D holographic digital architectural model of a green solar skyscraper, with glowing interactive interface nodes, dimension annotations, and spatial point clouds interacting with real physical objects. Palette: holograms vibrant cyan and magenta, smart glasses matte black and titanium silver, desk natural oak, and sunlight clear white. Augmented reality, spatial computing, human-computer interaction, future technology, cutting-edge and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2000, brief, 'Augmented Reality AR glasses spatial computing holograms digital models')
    print("SUCCESS:", res)

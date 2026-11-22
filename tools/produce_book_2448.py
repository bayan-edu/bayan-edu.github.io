import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why is the Sky So Blue?". The title "Why is the Sky So Blue?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RAYLEIGH SCATTERING OPTICS DAYLIGHT STYLE: A luminous, scientific and nature-filled daytime sky composition. Sunlight streaming down from a radiant Sun through the Earth\'s upper atmosphere, showing clean educational prism diagrams where shorter blue wavelengths of light scatter across gas molecules in every direction, filling the firmament with a magnificent azure blue, overlooking sunlit green rolling hills and a blooming wildflower field. Palette: sky rich gradient cerulean to cyan, sunlight radiant golden-white, scattering waves glowing electric blue, and meadow emerald green. Atmospheric physics, light scattering, optics, everyday scientific curiosity, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2448, brief, 'Why is the Sky So Blue Rayleigh scattering atmospheric physics sunlight')
    print("SUCCESS:", res)

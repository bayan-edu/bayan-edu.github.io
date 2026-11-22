import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Superstars of Science". The title "Superstars of Science" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL PRIMATOLOGY DAYLIGHT STYLE: A sun-dappled, lush African forest clearing in Gombe National Park in bright morning daylight. In the center foreground, a calm, intelligent chimpanzee seated peacefully on a moss-covered fallen log, gently examining a wild fig fruit in its hands. On a flat tree stump nearby rest a field naturalist\'s equipment: heavy-duty binoculars, an open canvas-bound field notebook filled with handwritten observations and pencil sketches of primates, and a brass pocket compass. Palette: forest canopy deep emerald and jade, chimpanzee sleek dark fur, field notebook parchment and leather brown, and morning sunlight golden. Primatology, field biology, Jane Goodall legacy, wildlife conservation, bright, respectful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1288, brief, 'Superstars of Science')
    print("SUCCESS:", res)

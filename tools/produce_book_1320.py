import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rachel Carson: Writing About the Ocean". The title "Rachel Carson: Writing About the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT COASTAL MARINE ECOLOGY DAYLIGHT STYLE: A sun-drenched rocky Atlantic coastline and tidal pool in bright morning daylight. In the center foreground, a crystal-clear tidal pool teeming with vibrant marine life: pink sea anemones, green sea urchins, and orange starfish clinging to granite rocks. On a dry granite boulder above the tide pool rests an antique fountain pen, a glass specimen collecting jar, and an open leather-bound naturalist\'s journal with handwritten ocean notes. Palette: ocean water sparkling turquoise, tide pool anemone coral-pink, granite slate gray, and morning sunshine gold. Marine biology, ocean ecology, Rachel Carson literary legacy, tide pools, bright, poetic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1320, brief, 'Rachel Carson: Writing About the Ocean')
    print("SUCCESS:", res)

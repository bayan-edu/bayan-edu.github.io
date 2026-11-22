import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Night on the Reef". The title "Night on the Reef" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NOCTURNAL CORAL REEF BIOLUMINESCENCE STYLE: An enchanting nocturnal marine biology scene illuminated by underwater scientific dive lights and gentle moonlight through calm ocean waves. Hard and soft coral colonies extending delicate, translucent feeding tentacles into the water column. Bioluminescent coral fluorescing in vibrant neon green and electric orange under specialized marine blue-light torches. A nocturnal parrotfish resting safely in a transparent mucus cocoon, with red coral crabs and basket stars unfurling intricate feeding arms. Palette: fluorescent coral neon green, electric coral orange, deep sea sapphire, and moonlight cyan. Coral reef ecology, nocturnal marine life, bioluminescence, marine biology, mesmerizing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1658, brief, 'Whats This Night on the Reef nocturnal coral reef bioluminescence')
    print("SUCCESS:", res)

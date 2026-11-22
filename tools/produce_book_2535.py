import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Our Encounter with a Snow Leopard". The title "Our Encounter with a Snow Leopard" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIMALAYAN ALPINE WILDLIFE DAYLIGHT STYLE: A sunlit, breathtaking high-altitude Himalayan mountain ridge in morning light. A wild snow leopard (Panthera uncia) with dense smoky-grey fur and charcoal rosettes resting camouflage-perfect on a snow-dusted rocky precipice, its long bushy tail curled beside its paws, with dramatic snow-capped peaks and prayer flags fluttering on a distant pass under an azure sky. Palette: snow leopard fur soft smoky grey and cream, mountain cliffs granite and pure snow white, and sky high-altitude azure. Alpine ecology, snow leopard tracking, wildlife expedition, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2535, brief, 'Encounter Snow Leopard Panthera uncia Himalayan peaks alpine wildlife')
    print("SUCCESS:", res)

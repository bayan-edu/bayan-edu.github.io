import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wings in the Dark". The title "Wings in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CHIROPTERA CONSERVATION & BAT BIOLOGY STYLE: A sun-dappled nature sanctuary orchard in bright, clear twilight tones with abundant light. In the center foreground, a charming, gentle fruit bat with soft brown fur and translucent leathery wings hanging upside-down from an apple tree branch, nibbling on a sweet ripe red apple. Clean educational graphic overlays highlight delicate elongated wing finger bones and soft expanding ultrasonic echolocation sound rings. Palette: bat soft chestnut and amber, apple crisp crimson, orchard leaves fresh green, and sky warm sunset peach. Chiroptera, bat biology, echolocation, nocturnal pollinators, wildlife conservation, friendly, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1341, brief, 'Wings in the Dark')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bad (Space) Weather Cancels Pigeon Races!". The title "Space Weather & Pigeon Navigation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOMAGNETIC SOLAR STORMS & ANIMAL MAGNETORECEPTION STYLE: A sunlit, fascinating scientific contrast scene connecting space weather to animal biology. In space, a massive solar coronal mass ejection (CME) sending a blast of ionized particles that compresses Earth\'s geomagnetic shield. On Earth below in a sunlit green meadow, a handsome homing pigeon perched on a wooden release crate, looking up at the sky. Clean vector graphics illustrating the pigeon\'s internal biological magnetic compass (cryptochrome photoreceptors in the eye and magnetite in the beak) disrupted by solar magnetic fluctuations. Palette: solar flare fiery gold and orange, geomagnetic field line electric cyan, pigeon plumage blue-grey, and meadow green. Space weather, solar flares, geomagnetic storms, magnetoreception in animals, homing pigeons, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1941, brief, 'Space Weather Pigeon Races solar storms geomagnetism magnetite navigation')
    print("SUCCESS:", res)

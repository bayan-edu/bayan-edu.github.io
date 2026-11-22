import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Who Wants a Spiny Snack?". The title "Who Wants a Spiny Snack?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DEFENSIVE ANIMAL SPINES & QUILLS SUNNY MEADOW STYLE: A sunlit, charming woodland nature scene on a bright morning. In the center foreground, a cute European hedgehog curled into a protective spherical ball of sharp, banded cream-and-brown spines among oak leaves. Beside it in circular insets: the barbed quills of a North American porcupine, an Australian short-beaked echidna, and a purple sea urchin in sunlit shallow tidal rockpools. Magnified cross-section diagram showing modified keratin hair structures that form defensive spines. Palette: spine quills cream and chocolate brown, autumn oak leaf amber, meadow green, and sunny sky blue. Animal defenses, defensive spines, keratin adaptations, evolutionary armor, curious, playful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1841, brief, 'Who Wants a Spiny Snack defensive animal armor quills spines')
    print("SUCCESS:", res)

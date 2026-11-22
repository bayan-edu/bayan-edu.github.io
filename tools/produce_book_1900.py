import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Who Wants a Spiny Snack?". '
    'The title "Who Wants a Spiny Snack?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'ANIMAL DEFENSES SPINES IN NATURE DAYLIGHT STYLE: A sun-drenched natural habitat scene in bright morning sunshine. '
    'In the center foreground, an adorable, inquisitive wild hedgehog curled defensively into a prickly, protective spiny ball '
    'showing its sharp ivory-and-brown quills, alongside a spiny desert cactus blooming with vibrant yellow blossoms and a spiny horned lizard basking on a sunlit rock, '
    'illustrating how diverse animals and plants use defensive spines and prickles to deter hungry predators. '
    'Palette: hedgehog quills warm chestnut and ivory, cactus emerald green with bright yellow flowers, sunlit rock warm sandstone, and sky bright blue. '
    'Animal defense mechanisms, evolutionary adaptations, spines and quills biology, playful and educational. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1900, brief, 'Who Wants a Spiny Snack animal spines hedgehog adaptations')
    print("SUCCESS:", res)

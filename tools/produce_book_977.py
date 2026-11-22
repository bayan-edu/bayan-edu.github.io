import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "On the Prowl". '
    'The title "On the Prowl" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TROPICAL RAINFOREST WILDLIFE DAYLIGHT STYLE: A sun-drenched, radiant Borneo jungle canopy on a glorious sunny morning under bright daylight. '
    'In the center foreground, an exquisite Sunda clouded leopard with striking cloud-shaped rosettes and sleek tawny fur, resting alertly on a thick moss-covered tree limb. '
    'Surrounding the branch, vibrant blooming tropical orchids, dewy green fern fronds, and hanging jungle vines catch warm golden sunbeams. '
    'In the background, sunlit misty emerald rainforest valleys stretch beneath a clear azure sky. '
    'Palette: leopard golden tawny and charcoal rosettes, jungle canopy emerald green, orchid magenta, and bright sunbeam gold. '
    'Feline biology, wildlife conservation, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(977, brief, "On the Prowl")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Monarch Butterflies on the Move". The title "Monarch Butterflies on the Move" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MONARCH MIGRATION SANCTUARY DAYLIGHT STYLE: A breathtaking sunny mountain forest in MichoacÃ¡n, Mexico in morning sunshine. Millions of migrating Monarch butterflies (Danaus plexippus) clustering densely on the mossy trunks and branches of towering Oyamel fir trees, with clouds of brilliant orange-and-black winged butterflies taking flight into the sunlit sky like golden confetti drifting through morning sunbeams. Palette: butterfly wings fiery orange and jet black, oyamel fir needles deep forest green, and sunlight radiant warm gold. Insect migration, monarch sanctuary, ecological wonders, magnificent, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2341, brief, 'Monarch Butterflies on Move migration oyamel fir forest overwintering')
    print("SUCCESS:", res)

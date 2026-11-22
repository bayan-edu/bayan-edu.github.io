import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Save Monarch Butterflies with Milkweed". The title "Save Monarch Butterflies with Milkweed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MONARCH BUTTERFLY BOTANICAL MEADOW DAYLIGHT STYLE: A radiant, sun-soaked wildflower meadow in early summer. In the center foreground, a magnificent adult Monarch butterfly (Danaus plexippus) with brilliant orange and black patterned wings sipping nectar from clusters of blooming pink common milkweed (Asclepias syriaca) flowers. A striped Monarch caterpillar feeding on a lower green milkweed leaf and golden morning dew drops sparkling in the sunlight. Palette: monarch wings radiant orange and crisp black, milkweed blossoms soft rose pink, foliage lush green, and sunny sky cyan. Butterfly conservation, host plant ecology, pollinator gardens, vibrant, joyous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1956, brief, 'Save Monarch Butterflies with Milkweed Asclepias pollination ecology')
    print("SUCCESS:", res)

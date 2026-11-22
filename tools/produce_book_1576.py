import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Seeing the Invisible: Mutualism and Plant Reproduction". The title "Seeing the Invisible" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RADIANT BOTANICAL & ULTRAVIOLET VISION STYLE: A breathtaking split-view of a sunlit garden flower in natural daylight. On one side, a vivid yellow evening primrose blooming in bright sunshine with golden pollen. On the other side, the same flower revealed under pollinator ultraviolet light vision, showcasing glowing dark ultraviolet "bullseye" nectar guide patterns. A fuzzy golden bumblebee hovering nearby with pollen-laden legs, surrounded by sparkling floating microscopic pollen grains. Palette: sunflower yellow, ultraviolet electric violet, meadow green, pollen gold, and daylight sky blue. Mutualism, pollination ecology, insect vision, coevolution, vibrant and magical scientific wonder. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1576, brief, 'Mutualism and Plant Reproduction pollination ultraviolet nectar guides')
    print("SUCCESS:", res)

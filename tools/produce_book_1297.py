import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Brave New Zoos". The title "Brave New Zoos" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MODERN CONSERVATION HABITAT DAYLIGHT STYLE: A sun-drenched, naturalistic wildlife conservation sanctuary in bright daylight. In the center foreground, an open-concept savannah habitat with native acacia trees, a sparkling watering hole, and educational interpretive signs explaining wildlife breeding and habitat protection. In the distance across the grassy plain, tall graceful giraffes browse peacefully under a wide open blue sky with wispy clouds. Palette: savannah golden grassland, acacia canopy deep green, giraffe warm sienna and cream, and sky sunny cyan. Zoological conservation, animal welfare, habitat restoration, wildlife protection, bright, spacious, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1297, brief, 'Brave New Zoos')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Restoring Coastal Habitats for Turtles". The title "Restoring Coastal Habitats for Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT COASTAL DUNE & TURTLE SANCTUARY DAYLIGHT STYLE: A sun-drenched, pristine coastal beach in bright morning daylight. In the center foreground, rolling golden sand dunes stabilized by flourishing sea oats and purple beach morning glory vines, marked with wooden conservation flags protecting a sea turtle nesting site. In the background, crystal-clear turquoise ocean waves break gently on sandy shores under a brilliant blue sky with soaring sea gulls. Palette: sand warm golden ochre, ocean sparkling turquoise, sea oats amber and green, and sky sunny azure. Marine biology, sea turtle conservation, coastal dune restoration, coastal ecology, wholesome, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1467, brief, 'Restoring Coastal Habitats for Turtles')
    print("SUCCESS:", res)

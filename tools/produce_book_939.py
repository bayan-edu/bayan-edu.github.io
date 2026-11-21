import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Great Lakes? Not for Long". '
    'The title "Great Lakes? Not for Long" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GREAT LAKES FRESHWATER CONSERVATION DAYLIGHT STYLE: A sun-drenched, radiant coastal freshwater vista on a glorious sunny morning under a clear azure sky. '
    'In the center foreground, a modern yellow research water-quality monitoring buoy floating near smooth shoreline granite boulders in sparkling crystal-clear freshwater. '
    'Beneath the surface of the freshwater lake, schools of native fish swim over clean sandy lake beds. '
    'In the background, a historic white-and-red banded coastal lighthouse perches on a pine-crested bluff, overlooking the vast sparkling blue lake horizon in bright daylight. '
    'Palette: freshwater lake turquoise, deep cobalt, buoy safety yellow, granite grey, and sunny gold. '
    'Limnology, conservation, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(939, brief, "Great Lakes? Not for Long")
    print("SUCCESS:", res)

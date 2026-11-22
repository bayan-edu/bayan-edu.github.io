import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Mill on the Floss". The title "The Mill on the Floss" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RURAL WATERMILL DAYLIGHT STYLE: A picturesque, sun-drenched English watermill along the River Floss on a breezy summer day in bright daylight. In the center foreground, the colossal wooden waterwheel of Dorlcote Mill churning crystal-clear river water into white frothing foam. Along the grassy riverbank grow yellow water irises and weeping willows, with white burlap flour sacks stacked neatly on a wooden handcart in front of the rustic brick mill building. Palette: river water sparkling aqua, waterwheel dark weathered oak, mill brick warm terracotta, and sky summer azure. Classic Victorian literature, George Eliot, rural England, watermill mechanics, wholesome, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1424, brief, 'Reading The Mill on the Floss')
    print("SUCCESS:", res)

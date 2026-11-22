import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Monkey Orange: Much More than a Fruit". The title "The Monkey Orange: Much More than a Fruit" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AFRICAN SAVANNA BOTANY DAYLIGHT STYLE: A sun-drenched, picturesque Southern African woodland savanna in bright golden daylight. In the center foreground, a magnificent wild monkey orange tree (Strychnos spinosa) with glossy green foliage and branches laden with heavy, spherical golden-yellow monkey oranges with hard woody shells. On the grassy ground below, several cracked-open monkey oranges reveal wholesome juicy pulp and seeds, arranged beside a handwoven indigenous reed basket. Palette: monkey orange golden saffron and amber, foliage deep olive and emerald, savanna grass warm ochre, and sky sunny azure. Ethnobotany, indigenous fruits, African flora, drought-resistant agriculture, bright, wholesome, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1328, brief, 'The Monkey Orange: Much More than a Fruit')
    print("SUCCESS:", res)

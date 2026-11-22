import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Plant that Preys". '
    'The title "A Plant that Preys" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BOTANICAL CARNIVOROUS PLANT DAYLIGHT STYLE: A sunlit, lush tropical wetland conservatory on a bright sunny day under natural daylight. '
    'In the center foreground, an exquisite, magnificent carnivorous pitcher plant (Nepenthes) with translucent green and crimson speckled pitchers hanging gracefully. '
    'Droplets of sweet glistening nectar sparkle along the peristome rim under warm sunlight, with dewy tropical mosses, emerald ferns, and delicate water lilies surrounding the base. '
    'In the background, a sun-drenched greenhouse with lush tropical foliage and clear blue sky through glass panels. '
    'Palette: pitcher plant crimson and chartreuse green, dewy emerald, sunlit golden amber, and botanical ivory. '
    'Plant biology, botanical adaptations, nature, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(987, brief, "A Plant that Preys")
    print("SUCCESS:", res)

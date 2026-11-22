import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mary Kies, the First Woman to Receive a U.S. Patent". '
    'The title "Mary Kies, the First Woman to Receive a U.S. Patent" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORICAL TEXTILE CRAFTSMANSHIP & PATENT DAYLIGHT STYLE: A sun-drenched early 19th-century artisan textile workshop on a glorious sunny morning in bright daylight. '
    'In the center foreground, on a rustic polished oak workbench: an exquisite finished woven straw-and-silk bonnet hat glistening in warm morning sunlight, bundles of golden natural straw fibers, spools of lustrous colorful silk thread, and a carved wooden weaving shuttle. '
    'Beside them, an authentic historical United States patent parchment document with flourishing calligraphy, ornate border, and a stamped wax seal. '
    'In the background, sunlit workshop windows overlook green Connecticut hills under a clear blue sky. '
    'Palette: natural straw gold, silk magenta and emerald, parchment warm cream, and sunny sky blue. '
    'Invention, patent history, textile weaving, American craftsmanship, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1025, brief, "Mary Kies, the First Woman to Receive a U.S. Patent")
    print("SUCCESS:", res)

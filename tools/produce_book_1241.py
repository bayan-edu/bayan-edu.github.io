import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects". The title "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ENTOMOLOGY NATURE DAYLIGHT STYLE: A sun-drenched outdoor nature study table and garden in bright morning daylight. In the center foreground, a high-precision brass field microscope beside a large glass magnifying lens focusing on a parade of industrious red garden ants marching along a smooth fallen branch. Perched gracefully on a nearby blooming wild ginger leaf is an elegant green praying mantis. Open field notebooks with exquisite pencil sketches of insect anatomy, glass sample vials with ventilation lids, and colorful wildflowers. Palette: leaf emerald, insect amber gold, magnifying brass, floral coral, and sunlit morning ivory. Entomology, insect biodiversity, scientific observation, nature discovery, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1241, brief, 'Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects')
    print("SUCCESS:", res)

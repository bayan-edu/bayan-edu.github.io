import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Thrifting Is Trending". The title "Thrifting Is Trending" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUSTAINABLE FASHION DAYLIGHT BOUTIQUE STYLE: A bright, sunlit boutique studio dedicated to vintage clothing and textile upcycling. Neatly arranged racks of colorful vintage garments in corduroy, denim, and patterned cotton, beside a rustic wooden workbench with an antique mechanical sewing machine, colorful spools of thread, measuring tapes, and fabric scissors. Indoor potted fiddle-leaf figs and warm sunlight streaming through large loft windows. Palette: denim blue, mustard yellow, vintage sage green, and natural wood grain. Circular fashion, textile sustainability, thrifting culture, upcycling creativity, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1974, brief, 'Thrifting Is Trending vintage sustainable fashion textile recycling')
    print("SUCCESS:", res)

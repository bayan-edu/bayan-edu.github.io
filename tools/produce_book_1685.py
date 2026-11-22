import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Beautiful Breeds". The title "Beautiful Breeds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HERITAGE FARM ANIMAL DIVERSITY SUNNY PASTURE STYLE: A picturesque, sun-drenched pastoral landscape in rolling green countryside on a bright morning. In the center foreground, a harmonious group of distinctive heritage farm animal breeds grazing peacefully: a Jacob sheep with handsome multi-horned fleece, a golden Guernsey dairy cow, and a colorful heritage rooster with iridescent green tail feathers. A historic stone dry-wall fence, red wooden barn, and blooming clover meadows under sunny blue skies. Palette: clover meadow green, sheep fleece cream, cow warm amber gold, rooster iridescent emerald, and sky blue. Agricultural biodiversity, domestic animal genetics, heritage breeds, farm science, wholesome and scenic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1685, brief, 'Beautiful Breeds domestic animal genetics heritage breeds')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading Rock Strata". The title "Reading Rock Strata" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNIFICENT GEOLOGICAL CANYON STRATIGRAPHY DAYLIGHT STYLE: A brilliant, sun-drenched canyon cliff showing colorful, distinct horizontal sedimentary rock layers (strata). Red sandstone, golden limestone, grey shale, and dark coal bands stacked in perfect chronological sequence under bright sunshine. In the foreground, a geologist\'s steel rock hammer, a brass compass clinometer, and a fossil ammonite shell exposed in a split limestone nodule. Subtle educational timeline bracket indicators showing geological eras along the rock strata. Palette: terracotta red, ochre yellow, desert sand, slate grey, and brilliant canyon sky blue. Geology, Earth history, sedimentary stratigraphy, field exploration, bright and majestic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1558, brief, 'Reading Rock Strata geology sedimentary layers')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Walking in the Wild". The title "Walking in the Wild" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WILDERNESS TRAIL DISCOVERY DAYLIGHT STYLE: A sunlit, peaceful hiking trail meandering through a pristine old-growth mountain forest in full daylight. On the damp, soft soil beside the trail, distinct wild animal pawprints (deer tracks, bear tracks, rabbit tracks) lead into the trees, framed by tall wild ferns, blooming mountain laurel, and ancient moss-covered hemlocks. A wooden trail marker post with compass bearings under a clear blue sky. Palette: forest foliage deep moss green and fern lime, trail earth rich sienna brown, wildflowers soft violet, and sunlit sky cyan. Outdoor education, wildlife tracking, nature exploration, peaceful, adventurous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2367, brief, 'Walking in Wild nature trail hiking wilderness animal tracks pine forest')
    print("SUCCESS:", res)

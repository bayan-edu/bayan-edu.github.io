import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Endangered Bamboo-Eaters of Nepal: Red Pandas". '
    'The title "The Endangered Bamboo-Eaters of Nepal: Red Pandas" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HIMALAYAN WILDLIFE & RED PANDA DAYLIGHT STYLE: A sunlit, peaceful temperate Himalayan cloud forest on a glorious clear sunny morning in bright daylight. '
    'In the center foreground, an exquisite, charming red panda with dense reddish-chestnut and white fur, dark alert eyes, and a long bushy ringed tail, sitting comfortably on a thick moss-covered rhododendron branch, nibbling on tender green bamboo leaves. '
    'Dewy emerald bamboo stalks and blooming pink rhododendrons surround the branch, catching warm sunbeams. '
    'In the background, sun-drenched snow-capped Himalayan mountain peaks rise majestically beneath a clear azure sky. '
    'Palette: red panda chestnut red and white, bamboo vibrant green, rhododendron soft pink, and sky azure. '
    'Wildlife conservation, Nepal Himalayas, red pandas, endangered animals, bright, educational, charming, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1057, brief, "The Endangered Bamboo-Eaters of Nepal: Red Pandas")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Lesser Long-Nosed Bat". The title "The Lesser Long-Nosed Bat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SONORAN DESERT POLLINATION ECOLOGY STYLE: A sunlit, magnificent desert scene at dawn twilight transition in the Sonoran Desert. In the center foreground, a delicate, agile lesser long-nosed bat (Leptonycteris yerbabuenae) hovering gracefully beside a massive blooming white saguaro cactus blossom, its long muzzle dusted with golden pollen grains as it sips sweet floral nectar. Towering giant saguaro cacti, blooming ocotillo, and desert mountain peaks bathed in golden morning sunbeams under an azure sky. Palette: saguaro blossom pure white and golden pollen, cactus deep green, desert mountain terracotta ochre, and morning sky cyan. Bat pollination, chiropterophily, desert mutualism, endangered species conservation, wondrous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1910, brief, 'Lesser Long-Nosed Bat Leptonycteris saguaro pollination desert ecology')
    print("SUCCESS:", res)

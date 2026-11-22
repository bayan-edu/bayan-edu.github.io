import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bear Care". The title "Bear Care" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GIANT PANDA CONSERVATION DAYLIGHT STYLE: A sunlit, peaceful bamboo forest zoological habitat in radiant morning daylight. In the center foreground, an adorable, healthy giant panda with plush black-and-white fur seated comfortably on a smooth garden boulder, contentedly holding and chewing fresh, leafy green bamboo stalks. Around the panda are fresh shoots of bamboo, a clean stone water pool reflecting golden sunshine, and mist-crowned green hills under a bright blue sky. Palette: panda fur jet black and snowy white, bamboo fresh vibrant green, stone warm granite, and morning sun golden. Zoological care, giant panda conservation, veterinary biology, endangered species, charming, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1507, brief, 'Bear Care')
    print("SUCCESS:", res)

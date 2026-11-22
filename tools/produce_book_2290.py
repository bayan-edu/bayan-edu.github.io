import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Grass Seeker". The title "The Grass Seeker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIMALAYAN PASTORAL HIGHLANDS DAYLIGHT STYLE: A sunlit alpine meadow in the high Himalayas on a crisp morning. A gentle flock of fluffy white sheep and cashmere goats grazing peacefully on vibrant green terraced mountain pastures, with wildflowers blooming beside cold mountain streams, overlooked by soaring snow-draped Himalayan peaks under a clear azure sky. Palette: pasture grass alpine emerald, sheep wool pure white, Himalayan peaks snowy white and granite grey, and sky crisp azure. Highland ecology, pastoral traditions, mountain grasslands, serene and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2290, brief, 'The Grass Seeker pastoral nomadic migration sheep flock Himalayas meadow')
    print("SUCCESS:", res)

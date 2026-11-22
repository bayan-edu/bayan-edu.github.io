import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "California". The title "California" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CALIFORNIA LANDSCAPE & NATURE DAYLIGHT STYLE: A breathtaking, iconic panorama of California natural geography under brilliant golden sunshine in full daylight. In the center foreground, towering coastal redwood trees rising majestically toward a clear blue sky, flanked by golden sunlit rolling hills carpeted in vibrant orange California poppies. In the background, the rugged Pacific coastline meets sparkling turquoise ocean waves with misty sunbeams. Palette: California poppy brilliant golden orange, redwood bark rich terra-cotta, foliage deep evergreen, and Pacific ocean sapphire blue. California geography, natural landmarks, coastal redwoods, state flowers, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1299, brief, 'California')
    print("SUCCESS:", res)

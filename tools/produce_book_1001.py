import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Ocean Acidification?". '
    'The title "What Is Ocean Acidification?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MARINE SCIENCE & OCEAN CHEMISTRY DAYLIGHT STYLE: A sunlit, crystal-clear turquoise ocean cross-section on a bright sunny day under natural daylight. '
    'In the center foreground, an exquisite, delicate translucent sea butterfly shell (pteropod) floating gracefully in clear sea water with tiny bubbles rising, showcasing marine calcium chemistry. '
    'In the background, a colorful living coral reef with vibrant sea anemones and swimming reef fish under bright sunbeams filtering down through crystalline waters. '
    'Palette: ocean turquoise and aquamarine, coral peach and coral pink, shell pearl white, and sunlit seafoam gold. '
    'Marine biology, oceanography, chemistry, ecology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1001, brief, "What Is Ocean Acidification?")
    print("SUCCESS:", res)

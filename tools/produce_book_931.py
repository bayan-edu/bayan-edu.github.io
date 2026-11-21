import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Recycling & Conservation: Global Warming". '
    'The title "Recycling & Conservation: Global Warming" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENVIRONMENTAL CONSERVATION & GREEN EARTH DAYLIGHT STYLE: A sun-drenched, radiant ecological park on a glorious sunny morning under a spotless azure sky. '
    'In the center foreground, a modern wooden recycling station with clearly labeled, color-coded recycling receptacles (clean blue, green, and amber) beside a freshly planted young green oak sapling in dark fertile soil with a sparkling watering can. '
    'In the background, visionary green city architecture with solar-paneled roofs and clean white wind turbines turning on sunlit green hills. '
    'Palette: ecological emerald green, recycling royal blue, rich soil brown, and brilliant sky blue. '
    'Conservation science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(931, brief, "Recycling & Conservation: Global Warming")
    print("SUCCESS:", res)

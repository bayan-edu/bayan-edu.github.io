import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "She Goes to Extremes". The title "She Goes to Extremes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DUAL EXPLORATION: SPACE & DEEP SEA DAYLIGHT STYLE: An awe-inspiring, split-horizon conceptual exploration cover in bright daylight. The upper half depicts the white Space Shuttle orbiter gliding gracefully above the sunlit curvature of planet Earth against starry space. The lower half depicts the titanium deep-sea submersible Limiting Factor exploring the ocean abyss, its powerful halogen floodlights illuminating deep-sea trenches and delicate sea anemones in deep sapphire waters. Palette: space shuttle clean white, ocean abyss sapphire, floodlight brilliant gold, and Earth curvature electric blue. Extreme exploration, space and oceanography, Kathryn Sullivan pioneer legacy, science records, bright, inspiring, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1324, brief, 'She Goes to Extremes')
    print("SUCCESS:", res)

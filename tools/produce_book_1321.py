import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Robo Umps: Safe or Out?". The title "Robo Umps: Safe or Out?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SPORTS TECHNOLOGY & OPTICAL TRACKING DAYLIGHT STYLE: A sunlit major league baseball stadium home plate area on a glorious sunny afternoon. In the center foreground, clean white home plate with a genuine leather baseball and catcher\'s mitt resting on groomed red-clay dirt. Projected directly above home plate is a clean, glowing holographic 3D rectangular strike-zone tracking grid with high-speed ball trajectory tracking data arcs and high-tech optical camera sensors. Palette: baseball white and crimson stitching, clay terracotta, stadium grass emerald green, and tracking grid electric cyan. Sports analytics, optical tracking technology, automated ball-strike systems, physics of baseball, bright, dynamic, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1321, brief, 'Robo Umps: Safe or Out')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Space Invaders". The title "The Space Invaders" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ALIEN PLANETARY EXPLORATION DAYLIGHT STYLE: A sunlit, extraordinary alien planetary landscape on planet Zeron in bright daylight. In the center foreground, a sleek titanium robotic planetary exploration rover with solar wings and communication dish resting on iridescent turquoise-and-copper sands. In the alien sky overhead, twin suns illuminate towering crystalline rock spires and floating geometric sensor beacons. Palette: rover titanium white and solar gold, sand turquoise and copper, and sky alien violet-blue with twin golden suns. Science fiction, space exploration, alien worlds, planetary science, adventurous, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1390, brief, 'The Space Invaders')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "LEGO Man!". The title "LEGO Man!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TOY BRICK ARCHITECTURE WORKSHOP DAYLIGHT STYLE: A sunlit creative design studio in radiant natural daylight. In the center foreground, an awe-inspiring, intricate architectural sculpture of a majestic fantasy castle and towering skyscraper built entirely out of colorful interlocking toy building bricks. Surrounding the sculpture on a large white wooden workbench are clear sorting bins brimming with bright red, yellow, blue, and green plastic bricks, alongside technical design grid paper. Palette: toy brick primary red, sunny yellow, royal blue, forest green, and studio daylight white. Creative building, structural engineering, toy brick art, spatial design, playful, bright, cheerful, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1314, brief, 'LEGO Man')
    print("SUCCESS:", res)

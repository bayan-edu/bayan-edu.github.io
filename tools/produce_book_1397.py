import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: Little Women". The title "Little Women" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT 19TH-CENTURY NEW ENGLAND PARLOR DAYLIGHT STYLE: A sunlit, charming 19th-century family parlor on a crisp, snowy winter morning in bright daylight. In the center foreground, a warm stone fireplace with a crackling hearth, four colorful hand-knitted woolen scarves resting on a cozy sofa, an upright wooden piano with open classical sheet music, and an open artist\'s sketchpad with colored pencils on a low table. Through sunny bay windows, evergreen pine trees draped in fresh white snow glisten under a clear blue winter sky. Palette: parlor warm mahogany and rose, snow crisp white, woolen scarves jewel tones, and morning sunlight golden. Classic American literature, Louisa May Alcott, family warmth, winter coziness, cheerful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1397, brief, 'Reading Little Women')
    print("SUCCESS:", res)

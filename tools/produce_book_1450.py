import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Fizzy Reaction". The title "A Fizzy Reaction" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ELEMENTARY CHEMISTRY & EFFEFFERVESCENCE DAYLIGHT STYLE: A cheerful, brightly lit science laboratory workbench in full daylight. In the center foreground, a clear Erlenmeyer glass flask erupting with an energetic, playful fountain of sparkling fizzy white bubbles and foam from an acid-base reaction. Surrounding the flask are colorful test tubes of indicator solutions (coral, lemon yellow, sky blue), a colorful molecular ball-and-stick model, and an open chemistry workbook with cheerful diagrams. Palette: foam sparkling white, indicator liquids coral, yellow, and cyan, and lab workbench sunny daylight wood. Chemistry, chemical reactions, effervescence, acids and bases, playful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1450, brief, 'A Fizzy Reaction')
    print("SUCCESS:", res)

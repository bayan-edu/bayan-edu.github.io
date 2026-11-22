import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Matter Is Everywhere!". The title "Matter Is Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT STATES OF MATTER SCIENCE DAYLIGHT STYLE: A cheerful, brightly lit elementary science classroom workbench in full natural daylight. In the center foreground, a vivid demonstration of the three states of matter: a crystalline clear ice cube (solid) resting in a glass beaker of sparkling water (liquid), with gentle translucent steam vapor (gas) rising toward the sunny classroom window. Beside the beaker are colorful ball-and-stick molecular structure models representing solid, liquid, and gas particle spacing, and a colorful thermometer. Palette: water and glass sparkling cyan, ice crystal white, molecular model primary red, blue, and yellow, and classroom sunlight golden. Physical science, states of matter, solids liquids gases, chemistry fundamentals, bright, friendly, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1279, brief, 'Matter Is Everywhere!')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Everyday Compound or Poison?". The title "Everyday Compound or Poison?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CHEMICAL ELEMENTS & COMPOUNDS DAYLIGHT STYLE: A sunlit chemistry classroom laboratory workbench in bright daylight. In the center foreground, a clear side-by-side comparison of elements and compounds: a clear glass bowl of white crystalline table salt (NaCl) beside safe mineral samples, contrasted with amber glass laboratory reagent bottles with clear warning labels, an analytical balance, and colorful ball-and-stick molecular models. In the background, a colorful modern periodic table of elements hangs on a sunlit wall. Palette: salt crystal pure white, chemical bottles amber gold, periodic table vibrant colors, and lab table clean gray. Chemistry, chemical compounds, elements, toxicity, periodic table, clear, educational, bright, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1512, brief, 'Everyday Compound or Poison')
    print("SUCCESS:", res)

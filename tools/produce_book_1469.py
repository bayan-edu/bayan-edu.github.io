import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rusty Reactions". The title "Rusty Reactions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT OXIDATION & CORROSION CHEMISTRY DAYLIGHT STYLE: A sunlit outdoor science laboratory table in bright natural daylight. In the center foreground, a heavy nautical iron chain showing a dramatic progression: polished, shiny silver-steel links transitioning into rich, flaky reddish-orange rust (iron oxide). Beside the chain rest a glass beaker of bubbling water, a brass handheld magnifying glass focusing on the granular rust crystals, and an open chemistry lab notebook with chemical reaction equations (Fe + O2 + H2O -> Fe2O3). Palette: iron steel metallic silver, rust vibrant terracotta and burnt orange, water crystal clear, and wood table warm oak. Chemical reactions, oxidation, corrosion, chemistry education, materials science, crisp, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1469, brief, 'Rusty Reactions')
    print("SUCCESS:", res)

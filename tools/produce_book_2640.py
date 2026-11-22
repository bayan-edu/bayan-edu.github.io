import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What if something never fell back on to any planet?". The title "What If Something Never Fell Back?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ESCAPE VELOCITY AND DEEP SPACE PROBE STYLE: A breathtaking interstellar vista showing human ingenuity journeying into the infinite cosmos. A legendary deep space probe (like Voyager) with a golden record and radio dish antenna soaring beyond the heliosphere, with clean, glowing educational orbital trajectories showing parabolic escape velocity breaking free from planetary gravity wells into deep space. Palette: space probe gleaming gold and silver, trajectories radiant neon cyan, and interstellar space deep velvet indigo with radiant stars. Orbital mechanics, escape velocity, space exploration, physics thought experiments, profound and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2640, brief, 'never fell back escape velocity orbital physics spacecraft Voyager deep space')
    print("SUCCESS:", res)

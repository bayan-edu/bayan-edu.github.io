import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Long Is One Day on Other Planets?". The title "How Long Is a Day on Other Planets?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLANETARY ROTATIONAL DYNAMICS ASTRONOMY STYLE: A colorful, scientifically accurate comparative astronomy scene in space illuminated by directional sunlight. Side-by-side rotating planetary globes showing dramatic rotational differences: rapid-spinning giant Jupiter (a day is only 9.9 hours!), Earth (24 hours), Mars (24.6 hours), and ultra-slow retro-rotating Venus (a single day is 243 Earth days!). Luminous axial spin rotation vector arrows, hour indicators, and clean educational comparison clock dials. Palette: Jupiter storm band amber, Earth ocean blue, Venus golden cloud, Mars rust red, and cosmic navy. Planetary science, rotational physics, celestial mechanics, solar system comparisons, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1787, brief, 'How Long One Day Other Planets planetary rotation astronomy sidereal')
    print("SUCCESS:", res)

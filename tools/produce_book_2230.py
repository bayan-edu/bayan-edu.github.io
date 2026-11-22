import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Journey to the Centre of the Earth". The title "Journey to the Centre of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC JULES VERNE SUBTERRANEAN EXPLORATION STYLE: A magnificent, glowing subterranean wonderland. A colossal subterranean cavern illuminated by soft, ambient bioluminescent mineral glow and phosphorescent mushroom forests, revealing a vast underground sea with gentle waves lapping against a beach of fine volcanic sand and giant crystal geode formations. In the water, the sleek silhouette of an ancient prehistoric plesiosaur swimming in the distance. Palette: bioluminescent cyan and aquamarine, crystal quartz translucent white and amethyst violet, and cavern stone warm amber. Classic adventure literature, underground geology, prehistoric imagination, wondrous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2230, brief, 'Journey to the Centre of the Earth Jules Verne crystal cave underground ocean')
    print("SUCCESS:", res)

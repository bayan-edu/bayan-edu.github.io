import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Venus Flytrap". The title "The Venus Flytrap" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CARNIVOROUS BOTANY DAYLIGHT STYLE: A sun-drenched, crystal-clear macro photograph of a healthy Venus flytrap plant (Dionaea muscipula) in a coastal bog in bright morning sunlight. In the center foreground, an open bivalved leaf trap showing its vibrant pink-magenta interior lining, sensitive trigger hairs, and interlocking spiny marginal cilia, glistening with sweet digestive nectar droplets. Surrounding the plant are emerald sphagnum moss, pitcher plants, and sparkling morning dew droplets under bright daylight. Palette: trap interior vibrant fuchsia pink, trap exterior lime green, sphagnum moss emerald, and dewdrop crystal gold. Carnivorous plants, botanical adaptations, plant physiology, bog ecology, bright, colorful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1332, brief, 'The Venus Flytrap')
    print("SUCCESS:", res)

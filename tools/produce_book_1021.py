import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Is the Moon So Scarred with Craters?". '
    'The title "Why Is the Moon So Scarred with Craters?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT LUNAR GEOLOGY & ASTRONOMY STYLE: A stunning, sun-illuminated view of the cratered Moon in sharp celestial detail. '
    'In the center foreground, a detailed, dramatic close-up of the lunar surface illuminated by bright directional sunlight, showcasing intricate impact crater rims, the prominent Tycho crater with its spectacular bright ejecta rays, and dark volcanic basalt maria plains. '
    'In the corner, an elegant antique brass astronomical refracting telescope mounted on a tripod pointing toward the lunar craters. '
    'Palette: lunar regolith silvery grey and pearl white, crater shadow charcoal, telescope brass gold, and starry space navy. '
    'Astronomy, lunar geology, meteorite impacts, bright, educational, striking. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1021, brief, "Why Is the Moon So Scarred with Craters?")
    print("SUCCESS:", res)

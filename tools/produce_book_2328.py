import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Creepy Cave Crawlers". The title "Creepy Cave Crawlers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOSPELEOLOGY CAVE BIOLOGY STYLE: A fascinating subterranean limestone cavern illuminated by explorer headlamp beams. On wet, glistening stalagmites and mineral calcite draperies, specialized troglobitic cave creatures thrive: a translucent white cave salamander (olm), a long-legged cave cricket with delicate sensory antennae, and blind cave fish swimming in a crystal-clear subterranean pool. Palette: limestone rock warm ochre and slate grey, cave creatures pearlescent translucent white, and headlamp beams radiant warm gold. Cave adaptations, subterranean ecology, evolutionary biology, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2328, brief, 'Creepy Cave Crawlers biospeleology troglobites cave cricket blind salamander')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Maria and Her Comet". The title "Maria and Her Comet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. 19TH-CENTURY ASTRONOMICAL DISCOVERY STYLE: A sun-drenched rooftop observatory terrace on Nantucket island overlooking the blue Atlantic ocean in morning light. In the center, a historic brass 4-inch Dollond refractor telescope on a wooden tripod. On an outdoor wooden table: an open leather-bound astronomical observer\'s logbook with hand-sketched orbital coordinates of Comet 1847 VI (Miss Mitchell\'s Comet), a brass sextant, and celestial star globes. A delicate daylight comet with a luminous curving dust tail visible in the pale morning sky. Palette: brass telescope gold, ocean cobalt blue, parchment cream, and pale sky morning cyan. History of astronomy, comet discovery, celestial navigation, women in science, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1675, brief, 'Maria and Her Comet 1847 comet discovery astronomical history')
    print("SUCCESS:", res)

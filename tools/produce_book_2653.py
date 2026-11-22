import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Miss Bandicota Bengalensis Enters a Deep Dark Jungle". The title "Miss Bandicota Bengalensis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TROPICAL JUNGLE NATURALIST ADVENTURE STYLE: A sun-dappled tropical monsoon jungle glade in morning daylight. In the foreground, a cute, inquisitive lesser bandicoot rat (Bandicota bengalensis) with soft grey-brown fur and twitching whiskers peeking out from an intricate subterranean burrow entrance among broad jungle ferns, wild ginger blossoms, and fallen hollow bamboo stalks under morning sunbeams. Palette: bandicoot fur warm grey-brown, jungle vegetation lush emerald, ginger flowers coral red, and sunbeams luminous gold. Small mammal ecology, burrowing adaptations, jungle wildlife, curious and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2653, brief, 'Bandicota Bengalensis bandicoot rat jungle burrows nocturnal botany daylight')
    print("SUCCESS:", res)

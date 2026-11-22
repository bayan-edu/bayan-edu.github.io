import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mowgli Learns To Swim". The title "Mowgli Learns To Swim" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. JUNGLE RIVER WATERFALL DAYLIGHT STYLE: A sun-soaked, tropical jungle river swimming hole in broad daylight. A gentle, cascading waterfall tumbling into a crystal-clear turquoise pool with smooth river pebbles, where a friendly, giant sloth bear (Baloo) is splashing playfully on its back in the cool water, creating sparkling water sprays in the sun. Lush hanging jungle orchids and tropical palm fronds framing the sunny scene. Palette: river pool sparkling aquamarine and crystal white, jungle foliage rich lime and emerald green, bear fur deep warm brown, and sunlight radiant gold. Jungle adventures, swimming skills, wildlife nature, refreshing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2175, brief, 'Mowgli Learns To Swim jungle river waterfall bear Baloo swimming')
    print("SUCCESS:", res)

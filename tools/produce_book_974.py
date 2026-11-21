import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Hidden Habitats". '
    'The title "Hidden Habitats" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SPELEOLOGY & CAVE ECOLOGY DAYLIGHT STYLE: A sunlit, magnificent limestone cave entrance on a glorious morning with warm daylight pouring into the mouth of the cavern. '
    'In the center foreground, delicate glistening mineral stalactites and crystal flowstone formations catch golden morning sunbeams. '
    'A soft, velvety big-eared bat roosts naturally on the sculpted rock archway, while an ultrasonic acoustic wildlife detector with a digital frequency screen rests on a sunlit mossy stone ledge below. '
    'Through the wide cave opening in the background, a lush green temperate forest with ferns and wildflowers thrives under a brilliant azure sky. '
    'Palette: limestone warm amber, forest fern emerald green, crystal white, and sunny morning gold. '
    'Cave ecology, wildlife biology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(974, brief, "Hidden Habitats")
    print("SUCCESS:", res)

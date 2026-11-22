import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Rock Cycle". '
    'The title "The Rock Cycle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GEOLOGY & EARTH SCIENCE DAYLIGHT STYLE: A sunlit, stunning natural geological canyon and river valley under bright sunny daylight and clear blue skies. '
    'In the center foreground, on a clean sunlit rock ledge: three distinct geological specimens representing the cycle: a chunk of dark porous volcanic basalt (igneous), a piece of striped red-and-tan sandstone (sedimentary), and a polished slice of swirling banded marble/gneiss (metamorphic). '
    'Beside the specimens rest a steel geologist\'s rock hammer and a brass surveying compass. '
    'In the background, towering canyon strata cliffs and a distant smoking volcanic peak under radiant sunbeams. '
    'Palette: igneous charcoal, sandstone terracotta, metamorphic quartz white, canyon red, and sunny sky blue. '
    'Geology, earth sciences, minerals, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(997, brief, "The Rock Cycle")
    print("SUCCESS:", res)

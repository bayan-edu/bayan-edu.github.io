import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cracking Up". The title "Cracking Up: Rock Weathering" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MECHANICAL WEATHERING & FROST WEDGING GEOLOGY STYLE: A sun-drenched, dramatic alpine mountainside in crisp morning daylight. In the center foreground, a massive granite boulder split cleanly down the center by frost wedging: crystal ice lenses visible inside the deep fissure, showing how water expands by 9% upon freezing, exerting immense pressure that shatters solid bedrock. Surrounding talus scree slopes, alpine wildflowers blooming in rock cracks, and snow-capped peaks under clear blue skies. Palette: granite rock slate and quartz white, ice crystal cyan, alpine flower gold, and sunny mountain sky blue. Physical weathering, frost wedging, freeze-thaw cycles, geomorphology, rock physics, clear, dramatic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1904, brief, 'Cracking Up mechanical weathering frost wedging rock physics geology')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "We brought the river home". The title "We brought the river home" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WATERSHED RESTORATION DAYLIGHT STYLE: A sun-soaked, joyful river valley restoration in full summer daylight. A sparkling, winding freshwater river with clear bubbling riffles flowing through a revitalized community park, lined with native willow trees, flowering water mint, smooth stepping stones, and schools of small native fish swimming in the sun-dappled shallows. Palette: river water sparkling aquamarine and white foam, riverside banks lush meadow green, stepping stones warm grey, and sky clear sunny blue. Community ecology, watershed stewardship, freshwater conservation, uplifting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2297, brief, 'We brought river home watershed revival freshwater stream restoration')
    print("SUCCESS:", res)

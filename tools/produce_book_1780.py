import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Caretaking Our World\'s Water". The title "Caretaking Our World\'s Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PRISTINE WATERSHED CONSERVATION & RIVER DAYLIGHT STYLE: A sun-drenched, magnificent mountain watershed and river valley in sparkling midday light. Pure snowmelt rushing from alpine peaks into a crystal-clear rocky river, meandering through forested riverbanks and fertile agricultural meadows. In the foreground, an automated solar-powered environmental water quality monitoring station with digital telemetry sensors measuring dissolved oxygen and purity. A kingfisher perched on a riverside branch watching fish swim in the pristine clear water under sunny blue skies. Palette: river crystal aquamarine, forest spruce green, mountain snow white, sensor solar blue, and sunny gold. Watershed protection, water resource management, freshwater ecology, river conservation, bright, hopeful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1780, brief, 'Caretaking Our Worlds Water watershed protection river conservation')
    print("SUCCESS:", res)

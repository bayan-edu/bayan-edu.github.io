import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "History of Flight". The title "History of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AVIATION HISTORY TIMELINE DAYLIGHT STYLE: A sunlit sky composition charting the milestones of human aviation in bright daylight. From the historic 1903 wooden-and-canvas Wright Flyer biplane in the foreground, soaring forward into a 1930s polished aluminum propeller airliner, and culminating in a sleek modern supersonic jet cruising through upper atmospheric cirrus clouds under sunny skies. Palette: Wright Flyer wood and muslin ivory, vintage airliner polished silver, modern jet aerodynamic white, and sky bright blue. History of aviation, aerospace engineering, technological progress, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2562, brief, 'History of Flight Wright Flyer monoplane jet supersonic aviation timeline')
    print("SUCCESS:", res)

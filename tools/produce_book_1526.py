import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Not Scared ... Prepared". The title "Not Scared ... Prepared" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DISASTER PREPAREDNESS & SAFETY DAYLIGHT STYLE: A sunlit family preparedness study on a clear sunny morning in bright daylight. In the center foreground, a neatly packed red emergency preparedness supply kit, a solar-and-hand-crank emergency radio with antenna, a heavy-duty waterproof flashlight, stainless steel water canteen, and a family emergency plan checklist clipboard. Beside the kit, a clean evacuation route map and a first-aid kit under bright sunshine streaming through clean windows. Palette: emergency kit safety red, radio safety yellow and black, canteen brushed steel, and daylight bright ivory. Emergency preparedness, safety planning, disaster resilience, civil protection, reassuring, responsible, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1526, brief, 'Not Scared Prepared')
    print("SUCCESS:", res)

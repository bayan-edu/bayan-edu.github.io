import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Killing Fields". The title "Killing Fields" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ELEPHANT CONSERVATION SANCTUARY DAYLIGHT STYLE: A sun-drenched, protected African wildlife sanctuary in bright daylight. In the center foreground, a magnificent, healthy African elephant herd walking peacefully across open golden savannah grasslands toward a sparkling watering hole. In the foreground, an anti-poaching conservation ranger vehicle with radio telemetry antennas and GPS wildlife tracking equipment, symbolizing vigilant protection of wildlife. Palette: elephant slate gray, savannah golden wheat, watering hole aqua blue, and sky brilliant daylight azure. Wildlife protection, elephant conservation, anti-poaching, biodiversity sanctuary, dignified, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1312, brief, 'Killing Fields')
    print("SUCCESS:", res)

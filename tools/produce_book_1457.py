import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Finding Fault". The title "Finding Fault" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SEISMOLOGY & FAULT LINE GEOLOGY DAYLIGHT STYLE: A sun-drenched geological field research site along the San Andreas fault line in California in radiant bright daylight. In the center foreground, a dramatic natural fault scarp revealing layered geological strata with a visible tectonic offset. Beside the fault sits a modern seismic field monitoring station with a solar panel, GPS antenna, and a seismograph drum actively recording clean sinusoidal earthquake tremors on grid paper, beside a geologist\'s hammer. Palette: fault rock terracotta and ochre, seismograph steel and solar blue, vegetation desert sage green, and sky clear cyan. Geophysics, seismology, earthquake faults, plate tectonics, Earth science, adventurous, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1457, brief, 'Finding Fault')
    print("SUCCESS:", res)

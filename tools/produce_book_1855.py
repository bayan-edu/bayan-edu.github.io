import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Preparing for Volcanoes". The title "Preparing for Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VOLCANIC HAZARD MONITORING & EARLY WARNING DAYLIGHT STYLE: A sunlit, high-tech volcanic observatory station perched on a safe mountain ridge in bright daylight. On an outdoor field table: a digital electronic tiltmeter measuring ground deformation, an ultraviolet volcanic gas spectrometer sensor (measuring SO2 emissions), and a digital seismometer screen tracing volcanic tremor spikes. A clear regional volcanic hazard evacuation zone map with color-coded safety buffers. In the background, an active smoking stratovolcano under bright blue skies. Palette: safety caution orange, digital sensor cyan, hazard map yellow and green, and mountain sky blue. Volcanic hazard management, disaster preparedness, volcanology monitoring, early warning systems, scientific and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1855, brief, 'Preparing for Volcanoes hazard monitoring tiltmeters seismometers evacuation')
    print("SUCCESS:", res)

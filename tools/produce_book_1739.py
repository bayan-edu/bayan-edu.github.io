import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Compact Fluorescent Lights". The title "Compact Fluorescent Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENERGY EFFICIENCY & LIGHTING TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern physics and electrical engineering laboratory. In the center foreground, a glowing spiral compact fluorescent lamp (CFL) tube emitting clean white light, mounted beside a traditional incandescent filament bulb for comparative energy efficiency. An electrical watt-meter measuring reduced power consumption (13W vs 60W), alongside a diagram of mercury gas electron excitation and white phosphor fluorescence coating. Gleaming electronic ballasts and circuit boards on a light wooden workbench. Palette: glowing fluorescent white, electric cyan, phosphor green accent, polished brass, and timber blond. Lighting physics, energy efficiency, electrical engineering, fluorescence science, clear and modern. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1739, brief, 'Compact Fluorescent Lights electrical efficiency lighting physics')
    print("SUCCESS:", res)

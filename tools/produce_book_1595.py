import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Solar Power: From Sunlight to Electricity". The title "Solar Power" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLEAN ENERGY PHOTOVOLTAIC PHYSICS DAYLIGHT STYLE: A dazzling, sun-drenched rooftop solar installation under clear blue skies. In the center foreground, a high-efficiency monocrystalline solar panel glistening with iridescent blue reflections under brilliant direct sunbeams. A cutaway technical diagram revealing the semiconductor silicon p-n junction, showing incoming photons knocking electrons free into a glowing electric current circuit. Clean vector power meter dials, battery storage inverters, and distant city skyline in bright daylight. Palette: deep photovoltaic navy blue, electric solar gold, pure sunlight white, and sky cyan. Renewable energy, photovoltaic physics, solar engineering, sustainability, modern and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1595, brief, 'Solar Power Sunlight to Electricity photovoltaic physics')
    print("SUCCESS:", res)

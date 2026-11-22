import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Power of the Wind". The title "The Power of the Wind" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAJESTIC WIND ENERGY & ATMOSPHERIC DAYLIGHT STYLE: A vast, sunlit coastal landscape of rolling green hills overlooking a sparkling blue ocean. Towering modern white wind turbines with graceful three-blade rotors spinning in the ocean breeze under a radiant sunny sky. A cup anemometer spinning on an atmospheric weather station in the foreground, with visible dynamic wind streamlines and kinetic airflow curls sweeping across the grassy slopes. A traditional Dutch wooden windmill standing peacefully on a distant hill in harmonious contrast. Palette: wind turbine clean white, hill emerald green, ocean aquamarine, and brilliant sky blue. Renewable energy, wind power, atmospheric physics, clean technology, bright and uplifting. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1580, brief, 'The Power of the Wind wind turbine renewable energy')
    print("SUCCESS:", res)

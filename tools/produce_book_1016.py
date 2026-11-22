import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Free Transfer". '
    'The title "Free Transfer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENERGY CONVERSIONS & PHYSICS DAYLIGHT STYLE: A sunlit, inspiring physics science laboratory on a bright sunny day under natural daylight. '
    'In the center foreground, on a clean wooden table: an illuminated modern warm Edison filament bulb glowing brightly, connected by insulated copper wires to a sleek solar photovoltaic panel catching brilliant sunbeams through the window. '
    'Beside it, a polished chrome Newton\'s cradle with suspended steel spheres in motion, a glowing lemon battery demonstration, and a spinning glass Crookes radiometer. '
    'Palette: warm filament amber gold, solar panel cobalt blue, polished chrome, and sunny daylight white. '
    'Physics of energy, thermodynamics, energy transformation, bright, educational, dynamic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1016, brief, "Free Transfer")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Volcanoes: Magma Rising - Volcanic Eruptions". '
    'The title "Volcanoes: Magma Rising - Volcanic Eruptions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT VOLCANOLOGY & GEOLOGICAL EARTH SCIENCE DAYLIGHT STYLE: A sunlit, dramatic volcanic island vista on a glorious sunny morning under a clear azure sky. '
    'In the center, a magnificent stratovolcano cone with rivers of radiant, glowing orange-red molten basalt lava flowing through dark volcanic rock channels into the turquoise sea, producing billowing white steam clouds. '
    'In the foreground on a dark basalt rock ledge, a modern digital seismic monitoring station with glowing LED readouts and a titanium geological sampling tool catch bright sunbeams. '
    'Lush tropical green slopes thrive on the fertile ancient volcanic soil in the distance. '
    'Palette: glowing magma orange-red, volcanic basalt charcoal, steam white, and ocean turquoise. '
    'Earth science, geology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(965, brief, "Volcanoes: Magma Rising - Volcanic Eruptions")
    print("SUCCESS:", res)

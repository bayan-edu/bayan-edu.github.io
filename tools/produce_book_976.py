import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mercury: Basic Facts". '
    'The title "Mercury: Basic Facts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PLANETARY ASTRONOMY & GEOLOGY DAYLIGHT STYLE: A sun-illuminated, majestic cosmic view of planet Mercury glowing under the brilliant nearby sun. '
    'In the center, Mercury displays its intricate cratered silicate crust and dark volcanic plains, with a sleek educational semi-transparent diagram illustrating its massive dense metallic iron core. '
    'In the orbital foreground, a modern dual-winged scientific space orbiter with solar arrays and a magnetometer instrument conducts geological measurements. '
    'Palette: cratered slate grey, core metallic gold, solar flare amber, and deep cosmic sapphire. '
    'Planetary science, astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(976, brief, "Mercury: Basic Facts")
    print("SUCCESS:", res)

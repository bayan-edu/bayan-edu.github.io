import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Helicopter?". The title "What Is a Helicopter?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ROTORCRAFT AERODYNAMICS & FLIGHT PHYSICS DAYLIGHT STYLE: A sun-drenched, high-performance modern search-and-rescue helicopter in bright daytime skies. In the center foreground, the helicopter hovering steadily with main rotor blades spinning in a blur of dynamic airflow streamlines. Detailed educational callouts showing rotor blade aerodynamics: cyclic pitch control, collective pitch tilting the rotor disc, and the tail rotor counteracting engine torque reaction. Coastal helipad below with emerald hills and sunny blue skies. Palette: helicopter rescue high-visibility red and white, rotor blur chrome, sky bright azure cyan, and coastal green. Aeronautical engineering, helicopter aerodynamics, rotary-wing flight, lift and antitorque physics, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1915, brief, 'What Is a Helicopter rotorcraft aerodynamics cyclic collective antitorque')
    print("SUCCESS:", res)

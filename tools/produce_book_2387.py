import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sea Turtles Find Their Beach". The title "Sea Turtles Find Their Beach" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARINE GEOMAGNETIC NAVIGATION STYLE: A sun-drenched, crystal-clear turquoise ocean scene off a tropical coast. A majestic adult loggerhead sea turtle with intricately patterned amber and brown carapace swimming gracefully through sunbeams, guided by gentle, glowing geomagnetic field lines and oceanic gyre currents depicted as elegant golden wave trajectories leading toward a sunlit nesting beach on the horizon. Palette: ocean water luminous turquoise and aquamarine, sea turtle shell warm amber-brown, geomagnetic lines glowing gold, and sunny sky blue. Animal migration, magnetoreception navigation, sea turtle conservation, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2387, brief, 'Sea Turtles Find Beach geomagnetic navigation loggerhead ocean current')
    print("SUCCESS:", res)

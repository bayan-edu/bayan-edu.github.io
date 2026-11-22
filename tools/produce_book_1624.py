import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "\\"Seven Minutes of Terror,\\" Eight Years of Ingenuity". The title "Seven Minutes of Terror" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE MARS ROVER DESCENT & ENTRY DAYLIGHT STYLE: A thrilling, scientifically accurate scene of the Mars rover Sky Crane descent stage over Gale Crater on Mars in daylight. The rocket-powered descent stage firing pulsed hydrazine thrusters, lowering the robotic exploration rover on nylon tethers to the rusty Martian surface. A giant supersonic parachute drifting in the thin Martian pinkish-tan sky in the upper background. Martian red rocks, crater walls, and landing telemetry vector graphics in crisp detail. Palette: Martian rust red, hydrazine rocket flame orange, rover metallic gold and white, and crater dust amber. Space exploration, Mars landing engineering, aerospace robotics, telemetry science, dramatic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1624, brief, 'Seven Minutes of Terror Mars rover sky crane entry descent landing')
    print("SUCCESS:", res)

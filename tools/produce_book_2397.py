import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Super Bowl". The title "Super Bowl" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPORTS SCIENCE AND FOOTBALL PHYSICS DAYLIGHT STYLE: A sun-drenched, grand football stadium on game day in full daylight. In the center, an authentic pebble-grained leather football spiraling in mid-air above the vibrant green turf yard lines and goalposts, surrounded by clean, glowing parabolic flight trajectory curves, angular momentum vectors, and aerodynamic drag equations illustrating the physics of the spiral pass. Confetti drifting through golden sunbeams in the stadium bowl. Palette: football leather rich chestnut brown with white laces, field turf emerald green, parabolic trajectory radiant yellow, and sky bright blue. Physics of sports, aerodynamics, projectile motion, athletic engineering, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2397, brief, 'Super Bowl American football physics stadium turf pigskin trajectory')
    print("SUCCESS:", res)

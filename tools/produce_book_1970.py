import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Many Cars, No Drivers?". The title "Many Cars, No Drivers?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AUTONOMOUS VEHICLE ENGINEERING DAYLIGHT STYLE: A sunlit, futuristic smart city boulevard on a bright clear day. Modern electric autonomous cars cruising smoothly along orderly lanes, equipped with spinning roof-mounted LiDAR sensors, displaying clean, glowing 3D computer vision bounding boxes and radar point cloud mapping around roadway markings and traffic signals. Glass skyscrapers and urban solar trees under sunny skies. Palette: sleek cars metallic white and pearl blue, LiDAR pulses neon cyan, roadway asphalt charcoal, and sunny sky blue. Self-driving car technology, robotics, smart transportation, urban engineering, forward-looking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1970, brief, 'Many Cars No Drivers autonomous vehicles lidar radar smart mobility')
    print("SUCCESS:", res)

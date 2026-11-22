import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bot Man". The title "Bot Man" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ROBOTICS AND MECHATRONICS LAB DAYLIGHT STYLE: A bright, sunlit advanced robotics engineering laboratory in daytime. In the center, a state-of-the-art robotic humanoid mechanical arm and torso assembly made of matte white composite armor and lightweight titanium joints, delicately holding a miniature potted green sprout with precision touch-sensor fingers, surrounded by circuit blueprints, soldering stations, and robotic micro-controllers. Palette: robot chassis pearl white and metallic silver, sensor lights gentle cyan, desk natural birch, and sunlight clear white. Robotics engineering, mechatronics, sensor feedback, artificial intelligence, forward-looking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the mechanical robot arm/torso). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2335, brief, 'Bot Man robotics humanoid robot artificial intelligence engineering')
    print("SUCCESS:", res)

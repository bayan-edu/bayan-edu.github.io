import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Robonaut?". The title "What Is Robonaut?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ADVANCED SPACE HUMANOID ROBOTICS DAYLIGHT STYLE: A high-tech space exploration scene inside the brightly illuminated Destiny laboratory module on the International Space Station. In the center, NASA\'s Robonaut 2 (R2): an advanced dexterous robotic torso with polished white thermal composite armor, gold visor helmet, and articulated multi-jointed robotic fingers holding a diagnostic space tool. Gleaming avionics racks, experiment lockers, and clean blue-and-white earth visible through module portholes. Palette: Robonaut titanium white and gold visor, space lab metallic pearl, and Earth ocean blue. Space robotics, Robonaut, autonomous manipulation, artificial intelligence in space, NASA engineering, futuristic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE (ROBOTIC ONLY). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1916, brief, 'What Is Robonaut humanoid space robotics NASA dexterous manipulation')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Deep-Sea Detectives". The title "Deep-Sea Detectives" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARINE ARCHAEOLOGY & UNDERWATER EXPLORATION STYLE: A high-tech marine archaeological exploration scene on the sea floor. An advanced yellow unmanned robotic submersible (ROV) with high-intensity LED searchlights illuminating the resting place of an ancient classical trading shipwreck. Ancient terracotta amphorae jars, encrusted with sea fans and sponges, resting neatly on the rippled white sand seabed. A 3D multibeam sonar bathymetric seafloor mapping grid floating above the wreck site in glowing cyan lines. Palette: ROV safety yellow, searchlight brilliant beam white, deep ocean navy, amphora terracotta orange, and sonar electric cyan. Marine archaeology, underwater robotics, sonar mapping, maritime history, ocean science, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1781, brief, 'Deep Sea Detectives marine archaeology sonar exploration ROV')
    print("SUCCESS:", res)

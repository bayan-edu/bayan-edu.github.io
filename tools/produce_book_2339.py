import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ghost Fishing: A Scary Prospect for Marine Life". The title "Ghost Fishing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEAN CLEANUP CONSERVATION DAYLIGHT STYLE: A sunlit underwater scene in the open ocean with shafts of morning light. A specialized modern autonomous ocean cleanup vessel on the surface using underwater robotic robotic arms with grappling claws to safely recover an abandoned derelict nylon ghost fishing net from a coral reef, liberating trapped sea life and restoring the seabed under sunny skies. Palette: ocean water deep azure, ghost net nylon teal-grey, cleanup robotic gear high-visibility yellow and silver, and sunlight golden. Ocean stewardship, marine pollution cleanup, derelict gear retrieval, hopeful, proactive and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2339, brief, 'Ghost Fishing derelict gear ocean cleanup marine conservation nets')
    print("SUCCESS:", res)

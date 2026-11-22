import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Killer Whales: Predators the Size of a School Bus". The title "Killer Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ORCA APEX PREDATOR OCEAN DAYLIGHT STYLE: A sun-drenched Pacific Northwest coastal sound in crisp morning daylight. A majestic adult bull orca (Orcinus orca) with a towering six-foot dorsal fin leaping powerfully in a breach out of deep blue ocean water, flinging sparkling white sea spray into the sunlit air, displaying its sleek glossy black back and brilliant white eye patch and belly markings. A pod of orcas swimming behind against rugged coastal evergreen islands and misty mountains under a bright blue sky. Palette: orca markings glossy jet-black and pure white, ocean water deep Pacific blue and white sea foam, and sky clear cyan. Marine mammalogy, orca echolocation, pod hunting strategies, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2391, brief, 'Killer Whales Orcinus orca pod breaching ocean dorsal fin daylight')
    print("SUCCESS:", res)

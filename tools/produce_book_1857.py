import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Protecting Furry Mammals of the Sea". The title "Furry Mammals of the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PACIFIC SEA OTTER & KELP FOREST SANCTUARY STYLE: A sun-drenched, crystal-clear coastal Pacific cove in sparkling midday sunlight. In the center foreground, an adorable, healthy sea otter floating peacefully on its back wrapped loosely in golden giant kelp fronds. The otter is balancing a sea urchin on its furry chest, its dense, waterproof fur glistening in the sun with water beads. Sunbeams pierce through the emerald-and-gold kelp canopy, where schools of fish swim peacefully in the protected marine sanctuary under blue skies. Palette: otter fur warm rich brown and cream, kelp amber gold, ocean turquoise, and sunbeam radiant white. Marine mammal conservation, sea otter ecology, kelp forest ecosystems, keystone species, endearing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1857, brief, 'Protecting Furry Mammals Sea sea otters kelp forest conservation')
    print("SUCCESS:", res)

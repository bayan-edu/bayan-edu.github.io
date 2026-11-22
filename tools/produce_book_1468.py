import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Roseate Spoonbills: Migrating through the Mangroves". The title "Roseate Spoonbills: Migrating through the Mangroves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUBTROPICAL MANGROVE ORNITHOLOGY DAYLIGHT STYLE: A sunlit, crystal-clear coastal mangrove estuary in Florida in bright morning daylight. In the center foreground, a magnificent roseate spoonbill wading gracefully in shallow tidal waters, displaying its dazzling carmine-pink and rose wings, orange tail feathers, and unique spatulate spoon-shaped bill foraging for minnows. Surrounding the bird are arched green mangrove prop roots, blossoming yellow mangrove flowers, and sparkling sunbeams dancing on the water. Palette: spoonbill carmine pink and rose, mangrove foliage lush emerald, water clear aquamarine, and sunlight bright gold. Ornithology, wading birds, mangrove ecosystems, Florida wildlife, colorful, magnificent, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1468, brief, 'Roseate Spoonbills Migrating through the Mangroves')
    print("SUCCESS:", res)

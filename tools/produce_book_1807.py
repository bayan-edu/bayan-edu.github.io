import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Big Idea about Marine Biology? Life in the Ocean". The title "Life in the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT MARINE BIOLOGY & OCEAN DIVERSITY DAYLIGHT STYLE: A sun-dappled, crystalline tropical ocean underwater paradise in sparkling midday sunlight. In the center foreground, a magnificent sea turtle gliding gracefully over a thriving, colorful coral reef garden of staghorn corals and sea fans. Schooling silvery fish darting in formation, an orange clownfish peeking from sea anemone tentacles, and a manta ray soaring gracefully in the sunlit background. Marine biology specimen collection slates, plankton net diagrams, and water salinity measurement tools in clean educational graphics. Palette: ocean lagoon turquoise, coral violet and orange, sea turtle amber, and sunbeam radiant gold. Marine biology, ocean life, coral reef ecology, pelagic biodiversity, ocean conservation, joyful, brilliant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1807, brief, 'Marine Biology Life in the Ocean pelagic coral marine ecosystems')
    print("SUCCESS:", res)

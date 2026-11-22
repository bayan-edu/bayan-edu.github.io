import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fish: Animals That Live Underwater". The title "Fish: Animals Underwater" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUN-DAPPLED CORAL REEF ICHTHYOLOGY STYLE: A breathtaking, crystal-clear tropical coral reef lagoon filled with shimmering midday sunbeams. In the center foreground, a magnificent, vibrant collection of diverse fish showing specialized aquatic adaptations: a vibrant orange-and-white clownfish darting among sea anemone tentacles, a yellow longnose butterflyfish, a sleek blue tang, and a graceful spotted eagle ray gliding in the background. An educational anatomical callout illustrating operculum gill breathing and lateral line sensory systems. Palette: clownfish bright orange, tang electric blue, butterflyfish yellow, coral reef aquamarine, and sunbeam gold. Ichthyology, marine biology, aquatic adaptations, coral reef fish, cheerful, brilliant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1698, brief, 'Fish Animals That Live Underwater ichthyology gills fins')
    print("SUCCESS:", res)

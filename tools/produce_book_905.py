import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Creatures of the Reefs". '
    'The title "Creatures of the Reefs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CORAL REEF MARINE BIOLOGY DAYLIGHT STYLE: A sun-drenched, crystal-clear turquoise tropical coral reef on a glorious sunny morning with dancing caustic sunbeams illuminating the ocean depths. '
    'In the center foreground, a thriving marine ecosystem: bright orange clownfish swimming around a soft sea anemone, a magnificent green sea turtle gliding through turquoise water, and a giant clam showing an iridescent cobalt-blue mantle. '
    'Surrounded by healthy branching staghorn and brain corals in vivid coral pink, emerald green, and golden amber. '
    'Palette: pristine lagoon turquoise, clownfish orange, coral pink, iridescent blue, and sunlight gold. '
    'Marine life, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(905, brief, "Creatures of the Reefs")
    print("SUCCESS:", res)

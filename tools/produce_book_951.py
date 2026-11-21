import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Crazy Camouflage". '
    'The title "Crazy Camouflage" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MARINE CAMOUFLAGE BIOLOGY DAYLIGHT STYLE: A sunlit, crystal-clear tropical coral lagoon on a glorious sunny morning with dancing golden caustic sunbeams. '
    'In the center foreground, an astonishing miniature pygmy seahorse seamlessly camouflaged among textured pink-and-gold seafan gorgonian coral branches. '
    'On the fine sandy seabed below, a speckled peacock flounder blends naturally with smooth multi-colored river stones and shell fragments. '
    'Surrounded by vibrant turquoise ocean water, healthy green sea grasses, and bright daylight illumination. '
    'Palette: seafan coral pink, lagoon crystal turquoise, pebble sand gold, and caustic sunlight amber. '
    'Marine biology, camouflage, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(951, brief, "Crazy Camouflage")
    print("SUCCESS:", res)

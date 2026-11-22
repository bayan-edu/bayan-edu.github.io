import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Arthropods: Animals with Lots of Legs!". The title "Arthropods!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT PHYLUM ARTHROPODA EXPLORATION DAYLIGHT STYLE: A sun-drenched, cheerful natural history exploration scene on a mossy fallen log in a bright forest clearing. In the foreground, a fantastic, colorful array of diverse arthropods celebrating segmented bodies and jointed legs: a shiny blue metallic scarab beetle, a gentle multi-legged garden millipede curling into a spiral, a spotted ladybug, a striped bumblebee, and a small jumping spider. An explorer\'s brass magnifying glass highlighting the chitinous exoskeleton and compound eyes in bright daylight. Palette: scarab metallic blue, ladybug red, leaf moss green, amber bark brown, and sunny yellow. Arthropod biology, entomology, jointed appendages, chitin exoskeletons, cheerful, vibrant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1696, brief, 'Arthropods Animals with Lots of Legs exoskeleton entomology')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pollinators". The title "Pollinators" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT WILDFLOWER MEADOW & POLLINATOR DIVERSITY STYLE: A sun-drenched, blooming wildflower meadow in radiant midday summer sunlight. A glorious celebration of nature\'s key pollinators in action: a fuzzy golden bumblebee packed with yellow pollen foraging on purple coneflowers; a ruby-throated hummingbird hovering beside scarlet trumpet honeysuckle; and a swallowtail butterfly drinking nectar from yellow black-eyed susans. Microscopic pollen grains glistening in the sunbeams under a cloudless azure sky. Palette: coneflower magenta, honeysuckle scarlet, sunflower yellow, meadow emerald, and bumblebee fuzzy gold. Pollination ecology, pollinator conservation, mutualism, flower-pollinator coevolution, joyful, brilliant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1907, brief, 'Pollinators mutualism pollination ecology bees hummingbirds butterflies')
    print("SUCCESS:", res)

import os

books = [
    {
        "id": 1975,
        "title": "Tiger Watch",
        "intent": "Tiger Watch Panthera tigris Bengal tiger conservation jungle daylight",
        "brief": (
            'Book cover design titled "Tiger Watch". '
            'The title "Tiger Watch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BENGAL TIGER CONSERVATION DAYLIGHT STYLE: A sunlit, dense tropical monsoon forest in India on a bright morning. '
            'In the center foreground, a magnificent royal Bengal tiger (Panthera tigris) prowling with quiet majesty through sun-dappled bamboo thickets, '
            'its vibrant orange coat with rich black stripes and white facial accents illuminated by golden sunbeams filtering through the forest canopy. '
            'Lush green ferns and wild sal tree trunks under a clear morning sky. '
            'Palette: tiger fur rich fiery orange and jet black, jungle foliage emerald and lime green, and morning sunlight golden amber. '
            'Apex predator ecology, tiger tracking, wildlife conservation, regal and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1976,
        "title": "Tugboats: Pushers and Pullers",
        "intent": "Tugboats Pushers and Pullers maritime engineering harbor shipping",
        "brief": (
            'Book cover design titled "Tugboats: Pushers and Pullers". '
            'The title "Tugboats: Pushers and Pullers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARITIME ENGINEERING DAYLIGHT STYLE: A busy, sunlit commercial seaport harbor on a bright clear day. '
            'In the center, a rugged, powerful red and white harbor tugboat churning white frothy water with its heavy-duty propellers, '
            'guiding a massive colorful cargo container ship into dock with thick synthetic towlines under bright sunny skies. '
            'Harbor cranes, navigation buoys, and seagulls gliding over glistening deep blue harbor waves. '
            'Palette: tugboat bold red and crisp white, ocean deep sapphire, container ship colorful shipping boxes, and bright blue sky. '
            'Naval engineering, harbor navigation, maritime power, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1977,
        "title": "What Is Aerodynamics?",
        "intent": "What Is Aerodynamics fluid dynamics wind tunnel airfoil lift drag",
        "brief": (
            'Book cover design titled "What Is Aerodynamics?". '
            'The title "What Is Aerodynamics?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AERODYNAMICS ENGINEERING LAB STYLE: A bright, modern aeronautical engineering wind tunnel test chamber in full daylight. '
            'A polished metallic aircraft wing airfoil section mounted in the test section, with smooth laminar smoke streamlines flowing over its curved upper camber, '
            'illustrating Bernoulli\'s principle, air pressure differentials, and clean aerodynamic lift and drag vector arrows. '
            'High-speed digital sensors and transparent inspection glass. '
            'Palette: streamlined smoke glowing cyan, airfoil polished silver-grey, airflow vectors warm gold, and lab white. '
            'Aeronautical physics, fluid dynamics, flight mechanics, engineering science, precise and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1978,
        "title": "What Is Antarctica?",
        "intent": "What Is Antarctica polar geography icebergs glaciers emperor penguins",
        "brief": (
            'Book cover design titled "What Is Antarctica?". '
            'The title "What Is Antarctica?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANTARCTIC POLAR LANDSCAPE DAYLIGHT STYLE: A breathtaking Antarctic vista bathed in brilliant 24-hour polar summer sunshine. '
            'Colossal tabular icebergs with translucent turquoise underwater shelves floating in crystal-still polar waters, '
            'backed by soaring snow-covered glaciers and nunatak mountain peaks. A small colony of emperor penguins with sleek black and white plumage and golden neck patches standing gracefully on pristine pack ice. '
            'Palette: glacier ice turquoise cyan and brilliant white, polar water deep navy, penguin accents golden yellow, and sky crisp pale blue. '
            'Polar geography, climate science, Antarctic wildlife, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1979,
        "title": "Who Was Neil Armstrong?",
        "intent": "Neil Armstrong Apollo 11 Moon landing lunar module footprint",
        "brief": (
            'Book cover design titled "Who Was Neil Armstrong?". '
            'The title "Who Was Neil Armstrong?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'APOLLO 11 HISTORIC LUNAR LANDING STYLE: A dramatic and historic lunar surface scene in pristine detail. '
            'In the foreground, the famous crisp astronaut boot footprint pressed into fine grey lunar regolith dust beside a scientific lunar experiment package. '
            'In the middle ground, the gold-foil-wrapped Apollo 11 Lunar Module "Eagle" standing on its landing pads, with our vibrant blue-and-white marbled Earth hanging gracefully in the black cosmos above. '
            'Palette: lunar dust fine silver-grey, lunar module gold foil, Earth ocean sapphire and cloud white, space deep velvet black. '
            'Space exploration history, lunar science, engineering triumph, iconic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1981,
        "title": "The Bone Puzzle",
        "intent": "The Bone Puzzle skeletal biology osteology comparative anatomy",
        "brief": (
            'Book cover design titled "The Bone Puzzle". '
            'The title "The Bone Puzzle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OSTEOLOGY COMPARATIVE ANATOMY DAYLIGHT STYLE: A bright, sunlit paleontologist and comparative anatomist\'s laboratory workbench. '
            'Clean skeletal specimens of various vertebrates arranged like interlocking jigsaw puzzle pieces: bird hollow wing bones, dolphin flipper bones, and mammalian leg bones, '
            'demonstrating homologous structures across species, with calipers, magnifying lenses, and educational anatomical labels on aged parchment. '
            'Palette: bone natural ivory and cream, parchment warm beige, brass tools gold, and workbench light oak. '
            'Skeletal biology, evolution, comparative anatomy, bone structure, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1982,
        "title": "Mukhil's Bloody Adventure",
        "intent": "circulatory system red blood cells platelets heart capillaries biology",
        "brief": (
            'Book cover design titled "Mukhil\'s Bloody Adventure". '
            'The title "Mukhil\'s Bloody Adventure" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HUMAN CIRCULATORY SYSTEM MICROBIOLOGY STYLE: A colorful, high-detail scientific microscopic voyage through a human blood vessel. '
            'Smooth, biconcave red blood cells (erythrocytes) tumbling through a sunlit, translucent capillary along with golden platelets and a protective white blood cell (leukocyte). '
            'Glowing oxygen molecules exchanging across the capillary wall, with a stylized anatomical heart cross-section in the background. '
            'Palette: red blood cells vibrant ruby crimson, oxygen molecules radiant cyan, blood plasma warm golden translucent, and capillary walls soft rose. '
            'Circulatory biology, hematology, cardiovascular health, exciting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1984,
        "title": "Fly Safe, Godavan",
        "intent": "Godavan Great Indian Bustard Ardeotis nigriceps grassland conservation",
        "brief": (
            'Book cover design titled "Fly Safe, Godavan". '
            'The title "Fly Safe, Godavan" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GREAT INDIAN BUSTARD CONSERVATION DAYLIGHT STYLE: A sun-soaked semi-arid grassland savannah in Rajasthan at morning light. '
            'In the center foreground, a magnificent Great Indian Bustard (Godavan / Ardeotis nigriceps) walking gracefully among tall golden sewan grasses, '
            'showing its long white neck, black crown crest, and patterned brown wings. In the background, bird diverter spirals installed on powerlines to ensure safe flight under sunny skies. '
            'Palette: golden savannah yellow, bustard plumage earthy brown and pure white, and bright desert morning sky azure. '
            'Endangered bird conservation, grassland ecology, wildlife safety, poignant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1985,
        "title": "My Appa and his Sounds",
        "intent": "Appa sounds acoustic percussion instruments mridangam soundwaves",
        "brief": (
            'Book cover design titled "My Appa and his Sounds". '
            'The title "My Appa and his Sounds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ACOUSTICS AND TRADITIONAL SOUNDSCAPES DAYLIGHT STYLE: A sunlit, artistic musical workshop filled with rich acoustic instruments. '
            'In the center, a handcrafted wooden classical mridangam drum and tuned bronze singing bowls resting on a hand-woven reed mat, '
            'with colorful, harmonious acoustic frequency soundwaves and musical resonance vibrations rippling softly through the sunlit air. '
            'A gentle breeze carrying morning sunlight across brass bells and polished teak wood. '
            'Palette: wood tones warm mahogany and teak, brass warm gold, reed mat natural amber, and soundwaves radiant cyan. '
            'Acoustics physics, sound vibration, musical instruments, warm, lyrical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1991,
        "title": "The Blue Beautiful Butterfly",
        "intent": "Blue Beautiful Butterfly Morpho peleides structural color rainforest",
        "brief": (
            'Book cover design titled "The Blue Beautiful Butterfly". '
            'The title "The Blue Beautiful Butterfly" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TROPICAL BLUE MORPHO BOTANICAL DAYLIGHT STYLE: A radiant, sunlit tropical rainforest garden in full daylight. '
            'In the center foreground, a colossal, breathtaking Blue Morpho butterfly (Morpho peleides) resting with open wings on an exotic white tropical orchid flower. '
            'The butterfly\'s wings shimmer with intense metallic cobalt and electric sapphire iridescence (structural coloration), with delicate black wing borders. '
            'Dappled sunlight playing across glossy Monstera leaves and clear morning dew drops. '
            'Palette: butterfly wings electric iridescent blue and sapphire, orchid pure white, tropical leaves emerald green, and sunlight golden white. '
            'Structural color physics, entomology, rainforest biodiversity, mesmerizing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1992,
        "title": "The Day the Tap Ran Dry",
        "intent": "Day Tap Ran Dry water conservation freshwater droplet scarcity",
        "brief": (
            'Book cover design titled "The Day the Tap Ran Dry". '
            'The title "The Day the Tap Ran Dry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WATER CONSERVATION ECOLOGY DAYLIGHT STYLE: A powerful educational composition on freshwater conservation in bright sunlight. '
            'In the center, a classic polished brass outdoor garden water tap with a single, precious crystal-clear water droplet suspended from its spout, '
            'reflecting a lush green thriving ecosystem inside the drop. Below, dry cracked clay soil begins to transform into vibrant blooming green sprouts '
            'where the water touches the ground, under bright sunny skies. '
            'Palette: water droplet crystal aquamarine, brass tap warm gold, cracked earth warm terracotta, and new sprouts vivid green. '
            'Freshwater stewardship, water conservation, hydrology, vital and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1993,
        "title": "What is that smell?",
        "intent": "What is that smell olfactory science aromatic botanicals spices chemistry",
        "brief": (
            'Book cover design titled "What is that smell?". '
            'The title "What is that smell?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OLFACTORY SCIENCE AROMATIC BOTANY DAYLIGHT STYLE: A sunlit, aromatic scientific botanical laboratory table. '
            'Arranged beautifully are fresh botanical sources of fragrance: freshly roasted coffee beans, fragrant cinnamon bark sticks, '
            'blooming purple lavender sprigs, fresh yellow citrus peels, and fresh mint leaves, with delicate, luminous swirling scent vapor ribbons '
            'incorporating colorful molecular structure models (esters, terpenes, aldehydes) wafting through the air. '
            'Palette: coffee warm roasted brown, lavender violet, citrus radiant yellow, mint fresh green, and molecular vapor translucent cyan. '
            'Chemistry of smell, olfactory biology, botanical aromatics, sensory science, vibrant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1995,
        "title": "Pupun and Friends: The solar eclipse",
        "intent": "Pupun Friends solar eclipse astronomy celestial observation corona",
        "brief": (
            'Book cover design titled "Pupun and Friends: The solar eclipse". '
            'The title "Pupun and Friends: The solar eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASTRONOMY SOLAR ECLIPSE CELESTIAL STYLE: An inviting and wonder-filled daytime astronomical observation setup. '
            'On an outdoor wooden observation table on a green hilltop, certified solar eclipse viewing glasses and a solar filter telescope rest beside an open celestial star chart. '
            'In the sky above, the breathtaking moment of a total solar eclipse: the dark silhouette of the Moon encircled by the radiant, pearlescent white solar corona '
            'and a dazzling diamond ring sparkle against a twilight sky with visible bright stars. '
            'Palette: solar corona radiant silvery white, diamond ring brilliant gold, eclipse sky deep cobalt violet, and hilltop warm green. '
            'Solar astronomy, eclipse science, safe celestial viewing, magical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1996,
        "title": "AN ALIEN SHIP LANDS IN SCHOOL DURING MATHS PERIOD",
        "intent": "Alien ship lands maths geometry spacecraft schoolyard geometry shapes",
        "brief": (
            'Book cover design titled "AN ALIEN SHIP LANDS IN SCHOOL DURING MATHS PERIOD". '
            'The title "AN ALIEN SHIP LANDS IN SCHOOL DURING MATHS PERIOD" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLAYFUL SCI-FI MATHEMATICS DAYLIGHT STYLE: A bright, sunlit school courtyard on a clear sunny afternoon. '
            'Hovering gently just above the lawn is a sleek, polished silver extraterrestrial flying saucer spacecraft, projecting whimsical, glowing geometric holograms '
            'of 3D polyhedra, golden spirals, fractal triangles, and mathematical formulas into the air. '
            'In the foreground, a wooden school desk with a large yellow wooden ruler, brass compass, protractor, and colorful geometric blocks basking in the sun. '
            'Palette: saucer sleek chrome silver, mathematical holograms neon lime and electric cyan, schoolyard sunny green, and sky bright blue. '
            'Geometry in the universe, playful math concepts, sci-fi imagination, energetic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1997,
        "title": "Whoopee... Hyperloop!",
        "intent": "Hyperloop magnetic levitation vacuum tube high speed transit engineering",
        "brief": (
            'Book cover design titled "Whoopee... Hyperloop!". '
            'The title "Whoopee... Hyperloop!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HYPERLOOP TRANSPORTATION ENGINEERING DAYLIGHT STYLE: A sunlit, high-tech landscape in full daylight showing the future of ground transportation. '
            'A transparent, low-pressure steel and glass Hyperloop transit tube snaking gracefully across rolling green hills and modern wind turbine fields. '
            'Inside the translucent tube, an ultra-sleek, aerodynamic passenger pod propelled by magnetic levitation (maglev) streaking forward at near-supersonic speed, '
            'leaving a luminous motion blur and magnetic field lines under a bright sunny sky. '
            'Palette: pod aerodynamic pearl white and cobalt blue, magnetic fields glowing cyan, rolling hills lush green, and sunny sky azure. '
            'Maglev technology, pneumatic transit, high-speed engineering, sustainable mobility, exhilarating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1998,
        "title": "Miss Johnson's Plant Experiment",
        "intent": "Plant Experiment botany germination seedlings photosynthesis lab",
        "brief": (
            'Book cover design titled "Miss Johnson\'s Plant Experiment". '
            'The title "Miss Johnson\'s Plant Experiment" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BOTANICAL SCIENCE LAB DAYLIGHT STYLE: A bright, cheerful classroom laboratory windowsill bathed in morning sunshine. '
            'Lined up neatly are clear glass beakers demonstrating stages of plant germination: a bean seed sprouting roots in clear agar, '
            'a sturdy green seedling emerging toward the light, and a thriving young leafy plant with measuring rulers and data recording clipboards. '
            'Sunlight illuminating photosynthesis water droplet transpiration inside glass jars. '
            'Palette: foliage vivid lime and emerald green, soil rich dark brown, lab glass crystal clear with sun reflections, and windowsill warm honey wood. '
            'Plant biology, seed germination, scientific method, photosynthesis, warm and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1999,
        "title": "Protecting Sea Turtles, Seals, and Birds in Hawaii",
        "intent": "Protecting Hawaiian wildlife monk seal sea turtle albatross conservation",
        "brief": (
            'Book cover design titled "Protecting Sea Turtles, Seals, and Birds in Hawaii". '
            'The title "Protecting Sea Turtles, Seals, and Birds in Hawaii" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HAWAIIAN WILDLIFE SANCTUARY DAYLIGHT STYLE: A sun-drenched, pristine tropical beach in the Hawaiian Islands on a gorgeous sunny day. '
            'In the foreground, an endangered Hawaiian monk seal basking peacefully on black volcanic sand and golden dunes beside an adult green sea turtle (honu) resting by the tide. '
            'In the air above, a graceful Laysan albatross soaring over turquoise Pacific waves crashing softly against lush green volcanic headlands. '
            'Palette: Pacific ocean crystalline turquoise, black and gold beach sand, monk seal silver-grey coat, and sunny sky cyan. '
            'Island ecology, marine species conservation, wildlife sanctuaries, paradise daylight, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2000,
        "title": "Augmented Reality Has Arrived",
        "intent": "Augmented Reality AR glasses spatial computing holograms digital models",
        "brief": (
            'Book cover design titled "Augmented Reality Has Arrived". '
            'The title "Augmented Reality Has Arrived" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPATIAL COMPUTING AR TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern architectural studio in daytime. '
            'On a clean wooden desk, lightweight modern AR smart glasses are placed next to a floating, translucent 3D holographic digital architectural model '
            'of a green solar skyscraper, with glowing interactive interface nodes, dimension annotations, and spatial point clouds interacting with real physical objects. '
            'Palette: holograms vibrant cyan and magenta, smart glasses matte black and titanium silver, desk natural oak, and sunlight clear white. '
            'Augmented reality, spatial computing, human-computer interaction, future technology, cutting-edge and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2001,
        "title": "Do Animals Laugh?",
        "intent": "Do Animals Laugh animal ethology play vocalizations joy wildlife",
        "brief": (
            'Book cover design titled "Do Animals Laugh?". '
            'The title "Do Animals Laugh?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANIMAL ETHOLOGY PLAYFULNESS DAYLIGHT STYLE: A sun-drenched wildflower meadow in early summer full of joyful animal play behavior. '
            'In the foreground, a playful river otter rolling playfully on its back in a sunlit creek splashing crystal water droplets, '
            'beside a young chimpanzee and chimpanzee friends represented by playful chimps grooming and chasing through sunny foliage with wide joyful open-mouth expressions, '
            'along with clean educational acoustic spectrograms showing ultrasonic rodent and primate play vocalizations. '
            'Palette: meadow wildflowers sunny yellow and purple, creek water sparkling cyan, and morning sunlight golden amber. '
            'Animal cognition, ethology, play theory, joyous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2002,
        "title": "How Do Our Brains Retain and Remember Information?",
        "intent": "Brains Retain Remember Information memory neuroscience hippocampus",
        "brief": (
            'Book cover design titled "How Do Our Brains Retain and Remember Information?". '
            'The title "How Do Our Brains Retain and Remember Information?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COGNITIVE NEUROSCIENCE MEMORY CONSOLIDATION STYLE: A luminous, intricate scientific visualization of memory encoding. '
            'In the center, an elegant botanical-like branching network of glowing neural synapses and dendritic spines strengthening through long-term potentiation (LTP). '
            'Stylized luminous hippocampus memory architecture organizing glowing data nodes like crystal spheres of knowledge into permanent cortical storage. '
            'Palette: synaptic impulses warm golden amber, neural dendrites electric cyan, background deep navy blue. '
            'Neuroscience of memory, cognitive psychology, learning mechanisms, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2003,
        "title": "Nine Views on Thomas Alva Edison",
        "intent": "Nine Views Thomas Edison inventions incandescent bulb phonograph telegraph",
        "brief": (
            'Book cover design titled "Nine Views on Thomas Alva Edison". '
            'The title "Nine Views on Thomas Alva Edison" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INVENTION HISTORY MENLO PARK DAYLIGHT STYLE: A sunlit, nineteenth-century inventor\'s workshop table in full daylight. '
            'Arranged with care are the landmark inventions of the industrial era: an authentic early carbon-filament incandescent lightbulb glowing with warm amber light, '
            'a brass cylinder phonograph with a horn, an antique Morse code telegraph key, a vintage motion picture kinetoscope film strip, and inventor\'s handwritten notebook sketches. '
            'Palette: carbon filament warm glowing amber, polished brass rich gold, mahogany table deep chestnut, and sunny workshop light. '
            'History of invention, electrical engineering, innovation milestones, nostalgic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2004,
        "title": "The Latest Buzz",
        "intent": "The Latest Buzz honeybee colony honeycomb pollination apiary",
        "brief": (
            'Book cover design titled "The Latest Buzz". '
            'The title "The Latest Buzz" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'APIARY HONEYBEE ECOLOGY DAYLIGHT STYLE: A radiant, sun-soaked view into a thriving, healthy honeybee colony on a sunny summer morning. '
            'In the center foreground, an intricate hexagonal beeswax honeycomb dripping with liquid golden honey, with worker honeybees (Apis mellifera) '
            'with fuzzy striped bodies and translucent gossamer wings tending to hexagonal brood cells and packing golden pollen pellets into pollen baskets. '
            'Blooming clover and apple blossoms bathed in golden sunlight in the background. '
            'Palette: honey and pollen radiant golden yellow, beeswax warm amber, honeybee stripes black and ochre, and meadow green. '
            'Apiculture, honeybee communication, pollination ecology, bustling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    }
]

template = '''import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    {brief}
)

if __name__ == '__main__':
    res = create_and_produce_cover({id}, brief, '{intent}')
    print("SUCCESS:", res)
'''

def main():
    os.makedirs('tools', exist_ok=True)
    for b in books:
        path = f"tools/produce_book_{b['id']}.py"
        brief_repr = repr(b['brief'])
        content = template.format(
            brief=brief_repr,
            id=b['id'],
            intent=b['intent'].replace("'", "\\'")
        )
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated: {path} for '{b['title']}'")

if __name__ == '__main__':
    main()

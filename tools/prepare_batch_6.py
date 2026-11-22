import os

books = [
    {
        "id": 1322,
        "title": "Secrets of Survival: The Ancient Utah Juniper",
        "intent": "Secrets of Survival The Ancient Utah Juniper",
        "brief": (
            'Book cover design titled "Secrets of Survival: The Ancient Utah Juniper". '
            'The title "Secrets of Survival: The Ancient Utah Juniper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DESERT BOTANY & ANCIENT TREES DAYLIGHT STYLE: A sun-drenched, rugged red rock canyon mesa in Utah in radiant bright daylight. '
            'In the center foreground, an ancient, gnarled Utah juniper tree with deeply twisted, weathered fibrous bark rooted tenaciously into red Navajo sandstone, its scale-like evergreen foliage dotted with powdery blue-gray berry cones. '
            'In the background, iconic red sandstone buttes and dramatic desert mesas glow under a brilliant azure sky. '
            'Palette: juniper foliage evergreen and berry silver-blue, sandstone terracotta red, bark weathered silver, and sky radiant cyan. '
            'Botany, ancient conifers, dendrochronology, desert resilience, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1323,
        "title": "Sewer Safari",
        "intent": "Sewer Safari",
        "brief": (
            'Book cover design titled "Sewer Safari". '
            'The title "Sewer Safari" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT URBAN HYDROLOGY & STORMWATER DAYLIGHT STYLE: A clean, educational cutaway cross-section of modern urban stormwater infrastructure in bright daylight. '
            'In the center foreground, a large, well-lit arched stone stormwater drainage canal with crystal-clear water flowing over clean river gravel and green mossy ledges. '
            'Small curious urban creatures: garden snails, freshwater minnows in clean runoff, and a remote-controlled yellow wheeled inspection rover equipped with headlights and camera sensors exploring the tunnel. '
            'Palette: stormwater clear aqua, inspection robot safety yellow, canal stone warm slate gray, and moss fresh green. '
            'Urban ecology, stormwater infrastructure, civil engineering, robotics exploration, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1324,
        "title": "She Goes to Extremes",
        "intent": "She Goes to Extremes",
        "brief": (
            'Book cover design titled "She Goes to Extremes". '
            'The title "She Goes to Extremes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DUAL EXPLORATION: SPACE & DEEP SEA DAYLIGHT STYLE: An awe-inspiring, split-horizon conceptual exploration cover in bright daylight. '
            'The upper half depicts the white Space Shuttle orbiter gliding gracefully above the sunlit curvature of planet Earth against starry space. '
            'The lower half depicts the titanium deep-sea submersible Limiting Factor exploring the ocean abyss, its powerful halogen floodlights illuminating deep-sea trenches and delicate sea anemones in deep sapphire waters. '
            'Palette: space shuttle clean white, ocean abyss sapphire, floodlight brilliant gold, and Earth curvature electric blue. '
            'Extreme exploration, space and oceanography, Kathryn Sullivan pioneer legacy, science records, bright, inspiring, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1325,
        "title": "Super-Shoe Controversy",
        "intent": "Super-Shoe Controversy",
        "brief": (
            'Book cover design titled "Super-Shoe Controversy". '
            'The title "Super-Shoe Controversy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SPORTS BIOMECHANICS & SHOE TECH DAYLIGHT STYLE: A sunlit athletic stadium running track on a glorious clear day in bright daylight. '
            'In the center foreground, a state-of-the-art high-performance marathon running sneaker resting on the red track surface, featuring a cutaway view showing its curved carbon-fiber spring plate embedded within responsive energy-return foam. '
            'Clean graphic overlays display kinetic energy force arrows, rebound percentages, and a precision digital chronograph stopwatch. '
            'Palette: running shoe neon volt green and electric cyan, track terracotta red, carbon plate graphite black, and stadium grass emerald. '
            'Sports science, athletic engineering, biomechanics, carbon fiber footwear, bright, dynamic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1326,
        "title": "The Cycle of Energy in Plants",
        "intent": "The Cycle of Energy in Plants",
        "brief": (
            'Book cover design titled "The Cycle of Energy in Plants". '
            'The title "The Cycle of Energy in Plants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PHOTOSYNTHESIS & CELLULAR ENERGY DAYLIGHT STYLE: A sunlit, magnificent botanical diagram landscape in radiant morning daylight. '
            'In the center foreground, a translucent cross-section of a vibrant green plant leaf absorbing warm golden rays of natural sunlight. '
            'Inside the leaf, stylized chloroplasts and mitochondria are linked by a clean circular cycle of energy: carbon dioxide and water converting into glucose and oxygen, and vice versa. '
            'Droplets of sparkling morning dew glisten on the leaf surface under a clear sky. '
            'Palette: leaf chloroplast vibrant jade and lime green, sunlight radiant gold, oxygen bubble crystal white, and water droplet cyan. '
            'Plant biology, photosynthesis, cellular respiration, energy cycles, botany, bright, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1327,
        "title": "The Future of Movies Is Unreal",
        "intent": "The Future of Movies Is Unreal",
        "brief": (
            'Book cover design titled "The Future of Movies Is Unreal". '
            'The title "The Future of Movies Is Unreal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VIRTUAL PRODUCTION & LED CINEMA STAGE DAYLIGHT STYLE: A sunlit, high-tech movie production soundstage in bright daylight. '
            'In the center foreground, an enormous curved photorealistic LED volume screen wall displaying a stunning, seamless virtual daylight alien planet landscape. '
            'On camera dolly tracks in the foreground sits a high-end digital cinema camera with precision lens and matte box, beside a traditional wooden film clapperboard and studio lighting rigs. '
            'Palette: virtual landscape vibrant emerald and turquoise, camera matte black and titanium, studio lights warm tungsten, and floor studio gray. '
            'Virtual production, cinematography, LED volume stages, real-time CGI, filmmaking technology, bright, forward-looking, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1328,
        "title": "The Monkey Orange: Much More than a Fruit",
        "intent": "The Monkey Orange: Much More than a Fruit",
        "brief": (
            'Book cover design titled "The Monkey Orange: Much More than a Fruit". '
            'The title "The Monkey Orange: Much More than a Fruit" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AFRICAN SAVANNA BOTANY DAYLIGHT STYLE: A sun-drenched, picturesque Southern African woodland savanna in bright golden daylight. '
            'In the center foreground, a magnificent wild monkey orange tree (Strychnos spinosa) with glossy green foliage and branches laden with heavy, spherical golden-yellow monkey oranges with hard woody shells. '
            'On the grassy ground below, several cracked-open monkey oranges reveal wholesome juicy pulp and seeds, arranged beside a handwoven indigenous reed basket. '
            'Palette: monkey orange golden saffron and amber, foliage deep olive and emerald, savanna grass warm ochre, and sky sunny azure. '
            'Ethnobotany, indigenous fruits, African flora, drought-resistant agriculture, bright, wholesome, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1329,
        "title": "The Robots Are Here!",
        "intent": "The Robots Are Here",
        "brief": (
            'Book cover design titled "The Robots Are Here!". '
            'The title "The Robots Are Here!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ANIMATRONIC ROBOTICS WORKSHOP DAYLIGHT STYLE: A sunlit, creative robotics laboratory on a glorious sunny day in bright daylight. '
            'In the center foreground, an eccentric, cheerful mechanical robot drummer with polished chrome articulated arms and pneumatic pistons poised gracefully with wooden drumsticks over a colorful drum kit. '
            'Surrounding the robot on clean workbenches are robotic gears, colorful servo motor wires, an electronic audio synthesizer, and technical animatronic blueprints. '
            'Palette: robot polished chrome and cobalt blue, drum kit candy apple red, and studio daylight bright ivory. '
            'Robotics, animatronics, mechanical engineering, music and technology, playful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1330,
        "title": "The Tallest Skyscraper in Taiwan",
        "intent": "The Tallest Skyscraper in Taiwan",
        "brief": (
            'Book cover design titled "The Tallest Skyscraper in Taiwan". '
            'The title "The Tallest Skyscraper in Taiwan" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TAIPEI 101 ARCHITECTURAL ENGINEERING DAYLIGHT STYLE: A sunlit, breathtaking architectural portrait of Taipei 101 in Taipei under a clear blue sky in bright daylight. '
            'In the center foreground, the iconic skyscraper rising 1,667 feet into the sky, its 8-tiered pagoda-inspired green-tinted glass curtain walls and traditional bamboo-segment architecture gleaming in the sun. '
            'An inset circular cutaway reveals the famous massive golden tuned mass damper pendulum suspended inside the tower to resist earthquakes and typhoons. '
            'Palette: skyscraper crystalline jade-green glass and steel, tuned mass damper pure gold, and sky clear sunny cyan. '
            'Architectural engineering, megastructures, earthquake damping, Taipei 101, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1331,
        "title": "The Transfer of Heat Energy",
        "intent": "The Transfer of Heat Energy",
        "brief": (
            'Book cover design titled "The Transfer of Heat Energy". '
            'The title "The Transfer of Heat Energy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT THERMODYNAMICS & HEAT TRANSFER DAYLIGHT STYLE: A sunlit physics laboratory bench in bright natural daylight. '
            'In the center foreground, a vivid demonstration of the three modes of heat transfer: a solar radiometer with spinning black-and-white vanes demonstrating radiation from sunbeams; a clear glass beaker with circulating red and blue convection fluid currents demonstrating convection; and a polished copper rod conducting heat to release melting wax droplets demonstrating conduction. '
            'Palette: radiometer glass crystal and obsidian black, convection currents ruby red and cobalt blue, copper rod orange, and lab daylight white. '
            'Thermal physics, heat transfer, conduction convection radiation, thermodynamics, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1332,
        "title": "The Venus Flytrap",
        "intent": "The Venus Flytrap",
        "brief": (
            'Book cover design titled "The Venus Flytrap". '
            'The title "The Venus Flytrap" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CARNIVOROUS BOTANY DAYLIGHT STYLE: A sun-drenched, crystal-clear macro photograph of a healthy Venus flytrap plant (Dionaea muscipula) in a coastal bog in bright morning sunlight. '
            'In the center foreground, an open bivalved leaf trap showing its vibrant pink-magenta interior lining, sensitive trigger hairs, and interlocking spiny marginal cilia, glistening with sweet digestive nectar droplets. '
            'Surrounding the plant are emerald sphagnum moss, pitcher plants, and sparkling morning dew droplets under bright daylight. '
            'Palette: trap interior vibrant fuchsia pink, trap exterior lime green, sphagnum moss emerald, and dewdrop crystal gold. '
            'Carnivorous plants, botanical adaptations, plant physiology, bog ecology, bright, colorful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1333,
        "title": "The Whales Are Singing",
        "intent": "The Whales Are Singing",
        "brief": (
            'Book cover design titled "The Whales Are Singing". '
            'The title "The Whales Are Singing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MARINE BIOACOUSTICS DAYLIGHT STYLE: A sunlit, crystal-clear tropical ocean scene in radiant daylight with sparkling sun rays penetrating deep water. '
            'In the center foreground, a majestic adult humpback whale gliding gracefully through turquoise waters with its long white pectoral flippers outstretched. '
            'Flowing harmoniously through the water around the whale are luminous, stylized sonic frequency soundwaves and spectrogram wave ribbons in gold and cyan, illustrating whale song communication. '
            'Palette: ocean deep sapphire and turquoise, whale dark slate and snowy white, soundwave ribbons radiant gold and cyan, and sunbeam bright ivory. '
            'Cetacean biology, whale songs, marine bioacoustics, ocean communication, peaceful, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1334,
        "title": "The Wolf Within",
        "intent": "The Wolf Within",
        "brief": (
            'Book cover design titled "The Wolf Within". '
            'The title "The Wolf Within" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CANINE EVOLUTION & WILDLIFE DAYLIGHT STYLE: A breathtaking, sun-drenched wilderness and meadow landscape in bright morning daylight. '
            'In the center foreground, on a sunlit grassy meadow, rests a polished leather dog collar with a brass tag beside an open illustrated volume of canine evolutionary genetics. '
            'In the background atop a sunlit rocky ridge against evergreen forests and a clear blue sky, a noble gray wolf stands majestically with alert ears and thick silver coat. '
            'Palette: meadow emerald green, wolf coat silver-gray and sable, collar warm tan leather, and sky crisp azure. '
            'Canine evolution, wolf biology, animal domestication, genetics, dignified, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1335,
        "title": "Understanding Analog and Digital Signals",
        "intent": "Understanding Analog and Digital Signals",
        "brief": (
            'Book cover design titled "Understanding Analog and Digital Signals". '
            'The title "Understanding Analog and Digital Signals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TELECOMMUNICATIONS & SIGNAL PROCESSING DAYLIGHT STYLE: A sunlit electrical engineering workbench in bright natural daylight. '
            'In the center foreground, a clean dual-channel digital oscilloscope displaying two comparative waveforms: a smooth, continuous analog sine wave in glowing amber, and a crisp, discrete square digital binary wave (0s and 1s) in glowing electric cyan. '
            'Beside the oscilloscope rest copper coaxial cables, an electric guitar pickup, and a modern microchip processor on a circuit breadboard. '
            'Palette: oscilloscope display dark cobalt with glowing amber and cyan wave traces, circuit board forest green, and workbench natural oak. '
            'Telecommunications, signal processing, analog vs digital, electrical engineering, bright, crisp, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1336,
        "title": "Valley Nuts",
        "intent": "Valley Nuts",
        "brief": (
            'Book cover design titled "Valley Nuts". '
            'The title "Valley Nuts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CALIFORNIA ALMOND ORCHARD DAYLIGHT STYLE: A sun-drenched, blooming California Central Valley almond orchard in radiant spring daylight. '
            'In the center foreground, rows of mature almond trees covered in a breathtaking snow-white and blush-pink canopy of blossoms under a cloudless blue sky. '
            'In the foreground on a rustic wooden orchard crate, green velvety almond hulls on a leafy twig beside cracked wooden shells and wholesome golden roasted almonds in a burlap sack. '
            'Palette: almond blossom white and blush pink, foliage spring green, almond kernels golden tan, and sky brilliant azure. '
            'Agricultural horticulture, almond farming, Central Valley agriculture, tree nuts, wholesome, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1337,
        "title": "Weirdness Under the Sea",
        "intent": "Weirdness Under the Sea",
        "brief": (
            'Book cover design titled "Weirdness Under the Sea". '
            'The title "Weirdness Under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DEEP SEA ABYSS & HYDROTHERMAL VENT STYLE: An awe-inspiring, illuminated deep ocean trench exploration scene in deep sapphire waters. '
            'In the center foreground, a robotic exploration submersible with high-powered golden floodlights illuminating a towering hydrothermal black smoker vent chimneypiece. '
            'Flourishing around the mineral chimney are clusters of giant white tube worms with bright crimson plumes, translucent ghost crabs, and ethereal glowing bioluminescent comb jellies. '
            'Palette: submersible halogen gold, tube worms snow white and crimson, ocean deep sapphire, and vent mineral dark bronze. '
            'Deep ocean trenches, hydrothermal vents, extremophile biology, marine abyss, bright, extraordinary, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1338,
        "title": "Welcome to Tomorrow!",
        "intent": "Welcome to Tomorrow",
        "brief": (
            'Book cover design titled "Welcome to Tomorrow!". '
            'The title "Welcome to Tomorrow!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VIRTUAL REALITY & SPATIAL COMPUTING DAYLIGHT STYLE: A sunlit, sleek modern technology living room in bright natural daylight. '
            'In the center foreground, an elegant white standalone virtual reality headset with sleek integrated lenses resting on a minimalist glass coffee table. '
            'Rising gently from the headset is a translucent, glowing holographic portal displaying a magnificent miniature virtual 3D panorama of the Serengeti plain with giraffes and the Eiffel Tower. '
            'Palette: VR headset pristine white and soft gray, holographic portal radiant cyan and violet, and room daylight ivory. '
            'Virtual reality, spatial computing, future technology, digital travel, bright, forward-looking, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1339,
        "title": "What Is the International Space Station?",
        "intent": "What Is the International Space Station",
        "brief": (
            'Book cover design titled "What Is the International Space Station?". '
            'The title "What Is the International Space Station?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ISS ORBITAL LABORATORY DAYLIGHT STYLE: An awe-inspiring, sun-illuminated view of the International Space Station in low Earth orbit bathed in brilliant sunlight. '
            'In the center foreground, the massive space station showing its gleaming golden-orange solar array wings fully outstretched, pressurized laboratory modules, cupola observation dome, and robotic Canadarm2. '
            'Below, the radiant blue curvature of planet Earth shows glittering turquoise coastlines and swirling white cloud patterns against the deep black of space. '
            'Palette: solar arrays rich amber gold, station modules titanium white, Earth sapphire and turquoise, and brilliant sun flare white. '
            'Astronomy, space stations, ISS, microgravity research, international cooperation, bright, magnificent, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1340,
        "title": "Why Eclipses Happen",
        "intent": "Why Eclipses Happen",
        "brief": (
            'Book cover design titled "Why Eclipses Happen". '
            'The title "Why Eclipses Happen" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CELESTIAL MECHANICS & ECLIPSE ASTRONOMY STYLE: A sunlit, elegant astronomical diagram of a solar and lunar eclipse in educational clarity. '
            'In the center, the golden radiant Sun, the Moon, and planet Earth aligned in cosmic harmony, with clean luminous geometric shadow cones (umbra and penumbra) showing how the Moon\'s shadow touches Earth. '
            'An inset circular view displays a breathtaking total solar eclipse showing the pearly-white solar corona streaming around the dark lunar silhouette with bright Bailey\'s beads. '
            'Palette: Sun brilliant gold, solar corona shimmering pearlescent white, Earth sapphire blue, and space cosmic deep indigo. '
            'Astronomy, solar eclipses, celestial orbits, shadow geometry, Earth-Moon-Sun system, bright, majestic, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1341,
        "title": "Wings in the Dark",
        "intent": "Wings in the Dark",
        "brief": (
            'Book cover design titled "Wings in the Dark". '
            'The title "Wings in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CHIROPTERA CONSERVATION & BAT BIOLOGY STYLE: A sun-dappled nature sanctuary orchard in bright, clear twilight tones with abundant light. '
            'In the center foreground, a charming, gentle fruit bat with soft brown fur and translucent leathery wings hanging upside-down from an apple tree branch, nibbling on a sweet ripe red apple. '
            'Clean educational graphic overlays highlight delicate elongated wing finger bones and soft expanding ultrasonic echolocation sound rings. '
            'Palette: bat soft chestnut and amber, apple crisp crimson, orchard leaves fresh green, and sky warm sunset peach. '
            'Chiroptera, bat biology, echolocation, nocturnal pollinators, wildlife conservation, friendly, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    }
]

for b in books:
    fname = f"tools/produce_book_{b['id']}.py"
    content = f'''import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    {repr(b['brief'])}
)

if __name__ == '__main__':
    res = create_and_produce_cover({b['id']}, brief, {repr(b['intent'])})
    print("SUCCESS:", res)
'''
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {fname}")

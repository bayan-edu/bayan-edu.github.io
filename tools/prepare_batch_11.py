import os

books = [
    {
        "id": 1502,
        "title": "What's the Big Idea...About Earth",
        "intent": "Whats the Big Idea About Earth",
        "brief": (
            'Book cover design titled "What\'s the Big Idea...About Earth". '
            'The title "What\'s the Big Idea...About Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DYNAMIC EARTH SYSTEMS & FORCES DAYLIGHT STYLE: A sunlit, breathtaking composite geological landscape in radiant bright daylight. '
            'In the center foreground, dynamic geological forces shaping our planet: a snow-capped alpine mountain peak, a roaring crystalline waterfall carving through a deep rock canyon, and an active shield volcano venting gentle steam over fertile green valleys. '
            'In the sky above, the radiant blue marble of Earth shines against bright blue skies with golden sunbeams illuminating the diverse planet. '
            'Palette: alpine snow white, ocean and river sapphire, canyon terracotta, and valley lush emerald green. '
            'Earth systems, geology, plate tectonics, planetary science, dynamic, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1503,
        "title": "What Is Happening in the Ocean?",
        "intent": "What Is Happening in the Ocean",
        "brief": (
            'Book cover design titled "What Is Happening in the Ocean?". '
            'The title "What Is Happening in the Ocean?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GLOBAL OCEANOGRAPHY & WATER WORLD STYLE: An awe-inspiring, sunlit view of the blue water planet Earth in bright daylight. '
            'In the upper portion, the brilliant blue-and-white planet Earth with 70% ocean coverage glowing in sunlight. '
            'The lower portion reveals a stunning underwater ocean vista: shimmering turquoise sunbeams penetrating down to a flourishing coral reef shelf where sea turtles, dolphins, and schools of yellow tang swim freely among colorful sea anemones. '
            'Palette: ocean deep sapphire and sparkling turquoise, coral coral-pink and amber, and sunbeam bright ivory. '
            'Oceanography, marine ecosystems, global water world, Earth science, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1504,
        "title": "Apples: The Health Benefits",
        "intent": "Apples The Health Benefits",
        "brief": (
            'Book cover design titled "Apples: The Health Benefits". '
            'The title "Apples: The Health Benefits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT APPLE ORCHARD & NUTRITIONAL SCIENCE DAYLIGHT STYLE: A sun-drenched, blooming apple orchard on a glorious autumn morning in bright daylight. '
            'In the center foreground, a rustic wooden harvest crate overflowing with polished, crisp red and green apples with fresh morning dew droplets glistening on their skin. '
            'Beside the crate on a wooden table: a sliced apple revealing star-shaped seed chambers, a glass of fresh apple cider, and an open illustrated nutritional science book detailing dietary fiber, vitamins, and antioxidants. '
            'Palette: apples ruby crimson and crisp granny smith green, wooden crate warm honey, and orchard foliage golden-green. '
            'Nutritional science, pomology, dietary health, agricultural botany, wholesome, refreshing, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1506,
        "title": "Avoiding Earthquake Surprises in the Pacific Northwest",
        "intent": "Avoiding Earthquake Surprises in the Pacific Northwest",
        "brief": (
            'Book cover design titled "Avoiding Earthquake Surprises in the Pacific Northwest". '
            'The title "Avoiding Earthquake Surprises in the Pacific Northwest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CASCADIA SEISMOLOGY & GEODESY DAYLIGHT STYLE: A sunlit Pacific Northwest coastal geological site on a clear sunny day in bright daylight. '
            'In the center foreground, a modern solar-powered continuous GPS geodetic monitoring station and seismic telemetry antenna anchored securely into coastal bedrock, with digital displays recording tectonic subduction strain. '
            'In the background, iconic coastal Sitka spruce forests and dramatic sea stack cliffs meet the Pacific Ocean under a brilliant blue sky. '
            'Palette: GPS station brushed aluminum and solar cobalt, coastal forest deep evergreen, ocean turquoise, and sky clear cyan. '
            'Seismology, Cascadia subduction zone, earthquake early warning, geophysics, vigilant, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1507,
        "title": "Bear Care",
        "intent": "Bear Care",
        "brief": (
            'Book cover design titled "Bear Care". '
            'The title "Bear Care" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GIANT PANDA CONSERVATION DAYLIGHT STYLE: A sunlit, peaceful bamboo forest zoological habitat in radiant morning daylight. '
            'In the center foreground, an adorable, healthy giant panda with plush black-and-white fur seated comfortably on a smooth garden boulder, contentedly holding and chewing fresh, leafy green bamboo stalks. '
            'Around the panda are fresh shoots of bamboo, a clean stone water pool reflecting golden sunshine, and mist-crowned green hills under a bright blue sky. '
            'Palette: panda fur jet black and snowy white, bamboo fresh vibrant green, stone warm granite, and morning sun golden. '
            'Zoological care, giant panda conservation, veterinary biology, endangered species, charming, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1508,
        "title": "Biochar",
        "intent": "Biochar",
        "brief": (
            'Book cover design titled "Biochar". '
            'The title "Biochar" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AGRICULTURAL BIOCHAR & SOIL SCIENCE DAYLIGHT STYLE: A sun-drenched university agricultural research test plot in bright natural daylight. '
            'In the center foreground, rich, fertile dark loam soil blended with porous black biochar granules, showing healthy, thriving green vegetable seedlings with extensive root nodules. '
            'Beside the plot on a clean wooden field table rest glass jars of pure crushed biochar, a stainless steel soil corer, and electronic soil moisture meters. '
            'In the background, flourishing green crop fields and modern research greenhouses stand under a clear azure sky. '
            'Palette: biochar carbon black, soil rich umber, crop seedlings vibrant lime green, and sky bright summer cyan. '
            'Soil science, biochar carbon sequestration, sustainable agriculture, agronomy, bright, green, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1509,
        "title": "Canine Courage",
        "intent": "Canine Courage",
        "brief": (
            'Book cover design titled "Canine Courage". '
            'The title "Canine Courage" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SEARCH AND RESCUE CANINE DAYLIGHT STYLE: A sunlit canine training ground on a clear morning in bright natural daylight. '
            'In the center foreground, a noble, heroic search-and-rescue German shepherd dog wearing an official high-visibility reflective neon-orange search harness, standing alertly on a timber training obstacle with ears pricked and keen intelligent eyes. '
            'Beside the dog rest a canine first-aid field kit, a brass search-and-rescue badge, and a training agility course on green grass under a clear blue sky. '
            'Palette: German shepherd rich black and tan, harness reflective orange, grass emerald green, and sky radiant cyan. '
            'Search and rescue dogs, working canines, disaster response, animal heroism, noble, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1510,
        "title": "Crash Test",
        "intent": "Crash Test",
        "brief": (
            'Book cover design titled "Crash Test". '
            'The title "Crash Test" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT HIGH-VELOCITY SHOCK PHYSICS LABORATORY STYLE: A sunlit, high-tech planetary impact research laboratory in bright daytime. '
            'In the center foreground, a massive stainless steel light-gas gun barrel aiming into an illuminated, heavy steel vacuum impact test chamber with observation viewports. '
            'Surrounding the apparatus are high-speed laser chronograph sensors, fractured target ice blocks with cratering patterns, and digital telemetry monitors displaying 3D impact shockwave simulations. '
            'Palette: light-gas gun brushed stainless steel, target ice crystalline cyan, laser sensors neon red, and lab daylight white. '
            'Impact physics, planetary collisions, shock physics, planetary evolution, high-tech, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1511,
        "title": "Designing from Scratch",
        "intent": "Designing from Scratch",
        "brief": (
            'Book cover design titled "Designing from Scratch". '
            'The title "Designing from Scratch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GREEN TECH PRODUCT DESIGN STUDIO DAYLIGHT STYLE: A sunlit industrial design studio on a bright morning in natural daylight. '
            'In the center foreground, a wooden drafting workbench featuring modular smartphone component prototypes made of plant-based bioplastics, recycled aluminum chassis, and flexible solar cells. '
            'Beside them, an open digital drawing tablet with stylus showing 3D CAD design models, vernier calipers, and color swatch wheels under bright skylights. '
            'Palette: bioplastic natural sage green and ivory, aluminum sleek silver, blueprint cyan, and studio daylight bright white. '
            'Industrial design, green technology, sustainable product engineering, innovation, bright, forward-looking, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1512,
        "title": "Everyday Compound or Poison?",
        "intent": "Everyday Compound or Poison",
        "brief": (
            'Book cover design titled "Everyday Compound or Poison?". '
            'The title "Everyday Compound or Poison?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CHEMICAL ELEMENTS & COMPOUNDS DAYLIGHT STYLE: A sunlit chemistry classroom laboratory workbench in bright daylight. '
            'In the center foreground, a clear side-by-side comparison of elements and compounds: a clear glass bowl of white crystalline table salt (NaCl) beside safe mineral samples, contrasted with amber glass laboratory reagent bottles with clear warning labels, an analytical balance, and colorful ball-and-stick molecular models. '
            'In the background, a colorful modern periodic table of elements hangs on a sunlit wall. '
            'Palette: salt crystal pure white, chemical bottles amber gold, periodic table vibrant colors, and lab table clean gray. '
            'Chemistry, chemical compounds, elements, toxicity, periodic table, clear, educational, bright, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1514,
        "title": "Gentle Giants",
        "intent": "Gentle Giants",
        "brief": (
            'Book cover design titled "Gentle Giants". '
            'The title "Gentle Giants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL WHALE SHARK DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical ocean panorama with dazzling sunbeams penetrating deep turquoise water. '
            'In the center foreground, a colossal, magnificent whale shark (Rhincodon typus) swimming gracefully through the water, showing its enormous wide filter-feeding mouth, distinct white polka-dot and checkered skin pattern, and gentle sweeping tail. '
            'Accompanying the gentle giant are schools of bright yellow pilot fish swimming alongside over a distant coral reef. '
            'Palette: whale shark slate blue and white polka dots, ocean water sparkling turquoise, pilot fish sunny yellow, and sunbeam bright ivory. '
            'Marine biology, whale sharks, ocean giants, filter-feeding fish, gentle giants, magnificent, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1515,
        "title": "Grace Hopper (1906–1992)",
        "intent": "Grace Hopper 1906 1992",
        "brief": (
            'Book cover design titled "Grace Hopper (1906–1992)". '
            'The title "Grace Hopper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT EARLY COMPUTING & COMPILER INNOVATION STYLE: A sunlit 1940s-1950s naval computing laboratory in bright morning natural daylight. '
            'In the center foreground, an antique electromechanical computer relay cabinet with vacuum tubes, paper punch tapes with perforated holes, an open programming manual showing early flowchart compiler code, and an antique brass ship\'s clock. '
            'On an oak desk rests an authentic brass handheld magnifying glass focusing on the famous historic logbook with a moth bug taped to the page. '
            'Palette: oak desk warm amber, relay cabinet battleship gray, punch tape ivory, and morning daylight bright white. '
            'Computer science pioneer, Grace Hopper legacy, programming compilers, computing history, inspiring, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1516,
        "title": "Grizzly Bears",
        "intent": "Grizzly Bears",
        "brief": (
            'Book cover design titled "Grizzly Bears". '
            'The title "Grizzly Bears" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ALASKAN WILDERNESS GRIZZLY DAYLIGHT STYLE: A sun-drenched Alaskan wilderness river valley in radiant summer daylight. '
            'In the center foreground, a colossal, magnificent grizzly bear with thick silver-tipped dark brown fur, powerful shoulder hump, and alert ears standing proudly on a granite riverbank boulder beside rushing white-water rapids. '
            'In the clear water, a wild silver salmon leaps upstream in direct sunlight. '
            'In the background, snow-capped Alaskan mountain peaks and dense spruce forests rise beneath a brilliant blue sky. '
            'Palette: grizzly bear fur rich chocolate brown and silver-tipped amber, river rapid foaming white and aqua, and mountain peaks granite and snow. '
            'Wildlife biology, North American apex predators, grizzly bears, Alaskan ecology, majestic, powerful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1517,
        "title": "Heart Sick",
        "intent": "Heart Sick",
        "brief": (
            'Book cover design titled "Heart Sick". '
            'The title "Heart Sick" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VETERINARY CARDIOLOGY RESEARCH DAYLIGHT STYLE: A sunlit veterinary medical research facility in bright natural daylight. '
            'In the center foreground, a modern digital electrocardiogram (ECG) monitor displaying a steady, rhythmic green heartbeat pulse wave across an illuminated grid screen. '
            'Beside the monitor on a stainless steel examination table rest a professional veterinary stethoscope, a detailed anatomical model of a mammalian heart with vascular chambers, and fresh leafy greens and fruit. '
            'Palette: ECG trace vibrant neon green, anatomical heart warm terracotta and blue, stethoscope chrome, and clinic daylight white. '
            'Veterinary medicine, animal cardiology, great ape healthcare, zoological medicine, compassionate, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1518,
        "title": "Held Up",
        "intent": "Held Up",
        "brief": (
            'Book cover design titled "Held Up". '
            'The title "Held Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GEOTECHNICAL ENGINEERING & TOWER OF PISA DAYLIGHT STYLE: A sunlit, breathtaking architectural portrait of the Leaning Tower of Pisa in Italy in radiant daylight. '
            'In the center foreground, the iconic white marble campanile tower leaning gracefully on the lush green Campo dei Miracoli lawn under a clear blue sky. '
            'Clean, elegant engineering graphic diagrams demonstrate the geotechnical ground extraction drills, lead counterweights, and soil stabilization anchors that saved the monument. '
            'Palette: tower marble pristine white and cream, lawn vibrant emerald green, engineering graphics bright cyan and gold, and sky sunny azure. '
            'Civil engineering, geotechnical stabilization, Leaning Tower of Pisa, architectural history, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1519,
        "title": "High Jumpers",
        "intent": "High Jumpers",
        "brief": (
            'Book cover design titled "High Jumpers". '
            'The title "High Jumpers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PAPUA NEW GUINEA TREE-KANGAROO DAYLIGHT STYLE: A sun-dappled, lush tropical cloud forest canopy high above the Huon Peninsula in bright morning daylight. '
            'In the center foreground, an enchanting Matschie\'s tree-kangaroo with plush reddish-mahogany fur, golden-yellow belly and face, and a long balancing tail, perched nimbly on a mossy rain-tree branch. '
            'Dewy tropical ferns, climbing orchids, and morning sunbeams pierce through the misty mountain canopy under a clear blue sky. '
            'Palette: tree-kangaroo mahogany red and warm gold, moss chartreuse, orchid magenta, and canopy deep emerald. '
            'Wildlife biology, tree-kangaroos, arboreal marsupials, Papua New Guinea ecology, charming, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1520,
        "title": "Horseshoe Crabs Thrive in the Delaware Bay",
        "intent": "Horseshoe Crabs Thrive in the Delaware Bay",
        "brief": (
            'Book cover design titled "Horseshoe Crabs Thrive in the Delaware Bay". '
            'The title "Horseshoe Crabs Thrive in the Delaware Bay" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DELAWARE BAY SHORELINE & HORSESHOE CRAB DAYLIGHT STYLE: A sun-drenched coastal beach along the Delaware Bay at morning low tide in bright daylight. '
            'In the center foreground, an ancient, armored Atlantic horseshoe crab (Limulus polyphemus) with its domed olive-brown chitinous shell and spiny telson tail resting on wet, glistening tidal sand. '
            'Surrounding the crab, migratory shorebirds (red knots and sandpipers) feed peacefully along the shallow sparkling water edge, under a radiant blue coastal sky. '
            'Palette: horseshoe crab shell polished bronze and olive, wet sand golden ochre, water crystal turquoise, and sky clear cyan. '
            'Marine biology, living fossils, horseshoe crabs, coastal ecology, Delaware Bay, fascinating, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1521,
        "title": "Jellyfish Take Over!",
        "intent": "Jellyfish Take Over",
        "brief": (
            'Book cover design titled "Jellyfish Take Over!". '
            'The title "Jellyfish Take Over!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GIANT JELLYFISH OCEANOGRAPHY DAYLIGHT STYLE: A sun-illuminated, crystal-clear coastal ocean scene in radiant daylight. '
            'In the center foreground, a colossal Nomura\'s giant jellyfish pulsating gracefully through the water, showing its immense translucent pink-and-amber umbrella bell and a cascading array of delicate flowing tentacles catching sparkling sunbeams. '
            'Nearby in the water, an oceanographic research sensor pod and marine sonar tracking graphics monitor jellyfish bloom patterns in turquoise coastal waters. '
            'Palette: jellyfish bell translucent coral and amber, ocean water sparkling turquoise, and sunbeam bright ivory. '
            'Marine biology, giant jellyfish blooms, ocean ecosystems, marine science, fascinating, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1522,
        "title": "Let's Play Some Kickball!",
        "intent": "Lets Play Some Kickball",
        "brief": (
            'Book cover design titled "Let\'s Play Some Kickball!". '
            'The title "Let\'s Play Some Kickball!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SPORTS PHYSICS & KICKBALL DIAMOND DAYLIGHT STYLE: A sunlit school athletic field and red clay kickball diamond on a glorious sunny afternoon. '
            'In the center foreground, a classic textured bright red rubber kickball resting on a clean white home-plate base. '
            'Colorful, energetic physics graphic overlays illustrate the forces of motion: force push vectors, trajectory arc curves, gravity, and ground friction arrows. '
            'In the background, groomed green outfield grass and white boundary lines stretch beneath a clear blue sky. '
            'Palette: kickball candy apple red, base white, clay terracotta, grass emerald, and force arrows bright yellow and cyan. '
            'Physics in sports, Newton\'s laws of motion, recreational kickball, energetic, cheerful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1524,
        "title": "Life Story: Katherine Johnson",
        "intent": "Life Story Katherine Johnson",
        "brief": (
            'Book cover design titled "Life Story: Katherine Johnson". '
            'The title "Katherine Johnson" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SPACE RACE MATHEMATICS & TRAJECTORY STUDY STYLE: A sunlit NASA mathematical computing study during the Apollo space race in bright daylight. '
            'In the center foreground, on a clean wooden researcher\'s desk: an open pad filled with elegant handwritten orbital trajectory calculations and geometry equations, a vintage slide rule, a mechanical desktop calculator, and blueprints of space capsule launch trajectories. '
            'Through sunny windows, a rocket launch gantry and a clear blue sky with the distant crescent Moon glow in bright sunshine. '
            'Palette: desk warm walnut, calculations and paper ivory, slide rule polished bamboo and brass, and sky radiant blue. '
            'NASA history, Katherine Johnson legacy, orbital mechanics, mathematical pioneers, inspiring, bright, educational, completely daylight. '
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

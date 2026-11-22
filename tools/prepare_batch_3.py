import os

books = [
    {
        "id": 1253,
        "title": "The Dream Journey",
        "intent": "The Dream Journey",
        "brief": (
            'Book cover design titled "The Dream Journey". '
            'The title "The Dream Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT HISTORIC SPACESHIP LAUNCH DAYLIGHT STYLE: A sunlit, magnificent aerospace launchpad on a clear morning under bright daylight. '
            'In the center foreground, a gleaming multi-stage spacecraft standing vertically on its launch tower with cryogenic vapor venting, surrounded by launch support gantries and a prominent electronic countdown digital clock displaying T-0. '
            'In the background, sweeping coastal landscape under a brilliant azure sky and golden morning sunshine. '
            'Palette: spacecraft titanium white and aerospace orange, launch gantry steel gray, coastal azure blue, and radiant sunbeam gold. '
            'Space exploration, rocket launch countdown, aerospace engineering, inspiring, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1256,
        "title": "Why are Bubbles Round?",
        "intent": "Why are Bubbles Round?",
        "brief": (
            'Book cover design titled "Why are Bubbles Round?". '
            'The title "Why are Bubbles Round?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SURFACE TENSION PHYSICS DAYLIGHT STYLE: A sun-drenched, cheerful garden lawn on a glorious sunny day in bright daylight. '
            'In the center foreground, a cluster of shimmering, crystal-clear spherical soap bubbles floating gracefully in the air, their translucent curved surfaces catching sunlight to display swirling rainbow iridescent colors. '
            'On a wooden garden table below rests a colorful plastic bubble wand and a small bottle of soap solution, beside a clean educational diagram illustrating minimal surface area and surface tension forces. '
            'Palette: bubble iridescent rainbow, grass vibrant emerald, wand sunny yellow, and sky bright cyan. '
            'Physics of bubbles, surface tension, fluid dynamics, cheerful, educational, bright, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1259,
        "title": "Journey To A New Planet!",
        "intent": "Journey To A New Planet!",
        "brief": (
            'Book cover design titled "Journey To A New Planet!". '
            'The title "Journey To A New Planet!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT EXOPLANET EXPLORATION DAYLIGHT STYLE: An awe-inspiring space exploration scene filled with cosmic wonder and discovery. '
            'In the center foreground, an advanced exploratory interstellar spacecraft with gleaming solar wings and sensor arrays approaching a newly discovered Earth-like exoplanet with vivid sapphire oceans, swirling cloud systems, and lush green continents. '
            'Distant twin stars illuminate the planet in warm golden light, with clean holographic star-navigation coordinate rings floating in space. '
            'Palette: exoplanet sapphire blue and emerald green, spacecraft polished silver and white, solar wing gold, and space deep violet. '
            'Space exploration, exoplanets, astronomy, futuristic discovery, bright, inspiring, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1260,
        "title": "The River of Time",
        "intent": "The River of Time",
        "brief": (
            'Book cover design titled "The River of Time". '
            'The title "The River of Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RIVERBANK HYDROLOGY DAYLIGHT STYLE: A tranquil, sunlit riverbank on a glorious sunny morning in bright natural daylight. '
            'In the center foreground, a crisp folded white paper boat sailing bravely through gentle ripples past smooth river boulders and floating lotus leaves. '
            'Along the riverbank, traditional woven bamboo fishing nets and wooden mooring posts stand beside lush green reeds, with wide sparkling river waters stretching toward sunlit hills under a soft blue sky. '
            'Palette: river sparkling aqua, river stone slate gray, paper boat crisp white, vegetation fresh emerald, and morning sun gold. '
            'River hydrology, playful nature, childhood adventure, peaceful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1261,
        "title": "My City Rocks!",
        "intent": "My City Rocks!",
        "brief": (
            'Book cover design titled "My City Rocks!". '
            'The title "My City Rocks!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GEOLOGY & ROCK FORMATIONS DAYLIGHT STYLE: A sun-drenched geological park featuring ancient natural granite rock formations under bright blue skies in full daylight. '
            'In the center foreground, magnificent balancing granite boulders and rock tor formations, sculpted by millions of years of natural weathering. '
            'On a flat stone in the foreground rest a geologist\'s rock hammer, a brass magnifying hand lens, and an open field notebook with hand-drawn mineral sketches and rock strata diagrams. '
            'Palette: granite warm ochre and slate gray, hammer steel and hickory brown, field grass golden-green, and sky clear cyan. '
            'Geology, mineralogy, natural heritage, rock walks, educational, bright, rugged, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1262,
        "title": "A World Without ELECTRICITY !!",
        "intent": "A World Without ELECTRICITY !!",
        "brief": (
            'Book cover design titled "A World Without ELECTRICITY !!". '
            'The title "A World Without ELECTRICITY !!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ELECTRICAL ENERGY SCIENCE DAYLIGHT STYLE: A vibrant, dynamic conceptual science design exploring electrical energy in our world in bright daylight. '
            'In the center foreground, a glowing vintage incandescent lightbulb connected to a gleaming solar panel and miniature clean wind turbine model on a wooden workbench. '
            'Glowing energetic arcs of electric blue and warm gold light flow through clean schematic wire diagrams, connecting to modern home appliances and digital devices. '
            'In the background, a clean sunny neighborhood with rooftop solar panels under a clear azure sky. '
            'Palette: electric neon cyan, incandescent warm amber, solar panel deep blue, and daylight bright white. '
            'Physics of electricity, energy conservation, power generation, technology, bright, dynamic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1263,
        "title": "A Day In Space",
        "intent": "A Day In Space",
        "brief": (
            'Book cover design titled "A Day In Space". '
            'The title "A Day In Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RETRO-SPACE ADVENTURE STYLE: A cheerful, vibrant cosmic exploration scene filled with whimsical wonder and celestial bodies. '
            'In the center foreground, a charming retro-futuristic red-and-white rocket ship with chrome thrusters soaring past a cratered moon and a golden-ringed planet. '
            'Floating nearby are colorful comets with sparkling dust tails, playful celestial asteroids, and an open illustrated astronomy storybook floating in microgravity. '
            'Palette: rocket bold crimson and ivory, ringed planet warm saffron, cosmic space vibrant indigo and violet, and starlight golden yellow. '
            'Space adventure, astronomy for kids, celestial discovery, cheerful, bright, imaginative, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1267,
        "title": "Body Buddies: The Microbes that Live In and On Us",
        "intent": "Body Buddies: The Microbes that Live In and On Us",
        "brief": (
            'Book cover design titled "Body Buddies: The Microbes that Live In and On Us". '
            'The title "Body Buddies: The Microbes that Live In and On Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MICROBIOLOGY SCIENCE DAYLIGHT STYLE: A cheerful, sunlit laboratory workbench with friendly microscopic biology visuals in bright daylight. '
            'In the center foreground, a sleek modern scientific compound microscope beside colorful agar petri dishes blooming with colorful benign bacterial colonies (friendly lactobacillus and beneficial microbes). '
            'Above the microscope, stylized, friendly, colorful 3D microbe illustrations (rod-shaped, spiral, and spherical bacteria) float peacefully with clean educational labels explaining beneficial bacteria. '
            'Palette: petri dish coral pink and mint green, microscope clean white and brushed steel, microbes friendly lilac and teal. '
            'Microbiology, human microbiome, beneficial bacteria, health science, bright, friendly, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1268,
        "title": "Calling All Spiders!",
        "intent": "Calling All Spiders!",
        "brief": (
            'Book cover design titled "Calling All Spiders!". '
            'The title "Calling All Spiders!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARACHNOLOGY NATURE DAYLIGHT STYLE: A stunning, sunlit garden trellis in bright morning sunlight. '
            'In the center foreground, a magnificent, geometrically perfect orb-weaver spider web spun between climbing rose stems and blackberry leaves, each delicate silk strand glistening with morning dew drops catching rainbow sunbeams. '
            'In the center of the web sits a colorful, harmless yellow-and-black garden orb-weaver spider. '
            'Nearby on a garden bench rests a brass field magnifying glass and an open naturalist\'s sketchbook with spider anatomy diagrams. '
            'Palette: spider golden yellow and jet black, web glistening crystal dew, foliage fresh emerald, and morning sun warm amber. '
            'Arachnology, spider webs, garden biodiversity, biology education, bright, fascinating, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1269,
        "title": "Cool Prize",
        "intent": "Cool Prize",
        "brief": (
            'Book cover design titled "Cool Prize". '
            'The title "Cool Prize" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SNOWFLAKE CRYSTALLOGRAPHY DAYLIGHT STYLE: A breathtaking, crystal-clear macro photograph of delicate symmetrical snowflakes in bright winter daylight. '
            'In the center foreground, a spectacular, perfectly formed hexagonal stellar dendrite ice snowflake crystal resting on a piece of dark winter fabric, its microscopic crystalline branches and facets catching brilliant sunlight like a diamond. '
            'Beside the snowflake rests a fine camel-hair artist brush, an optical magnifying loupe, and a brass outdoor thermometer showing freezing temperatures. '
            'Palette: snowflake crystalline diamond white and ice cyan, background deep sapphire contrast, and winter sun sparkle gold. '
            'Snowflake crystallography, winter physics, macro nature photography, scientific observation, bright, crisp, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1270,
        "title": "Digging Deeper",
        "intent": "Digging Deeper",
        "brief": (
            'Book cover design titled "Digging Deeper". '
            'The title "Digging Deeper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PALEONTOLOGY QUARRY DAYLIGHT STYLE: A sunlit, dusty canyon excavation site in bright daylight with geological rock strata. '
            'In the center foreground, an impressive fossilized sauropod dinosaur skeleton and vertebrae partially excavated from ancient sandstone bedrock. '
            'Surrounding the fossil are authentic paleontological field tools: rock chisels, delicate horsehair excavation brushes, a geological measuring tape, and a field map with grid lines. '
            'In the background, sunlit canyon sandstone cliffs rise against a deep azure sky. '
            'Palette: sandstone desert tan and terracotta, dinosaur bone mineral stone gray, excavation tool steel, and sky radiant blue. '
            'Paleontology, dinosaur excavation, fossil discoveries, Earth history, bright, educational, adventurous, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1271,
        "title": "Discoveries in the Deep: The Titanic",
        "intent": "Discoveries in the Deep: The Titanic",
        "brief": (
            'Book cover design titled "Discoveries in the Deep: The Titanic". '
            'The title "Discoveries in the Deep: The Titanic" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DEEP OCEAN EXPLORATION & SUBMERSIBLE STYLE: An awe-inspiring deep-sea exploration scene on the Atlantic ocean floor. '
            'In the center foreground, a high-tech robotic yellow research submersible with powerful halogen headlights piercing the deep ocean waters to illuminate a massive historic ship anchor and bronze capstan resting on the ocean floor, encrusted with deep-sea rusticles and marine corals. '
            'Robotic manipulator arms and underwater camera pods study the historic artifacts with scientific reverence. '
            'Palette: submersible vibrant safety yellow, ocean deep indigo and sapphire, headlight brilliant white, and anchor bronze patina. '
            'Marine archaeology, underwater robotics, ocean floor discovery, history and technology, bright, educational, majestic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1273,
        "title": "Engineering and Natural Gas",
        "intent": "Engineering and Natural Gas",
        "brief": (
            'Book cover design titled "Engineering and Natural Gas". '
            'The title "Engineering and Natural Gas" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MECHANICAL ENGINEERING DAYLIGHT STYLE: A clean, modern natural gas distribution and pipeline engineering facility under bright blue skies in daylight. '
            'In the center foreground, gleaming industrial steel pipes with bright yellow coating, high-pressure brass control valves, precision digital pressure gauges, and pipeline inspection gauges. '
            'On an outdoor engineer\'s drafting table rests an open set of mechanical pipeline schematics and blueprints, a yellow safety hardhat, and a digital tablet showing flow analytics. '
            'Palette: pipe safety yellow and brushed steel silver, valve polished brass, blueprint technical blue, and daylight sky cyan. '
            'Mechanical engineering, energy distribution, pipeline infrastructure, utilities, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1274,
        "title": "Farmers Care for the Land",
        "intent": "Farmers Care for the Land",
        "brief": (
            'Book cover design titled "Farmers Care for the Land". '
            'The title "Farmers Care for the Land" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUSTAINABLE AGRICULTURE DAYLIGHT STYLE: A breathtaking, sun-drenched rural farmland landscape stretching across rolling hills in golden daylight. '
            'In the center foreground, contoured conservation farm terraces and lush green cover crops planted along natural hillsides, with efficient solar-powered drip irrigation lines delivering water to fertile dark soil. '
            'In the background, a row of windbreak trees, modern wind turbines, and distant red farm barns under a glorious sunlit blue sky with puffy white clouds. '
            'Palette: crop field vibrant emerald and golden wheat, soil rich dark brown, barn rustic red, and sky summer azure. '
            'Agricultural conservation, soil health, sustainable farming, Earth stewardship, bright, wholesome, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1275,
        "title": "Frogs at Risk",
        "intent": "Frogs at Risk",
        "brief": (
            'Book cover design titled "Frogs at Risk". '
            'The title "Frogs at Risk" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL CLOUD FOREST DAYLIGHT STYLE: A lush, sunlit cloud forest canopy in the Andes mountains of Ecuador under bright morning daylight. '
            'In the center foreground, a vivid emerald-green red-eyed tree frog perched proudly on the broad leaf of a tropical bromeliad flower, its vibrant crimson eyes and orange webbed toes glistening with crystal raindrops. '
            'Nearby on a mossy branch rests a tiny, jewel-toned blue poison dart frog. '
            'Surrounding them are misty mountain ferns, wild tropical orchids, and sunbeams filtering through the rainforest canopy. '
            'Palette: tree frog lime green and scarlet red, poison dart frog electric azure, bromeliad magenta, and rainforest deep emerald. '
            'Herpetology, rainforest biodiversity, amphibian conservation, ecology, bright, colorful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1276,
        "title": "How to Band Birds",
        "intent": "How to Band Birds",
        "brief": (
            'Book cover design titled "How to Band Birds". '
            'The title "How to Band Birds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ORNITHOLOGY RESEARCH DAYLIGHT STYLE: A sunlit bird banding and research field station nestled at the edge of a deciduous forest in bright morning daylight. '
            'In the center foreground, a clean wooden research field table featuring lightweight aluminum bird bands of various numbered sizes arranged neatly on sizing rods, precision brass calipers, an electronic field scale with a soft holding cone, and an open field guide to North American birds. '
            'In the lush green background, songbirds perch peacefully on sun-dappled branches under a clear blue sky. '
            'Palette: bird band polished aluminum, research table natural wood, field guide colorful plumage illustration, and forest foliage emerald green. '
            'Ornithology, bird banding, wildlife tracking, conservation research, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1277,
        "title": "If Rocks Could Talk! Deformed Conglomerate",
        "intent": "If Rocks Could Talk! Deformed Conglomerate",
        "brief": (
            'Book cover design titled "If Rocks Could Talk! Deformed Conglomerate". '
            'The title "If Rocks Could Talk! Deformed Conglomerate" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT METAMORPHIC GEOLOGY DAYLIGHT STYLE: A sunlit geology laboratory table in bright natural daylight. '
            'In the center foreground, a polished geological specimen of deformed conglomerate rock, clearly showing pebbles and cobbles stretched and flattened into colorful ribbons by intense tectonic heat and pressure. '
            'Beside it are comparison specimens of sedimentary sandstone and igneous basalt, a brass geological pocket transit compass, a streak plate, and an illustrated chart of the rock cycle. '
            'Palette: conglomerate pebble multicolor (quartz white, jasper red, basalt dark gray), laboratory table warm oak, and chart clear primary colors. '
            'Geology, metamorphic rocks, rock cycle, plate tectonics, Earth science, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1278,
        "title": "Leaping Lizards",
        "intent": "Leaping Lizards",
        "brief": (
            'Book cover design titled "Leaping Lizards". '
            'The title "Leaping Lizards" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DESERT HERPETOLOGY DAYLIGHT STYLE: A sun-drenched American Southwestern desert landscape in radiant morning daylight. '
            'In the center foreground, a magnificent eastern collared lizard perched regally on a warm red sandstone boulder, showing off its vivid turquoise-green body, yellow head, and striking black-and-white neck collar. '
            'Surrounding the rock are blooming yellow desert marigolds, saguaro cactus silhouettes, and distant sunlit canyon mesas under a deep azure sky. '
            'Palette: lizard turquoise green and sun yellow, desert rock terracotta red, flower lemon yellow, and desert sky radiant blue. '
            'Herpetology, desert ecology, reptiles, wildlife exploration, bright, vibrant, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1279,
        "title": "Matter Is Everywhere!",
        "intent": "Matter Is Everywhere!",
        "brief": (
            'Book cover design titled "Matter Is Everywhere!". '
            'The title "Matter Is Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT STATES OF MATTER SCIENCE DAYLIGHT STYLE: A cheerful, brightly lit elementary science classroom workbench in full natural daylight. '
            'In the center foreground, a vivid demonstration of the three states of matter: a crystalline clear ice cube (solid) resting in a glass beaker of sparkling water (liquid), with gentle translucent steam vapor (gas) rising toward the sunny classroom window. '
            'Beside the beaker are colorful ball-and-stick molecular structure models representing solid, liquid, and gas particle spacing, and a colorful thermometer. '
            'Palette: water and glass sparkling cyan, ice crystal white, molecular model primary red, blue, and yellow, and classroom sunlight golden. '
            'Physical science, states of matter, solids liquids gases, chemistry fundamentals, bright, friendly, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1280,
        "title": "Mission: Pluto",
        "intent": "Mission: Pluto",
        "brief": (
            'Book cover design titled "Mission: Pluto". '
            'The title "Mission: Pluto" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT NEW HORIZONS PLUTO MISSION STYLE: A magnificent, sun-illuminated space encounter scene at the edge of the solar system. '
            'In the center foreground, the New Horizons spacecraft with its large gold-and-white parabolic dish antenna and science instruments flying past dwarf planet Pluto. '
            'Pluto\'s textured surface is illuminated in dramatic relief, revealing its iconic peach-tinted nitrogen ice heart (Tombaugh Regio) and towering water-ice mountain ranges under a distant brilliant point of golden sunlight. '
            'In the background, Pluto\'s large moon Charon hovers in deep starry space. '
            'Palette: Pluto nitrogen ice peach and reddish-tholin russet, spacecraft gold and white, and space deep velvet indigo with distant sun flare. '
            'Planetary science, Pluto flyby, New Horizons mission, Kuiper belt exploration, bright, educational, inspiring. '
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

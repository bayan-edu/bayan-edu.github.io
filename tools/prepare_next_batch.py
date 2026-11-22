import os

books = [
    {
        "id": 1064,
        "title": "Why Don't People on the Other Side Fall Off?",
        "intent": "Why Don't People on the Other Side Fall Off?",
        "brief": (
            'Book cover design titled "Why Don\'t People on the Other Side Fall Off?". '
            'The title "Why Don\'t People on the Other Side Fall Off?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PLANETARY GRAVITY DAYLIGHT STYLE: A sunlit, magnificent orbital view of planet Earth in vibrant space, bathed in radiant daylight from a brilliant golden sun. '
            'In the center foreground, the brilliant blue-and-green globe of Earth with floating symbolic scientific elements: a bright red apple, a brass compass, and a miniature model satellite all gracefully held in harmonious gravitational orbit around the world. '
            'Luminous golden and azure gravitational field lines curve gently around the planet, demonstrating how mass attracts everything towards the center from every angle. '
            'Palette: oceanic sapphire blue, continent emerald green, atmosphere azure, apple crimson, and radiant sunbeam gold. '
            'Planetary physics, gravity, orbital mechanics, Earth science, bright, educational, inspiring, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1067,
        "title": "Grandfather Goes on Strike",
        "intent": "Grandfather Goes on Strike",
        "brief": (
            'Book cover design titled "Grandfather Goes on Strike". '
            'The title "Grandfather Goes on Strike" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUNNY SUMMER GARDEN DAYLIGHT STYLE: A charming, sun-drenched cottage garden on a glorious clear summer morning under bright daylight. '
            'In the center foreground, a sturdy vintage wooden ladder leaning securely against a magnificent mature apple tree laden with glossy red fruit and lush green leaves. '
            'Beside the tree on the emerald lawn rests a shiny vintage bicycle, an open wooden gardening toolbox with polished brass shears and trowel, and colorful blooming garden beds of sunflowers and daisies. '
            'In the background, a cozy brick garden cottage with white trim under a bright azure sky with soft wispy clouds. '
            'Palette: apple red, leafy emerald, sunlit daisy yellow, sky azure, and warm cottage brick terra-cotta. '
            'Summer holidays, garden adventures, peaceful nature, whimsical, bright, cheerful, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1237,
        "title": "Anna's Extraordinary Experiments with Weather",
        "intent": "Anna's Extraordinary Experiments with Weather",
        "brief": (
            'Book cover design titled "Anna\'s Extraordinary Experiments with Weather". '
            'The title "Anna\'s Extraordinary Experiments with Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT METEOROLOGICAL SCIENCE DAYLIGHT STYLE: A sunlit, inspiring meteorological research station on a scenic hilltop observatory under bright daylight. '
            'In the center foreground, a polished wooden scientific workbench featuring gleaming brass weather instruments: a spinning three-cup anemometer, a precision mercury barometer, a glass sunshine recorder sphere, and weather measurement charts. '
            'On an outdoor balcony railing behind the bench, a colorful high-altitude weather balloon is being prepared against a majestic sky filled with billowing white cumulus clouds and brilliant sunshine. '
            'Palette: observatory brass gold, sky azure, cumulus white, instrument steel silver, and hilltop meadow green. '
            'Atmospheric science, meteorology, weather instruments, scientific pioneering, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1238,
        "title": "Why Can't We Glow Like Fireflies?",
        "intent": "Why Can't We Glow Like Fireflies?",
        "brief": (
            'Book cover design titled "Why Can\'t We Glow Like Fireflies?". '
            'The title "Why Can\'t We Glow Like Fireflies?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT BIOLUMINESCENCE NATURE STYLE: An enchanting, lush forest scene glowing with wonder and bioluminescent life. '
            'In the center foreground, several detailed fireflies with translucent delicate wings resting on rich green fern fronds and mossy tree bark, emitting warm, radiant golden-chartreuse light. '
            'Surrounding them, soft sparkling light orbs drift through the air like miniature floating stars, revealing an open botanical field notebook with clear educational diagrams of the luciferase enzyme and bioluminescent chemical reaction. '
            'Palette: bioluminescent neon chartreuse, glowing warm amber, deep forest emerald, and soft twilight teal. '
            'Bioluminescence, firefly biology, biochemistry, nature wonder, friendly, educational, luminous. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1239,
        "title": "What Happens When You Flush?",
        "intent": "What Happens When You Flush?",
        "brief": (
            'Book cover design titled "What Happens When You Flush?". '
            'The title "What Happens When You Flush?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT WATER ENGINEERING & TREATMENT DAYLIGHT STYLE: A clean, colorful, fascinating cutaway cross-section and diagram of modern urban water infrastructure in bright daylight. '
            'In the center, sleek transparent pipes with swirling crystal-clear sparkling water flowing into high-tech modern eco-filtration aeration chambers, with mechanical valves, brass pressure gauges, and clean bubbling purification tanks. '
            'Educational arrows and clean graphics illustrate the flow of water through nature and municipal treatment back into a sunlit clean river. '
            'Palette: sparkling aqua cyan, fresh river teal, polished brass gold, porcelain white, and sunlit sky blue. '
            'Civil engineering, water filtration, urban sanitation, environmental science, bright, educational, completely clean and daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1240,
        "title": "Earth Calling Aru",
        "intent": "Earth Calling Aru",
        "brief": (
            'Book cover design titled "Earth Calling Aru". '
            'The title "Earth Calling Aru" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GRAVITY & PLANETARY ATMOSPHERE DAYLIGHT STYLE: A vibrant, uplifting perspective of planet Earth surrounded by its glowing protective atmosphere in bright sunshine. '
            'In the foreground, colorful kites of geometric patterns, maple leaves, and paper airplanes float gently along visible curved lines of gravitational pull and aerodynamic air currents under a bright azure sky. '
            'Below, the lush green curve of the Earth shows rolling meadows and blue seas firmly anchored by gravity. '
            'Palette: atmospheric sky blue, earth turquoise, meadow emerald, kite vibrant crimson and yellow. '
            'Physics of gravity, atmospheric sciences, aerodynamic forces, friendly, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1241,
        "title": "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects",
        "intent": "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects",
        "brief": (
            'Book cover design titled "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects". '
            'The title "Rajmohana Keloth: The Bug Finder and Her Big World of Tiny Insects" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ENTOMOLOGY NATURE DAYLIGHT STYLE: A sun-drenched outdoor nature study table and garden in bright morning daylight. '
            'In the center foreground, a high-precision brass field microscope beside a large glass magnifying lens focusing on a parade of industrious red garden ants marching along a smooth fallen branch. '
            'Perched gracefully on a nearby blooming wild ginger leaf is an elegant green praying mantis. '
            'Open field notebooks with exquisite pencil sketches of insect anatomy, glass sample vials with ventilation lids, and colorful wildflowers. '
            'Palette: leaf emerald, insect amber gold, magnifying brass, floral coral, and sunlit morning ivory. '
            'Entomology, insect biodiversity, scientific observation, nature discovery, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1242,
        "title": "Eye Can See",
        "intent": "Eye Can See",
        "brief": (
            'Book cover design titled "Eye Can See". '
            'The title "Eye Can See" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT OPTICS & VISION SCIENCE DAYLIGHT STYLE: A sunlit physics laboratory bench bathed in radiant morning light. '
            'In the center, a triangular glass optical prism refracting a sharp beam of natural sunlight into a dazzling, vivid rainbow spectrum across the table. '
            'Arranged nearby are convex and concave optical glass lenses focusing light rays, an antique brass handheld telescope with polished brass fittings, and a detailed cross-section anatomical model of a human eye lens and cornea. '
            'Palette: prism rainbow spectrum (red, orange, yellow, green, blue, violet), optic glass crystal, brass gold, and clean laboratory white. '
            'Optics, light refraction, vision science, sensory biology, bright, educational, dynamic, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1243,
        "title": "Ajay of Agumbe and the Signal Snake",
        "intent": "Ajay of Agumbe and the Signal Snake",
        "brief": (
            'Book cover design titled "Ajay of Agumbe and the Signal Snake". '
            'The title "Ajay of Agumbe and the Signal Snake" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RAINFOREST WILDLIFE TELEMETRY DAYLIGHT STYLE: A sun-dappled, lush rainforest clearing in the mist-crowned hills of Agumbe under morning daylight. '
            'In the center foreground, a professional Yagi directional wildlife radio telemetry antenna with metal directional elements resting on a moss-covered granite boulder beside a portable field telemetry receiver with analog signal meters. '
            'In the vibrant background through emerald tree ferns and tropical orchids, a majestic golden-banded king cobra glides gracefully across a sunlit jungle log. '
            'Palette: rainforest emerald green, telemetry antenna silver, king cobra olive and gold, orchid magenta, and morning mist cyan. '
            'Rainforest ecology, wildlife tracking, radio telemetry, conservation biology, bright, adventurous, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1244,
        "title": "Space Rules",
        "intent": "Space Rules",
        "brief": (
            'Book cover design titled "Space Rules". '
            'The title "Space Rules" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT COSMIC EXPLORATION DAYLIGHT STYLE: A brilliant, vivid space voyage scene filled with cosmic wonder and luminous celestial bodies. '
            'In the center foreground, a sleek automated scientific space probe with solar panels outstretched and a gleaming parabolic dish antenna navigating past a majestic swirling ringed gas giant planet. '
            'In the background, a radiant golden sun casts dramatic sunbeams through a colorful cosmic nebula of violet and turquoise gas clouds, with distant twinkling stars and clean geometric planetary orbits. '
            'Palette: cosmic violet, nebular turquoise, solar flare gold, space probe titanium white, and ringed planet amber. '
            'Astronomy, space exploration, solar system science, cosmic wonder, bright, inspiring, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1245,
        "title": "The Mango Tree",
        "intent": "The Mango Tree",
        "brief": (
            'Book cover design titled "The Mango Tree". '
            'The title "The Mango Tree" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUNNY ORCHARD DAYLIGHT STYLE: A sun-drenched, picturesque tropical orchard on a warm summer afternoon in radiant bright daylight. '
            'In the center foreground, a magnificent, sprawling ancient mango tree with a sturdy textured trunk and broad leafy canopy heavy with abundant clusters of luscious ripe golden-yellow and blush-pink mangoes. '
            'Beneath the tree on the lush green grass, handwoven wicker harvest baskets are filled to the brim with freshly picked mangoes, with fluttering yellow butterflies and sunbeams filtering through the foliage. '
            'Palette: mango golden saffron and blush peach, canopy emerald and jade, wicker warm honey, and brilliant summer azure sky. '
            'Botany, fruit agriculture, summer nature, wholesome harvest, bright, cheerful, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1246,
        "title": "ROCKET LIFTING",
        "intent": "ROCKET LIFTING",
        "brief": (
            'Book cover design titled "ROCKET LIFTING". '
            'The title "ROCKET LIFTING" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT HISTORIC ROCKET LAUNCH DAYLIGHT STYLE: A sunlit coastal rocket launchpad at Thumba seaside under a brilliant blue tropical sky in bright daylight. '
            'In the center foreground, a slender sounding rocket standing poised vertically on its steel launch tower, flanked by towering swaying coconut palms. '
            'In the background, the sparkling turquoise waves of the Arabian Sea break gently on sandy shores, with telemetry tracking dish antennas and seaside weather flags waving in the coastal breeze. '
            'Palette: sounding rocket white and aerospace orange, launch tower steel, palm frond emerald, sea turquoise, and sunny daylight gold. '
            'Space history, sounding rockets, aerospace engineering, coastal science, bright, educational, inspiring, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1249,
        "title": "Dragonfly in Details",
        "intent": "Dragonfly in Details",
        "brief": (
            'Book cover design titled "Dragonfly in Details". '
            'The title "Dragonfly in Details" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MACRO NATURE DAYLIGHT STYLE: A breathtaking, crystal-clear macro photograph of a stunning dragonfly perched on a reed in bright morning sunlight. '
            'In the center foreground, a vibrant emerald and electric-blue dragonfly with iridescent, translucent wings showing intricate lace-like venation, shimmering compound eyes reflecting the sunny sky, and glistening morning dew droplets resting on its thorax and the green water lily pad. '
            'In the soft background, calm shimmering wetland water reflects golden sunbeams and pink water lily blossoms. '
            'Palette: dragonfly electric cyan and metallic emerald, water lily petal soft rose, leaf moss green, and morning dew sparkle gold. '
            'Macro entomology, insect anatomy, wetland biodiversity, nature photography, bright, crisp, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1250,
        "title": "Diving",
        "intent": "Diving",
        "brief": (
            'Book cover design titled "Diving". '
            'The title "Diving" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL REEF DAYLIGHT STYLE: A sun-drenched, crystal-clear underwater coral reef panorama illuminated by sparkling rays of tropical sunlight penetrating turquoise waters. '
            'In the center foreground, colorful scuba diving equipment: a bright yellow dive mask and snorkel resting beside sleek diving fins on a sunlit coral ledge. '
            'Surrounding the ledge, schools of vibrant yellow-backed fusilier fish and clownfish glide through magnificent pink brain corals, purple sea fans, and giant sea anemones. '
            'Palette: tropical ocean turquoise, coral rose and purple, reef fish bright sunny yellow, diving gear vibrant yellow and black, and sunbeam white. '
            'Marine biology, scuba diving adventure, coral reef ecosystems, ocean exploration, bright, vibrant, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1252,
        "title": "Journey to Earth",
        "intent": "Journey to Earth",
        "brief": (
            'Book cover design titled "Journey to Earth". '
            'The title "Journey to Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PLANETARY SCIENCE DAYLIGHT STYLE: An awe-inspiring view from the observation deck of an exploratory research spacecraft approaching planet Earth bathed in brilliant sunshine. '
            'In the center through the panoramic reinforced glass portal, the radiant blue-and-white marble of Earth glows with swirling white cloud formations over deep blue oceans and green-brown continents. '
            'On the spacecraft console below the portal, clean glowing holographic telemetry screens display planetary atmospheric data and orbital trajectories. '
            'Palette: Earth deep ocean blue and atmospheric cyan, cloud bright white, spacecraft metallic silver and teal telemetry glow, and brilliant solar flare gold. '
            'Planetary science, astronomy, space exploration, Earth systems, bright, inspiring, educational, daylight. '
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

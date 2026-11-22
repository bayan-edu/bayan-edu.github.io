import os

books = [
    {
        "id": 1944,
        "title": "Cosmic Car Crash!",
        "intent": "Cosmic Car Crash colliding galaxies astrophysics starburst nebulae",
        "brief": (
            'Book cover design titled "Cosmic Car Crash!". '
            'The title "Cosmic Car Crash!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASTROPHYSICS GALACTIC COLLISION STYLE: A breathtaking deep space vista showing two colossal spiral galaxies in the magnificent process of colliding. '
            'Vibrant swirling tidal tails of brilliant blue newborn star clusters, luminous magenta emission nebulae, and glowing golden galactic cores intertwining in a grand cosmic dance. '
            'Points of sparkling distant starlight and crisp educational gravitational interaction vector curves. '
            'Palette: electric cyan, radiant magenta, cosmic gold, and deep space sapphire. '
            'Galactic merger, gravitational dynamics, astronomy and astrophysics, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1945,
        "title": "Helping a Patient Hunter, the Canada Lynx",
        "intent": "Canada Lynx Lynx canadensis boreal forest wildlife conservation",
        "brief": (
            'Book cover design titled "Helping a Patient Hunter, the Canada Lynx". '
            'The title "Helping a Patient Hunter, the Canada Lynx" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BOREAL WILDLIFE CONSERVATION DAYLIGHT STYLE: A sunlit, pristine winter landscape in the northern boreal forest on a bright crisp morning. '
            'In the center foreground, a magnificent wild Canada lynx (Lynx canadensis) resting attentively on a snow-dusted fallen pine log, '
            'showing its iconic long black ear tufts, flared facial ruff, thick silver-tawny winter coat, and enormous snowshoe paws resting on pure white snow. '
            'Sunbeams filtering through evergreen spruce and fir branches against a clear winter cyan sky. '
            'Palette: lynx silver-tawny fur, pure white snow, spruce deep pine green, and bright morning sky azure. '
            'Wild predator conservation, boreal forest ecology, patient hunter adaptation, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1946,
        "title": "How Mountains Form",
        "intent": "How Mountains Form plate tectonics geology orogeny folding",
        "brief": (
            'Book cover design titled "How Mountains Form". '
            'The title "How Mountains Form" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOLOGY TECTONIC OROGENY DAYLIGHT STYLE: A dramatic educational cutaway landscape bathed in clear midday sunlight. '
            'Towering jagged alpine mountain peaks with jagged rocky crags and glistening glaciers, seamlessly transitioning into an exposed geological cross-section below, '
            'revealing colorful folded strata of sedimentary rock, subterranean tectonic plate convergence forces, and volcanic magma upwelling. '
            'Palette: alpine rock granite grey, glacier ice cyan, subterranean strata terracotta ochre and sienna, and alpine sky cerulean blue. '
            'Mountain building, plate tectonics, geological uplift, Earth science, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1947,
        "title": "Lunar Eclipses and Solar Eclipses",
        "intent": "Lunar Eclipses and Solar Eclipses astronomy umbra penumbra orbits",
        "brief": (
            'Book cover design titled "Lunar Eclipses and Solar Eclipses". '
            'The title "Lunar Eclipses and Solar Eclipses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASTRONOMY CELESTIAL MECHANICS STYLE: A dual celestial educational composition showing both types of eclipses. '
            'On one side, a solar eclipse with the Moon perfectly covering the Sun, revealing the dazzling white corona and radiant diamond ring effect against space. '
            'On the other side, a deep copper-red Blood Moon during a total lunar eclipse. '
            'Between them, a clean geometric orbital diagram displaying the Sun, Earth, and Moon with umbra and penumbra shadow cones. '
            'Palette: solar corona radiant white, lunar eclipse rich terracotta crimson, and deep orbital midnight blue. '
            'Eclipse science, celestial mechanics, shadow geometry, astronomical wonder, educational and clear. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1948,
        "title": "Meteor Shower!",
        "intent": "Meteor Shower shooting stars cometary debris night sky observatory",
        "brief": (
            'Book cover design titled "Meteor Shower!". '
            'The title "Meteor Shower!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELESTIAL METEOR SHOWER STYLE: A breathtaking view of the night sky above a mountain astronomical observatory dome. '
            'Dozens of brilliant, luminous meteor streaks radiating across the firmament from a single radiant point, leaving glowing green and golden ionization trails. '
            'The majestic arch of the Milky Way galaxy stretching overhead with vibrant star dust clouds. '
            'Palette: meteor ionization trails electric lime and gold, observatory silver-white, and deep cosmos indigo. '
            'Meteor shower, cometary dust streams, astronomical observing, atmospheric entry, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1950,
        "title": "Nature Is Our Super Shield!",
        "intent": "Nature Is Our Super Shield biomimicry protective structures armor",
        "brief": (
            'Book cover design titled "Nature Is Our Super Shield!". '
            'The title "Nature Is Our Super Shield!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOMIMICRY PROTECTIVE ENGINEERING DAYLIGHT STYLE: A sun-drenched montage of nature\'s greatest protective adaptations in clear daylight. '
            'In the center, an intricately textured pangolin scale keratin shield and an iridescent mother-of-pearl (nacre) abalone seashell interior, '
            'alongside a lotus leaf repelling glistening spherical water droplets (superhydrophobic lotus effect) and resilient pinecone scales. '
            'Clean technical callouts showing microscopic layered architecture. '
            'Palette: iridescent nacre pearlescent rainbow, lotus leaf vibrant emerald green, and sunny sky blue. '
            'Biomimetic armor, natural materials science, defensive evolution, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1951,
        "title": "Navigation in the Age of Exploration",
        "intent": "Navigation in the Age of Exploration sextant astrolabe cartography",
        "brief": (
            'Book cover design titled "Navigation in the Age of Exploration". '
            'The title "Navigation in the Age of Exploration" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORICAL MARITIME CARTOGRAPHY DAYLIGHT STYLE: A sunlit explorer\'s navigation table aboard a classic wooden ship on a bright open ocean morning. '
            'In the foreground, an exquisite polished brass sextant, an ornate brass astrolabe, a dry-card compass rose, and an open rolled parchment map chart of the oceans, '
            'with brass calipers and an hourglass. Through the window, the bright blue horizon of the sea under sunlit fluffy clouds. '
            'Palette: polished brass gleaming gold, vintage parchment warm sepia, mahogany wood deep amber, and ocean azure. '
            'Celestial navigation, maritime exploration history, instruments of cartography, refined and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1952,
        "title": "Old-Time Operations",
        "intent": "Old-Time Operations history of medicine surgery apothecary botany",
        "brief": (
            'Book cover design titled "Old-Time Operations". '
            'The title "Old-Time Operations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORY OF MEDICINE DAYLIGHT APOTHECARY STYLE: A bright, sunlit historical physician\'s study and botanical laboratory. '
            'On a polished oak workbench, vintage brass microscopes, hand-blown amber glass apothecary vials with botanical tinctures, '
            'an antique anatomical model skeleton of the hand, dried medicinal herbs, and illustrated botanical medical folios under warm morning window light. '
            'Palette: amber glass, polished brass gold, parchment ivory, and botanical green. '
            'History of medicine, surgical evolution, medical breakthroughs, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1954,
        "title": "Planting Grasses to Clean a River",
        "intent": "Planting Grasses to Clean a River riparian wetland phytoremediation",
        "brief": (
            'Book cover design titled "Planting Grasses to Clean a River". '
            'The title "Planting Grasses to Clean a River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVER RESTORATION ECOLOGY DAYLIGHT STYLE: A sun-drenched, sparkling riverbank restoration project in full summer daylight. '
            'Lush green native wetland grasses, sedges, and cattails planted densely along the curving banks of a crystal-clear winding river, '
            'with submerged root systems filtering runoff water shown clearly in clean educational cross-section. '
            'Dragonflies hovering above the reeds and smooth river stones under a bright blue sky. '
            'Palette: wetland reeds vibrant emerald green, river water sparkling turquoise cyan, river pebbles warm grey, and sunny sky blue. '
            'Riparian buffers, water purification, ecological restoration, environmental engineering, cheerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1955,
        "title": "Printing Homes for Birds",
        "intent": "Printing Homes for Birds 3D printing avian conservation nest box",
        "brief": (
            'Book cover design titled "Printing Homes for Birds". '
            'The title "Printing Homes for Birds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AVIAN INNOVATION CONSERVATION DAYLIGHT STYLE: A bright, sunny temperate forest setting in spring. '
            'Mounted safely on a sturdy oak tree trunk is a futuristic, beautifully engineered 3D-printed biodegradable bird nest box '
            'with parametric ventilation patterns and an ergonomic entrance perch. A cheerful wild chickadee bird with black cap and white cheeks perched on a nearby branch looking at its new home. '
            'Dappled sunlight through fresh green leaves. '
            'Palette: modern nest box terracotta and clay-white, oak bark warm brown, spring leaves lime green, and sunlit sky azure. '
            '3D printing for wildlife, habitat restoration, bird conservation, sustainable engineering, innovative and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1956,
        "title": "Save Monarch Butterflies with Milkweed",
        "intent": "Save Monarch Butterflies with Milkweed Asclepias pollination ecology",
        "brief": (
            'Book cover design titled "Save Monarch Butterflies with Milkweed". '
            'The title "Save Monarch Butterflies with Milkweed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MONARCH BUTTERFLY BOTANICAL MEADOW DAYLIGHT STYLE: A radiant, sun-soaked wildflower meadow in early summer. '
            'In the center foreground, a magnificent adult Monarch butterfly (Danaus plexippus) with brilliant orange and black patterned wings sipping nectar '
            'from clusters of blooming pink common milkweed (Asclepias syriaca) flowers. '
            'A striped Monarch caterpillar feeding on a lower green milkweed leaf and golden morning dew drops sparkling in the sunlight. '
            'Palette: monarch wings radiant orange and crisp black, milkweed blossoms soft rose pink, foliage lush green, and sunny sky cyan. '
            'Butterfly conservation, host plant ecology, pollinator gardens, vibrant, joyous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1957,
        "title": "Saving the Flying Mammal",
        "intent": "Saving the Flying Mammal bat conservation megabat pollination canopy",
        "brief": (
            'Book cover design titled "Saving the Flying Mammal". '
            'The title "Saving the Flying Mammal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WILDLIFE CONSERVATION DAYLIGHT CANOPY STYLE: A sunlit tropical rainforest canopy at golden hour. '
            'In the center, a majestic golden-crowned fruit bat (flying fox) with warm fox-colored fur and expansive delicate wing membranes '
            'perched securely on a branch among lush tropical figs and broad rainforest leaves, with gentle sunbeams breaking through the foliage. '
            'Palette: fruit bat fur warm golden russet, wing membranes rich chestnut, rainforest canopy deep emerald, and sunlight warm amber. '
            'Mammal conservation, bat ecology, tropical seed dispersal, wondrous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1958,
        "title": "Studying Coral Reefs Helps the Land, Too",
        "intent": "Studying Coral Reefs Helps the Land marine ecology coastal protection",
        "brief": (
            'Book cover design titled "Studying Coral Reefs Helps the Land, Too". '
            'The title "Studying Coral Reefs Helps the Land, Too" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CORAL REEF AND COASTLINE DAYLIGHT STYLE: A split over-underwater composition bathed in crystal-clear midday sunshine. '
            'Below the water, a vibrant coral reef teeming with staghorn corals, sea fans, brain corals, and colorful yellow tang and damselfish. '
            'Above the water line, a lush green tropical island coastline with mangroves and sandy beaches protected from powerful ocean swells by the barrier reef. '
            'Palette: reef water luminous turquoise, corals coral-pink and golden-orange, tropical foliage emerald green, and sunny sky blue. '
            'Coastal protection, coral reef ecology, wave dissipation, marine science, dazzling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1959,
        "title": "The Nervous System",
        "intent": "The Nervous System neurobiology neurons synapses human biology",
        "brief": (
            'Book cover design titled "The Nervous System". '
            'The title "The Nervous System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NEUROBIOLOGY ANATOMICAL SCIENCE STYLE: A luminous, high-precision educational illustration of the nervous system. '
            'In the center, an intricately branching network of glowing neurons, dendrites, and axon pathways firing luminous electrochemical impulses across synaptic gaps. '
            'Clean anatomical silhouette of the brain and spinal column coordinating motor and sensory signals. '
            'Palette: neural signals electric cyan and golden amber, axons deep cobalt blue, and background crisp educational navy. '
            'Human anatomy, neurobiology, brain science, electrical impulse transmission, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1961,
        "title": "Turtles Love the Beach, Too",
        "intent": "Turtles Love the Beach sea turtle hatchling marine conservation",
        "brief": (
            'Book cover design titled "Turtles Love the Beach, Too". '
            'The title "Turtles Love the Beach, Too" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEA TURTLE BEACH CONSERVATION DAYLIGHT STYLE: A sun-drenched tropical beach on a bright morning. '
            'In the foreground, a tiny newborn green sea turtle hatchling making its determined journey across smooth golden sand dunes toward '
            'the gentle foam of sparkling turquoise ocean waves breaking softly in the morning sun. '
            'Tiny flipper tracks in the sand and sunny skies above. '
            'Palette: sand warm golden yellow, ocean water crystal turquoise and seafoam white, turtle olive-brown shell, and sunny sky cyan. '
            'Marine biology, sea turtle conservation, beach ecosystems, heartwarming, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1962,
        "title": "What's the Sun's Mood Today?",
        "intent": "Whats the Suns Mood Today solar flares coronal mass ejection space weather",
        "brief": (
            'Book cover design titled "What\'s the Sun\'s Mood Today?". '
            'The title "What\'s the Sun\'s Mood Today?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOLAR ASTRONOMY SPACE WEATHER STYLE: A breathtaking, high-detail view of our Sun captured through specialized scientific solar observatory filters. '
            'Massive glowing plasma prominences and magnetic loops arching thousands of kilometers above the turbulent, granular golden photosphere. '
            'Dark sunspots revealing magnetic vortexes and energetic coronal mass ejection solar flares radiating outward into the solar system. '
            'Palette: solar plasma fiery golden-yellow, radiant orange, solar flares brilliant white, and space deep black. '
            'Solar dynamics, space weather, heliophysics, magnetic fields, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1963,
        "title": "What a Dump!",
        "intent": "What a Dump recycling sustainable waste management circular economy",
        "brief": (
            'Book cover design titled "What a Dump!". '
            'The title "What a Dump!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUSTAINABLE RECYCLING TECHNOLOGY DAYLIGHT STYLE: A sunlit, modern clean recycling and resource recovery facility in full daylight. '
            'High-tech optical sorting conveyors separating clean colorful recyclable glass, aluminum cans, and polymers, '
            'transforming into neatly stacked raw materials ready for manufacturing. In the background, green landscaped landfills with methane capture pipes under a clear blue sky. '
            'Palette: recycling green, clean aluminum silver, glass emerald, and bright sky cyan. '
            'Circular economy, waste management, recycling innovation, environmental sustainability, clean and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1965,
        "title": "Benjamin Franklin and Electricity",
        "intent": "Benjamin Franklin and Electricity kite experiment Leyden jar lightning",
        "brief": (
            'Book cover design titled "Benjamin Franklin and Electricity". '
            'The title "Benjamin Franklin and Electricity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORICAL PHYSICS DISCOVERY STYLE: The iconic scientific breakthrough of electrical discovery. '
            'In the foreground, a classic diamond-shaped silk kite with a metallic lightning rod tip soaring near dramatic stormy clouds, '
            'with a conductive hemp cord leading down to a suspended antique brass door key sparkling with vivid electrical static corona. '
            'Beside it on a wooden table sits a glass Leyden jar storing electric charge. '
            'Palette: lightning electric blue, brass key gleaming gold, storm clouds dramatic slate grey, and silk kite warm ivory. '
            'History of physics, electricity discovery, scientific experimentation, electrifying and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1966,
        "title": "California Condors Achieve a Happy New Milestone",
        "intent": "California Condor Gymnogyps californianus recovery Big Sur soaring",
        "brief": (
            'Book cover design titled "California Condors Achieve a Happy New Milestone". '
            'The title "California Condors Achieve a Happy New Milestone" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CALIFORNIA CONDOR CONSERVATION DAYLIGHT STYLE: A breathtaking coastal California landscape bathed in brilliant morning sunshine. '
            'Soaring effortlessly on warm thermal updrafts is a magnificent wild California condor (Gymnogyps californianus), '
            'its colossal nine-foot wingspan spread wide displaying white triangular underwing patches and primary flight feathers. '
            'Below, the rugged cliffs of Big Sur plunge into the sparkling blue Pacific Ocean, with coastal redwood trees basking in the sun. '
            'Palette: condor plumage jet black with pure white wing patches, condor head warm golden-orange, ocean Pacific sapphire blue, and sunny sky cerulean. '
            'Species recovery, avian conservation, California wilderness, triumphant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1967,
        "title": "Climate vs. Weather",
        "intent": "Climate vs Weather meteorology atmosphere seasons barometer radar",
        "brief": (
            'Book cover design titled "Climate vs. Weather". '
            'The title "Climate vs. Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGY ATMOSPHERIC SCIENCE DAYLIGHT STYLE: An educational dual-panel scientific composition. '
            'On one side, instantaneous day-to-day weather: a weather station vane, digital anemometer, rain gauge, and a localized sunshower with a vibrant rainbow. '
            'On the other side, long-term climate: a global Earth climate zones sphere showing polar ice caps, temperate forests, and equatorial tropical belts with multi-decade temperature graphs. '
            'Palette: atmospheric sky blue, rainbow spectral colors, globe ocean cyan, and instrument silver. '
            'Atmospheric science, meteorology vs climatology, data science, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1968,
        "title": "Group Behavior",
        "intent": "Group Behavior collective animal intelligence murmuration flock schooling",
        "brief": (
            'Book cover design titled "Group Behavior". '
            'The title "Group Behavior" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COLLECTIVE ANIMAL BEHAVIOR DAYLIGHT STYLE: A breathtaking natural spectacle of animal swarm intelligence in bright daylight. '
            'In the center sky, a vast murmuration of tens of thousands of starlings swirling together in fluid, undulating geometric waves over golden sunlit rolling hills. '
            'In the foreground water, a coordinated school of silvery baitfish shimmering as one unified organism, illustrating collective decision-making and safety in numbers. '
            'Palette: starling flock iridescent dark plumage against golden sky, silvery fish scales sparkling cyan, and grassy hills warm olive green. '
            'Animal ethology, collective intelligence, flocking and schooling dynamics, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1970,
        "title": "Many Cars, No Drivers?",
        "intent": "Many Cars No Drivers autonomous vehicles lidar radar smart mobility",
        "brief": (
            'Book cover design titled "Many Cars, No Drivers?". '
            'The title "Many Cars, No Drivers?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AUTONOMOUS VEHICLE ENGINEERING DAYLIGHT STYLE: A sunlit, futuristic smart city boulevard on a bright clear day. '
            'Modern electric autonomous cars cruising smoothly along orderly lanes, equipped with spinning roof-mounted LiDAR sensors, '
            'displaying clean, glowing 3D computer vision bounding boxes and radar point cloud mapping around roadway markings and traffic signals. '
            'Glass skyscrapers and urban solar trees under sunny skies. '
            'Palette: sleek cars metallic white and pearl blue, LiDAR pulses neon cyan, roadway asphalt charcoal, and sunny sky blue. '
            'Self-driving car technology, robotics, smart transportation, urban engineering, forward-looking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1971,
        "title": "News Debate: Virtual Ed",
        "intent": "News Debate Virtual Ed digital learning tablets holographic globe",
        "brief": (
            'Book cover design titled "News Debate: Virtual Ed". '
            'The title "News Debate: Virtual Ed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EDUCATIONAL TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern study space in daylight. '
            'On a clean light wood desk, a sleek modern tablet displaying interactive digital learning software, beside a digital stylus, '
            'headphones, and a glowing, translucent holographic 3D model of planet Earth floating above the screen with interactive learning icons. '
            'Open notebook with neat diagrams and a cup of water under morning window light. '
            'Palette: desk light birch wood, holographic projections radiant cyan and emerald, tablet silver, and sunlight warm white. '
            'Digital education, remote learning debate, interactive educational tools, bright and thoughtful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1972,
        "title": "Rip Currents",
        "intent": "Rip Currents coastal oceanography beach safety water physics",
        "brief": (
            'Book cover design titled "Rip Currents". '
            'The title "Rip Currents" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COASTAL OCEANOGRAPHY DAYLIGHT STYLE: A sun-drenched aerial view of a pristine ocean beach on a bright sunny afternoon. '
            'Clear turquoise coastal waves breaking over sandy sandbars, revealing a distinct channel of calm, darker, churning water flowing rapidly seaward—a textbook rip current. '
            'Clean educational arrows indicating wave approach and seaward exit current flow, with beach safety flags planted in the golden sand. '
            'Palette: ocean water turquoise and deep sapphire, wave crests foam white, sand warm gold, and safety flags bright red and yellow. '
            'Ocean dynamics, rip current safety, beach science, coastal physics, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1974,
        "title": "Thrifting Is Trending",
        "intent": "Thrifting Is Trending vintage sustainable fashion textile recycling",
        "brief": (
            'Book cover design titled "Thrifting Is Trending". '
            'The title "Thrifting Is Trending" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUSTAINABLE FASHION DAYLIGHT BOUTIQUE STYLE: A bright, sunlit boutique studio dedicated to vintage clothing and textile upcycling. '
            'Neatly arranged racks of colorful vintage garments in corduroy, denim, and patterned cotton, '
            'beside a rustic wooden workbench with an antique mechanical sewing machine, colorful spools of thread, measuring tapes, and fabric scissors. '
            'Indoor potted fiddle-leaf figs and warm sunlight streaming through large loft windows. '
            'Palette: denim blue, mustard yellow, vintage sage green, and natural wood grain. '
            'Circular fashion, textile sustainability, thrifting culture, upcycling creativity, vibrant and educational. '
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

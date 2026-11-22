import os

books = [
    {
        "id": 2351,
        "title": "What to See During an Eclipse",
        "intent": "What to See During an Eclipse astronomy solar corona Baily beads shadow bands",
        "brief": (
            'Book cover design titled "What to See During an Eclipse". '
            'The title "What to See During an Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOLAR ECLIPSE PHENOMENA STYLE: A breathtaking daytime celestial event in crisp detail. '
            'In the center, a total solar eclipse at the thrilling transition of totality, revealing shimmering Baily\'s beads of sparkling golden sunlight '
            'filtering through lunar mountain valleys, the dazzling diamond ring sparkle, and radiant pearlescent white coronal streamers reaching into twilight violet space, '
            'with subtle undulating shadow bands projected onto a clean white viewing sheet below. '
            'Palette: solar corona pure radiant white, diamond ring brilliant gold, eclipse sky deep twilight indigo, and viewer accents warm amber. '
            'Solar physics, eclipse phenomena, celestial observation, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2364,
        "title": "The Night the Moon Went Missing",
        "intent": "Night Moon Went Missing new moon lunar cycle nocturnal animals starry sky",
        "brief": (
            'Book cover design titled "The Night the Moon Went Missing". '
            'The title "The Night the Moon Went Missing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUNAR PHASES AND NOCTURNAL NATURE STYLE: A magical, starry night in a tranquil meadow. '
            'A gentle dark night sky crowded with billions of sparkling stars and the glowing silver ribbon of the Milky Way, '
            'with a faint, delicate silver crescent outline of the New Moon showing earthshine (da Vinci glow). '
            'In the foreground, a curious barn owl with heart-shaped white face perched on a rustic wooden gate, and fireflies illuminating wildflowers. '
            'Palette: starry sky deep sapphire and midnight blue, fireflies glowing chartreuse yellow, owl plumage warm cream and golden-brown. '
            'Lunar cycles, nocturnal wildlife, astronomy for children, enchanting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2365,
        "title": "How to Solve a Problem like Himani",
        "intent": "Solve Problem puzzle logic mathematical reasoning gears tangram",
        "brief": (
            'Book cover design titled "How to Solve a Problem like Himani". '
            'The title "How to Solve a Problem like Himani" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CREATIVE PROBLEM SOLVING DAYLIGHT STYLE: A bright, sunlit study workbench filled with colorful logic puzzles and creative inventions in morning daylight. '
            'Interlocking wooden tangram puzzle pieces forming a flying bird, colorful interlocking acrylic gears that turn smoothly together, '
            'a brass magnifying glass, a sketchbook with lightbulb sketches and neat flowchart arrows, and an hourglass under sunny window light. '
            'Palette: tangram pieces vibrant orange, teal, and magenta, gears translucent lime, oak desk warm honey, and sunlight bright white. '
            'Logic, critical thinking, problem-solving skills, engineering mindset, cheerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2366,
        "title": "P.S. What's up with the climate?",
        "intent": "Whats up with climate global warming polar ice renewable solar earth science",
        "brief": (
            'Book cover design titled "P.S. What\'s up with the climate?". '
            'The title "P.S. What\'s up with the climate?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EARTH SCIENCE AND CLIMATE BALANCE DAYLIGHT STYLE: An educational, balanced split-composition of our planet\'s climate in clear daylight. '
            'On one side, a pristine melting arctic glacier with turquoise meltwater feeding a clean river; '
            'on the other side, modern green solutions: modern white wind turbines on green rolling hills, sleek rooftop solar panels, and reforestation saplings, '
            'tied together by an atmospheric temperature gradient and carbon cycle diagram. '
            'Palette: glacier ice turquoise and white, rolling hills emerald green, solar panels cobalt blue, and sky clear sunny azure. '
            'Climate science, renewable energy, environmental stewardship, Earth systems, empowering and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2367,
        "title": "Walking in the Wild",
        "intent": "Walking in Wild nature trail hiking wilderness animal tracks pine forest",
        "brief": (
            'Book cover design titled "Walking in the Wild". '
            'The title "Walking in the Wild" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WILDERNESS TRAIL DISCOVERY DAYLIGHT STYLE: A sunlit, peaceful hiking trail meandering through a pristine old-growth mountain forest in full daylight. '
            'On the damp, soft soil beside the trail, distinct wild animal pawprints (deer tracks, bear tracks, rabbit tracks) lead into the trees, '
            'framed by tall wild ferns, blooming mountain laurel, and ancient moss-covered hemlocks. A wooden trail marker post with compass bearings under a clear blue sky. '
            'Palette: forest foliage deep moss green and fern lime, trail earth rich sienna brown, wildflowers soft violet, and sunlit sky cyan. '
            'Outdoor education, wildlife tracking, nature exploration, peaceful, adventurous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2368,
        "title": "The Red Fairy",
        "intent": "The Red Fairy lightning upper atmospheric sprite mesosphere storm",
        "brief": (
            'Book cover design titled "The Red Fairy". '
            'The title "The Red Fairy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'UPPER ATMOSPHERIC LIGHTNING SPRITE STYLE: A rare, breathtaking view of upper atmospheric electrical phenomena high above a thunderstorm. '
            'Soaring 50 miles above dark thunderclouds into the mesosphere is a magnificent, colossal "Red Sprite" electrical discharge resembling a luminous crimson jellyfish or fairy, '
            'with delicate glowing red filament tentacles reaching downward and blue jets sparking upward into the starry cosmos. '
            'Palette: sprite discharge electric ruby red and crimson, blue jets electric azure, storm clouds deep charcoal, and space deep velvet black with stars. '
            'Atmospheric physics, red sprites, transient luminous events, space weather, dazzling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2370,
        "title": "The Elephant Bird (Shorter Version)",
        "intent": "The Elephant Bird Aepyornis Madagascar giant egg prehistoric fauna",
        "brief": (
            'Book cover design titled "The Elephant Bird". '
            'The title "The Elephant Bird" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PREHISTORIC MADAGASCAR FAUNA DAYLIGHT STYLE: A sunlit ancient coastal savannah in Madagascar on a bright morning. '
            'In the center foreground, a colossal prehistoric Elephant Bird (Aepyornis maximus), standing ten feet tall with powerful muscular legs, '
            'dense shaggy plumage, and a stout beak, beside a giant fossilized ivory egg resting in a nest among spiny desert succulents and baobab trees. '
            'Palette: bird plumage warm tawny brown and grey, eggshell smooth cream ivory, baobab bark rich clay, and morning sky bright azure. '
            'Paleontology, extinct megafauna, island evolution, Madagascar natural history, monumental and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2375,
        "title": "Is it Spring?",
        "intent": "Is it Spring seasonal changes snowdrops crocuses budding trees daylight",
        "brief": (
            'Book cover design titled "Is it Spring?". '
            'The title "Is it Spring?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEASONAL TRANSITION SPRING DAYLIGHT STYLE: A radiant, sun-soaked woodland clearing capturing the exact moment winter turns to spring. '
            'Patches of melting white snow giving way to tender green grass, where clusters of delicate white snowdrops and bright purple and yellow crocuses '
            'are bursting into bloom, with fuzzy pussy willow catkins and tender green tree buds swelling in the warm golden sunshine. '
            'Palette: blooming flowers vibrant amethyst purple and golden yellow, melting snow pure white, moss fresh green, and sunlit sky pale cyan. '
            'Seasonal cycles, phenology, spring awakening, botany, joyous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2383,
        "title": "Pipsqueak Hears Echoes",
        "intent": "Pipsqueak Hears Echoes acoustics echolocation bat cave sound waves physics",
        "brief": (
            'Book cover design titled "Pipsqueak Hears Echoes". '
            'The title "Pipsqueak Hears Echoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ACOUSTICS AND ECHOLOCATION PHYSICS STYLE: A charming, high-detail scientific visualization of sound reflection and echolocation. '
            'In a limestone cave opening at twilight, a tiny, adorable microbat (Pipsqueak) with delicate pointed ears and glossy eyes flying gracefully, '
            'emitting concentric glowing acoustic sound waves that bounce off cavern stalactites and fluttering moths, returning as luminous echo pulses. '
            'Palette: ultrasonic soundwaves radiant neon cyan and lime, microbat warm velvet brown, cave limestone warm amber, and twilight sky violet. '
            'Acoustics physics, echolocation, animal senses, bat biology, delightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2384,
        "title": "Energetic Emily",
        "intent": "Energetic Emily kinetic potential energy roller coaster physics flywheel",
        "brief": (
            'Book cover design titled "Energetic Emily". '
            'The title "Energetic Emily" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'KINETIC AND POTENTIAL ENERGY PHYSICS STYLE: A bright, sunlit amusement park engineering lab in daytime. '
            'In the center, a precision model roller coaster track with a sleek metallic coaster car perched at the crest of a steep loop-de-loop, '
            'illustrated with clean, glowing educational vector arrows showing potential energy converting into kinetic energy (PE = mgh, KE = Â½mvÂ²). '
            'Newton\'s cradle spheres clicking in the foreground with golden sparks. '
            'Palette: coaster track vibrant electric blue, vector arrows glowing neon yellow and orange, and lab sunlight bright white. '
            'Mechanical physics, forms of energy, conservation of energy, motion dynamics, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2385,
        "title": "Energy for Life",
        "intent": "Energy for Life cellular respiration ATP mitochondria glucose sunlight",
        "brief": (
            'Book cover design titled "Energy for Life". '
            'The title "Energy for Life" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELLULAR BIOENERGETICS STYLE: A luminous, high-detail scientific voyage inside a living cell in vibrant daylight. '
            'In the center, a cutaway of an active mitochondrion powerhouse with folded inner cristae membranes generating radiant golden adenosine triphosphate (ATP) molecules, '
            'with clean molecular diagrams linking sunlight photosynthesis in a green leaf to cellular glucose metabolism. '
            'Palette: ATP energy bursts radiant golden yellow, mitochondrion coral pink and magenta, leaf chloroplasts emerald green, and cellular cytoplasm translucent cyan. '
            'Biochemistry, cellular energy, ATP synthesis, biology of life, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2386,
        "title": "Making Rocks",
        "intent": "Making Rocks rock cycle igneous sedimentary metamorphic geology volcano",
        "brief": (
            'Book cover design titled "Making Rocks". '
            'The title "Making Rocks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOLOGY ROCK CYCLE DAYLIGHT STYLE: An educational, dramatic cross-section of the Earth\'s crust showing rock transformation. '
            'In the center, a glowing volcanic magma chamber cooling into speckled igneous granite, transitioning into sedimentary layers of sandstone and limestone '
            'formed by river erosion, and deeply buried metamorphic banded marble transformed by heat and pressure, with geological mineral crystal specimens displayed in the foreground. '
            'Palette: magma fiery molten orange, granite speckled grey and white, sedimentary strata warm terracotta, and sky azure. '
            'Geology, rock cycle, Earth science, mineralogy, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2387,
        "title": "Sea Turtles Find Their Beach",
        "intent": "Sea Turtles Find Beach geomagnetic navigation loggerhead ocean current",
        "brief": (
            'Book cover design titled "Sea Turtles Find Their Beach". '
            'The title "Sea Turtles Find Their Beach" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARINE GEOMAGNETIC NAVIGATION STYLE: A sun-drenched, crystal-clear turquoise ocean scene off a tropical coast. '
            'A majestic adult loggerhead sea turtle with intricately patterned amber and brown carapace swimming gracefully through sunbeams, '
            'guided by gentle, glowing geomagnetic field lines and oceanic gyre currents depicted as elegant golden wave trajectories leading toward a sunlit nesting beach on the horizon. '
            'Palette: ocean water luminous turquoise and aquamarine, sea turtle shell warm amber-brown, geomagnetic lines glowing gold, and sunny sky blue. '
            'Animal migration, magnetoreception navigation, sea turtle conservation, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2389,
        "title": "Bald Eagle: Winged Predator",
        "intent": "Bald Eagle Haliaeetus leucocephalus raptor soaring river mountains daylight",
        "brief": (
            'Book cover design titled "Bald Eagle: Winged Predator". '
            'The title "Bald Eagle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AMERICAN RAPTOR CONSERVATION DAYLIGHT STYLE: A sunlit, breathtaking river canyon in the Pacific Northwest in brilliant morning sunshine. '
            'A magnificent wild bald eagle (Haliaeetus leucocephalus) with pure snow-white head plumage, piercing golden eyes, and a sharp yellow hooked beak, '
            'perched proudly on a craggy pine branch overlooking a roaring mountain river where silver salmon leap, with snow-capped mountain peaks under an azure sky. '
            'Palette: eagle plumage deep chocolate brown, head and tail snow white, beak and talons golden yellow, and mountain sky royal blue. '
            'Apex avian predator, eagle biology, raptor conservation, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2391,
        "title": "Killer Whales: Predators the Size of a School Bus",
        "intent": "Killer Whales Orcinus orca pod breaching ocean dorsal fin daylight",
        "brief": (
            'Book cover design titled "Killer Whales: Predators the Size of a School Bus". '
            'The title "Killer Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ORCA APEX PREDATOR OCEAN DAYLIGHT STYLE: A sun-drenched Pacific Northwest coastal sound in crisp morning daylight. '
            'A majestic adult bull orca (Orcinus orca) with a towering six-foot dorsal fin leaping powerfully in a breach out of deep blue ocean water, '
            'flinging sparkling white sea spray into the sunlit air, displaying its sleek glossy black back and brilliant white eye patch and belly markings. '
            'A pod of orcas swimming behind against rugged coastal evergreen islands and misty mountains under a bright blue sky. '
            'Palette: orca markings glossy jet-black and pure white, ocean water deep Pacific blue and white sea foam, and sky clear cyan. '
            'Marine mammalogy, orca echolocation, pod hunting strategies, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2392,
        "title": "Mount Pinatubo and the Ring of Fire",
        "intent": "Mount Pinatubo Ring of Fire volcanology caldera eruption ash cloud",
        "brief": (
            'Book cover design titled "Mount Pinatubo and the Ring of Fire". '
            'The title "Mount Pinatubo and the Ring of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VOLCANOLOGY PACIFIC RING OF FIRE STYLE: A dramatic educational panorama of volcanic geology in full daylight. '
            'In the center, the monumental volcanic crater caldera of Mount Pinatubo holding a breathtaking turquoise acid crater lake, '
            'surrounded by rugged lahars and volcanic ash valleys, with a clean educational inset map showing the tectonic Pacific Ring of Fire subduction zones and glowing volcanic hotspots. '
            'Palette: caldera lake crystalline turquoise, volcanic ash layers warm pumice grey and ochre, tectonic map lines neon crimson, and sky clear cyan. '
            'Volcanology, plate tectonics, geological history, natural disasters science, powerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2393,
        "title": "Ospreys: Predators by Sky and Sea",
        "intent": "Ospreys Pandion haliaetus fish hawk raptor diving talons river daylight",
        "brief": (
            'Book cover design titled "Ospreys: Predators by Sky and Sea". '
            'The title "Ospreys: Predators by Sky and Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OSPREY RAPTOR HUNTING DAYLIGHT STYLE: A sunlit, high-speed wildlife action moment captured in brilliant daylight over a coastal estuary. '
            'A wild osprey (fish hawk) with wings swept back in a steep aerodynamic dive, extending its curved, razor-sharp black talons just breaking the sparkling water surface '
            'to grasp a silvery fish, with water droplets exploding into diamond-like sparkles in the midday sunshine. '
            'Palette: osprey plumage dark brown and pure white, water surface sparkling sapphire and aquamarine, and sky bright cerulean blue. '
            'Avian raptor biology, specialized fish-hunting adaptations, coastal ecology, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2394,
        "title": "Predicting the Future",
        "intent": "Predicting the Future predictive modeling algorithms supercomputer climate",
        "brief": (
            'Book cover design titled "Predicting the Future". '
            'The title "Predicting the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DATA SCIENCE AND PREDICTIVE MODELING STYLE: A bright, sunlit computational laboratory overlooking a modern skyline in daytime. '
            'On a sleek glass conference desk, interactive holographic predictive models showing complex global weather simulation spheres, '
            'clean statistical probability distribution curves (Gaussian bell curves), and algorithmic neural network branch nodes projecting insights into the future. '
            'Palette: holographic data lines luminous cyan, gold and emerald, glass desk crystal clear, and skyline sunlight bright white. '
            'Predictive analytics, forecasting science, probability math, artificial intelligence, forward-looking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2395,
        "title": "Salt: The Rock We Eat",
        "intent": "Salt Rock We Eat halite mineral crystals sodium chloride salt flats",
        "brief": (
            'Book cover design titled "Salt: The Rock We Eat". '
            'The title "Salt: The Rock We Eat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HALITE MINERALOGY AND SALT EVAPORATION DAYLIGHT STYLE: A sun-drenched, radiant natural salt flat landscape in full daylight. '
            'In the foreground, a stunning collection of translucent cubic halite salt crystals reflecting sunlight with rainbow prismatic refractions, '
            'beside a ceramic pinch bowl of flaky gourmet sea salt and a cubic molecular ball-and-stick model of NaCl (sodium chloride). '
            'In the background, geometric salt evaporation ponds glistening with pastel pink and turquoise brine under a bright sunny sky. '
            'Palette: salt crystals sparkling white and translucent ice, brine ponds pastel rose and aquamarine, and sky brilliant azure. '
            'Mineralogy, food chemistry, crystalline physics, ancient geology, crisp, sparkling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2396,
        "title": "Special Delivery",
        "intent": "Special Delivery postal logistics delivery drone autonomous cargo shipping",
        "brief": (
            'Book cover design titled "Special Delivery". '
            'The title "Special Delivery" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AUTONOMOUS LOGISTICS INNOVATION DAYLIGHT STYLE: A sunlit, modern residential neighborhood on a bright spring morning. '
            'An advanced multi-rotor electric delivery drone with spinning carbon-fiber propellers gently lowering a neatly packaged parcel with a safety cable '
            'onto a sunlit doorstep landing pad, with clean GPS navigation coordinates and flight vector telemetry graphics projected in the air. '
            'Flowering cherry blossom trees and green lawns under sunny skies. '
            'Palette: drone chassis matte white and safety orange, parcel kraft cardboard warm brown, lawns vibrant green, and sky sunny blue. '
            'Logistics engineering, drone robotics, automated supply chain, futuristic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2397,
        "title": "Super Bowl",
        "intent": "Super Bowl American football physics stadium turf pigskin trajectory",
        "brief": (
            'Book cover design titled "Super Bowl". '
            'The title "Super Bowl" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPORTS SCIENCE AND FOOTBALL PHYSICS DAYLIGHT STYLE: A sun-drenched, grand football stadium on game day in full daylight. '
            'In the center, an authentic pebble-grained leather football spiraling in mid-air above the vibrant green turf yard lines and goalposts, '
            'surrounded by clean, glowing parabolic flight trajectory curves, angular momentum vectors, and aerodynamic drag equations illustrating the physics of the spiral pass. '
            'Confetti drifting through golden sunbeams in the stadium bowl. '
            'Palette: football leather rich chestnut brown with white laces, field turf emerald green, parabolic trajectory radiant yellow, and sky bright blue. '
            'Physics of sports, aerodynamics, projectile motion, athletic engineering, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2398,
        "title": "The Elements of Jewelry",
        "intent": "Elements of Jewelry precious metals gemstones metallurgy lapidary gold",
        "brief": (
            'Book cover design titled "The Elements of Jewelry". '
            'The title "The Elements of Jewelry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LAPIDARY MINERALOGY AND METALLURGY DAYLIGHT STYLE: A bright, sunlit gemologist and jeweler\'s workbench in daytime. '
            'On a velvet inspection pad, exquisite raw mineral crystals alongside faceted gemstones: a cut sapphire, an emerald, and an uncut diamond crystal, '
            'beside nuggets of pure native gold, sterling silver wire, jeweler\'s tweezers, loupe magnifying glass, and periodic table element tags (Au, Ag, Pt, C, Be). '
            'Palette: gold nugget radiant yellow-gold, gemstones sapphire blue, emerald green and diamond sparkle, velvet pad royal navy. '
            'Mineralogy, chemistry of elements, metallurgy, earth science, luxurious and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2399,
        "title": "The Mystery of the Whistling Building",
        "intent": "Mystery Whistling Building architectural acoustics wind vortex aeroacoustics",
        "brief": (
            'Book cover design titled "The Mystery of the Whistling Building". '
            'The title "The Mystery of the Whistling Building" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROACOUSTICS ARCHITECTURAL ENGINEERING STYLE: A sunlit, modern architectural cityscape on a breezy, bright sunny day. '
            'A striking glass-and-steel skyscraper with ornate decorative facade louvers and balconies, with clean educational airflow streamlines '
            'curling into vortex shedding patterns (KÃ¡rmÃ¡n vortex street) through the building\'s metal grilles, showing acoustic resonance soundwaves '
            'explaining why the wind causes the building to whistle like a giant flute. '
            'Palette: skyscraper glass reflective cyan and steel silver, airflow streamlines radiant golden yellow, acoustic waves neon green, and sky deep blue. '
            'Architectural acoustics, fluid dynamics, resonance physics, civil engineering mystery, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2400,
        "title": "Through the Nose",
        "intent": "Through the Nose olfactory anatomy nasal cavity cilia respiration",
        "brief": (
            'Book cover design titled "Through the Nose". '
            'The title "Through the Nose" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HUMAN RESPIRATORY AND OLFACTORY ANATOMY STYLE: A luminous, high-precision educational illustration of the human nasal passage and olfactory system. '
            'A clean sagittal cutaway model showing inhaled air passing over nasal turbinates warming and filtering air, with microscopic olfactory receptor neurons '
            'detecting delicate botanical scent molecules and sending neural signals to the olfactory bulb. '
            'Palette: anatomical structures soft rose and coral, airflow streams radiant cyan, olfactory signals golden amber, and background clean medical white. '
            'Human anatomy, respiration, sensory biology, olfaction, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the clean anatomical cross-section model). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2401,
        "title": "Twist and Shout",
        "intent": "Twist and Shout severe weather tornado meteorology supercell vortex",
        "brief": (
            'Book cover design titled "Twist and Shout". '
            'The title "Twist and Shout" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGY TORNADO VORTEX DYNAMICS STYLE: A dramatic educational daylight storm scene across the Great Plains. '
            'A powerful, rotating supercell thunderstorm with a distinct, sculpted funnel cloud (tornado) touching down on open prairie grassland, '
            'illuminated by bursts of sunlight breaking through the edge of the storm wall. '
            'Clean educational vector arrows showing warm moist updrafts and cold downdrafts feeding the mesocyclone. '
            'Palette: storm clouds deep slate blue and charcoal, sunbeams radiant gold, prairie grass emerald and amber, and vector arrows neon cyan. '
            'Meteorological science, severe weather, vortex physics, atmospheric dynamics, powerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2402,
        "title": "Weather or Not",
        "intent": "Weather or Not meteorology weather forecasting instruments barometer radar",
        "brief": (
            'Book cover design titled "Weather or Not". '
            'The title "Weather or Not" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGICAL SCIENCE INSTRUMENTATION STYLE: A bright, sunlit professional weather station in daytime. '
            'A spinning cup anemometer, an antique brass aneroid barometer, a digital Doppler radar display showing rainfall fronts, '
            'a glass thermometer, and a rain gauge set against an atmospheric sky with a gentle sunshower and a vibrant double rainbow. '
            'Palette: sky atmospheric blue, rainbow vivid spectral spectrum, weather instruments polished brass and silver, and grass fresh green. '
            'Meteorology, weather forecasting, atmospheric pressure, scientific instruments, lively and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2403,
        "title": "Weaving History: How Binary Coding Transformed the World",
        "intent": "Weaving History Binary Coding Jacquard loom punch cards computer origin",
        "brief": (
            'Book cover design titled "Weaving History: How Binary Coding Transformed the World". '
            'The title "Weaving History" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORY OF COMPUTING & JACQUARD LOOM STYLE: A bright, sunlit nineteenth-century textile workshop in morning daylight. '
            'An intricate wooden Jacquard mechanical loom with endless punched cardboard cards linked together by cords, '
            'weaving an exquisite silk brocade tapestry, showing how binary holes (1s and 0s) directed the loom hooks, seamlessly transitioning into modern glowing computer binary code. '
            'Palette: loom polished oak and walnut wood, punch cards warm parchment ivory, silk fabric rich royal blue and gold, and binary code glowing amber. '
            'History of computing, binary code, Jacquard loom, technology evolution, scholarly, elegant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2404,
        "title": "What Are Wind Tunnels?",
        "intent": "What Are Wind Tunnels aerodynamics aerospace testing fan airfoil",
        "brief": (
            'Book cover design titled "What Are Wind Tunnels?". '
            'The title "What Are Wind Tunnels?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE WIND TUNNEL ENGINEERING STYLE: A bright, sunlit high-tech aerodynamic testing facility in daytime. '
            'Looking down the expansive throat of a colossal subsonic wind tunnel with giant circular contra-rotating fan blades at the far end, '
            'testing a futuristic scale-model supersonic jet aircraft suspended on sting balances, with colored smoke streamlines flowing smoothly over the delta wings. '
            'Palette: wind tunnel walls clean industrial white and yellow safety railings, smoke streamlines glowing cyan and magenta, and jet model polished titanium. '
            'Aeronautics, wind tunnel physics, fluid mechanics, aerospace engineering, high-tech and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2405,
        "title": "What Is Earth?",
        "intent": "What Is Earth planet geology atmosphere oceans continents biosphere",
        "brief": (
            'Book cover design titled "What Is Earth?". '
            'The title "What Is Earth?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EARTH PLANETARY SCIENCE STYLE: A breathtaking, crystal-clear view of planet Earth floating gracefully in the cosmos. '
            'The vibrant blue oceans, swirling pure white storm clouds, and richly colored continents showing green rainforests and golden deserts, '
            'with an elegant cutaway quadrant revealing the interior layers: thin rocky crust, molten mantle, and glowing metallic core. '
            'Palette: oceans deep sapphire and turquoise, continents emerald green and ochre, interior mantle glowing golden-orange, and space deep velvet black. '
            'Earth science, geology, planetary structure, environmental wonder, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2406,
        "title": "Wind, Swell, and Rogue Waves",
        "intent": "Wind Swell Rogue Waves physical oceanography massive ocean wave physics",
        "brief": (
            'Book cover design titled "Wind, Swell, and Rogue Waves". '
            'The title "Wind, Swell, and Rogue Waves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PHYSICAL OCEANOGRAPHY WAVE DYNAMICS STYLE: A colossal, breathtaking open ocean swell in full midday sunshine. '
            'A monumental, glassy deep-blue rogue wave cresting with translucent turquoise water and roaring white seafoam, '
            'illustrating constructive wave interference, backed by clean educational sinusoidal wave height graphs and wave period equations under a sunny sky with brisk sea breezes. '
            'Palette: ocean water deep ultramarine and crystal turquoise, wave crest pure white foam, wave equations glowing neon gold, and sky sunny blue. '
            'Physical oceanography, wave physics, rogue wave science, marine dynamics, powerful and educational. '
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

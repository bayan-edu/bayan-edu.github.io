import os

books = [
    {
        "id": 2230,
        "title": "Reading: Journey to the Centre of the Earth",
        "intent": "Journey to the Centre of the Earth Jules Verne crystal cave underground ocean",
        "brief": (
            'Book cover design titled "Journey to the Centre of the Earth". '
            'The title "Journey to the Centre of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC JULES VERNE SUBTERRANEAN EXPLORATION STYLE: A magnificent, glowing subterranean wonderland. '
            'A colossal subterranean cavern illuminated by soft, ambient bioluminescent mineral glow and phosphorescent mushroom forests, '
            'revealing a vast underground sea with gentle waves lapping against a beach of fine volcanic sand and giant crystal geode formations. '
            'In the water, the sleek silhouette of an ancient prehistoric plesiosaur swimming in the distance. '
            'Palette: bioluminescent cyan and aquamarine, crystal quartz translucent white and amethyst violet, and cavern stone warm amber. '
            'Classic adventure literature, underground geology, prehistoric imagination, wondrous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2285,
        "title": "space",
        "intent": "Space astronomy solar system planets nebula stars orbit exploration",
        "brief": (
            'Book cover design titled "Space". '
            'The title "Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOLAR SYSTEM AND COSMIC EXPLORATION STYLE: A vibrant, awe-inspiring panoramic view of our Solar System bathed in luminous cosmic light. '
            'In the foreground, the majestic golden-ringed planet Saturn alongside the swirling storm bands of Jupiter and our vibrant blue Earth. '
            'A robotic planetary space probe with solar panels outstretched cruising peacefully toward distant glowing nebulae of radiant magenta and cyan stardust. '
            'Palette: planetary amber and gold, Earth sapphire and white, nebulae radiant magenta and cyan, and space deep velvet navy. '
            'Astronomy, planetary science, space exploration, celestial wonder, breathtaking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2286,
        "title": "Welcome to the Forest",
        "intent": "Welcome to the Forest temperate woodland biodiversity sunlight canopy fauna",
        "brief": (
            'Book cover design titled "Welcome to the Forest". '
            'The title "Welcome to the Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUNLIT TEMPERATE WOODLAND BIODIVERSITY STYLE: A radiant, sun-drenched ancient temperate forest glade in full spring daylight. '
            'Towering old-growth oak and birch trees with vibrant green leaves framing sunbeams streaming down onto a lush forest floor covered in moss, '
            'ferns, and wild forest flowers. A red fox kit peeking curiously from behind a fallen mossy log, a chipmunk nibbling an acorn, and a colorful woodpecker drumming on bark. '
            'Palette: forest canopy lush emerald and lime green, tree bark warm chestnut, moss golden-olive, and sunbeams luminous white. '
            'Forest ecology, woodland habitat, wildlife biodiversity, cheerful, inviting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2287,
        "title": "DIVE!",
        "intent": "DIVE ocean coral reef marine life underwater sunlight tropical fish",
        "brief": (
            'Book cover design titled "DIVE!". '
            'The title "DIVE!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TROPICAL UNDERWATER REEF EXPLORATION STYLE: An exhilarating underwater panoramic view looking upward toward sun-dappled surface waves. '
            'Shafts of brilliant midday sunlight penetrating down into crystal-clear turquoise waters, illuminating a thriving coral reef pinnacle '
            'swarming with schools of colorful anthias, clownfish darting among sea anemones, and a graceful spotted eagle ray gliding effortlessly through the blue. '
            'Palette: ocean water crystalline turquoise and deep cerulean, corals vibrant coral-pink and yellow, and sunbeams radiant gold. '
            'Marine biology, coral reef ecology, ocean diving, dynamic, refreshing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2290,
        "title": "The Grass Seeker",
        "intent": "The Grass Seeker pastoral nomadic migration sheep flock Himalayas meadow",
        "brief": (
            'Book cover design titled "The Grass Seeker". '
            'The title "The Grass Seeker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIMALAYAN PASTORAL HIGHLANDS DAYLIGHT STYLE: A sunlit alpine meadow in the high Himalayas on a crisp morning. '
            'A gentle flock of fluffy white sheep and cashmere goats grazing peacefully on vibrant green terraced mountain pastures, '
            'with wildflowers blooming beside cold mountain streams, overlooked by soaring snow-draped Himalayan peaks under a clear azure sky. '
            'Palette: pasture grass alpine emerald, sheep wool pure white, Himalayan peaks snowy white and granite grey, and sky crisp azure. '
            'Highland ecology, pastoral traditions, mountain grasslands, serene and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2291,
        "title": "The Body Builders",
        "intent": "The Body Builders human anatomy muscles skeleton nutrition protein cells",
        "brief": (
            'Book cover design titled "The Body Builders". '
            'The title "The Body Builders" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HUMAN ANATOMY MUSCULOSKELETAL STYLE: A bright, sunlit sports science and human anatomy laboratory. '
            'In the center, a clean, high-precision anatomical model illustrating the human muscular system and skeletal frame working in perfect harmony, '
            'beside molecular models of protein amino acid chains, colorful healthy foods (legumes, nuts, grains), and athletic fitness equipment under bright daylight. '
            'Palette: muscular model healthy coral-red and white tendons, skeletal frame ivory, nutrition accents emerald and golden, and lab background bright white. '
            'Human physiology, muscle development, nutrition science, strength biology, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2292,
        "title": "The Plant Whisperer",
        "intent": "The Plant Whisperer botany greenhouse rare flora carnivorous plants",
        "brief": (
            'Book cover design titled "The Plant Whisperer". '
            'The title "The Plant Whisperer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BOTANICAL GREENHOUSE PARADISE DAYLIGHT STYLE: A sun-soaked Victorian glasshouse conservatory filled with exotic botanical marvels. '
            'Lush hanging pitcher plants (Nepenthes) with translucent nectar traps, delicate Venus flytraps with sparkling digestive droplets, '
            'rare sensitive plants (Mimosa pudica) folding leaves, and blooming tropical orchids basking in warm morning sunlight through glass panes. '
            'Antique brass watering cans and wooden plant labels. '
            'Palette: foliage vibrant emerald and chartreuse green, pitcher plants coral red, conservatory glass warm transparent, and sunlight golden. '
            'Botanical adaptations, plant communication, carnivorous plants, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2293,
        "title": "The Case of the New Planet",
        "intent": "The Case of the New Planet exoplanet discovery telescope astronomy Kepler",
        "brief": (
            'Book cover design titled "The Case of the New Planet". '
            'The title "The Case of the New Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXOPLANET DISCOVERY ASTRONOMY STYLE: An inspiring astronomical observatory scene showing the discovery of a distant exoplanet. '
            'In the center, a magnificent golden star with a newly discovered ocean exoplanet transiting in front of it (transit photometry method), '
            'revealing a clean educational light curve dipping graph and orbital mechanics diagrams, alongside a high-tech space telescope in orbit. '
            'Palette: host star radiant golden yellow, exoplanet deep cyan and sapphire, transit data lines bright neon lime, and space deep velvet black. '
            'Exoplanetary science, astronomical detection, Kepler mission, scientific detective work, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2295,
        "title": "Off to See Spiders!",
        "intent": "Off to See Spiders arachnology jumping spider dew drops web macro botany",
        "brief": (
            'Book cover design titled "Off to See Spiders!". '
            'The title "Off to See Spiders!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ARACHNOLOGY MACRO NATURE DAYLIGHT STYLE: A bright, sunlit macro garden scene in early morning daylight. '
            'In the center foreground, an adorable, colorful peacock jumping spider (Maratus) resting on a green leaf, '
            'displaying iridescent blue, red, and golden fan patterns and inquisitive large shiny black front eyes. In the background, an intricate orb web beaded with glistening spherical morning dew drops catching sunlight. '
            'Palette: jumping spider iridescent cobalt, ruby and gold, garden leaf fresh lime green, dew drops diamond crystal, and morning sky pale blue. '
            'Arachnid biodiversity, macro photography, spider silk physics, captivating, friendly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2296,
        "title": "Gyalmo, the Queen of the Mountains",
        "intent": "Gyalmo Queen of Mountains snow leopard Panthera uncia Himalayas daylight",
        "brief": (
            'Book cover design titled "Gyalmo, the Queen of the Mountains". '
            'The title "Gyalmo, the Queen of the Mountains" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SNOW LEOPARD HIMALAYAN WILDLIFE STYLE: A breathtaking high-altitude Himalayan mountain peak in crisp morning sunshine. '
            'Perched regally on a craggy granite precipice is a magnificent wild snow leopard (Panthera uncia), '
            'its thick smoky-grey coat adorned with dark rosette patterns, long bushy tail wrapped around its paws for warmth, and pale green eyes looking across snow-dusted valleys under a bright azure sky. '
            'Palette: snow leopard fur smoky cream and dark charcoal, mountain cliffs granite grey and snow white, and high altitude sky brilliant cyan. '
            'Apex predator conservation, mountain ecology, feline adaptations, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2297,
        "title": "We brought the river home",
        "intent": "We brought river home watershed revival freshwater stream restoration",
        "brief": (
            'Book cover design titled "We brought the river home". '
            'The title "We brought the river home" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WATERSHED RESTORATION DAYLIGHT STYLE: A sun-soaked, joyful river valley restoration in full summer daylight. '
            'A sparkling, winding freshwater river with clear bubbling riffles flowing through a revitalized community park, '
            'lined with native willow trees, flowering water mint, smooth stepping stones, and schools of small native fish swimming in the sun-dappled shallows. '
            'Palette: river water sparkling aquamarine and white foam, riverside banks lush meadow green, stepping stones warm grey, and sky clear sunny blue. '
            'Community ecology, watershed stewardship, freshwater conservation, uplifting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2315,
        "title": "Lost in the Internet",
        "intent": "Lost Internet digital networks fiber optics cyber world data highway",
        "brief": (
            'Book cover design titled "Lost in the Internet". '
            'The title "Lost in the Internet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DIGITAL NETWORK CYBER HIGHWAY STYLE: A vibrant, colorful visualization of global internet infrastructure and data routing. '
            'Luminous glowing fiber-optic cable ribbons pulsing with colorful data packets, intersecting at intricate holographic server nodes, '
            'wi-fi radio signal ripples, and interactive web architecture maps against a stylized digital cyberspace horizon. '
            'Palette: glowing fiber optics neon cyan and electric violet, data packets radiant amber, and network grid deep cobalt blue. '
            'Internet technology, digital literacy, network architecture, information science, energetic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2319,
        "title": "The Great Forest Race",
        "intent": "Great Forest Race woodland animal athletics squirrel hare tortoise meadow",
        "brief": (
            'Book cover design titled "The Great Forest Race". '
            'The title "The Great Forest Race" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WOODLAND ATHLETICS FAIRYTALE DAYLIGHT STYLE: A cheerful, sunlit woodland racetrack winding through a magical forest in broad daylight. '
            'A start/finish banner woven from vines and colorful forest flowers hanging across a smooth forest path, with a spunky red squirrel, '
            'a swift brown hare, a hedgehog with a leaf on its quills, and a determined little tortoise lined up enthusiastically at the starting line. '
            'Sunlight filtering through leaves casting festive golden patterns. '
            'Palette: woodland grass fresh emerald, forest animals warm russet and cream, flower banner vibrant red and gold, and morning sunlight cheerful yellow. '
            'Animal storytelling, sportsmanship, friendship, energetic, delightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2322,
        "title": "An Exciting Trip to Space",
        "intent": "Exciting Trip Space rocket launch spacecraft astronauts orbit Earth solar",
        "brief": (
            'Book cover design titled "An Exciting Trip to Space". '
            'The title "An Exciting Trip to Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPACE EXPLORATION ADVENTURE STYLE: A thrilling view of a sleek, modern commercial spacecraft ascending gracefully into the upper stratosphere. '
            'The blue atmospheric curvature of planet Earth below showing coastlines and swirling white weather patterns, transitioning into the star-studded blackness of space, '
            'with the spacecraft\'s solar panels deploying toward the bright rising Sun. '
            'Palette: spacecraft sleek white and solar gold, Earth oceans brilliant azure and turquoise, clouds pure white, and space deep navy with distant stars. '
            'Space tourism, rocket science, aerospace engineering, exciting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2325,
        "title": "DISCOVERING GRAVITY",
        "intent": "DISCOVERING GRAVITY Isaac Newton apple falling orbital mechanics physics",
        "brief": (
            'Book cover design titled "DISCOVERING GRAVITY". '
            'The title "DISCOVERING GRAVITY" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PHYSICS AND GRAVITATIONAL MECHANICS DAYLIGHT STYLE: A bright, sunlit English orchard setting on a glorious afternoon. '
            'In the foreground, a ripe, perfect red apple falling from a gnarled oak-apple branch, surrounded by clean, glowing educational gravitational vector arrows '
            'demonstrating acceleration and downward force (9.8 m/sÂ²). The vector lines elegantly curve upward into the sky, connecting seamlessly to the orbital trajectory of the Moon around Earth. '
            'Open parchment notebook on grass with geometrical physics diagrams. '
            'Palette: falling apple bright ruby red, orchard leaves rich green, gravitational vectors radiant cyan, and sunny sky blue. '
            'Classical physics, Newton\'s laws of gravitation, scientific discovery, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2327,
        "title": "Adventure on a Hot Air Balloon",
        "intent": "Adventure Hot Air Balloon flight thermal buoyancy landscape aerostat",
        "brief": (
            'Book cover design titled "Adventure on a Hot Air Balloon". '
            'The title "Adventure on a Hot Air Balloon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSTAT THERMAL FLIGHT DAYLIGHT STYLE: A breathtaking aerial vista from a vibrant, multi-colored hot air balloon in morning sunlight. '
            'The balloon envelope displays bold rainbow-striped geometric patterns, with a roaring propane burner flame warming the air inside. '
            'Looking out from the sturdy woven wicker basket over sweeping emerald valleys, winding rivers, and quaint patchwork farm fields far below under a clear sunny sky. '
            'Palette: balloon envelope vibrant rainbow spectrum, wicker basket warm honey, landscape emerald and golden patchwork, and morning sky azure. '
            'Aviation physics, thermal buoyancy, atmospheric flight, uplifting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2328,
        "title": "Creepy Cave Crawlers",
        "intent": "Creepy Cave Crawlers biospeleology troglobites cave cricket blind salamander",
        "brief": (
            'Book cover design titled "Creepy Cave Crawlers". '
            'The title "Creepy Cave Crawlers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOSPELEOLOGY CAVE BIOLOGY STYLE: A fascinating subterranean limestone cavern illuminated by explorer headlamp beams. '
            'On wet, glistening stalagmites and mineral calcite draperies, specialized troglobitic cave creatures thrive: '
            'a translucent white cave salamander (olm), a long-legged cave cricket with delicate sensory antennae, and blind cave fish swimming in a crystal-clear subterranean pool. '
            'Palette: limestone rock warm ochre and slate grey, cave creatures pearlescent translucent white, and headlamp beams radiant warm gold. '
            'Cave adaptations, subterranean ecology, evolutionary biology, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2330,
        "title": "Shasta Dam",
        "intent": "Shasta Dam civil engineering hydroelectric power spillway reservoir",
        "brief": (
            'Book cover design titled "Shasta Dam". '
            'The title "Shasta Dam" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CIVIL ENGINEERING HYDROPOWER DAYLIGHT STYLE: A sun-drenched, monumental panoramic view of Shasta Dam in northern California on a bright clear day. '
            'The colossal curved concrete gravity dam wall holding back the vast deep blue Shasta Lake reservoir, with water roaring through massive spillways '
            'generating clean hydroelectric power, backed by snow-capped Mount Shasta towering majestically in the distance under a sunny sky. '
            'Palette: concrete dam clean pale grey, reservoir water deep sapphire blue, surrounding pine forests evergreen, and sky brilliant azure. '
            'Civil engineering, hydroelectricity, water infrastructure, monumental and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2331,
        "title": "Swimming Up a Fish Ladder",
        "intent": "Swimming Up Fish Ladder salmon migration fishway civil ecology",
        "brief": (
            'Book cover design titled "Swimming Up a Fish Ladder". '
            'The title "Swimming Up a Fish Ladder" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FISHWAY ECOLOGICAL ENGINEERING DAYLIGHT STYLE: A sunlit, tiered concrete fish ladder alongside a river dam in broad daylight. '
            'Vibrant wild salmon with glistening silver-pink scales leaping powerfully against cascading foamy water steps, '
            'migrating upstream to their native spawning grounds, demonstrating how wildlife passages integrate with human infrastructure. '
            'Palette: rushing water foamy white and crystalline turquoise, salmon scales silver and ruby-rose, and dam concrete cool grey. '
            'Ecological engineering, wildlife migration, river conservation, fish biology, triumphant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2333,
        "title": "The Ever-Changing Sky",
        "intent": "Ever Changing Sky atmospheric cloud types cirrus cumulus cumulonimbus weather",
        "brief": (
            'Book cover design titled "The Ever-Changing Sky". '
            'The title "The Ever-Changing Sky" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ATMOSPHERIC METEOROLOGY DAYLIGHT CLOUDS STYLE: A stunning vertical cloud atlas panorama spanning from ground to upper atmosphere. '
            'At the base, green rolling hills with fair-weather puffy white cumulus clouds; rising into mid-level altocumulus ripples, '
            'and soaring into high-altitude wispy ice-crystal cirrus clouds catching radiant golden sunlight, alongside a towering anvil-topped cumulonimbus with distant rainbow. '
            'Palette: sky atmospheric gradient deep cerulean to pale cyan, clouds pure brilliant white with golden-tinted sunlit edges, and meadow green. '
            'Cloud classification, atmospheric science, weather observation, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2335,
        "title": "Bot Man",
        "intent": "Bot Man robotics humanoid robot artificial intelligence engineering",
        "brief": (
            'Book cover design titled "Bot Man". '
            'The title "Bot Man" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ROBOTICS AND MECHATRONICS LAB DAYLIGHT STYLE: A bright, sunlit advanced robotics engineering laboratory in daytime. '
            'In the center, a state-of-the-art robotic humanoid mechanical arm and torso assembly made of matte white composite armor and lightweight titanium joints, '
            'delicately holding a miniature potted green sprout with precision touch-sensor fingers, surrounded by circuit blueprints, soldering stations, and robotic micro-controllers. '
            'Palette: robot chassis pearl white and metallic silver, sensor lights gentle cyan, desk natural birch, and sunlight clear white. '
            'Robotics engineering, mechatronics, sensor feedback, artificial intelligence, forward-looking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the mechanical robot arm/torso). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2336,
        "title": "Coastal Drilling in Sunny California",
        "intent": "Coastal Drilling Sunny California offshore platform energy marine geology",
        "brief": (
            'Book cover design titled "Coastal Drilling in Sunny California". '
            'The title "Coastal Drilling in Sunny California" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OFFSHORE ENERGY INFRASTRUCTURE DAYLIGHT STYLE: A sun-drenched coastal California seascape on a bright sunny morning. '
            'In the distance off the Pacific coast, an offshore oil drilling platform stands tall above rolling blue ocean swells, '
            'with clean educational cross-section diagrams showing subsea geological strata, drilling drillstrings, and environmental marine monitoring buoys. '
            'Pelicans flying overhead under sunny skies. '
            'Palette: Pacific ocean deep royal blue, platform steel slate grey and yellow safety accents, coastal cliffs warm terracotta, and sunny sky blue. '
            'Petroleum geology, energy infrastructure, offshore engineering, coastal science, balanced and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2337,
        "title": "Experimenting with Magnets",
        "intent": "Experimenting with Magnets neodymium magnetic field iron filings poles",
        "brief": (
            'Book cover design titled "Experimenting with Magnets". '
            'The title "Experimenting with Magnets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNETIC PHYSICS LAB DAYLIGHT STYLE: A sunlit classroom physics workbench in full daylight. '
            'A classic red-and-blue horseshoe magnet with silver poles and a pair of shiny neodymium bar magnets resting on white paper, '
            'with fine iron filings aligning into stunning, elegant dipole magnetic field arches and flux loops between the North and South poles, '
            'along with a brass pocket compass needle pointing true North. '
            'Palette: horseshoe magnet bold crimson red and cobalt blue, iron filing lines crisp black, and lab table clean white with golden sunlight. '
            'Electromagnetism, magnetic field theory, physics experimentation, hands-on and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2338,
        "title": "Fishy Forests: How Mangrove Trees Support a Rich Ecosystem",
        "intent": "Fishy Forests Mangrove trees stilt roots nursery marine ecosystem",
        "brief": (
            'Book cover design titled "Fishy Forests: How Mangrove Trees Support a Rich Ecosystem". '
            'The title "Fishy Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MANGROVE COASTAL WETLAND DAYLIGHT STYLE: A split over-and-underwater composition of a sun-soaked tropical mangrove swamp in crystal-clear water. '
            'Above water, dense glossy green mangrove leaves and stilt prop roots arching into the tide; below water, the intricate submerged root maze '
            'serves as a nursery teeming with juvenile reef fish, juvenile barracudas, and baby rays swimming safely among sea sponges under sunny skies. '
            'Palette: water crystal aquamarine, mangrove roots rich bark brown, foliage vibrant emerald, and tropical fish bright yellow and orange. '
            'Mangrove ecology, marine nursery, coastal biodiversity, carbon sequestration, vibrant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2339,
        "title": "Ghost Fishing: A Scary Prospect for Marine Life",
        "intent": "Ghost Fishing derelict gear ocean cleanup marine conservation nets",
        "brief": (
            'Book cover design titled "Ghost Fishing: A Scary Prospect for Marine Life". '
            'The title "Ghost Fishing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEAN CLEANUP CONSERVATION DAYLIGHT STYLE: A sunlit underwater scene in the open ocean with shafts of morning light. '
            'A specialized modern autonomous ocean cleanup vessel on the surface using underwater robotic robotic arms with grappling claws '
            'to safely recover an abandoned derelict nylon ghost fishing net from a coral reef, liberating trapped sea life and restoring the seabed under sunny skies. '
            'Palette: ocean water deep azure, ghost net nylon teal-grey, cleanup robotic gear high-visibility yellow and silver, and sunlight golden. '
            'Ocean stewardship, marine pollution cleanup, derelict gear retrieval, hopeful, proactive and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2340,
        "title": "High and Dry",
        "intent": "High and Dry drought climate hydrology cracked soil riverbed water cycle",
        "brief": (
            'Book cover design titled "High and Dry". '
            'The title "High and Dry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HYDROLOGICAL ADAPTATION DAYLIGHT STYLE: A sun-drenched landscape demonstrating drought and moisture resilience in nature. '
            'A parched dry riverbed with geometric cracked mud tiles, where resilient desert flora (succulents, deep-rooted mesquite, and desert broom) '
            'thrive with specialized water-storing root networks shown in clean educational cutaway, under a bright sunlit blue sky with gathering rain clouds. '
            'Palette: parched earth warm clay ochre, resilient succulents jade green, and sky deep blue with distant silver clouds. '
            'Hydrology, drought adaptation, climate science, resilience in nature, thoughtful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2341,
        "title": "Monarch Butterflies on the Move",
        "intent": "Monarch Butterflies on Move migration oyamel fir forest overwintering",
        "brief": (
            'Book cover design titled "Monarch Butterflies on the Move". '
            'The title "Monarch Butterflies on the Move" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MONARCH MIGRATION SANCTUARY DAYLIGHT STYLE: A breathtaking sunny mountain forest in MichoacÃ¡n, Mexico in morning sunshine. '
            'Millions of migrating Monarch butterflies (Danaus plexippus) clustering densely on the mossy trunks and branches of towering Oyamel fir trees, '
            'with clouds of brilliant orange-and-black winged butterflies taking flight into the sunlit sky like golden confetti drifting through morning sunbeams. '
            'Palette: butterfly wings fiery orange and jet black, oyamel fir needles deep forest green, and sunlight radiant warm gold. '
            'Insect migration, monarch sanctuary, ecological wonders, magnificent, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2342,
        "title": "Play Time",
        "intent": "Play Time animal play behavior young animals toys meadow daylight",
        "brief": (
            'Book cover design titled "Play Time". '
            'The title "Play Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANIMAL PLAY AND DEVELOPMENT DAYLIGHT STYLE: A sunlit, vibrant green meadow on a bright spring morning. '
            'Young wild animals engaged in natural play behaviors that build survival skills: a fluffy fox kit playfully pouncing on a fluttering yellow butterfly, '
            'and two bear cubs wrestling gently in the soft clover grass, under sunny skies. '
            'Palette: meadow grass fresh emerald green, fox fur bright russet, wildflowers sunny yellow, and morning sky pale blue. '
            'Animal behavioral development, play in nature, juvenile learning, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2345,
        "title": "Sea Water",
        "intent": "Sea Water ocean chemistry salinity sodium chloride marine science",
        "brief": (
            'Book cover design titled "Sea Water". '
            'The title "Sea Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEAN CHEMISTRY AND SALINITY STYLE: A bright, sunlit marine chemistry laboratory overlooking a tropical ocean bay. '
            'On a clean white workbench, an optical refractometer measuring seawater salinity, clear glass beakers with evaporated sea salt crystals, '
            'hydrometer testing water density, and a clear molecular model of water and sodium chloride ions dissolving, with the sparkling turquoise sea visible outside. '
            'Palette: sea water crystal turquoise, salt crystals pure white, refractometer brass and black, and lab daylight bright white. '
            'Chemical oceanography, seawater salinity, marine science, water properties, crisp and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2347,
        "title": "The Mighty Semiconductor and the Rise of Silicon Valley",
        "intent": "Semiconductor Silicon Valley silicon wafer microchip transistors cleanroom",
        "brief": (
            'Book cover design titled "The Mighty Semiconductor and the Rise of Silicon Valley". '
            'The title "The Mighty Semiconductor" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEMICONDUCTOR SILICON WAFER CLEANROOM STYLE: A high-tech, sunlit semiconductor fabrication facility in daytime. '
            'In the center foreground, a polished 300mm crystalline silicon wafer gleaming with iridescent rainbow diffraction patterns across thousands of microchip dies, '
            'beside an integrated circuit package with microscopic gold bonding wires and microscopic nanometer transistor diagrams under bright cleanroom lighting. '
            'Palette: silicon wafer iridescent rainbow and mirror silver, silicon chip dark charcoal with gold bonding wire accents, and cleanroom crisp white. '
            'Semiconductor physics, microchip manufacturing, Silicon Valley history, computer hardware, cutting-edge and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2349,
        "title": "Waves are Everywhere!",
        "intent": "Waves Everywhere wave physics electromagnetic sound water seismic light",
        "brief": (
            'Book cover design titled "Waves are Everywhere!". '
            'The title "Waves are Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WAVE PHYSICS SPECTACULAR DAYLIGHT STYLE: A dynamic, sun-soaked composition showing all forms of waves in nature. '
            'In the center, a rolling turquoise ocean wave breaking cleanly, seamlessly integrating with glowing sinusoidal wave graphs displaying wavelength, frequency, and amplitude, '
            'radiant rainbow electromagnetic spectrum waves, vibrating acoustic sound guitar strings, and seismic ripples traveling through earth. '
            'Palette: ocean wave aquamarine and white foam, wave curves radiant neon cyan and golden yellow, and sky bright azure. '
            'Wave mechanics, physics of sound and light, electromagnetic radiation, dynamic and educational. '
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

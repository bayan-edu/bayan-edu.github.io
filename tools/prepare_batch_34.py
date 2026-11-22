import os

books = [
    {
        "id": 2533,
        "title": "Making Friends with Snakes (But from a Distance)",
        "intent": "Making Friends with Snakes herpetology nonvenomous garter snake safety",
        "brief": (
            'Book cover design titled "Making Friends with Snakes". '
            'The title "Making Friends with Snakes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HERPETOLOGY OBSERVATION DAYLIGHT STYLE: A sun-drenched meadow garden on a bright summer morning. '
            'In the center foreground, a beautiful, non-venomous eastern garter snake (Thamnophis sirtalis) with vibrant yellow and turquoise stripes '
            'basking peacefully on a smooth, warm river garden boulder among wild ferns and clover, with binoculars and a nature field guide resting safely several paces away on the grass. '
            'Palette: snake scales emerald green and golden yellow, garden boulder warm sunlit grey, and meadow grass lush green. '
            'Herpetology, snake safety, wildlife observation, respect for reptiles, friendly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2535,
        "title": "Our Encounter with a Snow Leopard",
        "intent": "Encounter Snow Leopard Panthera uncia Himalayan peaks alpine wildlife",
        "brief": (
            'Book cover design titled "Our Encounter with a Snow Leopard". '
            'The title "Our Encounter with a Snow Leopard" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIMALAYAN ALPINE WILDLIFE DAYLIGHT STYLE: A sunlit, breathtaking high-altitude Himalayan mountain ridge in morning light. '
            'A wild snow leopard (Panthera uncia) with dense smoky-grey fur and charcoal rosettes resting camouflage-perfect on a snow-dusted rocky precipice, '
            'its long bushy tail curled beside its paws, with dramatic snow-capped peaks and prayer flags fluttering on a distant pass under an azure sky. '
            'Palette: snow leopard fur soft smoky grey and cream, mountain cliffs granite and pure snow white, and sky high-altitude azure. '
            'Alpine ecology, snow leopard tracking, wildlife expedition, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2536,
        "title": "The Maldhok in the Desert",
        "intent": "Maldhok Great Indian Bustard Thar desert grassland conservation",
        "brief": (
            'Book cover design titled "The Maldhok in the Desert". '
            'The title "The Maldhok in the Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'THAR DESERT BUSTARD CONSERVATION DAYLIGHT STYLE: A sun-soaked Thar desert landscape in Rajasthan in early morning golden light. '
            'A majestic Great Indian Bustard (locally known as Maldhok) striding proudly among desert grasses and khejri trees, '
            'displaying its tall upright stature, deep black crown, and patterned brown wings, with golden sand dunes stretching toward a clear sunny horizon. '
            'Palette: sand dunes warm golden ochre, bustard plumage earthy brown and white, and morning desert sky pale cyan. '
            'Desert ecology, critically endangered wildlife, bustard sanctuary, regal and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2548,
        "title": "Telephones - Bell to Cell",
        "intent": "Telephones Bell to Cell telecommunications antique candlestick smartphone",
        "brief": (
            'Book cover design titled "Telephones - Bell to Cell". '
            'The title "Telephones - Bell to Cell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORY OF TELECOMMUNICATIONS STYLE: A bright, sunlit historical evolution timeline across a polished oak table. '
            'An authentic 1890s brass-and-wood candlestick telephone with earpiece, transitioning through a 1950s classic black rotary dial phone, '
            'an early 1980s cellular brick phone with antenna, and a sleek modern smartphone with glowing holographic communication signal waves. '
            'Palette: candlestick brass gold, rotary phone classic black, smartphone reflective glass, and oak table warm amber. '
            'Telecommunications history, acoustic innovation, radio cellular technology, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2549,
        "title": "Accidental Butterfly",
        "intent": "Accidental Butterfly botanical garden emerging butterfly chrysalis wings",
        "brief": (
            'Book cover design titled "Accidental Butterfly". '
            'The title "Accidental Butterfly" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BOTANICAL BUTTERFLY EMERGENCE DAYLIGHT STYLE: A sun-drenched botanical greenhouse garden in full daylight. '
            'A newly emerged, vibrant butterfly with freshly expanded wings of radiant turquoise, violet, and gold resting gently on a split ripe tropical fruit, '
            'beside the empty translucent chrysalis shell, with warm sunbeams illuminating dew drops on lush green foliage. '
            'Palette: butterfly wings radiant turquoise and amethyst, tropical fruit warm coral, foliage rich emerald, and sunlight golden. '
            'Metamorphosis biology, accidental discoveries, butterfly life cycle, enchanting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2550,
        "title": "Environmental Justice",
        "intent": "Environmental Justice urban greening clean air solar trees community park",
        "brief": (
            'Book cover design titled "Environmental Justice". '
            'The title "Environmental Justice" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'URBAN EQUITABLE SUSTAINABILITY DAYLIGHT STYLE: A vibrant, sun-soaked urban transformation scene in full daylight. '
            'A revitalized city neighborhood featuring a thriving community rooftop vegetable garden, clean solar panel canopies, '
            'freshly planted native shade trees, and a clear bubbling urban stream restored from concrete culverts, under clear blue skies with zero smog. '
            'Palette: urban park lush emerald green, solar panels cobalt blue, community gardens warm terracotta, and sky clear sunny azure. '
            'Environmental justice, urban greening, clean air equity, community sustainability, uplifting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2551,
        "title": "Excerpts from \"Meet the Ologist-Melanie Stiassny\"",
        "intent": "Ichthyology fish biodiversity freshwater specimens microscope Congo river",
        "brief": (
            'Book cover design titled "Meet the Ichthyologist". '
            'The title "Meet the Ichthyologist" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ICHTHYOLOGY RESEARCH LABORATORY STYLE: A bright, sunlit natural history museum ichthyology research desk in daytime. '
            'Jars of preserved freshwater fish specimens from the Congo River, detailed anatomical sketches of specialized fish jaws and fin rays, '
            'a brass dissecting microscope, calipers, and taxonomic identification charts under bright study lamps. '
            'Palette: specimen jars amber glass and clear fluid, anatomical sketches sepia, desk warm mahogany, and daylight bright white. '
            'Ichthyology, fish evolution, freshwater biodiversity, museum science, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2552,
        "title": "Field Trip",
        "intent": "Field Trip nature discovery backpack magnifying glass compass field guide",
        "brief": (
            'Book cover design titled "Field Trip". '
            'The title "Field Trip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NATURE DISCOVERY EXPEDITION DAYLIGHT STYLE: A sun-drenched outdoor nature study scene at the edge of a woodland stream in morning sunlight. '
            'Resting on a rustic wooden picnic table are an explorer\'s canvas field backpack, a brass pocket compass, a high-power magnifying glass, '
            'an open nature field guide with wildflower illustrations, a jar for pond-water observation with tadpoles, and a collecting net. '
            'Palette: canvas backpack warm khaki, brass compass gold, nature guide ivory and green, and woodland scenery sunlit emerald. '
            'Experiential learning, outdoor science, field trip exploration, hands-on, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2553,
        "title": "Pythons Invade the Florida Everglades",
        "intent": "Burmese Python Everglades invasive species wetland cypress swamp sawgrass",
        "brief": (
            'Book cover design titled "Pythons Invade the Florida Everglades". '
            'The title "Pythons Invade the Everglades" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EVERGLADES INVASIVE SPECIES ECOLOGY DAYLIGHT STYLE: A sunlit Florida Everglades cypress swamp and sawgrass marsh in midday light. '
            'In the center foreground, a massive Burmese python (Python bivittatus) with intricate dark brown blotched camouflage scales '
            'coiled silently around a submerged bald cypress root knee, while an American alligator rests on a distant mudbank, illustrating the ecological competition. '
            'Palette: python scales olive, tan and dark brown, swamp water tea-brown with sun reflections, sawgrass golden-green, and sunny sky blue. '
            'Invasive species ecology, Everglades conservation, reptile biology, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2554,
        "title": "The Club of the Century",
        "intent": "Club of the Century cricket bat leather ball wicket pitch grass daylight",
        "brief": (
            'Book cover design titled "The Club of the Century". '
            'The title "The Club of the Century" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CRICKET TRADITION AND SPORTS HERITAGE DAYLIGHT STYLE: A sun-soaked, pristine cricket oval on a glorious summer afternoon. '
            'In the foreground, an authentic handcrafted English willow cricket bat, a polished red leather cricket ball with white seam, '
            'and polished wooden wickets with bails standing firmly in the turf pitch, with clean parabolic trajectory lines showing spin bowling aerodynamics. '
            'Palette: cricket bat English willow honey blonde, ball glossy cherry red, pitch grass emerald green, and sunny sky azure. '
            'Cricket history, sportsmanship, ball physics, traditional sports culture, elegant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2555,
        "title": "The White Desert",
        "intent": "The White Desert Rann of Kutch salt marsh geological landscape sunset daylight",
        "brief": (
            'Book cover design titled "The White Desert". '
            'The title "The White Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RANN OF KUTCH SALT DESERT DAYLIGHT STYLE: A vast, breathtaking panoramic expanse of the Great Rann of Kutch in brilliant daylight. '
            'Endless glistening white salt crust flatlands stretching to the horizon, reflecting the azure sky and drifting clouds like a colossal mirror, '
            'with geometric cracked polygon salt tiles in the foreground and a solitary traditional camel saddle resting on a carved wooden stand. '
            'Palette: salt flats pure brilliant white, sky azure blue, camel saddle colorful Gujarati embroidered textiles (crimson, saffron, mirrorwork). '
            'Geological salt flats, unique desert ecosystems, cultural geography, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2557,
        "title": "An Unexpected Connection [Hacked!, #4]",
        "intent": "Unexpected Connection cybersecurity encrypted networks router lock circuits",
        "brief": (
            'Book cover design titled "An Unexpected Connection". '
            'The title "An Unexpected Connection" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CYBERSECURITY AND ENCRYPTED NETWORKS STYLE: A high-tech digital workspace in daylight. '
            'A glowing motherboard circuit with copper traces converging into a luminous cryptographic padlock, with clean holographic fiber-optic streams '
            'linking servers, routers, and satellite uplink dishes, illustrating network authentication and safe internet connections. '
            'Palette: circuit traces electric cyan and gold, padlock glowing sapphire, background deep slate navy, and daylight sunbeams. '
            'Cybersecurity, cryptography, data privacy, internet safety, cutting-edge and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2558,
        "title": "A Day in the Life of a Veterinary Technician",
        "intent": "Veterinary Technician animal clinic stethoscope microscope puppy care",
        "brief": (
            'Book cover design titled "A Day in the Life of a Veterinary Technician". '
            'The title "A Day in the Life of a Veterinary Technician" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VETERINARY CLINIC HEALTHCARE DAYLIGHT STYLE: A bright, sunlit modern veterinary examination room in daytime. '
            'On a clean stainless steel exam table, a colorful pediatric stethoscope, digital thermometer, otoscope, animal vitamins, '
            'and an adorable healthy golden retriever puppy sitting curiously looking at a small squeaky toy beside an x-ray light box showing animal bone health. '
            'Palette: exam room clinical white and sky blue, puppy golden honey, medical tools chrome, and daylight bright. '
            'Veterinary medicine, animal healthcare, pet wellness, compassionate and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2559,
        "title": "Broken Hearts",
        "intent": "Broken Hearts cardiology heart anatomy repair stent bypass catheter",
        "brief": (
            'Book cover design titled "Broken Hearts". '
            'The title "Broken Hearts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CARDIOVASCULAR MEDICINE INNOVATION STYLE: A luminous, high-precision medical technology illustration of heart healing. '
            'A 3D anatomical model of the human heart showing coronary arteries, with a tiny, gleaming nitinol cardiac stent expanding to restore blood flow, '
            'beside a digital pulse wave rhythm monitor showing a healthy steady rhythm, and an ECG readout on medical graph paper. '
            'Palette: heart muscle healthy coral-red and crimson, stent polished silver, ECG waveform radiant neon green, and background medical white. '
            'Cardiovascular science, medical devices, cardiac surgery, health education, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2560,
        "title": "Down to the River [The Riverkeepers, #5]",
        "intent": "Down to the River riparian riverbank water sampling turbidity disc ecology",
        "brief": (
            'Book cover design titled "Down to the River". '
            'The title "Down to the River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVER STEWARDSHIP ECOLOGY DAYLIGHT STYLE: A sun-drenched freshwater riverbank on a gorgeous summer morning. '
            'On a wooden dock, a water quality monitoring kit: a black-and-white Secchi disc for measuring water clarity, clean sampling vials with river water, '
            'a digital pH meter, and a notebook recording dissolved oxygen, with dragonflies skimming over clean flowing water and green weeping willows. '
            'Palette: river water sparkling aquamarine, riverbank foliage vibrant emerald, Secchi disc black and white, and sunny sky blue. '
            'Freshwater ecology, citizen science, river monitoring, environmental protection, refreshing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2561,
        "title": "Dynamics of Flight",
        "intent": "Dynamics of Flight aerodynamics lift drag thrust gravity four forces",
        "brief": (
            'Book cover design titled "Dynamics of Flight". '
            'The title "Dynamics of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FOUR FORCES OF FLIGHT AERODYNAMICS STYLE: A bright, sunlit aeronautical engineering visualization in daytime. '
            'A sleek modern jet aircraft soaring through sunlit sky, with clean, glowing educational vector arrows showing the four fundamental forces of flight: '
            'Lift upward, Weight downward, Thrust forward, and Drag rearward, with streamlines illustrating smooth airflow over the wings. '
            'Palette: jet fuselage pearl white, force vector arrows glowing gold, red, cyan and purple, and sky sunny cerulean. '
            'Aviation physics, flight dynamics, aerodynamics, engineering principles, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2562,
        "title": "History of Flight",
        "intent": "History of Flight Wright Flyer monoplane jet supersonic aviation timeline",
        "brief": (
            'Book cover design titled "History of Flight". '
            'The title "History of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AVIATION HISTORY TIMELINE DAYLIGHT STYLE: A sunlit sky composition charting the milestones of human aviation in bright daylight. '
            'From the historic 1903 wooden-and-canvas Wright Flyer biplane in the foreground, soaring forward into a 1930s polished aluminum propeller airliner, '
            'and culminating in a sleek modern supersonic jet cruising through upper atmospheric cirrus clouds under sunny skies. '
            'Palette: Wright Flyer wood and muslin ivory, vintage airliner polished silver, modern jet aerodynamic white, and sky bright blue. '
            'History of aviation, aerospace engineering, technological progress, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2563,
        "title": "How to View a Solar Eclipse",
        "intent": "How to View Solar Eclipse certified glasses pinhole camera sun safety",
        "brief": (
            'Book cover design titled "How to View a Solar Eclipse". '
            'The title "How to View a Solar Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SAFE ECLIPSE VIEWING ASTRONOMY DAYLIGHT STYLE: A bright, sunlit outdoor observation setup in full daylight. '
            'Certified ISO solar eclipse viewing glasses with dark silvery filters resting on a star chart, beside a homemade pinhole projector box '
            'casting a sharp crescent-sun projection onto clean white cardstock, with a solar telescope filter and the partially eclipsed Sun in a clear blue sky. '
            'Palette: eclipse glasses black and silver, crescent projection golden, star chart navy and white, and sky clear sunny blue. '
            'Solar safety, eclipse viewing, optical projection, astronomy education, practical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2564,
        "title": "Practice Makes Perfect",
        "intent": "Practice Makes Perfect musical violin piano practice sheet music metronome",
        "brief": (
            'Book cover design titled "Practice Makes Perfect". '
            'The title "Practice Makes Perfect" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MUSICAL MASTERY AND PRACTICE DAYLIGHT STYLE: A sunlit music conservatory practice room in morning sunshine. '
            'An exquisite polished wooden violin and horsehair bow resting on a vintage grand piano, beside an open music stand with classical sheet music, '
            'an antique wooden metronome ticking rhythmically, and warm sunbeams illuminating golden dust motes in the air. '
            'Palette: violin wood warm amber, piano glossy ebony, sheet music ivory, and sunlight radiant gold. '
            'Deliberate practice, musical discipline, cognitive skill development, dedication, warm and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2565,
        "title": "Something Special by the River [The Riverkeepers, #4]",
        "intent": "Riverkeepers river otter beaver dam clean freshwater ecology wetlands",
        "brief": (
            'Book cover design titled "Something Special by the River". '
            'The title "Something Special by the River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVERBANK WILDLIFE HAVEN DAYLIGHT STYLE: A sunlit, peaceful river wetland in early morning sunshine. '
            'A freshly engineered beaver lodge of interwoven birch branches and river mud, where a playful river otter peeks happily from behind a mossy log, '
            'beside blooming blue irises, cattails, and clean freshwater rippling over smooth river stones. '
            'Palette: wetland plants lush emerald and turquoise, beaver wood warm chestnut, river stones grey, and morning sunlight golden amber. '
            'Riparian biodiversity, wetland engineering, river wildlife, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2566,
        "title": "The American Chestnut",
        "intent": "American Chestnut Castanea dentata blight restoration burrs leaves",
        "brief": (
            'Book cover design titled "The American Chestnut". '
            'The title "The American Chestnut" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FORESTRY RESTORATION DAYLIGHT STYLE: A sun-drenched Appalachian mountain forest in autumn daylight. '
            'A towering, healthy restored American Chestnut tree (Castanea dentata) displaying toothed green leaves and spiky green chestnut burrs '
            'cracking open to reveal glossy, rich mahogany-brown chestnuts, with scientific blight-resistant seedling tubes in the foreground under sunny skies. '
            'Palette: chestnuts glossy mahogany brown, spiky burrs chartreuse green, forest leaves autumn gold and orange, and sky crisp blue. '
            'Forestry conservation, species restoration, tree biology, historical botany, triumphant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2567,
        "title": "The Great Barrier Reef",
        "intent": "Great Barrier Reef coral bleaching marine sanctuary clownfish sea turtle",
        "brief": (
            'Book cover design titled "The Great Barrier Reef". '
            'The title "The Great Barrier Reef" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AUSTRALIAN CORAL REEF DAYLIGHT STYLE: A breathtaking split-level underwater view of the Great Barrier Reef in brilliant midday sunshine. '
            'A thriving coral garden with purple staghorn corals, brain corals, and sea fans, where a green sea turtle glides gracefully through crystal-clear turquoise water '
            'accompanied by schools of blue damselfish, under a bright blue sky with a distant sunlit coral cay island. '
            'Palette: reef water crystalline turquoise, corals vivid violet, rose and gold, sea turtle olive shell, and sky azure. '
            'Marine protected areas, coral biology, reef biodiversity, world heritage conservation, dazzling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2568,
        "title": "The Wonders of Flight",
        "intent": "Wonders of Flight bird wing hummingbird dragonflies aerodynamic biomimicry",
        "brief": (
            'Book cover design titled "The Wonders of Flight". '
            'The title "The Wonders of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOLOGICAL FLIGHT BIOMIMICRY STYLE: A sun-drenched tribute to flight in nature in full daylight. '
            'A ruby-throated hummingbird hovering with blurred figure-eight wingbeats beside a red hibiscus flower, '
            'alongside a glittering four-winged dragonfly and a soaring peregrine falcon, showing the marvels of natural aerodynamics and wing structure under sunny skies. '
            'Palette: hummingbird iridescent emerald and ruby, hibiscus vivid scarlet, dragonfly shimmering sapphire, and sky bright blue. '
            'Bio-aerodynamics, wing evolution, animal flight adaptations, miraculous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2569,
        "title": "Water: A Give and Take",
        "intent": "Water Give and Take hydrological cycle evaporation precipitation transpiration",
        "brief": (
            'Book cover design titled "Water: A Give and Take". '
            'The title "Water: A Give and Take" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL WATER CYCLE DAYLIGHT STYLE: An educational landscape showing the closed loop of the water cycle in clear daylight. '
            'Sunlight warming the ocean causing invisible evaporation rising into cumulus clouds, condensation forming rain over mountain forests, '
            'snowmelt feeding crystal mountain streams that flow through wetlands back to the sea, with clean cycle arrows connecting each stage. '
            'Palette: ocean and river water turquoise, rain clouds silver-white, mountain forests emerald green, and sunbeams radiant gold. '
            'Hydrology, water cycle, planetary systems, resource stewardship, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2570,
        "title": "Water Is Everything!",
        "intent": "Water Is Everything molecular structure H2O universal solvent life",
        "brief": (
            'Book cover design titled "Water Is Everything!". '
            'The title "Water Is Everything!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WATER MOLECULE AND LIFE SCIENCES STYLE: A radiant, sunlit macro composition celebrating the chemistry of water. '
            'In the center, a gigantic, perfect spherical water droplet reflecting the green Earth inside, surrounded by clean molecular models of Hâ‚‚O '
            'with hydrogen bonds, sparkling dew on green grass, and seafoam splashing on sunny coastal rocks. '
            'Palette: water droplets crystalline aquamarine, molecular bonds radiant white, foliage fresh green, and sunlight bright. '
            'Chemistry of water, universal solvent, origin of life, hydrogen bonding, crisp, sparkling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2571,
        "title": "Your Skin Unmasked",
        "intent": "Your Skin Unmasked dermatology epidermis dermis pores melanin hair follicle",
        "brief": (
            'Book cover design titled "Your Skin Unmasked". '
            'The title "Your Skin Unmasked" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DERMATOLOGICAL ANATOMY STYLE: A luminous, clean 3D educational cutaway of human skin architecture. '
            'Showing the epidermis protective layer, dermis with collagen fibers, sebaceous glands, hair follicles, sweat glands, and microscopic sensory receptors, '
            'illuminated by gentle daylight with clear educational callouts explaining skin defense and temperature regulation. '
            'Palette: epidermal layers natural peach, coral, and cream, collagen network soft gold, sensory nerves electric cyan, and background clinical clean white. '
            'Dermatology, integumentary system, human anatomy, skin health, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the clean 3D cross-section anatomical model). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2574,
        "title": "Jadav and the Tree-Place",
        "intent": "Jadav Tree Place Molai forest reforestation Assam sandbar wildlife",
        "brief": (
            'Book cover design titled "Jadav and the Tree-Place". '
            'The title "Jadav and the Tree-Place" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOLAI FOREST REFORESTATION DAYLIGHT STYLE: A sun-drenched, flourishing forest growing on what was once a barren Brahmaputra river sandbar. '
            'Towering bamboo groves, teak trees, and Arjun trees planted over decades, now a thriving wildlife sanctuary where a majestic one-horned rhinoceros '
            'grazes peacefully near a watering hole while deer and wild birds feast on wild berries in the golden morning sunshine. '
            'Palette: forest foliage deep jade and emerald green, rhino skin textured warm slate, river sandbar gold, and sky sunny cyan. '
            'Reforestation triumph, conservation heroism, ecosystem regeneration, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2577,
        "title": "Up World, Down World",
        "intent": "Up World Down World canopy and forest floor ecology layers rainforest",
        "brief": (
            'Book cover design titled "Up World, Down World". '
            'The title "Up World, Down World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FOREST STRATIFICATION LAYERS STYLE: A vertical cross-section of a tropical rainforest from sunlit canopy down to forest floor. '
            'In the "Up World" canopy: toucans, tree frogs, and orchids basking in bright sunshine; in the "Down World" understory and soil: '
            'glowing mushrooms, industrious ants, burrowing beetles, and rich decomposing humus recycling nutrients under dappled forest light. '
            'Palette: canopy bright lime and emerald green, forest floor rich loam brown and mossy olive, with sunlight piercing the vertical layers. '
            'Forest stratification, canopy ecology, soil biology, ecological niches, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2579,
        "title": "Simple Machines : Inclined Planes",
        "intent": "Simple Machines Inclined Planes mechanical physics ramp wedge screw",
        "brief": (
            'Book cover design titled "Simple Machines: Inclined Planes". '
            'The title "Simple Machines: Inclined Planes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MECHANICAL PHYSICS INCLINED PLANE STYLE: A bright, sunlit physics laboratory workbench in full daylight. '
            'A smooth wooden inclined plane ramp with a spring scale pulling a wheeled wooden cart upward, showing force vectors and mechanical advantage (MA = L/h), '
            'accompanied by real-world applications: a sharp steel axe wedge splitting a log and a giant spiraling Archimedes screw lifting water under sunny skies. '
            'Palette: wooden ramp polished oak, force vectors radiant cyan, steel wedge silver, and lab table clean white. '
            'Simple machines, classical mechanics, inclined planes, physics principles, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2580,
        "title": "Plants that Heal",
        "intent": "Plants that Heal medicinal botany chamomile ginger lavender peppermint",
        "brief": (
            'Book cover design titled "Plants that Heal". '
            'The title "Plants that Heal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MEDICINAL HERB BOTANY DAYLIGHT STYLE: A sun-soaked herbalist\'s outdoor garden table in bright morning daylight. '
            'Freshly harvested healing plants: delicate white chamomile blossoms with golden centers, purple lavender sprigs, pungent ginger rhizomes, '
            'and fresh peppermint leaves resting on a rustic wooden tray beside an antique brass balance scale, ceramic tea mug, and a dried herb bundle. '
            'Palette: chamomile white and gold, lavender violet, foliage fresh mint green, and rustic wood warm amber. '
            'Medicinal botany, ethnobotany, herbal remedies, natural healing, fragrant, peaceful and educational. '
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

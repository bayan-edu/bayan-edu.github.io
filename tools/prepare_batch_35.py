import os

books = [
    {
        "id": 2590,
        "title": "App Attack! [Hacked!, #2]",
        "intent": "App Attack smartphone app development coding algorithms cybersecurity",
        "brief": (
            'Book cover design titled "App Attack!". '
            'The title "App Attack!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOBILE COMPUTING SOFTWARE STYLE: A bright, sunlit modern technology studio in daytime. '
            'A sleek tablet and smartphone displaying colorful app interface wires, glowing holographic algorithm flowcharts, '
            'cybersecurity shield emblems, and colorful app icons levitating lightly above the screens, surrounded by stylus pens and code notebooks under morning daylight. '
            'Palette: neon cyan, radiant orange, sapphire blue, and clean silver on warm oak desk. '
            'Mobile app programming, software engineering, digital safety, energetic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2591,
        "title": "Blue Lightning",
        "intent": "Blue Lightning electrical discharge atmospheric plasma Tesla coil high voltage",
        "brief": (
            'Book cover design titled "Blue Lightning". '
            'The title "Blue Lightning" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLASMA PHYSICS HIGH VOLTAGE STYLE: A dramatic educational science laboratory demonstration. '
            'A polished stainless steel Tesla coil toroid discharging brilliant, branching electric blue plasma lightning bolts across the air toward grounding rods, '
            'with glowing ionization channels and electrical magnetic field lines illustrated in luminous neon blue and violet. '
            'Palette: electric plasma sapphire and cobalt blue, toroid chrome silver, and background deep atmospheric navy. '
            'Electromagnetism, plasma physics, high voltage phenomena, electrifying and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2592,
        "title": "Down the Chimney Trail [Lee's Mountain, #3]",
        "intent": "Down Chimney Trail mountain hiking rugged rock chimney pine canyon",
        "brief": (
            'Book cover design titled "Down the Chimney Trail". '
            'The title "Down the Chimney Trail" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOUNTAIN TRAIL ADVENTURE DAYLIGHT STYLE: A sunlit, breathtaking alpine mountain landscape in crisp morning sunshine. '
            'A narrow, scenic hiking trail descending through a natural geological rock cleft (chimney formation) of towering granite boulders, '
            'surrounded by fragrant ponderosa pines, mountain wildflowers, and sweeping views of a sun-soaked river valley far below under an azure sky. '
            'Palette: granite rocks warm amber-grey, pines deep forest green, valley mist golden, and alpine sky clear cyan. '
            'Outdoor adventure, hiking geology, mountain landscapes, exhilarating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2593,
        "title": "Power Play [Hacked!, #3]",
        "intent": "Power Play electrical power grid smart meter transmission lines energy",
        "brief": (
            'Book cover design titled "Power Play". '
            'The title "Power Play" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SMART ELECTRICAL GRID ENGINEERING STYLE: A sun-drenched landscape featuring clean electrical infrastructure in daytime. '
            'Sleek high-voltage transmission towers carrying power lines across rolling green hills, integrating with a modern smart-grid substation '
            'equipped with glowing digital telemetry meters, renewable wind turbines, and solar arrays feeding into an illuminated energy network. '
            'Palette: sky sunny blue, fields emerald green, transmission steel silver, and glowing telemetry lines neon lime and gold. '
            'Electrical power engineering, renewable grid, smart energy distribution, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2594,
        "title": "Race to Town [Lee's Mountain, #4]",
        "intent": "Race to Town mountain bicycle gravel trail downhill pine forest daylight",
        "brief": (
            'Book cover design titled "Race to Town". '
            'The title "Race to Town" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOUNTAIN CYCLING TRAIL DAYLIGHT STYLE: A sunlit, winding gravel mountain trail descending toward a picturesque valley town on a sunny day. '
            'In the foreground, a modern high-performance mountain bike leaning against a rustic wooden trail sign, with clean disc brakes, '
            'knobby off-road tires, and a safety helmet resting on handlebars, overlooking the sunlit rooftops of the village below nestled among green hills. '
            'Palette: bicycle frame racing yellow and teal, trail earth warm gravel tan, evergreen trees forest green, and sky bright blue. '
            'Mountain cycling, trail navigation, kinetic sports physics, exciting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2628,
        "title": "Inside the World Wide Web",
        "intent": "Inside World Wide Web internet packets hyperlinks HTML servers routing",
        "brief": (
            'Book cover design titled "Inside the World Wide Web". '
            'The title "Inside the World Wide Web" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL WEB ARCHITECTURE STYLE: A luminous, colorful visualization of World Wide Web hyperlinks and global interconnected data. '
            'Intertwining digital web threads linking interactive webpage wireframes, glowing DNS server towers, satellite data beams, '
            'and fiber-optic transatlantic cables encircling a stylized digital globe in daylight. '
            'Palette: hyperlink threads radiant cyan and emerald, data packets glowing amber, globe oceans deep blue, and background bright daylight white. '
            'World Wide Web history, internet protocols, information networks, computer science, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2629,
        "title": "Shanti's Friend (Edition 1)",
        "intent": "Shantis Friend companion pet goat calf Indian rural village daylight",
        "brief": (
            'Book cover design titled "Shanti\'s Friend". '
            'The title "Shanti\'s Friend" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RURAL VILLAGE ANIMAL COMPANIONSHIP STYLE: A sun-drenched, cheerful village courtyard in rural India on a bright morning. '
            'An adorable young baby goat (kid) with soft caramel-and-white fur and shiny brown eyes wearing a festive woven red bead collar with tiny brass bells, '
            'nibbling happily on fresh green grass beside a terracotta water trough and blooming yellow marigolds under sunny skies. '
            'Palette: baby goat fur caramel and cream, marigolds vibrant golden-yellow, courtyard terracotta clay, and morning sky pale blue. '
            'Domestic animal care, village life, companionship with animals, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2630,
        "title": "Together We're Strong: The Story of Albertina Sisulu",
        "intent": "Together Strong South Africa freedom struggle protea flowers unity books",
        "brief": (
            'Book cover design titled "Together We\'re Strong". '
            'The title "Together We\'re Strong" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOUTH AFRICAN HERITAGE AND UNITY STYLE: A sunlit, dignified historical tribute in bright daylight. '
            'In the foreground, a vibrant, majestic King Protea flower (South Africa\'s national flower) blooming in full glory, '
            'beside a nurse\'s vintage stethoscope, open books of justice and education, and a colorful woven African textile quilt of unity, '
            'with Table Mountain glowing softly under a bright golden sunrise. '
            'Palette: King Protea petals rich rose-pink and cream, African textiles emerald, saffron and cobalt, and morning sunrise golden amber. '
            'South African history, courage and solidarity, nurse\'s healing legacy, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2632,
        "title": "Homecoming: The Journey of a Tiny Turtle",
        "intent": "Homecoming Journey Tiny Turtle sea turtle hatchling ocean waves beach",
        "brief": (
            'Book cover design titled "Homecoming: The Journey of a Tiny Turtle". '
            'The title "Homecoming" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEA TURTLE HATCHLING ADVENTURE DAYLIGHT STYLE: A sunlit, golden sandy beach on a tropical morning. '
            'A tiny newborn baby sea turtle hatchling making its determined journey down a gentle sand dune, leaving tiny flipper tracks, '
            'heading directly toward the refreshing, sun-glistening white seafoam of breaking turquoise ocean waves under sunny skies. '
            'Palette: sand warm golden ochre, ocean waves sparkling turquoise and seafoam white, turtle shell olive-green, and sky cyan. '
            'Marine biology, sea turtle migration, survival instincts, beach ecosystems, touching and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2633,
        "title": "Let's learn about calamities",
        "intent": "calamities natural disasters preparedness earthquake seismograph volcano storm",
        "brief": (
            'Book cover design titled "Let\'s learn about calamities". '
            'The title "Let\'s Learn About Calamities" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NATURAL HAZARDS AND PREPAREDNESS DAYLIGHT STYLE: An educational emergency management science workbench in daytime. '
            'An active rotating drum seismograph recording earthquake tremor waveforms, beside an emergency preparedness backpack kit with flashlight and radio, '
            'a meteorological storm tracking radar map, and an educational volcano cross-section diagram under bright room lighting. '
            'Palette: emergency gear safety red and yellow, seismograph chart white and red lines, and lab desk clean light wood. '
            'Natural disaster science, earthquake preparedness, disaster resilience, emergency readiness, empowering and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2637,
        "title": "A Helping Hand",
        "intent": "Helping Hand community cooperation robotic prosthetic hand gear kindness",
        "brief": (
            'Book cover design titled "A Helping Hand". '
            'The title "A Helping Hand" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOMEDICAL PROSTHETICS AND COMMUNITY COOPERATION STYLE: A bright, sunlit design engineering workshop in daytime. '
            'An advanced, colorful 3D-printed pediatric robotic prosthetic hand with precision flexible joints, holding a tender blooming green sprout in a small clay pot, '
            'surrounded by colorful gears, community charity project badges, and design tools on a warm birch workbench under sunny window light. '
            'Palette: 3D printed prosthetic vibrant teal and cheerful orange, green sprout fresh emerald, and workbench warm natural birch. '
            'Assistive technology, biomedical engineering, community service, empathy and innovation, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the mechanical prosthetic hand). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2640,
        "title": "What if something never fell back on to any planet?",
        "intent": "never fell back escape velocity orbital physics spacecraft Voyager deep space",
        "brief": (
            'Book cover design titled "What if something never fell back on to any planet?". '
            'The title "What If Something Never Fell Back?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ESCAPE VELOCITY AND DEEP SPACE PROBE STYLE: A breathtaking interstellar vista showing human ingenuity journeying into the infinite cosmos. '
            'A legendary deep space probe (like Voyager) with a golden record and radio dish antenna soaring beyond the heliosphere, '
            'with clean, glowing educational orbital trajectories showing parabolic escape velocity breaking free from planetary gravity wells into deep space. '
            'Palette: space probe gleaming gold and silver, trajectories radiant neon cyan, and interstellar space deep velvet indigo with radiant stars. '
            'Orbital mechanics, escape velocity, space exploration, physics thought experiments, profound and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2643,
        "title": "Dum Dum-a-Dum Biryani!",
        "intent": "Dum Biryani Indian culinary aromatic spices saffron rice handi pot",
        "brief": (
            'Book cover design titled "Dum Dum-a-Dum Biryani!". '
            'The title "Dum Dum-a-Dum Biryani!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CULINARY TRADITION AND AROMATIC BOTANY STYLE: A sunlit traditional kitchen feast in daytime. '
            'An authentic clay handi pot sealed with dough for slow "dum" cooking, alongside a silver platter overflowing with fragrant basmati rice '
            'infused with golden saffron, star anise, cinnamon sticks, whole black cardamom pods, fresh mint leaves, and caramelized onions, with aromatic steam ribbons rising in sunbeams. '
            'Palette: saffron rice radiant gold and amber, spices rich cinnamon brown, clay pot warm terracotta, and mint fresh green. '
            'Culinary culture, spice chemistry, cooking science, food traditions, appetizing, joyful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2644,
        "title": "THE CANNY SCIENTIST",
        "intent": "Canny Scientist laboratory glassware chemistry beakers microscope discovery",
        "brief": (
            'Book cover design titled "THE CANNY SCIENTIST". '
            'The title "THE CANNY SCIENTIST" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INGENIOUS LABORATORY CHEMISTRY DAYLIGHT STYLE: A sunlit, ingenious scientific laboratory workbench in daytime. '
            'A clever arrangement of improvised scientific apparatus: glass beakers bubbling with colorful non-toxic solutions, '
            'a brass magnifying lens, a homemade electroscope detecting charge, open scientific notebooks with clever experiment doodles, and a prism casting a rainbow across the table. '
            'Palette: chemical solutions bright cyan, amber and emerald, brass tools warm gold, and lab sunlight sparkling white. '
            'Scientific method, inventive problem solving, chemistry experiments, clever innovation, lively and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2646,
        "title": "A Good Deed [Lee's Mountain, #5]",
        "intent": "Good Deed mountain bird feeder wooden birdhouse seed meadow wildflowers",
        "brief": (
            'Book cover design titled "A Good Deed". '
            'The title "A Good Deed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOUNTAIN WILDLIFE KINDNESS DAYLIGHT STYLE: A sun-drenched mountain cabin porch on a clear sunny morning. '
            'A beautifully handcrafted wooden bird feeder brimming with sunflower seeds, where colorful songbirds (mountain bluebirds and goldfinches) '
            'are happily feeding and splashing in a ceramic birdbath, surrounded by pots of blooming mountain daisies and sweeping views of green alpine peaks. '
            'Palette: bird plumage vibrant azure blue and lemon yellow, wooden feeder warm honey pine, and mountain background sunlit emerald. '
            'Kindness to wildlife, community responsibility, bird feeding, mountain nature, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2648,
        "title": "Memories - Good and Bad",
        "intent": "Memories neuroscience memory photo album vintage camera polaroid synapses",
        "brief": (
            'Book cover design titled "Memories - Good and Bad". '
            'The title "Memories - Good and Bad" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COGNITIVE PSYCHOLOGY AND MEMORY DAYLIGHT STYLE: A sunlit wooden desk in warm morning sunshine. '
            'An open vintage leather-bound photo album displaying sunlit landscape photographs, beside an antique twin-lens reflex camera, '
            'a delicate hourglass with flowing golden sand, and subtle, glowing neural memory network pathways weaving softly between the objects. '
            'Palette: leather album warm saddle brown, photographs vibrant vintage colors, neural pathways soft glowing amber, and sunlight warm white. '
            'Psychology of memory, emotions, cognitive processing, reflective and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2649,
        "title": "The Forest and the Trees [Lee's Mountain, #1]",
        "intent": "Forest and Trees forestry dendrology tree rings pine old growth mountain",
        "brief": (
            'Book cover design titled "The Forest and the Trees". '
            'The title "The Forest and the Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DENDROLOGY AND FORESTRY ECOLOGY DAYLIGHT STYLE: A sunlit mountain forest clearing in full daylight. '
            'In the foreground, a smooth cut cross-section of a fallen pine trunk showing detailed concentric tree rings (dendrochronology) '
            'with a magnifying glass examining historical growth cycles, framed by towering living sugar pines and redwoods reaching toward a sunlit sky. '
            'Palette: tree rings warm honey and amber, pine needles rich forest green, bark deep chestnut, and sunlight golden. '
            'Dendrochronology, forest ecology, tree anatomy, climate history in trees, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2650,
        "title": "Bonda and Devi",
        "intent": "Bonda and Devi Indian village friendship cows calves bells courtyard",
        "brief": (
            'Book cover design titled "Bonda and Devi". '
            'The title "Bonda and Devi" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RURAL TRADITIONAL COMPANIONSHIP DAYLIGHT STYLE: A sun-soaked village courtyard in rural India in morning golden light. '
            'Two gentle, friendly native Indian humped calves (zebu) with smooth white and fawn coats adorned with handwoven colorful jute collars and brass bells, '
            'resting peacefully side-by-side in clean straw near a carved stone grain trough under a shady neem tree. '
            'Palette: calves fawn and pure white, woven collars saffron red and yellow, courtyard earth warm terracotta, and morning sunlight golden. '
            'Animal friendships, traditional agrarian culture, compassionate care, gentle and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2651,
        "title": "The Dance of the Flamingo",
        "intent": "Dance Flamingo Phoenicopterus pink flock lagoon salt lake courtship",
        "brief": (
            'Book cover design titled "The Dance of the Flamingo". '
            'The title "The Dance of the Flamingo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FLAMINGO LAGOON ECOLOGY DAYLIGHT STYLE: A sun-drenched alkaline salt lake in Kenya in bright morning light. '
            'A spectacular flock of vibrant pink greater flamingos (Phoenicopterus roseus) engaged in synchronized courtship display, '
            'arching their long graceful necks, opening radiant coral and black wings, and marching together in shallow turquoise brine reflecting sunbeams. '
            'Palette: flamingo plumage brilliant coral-pink and crimson, lake water turquoise and pastel reflection, and sky sunny cyan. '
            'Avian ethology, animal courtship behavior, wetland biodiversity, magnificent, graceful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2653,
        "title": "Miss Bandicota Bengalensis Enters a Deep Dark Jungle",
        "intent": "Bandicota Bengalensis bandicoot rat jungle burrows nocturnal botany daylight",
        "brief": (
            'Book cover design titled "Miss Bandicota Bengalensis Enters a Deep Dark Jungle". '
            'The title "Miss Bandicota Bengalensis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TROPICAL JUNGLE NATURALIST ADVENTURE STYLE: A sun-dappled tropical monsoon jungle glade in morning daylight. '
            'In the foreground, a cute, inquisitive lesser bandicoot rat (Bandicota bengalensis) with soft grey-brown fur and twitching whiskers '
            'peeking out from an intricate subterranean burrow entrance among broad jungle ferns, wild ginger blossoms, and fallen hollow bamboo stalks under morning sunbeams. '
            'Palette: bandicoot fur warm grey-brown, jungle vegetation lush emerald, ginger flowers coral red, and sunbeams luminous gold. '
            'Small mammal ecology, burrowing adaptations, jungle wildlife, curious and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2655,
        "title": "The ABCs of Healthy Me!",
        "intent": "ABCs Healthy Me pediatric health nutrition exercise toothbrush fruits",
        "brief": (
            'Book cover design titled "The ABCs of Healthy Me!". '
            'The title "The ABCs of Healthy Me!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHILDHOOD WELLNESS AND HYGIENE DAYLIGHT STYLE: A cheerful, brightly illuminated health and wellness tabletop in daytime. '
            'Colorful wooden alphabet building blocks (A, B, C) beside a basket of fresh colorful fruits (red apples, bananas, blueberries), '
            'a child\'s blue toothbrush with foaming toothpaste, a jump rope, and a sparkling glass of clean water under morning sunlight. '
            'Palette: blocks cheerful primary colors, fruits vivid red and yellow, toothbrush sky blue, and tabletop clean white. '
            'Childhood health, personal hygiene, active lifestyle, nutrition habits, vibrant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2658,
        "title": "The story of Sadi Carnot, the father of modern engines",
        "intent": "Sadi Carnot thermodynamics heat engine Carnot cycle steam piston physics",
        "brief": (
            'Book cover design titled "The Story of Sadi Carnot". '
            'The title "The Story of Sadi Carnot" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'THERMODYNAMICS AND HEAT ENGINE STYLE: A bright, sunlit nineteenth-century physics and engineering study in daylight. '
            'A brass model of an idealized thermodynamic heat engine with transparent glass cylinder and moving piston, surrounded by clean pressure-volume (P-V) Carnot cycle diagrams, '
            'hot and cold thermal reservoir icons, an open thermodynamics treatise on oak desk, and a brass thermometer. '
            'Palette: engine cylinder brass gold, steam expansion translucent white, thermal diagrams crimson and ice blue, and desk rich mahogany. '
            'Thermodynamics, Carnot cycle, engine physics, industrial revolution science, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2659,
        "title": "Partial Eclipse",
        "intent": "Partial Eclipse solar crescent astronomy sunspot projection daylight",
        "brief": (
            'Book cover design titled "Partial Eclipse". '
            'The title "Partial Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PARTIAL SOLAR ECLIPSE ASTRONOMY STYLE: A brilliant daytime astronomical observation view through solar filters. '
            'The radiant golden Sun partially occulted by the dark silhouette of the Moon, creating an elegant, blazing solar crescent in a deep twilight sky, '
            'showing fine solar limb granulation and dark sunspot groups on the solar disk, with crescent-shaped sunbeam dappling projected on a clean white surface below. '
            'Palette: solar crescent blazing gold and incandescent white, lunar disk velvet black, and sky deep atmospheric indigo. '
            'Solar astronomy, celestial alignment, eclipse projection optics, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2660,
        "title": "A Blast from the Past [Lee's Mountain, #2]",
        "intent": "Blast from Past paleontology trilobite ammonite fossils rock hammer geology",
        "brief": (
            'Book cover design titled "A Blast from the Past". '
            'The title "A Blast from the Past" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PALEONTOLOGY FOSSIL HUNTING DAYLIGHT STYLE: A sun-drenched rocky mountain scree slope in morning sunshine. '
            'A split sedimentary shale rock revealing an exquisitely preserved ancient spiral ammonite fossil and a ribbed trilobite specimen, '
            'beside a geologist\'s steel rock hammer, a brass magnifying hand lens, and a field specimen label notebook under clear skies. '
            'Palette: fossil rock slate grey and charcoal, ammonite pearlescent amber, rock hammer steel and blue grip, and morning sunlight golden. '
            'Paleontology, fossilization, prehistoric life, geological fieldwork, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2661,
        "title": "Benjamin Franklin: The Ultimate Solution Creator",
        "intent": "Benjamin Franklin inventions bifocals lightning rod Franklin stove daylight",
        "brief": (
            'Book cover design titled "Benjamin Franklin: The Ultimate Solution Creator". '
            'The title "Benjamin Franklin" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENLIGHTENMENT INVENTIONS WORKBENCH STYLE: A bright, sunlit colonial inventor\'s workshop in daytime. '
            'Arranged on an oak desk are Franklin\'s famous practical inventions: an authentic pair of split-lens bifocal spectacles, '
            'a miniature cast-iron Franklin heating stove model, a pointed copper lightning rod model with a grounding wire, and handwritten inventor\'s sketches with a quill pen and ink pot. '
            'Palette: oak desk warm honey, cast iron stove charcoal black, bifocals silver and glass, and morning window daylight bright white. '
            'History of invention, practical science, American innovation, industrious, enlightened and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2662,
        "title": "Safe at Any Speed",
        "intent": "Safe at Any Speed automotive safety seatbelt crumple zone crash test dummy",
        "brief": (
            'Book cover design titled "Safe at Any Speed". '
            'The title "Safe at Any Speed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AUTOMOTIVE SAFETY ENGINEERING STYLE: A high-tech vehicle crash safety testing facility in bright industrial daylight. '
            'A high-strength passenger safety cage with an engineered crumple zone absorbing impact energy, showing modern three-point nylon seatbelts, '
            'deployed airbag cushions, and clean computer simulation stress-strain color maps (finite element analysis) under bright studio spotlights. '
            'Palette: safety cage steel silver, airbag fabric crisp white, stress-strain map rainbow gradient, and test facility clean white. '
            'Automotive safety, impact biomechanics, passenger protection engineering, technological innovation, authoritative and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2663,
        "title": "Study Buddies",
        "intent": "Study Buddies animal friendship dog cat reading books desk daylight",
        "brief": (
            'Book cover design titled "Study Buddies". '
            'The title "Study Buddies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANIMAL COMRADERY STUDY SPACE DAYLIGHT STYLE: A sunlit, cozy library study room on a bright afternoon. '
            'On a warm woven rug beside a wooden study desk with open school textbooks and a desk lamp, a golden retriever and a tabby cat are napping peacefully together '
            'curled up side-by-side with paws touching, basking in warm golden sunbeams streaming across the wooden floor. '
            'Palette: golden retriever honey gold, tabby cat warm marmalade and white, rug soft navy, and sunlight golden warm. '
            'Friendship, peer learning, animal comradery, peaceful study habits, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2664,
        "title": "The Hoover Dam",
        "intent": "Hoover Dam civil engineering Lake Mead Colorado river hydroelectric",
        "brief": (
            'Book cover design titled "The Hoover Dam". '
            'The title "The Hoover Dam" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MONUMENTAL CIVIL ENGINEERING DAYLIGHT STYLE: A sun-drenched, colossal panoramic view of Hoover Dam on the Colorado River on a bright clear day. '
            'The monumental Art Deco concrete arch-gravity dam wall spanning the rugged Black Canyon, holding back the vast deep-blue waters of Lake Mead, '
            'with intake towers standing tall and water flowing through turbine penstocks generating hydroelectricity under a brilliant desert sky. '
            'Palette: dam concrete pale sandstone, Lake Mead deep sapphire blue, canyon rocks rich terracotta ochre, and desert sky azure. '
            'Civil engineering marvel, hydroelectricity, water resource infrastructure, monumental and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2665,
        "title": "Miss Bandicota Bengalensis Digs Up the Seashore",
        "intent": "Bandicota seashore marine intertidal burrows crab shells sand dunes daylight",
        "brief": (
            'Book cover design titled "Miss Bandicota Bengalensis Digs Up the Seashore". '
            'The title "Miss Bandicota Bengalensis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COASTAL DUNE NATURALIST EXPLORATION STYLE: A sunlit coastal beach and sand dune habitat in morning light. '
            'An inquisitive bandicoot rat exploring a sandy burrows system among coastal sea oats and beach morning glory vines, '
            'discovering beach treasures: colorful spiral seashells, a moulted horseshoe crab shell, and gentle tidal foam in the background under sunny skies. '
            'Palette: beach sand golden tan, sea oats fresh green, sea water turquoise and white foam, and sky sunny cyan. '
            'Coastal ecology, intertidal zones, beach burrowing animals, playful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2669,
        "title": "Happy Maths : Time and Money",
        "intent": "Happy Maths Time Money clock currency coins bills hourglass math",
        "brief": (
            'Book cover design titled "Happy Maths : Time and Money". '
            'The title "Happy Maths: Time and Money" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PRACTICAL MATHEMATICS CLASSROOM DAYLIGHT STYLE: A bright, sunlit elementary mathematics desk in daytime. '
            'A large, colorful educational clock face with moving hour and minute hands, beside an antique brass sand hourglass, '
            'neatly stacked shiny golden and silver coins, play currency bills, and a colorful wooden abacus with counting beads under morning sunlight. '
            'Palette: clock face cheerful yellow and blue, coins gleaming gold and silver, abacus beads rainbow colors, and desk light wood. '
            'Elementary mathematics, time-telling skills, financial literacy, practical counting, delightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2671,
        "title": "Counting on Moru",
        "intent": "Counting on Moru animal arithmetic counting peacock feathers nature math",
        "brief": (
            'Book cover design titled "Counting on Moru". '
            'The title "Counting on Moru" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NATURE ARITHMETIC FAIRYTALE DAYLIGHT STYLE: A sun-soaked forest clearing in India on a bright morning. '
            'A magnificent wild peacock (Moru) proudly displaying its fan of iridescent train feathers, each feather featuring a distinct glowing "eye" spot (ocellus), '
            'with clean educational numbers gently counting each eye spot (1, 2, 3... 10) in cheerful typography, surrounded by flowering wild jasmine. '
            'Palette: peacock feathers iridescent sapphire, emerald and gold, jasmine white, and morning sunlight golden. '
            'Early numeracy, counting in nature, peacock biology, joyous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2672,
        "title": "Turtle Story",
        "intent": "Turtle Story freshwater pond turtle shell basking log water lilies",
        "brief": (
            'Book cover design titled "Turtle Story". '
            'The title "Turtle Story" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FRESHWATER TURTLE NATURE DAYLIGHT STYLE: A peaceful, sunlit freshwater wetland pond in summer daylight. '
            'A gentle painted turtle (Chrysemys picta) with bright red and yellow striped neck and patterned dark shell basking contently '
            'on a half-submerged mossy log in warm midday sunshine, surrounded by blooming white water lilies, dragonflies, and crystal-clear pond water. '
            'Palette: turtle shell deep olive with yellow and crimson markings, pond water clear emerald-blue, water lilies pure white, and sunlight bright gold. '
            'Reptile biology, thermoregulation in turtles, wetland habitat, tranquil and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2674,
        "title": "Something's Stuck Around the Duck",
        "intent": "duck wildlife rescue plastic six pack ring cleanup water conservation",
        "brief": (
            'Book cover design titled "Something\'s Stuck Around the Duck". '
            'The title "Something\'s Stuck Around the Duck" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WILDLIFE RESCUE AND POND CLEANUP DAYLIGHT STYLE: A sunlit, hopeful freshwater park pond in morning daylight. '
            'In the foreground, a gentle veterinary wildlife rescue net and blunt safety scissors on a wooden dock beside a freed plastic ring cut safely in half, '
            'while a healthy white Pekin duck swims happily in sparkling clean pond water among reeds and yellow irises under sunny skies. '
            'Palette: duck pure white with bright orange bill, pond water sparkling aquamarine, dock wood warm honey, and sky cheerful blue. '
            'Wildlife rescue, plastic litter awareness, animal safety, environmental kindness, poignant, triumphant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2676,
        "title": "Sir M. Visvesvaraya: The Builder of Dams, Bridges and a Nation",
        "intent": "Visvesvaraya civil engineering Krishna Raja Sagara dam sluice gates bridge",
        "brief": (
            'Book cover design titled "The Builder of Dams and Bridges". '
            'The title "The Builder of Dams and Bridges" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MONUMENTAL HYDRAULIC ENGINEERING STYLE: A sun-drenched, grand civil engineering vista in full daylight. '
            'The monumental masonry stone Krishna Raja Sagara dam with its iconic automatic sluice floodgates releasing roaring white water into canal networks, '
            'surrounded by classical stone aqueducts, a surveyor\'s brass theodolite on tripod, and architectural engineering blueprints under a bright sky. '
            'Palette: masonry dam warm sandstone granite, water foaming white and turquoise, theodolite polished brass, and sky azure. '
            'Hydraulic engineering, dam construction, civil leadership, nation building, monumental and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2679,
        "title": "The Sparrow Who Flooded a Village",
        "intent": "Sparrow Flooded Village house sparrow folktale river clay water pot",
        "brief": (
            'Book cover design titled "The Sparrow Who Flooded a Village". '
            'The title "The Sparrow Who Flooded a Village" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'STORYBOOK FOLKLORE VILLAGE DAYLIGHT STYLE: A sunlit, storybook traditional village riverbank on a bright morning. '
            'In the center foreground, a plucky, determined little house sparrow (Passer domesticus) with warm brown-and-grey feathers perched on an overturned terracotta water pot, '
            'where crystal water overflows like a playful torrent splashing across cobblestones, framed by green village trees and rustic thatched cottages under a blue sky. '
            'Palette: sparrow feathers warm chestnut and cream, terracotta pot rich clay orange, splashing water sparkling white and cyan, and sky sunny blue. '
            'Traditional folklore, cause and effect storytelling, animal fables, charming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2683,
        "title": "Happy Maths : Shapes and Data",
        "intent": "Happy Maths Shapes Data geometry 3D shapes bar charts pie chart math",
        "brief": (
            'Book cover design titled "Happy Maths : Shapes and Data". '
            'The title "Happy Maths: Shapes and Data" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOMETRY AND DATA VISUALIZATION DAYLIGHT STYLE: A bright, sunlit modern mathematics desk in daytime. '
            'Arranged with joy are colorful wooden 3D geometric shapes: a golden sphere, a cyan cube, a coral cone, and an emerald pyramid, '
            'beside a 3D wooden block bar chart and a colorful pie chart puzzle, with geometric drawing compasses and rulers on graph paper under sunny window light. '
            'Palette: geometric solids bright primary and pastel hues, graph paper crisp white with blue grid, and desk light pine wood. '
            'Geometry, 3D shapes, data charts, early mathematical thinking, vibrant, playful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2684,
        "title": "Fearless Fatima [Hacked!, #5]",
        "intent": "Fearless Fatima ethical hacking cybersecurity code firewall laptop",
        "brief": (
            'Book cover design titled "Fearless Fatima". '
            'The title "Fearless Fatima" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CYBERSECURITY DEFENSE DAYLIGHT STYLE: A bright, sunlit modern coding workstation in daytime. '
            'A sleek open laptop with a bright screen displaying an ethical hacking security terminal and green firewall shield, '
            'with glowing geometric holographic security tokens and decrypted data blocks floating in the air, beside notebook with logic diagrams and a cup of tea under sunny window light. '
            'Palette: firewall shield emerald and cyan, laptop metallic silver, desk warm oak, and sunlight clear white. '
            'Ethical hacking, cybersecurity defense, digital problem solving, empowering and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2685,
        "title": "Understanding Learning Disabilities",
        "intent": "Understanding Learning Disabilities neurodiversity dyslexia colorful puzzle",
        "brief": (
            'Book cover design titled "Understanding Learning Disabilities". '
            'The title "Understanding Learning Disabilities" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NEURODIVERSITY AND COGNITIVE EMPATHY DAYLIGHT STYLE: A warm, sunlit educational study table in daytime. '
            'A beautifully assembled wooden neurodiversity infinity symbol puzzle of interlocking colorful pieces (cyan, magenta, yellow, emerald), '
            'beside open illustrated storybooks, a dyslexia reading guide overlay strip, colorful sensory fidget tools, and a potted blooming sunflower under warm sunbeams. '
            'Palette: neurodiversity symbol bright cheerful spectrum, sunflower golden yellow, desk warm birch wood, and daylight soft white. '
            'Neurodiversity, learning support, educational empathy, cognitive inclusion, compassionate and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2689,
        "title": "The Bag",
        "intent": "The Bag sustainable canvas tote bag reusable textile recycling botany",
        "brief": (
            'Book cover design titled "The Bag". '
            'The title "The Bag" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUSTAINABLE TEXTILE DESIGN DAYLIGHT STYLE: A sunlit botanical textile workshop on a bright morning. '
            'A sturdy, beautifully crafted natural cotton canvas tote bag with woven handles resting on a wooden bench, '
            'printed with an artistic green botanical fern leaf pattern, holding fresh farmer\'s market produce (crisp carrots, apples, fresh bread), '
            'symbolizing zero-waste living and replacing single-use plastics under sunny morning light. '
            'Palette: tote bag natural unbleached ivory cotton, fern print sage green, produce orange and ruby red, and bench warm pine. '
            'Zero waste, sustainable materials, reusable design, textile crafts, clean and educational. '
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

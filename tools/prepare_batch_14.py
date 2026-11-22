import os

books = [
    {
        "id": 1572,
        "title": "Energy Screams",
        "intent": "Energy Screams acoustic physics sound energy resonance",
        "brief": (
            'Book cover design titled "Energy Screams". '
            'The title "Energy Screams" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT ACOUSTIC PHYSICS & SOUND ENERGY DAYLIGHT STYLE: A sunlit, high-tech acoustics research laboratory on a bright morning. '
            'In the center foreground, a delicate crystal glass vibrating in resonance beside an acoustic speaker horn emitting visible colorful soundwave frequency ripples. '
            'Brass acoustic tuning forks of various pitches vibrating with water droplet splashes, alongside a digital oscilloscope displaying crisp sinusoidal sound waves and decibel frequency spectrums. '
            'Palette: electric cyan, soundwave magenta, chrome silver, acoustic gold, and clean laboratory white. '
            'Sound energy, acoustic resonance, physics of vibration, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1573,
        "title": "How Soccer Can Help Us Understand Physics",
        "intent": "How Soccer Can Help Us Understand Physics Magnus effect aerodynamics",
        "brief": (
            'Book cover design titled "How Soccer Can Help Us Understand Physics". '
            'The title "How Soccer Can Help Us Understand Physics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC SPORTS AERODYNAMICS DAYLIGHT STYLE: A sun-drenched, pristine green soccer stadium field in radiant midday sunlight. '
            'In the center foreground, a classic black-and-white soccer ball captured spinning through mid-air toward a white goal net. '
            'A glowing curved parabolic trajectory trail demonstrating the aerodynamic Magnus effect, with clean vector airflow velocity arrows, spin rotation vectors, and friction diagrams. '
            'Dew glistening on the manicured emerald lawn under a bright sunny blue sky. '
            'Palette: soccer lawn emerald green, classic ball white and black, radiant trajectory cyan, and brilliant stadium sky blue. '
            'Physics of sports, aerodynamics, Magnus effect, trajectory motion, cheerful and engaging. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1574,
        "title": "NJ Physics Professor Has the \"Right Stuff\"",
        "intent": "Physics Professor Right Stuff aerospace astronautics physics",
        "brief": (
            'Book cover design titled "NJ Physics Professor Has the \\"Right Stuff\\"". '
            'The title "Physics Professor Has the Right Stuff" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE ENGINEERING & ASTRONAUTICS LAB DAYLIGHT STYLE: A sunlit academic physics and astronautics research laboratory. '
            'On a polished oak workbench: precision scale models of orbital rockets, space capsules, and wind-tunnel aerodynamic airfoils. '
            'A chalkboard filled with neat orbital mechanics equations, gravitational slingshot diagrams, and delta-v calculations in radiant sunlight. '
            'Gleaming gyroscopes, accelerometer sensors, and mission patch insignia displayed under bright daylight. '
            'Palette: aerospace navy blue, polished brass gold, chalkboard slate green, rocket white, and sunny sky blue. '
            'Astronautics, physics education, space exploration, flight dynamics, inspiring and scholarly. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1575,
        "title": "Oh, My Aching Head!",
        "intent": "Oh My Aching Head headache neurology cranial nerves",
        "brief": (
            'Book cover design titled "Oh, My Aching Head!". '
            'The title "Oh, My Aching Head!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MEDICAL NEUROSCIENCE & ANATOMY STUDY DAYLIGHT STYLE: A calm, sunlit medical biology laboratory and study bathed in gentle morning light. '
            'In the center foreground, an anatomical translucent acrylic model of the human brain and cranial blood vessels, showing sensory nerve pathways highlighted in soft colors. '
            'A cooling gel compress, a glass pitcher of clear pure water with lemon slices, a medicinal lavender blossom, and clean medical anatomical diagrams illustrating stress, hydration, and vascular circulation. '
            'Palette: calming medical cyan, soft lavender purple, optic white, gentle coral, and natural morning sunlight. '
            'Human biology, neurology, health science, body awareness, peaceful and informative. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1576,
        "title": "Seeing the Invisible: Mutualism and Plant Reproduction",
        "intent": "Mutualism and Plant Reproduction pollination ultraviolet nectar guides",
        "brief": (
            'Book cover design titled "Seeing the Invisible: Mutualism and Plant Reproduction". '
            'The title "Seeing the Invisible" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RADIANT BOTANICAL & ULTRAVIOLET VISION STYLE: A breathtaking split-view of a sunlit garden flower in natural daylight. '
            'On one side, a vivid yellow evening primrose blooming in bright sunshine with golden pollen. '
            'On the other side, the same flower revealed under pollinator ultraviolet light vision, showcasing glowing dark ultraviolet "bullseye" nectar guide patterns. '
            'A fuzzy golden bumblebee hovering nearby with pollen-laden legs, surrounded by sparkling floating microscopic pollen grains. '
            'Palette: sunflower yellow, ultraviolet electric violet, meadow green, pollen gold, and daylight sky blue. '
            'Mutualism, pollination ecology, insect vision, coevolution, vibrant and magical scientific wonder. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1577,
        "title": "The Senses of Smell and Taste",
        "intent": "The Senses of Smell and Taste olfactory gustatory neuroscience",
        "brief": (
            'Book cover design titled "The Senses of Smell and Taste". '
            'The title "The Senses of Smell and Taste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AROMATIC BOTANICAL & SENSORY SCIENCE DAYLIGHT STYLE: A vibrant, sun-drenched culinary sensory research laboratory. '
            'In the center foreground, an assortment of aromatic sensory wonders: fragrant cinnamon sticks, fresh vanilla orchid pods, split juicy lemons, fresh peppermint leaves, and ripe strawberries. '
            'Whispering aromatic vapor ribbons rising gracefully into stylized molecular structures of vanillin and limonene. '
            'A magnifying glass showing microscopic taste bud papillae diagrams and olfactory receptor models in bright daylight. '
            'Palette: citrus lemon yellow, peppermint green, strawberry red, warm cinnamon brown, and clean lab white. '
            'Sensory biology, olfactory system, taste neuroscience, chemical senses, cheerful and vibrant. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1578,
        "title": "Sir Isaac Newton and LeBron James",
        "intent": "Newton and LeBron James physics of gravity momentum sports",
        "brief": (
            'Book cover design titled "Sir Isaac Newton and LeBron James". '
            'The title "Sir Isaac Newton & Athletic Physics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSICAL GRAVITY & MODERN ATHLETIC PHYSICS STYLE: A clever, sunlit conceptual scene combining classical science with basketball physics. '
            'In the center, a crisp red apple falling from a leafy green tree branch beside a bright regulation orange basketball swooshing downward toward a basketball hoop. '
            'Dynamic glowing parabolic trajectory arcs, gravitational force vectors (F = ma), impulse momentum equations, and bounce elasticity graphics in radiant sunshine. '
            'A polished hardwood basketball court blending into a grassy English garden under a brilliant blue sky. '
            'Palette: regulation basketball orange, apple crimson red, court hardwood gold, lawn green, and sky cyan. '
            'Physics of motion, gravity, Newton\'s laws, athletic kinetics, creative and engaging. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1579,
        "title": "The Allure of Gold",
        "intent": "The Allure of Gold geology metallurgy mineralogy",
        "brief": (
            'Book cover design titled "The Allure of Gold". '
            'The title "The Allure of Gold" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLEAMING MINERALOGICAL GEOLOGY DAYLIGHT STYLE: A sun-drenched geological field prospect and mineralogy table bathed in golden natural light. '
            'In the center foreground, crystalline raw native gold nuggets intergrown with sparkling white quartz rock. '
            'A classic steel prospector\'s gold pan with water and black sand revealing flakes of alluvial gold. '
            'A polished jeweler\'s brass balance scale holding a stamped 999.9 pure gold bullion ingot reflecting dazzling sunbeams. '
            'Palette: radiant metallic gold, quartz crystal white, river stone slate, earth ochre, and warm sunlit amber. '
            'Mineralogy, geology of precious metals, metallurgy, atomic element 79, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1580,
        "title": "The Power of the Wind",
        "intent": "The Power of the Wind wind turbine renewable energy",
        "brief": (
            'Book cover design titled "The Power of the Wind". '
            'The title "The Power of the Wind" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAJESTIC WIND ENERGY & ATMOSPHERIC DAYLIGHT STYLE: A vast, sunlit coastal landscape of rolling green hills overlooking a sparkling blue ocean. '
            'Towering modern white wind turbines with graceful three-blade rotors spinning in the ocean breeze under a radiant sunny sky. '
            'A cup anemometer spinning on an atmospheric weather station in the foreground, with visible dynamic wind streamlines and kinetic airflow curls sweeping across the grassy slopes. '
            'A traditional Dutch wooden windmill standing peacefully on a distant hill in harmonious contrast. '
            'Palette: wind turbine clean white, hill emerald green, ocean aquamarine, and brilliant sky blue. '
            'Renewable energy, wind power, atmospheric physics, clean technology, bright and uplifting. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1581,
        "title": "Water from the Air: Cloud Forests",
        "intent": "Water from the Air Cloud Forests montane tropical ecology",
        "brief": (
            'Book cover design titled "Water from the Air: Cloud Forests". '
            'The title "Water from the Air: Cloud Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUSH TROPICAL CLOUD FOREST CANOPY DAYLIGHT STYLE: An ethereal, sun-drenched tropical montane cloud forest canopy in radiant morning light. '
            'Ancient moss-covered tree limbs draped in blooming wild orchids, hanging lichens, and vibrant green bromeliads. '
            'Drifting white mountain mist condensing on broad waxy leaves into crystal-clear water droplets that drip into a sparkling forest stream below. '
            'Golden sunbeams piercing the mist, creating dramatic crepuscular rays through the lush emerald canopy. '
            'Palette: deep jungle emerald, mist pearl white, orchid magenta, mountain sky cyan, and golden sunbeam rays. '
            'Cloud forest ecology, water condensation, hydrological cycle, biodiversity, magical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1582,
        "title": "What's Bugging Everyone?",
        "intent": "Whats Bugging Everyone entomology insects biodiversity",
        "brief": (
            'Book cover design titled "What\'s Bugging Everyone?". '
            'The title "What\'s Bugging Everyone?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT GARDEN ENTOMOLOGY DAYLIGHT STYLE: A cheerful, sunlit garden exploration scene bathed in radiant morning sunshine. '
            'In the foreground, a charming array of beneficial garden insects resting on a lush green hosta leaf: a spotted red ladybug, a metallic emerald jewel beetle, a graceful praying mantis, and a honeybee. '
            'A brass explorer\'s magnifying glass revealing the intricate iridescent textures of insect wings and compound eyes. '
            'In the background, colorful blooming coneflowers and fluttering monarch butterflies in bright daylight. '
            'Palette: ladybug crimson red, beetle iridescent emerald, daisy yellow, leaf green, and sunny sky blue. '
            'Entomology, insect ecology, biodiversity, garden science, playful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1584,
        "title": "Wi-Fi: Connecting the World Through Invisible Waves",
        "intent": "Wi Fi Connecting the World electromagnetic radio waves",
        "brief": (
            'Book cover design titled "Wi-Fi: Connecting the World Through Invisible Waves". '
            'The title "Wi-Fi: Connecting the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIGH-TECH WIRELESS NETWORKING DAYLIGHT STYLE: A sleek, modern sunlit home and office environment bathed in natural morning light. '
            'In the center foreground, a high-performance modern wireless router with directional antennas emitting concentric, glowing electromagnetic radio frequency waves. '
            'Stylized transparent architectural cutaway showing radio waves passing cleanly through rooms, connecting digital tablets, laptops, and smart devices via glowing data pulses. '
            'Palette: electric cyan, wireless signal royal blue, sleek matte white, and warm wooden desk honey. '
            'Wireless networking, radio physics, telecommunications, digital connectivity, modern and clear. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1590,
        "title": "Building a Better Natural History Museum",
        "intent": "Natural History Museum architecture paleontology exhibition",
        "brief": (
            'Book cover design titled "Building a Better Natural History Museum". '
            'The title "Building a Better Museum" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNIFICENT MUSEUM ARCHITECTURE & EXHIBITION DAYLIGHT STYLE: A sunlit, grand architectural atrium of a world-class modern natural history museum. '
            'Soaring glass skylights casting radiant sunbeams across the expansive marble exhibition floor. '
            'In the center, a towering, perfectly mounted sauropod dinosaur skeleton and a suspended blue whale skeleton model. '
            'Architectural blueprint models, interactive touchscreen kiosks, and crystal display dioramas arranged in inspiring harmony. '
            'Palette: marble travertine cream, fossil ivory, glass atrium aqua cyan, and warm golden sunbeams. '
            'Museum curation, public science, architectural design, paleontology, grand and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1591,
        "title": "Focus: Understanding How the Brain Works",
        "intent": "Focus Understanding How the Brain Works cognitive neuroscience",
        "brief": (
            'Book cover design titled "Focus: Understanding How the Brain Works". '
            'The title "Understanding the Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT COGNITIVE NEUROSCIENCE DAYLIGHT STYLE: A brightly lit, modern cognitive science laboratory with sunlight streaming through large windows. '
            'In the center foreground, an illuminated 3D translucent model of the human brain with distinct functional regions (prefrontal cortex, temporal lobe, visual cortex) mapped in clear, harmonious colors. '
            'Gently glowing neural synapsing pathways and network connectivity nodes connecting the brain regions. '
            'On the desk: clean EEG brainwave graphs showing alpha and beta focus wavelengths, alongside a notebook and prism on polished wood. '
            'Palette: optic white, electric cyan, neural violet, coral pink, and natural desk blonde oak. '
            'Cognitive neuroscience, brain function, attention and focus, psychology, bright and enlightening. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1592,
        "title": "Freeing the Ocean of Plastic, One Step at a Time",
        "intent": "Freeing the Ocean of Plastic ocean cleanup conservation",
        "brief": (
            'Book cover design titled "Freeing the Ocean of Plastic, One Step at a Time". '
            'The title "Freeing the Ocean of Plastic" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HOPEFUL OCEAN CLEANUP & MARINE CONSERVATION DAYLIGHT STYLE: A brilliant, sun-drenched tropical ocean panorama under radiant blue skies. '
            'In the center foreground, an innovative solar-powered floating ocean barrier cleanup system skimming recyclable plastic waste from the surface of pristine turquoise waters. '
            'Beneath the surface in crystal-clear water, sea turtles, vibrant coral reefs, and schools of colorful reef fish swimming freely and safely. '
            'Recycling sorting bins and recovered plastic pellets displayed neatly in educational graphics. '
            'Palette: tropical ocean turquoise, sunny sky blue, solar yellow, coral orange, and clean white. '
            'Ocean conservation, environmental cleanup, recycling engineering, marine ecology, bright and hopeful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1593,
        "title": "How Water Loss Affects Biodiversity",
        "intent": "How Water Loss Affects Biodiversity drought ecology freshwater",
        "brief": (
            'Book cover design titled "How Water Loss Affects Biodiversity". '
            'The title "Water Loss & Biodiversity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENVIRONMENTAL ECOLOGY DUAL LANDSCAPE DAYLIGHT STYLE: A sunlit, thought-provoking ecological contrast landscape under clear daylight. '
            'On one side, a thriving, lush freshwater wetland teeming with cattails, water lilies, dragonflies, and clear reflective ponds. '
            'Transitioning smoothly to a dry, parched riverbed with cracked earth clay and wilted grasses, highlighting the vulnerability of life to water scarcity. '
            'A giant crystal water drop suspended in the center, containing a miniature reflection of a healthy vibrant biosphere inside. '
            'Palette: wetland emerald green, pond aquamarine, earth clay terracotta, arid sand, and bright sky cyan. '
            'Conservation ecology, freshwater scarcity, biodiversity loss, environmental science, educational and poignant. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1594,
        "title": "Rhubarb Grows in the Dark",
        "intent": "Rhubarb Grows in the Dark forced rhubarb botany agriculture",
        "brief": (
            'Book cover design titled "Rhubarb Grows in the Dark". '
            'The title "Rhubarb Grows in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FASCINATING AGRICULTURAL BOTANY & FORCING SHED STYLE: A warm, enchanting view inside a historic Yorkshire rhubarb forcing shed. '
            'Tall, vivid neon-pink and ruby-red stems of tender forced rhubarb growing vigorously in rich dark earth toward soft golden candlelight lanterns. '
            'Vibrant chartreuse-yellow young leaves unfurling at the tips of the candy-pink stalks. '
            'A rustic wooden harvesting basket, brass gardening trowel, and fresh bundles of tied rhubarb ready for market. '
            'Palette: luminous neon pink, ruby crimson, chartreuse yellow-green, warm lantern amber, and rich earth brown. '
            'Agricultural botany, unusual farming methods, plant phototropism, unique and captivating. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1595,
        "title": "Solar Power: From Sunlight to Electricity",
        "intent": "Solar Power Sunlight to Electricity photovoltaic physics",
        "brief": (
            'Book cover design titled "Solar Power: From Sunlight to Electricity". '
            'The title "Solar Power" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLEAN ENERGY PHOTOVOLTAIC PHYSICS DAYLIGHT STYLE: A dazzling, sun-drenched rooftop solar installation under clear blue skies. '
            'In the center foreground, a high-efficiency monocrystalline solar panel glistening with iridescent blue reflections under brilliant direct sunbeams. '
            'A cutaway technical diagram revealing the semiconductor silicon p-n junction, showing incoming photons knocking electrons free into a glowing electric current circuit. '
            'Clean vector power meter dials, battery storage inverters, and distant city skyline in bright daylight. '
            'Palette: deep photovoltaic navy blue, electric solar gold, pure sunlight white, and sky cyan. '
            'Renewable energy, photovoltaic physics, solar engineering, sustainability, modern and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1596,
        "title": "The Earth's Moon: In Depth",
        "intent": "The Earths Moon In Depth lunar astronomy geology craters",
        "brief": (
            'Book cover design titled "The Earth\'s Moon: In Depth". '
            'The title "The Earth\'s Moon: In Depth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIGH-RESOLUTION LUNAR ASTRONOMY STYLE: A majestic, high-detail view of Earth\'s Moon in space, brilliantly illuminated by sunlight. '
            'Crisp, razor-sharp details of impact craters (Tycho with bright radiating ejecta rays, Copernicus, and crater rims casting dramatic shadows). '
            'Smooth dark basaltic lunar maria (Sea of Tranquility) contrasting with bright mountainous lunar highlands. '
            'A modern robotic lunar rover exploring dusty regolith in the foreground, with the beautiful blue-and-white marble of Earth rising gently in the distant background. '
            'Palette: lunar silver, titanium grey, deep space black, radiant solar white, and Earth marble blue. '
            'Lunar astronomy, space exploration, planetary geology, crater formation, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1597,
        "title": "The Problem Solvers",
        "intent": "The Problem Solvers engineering design process innovation",
        "brief": (
            'Book cover design titled "The Problem Solvers". '
            'The title "The Problem Solvers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT INNOVATIVE MAKER WORKSHOP & ENGINEERING DESIGN STYLE: A cheerful, brightly illuminated collaborative STEM workshop bathed in morning daylight. '
            'On a large blonde-wood design table: colorful 3D-printed prototype gears, robotic chassis components, brass calipers, and drafting compasses. '
            'Open engineering graph-paper notebooks with sketches, flowcharts of the design thinking cycle (Ask, Imagine, Plan, Create, Improve), and building blocks. '
            'Palette: bright maker orange, blueprint cyan, lime green, clean timber blond, and sunny white. '
            'Engineering design process, problem solving, innovation, hands-on science, inspiring and energetic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1598,
        "title": "Uninvited Guests",
        "intent": "Uninvited Guests biological parasites symbiosis microbiology",
        "brief": (
            'Book cover design titled "Uninvited Guests". '
            'The title "Uninvited Guests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MICROSCOPIC BIOLOGY & PARASITOLOGY DAYLIGHT STYLE: A sunlit, clean university biology laboratory with high-powered digital optical microscopes. '
            'An illuminated glass specimen slide showing microscopic protozoa, harmless dust mites, and symbiotic organisms rendered in fascinating, clean scientific detail. '
            'Educational circular magnified callouts showing life cycles, host interactions, and biological adaptations. '
            'Petri dishes with nutrient agar and precision laboratory forceps on a clean white countertop. '
            'Palette: translucent microscopic teal, amber gold, clean lab white, and cobalt blue. '
            'Parasitology, symbiosis, microscopic life, biological adaptations, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1599,
        "title": "Wetlands and Habitat Loss",
        "intent": "Wetlands and Habitat Loss marsh mangrove ecology conservation",
        "brief": (
            'Book cover design titled "Wetlands and Habitat Loss". '
            'The title "Wetlands & Habitat Loss" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR FRESHWATER WETLAND SUNNY DAYLIGHT STYLE: A radiant, sun-drenched freshwater marsh and wetland sanctuary on a clear sunny morning. '
            'In the foreground, tall green cattails, blooming purple pickerelweed, and floating lily pads on calm, sparkling water. '
            'A graceful great blue heron perched peacefully on a weathered cedar post watching fish swim in the clear wetland shallows. '
            'In the background, an elevated wooden conservation boardwalk and observation tower under a wide blue sky with sunbeams. '
            'Palette: marsh reed green, water lily violet, wetland water aquamarine, cedar wood brown, and sunny sky blue. '
            'Wetland ecology, habitat conservation, biodiversity protection, environmental science, bright and peaceful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1600,
        "title": "Why Humans Can't Live Off Sunlight",
        "intent": "Why Humans Cant Live Off Sunlight photosynthesis vs metabolism",
        "brief": (
            'Book cover design titled "Why Humans Can\'t Live Off Sunlight". '
            'The title "Why Humans Can\'t Live Off Sunlight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPARATIVE BIOENERGETICS & BIOCHEMISTRY DAYLIGHT STYLE: A bright, sunlit comparative biology and nutrition research lab. '
            'On one side, a vibrant green plant leaf cell cutaway showing emerald chloroplasts converting golden sunlight photons, CO2, and water into glucose sugars. '
            'On the other side, an energetic human nutritional metabolism chart showing calorie requirements, complex foods (whole grains, fruits, vegetables, proteins), and mitochondria energy synthesis (ATP). '
            'A laboratory beaker with glowing green chlorophyll extract catching bright sunlight on a lab bench. '
            'Palette: chlorophyll emerald green, solar gold, metabolic coral, pure sunlight white, and sky cyan. '
            'Bioenergetics, photosynthesis, human metabolism, caloric energy, engaging and educational. '
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

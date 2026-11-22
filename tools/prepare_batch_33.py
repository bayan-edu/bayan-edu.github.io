import os

books = [
    {
        "id": 2444,
        "title": "A Stitch in Time",
        "intent": "A Stitch in Time tailoring textile sewing machine craft embroidery",
        "brief": (
            'Book cover design titled "A Stitch in Time". '
            'The title "A Stitch in Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VINTAGE TEXTILE WORKSHOP DAYLIGHT STYLE: A sunlit, artisanal tailor and sewing studio on a bright morning. '
            'In the center, a classic vintage cast-iron sewing machine with ornate golden filigree resting on a polished oak workbench, '
            'with colorful wooden spools of cotton thread, a brass tape measure, tailor\'s chalk, fabric shears, and beautifully folded quilted patchwork textiles basking in warm window sunlight. '
            'Palette: textiles warm indigo, terracotta and emerald, oak desk warm honey, and sunlight bright white. '
            'Textile craft, geometry of sewing, craftsmanship, patience, warm and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2445,
        "title": "Wildlife in a City Pond",
        "intent": "Wildlife in a City Pond urban ecology mallard duck dragonflies pond",
        "brief": (
            'Book cover design titled "Wildlife in a City Pond". '
            'The title "Wildlife in a City Pond" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'URBAN WETLAND ECOLOGY DAYLIGHT STYLE: A sun-drenched freshwater pond in a green city park on a bright summer afternoon. '
            'A vibrant male mallard duck with iridescent emerald-green head feathers swimming peacefully through calm, crystal-clear water with pink blooming water lilies, '
            'while a brilliant blue dragonfly rests on a cattail reed. In the background, green willow trees and distant sunlit city buildings under a bright blue sky. '
            'Palette: pond water sparkling turquoise, duck head iridescent emerald, water lilies soft rose, and sky sunny cyan. '
            'Urban biodiversity, pond ecosystems, nature in cities, refreshing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2448,
        "title": "Sister, Sister, Why is the Sky So Blue?",
        "intent": "Why is the Sky So Blue Rayleigh scattering atmospheric physics sunlight",
        "brief": (
            'Book cover design titled "Why is the Sky So Blue?". '
            'The title "Why is the Sky So Blue?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RAYLEIGH SCATTERING OPTICS DAYLIGHT STYLE: A luminous, scientific and nature-filled daytime sky composition. '
            'Sunlight streaming down from a radiant Sun through the Earth\'s upper atmosphere, showing clean educational prism diagrams '
            'where shorter blue wavelengths of light scatter across gas molecules in every direction, filling the firmament with a magnificent azure blue, '
            'overlooking sunlit green rolling hills and a blooming wildflower field. '
            'Palette: sky rich gradient cerulean to cyan, sunlight radiant golden-white, scattering waves glowing electric blue, and meadow emerald green. '
            'Atmospheric physics, light scattering, optics, everyday scientific curiosity, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2450,
        "title": "Know Your Body Through Rhymes",
        "intent": "Know Your Body Through Rhymes human anatomy organs senses health",
        "brief": (
            'Book cover design titled "Know Your Body Through Rhymes". '
            'The title "Know Your Body Through Rhymes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FRIENDLY HUMAN ANATOMY DAYLIGHT STYLE: A cheerful, brightly illuminated science classroom workbench in daytime. '
            'Colorful, friendly wooden educational model organs: a healthy beating heart model, a model of the lungs, and an eye model, '
            'beside a stethoscope, a measuring chart, colorful fresh fruits (apples, oranges, berries), and playful musical notes floating through the sunlit air. '
            'Palette: organ models cheerful coral, sky blue and mint green, fruits bright orange and ruby, and workbench light birch. '
            'Human body awareness, health, sensory organs, playful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2455,
        "title": "The Astronomical Mystery Solvers",
        "intent": "Astronomical Mystery Solvers telescope observatory star map spectroscopy",
        "brief": (
            'Book cover design titled "The Astronomical Mystery Solvers". '
            'The title "The Astronomical Mystery Solvers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OBSERVATORY ASTRONOMY DAYLIGHT STYLE: A bright, sunlit mountaintop observatory interior overlooking alpine mountain ranges in daytime. '
            'A large brass-and-steel astronomical refractor telescope pointed upward toward the sky, surrounded by open celestial star atlases, '
            'a rotating brass armillary sphere, colorful prism spectral emission line charts of distant stars, and scientific logbooks under clear skylights. '
            'Palette: brass instruments warm gleaming gold, star charts navy and cream, spectral lines rainbow spectrum, and sky alpine cyan. '
            'Astronomy, spectroscopy, celestial navigation, scientific deduction, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2459,
        "title": "The Caterpillar Mom!",
        "intent": "The Caterpillar Mom insect metamorphosis chrysalis leaf botany butterfly",
        "brief": (
            'Book cover design titled "The Caterpillar Mom!". '
            'The title "The Caterpillar Mom!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENTOMOLOGY METAMORPHOSIS DAYLIGHT STYLE: A radiant, sunlit garden macro composition in full daylight. '
            'On a vibrant green milkweed plant, an adorable plump green-and-yellow striped caterpillar gently tending to tiny glistening golden butterfly eggs laid carefully on the underside of a leaf, '
            'alongside a jade-green chrysalis with golden dots hanging from a twig in the warm morning sun. '
            'Palette: caterpillar lime green, black and yellow stripes, chrysalis jade green and gold, garden leaves emerald, and sky sunny blue. '
            'Insect metamorphosis, life cycles, maternal care in nature, botany, charming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2462,
        "title": "Panipuri inside a Spaceship",
        "intent": "Panipuri inside Spaceship zero gravity floating spherical water food space",
        "brief": (
            'Book cover design titled "Panipuri inside a Spaceship". '
            'The title "Panipuri inside a Spaceship" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ZERO GRAVITY SPACE STATION CUISINE STYLE: Inside the bright, sunlit cupola observation module of an advanced space station. '
            'Floating freely in microgravity are crispy, golden hollow spherical panipuri puris, accompanied by shimmering, perfectly spherical droplets of spiced mint-green water '
            'hovering mid-air like floating liquid marbles, with the magnificent blue curve of planet Earth visible through the panoramic bay windows. '
            'Palette: panipuri golden-crisp brown, mint water droplets translucent emerald, space station modules high-tech silver, and Earth vibrant blue. '
            'Microgravity physics, fluid surface tension, space station life, whimsical, cultural and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2463,
        "title": "How Heavy is Air?",
        "intent": "How Heavy is Air atmospheric pressure barometer balance scales physics",
        "brief": (
            'Book cover design titled "How Heavy is Air?". '
            'The title "How Heavy is Air?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ATMOSPHERIC PRESSURE PHYSICS DAYLIGHT STYLE: A sunlit classroom physics laboratory on a clear bright day. '
            'A brass balance scale demonstrating the weight of air: one pan holds an inflated red balloon pulling down against an empty deflated balloon, '
            'beside a glass mercury barometer, an inverted cup holding water with a flat card resisting gravity (atmospheric pressure demonstration), '
            'and clean diagrams of the air column pressing down on Earth. '
            'Palette: brass scales gleaming gold, balloon vivid red, lab glassware sparkling clear, and window daylight bright white. '
            'Physics of gases, atmospheric pressure, air mass, density, hands-on and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2464,
        "title": "Ira Investigates the Invisible",
        "intent": "Investigates Invisible microscope microbiology microbes protozoa diatom",
        "brief": (
            'Book cover design titled "Ira Investigates the Invisible". '
            'The title "Ira Investigates the Invisible" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MICROBIOLOGY DISCOVERY DAYLIGHT STYLE: A sun-drenched biology laboratory desk in daytime. '
            'A sleek modern optical microscope with a glowing blue LED stage illumination, looking down through a glass slide into an enlarged, glowing circle '
            'revealing the marvelous invisible world: intricate glass-shelled diatoms with geometric snowflake patterns, a green Euglena swimming with a flagellum, and paramecia. '
            'Palette: microscopic organisms radiant cyan, emerald and gold, microscope chassis metallic silver, and lab daylight clean white. '
            'Microbiology, microscopic life, cell biology, scientific curiosity, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2465,
        "title": "Reduce Waste",
        "intent": "Reduce Waste recycling circular economy compost reusable ecology",
        "brief": (
            'Book cover design titled "Reduce Waste". '
            'The title "Reduce Waste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CIRCULAR SUSTAINABILITY DAYLIGHT STYLE: A cheerful, sunlit community garden and sustainability hub in full daylight. '
            'Neatly arranged color-coded recycling and composting bins (paper, glass, compost) alongside reusable canvas tote bags, stainless steel water bottles, '
            'and rich dark organic compost nurturing healthy green tomato seedlings in clay pots under a bright sunny sky. '
            'Palette: recycling bins bright green, yellow and blue, garden plants fresh emerald, and sky cheerful cyan. '
            'Waste reduction, recycling, composting, environmental sustainability, proactive and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2466,
        "title": "Sensing the World Around Us",
        "intent": "Sensing the World Around Us five senses sight hearing touch smell taste",
        "brief": (
            'Book cover design titled "Sensing the World Around Us". '
            'The title "Sensing the World Around Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'THE FIVE SENSES NATURE DAYLIGHT STYLE: A vibrant, sun-drenched montage of sensory wonders in nature. '
            'A prism splitting sunlight into a rainbow (Sight), a tuning fork vibrating water drops with sound ripples (Hearing), '
            'a fragrant pink rose with morning dew (Smell), a ripe sliced strawberry dripping sweet juice (Taste), and a soft fluffy velvet rabbit ear and smooth river stone (Touch). '
            'Palette: rainbow spectral hues, strawberry ruby red, rose petals soft pink, and sunlight radiant warm gold. '
            'Sensory neuroscience, human biology, perception, nature exploration, rich, tactile and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2467,
        "title": "Earth's Dynamic Machine: Basics of Plate Tectonics",
        "intent": "Basics Plate Tectonics mantle convection subduction fault lines geology",
        "brief": (
            'Book cover design titled "Earth\'s Dynamic Machine: Basics of Plate Tectonics". '
            'The title "Earth\'s Dynamic Machine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLATE TECTONICS AND MANTLE CONVECTION STYLE: A dramatic educational 3D cutaway of the Earth\'s geosphere in bright clarity. '
            'Illustrating oceanic and continental tectonic plates sliding over the asthenosphere, with glowing thermal convection currents in the red-hot mantle, '
            'a mid-ocean spreading ridge erupting pillow basalt lava, and a deep-sea trench subduction zone uplifting jagged mountain volcanoes. '
            'Palette: tectonic plates granite grey and oceanic blue, mantle convection fiery orange and crimson, and oceans deep sapphire. '
            'Plate tectonics, geophysics, structural geology, Earth dynamics, powerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2468,
        "title": "Lake of Fire",
        "intent": "Lake of Fire lava lake Kilauea volcanology basalt crust magma geology",
        "brief": (
            'Book cover design titled "Lake of Fire". '
            'The title "Lake of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VOLCANIC LAVA LAKE GEOLOGY STYLE: A breathtaking daytime view into a massive volcanic caldera (like Kilauea or Nyiragongo). '
            'A dynamic, churning lake of molten orange-red basaltic lava covered by geometric plates of dark cooling crust that crack and pull apart, '
            'with glowing fountaining lava spatter bursting upward, framed by steep vertical caldera rock walls under a dramatic sky with volcanic steam plumes. '
            'Palette: molten lava radiant fiery orange and yellow, basalt crust volcanic black, and steam plumes warm golden-grey. '
            'Volcanology, geothermal energy, magma physics, geological forces, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2469,
        "title": "Malai's Mission",
        "intent": "Malais Mission Asian elephant conservation Western Ghats rainforest",
        "brief": (
            'Book cover design titled "Malai\'s Mission". '
            'The title "Malai\'s Mission" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASIAN ELEPHANT HABITAT DAYLIGHT STYLE: A sun-drenched, lush tropical rainforest corridor in the Western Ghats of India. '
            'A gentle mother Asian elephant and her playful young calf walking along a traditional migration forest path, '
            'their textured grey skin dusted with reddish soil, drinking from a clear mountain stream surrounded by bamboo groves and wild flowering ginger. '
            'Palette: elephants earthy warm grey, rainforest lush emerald and chartreuse green, stream crystal turquoise, and morning sun golden. '
            'Wildlife corridor conservation, Asian elephant ecology, biodiversity protection, touching and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2470,
        "title": "The Cells That Make Us",
        "intent": "Cells That Make Us cell biology nucleus organelles cytoplasm membrane",
        "brief": (
            'Book cover design titled "The Cells That Make Us". '
            'The title "The Cells That Make Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELL BIOLOGY MICROSCOPIC STYLE: A luminous, vibrant 3D cutaway of a living eukaryotic animal cell in brilliant clarity. '
            'Showing the central nucleus with double-helix DNA chromatin, mitochondria powerhouses, endoplasmic reticulum, Golgi apparatus, '
            'and delicate cytoskeleton filaments suspended in translucent cytoplasm surrounded by a phospholipid bilayer membrane. '
            'Palette: nucleus deep royal blue and violet, mitochondria glowing magenta, cytoplasm luminous turquoise, and ribosomes golden yellow. '
            'Cytology, cell biology, microscopic anatomy, life sciences, dazzling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2471,
        "title": "The Comeback",
        "intent": "The Comeback species recovery humpback whale ocean breaching conservation",
        "brief": (
            'Book cover design titled "The Comeback". '
            'The title "The Comeback" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARINE SPECIES RECOVERY DAYLIGHT STYLE: A triumphant open-ocean scene in brilliant morning sunshine. '
            'A massive humpback whale (Megaptera novaeangliae) breaching majestically high out of the sparkling blue sea, '
            'its long white pectoral fins extended like wings and ventral grooves glistening with sea spray under sunny skies, with a calf swimming safely beside its flukes. '
            'Palette: ocean water deep ultramarine and crystal turquoise, whale charcoal and white, and sunlit sea spray diamond white. '
            'Marine conservation success, whale recovery, ocean ecology, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2488,
        "title": "There's a Hole in my Galaxy",
        "intent": "Hole in my Galaxy supermassive black hole accretion disk gravitational lens",
        "brief": (
            'Book cover design titled "There\'s a Hole in my Galaxy". '
            'The title "There\'s a Hole in my Galaxy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUPERMASSIVE BLACK HOLE ASTROPHYSICS STYLE: A magnificent, scientifically-grounded cosmic vista of a supermassive black hole in the galactic core. '
            'A luminous, swirling accretion disk of superheated plasma in fiery golden-orange and incandescent white orbiting a central dark event horizon shadow, '
            'with relativistic jets of energetic particles blasting from the magnetic poles, creating breathtaking gravitational lensing rings of distorted background starlight. '
            'Palette: accretion disk radiant orange and gold, event horizon velvet black, relativistic jets electric blue, and cosmic starlight diamond white. '
            'Astrophysics, general relativity, black hole physics, galactic nuclei, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2489,
        "title": "The Tale of the Toilet",
        "intent": "Tale of Toilet sanitation history water plumbing wastewater treatment",
        "brief": (
            'Book cover design titled "The Tale of the Toilet". '
            'The title "The Tale of the Toilet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORY OF SANITATION AND PLUMBING DAYLIGHT STYLE: A bright, sunlit educational timeline composition of civil sanitation in daylight. '
            'Showing ancient Indus Valley clay drainage pipes and Roman terracotta aqueducts transitioning into modern sparkling porcelain plumbing, '
            's-trap water seals, and a clean, high-tech modern wastewater purification facility restoring sparkling clean water to a natural river under sunny skies. '
            'Palette: porcelain clean white, brass and copper pipes warm metallic, terracotta clay orange, and clean water crystal cyan. '
            'Public health engineering, sanitation history, civil infrastructure, clean water access, insightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2490,
        "title": "At Least I'm Okay!",
        "intent": "At Least Im Okay resilience growth mindset sunny meadow dandelion bloom",
        "brief": (
            'Book cover design titled "At Least I\'m Okay!". '
            'The title "At Least I\'m Okay!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RESILIENCE IN NATURE DAYLIGHT STYLE: A cheerful, sun-soaked meadow sidewalk crack where a resilient, bright yellow dandelion flower '
            'is flourishing proudly through a small crack in the stone pavement, its bright golden petals soaking up morning sunshine while its feathery white seeds '
            'float gracefully into the warm breeze toward green rolling hills. A friendly ladybug resting on its green leaf. '
            'Palette: dandelion flower vibrant golden yellow, sidewalk stone warm grey, meadow green, and sky sunny blue. '
            'Emotional resilience, growth mindset, optimism, nature\'s perseverance, uplifting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2492,
        "title": "CHEW CHOMP YUM! All that is good for your tum!",
        "intent": "CHEW CHOMP YUM digestion nutrition healthy food gut microbiome fruits",
        "brief": (
            'Book cover design titled "CHEW CHOMP YUM!". '
            'The title "CHEW CHOMP YUM!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NUTRITION AND DIGESTIVE HEALTH DAYLIGHT STYLE: A sunlit, bountiful kitchen and nutritional laboratory table. '
            'Bursting with vibrant, colorful gut-friendly foods: crisp green apples, orange carrots, fermented yogurt in a glass jar, '
            'whole grains, and fresh berries, alongside a clean, cheerful digestive system anatomical diagram and beneficial probiotics (lactobacillus) bacteria models. '
            'Palette: fruits and vegetables bright red, orange, and emerald, yogurt porcelain white, and table light oak in sunlight. '
            'Digestive biology, human nutrition, gut microbiome, healthy eating habits, vibrant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2493,
        "title": "Rainbows in Windows",
        "intent": "Rainbows Windows optical glass prism light dispersion spectrum sunbeams",
        "brief": (
            'Book cover design titled "Rainbows in Windows". '
            'The title "Rainbows in Windows" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OPTICAL LIGHT DISPERSION DAYLIGHT STYLE: A sun-drenched, cozy living room windowsill in early morning daylight. '
            'A faceted crystal glass suncatcher hanging in the window refracting incoming sunlight into dozens of vibrant, dancing spectral rainbows '
            'projected across a light wooden floor, white walls, and potted green ferns, with an educational ray diagram showing white light refracting into ROYGBIV colors. '
            'Palette: rainbow beams vivid spectral spectrum, crystal glass sparkling transparent, room walls soft cream, and morning sunlight golden warm. '
            'Optics physics, light refraction, rainbow science, visual wonder, enchanting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2494,
        "title": "Lungdai and the Hornbill",
        "intent": "Lungdai Hornbill Great Hornbill Buceros bicornis tropical rainforest canopy",
        "brief": (
            'Book cover design titled "Lungdai and the Hornbill". '
            'The title "Lungdai and the Hornbill" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GREAT HORNBILL TROPICAL CANOPY STYLE: A sunlit tropical canopy in Northeast India in morning sunshine. '
            'Perched majestically on a massive moss-covered rainforest branch is a magnificent Great Hornbill (Buceros bicornis), '
            'showing its colossal golden-yellow casque atop its curved beak, piercing ruby eye, and glossy black-and-white wing plumage, '
            'holding a wild jungle fig in its beak under golden sunbeams breaking through misty forest foliage. '
            'Palette: hornbill casque vivid golden yellow, plumage jet black and snowy white, rainforest canopy emerald green, and sunlight warm amber. '
            'Avian ecology, hornbill conservation, seed dispersal, tropical biodiversity, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2495,
        "title": "Don't throw away, repair!",
        "intent": "Dont throw away repair right to repair workbench tools soldering vintage",
        "brief": (
            'Book cover design titled "Don\'t throw away, repair!". '
            'The title "Don\'t throw away, repair!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIGHT TO REPAIR MAKER WORKBENCH DAYLIGHT STYLE: A sunlit maker workshop and electronics repair bench in daytime. '
            'A wooden workbench organized with precision screwdrivers, a soldering iron, a digital multimeter testing circuits, '
            'an opened vintage wooden radio being carefully restored with fresh copper wires, and neat jars of screws, washers, and wooden glue under sunny window light. '
            'Palette: workbench warm wood amber, repair tools chrome and safety yellow, electronic circuit green, and sunlight bright white. '
            'Right to repair, sustainable craftsmanship, electronics troubleshooting, circular economy, practical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2501,
        "title": "Live Pharmacy",
        "intent": "Live Pharmacy medicinal plants herbal pharmacology botany aloe vera",
        "brief": (
            'Book cover design titled "Live Pharmacy". '
            'The title "Live Pharmacy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MEDICINAL BOTANY PHARMACOLOGY DAYLIGHT STYLE: A sun-soaked botanical garden and herbal apothecary workbench in daytime. '
            'Potted living medicinal plants: fresh Aloe Vera with soothing translucent gel, blooming purple Echinacea coneflowers, '
            'fragrant peppermint, and golden turmeric rhizomes, beside an antique marble mortar and pestle with crushed healing herbs, and glass tincture vials. '
            'Palette: medicinal foliage vibrant jade and emerald green, echinacea violet, turmeric golden ochre, and marble mortar ivory. '
            'Pharmacognosy, medicinal botany, plant chemistry, natural healing, fresh and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2503,
        "title": "All the Pieces Matter",
        "intent": "All Pieces Matter ecosystem food web biodiversity keystone species",
        "brief": (
            'Book cover design titled "All the Pieces Matter". '
            'The title "All the Pieces Matter" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ECOSYSTEM WEB AND INTERCONNECTED BIODIVERSITY STYLE: A stunning visual representation of ecosystem interconnectivity. '
            'A sunlit natural landscape where every element connects through luminous, delicate golden web threads: a sunlit oak tree, '
            'a busy honeybee, a soil-enriching earthworm, a clear stream with swimming trout, and an owl watching over the woodland, illustrating how removing one piece impacts the whole. '
            'Palette: landscape emerald green and earth brown, connecting web threads radiant gold, stream water sapphire, and sky clear blue. '
            'Ecology, food webs, keystone species, ecological balance, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2504,
        "title": "A Slippery Mystery [The Riverkeepers, #3]",
        "intent": "Slippery Mystery freshwater eel Anguilla migration river stones clear water",
        "brief": (
            'Book cover design titled "A Slippery Mystery". '
            'The title "A Slippery Mystery" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVER EEL MIGRATION FRESHWATER DAYLIGHT STYLE: A crystal-clear freshwater river pool bathed in midday sunshine. '
            'A sleek, elusive freshwater eel (Anguilla) with glistening olive-bronze skin weaving smoothly around smooth riverbed pebbles and submerged mossy logs, '
            'with sunbeams creating caustic light ripples on the riverbed, accompanied by clean migration map diagrams showing their incredible oceanic journey to the Sargasso Sea. '
            'Palette: river water sparkling aquamarine and amber, eel sleek bronze-green, river stones smooth grey, and sunlight radiant gold. '
            'Freshwater biology, eel catadromous migration, river conservation, mysterious and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2506,
        "title": "The Go-Kart",
        "intent": "The Go-Kart karting mechanical engineering chassis wheels steering racetrack",
        "brief": (
            'Book cover design titled "The Go-Kart". '
            'The title "The Go-Kart" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'KARTING MECHANICAL ENGINEERING DAYLIGHT STYLE: A sunlit workshop pit lane on a bright sunny morning. '
            'In the center, a gleaming red-and-white youth racing go-kart with a welded tubular steel chassis, wide slick racing tires, '
            'a compact four-stroke engine with chrome exhaust, and a sporty steering wheel, with mechanical wrenches and tire pressure gauges resting on a tool cart. '
            'Asphalt racing track in the background under blue skies. '
            'Palette: kart chassis racing red and white, tires matte black, track asphalt charcoal, and sky sunny blue. '
            'Mechanical engineering, automotive mechanics, kart racing physics, exciting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2507,
        "title": "The Growth Factor",
        "intent": "The Growth Factor cellular growth mitosis DNA replication biology",
        "brief": (
            'Book cover design titled "The Growth Factor". '
            'The title "The Growth Factor" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOLECULAR CELL DIVISION AND GROWTH STYLE: A luminous, high-detail scientific visualization of cell division and growth factors. '
            'In the center, a cell undergoing mitotic division (mitosis) with glowing centrosomes and microtubule spindle fibers separating duplicate chromosomes, '
            'surrounded by radiant molecular models of signaling growth factor proteins binding to cell surface receptor kinases. '
            'Palette: mitotic spindle electric cyan, chromosomes magenta and violet, signaling molecules radiant gold, and background deep navy. '
            'Molecular biology, cell division, growth factors, genetics, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2508,
        "title": "The Penny Experiment",
        "intent": "The Penny Experiment copper oxidation cleaning chemistry vinegar salt",
        "brief": (
            'Book cover design titled "The Penny Experiment". '
            'The title "The Penny Experiment" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHEMISTRY SURFACE OXIDATION LAB DAYLIGHT STYLE: A sunlit school chemistry workbench on a bright day. '
            'A striking comparison of copper coins: a dull, greenish oxidized tarnished penny (copper oxide) beside a gleaming, shiny polished copper penny '
            'freshly cleaned in a small beaker of salt and vinegar solution, with bubbling effervescence and chemical formula labels (Cu, CuO, NaCl, CHâ‚ƒCOOH) '
            'written neatly on a lab notebook. '
            'Palette: shiny copper gleaming warm bronze, tarnished penny patina malachite green, lab glass sparkling clear, and daylight bright white. '
            'Chemical reactions, oxidation-reduction, metallurgy, hands-on kitchen chemistry, lively and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2509,
        "title": "Waste Woes",
        "intent": "Waste Woes plastic pollution cleanup ocean waste zero waste",
        "brief": (
            'Book cover design titled "Waste Woes". '
            'The title "Waste Woes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENVIRONMENTAL WASTE REDUCTION DAYLIGHT STYLE: An educational and inspiring daylight scene of environmental recovery. '
            'A coastal beach where discarded plastics are being gathered into sorting containers, revealing pristine golden sand dunes beneath, '
            'with clean educational circular flow arrows pointing toward eco-friendly alternatives: bamboo cutlery, glass bottles, and biodegradable packaging under bright sunny skies. '
            'Palette: beach sand golden ochre, ocean water turquoise, eco alternatives natural bamboo and sage green, and sky clear blue. '
            'Plastic pollution, waste management, circular economy, environmental action, constructive and educational. '
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

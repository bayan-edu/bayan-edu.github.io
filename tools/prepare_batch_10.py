import os

books = [
    {
        "id": 1474,
        "title": "Smart About Medicine",
        "intent": "Smart About Medicine",
        "brief": (
            'Book cover design titled "Smart About Medicine". '
            'The title "Smart About Medicine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PHARMACEUTICAL SCIENCE & SAFETY DAYLIGHT STYLE: A sunlit, clean medical laboratory and pharmacy study in bright natural daylight. '
            'In the center foreground, on a polished white research desk: amber glass apothecary medicine bottles with clean prescription labels, child-resistant safety caps, a blister pack of colorful capsules, a white marble mortar and pestle, and a medical reference handbook. '
            'Beside them, a modern digital prescription tablet and clean educational icons illustrating medical safety and following doctor instructions. '
            'Palette: amber bottle warm gold, capsule coral and teal, desk pristine white, and morning daylight ivory. '
            'Pharmacology, medicine safety, healthcare science, prescription education, clean, responsible, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1475,
        "title": "Song and Dance",
        "intent": "Song and Dance",
        "brief": (
            'Book cover design titled "Song and Dance". '
            'The title "Song and Dance" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT BIOACOUSTICS & SONGBIRD DIALECTS DAYLIGHT STYLE: A sun-dappled, picturesque forest canopy in radiant morning daylight. '
            'In the center foreground, several colorful North American songbirds (a vibrant red cardinal, an american goldfinch, and an eastern bluebird) perched on blossoming apple tree branches, their beaks parted in song. '
            'Flowing harmoniously through the air around them are luminous, stylized musical soundwave frequency spectrogram ribbons in amber and cyan, illustrating bird vocal learning. '
            'Palette: cardinal scarlet red, goldfinch lemon yellow, bluebird azure, apple blossom blush, and soundwaves radiant cyan. '
            'Ornithology, bioacoustics, bird song dialects, animal communication, melodic, cheerful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1477,
        "title": "The Amazing Migration of Sea Turtles",
        "intent": "The Amazing Migration of Sea Turtles",
        "brief": (
            'Book cover design titled "The Amazing Migration of Sea Turtles". '
            'The title "The Amazing Migration of Sea Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SEA TURTLE HATCHLING MIGRATION DAYLIGHT STYLE: A sun-drenched tropical sandy beach at dawn meeting calm turquoise ocean waves in bright daylight. '
            'In the center foreground, several tiny, adorable green sea turtle hatchlings scurrying bravely across warm golden sand toward the sparkling morning surf. '
            'In the clear turquoise water, sunlight rays guide them into the deep blue ocean current where adult sea turtles glide gracefully over coral reefs. '
            'Palette: sand warm golden ochre, ocean sparkling turquoise and sapphire, turtle shell olive and cream, and morning sun radiant gold. '
            'Marine biology, sea turtle migration, ocean survival, wildlife conservation, inspiring, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1478,
        "title": "The Brain's Stress Response: Fight, Flight, or Freeze",
        "intent": "The Brains Stress Response Fight Flight or Freeze",
        "brief": (
            'Book cover design titled "The Brain\'s Stress Response: Fight, Flight, or Freeze". '
            'The title "The Brain\'s Stress Response: Fight, Flight, or Freeze" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT NEUROBIOLOGY OF STRESS & AUTONOMIC RESPONSE DAYLIGHT STYLE: A sunlit human physiology classroom in bright natural daylight. '
            'In the center foreground, an intricate anatomical model of the human brain highlighting the amygdala, hypothalamus, and prefrontal cortex with gentle glowing light. '
            'Surrounding the model, clean educational graphics trace the autonomic nervous system pathways, adrenaline release, heart rate spikes, and pupil dilation reflex. '
            'Beside the model on a clean oak desk rest a chrome reflex hammer, a stopwatch, and an open neurology text. '
            'Palette: brain anatomical coral and lilac, neural pathway amber-gold, desk warm oak, and classroom daylight white. '
            'Neurobiology, autonomic nervous system, fight or flight, stress response, endocrinology, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1479,
        "title": "The Eastern Indigo Snake",
        "intent": "The Eastern Indigo Snake",
        "brief": (
            'Book cover design titled "The Eastern Indigo Snake". '
            'The title "The Eastern Indigo Snake" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PINE FLATWOODS HERPETOLOGY DAYLIGHT STYLE: A sunlit longleaf pine flatwoods and wiregrass savanna in Florida in radiant morning daylight. '
            'In the center foreground, a magnificent Eastern indigo snake (Drymarchon couperi) with smooth, glossy, iridescent blue-black scales glistening in direct sunlight, coiled peacefully beside a sandy gopher tortoise burrow entrance. '
            'Surrounding the snake are longleaf pine needles, native saw palmetto shrubs, and blooming yellow wiregrass flowers under a clear azure sky. '
            'Palette: indigo snake lustrous midnight-blue and iridescent violet, sand pale cream, palmetto emerald, and sky sunny cyan. '
            'Herpetology, Eastern indigo snake, reptile conservation, longleaf pine ecosystems, magnificent, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1480,
        "title": "The Eco Pyramid",
        "intent": "The Eco Pyramid",
        "brief": (
            'Book cover design titled "The Eco Pyramid". '
            'The title "The Eco Pyramid" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ECOLOGICAL TROPHIC PYRAMID DAYLIGHT STYLE: A sun-drenched, magnificent natural ecosystem featuring a 3D translucent ecological energy pyramid in bright daylight. '
            'The broad green base shows sunlit clover and prairie grass (primary producers) absorbing golden sunbeams; the middle tier shows field mice and grasshoppers (primary consumers); the next tier shows red foxes and owls; and the golden peak shows an eagle (apex predator), with clean 10% energy transfer markers. '
            'Palette: pyramid layers radiant gold, meadow emerald, sky daylight cyan, and energy arrows glowing amber. '
            'Ecology, trophic pyramid, energy transfer, food web, ecosystem dynamics, bright, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1482,
        "title": "The Ex Factors",
        "intent": "The Ex Factors",
        "brief": (
            'Book cover design titled "The Ex Factors". '
            'The title "The Ex Factors" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT EXERCISE PHYSIOLOGY & FITNESS DAYLIGHT STYLE: A sunlit athletic track and park on a glorious sunny morning in bright daylight. '
            'In the center foreground, on a clean wooden park bench: a pair of colorful modern running sneakers, a stainless steel water bottle with water droplets, a jump rope, resistance exercise bands, and a digital fitness watch displaying active heart rate metrics. '
            'In the background, a red athletic running track curves through green park lawns under a brilliant blue sky with soft white clouds. '
            'Palette: sneakers electric cyan and neon lime, track terracotta red, park grass emerald, and sky bright summer azure. '
            'Exercise physiology, cardiovascular fitness, sports science, healthy living, energetic, wholesome, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1483,
        "title": "The Fight Against Polio",
        "intent": "The Fight Against Polio",
        "brief": (
            'Book cover design titled "The Fight Against Polio". '
            'The title "The Fight Against Polio" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MEDICAL VIROLOGY & VACCINE TRIUMPH DAYLIGHT STYLE: A sunlit 1950s medical research laboratory in bright natural daylight. '
            'In the center foreground, an antique brass monocular microscope, clear glass vaccine ampoules and serum vials labeled "Polio Vaccine", a glass syringe, and sterile petri dishes on a clean white laboratory table. '
            'Beside the equipment, an open medical journal displays Jonas Salk\'s vaccine research notes and a rising immunization curve chart, illuminated by sunbeams streaming through arched laboratory windows. '
            'Palette: vaccine vials crystal clear and amber, microscope polished brass, lab table clean white, and daylight warm ivory. '
            'History of medicine, polio eradication, Jonas Salk vaccine, virology, public health triumph, dignified, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1484,
        "title": "The History of Planet Earth",
        "intent": "The History of Planet Earth",
        "brief": (
            'Book cover design titled "The History of Planet Earth". '
            'The title "The History of Planet Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GEOLOGICAL TIMESCALE OF EARTH DAYLIGHT STYLE: An awe-inspiring, sunlit geological timeline cross-section of Earth across 4.6 billion years in bright daylight. '
            'Curving gracefully through the center, a luminous geological spiral ribbon illustrating the great eons: early volcanic crust, ancient stromatolite fossils in turquoise oceans, Paleozoic trilobite and ammonite fossils, Mesozoic dinosaur footprints, and modern green continents. '
            'At the center, the radiant blue planet Earth glows under golden sunlight. '
            'Palette: geological ribbon terracotta, ochre, and slate, Earth oceans sapphire, and sunlight radiant gold. '
            'Geology, Earth history, geological timescale, paleontology, planet evolution, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1485,
        "title": "The Hydrologic Cycle",
        "intent": "The Hydrologic Cycle",
        "brief": (
            'Book cover design titled "The Hydrologic Cycle". '
            'The title "The Hydrologic Cycle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GLOBAL WATER CYCLE PANORAMA DAYLIGHT STYLE: A sun-drenched, magnificent educational landscape illustrating the continuous movement of water on Earth in bright daylight. '
            'In the center, sparkling turquoise ocean water evaporating into billowing white cumulus clouds, snow-capped alpine mountains receiving fresh snowfall, clear mountain creeks joining a wide blue river, and groundwater filtering through permeable bedrock aquifers. '
            'Clean circular educational arrows illustrate evaporation, transpiration, condensation, and precipitation under radiant sunshine. '
            'Palette: ocean and river deep blue and aqua, clouds pristine white, mountains emerald and slate, and sunbeams brilliant gold. '
            'Hydrology, water cycle, Earth-atmosphere systems, precipitation, environmental science, bright, colorful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1487,
        "title": "The Pacific Salmon's Journey",
        "intent": "The Pacific Salmons Journey",
        "brief": (
            'Book cover design titled "The Pacific Salmon\'s Journey". '
            'The title "The Pacific Salmon\'s Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PACIFIC SALMON MIGRATION DAYLIGHT STYLE: A sunlit, pristine Pacific Northwest mountain river in radiant morning daylight. '
            'In the center foreground, a magnificent adult sockeye salmon with its vibrant scarlet-red body and hooked olive-green jaw leaping powerfully upstream through churning white-water rapids and over river boulders. '
            'Surrounding the river are ancient towering Douglas fir and cedar trees, river ferns, and sunbeams sparkling through crystal-clear mountain water. '
            'Palette: salmon body brilliant scarlet red and olive green, river rapids foaming white and aqua, and forest evergreen. '
            'Ichthyology, salmon migration, freshwater ecology, anadromous fish, wildlife journey, dynamic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1488,
        "title": "Visual Processing in the Brain",
        "intent": "Visual Processing in the Brain",
        "brief": (
            'Book cover design titled "Visual Processing in the Brain". '
            'The title "Visual Processing in the Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT OPTICAL NEUROSCIENCE & VISUAL CORTEX DAYLIGHT STYLE: A sunlit human neuroscience laboratory exhibit in bright natural daylight. '
            'In the center foreground, an optical model of the human eye focusing a colorful geometric image through the cornea and lens onto the retina. '
            'Gently glowing electric-blue and amber optic nerve fibers trace backward to the primary visual cortex (V1) in a translucent anatomical brain model, illustrating edge detection, color processing, and motion perception. '
            'Palette: eye model crystal clear and white, optic nerve fibers cyan and gold, brain model coral-pink, and lab daylight white. '
            'Neuroscience, visual perception, optics, brain processing, sensory biology, crisp, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1491,
        "title": "Worldwide Loss of Bees a Growing Concern",
        "intent": "Worldwide Loss of Bees a Growing Concern",
        "brief": (
            'Book cover design titled "Worldwide Loss of Bees a Growing Concern". '
            'The title "Worldwide Loss of Bees a Growing Concern" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT APICULTURE & HONEYBEE CONSERVATION DAYLIGHT STYLE: A sun-drenched, blooming wildflower meadow in radiant golden daylight. '
            'In the center foreground, a fuzzy, golden honeybee actively foraging on a blooming purple lavender flower spike, its pollen baskets packed with bright yellow pollen grains. '
            'In the background, a traditional wooden multi-story apiary beehive box stands among blooming clover and apple orchards under a brilliant blue sky, with a golden honeycomb frame dripping with amber honey resting on a rustic table. '
            'Palette: honeybee fuzzy gold and black, lavender purple, clover green, honeycomb amber gold, and sky sunny cyan. '
            'Apiculture, bee conservation, pollination ecology, biodiversity loss, environmental awareness, bright, wholesome, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1492,
        "title": "Mangalyaan: A Journey to Mars",
        "intent": "Mangalyaan A Journey to Mars",
        "brief": (
            'Book cover design titled "Mangalyaan: A Journey to Mars". '
            'The title "Mangalyaan: A Journey to Mars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MARS ORBITER MISSION (MOM) DAYLIGHT STYLE: An awe-inspiring, sun-illuminated space encounter in brilliant cosmic daylight. '
            'In the center foreground, the Indian Space Research Organisation (ISRO) Mangalyaan spacecraft with its golden Kapton thermal foil body, extended solar panel wings, and large high-gain parabolic antenna in sharp detail. '
            'Below the orbiter, the rust-red, cratered surface of Mars displays the towering volcano Olympus Mons and Valles Marineris canyon under the warm light of the golden Sun. '
            'Palette: spacecraft gold foil and solar blue, Mars surface rust terracotta and ochre, and cosmic space deep indigo with solar flare. '
            'Space exploration, Mars Orbiter Mission, ISRO Mangalyaan, interplanetary science, inspiring, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1493,
        "title": "A Tree's Heart",
        "intent": "A Trees Heart",
        "brief": (
            'Book cover design titled "A Tree\'s Heart". '
            'The title "A Tree\'s Heart" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DENDROLOGY & TREE RING CHRONOLOGY DAYLIGHT STYLE: A sunlit, peaceful woodland clearing in radiant morning daylight. '
            'In the center foreground, a polished cross-section of a magnificent ancient oak tree trunk, clearly displaying concentric annual growth rings, heartwood, sapwood, and cambium layers. '
            'Around the stump, fresh green oak seedlings sprout from fertile soil, acorns rest among fallen leaves, and sunbeams filter through a lush emerald forest canopy under a clear sky. '
            'Palette: tree ring heartwood rich amber and warm umber, seedlings fresh lime green, forest canopy deep emerald, and sunlight golden. '
            'Dendrology, tree growth rings, botany, forest ecology, life cycles of trees, wholesome, peaceful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1494,
        "title": "Monumental Maths",
        "intent": "Monumental Maths",
        "brief": (
            'Book cover design titled "Monumental Maths". '
            'The title "Monumental Maths" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ANCIENT EGYPTIAN GEOMETRY & PYRAMID MATH DAYLIGHT STYLE: A sun-drenched architectural drafting table overlooking the Pyramids of Giza in bright morning daylight. '
            'In the center foreground, ancient Egyptian royal cubit measuring rods made of polished wood, brass drafting divider calipers, and papyrus scrolls showing geometric calculations, golden ratio spirals, and right-triangle slope diagrams (seked). '
            'Through sunny windows, the majestic Great Pyramid of Giza rises proudly against a cloudless turquoise sky. '
            'Palette: papyrus parchment warm gold, brass calipers polished gold, pyramid limestone cream, and desert sky turquoise cyan. '
            'Ancient mathematics, Egyptian geometry, pyramid construction, architectural history, fascinating, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1495,
        "title": "Chasing the Rain",
        "intent": "Chasing the Rain",
        "brief": (
            'Book cover design titled "Chasing the Rain". '
            'The title "Chasing the Rain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MONSOON ARRIVAL & EMERALD FIELDS DAYLIGHT STYLE: A breathtaking, sun-illuminated Indian countryside landscape during the dramatic arrival of the southwest monsoon. '
            'In the center, dramatic billowing monsoon rainclouds releasing curtains of refreshing rain, while radiant sunbeams break through the cloud edges to illuminate vibrant emerald terraced rice paddies. '
            'In the foreground, a peacock with glistening azure and emerald tail feathers perched on a weathered stone ledge catching fresh raindrops. '
            'Palette: rice paddy vivid emerald green, raincloud deep slate and silver, peacock sapphire and jade, and sunbeam radiant gold. '
            'Monsoon meteorology, seasonal climate, agriculture, water of life, India seasons, dynamic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1498,
        "title": "Animals of the Tropical Rainforest",
        "intent": "Animals of the Tropical Rainforest",
        "brief": (
            'Book cover design titled "Animals of the Tropical Rainforest". '
            'The title "Animals of the Tropical Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL RAINFOREST BIODIVERSITY DAYLIGHT STYLE: A sun-drenched, spectacularly rich tropical rainforest canopy in radiant bright daylight. '
            'In the center foreground, a magnificent emerald green tree python coiled peacefully on a mossy liana branch, beside a brilliant blue poison dart frog perched on a blooming pink bromeliad, and an iridescent blue morpho butterfly resting on wild orchids. '
            'Sunbeams pierce through the multi-layered jungle canopy, illuminating tropical birds flying in the distance under a clear blue sky. '
            'Palette: snake metallic emerald, poison frog electric azure, bromeliad fuchsia, and canopy lush tropical jade green. '
            'Tropical ecology, rainforest biodiversity, exotic animals, wildlife exploration, colorful, magnificent, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1499,
        "title": "Copernicus: Forming a Radical New Theory",
        "intent": "Copernicus Forming a Radical New Theory",
        "brief": (
            'Book cover design titled "Copernicus: Forming a Radical New Theory". '
            'The title "Copernicus: Forming a Radical New Theory" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RENAISSANCE HELIOCENTRIC ASTRONOMY DAYLIGHT STYLE: A sunlit Renaissance astronomer\'s observatory study in Frombork in bright morning natural daylight. '
            'In the center foreground, on a heavy oak scholar\'s desk: an ornate brass armillary sphere with concentric planetary rings, an antique brass astrolabe, and a quill pen beside an open Latin manuscript showing the Sun fixed proudly at the center of circular planetary orbits. '
            'Through arched stone windows, the morning Sun shines brightly in a clear blue sky. '
            'Palette: armillary sphere polished brass gold, manuscript aged vellum, desk dark oak, and daylight bright ivory. '
            'History of astronomy, Nicolaus Copernicus, heliocentric solar system, scientific revolution, classic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1501,
        "title": "Slow and Steady",
        "intent": "Slow and Steady",
        "brief": (
            'Book cover design titled "Slow and Steady". '
            'The title "Slow and Steady" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PLATE TECTONICS & MOUNTAIN BUILDING DAYLIGHT STYLE: A sunlit, magnificent geological landscape and cross-section in bright daylight. '
            'In the center foreground, a detailed 3D cutaway showing the slow convergence of continental tectonic plates: the subduction of oceanic lithosphere into the mantle, volcanic magma chambers, and the slow uplift of towering jagged snow-capped alpine mountains. '
            'In the background, a crystal-clear blue alpine lake reflects the sunny mountain peaks under a cloudless azure sky. '
            'Palette: mountain snow diamond white and granite gray, subduction magma glowing orange, lake turquoise, and sky brilliant cyan. '
            'Plate tectonics, continental drift, mountain building, orogeny, Earth science, majestic, bright, educational, completely daylight. '
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

import os

books = [
    {
        "id": 1281,
        "title": "New Help for an Old Mammal",
        "intent": "New Help for an Old Mammal",
        "brief": (
            'Book cover design titled "New Help for an Old Mammal". '
            'The title "New Help for an Old Mammal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT HAWAIIAN COASTAL CONSERVATION DAYLIGHT STYLE: A sun-drenched, pristine tropical beach in the Hawaiian islands in radiant bright daylight. '
            'In the center foreground, a gentle, sleek Hawaiian monk seal resting peacefully on warm golden sands, its glossy coat catching sunlight. '
            'Gently lapping turquoise ocean waves, vibrant green coastal naupaka shrubs, black lava rock outcrops, and a clean wooden marine sanctuary conservation sign. '
            'Palette: ocean sparkling turquoise, beach golden sand, seal sleek warm gray, vegetation emerald, and radiant sunbeam gold. '
            'Marine biology, endangered species conservation, Hawaiian monk seal, ocean stewardship, bright, peaceful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1282,
        "title": "Peregrine Falcon",
        "intent": "Peregrine Falcon",
        "brief": (
            'Book cover design titled "Peregrine Falcon". '
            'The title "Peregrine Falcon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MOUNTAIN CLIFF ORNITHOLOGY DAYLIGHT STYLE: A breathtaking, sun-illuminated mountain cliff aerie high in the sky in bright morning daylight. '
            'In the center foreground, a majestic adult peregrine falcon perched proudly on a rugged granite rock ledge, showing its sharp curved beak, keen yellow-ringed dark eyes, barred chest plumage, and powerful aerodynamic wings. '
            'In the vast background, sweeping green valleys and winding blue rivers stretch to the horizon under a clear azure sky. '
            'Palette: falcon slate blue, barred cream, and eye-ring yellow, granite stone gray, valley lush green, and sky crisp cyan. '
            'Ornithology, birds of prey, peregrine falcon, aerial speed, wildlife ecology, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1283,
        "title": "Planting Pet Trees",
        "intent": "Planting Pet Trees",
        "brief": (
            'Book cover design titled "Planting Pet Trees". '
            'The title "Planting Pet Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT URBAN COMMUNITY ARBORICULTURE DAYLIGHT STYLE: A sunlit, cheerful rooftop greenhouse and garden nursery in bright morning daylight. '
            'In the center foreground, rows of healthy young tree saplings growing in biodegradable terracotta pots, each carefully labeled with wooden chalkboard name tags. '
            'Surrounding the saplings are bags of rich dark organic potting soil, a polished green metal watering can, wooden hand trowels, and sprouting oak and maple leaves. '
            'In the background, a sunny city skyline under a brilliant blue sky with soft white clouds. '
            'Palette: sapling fresh leaf green, terracotta warm clay, soil rich loam brown, watering can forest green, and sky summer azure. '
            'Urban forestry, tree planting, environmental education, plant biology, bright, cheerful, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1284,
        "title": "Protecting Endangered Birds… with Alligators!",
        "intent": "Protecting Endangered Birds with Alligators",
        "brief": (
            'Book cover design titled "Protecting Endangered Birds… with Alligators!". '
            'The title "Protecting Endangered Birds… with Alligators!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUBTROPICAL WETLAND ECOLOGY DAYLIGHT STYLE: A sun-drenched Florida wetland lagoon on a glorious clear day in bright daylight. '
            'In the center foreground, a majestic American alligator resting calmly on a sunny mudbank among green marsh grasses and mangrove roots. '
            'Directly above in the safe canopy of the mangrove branches, elegant snowy egrets with brilliant white plumage and yellow plumes tend to their nests in safety above the water. '
            'Sunlight sparkles on the shallow waters with blooming water lilies and wetland reeds. '
            'Palette: snowy egret pure white and yellow plume, alligator textured olive and slate, marsh lush reed green, and water sunlit amber-blue. '
            'Wetland ecology, wildlife symbiosis, bird conservation, Florida Everglades, bright, fascinating, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1285,
        "title": "Saving Frogs Using DNA",
        "intent": "Saving Frogs Using DNA",
        "brief": (
            'Book cover design titled "Saving Frogs Using DNA". '
            'The title "Saving Frogs Using DNA" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CONSERVATION GENETICS DAYLIGHT STYLE: A sunlit, pristine mountain forest stream in bright daylight. '
            'In the center foreground, an open waterproof scientific field sampling case containing environmental DNA (eDNA) collection test tubes with clear water samples, micropipettes, and clean genetic barcode charts. '
            'Beside the case on a mossy boulder, a vibrant yellow-legged mountain frog sits peacefully beside crystal-clear rippling creek water. '
            'A subtle, glowing double-helix DNA graphic arches cleanly across the background foliage in bright daylight. '
            'Palette: frog olive and sunshine yellow, eDNA tube crystal cyan, field case safety orange, and stream moss emerald. '
            'Conservation genetics, amphibian ecology, eDNA technology, wildlife protection, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1286,
        "title": "Space Centers Across the U.S.A.",
        "intent": "Space Centers Across the U.S.A.",
        "brief": (
            'Book cover design titled "Space Centers Across the U.S.A.". '
            'The title "Space Centers Across the U.S.A." must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AEROSPACE LAUNCH FACILITIES DAYLIGHT STYLE: A sunlit, panoramic architectural view of NASA space launch complexes under a clear azure sky in full daylight. '
            'In the center foreground, the colossal Vehicle Assembly Building (VAB) with its iconic giant American flag and NASA insignia, flanked by massive crawler-transporters and towering steel rocket launch gantries. '
            'In the surrounding grounds, gleaming white parabolic satellite tracking dishes and rocket displays gleam under bright Florida sunshine. '
            'Palette: launch facility concrete white and industrial steel, flag vibrant red white and blue, crawler bronze, and sky brilliant cyan. '
            'Space exploration, NASA space centers, rocket launch complexes, aerospace history, bright, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1287,
        "title": "Studying Soil: Why is Dirt Important?",
        "intent": "Studying Soil: Why is Dirt Important?",
        "brief": (
            'Book cover design titled "Studying Soil: Why is Dirt Important?". '
            'The title "Studying Soil: Why is Dirt Important?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PEDOLOGY & SOIL HORIZONS DAYLIGHT STYLE: A sun-drenched, fascinating geological and biological cutaway cross-section of living soil in bright daylight. '
            'In the center, stratified soil layers: rich dark organic humus at the surface with sprouting green seedlings and branching root networks, down to mineral subsoil and parent bedrock. '
            'Beside the cross-section rest soil scientist tools: a stainless steel soil sampling core probe, magnifying lens, a colorful soil pH colorimeter chart, and glass specimen vials. '
            'Palette: rich loam dark umber, clay ochre, seedling fresh lime green, sampling probe polished steel, and sky bright blue. '
            'Soil science, pedology, agriculture, nutrient cycle, Earth science, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1288,
        "title": "Superstars of Science",
        "intent": "Superstars of Science",
        "brief": (
            'Book cover design titled "Superstars of Science". '
            'The title "Superstars of Science" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL PRIMATOLOGY DAYLIGHT STYLE: A sun-dappled, lush African forest clearing in Gombe National Park in bright morning daylight. '
            'In the center foreground, a calm, intelligent chimpanzee seated peacefully on a moss-covered fallen log, gently examining a wild fig fruit in its hands. '
            'On a flat tree stump nearby rest a field naturalist\'s equipment: heavy-duty binoculars, an open canvas-bound field notebook filled with handwritten observations and pencil sketches of primates, and a brass pocket compass. '
            'Palette: forest canopy deep emerald and jade, chimpanzee sleek dark fur, field notebook parchment and leather brown, and morning sunlight golden. '
            'Primatology, field biology, Jane Goodall legacy, wildlife conservation, bright, respectful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1289,
        "title": "The Heat Is On",
        "intent": "The Heat Is On",
        "brief": (
            'Book cover design titled "The Heat Is On". '
            'The title "The Heat Is On" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARCTIC CLIMATOLOGY DAYLIGHT STYLE: A breathtaking, pristine Arctic landscape under crisp blue skies and brilliant arctic daylight. '
            'In the center foreground, a magnificent, healthy polar bear with thick creamy-white fur walking across a sturdy expanse of sea ice pack. '
            'Surrounding the ice are pools of crystal-clear turquoise meltwater, floating ice floes, and distant jagged snow-capped mountain peaks reflecting warm golden sunshine. '
            'Palette: sea ice diamond white and glacial turquoise, polar bear creamy white, ocean deep sapphire, and radiant arctic sunlight. '
            'Arctic ecology, polar bear habitat, climate change, glaciology, bright, magnificent, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1290,
        "title": "Tiny Terror",
        "intent": "Tiny Terror",
        "brief": (
            'Book cover design titled "Tiny Terror". '
            'The title "Tiny Terror" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TRIASSIC PALEONTOLOGY DAYLIGHT STYLE: A sunlit, dusty canyon excavation quarry in bright natural daylight. '
            'In the center foreground, a remarkably preserved fossil skeleton of the agile early Triassic predatory dinosaur Eodromaeus embedded in red sandstone rock, showing its sharp curved teeth and grasping claws. '
            'Beside the fossil are fine paleontology excavation tools: precision metal dental picks, soft horsehair dust brushes, and a scientific metric measuring scale. '
            'Palette: sandstone terracotta red and desert ochre, fossil mineral bone gray, tool steel, and clear desert sky azure. '
            'Paleontology, dinosaur evolution, fossil excavation, Triassic predators, adventurous, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1291,
        "title": "Water, Water, Everywhere!",
        "intent": "Water, Water, Everywhere!",
        "brief": (
            'Book cover design titled "Water, Water, Everywhere!". '
            'The title "Water, Water, Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GLOBAL HYDROLOGICAL CYCLE DAYLIGHT STYLE: A magnificent, sunlit landscape illustrating all forms of water on Earth in bright daylight. '
            'In the center, sweeping from snow-capped alpine mountain peaks down through rushing crystalline mountain streams into a wide winding blue river and out into a sparkling turquoise ocean. '
            'Billowing white cumulus rain clouds float in a bright azure sky with gentle educational water cycle arrows and droplets illustrating evaporation, condensation, and precipitation. '
            'Palette: ocean and river deep blue and sparkling cyan, snow mountain pure white, mountain meadow emerald green, and sunbeam gold. '
            'Hydrology, water cycle, Earth systems, freshwater resources, bright, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1293,
        "title": "An Unwelcome Newcomer",
        "intent": "An Unwelcome Newcomer",
        "brief": (
            'Book cover design titled "An Unwelcome Newcomer". '
            'The title "An Unwelcome Newcomer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT FRESHWATER ECOLOGY DAYLIGHT STYLE: A sunlit freshwater lake shore and dock in bright clear daylight. '
            'In the center foreground, a submerged wooden dock piling and freshwater stone encrusted with clusters of distinctive black-and-tan striped zebra mussels. '
            'Through the crystal-clear water, aquatic lake plants sway gently in sunlight, with an aquatic ecologist\'s sampling plankton net and glass viewing jar resting on the wooden dock above. '
            'Palette: zebra mussel zebra-striped black and cream, dock wood weathered cedar, lake water clear aqua, and sunlight warm gold. '
            'Freshwater biology, invasive species ecology, zebra mussels, aquatic stewardship, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1294,
        "title": "A Trip Upstream: River Herring Make an Important Journey",
        "intent": "A Trip Upstream: River Herring Make an Important Journey",
        "brief": (
            'Book cover design titled "A Trip Upstream: River Herring Make an Important Journey". '
            'The title "A Trip Upstream: River Herring Make an Important Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RIVER RAPIDS & FISH MIGRATION DAYLIGHT STYLE: A sunlit, sparkling freshwater river stream in spring in bright daylight. '
            'In the center foreground, a lively school of sleek, silvery river herring leaping energetically upstream through foaming white water rapids and over a concrete fish ladder. '
            'Along the riverbank, blooming wild dogwood flowers and fresh green ferns catch morning sunbeams under a clear blue sky. '
            'Palette: herring shimmering iridescent silver and olive, river rapid churning white and aqua, foliage spring emerald, and sunbeam gold. '
            'Ichthyology, fish migration, river herring, freshwater conservation, dynamic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1295,
        "title": "Ben Carson: American Neurosurgeon and Politician",
        "intent": "Ben Carson: American Neurosurgeon and Politician",
        "brief": (
            'Book cover design titled "Ben Carson: American Neurosurgeon and Politician". '
            'The title "Ben Carson: American Neurosurgeon and Politician" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MEDICAL NEUROSURGERY STUDY DAYLIGHT STYLE: A sunlit, dignified medical research study on a glorious clear day under natural daylight. '
            'In the center foreground, on a polished mahogany desk: a detailed, high-precision anatomical model of the human brain with clearly color-coded cerebral lobes, beside a classic polished stainless steel stethoscope. '
            'Arranged alongside are open vintage medical encyclopedias with neurological diagrams and a pair of surgical magnifying loupes. '
            'In the background, sun-drenched library windows look out over manicured university green lawns under a blue sky. '
            'Palette: brain anatomical coral and cream, desk polished mahogany, stethoscope stainless steel, and window daylight ivory. '
            'Neurosurgery, medical science, human brain anatomy, educational, inspiring, bright, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1296,
        "title": "Bizarre and Beautiful",
        "intent": "Bizarre and Beautiful",
        "brief": (
            'Book cover design titled "Bizarre and Beautiful". '
            'The title "Bizarre and Beautiful" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AMAZON RAINFOREST BIODIVERSITY DAYLIGHT STYLE: A sun-drenched, spectacularly diverse Amazon rainforest canopy in radiant bright daylight. '
            'In the center foreground, a magnificent toco toucan with an enormous bright orange-yellow bill perched on a flowering jungle vine, surrounded by iridescent blue morpho butterflies fluttering among vibrant pink orchids and giant green monstera leaves. '
            'Sunbeams pierce through the emerald canopy, illuminating the breathtaking richness of tropical life. '
            'Palette: toucan bill vivid saffron and black, morpho butterfly iridescent sapphire, orchid fuchsia pink, and canopy lush emerald. '
            'Tropical rainforest ecology, Amazon wildlife biodiversity, nature photography, colorful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1297,
        "title": "Brave New Zoos",
        "intent": "Brave New Zoos",
        "brief": (
            'Book cover design titled "Brave New Zoos". '
            'The title "Brave New Zoos" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MODERN CONSERVATION HABITAT DAYLIGHT STYLE: A sun-drenched, naturalistic wildlife conservation sanctuary in bright daylight. '
            'In the center foreground, an open-concept savannah habitat with native acacia trees, a sparkling watering hole, and educational interpretive signs explaining wildlife breeding and habitat protection. '
            'In the distance across the grassy plain, tall graceful giraffes browse peacefully under a wide open blue sky with wispy clouds. '
            'Palette: savannah golden grassland, acacia canopy deep green, giraffe warm sienna and cream, and sky sunny cyan. '
            'Zoological conservation, animal welfare, habitat restoration, wildlife protection, bright, spacious, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1298,
        "title": "Butterfly Anatomy",
        "intent": "Butterfly Anatomy",
        "brief": (
            'Book cover design titled "Butterfly Anatomy". '
            'The title "Butterfly Anatomy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT LEPIDOPTERA ANATOMY DAYLIGHT STYLE: A stunning, sunlit macro educational view of butterfly morphology in bright morning daylight. '
            'In the center foreground, a magnificent monarch butterfly perched on an orange milkweed blossom with its wings spread wide, revealing its intricate black-veined orange wings. '
            'A clean, beautiful graphic callout reveals microscopic magnified views of the iridescent tiled scales, compound eyes, antennae, and coiled proboscis, with clean educational pointers. '
            'Palette: monarch wing vibrant orange and velvet black, milkweed coral, scale iridescence gold, and background soft meadow green. '
            'Entomology, butterfly anatomy, lepidoptera scales, insect biology, bright, crisp, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1299,
        "title": "California",
        "intent": "California",
        "brief": (
            'Book cover design titled "California". '
            'The title "California" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CALIFORNIA LANDSCAPE & NATURE DAYLIGHT STYLE: A breathtaking, iconic panorama of California natural geography under brilliant golden sunshine in full daylight. '
            'In the center foreground, towering coastal redwood trees rising majestically toward a clear blue sky, flanked by golden sunlit rolling hills carpeted in vibrant orange California poppies. '
            'In the background, the rugged Pacific coastline meets sparkling turquoise ocean waves with misty sunbeams. '
            'Palette: California poppy brilliant golden orange, redwood bark rich terra-cotta, foliage deep evergreen, and Pacific ocean sapphire blue. '
            'California geography, natural landmarks, coastal redwoods, state flowers, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1300,
        "title": "Can Imitating Be Life-Saving?",
        "intent": "Can Imitating Be Life-Saving?",
        "brief": (
            'Book cover design titled "Can Imitating Be Life-Saving?". '
            'The title "Can Imitating Be Life-Saving?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT BIOMIMICRY & BIO-INSPIRED ENGINEERING DAYLIGHT STYLE: A sunlit innovation laboratory workbench bathed in bright natural daylight. '
            'In the center foreground, a direct visual comparison between nature and engineering: a fresh green lotus leaf with crystal-clear water droplets beading into perfect spheres (the lotus effect) alongside an advanced waterproof synthetic fabric sample. '
            'Beside it, prickly burdock seed burrs resting beside hook-and-loop fasteners, and clean educational engineering diagrams connecting natural structures to modern technology. '
            'Palette: lotus leaf fresh jade green, water droplet crystal clear, synthetic fabric technical cyan, and workbench warm beech wood. '
            'Biomimicry, bio-inspired engineering, material science, nature innovation, bright, smart, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1301,
        "title": "Climbing Space",
        "intent": "Climbing Space",
        "brief": (
            'Book cover design titled "Climbing Space". '
            'The title "Climbing Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT APOLLO SATURN V LAUNCHPAD DAYLIGHT STYLE: An awe-inspiring, sun-drenched view of Launch Complex 39A on a glorious Florida morning in bright daylight. '
            'In the center foreground, the colossal Saturn V rocket standing vertically on the launchpad with its iconic red launch umbilical tower, ready to reach for the stars. '
            'Surrounding the launchpad are clean access ramps, an American flag waving proudly in the ocean breeze, and a clear azure sky illuminated by brilliant morning sunbeams. '
            'Palette: Saturn V rocket pristine white and black roll pattern, launch umbilical tower aerospace red, and sky radiant azure cyan. '
            'Space exploration, Apollo program, Saturn V rocket, JFK space speech, human ambition, bright, inspiring, educational, completely daylight. '
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

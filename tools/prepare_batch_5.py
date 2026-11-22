import os

books = [
    {
        "id": 1302,
        "title": "Fake It ‘til You Make It!",
        "intent": "Fake It til You Make It",
        "brief": (
            'Book cover design titled "Fake It ‘til You Make It!". '
            'The title "Fake It ‘til You Make It!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL SEABED MIMICRY DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical coral reef seabed in bright turquoise daylight. '
            'In the center foreground, a fascinating mimic octopus (Thaumoctopus mimicus) actively morphing its brown-and-white banded arms to simulate the venomous spines of a lionfish over rippled golden seabed sand. '
            'Surrounding it are colorful brain corals, sea anemones, and sparkling rays of sunshine penetrating the pristine ocean water. '
            'Palette: octopus banded chestnut and cream, ocean sparkling turquoise, coral coral-pink, and sand sunny gold. '
            'Marine biology, animal mimicry, camouflage, cephalopod intelligence, bright, fascinating, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1303,
        "title": "From the Earth to Outer Space",
        "intent": "From the Earth to Outer Space",
        "brief": (
            'Book cover design titled "From the Earth to Outer Space". '
            'The title "From the Earth to Outer Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AEROSPACE HISTORY DAYLIGHT STYLE: A sunlit, inspiring aerospace engineering study overlooking a rocket launchpad on a clear sunny morning. '
            'In the center foreground, an antique brass telescope, an illuminated desk globe with orbital trajectory lines, and rolled-up aerospace blueprints of early launch vehicles on a wooden drafting table. '
            'Through panoramic glass windows, a sleek multi-stage rocket stands tall on its seaside launchpad under a brilliant azure sky. '
            'Palette: rocket clean white and chrome, telescope brass gold, blueprint cyan blue, and sky brilliant daylight azure. '
            'Space exploration history, rocket engineering, orbital physics, bright, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1304,
        "title": "Fuels of the Future",
        "intent": "Fuels of the Future",
        "brief": (
            'Book cover design titled "Fuels of the Future". '
            'The title "Fuels of the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CLEAN ENERGY & BIOFUELS DAYLIGHT STYLE: A sunlit, high-tech renewable energy laboratory workbench bathed in bright natural daylight. '
            'In the center foreground, glass photobioreactor tubes containing vibrant emerald-green microalgae bubbling in sunlight, glass flasks of clear amber biofuel, and miniature solar hydrogen fuel cells. '
            'In the outdoor background through large laboratory windows, modern wind turbines and solar panel arrays cover rolling green hills under a bright blue sky. '
            'Palette: algae emerald green, biofuel amber gold, solar panel cobalt blue, and laboratory clean white. '
            'Renewable energy, biofuels, sustainability, environmental engineering, bright, forward-looking, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1305,
        "title": "Genetic Basis of Butterflies",
        "intent": "Genetic Basis of Butterflies",
        "brief": (
            'Book cover design titled "Genetic Basis of Butterflies". '
            'The title "Genetic Basis of Butterflies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT LEPIDOPTERAN GENETICS DAYLIGHT STYLE: A sun-drenched botanical greenhouse laboratory in bright morning daylight. '
            'In the center foreground, a vivid display of butterfly wing color diversity: an electric-blue morpho butterfly, a fiery orange monarch, and an emerald-banded swallowtail resting on blooming tropical orchids. '
            'Floating gracefully behind the specimens, a clean educational graphic of a glowing DNA double helix shows genetic loci and alleles controlling wing scale pigments and patterns. '
            'Palette: butterfly morpho sapphire, monarch orange, swallowtail emerald, orchid magenta, and greenhouse sunlight ivory. '
            'Genetics, butterfly polymorphism, evolutionary biology, DNA, bright, vibrant, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1306,
        "title": "Global Circulations",
        "intent": "Global Circulations",
        "brief": (
            'Book cover design titled "Global Circulations". '
            'The title "Global Circulations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PLANETARY ATMOSPHERE DAYLIGHT STYLE: A magnificent, sunlit view of planet Earth from orbit in bright daylight. '
            'In the center foreground, Earth\'s vibrant blue oceans, lush continents, and swirling white cloud spirals illustrating the three global atmospheric circulation cells: Hadley cells at the equator, mid-latitude Ferrel cells, and polar vortexes. '
            'Clean, elegant curved atmospheric wind arrows indicate the trade winds and jet streams circulating thermal energy around the globe. '
            'Palette: oceans deep sapphire, continents emerald and ochre, clouds brilliant white, and wind streams bright cyan and gold. '
            'Meteorology, atmospheric circulation, planetary physics, climate systems, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1307,
        "title": "Greta Thunberg Is Worried About the Future",
        "intent": "Greta Thunberg Is Worried About the Future",
        "brief": (
            'Book cover design titled "Greta Thunberg Is Worried About the Future". '
            'The title "Greta Thunberg Is Worried About the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ENVIRONMENTAL CLIMATE STEWARDSHIP DAYLIGHT STYLE: A sunlit, peaceful public park on a glorious clear day under bright daylight. '
            'In the center foreground, a sturdy wooden park bench where a hand-painted wooden sign reads "Act for the Planet" beside a potted green oak sapling ready to be planted. '
            'Surrounding the scene are clean recycling stations, rooftop solar panels in the background, and blooming native wildflower meadows under a clear azure sky. '
            'Palette: meadow emerald green, sapling fresh lime, banner natural pine wood, wildflower buttercup yellow, and sky azure cyan. '
            'Climate awareness, youth environmental movement, ecological stewardship, bright, hopeful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1308,
        "title": "How Can You Tell the Difference Between a Butterfly and a Moth?",
        "intent": "How Can You Tell the Difference Between a Butterfly and a Moth",
        "brief": (
            'Book cover design titled "How Can You Tell the Difference Between a Butterfly and a Moth?". '
            'The title "How Can You Tell the Difference Between a Butterfly and a Moth?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT COMPARATIVE ENTOMOLOGY DAYLIGHT STYLE: A sun-drenched naturalist\'s study table in bright morning daylight. '
            'In the center foreground, a clear side-by-side comparative display: on the left, a colorful swallowtail butterfly with slender clubbed antennae and wings folded upright; on the right, a magnificent luna moth with feathery antennae and plush furry body resting with wings spread flat. '
            'Between them, a brass magnifying glass highlights the distinct antennae structures with clean educational labels. '
            'Palette: butterfly swallowtail yellow and black, moth luna mint-green, magnifying glass brass gold, and study table oak brown. '
            'Entomology, comparative insect biology, butterflies vs moths, antennae morphology, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1309,
        "title": "How Do Our Brains Process Pain?",
        "intent": "How Do Our Brains Process Pain",
        "brief": (
            'Book cover design titled "How Do Our Brains Process Pain?". '
            'The title "How Do Our Brains Process Pain?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT NEUROSCIENCE & SENSORY BIOLOGY DAYLIGHT STYLE: A sunlit human physiology classroom in bright natural daylight. '
            'In the center foreground, an intricate, high-precision anatomical model of the human brain with color-coded neural regions (highlighting the sensory cortex and thalamus). '
            'Gently glowing amber and cyan neural pathway lines trace from a model sensory nerve ending on a fingertip up to the brain. '
            'Beside the model, a fresh plate of warm homemade cookies with a fabric oven mitt resting on a clean wooden table. '
            'Palette: brain anatomical coral and lilac, neural pathway amber-gold, oven mitt red, and room daylight ivory. '
            'Neurobiology, sensory perception, nervous system, pain reception, bright, friendly, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1310,
        "title": "How to Build a Pollinator Garden",
        "intent": "How to Build a Pollinator Garden",
        "brief": (
            'Book cover design titled "How to Build a Pollinator Garden". '
            'The title "How to Build a Pollinator Garden" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT POLLINATOR GARDEN HORTICULTURE DAYLIGHT STYLE: A sun-drenched, blooming backyard pollinator sanctuary in radiant spring daylight. '
            'In the center foreground, a lush garden bed bursting with native wildflowers: purple coneflowers, bright golden black-eyed Susans, and orange butterfly weed. '
            'Flitting gracefully among the flowers are monarch butterflies and busy fuzzy bumblebees, with a shallow stone butterfly puddling dish and a polished garden trowel resting in fertile soil. '
            'Palette: coneflower magenta, black-eyed Susan gold, milkweed tangerine orange, foliage fresh emerald, and sky sunny cyan. '
            'Horticulture, pollinator conservation, butterfly gardening, native plants, cheerful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1311,
        "title": "Keeping the Lions Away",
        "intent": "Keeping the Lions Away",
        "brief": (
            'Book cover design titled "Keeping the Lions Away". '
            'The title "Keeping the Lions Away" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT INVENTIVE SAVANNA CONSERVATION DAYLIGHT STYLE: A sunlit Kenyan grassland pasture near Nairobi National Park at dawn in bright daylight. '
            'In the center foreground, a traditional acacia thorn bush livestock boma fence fitted with ingenious solar-powered flickering LED strobe lights mounted on slender poles. '
            'Beside the fence, an open solar battery box, wiring tools, and solar panels catching the morning sunbeams. '
            'In the distant savanna, a pride of wild lions watches peacefully from afar under acacia trees and golden sunrise skies. '
            'Palette: savanna golden ochre, LED flash electric cyan and amber, solar panel cobalt, and sunrise warm apricot. '
            'Wildlife conservation, solar engineering, Richard Turere Lion Lights, coexistence innovation, bright, inspiring, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1312,
        "title": "Killing Fields",
        "intent": "Killing Fields",
        "brief": (
            'Book cover design titled "Killing Fields". '
            'The title "Killing Fields" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ELEPHANT CONSERVATION SANCTUARY DAYLIGHT STYLE: A sun-drenched, protected African wildlife sanctuary in bright daylight. '
            'In the center foreground, a magnificent, healthy African elephant herd walking peacefully across open golden savannah grasslands toward a sparkling watering hole. '
            'In the foreground, an anti-poaching conservation ranger vehicle with radio telemetry antennas and GPS wildlife tracking equipment, symbolizing vigilant protection of wildlife. '
            'Palette: elephant slate gray, savannah golden wheat, watering hole aqua blue, and sky brilliant daylight azure. '
            'Wildlife protection, elephant conservation, anti-poaching, biodiversity sanctuary, dignified, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1313,
        "title": "Layers of the Ocean",
        "intent": "Layers of the Ocean",
        "brief": (
            'Book cover design titled "Layers of the Ocean". '
            'The title "Layers of the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT OCEAN DEPTH ZONES CROSS-SECTION STYLE: A fascinating, beautifully detailed vertical cross-section diagram of the ocean\'s five depth zones in bright educational daylight. '
            'At the top, the sunlit Epipelagic sunlight zone with coral reefs, sea turtles, and dolphins under shimmering turquoise waves. '
            'Graduating smoothly down through the Mesopelagic twilight zone, Bathypelagic midnight zone with bioluminescent jellyfish, Abyssopelagic zone, and the Hadal trench, clearly marked with depth numbers. '
            'Palette: surface sparkling cyan, mid-depth sapphire, deep ocean indigo, and bioluminescent neon green and gold. '
            'Oceanography, marine depth zones, pelagic ecosystems, deep sea science, engaging, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1314,
        "title": "LEGO Man!",
        "intent": "LEGO Man",
        "brief": (
            'Book cover design titled "LEGO Man!". '
            'The title "LEGO Man!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TOY BRICK ARCHITECTURE WORKSHOP DAYLIGHT STYLE: A sunlit creative design studio in radiant natural daylight. '
            'In the center foreground, an awe-inspiring, intricate architectural sculpture of a majestic fantasy castle and towering skyscraper built entirely out of colorful interlocking toy building bricks. '
            'Surrounding the sculpture on a large white wooden workbench are clear sorting bins brimming with bright red, yellow, blue, and green plastic bricks, alongside technical design grid paper. '
            'Palette: toy brick primary red, sunny yellow, royal blue, forest green, and studio daylight white. '
            'Creative building, structural engineering, toy brick art, spatial design, playful, bright, cheerful, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1315,
        "title": "Lightning and Fire",
        "intent": "Lightning and Fire",
        "brief": (
            'Book cover design titled "Lightning and Fire". '
            'The title "Lightning and Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUBTROPICAL LIGHTNING & ECOLOGY DAYLIGHT STYLE: A dramatic, sun-illuminated Florida coastal pine flatwoods landscape under dynamic skies in daytime. '
            'In the center, a towering sculpted longleaf pine standing proud amidst native saw palmetto scrub, while in the sky overhead, a crisp bolt of natural lightning arcs cleanly between billowing storm clouds and a sunlit horizon. '
            'Sunbeams break through the clouds to illuminate wildflowers regenerating in the fire-adapted forest floor. '
            'Palette: lightning electric violet-white, pine bark rust red, palmetto emerald green, and storm cloud warm silver. '
            'Meteorology, lightning strikes, fire ecology, Florida natural history, dynamic, educational, bright daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1316,
        "title": "Lost and Found",
        "intent": "Lost and Found",
        "brief": (
            'Book cover design titled "Lost and Found". '
            'The title "Lost and Found" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT FOJA MOUNTAINS EXPEDITION DAYLIGHT STYLE: A sun-dappled, misty tropical cloud forest mountain peak in New Guinea in bright morning daylight. '
            'In the center foreground, a magnificent golden-fronted bowerbird\'s elaborate bower constructed of twigs on mossy ground, decorated meticulously with bright blue berries and red flower petals. '
            'Nearby rests an explorer\'s brass field compass, waterproof binoculars, and an open botanical specimen press with rare orchids. '
            'Palette: forest moss emerald, bowerbird golden saffron, berry cobalt blue, orchid magenta, and morning mist silver. '
            'Biological exploration, newly discovered species, Foja mountains expedition, biodiversity, bright, adventurous, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1317,
        "title": "Machines Get Smarter",
        "intent": "Machines Get Smarter",
        "brief": (
            'Book cover design titled "Machines Get Smarter". '
            'The title "Machines Get Smarter" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARTIFICIAL INTELLIGENCE & ROBOTICS DAYLIGHT STYLE: A sunlit, cutting-edge robotics and computer science laboratory in bright daytime. '
            'In the center foreground, a sleek, friendly robotic arm with delicate multi-jointed fingers assembling an intricate microchip circuit on a clean glass workbench. '
            'In the background, transparent holographic screens display colorful neural network node diagrams, machine learning algorithms, and optical sensor data. '
            'Palette: robot clean titanium white and brushed chrome, neural graphic cyan and amber, and laboratory sunny daylight. '
            'Artificial intelligence, robotics, machine learning, computer science, bright, forward-looking, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1318,
        "title": "Ocean Circulations",
        "intent": "Ocean Circulations",
        "brief": (
            'Book cover design titled "Ocean Circulations". '
            'The title "Ocean Circulations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT OCEANOGRAPHIC CURRENTS DAYLIGHT STYLE: A sunlit, sparkling open Pacific Ocean panorama on a glorious sunny day in bright daylight. '
            'In the center foreground, several bright yellow toy rubber ducks bobbing cheerfully on gentle ocean swells along a visible flowing ocean current drift track. '
            'Beside them, an oceanographic research surface buoy with solar panels and a satellite telemetry transmitter antenna measures current speed and salinity under a clear blue sky. '
            'Palette: rubber duck bright sunny yellow, ocean deep sapphire and sparkling cyan, buoy safety orange, and sky brilliant azure. '
            'Ocean currents, oceanography, marine hydrology, friendly cargo drift science, bright, cheerful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1319,
        "title": "Printing the Future",
        "intent": "Printing the Future",
        "brief": (
            'Book cover design titled "Printing the Future". '
            'The title "Printing the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT 3D PRINTING & ADDITIVE MANUFACTURING DAYLIGHT STYLE: A sunlit modern maker innovation lab in bright natural daylight. '
            'In the center foreground, a precision desktop 3D printer actively depositing colorful glowing filaments to fabricate an intricate geometric turbine and honeycomb structure on a heated build plate. '
            'Beside the printer rest spools of vibrant PLA filament (cyan, coral, lime), digital vernier calipers, and an open computer tablet displaying 3D CAD modeling software. '
            'Palette: 3D printer sleek black and aluminum, filament vibrant cyan and coral, and lab sunny daylight ivory. '
            'Additive manufacturing, 3D printing, CAD design, engineering innovation, bright, modern, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1320,
        "title": "Rachel Carson: Writing About the Ocean",
        "intent": "Rachel Carson: Writing About the Ocean",
        "brief": (
            'Book cover design titled "Rachel Carson: Writing About the Ocean". '
            'The title "Rachel Carson: Writing About the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT COASTAL MARINE ECOLOGY DAYLIGHT STYLE: A sun-drenched rocky Atlantic coastline and tidal pool in bright morning daylight. '
            'In the center foreground, a crystal-clear tidal pool teeming with vibrant marine life: pink sea anemones, green sea urchins, and orange starfish clinging to granite rocks. '
            'On a dry granite boulder above the tide pool rests an antique fountain pen, a glass specimen collecting jar, and an open leather-bound naturalist\'s journal with handwritten ocean notes. '
            'Palette: ocean water sparkling turquoise, tide pool anemone coral-pink, granite slate gray, and morning sunshine gold. '
            'Marine biology, ocean ecology, Rachel Carson literary legacy, tide pools, bright, poetic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1321,
        "title": "Robo Umps: Safe or Out?",
        "intent": "Robo Umps: Safe or Out",
        "brief": (
            'Book cover design titled "Robo Umps: Safe or Out?". '
            'The title "Robo Umps: Safe or Out?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SPORTS TECHNOLOGY & OPTICAL TRACKING DAYLIGHT STYLE: A sunlit major league baseball stadium home plate area on a glorious sunny afternoon. '
            'In the center foreground, clean white home plate with a genuine leather baseball and catcher\'s mitt resting on groomed red-clay dirt. '
            'Projected directly above home plate is a clean, glowing holographic 3D rectangular strike-zone tracking grid with high-speed ball trajectory tracking data arcs and high-tech optical camera sensors. '
            'Palette: baseball white and crimson stitching, clay terracotta, stadium grass emerald green, and tracking grid electric cyan. '
            'Sports analytics, optical tracking technology, automated ball-strike systems, physics of baseball, bright, dynamic, educational. '
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

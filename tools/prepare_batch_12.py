import os

books = [
    {
        "id": 1525,
        "title": "Life Story: Sarah \"Madam C.J.\" Breedlove Walker",
        "intent": "Life Story Sarah Madam CJ Breedlove Walker",
        "brief": (
            'Book cover design titled "Life Story: Sarah \\"Madam C.J.\\" Breedlove Walker". '
            'The title "Madam C.J. Walker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT EARLY-20TH-CENTURY BOTANICAL BEAUTY LABORATORY STYLE: A sunlit, inspiring apothecary and cosmetic formulation study on a bright sunny morning in natural daylight. '
            'In the center foreground, on a warm wooden workbench: vintage amber glass bottles of herbal hair tonics, decorative tin containers of scalp pomades, a white porcelain mortar and pestle with coconut oil and botanical herbs, and an ornate antique brass hair comb. '
            'Beside them, an open leather-bound business ledger with fountain pen and historic beauty formulas, illuminated by golden sunbeams. '
            'Palette: amber glass warm gold, porcelain ivory, wood mahogany, and morning daylight bright white. '
            'Historical biography, entrepreneurship, Madam C.J. Walker legacy, cosmetic chemistry, inspiring, dignified, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1526,
        "title": "Not Scared ... Prepared",
        "intent": "Not Scared Prepared",
        "brief": (
            'Book cover design titled "Not Scared ... Prepared". '
            'The title "Not Scared ... Prepared" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DISASTER PREPAREDNESS & SAFETY DAYLIGHT STYLE: A sunlit family preparedness study on a clear sunny morning in bright daylight. '
            'In the center foreground, a neatly packed red emergency preparedness supply kit, a solar-and-hand-crank emergency radio with antenna, a heavy-duty waterproof flashlight, stainless steel water canteen, and a family emergency plan checklist clipboard. '
            'Beside the kit, a clean evacuation route map and a first-aid kit under bright sunshine streaming through clean windows. '
            'Palette: emergency kit safety red, radio safety yellow and black, canteen brushed steel, and daylight bright ivory. '
            'Emergency preparedness, safety planning, disaster resilience, civil protection, reassuring, responsible, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1527,
        "title": "Plate Tectonics",
        "intent": "Plate Tectonics",
        "brief": (
            'Book cover design titled "Plate Tectonics". '
            'The title "Plate Tectonics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GEOLOGICAL PLATE BOUNDARIES & MANTLE CONVECTION STYLE: An awe-inspiring, sun-illuminated 3D geological cutaway of planet Earth in bright daylight. '
            'In the center foreground, Earth\'s lithospheric plates shown in vivid detail: divergent mid-ocean ridges venting mineral plumes, convergent subduction zones with oceanic crust sinking into the glowing orange mantle, and transform fault lines splitting continental bedrock. '
            'Clean directional arrows show the slow convection currents of semi-molten magma driving continental drift beneath blue oceans and green landmasses. '
            'Palette: mantle magma radiant orange, oceans sapphire blue, continents emerald, and tectonic boundaries glowing gold. '
            'Plate tectonics, geology, mantle convection, continental drift, Earth science, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1528,
        "title": "Precipitation",
        "intent": "Precipitation",
        "brief": (
            'Book cover design titled "Precipitation". '
            'The title "Precipitation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ATMOSPHERIC PRECIPITATION SCIENCE DAYLIGHT STYLE: A sunlit, dynamic meteorological cross-section landscape in bright daylight. '
            'In the center, high-altitude cold cloud layers showing microscopic water droplets freezing onto ice crystals and forming delicate symmetrical snowflakes, which melt into glistening liquid rain droplets as they fall through warmer air layers over green hills and pine forests. '
            'In the foreground, a professional rain gauge with graduated measurement lines sits on a wooden post among rain-kissed wildflowers under sunbeams breaking through the clouds. '
            'Palette: clouds soft silver and white, rain droplets crystal cyan, rain gauge transparent glass, and meadow emerald green. '
            'Meteorology, precipitation physics, rain snow sleet, weather science, refreshing, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1529,
        "title": "Protect Your Privacy Online",
        "intent": "Protect Your Privacy Online",
        "brief": (
            'Book cover design titled "Protect Your Privacy Online". '
            'The title "Protect Your Privacy Online" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CYBERSECURITY & DIGITAL PRIVACY DAYLIGHT STYLE: A sleek, modern technology study in bright natural daylight. '
            'In the center foreground, an open laptop displaying an elegant, glowing emerald-green digital padlock shield icon on its screen, surrounded by clean streams of encrypted data code. '
            'Beside the laptop on a clean wooden desk rest a smartphone with a physical camera privacy shutter slider, a hardware security authentication key, and a checklist of privacy settings. '
            'Palette: security shield vibrant emerald green, laptop silver and charcoal, desk natural oak, and room daylight bright white. '
            'Cybersecurity, digital privacy, online safety, encryption, internet literacy, high-tech, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1530,
        "title": "Soft Cell",
        "intent": "Soft Cell",
        "brief": (
            'Book cover design titled "Soft Cell". '
            'The title "Soft Cell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ORGANIC SOLAR CELLS & POLYMER PHOTOVOLTAICS DAYLIGHT STYLE: A sunlit clean-energy research laboratory in bright natural daylight. '
            'In the center foreground, an ultra-thin, flexible translucent plastic solar cell sheet bending gently in direct sunlight, catching bright golden sunbeams and converting light into electricity. '
            'Connected to the sheet, a precision digital multimeter cleanly displays active electrical voltage, surrounded by colorful organic polymer test tubes, chemical molecular models, and solar research notes. '
            'Palette: flexible solar cell iridescent cobalt and amber, multimeter casing safety yellow, and lab daylight bright white. '
            'Renewable energy, organic photovoltaics, solar technology, materials science, polymers, bright, forward-looking, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1531,
        "title": "Sun Burn?",
        "intent": "Sun Burn",
        "brief": (
            'Book cover design titled "Sun Burn?". '
            'The title "Sun Burn?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SOLAR IRRADIANCE & CLIMATE FORCING STYLE: A sun-illuminated astronomical and atmospheric science visualization in bright educational daylight. '
            'In the center, the blazing golden Sun casting brilliant solar radiation rays across space toward planet Earth. '
            'Surrounding Earth, a cutaway of the atmosphere reveals gentle glowing greenhouse gas molecules (carbon dioxide, methane, water vapor) trapping infrared thermal energy, with clean temperature monitoring data callouts over blue oceans and green landmasses. '
            'Palette: Sun brilliant gold and amber, Earth sapphire and emerald, greenhouse thermal glow coral, and space deep indigo. '
            'Climate science, solar radiation, greenhouse effect, global temperature, atmospheric physics, bright, objective, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1532,
        "title": "The Amazon Rainforest",
        "intent": "The Amazon Rainforest",
        "brief": (
            'Book cover design titled "The Amazon Rainforest". '
            'The title "The Amazon Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AMAZON RIVER BASIN & CANOPY PANORAMA DAYLIGHT STYLE: A breathtaking, sun-drenched aerial panorama of the Amazon River basin in radiant daylight. '
            'In the center foreground, the sweeping, wide winding curves of the Amazon River glistening like liquid turquoise through an endless sea of emerald-green jungle canopy. '
            'In the foreground canopy, towering kapok trees with giant buttress roots host blooming pink orchids and giant bromeliads, with colorful scarlet macaws gliding gracefully across the sunbeams. '
            'Palette: rainforest canopy rich jade and emerald, river glistening turquoise, macaws scarlet red and royal blue, and sky brilliant cyan. '
            'Tropical ecology, Amazon rainforest, global biodiversity, river hydrology, magnificent, vibrant, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1534,
        "title": "The Influence of the Arch",
        "intent": "The Influence of the Arch",
        "brief": (
            'Book cover design titled "The Influence of the Arch". '
            'The title "The Influence of the Arch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ROMAN ARCHITECTURAL ENGINEERING DAYLIGHT STYLE: A sunlit, magnificent Roman engineering aqueduct and bridge spanning a green river valley in bright natural daylight. '
            'In the center foreground, towering classical stone arches standing proud under a clear blue sky, with a clean architectural cutaway diagram highlighting the wedge-shaped voussoirs and central locking keystone transferring compressive weight forces smoothly to the piers. '
            'Below, a sparkling blue river flows peacefully between grassy riverbanks and Roman paved stone roads. '
            'Palette: stone masonry warm travertine cream and honey, river sparkling aqua, valley emerald green, and sky sunny cyan. '
            'Architectural history, Roman engineering, structural physics of arches, masonry construction, majestic, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1535,
        "title": "The Inner Limits",
        "intent": "The Inner Limits",
        "brief": (
            'Book cover design titled "The Inner Limits". '
            'The title "The Inner Limits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT NANOTECHNOLOGY & SEMICONDUCTOR DAYLIGHT STYLE: A sunlit, high-tech semiconductor research cleanroom in bright natural daylight. '
            'In the center foreground, a polished 300mm circular silicon wafer disc catching light to display shimmering iridescent rainbow diffraction patterns across microscopic microchip dies. '
            'Beside the wafer, an electron microscope monitor displays atomic-scale semiconductor gate lattices and transistors, surrounded by precision silicon fabrication tools. '
            'Palette: silicon wafer iridescent rainbow (cyan, magenta, gold), cleanroom titanium white, and diagnostic monitors electric blue. '
            'Nanotechnology, semiconductor physics, microprocessors, Moore\'s law, computing innovation, high-tech, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1536,
        "title": "The Most Expensive House in the Universe",
        "intent": "The Most Expensive House in the Universe",
        "brief": (
            'Book cover design titled "The Most Expensive House in the Universe". '
            'The title "The Most Expensive House in the Universe" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ISS ORBITAL HOME DAYLIGHT STYLE: An awe-inspiring, sun-illuminated view of the International Space Station flying in low Earth orbit bathed in brilliant sunlight. '
            'In the center foreground, the colossal space station showing its golden solar array wings, pressurized living modules, cupola observation dome, and docking adapters in intricate architectural detail. '
            'Below, the radiant blue curvature of planet Earth shows glittering turquoise coastlines and swirling white cloud patterns against the deep space sky. '
            'Palette: solar arrays rich amber gold, station modules titanium white, Earth sapphire and turquoise, and brilliant sun flare white. '
            'Space exploration, space station architecture, ISS, astronaut habitat, engineering marvel, bright, magnificent, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1537,
        "title": "Invasive and Nonnative Species: Harmful or Helpful?",
        "intent": "Invasive and Nonnative Species Harmful or Helpful",
        "brief": (
            'Book cover design titled "Invasive and Nonnative Species: Harmful or Helpful?". '
            'The title "Invasive and Nonnative Species: Harmful or Helpful?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT INVASIVE SPECIES ECOLOGY DAYLIGHT STYLE: A sunlit Queensland agricultural landscape in Australia in bright daylight. '
            'In the center foreground, a large, warty cane toad resting on red soil at the edge of a lush green sugarcane field. '
            'Beside the toad on a wooden fence post, an ecologist\'s field clipboard with data tables comparing native vs nonnative species impacts, a magnifying glass, and sample collection jars. '
            'Palette: cane toad textured olive and brown, sugarcane vibrant emerald, soil rich red ochre, and sky sunny cyan. '
            'Ecology, invasive species, cane toad, biodiversity impact, environmental science, objective, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1538,
        "title": "The Science Behind How Fruits Ripen",
        "intent": "The Science Behind How Fruits Ripen",
        "brief": (
            'Book cover design titled "The Science Behind How Fruits Ripen". '
            'The title "The Science Behind How Fruits Ripen" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PLANT PHYSIOLOGY & FRUIT RIPENING DAYLIGHT STYLE: A sun-drenched harvest table in an orchard in bright morning daylight. '
            'In the center foreground, a clear visual ripening progression of fruits: unripe firm green bananas and pears transitioning smoothly into golden-yellow, sweet, perfectly ripe fruit. '
            'Surrounding the fruit, glowing translucent molecular ball-and-stick models of ethylene gas (C2H4) and starch converting into fructose sugars, with an open botany notebook. '
            'Palette: unripe fruit vibrant lime green, ripe fruit golden yellow and honey, desk natural pine, and daylight warm amber. '
            'Plant biology, fruit ripening, ethylene hormone, biochemistry, agricultural science, wholesome, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1539,
        "title": "The Secrets of Viking Ships",
        "intent": "The Secrets of Viking Ships",
        "brief": (
            'Book cover design titled "The Secrets of Viking Ships". '
            'The title "The Secrets of Viking Ships" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SCANDINAVIAN FJORD & VIKING LONGSHIP DAYLIGHT STYLE: A sun-drenched Scandinavian fjord on a clear sunny morning in bright daylight. '
            'In the center foreground, an authentic wooden Viking longship (drakkar) with overlapping clinker-built oak planks, a carved spiral dragon prow, and a hoisted red-and-white striped woolen square sail resting in crystal-clear fjord waters. '
            'On a stone jetty in the foreground rest traditional iron woodworking adzes, iron ship rivets, and a crystalline calcite sunstone navigation crystal catching sunbeams. '
            'In the background, sheer granite fjord cliffs and waterfalls rise beneath a clear blue sky. '
            'Palette: longship weathered oak and pine, sail red and cream, water sparkling turquoise, and sky clear Nordic cyan. '
            'Maritime history, Viking longships, naval architecture, clinker boatbuilding, historic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1540,
        "title": "The Small but Mighty Oyster: A Keystone Species in Estuaries",
        "intent": "The Small but Mighty Oyster Keystone Species",
        "brief": (
            'Book cover design titled "The Small but Mighty Oyster: A Keystone Species in Estuaries". '
            'The title "The Small but Mighty Oyster" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT COASTAL ESTUARY & OYSTER REEF DAYLIGHT STYLE: A sunlit coastal salt marsh estuary in the Chesapeake Bay at morning low tide in bright daylight. '
            'In the center foreground, a flourishing natural oyster reef made of clustered, textured gray-and-cream oyster shells filtering brackish water into crystal-clear pools. '
            'In the water around the reef, blue crabs and minnows find sanctuary among green eelgrass, while a white snowy egret wades in shallow waters under a brilliant blue sky. '
            'Palette: oyster shell silver-gray and pearl, marsh grass vibrant emerald, water clear aqua, and sky sunny cyan. '
            'Marine biology, oyster reef restoration, keystone species, estuary ecology, water filtration, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1541,
        "title": "The Vortex",
        "intent": "The Vortex",
        "brief": (
            'Book cover design titled "The Vortex". '
            'The title "The Vortex" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT POLAR VORTEX & JET STREAM METEOROLOGY STYLE: A sunlit, dynamic satellite perspective of Earth\'s northern hemisphere in bright educational daylight. '
            'In the center, a powerful circulating polar vortex of frigid arctic air contained by a meandering, wavy jet stream wind ribbon flowing around North America and Europe. '
            'Below, snow-covered continents and deep blue oceans are bathed in crisp daylight, with clear educational temperature gradient ribbons indicating freezing cold vs temperate air masses. '
            'Palette: vortex icy diamond white and glacial cyan, jet stream ribbon electric amber, oceans deep sapphire, and land snow-dusted emerald. '
            'Meteorology, polar vortex, atmospheric jet streams, winter weather dynamics, Earth observation, dynamic, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1542,
        "title": "What Are Climate and Climate Change?",
        "intent": "What Are Climate and Climate Change",
        "brief": (
            'Book cover design titled "What Are Climate and Climate Change?". '
            'The title "What Are Climate and Climate Change?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GLOBAL CLIMATE ZONES & WEATHER SCIENCE DAYLIGHT STYLE: A sun-drenched, engaging comparative montage of Earth\'s climate zones in bright daylight. '
            'In the center, an illuminated physical desk globe displaying distinct climate bands (tropical rainforest, temperate meadow, arid desert, and polar ice sheet). '
            'Surrounding the globe on a wooden study table are polished weather instruments: an aneroid brass barometer, a classic thermometer, a rain gauge, and open climate maps illustrating decades-long weather patterns. '
            'Palette: globe oceans sapphire, tropical zones emerald, arid zones ochre, brass instruments polished gold, and room daylight ivory. '
            'Climatology, global climate zones, weather vs climate, environmental science, clear, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1543,
        "title": "What Is a Satellite?",
        "intent": "What Is a Satellite",
        "brief": (
            'Book cover design titled "What Is a Satellite?". '
            'The title "What Is a Satellite?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ORBITAL SATELLITES & CELESTIAL MECHANICS STYLE: An awe-inspiring, sun-illuminated view of space around planet Earth in brilliant daylight. '
            'In the center foreground, a modern telecommunications satellite with gold foil thermal blankets, solar panel arrays, and parabolic communication antennas pointed toward the blue Earth below. '
            'In the background, Earth\'s natural satellite—the cratered white Moon—orbits gracefully along a glowing geometric orbital trajectory line under golden sunlight. '
            'Palette: satellite gold foil and solar blue, Earth sapphire and white clouds, Moon pearl white, and space deep navy. '
            'Space technology, artificial and natural satellites, telecommunications, orbital mechanics, inspiring, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1546,
        "title": "Healthy Eating, Healthy Planet",
        "intent": "Healthy Eating Healthy Planet",
        "brief": (
            'Book cover design titled "Healthy Eating, Healthy Planet". '
            'The title "Healthy Eating, Healthy Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUSTAINABLE FOOD SYSTEMS & HARVEST DAYLIGHT STYLE: A sun-drenched, bountiful farmer\'s market harvest table in radiant morning daylight. '
            'In the center foreground, a colorful cornucopia of wholesome plant-based foods: fresh crisp rainbow Swiss chard, heirloom orange carrots, ripe red tomatoes, whole grain wheat sheaves, legumes in glass jars, and plump blueberries. '
            'Beside the harvest on a rustic wooden table rests a clean illustrated ecological footprint balance scale comparing food sustainability under a clear blue sky. '
            'Palette: vegetables vibrant rainbow (scarlet, orange, emerald, purple), table natural honey wood, and sky sunny cyan. '
            'Sustainable nutrition, food systems, environmental stewardship, agriculture, wholesome, colorful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1549,
        "title": "Antibiotics: Too Much of a Good Thing?",
        "intent": "Antibiotics Too Much of a Good Thing",
        "brief": (
            'Book cover design titled "Antibiotics: Too Much of a Good Thing?". '
            'The title "Antibiotics: Too Much of a Good Thing?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MICROBIOLOGY & ANTIBIOTIC STEWARDSHIP DAYLIGHT STYLE: A sunlit microbiology research workbench in bright natural daylight. '
            'In the center foreground, clear agar petri dishes showing lawn cultures of bacteria with distinct, clear circular zones of inhibition around paper antibiotic disks. '
            'Beside the petri dishes rest a modern optical microscope, an analytical micropipette, amber medicine bottles, and an educational infographic illustrating bacterial mutation and responsible antibiotic use. '
            'Palette: agar plates amber and mint, microscope brushed steel, and laboratory daylight clean white. '
            'Microbiology, pharmacology, antibiotic resistance, healthcare stewardship, bacteriology, crisp, bright, educational, completely daylight. '
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

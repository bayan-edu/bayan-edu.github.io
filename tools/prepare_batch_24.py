import os

books = [
    {
        "id": 1846,
        "title": "Escaping Mount Pinatubo",
        "intent": "Mount Pinatubo volcanology 1991 eruption ash column lahars",
        "brief": (
            'Book cover design titled "Escaping Mount Pinatubo". '
            'The title "Mount Pinatubo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PHILIPPINES PLINIAN VOLCANOLOGY DAYLIGHT STYLE: A sunlit, dramatic geological view of Mount Pinatubo in bright morning daylight. '
            'In the center, a colossal Plinian eruption column of white steam, expanding volcanic gases, and grey pulverized ash billowing miles into the tropical sky. '
            'In the foreground, a volcanic river valley showing gray volcanic lahar sediment flows, weathered basalt rocks, and scientific seismic monitoring equipment on a ridge. '
            'Sunbeams illuminating the towering edges of the volcanic plume in radiant gold under a clear azure sky. '
            'Palette: volcanic plume silver-grey and white, mountain forest emerald, lahar sand grey, and tropical sky blue. '
            'Volcanology, Mount Pinatubo, explosive volcanic eruptions, geological hazards, dramatic, powerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1847,
        "title": "Hard Minerals",
        "intent": "Hard Minerals Mohs scale mineralogy crystallography hardness",
        "brief": (
            'Book cover design titled "Hard Minerals". '
            'The title "Hard Minerals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOHS HARDNESS SCALE & CRYSTALLOGRAPHY DAYLIGHT STYLE: A sunlit, pristine mineralogy laboratory display on a polished oak workbench. '
            'In the center, a striking visual progression of mineral hardness specimens arranged neatly in order of Mohs scale (1 to 10): '
            'soft flaky talc, transparent gypsum, rhombohedral calcite, purple fluorite cube, green apatite, feldspar, sparkling hexagonal quartz crystal, topaz, red corundum ruby, and a brilliant raw octahedral diamond! '
            'Geological scratch-test picks, a brass balance, and a magnifying loupe catching bright natural sunlight. '
            'Palette: quartz crystal clear, fluorite violet, ruby crimson, diamond brilliant white, and velvet display navy. '
            'Mineralogy, Mohs scale of hardness, crystallography, mineral identification, geology, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1848,
        "title": "Help Eliminate Waste",
        "intent": "Eliminate Waste zero waste sustainability circular economy",
        "brief": (
            'Book cover design titled "Help Eliminate Waste". '
            'The title "Eliminate Waste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ZERO WASTE SUSTAINABLE LIVING SUNNY DAYLIGHT STYLE: A bright, sunlit modern eco-friendly kitchen and garden table in natural morning daylight. '
            'In harmonious arrangement: durable stainless-steel water bottles, reusable glass jars with bulk grains and lentils, patterned beeswax food wrap sheets, '
            'natural cotton produce bags, and bamboo dish brushes. '
            'A miniature kitchen countertop compost bin with fresh apple peels nourishing a thriving green potted basil plant on a blonde-wood table under sunny windows. '
            'Palette: stainless steel silver, glass jar clear cyan, basil leaf emerald green, beeswax gold, and sunny timber. '
            'Zero waste, waste reduction, sustainability, plastic-free living, circular economy, cheerful, modern, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1849,
        "title": "Hunters and Trappers",
        "intent": "Hunters and Trappers animal predatory strategies adaptations",
        "brief": (
            'Book cover design titled "Hunters and Trappers". '
            'The title "Hunters and Trappers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PREDATORY ADAPTATIONS & ANIMAL HUNTING TACTICS STYLE: A sunlit, fascinating natural history collage exploring diverse animal hunting adaptations in bright daylight. '
            'In the foreground, a praying mantis waiting in ambush on a blooming flower; an antlion conical sand pit trap in dry earth; '
            'an intricate dew-covered orb spider web catching morning sunbeams; and the razor-sharp talons of a barn owl landing gracefully on a fencepost. '
            'Clean educational callouts illustrating sensory detection: motion detection, vibration sensing, and visual acuity. '
            'Palette: mantis leaf green, antlion pit sand ochre, owl plumage buff and cream, and morning sunbeam gold. '
            'Predatory strategies, ambush predators, animal traps, evolutionary adaptations, zoology, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1850,
        "title": "Kalpana Chawla",
        "intent": "Kalpana Chawla aerospace engineering space shuttle Columbia",
        "brief": (
            'Book cover design titled "Kalpana Chawla". '
            'The title "Kalpana Chawla" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE ENGINEERING & SPACE EXPLORATION TRIBUTE STYLE: A sunlit aerospace engineering design studio and observatory in bright morning daylight. '
            'On a polished oak workbench: precision scale models of the Space Shuttle orbiter, wind-tunnel aerodynamic airfoil models, and computational fluid dynamics grid blueprints. '
            'An open astronautical mission flight binder, mission STS-87 and STS-107 insignia patches, and a telescope beside open sunny windows looking up into a radiant blue sky. '
            'Palette: shuttle ceramic black and white, aerospace mission navy blue, drafting parchment gold, and sky azure cyan. '
            'Aerospace engineering, Space Shuttle history, orbital mechanics, astronautics tribute, inspiring, dignified, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1852,
        "title": "Magnetic Fields and the Magnetic Compass",
        "intent": "Magnetic Fields Magnetic Compass geomagnetism navigation Faraday",
        "brief": (
            'Book cover design titled "Magnetic Fields and the Magnetic Compass". '
            'The title "Magnetic Fields & Compasses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOMAGNETISM & MARITIME NAVIGATION DAYLIGHT STYLE: A sun-drenched maritime navigation explorer desk bathed in bright morning sunlight. '
            'In the center foreground, an ornate antique brass gimbaled mariner\'s compass resting on a weathered maritime sea chart. '
            'Beside it, a 3D translucent model of Earth in space showing the geomagnetic dipole core generating magnetic field lines that wrap around the planet, '
            'deflecting solar wind particles. Fine iron filings on glass tracing invisible magnetic flux lines. '
            'Palette: polished brass gold, sea chart parchment cream, geomagnetic field line electric cyan, and oceanic navy blue. '
            'Geomagnetism, magnetic compass, maritime navigation, Earth\'s magnetic field, physics of magnetism, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1853,
        "title": "Now Hear This!",
        "intent": "Now Hear This acoustic physics hearing anatomy cochlea eardrum",
        "brief": (
            'Book cover design titled "Now Hear This!". '
            'The title "Now Hear This!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AUDITORY BIOLOGY & SOUND ACOUSTICS DAYLIGHT STYLE: A bright, sunlit acoustics and medical biology laboratory in clean morning light. '
            'In the center foreground, an accurate 3D translucent anatomical cutaway model of the mammalian ear: '
            'the external pinna, vibrating tympanic membrane (eardrum), auditory ossicles (hammer, anvil, stirrup), and the spiral cochlea with sensory hair cells. '
            'Beside it, a vibrating brass tuning fork creating visible sinusoidal ripples across a clear dish of water, and decibel frequency wave meters. '
            'Palette: cochlea translucent coral and pearl, tuning fork polished brass gold, sound wave electric cyan, and clean studio white. '
            'Human biology, auditory system, sound physics, acoustics, sensory anatomy, clear, fascinating, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1854,
        "title": "Oh No! Volcano",
        "intent": "Oh No Volcano active eruption lava fountain volcanic hazards",
        "brief": (
            'Book cover design titled "Oh No! Volcano". '
            'The title "Oh No! Volcano" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC VOLCANIC ERUPTION & LAVA FOUNTAIN STYLE: A dramatic geological landscape capturing an active volcanic eruption in bright daytime lighting. '
            'In the center, an incandescent orange-red lava fountain erupting powerfully from a volcanic cinder cone vent. '
            'Aerodynamically shaped volcanic bombs flying through the air and cooling on basaltic slopes, with rivers of glowing orange lava flowing into dark basalt fields. '
            'A volcano monitoring research drone hovering in the distance under a blue sky fringed with white volcanic steam clouds. '
            'Palette: molten lava glowing incandescent orange and red, volcanic basalt dark grey, and sky sunny cyan. '
            'Volcanology, active eruptions, lava fountains, volcanic geology, dynamic, powerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1855,
        "title": "Preparing for Volcanoes",
        "intent": "Preparing for Volcanoes hazard monitoring tiltmeters seismometers evacuation",
        "brief": (
            'Book cover design titled "Preparing for Volcanoes". '
            'The title "Preparing for Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VOLCANIC HAZARD MONITORING & EARLY WARNING DAYLIGHT STYLE: A sunlit, high-tech volcanic observatory station perched on a safe mountain ridge in bright daylight. '
            'On an outdoor field table: a digital electronic tiltmeter measuring ground deformation, an ultraviolet volcanic gas spectrometer sensor (measuring SO2 emissions), '
            'and a digital seismometer screen tracing volcanic tremor spikes. '
            'A clear regional volcanic hazard evacuation zone map with color-coded safety buffers. '
            'In the background, an active smoking stratovolcano under bright blue skies. '
            'Palette: safety caution orange, digital sensor cyan, hazard map yellow and green, and mountain sky blue. '
            'Volcanic hazard management, disaster preparedness, volcanology monitoring, early warning systems, scientific and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1856,
        "title": "Producers, Consumers, and Decomposers",
        "intent": "Producers Consumers Decomposers trophic pyramid ecology energy flow",
        "brief": (
            'Book cover design titled "Producers, Consumers, and Decomposers". '
            'The title "Producers, Consumers & Decomposers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ECOLOGICAL TROPHIC PYRAMID & FOREST CYCLE SUNNY DAYLIGHT STYLE: A sun-drenched, harmonious forest ecosystem panorama in radiant morning light. '
            'At the base: flourishing Producers (sunlit green ferns, flowering clover, and tall oak trees converting sunlight into energy). '
            'In the middle: Consumers (a gentle cottontail rabbit eating clover, and a colorful songbird catching a caterpillar). '
            'At the bottom on a mossy fallen log: vital Decomposers (bracket mushrooms, colorful coral fungi, and earthworms recycling nutrients back into fertile soil). '
            'Glowing golden nutrient cycle arrows connecting the three ecological roles. '
            'Palette: plant leaf fresh emerald, mushroom warm ochre and cream, rabbit soft buff, and radiant sunbeam gold. '
            'Ecology, trophic roles, producers, consumers, decomposers, nutrient cycle, wholesome, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1857,
        "title": "Protecting Furry Mammals of the Sea",
        "intent": "Protecting Furry Mammals Sea sea otters kelp forest conservation",
        "brief": (
            'Book cover design titled "Protecting Furry Mammals of the Sea". '
            'The title "Furry Mammals of the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PACIFIC SEA OTTER & KELP FOREST SANCTUARY STYLE: A sun-drenched, crystal-clear coastal Pacific cove in sparkling midday sunlight. '
            'In the center foreground, an adorable, healthy sea otter floating peacefully on its back wrapped loosely in golden giant kelp fronds. '
            'The otter is balancing a sea urchin on its furry chest, its dense, waterproof fur glistening in the sun with water beads. '
            'Sunbeams pierce through the emerald-and-gold kelp canopy, where schools of fish swim peacefully in the protected marine sanctuary under blue skies. '
            'Palette: otter fur warm rich brown and cream, kelp amber gold, ocean turquoise, and sunbeam radiant white. '
            'Marine mammal conservation, sea otter ecology, kelp forest ecosystems, keystone species, endearing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1858,
        "title": "Save the World",
        "intent": "Save the World planetary conservation ecological restoration biosphere",
        "brief": (
            'Book cover design titled "Save the World". '
            'The title "Save the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL ENVIRONMENTAL RESTORATION & HOPEFUL BIOSPHERE STYLE: A sunlit, breathtaking celebration of global Earth stewardship in radiant daylight. '
            'In the center, a vibrant living globe of Earth surrounded by thriving, restored ecosystems: '
            'reforested emerald rainforests, clean turquoise ocean coral reefs, modern white wind turbines on rolling hills, and rooftop solar arrays on clean cities. '
            'Soaring eagles, leaping dolphins, and blooming wildflowers framing the planet under a brilliant sunny blue sky. '
            'Palette: Earth ocean brilliant blue, forest deep emerald, solar gold, clean white, and wildflower rainbow. '
            'Environmental conservation, ecological restoration, global stewardship, sustainability, hopeful, inspiring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1859,
        "title": "The Atacama Desert",
        "intent": "The Atacama Desert hyper arid desert geology ALMA astronomy Chile",
        "brief": (
            'Book cover design titled "The Atacama Desert". '
            'The title "The Atacama Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HYPER-ARID DESERT GEOLOGY & RADIO ASTRONOMY DAYLIGHT STYLE: A sun-drenched, alien-like landscape of the Atacama Desert in Chile under brilliant, cloudless cobalt-blue skies. '
            'In the foreground, crystalline salt polygons on the vast Salar de Atacama salt flats, and dramatic wind-carved red clay geological formations in the Valley of the Moon. '
            'In the background, soaring snow-dusted Andean volcanoes (Licancabur) and precision white high-altitude ALMA radio telescope parabolic antennas pointing toward the clear sky. '
            'Palette: desert red clay terracotta, salt polygon crystal white, volcano basalt, and deep cobalt desert sky blue. '
            'Desert geomorphology, Atacama hyper-aridity, radio astronomy, ALMA observatory, Earth extremes, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1860,
        "title": "The Hawaiian Petrel",
        "intent": "Hawaiian Petrel uau pelagic seabird conservation Haleakala",
        "brief": (
            'Book cover design titled "The Hawaiian Petrel". '
            'The title "The Hawaiian Petrel" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HAWAIIAN VOLCANIC SUMMIT & PELAGIC SEABIRD STYLE: A sunlit, majestic alpine volcanic summit on Haleakala volcano in Maui, Hawaii in bright morning sunlight. '
            'In the foreground, an endangered Hawaiian Petrel (\'Ua\'u) with sleek grey-and-white plumage and black hooked bill perched near its natural volcanic cinder burrow among silver sword plants (Argyroxiphium). '
            'Below the summit, a breathtaking sea of fluffy white clouds (cloud inversion layer) stretching to the ocean horizon under a brilliant azure sky. '
            'Wildlife conservation tracking antenna and sanctuary boundary markers in clean educational style. '
            'Palette: petrel plumage slate grey and pure white, silversword frosted silver, volcanic cinder bronze, and Hawaiian sky cyan. '
            'Endangered seabird conservation, pelagic bird ecology, Hawaiian endemic fauna, Haleakala ecosystem, rare and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1863,
        "title": "Tiger Tale",
        "intent": "Tiger Tale Bengal tiger conservation big cat wildlife sanctuary",
        "brief": (
            'Book cover design titled "Tiger Tale". '
            'The title "Tiger Tale" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAJESTIC BENGAL TIGER CONSERVATION SUNNY SANCTUARY STYLE: A sun-drenched, golden grassland and sal forest clearing in an Indian national park on a bright morning. '
            'In the center foreground, a magnificent, healthy royal Bengal tiger with striking orange-and-black striped coat and white facial markings walking powerfully through tall golden grass. '
            'Sunbeams filter through leafy teak branches, illuminating water droplets on a clear forest watering hole where spotted chital deer drink peacefully in the distance. '
            'A wooden tiger conservation preserve boundary marker under a clear sunny sky. '
            'Palette: tiger coat fiery orange and lacquer black, grass golden amber, teak leaves deep green, and sunny sky blue. '
            'Big cat conservation, Bengal tiger, apex predators, Asian wildlife, tropical deciduous forest ecology, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1864,
        "title": "When Water Moves Sediments",
        "intent": "When Water Moves Sediments erosion deposition fluvial delta geomorphology",
        "brief": (
            'Book cover design titled "When Water Moves Sediments". '
            'The title "When Water Moves Sediments" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FLUVIAL GEOMORPHOLOGY & SEDIMENT TRANSPORT DAYLIGHT STYLE: A sunlit, comprehensive landscape illustrating water erosion, transport, and deposition in bright daylight. '
            'From alpine river rapids carving steep V-shaped canyons and transporting boulders, meandering through a wide alluvial floodplain, '
            'to a classic fan-shaped river delta depositing golden silt and sand into a clear blue sea. '
            'In the foreground, a geological stream table demonstration tray with sorting gravel, sand, and clay particles, with grain size measurement calipers. '
            'Palette: river water crystal turquoise, sediment sand golden buff, canyon terracotta, and sunny sky cyan. '
            'Fluvial geomorphology, erosion and deposition, sediment transport, delta formation, Earth science, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1865,
        "title": "African Wormwood: A Traditional Medicine",
        "intent": "African Wormwood Artemisia afra medicinal botany ethnopharmacology",
        "brief": (
            'Book cover design titled "African Wormwood: A Traditional Medicine". '
            'The title "African Wormwood" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ETHNOPHARMACOLOGICAL BOTANY & HERBAL STUDY DAYLIGHT STYLE: A sunlit botanical research table overlooking a South African fynbos hillside in bright morning sunlight. '
            'In the center foreground, fresh flowering sprigs of African wormwood (Artemisia afra) showing feathery, silver-green aromatic leaves and small yellow flower clusters. '
            'Beside it, a polished wooden mortar and pestle with crushed herbal leaves, a glass teapot with golden herbal infusion, and dried botanical bundles tied with twine. '
            'An open botanical field notebook with delicate scientific watercolor illustrations of Artemisia afra. '
            'Palette: wormwood foliage silver-green, flower yellow gold, wooden mortar warm walnut, and sunny fynbos sky blue. '
            'Medicinal botany, ethnopharmacology, African traditional medicine, herbal chemistry, Artemisia afra, respectful and educational. '
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

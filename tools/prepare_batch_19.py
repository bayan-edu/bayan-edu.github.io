import os

books = [
    {
        "id": 1733,
        "title": "Take Care of Our Planet",
        "intent": "Take Care of Our Planet environmental conservation earth stewardship",
        "brief": (
            'Book cover design titled "Take Care of Our Planet". '
            'The title "Take Care of Our Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT PLANETARY STEWARDSHIP & ECOSYSTEM DAYLIGHT STYLE: A sun-drenched, cheerful ecological paradise celebrating environmental care in radiant morning light. '
            'In the center, a beautiful living miniature Earth globe surrounded by lush green forests, clean cascading waterfalls, blooming wildflowers, and soaring birds. '
            'Renewable energy icons: a miniature white wind turbine, a solar panel array, and a green recycling leaf symbol integrated harmoniously around the globe. '
            'Fluffy white clouds, clear turquoise rivers, and a bright blue sky filled with warm sunshine. '
            'Palette: planet ocean blue, forest emerald green, solar gold, wildflower crimson, and clean cloud white. '
            'Environmental stewardship, sustainability, Earth care, conservation science, bright, joyful, and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1734,
        "title": "The Volcano That Keeps Erupting",
        "intent": "Volcano That Keeps Erupting Kilauea shield volcano Hawaii basalt",
        "brief": (
            'Book cover design titled "The Volcano That Keeps Erupting". '
            'The title "The Volcano That Keeps Erupting" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HAWAIIAN SHIELD VOLCANO & BASALTIC LAVA DAYLIGHT STYLE: A sunlit, breathtaking scene of Kilauea volcano on Hawaii in bright daylight. '
            'In the foreground, glowing orange-red ropes of pahoehoe basaltic lava cooling into smooth, iridescent volcanic rock. '
            'In the midground, the lava entry point into the Pacific ocean, generating billowing plumes of white steam (laze) against turquoise ocean waves. '
            'Lush green Hawaiian ohia lehua trees with red blossoms growing on older weathered volcanic rock under sunny skies. '
            'Palette: molten lava glowing orange-red, basalt black and charcoal, steam cloud pure white, ocean turquoise, and lehua red. '
            'Volcanology, shield volcanoes, Hawaiian geology, continuous eruptions, striking, majestic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1735,
        "title": "What Is a Comet?",
        "intent": "What Is a Comet cometary astronomy dirty snowball coma tail",
        "brief": (
            'Book cover design titled "What Is a Comet?". '
            'The title "What Is a Comet?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELESTIAL COMETARY ASTRONOMY & SOLAR WIND STYLE: A high-detail, scientifically grounded view of an active comet orbiting through the inner solar system, bathed in bright sunlight. '
            'In the center foreground, the irregular icy comet nucleus (dirty snowball of rock, dust, and water ice) actively venting volatile jets of gas and dust. '
            'A glowing cyan spherical coma envelope and two spectacular sweeping tails: a straight, glowing electric blue ion gas tail pointed away from the Sun, and a curved golden-white dust tail. '
            'Orbital perihelion path diagrams and planetary orbits illustrated cleanly in the background. '
            'Palette: ion tail electric cyan, dust tail golden white, nucleus dark charcoal, and deep space sapphire. '
            'Cometary science, Oort cloud and Kuiper belt, solar wind interaction, celestial astronomy, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1736,
        "title": "Where Will I Live?",
        "intent": "Where Will I Live animal habitats biomes ecology ecosystems",
        "brief": (
            'Book cover design titled "Where Will I Live?". '
            'The title "Where Will I Live?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DIVERSE EARTH BIOMES & ANIMAL HABITATS DAYLIGHT STYLE: A sun-drenched, colorful comparative collage of major planetary biomes in bright daylight. '
            'In harmonious circular segments: an icy Arctic polar tundra with a resting harp seal, a lush tropical coral reef with clownfish, '
            'a sunlit African savanna with a grazing zebra, and a temperate oak woodland with a chipmunk and acorns. '
            'Educational temperature and precipitation climatograph graphs connecting the habitats in clean graphic style. '
            'Palette: savanna gold, coral turquoise, forest emerald green, Arctic white, and sunny sky cyan. '
            'Ecology, animal habitats, biomes, adaptation to environment, cheerful, diverse, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1739,
        "title": "Compact Fluorescent Lights",
        "intent": "Compact Fluorescent Lights electrical efficiency lighting physics",
        "brief": (
            'Book cover design titled "Compact Fluorescent Lights". '
            'The title "Compact Fluorescent Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENERGY EFFICIENCY & LIGHTING TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern physics and electrical engineering laboratory. '
            'In the center foreground, a glowing spiral compact fluorescent lamp (CFL) tube emitting clean white light, mounted beside a traditional incandescent filament bulb for comparative energy efficiency. '
            'An electrical watt-meter measuring reduced power consumption (13W vs 60W), alongside a diagram of mercury gas electron excitation and white phosphor fluorescence coating. '
            'Gleaming electronic ballasts and circuit boards on a light wooden workbench. '
            'Palette: glowing fluorescent white, electric cyan, phosphor green accent, polished brass, and timber blond. '
            'Lighting physics, energy efficiency, electrical engineering, fluorescence science, clear and modern. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1740,
        "title": "Earth Science - Volcanoes",
        "intent": "Earth Science Volcanoes geology igneous rock petrology",
        "brief": (
            'Book cover design titled "Earth Science - Volcanoes". '
            'The title "Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VOLCANOLOGY & IGNEOUS PETROLOGY DAYLIGHT STYLE: A sun-drenched geological field research table overlooking an ancient volcanic caldera in bright morning sunlight. '
            'In the center foreground, fascinating volcanic rock specimens: black vitreous obsidian glass, porous floating pumice stone, and vesicular dark basalt. '
            'A geologist\'s steel rock hammer, optical hand lens loupe, and field notebook with stratigraphic sketches of tephra layers. '
            'In the background, majestic volcanic peaks under clear blue skies with wisps of geothermal fumarole steam. '
            'Palette: obsidian glossy black, pumice pale ash, basalt slate, volcanic terracotta, and sunny mountain sky blue. '
            'Earth science, volcanology, igneous petrology, geological field research, fascinating, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1742,
        "title": "How Acid Rain Affects a Food Web",
        "intent": "Acid Rain Food Web environmental chemistry pH freshwater ecology",
        "brief": (
            'Book cover design titled "How Acid Rain Affects a Food Web". '
            'The title "Acid Rain & Food Webs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENVIRONMENTAL CHEMISTRY & AQUATIC FOOD WEB DAYLIGHT STYLE: A sunlit, compelling ecological study scene on a bright clear morning. '
            'A research beaker of lake water tested with colorful pH indicator paper showing acidic levels (pH 4.5 vs neutral pH 7.0). '
            'An educational aquatic food web diagram showing how reduced pH impacts sensitive organisms: calcium shells of snails dissolving, '
            'mayfly nymph populations declining, and the resulting ripple effect on trout and osprey predators. '
            'In the background, a pristine northern lake fringed with pine trees under sunny skies. '
            'Palette: pH test strip coral red and yellow, lake water aquamarine, pine forest green, and bright sunny sky. '
            'Acid rain chemistry, pH scale, food web ecology, aquatic conservation, environmental science, informative and clear. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1744,
        "title": "Mexico's Natural Wonder: Paricutin Volcano",
        "intent": "Paricutin Volcano cinder cone geology Mexico Michoacan",
        "brief": (
            'Book cover design titled "Mexico\'s Natural Wonder: Paricutin Volcano". '
            'The title "Parícutin Volcano" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MONOGENETIC CINDER CONE VOLCANO DAYLIGHT STYLE: A sun-drenched, dramatic landscape of the iconic Parícutin cinder cone volcano in Michoacán, Mexico in bright midday sun. '
            'The remarkably symmetrical, steep dark cinder cone rising proudly from surrounding fertile cornfields and pine-forested slopes. '
            'In the foreground, fields of rugged black blocky \'a\'ā lava rock colonized by pioneering green lichens and resilient desert agave plants. '
            'In the distance, the famous half-buried historic stone church bell tower of San Juan Parangaricutiro emerging from hardened basalt under a clear turquoise sky. '
            'Palette: volcanic cinder charcoal black, cornfield golden ochre, agave blue-green, stone tower travertine, and Mexican sunny sky blue. '
            'Geology of cinder cones, Parícutin eruption history, volcanic landscapes, natural wonders of Mexico, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1746,
        "title": "Recycling & Conservation: Recycling -- How It Works",
        "intent": "Recycling How It Works materials recovery sorting process",
        "brief": (
            'Book cover design titled "Recycling & Conservation: Recycling -- How It Works". '
            'The title "How Recycling Works" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MATERIALS RECOVERY FACILITY & SORTING SCIENCE DAYLIGHT STYLE: A brightly lit, clean modern recycling recovery facility in daylight. '
            'In the center, an organized sorting conveyor system demonstrating mechanical separation: magnetic pulleys pulling steel cans, '
            'optical air-jet sensors sorting clear PET plastic bottles, and eddy current rotors bouncing aluminum cans into recycling bins. '
            'Neat stacks of sorted colored raw plastic pellets (nurdles), compressed aluminum cubes, and shredded paper ready for remanufacturing. '
            'Palette: recycling clover green, plastic bottle clear cyan, aluminum silver, and clean industrial white. '
            'Recycling technology, materials recovery, mechanical sorting, circular economy, bright, engaging, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1747,
        "title": "Recycling & Conservation: Why Recycle?",
        "intent": "Why Recycle conservation resource preservation circular economy",
        "brief": (
            'Book cover design titled "Recycling & Conservation: Why Recycle?". '
            'The title "Why Recycle?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RESOURCE PRESERVATION & CIRCULAR ECONOMY SUNNY DAYLIGHT STYLE: A sunlit, inspiring environmental contrast scene bathed in radiant natural light. '
            'On one side, conserved virgin forests and clean rivers preserved by recycling paper and materials. '
            'A clear educational comparative bar chart showing energy savings: recycling aluminum saves 95% of energy compared to mining raw bauxite ore! '
            'In the foreground, a sprouting green oak seedling growing in recycled paper mulch beside a sparkling clean reusable glass water bottle. '
            'Palette: forest emerald green, recycling arrow leaf green, water glass cyan, and sunbeam gold. '
            'Environmental conservation, energy savings, resource preservation, waste reduction, uplifting, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1748,
        "title": "Scientific Instruments",
        "intent": "Scientific Instruments laboratory optics precision measurement",
        "brief": (
            'Book cover design titled "Scientific Instruments". '
            'The title "Scientific Instruments" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSICAL & MODERN LABORATORY INSTRUMENTATION DAYLIGHT STYLE: A sunlit, beautifully equipped scientific laboratory workbench bathed in bright morning sunlight. '
            'In harmonious arrangement: a precision optical compound microscope with brass and chrome objectives, a dual-pan analytical balance scale with brass weights, '
            'a digital laser thermometer, glass hydrometers floating in graduated cylinders with colored liquids, and stainless steel vernier calipers. '
            'A glass prism on the desk refracting sunlight into a vivid rainbow spectrum across open laboratory graph notebooks. '
            'Palette: polished brass gold, optical glass cyan, rainbow spectral bands, laboratory white, and warm oak wood. '
            'Scientific instruments, measurement precision, optics, laboratory tools, scientific history, inspiring and scholarly. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1749,
        "title": "Shooting Stars",
        "intent": "Shooting Stars meteors meteorites atmospheric ablation",
        "brief": (
            'Book cover design titled "Shooting Stars". '
            'The title "Shooting Stars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOR PHYSICS & ATMOSPHERIC ABLATION STYLE: A dramatic astronomical scene capturing the entry of a meteor into Earth\'s atmosphere. '
            'In the upper atmosphere, a bright glowing streak of a meteor burning with incandescent ionization colors (emerald green and golden white). '
            'In the center foreground, on a velvet display cushion: an authentic iron-nickel meteorite specimen showing distinct fusion crust and Widmanstätten crystalline etched patterns. '
            'A magnifying loupe, celestial meteor shower radiant map, and a scale ruler beside the meteorite specimen. '
            'Palette: meteor incandescent emerald and gold, meteorite fusion crust iron black, velvet royal navy, and starlight silver. '
            'Meteor physics, atmospheric friction, meteorites, space debris, celestial science, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1750,
        "title": "Skin: The Great Protector",
        "intent": "Skin Great Protector integumentary system dermatology histology",
        "brief": (
            'Book cover design titled "Skin: The Great Protector". '
            'The title "Skin: The Great Protector" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INTEGUMENTARY SYSTEM & DERMAL HISTOLOGY DAYLIGHT STYLE: A bright, sunlit medical biology laboratory and study in clean morning light. '
            'In the center foreground, an accurate 3D translucent anatomical block model of human skin showing the three distinct protective layers: '
            'the waterproof keratinized epidermis, the vascular dermis with collagen fibers and sensory touch receptors, and the insulating subcutaneous hypodermis. '
            'Educational infographics illustrating skin defense: UV melanin protection, sweat pore thermoregulation, and waterproof lipid barriers. '
            'Palette: epidermis warm peach and sand, dermis coral pink, nerve fiber golden yellow, and clean optic white. '
            'Human anatomy, integumentary system, dermatology, barrier immunity, fascinating, respectful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1751,
        "title": "Space Vacation",
        "intent": "Space Vacation orbital space habitat future tourism cupola",
        "brief": (
            'Book cover design titled "Space Vacation". '
            'The title "Space Vacation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FUTURISTIC ORBITAL HABITAT & EARTH PANORAMA STYLE: A sunlit, breathtaking interior view from the panoramic multi-window cupola observation module of an orbital space resort. '
            'Looking out into space, the radiant, sun-illuminated curve of planet Earth with vivid turquoise oceans, golden continents, and swirling white cloud spirals in brilliant daylight. '
            'Floating in the cupola: a zero-gravity camera, a floating spherical droplet of pure water reflecting Earth, and an orbital flight route itinerary map. '
            'Palette: Earth ocean brilliant blue, cloud pure white, habitat metallic pearl silver, and solar radiant gold. '
            'Future space exploration, orbital habitats, commercial astronautics, Earth observation, wondrous, bright, and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1753,
        "title": "What's the Big Idea about Water? Living Things & Ecosystems Need Water",
        "intent": "Living Things Need Water universal solvent biology ecosystems",
        "brief": (
            'Book cover design titled "What\'s the Big Idea about Water? Living Things & Ecosystems Need Water". '
            'The title "Living Things Need Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT BIOLOGICAL WATER & ECOSYSTEM DAYLIGHT STYLE: A sun-drenched, radiant natural oasis celebrating water as the basis of all life on Earth. '
            'In the center foreground, a giant crystal-clear water droplet suspended on a vibrant green leaf, acting as a natural lens magnifying cellular cytoplasm inside. '
            'Around it, diverse thriving life nourished by water: a freshwater trout leaping in a sunlit mountain brook, a blooming lotus flower, and desert plants blooming after rain. '
            'Clean molecular diagrams of H2O showing hydrogen bonding and its role as the universal solvent of biology. '
            'Palette: water droplet crystal aquamarine, leaf emerald green, lotus petal rose, and sunlight gold. '
            'Biology of water, cellular hydration, universal solvent, ecosystems, refreshing, cheerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1754,
        "title": "What Are Electric and Magnetic Fields?",
        "intent": "Electric and Magnetic Fields electromagnetism flux lines Faraday",
        "brief": (
            'Book cover design titled "What Are Electric and Magnetic Fields?". '
            'The title "Electric & Magnetic Fields" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ELECTROMAGNETISM & FIELD LINES PHYSICS STYLE: A clean, brightly illuminated university physics demonstration bench in natural daylight. '
            'In the center foreground, a classic red-and-blue bar magnet surrounded by iron filings aligning into perfect magnetic field flux loop arcs. '
            'Beside it, a pair of charged electrodes showing electric field dipole lines (+ and -) glowing in electric cyan and magenta. '
            'A copper induction coil, a galvanometer needle deflecting to show induced electromagnetic current, and compasses pointing along field lines. '
            'Palette: magnet poles crimson red and royal blue, electric field glowing cyan, copper wire orange, and clean lab white. '
            'Electromagnetism, magnetic field lines, electric fields, Faraday induction, physics education, clear and dynamic. '
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

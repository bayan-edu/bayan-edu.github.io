import os

books = [
    {
        "id": 1701,
        "title": "Secrets of the Rain Forest",
        "intent": "Secrets of the Rain Forest medicinal botany ethnobotany biodiversity",
        "brief": (
            'Book cover design titled "Secrets of the Rain Forest". '
            'The title "Secrets of the Rain Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ETHNOBOTANICAL MEDICINAL RAINFOREST DAYLIGHT STYLE: A sun-drenched, deeply layered tropical rainforest clearing in radiant morning light. '
            'In the foreground, fascinating medicinal plants: cinchona tree bark (quinine source), blooming purple passionflower (Passiflora), and broad calathea leaves beaded with sparkling water droplets. '
            'A naturalist\'s wooden plant-drying herbarium press, brass magnifying loupe, and glass specimen vials on a weathered mossy timber log. '
            'Sunlight filtering through towering giant mahogany and kapok trees into the lush emerald understory. '
            'Palette: medicinal passionflower violet, cinchona bark ochre amber, lush jungle emerald, and radiant sunbeam gold. '
            'Rainforest pharmacology, ethnobotany, biodiversity secrets, tropical plant medicine, rich and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1702,
        "title": "The Moons in Our Solar System",
        "intent": "Moons in Our Solar System comparative planetary satellites astronomy",
        "brief": (
            'Book cover design titled "The Moons in Our Solar System". '
            'The title "The Moons in Our Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPARATIVE PLANETARY SATELLITES ASTRONOMY STYLE: A scientifically accurate and stunning array of diverse moons in space illuminated by directional sunlight. '
            'In the center foreground: sulfur-volcano moon Io with yellow volcanic calderas, smooth fractured ice-crust Europa, dark cratered Callisto, giant Ganymede, Saturn\'s golden-hazed Titan, and ice-geyser Enceladus. '
            'Jupiter\'s Great Red Spot and Saturn\'s rings glowing majestically in the background. '
            'Scale diameter measurement brackets and geological composition icons in crisp educational graphics. '
            'Palette: sulfur volcanic yellow, ice Europa crystal cyan, Titan golden amber, deep cosmic navy, and solar white. '
            'Planetary science, solar system moons, extraterrestrial geology, cryovolcanism, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1703,
        "title": "What Is Mars Like?",
        "intent": "What Is Mars Like martian geology landscape atmosphere rovers",
        "brief": (
            'Book cover design titled "What Is Mars Like?". '
            'The title "What Is Mars Like?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIGH-DEFINITION MARTIAN GEOLOGY DAYLIGHT STYLE: A sunlit, scientifically grounded panorama of the Martian surface under a dusty salmon-pink sky. '
            'In the center foreground, iron-oxide red sand ripples, layered sedimentary bedrock ledges, and rounded pebbles in a dry ancient river channel. '
            'In the midground, towering Olympus Mons and the vast canyon walls of Valles Marineris illuminated by bright sunlight. '
            'A robotic weather monitoring station mast measuring barometric pressure and atmospheric temperature. '
            'Palette: Martian rust red, hematite ochre, salmon pink sky, and solar array gold. '
            'Mars exploration, planetary geology, atmospheric science, red planet topography, educational and striking. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1704,
        "title": "Clean Energy",
        "intent": "Clean Energy renewable sustainable solar wind hydro grid",
        "brief": (
            'Book cover design titled "Clean Energy". '
            'The title "Clean Energy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RADIANT RENEWABLE ENERGY PANORAMA DAYLIGHT STYLE: A bright, sun-drenched future-ready green landscape celebrating clean power under a brilliant blue sky. '
            'In harmonious balance across the scenic hills: sleek white wind turbine towers rotating in the breeze, a modern photovoltaic solar farm with sparkling dark blue panels, '
            'and a clean hydroelectric waterfall dam with rushing turquoise water in the valley. '
            'Subtle glowing green smart-grid electrical transmission lines connecting them harmoniously to a clean, modern eco-city in the distance. '
            'Palette: solar navy blue, turbine clean white, meadow emerald green, water aquamarine, and sunlight radiant gold. '
            'Renewable energy, sustainability, clean technology, decarbonization, bright, optimistic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1705,
        "title": "Dead Zone",
        "intent": "Dead Zone marine hypoxia oceanography dissolved oxygen",
        "brief": (
            'Book cover design titled "Dead Zone". '
            'The title "Dead Zone" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEANOGRAPHIC HYPOXIA & WATER QUALITY DAYLIGHT STYLE: A sunlit coastal marine research scene illustrating oxygen levels in seawater. '
            'A research vessel sampling station in the foreground with an oceanographic Niskin water-sampling bottle and a digital dissolved oxygen electronic sensor probe. '
            'A stark, split underwater cross-section: the upper sunlit layers teeming with schooling fish and swimming sea turtles, '
            'contrasted with benthic sea floor hypoxia sediment illustrating oxygen depletion (dead zone) and nutrient runoff cycles. '
            'Palette: surface ocean aquamarine, deep hypoxic slate grey, research instrument yellow, and bright sunny sky. '
            'Marine ecology, ocean hypoxia, nutrient pollution, environmental science, dissolved oxygen measurement, educational and impactful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1709,
        "title": "What Is a Volcano?",
        "intent": "What Is a Volcano volcanology magma chamber crater eruption",
        "brief": (
            'Book cover design titled "What Is a Volcano?". '
            'The title "What Is a Volcano?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOLOGICAL VOLCANOLOGY CUTAWAY DAYLIGHT STYLE: A magnificent 3D cutaway block diagram of an active stratovolcano in bright sunny daylight. '
            'Clearly displaying internal geological anatomy: deep subterranean magma chamber, central conduit chimney vent, side vents, alternating strata of hardened basaltic lava and tephra ash layers. '
            'The summit caldera crater emitting billowing white geothermal steam and volcanic gas into a bright azure sky. '
            'A seismometer monitoring station and geological rock hammer on the green lower slopes. '
            'Palette: molten magma glowing orange-red, volcanic basalt dark grey, sulfur yellow, hillside green, and azure sky blue. '
            'Volcanology, plate tectonics, internal Earth structure, geological hazards, clear, majestic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1711,
        "title": "Can You Tell the Temperature By Listening to the Chirping of a Cricket?",
        "intent": "Temperature By Listening to Cricket Dolbears law biophysics thermoregulation",
        "brief": (
            'Book cover design titled "Can You Tell the Temperature By Listening to the Chirping of a Cricket?". '
            'The title "Cricket Chirps & Temperature" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHARMING BIOPHYSICS & DOLBEAR\'S LAW SUNNY DAYLIGHT STYLE: A sun-drenched, cheerful summer garden scene bathed in warm afternoon sunlight. '
            'In the center foreground, a detailed, friendly black field cricket resting gracefully on a broad green hosta leaf, rubbing its forewings (stridulation) to chirp. '
            'Beside it, a classic glass outdoor garden thermometer displaying degrees Celsius and Fahrenheit. '
            'Neat, elegant educational chalkboard notes illustrating Dolbear\'s Law formula: Counting cricket chirps in 15 seconds plus 37 equals temperature in Fahrenheit! '
            'Palette: cricket polished black, leaf emerald green, thermometer glass red and white, and summer garden sunbeam gold. '
            'Biophysics, Dolbear\'s law, cricket stridulation, insect thermoregulation, charming, curious, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1712,
        "title": "Horses Come in 3 Basic Body Types",
        "intent": "Horses 3 Basic Body Types equine conformation draft light pony",
        "brief": (
            'Book cover design titled "Horses Come in 3 Basic Body Types". '
            'The title "Horses: 3 Basic Body Types" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EQUINE CONFORMATION & BREED COMPARISON SUNNY PASTURE STYLE: A picturesque, sun-drenched green paddock pasture on a beautiful morning. '
            'Side-by-side standing conformation profiles of the three fundamental horse body types: '
            'a massive, muscular Draft horse (Clydesdale with feathered hooves), an elegant, refined Light riding horse (Arabian/Thoroughbred with arched neck), '
            'and a sturdy, compact Pony (Shetland/Welsh pony with thick mane). '
            'Clean architectural measurement height lines and bone structure conformation callouts in the corner under a bright blue sky. '
            'Palette: draft horse bay brown, light horse chestnut gold, pony dapple grey, pasture grass green, and sunny sky blue. '
            'Equine anatomy, horse conformation, draft vs light vs pony, veterinary science, wholesome and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1713,
        "title": "Introduction to Lightning",
        "intent": "Introduction to Lightning atmospheric electricity physics electrostatic charge",
        "brief": (
            'Book cover design titled "Introduction to Lightning". '
            'The title "Introduction to Lightning" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ATMOSPHERIC ELECTRICAL PHYSICS DAYLIGHT STYLE: A dramatic yet bright meteorological scene illustrating thunderstorm electrostatics. '
            'A towering cumulonimbus storm cloud cross-section showing electrostatic charge separation: positive charges (+) gathering at the icy upper anvil, '
            'and negative charges (-) concentrated at the warm rain base. '
            'A brilliant, branching lightning discharge bolt striking a copper lightning rod atop a weather tower in crisp, luminous detail. '
            'Clean educational vector graphics showing stepped leader ion channels and return stroke current. '
            'Palette: electric lightning cyan, cloud billow slate grey, copper gold, and bright flash white. '
            'Atmospheric physics, lightning generation, electrostatic charge, meteorology, dynamic, powerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1714,
        "title": "Living on the Edge",
        "intent": "Living on the Edge rocky intertidal shoreline ecology barnacles",
        "brief": (
            'Book cover design titled "Living on the Edge". '
            'The title "Living on the Edge" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ROCKY INTERTIDAL COASTAL ECOLOGY DAYLIGHT STYLE: A sunlit, rugged ocean shoreline cliff in brilliant morning daylight. '
            'In the center foreground, a weathered granite sea rock colonized by resilient intertidal organisms: volcano-shaped acorn barnacles, conical limpets, glossy blue mussels, and clinging green sea lettuce. '
            'Crashing white sea foam sprays against the rocks, while delicate sea pink (Armeria) wildflowers bloom resiliently in granite crevices above the high-water splash zone. '
            'A coastal lighthouse stands steadfast in the background under radiant blue skies. '
            'Palette: sea granite grey, ocean aquamarine and white foam, mussel navy blue, sea pink flower rose, and sunny sky blue. '
            'Intertidal ecology, rocky shore adaptations, biological zonation, marine ecology, resilient, bright, and scenic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1715,
        "title": "Seeing Stars",
        "intent": "Seeing Stars observational astronomy stellar constellations",
        "brief": (
            'Book cover design titled "Seeing Stars". '
            'The title "Seeing Stars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OBSERVATIONAL ASTRONOMY & STELLAR CONSTELLATIONS STYLE: A serene, inspiring mountaintop astronomy terrace at twilight dawn transition. '
            'On an outdoor wooden observation table: high-power astronomical binoculars on a sturdy brass tripod, a rotatable planisphere star wheel chart, and a red-beam astronomer\'s flashlight. '
            'In the deep celestial sky above, prominent constellations (Ursa Major, Orion, and the Pleiades cluster) connected by delicate geometric constellation lines, '
            'with twinkling stars graded by stellar magnitude brightness. '
            'Palette: celestial deep sapphire, star twinkle gold, constellation cyan, brass telescope amber, and mountain horizon glow. '
            'Amateur astronomy, star gazing, constellation navigation, stellar science, magical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1722,
        "title": "Uses of Trees",
        "intent": "Uses of Trees forestry sustainable wood oxygen shade ecology",
        "brief": (
            'Book cover design titled "Uses of Trees". '
            'The title "Uses of Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUSH ARBORICULTURE & FORESTRY BENEFITS SUNNY DAYLIGHT STYLE: A majestic, sun-drenched ancient oak tree spreading its vast leafy canopy over a lush green meadow in radiant morning light. '
            'Surrounding the tree, a harmonious circular infographic illustrating the vital gifts of trees to planet Earth: '
            'Oxygen production (O2 bubbles), carbon capture (CO2 absorption), bird nests and squirrel hollows (Wildlife Shelter), crisp red apples and walnuts (Food), cool shadow canopy (Shade), and fallen leaf mulch (Soil Fertility). '
            'A wooden park bench and saplings growing beside it under a bright blue sky. '
            'Palette: oak leaf emerald green, sunbeam golden yellow, bark rich umber, apple crimson red, and clear sky cyan. '
            'Arboriculture, forestry science, ecosystem services of trees, environmental conservation, wholesome and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1726,
        "title": "Coral Reefs in the Sea",
        "intent": "Coral Reefs in the Sea marine biology coral polyp reef ecosystem",
        "brief": (
            'Book cover design titled "Coral Reefs in the Sea". '
            'The title "Coral Reefs in the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR SUN-DRENCHED CORAL REEF SANCTUARY STYLE: A breathtaking underwater paradise in crystal-clear tropical ocean shallows bathed in dancing golden sunbeams. '
            'In the center foreground, a magnificent coral reef garden: branching purple staghorn coral, golden brain coral, and delicate pink sea fans. '
            'Vibrant orange clownfish darting among sea anemone tentacles, a blue sea star resting on clean white coral sand, and a sea turtle gliding peacefully in the background. '
            'A microscopic circular inset showing tiny coral polyps with translucent tentacles absorbing calcium carbonate. '
            'Palette: ocean lagoon turquoise, staghorn coral violet, clownfish vibrant orange, anemone pink, and sunbeam gold. '
            'Coral reef ecosystems, marine biology, symbiotic zooxanthellae, ocean conservation, brilliant, joyful, and educational. '
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

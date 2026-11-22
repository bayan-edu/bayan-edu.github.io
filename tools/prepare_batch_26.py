import os

books = [
    {
        "id": 1889,
        "title": "Helping Mussels Means Cleaner Water",
        "intent": "Freshwater Mussels cleaner water biofiltration ecosystem services",
        "brief": (
            'Book cover design titled "Helping Mussels Means Cleaner Water". '
            'The title "Helping Mussels, Cleaner Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FRESHWATER BIOFILTRATION & RIVER ECOLOGY DAYLIGHT STYLE: A sunlit, crystal-clear gravel riverbed on a bright sunny morning in natural daylight. '
            'In the center foreground, a healthy cluster of native freshwater unionid mussels nestled among smooth river stones, actively siphoning and filtering river water. '
            'In the background, a Secchi disk testing water clarity, aquatic river weeds swaying in the gentle current, and a kingfisher bird perched on an overhanging branch under blue skies. '
            'Palette: river stone slate and amber, mussel shell iridescent dark bronze, river water crystal turquoise, and sunbeam radiant gold. '
            'Freshwater ecology, biological filtration, mussel conservation, clean water indicators, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1890,
        "title": "How to Spy on Sharks",
        "intent": "Spy on Sharks marine telemetry acoustic satellite tracking tags",
        "brief": (
            'Book cover design titled "How to Spy on Sharks". '
            'The title "How to Spy on Sharks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARINE BIOTELEMETRY & SHARK TRACKING DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical ocean expanse in sparkling midday sunlight. '
            'In the center foreground, a magnificent, peaceful tiger shark swimming smoothly near the surface, showing a small scientific satellite archival tag attached to its dorsal fin. '
            'Above on the surface, a solar-powered oceanographic wave glider drone recording acoustic pings, transmitting migration tracking coordinates to an orbiting satellite in clean graphics. '
            'Dancing sunbeams piercing deep into the turquoise water column. '
            'Palette: shark skin sleek grey, ocean sapphire and aquamarine, satellite tag caution yellow, and sunbeam gold. '
            'Marine biology, shark conservation, biotelemetry, satellite oceanography, migration tracking, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1892,
        "title": "Jumping the Tallest Cliff in the Solar System",
        "intent": "Tallest Cliff Solar System Verona Rupes Miranda Uranus geology",
        "brief": (
            'Book cover design titled "Jumping the Tallest Cliff in the Solar System". '
            'The title "Tallest Cliff in the Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXTRATERRESTRIAL GEOLOGY & VERONA RUPES STYLE: An awe-inspiring planetary landscape of the giant Verona Rupes fault scarp on Uranus\'s moon Miranda in radiant sunlight. '
            'A colossal, sheer 20-kilometer-high vertical ice-and-rock cliff face plunging dramatically down into heavily cratered terrain below. '
            'A small robotic exploratory lander probe drifting downward on tiny thrusters in the ultra-low gravity of Miranda. '
            'In the deep cosmic sky above, the pale cyan gas giant Uranus with faint delicate rings glows proudly. '
            'Palette: cliff face fractured ice silver and charcoal, Uranus pale cyan, and deep cosmic black. '
            'Planetary geology, Verona Rupes, Miranda, Uranian moons, extreme topography, breathtaking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1893,
        "title": "Lights Out!",
        "intent": "Lights Out dark skies light pollution astronomy conservation",
        "brief": (
            'Book cover design titled "Lights Out!". '
            'The title "Lights Out!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DARK SKY PRESERVATION & ASTRONOMICAL CONTRAST STYLE: A thought-provoking comparative landscape split down the middle. '
            'On one side, an urban city with excessive unshielded artificial streetlights causing skyglow light pollution that washes out the night sky. '
            'On the other side, a certified Dark Sky Reserve with fully shielded downward lighting, revealing a breathtaking, crystalline view of the Milky Way galaxy, nebulae, and shooting stars. '
            'An astronomical telescope and a nocturnal owl perched on a branch enjoying natural night darkness. '
            'Palette: dark sky deep navy and starlight silver, streetlamp yellow glow, Milky Way violet-pink, and observatory dome white. '
            'Dark sky conservation, light pollution mitigation, observational astronomy, ecological nocturnal habitats, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1894,
        "title": "One Way to Find a Planet",
        "intent": "Find a Planet exoplanet transit method photometry Kepler",
        "brief": (
            'Book cover design titled "One Way to Find a Planet". '
            'The title "One Way to Find a Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXOPLANET TRANSIT PHOTOMETRY STYLE: A high-tech, scientifically accurate astronomical discovery scene in space illuminated by stellar light. '
            'In the center, a distant parent star shining like a radiant golden disk, with a small dark exoplanet silhouette transiting across its face. '
            'Directly below in clean educational graphic design: a digital transit light curve plot showing stellar brightness dropping slightly (by 1%) during the transit and returning to normal. '
            'The Kepler / TESS space telescope scanning the starfield in the foreground. '
            'Palette: parent star radiant gold and white, exoplanet black silhouette, light curve electric cyan, and space deep navy. '
            'Exoplanet discovery, transit photometry, Kepler space telescope, extrasolar worlds, astrophysics, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1895,
        "title": "Removing Dams to Help Fish and People",
        "intent": "Removing Dams river restoration salmon spawning anadromous ecology",
        "brief": (
            'Book cover design titled "Removing Dams to Help Fish and People". '
            'The title "Removing Dams, Restoring Rivers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVER RESTORATION & ANADROMOUS FISH HABITAT STYLE: A sun-drenched, dramatic Pacific Northwest river valley in bright morning daylight. '
            'In the center, a newly breached, dismantled concrete dam being reclaimed by nature, allowing the wild river to flow free through natural boulder rapids. '
            'In the foreground, magnificent wild salmon leaping powerfully up the restored river current toward upstream gravel spawning grounds. '
            'Lush green cedar forests, clean gravel bars, and a soaring osprey under a brilliant sunny blue sky. '
            'Palette: river water churning white and turquoise, salmon silver-pink, cedar forest deep green, and sunny sky blue. '
            'River restoration, dam removal, salmon migration, freshwater ecology, environmental engineering, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1897,
        "title": "Watching the Weather",
        "intent": "Watching the Weather meteorological observation tools wind cloud rain",
        "brief": (
            'Book cover design titled "Watching the Weather". '
            'The title "Watching the Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHEERFUL METEOROLOGY & WEATHER INSTRUMENTS SUNNY STYLE: A sunlit, picturesque hilltop weather observation garden on a clear breezy morning. '
            'In the center foreground, a bright orange-and-white striped windsock catching the wind, a spinning red rooster wind vane atop a wooden post, and a clear glass rain gauge with measuring increments. '
            'An illustrated cloud classification chart showing cirrus, cumulus, and stratus clouds floating across a bright blue sky. '
            'Palette: windsock bright orange and white, wind vane barn red, lawn fresh green, and clear sunny sky cyan. '
            'Weather observation, meteorology, wind direction, rain measurement, cloud types, cheerful, engaging, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1898,
        "title": "What's It Like in Space?",
        "intent": "Whats It Like in Space microgravity space station astronautics",
        "brief": (
            'Book cover design titled "What\'s It Like in Space?". '
            'The title "What\'s It Like in Space?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ORBITAL MICROGRAVITY & SPACE STATION LIFE STYLE: A sunlit, fascinating interior view of an orbital space station module in bright daylight. '
            'In the center, a perfectly spherical floating water droplet suspended in mid-air in zero gravity, reflecting the curved horizon of Earth inside. '
            'A space helmet, floating food pouches with velcro straps, a zero-gravity pen, and laptops docked to walls. '
            'Through the panoramic cupola windows, the radiant blue marble of Earth with white clouds shines brightly in sunlight. '
            'Palette: space station interior high-tech white and titanium, water droplet crystal cyan, Earth blue and white, and solar gold. '
            'Microgravity physics, space station life, astronautics, living in space, curious, wondrous, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1899,
        "title": "When Lightning Strikes",
        "intent": "When Lightning Strikes atmospheric electrical discharge physics safety",
        "brief": (
            'Book cover design titled "When Lightning Strikes". '
            'The title "When Lightning Strikes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ATMOSPHERIC ELECTRICAL DISCHARGE DAYLIGHT STYLE: A dramatic meteorological scene capturing a lightning discharge under daytime storm conditions. '
            'A massive, branching jagged lightning bolt of electric blue and incandescent white discharging safely from a cumulonimbus cloud into a copper lightning rod atop an observation tower. '
            'Cutaway educational graphics showing lightning safety principles: Faraday cage principle inside an automobile, stepped leader ionization, and grounding dissipation rods into Earth. '
            'Palette: lightning electric cyan and pure white, storm cloud deep slate, copper lightning rod gold, and hillside green. '
            'Atmospheric electricity, lightning physics, lightning rods, electrical grounding, storm safety, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1901,
        "title": "Why Is Acid Rain Harmful?",
        "intent": "Acid Rain Harmful environmental chemistry pH scale forest buffering",
        "brief": (
            'Book cover design titled "Why Is Acid Rain Harmful?". '
            'The title "Why Is Acid Rain Harmful?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ENVIRONMENTAL CHEMISTRY & ACID DEPOSITION DAYLIGHT STYLE: A sunlit, compelling scientific study scene on a bright morning. '
            'In the foreground, a detailed split comparative demonstration: a carved limestone statue surface showing chemical weathering from sulfurous acid rain vs a pristine marble specimen. '
            'Beside it, a beaker of rain water with bright red litmus pH indicator paper (pH 4.0), and a healthy green pine seedling growing in buffered soil with limestone granules. '
            'In the background, a sunny forest and clean blue skies showing environmental recovery and emission scrubbers. '
            'Palette: litmus test red and orange, limestone cream, pine needle green, and sunny sky blue. '
            'Acid rain chemistry, pH scale, chemical weathering, environmental buffering, air pollution solutions, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1902,
        "title": "Your Recycled House",
        "intent": "Your Recycled House sustainable architecture green building materials",
        "brief": (
            'Book cover design titled "Your Recycled House". '
            'The title "Your Recycled House" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUSTAINABLE ARCHITECTURE & GREEN BUILDING DAYLIGHT STYLE: A sun-drenched, innovative modern eco-home in a sunny garden setting in bright natural daylight. '
            'Clearly showcasing ingenious recycled building materials: reclaimed weathered timber siding, polished terrazzo countertops made from crushed recycled colored glass, '
            'recycled denim and cellulose insulation cutaway, and rooftop solar photovoltaic tiles under clear blue skies. '
            'A rainwater harvesting barrel and a blooming rooftop sedum living green roof. '
            'Palette: reclaimed timber warm honey, crushed glass sparkling multi-color, solar panel navy, and garden emerald green. '
            'Green architecture, sustainable building materials, circular economy, eco-homes, bright, inspiring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1903,
        "title": "Butterfly Metamorphosis",
        "intent": "Butterfly Metamorphosis complete holometabolous life cycle monarch",
        "brief": (
            'Book cover design titled "Butterfly Metamorphosis". '
            'The title "Butterfly Metamorphosis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPLETE LEPIDOPTERAN METAMORPHOSIS SUNNY GARDEN STYLE: A sun-drenched, blooming milkweed plant in radiant summer morning sunlight. '
            'A glorious circular lifecycle progression arranged around the plant: '
            'a tiny pearlescent egg on a leaf; a striped yellow, black, and white monarch caterpillar munching milkweed; '
            'a jade-green chrysalis pupa adorned with gleaming gold metallic dots; and a magnificent newly emerged monarch butterfly spreading its vivid orange-and-black wings in the sunshine. '
            'Dewdrops sparkling like diamonds on green leaves under a bright blue sky. '
            'Palette: monarch orange and black, chrysalis jade green with gold dots, leaf emerald, and sunny sky blue. '
            'Lepidopteran metamorphosis, life cycles, monarch butterfly, insect biology, nature wonder, brilliant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1904,
        "title": "Cracking Up",
        "intent": "Cracking Up mechanical weathering frost wedging rock physics geology",
        "brief": (
            'Book cover design titled "Cracking Up". '
            'The title "Cracking Up: Rock Weathering" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MECHANICAL WEATHERING & FROST WEDGING GEOLOGY STYLE: A sun-drenched, dramatic alpine mountainside in crisp morning daylight. '
            'In the center foreground, a massive granite boulder split cleanly down the center by frost wedging: '
            'crystal ice lenses visible inside the deep fissure, showing how water expands by 9% upon freezing, exerting immense pressure that shatters solid bedrock. '
            'Surrounding talus scree slopes, alpine wildflowers blooming in rock cracks, and snow-capped peaks under clear blue skies. '
            'Palette: granite rock slate and quartz white, ice crystal cyan, alpine flower gold, and sunny mountain sky blue. '
            'Physical weathering, frost wedging, freeze-thaw cycles, geomorphology, rock physics, clear, dramatic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1905,
        "title": "Inheritance of Traits",
        "intent": "Inheritance of Traits Mendelian genetics heredity pea plants Punnett",
        "brief": (
            'Book cover design titled "Inheritance of Traits". '
            'The title "Inheritance of Traits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MENDELIAN GENETICS & CLASSICAL BOTANY SUNNY GARDEN STYLE: A sunlit, peaceful monastery garden study in radiant morning daylight. '
            'In the center foreground, Gregor Mendel\'s classic sweet pea plants (Pisum sativum) showing clear hereditary contrasts: '
            'vibrant purple flowers versus white flowers, and open pods showing round yellow peas versus wrinkled green peas. '
            'On an outdoor wooden garden table: a neat wooden chalkboard with a clean 2x2 Punnett square diagram showing dominant and recessive gene ratios, and a brass microscope. '
            'Palette: pea flower vibrant violet and pure white, pea pod fresh green and yellow, timber honey oak, and morning sunbeam gold. '
            'Genetics, Mendelian inheritance, dominant and recessive alleles, heredity, Punnett squares, botany history, charming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1906,
        "title": "Overwintering Monarchs",
        "intent": "Overwintering Monarchs butterfly migration oyamel fir forest Mexico",
        "brief": (
            'Book cover design titled "Overwintering Monarchs". '
            'The title "Overwintering Monarchs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OYAMEL FIR FOREST BUTTERFLY SANCTUARY STYLE: A sun-drenched, magical mountain forest sanctuary in Michoacán, Mexico in bright morning sunlight. '
            'Towering oyamel fir trees whose trunks and evergreen branches are blanketed by thousands of roosting monarch butterflies, looking like living golden-orange autumn leaves. '
            'As morning sunbeams pierce through the high-altitude forest canopy, hundreds of monarchs awaken and flutter gracefully through dancing beams of golden light. '
            'A mountain stream and wildflowers below under a clear blue sky. '
            'Palette: monarch butterfly brilliant orange and black, oyamel fir deep forest green, and sunbeam radiant amber gold. '
            'Monarch migration, overwintering ecology, Mexican biosphere reserve, microclimate protection, breathtaking, magical, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1907,
        "title": "Pollinators",
        "intent": "Pollinators mutualism pollination ecology bees hummingbirds butterflies",
        "brief": (
            'Book cover design titled "Pollinators". '
            'The title "Pollinators" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT WILDFLOWER MEADOW & POLLINATOR DIVERSITY STYLE: A sun-drenched, blooming wildflower meadow in radiant midday summer sunlight. '
            'A glorious celebration of nature\'s key pollinators in action: '
            'a fuzzy golden bumblebee packed with yellow pollen foraging on purple coneflowers; a ruby-throated hummingbird hovering beside scarlet trumpet honeysuckle; '
            'and a swallowtail butterfly drinking nectar from yellow black-eyed susans. '
            'Microscopic pollen grains glistening in the sunbeams under a cloudless azure sky. '
            'Palette: coneflower magenta, honeysuckle scarlet, sunflower yellow, meadow emerald, and bumblebee fuzzy gold. '
            'Pollination ecology, pollinator conservation, mutualism, flower-pollinator coevolution, joyful, brilliant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1908,
        "title": "The Doum Palm of the Sahara Desert",
        "intent": "Doum Palm Sahara Desert Hyphaene thebaica desert botany oasis",
        "brief": (
            'Book cover design titled "The Doum Palm of the Sahara Desert". '
            'The title "The Doum Palm of the Sahara" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SAHARAN DESERT OASIS & BOTANICAL WONDER STYLE: A sun-drenched, spectacular Saharan desert landscape in brilliant midday sunshine. '
            'In the center, a majestic ancient Doum palm tree (Hyphaene thebaica) showing its unique, iconic Y-shaped branching trunk (dichotomous branching). '
            'Large fan-shaped evergreen fronds rustling in the desert breeze and heavy clusters of glossy, reddish-orange gingerbread-flavored doum fruit. '
            'Golden rippling sand dunes, a tranquil desert oasis spring reflecting the palms, and a clear turquoise sky. '
            'Palette: doum fruit polished amber-orange, palm fronds deep green, desert sand golden ochre, and oasis water turquoise. '
            'Desert botany, Sahara oasis ecology, dichotomous branching palms, ancient Egyptian sacred trees, magnificent and educational. '
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

import os

books = [
    {
        "id": 1808,
        "title": "Where Does Interstellar Space Begin?",
        "intent": "Interstellar Space heliopause termination shock voyager solar wind",
        "brief": (
            'Book cover design titled "Where Does Interstellar Space Begin?". '
            'The title "Where Does Interstellar Space Begin?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DEEP SPACE HELIOPHYSICS & VOYAGER BOUNDARY STYLE: A scientifically accurate cosmic diagram of the outer solar system boundary illuminated by sunlight. '
            'The golden solar wind bubble (heliosphere) pressing outward against the vast, mysterious interstellar magnetic medium. '
            'In the center, NASA\'s Voyager 1 space probe with high-gain golden dish antenna crossing the turbulent Termination Shock and Heliopause into true interstellar space. '
            'Galactic cosmic ray particle vectors, neutral hydrogen atoms, and orbital scale callouts in astronomical units (AU) in clean educational graphics. '
            'Palette: solar wind golden amber, interstellar deep indigo, spacecraft gold and white, and cosmic ray electric cyan. '
            'Heliophysics, interstellar boundary, Voyager mission, outer solar system, cosmic physics, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1809,
        "title": "A Hole in the Planet!",
        "intent": "Hole in the Planet sinkholes cenotes karst geology hydrology",
        "brief": (
            'Book cover design titled "A Hole in the Planet!". '
            'The title "A Hole in the Planet!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR KARST SINKHOLE & CENOTE DAYLIGHT STYLE: A sun-drenched, breathtaking view inside a majestic natural limestone sinkhole (cenote) in Yucatan, Mexico in radiant midday sunlight. '
            'Sheer vertical limestone cliff walls draped in hanging tropical tree roots, green ferns, and blooming wild orchids. '
            'At the bottom, a deep, circular pool of crystal-clear turquoise groundwater with a golden sunbeam piercing straight down through the open circular skylight to the water floor. '
            'Geological limestone dissolution chemistry (CaCO3) and subterranean cave karst diagrams in clean graphics. '
            'Palette: cenote pool aquamarine turquoise, limestone rock cream and buff, tropical foliage emerald green, and sunbeam radiant gold. '
            'Karst geomorphology, sinkholes, limestone dissolution, subterranean hydrology, stunning, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1811,
        "title": "Capturing the Memories",
        "intent": "Capturing the Memories history of photography camera obscura optics",
        "brief": (
            'Book cover design titled "Capturing the Memories". '
            'The title "Capturing Memories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORICAL OPTICS & PHOTOGRAPHY INVENTION DAYLIGHT STYLE: A sunlit 19th-century photographer and optics study in natural morning window light. '
            'In the center foreground, a classic vintage brass-and-polished-mahogany folding bellows view camera mounted on a wooden tripod. '
            'Beside it, a mirror daguerreotype plate, silver gelatin glass negative plates, and a brass camera obscura box showing light rays inverting a sunny garden image on ground glass. '
            'Glass photographic lenses, developing trays, and aperture diaphragm diagrams on a dark oak desk. '
            'Palette: polished mahogany wood, gleaming brass gold, daguerreotype silver, and warm morning sunlight. '
            'History of photography, optics, camera obscura, light sensitivity, photographic chemistry, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1812,
        "title": "How Do Airplanes Fly?",
        "intent": "How Do Airplanes Fly aerodynamics lift Bernoulli thrust drag",
        "brief": (
            'Book cover design titled "How Do Airplanes Fly?". '
            'The title "How Do Airplanes Fly?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AERODYNAMIC FLIGHT PHYSICS & AIRFOIL DAYLIGHT STYLE: A sleek modern commercial jetliner soaring gracefully through clear sunny skies in bright daylight. '
            'In the foreground, a detailed cross-sectional cutaway diagram of an aerodynamic airplane wing (cambered airfoil). '
            'Clean educational vector graphics illustrating the four fundamental forces of flight: Lift (pointing up), Weight (pointing down), Thrust (pointing forward), and Drag (pointing back). '
            'Smooth laminar streamline airflow curves flowing faster over the curved top of the wing, demonstrating Bernoulli\'s principle and Newton\'s third law downwash. '
            'Palette: airplane fuselage pearl white, sky azure cyan, airflow streamlines electric blue, and lift vector coral red. '
            'Aviation physics, aerodynamics, Bernoulli\'s principle, four forces of flight, aerospace engineering, clear and dynamic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1813,
        "title": "How Plates Affect Our Planet: Volcanoes",
        "intent": "Plates Volcanoes subduction Pacific Ring of Fire volcanic arc",
        "brief": (
            'Book cover design titled "How Plates Affect Our Planet: Volcanoes". '
            'The title "Plates on the Move: Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLATE BOUNDARY VOLCANOLOGY & RING OF FIRE STYLE: A sunlit 3D tectonic subduction zone cutaway in bright daylight. '
            'A dense oceanic plate subducting beneath a continental plate, releasing trapped water and volatiles to melt the mantle and generate magma. '
            'Magma diapirs rising through continental crust to fuel a chain of active stratovolcanoes venting billowing white steam columns along the coast. '
            'A regional map of the Pacific "Ring of Fire" highlighting deep ocean trenches and volcanic chains. '
            'Palette: subducting magma glowing orange-red, oceanic crust deep blue, continental crust terracotta, and clear sunny sky. '
            'Plate tectonics, subduction volcanism, Ring of Fire, volcanic arcs, geophysics, dramatic, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1815,
        "title": "NASA's Stardust Review",
        "intent": "NASAs Stardust Review cometary dust aerogel sample return",
        "brief": (
            'Book cover design titled "NASA\'s Stardust Review". '
            'The title "NASA\'s Stardust Mission" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE SAMPLE RETURN & COMET WILD 2 STYLE: A high-tech space exploration scene capturing NASA\'s Stardust spacecraft encounter in sunlight. '
            'In space, the robotic Stardust spacecraft deploying its tennis-racket shaped collector grid filled with translucent blue aerogel (frozen smoke). '
            'Microscopic hypervelocity cometary dust grains from comet Wild 2 creating carrot-shaped impact tracks in the blue aerogel. '
            'In the foreground, the sample return capsule descending by parachute into sunny desert landing flats. '
            'Palette: aerogel ethereal translucent cyan, spacecraft thermal foil gold, comet nucleus charcoal, and deep space navy. '
            'Cometary science, NASA missions, sample return, aerogel nanotechnology, space exploration, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1817,
        "title": "Observing the Weather",
        "intent": "Observing the Weather meteorology instruments Stevenson screen barometer",
        "brief": (
            'Book cover design titled "Observing the Weather". '
            'The title "Observing the Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PROFESSIONAL METEOROLOGICAL OBSERVATION STATION STYLE: A sun-drenched outdoor weather monitoring lawn on a clear, sunny morning. '
            'In the center foreground, a classic white slatted wooden Stevenson screen weather shelter with door open, revealing precision maximum-minimum thermometers and hygrometers. '
            'Beside it, a spinning three-cup anemometer measuring wind speed, a tipping-bucket rain gauge, and a brass aneroid barometer on a testing table. '
            'In the background, a white meteorological weather balloon ascending into a brilliant blue sky with scattered fair-weather cumulus clouds. '
            'Palette: weather shelter crisp white, brass instrument gold, lawn clover green, and brilliant sunny sky blue. '
            'Meteorology, weather observation, instruments, atmospheric science, barometric pressure, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1818,
        "title": "Parasites: Kings of the World",
        "intent": "Parasites Kings of the World evolutionary parasitology symbiosis",
        "brief": (
            'Book cover design titled "Parasites: Kings of the World". '
            'The title "Parasites: Kings of the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MICROSCOPIC PARASITOLOGY & EVOLUTIONARY BIOLOGY STYLE: A sunlit, pristine university biological research laboratory in bright morning light. '
            'In the center, an illuminated compound optical microscope with a circular field-of-view callout showing the intricate specialized morphology of parasites: '
            'microscopic hooked holdfast organs, specialized suckers, and complex multi-host life cycle transmission diagrams. '
            'Petri dishes with nutrient media, staining pipettes, and glass specimen slides on a clean white countertop in natural daylight. '
            'Palette: microscopic specimen teal and magenta, glass slide crystal clear, laboratory white, and sunny timber. '
            'Parasitology, symbiotic biology, host-parasite coevolution, microscopic adaptations, intriguing, respectful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1819,
        "title": "Quake in Indonesia",
        "intent": "Quake in Indonesia Sunda megathrust seismology subduction",
        "brief": (
            'Book cover design titled "Quake in Indonesia". '
            'The title "Quake in Indonesia" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUNDA MEGATHRUST & INDONESIAN GEOPHYSICS STYLE: A sunlit 3D geological cutaway of the Indonesian archipelago and Sunda Trench in bright daylight. '
            'The Australian tectonic plate subducting beneath the Sunda microplate along the ocean trench off Sumatra and Java. '
            'A 3D subsurface earthquake hypocenter focus with expanding seismic P-waves and S-waves, and deep sea ocean tsunami pressure buoy sensors floating on tropical blue waters. '
            'Lush green Indonesian volcanic islands under clear skies. '
            'Palette: ocean deep cobalt and turquoise, subduction magma orange, island emerald green, and seismic wave crimson. '
            'Seismology, subduction megathrust, Indonesian geology, earthquake science, tsunami early warning systems, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1820,
        "title": "Security Buzz",
        "intent": "Security Buzz honeybee olfactory detection biosensors biomimicry",
        "brief": (
            'Book cover design titled "Security Buzz". '
            'The title "Security Buzz" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INSECT OLFACTORY BIOSENSING & BIOMIMICRY STYLE: A sunlit, high-tech biomimicry and sensory research laboratory in natural daylight. '
            'In the center foreground, a fuzzy, golden honeybee actively extending its proboscis (conditioned olfactory response) toward a micro-airflow scent nozzle. '
            'Beside it, advanced electronic "electronic nose" biosensors and microfluidic chemical vapor detection chips that mimic insect antennae. '
            'Visual vector scent molecule pathways and digital signal readout waveforms on a clean acrylic workbench in bright sunlight. '
            'Palette: honeybee fuzzy gold and black, electric sensor cyan, optic glass white, and warm wooden bench honey. '
            'Biosensing, honeybee olfaction, biomimicry, vapor detection, behavioral science, innovative and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1821,
        "title": "Types of Obscuration",
        "intent": "Types of Obscuration meteorology fog mist haze smoke dust",
        "brief": (
            'Book cover design titled "Types of Obscuration". '
            'The title "Types of Obscuration" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGICAL ATMOSPHERIC OPTICS & VISIBILITY STYLE: A daylight comparative landscape illustrating different forms of atmospheric obscuration under clear natural light. '
            'Four quadrant comparisons: Water-based Mist (dew droplets on grass), Fog (low marine stratus enveloping coastal rocks), '
            'Lithometeor Haze (fine dry aerosol particles scattering sunlight), and Mineral Dust (suspended desert sand particles in a golden glow). '
            'An optical visibility target transmissometer sensor measuring atmospheric light extinction in clean educational graphics. '
            'Palette: mist pearl grey, fog soft white, haze pale golden, dust warm amber, and clear sky blue. '
            'Atmospheric physics, meteorological visibility, aerosols, condensation vs suspended dust, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1822,
        "title": "Types of Precipitation",
        "intent": "Types of Precipitation rain snow sleet hail meteorology",
        "brief": (
            'Book cover design titled "Types of Precipitation". '
            'The title "Types of Precipitation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PRECIPITATION FORMS & ATMOSPHERIC TEMPERATURE PROFILES STYLE: A bright, sunlit educational scene celebrating the varied forms of precipitation in nature. '
            'In the center foreground, four distinct precipitation types displayed in high-detail macro clarity: '
            'crystal-clear spherical Rain droplets on a green leaf; a delicate, symmetrical six-sided Snow crystal (dendrite flake); '
            'translucent Ice Pellets (sleet); and layered concentric Hailstones cut open to reveal onion-like ice growth rings. '
            'An atmospheric vertical temperature diagram showing freezing levels (0°C isotherm) in clean graphics. '
            'Palette: ice crystal cyan, raindrop aquamarine, leaf emerald green, and cloud billow white. '
            'Meteorology, cloud physics, precipitation types, rain, snow, sleet, hail, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1823,
        "title": "White-Headed Eagle With Yellow Catfish",
        "intent": "White Headed Eagle Yellow Catfish raptor wildlife Alaska river",
        "brief": (
            'Book cover design titled "White-Headed Eagle With Yellow Catfish". '
            'The title "White-Headed Eagle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAJESTIC ALASKAN RIVER WILDLIFE DAYLIGHT STYLE: A sun-drenched, pristine gravel riverbank along a clear mountain river in Alaska on a bright sunny morning. '
            'In the center foreground, a magnificent adult bald eagle with crisp, snowy-white head feathers and piercing yellow eyes perched proudly on a weathered cedar driftwood log. '
            'Held firmly in its powerful yellow talons is a freshly caught yellow catfish glistening with water droplets in the bright sun. '
            'In the background, rushing turquoise river rapids, dense emerald spruce forests, and distant snow-capped peaks under a cloudless azure sky. '
            'Palette: eagle head pure white, plumage deep chocolate brown, beak and talons vibrant yellow, river turquoise, and forest spruce green. '
            'Raptor biology, bald eagle, river ecosystems, predator-prey wildlife, majestic, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1824,
        "title": "Wind-Related Weather",
        "intent": "Wind Related Weather atmospheric pressure Coriolis anemometer",
        "brief": (
            'Book cover design titled "Wind-Related Weather". '
            'The title "Wind-Related Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC ATMOSPHERIC WIND & PRESSURE SYSTEMS DAYLIGHT STYLE: A sunlit coastal weather bluff overlooking a windy ocean bay on a bright afternoon. '
            'In the foreground, a modern digital weather station with a rapidly spinning cup anemometer and wind vane pointing into the sea breeze. '
            'A synoptic surface weather map showing concentric curved isobar pressure contour lines, High (H) and Low (L) pressure centers, '
            'and arrows illustrating the Coriolis force curving winds across the landscape. '
            'Windswept coastal cypress trees, dynamic ocean waves with whitecaps, and billowy cloud formations under sunny skies. '
            'Palette: ocean deep cobalt and white spray, weather map cyan and red isobars, cypress green, and bright sunny sky. '
            'Meteorology, wind physics, atmospheric pressure gradients, Coriolis effect, weather systems, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1825,
        "title": "Why Do Sunflowers Love the Sun?",
        "intent": "Why Do Sunflowers Love the Sun heliotropism phototropism auxin botany",
        "brief": (
            'Book cover design titled "Why Do Sunflowers Love the Sun?". '
            'The title "Why Do Sunflowers Love the Sun?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RADIANT SUNFLOWER HELIOTROPISM SUNNY FIELD STYLE: A glorious, sun-drenched agricultural field of towering sunflowers on a perfect midsummer morning. '
            'In the center foreground, a magnificent, massive blooming sunflower with brilliant golden-yellow petals and intricate Fibonacci spiral seed head, facing proudly toward the blazing golden morning Sun. '
            'A clean educational cross-section diagram of the sunflower stem showing plant hormone auxin redistribution: '
            'auxin accumulating on the shaded side of the stem, stimulating cellular elongation that naturally bends the flower head toward the moving sunlight! '
            'Fluffy white clouds, blue skies, and radiant golden sunbeams. '
            'Palette: sunflower petal vibrant gold, stem and leaf lush green, seed head warm umber, and sky brilliant cyan. '
            'Botany, heliotropism, plant phototropism, auxin hormone biology, solar tracking, joyful, bright, and educational. '
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

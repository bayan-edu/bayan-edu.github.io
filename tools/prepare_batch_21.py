import os

books = [
    {
        "id": 1784,
        "title": "Eruption!",
        "intent": "Eruption explosive volcanism plinian column ash cloud geology",
        "brief": (
            'Book cover design titled "Eruption!". '
            'The title "Eruption!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXPLOSIVE PLINIAN VOLCANOLOGY DAYLIGHT STYLE: A sunlit, dramatic geological landscape capturing an explosive volcanic eruption in bright morning daylight. '
            'In the center, a towering Plinian eruption column of white steam, expanding volcanic gas, and grey pulverized ash rising miles into a bright azure sky. '
            'In the foreground, layered volcanic pumice deposits, weathered basalt boulders, and geological field monitoring seismometers on an observation ridge. '
            'Sunbeams illuminating the edges of the billowy eruption plume in radiant gold. '
            'Palette: ash column silver and slate, mountain granite grey, pumice pale buff, and brilliant sunny sky blue. '
            'Volcanology, explosive eruptions, volcanic hazards, Earth science, dramatic, powerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1786,
        "title": "Gray Wolves: Predator and Prey",
        "intent": "Gray Wolves Predator Prey ecology trophic cascade Yellowstone",
        "brief": (
            'Book cover design titled "Gray Wolves: Predator and Prey". '
            'The title "Gray Wolves: Predator & Prey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAJESTIC WILDLIFE ECOLOGY SUNNY MOUNTAIN STYLE: A sun-drenched, pristine wilderness valley in Yellowstone National Park on a crisp sunny morning. '
            'In the center foreground, a magnificent, healthy wild gray wolf standing proudly on a granite rocky bluff overlooking the valley. '
            'In the meadow below, a small herd of elk grazing peacefully among golden grasses along a clear winding mountain river fringed with green willows. '
            'Distant snow-capped alpine mountains rise majestically under a cloudless blue sky. '
            'Palette: wolf coat silver-grey and charcoal, river meadow golden buff and emerald, and sunny mountain sky blue. '
            'Wolf ecology, trophic cascades, predator-prey dynamics, wildlife conservation, inspiring, majestic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1787,
        "title": "How Long Is One Day on Other Planets?",
        "intent": "How Long One Day Other Planets planetary rotation astronomy sidereal",
        "brief": (
            'Book cover design titled "How Long Is One Day on Other Planets?". '
            'The title "How Long Is a Day on Other Planets?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLANETARY ROTATIONAL DYNAMICS ASTRONOMY STYLE: A colorful, scientifically accurate comparative astronomy scene in space illuminated by directional sunlight. '
            'Side-by-side rotating planetary globes showing dramatic rotational differences: rapid-spinning giant Jupiter (a day is only 9.9 hours!), '
            'Earth (24 hours), Mars (24.6 hours), and ultra-slow retro-rotating Venus (a single day is 243 Earth days!). '
            'Luminous axial spin rotation vector arrows, hour indicators, and clean educational comparison clock dials. '
            'Palette: Jupiter storm band amber, Earth ocean blue, Venus golden cloud, Mars rust red, and cosmic navy. '
            'Planetary science, rotational physics, celestial mechanics, solar system comparisons, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1788,
        "title": "How Many Moons?",
        "intent": "How Many Moons planetary satellites solar system counts",
        "brief": (
            'Book cover design titled "How Many Moons?". '
            'The title "How Many Moons?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOLAR SYSTEM SATELLITE SYSTEM COMPARISON STYLE: A brilliant, sun-illuminated astronomical diagram comparing moon systems across the solar system. '
            'Mercury and Venus shown with a zero (0 moons); Earth with its single glowing Moon (1); Mars with Phobos and Deimos (2); '
            'and giant gas giants Jupiter and Saturn surrounded by vast constellations of orbiting natural satellites (over 90+ and 140+ moons!). '
            'Concentric circular orbital tracks etched in glowing cyan and gold against a star-sprinkled deep space backdrop. '
            'Palette: Saturn golden rings, Jupiter striped amber, Earth ocean blue, lunar silver, and orbital electric cyan. '
            'Planetary astronomy, natural satellites, solar system scale, comparative planetology, clear, magnificent, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1789,
        "title": "How Plates Affect Our Planet: Structure of the Earth",
        "intent": "Structure of the Earth core mantle crust geophysics lithosphere",
        "brief": (
            'Book cover design titled "How Plates Affect Our Planet: Structure of the Earth". '
            'The title "Structure of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOPHYSICS & INTERNAL EARTH LAYERS CUTAWAY STYLE: A magnificent 3D spherical cutaway diagram of planet Earth in space illuminated by bright sunlight. '
            'Peeling back concentric geological layers in crisp detail: solid nickel-iron inner core (white-hot gold), liquid outer core (radiant orange), '
            'convective silicate mantle (deep terracotta red), and the thin brittle lithospheric crust supporting blue oceans and green continents. '
            'Depth measurement scale indicators (6,371 km to Earth\'s center) and temperature markers in clean educational graphics. '
            'Palette: inner core white-gold, outer core fiery orange, mantle terracotta, crust oceanic blue and continental green. '
            'Earth structure, geophysics, internal layers, seismology, core to crust, striking, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1790,
        "title": "In the Center of a Group of Planets",
        "intent": "Center Group of Planets solar physics heliophysics sun core",
        "brief": (
            'Book cover design titled "In the Center of a Group of Planets". '
            'The title "At the Center of the Planets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HELIOPHYSICS & SOLAR GRAVITATION STYLE: A breathtaking, high-detail view of our Sun reigning supreme at the center of the solar system. '
            'The radiant golden surface of the Sun showing granular convection cells, dark magnetic sunspots, and graceful looping coronal prominences. '
            'Concentric glowing elliptical planetary orbit lines extending outward with scale miniature planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn) tracing their paths. '
            'Palette: thermonuclear solar gold and brilliant white, prominence fiery coral, coronal amber glow, and deep space navy. '
            'Solar physics, heliocentric solar system, gravitational center, solar corona, majestic, grand, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1791,
        "title": "Magnetism",
        "intent": "Magnetism physics magnetic field lines dipole attraction repulsion",
        "brief": (
            'Book cover design titled "Magnetism". '
            'The title "Magnetism" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSICAL MAGNETISM & FORCE FIELD PHYSICS STYLE: A bright, sunlit laboratory demonstration table in natural morning daylight. '
            'In the center foreground, a classic painted steel horseshoe magnet with bold red (North) and blue (South) poles, attracting a cluster of shiny steel ball bearings and paperclips. '
            'Beside it, a clear glass plate with fine iron filings forming beautiful, symmetrical arched magnetic field flux lines between poles. '
            'Small brass compasses arranged in a circle, their needles aligning perfectly with the invisible magnetic force. '
            'Palette: magnet North crimson red, South royal blue, iron filing graphite grey, brass gold, and clean laboratory white. '
            'Physics of magnetism, magnetic poles, magnetic field lines, forces of attraction, clear, dynamic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1792,
        "title": "Magnetism - Magnets: Types and Uses",
        "intent": "Magnets Types and Uses neodymium electromagnet maglev compass",
        "brief": (
            'Book cover design titled "Magnetism - Magnets: Types and Uses". '
            'The title "Magnets: Types & Uses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'APPLIED MAGNETISM & TECHNOLOGICAL INNOVATION DAYLIGHT STYLE: A modern, sunlit engineering exploration workbench bathed in natural daylight. '
            'A diverse showcase of technological magnets: ultra-powerful shiny nickel-plated neodymium rare-earth disc magnets, a coiled copper wire electromagnet with iron core, '
            'a ceramic bar magnet, and a miniature maglev train track floating effortlessly on magnetic repulsion tracks. '
            'An electrical circuit switch, magnetic field sensor meter, and compass navigational rose on clean timber. '
            'Palette: neodymium shiny chrome silver, electromagnet copper gold, ceramic magnet slate, and bright lab daylight white. '
            'Applied physics, types of magnets, electromagnets, magnetic levitation, technological uses, modern and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1793,
        "title": "Panthers in Peril",
        "intent": "Panthers in Peril Florida panther conservation subtropical wildlife",
        "brief": (
            'Book cover design titled "Panthers in Peril". '
            'The title "Panthers in Peril" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUBTROPICAL WILDLIFE CONSERVATION FLORIDA STYLE: A sun-dappled, atmospheric southern cypress and pine flatwoods hammock in morning golden light. '
            'In the center foreground, an elusive, magnificent Florida panther with tawny golden coat and alert amber eyes walking gracefully along a fallen mossy oak trunk. '
            'Saw palmetto fronds, hanging Spanish moss, and a designated wildlife crossing underpass sign visible in the background. '
            'Sunbeams filtering through the cypress canopy in radiant golden rays. '
            'Palette: panther tawny gold and cream, cypress moss emerald green, bark deep brown, and sunbeam amber gold. '
            'Wildlife conservation, endangered predators, Florida ecology, big cat biology, breathtaking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1794,
        "title": "Recycle",
        "intent": "Recycle primary environmental education curbside sorting",
        "brief": (
            'Book cover design titled "Recycle". '
            'The title "Recycle!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHEERFUL ENVIRONMENTAL ACTION & SORTING SUNNY DAYLIGHT STYLE: A sunlit, joyful educational scene in a clean community park on a sunny spring day. '
            'In the center foreground, three bright, colorful recycling sorting bins: Blue (clean paper and cardboard), Green (glass bottles), and Yellow (plastic and aluminum cans). '
            'Beside them, clean recycled goods: an eco-friendly cardboard birdhouse and colorful flower planters made from recycled containers with blooming daisies. '
            'Lush green lawn, leafy trees, and a radiant blue sky with fluffy white clouds in the background. '
            'Palette: recycling bin primary blue, yellow, and green, daisy white and gold, and lawn emerald. '
            'Recycling education, waste reduction, environmental stewardship, circular economy, cheerful, vibrant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1795,
        "title": "Rocket Ships",
        "intent": "Rocket Ships aerospace engineering space launch multi stage",
        "brief": (
            'Book cover design titled "Rocket Ships". '
            'The title "Rocket Ships" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE LAUNCH & MULTI-STAGE ROCKETRY STYLE: A dramatic daytime space launch scene under brilliant sunny skies. '
            'A towering, sleek modern multistage space exploration rocket ascending majestically into the clear blue troposphere, leaving a massive, billowing column of clean white exhaust smoke and golden rocket engine fire. '
            'Cutaway educational inset showing multi-stage rocket staging: liquid oxygen fuel tanks, combustion chambers, rocket nozzles, and payload fairing capsule. '
            'Launchpad gantry tower and ocean coastline in the background far below. '
            'Palette: rocket exterior titanium white and chrome, engine flame golden orange, exhaust billow pearl, and launch sky azure blue. '
            'Aerospace engineering, rocketry, space exploration, propulsion physics, thrilling, inspiring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1797,
        "title": "Spreading His Wings",
        "intent": "Spreading His Wings avian aerodynamics eagle hawk flight thermals",
        "brief": (
            'Book cover design titled "Spreading His Wings". '
            'The title "Spreading His Wings" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AVIAN FLIGHT & THERMAL SOARING AERODYNAMICS DAYLIGHT STYLE: A sun-drenched, majestic mountain cliff overlooking a vast forested river canyon in bright morning sunlight. '
            'In the center foreground, a magnificent young golden eagle perched on a weathered granite rock outcrop, spreading its broad, powerful flight feathers to catch the morning thermal breeze. '
            'Subtle, elegant aerodynamic airflow vector lines showing thermal updrafts lifting the bird into effortless soaring flight. '
            'Panoramic mountain peaks and sunny blue skies stretching to the horizon. '
            'Palette: eagle feathers rich golden-brown and tawny buff, granite grey, canyon river aquamarine, and mountain sky cyan. '
            'Ornithology, avian aerodynamics, flight physics, thermal soaring, raptor biology, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1798,
        "title": "The Amazon River",
        "intent": "The Amazon River tropical hydrology geography South America",
        "brief": (
            'Book cover design titled "The Amazon River". '
            'The title "The Amazon River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNIFICENT AMAZON RIVER HYDROLOGY DAYLIGHT STYLE: A breathtaking, sun-drenched aerial panoramic vista of the mighty Amazon River in bright tropical daylight. '
            'The immense, winding golden river snaking gracefully through an endless emerald carpet of pristine tropical rainforest to the distant horizon. '
            'In the foreground, giant floating Victoria amazonica water lily pads with pink blossoms on a tranquil oxbow lake. '
            'A pink Amazon river dolphin (boto) leaping playfully above the water surface under radiant sunny skies with fluffy cumulus clouds. '
            'Palette: Amazon river silt gold, rainforest deep emerald, water lily petal rose, and tropical sky blue. '
            'Amazon geography, tropical river hydrology, freshwater ecosystems, South American biodiversity, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1800,
        "title": "The Movement of the Earth",
        "intent": "Movement of the Earth orbital revolution axial tilt seasons rotation",
        "brief": (
            'Book cover design titled "The Movement of the Earth". '
            'The title "The Movement of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EARTH ORBITAL MECHANICS & FOUR SEASONS DAYLIGHT STYLE: A comprehensive, circular astronomical diagram of Earth\'s annual orbit around the Sun. '
            'In the center, the radiant Sun emitting golden light beams. '
            'Earth shown at four cardinal orbital positions with its steady 23.5-degree axial tilt: Summer Solstice, Autumn Equinox, Winter Solstice, and Spring Equinox. '
            'Clean vector arrows illustrating counter-clockwise 365.25-day revolution and 24-hour daily rotation on its axis. '
            'Palette: Earth ocean sapphire and cloud white, Sun golden amber, seasonal orbital trail cyan, and celestial navy. '
            'Earth science, astronomy, axial tilt, four seasons, orbital mechanics, rotation vs revolution, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1801,
        "title": "The Northern Lights",
        "intent": "The Northern Lights aurora borealis magnetosphere solar wind",
        "brief": (
            'Book cover design titled "The Northern Lights". '
            'The title "The Northern Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AURORA BOREALIS & MAGNETOSPHERIC PHYSICS STYLE: A spectacular Arctic landscape at twilight showcasing the glowing Northern Lights (Aurora Borealis). '
            'Shimmering, undulating curtains of vibrant neon emerald green and violet auroral light dancing across the polar sky, reflected in the calm, glassy waters of a snowy fjord. '
            'In an educational diagram inset: Earth\'s magnetic dipole field lines deflecting the solar wind and funneling charged electrons and protons into the polar ionosphere. '
            'Snow-covered spruce trees and cozy wooden cabins under the glowing sky. '
            'Palette: auroral neon emerald green, violet-magenta, snow diamond white, deep fjord navy, and starlight silver. '
            'Auroral physics, Earth\'s magnetosphere, solar-terrestrial interactions, space weather, breathtaking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1803,
        "title": "The Sun Heats Up",
        "intent": "The Sun Heats Up solar radiation infrared greenhouse effect",
        "brief": (
            'Book cover design titled "The Sun Heats Up". '
            'The title "The Sun Heats Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SOLAR RADIATION & THERMAL ATMOSPHERE DAYLIGHT STYLE: A vibrant, sun-drenched landscape illustrating solar energy and thermal physics in radiant daylight. '
            'A brilliant midday Sun blazing in a cloudless blue sky, sending visible golden electromagnetic radiation waves (visible, ultraviolet, and infrared) toward Earth. '
            'An educational cross-section showing incoming solar radiation warming ocean waters, desert sands, and green forests, '
            'along with re-radiated thermal infrared heat and greenhouse gas equilibrium absorption diagrams. '
            'Palette: radiant solar gold, thermal infrared coral red, ocean aquamarine, and clear sky blue. '
            'Solar energy, electromagnetic radiation, heat absorption, thermal equilibrium, climate physics, bright and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1804,
        "title": "Trouble in the Amazon",
        "intent": "Trouble in the Amazon rainforest conservation deforestation reforestation",
        "brief": (
            'Book cover design titled "Trouble in the Amazon". '
            'The title "Trouble in the Amazon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AMAZON REFORESTATION & CONSERVATION SCIENCE DAYLIGHT STYLE: A sunlit, compelling ecological conservation scene under bright tropical skies. '
            'In the foreground, a flourishing active native tree seedling nursery where young Brazil nut and mahogany saplings in biodegradable pots are ready for replanting. '
            'In the background, a protected pristine Amazon rainforest canopy thriving with giant trees, flying scarlet macaws, and a clear river reflecting sunbeams. '
            'Satellite habitat monitoring screens and biodiversity conservation maps highlighted in clean educational style. '
            'Palette: rainforest emerald green, seedling fresh lime, river aquamarine, macaw scarlet and gold, and sunny sky blue. '
            'Tropical conservation, ecological restoration, reforestation science, Amazon preservation, urgent, hopeful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1805,
        "title": "Venus Crosses the Sun",
        "intent": "Venus Crosses Sun astronomical transit solar telescope filters",
        "brief": (
            'Book cover design titled "Venus Crosses the Sun". '
            'The title "Venus Crosses the Sun" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASTRONOMICAL TRANSIT OF VENUS STYLE: A magnificent, scientifically accurate solar astronomy view of the historic Transit of Venus in bright daylight. '
            'The massive, glowing golden disk of the Sun showing granular photospheric convection cells and dark magnetic sunspots. '
            'In sharp, perfect contrast, the tiny, razor-sharp pitch-black circular silhouette of planet Venus transiting across the Sun\'s face. '
            'In the foreground, an optical solar telescope with a dark golden Mylar solar safety filter, and historical transit measurement diagrams. '
            'Palette: solar disk golden amber and brilliant yellow, Venus transit silhouette black, telescope brass and white, and deep sky blue. '
            'Astronomical transits, celestial mechanics, historical measuring of astronomical unit, solar physics, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1806,
        "title": "Victoria Falls: The Smoke That Thunders",
        "intent": "Victoria Falls Zambezi river geology waterfall spray rainbow",
        "brief": (
            'Book cover design titled "Victoria Falls: The Smoke That Thunders". '
            'The title "Victoria Falls" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR ZAMBEZI WATERFALL GEOLOGY DAYLIGHT STYLE: A breathtaking, sun-drenched panorama of Victoria Falls (Mosi-oa-Tunya) on the Zambezi River in radiant midday sunlight. '
            'The colossal curtain of roaring white water plummeting over a mile-wide sheer basalt cliff into the deep zigzagging gorge below. '
            'A massive plume of billowing white water spray (the smoke that thunders) rising hundreds of feet into the air, crowned by a brilliant full-circle double rainbow glistening in the sun. '
            'Lush green riverine rainforest along the cliff edge under an azure African sky. '
            'Palette: cascading water foaming white, mist spray rainbow prismatic colors, basalt gorge charcoal, and lush cliff emerald. '
            'Waterfalls, fluvial geomorphology, Zambezi geology, natural wonders of Africa, majestic, thunderous, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1807,
        "title": "What's the Big Idea about Marine Biology? Life in the Ocean",
        "intent": "Marine Biology Life in the Ocean pelagic coral marine ecosystems",
        "brief": (
            'Book cover design titled "What\'s the Big Idea about Marine Biology? Life in the Ocean". '
            'The title "Life in the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT MARINE BIOLOGY & OCEAN DIVERSITY DAYLIGHT STYLE: A sun-dappled, crystalline tropical ocean underwater paradise in sparkling midday sunlight. '
            'In the center foreground, a magnificent sea turtle gliding gracefully over a thriving, colorful coral reef garden of staghorn corals and sea fans. '
            'Schooling silvery fish darting in formation, an orange clownfish peeking from sea anemone tentacles, and a manta ray soaring gracefully in the sunlit background. '
            'Marine biology specimen collection slates, plankton net diagrams, and water salinity measurement tools in clean educational graphics. '
            'Palette: ocean lagoon turquoise, coral violet and orange, sea turtle amber, and sunbeam radiant gold. '
            'Marine biology, ocean life, coral reef ecology, pelagic biodiversity, ocean conservation, joyful, brilliant, and educational. '
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

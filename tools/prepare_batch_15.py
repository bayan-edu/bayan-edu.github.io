import os

books = [
    {
        "id": 1605,
        "title": "Every Drop Counts",
        "intent": "Every Drop Counts water conservation freshwater ecology",
        "brief": (
            'Book cover design titled "Every Drop Counts". '
            'The title "Every Drop Counts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT WATER CONSERVATION & SUSTAINABILITY DAYLIGHT STYLE: A sunlit, clean educational scene bathed in bright natural morning daylight. '
            'In the center foreground, a single crystal-clear water droplet falling from a brass garden spigot into a precision glass graduated beaker. '
            'Beside it, a thriving drought-tolerant flowering succulent and miniature drip-irrigation tubes gently nourishing green plant roots. '
            'In the background, a sunny community garden with rain collection barrels and lush vegetables under a brilliant blue sky. '
            'Palette: water aquamarine, garden emerald green, terracotta earth, brass gold, and sunny sky blue. '
            'Freshwater conservation, sustainability, environmental care, water cycle, bright and uplifting. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1614,
        "title": "The Spider Chronicle",
        "intent": "The Spider Chronicle arachnology orb web silk",
        "brief": (
            'Book cover design titled "The Spider Chronicle". '
            'The title "The Spider Chronicle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INTRICATE ARACHNOLOGY & SPIDER SILK DAYLIGHT STYLE: A sun-drenched botanical garden scene in radiant morning sunlight. '
            'In the center foreground, a magnificent, geometrically perfect orb spider web suspended between green flowering bramble branches, covered in sparkling morning dew drops that reflect the sun like jewels. '
            'A gentle, colorful yellow-and-black garden orb-weaver spider resting patiently at the center of the web. '
            'In the corner, an educational magnifying inset illustrating the microscopic protein structure of tensile spider dragline silk. '
            'Palette: dew crystal white, garden spider yellow and black, leaf emerald green, and golden morning sunbeams. '
            'Arachnology, spider silk biopolymers, nature architecture, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1615,
        "title": "Are the Everglades Forever?",
        "intent": "Are the Everglades Forever wetlands subtropical ecology",
        "brief": (
            'Book cover design titled "Are the Everglades Forever?". '
            'The title "Are the Everglades Forever?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUSH SUBTROPICAL EVERGLADES WETLANDS DAYLIGHT STYLE: A breathtaking, sun-drenched panoramic view of the Florida Everglades "River of Grass" in brilliant daylight. '
            'Vast expanses of golden-green sawgrass stretching to the horizon under sweeping azure skies with billowy white cumulus clouds. '
            'In the foreground, a tranquil freshwater slough with floating fragrant water lilies and bald cypress trees with distinctive knobby knees emerging from clear water. '
            'A pink roseate spoonbill and a snowy egret wading gracefully near the water\'s edge. '
            'Palette: sawgrass golden-green, cypress moss emerald, spoonbill coral pink, slough aquamarine, and vast sky blue. '
            'Subtropical ecology, wetland conservation, Everglades preservation, biodiversity, vibrant and scenic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1616,
        "title": "A Drop's Journey",
        "intent": "A Drops Journey hydrological water cycle precipitation",
        "brief": (
            'Book cover design titled "A Drop\'s Journey". '
            'The title "A Drop\'s Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNIFICENT HYDROLOGICAL WATER CYCLE DAYLIGHT STYLE: A sweeping panoramic natural landscape illustrating the continuous journey of water through nature in radiant daylight. '
            'Snow-capped alpine mountain peaks feeding a crystal-clear cascading waterfall and rushing river, winding through lush forested valleys into a sunlit ocean bay. '
            'Puffy white cumulus clouds with gentle summer rain falling over the mountains, and glistening evaporation vapor rising softly over the sea in bright sunshine. '
            'Clean circular diagrammatic arrows tracing evaporation, condensation, precipitation, and groundwater runoff. '
            'Palette: alpine glacier white, cascading river cyan, forest emerald green, deep sea cobalt, and sunny golden yellow. '
            'Hydrological cycle, meteorology, Earth systems, freshwater geography, clear and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1617,
        "title": "Desertification",
        "intent": "Desertification soil degradation arid climate land restoration",
        "brief": (
            'Book cover design titled "Desertification". '
            'The title "Desertification" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ARID LAND DEGRADATION & RESTORATION DAYLIGHT STYLE: A powerful, sunlit geological and ecological scene under radiant desert skies. '
            'In the foreground, parched dry cracked clay earth and shifting wind-swept golden sand dunes encroaching on dry grasslands. '
            'In contrast, a resilient green acacia tree and newly planted drought-resistant soil-stabilizing desert shrubs blooming with yellow blossoms. '
            'Soil moisture sensors, contour stone bunds holding back runoff, and green agroforestry restoration techniques highlighted in clean educational style. '
            'Palette: desert golden ochre, cracked earth terracotta, acacia leaf sage green, and clear brilliant desert sky blue. '
            'Desertification science, land degradation, soil restoration, climate resilience, impactful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1618,
        "title": "Designing the First Flying Machine",
        "intent": "Designing the First Flying Machine early aviation aerodynamics glider",
        "brief": (
            'Book cover design titled "Designing the First Flying Machine". '
            'The title "Designing the Flying Machine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EARLY AVIATION & AERODYNAMIC DESIGN DAYLIGHT STYLE: A bright, sunlit coastal sand dune on a windy morning at Kitty Hawk under clear skies. '
            'In the center foreground, a beautifully constructed early biplane glider made of lightweight spruce wood ribs, white muslin canvas wings, and tensioned bicycle spoke wire rigging. '
            'On an outdoor wooden trestle table: hand-drawn cambered wing airfoil cross-section diagrams, a brass wind-tunnel testing lift balance, wooden carving chisels, and spruce propellers. '
            'Palette: muslin canvas white, spruce wood honey, dune sand beige, wire chrome silver, and coastal blue sky. '
            'Aviation history, aerodynamic engineering, wing lift, pioneering flight, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1619,
        "title": "Developing Possible Solutions",
        "intent": "Developing Possible Solutions engineering prototyping innovation",
        "brief": (
            'Book cover design titled "Developing Possible Solutions". '
            'The title "Developing Possible Solutions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CREATIVE ENGINEERING PROTOTYPE WORKSHOP DAYLIGHT STYLE: A sunlit, well-organized engineering design studio filled with bright morning light. '
            'On a broad drafting table: architectural blueprint tracings with alternative design options labeled Option A and Option B, technical mechanical sketches, and flowchart decision trees. '
            'Precision mechanical prototypes: colorful interlocking gears, balsa wood truss bridge models, 3D printed mechanical linkages, and digital calipers. '
            'Palette: blueprint cyan, prototype orange, timber blonde, mechanical graphite, and clean studio white. '
            'Engineering design method, iterative testing, problem-solving, STEM innovation, energetic and clear. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1620,
        "title": "Heat, Energy, and Bicycling in New York City",
        "intent": "Heat Energy Bicycling NYC mechanics friction thermal",
        "brief": (
            'Book cover design titled "Heat, Energy, and Bicycling in New York City". '
            'The title "Heat, Energy & Bicycling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'URBAN CYCLING PHYSICS & THERMODYNAMICS DAYLIGHT STYLE: A bright, sunlit morning scene in a scenic urban park along the Hudson River with the iconic New York City skyline in the background. '
            'In the center foreground, a modern high-performance commuter bicycle resting on a clean bike lane. '
            'Close-up focus on the mechanical drivetrain: precision chain derailleur, spinning wheel spokes, and rubber tire tread against asphalt. '
            'Subtle, elegant vector diagrams showing kinetic energy transformation, rolling resistance friction, and aerodynamic drag airflow lines in bright sunshine. '
            'Palette: racing bicycle cyan, NYC brick terracotta, park green, mechanical metallic silver, and brilliant morning sky blue. '
            'Urban physics, bicycle mechanics, kinetic energy, thermodynamics, vibrant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1621,
        "title": "Is the Earth Getting Warmer?",
        "intent": "Is the Earth Getting Warmer climate science global temperature",
        "brief": (
            'Book cover design titled "Is the Earth Getting Warmer?". '
            'The title "Is the Earth Getting Warmer?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLIMATE SCIENCE & ATMOSPHERIC MONITORING DAYLIGHT STYLE: A sunlit, high-altitude alpine atmospheric climate observatory in pristine daylight. '
            'In the center, a 3D translucent globe of the Earth overlaid with clean, scientific global surface temperature trend curves and heat anomaly color bands. '
            'In the background, majestic snow-covered peaks, melting glacier moraines, and meteorological weather instruments (barometers, pyranometers, and atmospheric CO2 sensors) gleaming in crisp sunshine. '
            'Palette: atmospheric sky blue, glacier white, temperature coral orange, cobalt blue, and sunlight gold. '
            'Climatology, global temperature analysis, Earth science, atmospheric data, clear, scientific, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1623,
        "title": "Mix the Old with the New",
        "intent": "Mix the Old with the New architectural design historic modern",
        "brief": (
            'Book cover design titled "Mix the Old with the New". '
            'The title "Mix the Old with the New" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HARMONIOUS ARCHITECTURAL INTEGRATION DAYLIGHT STYLE: A magnificent, sun-drenched architectural scene showcasing historic heritage blending seamlessly with cutting-edge sustainable modern design. '
            'A historic 19th-century red-brick and carved stone archway gracefully meeting a sleek, modern glass-and-steel atrium with a lush vertical living plant wall. '
            'Architectural drafting tools, T-squares, scale models, and modern CAD tablet displays resting on a sunny outdoor terrace table under clear blue skies. '
            'Palette: historic brick terracotta, modern glass cerulean blue, living plant emerald green, limestone cream, and sunny sky cyan. '
            'Architecture, historic preservation, modern engineering, adaptive reuse, inspiring and bright. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1624,
        "title": "\"Seven Minutes of Terror,\" Eight Years of Ingenuity",
        "intent": "Seven Minutes of Terror Mars rover sky crane entry descent landing",
        "brief": (
            'Book cover design titled "\\"Seven Minutes of Terror,\\" Eight Years of Ingenuity". '
            'The title "Seven Minutes of Terror" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AEROSPACE MARS ROVER DESCENT & ENTRY DAYLIGHT STYLE: A thrilling, scientifically accurate scene of the Mars rover Sky Crane descent stage over Gale Crater on Mars in daylight. '
            'The rocket-powered descent stage firing pulsed hydrazine thrusters, lowering the robotic exploration rover on nylon tethers to the rusty Martian surface. '
            'A giant supersonic parachute drifting in the thin Martian pinkish-tan sky in the upper background. '
            'Martian red rocks, crater walls, and landing telemetry vector graphics in crisp detail. '
            'Palette: Martian rust red, hydrazine rocket flame orange, rover metallic gold and white, and crater dust amber. '
            'Space exploration, Mars landing engineering, aerospace robotics, telemetry science, dramatic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1626,
        "title": "Thunderstorm Types",
        "intent": "Thunderstorm Types meteorology supercell cumulonimbus weather",
        "brief": (
            'Book cover design titled "Thunderstorm Types". '
            'The title "Thunderstorm Types" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGICAL SUPERCELL & CLOUD ANATOMY DAYLIGHT STYLE: A vast, breathtaking panoramic view of the Great Plains under daytime storm development. '
            'A towering supercell cumulonimbus cloud showing distinct anatomical features: flat anvil top spreading across the upper troposphere, rotating mesocyclone wall cloud, and precipitation shafts illuminated by sunlight. '
            'Educational cross-sectional vector overlays showing warm rising updraft arrows (red) and cool downdraft rain shafts (blue). '
            'Green prairie grassland in the foreground with a weather Doppler radar truck station monitoring the skies. '
            'Palette: stormy slate blue, cloud billow white, prairie green, updraft coral red, and sunbeam gold. '
            'Meteorology, cloud physics, thunderstorm dynamics, severe weather science, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1627,
        "title": "Will Human Life on Earth Come to an End?",
        "intent": "Will Human Life on Earth Come to an End planetary science biosphere",
        "brief": (
            'Book cover design titled "Will Human Life on Earth Come to an End?". '
            'The title "Earth\'s Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLANETARY BIOSPHERE & COSMIC RESILIENCE STYLE: A majestic, thought-provoking view of planet Earth in space, bathed in radiant golden sunlight from the Sun. '
            'The vibrant blue oceans, swirling white clouds, and green continents wrapped in a glowing, thin atmospheric protective veil. '
            'Distant asteroids in harmless solar orbit, orbital solar monitoring arrays, and stylized educational equilibrium scales showing balance between planetary biosphere and cosmic timescales. '
            'Palette: Earth ocean blue, cloud pure white, continent green, cosmic deep navy, and brilliant solar gold. '
            'Planetary science, Earth\'s future, biosphere conservation, astronomy, majestic and contemplative. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1637,
        "title": "Where Am I?",
        "intent": "Where Am I satellite navigation GPS cartography",
        "brief": (
            'Book cover design titled "Where Am I?". '
            'The title "Where Am I?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL SATELLITE NAVIGATION & CARTOGRAPHY DAYLIGHT STYLE: A sunlit, high-tech cartography and navigation explorer desk. '
            'In the center foreground, a rugged handheld GPS receiver displaying digital topographic elevation contours and precise latitude-longitude coordinates. '
            'Beside it, a traditional brass mariner\'s compass, a folded paper geological map, and a brass drafting divider. '
            'Overhead in daylight, a 3D orbital diagram showing a constellation of GPS satellites transmitting trilateration signal beams to the surface of Earth. '
            'Palette: navigation cyan, map parchment cream, brass gold, satellite solar blue, and mountain green. '
            'Satellite navigation, GPS technology, cartography, triangulation, geometry of positioning, clear and engaging. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1639,
        "title": "Plants",
        "intent": "Plants kingdom plantae botany biodiversity flora",
        "brief": (
            'Book cover design titled "Plants". '
            'The title "Plants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUSH BOTANICAL KINGDOM BIODIVERSITY DAYLIGHT STYLE: A glorious, sun-drenched botanical garden conservatory celebrating the incredible diversity of plant life in radiant morning light. '
            'In the center foreground, an array of botanical marvels: giant green monstera leaves with dewdrops, a blooming scarlet hibiscus flower, delicate emerald mosses and ferns, and a flowering desert succulent. '
            'Sunbeams streaming through the greenhouse glass, highlighting delicate leaf venation patterns and photosynthesis chloroplast green. '
            'A classic brass botanist\'s magnifying glass and terra cotta potting vessels on a weathered timber garden bench. '
            'Palette: lush plant emerald green, hibiscus crimson red, sunbeam gold, terra cotta orange, and clear sky cyan. '
            'Botany, Plant Kingdom, plant diversity, photosynthesis, natural beauty, bright and educational. '
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

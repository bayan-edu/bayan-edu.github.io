import os

books = [
    {
        "id": 1452,
        "title": "Different Forms of Water",
        "intent": "Different Forms of Water",
        "brief": (
            'Book cover design titled "Different Forms of Water". '
            'The title "Different Forms of Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT STATES OF WATER SCIENCE DAYLIGHT STYLE: A sunlit, pristine kitchen science workbench on a bright sunny day in natural daylight. '
            'In the center foreground, a tall crystal-clear drinking glass filled with pure water and crystalline geometric ice cubes clinking together with glistening condensation droplets running down the glass. '
            'Beside it, a clean porcelain teapot releasing gentle, translucent steam vapor plumes catching golden morning sunbeams pouring through a window. '
            'Palette: water and ice crystal cyan and white, porcelain teapot ivory, and room daylight warm gold. '
            'States of matter, water cycle, solid liquid gas, thermal physics, clean, refreshing, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1453,
        "title": "Dirty Job",
        "intent": "Dirty Job",
        "brief": (
            'Book cover design titled "Dirty Job". '
            'The title "Dirty Job" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ENVIRONMENTAL ENGINEERING REMEDIATION STYLE: A sunlit modern environmental containment and land reclamation facility in bright daylight. '
            'In the center foreground, heavy yellow civil engineering earthmoving machinery carefully capping a modern engineered containment cell with protective clay and impervious synthetic liner layers. '
            'In the background, clean groundwater monitoring wells, solar environmental sensors, and restored green hillside meadows with wildflowers under a clear azure sky. '
            'Palette: machinery safety yellow and steel, soil rich terra-cotta clay, reclaimed meadow emerald, and sky bright cyan. '
            'Environmental engineering, hazardous waste management, land reclamation, civil sanitation, bright, responsible, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1454,
        "title": "Double Vision",
        "intent": "Double Vision",
        "brief": (
            'Book cover design titled "Double Vision". '
            'The title "Double Vision" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT 3D STEREOSCOPY & OPTICS DAYLIGHT STYLE: A sunlit optics laboratory study table in bright natural daylight. '
            'In the center foreground, an antique brass-mounted stereoscope viewer holding a pair of side-by-side photographic stereocards displaying depth. '
            'Beside the stereoscope rest modern polarized red-and-cyan 3D glasses, an optical glass prism splitting light rays, and clean educational diagrams illustrating binocular parallax and retinal disparity. '
            'Palette: stereoscope polished brass and mahogany, 3D glasses vivid cyan and ruby red, and study table warm oak. '
            'Optics, stereoscopy, 3D technology, binocular vision, perception science, bright, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1455,
        "title": "Driven to Distraction",
        "intent": "Driven to Distraction",
        "brief": (
            'Book cover design titled "Driven to Distraction". '
            'The title "Driven to Distraction" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AUTOMOTIVE SAFETY SCIENCE DAYLIGHT STYLE: A sunlit automotive cockpit and windshield view on a clear sunny morning in bright daylight. '
            'In the center foreground, a modern vehicle dashboard with a smartphone secured safely in a dashboard mount, its screen cleanly displaying a bright green "Driving Focus Active" icon. '
            'Through the crystal-clear panoramic windshield, a straight, open country highway stretches toward rolling green hills under a bright blue sky, with clear yellow road markings and safety reflectors. '
            'Palette: highway asphalt slate, lane markings safety yellow, dashboard charcoal and brushed aluminum, and sky radiant blue. '
            'Road safety, driver distraction, cognitive focus, traffic science, bright, responsible, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1456,
        "title": "Electromagnetic Radiation",
        "intent": "Electromagnetic Radiation",
        "brief": (
            'Book cover design titled "Electromagnetic Radiation". '
            'The title "Electromagnetic Radiation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ELECTROMAGNETIC SPECTRUM PHYSICS DAYLIGHT STYLE: A sunlit, magnificent physics laboratory exhibit in bright natural daylight. '
            'In the center foreground, a triangular glass optical prism refracting a beam of natural sunlight into a dazzling, vivid rainbow spectrum across a clean white laboratory table. '
            'Curving gracefully above the table is an educational glowing wave spectrum ribbon illustrating the continuum from radio waves to infrared, visible light, ultraviolet, and X-rays with clean frequency markers. '
            'Palette: visible spectrum rainbow (red, orange, yellow, green, cyan, indigo, violet), prism crystal glass, and lab daylight white. '
            'Electromagnetic radiation, wave physics, optics, light spectrum, physics education, bright, colorful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1457,
        "title": "Finding Fault",
        "intent": "Finding Fault",
        "brief": (
            'Book cover design titled "Finding Fault". '
            'The title "Finding Fault" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SEISMOLOGY & FAULT LINE GEOLOGY DAYLIGHT STYLE: A sun-drenched geological field research site along the San Andreas fault line in California in radiant bright daylight. '
            'In the center foreground, a dramatic natural fault scarp revealing layered geological strata with a visible tectonic offset. '
            'Beside the fault sits a modern seismic field monitoring station with a solar panel, GPS antenna, and a seismograph drum actively recording clean sinusoidal earthquake tremors on grid paper, beside a geologist\'s hammer. '
            'Palette: fault rock terracotta and ochre, seismograph steel and solar blue, vegetation desert sage green, and sky clear cyan. '
            'Geophysics, seismology, earthquake faults, plate tectonics, Earth science, adventurous, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1458,
        "title": "Flamingo Fun",
        "intent": "Flamingo Fun",
        "brief": (
            'Book cover design titled "Flamingo Fun". '
            'The title "Flamingo Fun" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL WETLAND FLAMINGO FLOCK DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical lagoon in radiant morning daylight. '
            'In the center foreground, a flock of magnificent American flamingos with vibrant coral-pink plumage, long elegant S-curved necks, and distinctive curved pink-and-black bills wading gracefully in shallow turquoise waters. '
            'Surrounding them are lush tropical water reeds, blooming pink water lilies, and sparkling golden sunbeams dancing on the calm water surface. '
            'Palette: flamingo coral-pink and scarlet, lagoon water sparkling turquoise, reeds emerald green, and sunlight radiant gold. '
            'Ornithology, flamingo behavior, wetland ecosystems, wildlife biology, vibrant, cheerful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1459,
        "title": "Human Microbiome: Your Body Is an Ecosystem",
        "intent": "Human Microbiome Your Body Is an Ecosystem",
        "brief": (
            'Book cover design titled "Human Microbiome: Your Body Is an Ecosystem". '
            'The title "Human Microbiome: Your Body Is an Ecosystem" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT HUMAN MICROBIOME ECOSYSTEM DAYLIGHT STYLE: A sunlit, friendly biology laboratory exhibit in bright natural daylight. '
            'In the center foreground, an elegant translucent biological model surrounded by stylized, glowing, friendly microflora colonies in pleasant pastel colors (beneficial lactobacillus, bifidobacterium, and gut microbes). '
            'Beside the model on a clean white desk rest a high-power optical microscope, colorful petri dishes with cultured probiotic colonies, and clean educational diagrams explaining bacterial symbiosis. '
            'Palette: microbes friendly mint green, lilac, and peach, microscope brushed steel, and laboratory daylight white. '
            'Microbiology, human microbiome, symbiotic bacteria, health ecology, bright, friendly, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1460,
        "title": "Ice Picks",
        "intent": "Ice Picks",
        "brief": (
            'Book cover design titled "Ice Picks". '
            'The title "Ice Picks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ANTARCTIC NEUTRINO OBSERVATORY DAYLIGHT STYLE: A breathtaking, sun-illuminated polar research station on the Antarctic ice cap under 24-hour arctic summer sunlight. '
            'In the center foreground, the modern IceCube Neutrino Observatory facility raised on red steel pillars above the vast sparkling snow plateau. '
            'In the foreground, a cylindrical Antarctic ice core glistening in direct sunlight, hot-water ice drilling cables, and a digital monitor displaying glowing spherical 3D neutrino collision photon events deep within the ice. '
            'Palette: Antarctic snow pristine diamond white and ice cyan, station exterior safety red, and sky brilliant polar blue. '
            'Astrophysics, neutrino astronomy, IceCube South Pole observatory, polar science, bright, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1461,
        "title": "Ingredients for a Thunderstorm",
        "intent": "Ingredients for a Thunderstorm",
        "brief": (
            'Book cover design titled "Ingredients for a Thunderstorm". '
            'The title "Ingredients for a Thunderstorm" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT METEOROLOGY & THUNDERSTORM MECHANICS DAYLIGHT STYLE: A sunlit, dynamic meteorological landscape in bright daylight. '
            'In the center, a colossal, billowing white cumulonimbus cloud rising majestically into a bright blue sky over green rolling hills, showing the three key ingredients: moisture from sunny blue lakes, atmospheric thermal instability, and updraft lift arrows. '
            'Beside the cloud, clean educational graphic callouts illustrate warm updrafts, moisture evaporation, and condensation levels. '
            'Palette: cloud billowing brilliant white, sky deep azure cyan, landscape fresh emerald green, and educational arrows bright yellow. '
            'Meteorology, thunderstorm formation, atmospheric physics, weather science, dynamic, educational, bright, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1463,
        "title": "Mountain Lions: Purr-fect Predators",
        "intent": "Mountain Lions Purr fect Predators",
        "brief": (
            'Book cover design titled "Mountain Lions: Purr-fect Predators". '
            'The title "Mountain Lions: Purr-fect Predators" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ROCKY MOUNTAIN COUGAR WILDLIFE DAYLIGHT STYLE: A sun-drenched, rugged Rocky Mountain granite ridge in radiant morning daylight. '
            'In the center foreground, a magnificent, healthy mountain lion (cougar) with a muscular golden-tan coat, alert rounded ears, and piercing amber eyes perched regally on a warm granite rock ledge. '
            'In the vast background, sweeping evergreen pine forests, alpine meadows, and snow-capped peaks stretch under a brilliant blue sky. '
            'Palette: mountain lion warm tawny gold and cream, granite rock warm gray, pine forest evergreen, and sky radiant cyan. '
            'Wildlife biology, apex predators, mountain lion ecology, North American mammals, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1464,
        "title": "Our Changing Solar System",
        "intent": "Our Changing Solar System",
        "brief": (
            'Book cover design titled "Our Changing Solar System". '
            'The title "Our Changing Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CELESTIAL MECHANICS & PLANETARY ORBITS STYLE: An awe-inspiring, sun-illuminated astronomical visualization of the solar system in educational brilliance. '
            'At the center, the brilliant golden Sun casting radiant sunbeams across geometric orbital rings holding the planets: blue Earth, red Mars, ringed Saturn, and banded Jupiter in cosmic harmony. '
            'Educational callout rings showcase planetary formation accretion disks and asteroid belts in rich, bright colors. '
            'Palette: Sun radiant gold, Earth sapphire, Mars rust red, Saturn amber, and space vibrant deep indigo. '
            'Astronomy, planetary evolution, solar system science, celestial mechanics, majestic, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1465,
        "title": "Perfect Fit",
        "intent": "Perfect Fit",
        "brief": (
            'Book cover design titled "Perfect Fit". '
            'The title "Perfect Fit" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TRANSPLANT IMMUNOLOGY SCIENCE DAYLIGHT STYLE: A sunlit medical research laboratory in bright natural daylight. '
            'In the center foreground, an elegant 3D anatomical model of a healthy human liver with detailed vascular architecture, resting beside an intricate, colorful 3D molecular model of compatible blood type antigens and immune cell receptors. '
            'On a clean wooden research desk rest a chrome stethoscope, a medical microscope, and an open volume of medical immunology. '
            'Palette: anatomical liver warm terra-cotta, immune molecules coral and mint, stethoscope chrome, and daylight bright ivory. '
            'Organ transplantation, immunology, medical breakthroughs, cell biology, hopeful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1466,
        "title": "Pronghorns Find Their Path",
        "intent": "Pronghorns Find Their Path",
        "brief": (
            'Book cover design titled "Pronghorns Find Their Path". '
            'The title "Pronghorns Find Their Path" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT WILDLIFE CORRIDOR & PRAIRIE MIGRATION DAYLIGHT STYLE: A sun-drenched Wyoming sagebrush prairie in glorious morning daylight. '
            'In the center foreground, a small group of elegant, swift pronghorn antelopes with reddish-brown coats and white neck patches running gracefully toward a dedicated vegetated wildlife overpass bridge spanning a highway. '
            'In the vast background, snow-dusted mountain ranges rise above golden prairie grasslands under a wide open blue sky. '
            'Palette: pronghorn coat russet and pure white, prairie grass golden ochre, sagebrush silvery green, and sky radiant azure. '
            'Wildlife conservation, migration corridors, pronghorn biology, highway ecology, bright, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1467,
        "title": "Restoring Coastal Habitats for Turtles",
        "intent": "Restoring Coastal Habitats for Turtles",
        "brief": (
            'Book cover design titled "Restoring Coastal Habitats for Turtles". '
            'The title "Restoring Coastal Habitats for Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT COASTAL DUNE & TURTLE SANCTUARY DAYLIGHT STYLE: A sun-drenched, pristine coastal beach in bright morning daylight. '
            'In the center foreground, rolling golden sand dunes stabilized by flourishing sea oats and purple beach morning glory vines, marked with wooden conservation flags protecting a sea turtle nesting site. '
            'In the background, crystal-clear turquoise ocean waves break gently on sandy shores under a brilliant blue sky with soaring sea gulls. '
            'Palette: sand warm golden ochre, ocean sparkling turquoise, sea oats amber and green, and sky sunny azure. '
            'Marine biology, sea turtle conservation, coastal dune restoration, coastal ecology, wholesome, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1468,
        "title": "Roseate Spoonbills: Migrating through the Mangroves",
        "intent": "Roseate Spoonbills Migrating through the Mangroves",
        "brief": (
            'Book cover design titled "Roseate Spoonbills: Migrating through the Mangroves". '
            'The title "Roseate Spoonbills: Migrating through the Mangroves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SUBTROPICAL MANGROVE ORNITHOLOGY DAYLIGHT STYLE: A sunlit, crystal-clear coastal mangrove estuary in Florida in bright morning daylight. '
            'In the center foreground, a magnificent roseate spoonbill wading gracefully in shallow tidal waters, displaying its dazzling carmine-pink and rose wings, orange tail feathers, and unique spatulate spoon-shaped bill foraging for minnows. '
            'Surrounding the bird are arched green mangrove prop roots, blossoming yellow mangrove flowers, and sparkling sunbeams dancing on the water. '
            'Palette: spoonbill carmine pink and rose, mangrove foliage lush emerald, water clear aquamarine, and sunlight bright gold. '
            'Ornithology, wading birds, mangrove ecosystems, Florida wildlife, colorful, magnificent, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1469,
        "title": "Rusty Reactions",
        "intent": "Rusty Reactions",
        "brief": (
            'Book cover design titled "Rusty Reactions". '
            'The title "Rusty Reactions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT OXIDATION & CORROSION CHEMISTRY DAYLIGHT STYLE: A sunlit outdoor science laboratory table in bright natural daylight. '
            'In the center foreground, a heavy nautical iron chain showing a dramatic progression: polished, shiny silver-steel links transitioning into rich, flaky reddish-orange rust (iron oxide). '
            'Beside the chain rest a glass beaker of bubbling water, a brass handheld magnifying glass focusing on the granular rust crystals, and an open chemistry lab notebook with chemical reaction equations (Fe + O2 + H2O -> Fe2O3). '
            'Palette: iron steel metallic silver, rust vibrant terracotta and burnt orange, water crystal clear, and wood table warm oak. '
            'Chemical reactions, oxidation, corrosion, chemistry education, materials science, crisp, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1470,
        "title": "Satellites and Gravity",
        "intent": "Satellites and Gravity",
        "brief": (
            'Book cover design titled "Satellites and Gravity". '
            'The title "Satellites and Gravity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ORBITAL GRAVITATIONAL MECHANICS DAYLIGHT STYLE: A sunlit physics study overlooking the curvature of planet Earth in daylight. '
            'In the center foreground, an antique brass desk globe of Earth, an open leather-bound volume of classical physics, and a fresh crisp red apple resting on the desk. '
            'Radiating gracefully from the globe, glowing orbital trajectory paths show a miniature gleaming satellite in permanent freefall orbit around the world, held by gravitational attraction. '
            'Palette: globe brass gold, apple vibrant red, Earth blue and white, and orbital paths radiant cyan. '
            'Physics of gravity, orbital mechanics, Isaac Newton discoveries, satellite dynamics, classic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1471,
        "title": "Sea Monsters",
        "intent": "Sea Monsters",
        "brief": (
            'Book cover design titled "Sea Monsters". '
            'The title "Sea Monsters" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PREHISTORIC PALEONTOLOGY OCEAN DAYLIGHT STYLE: A sun-illuminated, crystal-clear prehistoric ocean vista in bright daylight. '
            'In the center foreground, an impressive fossilized skull and skeletal paddle of the giant Cretaceous marine reptile Mosasaurus embedded in chalk limestone bedrock. '
            'Surrounding the fossil in the clear turquoise water are coiled spiral ammonite shells, prehistoric nautiluses, and shimmering rays of sunlight piercing down to the sea floor. '
            'Palette: fossilized bone slate gray, chalk bedrock warm cream, water sparkling turquoise, and ammonite iridescent pearl. '
            'Paleontology, marine reptiles, Mosasaurus, Cretaceous oceans, Earth history, adventurous, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1473,
        "title": "Shock Waves",
        "intent": "Shock Waves",
        "brief": (
            'Book cover design titled "Shock Waves". '
            'The title "Shock Waves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SEISMIC WAVES & EARTHQUAKE DYNAMICS STYLE: A sunlit geology laboratory exhibit in bright natural daylight. '
            'In the center foreground, a detailed 3D cutaway model of Earth\'s tectonic crust showing a deep fault slip, with colorful concentric expanding shockwave rings (primary P-waves and shear S-waves) propagating outward through rock layers. '
            'Beside the model, an antique brass pendulum seismograph and a modern digital seismogram monitor displaying sharp wave spikes on graph grids. '
            'Palette: crust model terracotta and slate, seismic wave rings electric cyan and warm amber, brass instrument gold, and lab daylight white. '
            'Seismology, seismic wave propagation, New Madrid earthquakes, geophysics, dynamic, bright, educational, completely daylight. '
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

import os

books = [
    {
        "id": 1866,
        "title": "Chasing Dreams on Cloud Nine",
        "intent": "Cloud Nine meteorology cumulonimbus cloud classification",
        "brief": (
            'Book cover design titled "Chasing Dreams on Cloud Nine". '
            'The title "Chasing Dreams on Cloud Nine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'METEOROLOGICAL CLOUD ATLAS & CUMULONIMBUS STYLE: A sun-drenched, awe-inspiring view of the atmosphere on a bright summer afternoon. '
            'In the center, a colossal, majestic Cumulonimbus calvus cloud (historically Cloud 9 in meteorological cloud classification) billowing miles into a brilliant azure sky, '
            'its pure white towers catching radiant golden sunbeams. '
            'Below, a sleek solar-powered research glider aircraft soaring peacefully along thermal updrafts above rolling green hills. '
            'Palette: cloud billow pure white and silver, sky brilliant cobalt cyan, sunbeam radiant gold, and meadow emerald green. '
            'Meteorology, cloud classification, atmospheric physics, soaring flight, wondrous, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1868,
        "title": "New Vinci",
        "intent": "New Vinci biomimicry bio-inspired engineering Leonardo innovation",
        "brief": (
            'Book cover design titled "New Vinci". '
            'The title "New Vinci" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOMIMETIC ENGINEERING & POLYMATH INNOVATION DAYLIGHT STYLE: A sunlit, inspiring inventor\'s workshop in bright morning natural light. '
            'On a wide oak drafting table, an antique parchment blueprint of Leonardo da Vinci\'s mechanical flying wing merging seamlessly into a cutting-edge 3D CAD holographic wireframe. '
            'In the center, a high-tech bio-inspired robotic dragonfly drone with translucent iridescent wings, brass drafting calipers, gear mechanisms, and open botanical sketchbooks. '
            'Sunbeams streaming through arched studio windows. '
            'Palette: parchment antique gold, robotic dragonfly iridescent cyan and titanium chrome, oak wood, and morning sunbeam white. '
            'Biomimicry, historical innovation to modern robotics, engineering design, polymath creativity, scholarly and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1870,
        "title": "Save the Whales",
        "intent": "Save the Whales cetacean conservation humpback marine sanctuary",
        "brief": (
            'Book cover design titled "Save the Whales". '
            'The title "Save the Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEANIC CETACEAN CONSERVATION DAYLIGHT STYLE: A sun-drenched, crystal-clear coastal ocean panorama in sparkling midday sunlight. '
            'In the center foreground, a magnificent humpback whale mother and calf swimming gracefully near the surface of vibrant turquoise waters, glistening sunbeams dancing across their flippers. '
            'In the background, a marine research sailboat with solar panels and hydrophone recording equipment sailing peacefully under clear blue skies. '
            'Clean vector infographics showing marine protected sanctuaries and global migration corridors. '
            'Palette: humpback slate blue and white, ocean deep sapphire and turquoise, boat sail crisp white, and sunlight gold. '
            'Marine mammal conservation, whale biology, ocean stewardship, marine protected areas, breathtaking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1871,
        "title": "Teff, the Ancient Grain of Ethiopia",
        "intent": "Teff Ancient Grain Ethiopia agricultural botany agronomy gluten free",
        "brief": (
            'Book cover design titled "Teff, the Ancient Grain of Ethiopia". '
            'The title "Teff: Ancient Grain of Ethiopia" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ETHIOPIAN HIGHLAND AGRONOMY & ANCIENT BOTANY DAYLIGHT STYLE: A sun-drenched agricultural landscape in the Ethiopian highlands on a glorious sunny morning. '
            'In the foreground, graceful, delicate flowering panicles of teff grass (Eragrostis tef) with golden seed heads swaying gently in the breeze. '
            'On a rustic woven Ethiopian basket tray: tiny, nutritious reddish-brown and ivory teff grains, a clay grinding stone, and fresh injera flatbread. '
            'Rolling green terraced volcanic hills and acacia trees under a brilliant sunny blue sky. '
            'Palette: teff grain warm terracotta and ivory, grass golden-green, highland terrace emerald, and sunny sky blue. '
            'Agricultural botany, ancient grains, agronomy, food security, Ethiopian history, wholesome, scenic, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1872,
        "title": "What's Up, Doc?",
        "intent": "Whats Up Doc medical diagnosis clinical examination stethoscope",
        "brief": (
            'Book cover design titled "What\'s Up, Doc?". '
            'The title "What\'s Up, Doc?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLINICAL MEDICAL SCIENCE & DIAGNOSTIC TOOLS DAYLIGHT STYLE: A sunlit, clean medical consultation and diagnostic study in bright morning light. '
            'In the center foreground, on a polished blonde-wood examination desk: a modern precision stethoscope with stainless-steel chestpiece, an otoscope with diagnostic ear speculum, '
            'a reflex hammer, a digital blood pressure monitor, and clean anatomical medical charts illustrating health vitals. '
            'A glass pitcher of water with lemon slices, a medical notepad, and a green potted plant under sunny clinic windows. '
            'Palette: clinical teal blue, stainless steel chrome, white porcelain, desk blonde oak, and natural morning sunlight. '
            'Medical science, diagnostic medicine, healthcare tools, clinical examination, informative, reassuring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1873,
        "title": "Why Do Bats Live in Caves?",
        "intent": "Why Do Bats Live Caves chiroptera cave microclimate roosting",
        "brief": (
            'Book cover design titled "Why Do Bats Live in Caves?". '
            'The title "Why Do Bats Live in Caves?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CAVE MICROCLIMATE & BAT ROOSTING ECOLOGY DAYLIGHT STYLE: A sunlit, fascinating view at the entrance archway of a vast natural limestone cave in morning daylight. '
            'Hanging from the textured calcite ceiling, a cluster of gentle brown microbats roosting upside down with wings wrapped snugly around themselves. '
            'Morning sunlight illuminates the cave entrance, revealing lush green ferns clinging to damp limestone rock walls and dripping mineral stalactites. '
            'Clean educational infographics illustrating cave microclimate: constant stable humidity, temperature regulation, and predator protection. '
            'Palette: cave limestone warm amber and slate, bat fur soft velvet brown, moss emerald green, and morning entrance daylight. '
            'Chiropteran biology, cave ecology, microclimates, animal adaptations, bat roosting, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1874,
        "title": "Why Do Boats Float and Rocks Sink?",
        "intent": "Why Do Boats Float Rocks Sink Archimedes buoyancy density fluid physics",
        "brief": (
            'Book cover design titled "Why Do Boats Float and Rocks Sink?". '
            'The title "Why Do Boats Float & Rocks Sink?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BUOYANCY & DENSITY FLUID DYNAMICS DAYLIGHT STYLE: A sun-drenched, clear harbor and physics demonstration scene in bright natural daylight. '
            'In the foreground, a large hollow steel boat hull floating effortlessly high on the water surface, contrasted with a small, dense granite pebble sinking to the sandy sea floor. '
            'Clean, bold physics vector diagrams: Upward Buoyant Force (F_buoyant) balanced with Downward Gravitational Weight, and water displacement volume containers. '
            'Glistening water ripples, sailboats on the sunny bay, and clear blue skies. '
            'Palette: ocean aquamarine and clear cyan, boat hull navy and red, granite rock grey, and sunny harbor gold. '
            'Archimedes\' principle, density, buoyancy, fluid physics, water displacement, clear, playful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1875,
        "title": "Why Do Things Look Darker When They Are Wet?",
        "intent": "Things Look Darker Wet optical refraction refractive index scattering",
        "brief": (
            'Book cover design titled "Why Do Things Look Darker When They Are Wet?". '
            'The title "Why Do Things Look Darker When Wet?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OPTICAL PHYSICS & REFRACTIVE INDEX DAYLIGHT STYLE: A sunlit, fascinating optical demonstration scene on a sandy beach on a bright sunny morning. '
            'Side-by-side comparative examination of two identical porous stones: one completely dry and pale chalky grey (diffuse light scattering), '
            'and the other glistening wet with water, revealing deep, rich, saturated dark tones and hidden mineral colors (total internal reflection in water layer). '
            'A prism splitting sunlight, optical ray tracing diagrams showing how water reduces surface scattering, and clear water droplets. '
            'Palette: dry stone chalky pale grey, wet stone deep saturated charcoal, water crystal cyan, and beach sunbeam gold. '
            'Optical physics, refractive index, light scattering, internal reflection, curiosity science, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1876,
        "title": "When I Grow Up",
        "intent": "When I Grow Up STEM careers scientific exploration tools",
        "brief": (
            'Book cover design titled "When I Grow Up". '
            'The title "When I Grow Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'INSPIRING STEM CAREERS & SCIENTIFIC TOOLS DAYLIGHT STYLE: A sun-drenched, joyful exploration workshop celebrating diverse future careers in science and innovation. '
            'In harmonious arrangement on a blonde-wood workbench: a brass astronomer\'s telescope, a biologist\'s optical microscope, a geologist\'s rock hammer and compass, '
            'an engineer\'s drafting T-square and blueprints, a doctor\'s stethoscope, and an astronaut\'s model rocket. '
            'Open sunny windows looking out onto green hills and a brilliant blue sky filled with possibilities. '
            'Palette: timber blonde oak, brass gold, laboratory cyan, drafting blueprint blue, and sunny sky white. '
            'STEM careers, scientific aspirations, future professions, learning and curiosity, bright, cheerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1877,
        "title": "3... 2... 1... Blast-off!",
        "intent": "3 2 1 Blast-off rocket propulsion launch physics countdown",
        "brief": (
            'Book cover design titled "3... 2... 1... Blast-off!". '
            'The title "3... 2... 1... Blast-Off!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXCITING ROCKET LAUNCH & PROPULSION PHYSICS STYLE: A dramatic, sunlit coastal spaceport launchpad scene under clear azure skies. '
            'In the center, a powerful multistage exploration rocket lifting off with immense energy, brilliant golden-white engine exhaust flames, and colossal billowing clouds of water steam from the launchpad sound suppression trenches. '
            'Digital countdown clock numbers (3, 2, 1) and velocity telemetry readout curves in clean graphic design. '
            'Blue ocean and Florida coastline in the background under bright sunshine. '
            'Palette: rocket exterior titanium white and orange, engine flame solar gold, launch steam billowing white, and sky azure cyan. '
            'Rocketry, spaceflight, launch countdown, propulsion physics, aerospace excitement, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1882,
        "title": "The One and Only Human Body",
        "intent": "Human Body anatomy physiology systems skeletal circulatory",
        "brief": (
            'Book cover design titled "The One and Only Human Body". '
            'The title "The One and Only Human Body" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPREHENSIVE HUMAN ANATOMY & PHYSIOLOGY DAYLIGHT STYLE: A sunlit, clean medical biology laboratory and study bathed in bright natural morning light. '
            'In the center foreground, an elegant 3D translucent anatomical acrylic model illustrating the major interconnected human body systems: '
            'the supportive skeletal bone frame, the branching red-and-blue cardiovascular circulatory vessels, the lungs for respiration, and the nervous system. '
            'Medical reference anatomical charts, a microscope, and a glass prism catching sunlight on a polished oak desk. '
            'Palette: circulatory red and royal blue, bone ivory white, acrylic clear cyan, and warm desk oak. '
            'Human anatomy, physiology, body systems, health science, biology education, dignified, inspiring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1883,
        "title": "Asteroid Attack!",
        "intent": "Asteroid Attack impact craters planetary defense meteor crater Arizona",
        "brief": (
            'Book cover design titled "Asteroid Attack!". '
            'The title "Asteroid Attack!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLANETARY IMPACT GEOLOGY & METEOR CRATER STYLE: A sunlit, breathtaking panoramic view of the famous Barringer Meteor Crater in northern Arizona in bright desert sunlight. '
            'The colossal, deep circular impact basin with overturned rock strata and breccia rim rising sharply above the flat Colorado Plateau. '
            'In a split space diagram above: an irregular rocky asteroid traveling through space, kinetic impact energy equations, and planetary defense deflection satellites. '
            'Palette: desert red sandstone terracotta, limestone rim buff, sky brilliant cobalt cyan, and asteroid charcoal. '
            'Impact cratering, meteoritics, planetary defense, solar system collisions, Earth geology, dramatic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1884,
        "title": "A Plant Puzzle",
        "intent": "A Plant Puzzle carnivorous plants Nepenthes sundew botanical adaptations",
        "brief": (
            'Book cover design titled "A Plant Puzzle". '
            'The title "A Plant Puzzle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CARNIVOROUS BOTANICAL ADAPTATIONS DAYLIGHT STYLE: A sun-drenched, exotic botanical conservatory filled with radiant morning greenhouse sunlight. '
            'In the center foreground, a fascinating array of carnivorous plant adaptations: '
            'a tropical hanging pitcher plant (Nepenthes) with slippery wax peristome rim and digestive pool; a sundew (Drosera) with glistening ruby-red tentacles dripping with sticky dew drops; '
            'and a Venus flytrap with sensitive trigger hairs on green hinged traps. '
            'A brass botanist\'s magnifying loupe and botanical sketchbooks in the bright background. '
            'Palette: pitcher plant chartreuse green and speckled maroon, sundew ruby red, dew crystal white, and greenhouse sky cyan. '
            'Carnivorous plants, nutrient-poor soil adaptations, botanical wonders, plant evolution, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1885,
        "title": "Climates - An Introduction to Climates",
        "intent": "Introduction to Climates global climate zones Köppen meteorology biomes",
        "brief": (
            'Book cover design titled "Climates - An Introduction to Climates". '
            'The title "An Introduction to Climates" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL CLIMATE ZONES & KÖPPEN CLASSIFICATION STYLE: A sunlit, comprehensive educational globe and climate panorama in bright daylight. '
            'In the center, a 3D Earth globe showing distinct color-coded global climate bands: Tropical rainforest (equatorial green), Arid desert (warm gold), '
            'Temperate (rich olive), Continental (cool teal), and Polar ice cap (pure white). '
            'Connected to miniature panoramic vignettes illustrating each zone: palm trees in tropics, sand dunes in desert, and snow in the polar zone. '
            'Atmospheric circulation cells (Hadley, Ferrel, Polar cells) softly illustrated in clean graphics. '
            'Palette: tropical emerald green, desert golden ochre, temperate blue-green, polar ice white, and sunny sky blue. '
            'Climatology, global climate zones, Köppen climate classification, solar angle of incidence, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1886,
        "title": "Fish",
        "intent": "Fish ichthyology aquatic biodiversity marine freshwater",
        "brief": (
            'Book cover design titled "Fish". '
            'The title "Fish" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DIVERSE ICHTHYOLOGY & AQUATIC LIFE DAYLIGHT STYLE: A sun-drenched, crystal-clear aquatic panorama in sparkling midday sunlight. '
            'In the center foreground, a magnificent, vibrant collection of diverse fish showcasing aquatic adaptations: '
            'a colorful rainbow trout leaping from a clear freshwater mountain stream, a brilliant orange-and-white clownfish in a sunlit reef anemone, '
            'a sleek blue-and-yellow royal tang, and a delicate golden seahorse anchored to seagrass. '
            'Clean anatomical callouts illustrating gills for oxygen extraction, swim bladders for buoyancy, and lateral line systems. '
            'Palette: trout rainbow pink and olive, clownfish vibrant orange, reef water aquamarine, and sunbeam gold. '
            'Ichthyology, fish biology, marine and freshwater biodiversity, aquatic adaptations, joyful, vibrant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1887,
        "title": "Food Chains",
        "intent": "Food Chains trophic ecology producers herbivores predators decomposers",
        "brief": (
            'Book cover design titled "Food Chains". '
            'The title "Food Chains" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TROPHIC ENERGY TRANSFER & NATURE CYCLE SUNNY DAYLIGHT STYLE: A sunlit, cheerful meadow and pond ecosystem in radiant morning light. '
            'A clear, interconnected sequence illustrating the flow of solar energy through nature: '
            'Radiant Sun -> Sunlit Green Grass (Producer) -> Cheerful Grasshopper (Primary Consumer) -> Leaping Green Frog (Secondary Consumer) '
            '-> Garter Snake -> Soaring Red-Tailed Hawk (Apex Predator). '
            'Glowing golden energy flow arrows and caloric efficiency percentages in crisp, modern vector graphics under a sunny blue sky. '
            'Palette: grass fresh lime green, solar gold, frog emerald, hawk feather amber, and bright sky cyan. '
            'Food chains, trophic levels, energy flow in ecosystems, ecology education, clear, lively, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1888,
        "title": "From One to Many",
        "intent": "From One to Many cell division mitosis development multicellular",
        "brief": (
            'Book cover design titled "From One to Many". '
            'The title "From One to Many" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELLULAR EMBRYOLOGY & MITOSIS DAYLIGHT STYLE: A bright, sunlit modern genetics and developmental biology laboratory in natural morning daylight. '
            'In the center foreground, a striking sequential circular progression of cellular cleavage under high magnification: '
            'a single fertilized zygote cell dividing smoothly into 2 cells, then 4, 8, 16 cells (morula), and forming a multicellular blastula with glowing green and cyan cell membranes. '
            'Chromosomes aligning on mitotic spindle fibers, DNA double helix models, and petri dishes on a clean white laboratory table. '
            'Palette: dividing cells glowing translucent cyan and emerald, nucleus coral pink, laboratory white, and sunny glass reflection. '
            'Cell division, mitosis, embryology, developmental biology, from single cell to multicellular organism, inspiring and educational. '
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

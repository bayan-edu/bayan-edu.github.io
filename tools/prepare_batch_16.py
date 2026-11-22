import os

books = [
    {
        "id": 1648,
        "title": "How Big Is the Moon?",
        "intent": "How Big Is the Moon lunar scale planetary comparison",
        "brief": (
            'Book cover design titled "How Big Is the Moon?". '
            'The title "How Big Is the Moon?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLANETARY SCALE & COMPARATIVE ASTRONOMY STYLE: A brilliant, scientifically grounded scale comparison in space illuminated by radiant sunlight. '
            'The vibrant blue-and-white marble of Earth shown side-by-side with Earth\'s Moon to true scale (Moon diameter roughly one-fourth of Earth). '
            'Clean geometric measurement calipers, diameter dimension callouts (3,474 km vs 12,742 km), and concentric circular orbit radius lines. '
            'A globe of Earth and a high-detail lunar globe resting on a modern educational wooden table in bright morning sunlight. '
            'Palette: Earth ocean blue, lunar silver grey, measurement gold, and clean bright sunlight white. '
            'Astronomy, planetary scale, lunar geometry, space science, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1649,
        "title": "Kerið Crater",
        "intent": "Kerid Crater volcanic caldera lake Iceland geology",
        "brief": (
            'Book cover design titled "Kerið Crater". '
            'The title "Kerið Crater" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR ICELANDIC VOLCANIC CALDERA DAYLIGHT STYLE: A sun-drenched, breathtaking aerial landscape of the Kerið volcanic caldera lake in Iceland under clear blue skies. '
            'Vivid red and black volcanic basalt slopes dramatically descending into a deep, crystal-clear aquamarine-turquoise mineral water lake. '
            'Velvety green Icelandic moss and wild alpine flowers clinging to the crater rim in bright sunlight. '
            'Geological stratification markers and volcanic mineral analysis icons illustrated cleanly in the corner. '
            'Palette: volcanic crimson red, lake aquamarine turquoise, moss lime green, basalt charcoal, and sky cyan. '
            'Volcanology, Icelandic geology, caldera formation, natural wonder, bright, stunning, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1650,
        "title": "Learning about Space",
        "intent": "Learning about Space astronomy exploration observatory",
        "brief": (
            'Book cover design titled "Learning about Space". '
            'The title "Learning about Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ASTRONOMY STUDY & SPACE EXPLORATION DAYLIGHT STYLE: A sunlit, inspiring astronomical observatory library on a bright clear morning. '
            'On a warm wooden study desk: a polished brass armillary sphere, an antique refractor telescope on a tripod pointed toward sunny windows, and colorful celestial star charts showing constellations. '
            'Precision models of the planets of the solar system, a cutaway rocket model, and an open astronomy field logbook with orbital sketches. '
            'Palette: celestial navy blue, polished brass gold, star chart parchment cream, and bright morning sunbeams. '
            'Space education, amateur astronomy, solar system discovery, inspiring and scholarly. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1651,
        "title": "Moving Through Space",
        "intent": "Moving Through Space orbital mechanics propulsion spacecraft",
        "brief": (
            'Book cover design titled "Moving Through Space". '
            'The title "Moving Through Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC ORBITAL MECHANICS & PROPULSION STYLE: A high-tech spacecraft maneuvering through solar orbit, bathed in brilliant sunlight. '
            'An advanced interplanetary probe firing glowing blue ion propulsion thrusters, leaving a subtle ionized plasma trail. '
            'Curved orbital trajectory lines showing Hohmann transfer orbits, gravitational slingshot velocity vectors, and elliptical planetary transfer paths around the Sun. '
            'Solar array wings glistening with golden photovoltaic reflections against the vast cosmic vista. '
            'Palette: ion thruster electric cyan, solar gold, spacecraft thermal foil silver, and deep orbit navy blue. '
            'Orbital mechanics, space propulsion, trajectory physics, astrodynamics, futuristic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1652,
        "title": "Save Your Paper, Help Earth",
        "intent": "Save Your Paper Help Earth recycling forestry conservation",
        "brief": (
            'Book cover design titled "Save Your Paper, Help Earth". '
            'The title "Save Your Paper, Help Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PAPER RECYCLING & SUSTAINABLE FORESTRY DAYLIGHT STYLE: A cheerful, sunlit educational scene on a bright spring morning. '
            'In the center foreground, a green recycling bin filled with neatly folded paper, cardboard, and newspapers. '
            'Beside it, a small green pine tree sapling growing vigorously from recycled paper mulch in a biodegradable pot. '
            'In the background, a thriving, lush temperate pine and deciduous forest under a radiant sunny blue sky with fluffy white clouds. '
            'Clean circular recycling arrows and eco-friendly paper fiber icons in crisp vector style. '
            'Palette: recycling clover green, forest pine emerald, paper cream, rich potting soil brown, and sunny sky blue. '
            'Paper recycling, forest conservation, sustainability, environmental action, bright, cheerful, and uplifting. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1654,
        "title": "What Is the Solar System?",
        "intent": "What Is the Solar System orrery planets sun orbits",
        "brief": (
            'Book cover design titled "What Is the Solar System?". '
            'The title "What Is the Solar System?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNIFICENT MECHANICAL ORRERY & SOLAR SYSTEM DAYLIGHT STYLE: A sunlit, grand scientific hall with morning light illuminating a large, ornate mechanical brass orrery model. '
            'In the center, a radiant glowing golden sphere representing the Sun, surrounded by geared brass arms carrying accurate miniature scale planets: Mercury, Venus, Earth with Moon, Mars, Jupiter, Saturn with rings, Uranus, and Neptune. '
            'Concentric circular orbit rings etched in polished mahogany on the base, with astronomical charts and compasses beside it. '
            'Palette: radiant solar gold, polished brass, celestial lapis blue, planetary jewel tones, and mahogany wood. '
            'Solar system model, planetary orbits, mechanical astronomy, Kepler\'s laws, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1656,
        "title": "What's the Big Idea about Marine Biology? Mysteries of the Deep",
        "intent": "Marine Biology Mysteries of the Deep oceanography deep sea",
        "brief": (
            'Book cover design titled "What\'s the Big Idea about Marine Biology? Mysteries of the Deep". '
            'The title "Mysteries of the Deep" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEANOGRAPHIC RESEARCH & DEEP-SEA BIODIVERSITY STYLE: A high-tech deep-sea ocean exploration scene. '
            'An advanced yellow scientific autonomous underwater vehicle (AUV) submersible with powerful LED searchlights illuminating a mysterious deep-sea benthic community. '
            'Bioluminescent siphonophores, glowing jellyfish, deep-water sea fans, and a majestic giant squid tentacle silhouetted in the luminous water. '
            'Oceanographic sonar bathymetry map screens and specimen collection canisters highlighted in clean technical style. '
            'Palette: submersible electric yellow, ocean abyss navy, bioluminescent neon cyan, coral pink, and optic searchlight beam white. '
            'Marine biology, oceanography, deep-sea creatures, underwater exploration, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1657,
        "title": "What's This? Iron Grip",
        "intent": "Whats This Iron Grip biomechanics gecko toe raptor talons",
        "brief": (
            'Book cover design titled "What\'s This? Iron Grip". '
            'The title "Iron Grip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOMECHANICS & ANIMAL ADAPTIVE GRIP DAYLIGHT STYLE: A sunlit, fascinating biomechanical study in a bright modern science laboratory. '
            'In the foreground, a close-up comparative study of extraordinary biological gripping adaptations: '
            'a gecko foot showing microscopic spatula setae clinging effortlessly to smooth vertical glass; a powerful eagle talon firmly clasping a weathered branch; '
            'and a chameleon zygodactylous grasping foot beside an advanced robotic soft-gripper arm. '
            'Clean force vector arrows and microscopic adhesion diagrams in clear educational graphics. '
            'Palette: gecko lime green, raptor golden talon amber, branch oak brown, laboratory cyan, and clean studio white. '
            'Biomechanics, animal adaptations, structural biology, biomimicry, dynamic and fascinating. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1658,
        "title": "What's This? Night on the Reef",
        "intent": "Whats This Night on the Reef nocturnal coral reef bioluminescence",
        "brief": (
            'Book cover design titled "What\'s This? Night on the Reef". '
            'The title "Night on the Reef" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NOCTURNAL CORAL REEF BIOLUMINESCENCE STYLE: An enchanting nocturnal marine biology scene illuminated by underwater scientific dive lights and gentle moonlight through calm ocean waves. '
            'Hard and soft coral colonies extending delicate, translucent feeding tentacles into the water column. '
            'Bioluminescent coral fluorescing in vibrant neon green and electric orange under specialized marine blue-light torches. '
            'A nocturnal parrotfish resting safely in a transparent mucus cocoon, with red coral crabs and basket stars unfurling intricate feeding arms. '
            'Palette: fluorescent coral neon green, electric coral orange, deep sea sapphire, and moonlight cyan. '
            'Coral reef ecology, nocturnal marine life, bioluminescence, marine biology, mesmerizing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1659,
        "title": "Horse Coat Colors",
        "intent": "Horse Coat Colors equine genetics coat patterns",
        "brief": (
            'Book cover design titled "Horse Coat Colors". '
            'The title "Horse Coat Colors" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BEAUTIFUL EQUINE GENETICS SUNNY PASTURE STYLE: A sun-drenched, picturesque horse ranch pasture on a glorious sunny afternoon. '
            'In the lush green clover meadow, a peaceful herd of magnificent horses displaying diverse genetics and coat variations grazing naturally: '
            'a golden Palomino with a flaxen white mane, a rich reddish-brown Chestnut, a dappled grey, a dark Bay with black points, and a striking black-and-white Pinto. '
            'White wooden paddock fences, rolling green hills, and clean educational color-swatch genetics callouts in the corner under a bright blue sky. '
            'Palette: palomino gold, chestnut reddish-amber, dapple grey silver, pasture clover green, and sunny sky blue. '
            'Equine genetics, coat color inheritance, horse breeds, animal science, wholesome, scenic, and bright. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1660,
        "title": "How Do You Measure a Horse's Height?",
        "intent": "Measure a Horses Height equine measurement hands withers",
        "brief": (
            'Book cover design titled "How Do You Measure a Horse\'s Height?". '
            'The title "How Do You Measure a Horse?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TRADITIONAL EQUINE MEASUREMENT & VETERINARY STYLE: A clean, sunlit stable barnyard on a bright sunny morning. '
            'In the center foreground, a traditional brass-and-wood horse measuring standard cane with a horizontal crossbar and built-in spirit level. '
            'Beside it, a majestic, calm thoroughbred horse standing square on level ground, with an educational measurement indicator pointing to the highest point of the withers. '
            'A visual measurement ruler explaining the traditional unit of "Hands" (1 hand = 4 inches = 10.16 cm) with conversion to centimeters. '
            'Palette: polished brass gold, honey oak wood, chestnut horse brown, stable lawn green, and bright sunny sky. '
            'Equine science, traditional units of measure, veterinary biology, hands and withers, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1661,
        "title": "Overharvesting",
        "intent": "Overharvesting fisheries conservation marine protected areas",
        "brief": (
            'Book cover design titled "Overharvesting". '
            'The title "Overharvesting" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARINE CONSERVATION & SUSTAINABLE FISHERIES DAYLIGHT STYLE: A sunlit, compelling coastal marine scene illustrating sustainable ocean balance in radiant daylight. '
            'On one side, a thriving, protected kelp forest sanctuary teeming with diverse marine life: sea otters, giant kelp, colorful rockfish, and abalone under sunbeams. '
            'A yellow marine protected boundary buoy floating on clear turquoise water. '
            'In educational graphics: balanced fishery quota scales, sustainable mesh-size net diagrams, and marine population recovery trend graphs. '
            'Palette: kelp forest emerald, ocean aquamarine, buoy caution yellow, coral orange, and sunny sky blue. '
            'Marine conservation, sustainable harvesting, fishery management, ecological balance, informative and impactful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1662,
        "title": "Telescopes",
        "intent": "Telescopes astronomical optics refractor reflector mirrors",
        "brief": (
            'Book cover design titled "Telescopes". '
            'The title "Telescopes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OPTICAL ASTRONOMY & TELESCOPE ENGINEERING DAYLIGHT STYLE: A sunlit, high-altitude mountain astronomical observatory dome on a bright morning. '
            'In the foreground, a classic polished brass refractor telescope on a wooden tripod standing beside a modern robotic Schmidt-Cassegrain reflector telescope. '
            'An educational cutaway diagram showing optical ray tracing: convex objective lenses gathering light, and primary parabolic mirrors focusing light rays to an eyepiece. '
            'A massive observatory dome with open slit revealing clear mountain skies in the background. '
            'Palette: polished brass gold, observatory white, optical glass cyan, mahogany wood, and high-altitude azure sky. '
            'Astronomical optics, telescope history, optical engineering, lenses and mirrors, bright and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1664,
        "title": "What's This? Sawfish",
        "intent": "Whats This Sawfish elasmobranch rostrum marine biology",
        "brief": (
            'Book cover design titled "What\'s This? Sawfish". '
            'The title "Sawfish" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUNLIT SHALLOW WATER ELASMOBRANCH MARINE STYLE: A crystal-clear, sun-drenched coastal lagoon and sandy mangrove shallows in tropical daylight. '
            'In the center foreground, a magnificent, peaceful smalltooth sawfish swimming smoothly over rippled white sand, with sunbeams dancing across its dorsal fin. '
            'Prominent, razor-sharp view of its iconic elongated rostral blade lined with tooth-like dermal denticles. '
            'Mangrove prop roots and small schooling mullet fish visible in the pristine, clear turquoise water. '
            'Palette: sawfish sand grey, lagoon turquoise aquamarine, mangrove green, and sunny tropical yellow. '
            'Ichthyology, sawfish biology, endangered elasmobranchs, marine anatomy, stunning and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1665,
        "title": "What's This? Seeing in all Directions",
        "intent": "Seeing in all Directions animal vision field of view chameleon",
        "brief": (
            'Book cover design titled "What\'s This? Seeing in all Directions". '
            'The title "Seeing in All Directions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANIMAL VISION ADAPTATIONS & FIELD OF VIEW DAYLIGHT STYLE: A bright, sunlit garden exploration scene celebrating unique animal ocular anatomy in radiant morning light. '
            'In the center foreground, a colorful veiled chameleon perched on a green branch, with its extraordinary turret-shaped conical eyes independently pivoting 360 degrees. '
            'Educational circular insets showing: a dragonfly\'s panoramic 30,000-facet compound eyes, and a herbivorous goat\'s horizontal slit pupil providing a 320-degree panoramic field of view. '
            'Palette: chameleon emerald green and turquoise, garden petal yellow, optical lens cyan, and sunny daylight white. '
            'Comparative animal vision, ocular anatomy, panoramic field of view, biological adaptation, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1666,
        "title": "What's This? Seeing with Sound",
        "intent": "Seeing with Sound echolocation bioacoustics bats dolphins",
        "brief": (
            'Book cover design titled "What\'s This? Seeing with Sound". '
            'The title "Seeing with Sound" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BIOACOUSTICS & ECHOLOCATION DUAL NATURE STYLE: A sunlit, fascinating split educational scene showing bioacoustic navigation in nature. '
            'On one side, a bottlenose dolphin swimming in a sunlit turquoise ocean lagoon, emitting concentric ultrasonic click pulses that bounce off a school of fish. '
            'On the other side, an insect-eating bat flying near a leafy forest canopy at dawn, emitting high-frequency sonar waves to pinpoint a flying moth. '
            'Clean graphic wave vectors showing outgoing acoustic pulses and reflected echoes in bright educational colors. '
            'Palette: dolphin ocean turquoise, echolocation wave electric cyan, forest dawn amber, and sunny sky blue. '
            'Echolocation, bioacoustics, sound wave physics, animal sensory systems, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1667,
        "title": "What's This? Speaking with Scent",
        "intent": "Speaking with Scent chemical communication pheromones ants",
        "brief": (
            'Book cover design titled "What\'s This? Speaking with Scent". '
            'The title "Speaking with Scent" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHEMICAL COMMUNICATION & PHEROMONES DAYLIGHT STYLE: A sun-drenched, close-up macro nature scene on a bright sunny morning. '
            'A line of black garden ants marching along a weathered wooden garden twig, following an invisible glowing golden trail of chemical pheromones. '
            'A Luna moth perched nearby on a blooming honeysuckle flower, with its magnificent feathery antennae catching microscopic scent molecules floating in the breeze. '
            'Stylized molecular vapor trails and olfactory receptor diagrams rendered in clean, cheerful educational style. '
            'Palette: honeysuckle blossom cream, moth pale emerald, ant lacquer black, pheromone golden glow, and sunny garden green. '
            'Chemical communication, pheromones, insect sensory biology, nature chemistry, charming and educational. '
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

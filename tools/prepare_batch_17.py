import os

books = [
    {
        "id": 1673,
        "title": "Bare Bones",
        "intent": "Bare Bones comparative vertebrate osteology skeletal biology",
        "brief": (
            'Book cover design titled "Bare Bones". '
            'The title "Bare Bones" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPARATIVE VERTEBRATE OSTEOLOGY DAYLIGHT STYLE: A sunlit, pristine natural history laboratory and bone preparation study on a bright morning. '
            'In the center foreground, an elegant comparative display of vertebrate limb bone homologues: an avian bird wing skeleton, a cetacean whale flipper skeletal armature, and a feline cheetah leg skeleton. '
            'Clean architectural calipers, bone classification labels, and anatomical bone density cross-sections arranged neatly on a polished oak workbench. '
            'Palette: ivory bone white, polished oak timber, brass caliper gold, and clean laboratory daylight white. '
            'Comparative anatomy, vertebrate evolution, osteology, structural biology, fascinating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1675,
        "title": "Maria and Her Comet",
        "intent": "Maria and Her Comet 1847 comet discovery astronomical history",
        "brief": (
            'Book cover design titled "Maria and Her Comet". '
            'The title "Maria and Her Comet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            '19TH-CENTURY ASTRONOMICAL DISCOVERY STYLE: A sun-drenched rooftop observatory terrace on Nantucket island overlooking the blue Atlantic ocean in morning light. '
            'In the center, a historic brass 4-inch Dollond refractor telescope on a wooden tripod. '
            'On an outdoor wooden table: an open leather-bound astronomical observer\'s logbook with hand-sketched orbital coordinates of Comet 1847 VI (Miss Mitchell\'s Comet), a brass sextant, and celestial star globes. '
            'A delicate daylight comet with a luminous curving dust tail visible in the pale morning sky. '
            'Palette: brass telescope gold, ocean cobalt blue, parchment cream, and pale sky morning cyan. '
            'History of astronomy, comet discovery, celestial navigation, women in science, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1676,
        "title": "Saving the Rain Forests",
        "intent": "Saving the Rain Forests tropical conservation biodiversity canopy",
        "brief": (
            'Book cover design titled "Saving the Rain Forests". '
            'The title "Saving the Rain Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAJESTIC TROPICAL RAINFOREST CONSERVATION DAYLIGHT STYLE: A breathtaking, sun-illuminated tropical rainforest canopy panorama under bright azure skies. '
            'Towering emergent kapok and Brazil nut trees with lush buttress roots draped in flowering liana vines and vibrant bromeliads. '
            'A colorful keel-billed toucan with rainbow bill and a brilliant blue morpho butterfly perched near clear river shallows. '
            'In the background, a pristine winding river reflecting sunbeams, and a green canopy conservation research walkway suspended between trees. '
            'Palette: deep jungle emerald green, toucan rainbow yellow and cyan, morpho electric blue, and sunny sky gold. '
            'Rainforest ecology, tropical conservation, biodiversity protection, environmental stewardship, lush and vibrant. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1677,
        "title": "What Do Plants Need?",
        "intent": "What Do Plants Need primary botany sunlight water soil",
        "brief": (
            'Book cover design titled "What Do Plants Need?". '
            'The title "What Do Plants Need?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CHEERFUL BOTANICAL DISCOVERY SUNNY DAYLIGHT STYLE: A sun-drenched, friendly garden potting bench on a glorious sunny spring morning. '
            'In the center foreground, a healthy, thriving young bean plant seedling growing in a classic terracotta clay pot. '
            'Four clear educational iconography elements illustrated in bright harmony: brilliant golden sunbeams (Light), a glass watering can with glistening water droplets (Water), rich dark compost soil with visible earthworm (Nutrients), and gentle breeze wave lines (Air/CO2). '
            'A miniature greenhouse and seedling trays in the bright background under a radiant blue sky. '
            'Palette: seedling fresh lime green, terracotta warm orange, water droplet cyan, sunbeam yellow, and sky blue. '
            'Plant biology, primary botany, gardening science, plant needs, cheerful, engaging, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1679,
        "title": "Challenges Facing Estuaries: Pathogens",
        "intent": "Estuaries Pathogens water quality microbiology conservation",
        "brief": (
            'Book cover design titled "Challenges Facing Estuaries: Pathogens". '
            'The title "Challenges Facing Estuaries" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ESTUARINE ECOLOGY & WATER QUALITY MONITORING DAYLIGHT STYLE: A sunlit, peaceful coastal estuary and tidal salt marsh on a bright afternoon. '
            'On an environmental research boat workbench in the foreground: clear glass sample collection vials of brackish water, a digital optical water-turbidity sensor, and a digital field microscope. '
            'A magnified circular inset showing harmless estuarine microorganisms alongside pathogen indicator analysis plates. '
            'In the background, winding tidal channels through golden cordgrass, snowy egrets wading, and clean blue coastal skies. '
            'Palette: cordgrass gold, marsh water aquamarine, research vial clear glass, and sunny sky blue. '
            'Estuarine ecology, water quality science, environmental monitoring, microbiology, informative and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1680,
        "title": "Famous Scientists - Robert Hooke",
        "intent": "Famous Scientists Robert Hooke history of microscopy cork cells",
        "brief": (
            'Book cover design titled "Famous Scientists - Robert Hooke". '
            'The title "Robert Hooke & the Microscopic World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            '17TH-CENTURY HISTORIC MICROSCOPY STUDY STYLE: A warm, sunlit 17th-century Royal Society laboratory study filled with radiant morning window light. '
            'In the center foreground, the iconic historic compound microscope of Robert Hooke: ornate gold-tooled leather barrel, brass fittings, and glass water globe light-condenser with oil flame. '
            'Beside it, open folio pages of Micrographia (1665) showing the famous detailed copperplate engraving of sliced cork cells (the origin of the biological term "cell"). '
            'A slice of oak tree cork, brass specimen forceps, and drafting quills on a polished oak desk. '
            'Palette: leather mahogany brown, brass gold, parchment cream, and radiant morning sunlight. '
            'History of science, microscopy, discovery of cells, biological history, scholarly, dignified, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1681,
        "title": "How Far Away Is the Moon?",
        "intent": "How Far Away Is the Moon lunar distance astronomy scale",
        "brief": (
            'Book cover design titled "How Far Away Is the Moon?". '
            'The title "How Far Away Is the Moon?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CELESTIAL DISTANCE SCALE & LASER RANGING STYLE: A clear, scientifically accurate cosmic distance scale visualization in space illuminated by radiant sunlight. '
            'Earth on the far left and the Moon on the far right, spaced to true astronomical scale (illustrating that thirty Earths could fit side-by-side in the 384,400 km gap). '
            'A glowing green pulsed laser ranging beam firing from an Earth observatory to retroreflectors on the Moon\'s surface. '
            'Geometric distance markers, light-travel time callout (1.3 seconds), and orbital parameters in crisp educational graphics. '
            'Palette: Earth ocean blue, lunar silver, laser beam emerald green, measurement gold, and deep orbit navy. '
            'Astronomical distance, lunar laser ranging, scale of the solar system, space physics, clear and eye-opening. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1682,
        "title": "Saving Hawaiian Monk Seals",
        "intent": "Hawaiian Monk Seals marine mammal conservation atoll",
        "brief": (
            'Book cover design titled "Saving Hawaiian Monk Seals". '
            'The title "Saving Hawaiian Monk Seals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HAWAIIAN ATOLL MARINE MAMMAL SANCTUARY STYLE: A sun-drenched, pristine white-sand beach on a remote Hawaiian island in sparkling midday tropical sunlight. '
            'In the center foreground, a healthy, peaceful Hawaiian monk seal resting contentedly on warm golden coral sand near gentle lapping turquoise waves. '
            'In the background, a protected wildlife conservation rope boundary with educational sanctuary signage, swaying coconut palm fronds, and thriving coral reefs in clear waters. '
            'Palette: monk seal slate grey, coral sand white-gold, ocean turquoise aquamarine, palm emerald green, and tropical sky blue. '
            'Marine conservation, endangered species protection, Hawaiian wildlife, pinniped biology, beautiful and peaceful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1683,
        "title": "The Moon's Phases",
        "intent": "The Moons Phases lunar cycle waxing waning full crescent",
        "brief": (
            'Book cover design titled "The Moon\'s Phases". '
            'The title "The Moon\'s Phases" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ELEGANT LUNAR CYCLE & ASTRONOMICAL GEOMETRY STYLE: A comprehensive, circular educational diagram of the complete 29.5-day lunar synodic month. '
            'The eight distinct moon phases arranged in a graceful ring around Earth: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Third Quarter, and Waning Crescent. '
            'Parallel golden sunbeams arriving from the right, demonstrating how sunlight illuminates the lunar sphere as seen from Earth. '
            'Crisp high-detail photographic textures on each moon phase showing craters and maria clearly. '
            'Palette: lunar crater silver, deep space navy, sunbeam gold, Earth ocean blue, and celestial white. '
            'Moon phases, lunar geometry, astronomy education, synchronous rotation, clear, elegant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1685,
        "title": "Beautiful Breeds",
        "intent": "Beautiful Breeds domestic animal genetics heritage breeds",
        "brief": (
            'Book cover design titled "Beautiful Breeds". '
            'The title "Beautiful Breeds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HERITAGE FARM ANIMAL DIVERSITY SUNNY PASTURE STYLE: A picturesque, sun-drenched pastoral landscape in rolling green countryside on a bright morning. '
            'In the center foreground, a harmonious group of distinctive heritage farm animal breeds grazing peacefully: '
            'a Jacob sheep with handsome multi-horned fleece, a golden Guernsey dairy cow, and a colorful heritage rooster with iridescent green tail feathers. '
            'A historic stone dry-wall fence, red wooden barn, and blooming clover meadows under sunny blue skies. '
            'Palette: clover meadow green, sheep fleece cream, cow warm amber gold, rooster iridescent emerald, and sky blue. '
            'Agricultural biodiversity, domestic animal genetics, heritage breeds, farm science, wholesome and scenic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1686,
        "title": "Habitat Loss",
        "intent": "Habitat Loss wildlife corridor forest fragmentation conservation",
        "brief": (
            'Book cover design titled "Habitat Loss". '
            'The title "Habitat Loss & Conservation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ECOLOGICAL RESTORATION & WILDLIFE CORRIDOR DAYLIGHT STYLE: A sunlit, thought-provoking landscape illustrating habitat reconnection in radiant daylight. '
            'In the center, a lush green vegetative wildlife overpass bridge covered in native trees, bushes, and wildflowers safely spanning across an infrastructure highway below. '
            'A family of white-tailed deer and a red fox crossing the green wildlife bridge between two vast, healthy protected forest reserves. '
            'Clean vector infographics showing landscape connectivity, gene flow restoration, and forest fragment reduction. '
            'Palette: forest canopy emerald green, bridge earth terracotta, native flower golden yellow, and clear azure sky. '
            'Conservation biology, wildlife corridors, habitat fragmentation, environmental solutions, inspiring and hopeful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1687,
        "title": "How Plates Affect Our Planet: Plates on the Move",
        "intent": "Plates on the Move plate tectonics continental drift subduction",
        "brief": (
            'Book cover design titled "How Plates Affect Our Planet: Plates on the Move". '
            'The title "Plates on the Move" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC PLATE TECTONICS & GEOPHYSICS STYLE: A magnificent, 3D cutaway geological block diagram of the Earth\'s lithosphere and upper mantle. '
            'Showing a oceanic tectonic plate subducting beneath a continental plate, with a deep oceanic trench, melting magma rising to feed an active volcanic arc, and mountain building folded strata. '
            'In the background, a mid-ocean spreading ridge where fresh basaltic magma forms new oceanic crust under turquoise seas. '
            'Clean directional vector arrows showing mantle convection currents (hot rising magma, cooler sinking slabs). '
            'Palette: magma glowing orange-red, oceanic basalt deep blue, continental crust terracotta, and ocean aquamarine. '
            'Plate tectonics, continental drift, geophysics, mountain building, volcanism, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1688,
        "title": "Invasive Species",
        "intent": "Invasive Species ecology biosecurity quarantine native balance",
        "brief": (
            'Book cover design titled "Invasive Species". '
            'The title "Invasive Species" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ECOLOGICAL BIOSECURITY & NATIVE SPECIES RESTORATION STYLE: A sunlit, compelling ecological comparison scene under bright clear skies. '
            'On one side, an aggressive dense tangle of invasive kudzu vine smothering native trees. '
            'On the other side, an active ecological restoration zone where native wildflowers (milkweed, purple coneflowers) are flourishing, attracting native monarch butterflies and bumblebees. '
            'A biosecurity inspection magnifying glass, boot-cleaning brush station, and invasive species identification cards in clean educational graphics. '
            'Palette: kudzu bright vine green, native wildflower purple and orange, soil warm brown, and sunny sky cyan. '
            'Invasive species biology, biosecurity, ecological balance, native habitat restoration, informative and impactful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1691,
        "title": "What's This? Life in the Dark",
        "intent": "Whats This Life in the Dark cave biology troglobites subterranean",
        "brief": (
            'Book cover design titled "What\'s This? Life in the Dark". '
            'The title "Life in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUBTERRANEAN SPELEOLOGY & CAVE BIOLOGY STYLE: A mysterious, beautifully illuminated subterranean limestone cave chamber. '
            'Dramatic golden scientific exploration lamps casting warm light across glistening calcite stalactites, stalagmites, and crystal-clear underground cave pools. '
            'In the water, fascinating troglobitic organisms with unique adaptations: a translucent, eyeless cave crayfish with elongated sensory antennae, and a blind white cave salamander (olm). '
            'Clean educational callouts showing sensory tactile adaptations replacing vision in the dark. '
            'Palette: limestone calcite amber gold, cave pool crystal turquoise, cave shadow deep indigo, and lantern warm yellow. '
            'Cave biology, speleology, troglobites, evolutionary adaptation, sensory evolution, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1696,
        "title": "Arthropods: Animals with Lots of Legs!",
        "intent": "Arthropods Animals with Lots of Legs exoskeleton entomology",
        "brief": (
            'Book cover design titled "Arthropods: Animals with Lots of Legs!". '
            'The title "Arthropods!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT PHYLUM ARTHROPODA EXPLORATION DAYLIGHT STYLE: A sun-drenched, cheerful natural history exploration scene on a mossy fallen log in a bright forest clearing. '
            'In the foreground, a fantastic, colorful array of diverse arthropods celebrating segmented bodies and jointed legs: '
            'a shiny blue metallic scarab beetle, a gentle multi-legged garden millipede curling into a spiral, a spotted ladybug, a striped bumblebee, and a small jumping spider. '
            'An explorer\'s brass magnifying glass highlighting the chitinous exoskeleton and compound eyes in bright daylight. '
            'Palette: scarab metallic blue, ladybug red, leaf moss green, amber bark brown, and sunny yellow. '
            'Arthropod biology, entomology, jointed appendages, chitin exoskeletons, cheerful, vibrant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1698,
        "title": "Fish: Animals That Live Underwater",
        "intent": "Fish Animals That Live Underwater ichthyology gills fins",
        "brief": (
            'Book cover design titled "Fish: Animals That Live Underwater". '
            'The title "Fish: Animals Underwater" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SUN-DAPPLED CORAL REEF ICHTHYOLOGY STYLE: A breathtaking, crystal-clear tropical coral reef lagoon filled with shimmering midday sunbeams. '
            'In the center foreground, a magnificent, vibrant collection of diverse fish showing specialized aquatic adaptations: '
            'a vibrant orange-and-white clownfish darting among sea anemone tentacles, a yellow longnose butterflyfish, a sleek blue tang, and a graceful spotted eagle ray gliding in the background. '
            'An educational anatomical callout illustrating operculum gill breathing and lateral line sensory systems. '
            'Palette: clownfish bright orange, tang electric blue, butterflyfish yellow, coral reef aquamarine, and sunbeam gold. '
            'Ichthyology, marine biology, aquatic adaptations, coral reef fish, cheerful, brilliant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1699,
        "title": "Links in the Food Chain",
        "intent": "Links in the Food Chain trophic levels ecology energy flow",
        "brief": (
            'Book cover design titled "Links in the Food Chain". '
            'The title "Links in the Food Chain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ECOSYSTEM TROPHIC LEVELS & FOOD WEB DAYLIGHT STYLE: A vibrant, sun-drenched coastal and forest ecosystem panorama in radiant daylight. '
            'A clear, beautifully illustrated circular food chain diagram showing energy flow between trophic levels: '
            'Radiant Sun -> Green Clover Producers -> Grasshopper Primary Consumer -> Songbird Secondary Consumer -> Red-Tailed Hawk Apex Predator -> Earthworm and Mushroom Decomposers. '
            'Glowing golden energy flow arrows connecting each link in harmonious sequence. '
            'Palette: producer leaf green, sunbeam gold, hawk feather amber, songbird blue, and clear sky cyan. '
            'Trophic ecology, food chains, energy flow, ecosystem dynamics, primary producers to apex predators, clear and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1700,
        "title": "Rock, Rumble. . .Roar!",
        "intent": "Rock Rumble Roar seismology earthquakes geology Richter scale",
        "brief": (
            'Book cover design titled "Rock, Rumble. . .Roar!". '
            'The title "Rock, Rumble... Roar!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEISMOLOGY & EARTHQUAKE GEOLOGY DAYLIGHT STYLE: A sunlit, high-tech geological seismology observatory perched near a rugged mountain fault line. '
            'In the center foreground, a classic rotating seismograph drum with a delicate stylus pen actively tracing jagged seismic P-waves and S-waves on chart paper. '
            'A cutaway block diagram showing an earthquake focus (hypocenter) deep in the bedrock and radiating seismic energy shockwaves reaching the surface epicenter. '
            'A geological compass clinometer and split rock core samples on a field research table in bright morning sunlight. '
            'Palette: chart paper white, seismic wave crimson red, bedrock granite grey, instrument brass gold, and clear sky blue. '
            'Seismology, earthquakes, tectonic fault lines, seismic waves, geology, dynamic and educational. '
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

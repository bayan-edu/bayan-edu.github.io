import os

books = [
    {
        "id": 1910,
        "title": "The Lesser Long-Nosed Bat",
        "intent": "Lesser Long-Nosed Bat Leptonycteris saguaro pollination desert ecology",
        "brief": (
            'Book cover design titled "The Lesser Long-Nosed Bat". '
            'The title "The Lesser Long-Nosed Bat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SONORAN DESERT POLLINATION ECOLOGY STYLE: A sunlit, magnificent desert scene at dawn twilight transition in the Sonoran Desert. '
            'In the center foreground, a delicate, agile lesser long-nosed bat (Leptonycteris yerbabuenae) hovering gracefully beside a massive blooming white saguaro cactus blossom, '
            'its long muzzle dusted with golden pollen grains as it sips sweet floral nectar. '
            'Towering giant saguaro cacti, blooming ocotillo, and desert mountain peaks bathed in golden morning sunbeams under an azure sky. '
            'Palette: saguaro blossom pure white and golden pollen, cactus deep green, desert mountain terracotta ochre, and morning sky cyan. '
            'Bat pollination, chiropterophily, desert mutualism, endangered species conservation, wondrous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1911,
        "title": "The Mexican Long-Nosed Bat",
        "intent": "Mexican Long-Nosed Bat agave pollination nectar desert conservation",
        "brief": (
            'Book cover design titled "The Mexican Long-Nosed Bat". '
            'The title "The Mexican Long-Nosed Bat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AGAVE POLLINATION MUTUALISM DAYLIGHT STYLE: A sun-drenched, dramatic desert plateau landscape in northern Mexico on a bright clear morning. '
            'In the center foreground, a wild century plant agave sending up a colossal, tree-like flowering stalk crowned with rich clusters of golden-yellow flowers dripping with nectar. '
            'A graceful Mexican long-nosed bat feeding from the blossoms, showing its specialized elongated snout and bristled tongue. '
            'Rugged desert canyons, yucca plants, and clean educational mutualism nectar-cycle graphics under sunny skies. '
            'Palette: agave flower golden yellow, agave rosettes blue-green, desert clay warm terracotta, and sunny sky blue. '
            'Agave pollination, bat conservation, desert mutualism, migratory nectar corridors, striking and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1912,
        "title": "The Nutritious Num Num",
        "intent": "Nutritious Num Num Carissa macrocarpa coastal botany edible fruit",
        "brief": (
            'Book cover design titled "The Nutritious Num Num". '
            'The title "The Nutritious Num Num" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COASTAL BOTANY & INDIGENOUS EDIBLE FRUIT STYLE: A sun-drenched coastal garden landscape along the Indian Ocean shoreline on a bright morning. '
            'In the center foreground, a healthy, thriving Natal plum (num-num) shrub (Carissa macrocarpa) with glossy, dark-green leathery leaves, '
            'fragrant star-shaped white jasmine-like blossoms, and clusters of plump, oval, ruby-red ripe num-num fruits glistening with morning dew droplets. '
            'A rustic woven fruit basket with split fruits showing sweet red pulp rich in vitamin C and magnesium. '
            'Turquoise coastal ocean and sunny blue skies in the background. '
            'Palette: num-num fruit brilliant ruby crimson, foliage glossy emerald green, blossom pure white, and ocean turquoise. '
            'Indigenous wild fruit botany, nutritional science, coastal xerophyte adaptations, Carissa macrocarpa, cheerful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1913,
        "title": "The Peanut Man",
        "intent": "Peanut Man George Washington Carver agricultural chemistry botany",
        "brief": (
            'Book cover design titled "The Peanut Man". '
            'The title "The Peanut Man: Agricultural Chemistry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORICAL AGRICULTURAL CHEMISTRY & BOTANY DAYLIGHT STYLE: A sunlit, clean laboratory workbench at the Tuskegee Institute in radiant morning daylight. '
            'In the center, healthy peanut plants (Arachis hypogaea) with delicate yellow blossoms, green leaves, and underground pegs showing fresh peanut pods clinging to nitrogen-fixing root nodules. '
            'Surrounding laboratory apparatus: glass distillation flasks with golden peanut oil, ceramic mortar and pestle, samples of peanut paper and dyes, and crop rotation diagrams (cotton, peanuts, sweet potatoes). '
            'Open sunny windows looking out onto thriving experimental test fields. '
            'Palette: peanut pod warm ochre and tan, plant leaf vibrant green, laboratory glass amber, and morning sunlight ivory. '
            'Agricultural chemistry, George Washington Carver legacy, crop rotation, soil nitrogen fixation, inspiring, dignified, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1914,
        "title": "Wayfinding: Finding Land",
        "intent": "Wayfinding Finding Land Polynesian navigation ocean swell swell star paths",
        "brief": (
            'Book cover design titled "Wayfinding: Finding Land". '
            'The title "Wayfinding: Finding Land" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'POLYNESIAN INDIGENOUS NON-INSTRUMENT NAVIGATION DAYLIGHT STYLE: A sunlit, vast Pacific Ocean voyaging scene in bright daylight. '
            'In the center foreground, a traditional double-hulled Polynesian voyaging canoe (waʻa kaulua) sailing gracefully with woven crab-claw sails across deep azure swells. '
            'Natural land-finding signs illustrated in harmonious educational style: white fairy terns flying toward land at dusk, stacked lenticular clouds over distant hidden islands, '
            'and curved ocean swell wave interference patterns. '
            'A traditional Marshallese woven stick chart showing wave swell directions resting on the canoe deck. '
            'Palette: ocean deep cobalt and turquoise swell, canoe koa wood honey, sail woven cream, and sunny sky blue. '
            'Indigenous navigation, Polynesian wayfinding, ocean swell physics, avian wayfinding signs, maritime heritage, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1915,
        "title": "What Is a Helicopter?",
        "intent": "What Is a Helicopter rotorcraft aerodynamics cyclic collective antitorque",
        "brief": (
            'Book cover design titled "What Is a Helicopter?". '
            'The title "What Is a Helicopter?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ROTORCRAFT AERODYNAMICS & FLIGHT PHYSICS DAYLIGHT STYLE: A sun-drenched, high-performance modern search-and-rescue helicopter in bright daytime skies. '
            'In the center foreground, the helicopter hovering steadily with main rotor blades spinning in a blur of dynamic airflow streamlines. '
            'Detailed educational callouts showing rotor blade aerodynamics: cyclic pitch control, collective pitch tilting the rotor disc, '
            'and the tail rotor counteracting engine torque reaction. '
            'Coastal helipad below with emerald hills and sunny blue skies. '
            'Palette: helicopter rescue high-visibility red and white, rotor blur chrome, sky bright azure cyan, and coastal green. '
            'Aeronautical engineering, helicopter aerodynamics, rotary-wing flight, lift and antitorque physics, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1916,
        "title": "What Is Robonaut?",
        "intent": "What Is Robonaut humanoid space robotics NASA dexterous manipulation",
        "brief": (
            'Book cover design titled "What Is Robonaut?". '
            'The title "What Is Robonaut?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ADVANCED SPACE HUMANOID ROBOTICS DAYLIGHT STYLE: A high-tech space exploration scene inside the brightly illuminated Destiny laboratory module on the International Space Station. '
            'In the center, NASA\'s Robonaut 2 (R2): an advanced dexterous robotic torso with polished white thermal composite armor, '
            'gold visor helmet, and articulated multi-jointed robotic fingers holding a diagnostic space tool. '
            'Gleaming avionics racks, experiment lockers, and clean blue-and-white earth visible through module portholes. '
            'Palette: Robonaut titanium white and gold visor, space lab metallic pearl, and Earth ocean blue. '
            'Space robotics, Robonaut, autonomous manipulation, artificial intelligence in space, NASA engineering, futuristic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE (ROBOTIC ONLY). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1917,
        "title": "What Was the Space Shuttle?",
        "intent": "Space Shuttle orbiter reusable spacecraft Canadarm payload bay",
        "brief": (
            'Book cover design titled "What Was the Space Shuttle?". '
            'The title "The Space Shuttle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPACE SHUTTLE ORBITAL MISSION DAYLIGHT STYLE: A magnificent, sun-illuminated view of the Space Shuttle orbiter in low Earth orbit. '
            'The Shuttle\'s payload bay doors are open, revealing the Canadarm robotic arm deploying a communications satellite. '
            'Crisp, high-definition details of the black thermal protection heat-shield tiles, delta wings, and vertical stabilizer with American flag insignia. '
            'Below, the radiant blue curve of Earth with swirling white storm clouds and turquoise shallow seas in brilliant sunlight. '
            'Palette: Shuttle orbiter black and white tiles, satellite solar panel gold and navy, Earth brilliant blue, and sunbeam radiant white. '
            'Space Shuttle program, reusable spacecraft, astronautics history, orbital mechanics, iconic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1918,
        "title": "Who Was John Glenn?",
        "intent": "John Glenn Mercury Friendship 7 first American orbit astronautics",
        "brief": (
            'Book cover design titled "Who Was John Glenn?". '
            'The title "John Glenn: Orbiting the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PROJECT MERCURY & HISTORIC ORBITAL FLIGHT TRIBUTE STYLE: A sunlit 1960s space race engineering study in bright morning daylight. '
            'On an oak study desk: a detailed scale model of the Friendship 7 Mercury space capsule atop its Atlas launch rocket, '
            'vintage Mission Control communication headsets, circular orbital flight tracking globes with orbital inclination tracks, and mission logbooks. '
            'Through arched windows, a clear sunny blue sky with morning sunlight streaming across historical aerospace blueprints. '
            'Palette: Mercury capsule titanium black and heat shield orange, mission desk warm oak, flight chart cream, and sunny sky blue. '
            'Project Mercury, John Glenn, first American orbital spaceflight, aerospace history, dignified, inspiring, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1920,
        "title": "Keya's Day at the Beach",
        "intent": "Beach tidal ecology shells coastal shoreline crabs marine",
        "brief": (
            'Book cover design titled "Keya\'s Day at the Beach". '
            'The title "A Day at the Beach" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COASTAL SHORELINE & TIDE POOL EXPLORATION SUNNY STYLE: A sun-drenched, cheerful sandy beach and tide pool on a glorious summer morning. '
            'In the center foreground, a glistening, clear seawater tidal pool surrounded by polished granite stones and colorful treasures: '
            'a spiraling pink conch shell, a striped scallop shell, an orange starfish, and a small hermit crab peeking curiously out of a periwinkle shell. '
            'Gentle turquoise waves lapping against the white sand shore, with sea oats on sand dunes and seagulls soaring under a bright blue sky. '
            'Palette: sand warm golden buff, ocean clear turquoise aquamarine, shell coral pink, and sunny sky blue. '
            'Coastal ecology, tide pool life, malacology, beach discovery, joyful, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1921,
        "title": "Ira's Monsoon Feast",
        "intent": "Monsoon Feast seasonal agricultural harvest traditional culinary crops",
        "brief": (
            'Book cover design titled "Ira\'s Monsoon Feast". '
            'The title "Monsoon Feast" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SEASONAL AGRICULTURAL HARVEST & MONSOON BOUNTY STYLE: A sunlit traditional open-air courtyard in rural India after a refreshing monsoon rain shower. '
            'On a rustic carved wooden feast table: polished terracotta platters filled with harvest delicacies: '
            'fragrant steaming basmati rice, golden roasted corn cobs (bhutta) rubbed with lime, fresh ripe Alphonso mangoes, and traditional earthenware water vessels. '
            'In the courtyard background, glistening rain-washed banana leaves and blooming jasmine bushes reflecting golden sunbeams breaking through receding clouds. '
            'Palette: terracotta warm clay orange, mango golden yellow, banana leaf rain-washed emerald, and sunbeam amber. '
            'Agricultural harvest, monsoon season, traditional crops, culinary botany, cultural celebration of rain, warm and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1932,
        "title": "Lights in the Water",
        "intent": "Lights in the Water marine bioluminescence dinoflagellates ocean nocturnal",
        "brief": (
            'Book cover design titled "Lights in the Water". '
            'The title "Lights in the Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUMINESCENT OCEAN & BIOLUMINESCENT PLANKTON STYLE: A magical, scientifically grounded marine biology view of bioluminescent ocean waters. '
            'Crashing ocean waves on a rocky cove glowing with vivid neon electric-blue illumination caused by billions of agitated dinoflagellate plankton (Noctiluca scintillans). '
            'In the water, comb jellies (ctenophores) with rainbow cilia and a glowing deep-sea squid trailing luminous light paths. '
            'A marine research water sampling vial showing concentrated glowing phytoplankton under microscopic study. '
            'Palette: bioluminescent electric neon blue, ocean deep sapphire navy, sea foam diamond white, and starlight silver. '
            'Bioluminescence, marine microbiology, dinoflagellates, luciferin-luciferase reaction, ocean magic, captivating and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1941,
        "title": "Bad (Space) Weather Cancels Pigeon Races!",
        "intent": "Space Weather Pigeon Races solar storms geomagnetism magnetite navigation",
        "brief": (
            'Book cover design titled "Bad (Space) Weather Cancels Pigeon Races!". '
            'The title "Space Weather & Pigeon Navigation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GEOMAGNETIC SOLAR STORMS & ANIMAL MAGNETORECEPTION STYLE: A sunlit, fascinating scientific contrast scene connecting space weather to animal biology. '
            'In space, a massive solar coronal mass ejection (CME) sending a blast of ionized particles that compresses Earth\'s geomagnetic shield. '
            'On Earth below in a sunlit green meadow, a handsome homing pigeon perched on a wooden release crate, looking up at the sky. '
            'Clean vector graphics illustrating the pigeon\'s internal biological magnetic compass (cryptochrome photoreceptors in the eye and magnetite in the beak) disrupted by solar magnetic fluctuations. '
            'Palette: solar flare fiery gold and orange, geomagnetic field line electric cyan, pigeon plumage blue-grey, and meadow green. '
            'Space weather, solar flares, geomagnetic storms, magnetoreception in animals, homing pigeons, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1942,
        "title": "Black Hole Rescue",
        "intent": "Black Hole Rescue relativistic astrophysics event horizon gravitational lensing",
        "brief": (
            'Book cover design titled "Black Hole Rescue". '
            'The title "Black Hole Rescue" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RELATIVISTIC ASTROPHYSICS & BLACK HOLE GRAVITATION STYLE: A scientifically accurate and breathtaking view of a supermassive black hole in deep space. '
            'In the center, the pitch-black shadow of the black hole framed by a brilliant, swirling golden-orange accretion disk of superheated relativistic plasma. '
            'Dramatic gravitational lensing bending the light of background stars into glowing Einstein rings around the Event Horizon. '
            'In the safe foreground, an advanced robotic exploration probe maneuvering with ion thrusters, transmitting telemetry data back to safety. '
            'Palette: accretion disk radiant orange and gold, black hole shadow pitch black, Einstein ring cyan, and deep space navy. '
            'Astrophysics, general relativity, black holes, event horizon, gravitational lensing, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1943,
        "title": "Cleaning Up Ocean Pollution: Collecting \"Ghost\" Fishing Gear",
        "intent": "Cleaning Ocean Ghost Fishing Gear marine debris recovery reef rescue",
        "brief": (
            'Book cover design titled "Cleaning Up Ocean Pollution: Collecting \\"Ghost\\" Fishing Gear". '
            'The title "Cleaning Up Ghost Fishing Gear" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEAN CLEANUP & GHOST NET RECOVERY DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical coral reef in bright midday sunlight. '
            'A specialized marine conservation recovery crane aboard a research boat gently lifting a heavy, abandoned derelict nylon "ghost" fishing net off a vibrant coral reef. '
            'Beneath the surface in sparkling turquoise waters, a rescued green sea turtle and colorful reef fish swimming freely away from the hazard. '
            'Dancing sunbeams illuminating the clean reef floor under a bright blue sky. '
            'Palette: ocean turquoise and aquamarine, coral pink and amber, ghost net dark green, and sunbeam radiant gold. '
            'Ocean cleanup, ghost fishing gear, marine conservation, coral reef protection, environmental restoration, inspiring and educational. '
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

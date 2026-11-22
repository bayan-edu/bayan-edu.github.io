import os

books = [
    {
        "id": 1397,
        "title": "Reading: Little Women",
        "intent": "Reading Little Women",
        "brief": (
            'Book cover design titled "Reading: Little Women". '
            'The title "Little Women" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT 19TH-CENTURY NEW ENGLAND PARLOR DAYLIGHT STYLE: A sunlit, charming 19th-century family parlor on a crisp, snowy winter morning in bright daylight. '
            'In the center foreground, a warm stone fireplace with a crackling hearth, four colorful hand-knitted woolen scarves resting on a cozy sofa, an upright wooden piano with open classical sheet music, and an open artist\'s sketchpad with colored pencils on a low table. '
            'Through sunny bay windows, evergreen pine trees draped in fresh white snow glisten under a clear blue winter sky. '
            'Palette: parlor warm mahogany and rose, snow crisp white, woolen scarves jewel tones, and morning sunlight golden. '
            'Classic American literature, Louisa May Alcott, family warmth, winter coziness, cheerful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1407,
        "title": "Reading: Frankenstein",
        "intent": "Reading Frankenstein",
        "brief": (
            'Book cover design titled "Reading: Frankenstein". '
            'The title "Frankenstein" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ENLIGHTENMENT NATURAL PHILOSOPHY LABORATORY STYLE: A sunlit, fascinating scientific laboratory in Ingolstadt on a bright morning in natural daylight. '
            'In the center foreground, antique brass galvanic batteries, an electrostatic glass friction generator emitting delicate sparks, glass alembics with bubbling clear solutions, and precision surgical instruments on a clean wooden laboratory table. '
            'Beside them, an open leather-bound volume of natural philosophy and botanical anatomy charts catching sunbeams pouring through arched stone windows. '
            'Palette: brass gleaming gold, glass crystal clear, oak table warm amber, and daylight bright ivory. '
            'Classic literature, Mary Shelley, history of science, electricity and galvanic biology, intellectual, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1412,
        "title": "Reading: The Jungle Book",
        "intent": "Reading The Jungle Book",
        "brief": (
            'Book cover design titled "Reading: The Jungle Book". '
            'The title "The Jungle Book" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SEEONEE HILLS WILDLIFE DAYLIGHT STYLE: A sun-drenched Indian jungle hill clearing in radiant morning daylight. '
            'In the center foreground, a noble wolf pack resting peacefully outside a mossy limestone cave entrance, with four playful wolf cubs tumbling joyfully in soft grass among tropical ferns and blooming white jasmine. '
            'Sunbeams pierce through the lush canopy of wild fig and banyan trees, illuminating the tranquil beauty of the jungle sanctuary under a clear sky. '
            'Palette: wolf coat silver and sable, foliage vibrant jade and emerald, jasmine white, and morning sun golden amber. '
            'Classic literature, Rudyard Kipling, wildlife of India, wolf pack sanctuary, majestic, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1413,
        "title": "Reading: Aesop's Fables",
        "intent": "Reading Aesops Fables",
        "brief": (
            'Book cover design titled "Reading: Aesop\'s Fables". '
            'The title "Aesop\'s Fables" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT PASTORAL FABLE MEADOW DAYLIGHT STYLE: A sunlit, cheerful country path through blooming green meadows on a glorious sunny day in bright daylight. '
            'In the center foreground, a steady, determined green tortoise with short sturdy legs reaching a colorful checkered wooden finish line ribbon. '
            'Further back in the lush meadow under a shady apple tree, a fluffy brown hare dozes peacefully on a patch of sunny yellow buttercups, with an open vintage fable storybook resting on the grass. '
            'Palette: meadow emerald green, tortoise shell olive and gold, finish ribbon bright red and white, and sky sunny cyan. '
            'Aesop\'s fables, moral literature, Tortoise and Hare, classic storytelling, playful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1414,
        "title": "Reading: Ali Baba and the Forty Thieves",
        "intent": "Reading Ali Baba and the Forty Thieves",
        "brief": (
            'Book cover design titled "Reading: Ali Baba and the Forty Thieves". '
            'The title "Ali Baba and the Forty Thieves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARABIAN TREASURE CAVERN DAYLIGHT STYLE: A sun-drenched magical mountain cavern entrance in ancient Persia in bright daylight. '
            'In the center foreground, the massive enchanted rock portal opened wide to reveal a sunlit treasure cavern brimming with sparkling gold urns, intricate Persian rugs, jeweled brass lanterns, and tall terracotta olive oil jars resting on golden desert sand. '
            'Outside the cave, a friendly pack donkey with woven saddlebags stands beside wild desert palms under a brilliant turquoise sky. '
            'Palette: treasure gold and ruby, terracotta warm sienna, Persian rug sapphire, and desert sky turquoise blue. '
            'Arabian Nights, Middle Eastern folklore, classic literature, treasure adventure, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1421,
        "title": "Reading: The Speckled Band and Other Stories",
        "intent": "Reading The Speckled Band and Other Stories",
        "brief": (
            'Book cover design titled "Reading: The Speckled Band and Other Stories". '
            'The title "The Speckled Band and Other Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VICTORIAN MANOR MYSTERY DAYLIGHT STYLE: A sunlit, intriguing Victorian manor bedchamber in bright morning natural daylight. '
            'In the center foreground, a polished mahogany nightstand holding a white porcelain saucer of milk, a brass detective\'s magnifying glass, and an antique heavy brass safe box. '
            'On the wall above, an ornate brass air-ventilator grate and a dummy embroidered bell-rope hanging down beside sun-drenched floral wallpaper. '
            'Palette: mahogany reddish brown, brass polished gold, porcelain white, and wallpaper soft sage green. '
            'Sherlock Holmes, locked-room mystery, Victorian detective fiction, Arthur Conan Doyle, bright, suspenseful, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1422,
        "title": "Reading: The Last of the Mohicans",
        "intent": "Reading The Last of the Mohicans",
        "brief": (
            'Book cover design titled "Reading: The Last of the Mohicans". '
            'The title "The Last of the Mohicans" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ADIRONDACK WILDERNESS DAYLIGHT STYLE: A sun-drenched, majestic Adirondack mountain forest in 1757 in brilliant natural daylight. '
            'In the center foreground, a traditional long Kentucky flintlock rifle with polished brass hardware resting against a mossy granite boulder, beside a beaded buckskin powder horn and an authentic birchbark canoe moored in sparkling mountain river waters. '
            'In the background, towering virgin white pine forests and sunlit granite mountain peaks rise into a clear azure sky. '
            'Palette: pine forest deep evergreen, birchbark white, buckskin warm ochre, and mountain river clear aqua. '
            'Historical fiction, American frontier, James Fenimore Cooper, wilderness adventure, dignified, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1424,
        "title": "Reading: The Mill on the Floss",
        "intent": "Reading The Mill on the Floss",
        "brief": (
            'Book cover design titled "Reading: The Mill on the Floss". '
            'The title "The Mill on the Floss" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RURAL WATERMILL DAYLIGHT STYLE: A picturesque, sun-drenched English watermill along the River Floss on a breezy summer day in bright daylight. '
            'In the center foreground, the colossal wooden waterwheel of Dorlcote Mill churning crystal-clear river water into white frothing foam. '
            'Along the grassy riverbank grow yellow water irises and weeping willows, with white burlap flour sacks stacked neatly on a wooden handcart in front of the rustic brick mill building. '
            'Palette: river water sparkling aqua, waterwheel dark weathered oak, mill brick warm terracotta, and sky summer azure. '
            'Classic Victorian literature, George Eliot, rural England, watermill mechanics, wholesome, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1425,
        "title": "Reading: 20,000 Leagues under the Sea",
        "intent": "Reading 20000 Leagues under the Sea",
        "brief": (
            'Book cover design titled "Reading: 20,000 Leagues under the Sea". '
            'The title "20,000 Leagues under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT UNDERWATER NAUTILUS SUBMARINE DAYLIGHT STYLE: An awe-inspiring underwater ocean vista bathed in sparkling turquoise sunlight. '
            'In the center foreground, the magnificent, steampunk-inspired submarine Nautilus gliding gracefully through deep turquoise waters, its curved riveted steel hull, dorsal spine, and large circular salon window glowing with warm internal golden light. '
            'Surrounding the submarine are vibrant coral reefs, schools of tropical fish, and sea turtles swimming in sunbeams piercing the crystal sea. '
            'Palette: ocean sparkling turquoise and aquamarine, Nautilus steel bronze and slate, coral pink, and sunbeam bright ivory. '
            'Science fiction classic, Jules Verne, submarine exploration, oceanography, adventurous, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1427,
        "title": "Reading: Blackbeard's Treasure",
        "intent": "Reading Blackbeards Treasure",
        "brief": (
            'Book cover design titled "Reading: Blackbeard\'s Treasure". '
            'The title "Blackbeard\'s Treasure" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MARITIME PIRATE COVE DAYLIGHT STYLE: A sunlit, picturesque coastal pirate harbor cove in bright morning daylight. '
            'In the center foreground, a weathered oak table on a seaside dock holding an antique brass ship\'s lantern, an open parchment treasure map with burnt edges and skull-and-crossbones seal, a brass pocket compass, and an iron chest overflowing with silver pieces of eight and gold escudos. '
            'In the background, calm turquoise harbor waters and a historic tall ship anchored near sunlit sea cliffs under a clear blue sky. '
            'Palette: treasure silver and gold, wood weathered driftwood gray, ocean turquoise, and sky radiant cyan. '
            'Pirate lore, maritime history, treasure maps, adventure literature, bright, engaging, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1438,
        "title": "The Time-Travelling River",
        "intent": "The Time-Travelling River",
        "brief": (
            'Book cover design titled "The Time-Travelling River". '
            'The title "The Time-Travelling River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RIVER GEOLOGY & HISTORY DAYLIGHT STYLE: A sunlit, breathtaking river valley winding through time in bright daylight. '
            'In the center foreground, a crystal-clear, sparkling river flowing past ancient geological rock strata and smooth river pebbles. '
            'A wooden rowboat floats peacefully beside water lilies, with subtle chronological historical milestones along the riverbanks (ancient stones, medieval watermill, modern clean bridge) under a glorious sunlit blue sky. '
            'Palette: river clear aqua, pebbles slate and granite, riverbank lush emerald, and sky sunny cyan. '
            'River hydrology, historical geology, landscape evolution, nature journeys, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1439,
        "title": "A Shade of GREEN",
        "intent": "A Shade of GREEN",
        "brief": (
            'Book cover design titled "A Shade of GREEN". '
            'The title "A Shade of GREEN" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT URBAN AIR QUALITY & GREEN OASIS DAYLIGHT STYLE: A sunlit urban rooftop garden and green sanctuary in bright daylight. '
            'In the center foreground, lush vertical living walls of ivy, ferns, and air-purifying plants flourishing in sunlight. '
            'On a wooden bench rests a clean solar-powered air monitoring station with a glowing green digital readout indicating "Clean Air Zone", beside potted saplings and blooming marigolds under a bright azure sky. '
            'Palette: vegetation vibrant lime and emerald green, bench natural teak, flower marigold orange, and sky brilliant cyan. '
            'Environmental science, urban pollution solutions, clean air technology, ecology, hopeful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1443,
        "title": "Astral Bodies",
        "intent": "Astral Bodies",
        "brief": (
            'Book cover design titled "Astral Bodies". '
            'The title "Astral Bodies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT SPACEFLIGHT PHYSIOLOGY DAYLIGHT STYLE: A sun-illuminated space station research module bathed in natural daylight from low Earth orbit. '
            'In the center foreground, floating in microgravity: crystal-clear spherical water droplets acting like tiny magnifying lenses, nutrient food packs with hydration tubes, and zero-gravity resistance bungee exercise equipment. '
            'Through the panoramic cupola observation windows, planet Earth\'s brilliant blue oceans and cloud patterns shine under bright solar illumination. '
            'Palette: station titanium white and brushed aluminum, Earth sapphire and turquoise, water droplet crystal clear, and sunlight brilliant gold. '
            'Space medicine, human physiology in microgravity, astronaut life, space science, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1444,
        "title": "Copying Nature's Engineers",
        "intent": "Copying Natures Engineers",
        "brief": (
            'Book cover design titled "Copying Nature\'s Engineers". '
            'The title "Copying Nature\'s Engineers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT BEAVER DAM BIOMIMICRY DAYLIGHT STYLE: A sun-drenched forest river wetland in radiant morning daylight. '
            'In the center foreground, an intricate, expertly constructed beaver dam made of interlocking birch branches, mud, and river stones, backing up a tranquil pond where a sturdy beaver lodge rises proudly. '
            'Floating beside the dam, an engineer\'s waterproof tablet displays technical structural diagrams comparing the beaver dam\'s arch design to modern water-management weirs. '
            'Palette: wetland water clear aqua, birch wood pale cream, lodge bark warm umber, and forest foliage emerald. '
            'Biomimicry, natural engineering, beaver ecology, water conservation, wetlands, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1445,
        "title": "Drip-Tips and Other Adaptations in the Rainforest",
        "intent": "Drip Tips and Other Adaptations in the Rainforest",
        "brief": (
            'Book cover design titled "Drip-Tips and Other Adaptations in the Rainforest". '
            'The title "Drip-Tips and Other Adaptations in the Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RAINFOREST BOTANY ADAPTATIONS DAYLIGHT STYLE: A sun-dappled, lush tropical rainforest canopy in bright daylight. '
            'In the center foreground, a stunning macro view of glossy tropical ficus leaves featuring pronounced, slender drip-tips efficiently funneling sparkling droplets of fresh rainwater to the tip, glistening in morning sunbeams. '
            'Beside the leaves, epiphytic bromeliads forming natural water reservoirs and climbing liana vines showcase diverse botanical adaptations. '
            'Palette: leaves rich emerald and jade, water droplets diamond sparkle, bromeliad scarlet, and background canopy soft chartreuse. '
            'Rainforest ecology, plant adaptations, botanical physiology, biodiversity, bright, crisp, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1446,
        "title": "Houston Affects the Earth",
        "intent": "Houston Affects the Earth",
        "brief": (
            'Book cover design titled "Houston Affects the Earth". '
            'The title "Houston Affects the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT URBAN SUSTAINABILITY & GREEN INFRASTRUCTURE DAYLIGHT STYLE: A sunlit, inspiring panoramic view of modern urban environmental initiatives in bright daylight. '
            'In the center foreground, a lush green urban bayou park with native wetlands, bike trails, and tree-lined bayous buffering city waterways. '
            'In the background, the modern skyline shines in sunlight with solar-paneled municipal rooftops, urban tree canopies, and clear blue Texas skies with soft white clouds. '
            'Palette: bayou greenway vibrant emerald, solar panels cobalt blue, urban architecture reflective glass, and sky radiant cyan. '
            'Urban ecology, sustainability, city planning, watershed protection, bright, civic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1447,
        "title": "How Do We Know the Climate Is Changing?",
        "intent": "How Do We Know the Climate Is Changing",
        "brief": (
            'Book cover design titled "How Do We Know the Climate Is Changing?". '
            'The title "How Do We Know the Climate Is Changing?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CLIMATE DATA SCIENCE DAYLIGHT STYLE: A sunlit polar and alpine climate research station in bright daylight. '
            'In the center foreground, a cylindrical core of ancient glacial ice resting on a stainless steel analysis tray, revealing distinct annual layers of trapped atmospheric bubbles. '
            'Beside the ice core, a modern scientific weather station anemometer, thermometer, and an electronic tablet displaying clear rising temperature trend graphs and satellite earth observation imagery. '
            'In the background, snow-capped mountains and green alpine valleys meet under a clear blue sky. '
            'Palette: glacial ice diamond white and cyan, instrument steel silver, and sky bright daylight azure. '
            'Climate science, glaciology, empirical evidence, Earth observation, objective, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1449,
        "title": "The Ecosystem of the Forest",
        "intent": "The Ecosystem of the Forest",
        "brief": (
            'Book cover design titled "The Ecosystem of the Forest". '
            'The title "The Ecosystem of the Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT FOREST ECOLOGY & NUTRIENT CYCLING DAYLIGHT STYLE: A sun-drenched temperate woodland ecosystem in radiant morning daylight. '
            'In the center foreground, a magnificent nurse log covered in velvety green moss, bracket fungi, and sprouting oak seedlings, showcasing natural recycling. '
            'Sunbeams filter through a lush canopy of broadleaf trees, illuminating flying honeybees, forest ferns, and clean educational graphic arrows showing the flow of carbon dioxide, oxygen, and soil nutrients. '
            'Palette: forest canopy vibrant jade and emerald, moss chartreuse, tree bark warm umber, and sunbeam radiant gold. '
            'Ecology, forest ecosystems, photosynthesis, food webs, biodiversity, bright, rich, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1450,
        "title": "A Fizzy Reaction",
        "intent": "A Fizzy Reaction",
        "brief": (
            'Book cover design titled "A Fizzy Reaction". '
            'The title "A Fizzy Reaction" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ELEMENTARY CHEMISTRY & EFFEFFERVESCENCE DAYLIGHT STYLE: A cheerful, brightly lit science laboratory workbench in full daylight. '
            'In the center foreground, a clear Erlenmeyer glass flask erupting with an energetic, playful fountain of sparkling fizzy white bubbles and foam from an acid-base reaction. '
            'Surrounding the flask are colorful test tubes of indicator solutions (coral, lemon yellow, sky blue), a colorful molecular ball-and-stick model, and an open chemistry workbook with cheerful diagrams. '
            'Palette: foam sparkling white, indicator liquids coral, yellow, and cyan, and lab workbench sunny daylight wood. '
            'Chemistry, chemical reactions, effervescence, acids and bases, playful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1451,
        "title": "Coast Beast",
        "intent": "Coast Beast",
        "brief": (
            'Book cover design titled "Coast Beast". '
            'The title "Coast Beast" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT KINETIC BEACH SCULPTURE DAYLIGHT STYLE: A sun-drenched, windy beach on the coast of Holland on a clear summer day in bright daylight. '
            'In the center foreground, a magnificent Theo Jansen Strandbeest kinetic sculpture made of intricate yellow PVC tubes and nylon joints, its delicate multi-legged linkage walking gracefully across golden wet beach sands powered by wind sails. '
            'In the background, ocean waves break with white seafoam under a bright azure sky and soaring coastal gulls. '
            'Palette: Strandbeest tubes sunny yellow, beach sand golden ochre, seafoam white, and ocean sea green. '
            'Kinetic art, biomimetic engineering, Theo Jansen Strandbeest, wind power, physics, fascinating, bright, educational, completely daylight. '
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

import os

books = [
    {
        "id": 1348,
        "title": "Literature: Black Beauty",
        "intent": "Literature Black Beauty",
        "brief": (
            'Book cover design titled "Literature: Black Beauty". '
            'The title "Black Beauty" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VICTORIAN COUNTRYSIDE DAYLIGHT STYLE: A sun-drenched English countryside meadow on a glorious summer morning in bright natural daylight. '
            'In the center foreground, a magnificent, healthy thoroughbred horse with a sleek, glossy jet-black coat and a distinctive white star on its forehead standing proudly on lush green pasture grass dotted with yellow buttercups. '
            'Beside the horse, a traditional rustic white wooden post-and-rail fence and rolling green hills under a clear blue sky. '
            'Palette: horse glossy jet black, meadow emerald green, fence white, and sky radiant cyan. '
            'Classic literature, equestrian life, English countryside, Anna Sewell, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1349,
        "title": "Literature: Round the World in Eighty Days",
        "intent": "Literature Round the World in Eighty Days",
        "brief": (
            'Book cover design titled "Literature: Round the World in Eighty Days". '
            'The title "Round the World in Eighty Days" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VICTORIAN GLOBAL TRAVEL DAYLIGHT STYLE: A sunlit, inspiring Victorian gentleman\'s travel study in bright natural daylight. '
            'In the center foreground, a large ornate polished brass desk globe with travel route lines connecting London, Suez, India, and Yokohama. '
            'Beside the globe rest an antique gold pocket watch with ticking second hand, a brass navigation compass, rolled train timetables, and miniature models of an iron steam locomotive and paddle steamship. '
            'Through sunny windows in the background, a colorful hot-air balloon drifts across a bright blue sky. '
            'Palette: brass polished gold, globe ocean sapphire, leather warm tan, and sky brilliant daylight cyan. '
            'Classic literature, world travel, Victorian adventure, Jules Verne, bright, inspiring, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1352,
        "title": "Reading: A History of Britain",
        "intent": "Reading A History of Britain",
        "brief": (
            'Book cover design titled "Reading: A History of Britain". '
            'The title "A History of Britain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT BRITISH HISTORICAL HERITAGE DAYLIGHT STYLE: A sun-drenched, iconic landscape celebrating British history across millennia in bright daylight. '
            'In the center foreground, an ancient stone monument megalith resting on rolling emerald hills, with historical artifacts arranged respectfully: an ancient Celtic bronze shield with spiral motifs, a polished medieval knight\'s steel helmet, and a parchment copy of Magna Carta with red wax seals. '
            'In the sweeping background, the iconic White Cliffs of Dover meet the sparkling blue English Channel under a radiant sunny sky. '
            'Palette: rolling hills rich emerald, bronze shield warm amber, stone weathered slate, and sea sapphire. '
            'British history, heritage, archaeology, historical epochs, dignified, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1362,
        "title": "Literature: The House of Stairs",
        "intent": "Literature The House of Stairs",
        "brief": (
            'Book cover design titled "Literature: The House of Stairs". '
            'The title "The House of Stairs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARCHITECTURAL STAIRCASE MYSTERY DAYLIGHT STYLE: A sunlit, breathtaking grand Victorian architectural atrium bathed in bright natural daylight. '
            'In the center foreground, an extraordinary series of sweeping, interlocking polished oak and wrought-iron staircases ascending through multiple gallery levels. '
            'Sunbeams pour through tall stained-glass skylights, casting vibrant rainbow geometric light patterns across the polished marble floors and balustrades. '
            'Palette: staircase warm polished oak, railing wrought-iron black, light patterns ruby and sapphire, and atrium marble ivory. '
            'Architectural mystery, psychological literature, grand staircases, elegant, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1363,
        "title": "Literature: The Dream and Other Stories",
        "intent": "Literature The Dream and Other Stories",
        "brief": (
            'Book cover design titled "Literature: The Dream and Other Stories". '
            'The title "The Dream and Other Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT WHIMSICAL ROADSIDE ADVENTURE DAYLIGHT STYLE: A sunlit, charming English country road on a glorious sunny morning in bright daylight. '
            'In the center foreground, a polished vintage 1930s British roadster motorcar parked safely beside a picturesque country hedge bursting with wild hawthorn blossoms. '
            'A playful, surreal symbolic floating glass hourglass with golden sand stands on a stone milestone beside an open road map, under a bright blue sky with cheerful fluffy clouds. '
            'Palette: roadster racing green, country lane warm gravel, hawthorn blossom white, and sky brilliant cyan. '
            'Short stories, classic literature, roadside mystery, nostalgic adventure, bright, whimsical, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1370,
        "title": "Literature: Lord Jim",
        "intent": "Literature Lord Jim",
        "brief": (
            'Book cover design titled "Literature: Lord Jim". '
            'The title "Lord Jim" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT TROPICAL MARITIME HARBOR DAYLIGHT STYLE: A sun-drenched maritime anchorage in the tropical East Indies under brilliant daylight. '
            'In the center foreground, the teak deck of a sailing ship with a polished brass binnacle compass, ship\'s wooden steering wheel, coiled manila mooring ropes, and a brass marine sextant catching dazzling morning sunbeams. '
            'In the background across turquoise harbor waters, a vintage iron steamship rests near lush green tropical volcanic islands under a clear azure sky. '
            'Palette: ship teak warm amber, binnacle brass polished gold, ocean water sparkling turquoise, and island jungle emerald. '
            'Maritime literature, tropical seafaring, Joseph Conrad classic, nautical adventures, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1372,
        "title": "Literature: The Adventures of Sherlock Holmes",
        "intent": "Literature The Adventures of Sherlock Holmes",
        "brief": (
            'Book cover design titled "Literature: The Adventures of Sherlock Holmes". '
            'The title "The Adventures of Sherlock Holmes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VICTORIAN DETECTIVE STUDY DAYLIGHT STYLE: A sunlit, elegant study room at 221B Baker Street in bright morning natural daylight. '
            'In the center foreground, on a polished mahogany desk: an iconic curved wooden smoking pipe, a heavy brass handheld magnifying glass focusing on a cryptic handwritten parchment cipher, and an open case with an antique wooden violin and bow. '
            'Beside the desk, a classic houndstooth deerstalker cap rests on a burgundy leather wingback armchair near sun-drenched curtained windows. '
            'Palette: mahogany rich reddish-brown, brass magnifying glass gold, leather burgundy, and morning daylight ivory. '
            'Detective fiction, classic mysteries, Arthur Conan Doyle, deductive reasoning, bright, iconic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1374,
        "title": "Literature: Three Men in a Boat",
        "intent": "Literature Three Men in a Boat",
        "brief": (
            'Book cover design titled "Literature: Three Men in a Boat". '
            'The title "Three Men in a Boat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT RIVER THAMES BOATING DAYLIGHT STYLE: A sun-drenched, cheerful English river scene along the picturesque River Thames in radiant summer daylight. '
            'In the center foreground, a classic wooden Thames skiff rowboat with striped canvas canopy and polished varnished oars resting beside a scenic riverbank shaded by weeping willows. '
            'Inside the boat, a woven picnic hamper overflowing with crusty bread and ginger beer bottles, an acoustic banjo, and a cheerful yellow fox terrier dog\'s red collar and rubber ball resting on cushions. '
            'Palette: skiff polished mahogany, river water sparkling aqua, willow trees fresh lime green, and summer sky radiant blue. '
            'Humorous literature, river boating, Victorian summer holiday, Jerome K. Jerome, cheerful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1377,
        "title": "Literature: A Picture to Remember",
        "intent": "Literature A Picture to Remember",
        "brief": (
            'Book cover design titled "Literature: A Picture to Remember". '
            'The title "Literature: A Picture to Remember" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT FINE ART STUDIO DAYLIGHT STYLE: A sunlit artist\'s restoration atelier in bright natural morning daylight. '
            'In the center foreground, a wooden studio easel holding a vibrant oil painting of a sunlit Venetian canal and historic stone bridge. '
            'On an artist\'s taboret beside the easel rest tubes of oil paints, fine sable brushes, a palette knife with dabbed colors, a wooden painter\'s palette, and a brass magnifying glass. '
            'Palette: canvas Venetian aqua and ochre, paint tubes cobalt blue and crimson, easel warm beech, and studio daylight bright ivory. '
            'Art history, mystery, artistic restoration, painting studio, creative, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1378,
        "title": "Literature: Sherlock Holmes Short Stories",
        "intent": "Literature Sherlock Holmes Short Stories",
        "brief": (
            'Book cover design titled "Literature: Sherlock Holmes Short Stories". '
            'The title "Sherlock Holmes Short Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VICTORIAN INVESTIGATION TABLE DAYLIGHT STYLE: A sun-drenched investigator\'s desk in bright daytime. '
            'In the center foreground, a high-magnification optical lens resting atop an open leather-bound notebook with handwritten case notes and fingerprint diagrams. '
            'Beside the notebook, a distinctive briar pipe, an antique pocket watch with a gold chain, a silver key, and a stack of telegrams on a green baize desk blotter. '
            'Palette: desk green baize and walnut, magnifying glass brass gold, notebook cream parchment, and daylight sunbeam gold. '
            'Detective stories, forensic observation, Sherlock Holmes mysteries, classic literature, bright, clever, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1380,
        "title": "Literature: The Eyes of Montezuma",
        "intent": "Literature The Eyes of Montezuma",
        "brief": (
            'Book cover design titled "Literature: The Eyes of Montezuma". '
            'The title "The Eyes of Montezuma" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ARCHAEOLOGICAL ARTIFACTS DAYLIGHT STYLE: A sun-drenched archaeological study overlooking a sunny coastal cliff in bright morning daylight. '
            'In the center foreground, an exquisite pre-Columbian Aztec mosaic artifact: a double-headed serpent carved of turquoise and mother-of-pearl tiles with glowing obsidian eyes, resting on an archaeologist\'s drafting desk. '
            'Beside the artifact lie a geologist\'s brass calipers, a leather-bound field journal with hieroglyphic sketches, and a panoramic view of the sunny ocean. '
            'Palette: artifact turquoise blue and jade green, desk warm cedar, and ocean shimmering azure. '
            'Archaeological mystery, Mesoamerican history, Aztec artifacts, adventure fiction, bright, fascinating, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1385,
        "title": "Reading: The Merchant of Venice",
        "intent": "Reading The Merchant of Venice",
        "brief": (
            'Book cover design titled "Reading: The Merchant of Venice". '
            'The title "The Merchant of Venice" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT VENETIAN RIALTO DAYLIGHT STYLE: A sun-drenched, magnificent view of Venice\'s Grand Canal and Rialto bridge on a clear morning in bright daylight. '
            'In the center foreground, on a merchant\'s stone balustrade: an ornate brass merchant\'s balance scale weighing gleaming gold Venetian ducat coins, beside an open parchment contract scroll sealed with red wax, and a quill pen. '
            'In the background, gondolas glide gracefully across sparkling turquoise waters past historic Venetian Gothic palazzos under a radiant azure sky. '
            'Palette: canal sparkling turquoise, palazzo terracotta and white marble, ducat coin brilliant gold, and sky sunny cyan. '
            'Shakespearean literature, Venetian history, Renaissance commerce, classic drama, bright, majestic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1386,
        "title": "Reading: O. Henry's Short Stories",
        "intent": "Reading O Henrys Short Stories",
        "brief": (
            'Book cover design titled "Reading: O. Henry\'s Short Stories". '
            'The title "O. Henry\'s Short Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT GREENWICH VILLAGE ARTIST WINDOW DAYLIGHT STYLE: A charming, sun-drenched brick townhouse artist\'s studio window in Greenwich Village in bright morning daylight. '
            'In the center foreground, a single resilient green ivy vine leaf painted lovingly on the exterior brick wall outside the windowpane (symbol of The Last Leaf). '
            'On the wooden interior windowsill rest an antique pocket watch with a leather strap, a set of tortoise-shell hair combs studded with jewels, an artist\'s wooden watercolor paint box, and an open volume of short stories. '
            'Palette: brick warm terracotta red, ivy leaf fresh emerald, windowsill weathered pine, and morning sunshine warm amber. '
            'Classic American literature, O. Henry stories, ironic wit, heartwarming tales, bright, nostalgic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1388,
        "title": "The Adventures of Sherlock Holmes",
        "intent": "The Adventures of Sherlock Holmes Blue Carbuncle",
        "brief": (
            'Book cover design titled "The Adventures of Sherlock Holmes". '
            'The title "The Adventures of Sherlock Holmes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT DETECTIVE ARTIFACTS & JEWEL MYSTERY DAYLIGHT STYLE: A sunlit Victorian detective\'s examination desk in bright daylight. '
            'In the center foreground, a breathtaking, flawless blue carbuncle gemstone sparkling brilliantly on a square of white velvet fabric, refracting radiant sapphire light rays. '
            'Beside the gem, a brass jeweler\'s loupe magnifying glass, an antique silver pocket watch, a walking cane with a carved bone handle, and an open leather case file. '
            'Palette: gem brilliant royal sapphire blue, velvet crisp white, mahogany desk deep reddish-brown, and daylight sunbeams golden. '
            'Sherlock Holmes, classic detective mysteries, gem theft investigation, Victorian sleuth, bright, iconic, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1390,
        "title": "The Space Invaders",
        "intent": "The Space Invaders",
        "brief": (
            'Book cover design titled "The Space Invaders". '
            'The title "The Space Invaders" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT ALIEN PLANETARY EXPLORATION DAYLIGHT STYLE: A sunlit, extraordinary alien planetary landscape on planet Zeron in bright daylight. '
            'In the center foreground, a sleek titanium robotic planetary exploration rover with solar wings and communication dish resting on iridescent turquoise-and-copper sands. '
            'In the alien sky overhead, twin suns illuminate towering crystalline rock spires and floating geometric sensor beacons. '
            'Palette: rover titanium white and solar gold, sand turquoise and copper, and sky alien violet-blue with twin golden suns. '
            'Science fiction, space exploration, alien worlds, planetary science, adventurous, bright, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1391,
        "title": "The Sign of Four",
        "intent": "The Sign of Four",
        "brief": (
            'Book cover design titled "The Sign of Four". '
            'The title "The Sign of Four" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT AGRA TREASURE & DETECTIVE STUDY DAYLIGHT STYLE: A sunlit, intriguing study desk bathed in bright morning daylight. '
            'In the center foreground, an ornate antique Indian sandalwood and brass-bound treasure chest overflowing with shimmering oriental pearls, uncut rubies, and ancient gold coins. '
            'Resting beside the chest are a folded antique map marked with the four-symbol cipher, a brass magnifying glass, and a doctor\'s medical journal. '
            'Palette: treasure chest warm sandalwood and polished brass, pearls lustrous cream, rubies crimson, and map aged parchment gold. '
            'Sherlock Holmes, Arthur Conan Doyle, Agra treasure mystery, classic literature, bright, fascinating, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1392,
        "title": "The Black Cat",
        "intent": "The Black Cat",
        "brief": (
            'Book cover design titled "The Black Cat". '
            'The title "The Black Cat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT EGYPTIAN ANTIQUITIES DAYLIGHT STYLE: A sun-drenched archaeological terrace in Cairo overlooking the golden Giza plateau in bright morning daylight. '
            'In the center foreground, a magnificent ancient Egyptian black basalt statuette of the cat goddess Bastet adorned with delicate golden earrings and collar, resting on an archaeologist\'s linen-covered worktable. '
            'Beside the statuette lie an antique magnifying loupe, rolled papyrus excavation maps, and a brass compass. '
            'In the background, the iconic Great Pyramids glow under a brilliant azure sky. '
            'Palette: cat statue polished black basalt and gold, desert sand warm ochre, and sky clear Egyptian cyan. '
            'Archaeological mystery, Egyptian antiquities, inspector Salahadin, ancient history, bright, dignified, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1393,
        "title": "Treasure Island",
        "intent": "Treasure Island",
        "brief": (
            'Book cover design titled "Treasure Island". '
            'The title "Treasure Island" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT CARIBBEAN PIRATE TREASURE DAYLIGHT STYLE: A sun-drenched, breathtaking tropical island beach on a glorious sunny day in bright daylight. '
            'In the center foreground, an authentic weathered wooden pirate treasure chest with iron bands resting on white coral sand, overflowing with sparkling gold doubloons, ruby goblets, and pearl necklaces. '
            'Beside the chest rests an open parchment treasure map with a bold red "X", an antique brass spyglass, and a colorful scarlet macaw perched on a piece of sunlit driftwood under swaying coconut palms. '
            'In the turquoise bay behind, a classic tall three-masted wooden sailing galleon rests at anchor under a radiant blue sky. '
            'Palette: treasure gold and ruby, ocean crystal turquoise, sand sparkling white, and macaw scarlet and royal blue. '
            'Classic adventure, Treasure Island, pirates, Robert Louis Stevenson, tropical adventure, bright, exciting, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1395,
        "title": "Reading: The Adventures of Tom Sawyer",
        "intent": "Reading The Adventures of Tom Sawyer",
        "brief": (
            'Book cover design titled "Reading: The Adventures of Tom Sawyer". '
            'The title "The Adventures of Tom Sawyer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MISSISSIPPI SUMMER BOYHOOD DAYLIGHT STYLE: A sun-drenched summer afternoon in a quaint 19th-century Missouri village along the Mississippi River in bright daylight. '
            'In the center foreground, a rustic wooden picket fence being painted with fresh, gleaming white whitewash. '
            'Resting on the green grass beside the fence: a wooden bucket of whitewash with a wide paintbrush, a crisp red apple, a simple bamboo fishing pole with a red-and-white bobber, and a straw sun hat. '
            'In the background, the sparkling Mississippi River rolls past willow trees under a clear summer sky. '
            'Palette: whitewash bright white, grass summer green, apple crimson red, and river sparkling blue. '
            'Classic American literature, Tom Sawyer, Mark Twain, summer boyhood adventure, cheerful, bright, educational, completely daylight. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1396,
        "title": "Classic Literature: The Adventures of Huckleberry Finn",
        "intent": "Classic Literature The Adventures of Huckleberry Finn",
        "brief": (
            'Book cover design titled "Classic Literature: The Adventures of Huckleberry Finn". '
            'The title "The Adventures of Huckleberry Finn" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MISSISSIPPI RIVER RAFT EXPEDITION DAYLIGHT STYLE: A sunlit, breathtaking panorama of the mighty Mississippi River in golden summer daylight. '
            'In the center foreground, a sturdy timber log raft with a cozy canvas-covered wooden shelter floating peacefully down the shimmering river currents. '
            'On the raft deck rest a wooden fishing pole, a tin lantern, an open burlap sack of provisions, and a tin mug. '
            'Lush green cypress and willow trees line the misty riverbanks, with a majestic great blue heron soaring across a brilliant golden-blue morning sky. '
            'Palette: river water golden-aqua, timber logs warm weathered wood, foliage rich riverbank green, and sky sunny morning cyan. '
            'American classic literature, Huckleberry Finn, Mississippi River raft voyage, Mark Twain, freedom and adventure, bright, educational, completely daylight. '
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

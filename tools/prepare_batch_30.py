import os

books = [
    {
        "id": 2051,
        "title": "Literature: 20,000 Leagues Under the Sea",
        "intent": "20000 Leagues Under the Sea Jules Verne Nautilus submarine deep sea coral",
        "brief": (
            'Book cover design titled "20,000 Leagues Under the Sea". '
            'The title "20,000 Leagues Under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC JULES VERNE SUBMARINE STYLE: A sunlit, magnificent underwater deep sea vista. '
            'The iconic steampunk Victorian submarine "Nautilus" with riveted brass hull and glowing observation salon portholes cruising gracefully through an enchanted undersea forest '
            'of vibrant giant sea fans, glowing bioluminescent corals, and schools of glittering silver fish under shafts of sunlight penetrating from the surface. '
            'Palette: ocean water deep aquamarine and turquoise, submarine hull rich antique bronze and gold, and coral reef vibrant rose and amber. '
            'Classic adventure literature, undersea exploration, marine wonder, majestic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2055,
        "title": "Literature: Gulliver's Travels",
        "intent": "Gullivers Travels Jonathan Swift Lilliput miniature sailing ships",
        "brief": (
            'Book cover design titled "Gulliver\'s Travels". '
            'The title "Gulliver\'s Travels" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC SATIRICAL ADVENTURE STYLE: A sun-drenched coastal scene on the shores of Lilliput in bright daylight. '
            'On a golden sand beach, a colossal vintage leather explorer boot with brass eyelets rests peacefully, surrounded by tiny, intricately detailed Lilliputian miniature sailing frigates '
            'with toothpick masts and microscopic thread rigging anchored in the shallow water, with tiny ladders and miniature ropes. '
            'Palette: leather boot warm chestnut, miniature ships ivory sails and gold trim, beach sand warm ochre, and sunny sky cyan. '
            'Classic literature, miniature scale wonder, exploration adventure, whimsical and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2083,
        "title": "Reading: City of Lights",
        "intent": "City of Lights Paris Eiffel Tower Seine river architecture daylight",
        "brief": (
            'Book cover design titled "City of Lights". '
            'The title "City of Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PARISIAN ARCHITECTURAL PANORAMA STYLE: A sunlit, romantic panoramic vista of Paris on a crisp autumn morning. '
            'The magnificent wrought-iron lattice of the Eiffel Tower soaring proudly into a clear azure sky, overlooking the gentle curves of the River Seine, '
            'classic stone bridges with ornate lampposts, Haussmannian rooftops with zinc dormers, and golden autumn foliage along the riverside promenades. '
            'Palette: Eiffel Tower warm bronze, Seine water glistening sapphire, autumn trees golden amber, and sky pastel cerulean. '
            'World capitals, European architecture, cultural geography, elegant and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2093,
        "title": "Classic Literature: The Jungle Book",
        "intent": "The Jungle Book Rudyard Kipling Indian jungle banyan ruins wildlife",
        "brief": (
            'Book cover design titled "The Jungle Book". '
            'The title "The Jungle Book" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC INDIAN JUNGLE ADVENTURE STYLE: A sun-drenched, mystical ancient rainforest in central India in morning light. '
            'Ancient moss-covered carved stone palace ruins entwined with colossal banyan tree roots and hanging flowering lianas, '
            'with shafts of brilliant golden sunlight illuminating a sleek black panther (Bagheera) resting gracefully on a broad high branch, '
            'and colorful peacocks displaying iridescent feathers in the clearing below. '
            'Palette: jungle canopy lush emerald and jade, temple stone warm mossy grey, sunbeams radiant gold, and peacock plumage sapphire blue. '
            'Classic literature, tropical wilderness, jungle wildlife, enchanting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2097,
        "title": "Reading: Aesop's Fables",
        "intent": "Aesops Fables Greek olive grove amphora tortoise hare storytelling",
        "brief": (
            'Book cover design titled "Aesop\'s Fables". '
            'The title "Aesop\'s Fables" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC MEDITERRANEAN FABLE STYLE: A sunlit ancient Mediterranean olive grove on a peaceful grassy hillside. '
            'In the foreground, a terracotta Greek amphora vase with a black-figure painting depicting the Crow and the Pitcher, '
            'an ancient marble sundial, and on the sunlit path, a steady, determined little land tortoise walking ahead of a sleeping rabbit under wild poppies. '
            'Distant Aegean sea and classical stone columns under a bright sunny sky. '
            'Palette: olive leaves silvery green, terracotta vase warm burnt orange, marble warm cream, and sky Mediterranean cyan. '
            'Ancient fables, timeless moral stories, classical folklore, delightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2102,
        "title": "Reading: The Great Stone Face",
        "intent": "The Great Stone Face Nathaniel Hawthorne mountain cliff granite profile",
        "brief": (
            'Book cover design titled "The Great Stone Face". '
            'The title "The Great Stone Face" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MOUNTAIN GEOLOGY FOLKLORE STYLE: A majestic alpine mountain summit in New Hampshire bathed in glorious morning sun. '
            'Towering natural granite cliffs high on the mountainside form an unmistakable, noble, serene human-like facial profile sculpted by centuries of weather, '
            'overlooking a vast, peaceful valley of emerald pine forests, sparkling mountain streams, and rolling green hills under a bright blue sky. '
            'Palette: granite rock silvery grey and warm tan, pine forest deep evergreen, morning sunbeams radiant gold, and alpine sky azure. '
            'Classic American literature, geological wonders, natural stone monuments, awe-inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the natural geological rock mountain cliff profile). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2115,
        "title": "Reading: The Little Prince",
        "intent": "The Little Prince Asteroid B612 rose cloche baobab volcanoes stars",
        "brief": (
            'Book cover design titled "The Little Prince". '
            'The title "The Little Prince" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'POETIC CELESTIAL FANTASY STYLE: A whimsical, poetic view of tiny Asteroid B-612 floating in a gentle, warm starlit cosmos. '
            'On the small curved surface of the grassy planetoid are three tidy miniature volcanoes (one extinct), a tiny green baobab sprout, '
            'and a single exquisite, luminous red rose flourishing safely under a delicate crystal glass cloche, glowing softly under distant constellations. '
            'Palette: cosmos deep indigo and twilight violet, rose petals radiant crimson, planetoid grass fresh green, and stars sparkling gold. '
            'Classic philosophical literature, poetic storytelling, wonder and imagination, heartwarming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2139,
        "title": "Reading: The Wind in the Willows",
        "intent": "The Wind in the Willows Kenneth Grahame riverbank rowing boat willow",
        "brief": (
            'Book cover design titled "The Wind in the Willows". '
            'The title "The Wind in the Willows" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PASTORAL RIVERSIDE ADVENTURE STYLE: A sunlit, idyllic English riverbank on a lazy summer afternoon. '
            'Weeping green willow branches sweep gently down toward crystal-clear river waters, where a classic green wooden rowing boat '
            'is moored to a wooden dock with yellow water lilies, holding a cozy picnic hamper basket, wooden oars, and a blue teapot. '
            'Water voles and otters swimming playfully in the reeds under sunny skies. '
            'Palette: willow foliage lush lime and sage green, river water sparkling turquoise, boat wood forest green, and sunlight warm buttercup. '
            'Classic children\'s literature, pastoral tranquility, riverbank camaraderie, charming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2143,
        "title": "Reading: Black Beauty",
        "intent": "Black Beauty Anna Sewell black horse stallion meadow paddock pasture",
        "brief": (
            'Book cover design titled "Black Beauty". '
            'The title "Black Beauty" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC EQUINE PASTORAL STYLE: A sun-drenched, rolling English pasture in full spring daylight. '
            'In the center foreground, a magnificent, healthy black horse (stallion) with a sleek, glossy jet-black coat and a single white star on its forehead, '
            'its mane and tail flowing gracefully in the fresh morning breeze as it gallops joyfully across emerald meadows with white wooden fences and blooming buttercups. '
            'Palette: horse coat glossy jet-black, pasture grass vibrant emerald green, wildflowers golden yellow, and sky bright country azure. '
            'Classic animal literature, equine beauty, animal welfare, noble and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2158,
        "title": "Reading: Alien at School",
        "intent": "Alien at School friendly robot gadget hoverboard textbooks classroom",
        "brief": (
            'Book cover design titled "Alien at School". '
            'The title "Alien at School" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WHIMSICAL SCI-FI CLASSROOM DAYLIGHT STYLE: A sunlit, colorful school hallway and classroom on a bright morning. '
            'Floating playfully in the hallway is an endearing, friendly spherical extraterrestrial robot companion with glowing green optical sensors, '
            'a springy antenna, and anti-gravity propulsion, levitating a stack of colorful school textbooks and pencils across the air. '
            'Sunny classroom lockers, student art posters, and bright window daylight. '
            'Palette: alien robot iridescent teal and chrome, textbooks bright orange and royal blue, school lockers sunny yellow, and morning light warm white. '
            'School adventures, sci-fi fun, friendly technology, imaginative and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2170,
        "title": "Reading: A Trip to the Safari Park",
        "intent": "Trip Safari Park African savanna giraffe zebra acacia safari vehicle",
        "brief": (
            'Book cover design titled "A Trip to the Safari Park". '
            'The title "A Trip to the Safari Park" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AFRICAN SAVANNA SAFARI DAYLIGHT STYLE: A sun-soaked safari park savanna landscape in brilliant midday sunshine. '
            'Towering, elegant reticulated giraffes reaching for tender leaves in an iconic flat-topped umbrella acacia tree, '
            'with a dazzle of zebras displaying bold black-and-white stripes drinking from a watering hole, and an empty open-topped green safari jeep parked nearby with binoculars on the seat. '
            'Snow-capped Mount Kilimanjaro in the distant horizon under an azure sky. '
            'Palette: savanna grass warm golden ochre, acacia leaves dusty green, zebra stripes crisp monochrome, and sky brilliant blue. '
            'Wildlife safari, African animals, savanna biodiversity, sunny, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2172,
        "title": "Reading: The Enormous Turnip",
        "intent": "The Enormous Turnip folktale vegetable garden giant turnip wheelbarrow",
        "brief": (
            'Book cover design titled "The Enormous Turnip". '
            'The title "The Enormous Turnip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'STORYBOOK VEGETABLE GARDEN DAYLIGHT STYLE: A sunlit, storybook rustic vegetable garden on a gorgeous summer morning. '
            'In the center, a colossal, gigantic turnip with a vibrant purple-and-white bulbous root bulging proudly out of rich garden soil, '
            'with enormous, lush ruffled green leaves reaching skyward. Beside it sits a classic rustic wooden wheelbarrow, a watering can, and garden trowels. '
            'Sunflowers and wooden picket fences in the background under sunny skies. '
            'Palette: turnip root vivid magenta-purple and crisp white, foliage lush leafy green, garden soil rich dark loam, and sky cheerful blue. '
            'Classic folktale, teamwork storytelling, garden botany, delightful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2173,
        "title": "Reading: The Ugly Duckling",
        "intent": "The Ugly Duckling Hans Christian Andersen cygnet swan pond water lilies",
        "brief": (
            'Book cover design titled "The Ugly Duckling". '
            'The title "The Ugly Duckling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'FAIRYTALE POND BOTANICAL DAYLIGHT STYLE: A peaceful, sunlit freshwater pond surrounded by flowering reeds, cattails, and pink water lilies. '
            'In the center, a gentle grey fluffy cygnet swimming on the calm, sparkling water surface, looking down as its reflection '
            'reveals a magnificent, graceful white adult swan with curved neck and glowing white plumage under soft morning sunbeams. '
            'Palette: pond water serene turquoise cyan, water lilies soft rose and emerald pads, swan feathers pure radiant white, and sunlight warm gold. '
            'Classic fairy tales, growth and self-discovery, pond nature, touching and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2174,
        "title": "Reading: Little Red Riding Hood",
        "intent": "Little Red Riding Hood fairytale forest path picnic basket red hood",
        "brief": (
            'Book cover design titled "Little Red Riding Hood". '
            'The title "Little Red Riding Hood" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'STORYBOOK FAIRYTALE WOODLAND DAYLIGHT STYLE: A magical, sunlit storybook forest glade on a bright morning. '
            'A cobblestone footpath winding through ancient mossy oak trees and wild blackberry brambles. '
            'Resting on a rustic mossy wooden tree stump is a classic woven wicker picnic basket filled with fresh baked bread and red apples, '
            'draped with a vibrant crimson-red velvet hooded cloak and a bouquet of fresh wild daisies. Sunbeams filtering through green leaves. '
            'Palette: cloak vivid crimson red, forest moss emerald green, oak tree trunks warm bark brown, and morning sunlight golden yellow. '
            'Classic folklore, fairytale storytelling, woodland nature, inviting and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2175,
        "title": "Reading: Mowgli Learns To Swim",
        "intent": "Mowgli Learns To Swim jungle river waterfall bear Baloo swimming",
        "brief": (
            'Book cover design titled "Mowgli Learns To Swim". '
            'The title "Mowgli Learns To Swim" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'JUNGLE RIVER WATERFALL DAYLIGHT STYLE: A sun-soaked, tropical jungle river swimming hole in broad daylight. '
            'A gentle, cascading waterfall tumbling into a crystal-clear turquoise pool with smooth river pebbles, '
            'where a friendly, giant sloth bear (Baloo) is splashing playfully on its back in the cool water, creating sparkling water sprays in the sun. '
            'Lush hanging jungle orchids and tropical palm fronds framing the sunny scene. '
            'Palette: river pool sparkling aquamarine and crystal white, jungle foliage rich lime and emerald green, bear fur deep warm brown, and sunlight radiant gold. '
            'Jungle adventures, swimming skills, wildlife nature, refreshing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2176,
        "title": "Reading: The Mad Teacher",
        "intent": "The Mad Teacher eccentric science lab bubbling beakers chalkboard",
        "brief": (
            'Book cover design titled "The Mad Teacher". '
            'The title "The Mad Teacher" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WHIMSICAL SCIENCE CLASSROOM DAYLIGHT STYLE: A bright, sunlit, wonderfully eccentric science laboratory classroom in daytime. '
            'An oak teacher\'s lab desk brimming with colorful bubbling glass flasks emitting playful plumes of non-toxic rainbow foam, '
            'a large brass telescope pointing out the window, a spinning terrestrial globe, and a giant chalkboard in the background covered in funny physics equations and rocket sketches. '
            'Palette: glassware neon liquids orange, lime and cyan, chalkboard slate grey with colorful chalk, and desk warm honey oak. '
            'Humorous science learning, eccentric experiments, scientific curiosity, energetic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2185,
        "title": "Reading: Freddy Finds the Thief",
        "intent": "Freddy Finds the Thief detective magnifying glass footprints fedora clues",
        "brief": (
            'Book cover design titled "Freddy Finds the Thief". '
            'The title "Freddy Finds the Thief" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CLASSIC DETECTIVE MYSTERY DAYLIGHT STYLE: A sunlit, cozy vintage detective office on a bright morning. '
            'On a polished parquet wooden floor, a high-magnification brass detective magnifying glass is focusing closely on a set of mysterious dusty pawprints and a dropped gold key. '
            'On the nearby detective desk rests a classic detective fedora hat, an open pocket notebook with sketch diagrams, and an antique brass pocket watch. '
            'Palette: polished wood floor warm amber, brass magnifying glass gleaming gold, detective notebook ivory, and sunlight clear white. '
            'Mystery investigation, detective clues, problem-solving deduction, intriguing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2186,
        "title": "Reading: Puss in Boots",
        "intent": "Puss in Boots fairytale leather boots feathered hat sword castle",
        "brief": (
            'Book cover design titled "Puss in Boots". '
            'The title "Puss in Boots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HEROIC FAIRYTALE CAVALIER STYLE: A sun-drenched European fairytale castle courtyard on a glorious morning. '
            'Resting prominently on an ornate velvet-cushioned stone bench are a pair of handsome, polished leather cavalier musketeer boots '
            'with gold buckles and brass spurs, beside a grand wide-brimmed cavalier hat adorned with a sweeping peacock feather, and a slender fencing foil with golden hilt. '
            'Stone castle arches and blooming red climbing roses in the sunny background. '
            'Palette: leather boots rich cognac amber, velvet cushion royal crimson, feather peacock emerald and sapphire, and castle stone warm cream. '
            'Classic fairytale adventure, swashbuckling wit, storybook charm, noble and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 2191,
        "title": "Reading: Nasreddin Ten Stories",
        "intent": "Nasreddin Hodja folklore donkey saddlebags books olive tree village",
        "brief": (
            'Book cover design titled "Nasreddin: Ten Stories". '
            'The title "Nasreddin: Ten Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TRADITIONAL FOLKLORE VILLAGE SQUARE STYLE: A sun-soaked, ancient Mediterranean and Middle Eastern village square on a bright morning. '
            'Under a sprawling, shady old olive tree, a gentle, friendly grey donkey stands patiently, equipped with colorful woven kilim saddlebags overflowing with bound storybooks and rolled parchment scrolls. '
            'A clay water jug resting on cobblestones, and whitewashed village buildings with terracotta tiled roofs under a brilliant azure sky. '
            'Palette: donkey coat soft warm grey, woven saddlebags colorful terracotta, turquoise and ochre, and village sky Mediterranean azure. '
            'Traditional folklore, wit and wisdom stories, humorous cultural tales, warm and educational. '
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

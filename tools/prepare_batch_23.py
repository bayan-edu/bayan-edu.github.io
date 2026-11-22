import os

books = [
    {
        "id": 1828,
        "title": "Rathna and the Ring of Fire",
        "intent": "Ring of Fire volcanology Pacific plate tectonic volcanic arc",
        "brief": (
            'Book cover design titled "Rathna and the Ring of Fire". '
            'The title "The Ring of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PACIFIC RIM VOLCANOLOGY & ISLAND ARC DAYLIGHT STYLE: A sunlit, breathtaking landscape of an active volcanic island along the Pacific Ring of Fire in bright morning light. '
            'In the center, a majestic symmetrical stratovolcano summit with wisps of white geothermal steam drifting into a clear azure sky. '
            'In the foreground, lush tropical ferns, dark weathered basalt rock formations, and a geological map overlay showing the horseshoe-shaped Ring of Fire tectonic belt surrounding the Pacific Ocean. '
            'A sparkling turquoise ocean and coral reef in the background under radiant sunshine. '
            'Palette: volcanic basalt charcoal, steam pure white, tropical fern emerald green, ocean turquoise, and radiant sky cyan. '
            'Volcanology, Ring of Fire, plate tectonics, island arcs, natural geology, dramatic, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1829,
        "title": "All About Snouts and Tails",
        "intent": "All About Snouts and Tails comparative zoology animal appendages",
        "brief": (
            'Book cover design titled "All About Snouts and Tails". '
            'The title "Snouts and Tails" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMPARATIVE MAMMALIAN ZOOLOGY SUNNY CLEARING STYLE: A cheerful, sun-drenched meadow clearing celebrating the unique functional adaptations of animal snouts and tails. '
            'In harmonious arrangement: a South American tapir showing its flexible, tactile trunk-like snout; a clever beaver slapping its flat, scaly paddle tail on a river pond; '
            'and a playful spider monkey demonstrating its strong, grasping prehensile tail coiled around a leafy branch. '
            'Clean circular educational callouts illustrating sensory nerve endings in snouts and balancing mechanics in tails. '
            'Palette: tapir slate grey, beaver chestnut brown, river water aquamarine, and meadow sunbeam green. '
            'Comparative zoology, anatomical adaptations, snouts, tails, animal diversity, playful, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1830,
        "title": "Sorted!: Reduce, Reuse, Recycle",
        "intent": "Reduce Reuse Recycle waste management composting circular economy",
        "brief": (
            'Book cover design titled "Sorted!: Reduce, Reuse, Recycle". '
            'The title "Sorted!: Reduce, Reuse, Recycle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PRACTICAL RECYCLING & COMPOSTING SCIENCE DAYLIGHT STYLE: A sunlit, well-organized eco-friendly community workshop and garden on a sunny spring morning. '
            'In the center foreground, three labeled sorting bins: blue (paper), yellow (clean plastics/cans), and green (compostables). '
            'Beside them, an active wooden composting tumbler bin showing rich, dark organic compost and earthworms nourishing potted vegetable seedlings. '
            'A reusable canvas grocery tote, glass storage jars, and clean circular recycling infinity arrows in vibrant green vector graphics. '
            'Palette: recycling clover green, plastic bottle clear cyan, compost rich earth brown, and sunny sky blue. '
            'Waste reduction, practical recycling, composting biology, circular economy, cheerful, vibrant, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1832,
        "title": "Little Hands Make A Big Difference",
        "intent": "Community Conservation tree planting environmental action stewardship",
        "brief": (
            'Book cover design titled "Little Hands Make A Big Difference". '
            'The title "Little Actions, Big Difference" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'COMMUNITY CONSERVATION & TREE PLANTING DAYLIGHT STYLE: A cheerful, sun-drenched community park and garden on a bright sunny morning. '
            'In the center foreground, a small, healthy young oak tree seedling thriving in fertile composted soil with fresh water droplets. '
            'Beside it, bright green garden watering cans, wooden seed-identification markers, biodegradable fiber pots, and a garden trowel. '
            'In the background, blooming community flower beds, a colorful wooden birdhouse, and lush green trees under a brilliant sunny blue sky. '
            'Palette: seedling fresh lime green, compost rich loam brown, watering can cheerful yellow, and sunny sky blue. '
            'Environmental stewardship, tree planting, community conservation, young gardeners, bright, inspiring, and hopeful. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE (DO NOT DRAW HUMAN HANDS). '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1835,
        "title": "A New Find",
        "intent": "A New Find paleontology fossil discovery ammonite strata",
        "brief": (
            'Book cover design titled "A New Find". '
            'The title "A New Find" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PALEONTOLOGICAL FOSSIL DISCOVERY DAYLIGHT STYLE: A sun-drenched geological excavation ledge on a bright morning. '
            'In the center foreground, a freshly split sedimentary limestone rock nodule revealing a magnificent, perfectly preserved golden fossil ammonite shell with intricate spiral suture patterns. '
            'Beside it, a paleontologist\'s steel rock hammer, delicate fine-bristle fossil dusters, a brass measuring caliper, and a field notebook with stratigraphic sketches. '
            'In the background, sunlit canyon strata layers under clear azure skies. '
            'Palette: ammonite fossil amber gold, limestone rock cream and buff, hammer steel chrome, and sunny canyon sky blue. '
            'Paleontology, fossil excavation, Earth history, ammonite fossils, discovery excitement, bright and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1837,
        "title": "The Brave Penguin Blink and the Warming World",
        "intent": "Penguin Blink Warming World Antarctic ecology sea ice conservation",
        "brief": (
            'Book cover design titled "The Brave Penguin Blink and the Warming World". '
            'The title "The Brave Penguin & the Warming World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ANTARCTIC POLAR ICE & PENGUIN CONSERVATION STYLE: A breathtaking, sun-illuminated Antarctic ice shelf landscape under the polar 24-hour midnight sun in clear daylight. '
            'In the center foreground, a charming, healthy Adélie penguin standing alert on a glistening white snow ledge, looking out over crystal-clear turquoise waters. '
            'Gleaming blue-and-white icebergs reflecting brilliant sunlight in the bay, with krill swirling in the clear shallows below. '
            'An atmospheric weather station mast and clean polar climate data curves illustrated softly in the upper corner. '
            'Palette: penguin tuxedo black and white, Antarctic sea ice crystal cyan, ocean deep sapphire, and radiant polar sunlight. '
            'Antarctic ecology, penguin biology, sea ice conservation, polar climate science, inspiring, endearing, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1841,
        "title": "Who Wants a Spiny Snack?",
        "intent": "Who Wants a Spiny Snack defensive animal armor quills spines",
        "brief": (
            'Book cover design titled "Who Wants a Spiny Snack?". '
            'The title "Who Wants a Spiny Snack?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DEFENSIVE ANIMAL SPINES & QUILLS SUNNY MEADOW STYLE: A sunlit, charming woodland nature scene on a bright morning. '
            'In the center foreground, a cute European hedgehog curled into a protective spherical ball of sharp, banded cream-and-brown spines among oak leaves. '
            'Beside it in circular insets: the barbed quills of a North American porcupine, an Australian short-beaked echidna, and a purple sea urchin in sunlit shallow tidal rockpools. '
            'Magnified cross-section diagram showing modified keratin hair structures that form defensive spines. '
            'Palette: spine quills cream and chocolate brown, autumn oak leaf amber, meadow green, and sunny sky blue. '
            'Animal defenses, defensive spines, keratin adaptations, evolutionary armor, curious, playful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1842,
        "title": "Continents That Drift",
        "intent": "Continents That Drift continental drift Wegener Pangaea plate tectonics",
        "brief": (
            'Book cover design titled "Continents That Drift". '
            'The title "Continents That Drift" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'CONTINENTAL DRIFT & PANGAEA JIGSAW PUZZLE STYLE: A brilliant, scientifically grounded historical geology diagram in bright daylight. '
            'In the center, the ancient supercontinent of Pangaea fitting together like giant jigsaw puzzle pieces, highlighting how the Atlantic coastlines of South America and Africa lock perfectly together. '
            'Matching fossil bands (Mesosaurus and Glossopteris fern fossils) and identical ancient mountain belts color-coded across both continents. '
            'Compass rose, continental drift velocity arrows (cm per year), and globe in clean educational style. '
            'Palette: continental landmass warm terracotta and green, ocean deep azure blue, fossil correlation bands golden yellow, and map parchment. '
            'Continental drift, Alfred Wegener, Pangaea, plate tectonics, fossil evidence, clear, fascinating, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1843,
        "title": "Coral Reefs in Hawaii",
        "intent": "Coral Reefs in Hawaii reef triggerfish antler coral marine sanctuary",
        "brief": (
            'Book cover design titled "Coral Reefs in Hawaii". '
            'The title "Coral Reefs in Hawaii" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HAWAIIAN MARINE SANCTUARY & CORAL REEF STYLE: A sun-drenched, crystal-clear Hawaiian coral reef bay in brilliant midday sunlight. '
            'In the center foreground, Hawaii\'s famous state fish, the colorful Humuhumunukunukuāpuaʻa (reef triggerfish), showing bold geometric yellow, blue, and black patterns. '
            'Thriving colonies of branching antler coral (Pocillopora) and golden lobe coral (Porites) growing on submerged volcanic basalt. '
            'A green sea turtle (honu) swimming peacefully in the background with dancing sunbeams piercing the turquoise water. '
            'Palette: triggerfish yellow, blue, and white, ocean turquoise aquamarine, coral amber gold, and tropical sunbeams. '
            'Hawaiian marine biology, coral reef ecosystems, endemic reef fish, ocean conservation, brilliant, joyful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1845,
        "title": "Earth's Fiery Volcanoes",
        "intent": "Earths Fiery Volcanoes volcanology magma lava basalt obsidian",
        "brief": (
            'Book cover design titled "Earth\'s Fiery Volcanoes". '
            'The title "Earth\'s Fiery Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL VOLCANIC LANDSCAPES & IGNEOUS GEOLOGY DAYLIGHT STYLE: A sunlit, comprehensive volcanic panorama in bright clear daylight. '
            'In the center, a majestic composite volcanic cone venting billowing white geothermal steam and volcanic gas into a bright blue sky. '
            'A glowing orange-red river of basaltic lava cooling into glassy black obsidian and ropy pahoehoe stone along the lower slopes. '
            'Geological specimen display in the foreground: porous volcanic pumice, obsidian volcanic glass blade, and volcanic bombs on a field research slate. '
            'Palette: molten lava glowing orange-red, obsidian glassy black, pumice ash white, and clear sunny sky cyan. '
            'Volcanology, igneous rocks, volcanic eruption types, magma to lava, Earth science, dramatic, majestic, and educational. '
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

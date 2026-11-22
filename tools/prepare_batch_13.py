import os

books = [
    {
        "id": 1550,
        "title": "Meet the Microbes",
        "intent": "Meet the Microbes microbiology",
        "brief": (
            'Book cover design titled "Meet the Microbes". '
            'The title "Meet the Microbes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT MODERN MICROBIOLOGY LABORATORY DAYLIGHT STYLE: A sunlit, clean scientific biology lab on a bright morning. '
            'In the center foreground, an optical compound microscope with brass and chrome accents, illuminated from below. '
            'Beside it, glass petri dishes with vibrant, colorful agar cultures of glowing friendly beneficial microbes, lactobacillus, and spiral spirulina under crisp glass lids. '
            'A translucent 3D molecular double-helix model and laboratory test tubes with bright turquoise and emerald solutions sit in an acrylic rack in bright daylight. '
            'Palette: turquoise, emerald green, glowing chartreuse, clean optic white, and cobalt blue. '
            'Educational, inspiring, microscopic wonder, scientific discovery. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1551,
        "title": "Solar Absorbers and the Future of Electricity",
        "intent": "Solar Absorbers and the Future of Electricity renewable energy",
        "brief": (
            'Book cover design titled "Solar Absorbers and the Future of Electricity". '
            'The title "Solar Absorbers and the Future of Electricity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RADIANT SUNLIT RENEWABLE ENERGY LANDSCAPE STYLE: A breathtaking panorama of an advanced solar thermal and photovoltaic energy park under blazing midday blue skies. '
            'In the foreground, high-efficiency crystalline silicon solar absorber panels with micro-textured anti-reflective hexagonal patterns reflecting radiant golden sunlight. '
            'A glowing copper induction coil and clean electric circuit schematics softly overlaid in clean graphic vector style. '
            'In the background, sleek white wind turbine towers turning gracefully on rolling green hills under bright blue skies. '
            'Palette: electric solar gold, deep cobalt blue, emerald green, and radiant solar white. '
            'Clean energy, high technology, bright sustainability, forward-looking engineering. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1552,
        "title": "Alexander Graham Bell",
        "intent": "Alexander Graham Bell acoustic telephone invention",
        "brief": (
            'Book cover design titled "Alexander Graham Bell". '
            'The title "Alexander Graham Bell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'BRIGHT 19TH-CENTURY ACOUSTIC INVENTOR WORKSHOP STYLE: A warm, sunlit Victorian inventor workshop filled with radiant morning window light. '
            'In the center foreground, the historic original 1876 liquid transmitter telephone and electromagnetic brass transmitter cone on a polished mahogany workbench. '
            'Beside it, detailed technical patent blueprints with acoustic soundwave diagrams, spools of insulated copper wire, galvanic zinc batteries, and brass acoustic tuning forks. '
            'Natural golden sunbeams streaming across the desk, illuminating notes on acoustic telegraphy. '
            'Palette: polished mahogany wood, gleaming brass, parchment cream, blueprint cyan, and copper orange. '
            'Invention, acoustic physics, telecommunication history, educational curiosity. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1554,
        "title": "Braking Bad",
        "intent": "Braking Bad automotive brake physics friction",
        "brief": (
            'Book cover design titled "Braking Bad". '
            'The title "Braking Bad" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIGH-PERFORMANCE MECHANICAL ENGINEERING DAYLIGHT STYLE: A modern, brightly illuminated engineering testing laboratory. '
            'In the center foreground, a cross-drilled, ventilated carbon-ceramic disc brake assembly and a gleaming red hydraulic brake caliper in crisp mechanical detail. '
            'Subtle, elegant friction velocity arrows, kinetic energy conversion diagrams, and heat dissipation vector graphics illustrating deceleration physics. '
            'Gleaming chrome wrenches, pressure gauges, and dynamic speed line accents under bright daylight. '
            'Palette: racing red, metallic chrome silver, carbon grey, golden friction spark accent, and clean studio white. '
            'Automotive engineering, physics of friction, deceleration science, dynamic and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1555,
        "title": "It Would Be Hard to Smile at a Smilodon",
        "intent": "It Would Be Hard to Smile at a Smilodon saber-toothed cat paleontology",
        "brief": (
            'Book cover design titled "It Would Be Hard to Smile at a Smilodon". '
            'The title "It Would Be Hard to Smile at a Smilodon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'NATURAL HISTORY PALEONTOLOGY LAB & PLEISTOCENE LANDSCAPE STYLE: A bright, sunlit paleontology preparation lab with windows overlooking a grassy prehistoric plain. '
            'In the center foreground, a magnificent fossilized skull of a Smilodon (saber-toothed cat) showing the iconic, immense curved canine teeth resting on an examination stand. '
            'Paleontologist excavation tools: fine brushes, dental picks, measuring calipers, and fossil stratigraphic field notebooks in bright daylight. '
            'In the background, an artistic vista of rolling Pleistocene savanna under golden sunlit skies. '
            'Palette: fossil bone ivory, amber ochre, warm earth brown, lush savanna green, and sky cyan. '
            'Paleontology, prehistoric mammals, fossil discovery, bright educational fascination. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1556,
        "title": "Louis Braille",
        "intent": "Louis Braille tactile alphabet reading invention",
        "brief": (
            'Book cover design titled "Louis Braille". '
            'The title "Louis Braille" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TACTILE LITERACY & HISTORIC SCHOLAR DESK DAYLIGHT STYLE: A sunlit 19th-century educational study bathed in gentle morning sunlight. '
            'In the center foreground, heavy embossed cream paper showing prominent, raised six-dot Braille alphabet cells arranged in crisp geometric grids. '
            'A historic brass Braille slate frame with rectangular cell guides and an elegant wooden-handled metal stylus resting beside open leather-bound embossed volumes. '
            'A brass magnifying glass, a glass inkpot, and warm sunbeams grazing across the tactile embossed dots, creating soft, clear tactile shadows. '
            'Palette: warm cream parchment, polished walnut wood, brass gold, and soft morning sky blue. '
            'Literacy, tactile communication, perseverance, human ingenuity, peaceful and inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1557,
        "title": "Match Maker",
        "intent": "Match Maker chemistry of combustion matches",
        "brief": (
            'Book cover design titled "Match Maker". '
            'The title "Match Maker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT CHEMICAL COMBUSTION SCIENCE STYLE: A bright, modern chemistry exploration bench bathed in natural daylight. '
            'In the center foreground, colorful wooden safety matches with vibrant red, sulfur yellow, and cobalt blue tips fanned out neatly in a circle. '
            'A vintage illustrated cardboard matchbox with a striking red phosphorus striking strip. '
            'Beside them, molecular ball-and-stick models of phosphorus (P4) and sulfur molecules, and clean educational vector diagrams illustrating friction-induced ignition chemistry. '
            'Palette: bright flame orange, sulfur yellow, crimson red, pine wood cream, and cobalt blue. '
            'Chemistry of fire, safety inventions, industrial chemistry, bright, cheerful, educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1558,
        "title": "Reading Rock Strata",
        "intent": "Reading Rock Strata geology sedimentary layers",
        "brief": (
            'Book cover design titled "Reading Rock Strata". '
            'The title "Reading Rock Strata" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MAGNIFICENT GEOLOGICAL CANYON STRATIGRAPHY DAYLIGHT STYLE: A brilliant, sun-drenched canyon cliff showing colorful, distinct horizontal sedimentary rock layers (strata). '
            'Red sandstone, golden limestone, grey shale, and dark coal bands stacked in perfect chronological sequence under bright sunshine. '
            'In the foreground, a geologist\'s steel rock hammer, a brass compass clinometer, and a fossil ammonite shell exposed in a split limestone nodule. '
            'Subtle educational timeline bracket indicators showing geological eras along the rock strata. '
            'Palette: terracotta red, ochre yellow, desert sand, slate grey, and brilliant canyon sky blue. '
            'Geology, Earth history, sedimentary stratigraphy, field exploration, bright and majestic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1560,
        "title": "The Orchid's Secret",
        "intent": "The Orchid's Secret botanical pollination orchid",
        "brief": (
            'Book cover design titled "The Orchid\'s Secret". '
            'The title "The Orchid\'s Secret" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'EXQUISITE BOTANICAL GREENHOUSE DAYLIGHT STYLE: A lush, sunlit tropical conservatory greenhouse filled with radiant diffused daylight. '
            'In the center foreground, a stunning, exotic flowering orchid (Paphiopedilum slipper orchid and Phalaenopsis) with intricate speckled magenta petals, a golden lip, and delicate pollination pathways. '
            'Dewdrops sparkling like diamonds on broad, deep emerald orchid leaves. '
            'In the background, climbing jungle vines, hanging ferns, and glass greenhouse arches with soft light rays filtering through. '
            'Palette: magenta pink, tropical emerald green, orchid cream, gold nectar accents, and soft conservatory sky blue. '
            'Botany, plant adaptations, coevolution, exotic flowers, bright, vibrant, inspiring. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1561,
        "title": "The Origins of the Internet",
        "intent": "The Origins of the Internet ARPANET computer history",
        "brief": (
            'Book cover design titled "The Origins of the Internet". '
            'The title "The Origins of the Internet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RETRO COMPUTING & NETWORK ARCHITECTURE DAYLIGHT STYLE: A brightly lit, clean 1970s computer research lab with large windows in morning light. '
            'In the center foreground, an early ARPANET Interface Message Processor (IMP) cabinet with toggle switches, tape drives, and glowing green phosphor terminal screens displaying node network packets. '
            'On a clean desk: printed network routing topology maps connecting nodes across the nation, spools of perforated paper punch tape, and coaxial cable connectors. '
            'Palette: retro terminal green, electric cyan, warm computer beige, copper orange, and bright studio white. '
            'Computer history, packet switching, telecommunications, networking pioneers, educational technology. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1562,
        "title": "Tides",
        "intent": "Tides ocean gravitational lunar tides",
        "brief": (
            'Book cover design titled "Tides". '
            'The title "Tides" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'SPECTACULAR COASTAL TIDAL LANDSCAPE DAYLIGHT STYLE: A sunlit, breathtaking coastal bay showcasing the powerful rise and fall of the ocean tides. '
            'In the foreground, a rich tidal pool exposed at low tide, with colorful orange starfish, sea anemones, green kelp, and polished seashells glistening in the sun. '
            'In the midground, high-water wet marks on weathered sea cliffs and a historic coastal lighthouse on a rocky promontory. '
            'Overhead in the pale blue daytime sky, a clear crescent moon demonstrating lunar gravitational pull diagrams on Earth\'s tidal bulges. '
            'Palette: ocean aquamarine, deep sea navy, sandy beige, wet rock slate, and brilliant sunny cyan. '
            'Oceanography, lunar gravitation, tidal ecology, coastal geology, bright and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1563,
        "title": "Venus: In Depth",
        "intent": "Venus In Depth planetary astronomy venus",
        "brief": (
            'Book cover design titled "Venus: In Depth". '
            'The title "Venus: In Depth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RADIANT PLANETARY ASTRONOMY & RADAR MAPPING STYLE: A stunning, scientifically grounded view of planet Venus in space, bathed in radiant solar light from the Sun. '
            'The left hemisphere shows the thick, swirling golden-amber sulfuric acid cloud deck reflecting brilliant sunlight. '
            'The right hemisphere peels back into high-resolution radar topography showing immense volcanic shields (Maat Mons), rift valleys, and molten lava plains. '
            'An orbital scientific mapping satellite with solar panels extending in the foreground. '
            'Palette: golden amber, sulfuric yellow, volcanic copper orange, deep space black, and solar white. '
            'Solar system astronomy, planetary science, greenhouse atmospheres, space exploration. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1564,
        "title": "What Is Heat?",
        "intent": "What Is Heat thermodynamics thermal physics",
        "brief": (
            'Book cover design titled "What Is Heat?". '
            'The title "What Is Heat?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT THERMAL PHYSICS & KINETIC MOLECULAR STYLE: A clean, brightly illuminated physics laboratory bathed in natural daylight. '
            'In the center foreground, a precision glass laboratory thermometer and a digital thermal sensor with heat gradient scale. '
            'A split visualization showing molecules at low temperature (slow, blue, calm crystalline vibration) transitioning smoothly into high temperature (fast, vibrating, red and golden energetic kinetic collision particles). '
            'Conduction, convection, and radiation thermal wave graphics softly illustrated in clean educational infographic style. '
            'Palette: thermal gradient red, radiant flame orange, gold, cool ice cyan, and clean lab white. '
            'Thermodynamics, kinetic energy, heat transfer, molecular physics, clear and engaging. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1565,
        "title": "Wired World",
        "intent": "Wired World fiber optics undersea cables telecommunication",
        "brief": (
            'Book cover design titled "Wired World". '
            'The title "Wired World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'LUMINESCENT FIBER-OPTIC & GLOBAL CONNECTIVITY DAYLIGHT STYLE: A modern, high-tech telecommunications visualization in a sunlit tech laboratory. '
            'In the center foreground, a cross-section of a heavy-duty submarine transoceanic cable, with cutaway steel armor revealing hundreds of glowing glass optical fiber strands emitting brilliant pulses of laser light. '
            'A stylized 3D translucent globe showing oceanic cable routes connecting continents with glowing light pathways. '
            'Optical prism splitting white sunlight into rainbow spectral bands on an engineering workbench. '
            'Palette: luminous cyan, electric blue, optic glass white, copper gold, and ocean navy. '
            'Fiber optics, global communications, digital infrastructure, telecommunications engineering. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1566,
        "title": "Zebra Mussels and the Hudson River",
        "intent": "Zebra Mussels and the Hudson River invasive species ecology",
        "brief": (
            'Book cover design titled "Zebra Mussels and the Hudson River". '
            'The title "Zebra Mussels and the Hudson River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'RIVERINE FRESHWATER ECOLOGY DAYLIGHT STYLE: A sunlit, peaceful view along the historic Hudson River on a bright clear afternoon. '
            'In the foreground water\'s edge, river rocks encrusted with small, distinctively striped black-and-cream zebra mussels under clear, flowing river water. '
            'Freshwater aquatic plants, riverbed gravel, and a water clarity measurement Secchi disk in the current. '
            'In the background, the scenic Hudson River valley with lush green forested banks, a classic river lighthouse, and distant Catskill mountains under sunny blue skies. '
            'Palette: river aquamarine, striped shell cream and dark brown, river stone slate, forest green, and bright sunny sky. '
            'Freshwater ecology, invasive species, river ecosystems, environmental monitoring, bright and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1567,
        "title": "A Day at the Zoo",
        "intent": "A Day at the Zoo zoological park biodiversity",
        "brief": (
            'Book cover design titled "A Day at the Zoo". '
            'The title "A Day at the Zoo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'VIBRANT ZOOLOGICAL HABITAT SUNNY DAYLIGHT STYLE: A sun-drenched, world-class modern botanical and zoological park on a perfect summer morning. '
            'In the center foreground, a wooden scenic visitor boardwalk bridge overlooking a lush savannah savanna enclosure. '
            'Majestic giraffes peacefully grazing on acacia tree leaves, a colorful pair of scarlet macaws perched on a wooden signpost, and a turtle sunning on a pond rock. '
            'Colorful educational habitat interpretive map signs and leafy palm canopies under a radiant blue sky with fluffy white clouds. '
            'Palette: savannah golden amber, acacia green, macaw scarlet and cobalt, warm wooden teak, and brilliant sky blue. '
            'Wildlife conservation, zoology, biodiversity education, cheerful, joyful, bright educational aesthetic. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1568,
        "title": "Biomimicry",
        "intent": "Biomimicry nature inspired engineering technology",
        "brief": (
            'Book cover design titled "Biomimicry". '
            'The title "Biomimicry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'ELEGANT BIO-INSPIRED ENGINEERING DAYLIGHT STYLE: A bright, sunlit futuristic design studio and nature observation terrace. '
            'Side-by-side comparative visual wonders: a kingfisher bird\'s streamlined aerodynamic beak placed beside the aerodynamic nose of a Japanese Shinkansen bullet train; '
            'a lotus leaf repelling glistening spherical water droplets (superhydrophobic effect); and gecko toe pad micro-structures beside advanced nano-adhesives. '
            'Blueprint grid lines and natural organic curves merging harmoniously in radiant daylight. '
            'Palette: kingfisher turquoise, lotus leaf emerald green, technical blueprint cyan, clean architectural white, and bright daylight yellow. '
            'Biomimicry, sustainable design, nature-inspired engineering, scientific wonder. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1569,
        "title": "Crashing, Jumping, Falling",
        "intent": "Crashing Jumping Falling classical physics motion kinetics",
        "brief": (
            'Book cover design titled "Crashing, Jumping, Falling". '
            'The title "Crashing, Jumping, Falling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC CLASSICAL MECHANICS PHYSICS LAB DAYLIGHT STYLE: A brightly lit, spacious modern physics laboratory bathed in natural window light. '
            'In the center foreground, an elegant chrome Newton\'s cradle with suspended steel spheres in mid-motion swing, demonstrating conservation of momentum. '
            'Beside it, a stroboscopic parabolic trajectory showing a bouncing basketball and colorful bouncing polymer spheres showing kinetic and potential energy vectors. '
            'A miniature inclined ramp with low-friction carts and digital timing photogates on a polished blonde-wood workbench. '
            'Palette: chrome silver, dynamic kinetic orange, royal blue, wooden oak, and clean bright lab white. '
            'Physics of motion, gravity, momentum, kinetic energy, cheerful and clear educational design. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1570,
        "title": "Cutting Edge",
        "intent": "Cutting Edge precision materials science laser cutting",
        "brief": (
            'Book cover design titled "Cutting Edge". '
            'The title "Cutting Edge" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PRECISION MATERIAL SCIENCE & ADVANCED MANUFACTURING STYLE: A pristine, high-tech laser fabrication and materials engineering facility in clean daylight. '
            'In the center foreground, a high-precision computer-guided laser cutting nozzle emitting a focused golden cutting beam onto aerospace titanium sheet metal. '
            'Gleaming diamond-tipped micro-scalpels, obsidian blades, and waterjet cutting nozzles displayed on an engineering velvet tray. '
            'Crisp laser alignment grids and microscopic grain boundary crystallography diagrams softly visible in background. '
            'Palette: laser beam gold, titanium metallic silver, carbon slate, electric cyan, and clean studio white. '
            'Materials science, manufacturing technology, precision physics, industrial innovation. '
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

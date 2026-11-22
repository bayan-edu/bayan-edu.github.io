import os

books = [
    {
        "id": 1757,
        "title": "How Plates Affect Our Planet: Earthquakes",
        "intent": "Plates Earthquakes transform fault plate tectonics seismology",
        "brief": (
            'Book cover design titled "How Plates Affect Our Planet: Earthquakes". '
            'The title "Plates on the Move: Earthquakes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PLATE TECTONICS TRANSFORM FAULT DAYLIGHT STYLE: A sunlit, high-detail geological landscape of the San Andreas transform fault zone in bright morning daylight. '
            'In the center foreground, a clearly offset stream channel and displaced geological fence line showing horizontal strike-slip tectonic plate movement. '
            'A 3D subsurface block cutaway revealing the transform fault plane, earthquake hypocenter focus, and radiating circular seismic shockwave ripples. '
            'A digital seismograph station and GPS tectonic displacement monument monitoring plate motion under clear blue skies. '
            'Palette: desert arid ochre, fault bedrock granite grey, seismic wave crimson red, and bright sky cyan. '
            'Plate tectonics, transform faults, earthquake physics, geological displacement, dramatic, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1758,
        "title": "How Plates Affect Our Planet: Hot Spots",
        "intent": "Plates Hot Spots mantle plumes Hawaiian island chain seamounts",
        "brief": (
            'Book cover design titled "How Plates Affect Our Planet: Hot Spots". '
            'The title "Plates on the Move: Hot Spots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MANTLE PLUMES & VOLCANIC ISLAND CHAIN DAYLIGHT STYLE: A magnificent 3D oceanographic cutaway block diagram of a stationary mantle plume in bright tropical daylight. '
            'A deep thermal magma plume rising through the Earth\'s mantle, creating an active volcanic island over the hot spot. '
            'The moving oceanic tectonic plate carrying older, extinct volcanic islands away to the northwest, showing their transition from active shield volcanoes (Hawaii) to eroded atolls and sunken guyot seamounts. '
            'Clear ocean waters, volcanic steam, and plate velocity motion arrows. '
            'Palette: mantle plume glowing orange-red, Pacific ocean sapphire and turquoise, volcanic basalt, and tropical sky blue. '
            'Mantle plumes, hot spot volcanism, plate tectonics, island chain formation, geophysics, grand and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1759,
        "title": "Ig Nobel Winners",
        "intent": "Ig Nobel Winners humorous science discovery genuine research",
        "brief": (
            'Book cover design titled "Ig Nobel Winners". '
            'The title "Ig Nobel Winners" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'WHIMSICAL YET GENUINE SCIENTIFIC EXPERIMENTATION STYLE: A cheerful, brightly illuminated university physics and biology laboratory in sunny morning daylight. '
            'In the center foreground, the famous diamagnetic levitating live frog floating stably in a high magnetic field solenoid bore! '
            'Beside it, other delightful real-world scientific curiosity experiments: a pizza-box lid anti-soggy thermal physics model, and a clock that runs away and hides (Clocky). '
            'Chalkboard equations, laboratory beakers, award medals, and inquisitive smiling science atmosphere in clean aesthetic style. '
            'Palette: laboratory clean white, frog leaf green, solenoid copper orange, electric cyan, and medal gold. '
            'Curiosity-driven science, physics of levitation, Ig Nobel discoveries, creative thinking, joyful and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1760,
        "title": "The Invention of the Toothbrush",
        "intent": "Invention of the Toothbrush dental hygiene history miswak",
        "brief": (
            'Book cover design titled "The Invention of the Toothbrush". '
            'The title "The Invention of the Toothbrush" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HISTORICAL HYGIENE INVENTIONS & APOTHECARY DAYLIGHT STYLE: A bright, sunlit historical study and apothecary table in natural morning daylight. '
            'In chronological sequence: an ancient Babylonian and Egyptian natural frayed twig chew-stick (miswak), an 18th-century carved cattle bone handle with natural boar bristles, '
            'and a sleek modern ergonomic nylon-bristle toothbrush with hygienic wave contours. '
            'A vintage porcelain tooth powder jar, fresh peppermint leaves, sea salt crystals, and patent diagrams on parchment in clean daylight. '
            'Palette: porcelain white, mint leaf emerald green, polished bone ivory, amber twig brown, and sky morning cyan. '
            'History of inventions, dental hygiene, material science from bone to nylon, public health, clean, bright, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1761,
        "title": "Why Do Pigeons Bob Their Heads When They Walk?",
        "intent": "Pigeons Bob Heads avian optokinetics retinal stabilization vision",
        "brief": (
            'Book cover design titled "Why Do Pigeons Bob Their Heads When They Walk?". '
            'The title "Why Do Pigeons Bob Their Heads?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AVIAN OPTOKINETICS & SENSORY BIOLOGY SUNNY DAYLIGHT STYLE: A charming, sun-drenched European city plaza with cobblestones in bright morning sunshine. '
            'In the center foreground, a handsome rock pigeon with iridescent purple and emerald green neck feathers captured in motion along cobblestones. '
            'Clever stroboscopic vector ghost outlines illustrating the two distinct phases of pigeon locomotion: '
            'the "thrust" phase where the head pushes forward, and the "hold" phase where the head stays completely stationary in space to stabilize the retinal image and calculate motion parallax! '
            'Optokinetic eye tracking diagrams and vision focus arrows in clear educational vector graphics. '
            'Palette: pigeon slate grey, neck feather iridescent emerald and amethyst, cobblestone amber, and sunny plaza gold. '
            'Avian sensory biology, optokinetic reflex, visual stabilization, animal locomotion, charming and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1763,
        "title": "Under the Microscope",
        "intent": "Under the Microscope cellular biology histology optics slides",
        "brief": (
            'Book cover design titled "Under the Microscope". '
            'The title "Under the Microscope" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HIGH-POWER MICROSCOPY & CELLULAR WONDER DAYLIGHT STYLE: A sunlit, clean biology laboratory workbench bathed in bright morning daylight. '
            'In the center foreground, an advanced optical compound research microscope with revolving turret objectives and an illuminated condenser stage. '
            'A large circular circular eyepiece field-of-view callout revealing the intricate beauty of microscopic cells: stained plant onion epidermal cells with distinct brick-like cell walls and nuclei, and spiraling green chloroplasts in Elodea leaves. '
            'Glass specimen slides, a box of precision cover slips, and pipettes with colored biological stains. '
            'Palette: optical glass cyan, stained cell magenta and emerald, microscope chrome silver and enamel white, and sunny timber desk. '
            'Microscopy, cell biology, histology, plant cells, scientific investigation, inspiring and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1774,
        "title": "Life in the Ocean",
        "intent": "Life in the Ocean marine biodiversity pelagic coral kelp",
        "brief": (
            'Book cover design titled "Life in the Ocean". '
            'The title "Life in the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'OCEANIC BIODIVERSITY & MARINE ECOSYSTEMS DAYLIGHT STYLE: A breathtaking, crystal-clear panoramic view of ocean life in radiant midday tropical sunshine. '
            'In the sun-dappled surface waters, a pod of playful bottlenose dolphins swimming gracefully alongside a green sea turtle. '
            'Below, schools of shimmering silvery mackerel swirling around a towering golden kelp forest, while colorful parrotfish explore branching purple corals on a sunny reef. '
            'Dancing sunbeams piercing deep into the sparkling azure water column. '
            'Palette: ocean sapphire and turquoise, dolphin sleek grey, kelp amber gold, coral violet, and sunbeam radiant white. '
            'Marine biology, ocean ecosystems, pelagic biodiversity, sea life conservation, vibrant, joyful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1775,
        "title": "Saving Black-footed Ferrets",
        "intent": "Saving Black-footed Ferrets prairie wildlife conservation endangered",
        "brief": (
            'Book cover design titled "Saving Black-footed Ferrets". '
            'The title "Saving Black-footed Ferrets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'AMERICAN PRAIRIE ENDANGERED SPECIES CONSERVATION STYLE: A sun-drenched, golden shortgrass prairie landscape on a crisp morning under azure skies. '
            'In the center foreground, an adorable, alert black-footed ferret with distinct dark mask around its eyes and black feet peeking curiously out of an earthen prairie dog burrow. '
            'Wild prairie coneflowers, sagebrush, and a wooden wildlife conservation monitoring stake with a radio-telemetry antenna in the background. '
            'Rolling grassland plains stretching to the horizon under sweeping sunny skies. '
            'Palette: ferret mask black and cream, prairie grass golden buff, sagebrush silver-green, and prairie sky blue. '
            'Wildlife conservation, endangered species recovery, prairie ecology, mustelid biology, endearing and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1776,
        "title": "Saving Killer Whales",
        "intent": "Saving Killer Whales orca cetacean marine conservation pod",
        "brief": (
            'Book cover design titled "Saving Killer Whales". '
            'The title "Saving Killer Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PACIFIC NORTHWEST ORCA SANCTUARY DAYLIGHT STYLE: A sunlit, breathtaking coastal fjord in the Salish Sea in radiant morning light. '
            'In the center foreground, a magnificent Southern Resident killer whale (orca) breaching powerfully out of crystal-clear ocean water, glistening water droplets spraying in the sunlight. '
            'A second orca surfacing nearby, showing its distinctive tall dorsal fin and crisp white eye patch. '
            'In the background, evergreen cedar and Douglas fir forested islands, with distant snow-capped mountain peaks under bright blue skies. '
            'Palette: orca sleek black and crisp white, ocean deep cobalt and turquoise spray, forest deep green, and sunny sky blue. '
            'Cetacean biology, orca conservation, marine ecology, Pacific Northwest wildlife, majestic, powerful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1777,
        "title": "Traveling Turtles: A Trip Across the Atlantic",
        "intent": "Traveling Turtles ocean navigation loggerhead sea turtle Gulf Stream",
        "brief": (
            'Book cover design titled "Traveling Turtles: A Trip Across the Atlantic". '
            'The title "Traveling Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'TRANSATLANTIC SEA TURTLE MIGRATION DAYLIGHT STYLE: A sunlit, expansive Atlantic Ocean panorama in crystal-clear tropical waters. '
            'In the center foreground, a magnificent young loggerhead sea turtle swimming purposefully with strong flipper strokes through golden floating rafts of sargassum seaweed. '
            'Sunbeams dancing through the warm azure Gulf Stream current, illuminating small crabs and juvenile fish sheltering in the seaweed. '
            'A stylized navigational graphic showing the North Atlantic Gyre circular ocean current map and Earth\'s geomagnetic navigation lines. '
            'Palette: turtle carapace warm amber brown, sargassum gold, ocean deep azure and turquoise, and sunbeam radiant white. '
            'Sea turtle migration, oceanic currents, geomagnetic navigation, marine biology, wondrous and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1778,
        "title": "Blue Bloods of the Sea",
        "intent": "Blue Bloods of the Sea horseshoe crab hemocyanin endotoxin medical",
        "brief": (
            'Book cover design titled "Blue Bloods of the Sea". '
            'The title "Blue Bloods of the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'HORSESHOE CRAB BIOLOGY & MEDICAL SCIENCE DAYLIGHT STYLE: A sun-drenched sandy beach and modern biomedical research setting in bright morning daylight. '
            'In the center foreground, an ancient Atlantic horseshoe crab resting gracefully on wet golden sand as gentle ocean waves lap nearby. '
            'Beside it in clear educational graphics, a sterile medical vial containing distinctive baby-blue hemolymph (copper-based hemocyanin blood) used for Limulus Amebocyte Lysate (LAL) bacterial endotoxin testing. '
            'A laboratory pipette, sea shells, and shorebird sandpipers in the sunny background. '
            'Palette: horseshoe crab olive-brown shell, hemolymph striking sky blue, beach sand gold, and ocean aquamarine. '
            'Living fossils, horseshoe crab biology, hemocyanin, biomedical applications, pharmaceutical safety, unique and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1779,
        "title": "Bones On the Go!",
        "intent": "Bones On the Go animal locomotion skeletal biomechanics levers",
        "brief": (
            'Book cover design titled "Bones On the Go!". '
            'The title "Bones on the Go!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'DYNAMIC SKELETAL BIOMECHANICS & ANIMAL MOTION DAYLIGHT STYLE: A brightly lit, spacious modern biomechanics physics laboratory in natural daylight. '
            'In the center foreground, dynamic skeletal running armatures in mid-motion: a cheetah skeleton captured in full-stride spine-flexing sprint, '
            'alongside a kangaroo skeletal leg showing spring-like elastic tendon biomechanics and lever mechanics. '
            'Subtle, elegant vector force arrows showing fulcrums, lever ratios (Class 1, 2, and 3 levers in bones and joints), and velocity vectors in radiant daylight. '
            'Palette: skeletal ivory bone white, kinetic trajectory orange, biomechanical cyan, and polished studio blond oak. '
            'Biomechanics, skeletal systems, animal locomotion, physics of movement, dynamic, clear, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1780,
        "title": "Caretaking Our World's Water",
        "intent": "Caretaking Our Worlds Water watershed protection river conservation",
        "brief": (
            'Book cover design titled "Caretaking Our World\'s Water". '
            'The title "Caretaking Our World\'s Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'PRISTINE WATERSHED CONSERVATION & RIVER DAYLIGHT STYLE: A sun-drenched, magnificent mountain watershed and river valley in sparkling midday light. '
            'Pure snowmelt rushing from alpine peaks into a crystal-clear rocky river, meandering through forested riverbanks and fertile agricultural meadows. '
            'In the foreground, an automated solar-powered environmental water quality monitoring station with digital telemetry sensors measuring dissolved oxygen and purity. '
            'A kingfisher perched on a riverside branch watching fish swim in the pristine clear water under sunny blue skies. '
            'Palette: river crystal aquamarine, forest spruce green, mountain snow white, sensor solar blue, and sunny gold. '
            'Watershed protection, water resource management, freshwater ecology, river conservation, bright, hopeful, and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1781,
        "title": "Deep-Sea Detectives",
        "intent": "Deep Sea Detectives marine archaeology sonar exploration ROV",
        "brief": (
            'Book cover design titled "Deep-Sea Detectives". '
            'The title "Deep-Sea Detectives" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'MARINE ARCHAEOLOGY & UNDERWATER EXPLORATION STYLE: A high-tech marine archaeological exploration scene on the sea floor. '
            'An advanced yellow unmanned robotic submersible (ROV) with high-intensity LED searchlights illuminating the resting place of an ancient classical trading shipwreck. '
            'Ancient terracotta amphorae jars, encrusted with sea fans and sponges, resting neatly on the rippled white sand seabed. '
            'A 3D multibeam sonar bathymetric seafloor mapping grid floating above the wreck site in glowing cyan lines. '
            'Palette: ROV safety yellow, searchlight brilliant beam white, deep ocean navy, amphora terracotta orange, and sonar electric cyan. '
            'Marine archaeology, underwater robotics, sonar mapping, maritime history, ocean science, thrilling and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1782,
        "title": "Different Types of Galaxies",
        "intent": "Different Types of Galaxies Hubble tuning fork spiral elliptical",
        "brief": (
            'Book cover design titled "Different Types of Galaxies". '
            'The title "Different Types of Galaxies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GALACTIC MORPHOLOGY & HUBBLE CLASSIFICATION STYLE: A breathtaking cosmic panorama showcasing the diverse structural types of galaxies in deep space. '
            'In the center, a spectacular grand-design Spiral galaxy with swirling arms of glowing blue stars and pink nebulae (like Andromeda); '
            'beside it, a barred spiral galaxy with a radiant central stellar bar, a smooth glowing golden Elliptical galaxy (E0-E7), and an exotic, chaotic Irregular galaxy with starburst clusters. '
            'Delicate celestial tuning fork classification axes connecting the galaxy types in clean educational graphic style. '
            'Palette: spiral star cluster electric blue, nebula magenta pink, elliptical core golden amber, and deep cosmic black. '
            'Extragalactic astronomy, galaxy classification, Hubble sequence, cosmology, galactic evolution, magnificent and educational. '
            'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
            'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
            'Aspect ratio 2:3 vertical book jacket.'
        )
    },
    {
        "id": 1783,
        "title": "Endangered Animals at a Glance",
        "intent": "Endangered Animals at a Glance global wildlife biodiversity protection",
        "brief": (
            'Book cover design titled "Endangered Animals at a Glance". '
            'The title "Endangered Animals at a Glance" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
            'GLOBAL WILDLIFE BIODIVERSITY & CONSERVATION DAYLIGHT STYLE: A sun-drenched, harmonious natural collage of iconic endangered wildlife in radiant morning daylight. '
            'In the center foreground, a beloved giant panda happily munching fresh green bamboo leaves, a snow leopard resting gracefully on a sunlit Himalayan rocky outcrop, '
            'and a magnificent sea turtle gliding through clear turquoise waters below. '
            'A globe showing protected wildlife national parks and biosphere reserves highlighted in green under a bright sunny sky. '
            'Palette: panda black and clean white, bamboo fresh emerald green, ocean turquoise, mountain slate, and sunny gold. '
            'Wildlife conservation, endangered species, biodiversity hotspots, habitat protection, heartwarming and educational. '
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

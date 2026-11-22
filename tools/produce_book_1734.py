import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Volcano That Keeps Erupting". The title "The Volcano That Keeps Erupting" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HAWAIIAN SHIELD VOLCANO & BASALTIC LAVA DAYLIGHT STYLE: A sunlit, breathtaking scene of Kilauea volcano on Hawaii in bright daylight. In the foreground, glowing orange-red ropes of pahoehoe basaltic lava cooling into smooth, iridescent volcanic rock. In the midground, the lava entry point into the Pacific ocean, generating billowing plumes of white steam (laze) against turquoise ocean waves. Lush green Hawaiian ohia lehua trees with red blossoms growing on older weathered volcanic rock under sunny skies. Palette: molten lava glowing orange-red, basalt black and charcoal, steam cloud pure white, ocean turquoise, and lehua red. Volcanology, shield volcanoes, Hawaiian geology, continuous eruptions, striking, majestic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1734, brief, 'Volcano That Keeps Erupting Kilauea shield volcano Hawaii basalt')
    print("SUCCESS:", res)

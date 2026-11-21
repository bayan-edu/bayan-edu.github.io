import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Vanishing Frogs". '
    'The title "Vanishing Frogs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT RAINFOREST AMPHIBIAN CONSERVATION DAYLIGHT STYLE: A sun-drenched, radiant tropical cloud forest stream sanctuary on a glorious sunny morning under bright daylight. '
    'In the center foreground, an exquisite jewel-toned harlequin frog with glossy electric-yellow and black patterns resting naturally on a broad dew-kissed green monstera leaf overhanging a crystal-clear forest brook. '
    'On a sunlit mossy river boulder nearby, an ecological water temperature sensor and a clean glass botanical vial catch sparkling morning sunbeams. '
    'In the background, a pristine trickling waterfall cascades through lush green ferns and blooming wild orchids under warm sunlight. '
    'Palette: harlequin vibrant yellow, leaf emerald green, stream crystalline turquoise, and golden sunlight. '
    'Amphibian ecology, conservation, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(933, brief, "Vanishing Frogs")
    print("SUCCESS:", res)

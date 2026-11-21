import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Objects in Space". '
    'The title "Objects in Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CELESTIAL ASTRONOMY STYLE: A sun-illuminated, majestic cosmic view showcasing diverse celestial bodies of our solar system. '
    'In the center foreground, a glowing icy comet with a magnificent streaming tail of shimmering cyan gas and dust reflects bright sunlight. '
    'Beside it, a cratered rocky asteroid with metallic mineral glints floats gracefully in space. '
    'In the vibrant background, terrestrial planets and a glowing ringed gas giant orbit under warm golden sunbeams. '
    'Palette: comet electric cyan, asteroid mineral slate, planetary gold, and deep cosmic sapphire blue. '
    'Space astronomy, bright, educational, vivid. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(911, brief, "Objects in Space")
    print("SUCCESS:", res)

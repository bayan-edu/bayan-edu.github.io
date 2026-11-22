import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Speckled Band and Other Stories". The title "The Speckled Band and Other Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VICTORIAN MANOR MYSTERY DAYLIGHT STYLE: A sunlit, intriguing Victorian manor bedchamber in bright morning natural daylight. In the center foreground, a polished mahogany nightstand holding a white porcelain saucer of milk, a brass detective\'s magnifying glass, and an antique heavy brass safe box. On the wall above, an ornate brass air-ventilator grate and a dummy embroidered bell-rope hanging down beside sun-drenched floral wallpaper. Palette: mahogany reddish brown, brass polished gold, porcelain white, and wallpaper soft sage green. Sherlock Holmes, locked-room mystery, Victorian detective fiction, Arthur Conan Doyle, bright, suspenseful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1421, brief, 'Reading The Speckled Band and Other Stories')
    print("SUCCESS:", res)

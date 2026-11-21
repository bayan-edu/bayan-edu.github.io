import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How They Cloned A Sheep". '
    'The title "How They Cloned A Sheep" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GENETICS BIOLOGY & BIOTECHNOLOGY DAYLIGHT STYLE: A sun-drenched, modern genetics laboratory with large windows overlooking rolling green pastures on a crisp sunny morning. '
    'In the center foreground, a high-power optical research microscope, precision glass micropipettes, and a clear holographic double-helix DNA model glowing softly. '
    'Beside the microscope on a clean white laboratory counter, an open notebook with scientific chromosome sketches and sterile petri dishes. '
    'Through the panoramic window in the background, fluffy white sheep graze peacefully on sunlit green hills under a bright azure sky. '
    'Palette: laboratory clean white, double-helix cyan, pasture emerald green, and golden morning sunlight. '
    'Biotechnology, genetics, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(907, brief, "How They Cloned A Sheep")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How We See". '
    'The title "How We See" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORICAL OPTICS & PHYSICS DAYLIGHT STYLE: A sunlit scholarly study of optics from the Islamic Golden Age in historic Cairo. '
    'In the center foreground, a polished brass astrolabe, optical biconvex glass magnifying lenses, and a classic brass oil lamp resting on a cedar wood study desk covered with geometric optical diagrams. '
    'A radiant, luminous pencil beam of bright sunlight enters through a small pinhole aperture in a carved mashrabiya window shutter, shining clearly across the room onto a clean white screen. '
    'Palette: glowing brass gold, warm cedar wood, luminous ray white, parchment ivory, and lapis blue. '
    'Scientific history, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(686, brief, "How We See")
    print("SUCCESS:", res)

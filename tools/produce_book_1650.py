import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Learning about Space". The title "Learning about Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASTRONOMY STUDY & SPACE EXPLORATION DAYLIGHT STYLE: A sunlit, inspiring astronomical observatory library on a bright clear morning. On a warm wooden study desk: a polished brass armillary sphere, an antique refractor telescope on a tripod pointed toward sunny windows, and colorful celestial star charts showing constellations. Precision models of the planets of the solar system, a cutaway rocket model, and an open astronomy field logbook with orbital sketches. Palette: celestial navy blue, polished brass gold, star chart parchment cream, and bright morning sunbeams. Space education, amateur astronomy, solar system discovery, inspiring and scholarly. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1650, brief, 'Learning about Space astronomy exploration observatory')
    print("SUCCESS:", res)

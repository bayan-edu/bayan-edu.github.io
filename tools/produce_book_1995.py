import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pupun and Friends: The solar eclipse". The title "Pupun and Friends: The solar eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASTRONOMY SOLAR ECLIPSE CELESTIAL STYLE: An inviting and wonder-filled daytime astronomical observation setup. On an outdoor wooden observation table on a green hilltop, certified solar eclipse viewing glasses and a solar filter telescope rest beside an open celestial star chart. In the sky above, the breathtaking moment of a total solar eclipse: the dark silhouette of the Moon encircled by the radiant, pearlescent white solar corona and a dazzling diamond ring sparkle against a twilight sky with visible bright stars. Palette: solar corona radiant silvery white, diamond ring brilliant gold, eclipse sky deep cobalt violet, and hilltop warm green. Solar astronomy, eclipse science, safe celestial viewing, magical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1995, brief, 'Pupun Friends solar eclipse astronomy celestial observation corona')
    print("SUCCESS:", res)

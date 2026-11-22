import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Last of the Mohicans". The title "The Last of the Mohicans" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ADIRONDACK WILDERNESS DAYLIGHT STYLE: A sun-drenched, majestic Adirondack mountain forest in 1757 in brilliant natural daylight. In the center foreground, a traditional long Kentucky flintlock rifle with polished brass hardware resting against a mossy granite boulder, beside a beaded buckskin powder horn and an authentic birchbark canoe moored in sparkling mountain river waters. In the background, towering virgin white pine forests and sunlit granite mountain peaks rise into a clear azure sky. Palette: pine forest deep evergreen, birchbark white, buckskin warm ochre, and mountain river clear aqua. Historical fiction, American frontier, James Fenimore Cooper, wilderness adventure, dignified, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1422, brief, 'Reading The Last of the Mohicans')
    print("SUCCESS:", res)

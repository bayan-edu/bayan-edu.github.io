import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Big Idea...About Earth". The title "What\'s the Big Idea...About Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DYNAMIC EARTH SYSTEMS & FORCES DAYLIGHT STYLE: A sunlit, breathtaking composite geological landscape in radiant bright daylight. In the center foreground, dynamic geological forces shaping our planet: a snow-capped alpine mountain peak, a roaring crystalline waterfall carving through a deep rock canyon, and an active shield volcano venting gentle steam over fertile green valleys. In the sky above, the radiant blue marble of Earth shines against bright blue skies with golden sunbeams illuminating the diverse planet. Palette: alpine snow white, ocean and river sapphire, canyon terracotta, and valley lush emerald green. Earth systems, geology, plate tectonics, planetary science, dynamic, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1502, brief, 'Whats the Big Idea About Earth')
    print("SUCCESS:", res)

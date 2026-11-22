import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Copernicus: Forming a Radical New Theory". The title "Copernicus: Forming a Radical New Theory" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RENAISSANCE HELIOCENTRIC ASTRONOMY DAYLIGHT STYLE: A sunlit Renaissance astronomer\'s observatory study in Frombork in bright morning natural daylight. In the center foreground, on a heavy oak scholar\'s desk: an ornate brass armillary sphere with concentric planetary rings, an antique brass astrolabe, and a quill pen beside an open Latin manuscript showing the Sun fixed proudly at the center of circular planetary orbits. Through arched stone windows, the morning Sun shines brightly in a clear blue sky. Palette: armillary sphere polished brass gold, manuscript aged vellum, desk dark oak, and daylight bright ivory. History of astronomy, Nicolaus Copernicus, heliocentric solar system, scientific revolution, classic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1499, brief, 'Copernicus Forming a Radical New Theory')
    print("SUCCESS:", res)

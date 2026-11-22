import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Tallest Skyscraper in Taiwan". The title "The Tallest Skyscraper in Taiwan" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TAIPEI 101 ARCHITECTURAL ENGINEERING DAYLIGHT STYLE: A sunlit, breathtaking architectural portrait of Taipei 101 in Taipei under a clear blue sky in bright daylight. In the center foreground, the iconic skyscraper rising 1,667 feet into the sky, its 8-tiered pagoda-inspired green-tinted glass curtain walls and traditional bamboo-segment architecture gleaming in the sun. An inset circular cutaway reveals the famous massive golden tuned mass damper pendulum suspended inside the tower to resist earthquakes and typhoons. Palette: skyscraper crystalline jade-green glass and steel, tuned mass damper pure gold, and sky clear sunny cyan. Architectural engineering, megastructures, earthquake damping, Taipei 101, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1330, brief, 'The Tallest Skyscraper in Taiwan')
    print("SUCCESS:", res)

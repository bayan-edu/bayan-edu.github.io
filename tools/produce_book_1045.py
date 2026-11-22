import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bahrain\'s Sustainable Architectural Wonder". '
    'The title "Bahrain\'s Sustainable Architectural Wonder" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MODERN SUSTAINABLE ARCHITECTURE DAYLIGHT STYLE: A sunlit, breathtaking architectural portrait of the Bahrain World Trade Center on a glorious sunny day in bright daylight. '
    'In the center foreground, the iconic twin sail-shaped glass aerodynamic skyscraper towers rising proudly toward a clear azure sky, joined by three skybridges supporting massive white three-bladed wind turbines spinning gracefully in the sea breeze. '
    'Glass curtain walls reflect the sparkling turquoise waters of the Arabian Gulf and radiant morning sunbeams. '
    'In the foreground, a modern waterfront palm promenade and calm shimmering sea. '
    'Palette: skyscraper crystalline glass cyan and steel silver, wind turbine pure white, gulf turquoise, and sunny daylight gold. '
    'Sustainable architecture, green skyscrapers, wind engineering, Bahrain, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1045, brief, "Bahrain's Sustainable Architectural Wonder")
    print("SUCCESS:", res)

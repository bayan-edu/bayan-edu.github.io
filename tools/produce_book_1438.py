import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Time-Travelling River". The title "The Time-Travelling River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RIVER GEOLOGY & HISTORY DAYLIGHT STYLE: A sunlit, breathtaking river valley winding through time in bright daylight. In the center foreground, a crystal-clear, sparkling river flowing past ancient geological rock strata and smooth river pebbles. A wooden rowboat floats peacefully beside water lilies, with subtle chronological historical milestones along the riverbanks (ancient stones, medieval watermill, modern clean bridge) under a glorious sunlit blue sky. Palette: river clear aqua, pebbles slate and granite, riverbank lush emerald, and sky sunny cyan. River hydrology, historical geology, landscape evolution, nature journeys, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1438, brief, 'The Time-Travelling River')
    print("SUCCESS:", res)

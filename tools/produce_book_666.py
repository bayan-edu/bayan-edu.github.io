import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "One Hour a Day". '
    'The title "One Hour a Day" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT OUTDOOR HEALTH & FITNESS DAYLIGHT STYLE: A sun-drenched, radiant hilltop park on a brilliant sunny afternoon under a clear azure blue sky. '
    'A winding paved running trail curves gently up a lush green grassy hill bordered by blooming wildflower patches. '
    'In the foreground resting on the sunlit lawn, a pair of clean athletic running sneakers in vibrant royal-blue and lime-green trim, a sleek stainless steel sports water bottle with sparkling condensation droplets, and a digital fitness stopwatch displaying "60:00". '
    'The scene radiates energy, health, fresh air, and invigorating bright daytime motivation. '
    'Palette: vibrant emerald green, clear sky blue, energetic lime, stainless steel, and warm golden sunlight. '
    'Inspiring, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(666, brief, "One Hour a Day")
    print("SUCCESS:", res)

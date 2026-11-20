import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Two Times a Day". '
    'The title "Two Times a Day" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DENTAL HEALTH SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant bathroom vanity counter made of clean white marble on a crisp morning. '
    'In the center foreground, a modern eco-friendly mint-green toothbrush resting neatly on a ceramic holder beside a charming clear glass two-minute sand hourglass timer with bright turquoise sand actively flowing down. '
    'Next to the timer on the sunny counter sits a tall, sparkling clean glass of refreshing pure drinking water and a fresh, crisp green apple. '
    'Natural morning sunlight pours through a clean window, casting bright golden reflections across the gleaming marble. '
    'Palette: mint green, crisp ceramic white, bright turquoise, fresh apple green, and sunny gold. '
    'Educational, refreshing, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(663, brief, "Two Times a Day")
    print("SUCCESS:", res)

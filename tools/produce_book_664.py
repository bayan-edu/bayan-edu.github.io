import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Nine Hours of Sleep". '
    'The title "Nine Hours of Sleep" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MORNING STUDY & REST DAYLIGHT STYLE: A sun-drenched, radiant and tidy student study desk on a fresh, peaceful sunny morning with golden rays streaming through a sheer curtain. '
    'In the center foreground, a charming classic twin-bell analog alarm clock in clean white and polished brass showing 7:00 AM. '
    'Beside the clock on the light-oak wooden desk rests a closed math notebook, neatly sharpened colored pencils in a white ceramic mug, and a glass of fresh orange juice catching the vibrant morning sun. '
    'The room feels wonderfully fresh, clear, peaceful, and fully refreshed after a restful night of sleep. '
    'Palette: morning golden sunlight, soft sky blue, warm light wood, crisp white, and vibrant citrus orange. '
    'Wholesome, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(664, brief, "Nine Hours of Sleep")
    print("SUCCESS:", res)

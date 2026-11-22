import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Can You Tell the Temperature By Listening to the Chirping of a Cricket?". The title "Cricket Chirps & Temperature" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHARMING BIOPHYSICS & DOLBEAR\'S LAW SUNNY DAYLIGHT STYLE: A sun-drenched, cheerful summer garden scene bathed in warm afternoon sunlight. In the center foreground, a detailed, friendly black field cricket resting gracefully on a broad green hosta leaf, rubbing its forewings (stridulation) to chirp. Beside it, a classic glass outdoor garden thermometer displaying degrees Celsius and Fahrenheit. Neat, elegant educational chalkboard notes illustrating Dolbear\'s Law formula: Counting cricket chirps in 15 seconds plus 37 equals temperature in Fahrenheit! Palette: cricket polished black, leaf emerald green, thermometer glass red and white, and summer garden sunbeam gold. Biophysics, Dolbear\'s law, cricket stridulation, insect thermoregulation, charming, curious, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1711, brief, 'Temperature By Listening to Cricket Dolbears law biophysics thermoregulation')
    print("SUCCESS:", res)

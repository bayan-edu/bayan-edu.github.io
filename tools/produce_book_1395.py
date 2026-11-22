import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Adventures of Tom Sawyer". The title "The Adventures of Tom Sawyer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MISSISSIPPI SUMMER BOYHOOD DAYLIGHT STYLE: A sun-drenched summer afternoon in a quaint 19th-century Missouri village along the Mississippi River in bright daylight. In the center foreground, a rustic wooden picket fence being painted with fresh, gleaming white whitewash. Resting on the green grass beside the fence: a wooden bucket of whitewash with a wide paintbrush, a crisp red apple, a simple bamboo fishing pole with a red-and-white bobber, and a straw sun hat. In the background, the sparkling Mississippi River rolls past willow trees under a clear summer sky. Palette: whitewash bright white, grass summer green, apple crimson red, and river sparkling blue. Classic American literature, Tom Sawyer, Mark Twain, summer boyhood adventure, cheerful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1395, brief, 'Reading The Adventures of Tom Sawyer')
    print("SUCCESS:", res)

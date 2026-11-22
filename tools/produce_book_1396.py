import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Classic Literature: The Adventures of Huckleberry Finn". The title "The Adventures of Huckleberry Finn" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MISSISSIPPI RIVER RAFT EXPEDITION DAYLIGHT STYLE: A sunlit, breathtaking panorama of the mighty Mississippi River in golden summer daylight. In the center foreground, a sturdy timber log raft with a cozy canvas-covered wooden shelter floating peacefully down the shimmering river currents. On the raft deck rest a wooden fishing pole, a tin lantern, an open burlap sack of provisions, and a tin mug. Lush green cypress and willow trees line the misty riverbanks, with a majestic great blue heron soaring across a brilliant golden-blue morning sky. Palette: river water golden-aqua, timber logs warm weathered wood, foliage rich riverbank green, and sky sunny morning cyan. American classic literature, Huckleberry Finn, Mississippi River raft voyage, Mark Twain, freedom and adventure, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1396, brief, 'Classic Literature The Adventures of Huckleberry Finn')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Canine Courage". The title "Canine Courage" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SEARCH AND RESCUE CANINE DAYLIGHT STYLE: A sunlit canine training ground on a clear morning in bright natural daylight. In the center foreground, a noble, heroic search-and-rescue German shepherd dog wearing an official high-visibility reflective neon-orange search harness, standing alertly on a timber training obstacle with ears pricked and keen intelligent eyes. Beside the dog rest a canine first-aid field kit, a brass search-and-rescue badge, and a training agility course on green grass under a clear blue sky. Palette: German shepherd rich black and tan, harness reflective orange, grass emerald green, and sky radiant cyan. Search and rescue dogs, working canines, disaster response, animal heroism, noble, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1509, brief, 'Canine Courage')
    print("SUCCESS:", res)

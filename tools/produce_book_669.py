import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Boat on the Sand". '
    'The title "The Boat on the Sand" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT COASTAL MARITIME DAYLIGHT STYLE: A sun-drenched, radiant sandy seashore at low tide on a glorious summer afternoon under a bright blue sky. '
    'In the center foreground, a charming classic wooden fishing dinghy painted in crisp white and navy-blue resting safely on a wide expanse of sunlit golden wet sand patterned with delicate tide ripples. '
    'Near the boat lie clean marine hemp ropes, sparkling sea shells, and smooth beach pebbles glistening in the sun. '
    'In the distance, sparkling turquoise ocean water laps gently against the sunlit shore. '
    'Palette: nautical navy blue, crisp boat white, warm golden sand, sparkling turquoise water, and bright sky blue. '
    'Maritime, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(669, brief, "The Boat on the Sand")
    print("SUCCESS:", res)

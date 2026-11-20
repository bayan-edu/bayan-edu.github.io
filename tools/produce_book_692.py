import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Camp Fire". '
    'The title "The Camp Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT WILDERNESS SAFETY & CAMPING DAYLIGHT STYLE: A sun-drenched, radiant evergreen pine forest campsite on a glorious late afternoon with golden sunbeams filtering through the trees. '
    'In the center foreground, a safe circular ring of smooth natural river stones around an extinguished fire pit, with a rustic galvanized steel camp bucket pouring a clear, sparkling stream of water over cooling charcoal embers, producing a soft wisp of white steam. '
    'A sturdy wooden stirring stick and a modern insulated stainless-steel camping flask rest on a mossy cedar log nearby. '
    'Palette: deep evergreen pine, river stone granite grey, clear water cyan, bucket silver, and warm afternoon golden sunlight. '
    'Camping safety, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(692, brief, "The Camp Fire")
    print("SUCCESS:", res)

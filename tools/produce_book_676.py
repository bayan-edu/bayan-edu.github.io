import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Camel\'s Hump". '
    'The title "The Camel\'s Hump" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DESERT ZOOLOGY DAYLIGHT STYLE: A sun-drenched, radiant desert landscape on a glorious clear morning under an azure blue sky. '
    'In the center foreground, a magnificent, healthy dromedary camel standing proudly and peacefully amidst sweeping golden sand dunes. '
    'The camel is viewed naturally from a majestic side profile, highlighting its strong, firm hump, thick golden-beige desert fleece, and graceful posture catching the warm morning sunlight. '
    'In the background, sweeping rippled golden dunes and a distant green desert acacia tree bask in bright daylight. '
    'Palette: warm desert gold, camel fleece beige, rich sand amber, and brilliant azure sky blue. '
    'Zoological, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(676, brief, "The Camel's Hump")
    print("SUCCESS:", res)

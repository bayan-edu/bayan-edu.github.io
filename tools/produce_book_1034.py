import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to Find Fish without Seeing Them". '
    'The title "How to Find Fish without Seeing Them" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT FRESHWATER STREAM & eDNA CONSERVATION DAYLIGHT STYLE: A sunlit, pristine rocky river basin on a glorious sunny morning in bright daylight. '
    'In the center foreground, resting on a clean river stone: clear sterile environmental DNA (eDNA) water sampling flasks, a syringe water filter unit, an eDNA test kit with illuminated indicator strip, and an illustrated waterproof fish identification field guide showing the striped bridled darter and shimmering blue shiner. '
    'In the background, sparkling clear mountain river rapids tumbling over colorful river gravel, surrounded by lush green Appalachian woodland under a radiant blue sky. '
    'Palette: river aquamarine and crystal clear, woodland emerald, river stone granite grey, and sunbeam gold. '
    'Freshwater biology, environmental DNA, biodiversity conservation, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1034, brief, "How to Find Fish without Seeing Them")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "An Unwelcome Newcomer". The title "An Unwelcome Newcomer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT FRESHWATER ECOLOGY DAYLIGHT STYLE: A sunlit freshwater lake shore and dock in bright clear daylight. In the center foreground, a submerged wooden dock piling and freshwater stone encrusted with clusters of distinctive black-and-tan striped zebra mussels. Through the crystal-clear water, aquatic lake plants sway gently in sunlight, with an aquatic ecologist\'s sampling plankton net and glass viewing jar resting on the wooden dock above. Palette: zebra mussel zebra-striped black and cream, dock wood weathered cedar, lake water clear aqua, and sunlight warm gold. Freshwater biology, invasive species ecology, zebra mussels, aquatic stewardship, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1293, brief, 'An Unwelcome Newcomer')
    print("SUCCESS:", res)

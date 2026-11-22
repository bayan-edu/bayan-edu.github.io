import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Treasure Island". The title "Treasure Island" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CARIBBEAN PIRATE TREASURE DAYLIGHT STYLE: A sun-drenched, breathtaking tropical island beach on a glorious sunny day in bright daylight. In the center foreground, an authentic weathered wooden pirate treasure chest with iron bands resting on white coral sand, overflowing with sparkling gold doubloons, ruby goblets, and pearl necklaces. Beside the chest rests an open parchment treasure map with a bold red "X", an antique brass spyglass, and a colorful scarlet macaw perched on a piece of sunlit driftwood under swaying coconut palms. In the turquoise bay behind, a classic tall three-masted wooden sailing galleon rests at anchor under a radiant blue sky. Palette: treasure gold and ruby, ocean crystal turquoise, sand sparkling white, and macaw scarlet and royal blue. Classic adventure, Treasure Island, pirates, Robert Louis Stevenson, tropical adventure, bright, exciting, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1393, brief, 'Treasure Island')
    print("SUCCESS:", res)

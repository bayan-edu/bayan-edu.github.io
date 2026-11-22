import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: Blackbeard\'s Treasure". The title "Blackbeard\'s Treasure" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MARITIME PIRATE COVE DAYLIGHT STYLE: A sunlit, picturesque coastal pirate harbor cove in bright morning daylight. In the center foreground, a weathered oak table on a seaside dock holding an antique brass ship\'s lantern, an open parchment treasure map with burnt edges and skull-and-crossbones seal, a brass pocket compass, and an iron chest overflowing with silver pieces of eight and gold escudos. In the background, calm turquoise harbor waters and a historic tall ship anchored near sunlit sea cliffs under a clear blue sky. Palette: treasure silver and gold, wood weathered driftwood gray, ocean turquoise, and sky radiant cyan. Pirate lore, maritime history, treasure maps, adventure literature, bright, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1427, brief, 'Reading Blackbeards Treasure')
    print("SUCCESS:", res)

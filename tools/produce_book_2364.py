import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Night the Moon Went Missing". The title "The Night the Moon Went Missing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUNAR PHASES AND NOCTURNAL NATURE STYLE: A magical, starry night in a tranquil meadow. A gentle dark night sky crowded with billions of sparkling stars and the glowing silver ribbon of the Milky Way, with a faint, delicate silver crescent outline of the New Moon showing earthshine (da Vinci glow). In the foreground, a curious barn owl with heart-shaped white face perched on a rustic wooden gate, and fireflies illuminating wildflowers. Palette: starry sky deep sapphire and midnight blue, fireflies glowing chartreuse yellow, owl plumage warm cream and golden-brown. Lunar cycles, nocturnal wildlife, astronomy for children, enchanting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2364, brief, 'Night Moon Went Missing new moon lunar cycle nocturnal animals starry sky')
    print("SUCCESS:", res)

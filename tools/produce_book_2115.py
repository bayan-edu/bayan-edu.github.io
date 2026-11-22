import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Little Prince". The title "The Little Prince" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. POETIC CELESTIAL FANTASY STYLE: A whimsical, poetic view of tiny Asteroid B-612 floating in a gentle, warm starlit cosmos. On the small curved surface of the grassy planetoid are three tidy miniature volcanoes (one extinct), a tiny green baobab sprout, and a single exquisite, luminous red rose flourishing safely under a delicate crystal glass cloche, glowing softly under distant constellations. Palette: cosmos deep indigo and twilight violet, rose petals radiant crimson, planetoid grass fresh green, and stars sparkling gold. Classic philosophical literature, poetic storytelling, wonder and imagination, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2115, brief, 'The Little Prince Asteroid B612 rose cloche baobab volcanoes stars')
    print("SUCCESS:", res)

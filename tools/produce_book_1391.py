import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Sign of Four". The title "The Sign of Four" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AGRA TREASURE & DETECTIVE STUDY DAYLIGHT STYLE: A sunlit, intriguing study desk bathed in bright morning daylight. In the center foreground, an ornate antique Indian sandalwood and brass-bound treasure chest overflowing with shimmering oriental pearls, uncut rubies, and ancient gold coins. Resting beside the chest are a folded antique map marked with the four-symbol cipher, a brass magnifying glass, and a doctor\'s medical journal. Palette: treasure chest warm sandalwood and polished brass, pearls lustrous cream, rubies crimson, and map aged parchment gold. Sherlock Holmes, Arthur Conan Doyle, Agra treasure mystery, classic literature, bright, fascinating, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1391, brief, 'The Sign of Four')
    print("SUCCESS:", res)

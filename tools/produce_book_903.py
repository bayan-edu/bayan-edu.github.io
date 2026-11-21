import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is the Milky Way?". '
    'The title "What Is the Milky Way?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DEEP SPACE ASTRONOMY STYLE: A majestic, luminous cosmic view of the spiral Milky Way galaxy glowing with celestial starlight. '
    'In the center, the magnificent barred spiral galaxy unfurls graceful curving arms filled with billions of glowing diamond stars, vibrant magenta and turquoise emission nebulae, and radiant golden star clusters around a brilliant galactic core. '
    'In the foreground, a sleek astronomical observatory telescope dome silhouette rests under the radiant night-to-dawn cosmic sky. '
    'Palette: radiant galactic gold, nebula turquoise, cosmic magenta, stellar diamond white, and sapphire blue. '
    'Astronomy science, bright, educational, vivid. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(903, brief, "What Is the Milky Way?")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rhubarb Grows in the Dark". The title "Rhubarb Grows in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FASCINATING AGRICULTURAL BOTANY & FORCING SHED STYLE: A warm, enchanting view inside a historic Yorkshire rhubarb forcing shed. Tall, vivid neon-pink and ruby-red stems of tender forced rhubarb growing vigorously in rich dark earth toward soft golden candlelight lanterns. Vibrant chartreuse-yellow young leaves unfurling at the tips of the candy-pink stalks. A rustic wooden harvesting basket, brass gardening trowel, and fresh bundles of tied rhubarb ready for market. Palette: luminous neon pink, ruby crimson, chartreuse yellow-green, warm lantern amber, and rich earth brown. Agricultural botany, unusual farming methods, plant phototropism, unique and captivating. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1594, brief, 'Rhubarb Grows in the Dark forced rhubarb botany agriculture')
    print("SUCCESS:", res)

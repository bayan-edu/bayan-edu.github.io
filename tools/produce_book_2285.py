import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space". The title "Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOLAR SYSTEM AND COSMIC EXPLORATION STYLE: A vibrant, awe-inspiring panoramic view of our Solar System bathed in luminous cosmic light. In the foreground, the majestic golden-ringed planet Saturn alongside the swirling storm bands of Jupiter and our vibrant blue Earth. A robotic planetary space probe with solar panels outstretched cruising peacefully toward distant glowing nebulae of radiant magenta and cyan stardust. Palette: planetary amber and gold, Earth sapphire and white, nebulae radiant magenta and cyan, and space deep velvet navy. Astronomy, planetary science, space exploration, celestial wonder, breathtaking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2285, brief, 'Space astronomy solar system planets nebula stars orbit exploration')
    print("SUCCESS:", res)

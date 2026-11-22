import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lost in the Internet". The title "Lost in the Internet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DIGITAL NETWORK CYBER HIGHWAY STYLE: A vibrant, colorful visualization of global internet infrastructure and data routing. Luminous glowing fiber-optic cable ribbons pulsing with colorful data packets, intersecting at intricate holographic server nodes, wi-fi radio signal ripples, and interactive web architecture maps against a stylized digital cyberspace horizon. Palette: glowing fiber optics neon cyan and electric violet, data packets radiant amber, and network grid deep cobalt blue. Internet technology, digital literacy, network architecture, information science, energetic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2315, brief, 'Lost Internet digital networks fiber optics cyber world data highway')
    print("SUCCESS:", res)

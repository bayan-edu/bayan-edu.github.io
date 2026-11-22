import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "An Unexpected Connection". The title "An Unexpected Connection" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CYBERSECURITY AND ENCRYPTED NETWORKS STYLE: A high-tech digital workspace in daylight. A glowing motherboard circuit with copper traces converging into a luminous cryptographic padlock, with clean holographic fiber-optic streams linking servers, routers, and satellite uplink dishes, illustrating network authentication and safe internet connections. Palette: circuit traces electric cyan and gold, padlock glowing sapphire, background deep slate navy, and daylight sunbeams. Cybersecurity, cryptography, data privacy, internet safety, cutting-edge and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2557, brief, 'Unexpected Connection cybersecurity encrypted networks router lock circuits')
    print("SUCCESS:", res)

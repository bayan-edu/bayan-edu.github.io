import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Helping Hand". The title "A Helping Hand" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOMEDICAL PROSTHETICS AND COMMUNITY COOPERATION STYLE: A bright, sunlit design engineering workshop in daytime. An advanced, colorful 3D-printed pediatric robotic prosthetic hand with precision flexible joints, holding a tender blooming green sprout in a small clay pot, surrounded by colorful gears, community charity project badges, and design tools on a warm birch workbench under sunny window light. Palette: 3D printed prosthetic vibrant teal and cheerful orange, green sprout fresh emerald, and workbench warm natural birch. Assistive technology, biomedical engineering, community service, empathy and innovation, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the mechanical prosthetic hand). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2637, brief, 'Helping Hand community cooperation robotic prosthetic hand gear kindness')
    print("SUCCESS:", res)

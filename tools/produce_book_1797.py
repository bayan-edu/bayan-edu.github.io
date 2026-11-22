import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Spreading His Wings". The title "Spreading His Wings" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AVIAN FLIGHT & THERMAL SOARING AERODYNAMICS DAYLIGHT STYLE: A sun-drenched, majestic mountain cliff overlooking a vast forested river canyon in bright morning sunlight. In the center foreground, a magnificent young golden eagle perched on a weathered granite rock outcrop, spreading its broad, powerful flight feathers to catch the morning thermal breeze. Subtle, elegant aerodynamic airflow vector lines showing thermal updrafts lifting the bird into effortless soaring flight. Panoramic mountain peaks and sunny blue skies stretching to the horizon. Palette: eagle feathers rich golden-brown and tawny buff, granite grey, canyon river aquamarine, and mountain sky cyan. Ornithology, avian aerodynamics, flight physics, thermal soaring, raptor biology, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1797, brief, 'Spreading His Wings avian aerodynamics eagle hawk flight thermals')
    print("SUCCESS:", res)

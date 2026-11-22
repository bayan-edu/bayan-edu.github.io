import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Printing Homes for Birds". The title "Printing Homes for Birds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AVIAN INNOVATION CONSERVATION DAYLIGHT STYLE: A bright, sunny temperate forest setting in spring. Mounted safely on a sturdy oak tree trunk is a futuristic, beautifully engineered 3D-printed biodegradable bird nest box with parametric ventilation patterns and an ergonomic entrance perch. A cheerful wild chickadee bird with black cap and white cheeks perched on a nearby branch looking at its new home. Dappled sunlight through fresh green leaves. Palette: modern nest box terracotta and clay-white, oak bark warm brown, spring leaves lime green, and sunlit sky azure. 3D printing for wildlife, habitat restoration, bird conservation, sustainable engineering, innovative and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1955, brief, 'Printing Homes for Birds 3D printing avian conservation nest box')
    print("SUCCESS:", res)

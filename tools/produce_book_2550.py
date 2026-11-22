import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Environmental Justice". The title "Environmental Justice" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. URBAN EQUITABLE SUSTAINABILITY DAYLIGHT STYLE: A vibrant, sun-soaked urban transformation scene in full daylight. A revitalized city neighborhood featuring a thriving community rooftop vegetable garden, clean solar panel canopies, freshly planted native shade trees, and a clear bubbling urban stream restored from concrete culverts, under clear blue skies with zero smog. Palette: urban park lush emerald green, solar panels cobalt blue, community gardens warm terracotta, and sky clear sunny azure. Environmental justice, urban greening, clean air equity, community sustainability, uplifting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2550, brief, 'Environmental Justice urban greening clean air solar trees community park')
    print("SUCCESS:", res)

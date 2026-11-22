import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mukhil\'s Bloody Adventure". The title "Mukhil\'s Bloody Adventure" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HUMAN CIRCULATORY SYSTEM MICROBIOLOGY STYLE: A colorful, high-detail scientific microscopic voyage through a human blood vessel. Smooth, biconcave red blood cells (erythrocytes) tumbling through a sunlit, translucent capillary along with golden platelets and a protective white blood cell (leukocyte). Glowing oxygen molecules exchanging across the capillary wall, with a stylized anatomical heart cross-section in the background. Palette: red blood cells vibrant ruby crimson, oxygen molecules radiant cyan, blood plasma warm golden translucent, and capillary walls soft rose. Circulatory biology, hematology, cardiovascular health, exciting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1982, brief, 'circulatory system red blood cells platelets heart capillaries biology')
    print("SUCCESS:", res)

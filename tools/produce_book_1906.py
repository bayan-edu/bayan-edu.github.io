import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Overwintering Monarchs". The title "Overwintering Monarchs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OYAMEL FIR FOREST BUTTERFLY SANCTUARY STYLE: A sun-drenched, magical mountain forest sanctuary in Michoacán, Mexico in bright morning sunlight. Towering oyamel fir trees whose trunks and evergreen branches are blanketed by thousands of roosting monarch butterflies, looking like living golden-orange autumn leaves. As morning sunbeams pierce through the high-altitude forest canopy, hundreds of monarchs awaken and flutter gracefully through dancing beams of golden light. A mountain stream and wildflowers below under a clear blue sky. Palette: monarch butterfly brilliant orange and black, oyamel fir deep forest green, and sunbeam radiant amber gold. Monarch migration, overwintering ecology, Mexican biosphere reserve, microclimate protection, breathtaking, magical, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1906, brief, 'Overwintering Monarchs butterfly migration oyamel fir forest Mexico')
    print("SUCCESS:", res)

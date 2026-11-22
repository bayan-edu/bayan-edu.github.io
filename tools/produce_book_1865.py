import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "African Wormwood: A Traditional Medicine". The title "African Wormwood" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ETHNOPHARMACOLOGICAL BOTANY & HERBAL STUDY DAYLIGHT STYLE: A sunlit botanical research table overlooking a South African fynbos hillside in bright morning sunlight. In the center foreground, fresh flowering sprigs of African wormwood (Artemisia afra) showing feathery, silver-green aromatic leaves and small yellow flower clusters. Beside it, a polished wooden mortar and pestle with crushed herbal leaves, a glass teapot with golden herbal infusion, and dried botanical bundles tied with twine. An open botanical field notebook with delicate scientific watercolor illustrations of Artemisia afra. Palette: wormwood foliage silver-green, flower yellow gold, wooden mortar warm walnut, and sunny fynbos sky blue. Medicinal botany, ethnopharmacology, African traditional medicine, herbal chemistry, Artemisia afra, respectful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1865, brief, 'African Wormwood Artemisia afra medicinal botany ethnopharmacology')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Tale of the Toilet". The title "The Tale of the Toilet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORY OF SANITATION AND PLUMBING DAYLIGHT STYLE: A bright, sunlit educational timeline composition of civil sanitation in daylight. Showing ancient Indus Valley clay drainage pipes and Roman terracotta aqueducts transitioning into modern sparkling porcelain plumbing, s-trap water seals, and a clean, high-tech modern wastewater purification facility restoring sparkling clean water to a natural river under sunny skies. Palette: porcelain clean white, brass and copper pipes warm metallic, terracotta clay orange, and clean water crystal cyan. Public health engineering, sanitation history, civil infrastructure, clean water access, insightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2489, brief, 'Tale of Toilet sanitation history water plumbing wastewater treatment')
    print("SUCCESS:", res)

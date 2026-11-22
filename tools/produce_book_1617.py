import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Desertification". The title "Desertification" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ARID LAND DEGRADATION & RESTORATION DAYLIGHT STYLE: A powerful, sunlit geological and ecological scene under radiant desert skies. In the foreground, parched dry cracked clay earth and shifting wind-swept golden sand dunes encroaching on dry grasslands. In contrast, a resilient green acacia tree and newly planted drought-resistant soil-stabilizing desert shrubs blooming with yellow blossoms. Soil moisture sensors, contour stone bunds holding back runoff, and green agroforestry restoration techniques highlighted in clean educational style. Palette: desert golden ochre, cracked earth terracotta, acacia leaf sage green, and clear brilliant desert sky blue. Desertification science, land degradation, soil restoration, climate resilience, impactful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1617, brief, 'Desertification soil degradation arid climate land restoration')
    print("SUCCESS:", res)

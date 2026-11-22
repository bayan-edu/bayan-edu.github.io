import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mexico\'s Natural Wonder: Paricutin Volcano". The title "Parícutin Volcano" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MONOGENETIC CINDER CONE VOLCANO DAYLIGHT STYLE: A sun-drenched, dramatic landscape of the iconic Parícutin cinder cone volcano in Michoacán, Mexico in bright midday sun. The remarkably symmetrical, steep dark cinder cone rising proudly from surrounding fertile cornfields and pine-forested slopes. In the foreground, fields of rugged black blocky \'a\'ā lava rock colonized by pioneering green lichens and resilient desert agave plants. In the distance, the famous half-buried historic stone church bell tower of San Juan Parangaricutiro emerging from hardened basalt under a clear turquoise sky. Palette: volcanic cinder charcoal black, cornfield golden ochre, agave blue-green, stone tower travertine, and Mexican sunny sky blue. Geology of cinder cones, Parícutin eruption history, volcanic landscapes, natural wonders of Mexico, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1744, brief, 'Paricutin Volcano cinder cone geology Mexico Michoacan')
    print("SUCCESS:", res)

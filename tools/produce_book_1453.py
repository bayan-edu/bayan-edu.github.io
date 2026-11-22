import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Dirty Job". The title "Dirty Job" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ENVIRONMENTAL ENGINEERING REMEDIATION STYLE: A sunlit modern environmental containment and land reclamation facility in bright daylight. In the center foreground, heavy yellow civil engineering earthmoving machinery carefully capping a modern engineered containment cell with protective clay and impervious synthetic liner layers. In the background, clean groundwater monitoring wells, solar environmental sensors, and restored green hillside meadows with wildflowers under a clear azure sky. Palette: machinery safety yellow and steel, soil rich terra-cotta clay, reclaimed meadow emerald, and sky bright cyan. Environmental engineering, hazardous waste management, land reclamation, civil sanitation, bright, responsible, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1453, brief, 'Dirty Job')
    print("SUCCESS:", res)

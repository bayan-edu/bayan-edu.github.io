import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mosque Yard". '
    'The title "The Mosque Yard" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT COMMUNITY SERVICE & MOSQUE COURTYARD DAYLIGHT STYLE: A sun-drenched, radiant mosque courtyard on a fresh, spotless morning with golden sunlight bathing the stone pavers. '
    'In the center foreground, clean traditional straw sweepers and a woven broom leaning neatly against a marble planter filled with fragrant white jasmine flowers and young olive trees. '
    'In the center of the courtyard, an elegant carved marble water fountain sparkles with clear trickling water catching sunlight. '
    'Graceful Islamic archways and a serene minaret rise in the background under a spotless blue sky. '
    'Palette: warm travertine cream, sparkling water turquoise, olive leaf green, jasmine white, and golden morning sunlight. '
    'Community, serene, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(688, brief, "The Mosque Yard")
    print("SUCCESS:", res)

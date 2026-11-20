import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Stone in the Glass Box". '
    'The title "The Stone in the Glass Box" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ARCHAEOLOGY & MUSEUM HISTORY DAYLIGHT STYLE: A sunlit, grand museum exhibition gallery on a bright afternoon with warm daylight streaming through tall neoclassical windows. '
    'In the center foreground, the famous Rosetta Stone granodiorite slab displayed inside a sleek, crystal-clear modern glass showcase. '
    'The three distinct carved registers of ancient inscriptions—sacred Egyptian Hieroglyphics, cursive Demotic, and ancient Greek text—are visible with sharp, authentic relief under focused warm spotlights. '
    'Classical museum stone colonnades and gallery arches glow in the soft background. '
    'Palette: granodiorite deep charcoal, pristine display glass cyan, neoclassical stone cream, and warm golden spotlight amber. '
    'Archaeological, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(689, brief, "The Stone in the Glass Box")
    print("SUCCESS:", res)

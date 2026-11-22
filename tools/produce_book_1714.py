import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Living on the Edge". The title "Living on the Edge" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ROCKY INTERTIDAL COASTAL ECOLOGY DAYLIGHT STYLE: A sunlit, rugged ocean shoreline cliff in brilliant morning daylight. In the center foreground, a weathered granite sea rock colonized by resilient intertidal organisms: volcano-shaped acorn barnacles, conical limpets, glossy blue mussels, and clinging green sea lettuce. Crashing white sea foam sprays against the rocks, while delicate sea pink (Armeria) wildflowers bloom resiliently in granite crevices above the high-water splash zone. A coastal lighthouse stands steadfast in the background under radiant blue skies. Palette: sea granite grey, ocean aquamarine and white foam, mussel navy blue, sea pink flower rose, and sunny sky blue. Intertidal ecology, rocky shore adaptations, biological zonation, marine ecology, resilient, bright, and scenic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1714, brief, 'Living on the Edge rocky intertidal shoreline ecology barnacles')
    print("SUCCESS:", res)

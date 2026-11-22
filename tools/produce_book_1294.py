import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Trip Upstream: River Herring Make an Important Journey". The title "A Trip Upstream: River Herring Make an Important Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RIVER RAPIDS & FISH MIGRATION DAYLIGHT STYLE: A sunlit, sparkling freshwater river stream in spring in bright daylight. In the center foreground, a lively school of sleek, silvery river herring leaping energetically upstream through foaming white water rapids and over a concrete fish ladder. Along the riverbank, blooming wild dogwood flowers and fresh green ferns catch morning sunbeams under a clear blue sky. Palette: herring shimmering iridescent silver and olive, river rapid churning white and aqua, foliage spring emerald, and sunbeam gold. Ichthyology, fish migration, river herring, freshwater conservation, dynamic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1294, brief, 'A Trip Upstream: River Herring Make an Important Journey')
    print("SUCCESS:", res)

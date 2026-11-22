import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Copper, a Helpful Natural Resource". '
    'The title "Copper, a Helpful Natural Resource" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MINERALOGY & NATURAL RESOURCES DAYLIGHT STYLE: A sunlit, inspiring geological laboratory on a glorious sunny day in natural daylight. '
    'In the center foreground, on a warm wooden workbench: a stunning raw native copper mineral specimen with branching metallic dendrites and vibrant green malachite oxidation patina, tightly wound spools of gleaming metallic copper wire, and polished copper plumbing pipes catching brilliant morning sunbeams. '
    'Beside them, a geologist\'s steel pick hammer, a white porcelain streak plate, and an open mineralogy field guide. '
    'In the background, sun-drenched laboratory windows overlook a rocky landscape under a clear blue sky. '
    'Palette: copper lustrous orange and bronze, malachite vibrant green, oak warm amber, and sky cyan. '
    'Earth minerals, natural resources, geology, metallurgy, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1049, brief, "Copper, a Helpful Natural Resource")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Ugly Duckling". The title "The Ugly Duckling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FAIRYTALE POND BOTANICAL DAYLIGHT STYLE: A peaceful, sunlit freshwater pond surrounded by flowering reeds, cattails, and pink water lilies. In the center, a gentle grey fluffy cygnet swimming on the calm, sparkling water surface, looking down as its reflection reveals a magnificent, graceful white adult swan with curved neck and glowing white plumage under soft morning sunbeams. Palette: pond water serene turquoise cyan, water lilies soft rose and emerald pads, swan feathers pure radiant white, and sunlight warm gold. Classic fairy tales, growth and self-discovery, pond nature, touching and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2173, brief, 'The Ugly Duckling Hans Christian Andersen cygnet swan pond water lilies')
    print("SUCCESS:", res)

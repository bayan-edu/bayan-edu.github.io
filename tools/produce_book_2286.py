import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Welcome to the Forest". The title "Welcome to the Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUNLIT TEMPERATE WOODLAND BIODIVERSITY STYLE: A radiant, sun-drenched ancient temperate forest glade in full spring daylight. Towering old-growth oak and birch trees with vibrant green leaves framing sunbeams streaming down onto a lush forest floor covered in moss, ferns, and wild forest flowers. A red fox kit peeking curiously from behind a fallen mossy log, a chipmunk nibbling an acorn, and a colorful woodpecker drumming on bark. Palette: forest canopy lush emerald and lime green, tree bark warm chestnut, moss golden-olive, and sunbeams luminous white. Forest ecology, woodland habitat, wildlife biodiversity, cheerful, inviting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2286, brief, 'Welcome to the Forest temperate woodland biodiversity sunlight canopy fauna')
    print("SUCCESS:", res)

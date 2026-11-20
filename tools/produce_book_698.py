import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Making Dishes". '
    'The title "Making Dishes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ARTISANAL POTTERY & CERAMIC SCIENCE DAYLIGHT STYLE: A sunlit, charming pottery studio on a bright morning with natural golden light streaming across a rustic wooden workshop. '
    'In the center foreground, a traditional potter\'s turning wheel with a freshly thrown, perfectly centered smooth terracotta clay bowl displaying gentle spiral throwing rings. '
    'Beside the wheel on a sunlit wooden bench, handcrafted wooden pottery sculpting ribs, clay wire cutters, and finished ceramic bowls and plates drying in the warm shade. '
    'The studio glows with craftsmanship, earth science, and organic tactile beauty under full daylight. '
    'Palette: warm terracotta earthenware, rich clay ochre, natural timber tan, pure glaze white, and bright golden sunbeams. '
    'Craftsmanship, pottery, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(698, brief, "Making Dishes")
    print("SUCCESS:", res)

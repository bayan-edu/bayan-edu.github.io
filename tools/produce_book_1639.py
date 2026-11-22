import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Plants". The title "Plants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUSH BOTANICAL KINGDOM BIODIVERSITY DAYLIGHT STYLE: A glorious, sun-drenched botanical garden conservatory celebrating the incredible diversity of plant life in radiant morning light. In the center foreground, an array of botanical marvels: giant green monstera leaves with dewdrops, a blooming scarlet hibiscus flower, delicate emerald mosses and ferns, and a flowering desert succulent. Sunbeams streaming through the greenhouse glass, highlighting delicate leaf venation patterns and photosynthesis chloroplast green. A classic brass botanist\'s magnifying glass and terra cotta potting vessels on a weathered timber garden bench. Palette: lush plant emerald green, hibiscus crimson red, sunbeam gold, terra cotta orange, and clear sky cyan. Botany, Plant Kingdom, plant diversity, photosynthesis, natural beauty, bright and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1639, brief, 'Plants kingdom plantae botany biodiversity flora')
    print("SUCCESS:", res)

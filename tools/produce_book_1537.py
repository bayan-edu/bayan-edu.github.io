import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Invasive and Nonnative Species: Harmful or Helpful?". The title "Invasive and Nonnative Species: Harmful or Helpful?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT INVASIVE SPECIES ECOLOGY DAYLIGHT STYLE: A sunlit Queensland agricultural landscape in Australia in bright daylight. In the center foreground, a large, warty cane toad resting on red soil at the edge of a lush green sugarcane field. Beside the toad on a wooden fence post, an ecologist\'s field clipboard with data tables comparing native vs nonnative species impacts, a magnifying glass, and sample collection jars. Palette: cane toad textured olive and brown, sugarcane vibrant emerald, soil rich red ochre, and sky sunny cyan. Ecology, invasive species, cane toad, biodiversity impact, environmental science, objective, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1537, brief, 'Invasive and Nonnative Species Harmful or Helpful')
    print("SUCCESS:", res)

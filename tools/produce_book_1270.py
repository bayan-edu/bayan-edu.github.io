import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Digging Deeper". The title "Digging Deeper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PALEONTOLOGY QUARRY DAYLIGHT STYLE: A sunlit, dusty canyon excavation site in bright daylight with geological rock strata. In the center foreground, an impressive fossilized sauropod dinosaur skeleton and vertebrae partially excavated from ancient sandstone bedrock. Surrounding the fossil are authentic paleontological field tools: rock chisels, delicate horsehair excavation brushes, a geological measuring tape, and a field map with grid lines. In the background, sunlit canyon sandstone cliffs rise against a deep azure sky. Palette: sandstone desert tan and terracotta, dinosaur bone mineral stone gray, excavation tool steel, and sky radiant blue. Paleontology, dinosaur excavation, fossil discoveries, Earth history, bright, educational, adventurous, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1270, brief, 'Digging Deeper')
    print("SUCCESS:", res)

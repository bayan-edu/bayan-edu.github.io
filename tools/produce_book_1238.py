import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Can\'t We Glow Like Fireflies?". The title "Why Can\'t We Glow Like Fireflies?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT BIOLUMINESCENCE NATURE STYLE: An enchanting, lush forest scene glowing with wonder and bioluminescent life. In the center foreground, several detailed fireflies with translucent delicate wings resting on rich green fern fronds and mossy tree bark, emitting warm, radiant golden-chartreuse light. Surrounding them, soft sparkling light orbs drift through the air like miniature floating stars, revealing an open botanical field notebook with clear educational diagrams of the luciferase enzyme and bioluminescent chemical reaction. Palette: bioluminescent neon chartreuse, glowing warm amber, deep forest emerald, and soft twilight teal. Bioluminescence, firefly biology, biochemistry, nature wonder, friendly, educational, luminous. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1238, brief, "Why Can't We Glow Like Fireflies?")
    print("SUCCESS:", res)

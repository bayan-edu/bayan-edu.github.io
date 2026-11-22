import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bizarre and Beautiful". The title "Bizarre and Beautiful" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AMAZON RAINFOREST BIODIVERSITY DAYLIGHT STYLE: A sun-drenched, spectacularly diverse Amazon rainforest canopy in radiant bright daylight. In the center foreground, a magnificent toco toucan with an enormous bright orange-yellow bill perched on a flowering jungle vine, surrounded by iridescent blue morpho butterflies fluttering among vibrant pink orchids and giant green monstera leaves. Sunbeams pierce through the emerald canopy, illuminating the breathtaking richness of tropical life. Palette: toucan bill vivid saffron and black, morpho butterfly iridescent sapphire, orchid fuchsia pink, and canopy lush emerald. Tropical rainforest ecology, Amazon wildlife biodiversity, nature photography, colorful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1296, brief, 'Bizarre and Beautiful')
    print("SUCCESS:", res)

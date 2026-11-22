import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Animals of the Tropical Rainforest". The title "Animals of the Tropical Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL RAINFOREST BIODIVERSITY DAYLIGHT STYLE: A sun-drenched, spectacularly rich tropical rainforest canopy in radiant bright daylight. In the center foreground, a magnificent emerald green tree python coiled peacefully on a mossy liana branch, beside a brilliant blue poison dart frog perched on a blooming pink bromeliad, and an iridescent blue morpho butterfly resting on wild orchids. Sunbeams pierce through the multi-layered jungle canopy, illuminating tropical birds flying in the distance under a clear blue sky. Palette: snake metallic emerald, poison frog electric azure, bromeliad fuchsia, and canopy lush tropical jade green. Tropical ecology, rainforest biodiversity, exotic animals, wildlife exploration, colorful, magnificent, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1498, brief, 'Animals of the Tropical Rainforest')
    print("SUCCESS:", res)

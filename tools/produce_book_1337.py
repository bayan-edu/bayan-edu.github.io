import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Weirdness Under the Sea". The title "Weirdness Under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DEEP SEA ABYSS & HYDROTHERMAL VENT STYLE: An awe-inspiring, illuminated deep ocean trench exploration scene in deep sapphire waters. In the center foreground, a robotic exploration submersible with high-powered golden floodlights illuminating a towering hydrothermal black smoker vent chimneypiece. Flourishing around the mineral chimney are clusters of giant white tube worms with bright crimson plumes, translucent ghost crabs, and ethereal glowing bioluminescent comb jellies. Palette: submersible halogen gold, tube worms snow white and crimson, ocean deep sapphire, and vent mineral dark bronze. Deep ocean trenches, hydrothermal vents, extremophile biology, marine abyss, bright, extraordinary, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1337, brief, 'Weirdness Under the Sea')
    print("SUCCESS:", res)

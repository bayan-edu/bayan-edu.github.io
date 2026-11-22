import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Is it Spring?". The title "Is it Spring?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEASONAL TRANSITION SPRING DAYLIGHT STYLE: A radiant, sun-soaked woodland clearing capturing the exact moment winter turns to spring. Patches of melting white snow giving way to tender green grass, where clusters of delicate white snowdrops and bright purple and yellow crocuses are bursting into bloom, with fuzzy pussy willow catkins and tender green tree buds swelling in the warm golden sunshine. Palette: blooming flowers vibrant amethyst purple and golden yellow, melting snow pure white, moss fresh green, and sunlit sky pale cyan. Seasonal cycles, phenology, spring awakening, botany, joyous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2375, brief, 'Is it Spring seasonal changes snowdrops crocuses budding trees daylight')
    print("SUCCESS:", res)

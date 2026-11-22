import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Secrets of Survival: The Ancient Utah Juniper". The title "Secrets of Survival: The Ancient Utah Juniper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DESERT BOTANY & ANCIENT TREES DAYLIGHT STYLE: A sun-drenched, rugged red rock canyon mesa in Utah in radiant bright daylight. In the center foreground, an ancient, gnarled Utah juniper tree with deeply twisted, weathered fibrous bark rooted tenaciously into red Navajo sandstone, its scale-like evergreen foliage dotted with powdery blue-gray berry cones. In the background, iconic red sandstone buttes and dramatic desert mesas glow under a brilliant azure sky. Palette: juniper foliage evergreen and berry silver-blue, sandstone terracotta red, bark weathered silver, and sky radiant cyan. Botany, ancient conifers, dendrochronology, desert resilience, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1322, brief, 'Secrets of Survival The Ancient Utah Juniper')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Big Idea about Water? Living Things & Ecosystems Need Water". The title "Living Things Need Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT BIOLOGICAL WATER & ECOSYSTEM DAYLIGHT STYLE: A sun-drenched, radiant natural oasis celebrating water as the basis of all life on Earth. In the center foreground, a giant crystal-clear water droplet suspended on a vibrant green leaf, acting as a natural lens magnifying cellular cytoplasm inside. Around it, diverse thriving life nourished by water: a freshwater trout leaping in a sunlit mountain brook, a blooming lotus flower, and desert plants blooming after rain. Clean molecular diagrams of H2O showing hydrogen bonding and its role as the universal solvent of biology. Palette: water droplet crystal aquamarine, leaf emerald green, lotus petal rose, and sunlight gold. Biology of water, cellular hydration, universal solvent, ecosystems, refreshing, cheerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1753, brief, 'Living Things Need Water universal solvent biology ecosystems')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Genetic Basis of Butterflies". The title "Genetic Basis of Butterflies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT LEPIDOPTERAN GENETICS DAYLIGHT STYLE: A sun-drenched botanical greenhouse laboratory in bright morning daylight. In the center foreground, a vivid display of butterfly wing color diversity: an electric-blue morpho butterfly, a fiery orange monarch, and an emerald-banded swallowtail resting on blooming tropical orchids. Floating gracefully behind the specimens, a clean educational graphic of a glowing DNA double helix shows genetic loci and alleles controlling wing scale pigments and patterns. Palette: butterfly morpho sapphire, monarch orange, swallowtail emerald, orchid magenta, and greenhouse sunlight ivory. Genetics, butterfly polymorphism, evolutionary biology, DNA, bright, vibrant, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1305, brief, 'Genetic Basis of Butterflies')
    print("SUCCESS:", res)

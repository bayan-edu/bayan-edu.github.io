import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "20,000 Leagues Under the Sea". The title "20,000 Leagues Under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC JULES VERNE SUBMARINE STYLE: A sunlit, magnificent underwater deep sea vista. The iconic steampunk Victorian submarine "Nautilus" with riveted brass hull and glowing observation salon portholes cruising gracefully through an enchanted undersea forest of vibrant giant sea fans, glowing bioluminescent corals, and schools of glittering silver fish under shafts of sunlight penetrating from the surface. Palette: ocean water deep aquamarine and turquoise, submarine hull rich antique bronze and gold, and coral reef vibrant rose and amber. Classic adventure literature, undersea exploration, marine wonder, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2051, brief, '20000 Leagues Under the Sea Jules Verne Nautilus submarine deep sea coral')
    print("SUCCESS:", res)

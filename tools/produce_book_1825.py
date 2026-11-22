import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Do Sunflowers Love the Sun?". The title "Why Do Sunflowers Love the Sun?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RADIANT SUNFLOWER HELIOTROPISM SUNNY FIELD STYLE: A glorious, sun-drenched agricultural field of towering sunflowers on a perfect midsummer morning. In the center foreground, a magnificent, massive blooming sunflower with brilliant golden-yellow petals and intricate Fibonacci spiral seed head, facing proudly toward the blazing golden morning Sun. A clean educational cross-section diagram of the sunflower stem showing plant hormone auxin redistribution: auxin accumulating on the shaded side of the stem, stimulating cellular elongation that naturally bends the flower head toward the moving sunlight! Fluffy white clouds, blue skies, and radiant golden sunbeams. Palette: sunflower petal vibrant gold, stem and leaf lush green, seed head warm umber, and sky brilliant cyan. Botany, heliotropism, plant phototropism, auxin hormone biology, solar tracking, joyful, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1825, brief, 'Why Do Sunflowers Love the Sun heliotropism phototropism auxin botany')
    print("SUCCESS:", res)

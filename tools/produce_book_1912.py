import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Nutritious Num Num". The title "The Nutritious Num Num" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COASTAL BOTANY & INDIGENOUS EDIBLE FRUIT STYLE: A sun-drenched coastal garden landscape along the Indian Ocean shoreline on a bright morning. In the center foreground, a healthy, thriving Natal plum (num-num) shrub (Carissa macrocarpa) with glossy, dark-green leathery leaves, fragrant star-shaped white jasmine-like blossoms, and clusters of plump, oval, ruby-red ripe num-num fruits glistening with morning dew droplets. A rustic woven fruit basket with split fruits showing sweet red pulp rich in vitamin C and magnesium. Turquoise coastal ocean and sunny blue skies in the background. Palette: num-num fruit brilliant ruby crimson, foliage glossy emerald green, blossom pure white, and ocean turquoise. Indigenous wild fruit botany, nutritional science, coastal xerophyte adaptations, Carissa macrocarpa, cheerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1912, brief, 'Nutritious Num Num Carissa macrocarpa coastal botany edible fruit')
    print("SUCCESS:", res)

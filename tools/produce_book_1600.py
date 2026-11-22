import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Humans Can\'t Live Off Sunlight". The title "Why Humans Can\'t Live Off Sunlight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPARATIVE BIOENERGETICS & BIOCHEMISTRY DAYLIGHT STYLE: A bright, sunlit comparative biology and nutrition research lab. On one side, a vibrant green plant leaf cell cutaway showing emerald chloroplasts converting golden sunlight photons, CO2, and water into glucose sugars. On the other side, an energetic human nutritional metabolism chart showing calorie requirements, complex foods (whole grains, fruits, vegetables, proteins), and mitochondria energy synthesis (ATP). A laboratory beaker with glowing green chlorophyll extract catching bright sunlight on a lab bench. Palette: chlorophyll emerald green, solar gold, metabolic coral, pure sunlight white, and sky cyan. Bioenergetics, photosynthesis, human metabolism, caloric energy, engaging and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1600, brief, 'Why Humans Cant Live Off Sunlight photosynthesis vs metabolism')
    print("SUCCESS:", res)

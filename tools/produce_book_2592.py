import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Down the Chimney Trail". The title "Down the Chimney Trail" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOUNTAIN TRAIL ADVENTURE DAYLIGHT STYLE: A sunlit, breathtaking alpine mountain landscape in crisp morning sunshine. A narrow, scenic hiking trail descending through a natural geological rock cleft (chimney formation) of towering granite boulders, surrounded by fragrant ponderosa pines, mountain wildflowers, and sweeping views of a sun-soaked river valley far below under an azure sky. Palette: granite rocks warm amber-grey, pines deep forest green, valley mist golden, and alpine sky clear cyan. Outdoor adventure, hiking geology, mountain landscapes, exhilarating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2592, brief, 'Down Chimney Trail mountain hiking rugged rock chimney pine canyon')
    print("SUCCESS:", res)

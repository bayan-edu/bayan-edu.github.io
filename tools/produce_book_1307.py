import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Greta Thunberg Is Worried About the Future". The title "Greta Thunberg Is Worried About the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ENVIRONMENTAL CLIMATE STEWARDSHIP DAYLIGHT STYLE: A sunlit, peaceful public park on a glorious clear day under bright daylight. In the center foreground, a sturdy wooden park bench where a hand-painted wooden sign reads "Act for the Planet" beside a potted green oak sapling ready to be planted. Surrounding the scene are clean recycling stations, rooftop solar panels in the background, and blooming native wildflower meadows under a clear azure sky. Palette: meadow emerald green, sapling fresh lime, banner natural pine wood, wildflower buttercup yellow, and sky azure cyan. Climate awareness, youth environmental movement, ecological stewardship, bright, hopeful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1307, brief, 'Greta Thunberg Is Worried About the Future')
    print("SUCCESS:", res)

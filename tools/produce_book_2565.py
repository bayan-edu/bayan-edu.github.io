import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Something Special by the River". The title "Something Special by the River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVERBANK WILDLIFE HAVEN DAYLIGHT STYLE: A sunlit, peaceful river wetland in early morning sunshine. A freshly engineered beaver lodge of interwoven birch branches and river mud, where a playful river otter peeks happily from behind a mossy log, beside blooming blue irises, cattails, and clean freshwater rippling over smooth river stones. Palette: wetland plants lush emerald and turquoise, beaver wood warm chestnut, river stones grey, and morning sunlight golden amber. Riparian biodiversity, wetland engineering, river wildlife, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2565, brief, 'Riverkeepers river otter beaver dam clean freshwater ecology wetlands')
    print("SUCCESS:", res)

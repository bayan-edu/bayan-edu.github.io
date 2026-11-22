import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "White-Headed Eagle With Yellow Catfish". The title "White-Headed Eagle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAJESTIC ALASKAN RIVER WILDLIFE DAYLIGHT STYLE: A sun-drenched, pristine gravel riverbank along a clear mountain river in Alaska on a bright sunny morning. In the center foreground, a magnificent adult bald eagle with crisp, snowy-white head feathers and piercing yellow eyes perched proudly on a weathered cedar driftwood log. Held firmly in its powerful yellow talons is a freshly caught yellow catfish glistening with water droplets in the bright sun. In the background, rushing turquoise river rapids, dense emerald spruce forests, and distant snow-capped peaks under a cloudless azure sky. Palette: eagle head pure white, plumage deep chocolate brown, beak and talons vibrant yellow, river turquoise, and forest spruce green. Raptor biology, bald eagle, river ecosystems, predator-prey wildlife, majestic, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1823, brief, 'White Headed Eagle Yellow Catfish raptor wildlife Alaska river')
    print("SUCCESS:", res)

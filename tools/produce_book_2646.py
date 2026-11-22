import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Good Deed". The title "A Good Deed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOUNTAIN WILDLIFE KINDNESS DAYLIGHT STYLE: A sun-drenched mountain cabin porch on a clear sunny morning. A beautifully handcrafted wooden bird feeder brimming with sunflower seeds, where colorful songbirds (mountain bluebirds and goldfinches) are happily feeding and splashing in a ceramic birdbath, surrounded by pots of blooming mountain daisies and sweeping views of green alpine peaks. Palette: bird plumage vibrant azure blue and lemon yellow, wooden feeder warm honey pine, and mountain background sunlit emerald. Kindness to wildlife, community responsibility, bird feeding, mountain nature, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2646, brief, 'Good Deed mountain bird feeder wooden birdhouse seed meadow wildflowers')
    print("SUCCESS:", res)

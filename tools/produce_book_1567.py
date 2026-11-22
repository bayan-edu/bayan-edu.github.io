import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Day at the Zoo". The title "A Day at the Zoo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT ZOOLOGICAL HABITAT SUNNY DAYLIGHT STYLE: A sun-drenched, world-class modern botanical and zoological park on a perfect summer morning. In the center foreground, a wooden scenic visitor boardwalk bridge overlooking a lush savannah savanna enclosure. Majestic giraffes peacefully grazing on acacia tree leaves, a colorful pair of scarlet macaws perched on a wooden signpost, and a turtle sunning on a pond rock. Colorful educational habitat interpretive map signs and leafy palm canopies under a radiant blue sky with fluffy white clouds. Palette: savannah golden amber, acacia green, macaw scarlet and cobalt, warm wooden teak, and brilliant sky blue. Wildlife conservation, zoology, biodiversity education, cheerful, joyful, bright educational aesthetic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1567, brief, 'A Day at the Zoo zoological park biodiversity')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Down to the River". The title "Down to the River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVER STEWARDSHIP ECOLOGY DAYLIGHT STYLE: A sun-drenched freshwater riverbank on a gorgeous summer morning. On a wooden dock, a water quality monitoring kit: a black-and-white Secchi disc for measuring water clarity, clean sampling vials with river water, a digital pH meter, and a notebook recording dissolved oxygen, with dragonflies skimming over clean flowing water and green weeping willows. Palette: river water sparkling aquamarine, riverbank foliage vibrant emerald, Secchi disc black and white, and sunny sky blue. Freshwater ecology, citizen science, river monitoring, environmental protection, refreshing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2560, brief, 'Down to the River riparian riverbank water sampling turbidity disc ecology')
    print("SUCCESS:", res)

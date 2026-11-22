import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Horse Coat Colors". The title "Horse Coat Colors" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BEAUTIFUL EQUINE GENETICS SUNNY PASTURE STYLE: A sun-drenched, picturesque horse ranch pasture on a glorious sunny afternoon. In the lush green clover meadow, a peaceful herd of magnificent horses displaying diverse genetics and coat variations grazing naturally: a golden Palomino with a flaxen white mane, a rich reddish-brown Chestnut, a dappled grey, a dark Bay with black points, and a striking black-and-white Pinto. White wooden paddock fences, rolling green hills, and clean educational color-swatch genetics callouts in the corner under a bright blue sky. Palette: palomino gold, chestnut reddish-amber, dapple grey silver, pasture clover green, and sunny sky blue. Equine genetics, coat color inheritance, horse breeds, animal science, wholesome, scenic, and bright. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1659, brief, 'Horse Coat Colors equine genetics coat patterns')
    print("SUCCESS:", res)

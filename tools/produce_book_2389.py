import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bald Eagle: Winged Predator". The title "Bald Eagle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AMERICAN RAPTOR CONSERVATION DAYLIGHT STYLE: A sunlit, breathtaking river canyon in the Pacific Northwest in brilliant morning sunshine. A magnificent wild bald eagle (Haliaeetus leucocephalus) with pure snow-white head plumage, piercing golden eyes, and a sharp yellow hooked beak, perched proudly on a craggy pine branch overlooking a roaring mountain river where silver salmon leap, with snow-capped mountain peaks under an azure sky. Palette: eagle plumage deep chocolate brown, head and tail snow white, beak and talons golden yellow, and mountain sky royal blue. Apex avian predator, eagle biology, raptor conservation, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2389, brief, 'Bald Eagle Haliaeetus leucocephalus raptor soaring river mountains daylight')
    print("SUCCESS:", res)

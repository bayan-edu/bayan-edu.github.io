import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "High Jumpers". The title "High Jumpers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PAPUA NEW GUINEA TREE-KANGAROO DAYLIGHT STYLE: A sun-dappled, lush tropical cloud forest canopy high above the Huon Peninsula in bright morning daylight. In the center foreground, an enchanting Matschie\'s tree-kangaroo with plush reddish-mahogany fur, golden-yellow belly and face, and a long balancing tail, perched nimbly on a mossy rain-tree branch. Dewy tropical ferns, climbing orchids, and morning sunbeams pierce through the misty mountain canopy under a clear blue sky. Palette: tree-kangaroo mahogany red and warm gold, moss chartreuse, orchid magenta, and canopy deep emerald. Wildlife biology, tree-kangaroos, arboreal marsupials, Papua New Guinea ecology, charming, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1519, brief, 'High Jumpers')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Doum Palm of the Sahara Desert". The title "The Doum Palm of the Sahara" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SAHARAN DESERT OASIS & BOTANICAL WONDER STYLE: A sun-drenched, spectacular Saharan desert landscape in brilliant midday sunshine. In the center, a majestic ancient Doum palm tree (Hyphaene thebaica) showing its unique, iconic Y-shaped branching trunk (dichotomous branching). Large fan-shaped evergreen fronds rustling in the desert breeze and heavy clusters of glossy, reddish-orange gingerbread-flavored doum fruit. Golden rippling sand dunes, a tranquil desert oasis spring reflecting the palms, and a clear turquoise sky. Palette: doum fruit polished amber-orange, palm fronds deep green, desert sand golden ochre, and oasis water turquoise. Desert botany, Sahara oasis ecology, dichotomous branching palms, ancient Egyptian sacred trees, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1908, brief, 'Doum Palm Sahara Desert Hyphaene thebaica desert botany oasis')
    print("SUCCESS:", res)

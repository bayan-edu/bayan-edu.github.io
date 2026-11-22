import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Sawfish". The title "Sawfish" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUNLIT SHALLOW WATER ELASMOBRANCH MARINE STYLE: A crystal-clear, sun-drenched coastal lagoon and sandy mangrove shallows in tropical daylight. In the center foreground, a magnificent, peaceful smalltooth sawfish swimming smoothly over rippled white sand, with sunbeams dancing across its dorsal fin. Prominent, razor-sharp view of its iconic elongated rostral blade lined with tooth-like dermal denticles. Mangrove prop roots and small schooling mullet fish visible in the pristine, clear turquoise water. Palette: sawfish sand grey, lagoon turquoise aquamarine, mangrove green, and sunny tropical yellow. Ichthyology, sawfish biology, endangered elasmobranchs, marine anatomy, stunning and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1664, brief, 'Whats This Sawfish elasmobranch rostrum marine biology')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Coral Reefs in the Sea". The title "Coral Reefs in the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR SUN-DRENCHED CORAL REEF SANCTUARY STYLE: A breathtaking underwater paradise in crystal-clear tropical ocean shallows bathed in dancing golden sunbeams. In the center foreground, a magnificent coral reef garden: branching purple staghorn coral, golden brain coral, and delicate pink sea fans. Vibrant orange clownfish darting among sea anemone tentacles, a blue sea star resting on clean white coral sand, and a sea turtle gliding peacefully in the background. A microscopic circular inset showing tiny coral polyps with translucent tentacles absorbing calcium carbonate. Palette: ocean lagoon turquoise, staghorn coral violet, clownfish vibrant orange, anemone pink, and sunbeam gold. Coral reef ecosystems, marine biology, symbiotic zooxanthellae, ocean conservation, brilliant, joyful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1726, brief, 'Coral Reefs in the Sea marine biology coral polyp reef ecosystem')
    print("SUCCESS:", res)

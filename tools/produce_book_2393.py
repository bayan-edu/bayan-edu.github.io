import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ospreys: Predators by Sky and Sea". The title "Ospreys: Predators by Sky and Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OSPREY RAPTOR HUNTING DAYLIGHT STYLE: A sunlit, high-speed wildlife action moment captured in brilliant daylight over a coastal estuary. A wild osprey (fish hawk) with wings swept back in a steep aerodynamic dive, extending its curved, razor-sharp black talons just breaking the sparkling water surface to grasp a silvery fish, with water droplets exploding into diamond-like sparkles in the midday sunshine. Palette: osprey plumage dark brown and pure white, water surface sparkling sapphire and aquamarine, and sky bright cerulean blue. Avian raptor biology, specialized fish-hunting adaptations, coastal ecology, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2393, brief, 'Ospreys Pandion haliaetus fish hawk raptor diving talons river daylight')
    print("SUCCESS:", res)

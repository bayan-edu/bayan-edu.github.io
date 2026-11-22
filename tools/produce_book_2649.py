import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Forest and the Trees". The title "The Forest and the Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DENDROLOGY AND FORESTRY ECOLOGY DAYLIGHT STYLE: A sunlit mountain forest clearing in full daylight. In the foreground, a smooth cut cross-section of a fallen pine trunk showing detailed concentric tree rings (dendrochronology) with a magnifying glass examining historical growth cycles, framed by towering living sugar pines and redwoods reaching toward a sunlit sky. Palette: tree rings warm honey and amber, pine needles rich forest green, bark deep chestnut, and sunlight golden. Dendrochronology, forest ecology, tree anatomy, climate history in trees, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2649, brief, 'Forest and Trees forestry dendrology tree rings pine old growth mountain')
    print("SUCCESS:", res)

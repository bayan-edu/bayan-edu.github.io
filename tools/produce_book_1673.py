import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bare Bones". The title "Bare Bones" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPARATIVE VERTEBRATE OSTEOLOGY DAYLIGHT STYLE: A sunlit, pristine natural history laboratory and bone preparation study on a bright morning. In the center foreground, an elegant comparative display of vertebrate limb bone homologues: an avian bird wing skeleton, a cetacean whale flipper skeletal armature, and a feline cheetah leg skeleton. Clean architectural calipers, bone classification labels, and anatomical bone density cross-sections arranged neatly on a polished oak workbench. Palette: ivory bone white, polished oak timber, brass caliper gold, and clean laboratory daylight white. Comparative anatomy, vertebrate evolution, osteology, structural biology, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1673, brief, 'Bare Bones comparative vertebrate osteology skeletal biology')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A New Find". The title "A New Find" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PALEONTOLOGICAL FOSSIL DISCOVERY DAYLIGHT STYLE: A sun-drenched geological excavation ledge on a bright morning. In the center foreground, a freshly split sedimentary limestone rock nodule revealing a magnificent, perfectly preserved golden fossil ammonite shell with intricate spiral suture patterns. Beside it, a paleontologist\'s steel rock hammer, delicate fine-bristle fossil dusters, a brass measuring caliper, and a field notebook with stratigraphic sketches. In the background, sunlit canyon strata layers under clear azure skies. Palette: ammonite fossil amber gold, limestone rock cream and buff, hammer steel chrome, and sunny canyon sky blue. Paleontology, fossil excavation, Earth history, ammonite fossils, discovery excitement, bright and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1835, brief, 'A New Find paleontology fossil discovery ammonite strata')
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Blast from the Past". The title "A Blast from the Past" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PALEONTOLOGY FOSSIL HUNTING DAYLIGHT STYLE: A sun-drenched rocky mountain scree slope in morning sunshine. A split sedimentary shale rock revealing an exquisitely preserved ancient spiral ammonite fossil and a ribbed trilobite specimen, beside a geologist\'s steel rock hammer, a brass magnifying hand lens, and a field specimen label notebook under clear skies. Palette: fossil rock slate grey and charcoal, ammonite pearlescent amber, rock hammer steel and blue grip, and morning sunlight golden. Paleontology, fossilization, prehistoric life, geological fieldwork, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2660, brief, 'Blast from Past paleontology trilobite ammonite fossils rock hammer geology')
    print("SUCCESS:", res)

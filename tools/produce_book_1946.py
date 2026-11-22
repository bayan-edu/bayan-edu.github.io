import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Mountains Form". The title "How Mountains Form" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOLOGY TECTONIC OROGENY DAYLIGHT STYLE: A dramatic educational cutaway landscape bathed in clear midday sunlight. Towering jagged alpine mountain peaks with jagged rocky crags and glistening glaciers, seamlessly transitioning into an exposed geological cross-section below, revealing colorful folded strata of sedimentary rock, subterranean tectonic plate convergence forces, and volcanic magma upwelling. Palette: alpine rock granite grey, glacier ice cyan, subterranean strata terracotta ochre and sienna, and alpine sky cerulean blue. Mountain building, plate tectonics, geological uplift, Earth science, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1946, brief, 'How Mountains Form plate tectonics geology orogeny folding')
    print("SUCCESS:", res)

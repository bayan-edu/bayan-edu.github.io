import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Hard Minerals". The title "Hard Minerals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOHS HARDNESS SCALE & CRYSTALLOGRAPHY DAYLIGHT STYLE: A sunlit, pristine mineralogy laboratory display on a polished oak workbench. In the center, a striking visual progression of mineral hardness specimens arranged neatly in order of Mohs scale (1 to 10): soft flaky talc, transparent gypsum, rhombohedral calcite, purple fluorite cube, green apatite, feldspar, sparkling hexagonal quartz crystal, topaz, red corundum ruby, and a brilliant raw octahedral diamond! Geological scratch-test picks, a brass balance, and a magnifying loupe catching bright natural sunlight. Palette: quartz crystal clear, fluorite violet, ruby crimson, diamond brilliant white, and velvet display navy. Mineralogy, Mohs scale of hardness, crystallography, mineral identification, geology, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1847, brief, 'Hard Minerals Mohs scale mineralogy crystallography hardness')
    print("SUCCESS:", res)

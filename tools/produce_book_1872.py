import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s Up, Doc?". The title "What\'s Up, Doc?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLINICAL MEDICAL SCIENCE & DIAGNOSTIC TOOLS DAYLIGHT STYLE: A sunlit, clean medical consultation and diagnostic study in bright morning light. In the center foreground, on a polished blonde-wood examination desk: a modern precision stethoscope with stainless-steel chestpiece, an otoscope with diagnostic ear speculum, a reflex hammer, a digital blood pressure monitor, and clean anatomical medical charts illustrating health vitals. A glass pitcher of water with lemon slices, a medical notepad, and a green potted plant under sunny clinic windows. Palette: clinical teal blue, stainless steel chrome, white porcelain, desk blonde oak, and natural morning sunlight. Medical science, diagnostic medicine, healthcare tools, clinical examination, informative, reassuring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1872, brief, 'Whats Up Doc medical diagnosis clinical examination stethoscope')
    print("SUCCESS:", res)

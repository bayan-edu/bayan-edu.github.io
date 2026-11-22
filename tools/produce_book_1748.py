import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Scientific Instruments". The title "Scientific Instruments" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSICAL & MODERN LABORATORY INSTRUMENTATION DAYLIGHT STYLE: A sunlit, beautifully equipped scientific laboratory workbench bathed in bright morning sunlight. In harmonious arrangement: a precision optical compound microscope with brass and chrome objectives, a dual-pan analytical balance scale with brass weights, a digital laser thermometer, glass hydrometers floating in graduated cylinders with colored liquids, and stainless steel vernier calipers. A glass prism on the desk refracting sunlight into a vivid rainbow spectrum across open laboratory graph notebooks. Palette: polished brass gold, optical glass cyan, rainbow spectral bands, laboratory white, and warm oak wood. Scientific instruments, measurement precision, optics, laboratory tools, scientific history, inspiring and scholarly. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1748, brief, 'Scientific Instruments laboratory optics precision measurement')
    print("SUCCESS:", res)

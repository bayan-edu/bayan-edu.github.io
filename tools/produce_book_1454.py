import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Double Vision". The title "Double Vision" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT 3D STEREOSCOPY & OPTICS DAYLIGHT STYLE: A sunlit optics laboratory study table in bright natural daylight. In the center foreground, an antique brass-mounted stereoscope viewer holding a pair of side-by-side photographic stereocards displaying depth. Beside the stereoscope rest modern polarized red-and-cyan 3D glasses, an optical glass prism splitting light rays, and clean educational diagrams illustrating binocular parallax and retinal disparity. Palette: stereoscope polished brass and mahogany, 3D glasses vivid cyan and ruby red, and study table warm oak. Optics, stereoscopy, 3D technology, binocular vision, perception science, bright, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1454, brief, 'Double Vision')
    print("SUCCESS:", res)

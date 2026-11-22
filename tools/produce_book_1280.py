import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mission: Pluto". The title "Mission: Pluto" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT NEW HORIZONS PLUTO MISSION STYLE: A magnificent, sun-illuminated space encounter scene at the edge of the solar system. In the center foreground, the New Horizons spacecraft with its large gold-and-white parabolic dish antenna and science instruments flying past dwarf planet Pluto. Pluto\'s textured surface is illuminated in dramatic relief, revealing its iconic peach-tinted nitrogen ice heart (Tombaugh Regio) and towering water-ice mountain ranges under a distant brilliant point of golden sunlight. In the background, Pluto\'s large moon Charon hovers in deep starry space. Palette: Pluto nitrogen ice peach and reddish-tholin russet, spacecraft gold and white, and space deep velvet indigo with distant sun flare. Planetary science, Pluto flyby, New Horizons mission, Kuiper belt exploration, bright, educational, inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1280, brief, 'Mission: Pluto')
    print("SUCCESS:", res)

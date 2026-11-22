import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rainbows in Windows". The title "Rainbows in Windows" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OPTICAL LIGHT DISPERSION DAYLIGHT STYLE: A sun-drenched, cozy living room windowsill in early morning daylight. A faceted crystal glass suncatcher hanging in the window refracting incoming sunlight into dozens of vibrant, dancing spectral rainbows projected across a light wooden floor, white walls, and potted green ferns, with an educational ray diagram showing white light refracting into ROYGBIV colors. Palette: rainbow beams vivid spectral spectrum, crystal glass sparkling transparent, room walls soft cream, and morning sunlight golden warm. Optics physics, light refraction, rainbow science, visual wonder, enchanting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2493, brief, 'Rainbows Windows optical glass prism light dispersion spectrum sunbeams')
    print("SUCCESS:", res)

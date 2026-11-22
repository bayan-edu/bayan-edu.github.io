import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lights Out!". The title "Lights Out!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DARK SKY PRESERVATION & ASTRONOMICAL CONTRAST STYLE: A thought-provoking comparative landscape split down the middle. On one side, an urban city with excessive unshielded artificial streetlights causing skyglow light pollution that washes out the night sky. On the other side, a certified Dark Sky Reserve with fully shielded downward lighting, revealing a breathtaking, crystalline view of the Milky Way galaxy, nebulae, and shooting stars. An astronomical telescope and a nocturnal owl perched on a branch enjoying natural night darkness. Palette: dark sky deep navy and starlight silver, streetlamp yellow glow, Milky Way violet-pink, and observatory dome white. Dark sky conservation, light pollution mitigation, observational astronomy, ecological nocturnal habitats, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1893, brief, 'Lights Out dark skies light pollution astronomy conservation')
    print("SUCCESS:", res)

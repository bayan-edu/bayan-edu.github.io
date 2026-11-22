import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Nine Views on Thomas Alva Edison". The title "Nine Views on Thomas Alva Edison" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INVENTION HISTORY MENLO PARK DAYLIGHT STYLE: A sunlit, nineteenth-century inventor\'s workshop table in full daylight. Arranged with care are the landmark inventions of the industrial era: an authentic early carbon-filament incandescent lightbulb glowing with warm amber light, a brass cylinder phonograph with a horn, an antique Morse code telegraph key, a vintage motion picture kinetoscope film strip, and inventor\'s handwritten notebook sketches. Palette: carbon filament warm glowing amber, polished brass rich gold, mahogany table deep chestnut, and sunny workshop light. History of invention, electrical engineering, innovation milestones, nostalgic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2003, brief, 'Nine Views Thomas Edison inventions incandescent bulb phonograph telegraph')
    print("SUCCESS:", res)

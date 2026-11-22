import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Developing Possible Solutions". The title "Developing Possible Solutions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CREATIVE ENGINEERING PROTOTYPE WORKSHOP DAYLIGHT STYLE: A sunlit, well-organized engineering design studio filled with bright morning light. On a broad drafting table: architectural blueprint tracings with alternative design options labeled Option A and Option B, technical mechanical sketches, and flowchart decision trees. Precision mechanical prototypes: colorful interlocking gears, balsa wood truss bridge models, 3D printed mechanical linkages, and digital calipers. Palette: blueprint cyan, prototype orange, timber blonde, mechanical graphite, and clean studio white. Engineering design method, iterative testing, problem-solving, STEM innovation, energetic and clear. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1619, brief, 'Developing Possible Solutions engineering prototyping innovation')
    print("SUCCESS:", res)

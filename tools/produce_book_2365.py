import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to Solve a Problem like Himani". The title "How to Solve a Problem like Himani" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CREATIVE PROBLEM SOLVING DAYLIGHT STYLE: A bright, sunlit study workbench filled with colorful logic puzzles and creative inventions in morning daylight. Interlocking wooden tangram puzzle pieces forming a flying bird, colorful interlocking acrylic gears that turn smoothly together, a brass magnifying glass, a sketchbook with lightbulb sketches and neat flowchart arrows, and an hourglass under sunny window light. Palette: tangram pieces vibrant orange, teal, and magenta, gears translucent lime, oak desk warm honey, and sunlight bright white. Logic, critical thinking, problem-solving skills, engineering mindset, cheerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2365, brief, 'Solve Problem puzzle logic mathematical reasoning gears tangram')
    print("SUCCESS:", res)

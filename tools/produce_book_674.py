import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Hard Hat". '
    'The title "The Hard Hat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT INDUSTRIAL SAFETY ENGINEERING DAYLIGHT STYLE: A sun-drenched, radiant modern construction site on a crisp, clear morning under a brilliant azure sky. '
    'In the center foreground, a premium high-visibility canary-yellow industrial safety hard hat resting on a gleaming steel structural beam. '
    'The helmet is angled to reveal its precision shock-absorbing webbed inner suspension cradle and adjustable harness. '
    'Beside the helmet on the beam rests a polished chrome steel wrench catching golden sun reflections and neatly rolled engineering blueprints. '
    'In the background, modern construction cranes reach into the open bright daylight. '
    'Palette: high-visibility safety yellow, polished steel chrome, architectural cyan, and clear sky blue. '
    'Engineering, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(674, brief, "The Hard Hat")
    print("SUCCESS:", res)

import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Never Too Late to Read". '
    'The title "Never Too Late to Read" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TRADITIONAL STUDY & LITERACY DAYLIGHT STYLE: A sun-drenched, tranquil mosque courtyard library on a peaceful morning with warm sunbeams streaming through graceful Islamic horseshoe arches. '
    'In the center foreground, an open manuscript book with elegant calligraphy resting on a carved walnut wood folding reading stand (rihal). '
    'Beside the stand on an authentic woven carpet lie classic round tortoiseshell reading glasses, a strand of polished amber beads, and a warm cup of herbal tea catching golden morning light. '
    'The atmosphere radiates wisdom, patience, warmth, and the joy of lifelong learning in bright daylight. '
    'Palette: warm walnut wood, glowing amber gold, manuscript ivory, soft turquoise carpet, and bright golden sunlight. '
    'Inspiring, peaceful, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(685, brief, "Never Too Late to Read")
    print("SUCCESS:", res)

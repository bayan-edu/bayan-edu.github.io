import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Soccer Can Help Us Understand Physics". The title "How Soccer Can Help Us Understand Physics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC SPORTS AERODYNAMICS DAYLIGHT STYLE: A sun-drenched, pristine green soccer stadium field in radiant midday sunlight. In the center foreground, a classic black-and-white soccer ball captured spinning through mid-air toward a white goal net. A glowing curved parabolic trajectory trail demonstrating the aerodynamic Magnus effect, with clean vector airflow velocity arrows, spin rotation vectors, and friction diagrams. Dew glistening on the manicured emerald lawn under a bright sunny blue sky. Palette: soccer lawn emerald green, classic ball white and black, radiant trajectory cyan, and brilliant stadium sky blue. Physics of sports, aerodynamics, Magnus effect, trajectory motion, cheerful and engaging. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1573, brief, 'How Soccer Can Help Us Understand Physics Magnus effect aerodynamics')
    print("SUCCESS:", res)

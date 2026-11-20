import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Glasses at the Saw". '
    'The title "Glasses at the Saw" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT WOODWORKING SAFETY DAYLIGHT STYLE: A sun-drenched, radiant carpentry workshop on a bright morning with warm sunbeams streaming through high windows. '
    'In the center foreground, a pair of premium crystal-clear safety glasses with protective wrap-around side shields resting proudly on a freshly planed blond pine workbench. '
    'Around the glasses lie delicate, fragrant curling wood shavings, a clean steel saw blade with precision teeth, and a vintage wooden folding ruler. '
    'The workshop glows with warm natural light, reflecting craftsmanship, safety, and woodwork precision. '
    'Palette: warm blond pine, crystal clear lens, gleaming steel, safety amber, and bright golden sunlight. '
    'Craftsmanship, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(671, brief, "Glasses at the Saw")
    print("SUCCESS:", res)

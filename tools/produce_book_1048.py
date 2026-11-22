import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cold Faithful". '
    'The title "Cold Faithful" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CRYOVOLCANIC ENCELADUS & SATURN ASTRONOMY STYLE: A breathtaking, sun-illuminated view of Saturn\'s icy moon Enceladus in sharp space detail. '
    'In the center foreground, the brilliant white, icy fractured crust of Enceladus with its famous blue tiger-stripe fractures actively erupting towering, luminous plumes of cryovolcanic ice geysers high into the vacuum of space, sparkling brilliantly in direct sunlight. '
    'In the background, the colossal golden-amber ringed planet Saturn looms majestically in deep space with its razor-thin concentric icy rings catching bright sunlight. '
    'Palette: Enceladus icy diamond white and glacial cyan, geyser sparkling vapor, Saturn golden amber, and cosmic deep sapphire. '
    'Astronomy, planetary science, Saturn moons, Cassini mission, cryovolcanism, bright, educational, majestic. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1048, brief, "Cold Faithful")
    print("SUCCESS:", res)

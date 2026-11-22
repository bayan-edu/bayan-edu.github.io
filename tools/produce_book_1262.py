import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A World Without ELECTRICITY !!". The title "A World Without ELECTRICITY !!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ELECTRICAL ENERGY SCIENCE DAYLIGHT STYLE: A vibrant, dynamic conceptual science design exploring electrical energy in our world in bright daylight. In the center foreground, a glowing vintage incandescent lightbulb connected to a gleaming solar panel and miniature clean wind turbine model on a wooden workbench. Glowing energetic arcs of electric blue and warm gold light flow through clean schematic wire diagrams, connecting to modern home appliances and digital devices. In the background, a clean sunny neighborhood with rooftop solar panels under a clear azure sky. Palette: electric neon cyan, incandescent warm amber, solar panel deep blue, and daylight bright white. Physics of electricity, energy conservation, power generation, technology, bright, dynamic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1262, brief, 'A World Without ELECTRICITY !!')
    print("SUCCESS:", res)
